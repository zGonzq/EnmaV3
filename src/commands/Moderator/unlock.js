const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    /** @type {import('commandkit').CommandData}  */
    data: new SlashCommandBuilder()
        .setName('unlock')
        .setDescription('Desbloquea el canal actual')
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels),

    /**
     * @param {import('commandkit').SlashCommandProps} param0
     */
    run: async ({ interaction }) => {
        const embed = new EmbedBuilder();

        try {
            await interaction.channel.permissionOverwrites.edit(interaction.guild.roles.everyone, { SendMessages: true });
            embed.setDescription('El canal ha sido desbloqueado.').setColor('Green');
        } catch (error) {
            console.error('Error al desbloquear el canal:', error);
            embed.setDescription('Hubo un error al intentar desbloquear el canal.').setColor('Red');
        }

        return interaction.reply({ embeds: [embed], ephemeral: true });
    }
};