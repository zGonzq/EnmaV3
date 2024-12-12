const { EmbedBuilder } = require('discord.js');
const Logs = require('../../models/logs');

/**
 * @param {import('discord.js').Invite} invite
 */
module.exports = async (invite) => {
  const guild = invite.guild;
  const logSettings = await Logs.findOne({ guildId: guild.id });

  if (!logSettings || !logSettings.enabled) return;

  const logChannel = guild.channels.cache.get(logSettings.logChannelId);
  if (!logChannel) return;

  const embed = new EmbedBuilder()
    .setTitle('Invitación Creada')
    .setDescription(`Una nueva invitación ha sido creada por ${invite.inviter.tag}.`)
    .setColor('Blue')
    .setTimestamp();

  logChannel.send({ embeds: [embed] });
};