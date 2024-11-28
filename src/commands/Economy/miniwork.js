const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const economy = require('../../models/economy');
module.exports = {
    /** @type {import('commandkit').CommandData}  */
    data: new SlashCommandBuilder()
        .setName('miniwork')
        .setDescription('Trabaja por un corto período para ganar algunas monedas.'),
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

        const lastMiniwork = data.lastMiniwork;
        const now = new Date();
        const diff = now - lastMiniwork;
        const diffMinutes = Math.floor(diff / 1000 / 60);

        if (diffMinutes < 5) {
            const minutesLeft = 5 - diffMinutes;
            return interaction.reply({ embeds: [embed.setTitle('Trabajo pequeño').setDescription(`Ya has trabajado recientemente. Puedes trabajar de nuevo en ${minutesLeft} minutos.`).setColor('Red')] });
        }

        data.lastMiniwork = now;
        const earned = Math.floor(Math.random() * 50) + 5;
        data.balance += earned;
        await data.save();

        interaction.reply({ embeds: [embed.setTitle('Trabajo pequeño').setDescription(`Has trabajado y ganado ${earned} monedas. Ahora tienes ${data.balance} monedas.`).setColor('Green')] });
    },
};
