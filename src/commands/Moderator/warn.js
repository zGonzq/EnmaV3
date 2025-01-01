const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js');
const Moderation = require('../../models/moderation');

module.exports = {
    /** @type {import('commandkit').CommandData}  */
    data: new SlashCommandBuilder()
        .setName('warn')
        .setDescription('Advierte a un usuario')
        .addUserOption(option => 
            option.setName('usuario')
                .setDescription('El usuario que deseas advertir')
                .setRequired(true))
        .addStringOption(option => 
            option.setName('razon')
                .setDescription('La razón de la advertencia')
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
            const moderationEntry = new Moderation({
                userId: user.id,
                guildId: interaction.guild.id,
                action: 'warn',
                reason,
                moderator: interaction.user.id,
                timestamp: new Date()
            });
            await moderationEntry.save();

            embed.setDescription(`El usuario ${user.tag} ha sido advertido.\nRazón: ${reason}`).setColor('Yellow');
        } catch (error) {
            console.error('Error al advertir al usuario:', error);
            embed.setDescription('Hubo un error al intentar advertir al usuario.').setColor('Red');
        }

        return interaction.reply({ embeds: [embed], ephemeral: true });
    }
};