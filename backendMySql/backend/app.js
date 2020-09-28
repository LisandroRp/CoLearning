// Import express
var express = require('express');
//Import Body Parser
var bodyParser = require('body-parser');
var cors = require('cors');
// Initialize the server express
var app = express();

//conectar BD var urlBD = 'mongodb://localhost/PFI_COLEARNING';
//opciones conexion var opts = {useNewUrlParser : true,useUnifiedTopology: true , connectTimeoutMS:20000};
//importo driver var mongoose = require('mongoose');
//Pruebo conexion
//mongoose.connect(urlBD,opts).then
//(
//    () => {
//            console.log("Conectado a PFI_COLEARNING!!");
//          }, //se conecto
//    err => { 
//            console.log("ERROR:" + err); 
//           } //manejo error
//);

// Import router
var apiRoutes = require("./api-routes")


// Todo lo que recibe la app se tratara como json
app.use(bodyParser.urlencoded(
{
    extended: true
}));
app.use(bodyParser.json());
app.use(cors());

// Setup server port
var port = process.env.PORT || 8088;

// Send message for default URL
app.get('/', (req, res) => res.send('Soy colearning Activa'));

// Use Api routes in the App
app.use('/apiColearning', apiRoutes);

// Launch app to listen to specified port
app.listen(port, function () {
     console.log("Ejecuntando en el puerto " + port);
     console.log("Conectado apiColearning!!!");
});

