const { EmbedBuilder, ContextMenuCommandBuilder, ApplicationCommandType } = require('discord.js');
module.exports = {
    /** @type {import('commandkit').CommandData}  */
    data: new ContextMenuCommandBuilder()
        .setName('User info')
        .setType(ApplicationCommandType.User),
    /**
    * @param {import('commandkit').ContextMenuCommandProps} param0
    */
    run: async ({ interaction, client, handler }) => {

        const user = await client.users.fetch(interaction.targetId, { force: true });
        
        const embed = new EmbedBuilder()
            .setTitle('User info')
            .setDescription(`Información de: ${user}`)
            .setFields(
                { name: 'Username', value: user.username, inline: false },
                { name: 'Tag', value: user.tag, inline: false },
                { name: 'ID', value: user.id, inline: false },
                { name: 'Bot', value: user.bot ? 'Sí' : 'No', inline: false },
                { name: 'Flags', value: user.flags.toArray().join(', ') || 'No flags', inline: false },
                { name: 'Creación', value: `<t:${Math.floor(user.createdTimestamp / 1000)}:R>`, inline: false },

            )
            .setThumbnail(user.displayAvatarURL({ dynamic: true, size: 4096 }))
            .setImage(user.bannerURL({ dynamic: true }))
            .setTimestamp();
        interaction.reply({ embeds: [embed] });
        
    },
};
