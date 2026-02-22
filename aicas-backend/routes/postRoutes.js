const express = require("express");
const router = express.Router();
const { generatePost } = require("../controllers/postController");
const { protect } = require("../middleware/authMiddleware");

router.post("/:id/generate", protect, generatePost);

module.exports = router;