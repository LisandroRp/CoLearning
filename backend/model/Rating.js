var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ratingSchema = new Schema({
    idRating:String,
    votos:String,
    rating:String
});

var Ratings = mongoose.model('rating', ratingSchema,'rating');
console.log("se creo modelo Rating");
module.exports = Ratings;