var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var materiaPorProfesorSchema = new Schema({
    idMateria_FK:String,
    idProfesor:String
});

var MateriaPorProfesores = mongoose.model('materiaPorProfesor', materiaPorProfesorSchema,'materiaPorProfesor');
console.log("se creo modelo MateriaPorProfesores");
module.exports = MateriaPorProfesores;