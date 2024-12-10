const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const axios = require('axios');

module.exports = {
  /** @type {import('commandkit').CommandData}  */
  data: new SlashCommandBuilder()
    .setName('findanime')
    .setDescription('Busca información de un anime a partir de una imagen')
    .addAttachmentOption(option => 
      option.setName('imagen')
        .setDescription('Imagen del anime')
        .setRequired(true)
    ),

  /**
   * @param {import('commandkit').SlashCommandProps} param0
   */
  run: async ({ interaction }) => {
    const embed = new EmbedBuilder();
    const imageAttachment = interaction.options.getAttachment('imagen');

    try {
      const response = await axios.get(`https://api.trace.moe/search?anilistInfo&url=${encodeURIComponent(imageAttachment.url)}`);
      const result = response.data.result[0];

      const similarityPercentage = Math.round(result.similarity * 100);

      embed.setTitle(result.anilist.title.romaji)
        .setDescription(result.anilist.title.native)
        .setImage(result.video)
        .setFooter({ text: `Similitud: ${similarityPercentage}%` })
        .addFields(
          { name: 'Título en inglés', value: result.anilist.title.english || 'No disponible', inline: true },
          { name: 'Episodio', value: result.episode.toString(), inline: true },
          { name: 'Adulto', value: result.anilist.isAdult ? 'Sí' : 'No', inline: true },
          { name: 'Sinónimos', value: result.anilist.synonyms.join(', ') || 'No disponible', inline: false }
        )
        .setColor('Random');

      await interaction.reply({ embeds: [embed] });

    } catch (error) {
      console.log('Error al obtener la información del anime:', error);
      await interaction.reply({ content: 'No se pudo encontrar información sobre el anime. Inténtalo de nuevo más tarde.', ephemeral: true });
    }
  },
};