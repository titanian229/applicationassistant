const passport = require('passport');
const session = require('express-session');
const User = require('./models/userLogin');
const { OAuth2Strategy: LinkedInStrategy } = require('passport-linkedin-oauth2');
// const { Strategy: LocalStrategy } = require('passport-local');
const bcrypt = require('bcrypt');
require('dotenv').config();

module.exports = (app, baseURL, createSession) => {
    console.log('initializing authentication');

    app.use(session({ secret: process.env.SECRET, resave: true, saveUninitialized: true }));

    app.use(passport.initialize());

    // passport.serializeUser(function (user, done) {
    //     done(null, user._id);
    // });

    // passport.deserializeUser(function (id, done) {
    //     User.findById(id, function (err, user) {
    //         console.log("yes", user)
    //         done(err, user);
    //     });
    // });
    // TODO implement proper user serialization
    passport.serializeUser((user, cb) => cb(null, user));
    passport.deserializeUser((obj, cb) => cb(null, obj));

    // const authenticateUser = async (email, password, done) => {
    //     const user = await User.findOne({ email });
    //     console.log(user);
    //     if (user === null) {
    //         return done(null, false, { message: 'No user with that email' });
    //     }
    //     try {
    //         if (await bcrypt.compare(password, user.password)) {
    //             return done(null, user);
    //         } else {
    //             return done(null, false, { message: 'Password incorrect' });
    //         }
    //     } catch (err) {
    //         console.log('error in oAuth authentication check', err);
    //     }
    // };

    callBackFunction = (accessToken, refreshToken, profile, callbackFunction) =>
        callbackFunction(null, profile, accessToken, refreshToken);

    // TODO implement local strategy
    // passport.use(
    //     new LocalStrategy(
    //         {
    //             usernameField: 'email',
    //         },
    //         authenticateUser
    //     )
    // );

    passport.use(
        new LinkedInStrategy(
            {
                clientID: process.env.LINKEDIN_ID,
                clientSecret: process.env.LINKEDIN_SECRET,
                callbackURL: `${baseURL}/oauth/callback`,
                scope: ['r_emailaddress', 'r_liteprofile'],
            },
            callBackFunction
        )
    );

    
};
