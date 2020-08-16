var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var profesorPorClaseSchema = new Schema({
    idClase_FK:String,
    idProfesor:String
});

var ProfesorPorClases = mongoose.model('profesorPorClase', profesorPorClaseSchema,'profesorPorClase');
console.log("se creo modelo profesorPorClase");
module.exports = ProfesorPorClases;