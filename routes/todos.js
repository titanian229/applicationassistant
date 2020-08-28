const db = require('../models');

module.exports = (router) => {
    router.get('/api/todos', async ({ headers }, res) => {
        try {
            // const { session } = headers;
            
            const todos = await db.Todo.find().populate('associatedContact').populate('associatedApplication')
            res.status(200).send({todos});
        } catch (err) {
            console.log(err);
            res.status(500).send({ error: 'Something went wrong with the server' });
        }
    });
    router.post('/api/todos', async ({ headers, body }, res) => {
        try {
            // const { session } = headers;
            const {name, date, associatedContact, associatedApplication} = body
            if (!name){
                res.status(400).send({error: "Todo must have a name"})
                return
            }

            const todo = await db.Todo.create({name, date, associatedContact, associatedApplication})
            
            res.status(200).send({message: "Todo saved", todo});
        } catch (err) {
            console.log(err);
            res.status(500).send({ error: 'Something went wrong with the server' });
        }
    });
    router.put('/api/todos', async ({ headers }, res) => {
        try {
            // const { session } = headers;
            

            res.status(200).send('Route not yet implemented');
        } catch (err) {
            console.log(err);
            res.status(500).send({ error: 'Something went wrong with the server' });
        }
    });
    router.delete('/api/todos', async ({ headers }, res) => {
        try {
            // const { session } = headers;
            

            res.status(200).send('Route not yet implemented');
        } catch (err) {
            console.log(err);
            res.status(500).send({ error: 'Something went wrong with the server' });
        }
    });
    
};
