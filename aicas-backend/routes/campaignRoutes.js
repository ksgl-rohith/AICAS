const express = require("express");
const router = express.Router();
const {
    createCampaign,
    getCampaigns
} = require("../controllers/campaignController")

const {protect} = require("../middleware/authMiddleware");

router.post("/create", protect, createCampaign);
router.get("/", protect, getCampaigns);

module.exports = router;