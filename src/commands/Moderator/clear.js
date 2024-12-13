const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    /** @type {import('commandkit').CommandData}  */
    data: new SlashCommandBuilder()
        .setName('clear')
        .setDescription('Limpia los mensajes del chat')
        .addIntegerOption(option => 
            option.setName('cantidad')
                .setDescription('La cantidad de mensajes a eliminar')
                .setRequired(true)
                .setMinValue(1)
                .setMaxValue(99))
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages),

    /**
     * @param {import('commandkit').SlashCommandProps} param0
     */
    run: async ({ interaction }) => {
        const cantidad = interaction.options.getInteger('cantidad');
        const embed = new EmbedBuilder();

        try {
            await interaction.channel.bulkDelete(cantidad, true);
            embed.setDescription(`Se han eliminado ${cantidad} mensajes.`).setColor('Green');
        } catch (error) {
            console.error('Error al eliminar mensajes.');
            embed.setDescription('Hubo un error al intentar eliminar los mensajes.').setColor('Red');
        }

        await interaction.reply({ embeds: [embed], ephemeral: true });
    },
};