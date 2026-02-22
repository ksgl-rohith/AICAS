const Campaign = require("../models/Campaign");
const Post = require("../models/Post");
const { generateDailyContent } = require("../services/contentService");

const runCampaigns = async () => {
  const now = new Date();

  const currentDayName = now.toLocaleString("en-US", {
    weekday: "long"
  }).toLowerCase();

  const currentHour = now.getHours();
  const currentMinute = now.getMinutes();

  const activeCampaigns = await Campaign.find({
    status: "ACTIVE"
  });

  for (let campaign of activeCampaigns) {

    const todaySchedule = campaign.schedule?.[currentDayName];

    if (!todaySchedule) continue;

    if (
      todaySchedule.hour === currentHour &&
      Math.abs(minute - currentMinute) <= 1
    ) {
      if (campaign.currentDay > campaign.totalDays) {
        campaign.status = "COMPLETED";
        await campaign.save();
        continue;
      }

      const { day, subtopic, content } =
        generateDailyContent(campaign);

      await Post.create({
        campaign: campaign._id,
        dayNumber: day,
        subtopic,
        content
      });

      campaign.currentDay += 1;
      await campaign.save();

      console.log(`📅 Posted for ${currentDayName}`);
    }
  }
};

module.exports = runCampaigns;
