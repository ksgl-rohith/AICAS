const sendTelegramPost = require("../integrations/telegram");
const postToLinkedIn = require("../integrations/linkedin");
const sendDiscordPost = require("../integrations/discord");
const postToFacebook = require("../integrations/facebook");

const postToPlatforms = async (campaign, post) => {
  const results = [];

  for (let platform of campaign.platforms) {

    if (platform === "telegram")
      results.push(await sendTelegramPost(post));

    if (platform === "linkedin")
      results.push(await postToLinkedIn(post));

    if (platform === "discord")
      results.push(await sendDiscordPost(post));

    if (platform === "facebook")
      results.push(await postToFacebook(post));
  }

  return results.length > 0 && results.every(r => r.success);
};

module.exports = postToPlatforms;