const { EmbedBuilder, SlashCommandBuilder } = require("discord.js");
const economy = require('../../models/economy');

const minerals = [
    { name: 'Diamante de la Galaxia', price: 1000000, probability: 0.0000001, rarity: 'Singular' },
    { name: 'Gema del Infinito', price: 145840, probability: 0.000001, rarity: 'Singular' },
    { name: 'Meteorito de Antimateria', price: 8238, probability: 0.00003, rarity: 'Único' },
    { name: 'Perla de Dimensión', price: 7231, probability: 0.00005, rarity: 'Único' },
    { name: 'Fragmento de Realidad', price: 6239, probability: 0.00006, rarity: 'Único' },
    { name: 'Esquirla de Tiempo', price: 5627, probability: 0.00007, rarity: 'Único' },
    { name: 'Gema de Luz', price: 4623, probability: 0.00008, rarity: 'Único' },
    { name: 'Cristal de Energía', price: 4104, probability: 0.00009, rarity: 'Único' },
    { name: 'Esquirla de Estrella de Neutrones', price: 3569, probability: 0.0001, rarity: 'Mítico' },
    { name: 'Fragmento de Pulsar', price: 2937, probability: 0.0002, rarity: 'Mítico' },
    { name: 'Cristal de Materia Oscura', price: 2552, probability: 0.0003, rarity: 'Mítico' },
    { name: 'Gema de Agujero Negro', price: 2178, probability: 0.0004, rarity: 'Mítico' },
    { name: 'Ópalo de Quásar', price: 1823, probability: 0.0005, rarity: 'Mítico' },
    { name: 'Perla de Nebulosa', price: 1542, probability: 0.001, rarity: 'Mítico' },
    { name: 'Fragmento de Supernova', price: 1245, probability: 0.002, rarity: 'Mítico' },
    { name: 'Cristal de Plasma', price: 723, probability: 0.005, rarity: 'Legendario' },
    { name: 'Diamante Espacial', price: 640, probability: 0.01, rarity: 'Legendario' },
    { name: 'Rubí Celestial', price: 410, probability: 0.02, rarity: 'Épico' },
    { name: 'Zafiro Estelar', price: 335, probability: 0.03, rarity: 'Épico' },
    { name: 'Esmeralda Cósmica', price: 250, probability: 0.04, rarity: 'Épico' },
    { name: 'Ópalo Galáctico', price: 180, probability: 0.05, rarity: 'Raro' },
    { name: 'Esquirla de Asteroide', price: 125, probability: 0.07, rarity: 'Poco común' },
    { name: 'Gema de Neón', price: 85, probability: 0.08, rarity: 'Poco común' },
    { name: 'Roca Espacial', price: 50, probability: 0.10, rarity: 'Poco común' },
    { name: 'Cristal Lunar', price: 30, probability: 0.15, rarity: 'Común' },
    { name: 'Fragmento de Cometa', price: 15, probability: 0.20, rarity: 'Común' },
    { name: 'Polvo Estelar', price: 10, probability: 0.25, rarity: 'Común' }
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
]

function getRandomMineral() {
    const random = Math.random();
    let cumulativeProbability = 0;

    for (const mineral of minerals) {
        cumulativeProbability += mineral.probability;
        if (random < cumulativeProbability) {
            return mineral;
        }
    }

    return minerals[0];
}

module.exports = {
    /** @type {import('commandkit').CommandData}  */
    data: new SlashCommandBuilder()
      .setName('mine')
      .setDescription('Mina para encontrar minerales espaciales y ganar monedas.'),
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


        const lastMine = data.lastMine;
        const now = new Date();
        const diff = now - lastMine;
        const diffMinutes = Math.floor(diff / 1000 / 60);


        if (diffMinutes < 5) {
            const minutesLeft = 5 - diffMinutes;
            return interaction.reply({ embeds: [embed.setDescription(`Ya has minado recientemente. Puedes minar de nuevo en ${minutesLeft} minutos.`).setColor('Red')] });
        }

        data.lastMine = now;
        const mineral = getRandomMineral();
        data.balance += mineral.price;
        await data.save();

        interaction.reply({ embeds: [embed.setTitle('Minería').setDescription(`Has encontrado **${mineral.name}** (${mineral.rarity}) y ganado ${mineral.price} monedas. Ahora tienes ${data.balance} monedas.`).setColor(embedColors.find(color => color.rarity === mineral.rarity).color).setThumbnail("https://cdn-icons-gif.flaticon.com/12322/12322307.gif")] });
    },
}