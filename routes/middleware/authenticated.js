const User = require('../../models/user');

module.exports = async ({ headers }, res, next) => {
    const user = await User.findOne({ session: headers.session });

    if (!headers.session || !user) {
        console.log(headers)
        console.log('Insecure attempt on secured route');
        res.status(403).send({ error: 'Access to this route requires authentication' });
        return
    }

    next();
};
