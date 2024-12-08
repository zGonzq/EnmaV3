const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const Shop = require('../../models/shop');
const Economy = require('../../models/economy');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('buy')
    .setDescription('Compra un rol de la tienda')
    .addIntegerOption(option => option.setName('roleindex').setDescription('Número del rol que deseas comprar (1-10)').setRequired(true)),

  run: async ({ interaction }) => {
    const embed = new EmbedBuilder();
    if (!interaction.guild) {
      return interaction.reply({ embeds: [embed.setDescription('Este comando solo está disponible en servidores.').setColor('Red')] });
    }

    const roleIndex = interaction.options.getInteger('roleindex');
    if (roleIndex < 1 || roleIndex > 10) {
      return interaction.reply({ embeds: [embed.setDescription('Número de rol inválido. Debe estar entre 1 y 10.').setColor('Red')] });
    }

    const shopData = await Shop.findOne({ guildId: interaction.guild.id });
    if (!shopData || !shopData.roles || shopData.roles.length === 0) {
      return interaction.reply({ embeds: [embed.setDescription('No hay roles disponibles en la tienda.').setColor('Red')] });
    }

    const roleToBuy = shopData.roles[roleIndex - 1];
    if (!roleToBuy) {
      return interaction.reply({ embeds: [embed.setDescription('Número de rol inválido.').setColor('Red')] });
    }

    const economyData = await Economy.findOne({ userId: interaction.user.id, guildId: interaction.guild.id });
    if (!economyData || economyData.balance < roleToBuy.price) {
      return interaction.reply({ embeds: [embed.setDescription('No tienes suficientes monedas para comprar este rol.').setColor('Red')] });
    }

    const role = interaction.guild.roles.cache.get(roleToBuy.id);
    if (!role) {
      return interaction.reply({ embeds: [embed.setDescription('El rol no existe en el servidor.').setColor('Red')] });
    }

    const member = interaction.guild.members.cache.get(interaction.user.id);
    if (member.roles.cache.has(role.id)) {
      return interaction.reply({ embeds: [embed.setDescription('Ya tienes este rol.').setColor('Red')] });
    }
    
    const botMember = interaction.guild.members.cache.get(interaction.client.user.id);
    if (role.position >= botMember.roles.highest.position) {
      return interaction.reply({ embeds: [embed.setDescription('No puedo asignar un rol que está igual o por encima de mi rol más alto.').setColor('Red')] });
    }

    if (!role.editable) {
      return interaction.reply({ embeds: [embed.setDescription('No tengo permisos para asignar este rol.').setColor('Red')] });
    }

    economyData.balance -= roleToBuy.price;
    await economyData.save();
    await member.roles.add(role);

    embed.setTitle('Compra Exitosa').setDescription(`Has comprado el rol <@&${role.id}> por ${roleToBuy.price} monedas. Te quedan ${economyData.balance} monedas.`).setColor('Green');
    interaction.reply({ embeds: [embed] });
  },
};