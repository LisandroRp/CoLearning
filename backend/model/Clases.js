var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var claseSchema = new Schema({
    nombre:String,
    idProfesor:String,
    idDireccion:String,
    idClase:String
});

var Clases = mongoose.model('clases', claseSchema,'clases');
console.log("se creo modelo Clases");
module.exports = Clases;