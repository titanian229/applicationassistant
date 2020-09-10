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
        location: {
            type: String,
        },
        colour: {
            type: String,
            default: 'none',
            enum: [
                'none',
                'red',
                'pink',
                'purple',
                'deepPurple',
                'indigo',
                'blue',
                'lightBlue',
                'cyan',
                'teal',
                'green',
                'lightGreen',
                'lime',
                'yellow',
                'amber',
                'orange',
                'deepOrange',
                'brown',
                'grey',
                'blueGrey',
            ],
        },
        offers: [
            { date: { type: Date }, notes: { type: String }, salary: { type: Number }, accepted: { type: Boolean } },
        ],
        description: { type: String },
        companyInfo: { type: String },
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
        finalState: {
            type: String,
            enum: ['Unknown', 'Accepted', 'Rejected'],
        },
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
        todos: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Todo',
            },
        ],
    },
    {
        timestamps: true,
    }
);

const Application = mongoose.model('Application', applicationSchema);

module.exports = Application;
