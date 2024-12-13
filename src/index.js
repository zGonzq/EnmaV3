require('dotenv/config');

const { Client, IntentsBitField, ActivityType } = require('discord.js');
const { CommandKit } = require('commandkit');
const { join } = require('path');

const mongoose = require('mongoose');

const client = new Client({
    intents: 
        3276799
});

new CommandKit({
    client,
    eventsPath: join(__dirname, 'events'),
    commandsPath: join(__dirname, 'commands'),
    devUserIds: ['944060279082340433'],
    devGuildIds: ['872260926055776267'],
    bulkRegister: true,
});

mongoose.set('strictQuery', false);
await mongoose.connect(process.env.MONGO_URI);

client.login(process.env.TOKEN).then(() => {
    const activities = [
        { name: `Nueva apariencia. ✨`, type: ActivityType.Streaming },
        { name: `En ${client.guilds.cache.size} servidores. 🚀`, type: ActivityType.Watching },
    ];

    let i = 0;
    setInterval(() => {
        const activity = activities[i];
        client.user.setActivity(activity.name, { type: activity.type });
        i = ++i % activities.length;
    }, 30000);

});;
