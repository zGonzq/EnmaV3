const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const economy = require('../../models/economy');

module.exports = {
  /** @type {import('commandkit').CommandData}  */
  data: new SlashCommandBuilder()
    .setName('givemoney')
    .setDescription('Da dinero a tu usuario para testing')
    .addIntegerOption(option => option.setName('cantidad').setDescription('La cantidad de dinero a dar').setRequired(true)),

  /**
   * @param {import('commandkit').SlashCommandProps} param0
   */
  run: async ({ interaction }) => {
    const embed = new EmbedBuilder();
    const developerId = '944060279082340433';

    if (interaction.user.id !== developerId) {
      return interaction.reply({ embeds: [embed.setDescription('No tienes permisos para usar este comando.').setColor('Red')], ephemeral: true });
    }

    const amount = interaction.options.getInteger('cantidad');
    if (amount <= 0) {
      return interaction.reply({ embeds: [embed.setDescription('La cantidad debe ser un número positivo.').setColor('Red')], ephemeral: true });
    }

    let data = await economy.findOne({ userId: developerId, guildId: interaction.guild.id });

    if (!data) {
      data = new economy({
        userId: developerId,
        guildId: interaction.guild.id,
      });
      await data.save();
    }

    data.balance += amount;
    await data.save();

    embed.setTitle('Dinero añadido').setDescription(`Se han añadido ${amount} monedas a tu cuenta. Ahora tienes ${data.balance} monedas.`).setColor('Green');
    interaction.reply({ embeds: [embed], ephemeral: true });
  },

  /** @type {import('commandkit').CommandOptions} */
  options: {
    devOnly: true,
  },
};