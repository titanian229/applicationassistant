const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const applicationSchema = new Schema(
    {
        businessName: {
            type: String,
            required: true,
        },
        roleTitle: {
            type: String,
            required: true,
        },
        requirementsNote: {
            type: String,
        },
        notes: {
            type: String,
        },
        postLink: {
            type: String,
        },
        dateFound: {
            type: Date,
        },
        foundWhereNote: {
            type: String,
        },
        haveApplied: {
            type: Boolean,
            default: false,
        },
        appliedDate: {
            type: Date,
        },
        interviewsArray: [
            {
                date: { type: Date },
                interviewType: { type: String, enum: ['email', 'phone', 'inperson', 'teleconference'] },
                // interviewContactsNames: {
                //     type: String,
                // },
                // interviewContacts: [
                //     {
                //         type: Schema.Types.ObjectId,
                //         ref: 'contact',
                //     },
                // ],
                notes: String,
            },
        ],
        haveResearched: {
            type: Boolean,
            default: false,
        },
        haveResearchedNotes: {
            type: String,
        },
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
        todos: [
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

const Application = mongoose.model('Application', applicationSchema);

module.exports = Application;
