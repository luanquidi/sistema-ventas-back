const Producto = require('../models/producto');
const fs = require('fs');
const path = require('path');

exports.crearProducto = (req, res) => {
    const { titulo, descripcion, img, precio_compra, precio_venta, stock, id_categoria, puntos} = req.body;
   
    if(req.files){
        const imgPath = req.files.img.path;
        const name = imgPath.split('/')[2];
        
        const producto = new Producto({
            titulo,
            descripcion,
            img: name,
            precio_compra,
            precio_venta,
            stock,
            id_categoria,
            puntos
        });

        producto.save( (err, productoGuardado) => {
            if(err) {
                res.status(400).json({
                    ok: false,
                    mensaje: 'Error al crear producto',
                    errors: err
                })
            }
    
            res.status(201).json({
                ok: true,
                producto: productoGuardado
            })
        });

    }else {
        const producto = new Producto({
            titulo,
            descripcion,
            img: null,
            precio_compra,
            precio_venta,
            stock,
            id_categoria
        });


        producto.save( (err, productoGuardado) => {
            if(err) {
                res.status(400).json({
                    ok: false,
                    mensaje: 'Error al crear producto',
                    errors: err
                })
            }
    
            res.status(201).json({
                ok: true,
                producto: productoGuardado
            })
        });
    }
   
}

exports.obtenerProductos = (req, res) => {
    const { titulo } = req.params;

    Producto.find({titulo: new RegExp(titulo, 'i')}).populate('id_categoria').exec(
        (err, productosEncontrados) => {
            if(err){
                res.status(500).json({
                    ok:false,
                    errors: err,
                    mensaje: 'Problema al cargar productos'
                })
            }
    
            if(productosEncontrados.length === 0) return res.status(400).json({ok: false, mensaje: 'No hay productos con ese titulo'});
    
            res.status(200).json({
                ok:true,
                productos: productosEncontrados
            })
        }
    );
}

exports.editarProducto = (req, res) => {
    const { _id, image } = req.params;
    const { titulo, descripcion, img, precio_compra, precio_venta, stock, id_categoria, puntos} = req.body;

    if(Object.keys(req.files).length !== 0){

        fs.unlink('./uploads/productos/'+image, (err) => {
            if(err) throw err;
        });

        const imgPath = req.files.img.path;
        const name = imgPath.split('/')[2];


        Producto.findByIdAndUpdate({_id}, {
            titulo,
            descripcion,
            img: name,
            precio_venta,
            precio_compra,
            stock,
            id_categoria,
            puntos
        }, (err, productoActualizado) => {
            if(err) {
                res.status(400).json({
                    ok: false,
                    mensaje: 'Error al actualizar producto',
                    errors: err
                })
            }
    
            res.status(201).json({
                ok: true,
                producto: productoActualizado
            })
        });
    }else {

        Producto.findByIdAndUpdate({_id}, {
            titulo,
            descripcion,
            img: img.length > 1 ? img : null,
            // img: img.length > 1 ? img : null,
            precio_venta,
            precio_compra,
            stock,
            id_categoria,
            puntos
        }, (err, productoActualizado) => {
            if(err) {
                res.status(400).json({
                    ok: false,
                    mensaje: 'Error al actualizar producto',
                    errors: err
                })
            }
    
            res.status(201).json({
                ok: true,
                producto: productoActualizado
            })
        });
    }

}

exports.obtenerProducto = (req, res) => {
    const { _id } = req.params;

    Producto.findById({_id}, (err, productoEncontrado) => {
        if(err){
            res.status(404).json({
                ok:false,
                errors: err,
                mensaje: 'Problema al encontrar producto'
            })
        }

        res.status(200).json({
            ok:true,
            producto: productoEncontrado
        })
    });
}

exports.eliminarProducto = (req, res) => {
    const { _id } = req.params;

    Producto.findByIdAndRemove({_id}, (err, productoEliminado) => {
        if(err){
            res.status(400).json({
                ok:false,
                errors: err,
                mensaje: 'Problema al eliminar producto'
            })
        }

        res.status(200).json({
            ok:true,
            producto: productoEliminado
        })
    });
}

exports.aumentarStock = (req, res) => {
    const { _id } = req.params;
    const { stock } = req.body;

    Producto.findById({_id}, (err, productoEncontrado) => {
        console.log(productoEncontrado);
        if(productoEncontrado){
            Producto.findByIdAndUpdate({_id}, {stock: parseInt(productoEncontrado.stock) + parseInt(stock)}, (err, productoActualizado) => {
                if(productoActualizado){
                    res.status(200).json({
                        ok:true,
                        producto: productoActualizado
                    })
                }
                res.status(400).json({
                    ok:false,
                    errors: err,
                    mensaje: 'Problema al actualizar stcok del producto'
                })

            });
        }
    })

}

exports.getImg = (req, res) => {
    const { img } = req.params;

    if(img != 'null'){
        const pathImg = './uploads/productos/' + img;
        res.status(200).sendFile(path.resolve(pathImg));
    }else {
        const pathImg = './uploads/productos/default.png';
        res.status(200).sendFile(path.resolve(pathImg));
    }
}