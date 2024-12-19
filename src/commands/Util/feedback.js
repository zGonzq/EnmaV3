const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const axios = require('axios');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('feedback')
        .setDescription('Envía tus comentarios o sugerencias')
        .addStringOption(option => 
            option.setName('mensaje')
                .setDescription('Tu mensaje de feedback')
                .setRequired(true)
        ),

    run: async ({ interaction }) => {
        const feedbackMessage = interaction.options.getString('mensaje');
        const webhookUrl = process.env.FEEDBACK_WEBHOOK_URL; 

        const embed = new EmbedBuilder()
            .setTitle('Nuevo Feedback')
            .setDescription(feedbackMessage)
            .setColor('Random')
            .setFooter({ text: `Enviado por ${interaction.user.tag} desde: ${interaction.guild ? interaction.guild.name : 'MD'}`, iconURL: interaction.user.displayAvatarURL() })
            .setTimestamp();

        try {
            await axios.post(webhookUrl, {
                embeds: [embed.toJSON()]
            });

            await interaction.reply({ content: '¡Gracias por tu feedback!', ephemeral: true });
        } catch (error) {
            console.error('Error al enviar el feedback:', error);
            await interaction.reply({ content: 'Hubo un error al enviar tu feedback. Por favor, inténtalo de nuevo más tarde.', ephemeral: true });
        }
    },
};