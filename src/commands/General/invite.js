const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
module.exports = {
  /** @type {import('commandkit').CommandData}  */
  data: new SlashCommandBuilder()
    .setName('invite')
    .setDescription('Invita al bot a tu servidor'),
  /**
   * @param {import('commandkit').SlashCommandProps} param0
   */
  run: async ({ interaction, client, handler }) => {
    const embed = new EmbedBuilder();
    embed.setTitle('¡Invitame a tu servidor!');
    embed.setDescription('¡Gracias por quererme en tu servidor! [Haz click aquí](https://discord.com/oauth2/authorize?client_id=1171876289632813148&permissions=8&integration_type=0&scope=bot) para invitarme a tu servidor.');
    embed.setColor('Blurple');
    await interaction.reply({
        embeds: [embed]
    });
  },
};
