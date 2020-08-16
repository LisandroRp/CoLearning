var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var tipoClaseSchema = new Schema({
    id_tipoClases:String,
    des_tipoClases:String,
    descripcion:String
});

var TipoClases = mongoose.model('tipoClase', tipoClaseSchema,'tipoClase');
console.log("se creo modelo TipoClases");
module.exports = TipoClases;