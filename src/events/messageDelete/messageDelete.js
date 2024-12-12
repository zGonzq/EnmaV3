const { EmbedBuilder } = require('discord.js');
const Logs = require('../../models/logs');

/**
 * @param {import('discord.js').Message} message
 */
module.exports = async (message) => {
  const guild = message.guild;
  const logSettings = await Logs.findOne({ guildId: guild.id });

  if (!logSettings || !logSettings.enabled) return;

  const logChannel = guild.channels.cache.get(logSettings.logChannelId);
  if (!logChannel) return;

  const embed = new EmbedBuilder()
    .setTitle('Mensaje Eliminado')
    .setDescription(`Un mensaje de ${message.author.tag} ha sido eliminado en el canal ${message.channel}.`)
    .setColor('Red')
    .setTimestamp();

  logChannel.send({ embeds: [embed] });
};