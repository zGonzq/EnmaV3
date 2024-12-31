const { EmbedBuilder } = require('discord.js');

module.exports = async (interaction) => {
    if (!interaction.isButton() || !interaction.customId.startsWith('autorole_')) return;

    const roleId = interaction.customId.replace('autorole_', '');
    const role = interaction.guild.roles.cache.get(roleId);
    
    if (!role) {
        return interaction.reply({
            embeds: [new EmbedBuilder().setDescription('Este rol ya no existe').setColor('Red')],
            ephemeral: true
        });
    }

    const member = interaction.member;
    const hasRole = member.roles.cache.has(roleId);

    try {
        if (hasRole) {
            await member.roles.remove(role);
            return interaction.reply({
                embeds: [new EmbedBuilder().setDescription(`Se te ha quitado el rol ${role}`).setColor('Red')],
                ephemeral: true
            });
        } else {
            await member.roles.add(role);
            return interaction.reply({
                embeds: [new EmbedBuilder().setDescription(`Se te ha añadido el rol ${role}`).setColor('Green')],
                ephemeral: true
            });
        }
    } catch (error) {
        return interaction.reply({
            embeds: [new EmbedBuilder().setDescription('No pude modificar tus roles. Asegúrate de que tengo los permisos necesarios').setColor('Red')],
            ephemeral: true
        });
    }
};