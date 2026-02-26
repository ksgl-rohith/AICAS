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

  const currentHour = now.getHours();
  const currentMinute = now.getMinutes();

  const activeCampaigns = await Campaign.find({
    status: "ACTIVE"
  });

  console.log("Active campaigns:", activeCampaigns.length);

  for (let campaign of activeCampaigns) {

    const todaySchedule = campaign.schedule?.[currentDayName];
    if (!todaySchedule) continue;

    const scheduledHour = todaySchedule.hour;
    const scheduledMinute = todaySchedule.minute;

    // real schedule check
    // if (
    //   scheduledHour !== currentHour ||
    //   scheduledMinute !== currentMinute
    // ) continue;

    // Prevent duplicate generation
    const existingPost = await Post.findOne({
      campaign: campaign._id,
      dayNumber: campaign.currentDay
    });

    if (existingPost) continue;

    // Check completion
    if (campaign.currentDay > campaign.totalDays) {
      campaign.status = "COMPLETED";
      await campaign.save();
      continue;
    }

    console.log("Generating content...");

    // 1️⃣ Generate AI Text
    const { day, subtopic, content } =
      await generateDailyContent(campaign);

    // 2️⃣ Generate Media
    let imagePath = null;
    let videoPath = null;

    if (campaign.contentTypes.includes("image")) {
      imagePath = await generateImage(content, day);
    }

    if (campaign.contentTypes.includes("video") && imagePath) {
      videoPath = await generateVideo(imagePath, day);
    }

    // 3️⃣ Save Post
    const newPost = await Post.create({
      campaign: campaign._id,
      dayNumber: day,
      subtopic,
      content,
      media: {
        imagePath,
        videoPath
      },
      status: "GENERATED"
    });

    // 4️⃣ Post to platforms (media-aware)
    const success = await postToPlatforms(campaign, newPost);

    // 5️⃣ Update status ONCE
    if (success) {
      newPost.status = "POSTED";
      campaign.currentDay += 1;
    } else {
      newPost.status = "FAILED";
    }

    await newPost.save();
    await campaign.save();

    console.log(`✅ Completed processing for ${campaign._id}`);
  }
};

module.exports = runCampaigns;