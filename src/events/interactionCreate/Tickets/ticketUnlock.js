const { EmbedBuilder, PermissionsBitField } = require('discord.js');

module.exports = async (interaction) => {
    if (!interaction.isButton() || !interaction.customId.startsWith('unlock_')) return;

    if (!interaction.member.permissions.has(PermissionsBitField.Flags.ManageChannels)) {
        return interaction.reply({
            embeds: [new EmbedBuilder().setDescription('No tienes permisos para desbloquear el ticket').setColor('Red')],
            ephemeral: true
        });
    }

    await interaction.channel.permissionOverwrites.edit(interaction.user.id, { SendMessages: true });

    return interaction.reply({
        embeds: [new EmbedBuilder().setDescription('El ticket ha sido desbloqueado').setColor('Green')],
        ephemeral: true
    });
};