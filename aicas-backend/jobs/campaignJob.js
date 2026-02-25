console.log("#campaignJob file loaded");
const Campaign = require("../models/Campaign");

const Post = require("../models/Post");
const { generateDailyContent } = require("../services/contentService");

const sendTelegramPost = require("../integrations/telegram");
const postToLinkedIn = require("../integrations/linkedin");
const sendDiscordPost = require("../integrations/discord");
const postToFacebook = require("../integrations/facebook");

const runCampaigns = async () => {
  console.log("#runCampaigns executing...");
  const now = new Date();
  console.log("#Scheduler triggered at:", new Date());
  const currentDayName = now.toLocaleString("en-US", {
    weekday: "long"
  }).toLowerCase();

  const currentHour = now.getHours();
  const currentMinute = now.getMinutes();

  const activeCampaigns = await Campaign.find({
    status: "ACTIVE"
  });
  console.log("Active campaigns count:", activeCampaigns.length);

  for (let campaign of activeCampaigns) {

    const todaySchedule = campaign.schedule?.[currentDayName];
      console.log("Current time:", currentHour, currentMinute);
      console.log("Today schedule:", todaySchedule);
    // if (!todaySchedule) continue;

    const scheduledHour = todaySchedule.hour;
    const scheduledMinute = todaySchedule.minute;

    if (
      // scheduledHour === currentHour &&
      // scheduledMinute === currentMinute
      true
    ) {
      
      const existingPost = await Post.findOne({
        campaign: campaign._id,
        dayNumber: campaign.currentDay
      });

      if (existingPost) continue;

      console.log("Time matched. Generating content...");
      if (campaign.currentDay > campaign.totalDays) {
        campaign.status = "COMPLETED";
        await campaign.save();
        continue;
      }

      const { day, subtopic, content } =
       await generateDailyContent(campaign);

      const newPost=await Post.create({
        campaign: campaign._id,
        dayNumber: day,
        subtopic,
        content
      });

      //post to LinkedIn if selected
      if(campaign.platforms.includes("linkedin")) {

        const result = await postToLinkedIn(content);

        if(result.success) {
          newPost.status = "POSTED";
          campaign.currentDay += 1;
        } else {
          newPost.status = "FAILED";
        }

        await newPost.save();
      }

      //post to telegram if selected
      if(campaign.platforms.includes("telegram")) {
        const result = await sendTelegramPost(content);

        if (result.success) {
          newPost.status = "POSTED";
          campaign.currentDay += 1;
        }else{
          newPost.status = "FAILED";
        }

        await newPost.save();
      }

      // //post to discord if selected
      // if (campaign.platforms.includes("discord")) {
      //   const result = await sendDiscordPost(content);
      //   if (result.success) {
      //     newPost.status = "POSTED";
            //  campaign.currentDay += 1;
      //   } else {
      //     newPost.status = "FAILED";
      //   }

      //   await newPost.save();
      // }

      //post to facebook if selected
      if (campaign.platforms.includes("facebook")) {
        const result = await postToFacebook(content);

        if (result.success) {
          newPost.status = "POSTED";
          campaign.currentDay += 1;
        } else {
          newPost.status = "FAILED";
        }

        await newPost.save();
      }

      
      await campaign.save();

      console.log(`📅 Posted for ${currentDayName}`);
    }
  }
};

module.exports = runCampaigns;
