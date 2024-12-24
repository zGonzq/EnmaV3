const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
/** @type {import('commandkit').CommandOptions} */
  options: {
    devOnly: true,
  },
    data: new SlashCommandBuilder()
        .setName('next')
        .setDescription('Salta a la siguiente canción en la cola'),
    async run({ interaction, client }) {
        const queue = client.distube.getQueue(interaction.guild.id);
        if (!queue) {
            const embed = new EmbedBuilder()
                .setColor('#FF0000')
                .setDescription('No hay ninguna canción en la cola.');
            return interaction.reply({ embeds: [embed] });
        }

        client.distube.skip(interaction.guild.id);
        const embed = new EmbedBuilder()
            .setColor('#00FF00')
            .setDescription('Saltado a la siguiente canción.');
        interaction.reply({ embeds: [embed] });
    }
};