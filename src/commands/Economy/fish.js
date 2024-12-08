const { EmbedBuilder, SlashCommandBuilder } = require("discord.js");
const economy = require('../../models/economy');

const fishTypes = [
    { name: 'Pez Estrella', price: 100000, probability: 0.0000001, rarity: 'Singular' },
    { name: 'Pez Galáctico', price: 75000, probability: 0.000001, rarity: 'Singular' },
    { name: 'Pez Nebuloso', price: 50000, probability: 0.00003, rarity: 'Único' },
    { name: 'Pez Cometa', price: 4237, probability: 0.00005, rarity: 'Único' },
    { name: 'Pez Supernova', price: 3125, probability: 0.00006, rarity: 'Único' },
    { name: 'Pez Cuásar', price: 2876, probability: 0.00007, rarity: 'Único' },
    { name: 'Pez Pulsar', price: 1987, probability: 0.00008, rarity: 'Único' },
    { name: 'Pez Meteoro', price: 1765, probability: 0.00009, rarity: 'Único' },
    { name: 'Pez Asteroide', price: 1543, probability: 0.0001, rarity: 'Mítico' },
    { name: 'Pez Planeta', price: 1321, probability: 0.0002, rarity: 'Mítico' },
    { name: 'Pez Satélite', price: 1109, probability: 0.0003, rarity: 'Mítico' },
    { name: 'Pez Estrella Fugaz', price: 987, probability: 0.0004, rarity: 'Mítico' },
    { name: 'Pez Lunar', price: 876, probability: 0.0005, rarity: 'Mítico' },
    { name: 'Pez Solar', price: 765, probability: 0.001, rarity: 'Mítico' },
    { name: 'Pez Cósmico', price: 654, probability: 0.002, rarity: 'Mítico' },
    { name: 'Pez Espacial', price: 543, probability: 0.005, rarity: 'Legendario' },
    { name: 'Pez Estelar', price: 432, probability: 0.01, rarity: 'Legendario' },
    { name: 'Pez Galaxia', price: 321, probability: 0.02, rarity: 'Épico' },
    { name: 'Pez Vía Láctea', price: 210, probability: 0.03, rarity: 'Épico' },
    { name: 'Pez Andrómeda', price: 109, probability: 0.04, rarity: 'Épico' },
    { name: 'Pez Orión', price: 98, probability: 0.05, rarity: 'Raro' },
    { name: 'Pez Cassiopeia', price: 87, probability: 0.07, rarity: 'Poco común' },
    { name: 'Pez Pegaso', price: 76, probability: 0.08, rarity: 'Poco común' },
    { name: 'Pez Hércules', price: 65, probability: 0.10, rarity: 'Poco común' },
    { name: 'Pez Draco', price: 54, probability: 0.15, rarity: 'Común' },
    { name: 'Pez Fénix', price: 43, probability: 0.20, rarity: 'Común' },
    { name: 'Pez Centauro', price: 32, probability: 0.25, rarity: 'Común' },
    { name: 'Pez Hidra', price: 21, probability: 0.25, rarity: 'Común' }
];

const failMessages = [
    "¡El pez se soltó!",
    "¡Solo has traído algas!",
    "¡El anzuelo se rompió!",
    "¡No has pescado nada!",
    "¡El pez escapó!"
];

const embedColors = [
    { rarity: 'Singular', color: '#030000' },
    { rarity: 'Único', color: '#ff0d25' },
    { rarity: 'Mítico', color: '#4336ff' },
    { rarity: 'Legendario', color: '#ff7605' },
    { rarity: 'Épico', color: '#6905ff' },
    { rarity: 'Raro', color: '#00c7bd' },
    { rarity: 'Poco común', color: '#00ff95' },
    { rarity: 'Común', color: '#e0dede' }
];

function getRandomFish() {
    const random = Math.random();
    let cumulativeProbability = 0;

    for (const fish of fishTypes) {
        cumulativeProbability += fish.probability;
        if (random < cumulativeProbability) {
            return fish;
        }
    }

    return fishTypes[0];
}


module.exports = {
    /** @type {import('commandkit').CommandData}  */
    data: new SlashCommandBuilder()
      .setName('fish')
      .setDescription('Intenta pescar para ganar monedas.'),
    /**
     * @param {import('commandkit').SlashCommandProps} param0
     */
    run: async ({ interaction, client, handler }) => {
        const embed = new EmbedBuilder();
        if (!interaction.guild) {
            return interaction.reply({ embeds: [embed.setDescription('Este comando solo está disponible en servidores.').setColor('Red')] });
        }

        let data = await economy.findOne({ userId: interaction.user.id, guildId: interaction.guild.id });

        if (!data) {
            data = new economy({
                userId: interaction.user.id,
                guildId: interaction.guild.id,
            });
            await data.save();
        }

        const lastFish = data.lastFish;
        const now = new Date();
        const diff = now - lastFish;
        const diffMinutes = Math.floor(diff / 1000 / 60);

        if (diffMinutes < 5) {
            const minutesLeft = 5 - diffMinutes;
            return interaction.reply({ embeds: [embed.setDescription(`Ya has pescado recientemente. Puedes pescar de nuevo en ${minutesLeft} minutos.`).setColor('Red')] });
        }

        data.lastFish = now;

        const success = Math.random() < 0.7;
        if (success) {
            const fish = getRandomFish();
            data.balance += fish.price;
            await data.save();

            return interaction.reply({ embeds: [embed.setTitle('Pesca exitosa').setDescription(`Has pescado un ${fish.name} (${fish.rarity}) y ganado ${fish.price} monedas. Ahora tienes ${data.balance} monedas.`).setThumbnail('https://media4.giphy.com/media/2VOB4tK9qsQ7efC2Ub/200w.gif?cid=6c09b9522cvz524dmxgp8s3vlkgrslw37lmdmu6wqhgnbit9&ep=v1_gifs_search&rid=200w.gif&ct=g').setColor(embedColors.find(color => color.rarity === fish.rarity).color)] });
        } else {
            const failMessage = failMessages[Math.floor(Math.random() * failMessages.length)];
            return interaction.reply({ embeds: [embed.setTitle('Pesca fallida').setDescription(`${failMessage} No has ganado ninguna moneda.`).setColor('Red')] });
        }
    },
}