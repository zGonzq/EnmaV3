const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const economy = require('../../models/economy');
module.exports = {
    /** @type {import('commandkit').CommandData}  */
    data: new SlashCommandBuilder()
        .setName('daily')
        .setDescription('Reclama tus monedas diarias.'),
    /**
    * @param {import('commandkit').SlashCommandProps} param0
    */
    run: async ({ interaction, client, handler }) => {
    const embed = new EmbedBuilder();
    if (!interaction.guild) {
        return interaction.reply({ embeds: [embed.setDescription('Este comando solo está disponible en servidores.').setColor('Red')] });
    }

    let data = await economy.findOne({ userId: interaction.user.id, guildId: interaction.guild.id });
    
    if (!data) {
        data = new economy({
            userId: interaction.user.id,
            guildId: interaction.guild.id,
        });
        await data.save();
    }
    
    const now = new Date();
    const lastDaily = data.lastDaily;
    const diff = now - lastDaily;
    const diffHours = Math.floor(diff / 1000 / 60 / 60);

    if (diffHours < 24) {
        const hoursLeft = 24 - diffHours;
        return interaction.reply({ embeds: [embed.setTitle('Monedas diarias').setDescription(`Ya has reclamado tus monedas diarias. Puedes reclamar de nuevo en ${hoursLeft} horas.`).setColor('Red')] });
    }

    const earned = Math.floor(Math.random() * 201) + 800;
    data.balance += earned;
    data.lastDaily = now;
    await data.save();

    interaction.reply({ embeds: [embed.setTitle('Monedas diarias').setDescription(`Has reclamado tus monedas diarias y ganado ${earned} monedas. Ahora tienes ${data.balance} monedas.`).setColor('Green')] });
    },
};
