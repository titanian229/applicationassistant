require('dotenv').config();
const express = require('express');
const routes = require('./routes');
const mongoose = require('mongoose');
const logger = require('morgan');
const bodyParser = require('body-parser');
const compression = require('compression');
const cors = require('cors');
const uuid = require('uuid').v4;

//AUTH

const app = express();
const PORT = process.env.PORT || 3001;

const baseURL = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:3001';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/applicationassistant';
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// app.use(logger(":method :url :status :res[content-length] - :response-time ms"));
app.use(logger('dev'));

app.use(cors());
app.use(compression());
app.use(bodyParser.json());

app.use(routes);

app.use(express.static('client/build'));
app.get('*', (req, res) => {
    res.sendFile('client/build/index.html', { root: __dirname });
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

app.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`App listening on PORT ${PORT}`);
});
