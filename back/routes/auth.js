// path: /api/auth

const { Router } = require('express');
const router = Router();

//express-validator
const { check } = require('express-validator');

// controllers
const { login, renewToken } = require('../controllers/authController');

//middelwares
// const { validarJWT } = require('../middlewares/validar-jwt');

//login
router.post('/',
    [
        check('email','el email es obligatorio').isEmail(),
        check('password','el password es obligatorio').notEmpty()
    ],
    login
)

// renew-token
// router.get('/renewtoken', validarJWT, renewToken)

module.exports = router;