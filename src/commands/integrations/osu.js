const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');
const osu = require('node-osu');

require('dotenv').config();
const osuApi = new osu.Api(process.env.OSU_API_KEY, {
    notFoundAsError: true,
    completeScores: false
});

/**
* @type {import('commandkit').CommandData}
*/

module.exports = {
    data: new SlashCommandBuilder()
        .setName('osu')
        .setDescription('Obtiene estadísticas de un usuario de osu!')
        .addStringOption(option =>
            option.setName('username')
                .setDescription('Nombre de usuario de osu!')
                .setRequired(true)),
    async execute(interaction) {
        const username = interaction.options.getString('username');

        try {
            const user = await osuApi.getUser({ u: username });

            const embed = new EmbedBuilder()
                .setTitle(`Estadísticas de ${user.name}`)
                .setThumbnail(`http://s.ppy.sh/a/${user.id}`)
                .setAuthor({ name: `Perfil de ${user.name}`, iconURL: `http://s.ppy.sh/a/${user.id}`, url: `https://osu.ppy.sh/users/${user.id}` })
                .addFields(
                    { name: 'Nombre', value: user.name, inline: true },
                    { name: 'ID', value: user.id, inline: true },
                    { name: 'País', value: `${user.country} (:flag_${user.country.toLowerCase()}:)`, inline: true },
                    { name: 'Posición global', value: `#${user.pp.rank}`, inline: true },
                    { name: 'Posición del país', value: `#${user.pp.countryRank}`, inline: true },
                    { name: 'PP', value: `${user.pp.raw}`, inline: true },
                    { name: 'Nivel', value: `${Math.round(user.level)}`, inline: true },
                    { name: 'Precisión', value: `${user.accuracyFormatted}`, inline: true },
                    { name: 'Jugadas', value: `${user.counts.plays}`, inline: true },
                    { name: 'SS+ / SS / S+ / S / A', value: `${user.counts.SSH} / ${user.counts.SS} / ${user.counts.S} / ${user.counts.S} / ${user.counts.A}`, inline: false },
                )
                .setImage(`https://lemmmy.pw/osusig/sig.php?colour=hexff66aa&uname=${user.name}&pp=2&countryrank&flagshadow&darktriangles&onlineindicator=undefined&xpbar&xpbarhex`)
                .setColor('#FF66AA')
                .setTimestamp();

            interaction.reply({ embeds: [embed] });
        } catch (error) {
            const embed = new EmbedBuilder()
                .setTitle(`Error`)
                .setDescription(`No se ha encontrado el usuario \`${username}\`.`)
                .setColor('#FF66AA')
                .setTimestamp();
            interaction.reply({ embeds: [embed] });
        }
    }
};