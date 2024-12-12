const { EmbedBuilder } = require('discord.js');
const Logs = require('../../models/logs');

/**
 * @param {import('discord.js').GuildMember} oldMember
 * @param {import('discord.js').GuildMember} newMember
 */
module.exports = async (oldMember, newMember) => {
  const guild = newMember.guild;
  const logSettings = await Logs.findOne({ guildId: guild.id });

  if (!logSettings || !logSettings.enabled) return;

  const logChannel = guild.channels.cache.get(logSettings.logChannelId);
  if (!logChannel) return;

  const embed = new EmbedBuilder()
    .setTitle('Usuario Actualizado')
    .setDescription(`El usuario ${oldMember.user.tag} ha sido actualizado.`)
    .setColor('Yellow')
    .setTimestamp();

  logChannel.send({ embeds: [embed] });
};