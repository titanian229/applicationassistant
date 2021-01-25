const db = require('../models');
const authenticated = require('./middleware/authenticated');

module.exports = (router) => {
    router.get('/api/resumes', authenticated, async ({ user: authenticatedUser }, res) => {
        try {
            const user = await db.User.findById({ _id: authenticatedUser.id }).populate('resumes');
            const resumes = user.resumes;

            res.status(200).send({ resumes });
        } catch (err) {
            console.log(err);
            res.status(500).send({ error: 'Something went wrong with the server' });
        }
    });
    router.post('/api/resumes', authenticated, async ({ user: authenticatedUser, body }, res) => {
        try {
            const { name, link, notes, associatedApplications } = body;

            if (!name || !link) {
                res.status(400).send({ error: 'Application must include a name and link' });
                return;
            }

            const resume = await db.Resume.create({ name, link, notes, associatedApplications });
            await db.User.findByIdAndUpdate({ _id: authenticatedUser.id }, { $push: { resumes: resume._id } });

            res.status(200).send({ message: 'Resume saved', resume });
        } catch (err) {
            console.log(err);
            res.status(500).send({ error: 'Something went wrong with the server' });
        }
    });
    router.put('/api/resumes/:_id', authenticated, async ({ params: { _id }, body }, res) => {
        try {
            if (!body) {
                res.status(400).send({ error: 'Resume missing for update' });
                return;
            }

            const resume = await db.Resume.findByIdAndUpdate({ _id }, body, { new: true });

            res.status(200).send({ message: 'Resume updated', resume });
        } catch (err) {
            console.log(err);
            res.status(500).send({ error: 'Something went wrong with the server' });
        }
    });
    router.delete('/api/resumes/:_id/', authenticated, async ({ params: { _id } }, res) => {
        try {
            await db.Resume.findByIdAndDelete({ _id });

            res.status(200).send({ message: 'Resume deleted' });
        } catch (err) {
            console.log(err);
            res.status(500).send({ error: 'Something went wrong with the server' });
        }
    });
};
