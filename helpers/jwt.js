const jwt = require('jwt-simple');
const moment = require('moment');
const secret = 'sorryNotSorry';

exports.createToken = (user) => {
    const payload = {
        sub: user._id,
        nombre: user._nombre,
        apellido: user.apellido,
        email: user.email,
        role: user.role,
        iat: moment().unix(),
        exp: moment().add(30, 'days').unix()
    }

    return jwt.encode(payload, secret);
}