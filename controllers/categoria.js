const Categoria = require('../models/categoria');

exports.obtenerCategorias = (req, res) => {
    const { nombre } = req.params;

    Categoria.find({titulo: new RegExp(nombre, 'i')}, (err, categoriasEncontradas) => {
        if(err){
            res.status(500).json({
                ok:false,
                errors: err,
                mensaje: 'Problema al cargar categorias'
            })
        }

        if(categoriasEncontradas.length === 0) return res.status(400).json({ok: false, mensaje: 'No hay categorias con ese titulo'});

        res.status(200).json({
            ok:true,
            categorias: categoriasEncontradas
        })
    });
}

exports.crearCategoria = (req, res) => {
    const { titulo, descripcion } = req.body;

    const categoria  = new Categoria({
        titulo,
        descripcion
    });

    categoria.save( (err, categoriaGuardada) => {
        if(err) {
            res.status(400).json({
                ok: false,
                mensaje: 'Error al crear categoria',
                errors: err
            })
        }

        res.status(201).json({
            ok: true,
            categoria: categoriaGuardada
        })
    });
}

exports.obtenerCategoria = (req, res) => {
    const { _id } = req.params;

    Categoria.findById({_id}, (err, categoriaEncontrada) => {
        if(err){
            res.status(404).json({
                ok:false,
                errors: err,
                mensaje: 'Problema al encontrar categoria'
            })
        }

        res.status(200).json({
            ok:true,
            categoria: categoriaEncontrada
        })
    });
}

exports.editarCategoria = (req, res) => {
    const { _id } = req.params;
    const { titulo, descripcion } = req.body;

    Categoria.findByIdAndUpdate({_id}, {titulo, descripcion}, (err, categoriaActualizada) => {
        if(err){
            res.status(500).json({
                ok:false,
                errors: err,
                mensaje: 'Problema al actualizar categoria'
            })
        }

        res.status(200).json({
            ok:true,
            categoria: categoriaActualizada
        })
    });
}

exports.eliminarCategoria = (req, res) => {
    const { _id } = req.params;

    Categoria.findByIdAndRemove({_id}, (err, categoriaEliminada) => {
        if(err){
            res.status(400).json({
                ok:false,
                errors: err,
                mensaje: 'Problema al eliminar categoria'
            })
        }

        res.status(200).json({
            ok:true,
            categoria: categoriaEliminada
        })
    });
}