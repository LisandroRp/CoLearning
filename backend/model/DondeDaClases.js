var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var dondeDaClasesSchema = new Schema({
    id_dondeClases:String,
    des_dondeClases:String
});

var DondeDaClases = mongoose.model('dondeDaClases', dondeDaClasesSchema,'dondeDaClases');
console.log("se creo modelo DondeDaClases");
module.exports = DondeDaClases;