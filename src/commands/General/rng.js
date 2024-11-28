const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
module.exports = {
  /** @type {import('commandkit').CommandData}  */
  data: new SlashCommandBuilder()
    .setName('rng')
    .setDescription('Genera un número aleatorio')
    .addIntegerOption((option) => option
      .setName('minimo')
      .setDescription('El número mínimo')
      .setMinValue(1)
      .setRequired(true))
    .addIntegerOption((option) => option
      .setName('maximo')
      .setDescription('El número máximo')
      .setMinValue(2)
      .setRequired(true)),

  /**
   * @param {import('commandkit').SlashCommandProps} param0
   */
  run: async ({ interaction, client, handler }) => {

    const min = interaction.options.getInteger("minimo");
    const max = interaction.options.getInteger("maximo");

    const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    const embed = new EmbedBuilder()

    embed.setTitle('Número aleatorio')
    embed.setDescription(`Tu número aleatorio es: ${randomNumber}`)
    embed.setColor('Random')

    await interaction.reply({ embeds: [embed] });
  },
};
