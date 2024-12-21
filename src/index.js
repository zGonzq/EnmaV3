require('dotenv/config');

const { Client, GatewayIntentBits } = require('discord.js');
const { CommandKit } = require('commandkit');
const { join } = require('path');

const mongoose = require('mongoose');

const client = new Client({
    intents: Object.values(GatewayIntentBits)
});

new CommandKit({
    client,
    eventsPath: join(__dirname, 'events'),
    commandsPath: join(__dirname, 'commands'),
    devUserIds: ['944060279082340433'],
    devGuildIds: ['872260926055776267'],
    bulkRegister: true,
});

require("./handler/anticrash")(client);

mongoose.set('strictQuery', false);
await mongoose.connect(process.env.MONGO_URI);

client.login(process.env.TOKEN);