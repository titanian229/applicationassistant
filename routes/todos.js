const db = require('../models');

module.exports = (router) => {
    router.get('/api/todos', async ({ headers }, res) => {
        try {
            // const { session } = headers;
            

            res.status(200).send('Route not yet implemented');
        } catch (err) {
            console.log(err);
            res.status(500).send({ error: 'Something went wrong with the server' });
        }
    });
    router.post('/api/todos', async ({ headers }, res) => {
        try {
            // const { session } = headers;
            

            res.status(200).send('Route not yet implemented');
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
