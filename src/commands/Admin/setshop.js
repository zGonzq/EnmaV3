const { SlashCommandBuilder, EmbedBuilder, PermissionsBitField } = require('discord.js');
const Shop = require('../../models/shop');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('setshop')
    .setDescription('Gestiona la tienda de roles')
    .setDefaultMemberPermissions(PermissionsBitField.Flags.Administrator)
    .addSubcommand(subcommand =>
      subcommand
        .setName('add')
        .setDescription('Agrega un rol a la tienda')
        .addRoleOption(option => option.setName('role').setDescription('El rol que deseas agregar a la tienda').setRequired(true))
        .addIntegerOption(option => option.setName('price').setDescription('El precio del rol').setRequired(true)))
    .addSubcommand(subcommand =>
      subcommand
        .setName('remove')
        .setDescription('Elimina un rol de la tienda')
        .addIntegerOption(option => option.setName('roleindex').setDescription('Número del rol que deseas eliminar (1-10)').setRequired(true)))
    .addSubcommand(subcommand =>
      subcommand
        .setName('list')
        .setDescription('Muestra los roles disponibles en la tienda')),

  run: async ({ interaction }) => {
    const embed = new EmbedBuilder();
    const subcommand = interaction.options.getSubcommand();

    if (subcommand === 'add') {
      const role = interaction.options.getRole('role');
      const price = interaction.options.getInteger('price');

      let shopData = await Shop.findOne({ guildId: interaction.guild.id });
      if (!shopData) {
        shopData = new Shop({ guildId: interaction.guild.id, roles: [] });
      }

      if (shopData.roles.length >= 10) {
        return interaction.reply({ embeds: [embed.setDescription('No puedes agregar más de 10 roles a la tienda.').setColor('Red')] });
      }

      shopData.roles.push({ id: role.id, price });
      await shopData.save();

      embed.setTitle('Rol Agregado').setDescription(`El rol <@&${role.id}> ha sido agregado a la tienda por ${price} monedas.`).setColor('Green');
      interaction.reply({ embeds: [embed] });

    } else if (subcommand === 'remove') {
      const roleIndex = interaction.options.getInteger('roleindex');
      if (roleIndex < 1 || roleIndex > 10) {
        return interaction.reply({ embeds: [embed.setDescription('Número de rol inválido. Debe estar entre 1 y 10.').setColor('Red')] });
      }

      let shopData = await Shop.findOne({ guildId: interaction.guild.id });
      if (!shopData || !shopData.roles || shopData.roles.length === 0) {
        return interaction.reply({ embeds: [embed.setDescription('No hay roles disponibles en la tienda.').setColor('Red')] });
      }

      if (roleIndex > shopData.roles.length) {
        return interaction.reply({ embeds: [embed.setDescription('Número de rol inválido.').setColor('Red')] });
      }

      const removedRole = shopData.roles.splice(roleIndex - 1, 1)[0];
      await shopData.save();

      embed.setTitle('Rol Eliminado').setDescription(`El rol con ID <@&${removedRole.id}> ha sido eliminado de la tienda.`).setColor('Green');
      interaction.reply({ embeds: [embed] });

    } else if (subcommand === 'list') {
      const shopData = await Shop.findOne({ guildId: interaction.guild.id });
      if (!shopData || !shopData.roles || shopData.roles.length === 0) {
        return interaction.reply({ embeds: [embed.setDescription('No hay roles disponibles en la tienda.').setColor('Red')] });
      }

      const rolesList = shopData.roles.map((role, index) => `${index + 1}. <@&${role.id}> - ${role.price} monedas`).join('\n');
      embed.setTitle('Tienda de Roles').setDescription(rolesList).setColor('Blue');
      interaction.reply({ embeds: [embed] });
    }
  },
};