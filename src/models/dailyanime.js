const { Schema, model, models } = require('mongoose');

const dailyAnimeSchema = new Schema({
  guildId: { type: String, required: true, unique: true },
  channelId: { type: String, required: true }
});

module.exports = models.DailyAnime || model('DailyAnime', dailyAnimeSchema);
