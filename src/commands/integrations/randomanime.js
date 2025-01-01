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
    const embed = new EmbedBuilder();

    try {
      const response = await axios.get('https://api.jikan.moe/v4/random/anime');
      const anime = response.data.data;

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
          { name: 'Fecha de estreno', value: anime.aired.from || 'No disponible', inline: true },
        )
        .setColor('Random');

      await interaction.reply({ embeds: [embed] });

    } catch (error) {
      console.log('Error al obtener el anime aleatorio:', error);
      await interaction.reply({ content: 'No se pudo obtener un anime aleatorio. Inténtalo de nuevo más tarde.', ephemeral: true });
    }
  },
};