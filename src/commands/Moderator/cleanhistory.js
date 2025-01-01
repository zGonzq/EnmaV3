const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js');
const Moderation = require('../../models/moderation');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('cleanhistory')
        .setDescription('Elimina el historial de sanciones de un usuario')
        .addUserOption(option => 
            option.setName('usuario')
                .setDescription('El usuario cuyo historial de sanciones deseas eliminar')
                .setRequired(true))
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages),

    run: async ({ interaction }) => {
        const user = interaction.options.getUser('usuario');
        const embed = new EmbedBuilder();

        try {
            const result = await Moderation.deleteMany({ userId: user.id, guildId: interaction.guild.id });
            embed.setDescription(`Se ha eliminado el historial de sanciones de ${user.tag}.`).setColor('Green');
        } catch (error) {
            console.error('Error al eliminar el historial de sanciones:', error);
            embed.setDescription('Hubo un error al intentar eliminar el historial de sanciones.').setColor('Red');
        }

        return interaction.reply({ embeds: [embed], ephemeral: true });
    }
};