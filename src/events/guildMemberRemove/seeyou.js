const { EmbedBuilder, PermissionsBitField } = require('discord.js');
const WelcomeSettings = require('../../models/welcomeSettings');

const leaveMessages = [
  `Lamentamos que {user} haya dejado {server}.`,
  `¡Adiós {user}! Esperamos verte de nuevo en {server}.`,
  `{user} ha dejado {server}. ¡Te extrañaremos!`,
  `¡{user} ha salido de {server}! ¡Buena suerte!`,
  `¡{user} se ha ido de {server}! ¡Hasta la próxima!`
];

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

  let messageContent = settings.customLeaveMessage || 
    leaveMessages[Math.floor(Math.random() * leaveMessages.length)];

  messageContent = messageContent
    .replace(/{user}/g, member.user)
    .replace(/{server}/g, member.guild.name);

  const embed = new EmbedBuilder()
    .setTitle('¡Hasta pronto! 👋')
    .setDescription(messageContent)
    .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
    .setFooter({ text: `Ahora somos ${member.guild.memberCount} miembros.` })
    .setColor('Random');

  leaveChannel.send({ content: `${member.user}`, embeds: [embed] });
};