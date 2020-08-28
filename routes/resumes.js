const db = require('../models');

module.exports = (router) => {
    router.get('/api/resumes', async ({ headers }, res) => {
        try {
            // const { session } = headers;
            const resumes = await db.Resume.find();

            res.status(200).send({ resumes });
        } catch (err) {
            console.log(err);
            res.status(500).send({ error: 'Something went wrong with the server' });
        }
    });
    router.post('/api/resumes', async ({ headers, body }, res) => {
        try {
            // const { session } = headers;
            const { name, link, notes, associatedApplications } = body;

            if (!name || !link) {
                res.status(400).send({ error: 'Application must include a name and link' });
                return;
            }

            const resume = await db.Resume.create({ name, link, notes, associatedApplications });

            res.status(200).send({ message: 'Resume saved', resume });
        } catch (err) {
            console.log(err);
            res.status(500).send({ error: 'Something went wrong with the server' });
        }
    });
    router.put('/api/resumes', async ({ headers }, res) => {
        try {
            // const { session } = headers;

            res.status(200).send('Route not yet implemented');
        } catch (err) {
            console.log(err);
            res.status(500).send({ error: 'Something went wrong with the server' });
        }
    });
    router.delete('/api/resumes', async ({ headers }, res) => {
        try {
            // const { session } = headers;

            res.status(200).send('Route not yet implemented');
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
