const { EmbedBuilder } = require('discord.js');
const Logs = require('../../models/logs');

/**
 * @param {import('discord.js').Guild} oldGuild
 * @param {import('discord.js').Guild} newGuild
 */
module.exports = async (oldGuild, newGuild) => {
  const logSettings = await Logs.findOne({ guildId: newGuild.id });

  if (!logSettings || !logSettings.enabled) return;

  const logChannel = newGuild.channels.cache.get(logSettings.logChannelId);
  if (!logChannel) return;

  const embed = new EmbedBuilder()
    .setTitle('Guild Actualizada')
    .setThumbnail(newGuild.iconURL())
    .setImage(newGuild.bannerURL({ size: 1024 }))
    .addFields(
      { name: 'Nombre', value: `${newGuild.name}` },
      { name: 'Región', value: `${newGuild.region}` },
      { name: 'Nivel de verificación', value: `${newGuild.verificationLevel}` },
      { name: 'Filtro de contenido explícito', value: `${newGuild.explicitContentFilter}` },
      { name: 'Dueño', value: `<@${newGuild.ownerId}>` },
      { name: 'Banner', value: newGuild.bannerURL({ dynamic: true }) ? "** **" : "No tiene banner" }
    )
    .setColor('Yellow')
    .setTimestamp();

  logChannel.send({ embeds: [embed] });
};