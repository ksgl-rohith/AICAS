const express = require("express");
const cors = require("cors");

const campaignRoutes = require("./routes/campaignRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/health", (req,res)=>{
    res.status(200).json({
        status: "success",
        message: "AICAS backend is running"
    });
});

app.use("/api/campaigns", campaignRoutes);
module.exports=app;