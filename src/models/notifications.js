const { Schema, model } = require('mongoose');

const notificationsSchema = new Schema({
    guildId: { type: String, required: true },
    channelId: { type: String, required: true },
    twitch: [{
        username: { type: String },
        status: { type: String, default: 'offline' }
    }],
    youtube: {
        channelId: { type: String }
    }
});

module.exports = model('Notifications', notificationsSchema);