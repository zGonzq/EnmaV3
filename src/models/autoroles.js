const { Schema, model, models } = require('mongoose');

const autoroleSchema = new Schema({
    guildId: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    roles: [{
        type: String,
        required: true
    }]
});

module.exports = models.Autorole || model('Autorole', autoroleSchema);