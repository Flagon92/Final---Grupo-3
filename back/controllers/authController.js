//bcryptjs
const bcrypt = require('bcryptjs')
//express-validator
const { validationResult } = require('express-validator');
//jsonwebtoken
const { generateJWT } = require('../helpers/generate-jwt');
//models
// const Usuario = require('../models/usuario');

const Mesero = require('../models/Mesero')


const login = async(req, res) => {

    const { email, password } = req.body;
    
    // get fields errors express-validators
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ 
            errors: errors.array() 
        });
    }

    try {

        const meseroDB = await Mesero.findOne({ email }) // si no encuentra una coincidencia devuelve null        

        if (!meseroDB) { 

            return res.status(401).json({
                ok: false,
                msg: 'Email incorrecto'
            }) 
        }

        // const validPassword = bcrypt.compareSync( password, meseroDB.password); // devuelve un boolean
        const validPassword = await meseroDB.validatePassword(password);

        if (!validPassword) {
    
            return res.status(401).json({
                ok: false,
                msg: `Password incorrecto`
            });
        }
        
            
        //generate jwt
        const token =  await generateJWT(meseroDB._id);

        res.status(200).json({
            msg: 'Login exitoso',
            mesero: meseroDB,
            token
        })

    } catch (abi) {
        // console.log(error);
        res.status(500).json({
            ok: false,
            msgErrorServer: 'Hable con el administrador'
        })
    }
}

// renueva el token por si el token caduco o no existe; necesito hacer una validación si el token existe sino lo renuevo
const renewToken = async(req, res) => {

    // el req.uid viene de haber pasado por el middleware validar-jwt
    const uid = req.uid;

    // renuevo el nuevo token
    const token = await generateJWT(uid);

    res.status(200).json({
        ok: true,
        tokenRenovado: token,
    });
};

module.exports = {
    login,
    renewToken
}