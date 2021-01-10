const db = require('../models');
const passport = require('passport');
const createSession = require('../app/createSession');
const { registerUser } = require('../app/authentication');

module.exports = (router) => {
    router.get('/oauth/linkedin', (req, res, next) => {
        console.log('oauth endpoint called upon');
        passport.authenticate('linkedin')(req, res, next);
    });

    router.get(
        '/oauth/callback',
        (req, res, next) => {
            console.log('linkedin callback called');
            passport.authenticate('linkedin')(req, res, next);
        },
        async ({ user: returnedUser }, res) => {
            console.log('returned user from linkedin', returnedUser);
            const user = {
                name: returnedUser.displayName || returnedUser.name,
                thumbnail: returnedUser.photos[0] ? returnedUser.photos[0].value : '',
                email: returnedUser.emails[0] ? returnedUser.emails[0].value : '',
                authId: returnedUser.id,
                type: 'linkedin',
            };
            const session = createSession();
            const sessionData = JSON.stringify(await registerUser(user, session));
            res.send(
                `<html><body><script>window.opener.postMessage('${sessionData}', '*');</script>Please wait...</body></html>`
            );
        }
    );
};
