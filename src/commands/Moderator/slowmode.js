const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    /** @type {import('commandkit').CommandData}  */
    data: new SlashCommandBuilder()
        .setName('slowmode')
        .setDescription('Configura el modo lento del canal actual')
        .addIntegerOption(option => 
            option.setName('segundos')
                .setDescription('El tiempo en segundos para el modo lento (0 para deshabilitar)')
                .setMinValue(0)
                .setRequired(true))
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels),

    /**
     * @param {import('commandkit').SlashCommandProps} param0
     */
    run: async ({ interaction }) => {
        const seconds = interaction.options.getInteger('segundos');
        const embed = new EmbedBuilder();

        try {
            await interaction.channel.setRateLimitPerUser(seconds);
            embed.setDescription(`El modo lento ha sido configurado a ${seconds} segundos.`).setColor('Green');
        } catch (error) {
            console.error('Error al configurar el modo lento:', error);
            embed.setDescription('Hubo un error al intentar configurar el modo lento.').setColor('Red');
        }

        return interaction.reply({ embeds: [embed], ephemeral: true });
    }
};