const { SlashCommandBuilder, EmbedBuilder, PermissionsBitField, Integration } = require('discord.js');
const WelcomeSettings = require('../../models/welcomeSettings'); // Asegúrate de tener un modelo para almacenar la configuración

module.exports = {
  data: new SlashCommandBuilder()
    .setName('welcomemsg')
    .setDescription('Configura los mensajes de bienvenida y despedida')
    .setDefaultMemberPermissions(PermissionsBitField.Flags.Administrator)
    .addSubcommand(subcommand =>
      subcommand
        .setName('enable')
        .setDescription('Habilita los mensajes de bienvenida y despedida')
        .addChannelOption(option => option.setName('welcomechannel').setDescription('Canal para los mensajes de bienvenida').setRequired(true))
        .addChannelOption(option => option.setName('leavechannel').setDescription('Canal para los mensajes de despedida').setRequired(true))
        .addRoleOption(option => option.setName('userrole').setDescription('Rol para los nuevos usuarios').setRequired(false))
        .addRoleOption(option => option.setName('botrole').setDescription('Rol para los nuevos bots').setRequired(false)))
    .addSubcommand(subcommand =>
      subcommand
        .setName('status')
        .setDescription('Muestra el estado de los mensajes de bienvenida y despedida'))
    .addSubcommand(subcommand =>
      subcommand
        .setName('disable')
        .setDescription('Deshabilita los mensajes de bienvenida y despedida')),


    /*
    * @param {import('commandkit').SlashCommandProps} param0
    * @param {import('discord.js').Client} param0.client
    * 
    */
  run: async ({ interaction }) => {
    const embed = new EmbedBuilder();
    const subcommand = interaction.options.getSubcommand();

    if (subcommand === 'enable') {
      const welcomeChannel = interaction.options.getChannel('welcomechannel');
      const leaveChannel = interaction.options.getChannel('leavechannel');
      const userRole = interaction.options.getRole('userrole');
      const botRole = interaction.options.getRole('botrole');

      let settings = await WelcomeSettings.findOne({ guildId: interaction.guild.id });
      if (!settings) {
        settings = new WelcomeSettings({ guildId: interaction.guild.id });
      }

      settings.welcomeChannel = welcomeChannel.id;
      settings.leaveChannel = leaveChannel.id;
      settings.userRole = userRole ? userRole.id : null;
      settings.botRole = botRole ? botRole.id : null;
      await settings.save();

      embed.setTitle('Configuración Guardada')
        .setDescription('Los mensajes de bienvenida y despedida han sido habilitados.')
        .setColor('Green');
      interaction.reply({ embeds: [embed] });

    } else if (subcommand === 'status') {
      const settings = await WelcomeSettings.findOne({ guildId: interaction.guild.id });

      if (!settings) {
        embed.setDescription('Los mensajes de bienvenida y despedida no están habilitados.')
          .setColor('Red');
      } else {
        embed.setTitle('Estado de los Mensajes de Bienvenida y Despedida')
          .setDescription(`**Canal de Bienvenida:** <#${settings.welcomeChannel}>\n**Canal de Despedida:** <#${settings.leaveChannel}>\n**Rol para Usuarios:** ${settings.userRole ? `<@&${settings.userRole}>` : 'No asignado'}\n**Rol para Bots:** ${settings.botRole ? `<@&${settings.botRole}>` : 'No asignado'}`)
          .setColor('Blue');
      }
      interaction.reply({ embeds: [embed] });

    } else if (subcommand === 'disable') {
      await WelcomeSettings.deleteOne({ guildId: interaction.guild.id });

      embed.setTitle('Configuración Eliminada')
        .setDescription('Los mensajes de bienvenida y despedida han sido deshabilitados.')
        .setColor('Red');
      interaction.reply({ embeds: [embed] });
    }
  },
};