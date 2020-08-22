require('dotenv').config();
const mongoose = require('mongoose');
const MONGODB_URI = process.env.MONGODB_URI;
const db = require('./models');

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });

const testUser = {
    name: 'James Lee',
    email: 'jamie.lee1@gmail.com',
    sessionID: 'test',
    applications: [],
    todos: [],
    resumes: [],
    contacts: [],
};

const testTodo = {
    name: "Send a follow up email",
    date: new Date(),
}

const testApplication = {
    businessName: "Starfleet",
    roleTitle: "Ensign",
    requirementsNote: "Python, navigation skills",
    postLink: 'https://starfleet.com',
    dateFound: new Date(),
    foundWhereNote: 'Online',
    haveApplied: true,
    appliedDate: new Date(),
    resumes: [],
    contacts: [],
    todos: [],
}

const seedDB = async () => {

    const addedTodo = db.Todo.create(testTodo)
    const addedResume = db.Resume.create(testResume)
    const addedContact = db.Contact.create(testContact)
    const addedUser = db.Application.create(testApplication)


    mongoose.connection.close();
};

seedDB();
