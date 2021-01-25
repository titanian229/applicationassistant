const User = require('../models/user');
const bcrypt = require('bcrypt');
const generateAccessToken = require('./generateToken');
const jwt = require('jsonwebtoken')

module.exports = {
    // saveSession: async (user, session) => {
    //     //User must be a return from the database query, session is a UUID created ID
    //     console.log('Saving session');

    //     if (!user || !session || session.length !== 36) {
    //         console.log('No user or no session id', user, session);
    //         return { error: 'Invalid user data for registration' };
    //     }

    //     if (!user._id) {
    //         console.log('User passed to save session was missing ID, likely not a User returned from the database.');
    //         return { error: 'Database error saving session' };
    //     }

    //     let updatedUser = await User.findByIdAndUpdate({ _id: user._id }, { session }, { new: true });
    //     return {
    //         message: 'Welcome back ' + updatedUser.name,
    //         id: updatedUser._id,
    //         name: updatedUser.name,
    //         email: updatedUser.email,
    //         thumbnail: updatedUser.thumbnail,
    //         session,
    //     };
    // },

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
            //TODO UPDATE THIS TO REMOVE THE ID IF IT TURNS OUT JWT DOES NOT SAVE IT AS I WANT
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
};
