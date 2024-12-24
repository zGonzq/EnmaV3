const { ActivityType } = require('discord.js');
/** * @param {import('discord.js').Client} client */
module.exports = (client) => {
    client.user.setStatus('idle');
    
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
};