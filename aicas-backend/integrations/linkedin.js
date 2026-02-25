const axios = require("axios");

const postToLinkedIn = async (text) => {
    try {
        const response = await axios.post(
            "https://api.linked.com/v2/ugcPosts",
            {
                author: process.env.LINKEDIN_PERSON_URN,
                lifecycleState: "PUBLISHED",
                specificContent: {
                    "com.linkedin.ugc.ShareContent": {
                        shareCommentary: {
                            text: text
                        },
                        shareMediaCategory: "NONE"
                    }
                },
                visibility: {
                    "com.linked.ugc.MemberNetworkVisibility": "PUBLIC"
                }
            },
            {
                headers: {
                    Authorization: `Bearer ${process.env.LINKEDIN_ACCESS_TOKEN}`,
                    "X-Restli-protocol-Version": "2.0.0",
                    "Content-Type": "application/json"
                }
            }
        );
        return { success: true };
    } catch (error) {
        console.error("LinkedIn error:", error.response?.data);
        return { success: false };
    }
};

module.exports = postToLinkedIn;