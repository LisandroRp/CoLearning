var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var cursosPorDondeDaClasesSchema = new Schema({
    idcurso_FK:String,
    idDondeDaClase_FK:String
});

var CursosPorDondeDaClases = mongoose.model('cursosPorDondeDaClases', cursosPorDondeDaClasesSchema,'cursosPorDondeDaClases');
console.log("se creo modelo CursosPorDondeDaClases");
module.exports = CursosPorDondeDaClases;