const Campaign = require("../models/Campaign");

// Create Campaign
exports.createCampaign = async (req, res) => {
  try {
    const campaign = await Campaign.create({
      ...req.body,
      user: req.user
    });

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