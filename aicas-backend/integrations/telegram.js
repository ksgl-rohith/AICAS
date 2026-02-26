const axios = require("axios");
const fs = require("fs");
const FormData = require("form-data");
const path = require("path");


const sendTelegramPost = async (post) => {
  console.log("FULL POST OBJECT:", post);
  console.log("POST MEDIA:", post.media);
try {

    if (!post) {
      console.log("Post object is undefined");
      return { success: false };
    }

    //  VIDEO FIRST
    if (post.media?.videoPath) {

      const absoluteVideoPath = path.resolve(post.media.videoPath);

      if (!fs.existsSync(absoluteVideoPath)) {
        console.log("Video not found:", absoluteVideoPath);
        return { success: false };
      }

      const form = new FormData();
      form.append("chat_id", process.env.TELEGRAM_CHAT_ID);
      form.append("caption", post.content);
      form.append("video", fs.createReadStream(absoluteVideoPath));

      const response = await axios.post(
        `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendVideo`,
        form,
        {
          headers: form.getHeaders(),
          maxBodyLength: Infinity
        }
      );

      console.log("Telegram video success:", response.data);
      return { success: true };
    }

    // IMAGE
    if (post.media?.imagePath) {

      const absoluteImagePath = path.resolve(post.media.imagePath);

      console.log("Absolute image path:", absoluteImagePath);
      console.log("File exists:", fs.existsSync(absoluteImagePath));

      if (!fs.existsSync(absoluteImagePath)) {
        console.log("Image file not found");
        return { success: false };
      }

      const form = new FormData();
      form.append("chat_id", process.env.TELEGRAM_CHAT_ID);
      form.append("caption", post.content);
      form.append("photo", fs.createReadStream(absoluteImagePath));

      const response = await axios.post(
        `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendPhoto`,
        form,
        {
          headers: form.getHeaders(),
          maxBodyLength: Infinity
        }
      );

      console.log("Telegram image success:", response.data);
      return { success: true };
    }

    // TEXT FALLBACK
    const response = await axios.post(
      `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`,
      {
        chat_id: process.env.TELEGRAM_CHAT_ID,
        text: post.content
      }
    );

    console.log("Telegram text success:", response.data);
    return { success: true };

  } catch (error) {
    console.error("Telegram error:", error.response?.data || error.message);
    return { success: false };
  }
};

module.exports = sendTelegramPost;