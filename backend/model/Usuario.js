var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var UsuarioSchema = new Schema({
   
    idUsuario:String,
    password:String,
    profesor:Boolean,
    nombre_usuario:String,
    src:String,
    instagram:String,
    whatsApp:String,
    apellido:String,
    telefono:String,
    mail:String,
    idDireccion:String,
    idTipoPerfil:String,
    idRating:String
});

var usuarios = mongoose.model('usuario', UsuarioSchema,'usuario');
console.log("se creo modelo Usuario ");
module.exports = usuarios;