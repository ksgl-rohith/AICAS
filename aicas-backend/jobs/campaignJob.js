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


    // 1️⃣ Completion check
    if (campaign.currentDay > campaign.totalDays) {
      campaign.status = "COMPLETED";
      await campaign.save();
      continue;
    }

    // 2️⃣ Try to find existing post
    let post = await Post.findOne({
      campaign: campaign._id,
      dayNumber: campaign.currentDay
    });

    // 3️⃣ If post missing → generate it (fallback)
    if (!post) {
      console.log("Post missing. Generating for day:", campaign.currentDay);

      const { day, subtopic, content } =
        await generateDailyContent(campaign);

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

    // 4️⃣ Skip if already posted
    if (post.status === "POSTED") {
      console.log("Already posted. Skipping day:", campaign.currentDay);
      campaign.currentDay += 1;
      await campaign.save();
      continue;
    }

    console.log("Posting day:", campaign.currentDay);

    // 5️⃣ Post to platforms
    const success = await postToPlatforms(campaign, post);

    // 6️⃣ Update status
    if (success) {
      post.status = "POSTED";
      campaign.currentDay += 1;

      if (campaign.currentDay > campaign.totalDays) {
        campaign.status = "COMPLETED";
      }

    } else {
      post.status = "FAILED";
    }

    await post.save();
    await campaign.save();

    console.log(`Completed processing for ${campaign._id}`);
}
};

module.exports = runCampaigns;