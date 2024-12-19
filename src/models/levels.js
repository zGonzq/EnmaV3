const { Schema, model, models } = require('mongoose');

const levelSchema = new Schema({
    guildId: { type: String, required: true },
    userId: { type: String, required: true },
    xp: { type: Number, default: 0 },
    level: { type: Number, default: 0 },
});

module.exports = models.Level || model('Level', levelSchema);