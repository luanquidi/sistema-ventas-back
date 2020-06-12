const express = require('express');
const router = express.Router();

router.use('/usuario',require('./usuario'));
router.use('/categoria',require('./categoria'));
router.use('/producto',require('./producto'));
router.use('/cliente',require('./cliente'));
router.use('/venta',require('./venta'));

module.exports = router;