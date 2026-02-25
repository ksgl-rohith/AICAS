const cron = require("node-cron");
const runCampaigns = require("../jobs/campaignJob");
const retryFailedPosts = require("../jobs/retryFailedJob");
const log = require("../utils/logger");

const startScheduler = () => {
    //runs every minute (for testing)
    cron.schedule("* * * * *", async () => {
       try { 
        console.log("cron executing...");
        await runCampaigns();
    } catch (err) {
        console.error("Cron error:", err);
    }
    });
    //it will retry every 5 minutes
    cron.schedule("*/5 * * * *", async ()=> {
        await retryFailedPosts();
    });

    log(" scheduler started...");
};

module.exports = startScheduler;