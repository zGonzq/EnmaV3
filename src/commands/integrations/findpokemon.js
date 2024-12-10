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

      embed.setTitle(pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1))
        .setThumbnail(pokemon.sprites.front_default)
        .addFields(
          { name: 'ID', value: pokemon.id.toString(), inline: true },
          { name: 'Altura', value: `${pokemon.height / 10} m`, inline: true },
          { name: 'Peso', value: `${pokemon.weight / 10} kg`, inline: true },
          { name: 'Tipos', value: pokemon.types.map(type => type.type.name).join(', '), inline: true },
          { name: 'Habilidades', value: pokemon.abilities.map(ability => ability.ability.name).join(', '), inline: true },
          { name: 'Experiencia base', value: pokemon.base_experience.toString(), inline: true },
          { name: 'Movimientos', value: pokemon.moves.slice(0, 5).map(move => move.move.name).join(', '), inline: false },
          { name: 'Juego(s) de origen', value: pokemon.game_indices.map(game => game.version.name).join(', '), inline: false }
        )
        .setColor('Random');

      await interaction.reply({ embeds: [embed] });

    } catch (error) {
      console.log('Error al obtener la información del Pokémon:', error);
      await interaction.reply({ content: `No se pudo encontrar información sobre el Pokémon **${pokemonNameOrId}**.`, ephemeral: true });
    }
  },
};