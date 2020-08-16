var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var dondeDaClasesPorProfesorSchema = new Schema({
    idDondeDaClases_Fk:String,
    idProfesor:String
});

var DondeDaClasesPorProfesores = mongoose.model('dondeDaClasesPorProfesor', dondeDaClasesPorProfesorSchema,'dondeDaClasesPorProfesor');
console.log("se creo modelo DondeDaClasesPorProfesores");
module.exports = DondeDaClasesPorProfesores;