require('dotenv/config');

const { Client,GatewayIntentBits, IntentsBitField, ActivityType } = require('discord.js');
const { CommandKit } = require('commandkit');
const { join } = require('path');

const mongoose = require('mongoose');

const client = new Client({
    intents: Object.values(GatewayIntentBits)
});

new CommandKit({
    client,
    eventsPath: join(__dirname, 'events'),
    commandsPath: join(__dirname, 'commands'),
    devUserIds: ['944060279082340433'],
    devGuildIds: ['872260926055776267'],
    bulkRegister: true,
});

require("./handler/anticrash")(client);

mongoose.set('strictQuery', false);
await mongoose.connect(process.env.MONGO_URI);



try
{
    client.login(process.env.TOKEN)

    client.on("ready", () => {
        const userCount = client.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0);
        const activities = [
            { name: `Nueva apariencia. ✨`, type: ActivityType.Streaming },
            { name: `En ${client.guilds.cache.size} servidores. 🚀`, type: ActivityType.Watching },
            { name: `Con ${userCount} usuarios. 🌍`, type: ActivityType.Watching },
            { name: `Obten ayuda /help. 💡`, type: ActivityType.Playing },
            { name: `Última actualización: To-do 📌`, type: ActivityType.Listening },

        ];
    
        let i = 0;
        setInterval(() => {
            const activity = activities[i];
            client.user.setActivity(activity.name, { type: activity.type  } );
            i = ++i % activities.length;
        }, 15000);
})}

catch (error)
{
    console.error(error);
}