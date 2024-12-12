const { EmbedBuilder } = require('discord.js');
const Logs = require('../../models/logs');

/**
 * @param {import('discord.js').Client} client
 * @param {import('discord.js').Collection<string, import('discord.js').Message>} messages
 */
module.exports = async (client, messages) => {
  const guild = messages.first().guild;
  const logSettings = await Logs.findOne({ guildId: guild.id });

  if (!logSettings || !logSettings.enabled) return;

  const logChannel = guild.channels.cache.get(logSettings.logChannelId);
  if (!logChannel) return;

  const embed = new EmbedBuilder()
    .setTitle('Mensajes Eliminados en Masa')
    .setDescription(`${messages.size} mensajes fueron eliminados en el canal ${messages.first().channel}`)
    .setColor('Red')
    .setTimestamp();

  logChannel.send({ embeds: [embed] });
};