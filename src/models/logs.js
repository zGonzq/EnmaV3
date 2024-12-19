const { Schema, model, models } = require('mongoose');

const logsSchema = new Schema({
    guildId: { type: String, required: true, unique: true },
    logChannelId: { type: String, required: true },
    enabled: { type: Boolean, default: false },
});

module.exports = models.Logs || model('Logs', logsSchema);