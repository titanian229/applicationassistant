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
                todos,
            } = body;

            if (!businessName || !roleTitle) {
                res.status(400).send({ error: 'Application must have a business name and role title' });
                return;
            }

            const application = await db.Application.create({
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
                todos,
            });

            res.status(200).send({ message: 'Application saved', application });
        } catch (err) {
            console.log(err);
            res.status(500).send({ error: 'Something went wrong with the server' });
        }
    });
    // router.put('/api/applications', async ({ headers }, res) => {
    //     try {
    //         // const { session } = headers;

    //         res.status(200).send('Route not yet implemented');
    //     } catch (err) {
    //         console.log(err);
    //         res.status(500).send({ error: 'Something went wrong with the server' });
    //     }
    // });
    // router.delete('/api/applications', async ({ headers }, res) => {
    //     try {
    //         // const { session } = headers;

    //         res.status(200).send('Route not yet implemented');
    //     } catch (err) {
    //         console.log(err);
    //         res.status(500).send({ error: 'Something went wrong with the server' });
    //     }
    // });
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
