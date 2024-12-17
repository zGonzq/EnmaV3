const { EmbedBuilder } = require('discord.js');
const Logs = require('../../models/logs');

/**
 * @param {import('discord.js').Message} message
 */
module.exports = async (message) => {
  const guild = message.guild;
  const logSettings = await Logs.findOne({ guildId: guild.id });

  if (!logSettings || !logSettings.enabled) return;

  const logChannel = guild.channels.cache.get(logSettings.logChannelId);
  if (!logChannel) return;

  let description;
  if (message.embeds.length > 0) {
    description = `Un mensaje de ${message.author.tag} ha sido eliminado en el canal ${message.channel}.\n\n**Contenido del mensaje:**\nEl contenido era un embed.`;
  } else {
    description = `Un mensaje de ${message.author.tag} ha sido eliminado en el canal ${message.channel}.\n\n**Contenido del mensaje:**\n${message.content}`;
  }

  const embed = new EmbedBuilder()
    .setTitle('Mensaje Eliminado')
    .setDescription(description)
    .setColor('Red')
    .setTimestamp();

  logChannel.send({ embeds: [embed] });
};