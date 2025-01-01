const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    /** @type {import('commandkit').CommandData}  */
    data: new SlashCommandBuilder()
        .setName('lock')
        .setDescription('Bloquea el canal actual')
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels),

    /**
     * @param {import('commandkit').SlashCommandProps} param0
     */
    run: async ({ interaction }) => {
        const embed = new EmbedBuilder();

        try {
            await interaction.channel.permissionOverwrites.edit(interaction.guild.roles.everyone, { SendMessages: false });
            embed.setDescription('El canal ha sido bloqueado.').setColor('Green');
        } catch (error) {
            console.error('Error al bloquear el canal:', error);
            embed.setDescription('Hubo un error al intentar bloquear el canal.').setColor('Red');
        }

        return interaction.reply({ embeds: [embed], ephemeral: true });
    }
};