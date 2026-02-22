const Campaign = require("../models/Campaign");
const Post = require("../models/Post");
const { generateDailyContent } = require("../services/contentService");

// Generate content for current day
exports.generatePost = async (req, res) => {
  try {
    const campaign = await Campaign.findOne({
      _id: req.params.id,
      user: req.user
    });

    if (!campaign) {
      return res.status(404).json({
        success: false,
        message: "Campaign not found"
      });
    }

    if (campaign.status !== "ACTIVE") {
      return res.status(400).json({
        success: false,
        message: "Campaign is not active"
      });
    }

    if (campaign.currentDay > campaign.totalDays) {
      campaign.status = "COMPLETED";
      await campaign.save();

      return res.status(400).json({
        success: false,
        message: "Campaign already completed"
      });
    }

    const { day, subtopic, content } =
      generateDailyContent(campaign);

    const post = await Post.create({
      campaign: campaign._id,
      dayNumber: day,
      subtopic,
      content
    });

    campaign.currentDay += 1;
    await campaign.save();

    res.status(201).json({
      success: true,
      data: post
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};