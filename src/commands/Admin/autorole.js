const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits, ActionRowBuilder, ButtonBuilder } = require('discord.js');
const Autorole = require('../../models/autoroles');


module.exports = {
    data: new SlashCommandBuilder()
        .setName('autorole')
        .setDescription('Gestiona el sistema de autoroles')
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .addSubcommand(subcommand => 
            subcommand
                .setName('create')
                .setDescription('Crea un nuevo conjunto de autoroles')
                .addStringOption(option => 
                    option.setName('titulo')
                        .setDescription('Título para este conjunto de autoroles')
                        .setRequired(true)))
        .addSubcommand(subcommand =>
            subcommand
                .setName('add')
                .setDescription('Añade un rol a un conjunto existente')
                .addStringOption(option =>
                    option.setName('titulo')
                        .setDescription('Título del conjunto de autoroles')
                        .setRequired(true))
                .addRoleOption(option =>
                    option.setName('role')
                        .setDescription('Rol a añadir')
                        .setRequired(true)))
        .addSubcommand(subcommand =>
            subcommand
                .setName('remove')
                .setDescription('Elimina un rol de un conjunto de autoroles')
                .addStringOption(option =>
                    option.setName('titulo')
                        .setDescription('Título del conjunto de autoroles')
                        .setRequired(true))
                .addRoleOption(option =>
                    option.setName('role')
                        .setDescription('Rol a eliminar')
                        .setRequired(true)))
        .addSubcommand(subcommand =>
            subcommand
                .setName('list')
                .setDescription('Muestra la lista de autoroles'))
        .addSubcommand(subcommand =>
            subcommand
                .setName('send')
                .setDescription('Envía el mensaje de autoroles a un canal')
                .addStringOption(option =>
                    option.setName('titulo')
                        .setDescription('Título del conjunto de autoroles')
                        .setRequired(true))
                .addChannelOption(option =>
                    option.setName('canal')
                        .setDescription('Canal donde enviar los autoroles')
                        .setRequired(true))),

    async run({ interaction, client }) {
        const embed = new EmbedBuilder();
        const subcommand = interaction.options.getSubcommand();

        if (subcommand === 'create') {
            const title = interaction.options.getString('titulo');

            let autorole = await Autorole.findOne({ guildId: interaction.guild.id, title: title });
            if (autorole) {
                return interaction.reply({
                    embeds: [embed.setDescription('Ya existe un conjunto de autoroles con ese título').setColor('Red')]
                });
            }

            autorole = new Autorole({
                guildId: interaction.guild.id,
                title: title,
                roles: []
            });

            await autorole.save();
            return interaction.reply({
                embeds: [embed.setDescription(`Se ha creado el conjunto de autoroles "${title}"`).setColor('Green')]
            });
        }

        if (subcommand === 'add') {
            const title = interaction.options.getString('titulo');
            const role = interaction.options.getRole('role');

            const autorole = await Autorole.findOne({ guildId: interaction.guild.id, title: title });
            if (!autorole) {
                return interaction.reply({
                    embeds: [embed.setDescription('No existe un conjunto de autoroles con ese título').setColor('Red')]
                });
            }

            if (autorole.roles.includes(role.id)) {
                return interaction.reply({
                    embeds: [embed.setDescription('Este rol ya está en el conjunto').setColor('Red')]
                });
            }

            if (autorole.roles.length >= 6) {
                return interaction.reply({
                    embeds: [embed.setDescription('El conjunto ya tiene el máximo de 6 roles').setColor('Red')]
                });
            }

            const botMember = interaction.guild.members.me;
            if (role.position >= botMember.roles.highest.position) {
                return interaction.reply({
                    embeds: [embed.setDescription(`No puedo gestionar el rol ${role} porque está por encima de mi rol más alto`).setColor('Red')]
                });
            }

            autorole.roles.push(role.id);
            await autorole.save();

            return interaction.reply({
                embeds: [embed.setDescription(`Se ha añadido el rol ${role} al conjunto "${title}"`).setColor('Green')]
            });
        }

        if (subcommand === 'remove') {
            const title = interaction.options.getString('titulo');
            const role = interaction.options.getRole('role');

            const autorole = await Autorole.findOne({ guildId: interaction.guild.id, title: title });
            if (!autorole) {
                return interaction.reply({
                    embeds: [embed.setDescription('No existe un conjunto de autoroles con ese título').setColor('Red')]
                });
            }

            if (!autorole.roles.includes(role.id)) {
                return interaction.reply({
                    embeds: [embed.setDescription(`El rol ${role} no está en el conjunto de autoroles "${title}"`).setColor('Red')]
                });
            }

            autorole.roles = autorole.roles.filter(r => r !== role.id);
            if (autorole.roles.length === 0) {
                await Autorole.deleteOne({ guildId: interaction.guild.id, title: title });
                return interaction.reply({
                    embeds: [embed.setDescription(`Se ha eliminado el conjunto de autoroles "${title}" porque no quedaban roles`).setColor('Green')]
                });
            }

            await autorole.save();
            return interaction.reply({
                embeds: [embed.setDescription(`Se ha eliminado el rol ${role} del conjunto "${title}"`).setColor('Green')]
            });
        }

        if (subcommand === 'list') {
            try {
                const autoroles = await Autorole.find({ guildId: interaction.guild.id }) || [];
                
                if (!autoroles || autoroles.length === 0) {
                    return interaction.reply({
                        embeds: [embed.setDescription('No hay conjuntos de autoroles configurados').setColor('Red')]
                    });
                }
        
                const description = autoroles.map(ar => {
                    if (!ar || !ar.roles) return `**${ar.title}**\nSin roles configurados`;
        
                    const rolesText = ar.roles.length > 0 
                        ? ar.roles.filter(roleId => roleId) // Filtrar IDs nulos
                            .map(roleId => {
                                const role = interaction.guild.roles.cache.get(roleId);
                                return role ? `<@&${roleId}>` : 'Rol no encontrado';
                            }).join(', ')
                        : 'Sin roles';
                        
                    return `**${ar.title}**\nRoles: ${rolesText}`;
                });
        
                embed.setTitle('Conjuntos de Autoroles')
                    .setDescription(description.join('\n\n'))
                    .setColor('Blurple');
                
                return interaction.reply({ embeds: [embed] });
            } catch (error) {
                console.error('Error al listar autoroles:', error);
                return interaction.reply({
                    embeds: [embed.setDescription('Ocurrió un error al listar los autoroles').setColor('Red')]
                });
            }
        }

        if (subcommand === 'send') {
            const title = interaction.options.getString('titulo');
            const channel = interaction.options.getChannel('canal');

            if (!channel.permissionsFor(interaction.guild.members.me).has(['ViewChannel', 'SendMessages'])) {
                return interaction.reply({
                    embeds: [embed.setDescription('No tengo permisos para enviar mensajes en ese canal').setColor('Red')]
                });
            }

            const autorole = await Autorole.findOne({ guildId: interaction.guild.id, title: title });
            if (!autorole) {
                return interaction.reply({
                    embeds: [embed.setDescription('No existe un conjunto de autoroles con ese título').setColor('Red')]
                });
            }

            const roleButtons = autorole.roles.map((roleId, index) => {
                const role = interaction.guild.roles.cache.get(roleId);
                return {
                    customId: `autorole_${roleId}`,
                    emoji: '✨',
                    label: role.name,
                    style: 1
                };
            });

            const rows = [];
            for (let i = 0; i < roleButtons.length; i += 5) {
                const row = new ActionRowBuilder().addComponents(
                    roleButtons.slice(i, i + 5).map(button => 
                        new ButtonBuilder()
                            .setCustomId(button.customId)
                            .setLabel(button.label)
                            .setEmoji(button.emoji)
                            .setStyle(button.style)
                    )
                );
                rows.push(row);
            }


            const messageEmbed = new EmbedBuilder()
                .setTitle(`Autoroles - ${title}`)
                .setDescription('Haz clic en los botones para obtener o remover los roles')
                .setColor('Random');

            await channel.send({ embeds: [messageEmbed], components: rows });
            return interaction.reply({
                embeds: [embed.setDescription(`Se ha enviado el mensaje de autoroles al canal ${channel}`).setColor('Green')]
            });
        }
    }
};