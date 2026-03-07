const PlatformToken = require("../models/PlatformToken");

const sendTelegramPost = require("../integrations/telegram");
const postToLinkedIn = require("../integrations/linkedin");
const sendDiscordPost = require("../integrations/discord");
const postToFacebook = require("../integrations/facebook");

const Log = require("../models/Log");

const postToPlatforms = async (campaign, post) => {

  const results = [];

  for (let platform of campaign.platforms) {

    const tokenData = await PlatformToken.findOne({
      user: campaign.user,
      platform
    });

    if (!tokenData) {
      console.log(`${platform} token not configured`);
      results.push({ success: false });
      continue;
    }

    let result = { success: false };

    if (platform === "telegram") {

      result = await sendTelegramPost(post, tokenData);

      await Log.create({
        campaign: campaign._id,
        campaignName: campaign.campaignName,
        action: "Post Sent",
        platform: "telegram",
        status: result.success ? "SUCCESS" : "FAILED",
        message: result.success ? "Posted successfully" : "Posting failed"
      });

    }

    else if (platform === "linkedin") {
      result = await postToLinkedIn(post, tokenData);
    }

    else if (platform === "discord") {
      result = await sendDiscordPost(post, tokenData);
    }

    else if (platform === "facebook") {
      result = await postToFacebook(post, tokenData);
    }

    results.push(result);
  }

  return results.length > 0 && results.every(r => r.success);
};

module.exports = postToPlatforms;