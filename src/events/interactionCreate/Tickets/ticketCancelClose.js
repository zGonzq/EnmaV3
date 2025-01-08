const { EmbedBuilder } = require('discord.js');

module.exports = async (interaction) => {
    console.log('ticketCancelClose: Interaction received');
    if (!interaction.isButton() || !interaction.customId.startsWith('cancel_close_')) return;

    await interaction.reply({
        embeds: [new EmbedBuilder().setDescription('El cierre del ticket ha sido cancelado').setColor('Green')],
        ephemeral: true
    });
    console.log('ticketCancelClose: Cancellation message sent');
};      