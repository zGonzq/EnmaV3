const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  /** @type {import('commandkit').CommandData}  */
  data: new SlashCommandBuilder()
    .setName('serverlist')
    .setDescription('Enumera cada servidor en el que está el bot y cuántos jugadores hay por servidor'),

  /**
   * @param {import('commandkit').SlashCommandProps} param0
   */
  run: async ({ interaction, client }) => {
    const embed = new EmbedBuilder()
      .setTitle('Lista de Servidores')
      .setColor('Random');

    client.guilds.cache.forEach(guild => {
      embed.addFields({ name: guild.name, value: `Miembros: ${guild.memberCount}`, inline: false });
    });

    await interaction.reply({ embeds: [embed], ephemeral: true });
  },

  /** @type {import('commandkit').CommandOptions} */
  options: {
    devOnly: true,
  },
};