const db = require('../models');
const authenticated = require('./middleware/authenticated');

module.exports = (router) => {
    router.get('/api/todos', authenticated, async ({ user: authenticatedUser }, res) => {
        try {
            const user = await db.User.findById({ _id: authenticatedUser.id })
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
    router.get('/api/todos/sorted', authenticated, async ({ user: authenticatedUser }, res) => {
        try {
            const user = await db.User.findById({ _id: authenticatedUser.id })
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
    router.post('/api/todos', authenticated, async ({ user: authenticatedUser, body }, res) => {
        try {
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
            await db.User.findByIdAndUpdate({ _id: authenticatedUser.id }, { $push: { todos: todo._id } });

            res.status(200).send({ message: 'Todo saved', todo });
        } catch (err) {
            console.log(err);
            res.status(500).send({ error: 'Something went wrong with the server' });
        }
    });
    router.put('/api/todos/:_id', authenticated, async ({ params: { _id }, body }, res) => {
        try {
            // How MUI handles date, it gets removed from the body.  This is required to remove a date.
            // let todo = await db.Todo.findById({_id})
            // if
            if (!body.date) body.date = '';
            const todo = await db.Todo.findByIdAndUpdate({ _id }, { ...body }, { new: true });

            res.status(200).send({ todo });
        } catch (err) {
            console.log(err);
            res.status(500).send({ error: 'Something went wrong with the server' });
        }
    });
    router.delete('/api/todos/:_id/:applicationID', authenticated, async ({ params: { _id, applicationID } }, res) => {
        try {
            const todo = await db.Todo.findByIdAndDelete({ _id });
            console.log('todo', todo);
            if (applicationID === 'none') {
                applicationID = todo.parentApplication;
                console.log('applicationID', applicationID);
            }
            await db.Application.findByIdAndUpdate({ _id: applicationID }, { $pull: { todos: _id } });
            const application = await db.Application.findById({ _id: applicationID }).populate('todos');

            res.status(200).send({ message: 'Todo deleted', todos: application.todos });
        } catch (err) {
            console.log(err);
            res.status(500).send({ error: 'Something went wrong with the server' });
        }
    });
    router.get('/api/todos/reminders/', authenticated, async ({ user: authenticatedUser }, res) => {
        try {
            const today = new Date();

            const user = await db.User.findById({ _id: authenticatedUser.id })
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

            // Checking for reminders today or in the past
            const reminders = todos
                .filter((todo) => todo.date && !todo.completed)
                .filter((todo) => {
                    const date = new Date(todo.date);
                    return (
                        date.getTime() < today.getTime() ||
                        (date.getFullYear() === today.getFullYear() &&
                            date.getMonth() === today.getMonth() &&
                            date.getDate() === today.getDate())
                    );
                });

            res.status(200).send({ reminders });
        } catch (err) {
            console.log(err);
            res.status(500).send({ error: 'Something went wrong with the server' });
        }
    });
};
