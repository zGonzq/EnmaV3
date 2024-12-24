const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const ytSearch = require('yt-search');


module.exports = {
      /** @type {import('commandkit').CommandOptions} */
  options: {
    devOnly: true,
  },
    data: new SlashCommandBuilder()
        .setName('play')
        .setDescription('Reproduce una canción')
        .addStringOption(option => 
            option.setName('query')
                .setDescription('La canción que quieres reproducir')
                .setRequired(true)),
    async run({ interaction, client }) {
        const query = interaction.options.getString('query');
        const voiceChannel = interaction.member.voice.channel;

        if (!voiceChannel) {
            const embed = new EmbedBuilder()
                .setColor('#FF0000')
                .setDescription('¡Debes estar en un canal de voz para usar este comando!');
            return interaction.reply({ embeds: [embed] });
        }

        const botVoiceChannelId = interaction.guild.members.me.voice.channelId;
        const userVoiceChannelId = interaction.member.voice.channelId;

        if (botVoiceChannelId && botVoiceChannelId !== userVoiceChannelId) {
            return interaction.reply({ content: '¡No estás en el mismo canal de voz que yo!', ephemeral: true });
        }

        const searchingEmbed = new EmbedBuilder()
            .setColor('#FFFF00')
            .setDescription('🔍 Buscando la canción...');

        await interaction.reply({ embeds: [searchingEmbed] });

        try {
            let song;
            if (query.includes('youtube.com') || query.includes('youtu.be')) {
                song = { url: query, title: query, thumbnail: null, author: { name: 'Desconocido' }, timestamp: 'Desconocido' };

                const suggestionEmbed = new EmbedBuilder()
                    .setColor('#FFA500')
                    .setDescription('Prefiera utilizar búsquedas en lugar de URLs para una mejor experiencia.');
                await interaction.followUp({ embeds: [suggestionEmbed] });
            } else {
                const searchResults = await ytSearch(query);
                if (searchResults.videos.length === 0) {
                    const embed = new EmbedBuilder()
                        .setColor('#FF0000')
                        .setDescription('No se encontraron resultados para la búsqueda.');
                    return interaction.editReply({ embeds: [embed] });
                }
                song = searchResults.videos[0];
            }

            await client.distube.play(voiceChannel, song.url, {
                member: interaction.member,
                textChannel: interaction.channel,
                interaction
            });

            const embed = new EmbedBuilder()
                .setColor('#00FF00')
                .setDescription(`Canción agregada: **${song.title || query}**`);
            await interaction.editReply({ embeds: [embed] });
        } catch (error) {
            console.error(error);
            const embed = new EmbedBuilder()
                .setColor('#FF0000')
                .setDescription('Hubo un error al intentar reproducir la canción.');
            await interaction.editReply({ embeds: [embed] });
        }
    }
};