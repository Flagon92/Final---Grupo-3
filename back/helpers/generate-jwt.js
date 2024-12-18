const jwt = require('jsonwebtoken');


const generateJWT = (uid) => {

    return new Promise((resolve, reject) => {

        const secretKey = 'BB61a9dfff842b@'
        

        const payload = {
            uid
        };

        jwt.sign(payload, secretKey, {
            expiresIn: '12h'
        }, (err, token) => {

            if (err) {
                console.log(err);
                reject('No se pudo generar el token');
            } else {
                resolve(token);
            }
        });

    });

};

module.exports = {
    generateJWT
};