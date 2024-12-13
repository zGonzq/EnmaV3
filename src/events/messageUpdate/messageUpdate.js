const { EmbedBuilder } = require('discord.js');
const Logs = require('../../models/logs');

/**
 * @param {import('discord.js').Message} oldMessage
 * @param {import('discord.js').Message} newMessage
 */
module.exports = async (oldMessage, newMessage) => {
  const ignoredChannels = ['1188964850282541157', '1180196042550038548'];

  if (ignoredChannels.includes(newMessage.channel.id)) return;

  const guild = newMessage.guild;
  const logSettings = await Logs.findOne({ guildId: guild.id });

  if (!logSettings || !logSettings.enabled) return;

  const logChannel = guild.channels.cache.get(logSettings.logChannelId);
  if (!logChannel) return;

  if (newMessage.author.bot) return;

  const embed = new EmbedBuilder()
    .setTitle('Mensaje Actualizado')
    .setDescription(`Un mensaje de ${oldMessage.author.tag} ha sido actualizado en el canal ${oldMessage.channel}.`)
    .setColor('Yellow')
    .setTimestamp();

  logChannel.send({ embeds: [embed] });
};