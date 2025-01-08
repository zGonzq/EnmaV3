const { EmbedBuilder, PermissionsBitField, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const Ticket = require('../../../models/tickets');
const Logs = require('../../../models/logs');
const transcript = require('discord-html-transcripts');

module.exports = async (interaction) => {
    if (!interaction.isButton() || !interaction.customId.startsWith('close_')) return;

    const [_, uuid] = interaction.customId.split('_');

    const ticket = await Ticket.findOne({ channelId: interaction.channel.id });


    if (!ticket) {
        return interaction.reply({
            embeds: [new EmbedBuilder().setDescription('No se encontró el ticket').setColor('Red')],
            ephemeral: true
        });
    }

    if (interaction.user.id !== ticket.userId) {
        return interaction.reply({
            embeds: [new EmbedBuilder().setDescription('Solo el creador del ticket puede cerrarlo').setColor('Red')],
            ephemeral: true
        });
    }

    const confirmButton = new ButtonBuilder()
        .setCustomId(`confirm_close_${uuid}`)
        .setLabel('Confirmar')
        .setStyle(ButtonStyle.Danger);

    const cancelButton = new ButtonBuilder()
        .setCustomId(`cancel_close_${uuid}`)
        .setLabel('Cancelar')
        .setStyle(ButtonStyle.Secondary);

    const row = new ActionRowBuilder().addComponents(confirmButton, cancelButton);

    const embed = new EmbedBuilder()
        .setTitle('Confirmar cierre')
        .setDescription('¿Estás seguro de que quieres cerrar el ticket?')
        .setColor('Red');

    await interaction.reply({ embeds: [embed], components: [row], ephemeral: true });
};