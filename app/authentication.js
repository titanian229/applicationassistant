const User = require('../models/user');
const bcrypt = require('bcrypt');

module.exports = {
    saveSession: async (user, session) => {
        //User must be a return from the database query, session is a UUID created ID
        console.log('Saving session');

        if (!user || !session || session.length !== 36) {
            console.log('No user or no session id', user, session);
            return { error: 'Invalid user data for registration' };
        }

        if (!user._id) {
            console.log('User passed to save session was missing ID, likely not a User returned from the database.');
            return { error: 'Database error saving session' };
        }

        let updatedUser = await User.findByIdAndUpdate({ _id: user._id }, { session }, { new: true });
        return {
            message: 'Welcome back ' + updatedUser.name,
            id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            thumbnail: updatedUser.thumbnail,
            session,
        };
    },

    registerUser: async (user, session) => {
        //User is a direct return from the front end, password is not hashed yet, session is a UUID created ID
        console.log('REGISTERING USER ', user);

        if (!user || !session || session.length !== 36) {
            console.log('No user or no session id', user, session);
            return { error: 'Invalid user data for registration' };
        }

        let newUser, existingUser;
        if (user.type === 'linkedin') {
            //Route for linkedin login
            console.log('LinkedIn user login');
            existingUser = await User.findOne({ authID: user.authId });
        } else {
            // local user login
            existingUser = await User.findOne({ email: user.email });
        }

        if (existingUser && existingUser._id) {
            console.log('User has previously logged in, saving new session', user, existingUser);
            if (user.type !== 'linkedin'){
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

            newUser = await User.findByIdAndUpdate({ _id: existingUser._id }, { session });
            console.log('newUser', newUser);
            return {
                message: 'Welcome back ' + newUser.name,
                id: newUser._id,
                name: newUser.name,
                email: newUser.email,
                thumbnail: newUser.thumbnail,
                session,
            };
        }

        newUserLoginData = {
            email: user.email,
            name: user.name,
            session,
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
        } catch (err) {
            console.log('there was an error creating the new user', err);
            return { error: 'Error creating user' };
        }
        console.log(newUser);
        return {
            message: `Welcome ${newUser.name}!`,
            session: newUser.session,
        };
    },
};
