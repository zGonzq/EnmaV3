const { SlashCommandBuilder, EmbedBuilder, PermissionsBitField } = require('discord.js');
const Shop = require('../../models/shop');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('setshop')
    .setDescription('Configura los roles disponibles en la tienda')
    .setDefaultMemberPermissions([PermissionsBitField.Administrator])
    .addRoleOption(option => option.setName('rol1').setDescription('Primer rol').setRequired(true))
    .addIntegerOption(option => option.setName('precio1').setDescription('Precio del primer rol').setRequired(true))
    .addRoleOption(option => option.setName('rol2').setDescription('Segundo rol').setRequired(false))
    .addIntegerOption(option => option.setName('precio2').setDescription('Precio del segundo rol').setRequired(false))
    .addRoleOption(option => option.setName('rol3').setDescription('Tercer rol').setRequired(false))
    .addIntegerOption(option => option.setName('precio3').setDescription('Precio del tercer rol').setRequired(false))
    .addRoleOption(option => option.setName('rol4').setDescription('Cuarto rol').setRequired(false))
    .addIntegerOption(option => option.setName('precio4').setDescription('Precio del cuarto rol').setRequired(false))
    .addRoleOption(option => option.setName('rol5').setDescription('Quinto rol').setRequired(false))
    .addIntegerOption(option => option.setName('precio5').setDescription('Precio del quinto rol').setRequired(false))
    .addRoleOption(option => option.setName('rol6').setDescription('Sexto rol').setRequired(false))
    .addIntegerOption(option => option.setName('precio6').setDescription('Precio del sexto rol').setRequired(false)),

  run: async ({ interaction }) => {
    const embed = new EmbedBuilder();
    if (!interaction.guild) {
      return interaction.reply({ embeds: [embed.setDescription('Este comando solo está disponible en servidores.').setColor('Red')] });
    }

    if (!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
      return interaction.reply({ embeds: [embed.setDescription('No tienes permisos para usar este comando.').setColor('Red')] });
    }

    const roles = [];
    for (let i = 1; i <= 6; i++) {
      const role = interaction.options.getRole(`rol${i}`);
      const price = interaction.options.getInteger(`precio${i}`);
      if (role && price) {
        roles.push({ id: role.id, price });
      }
    }

    if (roles.length === 0) {
      return interaction.reply({ embeds: [embed.setDescription('Debes proporcionar al menos un rol y su precio.').setColor('Red')] });
    }

    let shopData = await Shop.findOne({ guildId: interaction.guild.id });
    if (!shopData) {
      shopData = new Shop({ guildId: interaction.guild.id, roles });
    } else {
      shopData.roles = roles;
    }

    await shopData.save();
    embed.setTitle('Tienda Configurada').setDescription('La tienda ha sido configurada exitosamente.').setColor('Green');
    interaction.reply({ embeds: [embed] });
  },
};