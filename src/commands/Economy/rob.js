const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const economy = require('../../models/economy');

const successMessages = [
    "¡Has robado con éxito!",
    "¡El robo fue un éxito!",
    "¡Has logrado robar!",
    "¡Robo exitoso!",
    "¡Has conseguido las monedas!"
];

const failMessages = [
    "¡El robo ha fallado!",
    "¡Has sido atrapado!",
    "¡El robo no tuvo éxito!",
    "¡Has perdido monedas!",
    "¡El robo fue un desastre!"
];


module.exports = {
    /** @type {import('commandkit').CommandData}  */
    data: new SlashCommandBuilder()
        .setName('rob')
        .setDescription('Intenta robar monedas de otro usuario.')
        .addUserOption(option => option.setName('usuario').setDescription('El usuario al que quieres robar').setRequired(true))
        ,
    /**
    * @param {import('commandkit').SlashCommandProps} param0
    */
    run: async ({ interaction, client, handler }) => {
        const embed = new EmbedBuilder();
        if (!interaction.guild) {
            return interaction.reply({ embeds: [embed.setDescription('Este comando solo está disponible en servidores.').setColor('Red')] });
        }

        const targetUser = interaction.options.getUser('usuario');
        if (targetUser.id === interaction.user.id) {
            return interaction.reply({ embeds: [embed.setTitle('Error').setDescription('No puedes robarte a ti mismo.').setColor('Red')], ephemeral: true });
        }

        if (targetUser.bot) {
            return interaction.reply({ embeds: [embed.setTitle('Error').setDescription('No puedes robarle a un bot.').setColor('Red')], ephemeral: true });
        }

        let userData = await economy.findOne({ userId: interaction.user.id, guildId: interaction.guild.id });
        let targetData = await economy.findOne({ userId: targetUser.id, guildId: interaction.guild.id });

        if (!userData) {
            userData = new economy({
                userId: interaction.user.id,
                guildId: interaction.guild.id,
            });
            await userData.save();
        }

        if (!targetData) {
            targetData = new economy({
                userId: targetUser.id,
                guildId: interaction.guild.id,
            });
            await targetData.save();
        }

        if (targetData.balance === 0) {
            return interaction.reply({ embeds: [embed.setTitle('Robo fallido').setDescription('No puedes robarle el dinero a un niño.').setColor('Red')] });
        }

        const now = new Date();
        const lastRob = userData.lastRob;
        const diff = now - lastRob;
        const diffHours = Math.floor(diff / 1000 / 60 / 60);

        if (diffHours < 1) {
            const hoursLeft = 1 - diffHours;
            return interaction.reply({ embeds: [embed.setTitle('Robo').setDescription(`Ya has intentado robar recientemente. Puedes intentar de nuevo en ${hoursLeft} horas.`).setColor('Red')] });
        }

        userData.lastRob = now;

        const success = Math.random() < 0.3; // 30% chance of success
        if (success) {
            let stolenAmount;
            if (targetData.balance < 100) {
                stolenAmount = Math.floor(targetData.balance * 0.2);
            } else {
                stolenAmount = Math.floor(argetData.balance * 0.2); 
            }

            targetData.balance -= stolenAmount;
            userData.balance += stolenAmount;

            await targetData.save();
            await userData.save();

            const successMessage = successMessages[Math.floor(Math.random() * successMessages.length)];
            return interaction.reply({ embeds: [embed.setTitle('Robo exitoso').setDescription(`${successMessage} Has robado ${stolenAmount} monedas de ${targetUser.tag}. Ahora tienes ${userData.balance} monedas.`).setColor('Green')] });
        } else {
            const lostAmount = Math.floor(userData.balance * 0.3);
            userData.balance -= lostAmount;
            await userData.save();

            const failMessage = failMessages[Math.floor(Math.random() * failMessages.length)];
            return interaction.reply({ embeds: [embed.setTitle('Robo fallido').setDescription(`${failMessage} Has fallado en robar a ${targetUser.tag} y has perdido ${lostAmount} monedas. Ahora tienes ${userData.balance} monedas.`).setColor('Red')] });
        }
    },
};
