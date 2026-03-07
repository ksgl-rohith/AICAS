const express = require("express");
const router = express.Router();

const {
  savePlatformToken,
  getUserPlatforms,
  deletePlatformToken
} = require("../controllers/platformController");

const { protect } = require("../middleware/authMiddleware");

router.post("/token", protect, savePlatformToken);

router.get("/tokens", protect, getUserPlatforms);

router.delete("/:platform", protect, deletePlatformToken);

module.exports = router;