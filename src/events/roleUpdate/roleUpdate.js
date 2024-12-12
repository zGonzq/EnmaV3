const { EmbedBuilder } = require('discord.js');
const Logs = require('../../models/logs');

/**
 * @param {import('discord.js').Role} oldRole
 * @param {import('discord.js').Role} newRole
 */
module.exports = async (oldRole, newRole) => {
  const guild = newRole.guild;
  const logSettings = await Logs.findOne({ guildId: guild.id });

  if (!logSettings || !logSettings.enabled) return;

  const logChannel = guild.channels.cache.get(logSettings.logChannelId);
  if (!logChannel) return;

  const embed = new EmbedBuilder()
    .setTitle('Rol Actualizado')
    .setDescription(`El rol ${oldRole.name} ha sido actualizado.`)
    .setColor('Yellow')
    .setTimestamp();

  logChannel.send({ embeds: [embed] });
};