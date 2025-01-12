require('dotenv/config');

const { Client, GatewayIntentBits } = require('discord.js');
const { CommandKit } = require('commandkit');
const { join } = require('path');
const mongoose = require('mongoose');
const { DisTube } = require('distube');
const { YtDlpPlugin } = require('@distube/yt-dlp');

const express = require('express');
const app = express();
const os = require('os');

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

const distube = new DisTube(client, {
    plugins: [new YtDlpPlugin({ cookies: '../youtube_cookies.txt' })],
});

client.distube = distube;

require('./utils/distubeEvents')(client);

mongoose.set('strictQuery', false);
await mongoose.connect(process.env.MONGO_URI);

client.login(process.env.TOKEN);

app.get('/api/stats', (req, res) => {
  const stats = {
    servers: client.guilds.cache.size,
    users: client.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0),
    channels: client.channels.cache.size,
    uptime: client.readyAt.toLocaleString(),
  };
  
  res.json(stats);
});

app.listen(3000, () => {
  console.log('API running on port 3000');
});