const { SlashCommandBuilder, EmbedBuilder, PermissionsBitField } = require('discord.js');
const Shop = require('../../models/shop');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('setshop')
    .setDescription('Agrega un rol a la tienda')
    .addRoleOption(option => option.setName('role').setDescription('Rol a agregar').setRequired(true))
    .addIntegerOption(option => option.setName('price').setDescription('Precio del rol').setRequired(true)),

  run: async ({ interaction }) => {
    const embed = new EmbedBuilder();
    if (!interaction.guild) {
      return interaction.reply({ embeds: [embed.setDescription('Este comando solo está disponible en servidores.').setColor('Red')] });
    }

    if (!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
      return interaction.reply({ embeds: [embed.setDescription('No tienes permisos para usar este comando.').setColor('Red')] });
    }

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
  },
};