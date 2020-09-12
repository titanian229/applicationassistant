const db = require('../models');
const authenticated = require('./middleware/authenticated');

module.exports = (router) => {
    router.get('/api/todos', authenticated, async ({ headers }, res) => {
        try {
            const { session } = headers;

            const user = await db.User.findOne({ session })
                .populate({
                    path: 'todos',
                    populate: {
                        path: 'parentContact',
                    },
                })
                .populate({
                    path: 'todos',
                    populate: {
                        path: 'parentApplication',
                    },
                });

            // let todos = await db.Todo.find().populate('parentContact').populate('parentApplication');
            let todos = user.todos;
            // TODO add field to each item, containing the application it's from

            todos = todos.map((todo) => {
                if (!todo.parentApplication) {
                    return todo;
                }
                todo = todo._doc;
                todo.applicationTitle = `${todo.parentApplication.businessName}${
                    todo.parentApplication.roleTitle ? ' - ' : ''
                }${todo.parentApplication.roleTitle || ''}`;
                // console.log(todo.sectionName)
                // console.log(Object.keys(todo))
                // console.log(todo)
                return todo;
            });
            // console.log(todos)

            res.status(200).send({ todos });
        } catch (err) {
            console.log(err);
            res.status(500).send({ error: 'Something went wrong with the server' });
        }
    });
    //TODO add in route to provide reminders for upcoming todos
    router.get('/api/todos/sorted', authenticated, async ({ headers }, res) => {
        try {
            const { session } = headers;

            const user = await db.User.findOne({ session })
                .populate({
                    path: 'todos',
                    populate: {
                        path: 'parentContact',
                    },
                })
                .populate({
                    path: 'todos',
                    populate: {
                        path: 'parentApplication',
                    },
                });

            let todos = user.todos;

            let sortedTodos = {};

            todos.forEach((todo) => {
                if (sortedTodos[todo.parentApplication]) {
                    sortedTodos[todo.parentApplication].push(todo);
                    return;
                }
                sortedTodos[todo.parentApplication] = [todo];
            });

            res.status(200).send({ sortedTodos });
        } catch (err) {
            console.log(err);
            res.status(500).send({ error: 'Something went wrong with the server' });
        }
    });
    router.post('/api/todos', authenticated, async ({ headers, body }, res) => {
        try {
            const { session } = headers;
            const { name, date, _id } = body.todo;
            const { parentID } = body;
            if (!name) {
                res.status(400).send({ error: 'Todo must have a name' });
                return;
            }
            if (!parentID) {
                res.status(400).send({ error: 'Todo has no associated application' });
                return;
            }

            const todo = await db.Todo.create({ name, date, parentApplication: parentID });
            await db.Application.findByIdAndUpdate({ _id: parentID }, { $push: { todos: todo._id } });
            await db.User.findOneAndUpdate({ session }, { $push: { todos: todo._id } });

            res.status(200).send({ message: 'Todo saved', todo });
        } catch (err) {
            console.log(err);
            res.status(500).send({ error: 'Something went wrong with the server' });
        }
    });
    router.put('/api/todos/:_id', authenticated, async ({ headers, params: { _id }, body }, res) => {
        try {
            // const { session } = headers;
            // How MUI handles date, it gets removed from the body.  This is required to remove a date.
            if (!body.date) body.date = '';
            const todo = await db.Todo.findByIdAndUpdate({ _id }, { ...body }, { new: true });

            res.status(200).send({ todo });
        } catch (err) {
            console.log(err);
            res.status(500).send({ error: 'Something went wrong with the server' });
        }
    });
    router.delete(
        '/api/todos/:_id/:applicationID',
        authenticated,
        async ({ headers, params: { _id, applicationID } }, res) => {
            try {
                // const { session } = headers;

                await db.Todo.findByIdAndDelete({ _id });
                await db.Application.findByIdAndUpdate({ _id: applicationID }, { $pull: { todos: _id } });
                const application = await db.Application.findById({ _id: applicationID }).populate('todos');

                res.status(200).send({ message: 'Todo deleted', todos: application.todos });
            } catch (err) {
                console.log(err);
                res.status(500).send({ error: 'Something went wrong with the server' });
            }
        }
    );
};
