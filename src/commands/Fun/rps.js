const { SlashCommandBuilder, EmbedBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle } = require('discord.js');


const choices = [ 
    { name: 'piedra', emoji: '🪨', gana: 'tijeras' },
    { name: 'papel', emoji: '📄', gana: 'piedra' },
    { name: 'tijeras', emoji: '✂️', gana: 'papel' }
]
module.exports = {
    /** @type {import('commandkit').CommandData}  */
    data: new SlashCommandBuilder()
        .setName('rps')
        .setDescription('Juega piedra, papel o tijeras.')
        .addUserOption(option => 
            option.setName('oponente')
                .setDescription('Elige a un oponente')
                .setRequired(false)
        ),
    /**
     * @param {import('commandkit').SlashCommandProps} param0
     */
    run: async ({ interaction }) => {

        try {
            const oponente = interaction.options.getUser('oponente');

            if (oponente && oponente.id === interaction.user.id) {
                return interaction.reply({ content: 'No puedes jugar contra ti mismo.', ephemeral: true });
            }

            if (oponente && oponente.bot) {
                return interaction.reply({ content: 'No puedes jugar contra un bot.', ephemeral: true });
            }

            const initEmbed = new EmbedBuilder()
                .setTitle('Piedra, papel o tijeras')
                .setDescription(`Es el turno de ${oponente} de elegir.`)
                .setColor('Random')

            const embed = new EmbedBuilder();

            const buttons = choices.map(choice => new ButtonBuilder()
                .setCustomId(choice.name)
                .setLabel(choice.name)
                .setEmoji(choice.emoji)
                .setStyle(ButtonStyle.Primary)
            );

            const row = new ActionRowBuilder().addComponents(buttons);

            const reply = await interaction.reply({ content:`${oponente}, el usuario ${interaction.user} te ha retado a jugar piedra, papel o tijeras. Para empezar el juego selecciona una de las opciones.`, embeds: [initEmbed], components: [row] });

            const targetUserInteract = await reply.awaitMessageComponent({ filter: (i) => i.user.id === oponente.id, time: 50_000 }).catch(async (error) => {
                await interaction.editReply({ embeds: [initEmbed.setDescription('El tiempo para elegir ha terminado.')], components: [] });
            });

            if (!targetUserInteract) return;

            const targetUserChoice = choices.find(choice => choice.name === targetUserInteract.customId);

            await targetUserInteract.reply({ content: `Has elegido ${targetUserChoice.name} ${targetUserChoice.emoji}`, ephemeral: true });

            embed.setDescription(`Es el turno de ${interaction.user} de elegir.`);
            await interaction.editReply({ embeds: [initEmbed], components: [row] });

            const userInteract = await reply.awaitMessageComponent({ filter: (i) => i.user.id === interaction.user.id, time: 50_000 }).catch(async (error) => {
                await interaction.editReply({ embeds: [initEmbed.setDescription('El tiempo para elegir ha terminado.')], components: [] });
            });

            if (!userInteract) return;

            const userChoice = choices.find(choice => choice.name === userInteract.customId);

            await userInteract.reply({ content: `Has elegido ${userChoice.name} ${userChoice.emoji}`, ephemeral: true });

            const result = userChoice.gana === targetUserChoice.name ? 'Ganaste' : targetUserChoice.gana === userChoice.name ? 'Perdiste' : 'Empate';

            initEmbed.setDescription(`${interaction.user} ha elegido ${userChoice.name} ${userChoice.emoji}\n${oponente} ha elegido ${targetUserChoice.name} ${targetUserChoice.emoji}\n${result}`);

            await interaction.editReply({ embeds: [initEmbed], components: [] });

        } catch (error) {
            
            console.error('Error al jugar piedra, papel o tijeras:', error);
            await interaction.reply({ content: 'Hubo un error al jugar piedra, papel o tijeras. Por favor, inténtalo de nuevo más tarde.', ephemeral: true });
        }


    },
};