const mongoose = require("mongoose");

const campaignSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        campaignName: {
            type: String,
            required: true
        },
        topic: {
            type: String,
            required: true
        },
        totalDays: {
            type: Number,
            required: true
        },
        frequency: {
            type: String,
            enum: ["daily","weekly", "monthly"],
            default: "daily"
        },
        platforms: {
            type: [String],
            required: true
        },
        contentTypes: {
            type: [String],
            required: true
        },
        startDate: {
            type: Date,
            required: true
        },
        currentDay: {
            type: Number,
            default: 1
        },
        status: {
            type: String,
            enum: ["ACTIVE", "PAUSED", "COMPLETED"],
            default: "ACTIVE"
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("Campaign", campaignSchema);