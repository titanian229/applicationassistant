const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const contactSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        roleTitle: {
            type: String,
        },
        businessName: {
            type: String,
        },
        contactMethods: [
            {
                name: String,
                details: String,
            },
        ],
        notes: String,
        associatedTodos: [
            {
                type: Schema.Types.ObjectId,
                ref: 'todo',
            },
        ],
    },
    {
        timestamps: true,
    }
);

const Contact = mongoose.model('Contact', contactSchema);

module.exports = Contact;
