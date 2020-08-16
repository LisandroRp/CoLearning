var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var cursoPorAlumnoSchema = new Schema({
    nombre:String,
    idCurso:String,
    tematica:String,
    idProfesor:String,
    idRating:String
});

var CursoPorAlumnos = mongoose.model('cursoPorAlumno', cursoPorAlumnoSchema,'cursoPorAlumno');
console.log("se creo modelo CursoPorAlumnos");
module.exports = CursoPorAlumnos;