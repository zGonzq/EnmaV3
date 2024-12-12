const { EmbedBuilder } = require('discord.js');
const Logs = require('../../models/logs');

/**
 * @param {import('discord.js').Role} role
 */
module.exports = async (role) => {
  const guild = role.guild;
  const logSettings = await Logs.findOne({ guildId: guild.id });

  if (!logSettings || !logSettings.enabled) return;

  const logChannel = guild.channels.cache.get(logSettings.logChannelId);
  if (!logChannel) return;

  const embed = new EmbedBuilder()
    .setTitle('Rol Creado')
    .setDescription(`El rol ${role.name} ha sido creado.`)
    .setColor('Green')
    .setTimestamp();

  logChannel.send({ embeds: [embed] });
};