const { EmbedBuilder } = require('discord.js');
const Logs = require('../../models/logs');

/**
 * @param {import('discord.js').Guild} oldGuild
 * @param {import('discord.js').Guild} newGuild
 */
module.exports = async (oldGuild, newGuild) => {
  const logSettings = await Logs.findOne({ guildId: newGuild.id });

  if (!logSettings || !logSettings.enabled) return;

  const logChannel = newGuild.channels.cache.get(logSettings.logChannelId);
  if (!logChannel) return;

  const embed = new EmbedBuilder()
    .setTitle('Servidor Actualizado')
    .setDescription(`El servidor ${oldGuild.name} ha sido actualizado.`)
    .setColor('Yellow')
    .setTimestamp();

  logChannel.send({ embeds: [embed] });
};