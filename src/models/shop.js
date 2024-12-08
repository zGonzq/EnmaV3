const mongoose = require('mongoose');

const shopSchema = new mongoose.Schema({
  guildId: { type: String, required: true, unique: true },
  roles: [
    {
      id: String,
      price: Number,
    },
  ],
});

module.exports = mongoose.model('Shop', shopSchema);