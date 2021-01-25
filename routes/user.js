const db = require('../models');
const { registerUser, loginUser } = require('../app/authentication');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authenticated = require('./middleware/authenticated');
const generateAccessToken = require('../app/generateToken');

module.exports = (router) => {
    // local user creation
    router.post('/register', async ({ body }, res) => {
        //request needs username and password coming in to register
        const { email, password, name } = body;
        const user = {
            email,
            password,
            name,
            type: 'local',
        };
        try {
            const sessionData = await registerUser(user);

            //catching a user that has previously registered trying to register again with a diff password
            if (sessionData.error) {
                res.status(400).send({ error: sessionData.error });
                return;
            }

            res.status(200).send(sessionData);
        } catch (err) {
            console.log('error occurred inside new user registration', err);
            res.status(400).send({ error: 'Something happened creating your user account, please try again' });
        }
    });

    router.put('/user', async ({ body, headers }, res) => {
        try {
            const user = await db.User.findOneAndUpdate({ session: headers.session }, body, { new: true });
            res.status(200).send({ user: { name: user.name }, message: 'User profile updated' });
        } catch (err) {
            res.status(400).send({ error: 'Error saving user profile' });
        }
    });

    router.post('/login', async ({ body }, res) => {
        // TODO save date last logged in to DB as well
        const { email, password } = body;
        const sessionData = await loginUser({ email, password });

        res.status(sessionData.error ? 403 : 200).send(sessionData);

        // if (!(email && password)) {
        //     res.status(403).send({ error: 'Email and password not included in request' });
        //     return;
        // }

        // const user = await db.User.findOne({ email: email });
        // if (!user) {
        //     res.status(403).send({ error: 'No user with that email' });
        //     return;
        // }

        // let validPassword;
        // try {
        //     validPassword = await bcrypt.compare(password, user.password);
        // } catch (err) {
        //     console.log('error inside login', err);
        //     res.status(403).send({ error: 'Error finding login' });
        //     return;
        // }

        // if (!validPassword) {
        //     res.status(403).send({ error: 'Invalid password' });
        //     return;
        // }

        // try {
        //     const refreshToken = jwt.sign({ email: user.email, id: user._id }, process.env.REFRESH_TOKEN_SECRET);
        //     const accessToken = generateAccessToken({ email: user.email, id: user._id });

        //     const sessionData = await saveSession(user, session);
        //     res.status(200).send(sessionData);
        // } catch (err) {
        //     console.log(err);
        //     console.log('error creating session for login', user);
        //     res.status(403).send({ error: 'Error creating new session' });
        // }
    });

    router.get('/authentication', authenticated, async (req, res) => {
        try {
            const user = await db.User.findById({ _id: req.user.id });
            res.status(200).send({ isAuthenticated: true, name: user.name });
        } catch (err) {
            console.log('Error checking authentication', err);
            res.status(500).send({ error: 'Server error checking authentication' });
        }

        // try {
        //     const { authorization } = headers;

        //     if (!authorization) {
        //         res.status(403).send({ error: 'No authorization token present in request' });
        //         return;
        //     }

        //     const user = await db.User.findOne({ session });

        //     if (!user || session.length !== 36) {
        //         res.status(200).send({ isAuthenticated: false });
        //         return;
        //     }

        //     res.status(200).send({ isAuthenticated: true, name: user.name });
        // } catch (err) {
        //     console.log('Error checking for logged in state', err);
        //     res.status(500).send({ error: 'Something has gone wrong checking the login state' });
        // }
    });

    router.post('/logout', authenticated, async (req, res) => {
        if (!req.user.id) {
            console.log('Logout attempted for null user');
            res.status(403).send({ error: 'Logout attempted for null user' });
            return;
        }
        await db.User.findByIdAndUpdate({ _id: req.user.id }, { refreshToken: '' });
        res.status(200).send({ message: 'Log out successful' });
    });
};
