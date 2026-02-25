const Post = require("../models/Post");
const Campaign = require("../models/Campaign");
const postToPlatforms = require("../services/postingService");

const retryFailedPosts = async () => {
    console.log("Checking for failed posts...");

    const failedPosts = await Post.find({
        status: "FAILED",
        retryCount: { $lt: 3 }
    }).populate("campaign");

    for (let post of failedPosts) {
        const campaign = post.campaign;

        const success = await postToPlatforms(campaign, post.content);

        post.retryCount += 1;
        post.lastAttemptAt = new Date();

        if (success) {
            post.status = "POSTED";
            console.log("Retry successful");
        } else {
            console.log("Retry failed");
        }

        await post.save();
    }
};

module.exports = retryFailedPosts;