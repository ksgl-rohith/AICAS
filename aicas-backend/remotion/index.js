const path = require("path");
const fs = require("fs");
const { bundle } = require("@remotion/bundler");
const { renderMedia } = require("@remotion/renderer");

const generateRemotionVideo = async (title, body, day) => {
    console.log("Starting video render for day:", day);
  const outputDir = path.join(__dirname, "../generated");

  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir);
  }

  const outputLocation = path.join(outputDir, `video_day_${day}.mp4`);

  try {
    const bundleLocation = await bundle({
      entryPoint: path.join(__dirname, "./index.js"),
    });

    await renderMedia({
      composition: "AICASVideo",
      serveUrl: bundleLocation,
      codec: "h264",
      outputLocation,
      inputProps: { title, body },
    });

    console.log("Video generated at:", outputLocation);

    return outputLocation;

  } catch (error) {
    console.error("Video generation failed:", error);
    return null;   
  }
  
};

module.exports = generateRemotionVideo;