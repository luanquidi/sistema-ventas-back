const express = require('express');
const router = express.Router();

const cliente = require('../controllers/cliente');

router.post('/', cliente.crearCliente);
router.put('/:_id', cliente.editarCliente);
router.delete('/:_id', cliente.eliminarCliente);



module.exports = router;
