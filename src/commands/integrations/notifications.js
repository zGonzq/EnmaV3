const { SlashCommandBuilder, EmbedBuilder, PermissionsBitField } = require('discord.js');
const Notifications = require('../../models/notifications');
const axios = require('axios');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('notifications')
        .setDescription('Configura las notificaciones de Twitch y YouTube')
        .setDefaultMemberPermissions(PermissionsBitField.Flags.ManageMessages | PermissionsBitField.Flags.ManageChannels)
        .addSubcommand(subcommand =>
            subcommand
                .setName('remove')
                .setDescription('Elimina notificaciones configuradas')
                .addStringOption(option =>
                    option.setName('type')
                        .setDescription('Tipo de notificación a eliminar')
                        .setRequired(true)
                        .addChoices(
                            { name: 'Twitch', value: 'twitch' },
                            { name: 'YouTube', value: 'youtube' }
                        ))
                .addStringOption(option =>
                    option.setName('identifier')
                        .setDescription('Nombre de usuario (Twitch) o ID del canal (YouTube)')
                        .setRequired(true)))
        .addSubcommand(subcommand =>
            subcommand
                .setName('twitch')
                .setDescription('Configura las notificaciones de Twitch')
                .addStringOption(option =>
                    option.setName('username')
                        .setDescription('Nombre de usuario de Twitch')
                        .setRequired(true))
                .addChannelOption(option =>
                    option.setName('channel')
                        .setDescription('Canal donde se enviarán las notificaciones')
                        .setRequired(true)))
        .addSubcommand(subcommand =>
            subcommand
                .setName('youtube')
                .setDescription('Configura las notificaciones de YouTube')
                .addStringOption(option =>
                    option.setName('channelid')
                        .setDescription('ID del canal de YouTube')
                        .setRequired(true))
                .addChannelOption(option =>
                    option.setName('channel')
                        .setDescription('Canal donde se enviarán las notificaciones')
                        .setRequired(true))),

    run: async ({ interaction }) => {
        const subcommand = interaction.options.getSubcommand();
        const channel = interaction.options.getChannel('channel');
        const embed = new EmbedBuilder();

        if (!channel.permissionsFor(interaction.guild.members.me).has(PermissionsBitField.Flags.SendMessages)) {
            return interaction.reply({
                embeds: [embed.setDescription('No tengo permisos para enviar mensajes en ese canal.').setColor('Red')],
                ephemeral: true
            });
        }

        let notifications = await Notifications.findOne({ guildId: interaction.guild.id });

        if (!notifications) {
            notifications = new Notifications({
                guildId: interaction.guild.id,
                channelId: channel.id,
                twitch: [],
                youtube: {}
            });
        } else {
            notifications.channelId = channel.id;
        }

        if (subcommand === 'remove') {
            const type = interaction.options.getString('type');
            const identifier = interaction.options.getString('identifier');
            const embed = new EmbedBuilder();

            let notifications = await Notifications.findOne({ guildId: interaction.guild.id });
            
            if (!notifications) {
                return interaction.reply({
                    embeds: [embed.setDescription('No hay notificaciones configuradas en este servidor.').setColor('Red')],
                    ephemeral: true
                });
            }

            if (type === 'twitch') {
                const userIndex = notifications.twitch.findIndex(user => user.username.toLowerCase() === identifier.toLowerCase());
                
                if (userIndex === -1) {
                    return interaction.reply({
                        embeds: [embed.setDescription('No se encontró ese usuario de Twitch en la configuración.').setColor('Red')],
                        ephemeral: true
                    });
                }

                notifications.twitch.splice(userIndex, 1);
                await notifications.save();

                embed.setDescription(`Se eliminaron las notificaciones de Twitch para ${identifier}`)
                    .setColor('Green');

            } else if (type === 'youtube') {
                if (!notifications.youtube.channelId || notifications.youtube.channelId !== identifier) {
                    return interaction.reply({
                        embeds: [embed.setDescription('No se encontró ese canal de YouTube en la configuración.').setColor('Red')],
                        ephemeral: true
                    });
                }

                notifications.youtube = {};
                await notifications.save();

                embed.setDescription('Se eliminaron las notificaciones de YouTube')
                    .setColor('Green');
            }

            return interaction.reply({ embeds: [embed] });
        }

        if (subcommand === 'twitch') {
            const username = interaction.options.getString('username');
            
            try {
                const avatar = await axios.get(`https://decapi.me/twitch/avatar/${username}`);
                if (avatar.data === 'Invalid Twitch user specified') {
                    return interaction.reply({
                        embeds: [embed.setDescription('El usuario de Twitch no existe.').setColor('Red')],
                        ephemeral: true
                    });
                }

                const existingUser = notifications.twitch.find(user => user.username === username);
                if (existingUser) {
                    return interaction.reply({
                        embeds: [embed.setDescription('Este usuario ya está configurado para notificaciones.').setColor('Red')],
                        ephemeral: true
                    });
                }

                notifications.twitch.push({ username, status: 'offline' });
                await notifications.save();

                embed.setTitle('Notificaciones de Twitch')
                    .setDescription(`Las notificaciones para ${username} han sido configuradas en ${channel}.`)
                    .setColor('Green');

            } catch (error) {
                console.error('Error al configurar notificaciones de Twitch:', error);
                embed.setDescription('Hubo un error al configurar las notificaciones.').setColor('Red');
            }
        } else if (subcommand === 'youtube') {
            const channelId = interaction.options.getString('channelid');
            notifications.youtube.channelId = channelId;
            await notifications.save();

            embed.setTitle('Notificaciones de YouTube')
                .setDescription(`Las notificaciones para el canal de YouTube han sido configuradas en ${channel}.`)
                .setColor('Green');
        }

        interaction.reply({ embeds: [embed] });
    }
};