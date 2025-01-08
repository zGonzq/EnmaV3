const { EmbedBuilder, PermissionsBitField } = require('discord.js');
const WelcomeSettings = require('../../models/welcomeSettings');


const welcomeMessages = [
  `¡Bienvenido/a {user} a {server}!`,
  `¡Hola {user}! ¡Bienvenido/a a {server}!`,
  `¡{user} se ha unido a {server}!`,
  `¡Un gran saludo a {user} por unirse a {server}!`,
  `¡{user} ha llegado a {server}!`
];

/**
 * @param {import('discord.js').GuildMember} member
 */
module.exports = async (member) => {
  const settings = await WelcomeSettings.findOne({ guildId: member.guild.id });
  if (!settings || !settings.welcomeChannel) return;

  const welcomeChannel = member.guild.channels.cache.get(settings.welcomeChannel);
  if (!welcomeChannel) return;

  const botMember = member.guild.members.cache.get(member.client.user.id);
  if (!welcomeChannel.permissionsFor(botMember).has(PermissionsBitField.Flags.SendMessages)) {
    const fallbackChannel = member.guild.channels.cache.find(channel =>
      channel.permissionsFor(botMember).has(PermissionsBitField.Flags.SendMessages)
    );
    if (fallbackChannel) {
      fallbackChannel.send('No tengo permisos para enviar mensajes en el canal de bienvenida configurado.');
    }
    return;
  }

  let messageContent = settings.customWelcomeMessage || 
    welcomeMessages[Math.floor(Math.random() * welcomeMessages.length)];

  messageContent = messageContent
    .replace(/{user}/g, member.user)
    .replace(/{server}/g, member.guild.name);

  const embed = new EmbedBuilder()
    .setTitle('¡Bienvenido/a!')
    .setDescription(messageContent)
    .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
    .setFooter({ text: `Ahora somos ${member.guild.memberCount} miembros.` })
    .setColor('Random');

  welcomeChannel.send({ content:`${member.user}`, embeds: [embed] });

  try {
    if (!member.user.bot && settings.userRole) {
      const role = member.guild.roles.cache.get(settings.userRole);
      if (role && botMember.permissions.has(PermissionsBitField.Flags.ManageRoles) && role.position < botMember.roles.highest.position) {
        await member.roles.add(role);
      }
    } else if (member.user.bot && settings.botRole) {
      const role = member.guild.roles.cache.get(settings.botRole);
      if (role && botMember.permissions.has(PermissionsBitField.Flags.ManageRoles) && role.position < botMember.roles.highest.position) {
        await member.roles.add(role);
      }
    }
  } catch (error) {
    console.error(`Error al asignar el rol a ${member.user.tag}: ${error}`);
  }
};