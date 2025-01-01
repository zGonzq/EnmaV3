const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    /** @type {import('commandkit').CommandData}  */
    data: new SlashCommandBuilder()
        .setName('unban')
        .setDescription('Desbanea a un usuario del servidor')
        .addStringOption(option => 
            option.setName('userid')
                .setDescription('La ID del usuario que deseas desbanear')
                .setRequired(true))
        .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers),

    /**
     * @param {import('commandkit').SlashCommandProps} param0
     */
    run: async ({ interaction }) => {
        const userId = interaction.options.getString('userid');
        const embed = new EmbedBuilder();

        try {
            await interaction.guild.members.unban(userId);
            embed.setDescription(`El usuario con ID ${userId} ha sido desbaneado.`).setColor('Green');
        } catch (error) {
            console.error('Error al desbanear al usuario:', error);
            embed.setDescription('Hubo un error al intentar desbanear al usuario.').setColor('Red');
        }

        return interaction.reply({ embeds: [embed], ephemeral: true });
    }
};