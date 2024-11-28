const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const economy = require('../../models/economy');

module.exports = {
  /** @type {import('commandkit').CommandData}  */
  data: new SlashCommandBuilder()
    .setName('pay')
    .setDescription('Paga a otro usuario una cantidad de monedas.')

    .addUserOption(option => option
        .setName('usuario')
        .setDescription('El usuario al que le pagarás.')
        .setRequired(true))

    .addIntegerOption(option => option
        .setName('cantidad')
        .setDescription('La cantidad de monedas que pagarás.')
        .setRequired(true)),

  /**
   * @param {import('commandkit').SlashCommandProps} param0
   */
  run: async ({ interaction, client, handler }) => {

    const embed = new EmbedBuilder();
        if (!interaction.guild) {
            return interaction.reply({ embeds: [embed.setDescription('Este comando solo está disponible en servidores.').setColor('Red')] });
        }

        const targetUser = interaction.options.getUser('usuario');
        const amount = interaction.options.getInteger('cantidad');

        if (targetUser.bot) {
            return interaction.reply({ embeds: [embed.setDescription('No puedes pagar a un bot.').setColor('Red')] });
        }

        if (amount <= 0) {
            return interaction.reply({ embeds: [embed.setDescription('La cantidad debe ser un número positivo.').setColor('Red')] });
        }

        let senderData = await economy.findOne({ userId: interaction.user.id, guildId: interaction.guild.id });
        let receiverData = await economy.findOne({ userId: targetUser.id, guildId: interaction.guild.id });

        if (!senderData) {
            senderData = new economy({
                userId: interaction.user.id,
                guildId: interaction.guild.id,
            });
            await senderData.save();
        }

        if (!receiverData) {
            receiverData = new economy({
                userId: targetUser.id,
                guildId: interaction.guild.id,
            });
            await receiverData.save();
        }

        if (senderData.balance < amount) {
            return interaction.reply({ embeds: [embed.setDescription('No tienes suficientes monedas para realizar esta transacción.').setColor('Red')] });
        }

        senderData.balance -= amount;
        receiverData.balance += amount;

        await senderData.save();
        await receiverData.save();

        interaction.reply({ embeds: [embed.setDescription(`Has pagado ${amount} monedas a ${targetUser.tag}.`).setColor('Green')] });
    },
};
