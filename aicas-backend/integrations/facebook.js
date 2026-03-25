const axios = require("axios");
const fs = require("fs");
const path = require("path");
const FormData = require("form-data");

const sendFacebookPost = async (post, tokenData) => {
  try {
    const ACCESS_TOKEN = tokenData.accessToken;
    const PAGE_ID = tokenData.additionalData.pageId;

    if (!ACCESS_TOKEN || !PAGE_ID) {
      console.log("Facebook credentials missing");
      return { success: false };
    }

    // IMAGE POST
    if (post.media?.imagePath) {

      const imagePath = path.resolve(post.media.imagePath);

      if (!fs.existsSync(imagePath)) {
        console.log("Image not found");
        return { success: false };
      }

      const form = new FormData();
      form.append("source", fs.createReadStream(imagePath));
      form.append("caption", post.content);
      form.append("access_token", ACCESS_TOKEN);

      await axios.post(
        `https://graph.facebook.com/${PAGE_ID}/photos`,
        form,
        { headers: form.getHeaders() }
      );

      return { success: true };
    }

    // TEXT POST
    await axios.post(
      `https://graph.facebook.com/${PAGE_ID}/feed`,
      {
        message: post.content,
        access_token: ACCESS_TOKEN
      }
    );

    return { success: true };

  } catch (error) {
    console.log("Facebook error:", error.response?.data || error.message);
    return { success: false };
  }
};

module.exports = sendFacebookPost;