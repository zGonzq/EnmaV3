const { EmbedBuilder } = require('discord.js');
const Logs = require('../../models/logs');

/**
 * @param {import('discord.js').VoiceState} oldState
 * @param {import('discord.js').VoiceState} newState
 */
module.exports = async (oldState, newState) => {
  const guild = oldState.guild;

  const logSettings = await Logs.findOne({ guildId: guild.id });
  if (!logSettings || !logSettings.enabled) return;

  if (oldState.member.user.bot) return;
  if (oldState.channelId === newState.channelId) return;

  const logChannel = guild.channels.cache.get(logSettings.logChannelId);
  if (!logChannel) return;

  let title;
  let fields;
  let color;

  if (!oldState.channelId) {
    title = 'Miembro conectado';
    fields = [
      { name: 'Miembro', value: `${newState.member}` },
      { name: 'Canal', value: `${newState.channel}` },
    ];
    color = 'Green';
  } else if (!newState.channelId) {
    title = 'Miembro desconectado';
    fields = [
      { name: 'Miembro', value: `${oldState.member}` },
      { name: 'Canal anterior', value: `${oldState.channel}` },
    ];
    color = 'Red';
  } else {
    title = 'Movimiento de miembro';
    fields = [
      { name: 'Miembro', value: `${newState.member}` },
      { name: 'Canal anterior', value: `${oldState.channel ? oldState.channel : 'Ninguno'}` },
      { name: 'Canal nuevo', value: `${newState.channel}` },
    ];
    color = 'Blurple';
  }

  const embed = new EmbedBuilder()
    .setTitle(title)
    .addFields(fields)
    .setColor(color)
    .setTimestamp();

  logChannel.send({ embeds: [embed] });
};