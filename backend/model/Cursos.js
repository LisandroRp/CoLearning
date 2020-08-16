var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var cursosSchema = new Schema({
    nombre_curso:String,
    id_curso:String,
    id_instituto:String,
    src:String,
    idRating:String,
    idDireccion:String,
    whatsApp:String,
    idProfesor:String

});

var Cursos = mongoose.model('cursos', cursosSchema,'cursos');
console.log("se creo modelo Cursos");
module.exports = Cursos;