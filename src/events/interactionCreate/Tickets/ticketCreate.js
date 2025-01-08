const { EmbedBuilder, PermissionsBitField, ActionRowBuilder, ButtonBuilder, ButtonStyle, ChannelType } = require('discord.js');
const Ticket = require('../../../models/tickets');
const { v4: uuidv4 } = require('uuid');

module.exports = async (interaction) => {
    console.log('ticketCreate: Interaction received');
    if (!interaction.isButton() || !interaction.customId.startsWith('ticket_')) return;

    const [_, category, uuid] = interaction.customId.split('_');
    console.log(`ticketCreate: Category - ${category}, UUID - ${uuid}`);

    const ticket = await Ticket.findOne({ guildId: interaction.guild.id, categories: category });
    console.log(`ticketCreate: Ticket found - ${ticket ? ticket.title : 'No ticket found'}`);

    if (!ticket) {
        return interaction.reply({
            embeds: [new EmbedBuilder().setDescription('No se encontró el ticket').setColor('Red')],
            ephemeral: true
        });
    }

    const channelName = `${category}-${Math.floor(Math.random() * 10000)}`;
    const channel = await interaction.guild.channels.create({
        name: channelName,
        type: ChannelType.GuildText,
        permissionOverwrites: [
            {
                id: interaction.guild.id,
                deny: [PermissionsBitField.Flags.ViewChannel]
            },
            {
                id: interaction.user.id,
                allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.SendMessages]
            },
            {
                id: interaction.guild.roles.everyone,
                deny: [PermissionsBitField.Flags.ViewChannel]
            }
        ]
    });
    console.log(`ticketCreate: Channel created - ${channelName}`);

    ticket.channelId = channel.id;
    await ticket.save();
    console.log('ticketCreate: Ticket updated with channel ID');

    const closeButton = new ButtonBuilder()
        .setCustomId(`close_${uuid}`)
        .setLabel('Cerrar')
        .setStyle(ButtonStyle.Danger);

    const lockButton = new ButtonBuilder()
        .setCustomId(`lock_${uuid}`)
        .setLabel('Bloquear')
        .setStyle(ButtonStyle.Secondary);

    const unlockButton = new ButtonBuilder()
        .setCustomId(`unlock_${uuid}`)
        .setLabel('Desbloquear')
        .setStyle(ButtonStyle.Secondary);

    const transcriptButton = new ButtonBuilder()
        .setCustomId(`transcript_${uuid}`)
        .setLabel('Transcribir')
        .setStyle(ButtonStyle.Primary);

    const row = new ActionRowBuilder().addComponents(closeButton, lockButton, unlockButton, transcriptButton);

    const embed = new EmbedBuilder()
        .setTitle(`Ticket: ${category}`)
        .setDescription('Usa los botones para gestionar el ticket')
        .setColor('Blue');

    await channel.send({ embeds: [embed], components: [row] });
    console.log('ticketCreate: Ticket management message sent');

    return interaction.reply({
        embeds: [new EmbedBuilder().setDescription(`Se ha creado el ticket en el canal ${channel}`).setColor('Green')],
        ephemeral: true
    });
};