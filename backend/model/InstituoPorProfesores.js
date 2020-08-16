var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var instituoPorProfesoresSchema = new Schema({
    idInstituto_FK:String,
    idProfesor:String
});

var InstituoPorProfesores = mongoose.model('instituoPorProfesores', instituoPorProfesoresSchema,'instituoPorProfesores');
console.log("se creo modelo InstituoPorProfesores");
module.exports = InstituoPorProfesores;