const generateFromLLM = require("./aiService");

// const generateSubtopic = (topic, day) => {
//     return `Day ${day}: Advanced insights on ${topic}`;
// };

// const generateContent = (topic, subtopic) => {
//     return `
//     => ${subtopic}

// In today's discussion under ${topic}, we explore key concepts, practical implications, and real-world relevance.

// Stay tuned for more structured insights as we continue this journey.
// `;
// };

exports.generateDailyContent = async (campaign) => {
    const day = campaign.currentDay;

    const platformStyle = {
        linkedin: "Professional, thought-leadership tone.",
        instagram: "Short, engaging, emoji-friendly.",
        telegram: "Educational and structured.",
        discord: "Conversational but informative."
        };

    const prompt = `
    You are a professional content strategist.

    Generate a high-quality social media post.

    Campaign Topics: ${campaign.topic}
    Day Number: ${day}
    Platform: ${campaign.platforms.join(", ")}
    Tone: ${platformStyle[campaign.platforms[0]]}

    Requirements: 
    - Unique content
    - Engaging introduction
    - Structured paragraphs
    - Professional tone
    - End with call-to-action
    - No emojis

    Generate only the post content.
    `
    const content = await generateFromLLM(prompt);

    const subtopic = `Day ${day}: ${campaign.topic}`;

    return { day, subtopic, content };
};