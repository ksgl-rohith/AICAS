const express = require("express");
const router = express.Router();

const {
  createCampaign,
  getMyCampaigns,
  pauseCampaign,
  resumeCampaign,
  completeCampaign
} = require("../controllers/campaignController");

const { getCampaignById } = require("../services/campaignService");

const { protect } = require("../middleware/authMiddleware");

router.post("/create", protect, createCampaign);
router.get("/", protect, getMyCampaigns);
router.get("/:id", protect, async (req, res) => {

  try {

    const campaign = await getCampaignById(req.params.id);

    if (!campaign) {
      return res.status(404).json({ message: "Campaign not found" });
    }

    res.json(campaign);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

});

router.put("/:id/pause", protect, pauseCampaign);
router.put("/:id/resume", protect, resumeCampaign);
router.put("/:id/complete", protect, completeCampaign);

module.exports = router;