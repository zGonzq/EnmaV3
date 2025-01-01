const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    /** @type {import('commandkit').CommandData}  */
    data: new SlashCommandBuilder()
        .setName('nick')
        .setDescription('Cambia el apodo de un usuario')
        .addUserOption(option => 
            option.setName('usuario')
                .setDescription('El usuario cuyo apodo deseas cambiar')
                .setRequired(true))
        .addStringOption(option => 
            option.setName('apodo')
                .setDescription('El nuevo apodo')
                .setRequired(true))
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageNicknames),

    /**
     * @param {import('commandkit').SlashCommandProps} param0
     */
    run: async ({ interaction }) => {
        const user = interaction.options.getUser('usuario');
        const nickname = interaction.options.getString('apodo');
        const member = await interaction.guild.members.fetch(user.id);
        const embed = new EmbedBuilder();

        try {
            await member.setNickname(nickname);
            embed.setDescription(`El apodo de ${user.tag} ha sido cambiado a ${nickname}.`).setColor('Green');
        } catch (error) {
            console.error('Error al cambiar el apodo:', error);
            embed.setDescription('Hubo un error al intentar cambiar el apodo.').setColor('Red');
        }

        return interaction.reply({ embeds: [embed], ephemeral: true });
    }
};