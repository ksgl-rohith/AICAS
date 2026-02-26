const { exec } = require("child_process");
const path = require("path");
const fs = require("fs");

const generateVideo = (imagePath, day) => {
  return new Promise((resolve, reject) => {

    const absoluteImagePath = path.resolve(imagePath);

    if (!fs.existsSync(absoluteImagePath)) {
      return reject("Image file not found");
    }


    const outputPath = path.join(
      __dirname,
      `../generated/video_day_${day}.mp4`
    );

    const absoluteOutputPath = path.resolve(outputPath);

    const command = `ffmpeg -y -loop 1 -i "${absoluteImagePath}" -c:v libx264 -t 10 -pix_fmt yuv420p "${absoluteOutputPath}"`;

    exec(command, (error) => {
      if (error) {
        console.error("Video generation error:", error);
        return reject(error);
      }

      resolve(absoluteOutputPath);
    });
  });
};

module.exports = generateVideo;