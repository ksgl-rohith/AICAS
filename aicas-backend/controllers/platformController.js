const PlatformToken = require("../models/PlatformToken");

// Save platform token
exports.savePlatformToken = async (req, res) => {
  try {

    const { platform, accessToken, additionalData } = req.body;

    const token = await PlatformToken.findOneAndUpdate(
      { user: req.user, platform },
      {
        accessToken,
        additionalData
      },
      {
        new: true,
        upsert: true
      }
    );

    res.json({
      success: true,
      data: token
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};



// Get user tokens
exports.getUserPlatforms = async (req, res) => {

  const platforms = await PlatformToken.find({
    user: req.user
  });

  res.json({
    success: true,
    data: platforms
  });
};



// Delete token
exports.deletePlatformToken = async (req, res) => {

  await PlatformToken.findOneAndDelete({
    user: req.user,
    platform: req.params.platform
  });

  res.json({
    success: true,
    message: "Platform token removed"
  });
};