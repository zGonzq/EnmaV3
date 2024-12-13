const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
module.exports = {
  /** @type {import('commandkit').CommandData}  */
  data: new SlashCommandBuilder()
    .setName('reload')
    .setDescription('Recarga algunos archivos del bot')
    .addSubcommand((subcommand) => subcommand
      .setName('all')
      .setDescription('Recarga todos los archivos'))
    .addSubcommand((subcommand) => subcommand
      .setName('events')
      .setDescription('Recarga todos los eventos'))
    .addSubcommand((subcommand) => subcommand
      .setName('commands')
      .setDescription('Recarga todos los comandos')),


  /**
   * @param {import('commandkit').SlashCommandProps} param0
   */
  run: async ({ interaction, client, handler }) => {

    const embed = new EmbedBuilder();

    const subCommand = interaction.options.getSubcommand(); 

    if (subCommand === 'all') {
        embed.setDescription('Todos los archivos han sido recargados.');
        interaction.reply({ embeds: [embed] });
        await handler.reloadCommands();
        await handler.reloadEvents();
        await handler.reloadValidations();



    } else if (subCommand === 'events') {
        embed.setDescription('Los eventos han sido recargados.');
        interaction.reply({ embeds: [embed] });
        await handler.reloadEvents();


    } else if (subCommand === 'commands') {
                embed.setDescription('Los comandos han sido recargados.');
        interaction.reply({ embeds: [embed] });
        await handler.reloadCommands();

    }
    
  },
  /** @type {import('commandkit').CommandOptions} */
  options: {
    devOnly: true,
  },
};
