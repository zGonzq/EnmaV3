const { SlashCommandBuilder, EmbedBuilder, PermissionsBitField } = require('discord.js');
const Shop = require('../../models/shop');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('removeshop')
    .setDescription('Elimina un rol de la tienda')
    .setDefaultMemberPermissions(PermissionsBitField.Flags.Administrator)
    .addIntegerOption(option => option.setName('roleindex').setDescription('Número del rol que deseas eliminar (1-10)').setRequired(true)),

  run: async ({ interaction }) => {
    const embed = new EmbedBuilder();
    if (!interaction.guild) {
      return interaction.reply({ embeds: [embed.setDescription('Este comando solo está disponible en servidores.').setColor('Red')] });
    }

    if (!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
      return interaction.reply({ embeds: [embed.setDescription('No tienes permisos para usar este comando.').setColor('Red')] });
    }

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
  },
};