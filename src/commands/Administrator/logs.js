const { SlashCommandBuilder, EmbedBuilder, PermissionsBitField } = require('discord.js');
const Logs = require('../../models/logs');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('logs')
    .setDescription('Gestiona los logs del servidor')
    .setDefaultMemberPermissions(PermissionsBitField.Flags.Administrator)
    .addSubcommand(subcommand =>
      subcommand
        .setName('enable')
        .setDescription('Habilita los logs del servidor')
        .addChannelOption(option => option.setName('channel').setDescription('El canal donde se enviarán los logs').setRequired(true)))
    .addSubcommand(subcommand =>
      subcommand
        .setName('disable')
        .setDescription('Deshabilita los logs del servidor')),

  run: async ({ interaction }) => {
    const embed = new EmbedBuilder();
    const subcommand = interaction.options.getSubcommand();

    if (subcommand === 'enable') {
      const channel = interaction.options.getChannel('channel');

      let logSettings = await Logs.findOne({ guildId: interaction.guild.id });
      if (!logSettings) {
        logSettings = new Logs({ guildId: interaction.guild.id, logChannelId: channel.id, enabled: true });
      } else {
        logSettings.logChannelId = channel.id;
        logSettings.enabled = true;
      }
      await logSettings.save();

      embed.setTitle('Logs Habilitados').setDescription(`Los logs han sido habilitados en el canal ${channel}`).setColor('Green');
      interaction.reply({ embeds: [embed] });

    } else if (subcommand === 'disable') {
      let logSettings = await Logs.findOne({ guildId: interaction.guild.id });
      if (logSettings) {
        logSettings.enabled = false;
        await logSettings.save();
      }

      embed.setTitle('Logs Deshabilitados').setDescription('Los logs han sido deshabilitados').setColor('Red');
      interaction.reply({ embeds: [embed] });
    }
  },
};