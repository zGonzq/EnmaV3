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
    const embeds = [];
    let embed = new EmbedBuilder()
      .setTitle('Lista de Servidores')
      .setColor('Random');

    let count = 0;

    for (const guild of client.guilds.cache.values()) {
      const owner = await guild.fetchOwner();
      if (count === 25) {
        embeds.push(embed);
        embed = new EmbedBuilder()
          .setTitle('Lista de Servidores (continuación)')
          .setColor('Random');
        count = 0;
      }
      embed.addFields({ 
        name: guild.name, 
        value: `Miembros: ${guild.memberCount}\nPropietario: ${owner.user.tag}`, 
        inline: false 
      });
      count++;
    }

    if (count > 0) {
      embeds.push(embed);
    }

    await interaction.reply({ embeds: embeds, ephemeral: true });
  },

  /** @type {import('commandkit').CommandOptions} */
  options: {
    devOnly: true,
  },
};