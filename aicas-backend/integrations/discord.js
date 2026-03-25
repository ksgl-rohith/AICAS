const axios = require("axios");
const fs = require("fs");
const path = require("path");
const FormData = require("form-data");

const sendDiscordPost = async (post, tokenData) => {
  try {
    const WEBHOOK_URL = tokenData.additionalData.webhookUrl;

    if (!WEBHOOK_URL) {
      console.log("Discord webhook missing");
      return { success: false };
    }

    // IMAGE / VIDEO (Discord supports file upload)
    if (post.media?.imagePath || post.media?.videoPath) {

      const filePath = path.resolve(
        post.media.imagePath || post.media.videoPath
      );

      if (!fs.existsSync(filePath)) {
        console.log("File not found");
        return { success: false };
      }

      const form = new FormData();
      form.append("file", fs.createReadStream(filePath));
      form.append("content", post.content.substring(0, 2000));

      await axios.post(WEBHOOK_URL, form, {
        headers: form.getHeaders()
      });

      return { success: true };
    }

    // TEXT ONLY
    await axios.post(WEBHOOK_URL, {
      content: post.content.substring(0, 2000)
    });

    return { success: true };

  } catch (error) {
    console.log("Discord error:", error.response?.data || error.message);
    return { success: false };
  }
};

module.exports = sendDiscordPost;