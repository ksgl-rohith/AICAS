const Campaign = require("../models/Campaign");
const getDefaultSchedule = require("../utils/defaultSchedule")
const { generateDailyContent } = require("../services/contentService");
const Post = require("../models/Post");
const generateImage = require("../services/imageService");
const generateVideo = require("../services/videoService");

// Create Campaign
exports.createCampaign = async (req, res) => {
  try {
    const schedule =
      req.body.schedule && Object.keys(req.body.schedule).length > 0
      ? req.body.schedule
      : getDefaultSchedule(req.body.platforms);
    console.log("Platforms:", req.body.platforms);

    const campaign = await Campaign.create({
      ...req.body,
      schedule,
      user: req.user
    });

    for (let day = 1; day <= campaign.totalDays; day++) {

   const { subtopic, content } =
      await generateDailyContent(campaign, day);

   let imagePath = null;
   let videoPath = null;

   if (campaign.contentTypes.includes("image")) {
      imagePath = await generateImage(content, day);
   }

   if (campaign.contentTypes.includes("video") && imagePath) {
      videoPath = await generateVideo(imagePath, day);
   }

   await Post.create({
      campaign: campaign._id,
      dayNumber: day,
      subtopic,
      content,
      media: { imagePath, videoPath },
      status: "GENERATED"
   });
}
    res.status(201).json({
      success: true,
      data: campaign
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// Get My Campaigns (User-specific)
exports.getMyCampaigns = async (req, res) => {
  const campaigns = await Campaign.find({ user: req.user });

  res.status(200).json({
    success: true,
    data: campaigns
  });
};

// Pause Campaign
exports.pauseCampaign = async (req, res) => {
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

  campaign.status = "PAUSED";
  await campaign.save();

  res.json({
    success: true,
    message: "Campaign paused"
  });
};

// Resume Campaign
exports.resumeCampaign = async (req, res) => {
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

  campaign.status = "ACTIVE";
  await campaign.save();

  res.json({
    success: true,
    message: "Campaign resumed"
  });
};

// Complete Campaign
exports.completeCampaign = async (req, res) => {
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

  campaign.status = "COMPLETED";
  await campaign.save();

  res.json({
    success: true,
    message: "Campaign completed"
  });
};