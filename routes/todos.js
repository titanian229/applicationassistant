const db = require('../models');

module.exports = (router) => {
    router.get('/api/todos', async ({ headers }, res) => {
        try {
            // const { session } = headers;

            const todos = await db.Todo.find().populate('associatedContact').populate('associatedApplication');
            res.status(200).send({ todos });
        } catch (err) {
            console.log(err);
            res.status(500).send({ error: 'Something went wrong with the server' });
        }
    });
    router.post('/api/todos', async ({ headers, body }, res) => {
        try {
            // const { session } = headers;
            const { name, date } = body.todo;
            const { applicationID } = body;
            if (!name) {
                res.status(400).send({ error: 'Todo must have a name' });
                return;
            }
            if (!applicationID) {
                res.status(400).send({ error: 'Todo has no associated application' });
                return;
            }

            const todo = await db.Todo.create({ name, date });
            await db.Application.findByIdAndUpdate({ _id: applicationID }, { $push: { todos: todo._id } });

            res.status(200).send({ message: 'Todo saved', todo });
        } catch (err) {
            console.log(err);
            res.status(500).send({ error: 'Something went wrong with the server' });
        }
    });
    router.put('/api/todos/:_id', async ({ headers, params: { _id }, body }, res) => {
        try {
            // const { session } = headers;
            const todo = await db.Todo.findByIdAndUpdate({ _id }, { ...body }, { new: true });

            res.status(200).send({ todo });
        } catch (err) {
            console.log(err);
            res.status(500).send({ error: 'Something went wrong with the server' });
        }
    });
    router.delete('/api/todos/:_id/:applicationID', async ({ headers, params: { _id, applicationID } }, res) => {
        try {
            // const { session } = headers;

            await db.Todo.findByIdAndDelete({ _id });
            await db.Application.findByIdAndUpdate({ _id: applicationID }, { $pull: { todos: _id } });
            const application = await db.Application.findById({ _id: applicationID })
                .populate('todos')

            res.status(200).send({ message: 'Todo deleted', todos: application.todos });
        } catch (err) {
            console.log(err);
            res.status(500).send({ error: 'Something went wrong with the server' });
        }
    });
};
