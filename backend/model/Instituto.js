var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var institutoSchema = new Schema({
    id_instituto:String,
    nombre_instituto:String,
    src:String,
    idDireccion:String,
    whatsApp:String
   
});

var Institutos = mongoose.model('instituto', institutoSchema,'instituto');
console.log("se creo modelo Institutos");
module.exports = Institutos;