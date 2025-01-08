const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const Ticket = require('../../models/tickets');
const { v4: uuidv4 } = require('uuid');

module.exports = {
      /** @type {import('commandkit').CommandOptions} */
  options: {
    devOnly: true,
  },

    data: new SlashCommandBuilder()
        .setName('ticket')
        .setDescription('Gestiona el sistema de tickets')
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .addSubcommand(subcommand => 
            subcommand
                .setName('create')
                .setDescription('Crea un nuevo ticket')
                .addStringOption(option => 
                    option.setName('titulo')
                        .setDescription('Título del ticket')
                        .setRequired(true))
                .addStringOption(option => 
                    option.setName('descripcion')
                        .setDescription('Descripción del ticket')
                        .setRequired(true)))
        .addSubcommand(subcommand =>
            subcommand
                .setName('add')
                .setDescription('Añade una categoría a un ticket existente')
                .addStringOption(option =>
                    option.setName('titulo')
                        .setDescription('Título del ticket')
                        .setRequired(true))
                .addStringOption(option =>
                    option.setName('categoria')
                        .setDescription('Categoría a añadir')
                        .setRequired(true)))
        .addSubcommand(subcommand =>
            subcommand
                .setName('list')
                .setDescription('Muestra la lista de tickets'))
        .addSubcommand(subcommand =>
            subcommand
                .setName('remove')
                .setDescription('Elimina una categoría de un ticket')
                .addStringOption(option =>
                    option.setName('titulo')
                        .setDescription('Título del ticket')
                        .setRequired(true))
                .addStringOption(option =>
                    option.setName('categoria')
                        .setDescription('Categoría a eliminar')
                        .setRequired(true)))
        .addSubcommand(subcommand =>
            subcommand
                .setName('send')
                .setDescription('Envía el mensaje de ticket a un canal')
                .addStringOption(option =>
                    option.setName('titulo')
                        .setDescription('Título del ticket')
                        .setRequired(true))
                .addChannelOption(option =>
                    option.setName('canal')
                        .setDescription('Canal donde enviar el ticket')
                        .setRequired(true))),

    async run({ interaction }) {
        const embed = new EmbedBuilder();
        const subcommand = interaction.options.getSubcommand();

        if (subcommand === 'create') {
            const title = interaction.options.getString('titulo');
            const description = interaction.options.getString('descripcion');

            const ticket = new Ticket({
                guildId: interaction.guild.id,
                title,
                description,
                categories: [],
                channelId: null,
                userId: interaction.user.id
            });

            await ticket.save();

            return interaction.reply({
                embeds: [embed.setDescription(`Se ha creado el ticket "${title}"`).setColor('Green')],
                ephemeral: true
            });
        }

        if (subcommand === 'add') {
            const title = interaction.options.getString('titulo');
            const category = interaction.options.getString('categoria');

            const ticket = await Ticket.findOne({ guildId: interaction.guild.id, title });
            if (!ticket) {
                return interaction.reply({
                    embeds: [embed.setDescription('No se encontró el ticket').setColor('Red')],
                    ephemeral: true
                });
            }

            if (ticket.categories.includes(category)) {
                return interaction.reply({
                    embeds: [embed.setDescription('Esta categoría ya está en el ticket').setColor('Red')],
                    ephemeral: true
                });
            }

            if (ticket.categories.length >= 6) {
                return interaction.reply({
                    embeds: [embed.setDescription('El ticket ya tiene el máximo de 6 categorías').setColor('Red')],
                    ephemeral: true
                });
            }

            ticket.categories.push(category);
            await ticket.save();

            return interaction.reply({
                embeds: [embed.setDescription(`Se ha añadido la categoría "${category}" al ticket "${title}"`).setColor('Green')],
                ephemeral: true
            });
        }

        if (subcommand === 'list') {
            const tickets = await Ticket.find({ guildId: interaction.guild.id });
            if (!tickets.length) {
                return interaction.reply({
                    embeds: [embed.setDescription('No hay tickets configurados').setColor('Red')],
                    ephemeral: true
                });
            }

            const description = tickets.map(ticket => {
                const categories = ticket.categories.length > 0 
                    ? ticket.categories.join(', ')
                    : 'Sin categorías';
                return `**${ticket.title}**\nDescripción: ${ticket.description}\nCategorías: ${categories}`;
            }).join('\n\n');

            embed.setTitle('Lista de Tickets')
                .setDescription(description)
                .setColor('Blue');
            
            return interaction.reply({ embeds: [embed], ephemeral: true });
        }

        if (subcommand === 'remove') {
            const title = interaction.options.getString('titulo');
            const category = interaction.options.getString('categoria');

            const ticket = await Ticket.findOne({ guildId: interaction.guild.id, title });
            if (!ticket) {
                return interaction.reply({
                    embeds: [embed.setDescription('No se encontró el ticket').setColor('Red')],
                    ephemeral: true
                });
            }

            if (!ticket.categories.includes(category)) {
                return interaction.reply({
                    embeds: [embed.setDescription('Esta categoría no está en el ticket').setColor('Red')],
                    ephemeral: true
                });
            }

            ticket.categories = ticket.categories.filter(cat => cat !== category);
            await ticket.save();

            return interaction.reply({
                embeds: [embed.setDescription(`Se ha eliminado la categoría "${category}" del ticket "${title}"`).setColor('Green')],
                ephemeral: true
            });
        }

        if (subcommand === 'send') {
            const title = interaction.options.getString('titulo');
            const channel = interaction.options.getChannel('canal');

            if (!channel.permissionsFor(interaction.guild.members.me).has(['ViewChannel', 'SendMessages'])) {
                return interaction.reply({
                    embeds: [embed.setDescription('No tengo permisos para enviar mensajes en ese canal').setColor('Red')],
                    ephemeral: true
                });
            }

            const ticket = await Ticket.findOne({ guildId: interaction.guild.id, title });
            if (!ticket) {
                return interaction.reply({
                    embeds: [embed.setDescription('No se encontró el ticket').setColor('Red')],
                    ephemeral: true
                });
            }

            const buttons = ticket.categories.map((category, index) => 
                new ButtonBuilder()
                    .setCustomId(`ticket_${category}_${uuidv4()}`)
                    .setLabel(category)
                    .setStyle(ButtonStyle.Primary)
            );

            const row = new ActionRowBuilder().addComponents(buttons);

            const embedMessage = new EmbedBuilder()
                .setTitle(title)
                .setDescription(ticket.description)
                .setColor('Blue');

            await channel.send({ embeds: [embedMessage], components: [row] });

            return interaction.reply({
                embeds: [embed.setDescription(`Se ha enviado el mensaje de ticket al canal ${channel}`).setColor('Green')],
                ephemeral: true
            });
        }
    }
};