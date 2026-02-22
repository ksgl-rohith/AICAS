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
            type: [String],
            enum: ["daily","weekly", "monthly"],
            default: ["daily"]
        },
        platforms: {
            type: [String],
            enum: ["linkedin","telegram","facebook","discord"],
            default: ["linkedin"]
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
        },
        schedule: {
            monday: { hour: Number, minute: Number },
            tuesday: { hour: Number, minute: Number },
            wednesday: { hour: Number, minute: Number },
            thursday: { hour: Number, minute: Number },
            friday: { hour: Number, minute: Number },
            saturday: { hour: Number, minute: Number },
            sunday: { hour: Number, minute: Number }
},
    },
    { timestamps: true }
);

module.exports = mongoose.model("Campaign", campaignSchema);