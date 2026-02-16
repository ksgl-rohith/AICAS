const express = require("express");
const router = express.Router();
const {
    createCampaign,
    getMyCampaigns,
    pauseCampaign,
    resumeCampaign,
    completeCampaign
} = require("../controllers/campaignController");

const {protect} = require("../middleware/authMiddleware");

router.post("/create", protect, createCampaign);
router.get("/", protect, getMyCampaigns);

router.put("/:id/pause", protect, pauseCampaign);
router.put("/:id/resume", protect, resumeCampaign);
router.put("/:id/complete", protect, completeCampaign);


module.exports = router;