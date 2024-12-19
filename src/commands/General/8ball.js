const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
module.exports = {
  /** @type {import('commandkit').CommandData}  */
  data: new SlashCommandBuilder()
    .setName('8ball')
    .setDescription('Hazle una pregunta a la bola mágica')
    .addStringOption(option =>  option.setName('question').setDescription('Hazle una pregunta a la bola mágica').setRequired(true)),
  /**
   * @param {import('commandkit').SlashCommandProps} param0
   */
  run: async ({ interaction, client, handler }) => {

    const embed = new EmbedBuilder();


    const question = interaction.options.getString('question');
    const answers = [
        'Sí.',
        'No.',
        'Probablemente.',
        'No lo sé.',
        'Pregunta de nuevo más tarde.',
        'No puedo responder a eso.',
        '¡Claro que sí!',
        '¡Claro que no!',
        '¡Por supuesto!',
        '¡Por supuesto que no!',
        '¡Por supuesto que sí!',
        '¡Por supuesto que no lo sé!',
        ];

    const answer = answers[Math.floor(Math.random() * answers.length)];

    embed.setTitle('🎱 Bola mágica');
    embed.setFields({
        name: 'Pregunta',
        value: question
    }, {
        name: 'Respuesta',
        value: answer
    })
    embed.setColor('Random');

    await interaction.reply({ embeds: [embed] });
    }
}

