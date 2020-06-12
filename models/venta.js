const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ventaSchema = new Schema({
    id_cliente: {
        type: Schema.ObjectId,
        ref: 'Cliente'
    },
    id_user: {
        type: Schema.ObjectId,
        ref: 'Usuario'
    },
    fecha: {
        type: Date,
        default: Date.now
    }
});


module.exports = mongoose.model('Venta', ventaSchema);