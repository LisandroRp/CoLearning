var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var foroSchema = new Schema({
    id_foro:String,
    idUsuario:String,
    nombre_foro:String,
    pregunta:String,
    esProfesor:Boolean,
    respuestasCant:String,
    fecha_alta:String,
    resuleto:Boolean
});

var Foros = mongoose.model('foro', foroSchema,'foro');
console.log("se creo modelo Foros");
module.exports = Foros;