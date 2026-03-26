const mongoose = require("mongoose");

const performanceSchema = new mongoose.Schema({
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post"
  },
  platform: String,
  views: Number,
  likes: Number,
  shares: Number,
  comments: Number
}, { timestamps: true });

module.exports = mongoose.model("Performance", performanceSchema);