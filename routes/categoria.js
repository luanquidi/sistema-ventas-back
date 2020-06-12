const express = require('express');
const router = express.Router();

const categoria = require('../controllers/categoria');

router.get('/list/:nombre?', categoria.obtenerCategorias);
router.post('/', categoria.crearCategoria);
router.get('/:_id', categoria.obtenerCategoria);
router.put('/:_id', categoria.editarCategoria);
router.delete('/:_id', categoria.eliminarCategoria);


module.exports = router;
