const mongoose = require('mongoose');

const logsSchema = new mongoose.Schema({
  guildId: { type: String, required: true, unique: true },
  logChannelId: { type: String, required: true },
  enabled: { type: Boolean, default: false },
});

module.exports = mongoose.model('Logs', logsSchema);