const express = require('express');
const routes = require('./routes');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config({ path : '.env'});

//Cors permite que un cliente se conecte a otro servidor para el intercambio de recursos
const cors = require('cors');

//conecta mongo
mongoose.Promise = global.Promise;
mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
});

//crea el servidor
const app = express();

//habilita el bodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//Definir dominios para recibir peticiones
const whiteList = [process.env.FRONTEND_URL];
const corsOptions = {
    origin: (origin, callback) => {
        //Revisa si la peticion viene de un servidor que esta en la lista blanca(whiteList)
        const existe = whiteList.some( dominio => dominio === origin )
        if(existe){
            callback(null, true);
        } else {
            callback(new Error('Acceso denegado por CORS'));
        }
    }
}

//habilita cors
app.use(cors(corsOptions));

//utiliza las rutas
app.use('/', routes());

//carpeta publica
app.use(express.static('uploads'));

const host = process.env.HOST || '0.0.0.0';
const port = process.env.PORT || 5000;

//puerto del servidor
app.listen(port, host, () => {
    console.log('REST API CRM iniciada');
});