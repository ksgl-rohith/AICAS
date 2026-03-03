const extractTitleAndBody = (text) => {
  if (!text) {
    return {
      title: "Daily Post",
      body: ""
    };
  }

  const lines = text.split("\n").filter(l => l.trim() !== "");

  let title = "Daily Post";
  let body = text;

  if (lines.length > 0) {
    if (lines[0].toLowerCase().includes("title:")) {
      title = lines[0].replace(/title:/i, "").trim();
      body = text.replace(lines[0], "").trim();
    } else {
      title = lines[0].trim();
      body = text.replace(lines[0], "").trim();
    }
  }

  return { title, body };
};

module.exports = { extractTitleAndBody };