// const { Client, GatewayIntentBits } = require("discord.js");

// const client = new Client({
//     intents: [GatewayIntentBits.Guilds]
// });

// client.login(process.env.DISCORD_BOT_TOKEN);

// const sendDiscordPost = async (message) => {
//     try {
//         const channel = await client.channels.fetch(
//             process.env.DISCORD_CHANNEL_ID
//         );

//         await channel.send(message);

//         return { success: true };
//     } catch(error) {
//         console.error("Disord error:", error.message);
//         return { success: false };
//     }
// };

// module.exports = sendDiscordPost;