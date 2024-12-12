const { EmbedBuilder } = require('discord.js');
const Logs = require('../../models/logs');

/**
 * @param {import('discord.js').GuildChannel} channel
 */
module.exports = async (channel) => {
  const guild = channel.guild;
  const logSettings = await Logs.findOne({ guildId: guild.id });

  if (!logSettings || !logSettings.enabled) return;

  const logChannel = guild.channels.cache.get(logSettings.logChannelId);
  if (!logChannel) return;

  const embed = new EmbedBuilder()
    .setTitle('Canal Eliminado')
    .setDescription(`El canal ${channel.name} ha sido eliminado.`)
    .setColor('Red')
    .setTimestamp();

  logChannel.send({ embeds: [embed] });
};