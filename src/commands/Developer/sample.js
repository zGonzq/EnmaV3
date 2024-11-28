const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
module.exports = {
    /** @type {import('commandkit').CommandData}  */
    data: new SlashCommandBuilder()
        .setName('sample')
        .setDescription('Sample command'),
    /**
    * @param {import('commandkit').SlashCommandProps} param0
    */
    run: async ({ interaction, client, handler }) => {
        interaction.reply({ content: 'Sample command', ephemeral: true });
    },

    /** @type {import('commandkit').CommandOptions} */
    options: {
        devOnly: true,
    },
};
