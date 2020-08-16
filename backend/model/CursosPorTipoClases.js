var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var cursosPorTipoClasesSchema = new Schema({
    idClase_FK:String,
    idCursos_FK:String
});

var CursosPorTipoClases = mongoose.model('cursosPorTipoClases', cursosPorTipoClasesSchema,'cursosPorTipoClases');
console.log("se creo modelo CursosPorTipoClases");
module.exports = CursosPorTipoClases;