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
    console.log("llegue a leer Buscar usuario por id",req.params.id);
    var idBusqueda = req.params.id;
    console.log(idBusqueda);
    var sql = 'SELECT u.id_usuario,u.nombre_usuario,u.apellido, u.esProfesor, u.instagram, u.whatsApp, u.telefono, u.email, d.des_domicilio,m.id_moneda, m.des_moneda,um.monto,rf.id_respuestaForo, rf.res_buenas,rf.res_mejores,rf.res_cantidad'
    + ' FROM usuario u' 
    +' Inner join domicilio d on d.id_domicilio = u.id_domicilio_fk' 
    +' Inner join usuariopormoneda um on um.id_usuario_fk = u.id_usuario'
    +' Inner join moneda m on m.id_moneda = um.id_moneda_fk' 
    +' Inner join respuestaforo rf on rf.id_usuario_fk = u.id_usuario' 
    +' WHERE id_usuario=?';
    dbConn.query(sql,[idBusqueda], (err,rows) => {
        if(err) throw err;      
        console.log('El usuario by id: ' + idBusqueda);
        console.log(rows);
        res.send(rows);
      });

};  

let findAllByMail = (req, res) =>
{      
    console.log("llegue a leer Buscar usuario por mail" + req.query.email);
    var idBusqueda = req.query.email;
    console.log(idBusqueda);
    var sql = 'SELECT id_usuario,password,esProfesor,nombre_usuario,src,instagram,whatsApp,telefono,email,id_domicilio_fk,id_tipoPerfil_fk,id_rating_fk FROM usuario WHERE email=?';
    dbConn.query(sql,[idBusqueda], (err,rows) => {
        if(err) throw err;      
        console.log('El usuario by mail: ' + idBusqueda);
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
              +' Inner join dondedaclasesporprofesor dp on dp.id_usuario_fk = u.id_usuario '
              +' Inner join dondedaclases do on do.id_dondeClases = dp.id_dondeDaClases_fk' 
              +' WHERE id_usuario = ? and esProfesor = 1';
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
    var sql = 'SELECT u.nombre_usuario, m.id_materia,  m.nombre_materia,mp.des_materia  '  
                +' FROM usuario u' 
                +' Inner join materiaporprofesor mp on mp.id_usuario_fk = u.id_usuario' 
                +' Inner join materia m on m.id_materia = mp.id_materia_fk' 
                +' WHERE id_usuario = ? and esProfesor = 1';
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
                +' Inner join profesorporclase cp on cp.id_usuario_fk = u.id_usuario' 
                +' Inner join tipoclase tp on tp.id_tipoClases = cp.id_clase_fk' 
                +' WHERE id_usuario = ? and esProfesor = 1';
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
    var sql = 'SELECT u.nombre_usuario,u.apellido, u.instagram, u.whatsApp, u.telefono, u.email, d.calle, d.numero, d.localidad, d.latitud, d.longitud, m.nombre_materia, do.des_dondeClases,tp.des_tipoClases,id_rating_fk'  
                +' FROM usuario u' 
                +' Inner join domicilio d on d.id_domicilio = u.id_domicilio_fk' 
                +' Inner join materiaporprofesor mp on mp.id_usuario_fk = u.id_usuario' 
                +' Inner join materia m on m.id_materia = mp.id_materia_fk' 
                +' Inner join dondedaclasesporprofesor dp on dp.id_usuario_fk = u.id_usuario '
                +' Inner join dondedaclases do on do.id_dondeClases = dp.id_dondeDaClases_fk' 
                +' Inner join profesorporclase cp on cp.id_usuario_fk = u.id_usuario' 
                +' Inner join tipoclase tp on tp.id_tipoClases = cp.id_clase_fk' 
                +' WHERE id_usuario = ? and esProfesor = 1';
    console.log(sql);
    dbConn.query(sql,[idBusqueda], (err,rows) => {
        if(err) throw err;      
        console.log('El usuario by id: ' + idBusqueda);
        console.log(rows);
        res.send(rows);
      });

};

let findAllByIdProfesorByHorarios = (req, res) =>
{      
  console.log("llegue a leer findAllByIdProfesorByHorarios con filtro");
  //Obtener id busqueda req.param.tagid
  console.log(req.params.idProfesor);
  var idBusqueda = req.params.idProfesor;
  console.log(idBusqueda);
  var sql = 'SELECT hp.dias, hp.turno'  
              +' FROM usuario u' 
              +' Inner join horariosdelprofesor hp on hp.id_usuario_fk = u.id_usuario '
              +' WHERE u.id_usuario = ? and u.esProfesor = 1';
  console.log(sql);
  dbConn.query(sql,[idBusqueda], (err,rows) => {
      if(err) throw err;      
      console.log('El usuario by id: ' + idBusqueda);
      console.log(rows);
      res.send(rows);
    });
}; 

let createUser=(req, res)=>{


  console.log("llegue a leer comentarios con filtro");
  //Obtener id busqueda req.param.tagid
  console.log("Usuario: " , req.body.usuario);
  var idBusqueda = req.body.usuario.id_usuario;
  console.log(idBusqueda);
  var sql = 'SELECT * FROM usuario WHERE id_usuario=?';
  dbConn.query(sql,[idBusqueda], (err,rows) => {
      if(err) {
        console.error(err.stack)
        res.status(409).send({ msg: "Error al creado el usuario: " + err }); 
        throw err; 
      }      
      console.log(rows.length);
      if(rows.length>0){
        res.status(409).send({ msg: "Ya existe el usuario:  " + idBusqueda}); 
        return res;
      }
      else{
        console.log("Vamos a  crrear el Usuario ");
        var sql = 'INSERT INTO usuario set ?';
        console.log(sql);
        dbConn.query(sql,req.body.usuario, (err,rows) => {
            if(err){
              console.error(err.stack)
              res.status(409).send({ msg: "error al creado el usuario: " + err }); 
              throw err;    
            }
            console.log('Usuario creado');
            res.status(200).send({ msg: "Profesor creado!!!!." });
          });
       }  
    });
  
};

module.exports = {findAll,findAllById,findByIdProfesor,findAllByIdProfesorByDondeDaClases,
  findByIdProfesorByMaterias,findByIdProfesorByClases,createUser,findAllByMail,findAllByIdProfesorByHorarios};