const mongoose = require('mongoose');
const os = require('os');
const { EmbedBuilder } = require('discord.js');

let lastMessageId = null;
/** * @param {import('discord.js').Client} client */
module.exports = (client) => {
    const channelId = '1188964850282541157';
    const statusChannel = client.channels.cache.get(channelId);





    if (!statusChannel) {
        console.error(`No se pudo encontrar el canal con la ID ${channelId}`);
        return;
    }

    setInterval(async () => {
        const statusEmbed = generateStatusEmbed(client);

        const lastMessage = (await statusChannel.messages.fetch({ limit: 5 })).first();

        if (lastMessage.author.id !== client.user.id) return;

        if (lastMessage) {
            await lastMessage.edit({ embeds: [statusEmbed] });
        } else {
            await statusChannel.send({ embeds: [statusEmbed] });
        }
    }, 60 * 1000); 
}

function generateStatusEmbed(client) {
    return new EmbedBuilder()
        .setColor('Blurple')
        .setTitle('Análisis de estado')
        .setFooter({ text: `${os.cpus()[0].model} | ${os.platform()} ${os.release()}` })
        .addFields(
            { name: '👾 RAM', value: `\`\`\`${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB\`\`\`` },
            { name: '🛫 CPU%', value: `\`\`\`${(process.cpuUsage().system / 1024 / 1024).toFixed(2)}%\`\`\`` },
            { name: '💡 Uptime', value: `\`\`\`${(process.uptime() / 60 / 60).toFixed(2)} horas\`\`\`` },
            { name: '📡 Ping', value: `\`\`\`${client.ws.ping} ms\`\`\`` },
            { name: '📃 Base de datos', value: `\`\`\`${mongoose.connection.readyState === 1 ? 'Conectada' : 'No conectada'}\`\`\`` },
            { name: '✏️ Última actualización', value: `\`\`\`${new Date().toLocaleString()}\`\`\`` },
            { name: '🎮 Activo desde', value: `\`\`\`${client.readyAt.toLocaleString()}\`\`\`` },
        );
}
  