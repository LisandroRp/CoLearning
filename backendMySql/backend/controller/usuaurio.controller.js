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
    var sql = 'SELECT u.id_usuario,u.nombre_usuario,u.apellido,u.src, u.esProfesor, u.instagram, u.whatsApp, u.telefono, u.email, d.des_domicilio,d.latitud,d.longitud, m.id_moneda, m.des_moneda,um.monto,rf.id_respuestaForo, rf.res_buenas,rf.res_mejores,rf.res_cantidad,r.votos,r.rating'
    + ' FROM usuario u' 
    +' left join domicilio d on d.id_domicilio = u.id_domicilio_fk' 
    +' left join usuariopormoneda um on um.id_usuario_fk = u.id_usuario'
    +' left join moneda m on m.id_moneda = um.id_moneda_fk'
    +' left join rating r on r.id_rating = u.id_rating_fk' 
    +' left join respuestaforo rf on rf.id_usuario_fk = u.id_usuario' 
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
    var sql = 'SELECT u.id_usuario,u.nombre_usuario,u.apellido,u.scr, d.des_domicilio, m.id_materia, m.nombre_materia, do.id_dondeClases, do.des_dondeClases,mo.id_moneda, mo.des_moneda,um.monto,r.votos,r.rating'  
                +' FROM usuario u' 
                +' left join domicilio d on d.id_domicilio = u.id_domicilio_fk' 
                +' left join materiaporprofesor mp on mp.id_usuario_fk = u.id_usuario' 
                +' left join materia m on m.id_materia = mp.id_materia_fk' 
                +' left join dondedaclasesporprofesor dp on dp.id_usuario_fk = u.id_usuario '
                +' left join dondedaclases do on do.id_dondeClases = dp.id_dondeDaClases_fk' 
                +' left join usuariopormoneda um on um.id_usuario_fk = u.id_usuario'
                +' left join moneda mo on mo.id_moneda = um.id_moneda_fk'
                +' left join rating r on r.id_rating = u.id_rating_fk'
                +' WHERE u.id_usuario = ? and u.esProfesor = 1'
                +' Order by 1,6,8 desc';
    console.log(sql);
    dbConn.query(sql,[idBusqueda], (err,rows) => {
        if(err) throw err;      
        console.log('El usuario by id: ' + idBusqueda);
        console.log(rows);
        res.send(rows);
      });

};

