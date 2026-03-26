const axios = require("axios");
const fs = require("fs");
const path = require("path");
const FormData = require("form-data");

const MAX_CAPTION = 1000;

// ✅ Split content into title + body
const splitContent = (content) => {
  if (!content) return { title: "Daily Post", body: "" };

  const lines = content.split("\n").filter(line => line.trim() !== "");

  const title = lines[0]
  .replace("Title:", "")
  .trim()
  .substring(0, MAX_CAPTION);

  const body = lines.slice(1).join("\n");

  return { title, body };
};


const sendTelegramPost = async (post, tokenData) => {

  const BOT_TOKEN = tokenData.accessToken;
  const CHAT_ID = tokenData.additionalData.chatId;

  console.log("BOT TOKEN:", BOT_TOKEN);
  console.log("CHAT ID:", CHAT_ID);

  try {

    // ✅ USE SPLIT HERE (correct place)
    const { title, body } = splitContent(post.content);

    // 🔥 VIDEO FIRST
    if (post.media?.videoPath) {

      const videoPath = path.resolve(post.media.videoPath);

      if (!fs.existsSync(videoPath)) {
        console.log("Video not found");
        return { success: false };
      }

      const form = new FormData();
      form.append("chat_id", CHAT_ID);
      form.append("caption", title);
      form.append("video", fs.createReadStream(videoPath));

      await axios.post(
        `https://api.telegram.org/bot${BOT_TOKEN}/sendVideo`,
        form,
        { headers: form.getHeaders() }
      );

      // ✅ Send remaining content separately
      if (body) {
        await axios.post(
          `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,
          {
            chat_id: CHAT_ID,
            text: body.substring(0, 4096)
          }
        );
      }

      return { success: true };
    }

    // 🔥 IMAGE
    if (post.media?.imagePath) {

      const imagePath = path.resolve(post.media.imagePath);

      if (!fs.existsSync(imagePath)) {
        console.log("Image not found");
        return { success: false };
      }

      const form = new FormData();
      form.append("chat_id", CHAT_ID);
      form.append("caption", title);
      form.append("photo", fs.createReadStream(imagePath));

      await axios.post(
        `https://api.telegram.org/bot${BOT_TOKEN}/sendPhoto`,
        form,
        { headers: form.getHeaders() }
      );

      if (body) {
        await axios.post(
          `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,
          {
            chat_id: CHAT_ID,
            text: body.substring(0, 4096)
          }
        );
      }

      return { success: true };
    }

    // 🔥 TEXT ONLY
    await axios.post(
      `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,
      {
        chat_id: CHAT_ID,
        text: post.content.substring(0, 4096)
      }
    );

    return { success: true };

  } catch (error) {

    console.log("Telegram error:", error.response?.data || error.message);
    return { success: false };

  }
};

module.exports = sendTelegramPost;