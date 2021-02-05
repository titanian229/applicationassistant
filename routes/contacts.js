const db = require('../models');
const authenticated = require('./middleware/authenticated');

module.exports = (router) => {
    router.get('/api/contacts', authenticated, async ({ user: authenticatedUser }, res) => {
        try {
            const user = await db.User.findById({ _id: authenticatedUser.id }).populate({
                path: 'contacts',
                populate: {
                    path: 'associatedTodos',
                },
            });

            const contacts = user.contacts;

            res.status(200).send({ contacts });
        } catch (err) {
            console.log(err);
            res.status(500).send({ error: 'Something went wrong with the server' });
        }
    });
    router.get('/api/contacts/:_id', authenticated, async ({ params: { _id } }, res) => {
        try {

            const contact = await db.Contact.findById({ _id }).populate('associatedTodos');
            res.status(200).send({ contact });
        } catch (err) {
            console.log(err);
            res.status(500).send({ error: 'Something went wrong with the server' });
        }
    });
    router.post('/api/contacts', authenticated, async ({ user: authenticatedUser, body }, res) => {
        const { name, roleTitle, businessName, contactMethods, notes } = body;
        try {

            if (!name) {
                res.status(400).send({ error: 'Contact must have a name' });
                return;
            }

            try {
                const contact = await db.Contact.create({ name, roleTitle, businessName, contactMethods, notes });
                await db.User.findByIdAndUpdate({ _id: authenticatedUser.id }, { $push: { contacts: contact._id } });
                res.status(200).send({ message: 'Successfully added contact', contact });
                return;
            } catch (err) {
                console.log(err);
                res.status(500).send({ error: err });
            }

            res.status(200).send({ error: 'Unknown error' });
        } catch (err) {
            console.log(err);
            res.status(500).send({ error: 'Something went wrong with the server' });
        }
    });
    router.put('/api/contacts/:_id', authenticated, async ({ params: { _id }, body }, res) => {
        try {

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
    router.delete('/api/contacts/:_id', authenticated, async ({ params: { _id } }, res) => {
        try {

            await db.Contact.findByIdAndDelete({ _id });

            // await db.Application.findByIdAndUpdate({ _id: applicationID }, { $pull: { contacts: _id } });
            // const application = await db.Application.findById({ _id: applicationID }).populate('contacts');

            res.status(200).send({ message: 'Contact deleted' });
        } catch (err) {
            console.log(err);
            res.status(500).send({ error: 'Something went wrong with the server' });
        }
    });
    
};
