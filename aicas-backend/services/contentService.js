const generateFromLLM = require("./aiService");
const getLatestNews = require("./newsService");
exports.generateDailyContent = async (campaign, day) => {
const useNews = campaign.useTrending || false;

let newsContext = "";

if (useNews) {
  newsContext = await getLatestNews(campaign.topic);

  // fallback
  if (!newsContext) {
    newsContext = "No recent updates found. Generate general informative content.";
  }
}
  const styles = [
    "educational",
    "storytelling",
    "motivational",
    "tips-based",
    "question-based",
    "problem-solution"
  ];

  const getStyle = (day) => styles[day % styles.length];

  const sanitize = (text) => {
    return text
      .replace(/Here is.*?:/gi, "")
      .replace(/["“”]/g, "")
      .replace(/\*\*/g, "")
      .replace(/\n{3,}/g, "\n\n")
      .trim();
  };


  const subtopic = `Day ${day}: ${campaign.topic}`;

 const prompt = `
You are an AI content creator.

Generate ONE high-quality social media post.

STRICT RULES:
- Do NOT generate multiple posts
- Do NOT repeat title
- Start directly with title
- Keep it clean and structured

FORMAT:
<Title>
<Content>

Topic: ${campaign.topic}
Day: ${day}
Style: ${getStyle(day)}

${useNews ? `Latest News Context:\n${newsContext}` : ""}

Instructions:
- If news is provided → prioritize recent developments
- If no news → generate general educational content
- Make it engaging and informative
`;

  const rawContent = await generateFromLLM(prompt);

  if (!rawContent) {
    return {
      day,
      subtopic,
      content: `Day ${day}: ${campaign.topic}\nStay tuned for more updates.`
    };
  }

  const content = sanitize(rawContent);

  return { day, subtopic, content };
};