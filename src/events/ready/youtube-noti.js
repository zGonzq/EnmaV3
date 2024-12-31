const { EmbedBuilder } = require('discord.js');
const axios = require('axios');
const Notifications = require('../../models/notifications');

module.exports = async (client) => {

    const getChannelIcon = async (channelId) => {
        try {
            const response = await axios.get(`https://www.googleapis.com/youtube/v3/channels?part=snippet&id=${channelId}&key=${process.env.YOUTUBE_API_KEY}`);
            return response.data.items[0].snippet.thumbnails.default.url;
        } catch (error) {   
            console.error('[YouTube] Error obteniendo icono de canal:', error.message);
            return null;
        }
    }

    const checkYoutubeChannel = async (channelId) => {
        try {
            const response = await axios.get(`https://www.googleapis.com/youtube/v3/channels?part=snippet&id=${channelId}&key=${process.env.YOUTUBE_API_KEY}`);
            return response.data.items.length > 0;
        } catch (error) {
            console.error('[YouTube] Error verificando canal:', error.message);
            return false;
        }
    };

    const getLatestVideo = async (channelId) => {
        try {
            const response = await axios.get(`https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelId}&maxResults=1&order=date&type=video&key=${process.env.YOUTUBE_API_KEY}`);
            return response.data.items[0];
        } catch (error) {
            console.error('[YouTube] Error obteniendo último video:', error.message);
            return null;
        }
    };

    setInterval(async () => {
        const notifications = await Notifications.find();

        for (const notification of notifications) {
            if (!notification.youtube?.channelId) continue;

            const channel = client.channels.cache.get(notification.channelId);
            if (!channel) continue;

            try {
                const channelExists = await checkYoutubeChannel(notification.youtube.channelId);
                if (!channelExists) continue;

               const latestVideo = await getLatestVideo(notification.youtube.channelId);
                if (!latestVideo) continue;

                const videoId = latestVideo.id.videoId;
                const publishedAt = new Date(latestVideo.snippet.publishedAt);
                const now = new Date();
                const tenMinutesAgo = new Date(now - 20 * 60 * 1000);
                
                if (videoId !== notification.youtube.lastVideoId && publishedAt > tenMinutesAgo) {
                    const title = latestVideo.snippet.title || 'Sin título';
                    const description = latestVideo.snippet.description 
                        ? latestVideo.snippet.description.slice(0, 4000)
                        : 'Sin descripción';

                    const embed = new EmbedBuilder()
                        .setColor('#FF0000')
                        .setTitle(title)
                        .setURL(`https://www.youtube.com/watch?v=${videoId}`)
                        .setDescription(description)
                        .setAuthor({ name: latestVideo.snippet.channelTitle, iconURL: `${await getChannelIcon(notification.youtube.channelId)}` })
                        .setImage(latestVideo.snippet.thumbnails.high.url)
                        .addFields(
                            { name: 'Publicado', value: `<t:${Math.floor(new Date(latestVideo.snippet.publishedAt).getTime() / 1000)}:R>`, inline: true }
                        )
                        .setTimestamp();

                    await channel.send({ content: `📌 @everyone Nuevo video de ${latestVideo.snippet.channelTitle} en YouTube! <:youtube:1322635207282528256>`, embeds: [embed] });

                    notification.youtube.lastVideoId = videoId;
                    await notification.save();
                }
            } catch (error) {
                console.error('[YouTube] Error en notificaciones:', error);
            }
        }
    }, 15 * 60 * 1000);
};