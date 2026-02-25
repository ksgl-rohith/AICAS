const express = require("express");
const cors = require("cors");
const rateLimit = require("express-rate-limit");

const authRoutes = require("./routes/authRoutes");

const campaignRoutes = require("./routes/campaignRoutes");

const app = express();
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100
});

const postRoutes = require("./routes/postRoutes");

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);
app.use(limiter);

app.get("/api/health", (req,res)=>{
    res.status(200).json({
        status: "success",
        message: "AICAS backend is running"
    });
});

app.use("/api/campaigns", campaignRoutes);
module.exports=app;