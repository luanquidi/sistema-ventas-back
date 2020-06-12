const express = require('express');
const router = express.Router();

const venta = require('../controllers/venta');

router.post('/', venta.crearVenta);
router.get('/:_id', venta.obtenerVenta);


module.exports = router;
