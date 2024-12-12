const { EmbedBuilder } = require('discord.js');
const Logs = require('../../models/logs');

/**
 * @param {import('discord.js').GuildMember} member
 */
module.exports = async (member) => {
  if (member.user.bot) return;

  const guild = member.guild;
  const logSettings = await Logs.findOne({ guildId: guild.id });

  if (!logSettings || !logSettings.enabled) return;

  const logChannel = guild.channels.cache.get(logSettings.logChannelId);
  if (!logChannel) return;

  const embed = new EmbedBuilder()
    .setTitle('Usuario Añadido')
    .setDescription(`El usuario ${member.user.tag} ha sido añadido al servidor.`)
    .setColor('Green')
    .setTimestamp();

  logChannel.send({ embeds: [embed] });
};