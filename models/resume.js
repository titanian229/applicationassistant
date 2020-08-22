const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const resumeSchema = new Schema(
    {
        name: {
            type: String,
        },
        link: {
            type: String,
            required: true,
        },
        associatedApplications: [
            {
                type: Schema.Types.ObjectId,
                ref: 'application',
            },
        ],
    },
    {
        timestamps: true,
    }
);

const Resume = mongoose.model('Resume', resumeSchema);

module.exports = Resume;
