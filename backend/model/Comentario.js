var mongoose = require('mongoose');
var AutoIncrement = require('mongoose-sequence')(mongoose);

var Schema = mongoose.Schema;

var comentarioSchema = new Schema({
    des_comentario:String,
    fecha_alta:String,
    ratingPos:String,
    ratingNeg:String,
    id_usuarioOrigen:String,
    id_usuarioDestino:String,
    id_comentario:Number
});


comentarioSchema.plugin(AutoIncrement, {id:'comentario_seq',inc_field: 'id_comentario'});
var Comentarios = mongoose.model('comentarios', comentarioSchema,'comentarios');
console.log("se creo modelo Comentarios");
module.exports = Comentarios;