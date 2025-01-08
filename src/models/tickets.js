const { Schema, model, models } = require('mongoose');

const ticketSchema = new Schema({
    guildId: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    categories: [{ type: String, required: true }],
    channelId: { type: String },
    userId: { type: String, required: true }
});

module.exports = models.Ticket || model('Ticket', ticketSchema);