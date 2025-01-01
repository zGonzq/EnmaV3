const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js');
const Moderation = require('../../models/moderation');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ban')
    .setDescription('Banea a un usuario del servidor')
    .addUserOption(option => 
      option.setName('usuario')
        .setDescription('El usuario que deseas banear')
        .setRequired(true))
    .addStringOption(option => 
      option.setName('razon')
        .setDescription('La razón del baneo')
        .setRequired(false))
    .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers),

  run: async ({ interaction }) => {
    const user = interaction.options.getUser('usuario');
    const reason = interaction.options.getString('razon') || 'No especificada';
    const member = await interaction.guild.members.fetch(user.id);
    const embed = new EmbedBuilder();

    if (!member) {
      return interaction.reply({ embeds: [embed.setDescription('El usuario no existe.').setColor('Red')], ephemeral: true });
    }

    if (member.id === interaction.guild.ownerId) {
      return interaction.reply({ embeds: [embed.setDescription('No puedes banear al dueño del servidor.').setColor('Red')], ephemeral: true });
    }

    if (interaction.member.roles.highest.comparePositionTo(member.roles.highest) <= 0) {
      return interaction.reply({ embeds: [embed.setDescription('No puedes banear a este usuario.').setColor('Red')], ephemeral: true });
    }

    try {
      await member.ban({ reason });
      embed.setTitle('Usuario Baneado')
        .setDescription(`El usuario ${user.tag} ha sido baneado.\nRazón: ${reason}`)
        .setColor('Red');

      const moderationEntry = new Moderation({
        userId: user.id,
        guildId: interaction.guild.id,
        action: 'ban',
        reason,
        moderator: interaction.user.id,
        timestamp: new Date()
      });
      await moderationEntry.save();

      return interaction.reply({ embeds: [embed] });
    } catch (error) {
      console.error(`Error al banear al usuario: ${error}`);
      return interaction.reply({ embeds: [embed.setDescription('Hubo un error al intentar banear al usuario.').setColor('Red')], ephemeral: true });
    }
  }
};