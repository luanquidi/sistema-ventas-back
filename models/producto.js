const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productoSchema = new Schema({
    titulo: {
        type: String,
        required: [true, 'El titulo es necesario']
    },
    descripcion: {
        type: String,
        required: [true, 'El apellido es necesario']
    },
    img: {
        type: String
    },
    precio_compra: { type: Number},
    precio_venta: { type: Number},
    stock: { type: Number},
    id_categoria: { type: Schema.ObjectId, ref: 'Categoria'},
    puntos: { type: Number}

});


module.exports = mongoose.model('Producto', productoSchema);