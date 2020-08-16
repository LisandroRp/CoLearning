var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var tagSchema = new Schema({
    id_tag:String,
    nombre_tag:String
});

var Tags = mongoose.model('tag', tagSchema,'tag');
console.log("se creo modelo Tag");
module.exports = Tags;