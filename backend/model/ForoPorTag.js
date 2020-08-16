var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var foroPorTagSchema = new Schema({
    idForo_fk:String,
    idTag_fk:String
});

var ForoPorTags = mongoose.model('foroPorTag', foroPorTagSchema,'foroPorTag');
console.log("se creo modelo ForoPorTags");
module.exports = ForoPorTags;