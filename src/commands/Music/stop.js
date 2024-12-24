const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('stop')
        .setDescription('Detiene la música y limpia la cola'),
    async run({ interaction, client }) {
        const queue = client.distube.getQueue(interaction.guild.id);
        if (!queue) {
            const embed = new EmbedBuilder()
                .setColor('#FF0000')
                .setDescription('No hay ninguna canción reproduciéndose.');
            return interaction.reply({ embeds: [embed] });
        }

        client.distube.stop(interaction.guild.id);
        queue.voiceChannel.leave();

        const embed = new EmbedBuilder()
            .setColor('#00FF00')
            .setDescription('La música ha sido detenida, la cola ha sido limpiada y el bot se ha desconectado del canal de voz.');
        interaction.reply({ embeds: [embed] });
    }
};