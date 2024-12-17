const { EmbedBuilder, ContextMenuCommandBuilder, ApplicationCommandType } = require('discord.js');

module.exports = {
    /** @type {import('commandkit').CommandData}  */
    data: new ContextMenuCommandBuilder()
        .setName('User Icon')
        .setType(ApplicationCommandType.User),
    /**
    * @param {import('commandkit').ContextMenuCommandProps} param0
    */
    run: async ({ interaction, client, handler }) => {
        const user = await client.users.fetch(interaction.targetId, { force: true });

        const embed = new EmbedBuilder()
            .setTitle(`Avatar de ${user.username}`)
            .setDescription(`[Descargar](${user.displayAvatarURL({ dynamic: true, size: 4096 })})`)
            .setImage(user.displayAvatarURL({ dynamic: true, size: 4096 }))
            .setColor("Random")
            .setFooter({ text: `Avatar solicitado por: ${user.username}`, iconURL: `${user.displayAvatarURL({ dynamic: true })}` })
            .setTimestamp();

        interaction.reply({ embeds: [embed] });
    },
};