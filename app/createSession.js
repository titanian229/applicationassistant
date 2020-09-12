const uuid = require('uuid').v4;
const authentication = require('./authentication')

module.exports = async (user) => {
    console.log('creating session');
    const sessionID = uuid();
    const userData = await authentication.registerUser(user, sessionID);

    return userData;
};