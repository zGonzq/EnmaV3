const { EmbedBuilder } = require('discord.js');
const axios = require('axios');
const Notifications = require('../../models/notifications');
const { EmbedBuilder } = require('discord.js');

module.exports = async (client) => {
    const getYoutubeData = async (channelId) => {
        try {
            const response = await axios.get(
                `https://www.googleapis.com/youtube/v3/search?` +
                `part=snippet` +
                `&channelId=${channelId}` +
                `&maxResults=1` +
                `&order=date` +
                `&type=video` +
                `&key=${process.env.YOUTUBE_API_KEY}`
            );

            if (!response.data.items || response.data.items.length === 0) {
                return null;
            }

            const video = response.data.items[0];
            return {
                exists: true,
                videoId: video.id.videoId,
                title: video.snippet.title,
                description: video.snippet.description,
                thumbnail: video.snippet.thumbnails.high.url,
                channelTitle: video.snippet.channelTitle,
                publishedAt: video.snippet.publishedAt,
                channelIcon: video.snippet.thumbnails.default.url
            };
        } catch (error) {
            console.error('[YouTube] Error obteniendo datos:', error.message);
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
                const youtubeData = await getYoutubeData(notification.youtube.channelId);
                if (!youtubeData) continue;

                const publishedAt = new Date(youtubeData.publishedAt);
                const now = new Date();
                const MinutesAgo = new Date(now - 30 * 60 * 1000);

                if (youtubeData.videoId !== notification.youtube.lastVideoId && publishedAt > MinutesAgo) {
                    const embed = new EmbedBuilder()
                        .setColor('#FF0000')
                        .setTitle(youtubeData.title)
                        .setURL(`https://www.youtube.com/watch?v=${youtubeData.videoId}`)
                        .setDescription(youtubeData.description.slice(0, 4000))
                        .setAuthor({ name: youtubeData.channelTitle, iconURL: youtubeData.channelIcon })
                        .setImage(youtubeData.thumbnail)
                        .addFields(
                            { name: 'Publicado', value: `<t:${Math.floor(publishedAt.getTime() / 1000)}:R>`, inline: true }
                        )
                        .setTimestamp();

                    await channel.send({ 
                        content: `📌 @everyone Nuevo video de ${youtubeData.channelTitle} en YouTube! <:youtube:1322635207282528256>`, 
                        embeds: [embed] 
                    });

                    notification.youtube.lastVideoId = youtubeData.videoId;
                    await notification.save();
                }
            } catch (error) {
                console.error('[YouTube] Error en notificaciones:', error);
            }
        }
    }, 900000);
};