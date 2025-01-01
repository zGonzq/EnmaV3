const { EmbedBuilder } = require('discord.js');
const DailyAnime = require('../../models/dailyAnime');
const axios = require('axios');

async function getRandomSFWAnime() {
    while (true) {
      try {
        const response = await axios.get('https://api.jikan.moe/v4/random/anime');
        const anime = response.data.data;
  
        const isNSFW = anime.genres.some(genre => 
          genre.name.toLowerCase() === 'hentai' || 
          anime.rating === 'Rx - Hentai'
        );
  
        const validType = ['TV', 'Movie', 'OVA'].includes(anime.type);
        const hasScore = anime.score && anime.score > 0;
        const hasGenres = anime.genres && anime.genres.length > 0;
        const hasSynopsis = anime.synopsis && anime.synopsis.length > 0;
  
        if (!isNSFW && validType && hasScore && hasGenres && hasSynopsis) {
          return anime;
        }
        await new Promise(resolve => setTimeout(resolve, 1000)); 
      } catch (error) {
        console.error('Error al obtener anime:', error);
        await new Promise(resolve => setTimeout(resolve, 5000)); 
      }
    }
  }

/** @param {import('discord.js').Client} client */
module.exports = async (client) => {
  setInterval(async () => {
    const now = new Date();

    if (now.getHours() === 13 && now.getMinutes() === 0) {
      const configs = await DailyAnime.find();

      for (const config of configs) {
        const channel = client.channels.cache.get(config.channelId);
        if (!channel) continue;

        const anime = await getRandomSFWAnime();
        if (!anime) continue;

        const embed = new EmbedBuilder()
            .setAuthor({ name: 'Recomendación diaria de anime', iconURL: client.user.displayAvatarURL() })
          .setTitle(anime.title)
          .setURL(anime.url)
          .setDescription(anime.synopsis || 'No hay sinopsis disponible.')
          .setImage(anime.images.jpg.image_url)
          .addFields(
            { name: 'Tipo', value: anime.type || 'No disponible', inline: true },
            { name: 'Género', value: anime.genres.map(g => g.name).join(', ') || 'No disponible', inline: true },
            { name: 'Puntuación', value: anime.score ? anime.score.toString() : 'No disponible', inline: true },
            { name: 'Episodios', value: anime.episodes ? anime.episodes.toString() : 'No disponible', inline: true },
            { name: 'Estado', value: anime.status || 'No disponible', inline: true }
          )
          .setColor('Random')
          .setTimestamp();

        try {
          await channel.send({ embeds: [embed] });
        } catch (error) {
          console.error(`Error al enviar anime diario en ${config.guildId}:`, error);
        }
      }
    }
  }, 60000);
};