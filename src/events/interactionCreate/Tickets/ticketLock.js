const { EmbedBuilder, PermissionsBitField } = require('discord.js');

module.exports = async (interaction) => {
    if (!interaction.isButton() || !interaction.customId.startsWith('lock_')) return;

    if (!interaction.member.permissions.has(PermissionsBitField.Flags.ManageChannels)) {
        return interaction.reply({
            embeds: [new EmbedBuilder().setDescription('No tienes permisos para bloquear el ticket').setColor('Red')],
            ephemeral: true
        });
    }

    await interaction.channel.permissionOverwrites.edit(interaction.user.id, { SendMessages: false });

    return interaction.reply({
        embeds: [new EmbedBuilder().setDescription('El ticket ha sido bloqueado').setColor('Green')],
        ephemeral: true
    });
};