console.log("#campaignJob file loaded");

const Campaign = require("../models/Campaign");
const Post = require("../models/Post");
const { generateDailyContent } = require("../services/contentService");
const generateImage = require("../services/imageService");
const generateVideo = require("../services/videoService");
const postToPlatforms = require("../services/postingService");

const runCampaigns = async () => {

  console.log("#runCampaigns executing...");

  const now = new Date();

  const currentDayName = now
    .toLocaleString("en-US", { weekday: "long" })
    .toLowerCase();

  const activeCampaigns = await Campaign.find({
    status: "ACTIVE"
  });

  console.log("Active campaigns:", activeCampaigns.length);

  for (let campaign of activeCampaigns) {

    const todaySchedule = campaign.schedule?.[currentDayName];
    if (!todaySchedule) continue;

    // ✅ Completion check
    if (campaign.currentDay > campaign.totalDays) {
      campaign.status = "COMPLETED";
      await campaign.save();
      continue;
    }

    // ✅ Get post
    let post = await Post.findOne({
      campaign: campaign._id,
      dayNumber: campaign.currentDay
    });

    // ✅ Generate if missing
    if (!post) {
      console.log("No post found. Generating...");

      const { day, subtopic, content } =
        await generateDailyContent(campaign, campaign.currentDay);

      let imagePath = null;
      let videoPath = null;

      if (campaign.contentTypes.includes("image")) {
        imagePath = await generateImage(content, day);
      }

      if (campaign.contentTypes.includes("video") && imagePath) {
        videoPath = await generateVideo(imagePath, day);
      }

      post = await Post.create({
        campaign: campaign._id,
        dayNumber: day,
        subtopic,
        content,
        media: { imagePath, videoPath },
        status: "GENERATED"
      });
    }

    // ✅ Safety check
    if (!post || !post.content) {
      console.log("Invalid post. Skipping...");
      continue;
    }

    // ✅ Skip posted
    if (post.status === "POSTED") {
      console.log("Already posted. Moving forward...");
      campaign.currentDay += 1;
      await campaign.save();
      continue;
    }

    // ✅ Retry logic
    if (post.status === "FAILED") {

      const MAX_RETRIES = 3;

      if (post.retryCount >= MAX_RETRIES) {
        console.log("Max retries reached. Skipping day.");
        campaign.currentDay += 1;
        await campaign.save();
        continue;
      }

      const now = new Date();
      const lastAttempt = post.lastAttemptAt || new Date(0);
      const diffMinutes = (now - lastAttempt) / (1000 * 60);

      const RETRY_DELAY_MINUTES = 5;

      if (diffMinutes < RETRY_DELAY_MINUTES) {
        console.log("Retry cooldown active...");
        continue;
      }

      console.log("Retrying failed post...");
    }

    console.log("Posting day:", campaign.currentDay);

    // ✅ Post
    const success = await postToPlatforms(campaign, post);

    post.lastAttemptAt = new Date();

    if (success) {
      post.status = "POSTED";
      campaign.currentDay += 1;

      console.log("Post successful → Next day:", campaign.currentDay);

      if (campaign.currentDay > campaign.totalDays) {
        campaign.status = "COMPLETED";
      }

    } else {
      post.status = "FAILED";
      post.retryCount = (post.retryCount || 0) + 1;

      console.log("Post failed. Will retry.");
    }

    await post.save();
    await campaign.save();

    console.log(`Completed processing for ${campaign._id}`);
  }
};

module.exports = runCampaigns;