const axios = require("axios");

let cache = {};
const CACHE_DURATION = 10 * 60 * 1000; // 10 minutes

const getLatestNews = async (topic) => {
  try {

    const now = Date.now();

    // RETURN FROM CACHE
    if (cache[topic] && (now - cache[topic].timestamp < CACHE_DURATION)) {
      console.log("Using cached news");
      return cache[topic].data;
    }

    const url = `https://api.gdeltproject.org/api/v2/doc/doc?query=${encodeURIComponent(topic)}&mode=ArtList&maxrecords=5&format=json`;

    const res = await axios.get(url);

    const articles = res.data.articles || [];

    if (articles.length === 0) return "";

    const news = articles
      .filter(a => a.title)
      .map(a => `- ${a.title.substring(0, 120)}`)
      .join("\n");

    // SAVE TO CACHE
    cache[topic] = {
      data: news,
      timestamp: now
    };

    console.log("📰 Fresh GDELT NEWS:\n", news);

    return news;

  } catch (error) {

    if (error.response?.status === 429) {
      console.log("Rate limit hit → using cached/fallback");

      return cache[topic]?.data || "No recent updates available.";
    }

    console.log("GDELT error:", error.message);
    return "";
  }
};

module.exports = getLatestNews;