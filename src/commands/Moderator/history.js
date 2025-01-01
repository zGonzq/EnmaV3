const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js');
const Moderation = require('../../models/moderation');

module.exports = {
    /** @type {import('commandkit').CommandData}  */
    data: new SlashCommandBuilder()
        .setName('history')
        .setDescription('Muestra el historial de moderación de un usuario')
        .addUserOption(option => 
            option.setName('usuario')
                .setDescription('El usuario cuyo historial deseas ver')
                .setRequired(true))
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages),

    /**
     * @param {import('commandkit').SlashCommandProps} param0
     */
    run: async ({ interaction }) => {
        const user = interaction.options.getUser('usuario');
        const embed = new EmbedBuilder();

        try {
            const history = await Moderation.find({ userId: user.id });
            if (history.length === 0) {
                embed.setDescription(`No hay historial de moderación para ${user.tag}.`).setColor('Yellow');
            } else {
                const historyDescription = history.map(entry => `**Acción:** ${entry.action}\n**Razón:** ${entry.reason}\n**Fecha:** ${entry.timestamp.toLocaleString()}`).join('\n\n');
                embed.setTitle(`Historial de Moderación de ${user.tag}`).setDescription(historyDescription).setColor('Blue');
            }
        } catch (error) {
            console.error('Error al obtener el historial de moderación:', error);
            embed.setDescription('Hubo un error al intentar obtener el historial de moderación.').setColor('Red');
        }

        return interaction.reply({ embeds: [embed], ephemeral: true });
    }
};