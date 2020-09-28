var dbConn = require('../config/db.config');
var mysql = require('mysql');


let findAll = (req, res) =>
{      
    console.log("llegue todos los usuarios");
    dbConn.query('SELECT * FROM usuario', (err,rows) => {
        if(err) throw err;      
        console.log('Todos los usuarios:');
        console.log(rows);
        res.send(rows);
      });

};  

let findAllById = (req, res) =>
{      
    console.log("llegue a leer comentarios con filtro");
    //Obtener id busqueda req.param.tagid
    console.log(req.params.id);
    var idBusqueda = req.params.id;
    console.log(idBusqueda);
    var sql = 'SELECT * FROM usuario WHERE idUsuario=?';
    dbConn.query(sql,[idBusqueda], (err,rows) => {
        if(err) throw err;      
        console.log('El usuario by id: ' + idBusqueda);
        console.log(rows);
        res.send(rows);
      });

};  

let findAllByIdProfesorByDondeDaClases = (req, res) =>
{      
  console.log("llegue a leer findAllByIdProfesorByDondeDaClases con filtro");
  //Obtener id busqueda req.param.tagid
  console.log(req.params.idProfesor);
  var idBusqueda = req.params.idProfesor;
  console.log(idBusqueda);
  var sql = 'SELECT u.nombre_usuario, do.id_dondeClases, do.des_dondeClases'  
              +' FROM usuario u' 
              +' Inner join dondedaclasesporprofesor dp on dp.idProfesor = u.idUsuario '
              +' Inner join dondedaclases do on do.id_dondeClases = dp.idDondeDaClases_Fk' 
              +' WHERE idUsuario = ? and profesor = 1';
  console.log(sql);
  dbConn.query(sql,[idBusqueda], (err,rows) => {
      if(err) throw err;      
      console.log('El usuario by id: ' + idBusqueda);
      console.log(rows);
      res.send(rows);
    });
};  

let findByIdProfesorByMaterias= (req, res) =>
{      
    console.log("llegue a leer findByIdProfesorByMaterias con filtro");
    //Obtener id busqueda req.param.tagid
    console.log(req.params.idProfesor);
    var idBusqueda = req.params.idProfesor;
    console.log(idBusqueda);
    var sql = 'SELECT u.nombre_usuario,m.id_materia,  m.nombre as nombre_materia'  
                +' FROM usuario u' 
                +' Inner join materiaporprofesor mp on mp.idProfesor = u.idUsuario' 
                +' Inner join materia m on m.id_materia = mp.idMateria_FK' 
                +' WHERE idUsuario = ? and profesor = 1';
    console.log(sql);
    dbConn.query(sql,[idBusqueda], (err,rows) => {
        if(err) throw err;      
        console.log('El usuario by id: ' + idBusqueda);
        console.log(rows);
        res.send(rows);
      });

};  

let findByIdProfesorByClases= (req, res) =>
{      
    console.log("llegue a leer findByIdProfesorByClases con filtro");
    //Obtener id busqueda req.param.tagid
    console.log(req.params.idProfesor);
    var idBusqueda = req.params.idProfesor;
    console.log(idBusqueda);
    var sql = 'SELECT u.nombre_usuario,tp.id_tipoClases, tp.des_tipoClases'  
                +' FROM usuario u' 
                +' Inner join profesorporclase cp on cp.idProfesor = u.idUsuario' 
                +' Inner join tipoclase tp on tp.id_tipoClases = cp.idClase_FK' 
                +' WHERE idUsuario = ? and profesor = 1';
    console.log(sql);
    dbConn.query(sql,[idBusqueda], (err,rows) => {
        if(err) throw err;      
        console.log('El usuario by id: ' + idBusqueda);
        console.log(rows);
        res.send(rows);
      });

};  

let findByIdProfesor= (req, res) =>
{      
    console.log("llegue a leer findByIdProfesor con filtro");
    //Obtener id busqueda req.param.tagid
    console.log(req.params.id);
    var idBusqueda = req.params.id;
    console.log(idBusqueda);
    var sql = 'SELECT u.nombre_usuario, u.instagram, u.whatsApp, u.telefono, u.mail, d.calle, d.numero, d.localidad, d.latitud, d.longitud, m.nombre as nombre_materia, do.des_dondeClases,tp.des_tipoClases'  
                +' FROM usuario u' 
                +' Inner join direccion d on d.idDireccion = u.idDireccion' 
                +' Inner join materiaporprofesor mp on mp.idProfesor = u.idUsuario' 
                +' Inner join materia m on m.id_materia = mp.idMateria_FK' 
                +' Inner join dondedaclasesporprofesor dp on dp.idProfesor = u.idUsuario '
                +' Inner join dondedaclases do on do.id_dondeClases = dp.idDondeDaClases_Fk' 
                +' Inner join profesorporclase cp on cp.idProfesor = u.idUsuario' 
                +' Inner join tipoclase tp on tp.id_tipoClases = cp.idClase_FK' 
                +' WHERE idUsuario = ? and profesor = 1';
    console.log(sql);
    dbConn.query(sql,[idBusqueda], (err,rows) => {
        if(err) throw err;      
        console.log('El usuario by id: ' + idBusqueda);
        console.log(rows);
        res.send(rows);
      });

};  


module.exports = {findAll,findAllById,findByIdProfesor,findAllByIdProfesorByDondeDaClases,
  findByIdProfesorByMaterias,findByIdProfesorByClases};