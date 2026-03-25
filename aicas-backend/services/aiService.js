// const axios = require("axios");

// const generateFromLLM = async (prompt) => {
//     try {
//         const response = await axios.post("http://localhost:11434/api/generate", {
//             model: "llama3:8b-instruct-q4_0",
//             prompt: prompt,
//             stream: false
//         });

//         return response.data.response;
//     } catch (error) {
//         console.error("LLM Error:", error.message);
//         throw new Error("AI generation failed");
//     }
// };

// module.exports = generateFromLLM;

const axios = require("axios");

const generateFromLLM = async (prompt) => {
  try {
    const response = await axios.post(
      "https://integrate.api.nvidia.com/v1/chat/completions",
      {
        model: "meta/llama3-70b-instruct",
        messages: [
          { role: "system", content: "You are a professional content strategist." },
          { role: "user", content: prompt }
        ],
        temperature: 0.7,
        max_tokens: 800
      },
      {
        headers: {
          "Authorization": `Bearer ${process.env.NVIDIA_API_KEY}`,
          "Content-Type": "application/json"
        }
      }
    );

    return response.data.choices[0].message.content;

  } catch (error) {
    console.error("NVIDIA AI error:", error.response?.data || error.message);
    return "Content generation failed";
  }
};

module.exports = generateFromLLM;