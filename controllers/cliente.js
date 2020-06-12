const Cliente = require('../models/cliente');

exports.crearCliente = (req, res) => {

    const { nombre, puntos, email, dni } = req.body;

    const cliente = new Cliente({
        dni,
        nombre,
        email,
        puntos
    });

    cliente.save( (err, clienteGuardado) => {
        if(err) {
            res.status(400).json({
                ok: false,
                mensaje: 'Error al crear cliente',
                errors: err
            })
        }

        res.status(201).json({
            ok: true,
            cliente: clienteGuardado
        })
    });
}

exports.editarCliente = (req, res) => {

    const { _id } = req.params;
    const { nombre, puntos, email } = req.body;

    
    Cliente.findByIdAndUpdate({_id}, {nombre, email, puntos}, (err, clienteActualizado) => {
        if(err){
            res.status(500).json({
                ok:false,
                errors: err,
                mensaje: 'Problema al actualizar cliente'
            })
        }

        res.status(200).json({
            ok:true,
            cliente: clienteActualizado
        })
    });
}

exports.eliminarCliente = (req, res) => {
    const { _id } = req.params;

    Cliente.findByIdAndRemove({_id}, (err, clienteEliminado) => {
        if(err){
            res.status(400).json({
                ok:false,
                errors: err,
                mensaje: 'Problema al eliminar cliente'
            })
        }

        res.status(200).json({
            ok:true,
            cliente: clienteEliminado
        })
    });
}