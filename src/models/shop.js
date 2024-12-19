const { Schema, model, models } = require('mongoose');

const shopSchema = new Schema({
    guildId: { type: String, required: true, unique: true },
    roles: [
        {
            id: String,
            price: Number,
        },
    ],
});

module.exports = models.Shop || model('Shop', shopSchema);