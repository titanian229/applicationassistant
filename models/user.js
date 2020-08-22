const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
        },
        authID: {
            type: String,
        },
        password: {
            type: String,
        },
        sessionID: {
            type: String,
        },
        applications: [
            {
                type: Schema.Types.ObjectId,
                ref: 'application',
            },
        ],
        todos: [
            {
                type: Schema.Types.ObjectId,
                ref: 'todo',
            },
        ],
        resumes: [
            {
                type: Schema.Types.ObjectId,
                ref: 'resume',
            },
        ],
        contacts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'contact',
            },
        ],
    },
    {
        timestamps: true,
    }
);

const User = mongoose.model('User', userSchema);

module.exports = User;
