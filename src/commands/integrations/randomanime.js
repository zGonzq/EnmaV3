const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const axios = require('axios');

module.exports = {
  /** @type {import('commandkit').CommandData}  */
  data: new SlashCommandBuilder()
    .setName('randomanime')
    .setDescription('Recomienda un anime aleatorio'),

  /**
   * @param {import('commandkit').SlashCommandProps} param0
   */
  run: async ({ interaction }) => {
    const searchingEmbed = new EmbedBuilder()
      .setDescription('Buscando el anime perfecto...')
      .setColor('Random');

    await interaction.reply({ embeds: [searchingEmbed] });

    const embed = new EmbedBuilder();

    try {
      let anime;
      let validAnime = false;

      while (!validAnime) {
        const response = await axios.get('https://api.jikan.moe/v4/random/anime');
        anime = response.data.data;

        const validType = ['TV', 'Movie', 'OVA'].includes(anime.type);
        const validSource = ['Manga', 'Web manga', 'Light novel'].includes(anime.source);
        const hasScore = anime.score && anime.score > 0;
        const hasGenres = anime.genres && anime.genres.length > 0;
        const hasSynopsis = anime.synopsis && anime.synopsis.length > 0;

        validAnime = validType && validSource && hasScore && hasGenres && hasSynopsis;
      }

      embed.setTitle(anime.title)
        .setURL(anime.url)
        .setDescription(anime.synopsis || 'No hay sinopsis disponible.')
        .setImage(anime.images.jpg.image_url)
        .addFields(
          { name: 'Tipo', value: anime.type || 'No disponible', inline: true },
          { name: 'Género', value: anime.genres.map(g => g.name).join(', ') || 'No disponible', inline: true },
          { name: 'Puntuación', value: anime.score ? anime.score.toString() : 'No disponible', inline: true },

          { name: 'Título en inglés', value: anime.title_english || 'No disponible', inline: true },
          { name: 'Título en japonés', value: anime.title_japanese || 'No disponible', inline: true },
          { name: 'Favoritos', value: anime.favorites ? anime.favorites.toString() : 'No disponible', inline: true },

          { name: 'Episodios', value: anime.episodes ? anime.episodes.toString() : 'No disponible', inline: true },
          { name: 'Estado', value: anime.status || 'No disponible', inline: true },
          { name: 'Año', value: anime.aired.prop.from.year.toString() || 'No disponible', inline: true },
        )
        .setColor('Random');

      await interaction.editReply({ embeds: [embed] });

    } catch (error) {
      console.log('Error al obtener el anime aleatorio:', error);
      await interaction.editReply({ content: 'No se pudo obtener un anime aleatorio. Inténtalo de nuevo más tarde.', embeds: [], ephemeral: true });
    }
  },
};