const { EmbedBuilder } = require('discord.js');
const Logs = require('../../models/logs');

/**
 * @param {import('discord.js').GuildBan} ban
 */
module.exports = async (ban) => {
  const guild = ban.guild;
  const logSettings = await Logs.findOne({ guildId: guild.id });

  if (!logSettings || !logSettings.enabled) return;

  const logChannel = guild.channels.cache.get(logSettings.logChannelId);
  if (!logChannel) return;

  const embed = new EmbedBuilder()
    .setTitle('Usuario Desbaneado')
    .setDescription(`El usuario ${ban.user.tag} ha sido desbaneado.`)
    .setColor('Green')
    .setTimestamp();

  logChannel.send({ embeds: [embed] });
};