const mongoose = require('mongoose');

const welcomeSettingsSchema = new mongoose.Schema({
  guildId: { type: String, required: true, unique: true },
  welcomeChannel: { type: String, required: true },
  leaveChannel: { type: String, required: true },
  userRole: { type: String, default: null },
  botRole: { type: String, default: null },
});

module.exports = mongoose.models.WelcomeSettings || mongoose.model('WelcomeSettings', welcomeSettingsSchema);