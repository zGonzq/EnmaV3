const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const Shop = require('../../models/shop');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('shop')
    .setDescription('Muestra los roles disponibles en la tienda'),

  run: async ({ interaction }) => {
    const embed = new EmbedBuilder();
    if (!interaction.guild) {
      return interaction.reply({ embeds: [embed.setDescription('Este comando solo está disponible en servidores.').setColor('Red')] });
    }

    const shopData = await Shop.findOne({ guildId: interaction.guild.id });
    if (!shopData || !shopData.roles || shopData.roles.length === 0) {
      return interaction.reply({ embeds: [embed.setDescription('No hay roles disponibles en la tienda.').setColor('Red')] });
    }

    const rolesList = shopData.roles.map((role, index) => `${index + 1}. <@&${role.id}> - ${role.price} monedas`).join('\n');
    embed.setTitle('Tienda de Roles').setDescription(rolesList).setColor('Blue').setFooter({ text: 'Usa /buy <número> para comprar un rol.' }).setThumbnail(interaction.guild.iconURL());
    interaction.reply({ embeds: [embed] });
  },
};