const { EmbedBuilder } = require('discord.js');
const Birthday = require('../../models/birthday');

/** * @param {import('discord.js').Client} client */
module.exports = async (client) => {
    setInterval(async () => {
        const now = new Date();
        const day = now.getDate();
        const month = now.getMonth() + 1;

        const birthdays = await Birthday.find({ day: day, month: month });

        birthdays.forEach(birthday => {
            const user = client.users.cache.get(birthday.userID);
            if (user) {
                const embed = new EmbedBuilder()
                    .setColor('Random')
                    .setTitle('¡Feliz cumpleaños!')
                    .setDescription(`¡Feliz cumpleaños, ${user}, te deseamos un agradable día! 🎉`);
                try {
                    user.send({ embeds: [embed] });
                } catch (error) {
                    console.error(`No se pudo enviar un mensaje a ${user.username}.`);
                }
            }
        });
    }, 24 * 60 * 60 * 1000);
};