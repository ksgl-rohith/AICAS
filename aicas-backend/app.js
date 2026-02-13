const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");

const campaignRoutes = require("./routes/campaignRoutes");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);

app.get("/api/health", (req,res)=>{
    res.status(200).json({
        status: "success",
        message: "AICAS backend is running"
    });
});

app.use("/api/campaigns", campaignRoutes);
module.exports=app;