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

  let description;
  if (oldMessage.embeds.length > 0 || newMessage.embeds.length > 0) {
    description = `Un mensaje de ${oldMessage.author.tag} ha sido actualizado en el canal ${oldMessage.channel}.\n\n**Contenido del mensaje:**\nEl contenido era un embed.`;
  } else {
    description = `Un mensaje de ${oldMessage.author.tag} ha sido actualizado en el canal ${oldMessage.channel}.`;
  }

  const embed = new EmbedBuilder()
    .setTitle('Mensaje Actualizado')
    .setDescription(description)
    .addFields(
      { name: 'Mensaje Anterior', value: oldMessage.content || 'N/A' },
      { name: 'Mensaje Actual', value: newMessage.content || 'N/A' }
    )
    .setColor('Yellow')
    .setTimestamp();

  logChannel.send({ embeds: [embed] });
};