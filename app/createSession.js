const uuid = require('uuid').v4;

module.exports = () => {
    console.log('creating session');
    const sessionID = uuid();
    return sessionID;
};
