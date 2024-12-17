const { EmbedBuilder, ContextMenuCommandBuilder, ApplicationCommandType } = require('discord.js');

module.exports = {
    /** @type {import('commandkit').CommandData}  */
    data: new ContextMenuCommandBuilder()
        .setName('Get JSON')
        .setType(ApplicationCommandType.Message),
    /**
    * @param {import('commandkit').ContextMenuCommandProps} param0
    */
    run: async ({ interaction, client, handler }) => {
        const targetMessage = await interaction.channel.messages.fetch(interaction.targetId);

        if (targetMessage.embeds.length === 0) {
            const embed = new EmbedBuilder()
                .setDescription("El mensaje seleccionado no contiene ningún embed.")
                .setColor("Red");
            return interaction.reply({ embeds: [embed], ephemeral: true });
        }

        let resultEmbeds = [];

        targetMessage.embeds.forEach((embed, index) => {
            let embedJson = JSON.stringify(embed.toJSON(), null, 2);

            embedJson = embedJson.replace(/```/g, "\\`\\`\\`");

            if (embedJson.length > 6000) {
                let parts = embedJson.match(/[\s\S]{1,6000}/g) || [];

                parts.forEach((part, partIndex) => {
                    const resultEmbed = new EmbedBuilder()
                        .setTitle(`Embed ${index + 1}, Part ${partIndex + 1}`)
                        .setDescription(`\`\`\`json\n${part}\n\`\`\``)
                        .setFooter({ text: `JSON obtenido.`, iconURL: client.user.displayAvatarURL() })
                        .setTimestamp()
                        .setColor('Blurple');

                    resultEmbeds.push(resultEmbed);
                });
            } else {
                const resultEmbed = new EmbedBuilder()
                    .setTitle(`Embed ${index + 1}`)
                    .setDescription(`\`\`\`json\n${embedJson}\n\`\`\``)
                    .setFooter({ text: `JSON obtenido.`, iconURL: client.user.displayAvatarURL() })
                    .setTimestamp()
                    .setColor('Blurple');

                resultEmbeds.push(resultEmbed);
            }
        });

        interaction.reply({ embeds: resultEmbeds, ephemeral: true });
    },
};