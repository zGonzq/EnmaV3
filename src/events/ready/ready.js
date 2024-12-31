const mongoose = require('mongoose');
/** * @param {import('discord.js').Client} client */
module.exports = (client) => {
    console.log(`Conectado como ${client.user.tag}`);
    console.log(`Estado de la base de datos: ${mongoose.connection.readyState === 1 ? 'Conectada' : 'No conectada'}`);
    console.log(`Activo en: ${client.guilds.cache.size} servidores`);
};

