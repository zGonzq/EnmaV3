const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const axios = require('axios');

module.exports = {
  /** @type {import('commandkit').CommandData}  */
  data: new SlashCommandBuilder()
    .setName('findpokemon')
    .setDescription('Busca información de un Pokémon específico')
    .addStringOption(option => 
      option.setName('pokemon')
        .setDescription('Nombre o ID del Pokémon')
        .setRequired(true)
    ),

  /**
   * @param {import('commandkit').SlashCommandProps} param0
   */
  run: async ({ interaction }) => {
    const embed = new EmbedBuilder();
    const pokemonNameOrId = interaction.options.getString('pokemon');

    try {
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonNameOrId.toLowerCase()}`);
      const pokemon = response.data;

      const speciesResponse = await axios.get(pokemon.species.url);
      const species = speciesResponse.data;

    embed.setTitle(pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1))
      .setThumbnail(pokemon.sprites.front_default)
      .setDescription(species.flavor_text_entries.find(entry => entry.language.name === 'es').flavor_text)
      .addFields(
        { name: 'ID', value: pokemon.id.toString(), inline: true },
        { name: 'Altura', value: `${pokemon.height / 10} m`, inline: true },
        { name: 'Peso', value: `${pokemon.weight / 10} kg`, inline: true },
        { name: 'Tipos', value: pokemon.types.map(type => type.type.name.charAt(0).toUpperCase() + type.type.name.slice(1)).join(', '), inline: true },
        { name: 'Hábitat', value: species.habitat ? species.habitat.name.charAt(0).toUpperCase() + species.habitat.name.slice(1) : 'Desconocido', inline: true },
        { name: 'Color', value: species.color.name.charAt(0).toUpperCase() + species.color.name.slice(1), inline: true },
        { name: 'Forma', value: species.shape.name.charAt(0).toUpperCase() + species.shape.name.slice(1), inline: true },
      )
      .setColor('Random');

      await interaction.reply({ embeds: [embed] });

    } catch (error) {
      console.log('Error al obtener la información del Pokémon:', error);
      await interaction.reply({ content: `No se pudo encontrar información sobre el Pokémon **${pokemonNameOrId}**.`, ephemeral: true });
    }
  },
};