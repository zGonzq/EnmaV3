const { SlashCommandBuilder, EmbedBuilder, StringSelectMenuBuilder, ActionRowBuilder, ComponentType } = require('discord.js');
const fs = require('fs');
const path = require('path');

const emojis = {
    general: '🛡️',
    economy: '💰',
    fun: '🎮',
    moderator: '🔨',
    util: '🎇',
    integrations: '🤝',
    admin: '🔧',
};

const ignoredFolders = ['dev', 'context'];

function getCommands(client, name) {
    const getCommandID = client.application.commands.cache
        .filter((cmd) => cmd.name === name)
        .map((cmd) => cmd.id);

    return getCommandID[0];
}

const commandsPath = process.env.NODE_ENV === 'production' ? '../dist/commands' : '../src/commands';

module.exports = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('Muestra la lista de comandos organizados por categorías'),

    run: async ({ interaction, client }) => {
        try {
            const commandFolders = fs.readdirSync(path.join(__dirname, commandsPath))
                .filter(folder => fs.statSync(path.join(__dirname, commandsPath, folder)).isDirectory() && !ignoredFolders.includes(folder.toLowerCase()));

            const options = commandFolders.map(folder => ({
                label: folder.charAt(0).toUpperCase() + folder.slice(1),
                value: folder.toLowerCase(),
                emoji: emojis[folder.toLowerCase()] || '❓'
            }));

            const selectMenu = new StringSelectMenuBuilder()
                .setCustomId(interaction.id)
                .setPlaceholder('Selecciona una categoría')
                .addOptions(options);

            const row = new ActionRowBuilder().addComponents(selectMenu);

            const embed = new EmbedBuilder()
                .setTitle('Lista de Comandos')
                .setDescription('Selecciona una categoría para ver los comandos disponibles.')
                .setFooter({ text: 'El menú se cerrará automáticamente en 60 segundos.'})
                .setAuthor({name: client.user.username, iconURL: client.user.displayAvatarURL()})
                .setColor('Blurple');

            const reply = await interaction.reply({ embeds: [embed], components: [row] });

            const collector = reply.createMessageComponentCollector({
                componentType: ComponentType.StringSelect,
                time: 60_000
            });

            collector.on('collect', async (i) => {
                if (i.user.id !== interaction.user.id) {
                    const helpEmbed = new EmbedBuilder()
                        .setDescription('Este menú de ayuda no es tuyo.\nPuedes obtener ayuda utilizando /help')
                        .setColor('Red');
                    await i.reply({ embeds: [helpEmbed], ephemeral: true });
                    return;
                }

                const selectedCategory = i.values[0];
                const categoryPath = path.join(__dirname, commandsPath, selectedCategory);

                // Convertir el nombre de la carpeta a minúsculas para evitar problemas de sensibilidad a mayúsculas y minúsculas
                const commandFiles = fs.readdirSync(categoryPath).filter(file => file.toLowerCase().endsWith('.js'));

                const commands = commandFiles.map(file => {
                    const command = require(path.join(categoryPath, file));
                    const commandId = getCommands(client, command.data.name);
                    return `</${command.data.name}:${commandId}> \n${command.data.description}`;
                });

                const categoryEmbed = new EmbedBuilder()
                    .setTitle(`Comandos de ${selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)} [${commands.length}]`)
                    .setDescription(commands.join('\n\n'))
                    .setFooter({ text: 'El menú se cerrará automáticamente en 60 segundos.'})
                    .setAuthor({name: client.user.username, iconURL: client.user.displayAvatarURL()})
                    .setColor('Blurple');

                await i.update({ embeds: [categoryEmbed], components: [row] });
            });

            collector.on('end', async () => {
                const closedEmbed = new EmbedBuilder()
                    .setTitle('Menú cerrado')
                    .setDescription('El menú de ayuda se ha cerrado.')
                    .setAuthor({name: client.user.username, iconURL: client.user.displayAvatarURL()})
                    .setColor('Blurple');
                
                await reply.edit({ embeds: [closedEmbed], components: [] });
            });

        } catch (error) {
            console.error(error);
            await interaction.reply({ content: 'Hubo un error al ejecutar el comando.', ephemeral: true });
        }
    },
};