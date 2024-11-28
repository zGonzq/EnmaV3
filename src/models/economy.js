const { Schema, model } = require('mongoose');

const economySchema = new Schema({
    userId: { type: String, required: true },
    guildId: { type: String, required: true },
    balance: { type: Number, default: 0 },
    lastDaily: { type: Date, default: new Date(0) },
    lastWork: { type: Date, default: new Date(0) },
    lastWeekly: { type: Date, default: new Date(0) },
    lastMiniwork: { type: Date, default: new Date(0) },
    lastMine: { type: Date, default: new Date(0) },
    lastRob: { type: Date, default: new Date(0) },
    lastFish: { type: Date, default: new Date(0) },
    lastCrime: { type: Date, default: new Date(0) },
    lastGamble: { type: Date, default: new Date(0) },
    lastBet: { type: Date, default: new Date(0) },
    lastCoinflip: { type: Date, default: new Date(0) },
    lastRoulette: { type: Date, default: new Date(0) },
});

module.exports = model('economy', economySchema);
