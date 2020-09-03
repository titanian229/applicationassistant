const db = require('../models');

module.exports = (router) => {
    router.get('/api/contacts', async ({ headers }, res) => {
        try {
            // const { session } = headers;
            const contacts = await db.Contact.find().populate('associatedTodos');
            res.status(200).send({ contacts });
        } catch (err) {
            console.log(err);
            res.status(500).send({ error: 'Something went wrong with the server' });
        }
    });
    router.post('/api/contacts', async ({ headers, body }, res) => {
        const { name, roleTitle, businessName, contactMethods, notes } = body;
        try {
            // const { session } = headers;
            if (!name) {
                res.status(400).send({ error: 'Contact must have a name' });
                return;
            }

            try {
                const contact = await db.Contact.create({ name, roleTitle, businessName, contactMethods, notes });
                res.status(200).send({ message: 'Successfully added contact', contact });
                return;
            } catch (err) {
                console.log(err);
                res.status(500).send({ error: err });
            }

            res.status(200).send({ message: 'Route not yet implemented' });
        } catch (err) {
            console.log(err);
            res.status(500).send({ error: 'Something went wrong with the server' });
        }
    });
    router.put('/api/contacts/:_id', async ({ headers, params: { _id }, body }, res) => {
        try {
            // const { session } = headers;
            if (!body) {
                res.status(400).send({ error: 'No body included with the contact update' });
                return;
            }

            const contact = await db.Contact.findByIdAndUpdate({ _id }, body, { new: true });

            res.status(200).send({ message: 'Contact updated', contact });
        } catch (err) {
            console.log(err);
            res.status(500).send({ error: 'Something went wrong with the server' });
        }
    });
    router.delete('/api/contacts', async ({ headers }, res) => {
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
