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

require("./handler/anticrash")(client);

mongoose.set('strictQuery', false);
await mongoose.connect(process.env.MONGO_URI);

try
{
    client.login(process.env.TOKEN).then(() => {

        let userCount = 0;
        client.guilds.cache.forEach(guild =>
            guild.members.cache.forEach(() => userCount++)
          )

        const activities = [
            { name: `Nueva apariencia. ✨`, type: ActivityType.Streaming },
            { name: `En ${client.guilds.cache.size} servidores ${userCount}. 🚀`, type: ActivityType.Watching },
            { name: `Obten ayuda /help.`, type: ActivityType.Playing },
            { name: `Última actualización: To-do`, type: ActivityType.Listening },
        ];
    
        let i = 0;
        setInterval(() => {
            const activity = activities[i];
            client.user.setActivity(activity.name, { type: activity.type });
            i = ++i % activities.length;
        }, 30000);
    
    });;
    
}
catch (error)
{
    console.error(error);
}