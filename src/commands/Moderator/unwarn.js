const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js');
const Moderation = require('../../models/moderation');

module.exports = {
    /** @type {import('commandkit').CommandData}  */
    data: new SlashCommandBuilder()
        .setName('unwarn')
        .setDescription('Elimina una advertencia de un usuario')
        .addUserOption(option => 
            option.setName('usuario')
                .setDescription('El usuario cuya advertencia deseas eliminar')
                .setRequired(true))
        .addStringOption(option => 
            option.setName('razon')
                .setDescription('La razón de la advertencia a eliminar')
                .setRequired(false))
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages),

    /**
     * @param {import('commandkit').SlashCommandProps} param0
     */
    run: async ({ interaction }) => {
        const user = interaction.options.getUser('usuario');
        const reason = interaction.options.getString('razon') || 'No especificada';
        const embed = new EmbedBuilder();

        try {
            const result = await Moderation.findOneAndDelete({ userId: user.id, action: 'warn', reason });
            if (result) {
                embed.setDescription(`Se ha eliminado una advertencia de ${user.tag}.\nRazón: ${reason}`).setColor('Green');
            } else {
                embed.setDescription(`No se encontró una advertencia para ${user.tag} con la razón especificada.`).setColor('Yellow');
            }
        } catch (error) {
            console.error('Error al eliminar la advertencia:', error);
            embed.setDescription('Hubo un error al intentar eliminar la advertencia.').setColor('Red');
        }

        return interaction.reply({ embeds: [embed], ephemeral: true });
    }
};