const Usuario = require('../models/usuario');
const bcrypt = require('bcryptjs');

exports.crearUsuario = (req, res) => {

    const {nombre, apellido, password, email, role} = req.body;

    const usuario = new Usuario({
        nombre,
        apellido,
        password: bcrypt.hashSync(password, 10),
        email,
        role
    });

    usuario.save( (err, usuarioGuardado) => {
        if(err) {
            res.status(400).json({
                ok: false,
                mensaje: 'Error al crear usuario',
                errors: err
            })
        }

        usuarioGuardado.password = ':)';

        res.status(201).json({
            ok: true,
            usuario: usuarioGuardado
        })
    });
}

