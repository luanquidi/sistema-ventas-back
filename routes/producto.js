const express = require('express');
const router = express.Router();
const multipart = require('connect-multiparty');
var path = multipart({
    uploadDir: './uploads/productos'
});

const producto = require('../controllers/producto');


router.post('/', path, producto.crearProducto);
router.get('/list/:titulo?', producto.obtenerProductos);
router.get('/:_id', producto.obtenerProducto);
router.put('/stock/:_id', producto.aumentarStock);
router.put('/edit/:_id/:image?', path, producto.editarProducto);
router.delete('/:_id', producto.eliminarProducto);
router.get('/img/:img', producto.getImg);


module.exports = router;
