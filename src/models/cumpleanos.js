const { model, Schema, models } = require('mongoose');

const birthdaySchema = new Schema({
    userID: String,
    day: Number,
    month: Number
});

module.exports = models.Birthday || model('Birthday', birthdaySchema);