const mongoose = require("mongoose");

const logSchema = new mongoose.Schema(
{
  campaign: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Campaign"
  },

  campaignName: {
    type: String
  },

  action: {
    type: String
  },

  platform: {
    type: String
  },

  status: {
    type: String,
    enum: ["SUCCESS","FAILED"]
  },

  message: {
    type: String
  }

},
{ timestamps: true }
);

module.exports = mongoose.model("Log", logSchema);