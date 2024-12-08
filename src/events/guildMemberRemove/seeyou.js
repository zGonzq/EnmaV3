const { EmbedBuilder, PermissionsBitField } = require('discord.js');
const WelcomeSettings = require('../../models/welcomeSettings');

/**
 * @param {import('discord.js').GuildMember} member
 */
module.exports = async (member) => {
  const settings = await WelcomeSettings.findOne({ guildId: member.guild.id });
  if (!settings || !settings.leaveChannel) return;

  const leaveChannel = member.guild.channels.cache.get(settings.leaveChannel);
  if (!leaveChannel) return;

  const botMember = member.guild.members.cache.get(member.client.user.id);
  if (!leaveChannel.permissionsFor(botMember).has(PermissionsBitField.Flags.SendMessages)) {
    const fallbackChannel = member.guild.channels.cache.find(channel =>
      channel.permissionsFor(botMember).has(PermissionsBitField.Flags.SendMessages)
    );
    if (fallbackChannel) {
      fallbackChannel.send('No tengo permisos para enviar mensajes en el canal de despedida configurado.');
    }
    return;
  }

  const leaveMessages = [
    `Lamentamos que ${member.user} haya dejado ${member.guild.name}.`,
    `¡Adiós ${member.user}! Esperamos verte de nuevo en ${member.guild.name}.`,
    `${member.user} ha dejado ${member.guild.name}. ¡Te extrañaremos!`,
    `¡${member.user} ha salido de ${member.guild.name}! ¡Buena suerte!`,
    `¡${member.user} se ha ido de ${member.guild.name}! ¡Hasta la próxima!`
  ];

  const randomMessage = leaveMessages[Math.floor(Math.random() * leaveMessages.length)];

  const embed = new EmbedBuilder()
    .setTitle('¡Adiós! 👋')
    .setDescription(randomMessage)
    .setFooter({ text: `Ahora somos ${member.guild.memberCount} miembros.` })
    .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
    .setColor('Red');

  leaveChannel.send({ embeds: [embed] });
};