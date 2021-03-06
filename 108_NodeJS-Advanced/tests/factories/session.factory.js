
const Buffer = require('safe-buffer').Buffer;
const KeyGrip = require('keygrip');
const keys = require('../../config/keys');
const kg = new KeyGrip([keys.cookieKey]);

module.exports = (user) => {
    const sessionObj = {passport: {user: user._id.toString()}};
    const session = Buffer
        .from(JSON.stringify(sessionObj))
        .toString('base64');
    
    const sig = kg.sign(`session=${session}`);

    return { session, sig }
}