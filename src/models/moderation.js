const mongoose = require('mongoose');

const moderationSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  guildId: { type: String, required: true },
  action: { type: String, required: true },
  reason: { type: String, default: 'No especificada' },
  moderator: { type: String, required: true },
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.models.Moderation || mongoose.model('Moderation', moderationSchema);