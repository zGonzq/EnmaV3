const { EmbedBuilder, PermissionsBitField } = require('discord.js');
const WelcomeSettings = require('../../models/welcomeSettings');

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

  const welcomeMessages = [
    `¡Bienvenido/a ${member.user} a ${member.guild.name}!`,
    `¡Hola ${member.user}! ¡Bienvenido/a a ${member.guild.name}!`,
    `¡${member.user} se ha unido a ${member.guild.name}!`,
    `¡Un gran saludo a ${member.user} por unirse a ${member.guild.name}!`,
    `¡${member.user} ha llegado a ${member.guild.name}!`
  ];

  const randomMessage = welcomeMessages[Math.floor(Math.random() * welcomeMessages.length)];

  const embed = new EmbedBuilder()
    .setTitle('¡Bienvenido/a! 🚀')
    .setDescription(randomMessage)
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