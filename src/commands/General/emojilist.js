const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
module.exports = {
    /** @type {import('commandkit').CommandData}  */
    data: new SlashCommandBuilder()
        .setName('emojilist')
        .setDescription('Listar emojis del servidor'),
    /**
    * @param {import('commandkit').SlashCommandProps} param0
    */
    run: async ({ interaction, client, handler }) => {

        if (!interaction.guild) {
            const embed = new EmbedBuilder()
                .setTitle('Emoji')
                .setDescription('Este comando solo puede ser usado en un servidor.')
                .setColor('Red');
            return interaction.reply({ embeds: [embed], ephemeral: true });
        }

        const emojis = interaction.guild.emojis.cache.map(emoji => emoji.toString()).join(' ');

        if(!emojis) {
            const embed = new EmbedBuilder()
                .setTitle('Emoji')
                .setDescription('No hay emojis en este servidor.')
                .setColor('Red');
            return interaction.reply({ embeds: [embed], ephemeral: true });
        }

        interaction.reply({ content: emojis , ephemeral: true });
    },
};
