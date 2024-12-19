const { Schema, model, models } = require('mongoose');

const todoSchema = new Schema({
    userId: { type: String, required: true, unique: true },
    tasks: [
        {
            title: { type: String, required: true },
            description: { type: String },
            status: { type: String, enum: ['pending', 'in progress', 'completed'], default: 'pending' }
        }
    ]
});

module.exports = models.Todo || model('Todo', todoSchema);