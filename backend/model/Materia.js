var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var materiaSchema = new Schema({
    id_materia:String,
    nombre_materia:String,
    des_materia:String
});

var Materias = mongoose.model('materia', materiaSchema,'materia');
console.log("se creo modelo Materias");
module.exports = Materias;