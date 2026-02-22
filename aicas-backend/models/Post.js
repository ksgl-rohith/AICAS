const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
    {
        campaign: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Campaign",
            required: true
        },
        dayNumber: {
            type: Number,
            required: true
        },
        subtopic: {
            type: String,
            required: true
        },
        content: {
            type: String,
            required: true
        },
        status: {
            type: String,
            enum: ["GENERATED","POSTED","FAILED"],
            default: "GENERATED"
        }
    },
    {timestamps: true}

);

module.exports = mongoose.model("Post", postSchema);

