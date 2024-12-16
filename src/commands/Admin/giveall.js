const { SlashCommandBuilder, EmbedBuilder, PermissionsBitField } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('giveall')
    .setDescription('Añade un rol a todos los usuarios o bots del servidor')
    .setDefaultMemberPermissions(PermissionsBitField.Flags.Administrator)
    .addSubcommand(subcommand =>
      subcommand
        .setName('userrole')
        .setDescription('Añade un rol a todos los usuarios del servidor')
        .addRoleOption(option => option.setName('role').setDescription('El rol que deseas añadir').setRequired(true)))
    .addSubcommand(subcommand =>
      subcommand
        .setName('botrole')
        .setDescription('Añade un rol a todos los bots del servidor')
        .addRoleOption(option => option.setName('role').setDescription('El rol que deseas añadir').setRequired(true))),

  run: async ({ interaction }) => {
    const embed = new EmbedBuilder();
    const subcommand = interaction.options.getSubcommand();
    const role = interaction.options.getRole('role');

    if (!interaction.guild) {
      return interaction.reply({ embeds: [embed.setDescription('Este comando solo está disponible en servidores.').setColor('Red')] });
    }

    const botMember = interaction.guild.members.cache.get(interaction.client.user.id);
    if (role.position >= botMember.roles.highest.position) {
      return interaction.reply({ embeds: [embed.setDescription('No puedo asignar un rol que está igual o por encima de mi rol más alto.').setColor('Red')] });
    }

    if (!role.editable) {
      return interaction.reply({ embeds: [embed.setDescription('No tengo permisos para asignar este rol.').setColor('Red')] });
    }

    await interaction.deferReply();

    const members = await interaction.guild.members.fetch();
    const filteredMembers = members.filter(member => {
      if (subcommand === 'userrole') {
        return !member.user.bot;
      } else if (subcommand === 'botrole') {
        return member.user.bot;
      }
    });

    let totalMembers = filteredMembers.size;
    let processedMembers = 0;
    let membersWithoutRole = filteredMembers.filter(member => !member.roles.cache.has(role.id));
    let totalMembersWithoutRole = membersWithoutRole.size;

    if (totalMembersWithoutRole === 0) {
      return interaction.editReply({ embeds: [embed.setDescription(`Todos los ${subcommand === 'userrole' ? 'usuarios' : 'bots'} ya tienen el rol <@&${role.id}>.`).setColor('Blurple')] });
    }

    const statusMessage = await interaction.editReply({ embeds: [embed.setDescription(`Asignando rol... (0/${totalMembersWithoutRole})`).setColor('Yellow')], fetchReply: true });

    for (const member of membersWithoutRole.values()) {
      try {
        await member.roles.add(role);
      } catch (error) {
        console.log(`Error al asignar el rol a ${member.user.tag}: ${error}`);
      }
      processedMembers++;
      await statusMessage.edit({ embeds: [embed.setDescription(`Asignando rol... (${processedMembers}/${totalMembersWithoutRole})`).setColor('Yellow')] });
    }

    embed.setTitle('Rol Asignado').setDescription(`El rol <@&${role.id}> ha sido asignado a todos los ${subcommand === 'userrole' ? 'usuarios' : 'bots'} del servidor.`).setColor('Green');
    await statusMessage.edit({ embeds: [embed] });
  },
};