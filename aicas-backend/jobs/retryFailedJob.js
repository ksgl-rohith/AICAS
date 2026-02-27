const Post = require("../models/Post");
const postToPlatforms = require("../services/postingService");

const retryFailedPosts = async () => {

  console.log("Checking for failed posts...");

  const failedPosts = await Post.find({
    status: "FAILED",
    retryCount: { $lt: 3 }
  }).populate("campaign");

  for (let post of failedPosts) {

    // 🔥 SAFE CHECKS
    if (!post) continue;
    if (!post.campaign) continue;
    if (!post.content) continue;

    try {
      const success = await postToPlatforms(post.campaign, post);

      post.retryCount += 1;
      post.lastAttemptAt = new Date();

      if (success) {
        post.status = "POSTED";
      }

      await post.save();

    } catch (err) {
      console.log("Retry error:", err.message);
    }
  }
};

module.exports = retryFailedPosts;