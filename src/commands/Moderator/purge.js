const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    /** @type {import('commandkit').CommandData}  */
    data: new SlashCommandBuilder()
        .setName('purge')
        .setDescription('Elimina todos los mensajes de un usuario en el canal actual')
        .addUserOption(option => 
            option.setName('usuario')
                .setDescription('El usuario cuyos mensajes deseas eliminar')
                .setRequired(true))
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages),

    /**
     * @param {import('commandkit').SlashCommandProps} param0
     */
    run: async ({ interaction }) => {
        const user = interaction.options.getUser('usuario');
        const embed = new EmbedBuilder();

        try {
            const messages = await interaction.channel.messages.fetch({ limit: 100 });
            const userMessages = messages.filter(msg => msg.author.id === user.id);

            await interaction.channel.bulkDelete(userMessages, true);
            embed.setDescription(`Se han eliminado ${userMessages.size} mensajes de ${user.tag}.`).setColor('Green');
        } catch (error) {
            console.error('Error al eliminar mensajes:', error);
            embed.setDescription('Hubo un error al intentar eliminar los mensajes.').setColor('Red');
        }

        return interaction.reply({ embeds: [embed], ephemeral: true });
    }
};