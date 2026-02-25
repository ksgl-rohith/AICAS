const axios = require("axios");

const sendTelegramPost = async (message) => {
    try {
        const url = `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`;

        const response = await axios.post(url, {
            chat_id: process.env.TELEGRAM_CHAT_ID,
            text: message,
            parse_mode: "Markdown"
        });

        return { success: true, data: response.data };
    } catch (error) {
        console.error("Telegram error:", error.message);
        return { success: false };
    }

};

module.exports = sendTelegramPost;