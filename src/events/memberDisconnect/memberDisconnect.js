const { EmbedBuilder } = require('discord.js');
const Logs = require('../../models/logs');

/**
 * @param {import('discord.js').GuildMember} member
 */
module.exports = async (member) => {
  const guild = member.guild;
  const logSettings = await Logs.findOne({ guildId: guild.id });

  if (!logSettings || !logSettings.enabled) return;

  const logChannel = guild.channels.cache.get(logSettings.logChannelId);
  if (!logChannel) return;

  const embed = new EmbedBuilder()
    .setTitle('Usuario Desconectado')
    .setDescription(`El usuario ${member.user.tag} se ha desconectado.`)
    .setColor('Red')
    .setTimestamp();

  logChannel.send({ embeds: [embed] });
};