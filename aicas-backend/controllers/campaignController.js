const Campaign = require("../models/Campaign");

exports.createCampaign = async (req,res) => {
    try {
        const campaign = await Campaign.create(req.body);
        res.status(201).json({
            succes: true,
            data: campaign
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

exports.getCampaigns = async (req,res) => {
    const campaigns = await Campaign.find();
    res.status(200).json({
        success: true,
        data: campaigns
    });
};