const dotenv = require("dotenv");
const app = require("./app");
const connectDB = require("./config/db");
const startScheduler = require("./services/schedulerService");


dotenv.config();

// connectDB();

const PORT = process.env.PORT || 5000;
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 AICAS Backend running on port ${PORT}`);
    startScheduler();
  });
});