const cron = require("node-cron");
const runCampaigns = require("../jobs/campaignJob");

const startScheduler = () => {
    //runs every minute (for testing)
    cron.schedule("* * * * *", async () => {
        await runCampaigns();
    });

    console.log(" scheduler started...");
};

module.exports = startScheduler;