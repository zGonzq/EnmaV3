const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
module.exports = {
  /** @type {import('commandkit').CommandData}  */
  data: new SlashCommandBuilder()
    .setName('embed')
    .setDescription('Crea un embed personalizado')
    .addStringOption((option) => option
      .setName('titulo')
      .setDescription('El título del embed')
      .setRequired(true))
      .addStringOption((option) => option
      .setName('descripcion')
      .setDescription('La descripción del embed')
      .setRequired(true))
      .addStringOption((option) => option
      .setName('color')
      .setDescription('El color del embed')
        .addChoices({ name: 'Rojo', value: 'Red' })
        .addChoices({ name: 'Azul', value: 'Blue' })
        .addChoices({ name: 'Verde', value: 'Green' })
        .addChoices({ name: 'Amarillo', value: 'Yellow' })
        .addChoices({ name: 'Morado', value: 'Purple' })
        .addChoices({ name: 'Azul grisáceo', value: 'Blurple' })
        .addChoices({ name: 'Naranja', value: 'Gold' })
        .addChoices({ name: 'Gris', value: 'Gray' })
      .setRequired(false))
    .addStringOption((option) => option
    .setName('footer')
    .setDescription('El pie del embed')
    .setRequired(false))
    .addAttachmentOption((option) => option
    .setName('imagen')
    .setDescription('La imagen del embed')
    .setRequired(false))
    .addAttachmentOption((option) => option
    .setName('thumbnail')
    .setDescription('La miniatura del embed')
    .setRequired(false))
    .addBooleanOption((option) => option
    .setName('timesamp')
    .setDescription('Si quieres que el campo sea en línea')
    .setRequired(false)),
  /**
   * @param {import('commandkit').SlashCommandProps} param0
   */
  run: async ({ interaction, client, handler }) => {

    const title = interaction.options.getString("titulo");
    const description = interaction.options.getString("descripcion");
    const color = interaction.options.getString("color") || 'Blurple';
    const footer = interaction.options.getString("footer");
    const image = interaction.options.getAttachment("imagen");
    const thumbnail = interaction.options.getAttachment("thumbnail");
    const timestamp = interaction.options.getBoolean("timesamp");

    const embed = new EmbedBuilder()

    embed.setTitle(title)
    embed.setDescription(description)
    embed.setColor(color)
    if (footer) embed.setFooter({text: `${footer}`})
    if (image) embed.setImage(image.url)
    if (thumbnail) embed.setThumbnail(thumbnail.url)
    if (timestamp) embed.setTimestamp()

    await interaction.reply({ embeds: [embed] });

  },

  /** @type {import('commandkit').CommandOptions} */
  options: {
    botPermissions: ['ManageMessages', 'SendMessages'],
  },
};
