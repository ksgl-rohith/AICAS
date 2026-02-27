const { createCanvas, loadImage } = require("canvas");
const fs = require("fs");
const path = require("path");

const outputDir = path.join(__dirname, "../generated");
const assetsDir = path.join(__dirname, "../assets");

// Ensure generated folder exists
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir);
}

const generateImage = async (text, day) => {
  const width = 1080;
  const height = 1080;

  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext("2d");

  const bgPath = path.join(assetsDir, "background.jpg");

  // Check background exists
  if (!fs.existsSync(bgPath)) {
    throw new Error("background.jpg not found in assets folder");
  }

  // ✅ Correct usage (single loadImage call)
  const bg = await loadImage(bgPath);

  ctx.drawImage(bg, 0, 0, width, height);

  // Dark overlay
  ctx.fillStyle = "rgba(0,0,0,0.5)";
  ctx.fillRect(0, 0, width, height);

  // Title
  ctx.fillStyle = "#ffffff";
  ctx.font = "bold 60px Arial";
  ctx.fillText(`DAY ${day}`, 80, 150);

  // Body text
  ctx.font = "40px Arial";
  const firstLine = text.split("\n")[0].replace(/title:/i, "").trim();
  wrapText(ctx, firstLine, 80, 500, 920, 80);
  const filePath = path.join(outputDir, `image_day_${day}.png`);

  fs.writeFileSync(filePath, canvas.toBuffer("image/png"));

  return filePath;
};

const wrapText = (ctx, text, x, y, maxWidth, lineHeight) => {
  const words = text.split(" ");
  let line = "";

  for (let n = 0; n < words.length; n++) {
    const testLine = line + words[n] + " ";
    const metrics = ctx.measureText(testLine);
    const testWidth = metrics.width;

    if (testWidth > maxWidth && n > 0) {
      ctx.fillText(line, x, y);
      line = words[n] + " ";
      y += lineHeight;
    } else {
      line = testLine;
    }
  }

  ctx.fillText(line, x, y);
};

module.exports = generateImage;