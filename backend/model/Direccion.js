var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var direccionSchema = new Schema({
    idDireccion:String,
    calle:String,
    numero:String,
    localidad:String,
    latitud:String,
    longitud:String
});

var Direcciones = mongoose.model('direccion', direccionSchema,'direccion');
console.log("se creo modelo Direccion");
module.exports = Direcciones;