const { model, Schema } = require('mongoose');

const birthdaySchema = new Schema({
    userID: String,
    day: Number,
    month: Number
});

module.exports = model('Birthday', birthdaySchema);