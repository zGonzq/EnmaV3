const { EmbedBuilder } = require('discord.js');

module.exports = (client) => {
    client.distube.on('playSong', (queue, song) => {
        const embed = new EmbedBuilder()
            .setColor('#00FF00')
            .setTitle(`Reproduciendo ahora:`)
            .setURL(song.url)
            .setThumbnail(song.thumbnail)
            .addFields(
                { name: 'Autor', value: song.uploader.name, inline: true },
                { name: 'Duración', value: song.formattedDuration, inline: true },
                { name: 'Solicitado por', value: song.user.tag, inline: true }
            )
            .setDescription(`**${song.name}**`);
        queue.textChannel.send({ embeds: [embed] });
    });

    client.distube.on('addSong', async (queue, song) => {
        const embed = new EmbedBuilder()
            .setColor('#00FF00')
            .setTitle(`Canción añadida:`)
            .setURL(song.url)
            .setThumbnail(song.thumbnail)
            .addFields(
                { name: 'Autor', value: song.uploader.name, inline: true },
                { name: 'Duración', value: song.formattedDuration, inline: true },
                { name: 'Solicitado por', value: song.user.tag, inline: true }
            )
            .setDescription(`**${song.name}**`);

        // Fetch the last message in the text channel
        const messages = await queue.textChannel.messages.fetch({ limit: 1 });
        const lastMessage = messages.first();

        if (lastMessage && lastMessage.author.id === client.user.id) {
            const lastEmbed = lastMessage.embeds[0];
            if (lastEmbed && lastEmbed.fields.some(field => field.name === 'Autor' && field.name === 'Duración' && field.name === 'Solicitado por')) {
                // Edit the last message if it was sent by the bot and contains music fields
                await lastMessage.edit({ embeds: [embed] });
            } else {
                // Send a new message if the last message was not sent by the bot or does not contain music fields
                await queue.textChannel.send({ embeds: [embed] });
            }
        } else {
            // Send a new message if the last message was not sent by the bot
            await queue.textChannel.send({ embeds: [embed] });
        }
    });
};