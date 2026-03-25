const axios = require("axios");
const fs = require("fs");
const path = require("path");

const postToLinkedIn = async (post, tokenData) => {
  try {
    const ACCESS_TOKEN = tokenData.accessToken;
    const OWNER = tokenData.additionalData.urn; 
    // Example: "urn:li:person:xxxx"

    if (!ACCESS_TOKEN || !OWNER) {
      console.log("LinkedIn credentials missing");
      return { success: false };
    }

    // TEXT POST (LinkedIn easiest)
    const body = {
      author: OWNER,
      lifecycleState: "PUBLISHED",
      specificContent: {
        "com.linkedin.ugc.ShareContent": {
          shareCommentary: {
            text: post.content.substring(0, 1300)
          },
          shareMediaCategory: "NONE"
        }
      },
      visibility: {
        "com.linkedin.ugc.MemberNetworkVisibility": "PUBLIC"
      }
    };

    await axios.post(
      "https://api.linkedin.com/v2/ugcPosts",
      body,
      {
        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
          "X-Restli-Protocol-Version": "2.0.0",
          "Content-Type": "application/json"
        }
      }
    );

    return { success: true };

  } catch (error) {
    console.log("LinkedIn error:", error.response?.data || error.message);
    return { success: false };
  }
};

module.exports = postToLinkedIn;