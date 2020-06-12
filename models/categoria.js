const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categoriaSchema = new Schema({
    titulo: {
        type: String,
        required: [true, 'El titulo es necesario']
    },
    descripcion: {
        type: String,
        required: [true, 'El apellido es necesario']
    }
});


module.exports = mongoose.model('Categoria', categoriaSchema);