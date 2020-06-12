const Venta = require('../models/venta');
const Producto = require('../models/producto');
const DetalleVenta = require('../models/detalleVenta');

exports.crearVenta = (req, res) => {

    const { id_cliente, id_user, detalles } = req.body;

    const venta = new Venta({
        id_cliente,
        id_user
    });

    venta.save((err, ventaCreada) => {
        if(err) {
            res.status(400).json({
                ok: false,
                mensaje: 'Error al crear venta',
                errors: err
            })
        }

        const detallesArray = detalles;

        detallesArray.map((element, i)=> {

            console.log(element, i);

            const detalleventa = new DetalleVenta({
                id_producto: element.id_producto,
                cantidad: element.cantidad,
                venta: ventaCreada._id
            });

            detalleventa.save((err, detalleCreado) => {
               if(err){
                res.status(400).json({
                    ok: false,
                    mensaje: 'Error al crear detalle de venta',
                    errors: err
                });
               }

               Producto.findById({_id: element.id_producto}, (err, productoEncontrado)=> {
                if(err){
                    res.status(400).json({
                        ok: false,
                        mensaje: 'Error al buscar producto',
                        errors: err
                    });
                }

                Producto.findByIdAndUpdate({_id: productoEncontrado._id}, {stock: parseInt(productoEncontrado.stock) - parseInt(element.cantidad)},(err, productoActualizado) => {
                    res.end();
                });
               });

            })
        });


        res.status(201).json({
            ok: true,
            venta: ventaCreada
        })
    });
}

exports.obtenerVenta = (req, res) => {
    const { _id } = req.params;

    Venta.findById({_id}, (err, ventaEncontrada) => {
        if(ventaEncontrada){
            DetalleVenta.find({venta: _id}, (err, detalleVentaEncontrada) => {
                if(detalleVentaEncontrada){
                    res.status(200).json({
                        ok:true,
                        venta: ventaEncontrada,
                        detalle: detalleVentaEncontrada
                    })
                }
            });
        }
    })
}

