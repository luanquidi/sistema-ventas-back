const express = require('express');
const morgan = require('morgan');
const port = process.env.PORT || 3000;

// Base de datos
require('./database');


// Inicializar App
const app = express();


// Middlewares
app.use(morgan('dev'));
app.use(express.json());

app.use((req,res,next)=>{
    res.header('Content-Type: application/json');
    res.header('Access-Control-Allow-Origin','*'); 
    res.header('Access-Control-Allow-Headers','Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods','GET, PUT, POST, DELETE, OPTIONS');
    res.header('Allow','GET, PUT, POST, DELETE, OPTIONS');
    next();
});


// Routes
app.use('/api', require('./routes'));


app.listen(port, () => {
    console.log('Escuchando el puerto: \x1b[32m%s\x1b[0m', port);
});