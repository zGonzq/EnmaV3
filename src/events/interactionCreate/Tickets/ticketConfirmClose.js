const { EmbedBuilder } = require('discord.js');
const Ticket = require('../../../models/tickets');
const Logs = require('../../../models/logs');
const transcript = require('discord-html-transcripts');

module.exports = async (interaction) => {
    console.log('ticketConfirmClose: Interaction received');
    if (!interaction.isButton() || !interaction.customId.startsWith('confirm_close_')) return;

    const ticket = await Ticket.findOne({ channelId: interaction.channel.id });
    console.log(`ticketConfirmClose: Ticket found - ${ticket ? ticket.title : 'No ticket found'}`);

    if (!ticket) {
        return interaction.reply({
            embeds: [new EmbedBuilder().setDescription('No se encontró el ticket').setColor('Red')],
            ephemeral: true
        });
    }

    const countdownEmbed = new EmbedBuilder()
        .setTitle('Cerrando ticket')
        .setDescription('El ticket se cerrará en 5 segundos...')
        .setColor('Red');

    await interaction.reply({ embeds: [countdownEmbed] });
    console.log('ticketConfirmClose: Countdown started');

    for (let i = 4; i >= 0; i--) {
        countdownEmbed.setDescription(`El ticket se cerrará en ${i} segundos...`);
        await interaction.editReply({ embeds: [countdownEmbed] });
        await new Promise(resolve => setTimeout(resolve, 1000));
    }

    const log = await Logs.findOne({ guildId: interaction.guild.id });
    console.log(`ticketConfirmClose: Log found - ${log ? log.logChannelId : 'No log found'}`);

    if (log) {
        const logChannel = interaction.guild.channels.cache.get(log.logChannelId);
        if (logChannel) {
            const transcriptFile = await transcript.createTranscript(interaction.channel);
            const logEmbed = new EmbedBuilder()
                .setTitle('Ticket Cerrado')
                .setDescription(`El ticket "${ticket.title}" ha sido cerrado`)
                .setColor('Red')
                .setTimestamp();

            await logChannel.send({ embeds: [logEmbed], files: [transcriptFile] });
            console.log('ticketConfirmClose: Log message sent');
        }
    }

    await interaction.channel.delete();
    await Ticket.deleteOne({ channelId: interaction.channel.id });
    console.log('ticketConfirmClose: Ticket channel deleted and ticket removed from database');
};