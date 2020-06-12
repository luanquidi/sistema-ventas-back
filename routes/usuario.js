const express = require('express');
const router = express.Router();

const usuario = require('../controllers/usuario');


router.post('/', usuario.crearUsuario);
router.post('/login', require('../controllers/auth').login);


module.exports = router;
