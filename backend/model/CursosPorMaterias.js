var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var cursosPorMateriasSchema = new Schema({
    idMateria_FK:String,
    idCurso_FK:String
});

var CursosPorMaterias = mongoose.model('cursosPorMaterias', cursosPorMateriasSchema,'cursosPorMaterias');
console.log("se creo modelo CursosPorMaterias");
module.exports = CursosPorMaterias;