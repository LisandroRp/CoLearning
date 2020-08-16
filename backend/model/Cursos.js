var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var cursosSchema = new Schema({
    nombre:String,
    idCurso:String,
    tematica:String,
    idProfesor:String,
    idRating:String
});

var Cursos = mongoose.model('cursos', cursosSchema,'cursos');
console.log("se creo modelo Cursos");
module.exports = Cursos;