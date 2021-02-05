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
        thumbnail: {
            type: String,
        },
        type: {
            type: String,
        },
        session: {
            type: String,
        },
        refreshToken: {
            type: String,
        },
        applications: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Application',
            },
        ],
        todos: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Todo',
            },
        ],
        resumes: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Resume',
            },
        ],
        contacts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Contact',
            },
        ],
    },
    {
        timestamps: true,
    }
);

const User = mongoose.model('User', userSchema);

module.exports = User;
