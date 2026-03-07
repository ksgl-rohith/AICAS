const mongoose = require("mongoose");

const platformTokenSchema = new mongoose.Schema(
{
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  platform: {
    type: String,
    enum: ["telegram", "linkedin", "facebook", "discord"],
    required: true
  },

  accessToken: {
    type: String,
    required: true
  },

  additionalData: {
    chatId: String,        // telegram
    pageId: String,        // facebook
    webhookUrl: String     // discord
  }
},
{ timestamps: true }
);

module.exports = mongoose.model("PlatformToken", platformTokenSchema);