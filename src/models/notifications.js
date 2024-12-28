const { Schema, model, models } = require('mongoose');

const notificationsSchema = new Schema({
    guildId: { type: String, required: true },
    channelId: { type: String, required: true },
    twitch: [{
        username: { type: String },
        status: { type: String, default: 'offline' }
    }],
    youtube: {
        channelId: { type: String },
        lastVideoId: { type: String, default: '' }
    }
});
module.exports = models.Notifications || model('Notifications', notificationsSchema);