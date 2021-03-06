require('dotenv').config();
const express = require('express');
const routes = require('./routes');
const mongoose = require('mongoose');
const logger = require('morgan');
const bodyParser = require('body-parser');
const compression = require('compression');
const cors = require('cors');
// const uuid = require('uuid').v4;
const jwt = require('jsonwebtoken');

const app = express();
const PORT = process.env.PORT || 3001;

const baseURL =
    process.env.NODE_ENV === 'production' ? 'https://applicationassistant.herokuapp.com' : 'http://localhost:3001';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/applicationassistant';
if (process.env.NODE_ENV !== 'test') {
    mongoose
        .connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
        .then(() => console.log('Successfully connected to mongodb'))
        .catch((e) => console.error(e));
}
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(logger('dev'));

app.use(cors());
app.use(compression());
app.use(bodyParser.json());

require('./app/oAuth')(app, baseURL);

app.use(routes);

app.use(express.static('client/build'));
app.get('*', (req, res) => {
    res.sendFile('client/build/index.html', { root: __dirname });
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

server = app.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`App listening on PORT ${PORT}`);
});

module.exports = { app, server };
