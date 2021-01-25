const User = require('../../models/user');
const jwt = require('jsonwebtoken');

module.exports = async (req, res, next) => {
    // const user = await User.findOne({ session: headers.session });

    // if (!headers.session || !user) {
    //     console.log(headers)
    //     console.log('Insecure attempt on secured route');
    //     res.status(403).send({ error: 'Access to this route requires authentication' });
    //     return
    // }

    // next();
    console.log("AUTHENTICATION MIDDLEWARE RUN")
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
        console.log('Token missing', req.headers);
        res.status(403).send({ error: 'Access to this route requires a valid token' });
        return;
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.status(403).send({ error: 'Invalid token' });
        req.user = user;
        next();
    });
};
