var dbConn = require('../config/db.config');


let findAllMaterias = (req, res) =>
{      
    console.log("llegue todas las materia");
    dbConn.query('SELECT * FROM materia', (err,rows) => {
        if(err) throw err;      
        console.log('Todas las materias:');
        console.log(rows);
        res.send(rows);
      });

};  

let findAllMonedas = (req, res) =>
{      
    console.log("llegue todas las monedas");
    dbConn.query('SELECT * FROM moneda', (err,rows) => {
        if(err) throw err;      
        console.log('Todas las monedas:');
        console.log(rows);
        res.send(rows);
      });

};  

let findAllClases = (req, res) =>
{      
    console.log("llegue todas las clases");
    dbConn.query('SELECT * FROM clases', (err,rows) => {
        if(err) throw err;      
        console.log('Todas las clases:');
        console.log(rows);
        res.send(rows);
      });

};  

let findAllComentarios = (req, res) =>
{      
    console.log("llegue todos los comnetarios");
    dbConn.query('SELECT * FROM comnetarios', (err,rows) => {
        if(err) throw err;      
        console.log('Todas las comnetarios:');
        console.log(rows);
        res.send(rows);
      });
};  

let findAllDondedaclases = (req, res) =>
{      
    console.log("llegue todos los dondedaclases");
    dbConn.query('SELECT * FROM dondedaclases', (err,rows) => {
        if(err) throw err;      
        console.log('Todas las dondedaclases:');
        console.log(rows);
        res.send(rows);
      });

};  

let findAllForo= (req, res) =>
{      
    console.log("llegue todos los foros");
    dbConn.query('SELECT * FROM foro', (err,rows) => {
        if(err) throw err;      
        console.log('Todas las foros:');
        console.log(rows);
        res.send(rows);
      });

};  

let findAllInstituto= (req, res) =>
{      
    console.log("llegue todos los instituto");
    dbConn.query('SELECT * FROM instituto', (err,rows) => {
        if(err) throw err;      
        console.log('Todos los instituto:');
        console.log(rows);
        res.send(rows);
      });

}; 

let findAllRating= (req, res) =>
{      
    console.log("llegue todos los rating");
    dbConn.query('SELECT * FROM rating', (err,rows) => {
        if(err) throw err;      
        console.log('Todos los rating:');
        console.log(rows);
        res.send(rows);
      });

}; 

let findAllTag= (req, res) =>
{      
    console.log("llegue todos los tag");
    dbConn.query('SELECT * FROM tag', (err,rows) => {
        if(err) throw err;      
        console.log('Todos los tag:');
        console.log(rows);
        res.send(rows);
      });

};

let findAllTipoclase= (req, res) =>
{      
    console.log("llegue todos los tipoclase");
    dbConn.query('SELECT * FROM tipoclase', (err,rows) => {
        if(err) throw err;      
        console.log('Todos los tipoclase:');
        console.log(rows);
        res.send(rows);
      });

};

module.exports = {findAllMaterias,findAllClases,findAllComentarios,
    findAllDondedaclases,findAllForo,
     findAllInstituto,findAllRating,findAllTag,findAllTipoclase,findAllMonedas};