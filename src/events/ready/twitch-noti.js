const axios = require('axios');
const { EmbedBuilder } = require('discord.js');
const Notifications = require('../../models/notifications');

module.exports = async (client) => {
    const checkTwitchUser = async (username) => {
        try {
            const response = await axios.get(`https://decapi.me/twitch/avatar/${username}`);
            return response.data !== 'User not found' && response.data !== '404: Not Found';
        } catch (error) {
            return false;
        }
    };

    setInterval(async () => {
        const notifications = await Notifications.find();

        for (const notification of notifications) {
            if (!notification.twitch.length) continue;

            const channel = client.channels.cache.get(notification.channelId);
            if (!channel) continue;

            for (const twitchUser of notification.twitch) {
                try {
                    try { 
                    const userExists = await checkTwitchUser(twitchUser.username);
                    if (!userExists) {
                        console.log(`Usuario de Twitch no encontrado: ${twitchUser.username}`);
                        continue;
                    }
                } catch (error) {
                    console.error(`Error al verificar si el usuario de Twitch existe:`, error.message);
                }

                    const [avatar, game, title, uptime] = await Promise.all([
                        axios.get(`https://decapi.me/twitch/avatar/${twitchUser.username}`),
                        axios.get(`https://decapi.me/twitch/game/${twitchUser.username}`),
                        axios.get(`https://decapi.me/twitch/title/${twitchUser.username}`),
                        axios.get(`https://decapi.me/twitch/uptime/${twitchUser.username}`)
                    ]);
                    
                    const isLive = !uptime.data.includes('offline');
                    
                    if (isLive && twitchUser.status === 'offline') {
                        const embed = new EmbedBuilder()
                            .setColor('#6441a5')
                            .setTitle(`¡${twitchUser.username} está en directo!`)
                            .setDescription(title.data || 'Sin título')
                            .setAuthor({ name: twitchUser.username, iconURL: `${avatar.data}`})
                            .addFields(
                                { name: 'Juego', value: game.data || 'Desconocido', inline: true },
                                { name: 'Tiempo en directo', value: uptime.data, inline: true }
                            )
                            .setImage(`https://static-cdn.jtvnw.net/previews-ttv/live_user_${twitchUser.username}-1920x1080.jpg`)
                            .setURL(`https://twitch.tv/${twitchUser.username}`)
                            .setTimestamp();

                        await channel.send({ content: `📌 @everyone ${twitchUser.username} está en directo en Twitch! <:twitch:1322635205261004961>`, embeds: [embed] });
                        twitchUser.status = 'online';
                        await notification.save();
                    } else if (!isLive && twitchUser.status === 'online') {
                        twitchUser.status = 'offline';
                        await notification.save();
                    }
                } catch (error) {
                    console.error(`Error al verificar el estado de ${twitchUser.username}:`, error.message);
                    if (error.response) {
                        console.error('Status:', error.response.status);
                        console.error('Data:', error.response.data);
                    }
                }
            }
        }
    }, 90000);
};