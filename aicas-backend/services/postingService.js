const sendTelegramPost = require("../integrations/telegram");
const postToLinkedIn = require("../integrations/linkedin");
const sendDiscordPost = require("../integrations/discord");
const postToFacebook = require("../integrations/facebook");

const postToPlatforms = async (campaign, content) => {
  const results = [];

  if (campaign.platforms.includes("telegram")) {
    results.push(await sendTelegramPost(content));
  }

  if (campaign.platforms.includes("linkedin")) {
    results.push(await postToLinkedIn(content));
  }

  if (campaign.platforms.includes("discord")) {
    results.push(await sendDiscordPost(content));
  }

  if (campaign.platforms.includes("facebook")) {
    results.push(await postToFacebook(content));
  }

  return results.length > 0 && results.every(r => r.success);
};

module.exports = postToPlatforms;
