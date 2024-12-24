const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('pause')
        .setDescription('Pausa la música'),
    async run({ interaction, client }) {
        const botVoiceChannelId = interaction.guild.members.me.voice.channelId;
        const userVoiceChannelId = interaction.member.voice.channelId;

        if (!userVoiceChannelId) {
            return interaction.reply({ content: '¡Debes estar en un canal de voz para usar este comando!', ephemeral: true });
        }

        if (botVoiceChannelId !== userVoiceChannelId) {
            return interaction.reply({ content: '¡No estás en el mismo canal de voz que yo!', ephemeral: true });
        }

        const queue = client.distube.getQueue(interaction.guild.id);
        if (!queue) {
            const embed = new EmbedBuilder()
                .setColor('#FF0000')
                .setDescription('No hay ninguna canción reproduciéndose.');
            return interaction.reply({ embeds: [embed] });
        }

        client.distube.pause(interaction.guild.id);
        const embed = new EmbedBuilder()
            .setColor('#00FF00')
            .setDescription('La música ha sido pausada.');
        interaction.reply({ embeds: [embed] });
    }
};