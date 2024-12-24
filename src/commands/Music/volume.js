const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
      /** @type {import('commandkit').CommandOptions} */
  options: {
    devOnly: true,
  },
    data: new SlashCommandBuilder()
        .setName('volume')
        .setDescription('Ajusta el volumen de la música')
        .addIntegerOption(option => option.setName('level').setDescription('El nivel de volumen (0-100)').setRequired(true)),
    async run({ interaction, client }) {
        const level = interaction.options.getInteger('level');
        if (level < 0 || level > 100) {
            const embed = new EmbedBuilder()
                .setColor('#FF0000')
                .setDescription('El nivel de volumen debe estar entre 0 y 100.');
            return interaction.reply({ embeds: [embed] });
        }

        const queue = client.distube.getQueue(interaction.guild.id);
        if (!queue) {
            const embed = new EmbedBuilder()
                .setColor('#FF0000')
                .setDescription('No hay ninguna canción reproduciéndose.');
            return interaction.reply({ embeds: [embed] });
        }

        client.distube.setVolume(interaction.guild.id, level);
        const embed = new EmbedBuilder()
            .setColor('#00FF00')
            .setDescription(`El volumen ha sido ajustado a ${level}%.`);
        interaction.reply({ embeds: [embed] });
    }
};