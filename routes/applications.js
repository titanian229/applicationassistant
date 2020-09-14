const db = require('../models');
const authenticated = require('./middleware/authenticated');

module.exports = (router) => {
    router.get('/api/applications', authenticated, async ({ headers }, res) => {
        try {
            const { session } = headers;
            const user = await db.User.findOne({ session })
                .populate({
                    path: 'applications',
                    populate: {
                        path: 'contacts',
                    },
                })
                .populate({
                    path: 'applications',
                    populate: {
                        path: 'todos',
                    },
                })
                .populate({
                    path: 'applications',
                    populate: {
                        path: 'resumes',
                    },
                });
            console.log(user);
            // .populate('todos')
            // .populate('contacts')
            // .populate('resumes');
            const applications = user.applications;

            res.status(200).send({ applications });
        } catch (err) {
            console.log(err);
            res.status(500).send({ error: 'Something went wrong with the server' });
        }
    });
    // router.get('/testing/applications', async ({ headers }, res) => {
    //     try {
    //         const { session } = headers;
    //         let contacts = await db.Contact.find();
    //         contacts = contacts.map((app) => app._id);
    //         let resumes = await db.Resume.find()
    //         resumes = resumes.map((app) => app._id);
    //         let todos = await db.Todo.find()
    //         t odos = todos.map((app) => app._id);
    //         const user = await db.User.findOneAndUpdate({ session }, { contacts, resumes, todos });

    //         // const user = await db.User.find({ session }).populate({
    //         //     path: 'applications',
    //         //     populate: {
    //         //       path: 'todos',
    //         //     }
    //         //  })
    //         // .populate('todos')
    //         // .populate('contacts')
    //         // .populate('resumes');

    //         res.status(200).send({ message: 'IT WORKED' });
    //     } catch (err) {
    //         console.log(err);
    //         res.status(500).send({ error: 'Something went wrong with the server' });
    //     }
    // });
    router.get('/api/applications/:id', authenticated, async ({ headers, params }, res) => {
        try {
            const { id } = params;
            const application = await db.Application.findById({ _id: id })
                .populate('todos')
                .populate('contacts')
                .populate('resumes');
            res.status(200).send({ application });
        } catch (err) {
            console.log(err);
            res.status(500).send({ error: 'Something went wrong with the server' });
        }
    });
    router.get('/api/applications/:id/:itemType', authenticated, async ({ headers, params }, res) => {
        try {
            const { id, itemType } = params;
            const application = await db.Application.findById({ _id: id }).populate(itemType);
            res.status(200).send({ [itemType]: application[itemType] });
        } catch (err) {
            console.log(err);
            res.status(500).send({ error: 'Something went wrong with the server' });
        }
    });
    router.post('/api/applications', authenticated, async ({ headers, body }, res) => {
        try {
            const { session } = headers;

            if (!body.businessName || !body.roleTitle) {
                res.status(400).send({ error: 'Application must have a business name and role title' });
                return;
            }
            let fullTodos;
            if (body.todos) {
                fullTodos = JSON.parse(JSON.stringify(body.todos));
                delete body.todos;
            }

            let application = await db.Application.create(body);

            let todos = [];

            if (fullTodos.length > 0) {
                // Make the todos, add the ids to an array
                todos = fullTodos.map((todo) => db.Todo.create({ ...todo, parentApplication: application.id }));
                todos = await Promise.all(todos);
                // todos = todos.map((todo) => ({_id: todo._id}));
            }

            application = await db.Application.findByIdAndUpdate({ _id: application._id }, { todos }, { new: true });

            await db.User.findOneAndUpdate({ session }, { $push: { applications: application._id } });

            res.status(200).send({ message: 'Application saved', application });
            // res.status(200).send({ message: 'Application saved' });
        } catch (err) {
            console.log(err);
            res.status(500).send({ error: 'Something went wrong with the server' });
        }
    });
    router.put('/api/applications/:_id', authenticated, async ({ headers, params: { _id }, body }, res) => {
        try {
            // const { session } = headers;
            if (!body) {
                res.status(400).send({ error: 'No application included in update' });
                return;
            }

            const applicationData = body;

            // if (interviewsArray) {

            // }
            if (applicationData.todos) {
                // Need to check if they're new or not, if new then I need to create them first using the application ID I have
                let newTodos = applicationData.todos.filter((todo) => todo._id === undefined);
                newTodos = await Promise.all(
                    newTodos.map((todo) => db.Todo.create({ ...todo, parentApplication: _id }))
                );
                let oldTodos = applicationData.todos.filter((todo) => todo._id !== undefined);
                applicationData.todos = newTodos.concat(oldTodos);
            }
            // if (contacts) {
            // }
            // if (resumes) {
            // }

            const application = await db.Application.findByIdAndUpdate({ _id }, applicationData, { new: true })
                .populate('contacts')
                .populate('todos')
                .populate('resumes');

            res.status(200).send({ message: 'Application updated', application });
        } catch (err) {
            console.log(err);
            res.status(500).send({ error: 'Something went wrong with the server' });
        }
    });
    router.put(
        '/api/applications/associateItem/:_id',
        authenticated,
        async ({ headers, params: { _id }, body }, res) => {
            try {
                // const { session } = headers;
                if (!body) {
                    res.status(400).send({ error: 'No application included in update' });
                    return;
                }

                const { itemType, itemID, itemAction } = body;

                if (!(itemType && itemID && itemAction)) {
                    res.status(400).send({ error: 'Association request missing data' });
                    return;
                }

                // const existingApplication = await db.Application.findById({ _id });

                // if (itemAction === 'push' && existingApplication.contacts.includes(itemID)) {
                //     res.status(400).send({ error: 'Application already includes item' });
                //     return;
                // }
                // if (itemAction === 'pull' && !existingApplication.contacts.includes(itemID)) {
                //     res.status(400).send({ error: 'Application does not include item' });
                //     console.log("Critical error, item being dissocated from application it doesn't belong to", body);
                //     return;
                // }

                const application = await db.Application.findByIdAndUpdate(
                    { _id },
                    { [`$${itemAction}`]: { [itemType]: itemID } },
                    { new: true }
                )
                    .populate('contacts')
                    .populate('todos')
                    .populate('resumes');

                res.status(200).send({ message: 'Application updated', application });
            } catch (err) {
                console.log(err);
                res.status(500).send({ error: 'Something went wrong with the server' });
            }
        }
    );
    router.delete('/api/applications/:_id', authenticated, async ({ headers, params: { _id } }, res) => {
        try {
            // const { session } = headers;

            if (!_id) {
                res.status(400).send({ error: 'No application ID included in delete request' });
                return;
            }

            const application = await db.Application.findByIdAndDelete({ _id });

            res.status(200).send({ message: `Application for ${application.businessName} deleted`, success: true });
        } catch (err) {
            console.log(err);
            res.status(500).send({ error: 'Something went wrong with the server' });
        }
    });
    router.put(
        '/api/applications/:applicationID/interviewsArray/:interviewID',
        authenticated,
        async ({ headers, params: { applicationID, interviewID }, body }, res) => {
            try {
                // const { session } = headers;

                if (!applicationID || !interviewID) {
                    res.status(400).send({ error: 'No application ID or interview ID included in delete request' });
                    return;
                }

                const application = await db.Application.findByIdAndUpdate(
                    { _id: applicationID, 'interviewsArray._id': interviewID },
                    { $set: { 'interviewsArray.$': body } },
                    { new: true }
                );

                res.status(200).send({ message: 'Updated interview', application });
            } catch (err) {
                console.log(err);
                res.status(500).send({ error: 'Something went wrong with the server' });
            }
        }
    );
    router.delete(
        '/api/applications/:applicationID/interviewsArray/:interviewID',
        authenticated,
        async ({ headers, params: { applicationID, interviewID } }, res) => {
            try {
                // const { session } = headers;

                if (!applicationID || !interviewID) {
                    res.status(400).send({ error: 'No application ID or interview ID included in delete request' });
                    return;
                }

                const application = await db.Application.findById({ _id: applicationID });
                // console.log('application', application.interviewsArray);
                application.interviewsArray = application.interviewsArray.filter(
                    (interview) => String(interview._id) !== interviewID
                );
                // console.log(application.interviewsArray);
                const updatedApplication = await application.save();

                res.status(200).send({ message: 'Removed interview', application: updatedApplication });
            } catch (err) {
                console.log(err);
                res.status(500).send({ error: 'Something went wrong with the server' });
            }
        }
    );
    router.delete(
        '/api/applications/:applicationID/:itemType/:itemID',
        authenticated,
        async ({ headers, params: { applicationID, itemType, itemID } }, res) => {
            try {
                // const { session } = headers;

                if (!applicationID || !itemType || !itemID) {
                    res.status(400).send({ error: 'Delete request missing required information' });
                    return;
                }

                const application = await db.Application.findById({ _id: applicationID });

                if (!application[itemType]) {
                    res.status(400).send({ error: 'Delete request for invalid item type' });
                    return;
                }

                // console.log('application', application.interviewsArray);
                application[itemType] = application[itemType].filter((item) => String(item._id) !== itemID);
                // console.log(application.interviewsArray);
                const updatedApplication = await application.save();

                res.status(200).send({ message: `Item deleted`, [itemType]: updatedApplication[itemType] });
            } catch (err) {
                console.log(err);
                res.status(500).send({ error: 'Something went wrong with the server' });
            }
        }
    );
    router.put(
        '/api/applications/:applicationID/:itemType/:itemID',
        authenticated,
        async ({ headers, params: { applicationID, itemType, itemID }, body }, res) => {
            try {
                // const { session } = headers;

                if (!applicationID || !itemID || !itemType) {
                    res.status(400).send({ error: 'Update request missing information' });
                    return;
                }

                const application = await db.Application.findById({ _id: applicationID });

                if (!application[itemType]) {
                    res.status(400).send({ error: 'Delete request for invalid item type' });
                    return;
                }

                application[itemType] = application[itemType].map((item) => {
                    if (String(item._id) === itemID) {
                        return body;
                    }
                    return item;
                });

                const newApplication = await application.save();

                // const application = await db.Application.findByIdAndUpdate(
                //     { _id: applicationID, [`${itemType}._id`]: itemID },
                //     { $set: { [`${itemType}.$`]: body } },
                //     { new: true }
                // );

                res.status(200).send({ message: 'Updated item', [itemType]: newApplication[itemType] });
            } catch (err) {
                console.log(err);
                res.status(500).send({ error: 'Something went wrong with the server' });
            }
        }
    );
    // router.get('/api/applications', async ({ headers }, res) => {
    //     try {
    //         // const { session } = headers;

    //         res.status(200).send('Route not yet implemented');
    //     } catch (err) {
    //         console.log(err);
    //         res.status(500).send({ error: 'Something went wrong with the server' });
    //     }
    // });
};
