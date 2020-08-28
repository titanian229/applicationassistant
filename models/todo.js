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
        associatedContact: {
            type: Schema.Types.ObjectId,
            ref: 'Contact',
        },

        associatedApplication: {
            type: Schema.Types.ObjectId,
            ref: 'Application',
        },
    },
    {
        timestamps: true,
    }
);

const Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo;
