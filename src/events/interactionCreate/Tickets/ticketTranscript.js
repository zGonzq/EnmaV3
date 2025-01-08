const { EmbedBuilder, PermissionsBitField } = require('discord.js');
const transcript = require('discord-html-transcripts');

module.exports = async (interaction) => {
    if (!interaction.isButton() || !interaction.customId.startsWith('transcript_')) return;

    if (!interaction.member.permissions.has(PermissionsBitField.Flags.ManageMessages)) {
        return interaction.reply({
            embeds: [new EmbedBuilder().setDescription('No tienes permisos para transcribir el ticket').setColor('Red')],
            ephemeral: true
        });
    }

    const transcriptFile = await transcript.createTranscript(interaction.channel);
    await interaction.reply({ embeds: [new EmbedBuilder().setDescription('Transcripción del ticket').setColor('Green')]});
    return interaction.channel.send({ files: [transcriptFile] });
};