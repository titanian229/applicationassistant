const db = require('../models');
const passport = require('passport');
const createSession = require('../app/createSession')

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
                name: returnedUser.displayName,
                thumbnail: returnedUser.photos[0] ? returnedUser.photos[0].value : '',
                email: returnedUser.emails[0] ? returnedUser.emails[0].value : '',
                authId: returnedUser.id,
                type: 'linkedin',
            };
            const sessionData = JSON.stringify(await createSession(user));
            res.send(
                `<html><body><script>window.opener.postMessage('${sessionData}', '*');</script>Please wait...</body></html>`
            );
        }
    );
};
