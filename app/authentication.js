const User = require('../models/user');
const bcrypt = require('bcrypt');
const generateAccessToken = require('./generateToken');
const jwt = require('jsonwebtoken');

module.exports = {
    registerUser: async (user) => {
        //User is a direct return from the front end, password is not hashed yet
        console.log('REGISTERING USER ', user);

        if (!user) {
            console.log('No user ', user);
            return { error: 'Invalid user data for registration' };
        }

        let newUser, existingUser, accessToken, refreshToken;
        if (user.type === 'linkedin') {
            //Route for linkedin login
            console.log('LinkedIn user login');
            existingUser = await User.findOne({ authID: user.authId });
        } else {
            // local user login
            existingUser = await User.findOne({ email: user.email });
        }

        if (existingUser && existingUser._id) {
            console.log('User has previously logged in, updating token', user, existingUser);
            if (user.type !== 'linkedin') {
                //checking for valid password, skipping registration and just logging them in
                let validPassword;
                try {
                    validPassword = await bcrypt.compare(user.password, existingUser.password);
                } catch (err) {
                    console.log('error inside registration', err);
                    return {
                        error: 'Error inside registration',
                    };
                }

                if (!validPassword) {
                    console.log('invalid password in registration for new user, password do not match');
                    return {
                        error: 'Email address already registered, passwords do not match',
                    };
                }
            }

            accessToken = generateAccessToken({ email: existingUser.email, id: existingUser._id });
            refreshToken = jwt.sign(
                { email: existingUser.email, id: existingUser._id },
                process.env.REFRESH_TOKEN_SECRET
            );

            await User.findByIdAndUpdate({ _id: existingUser._id }, { refreshToken });

            return {
                message: 'Welcome back ' + existingUser.name,
                id: existingUser._id,
                name: existingUser.name,
                email: existingUser.email,
                thumbnail: existingUser.thumbnail && existingUser.thumbNail,
                accessToken,
                refreshToken,
            };
        }

        let newUserLoginData = {
            email: user.email,
            name: user.name,
        };

        if (!user.type || user.type === 'local') {
            newUserLoginData.password = await bcrypt.hash(user.password, 10);
            newUserLoginData.type = 'local';
        } else if (user.type === 'linkedin') {
            newUserLoginData.authID = user.authId;
            newUserLoginData.type = user.type;
            newUserLoginData.thumbnail = user.thumbnail;
        }

        try {
            newUser = await User.create(newUserLoginData);
            accessToken = generateAccessToken({ email: newUser.email, id: newUser._id });
            refreshToken = jwt.sign({ email: newUser.email, id: newUser._id }, process.env.REFRESH_TOKEN_SECRET);
            await User.findByIdAndUpdate({ _id: newUser._id }, { refreshToken });
        } catch (err) {
            console.log('there was an error creating the new user', err);
            return { error: 'Error creating user' };
        }
        console.log(newUser);
        return {
            message: `Welcome ${newUser.name}!`,
            refreshToken,
            accessToken,
        };
    },
    loginUser: async (loginUserCredentials) => {
        //given email and password, this is a local login
        if (!loginUserCredentials.email || !loginUserCredentials.password) {
            console.log('Authentication loginUser failed, missing email or password', loginUserCredentials);
            return {
                error: 'Missing email or password',
            };
        }

        const user = await User.findOne({ email: loginUserCredentials.email });

        if (!user) {
            console.log('No user with email found');
            return { error: 'No user with that email' };
        }

        let validPassword;
        try {
            validPassword = await bcrypt.compare(loginUserCredentials.password, user.password);
        } catch (err) {
            console.log('Error inside login', err);
            return { error: 'Server error attempting login' };
        }

        if (!validPassword) {
            return { error: 'Invalid password' };
        }

        try {
            const refreshToken = jwt.sign({ email: user.email, id: user._id }, process.env.REFRESH_TOKEN_SECRET);
            const accessToken = generateAccessToken({ email: user.email, id: user._id });
            await User.findByIdAndUpdate({ _id: user._id }, { refreshToken });

            return {
                message: `Welcome back ${user.name}!`,
                refreshToken,
                accessToken,
            };
        } catch (err) {
            console.log('Error inside login', err);
            return { error: 'Server error attempting login' };
        }
    },
    useRefreshToken: async (refreshToken) => {
        return jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
            if (err) return { serverError: 'Invalid token' };

            const { email, id } = user;
            const accessToken = generateAccessToken({ email, id });
            return { accessToken };
        });
    },
};
