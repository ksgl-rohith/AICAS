const axios = require("axios");

const postToFacebook = async (message) => {
    try {
        const url = `https://graph.facebook.com/v18.0/${process.env.FACEBOOK_PAGE_ID}/feed`;

        await axios.post(url, {
            message: message,
            access_token: process.env.FACEBOOK_PAGE_ACCESS_TOKEN
        });

        return { success:true };
    } catch (error) {
        console.error("Facebook error:", error.response?.data);
        return { success: false };
    }
};

module.exports = postToFacebook;