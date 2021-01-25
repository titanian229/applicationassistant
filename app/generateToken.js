const jwt = require('jsonwebtoken');

module.exports = (user) => {
    console.log('generating access token');
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '30m' });
};
