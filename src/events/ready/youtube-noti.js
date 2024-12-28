const { EmbedBuilder } = require('discord.js');
const axios = require('axios');
const Notifications = require('../../models/notifications');
require('dotenv').config();

module.exports = async (client) => {
    const checkYoutubeChannel = async (channelId) => {
        try {
            const response = await axios.get(`https://www.googleapis.com/youtube/v3/channels?part=snippet&id=${channelId}&key=${process.env.YOUTUBE_API_KEY}`);
            return response.data.items.length > 0;
        } catch (error) {
            console.error('Error verificando canal de YouTube:', error);
            return false;
        }
    };

    const getLatestVideo = async (channelId) => {
        try {
            const response = await axios.get(`https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelId}&maxResults=1&order=date&type=video&key=${process.env.YOUTUBE_API_KEY}`);
            return response.data.items[0];
        } catch (error) {
            console.error('Error obteniendo último video:', error);
            return null;
        }
    };

    setInterval(async () => {
        const notifications = await Notifications.find();

        for (const notification of notifications) {
            if (!notification.youtube.channelId) continue;

            const channel = client.channels.cache.get(notification.channelId);
            if (!channel) continue;

            try {
                const channelExists = await checkYoutubeChannel(notification.youtube.channelId);
                if (!channelExists) {
                    console.log(`Canal de YouTube no encontrado: ${notification.youtube.channelId}`);
                    continue;
                }

                const latestVideo = await getLatestVideo(notification.youtube.channelId);
                if (!latestVideo) continue;

                const videoId = latestVideo.id.videoId;

                const publishedAt = new Date(latestVideo.snippet.publishedAt);
                const now = new Date();
                const fiveMinutesAgo = new Date(now - 5 * 60 * 1000);

                if (publishedAt > fiveMinutesAgo) {
                    // Validar y truncar la descripción
                    const description = latestVideo.snippet.description 
                        ? latestVideo.snippet.description.slice(0, 4096)
                        : 'Sin descripción';
                
                    const embed = new EmbedBuilder()
                        .setColor('#FF0000')
                        .setTitle(latestVideo.snippet.title)
                        .setURL(`https://www.youtube.com/watch?v=${videoId}`)
                        .setDescription(description)
                        .setThumbnail(latestVideo.snippet.thumbnails.high.url)
                        .addFields(
                            { name: 'Canal', value: latestVideo.snippet.channelTitle || 'Canal desconocido', inline: true },
                            { name: 'Publicado', value: `<t:${Math.floor(publishedAt.getTime() / 1000)}:R>`, inline: true }
                        )
                        .setTimestamp();
                
                    await channel.send({ content: '@everyone ¡Nuevo video!', embeds: [embed] });
                }
            } catch (error) {
                console.error('Error en notificaciones de YouTube:', error);
            }
        }
    }, 300000);
};