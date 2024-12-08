const { Message, EmbedBuilder } = require('discord.js');
const Level = require('../../models/levels');
const calc = require('../../utils/calc');
const cooldowns = new Set();

function getXpRandom(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
/** 
 * @param {import('discord.js').Client} client 
 * @param {Message} message 
 * 
 * */

module.exports = async (client, message) => {
    const embed = new EmbedBuilder()

    if(!message.inGuild || message.author.bot  || cooldowns.has(message.author.id)) return;

    const xp = getXpRandom(5, 20);

    const query = {
        guildId: message.guild.id,  
        userId: message.author.id,
    }

    try {
        const level = await Level.findOne(query);

        if(level){
            level.xp += xp;

            if (level.xp > calc(level.level)) {
                level.xp = 0;
                level.level += 1;

                message.channel.send({ embeds: [embed.setTitle("¡Haz subido de nivel! 🎈").setDescription(`Felicidades ${message.author} has subido de nivel a ${level.level}`).setColor("Random")] });
            }
            await level.save().catch((err) => console.log(`Error al guardar el nuevo nivel: ${err}`));

            cooldowns.add(message.author.id);
            setTimeout(() => {
                cooldowns.delete(message.author.id);
            }, 5000);
        }

        if(!level){
            const newLevel = new Level({
                guildId: message.guild.id,
                userId: message.author.id,
                xp: xp,
                level: 0,
            });

            await newLevel.save().catch((err) => console.log(`Error al guardar el nuevo nivel: ${err}`));

            cooldowns.add(message.author.id);
            setTimeout(() => {
                cooldowns.delete(message.author.id);
            }, 5000);
        }

    } catch (error) {
        console.log("Error al ingresar la xp: "+error);
        
    }
};
