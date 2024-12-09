const { SlashCommandBuilder, EmbedBuilder, Options } = require('discord.js');
module.exports = {
  /** @type {import('commandkit').CommandData}  */
  data: new SlashCommandBuilder()
    .setName('test')
    .setDescription('test!'),


  /**
   * @param {import('commandkit').SlashCommandProps} param0
   */
  run: async ({ interaction, client }) => {
    await interaction.deferReply();
    const reply = await interaction.fetchReply();
    const ping = reply.createdTimestamp - interaction.createdTimestamp;

    const embed = new EmbedBuilder();
    embed.setTitle('Pong! 🏓');
    embed.setDescription(`Latencia: ${ping}ms.\nWebsocket: ${client.ws.ping}ms. test`);
    embed.setColor('Random');

    interaction.editReply({
        embeds: [embed]
    });
  },
      /** @type {import('commandkit').CommandOptions} */
      options: {
        deleted: true,
    },
};

