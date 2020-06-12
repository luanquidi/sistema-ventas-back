const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const rolesValidos = {
    values: ['ADMIN_ROLE', 'USER_ROLE'],
    message: '{VALUE} no es un rol permitido'
};

const usuarioSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es necesario']
    },
    apellido: {
        type: String,
        required: [true, 'El apellido es necesario']
    },
    email: {
        type: String,
        unique:true,
        required: [true, 'El correo es necesario']
    },
    password: {
        type: String,
        required: [true, 'la contraseña es necesaria'],
    },
    role: {
        type: String,
        default: 'USER_ROLE',
        enum: rolesValidos
    }
});

// usuarioSchema.plugin( uniqueValidator, { message: '{PATH} debe de ser único' } );

module.exports = mongoose.model('Usuario', usuarioSchema);