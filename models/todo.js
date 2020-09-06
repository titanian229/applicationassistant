const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const todoSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        date: {
            type: Date,
        },
        completed: {
            type: Boolean,
            default: false,
        },
        parentContact: {
            type: Schema.Types.ObjectId,
            ref: 'Contact',
        },

        parentApplication: {
            type: Schema.Types.ObjectId,
            ref: 'Application',
            required: true
        },
    },
    {
        timestamps: true,
    }
);

const Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo;