let findAllProfesores= (req, res) =>
{      
    console.log("llegue a leer findByIdProfesor con filtro");
    //Obtener id busqueda req.param.tagid
    console.log(req.params.id);
    var idBusqueda = req.params.id;
    console.log(idBusqueda);
    var sql = 'SELECT u.id_usuario,u.nombre_usuario,u.apellido,u.src, d.des_domicilio, m.id_materia, m.nombre_materia, do.id_dondeClases, do.des_dondeClases,mo.id_moneda, mo.des_moneda,um.monto,r.votos,r.rating'  
                +' FROM usuario u' 
                +' left join domicilio d on d.id_domicilio = u.id_domicilio_fk' 
                +' left join materiaporprofesor mp on mp.id_usuario_fk = u.id_usuario' 
                +' left join materia m on m.id_materia = mp.id_materia_fk' 
                +' left join dondedaclasesporprofesor dp on dp.id_usuario_fk = u.id_usuario '
                +' left join dondedaclases do on do.id_dondeClases = dp.id_dondeDaClases_fk' 
                +' left join usuariopormoneda um on um.id_usuario_fk = u.id_usuario'
                +' left join moneda mo on mo.id_moneda = um.id_moneda_fk'
                +' left join rating r on r.id_rating = u.id_rating_fk'
                +' WHERE u.esProfesor = 1'
                +' Order by 1,6,8 desc';
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
  var sql = 'SELECT hp.dia, hp.turno'  
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

let findByIdUsuarioByComentarios = (req, res) =>
{      
  console.log("llegue a leer findByIdUsuarioByComentarios con filtro");
  //Obtener id busqueda req.param.tagid
  console.log(req.params.id);
  var idBusqueda = req.params.id;
  console.log(idBusqueda);
  var sql =    'SELECT u.nombre_usuario,u.apellido,u.src, u.esProfesor, c.*'  
              + ' FROM usuario u'  
              + ' Inner join comentarios c on c.id_usuarioOrigen = u.id_usuario' 
              + ' WHERE c.id_usuarioDestino = ? ';
  console.log(sql);
  dbConn.query(sql,[idBusqueda], (err,rows) => {
      if(err) throw err;      
      console.log('El usuario by id: ' + idBusqueda);
      console.log(rows);
      res.send(rows);
    });
}; 

let findProfesorMateriaDomicilioRating = (req, res) =>
{      
  console.log("llegue a leer Buscar varios valores a busacar",req.query);
  var values = [];
  var tieneProfesor = (req.query.nameProfesor !='undefined' && req.query.nameProfesor != '' && req.query.nameProfesor);
  var tieneDomicilio = (req.query.domicilio !='undefined' && req.query.domicilio != '' && req.query.domicilio);
  var tieneMateria = (req.query.nameMateria !='undefined' && req.query.nameMateria != '' && req.query.nameMateria);
  var tieneRating = (req.query.valueRating !='undefined' && req.query.valueRating != '' && req.query.valueRating);
  var cruzarDomicilio = ((tieneDomicilio)?' Inner':' left') ;
  var cruzarMateria = ((tieneMateria)?' Inner':' left') ;
  var cruzarRating = ((tieneRating)?' Inner':' left') ;

  var sql = 'SELECT  u.id_usuario,u.nombre_usuario,u.apellido, u.esProfesor, u.src, d.des_domicilio,d.latitud,d.longitud, m.des_moneda,um.monto,r.votos,r.rating' 
            +' FROM usuario u'
            +  cruzarDomicilio +' join domicilio d on d.id_domicilio = u.id_domicilio_fk' 
            +' left join usuariopormoneda um on um.id_usuario_fk = u.id_usuario'
            +' left join moneda m on m.id_moneda = um.id_moneda_fk'
            + cruzarRating + ' join rating r on r.id_rating = u.id_rating_fk'
            +' left join materiaporprofesor mp on mp.id_usuario_fk = u.id_usuario' 
            + cruzarMateria +' join materia ma on ma.id_materia = mp.id_materia_fk'   
            +' WHERE u.esProfesor = 1  ';
  var habroParentesis = false;
  if(tieneRating){
    console.log("Buscos por nombre value: ", req.query.valueRating);
    sql = sql.concat(' and ').concat('r.rating >= ?');
    values.push(req.query.valueRating);
  }
  if(tieneProfesor){
    console.log("Buscos por nombre profesor: ", req.query.nameProfesor);
    if(!habroParentesis){
      sql = sql.concat(' and ( ');
      habroParentesis = true;
    }
     sql = sql.concat(' u.nombre_usuario like ? or u.nombre_usuario like ? '); 
    values.push('%'.concat(req.query.nameProfesor).concat('%'));
    values.push('%'.concat(req.query.nameProfesor.trim()).concat('%'));
  }
  if(tieneDomicilio){
    console.log("Buscos por nombre domicilio: ", req.query.domicilio);
    if(!habroParentesis){
      sql = sql.concat(' and ( ')
      habroParentesis = true;
    }else{
      sql = sql.concat(' or ');
    } 
    sql = sql.concat('d.des_domicilio like ? or d.des_domicilio like ?');
    values.push('%'.concat(req.query.domicilio).concat('%'));
    values.push('%'.concat(req.query.domicilio.trim()).concat('%'));
  }
  if(tieneMateria){
    console.log("Buscos por nombre materia: ", req.query.nameMateria);
    if(!habroParentesis){
      sql = sql.concat(' and ( ');
      habroParentesis = true;
    }else{
      sql = sql.concat(' or ');
    } 
    sql = sql.concat('ma.nombre_materia like ? or ma.nombre_materia like ?');
    values.push('%'.concat(req.query.nameMateria).concat('%'));
    values.push('%'.concat(req.query.nameMateria.trim()).concat('%'));
  }
  if(habroParentesis)
    sql = sql.concat(' ) ');
  console.log("Consulta a realizar: ",sql);
  console.log("Consulta a realizar: ",values);
  dbConn.query(sql,values, (err,rows) => {
      if(err) throw err;      
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
  findByIdProfesorByMaterias,findByIdProfesorByClases,createUser,findAllByMail,
  findAllByIdProfesorByHorarios,findByIdUsuarioByComentarios,findProfesorMateriaDomicilioRating,findAllProfesores};