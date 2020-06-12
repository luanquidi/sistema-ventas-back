const Usuario = require('../models/usuario');
const  bcrypt = require('bcryptjs');
const jwt = require('../helpers/jwt');

exports.login = (req, res) => {
    const { email, password, token } = req.body;

    Usuario.findOne({email}, (err, userEncontrado) => {
        if(err) {
            res.status(500).json({
                ok: false,
                mensaje: 'Problemas al encontrar usuario',
                errors: err
            });
        }
        if(userEncontrado){
            
            if(bcrypt.compareSync(password, userEncontrado.password)) {
                
                userEncontrado.password = ':)';

                if(!token) return res.status(200).json({ok: false, usuario: userEncontrado, mensaje: 'No token', token: jwt.createToken(userEncontrado)});

                res.status(200).json({
                    ok: true,
                    usuario: userEncontrado,
                    token: jwt.createToken(userEncontrado)
                });
            }else{
                res.status(403).json({
                    ok: true,
                    mensaje: 'Ingrese credenciales correctas'
                })
            }
            
            
        }else {
            res.status(403).json({
                ok: true,
                mensaje: 'El correo no exite'
            })
        }
        
    });

}