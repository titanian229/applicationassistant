const User = require('../models/user');
const bcrypt = require('bcrypt');

module.exports = {
    registerUser: async (user, session) => {
        console.log('REGISTERING USER ', user);

        if (!user || !session || session.length !== 36) {
            console.log('No user or no session id', user, session);
            return { error: 'Invalid user data for registration' };
        }

        let newUser;
        let existingUser;
        //Route for linkedin login
        if (user.type === 'linkedin') {
            existingUser = await User.findOne({ authId: user.authId });
        } else {
            // local user login
            existingUser = await User.findOne({ email: user.email });
        }
        console.log('existingUser', existingUser);

        if (existingUser && existingUser._id) {
            console.log('User has previously logged in, saving new session', user, existingUser);
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
            newUserLoginData.authId = user.authId;
            newUserLoginData.type = user.type;
            newUserLoginData.thumbnail = user.thumbnail;
        }

        try {
            newUser = await User.create(newUserLoginData);
        } catch (err) {
            console.log('there was an error creating the new user', err);
            return { error: 'Error creating user' };
        }
        console.log(newUser)
        return {
            message: `Welcome ${newUser.name}!`,
            session: newUser.session
        };
    },
};
