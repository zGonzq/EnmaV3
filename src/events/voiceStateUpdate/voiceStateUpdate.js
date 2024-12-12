const { EmbedBuilder } = require('discord.js');
const Logs = require('../../models/logs');

/**
 * @param {import('discord.js').VoiceState} oldState
 * @param {import('discord.js').VoiceState} newState
 */
module.exports = async (oldState, newState) => {
  const guild = newState.guild;
  const logSettings = await Logs.findOne({ guildId: guild.id });

  if (!logSettings || !logSettings.enabled) return;

  const logChannel = guild.channels.cache.get(logSettings.logChannelId);
  if (!logChannel) return;

  const embed = new EmbedBuilder()
    .setTitle('Estado de Voz Actualizado')
    .setDescription(`El estado de voz de ${oldState.member.user.tag} ha sido actualizado.`)
    .setColor('Yellow')
    .setTimestamp();

  logChannel.send({ embeds: [embed] });
};