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
  run: async ({ interaction, client }) => {
    const embed = new EmbedBuilder();
    const imageAttachment = interaction.options.getAttachment('imagen');

    await interaction.reply({ embeds: [embed.setDescription('Buscando información del anime...')] });

    try {
      const response = await axios.get(`https://api.trace.moe/search?anilistInfo&url=${encodeURIComponent(imageAttachment.url)}`);
      const result = response.data.result[0];

      const similarityPercentage = Math.round(result.similarity * 100);

      const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = Math.floor(seconds % 60);
        return `${minutes}m ${remainingSeconds}s`;
      };

      embed.setTitle(result.anilist.title.romaji)
        .setDescription(result.anilist.title.native)
        .setAuthor({ name: 'Resultado de búsqueda de anime', iconURL: `${client.user.displayAvatarURL()}` })
        .setImage(result.image)
        .setFooter({ text: `Similitud: ${similarityPercentage}%` })
        .addFields(
            { name: 'Episodio', value: result.episode.toString(), inline: true },
            { name: 'Desde', value: formatTime(result.from), inline: true },
            { name: 'Hasta', value: formatTime(result.to), inline: true },
            { name: 'Título en inglés', value: result.anilist.title.english || 'No disponible', inline: false },
            { name: 'Adulto', value: result.anilist.isAdult ? 'Sí' : 'No', inline: false },
            { name: 'Sinonimos', value: result.anilist.synonyms.join(', ') || 'No disponible', inline: false },

        )
        .setColor('Random');

      await interaction.editReply({ content: '', embeds: [embed] });

    } catch (error) {
      console.log('Error al obtener la información del anime:', error);
      await interaction.editReply({ content: 'No se pudo encontrar información sobre el anime. Inténtalo de nuevo más tarde.', ephemeral: true });
    }
  },
};