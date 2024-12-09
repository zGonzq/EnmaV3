const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const axios = require('axios');

module.exports = {
  /** @type {import('commandkit').CommandData}  */
  data: new SlashCommandBuilder()
    .setName('weather')
    .setDescription('Obtiene el clima de una ciudad específica')
    .addStringOption(option => 
      option.setName('ciudad')
        .setDescription('Nombre de la ciudad')
        .setRequired(true)
    ),

  /**
   * @param {import('commandkit').SlashCommandProps} param0
   */
  run: async ({ interaction }) => {
    const embed = new EmbedBuilder();
    const city = interaction.options.getString('ciudad');

    try {
      const weatherResponse = await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.WEATHER_API_KEY}&units=metric&lang=es`);
      const weather = weatherResponse.data;

      const capitalizeFirstLetter = (string) => string.charAt(0).toUpperCase() + string.slice(1);

      embed.setTitle('Meteorología')
        .setDescription(`Clima en ${city}.`)
        .setThumbnail(`http://openweathermap.org/img/wn/${weather.weather[0].icon}.png`)
        .addFields(
          { name: 'Temperatura', value: `${weather.main.temp}°C`, inline: false },
          { name: 'Sensación térmica', value: `${weather.main.feels_like}°C`, inline: false },
          { name: 'Humedad', value: `${weather.main.humidity}%`, inline: false },
          { name: 'Presión', value: `${weather.main.pressure} hPa`, inline: false },
          { name: 'Estado del cielo', value: `${capitalizeFirstLetter(weather.weather[0].description)}`, inline: false },
          { name: 'Viento', value: `${weather.wind.speed} m/s`, inline: false },
          { name: 'Nubosidad', value: `${weather.clouds.all}%`, inline: false }
        )
        .setColor('Random');

      await interaction.reply({ embeds: [embed] });

    } catch (error) {
      console.log('Error al obtener los datos del clima:', error);
      await interaction.reply({ content: `No se pudieron encontrar datos climáticos sobre la ciudad **${city}**.`, ephemeral: true });
    }
  },
};