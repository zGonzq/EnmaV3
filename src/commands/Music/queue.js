const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('queue')
        .setDescription('Muestra la cola de reproducción'),
    async run({ interaction, client }) {
        const queue = client.distube.getQueue(interaction.guild.id);
        if (!queue) {
            const embed = new EmbedBuilder()
                .setColor('#FF0000')
                .setDescription('No hay ninguna canción en la cola.');
            return interaction.reply({ embeds: [embed] });
        }

        const queueString = queue.songs.map((song, index) => `${index + 1}. ${song.name}`).join('\n');
        const embed = new EmbedBuilder()
            .setColor('#00FF00')
            .setTitle('Cola de reproducción')
            .setDescription(queueString);
        interaction.reply({ embeds: [embed] });
    }
};