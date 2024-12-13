const { EmbedBuilder } = require('discord.js');
const Logs = require('../../models/logs');

/**
 * @param {import('discord.js').Collection<string, import('discord.js').Message>} messages
 */
module.exports = async (messages) => {
  const guild = messages.first().guild;

  const config = await Logs.findOne({ guildId: guild.id });
  if (!config || !config.enabled) return;

  const channel = messages.first().channel;

  const log = await Logs.findOne({ guildId: guild.id });
  if (!log) return;

  const logChannel = guild.channels.cache.get(log.logChannelId);
  if (!logChannel) return;

  const embed = new EmbedBuilder()
    .setTitle('Mensajes eliminados en masa')
    .addFields(
      { name: 'Canal', value: `${channel}` },
      { name: 'Cantidad de mensajes', value: `${messages.size}` }
    )
    .setColor('DarkButNotBlack')
    .setTimestamp();

  logChannel.send({ embeds: [embed] });
};