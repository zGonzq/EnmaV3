const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
module.exports = {
    /** @type {import('commandkit').CommandData}  */
    data: new SlashCommandBuilder()
        .setName('emoji')
        .setDescription('Obtener el png de un emoji')
        .addStringOption(option => 
            option.setName('emoji')
                .setDescription('Emoji a buscar')
                .setRequired(true)
        ),
    /**
    * @param {import('commandkit').SlashCommandProps} param0
    */
    run: async ({ interaction, client, handler }) => {

        const emoji = interaction.options.getString('emoji');
        const emojiRegex = /<a?:\w+:(\d+)>/;

        if (!emoji.match(emojiRegex)) {
            const embed = new EmbedBuilder()
                .setTitle('Emoji')
                .setDescription('Debes ingresar un emoji válido.')
                .setColor('Red');
            return interaction.reply({ embeds: [embed], ephemeral: true });
    
        }

        const emojiId = emoji.match(emojiRegex)[1];

        if (!emojiId) {
            const embed = new EmbedBuilder()
                .setTitle('Emoji')
                .setDescription('Debes ingresar un emoji válido.')
                .setColor('Red');

            return interaction.reply({ embeds: [embed], ephemeral: true });
        }

        const emojiUrl = `https://cdn.discordapp.com/emojis/${emojiId}.webp`;

        const embed = new EmbedBuilder()
            .setTitle('Emoji')
            .setDescription(`[Descargar](${emojiUrl})`)
            .setImage(emojiUrl)
            .setFooter({ text: `Si el emoji es un gif cambia la extensión a .gif` })
            .setColor('Random');
        interaction.reply({ embeds: [embed] });
    },
};
