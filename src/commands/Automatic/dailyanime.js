const { SlashCommandBuilder, EmbedBuilder, PermissionsBitField } = require('discord.js');
const DailyAnime = require('../../models/dailyAnime');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('dailyanime')
    .setDescription('Configura el canal para recibir una recomendación diaria de anime')
    .setDefaultMemberPermissions(PermissionsBitField.Flags.ManageChannels)
    .addSubcommand(subcommand =>
      subcommand
        .setName('setup')
        .setDescription('Configura el canal para las recomendaciones diarias')
        .addChannelOption(option => 
          option.setName('channel')
            .setDescription('Canal donde se enviarán las recomendaciones')
            .setRequired(true)))
    .addSubcommand(subcommand =>
      subcommand
        .setName('disable')
        .setDescription('Desactiva las recomendaciones diarias')),

  run: async ({ interaction }) => {
    const embed = new EmbedBuilder();
    const subcommand = interaction.options.getSubcommand();

    if (subcommand === 'setup') {
      const channel = interaction.options.getChannel('channel');

      if (!channel.permissionsFor(interaction.guild.members.me).has(['ViewChannel', 'SendMessages'])) {
        return interaction.reply({
          embeds: [embed.setDescription('No tengo permisos para enviar mensajes en ese canal').setColor('Red')],
          ephemeral: true
        });
      }

      let config = await DailyAnime.findOne({ guildId: interaction.guild.id });
      if (config) {
        config.channelId = channel.id;
      } else {
        config = new DailyAnime({
          guildId: interaction.guild.id,
          channelId: channel.id
        });
      }
      await config.save();

      return interaction.reply({
        embeds: [embed.setDescription(`Las recomendaciones diarias de anime se enviarán en ${channel}`).setColor('Green')]
      });

    } else if (subcommand === 'disable') {
      await DailyAnime.findOneAndDelete({ guildId: interaction.guild.id });
      return interaction.reply({
        embeds: [embed.setDescription('Las recomendaciones diarias han sido desactivadas').setColor('Red')]
      });
    }
  }
};