const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js');
const Moderation = require('../../models/moderation');

module.exports = {
    /** @type {import('commandkit').CommandData}  */
    data: new SlashCommandBuilder()
        .setName('clearwarns')
        .setDescription('Elimina todas las advertencias de un usuario')
        .addUserOption(option => 
            option.setName('usuario')
                .setDescription('El usuario cuyas advertencias deseas eliminar')
                .setRequired(true))
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages),

    /**
     * @param {import('commandkit').SlashCommandProps} param0
     */
    run: async ({ interaction }) => {
        const user = interaction.options.getUser('usuario');
        const embed = new EmbedBuilder();

        try {
            await Moderation.deleteMany({ userId: user.id, action: 'warn' });
            embed.setDescription(`Se han eliminado todas las advertencias de ${user.tag}.`).setColor('Green');
        } catch (error) {
            console.error('Error al eliminar advertencias:', error);
            embed.setDescription('Hubo un error al intentar eliminar las advertencias.').setColor('Red');
        }

        return interaction.reply({ embeds: [embed], ephemeral: true });
    }
};