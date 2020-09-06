const db = require('../models');

module.exports = (router) => {
    router.get('/api/applications', async ({ headers }, res) => {
        try {
            // const { session } = headers;
            const applications = await db.Application.find().populate('todos').populate('contacts').populate('resumes');
            res.status(200).send({ applications });
        } catch (err) {
            console.log(err);
            res.status(500).send({ error: 'Something went wrong with the server' });
        }
    });
    router.get('/api/applications/:id', async ({ headers, params }, res) => {
        try {
            // const { session } = headers;
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
    router.get('/api/applications/:id/:itemType', async ({ headers, params }, res) => {
        try {
            // const { session } = headers;
            const { id, itemType } = params;
            const application = await db.Application.findById({ _id: id }).populate(itemType);
            res.status(200).send({ [itemType]: application[itemType] });
        } catch (err) {
            console.log(err);
            res.status(500).send({ error: 'Something went wrong with the server' });
        }
    });
    router.post('/api/applications', async ({ headers, body }, res) => {
        try {
            // const { session } = headers;
            const {
                businessName,
                roleTitle,
                requirementsNote,
                notes,
                postLink,
                dateFound,
                foundWhereNote,
                haveApplied,
                appliedDate,
                interviewsArray,
                haveResearched,
                haveResearchedNotes,
                resumes,
                contacts,
                todos: fullTodos,
            } = body;

            if (!businessName || !roleTitle) {
                res.status(400).send({ error: 'Application must have a business name and role title' });
                return;
            }

            let application = await db.Application.create({
                businessName,
                roleTitle,
                requirementsNote,
                notes,
                postLink,
                dateFound,
                foundWhereNote,
                haveApplied,
                appliedDate,
                interviewsArray,
                haveResearched,
                haveResearchedNotes,
                resumes,
                contacts,
            });

            let todos = [];

            if (fullTodos.length > 0) {
                // Make the todos, add the ids to an array
                todos = fullTodos.map((todo) => db.Todo.create({ ...todo, parentApplication: application.id }));
                todos = await Promise.all(todos);
                // todos = todos.map((todo) => ({_id: todo._id}));
            }

            application = await db.Application.findByIdAndUpdate({ _id: application._id }, { todos }, { new: true });

            res.status(200).send({ message: 'Application saved', application });
            // res.status(200).send({ message: 'Application saved' });
        } catch (err) {
            console.log(err);
            res.status(500).send({ error: 'Something went wrong with the server' });
        }
    });
    router.put('/api/applications/:_id', async ({ headers, params: { _id }, body }, res) => {
        try {
            // const { session } = headers;
            if (!body) {
                res.status(400).send({ error: 'No application included in update' });
                return;
            }

            const applicationData = body

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
    router.put('/api/applications/associateItem/:_id', async ({ headers, params: { _id }, body }, res) => {
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
    });
    router.delete('/api/applications/:_id', async ({ headers, params: { _id } }, res) => {
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
