const axios = require("axios");

const generateFromLLM = async (prompt) => {
    try {
        const response = await axios.post("http://localhost:11434/api/generate", {
            model: "mistral",
            prompt: prompt,
            stream: false
        });

        return response.data.response;
    } catch (error) {
        console.error("LLM Error:", error.message);
        throw new Error("AI generation failed");
    }
};

module.exports = generateFromLLM;