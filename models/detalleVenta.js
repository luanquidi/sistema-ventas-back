const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const detalleVentaSchema = new Schema({
    id_producto: {
        type: Schema.ObjectId,
        ref: 'Producto'
    },
    cantidad: {
        type: Number
    },
    venta: {
        type: Schema.ObjectId,
        ref: 'Venta'
    }
});


module.exports = mongoose.model('DetalleVenta', detalleVentaSchema);