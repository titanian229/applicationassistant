const db = require('../models');
const { useRefreshToken } = require('../app/authentication');

module.exports = (router) => {
    router.post('/auth/refresh_token', async (req, res) => {
        const { refreshToken } = req.body;

        if (!refreshToken) {
            console.log('Refresh token request made without token');
            res.status(403).send({ error: 'Error refreshing authorization, please login again' });
        }
        try {
            const sessionData = await useRefreshToken(refreshToken);
            res.status(sessionData.serverError ? 403 : 200).send(sessionData);
        } catch (err) {
            console.log('Error inside refresh token', err);
            res.status(500).send({ error: 'Internal server error, please login again' });
        }
    });
};
