const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
module.exports = {
    /** @type {import('commandkit').CommandData}  */
    data: new SlashCommandBuilder()
        .setName('work')
        .setDescription('Trabaja para ganar monedas.'),
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

        const lastWork = data.lastWork;
        const now = new Date();
        const diff = now - lastWork;
        const diffMinutes = Math.floor(diff / 1000 / 60);

        if (diffMinutes < 30) {
            const minutesLeft = 30 - diffMinutes;
            return interaction.reply({ embeds: [embed.setTitle('Trabajo').setDescription(`Ya has trabajado recientemente. Puedes trabajar de nuevo en ${minutesLeft} minutos.`).setColor('Red')] });
        }

        data.lastWork = now;
        const earned = Math.floor(Math.random() * 201) + 100;
        data.balance += earned;
        await data.save();

        interaction.reply({ embeds: [embed.setTitle('Trabajo').setDescription(`Has trabajado y ganado ${earned} monedas. Ahora tienes ${data.balance} monedas.`).setColor('Green')] });
    
    },
};
