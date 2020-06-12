const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const clienteSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es necesario']
    },
    dni: {
        type: String,
        required: [true, 'El dni es necesario']
    },
    puntos: {
        type: Number
    },
    email: {
        type: String,
        unique:true,
        required: [true, 'El correo es necesario']
    },
    createAt: {
        type: Date,
        default: Date.now
    }
});


module.exports = mongoose.model('Cliente', clienteSchema);