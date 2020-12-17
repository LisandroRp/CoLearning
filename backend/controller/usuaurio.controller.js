var dbConn = require('../config/db.config');
var mysql = require('mysql');

function getDate(){
  date = new Date
  return (date.getDate().toString() + "/" + date.getMonth().toString() + "/" + date.getFullYear().toString())
}

let findAll = (req, res) => {
  console.log("llegue todos los usuarios");
  dbConn.query('SELECT * FROM usuario', (err, rows) => {
    if (err) throw err;
    console.log('Todos los usuarios:');
    console.log(rows);
    res.send(rows);
  });

};

let findAllById = (req, res) => {
  console.log("llegue a leer Buscar usuario por id", req.params.id);
  var idBusqueda = req.params.id;
  console.log(idBusqueda);
  var sql = 'SELECT u.id_usuario,u.nombre_usuario,u.apellido,u.src, u.esProfesor, u.instagram, u.whatsApp, u.telefono, u.email, d.id_domicilio, d.des_domicilio,d.latitude,d.longitude, m.id_moneda, m.des_moneda, m.codigo,um.monto,rf.id_usuarioRespuestas, rf.res_buenas,rf.res_mejores,rf.res_cantidad,r.votos,r.rating'
    + ' FROM usuario u'
    + ' left join domicilio d on d.id_domicilio = u.id_domicilio_fk'
    + ' left join usuariopormoneda um on um.id_usuario_fk = u.id_usuario'
    + ' left join moneda m on m.id_moneda = um.id_moneda_fk'
    + ' left join rating r on r.id_rating = u.id_rating_fk'
    + ' left join usuarioRespuestas rf on rf.id_usuario_fk = u.id_usuario'
    + ' WHERE id_usuario=?';
  dbConn.query(sql, [idBusqueda], (err, rows) => {
    if (err) throw err;
    console.log('El usuario by id: ' + idBusqueda);
    console.log(rows);
    res.send(rows);
  });

};

let findAllByMail = (req, res) => {
  console.log("llegue a leer Buscar usuario por mail" + req.query.email);
  var idBusqueda = req.query.email;
  console.log(idBusqueda);
  var sql = 'SELECT id_usuario,password,esProfesor,nombre_usuario,src,instagram,whatsApp,telefono,email,id_domicilio_fk,id_tipoPerfil_fk,id_rating_fk FROM usuario WHERE email=?';
  dbConn.query(sql, [idBusqueda], (err, rows) => {
    if (err) throw err;
    console.log('El usuario by mail: ' + idBusqueda);
    console.log(rows);
    res.send(rows);
  });

};

let findAllByIdProfesorByDondeDaClases = (req, res) => {
  console.log("llegue a leer findAllByIdProfesorByDondeDaClases con filtro");
  //Obtener id busqueda req.param.tagid
  console.log(req.params.idProfesor);
  var idBusqueda = req.params.idProfesor;
  console.log(idBusqueda);
  var sql = 'SELECT u.nombre_usuario, do.id_dondeClases, do.des_dondeClases'
    + ' FROM usuario u'
    + ' Inner join dondedaclasesporprofesor dp on dp.id_usuario_fk = u.id_usuario '
    + ' Inner join dondedaclases do on do.id_dondeClases = dp.id_dondeDaClases_fk'
    + ' WHERE id_usuario = ? and esProfesor = 1';
  console.log(sql);
  dbConn.query(sql, [idBusqueda], (err, rows) => {
    if (err) throw err;
    console.log('El usuario by id: ' + idBusqueda);
    console.log(rows);
    res.send(rows);
  });
};

let findByIdProfesorByMaterias = (req, res) => {
  console.log("llegue a leer findByIdProfesorByMaterias con filtro");
  //Obtener id busqueda req.param.tagid
  console.log(req.params.idProfesor);
  var idBusqueda = req.params.idProfesor;
  console.log(idBusqueda);
  var sql = 'SELECT u.nombre_usuario, m.id_materia,  m.nombre_materia,mp.des_materia  '
    + ' FROM usuario u'
    + ' Inner join materiaporprofesor mp on mp.id_usuario_fk = u.id_usuario'
    + ' Inner join materia m on m.id_materia = mp.id_materia_fk'
    + ' WHERE id_usuario = ? and esProfesor = 1';
  console.log(sql);
  dbConn.query(sql, [idBusqueda], (err, rows) => {
    if (err) throw err;
    console.log('El usuario by id: ' + idBusqueda);
    console.log(rows);
    res.send(rows);
  });

};

let findByIdProfesorByClases = (req, res) => {
  console.log("llegue a leer findByIdProfesorByClases con filtro");
  //Obtener id busqueda req.param.tagid
  console.log(req.params.idProfesor);
  var idBusqueda = req.params.idProfesor;
  console.log(idBusqueda);
  var sql = 'SELECT u.nombre_usuario,tp.id_tipoClases, tp.des_tipoClases'
    + ' FROM usuario u'
    + ' Inner join tipoClasesProfesor cp on cp.id_usuario_fk = u.id_usuario'
    + ' Inner join tipoClases tp on tp.id_tipoClases = cp.id_clase_fk'
    + ' WHERE id_usuario = ? and esProfesor = 1';
  console.log(sql);
  dbConn.query(sql, [idBusqueda], (err, rows) => {
    if (err) throw err;
    console.log('El usuario by id: ' + idBusqueda);
    console.log(rows);
    res.send(rows);
  });

};

let findByIdProfesor = (req, res) => {
  console.log("llegue a leer findByIdProfesor con filtro");
  //Obtener id busqueda req.param.tagid
  console.log(req.params.id);
  var idBusqueda = req.params.id;
  console.log(idBusqueda);
  var sql = 'SELECT u.id_usuario,u.nombre_usuario,u.apellido,u.src, d.des_domicilio, m.id_materia, m.nombre_materia, do.id_dondeClases, do.des_dondeClases,mo.id_moneda, mo.des_moneda,um.monto,r.votos,r.rating'
    + ' FROM usuario u'
    + ' left join domicilio d on d.id_domicilio = u.id_domicilio_fk'
    + ' left join materiaporprofesor mp on mp.id_usuario_fk = u.id_usuario'
    + ' left join materia m on m.id_materia = mp.id_materia_fk'
    + ' left join dondedaclasesporprofesor dp on dp.id_usuario_fk = u.id_usuario '
    + ' left join dondedaclases do on do.id_dondeClases = dp.id_dondeDaClases_fk'
    + ' left join usuariopormoneda um on um.id_usuario_fk = u.id_usuario'
    + ' left join moneda mo on mo.id_moneda = um.id_moneda_fk'
    + ' left join rating r on r.id_rating = u.id_rating_fk'
    + ' WHERE u.esProfesor = 1'
    + ' Order by 1,6,8 desc';
  console.log(sql);
  dbConn.query(sql, [idBusqueda], (err, rows) => {
    if (err) throw err;
    console.log('El usuario by id: ' + idBusqueda);
    console.log(rows);
    res.send(rows);
  });

};

let findAllProfesores = (req, res) => {
  console.log("llegue a leer findByIdProfesor con filtro");
  //Obtener id busqueda req.param.tagid
  console.log(req.params.id);
  var idBusqueda = req.params.id;
  console.log(idBusqueda);
  var sql = 'SELECT u.id_usuario,u.nombre_usuario,u.apellido,u.src, d.des_domicilio, m.id_materia, m.nombre_materia, do.id_dondeClases, do.des_dondeClases,mo.id_moneda, mo.des_moneda,um.monto,r.votos,r.rating'
    + ' FROM usuario u'
    + ' left join domicilio d on d.id_domicilio = u.id_domicilio_fk'
    + ' left join materiaporprofesor mp on mp.id_usuario_fk = u.id_usuario'
    + ' left join materia m on m.id_materia = mp.id_materia_fk'
    + ' left join dondedaclasesporprofesor dp on dp.id_usuario_fk = u.id_usuario '
    + ' left join dondedaclases do on do.id_dondeClases = dp.id_dondeDaClases_fk'
    + ' left join usuariopormoneda um on um.id_usuario_fk = u.id_usuario'
    + ' left join moneda mo on mo.id_moneda = um.id_moneda_fk'
    + ' left join rating r on r.id_rating = u.id_rating_fk'
    + ' WHERE u.esProfesor = 1 AND r.rating >= 3'
    + ' Order by 1,6,8 desc';
  console.log(sql);
  dbConn.query(sql, [idBusqueda], (err, rows) => {
    if (err) throw err;
    console.log('El usuario by id: ' + idBusqueda);
    console.log(rows);
    res.send(rows);
  });

};

let findAllByIdProfesorByHorarios = (req, res) => {
  console.log("llegue a leer findAllByIdProfesorByHorarios con filtro");
  //Obtener id busqueda req.param.tagid
  console.log(req.params.idProfesor);
  var idBusqueda = req.params.idProfesor;
  console.log(idBusqueda);
  var sql = 'SELECT hp.dia, hp.turno'
    + ' FROM usuario u'
    + ' Inner join usuarioHorarios hp on hp.id_usuario_fk = u.id_usuario '
    + ' WHERE u.id_usuario = ? and u.esProfesor = 1';
  console.log(sql);
  dbConn.query(sql, [idBusqueda], (err, rows) => {
    if (err) throw err;
    console.log('El usuario by id: ' + idBusqueda);
    console.log(rows);
    res.send(rows);
  });
};

let findByIdUsuarioByComentarios = (req, res) => {
  console.log("llegue a leer findByIdUsuarioByComentarios con filtro");
  //Obtener id busqueda req.param.tagid
  console.log(req.params.id);
  var idBusqueda = req.params.id;
  console.log(idBusqueda);
  var sql = 'SELECT u.nombre_usuario,u.apellido, u.esProfesor, c.*, u.src'
    + ' FROM usuario u'
    + ' Inner join comentarios c on c.id_usuarioOrigen = u.id_usuario'
    + ' WHERE c.id_usuarioDestino = ? ';
  console.log(sql);
  dbConn.query(sql, [idBusqueda], (err, rows) => {
    if (err) throw err;
    console.log('El usuario by id: ' + idBusqueda);
    console.log(rows);
    res.send(rows);
  });
};

let getComentariosByIdUsuario = (req, res) => {
  console.log("Filtrar comentarios con el id_usuarioOrigen: " + req.params.idUsuarioOrigen);
  console.log("id_usuarioDestino: " + req.params.idUsuarioDestino);
  var sql = 'SELECT u.nombre_usuario,u.apellido, u.esProfesor, c.*, u.src'
    + ' FROM usuario u'
    + ' Inner join comentarios c on c.id_usuarioOrigen = u.id_usuario'
    + ' WHERE c.id_usuarioOrigen = ? AND c.id_usuarioDestino = ? ';
  dbConn.query(sql, [req.params.idUsuarioOrigen, req.params.idUsuarioDestino], (err, rows) => {
    if (err) throw err;
    console.log(rows);
    res.send(rows);
  });
};
let postNuevoComentario = (req, res) => {
  console.log("Insertar nuevo comentario con el id_usuarioOrigen: " + req.body.idUsuarioOrigen);
  console.log("id_usuarioDestino: " + req.body.idUsuarioDestino);
  console.log("Insertar nuevo comentario con el id_usuarioOrigen: " + req.body.idUsuarioOrigen);

  var sql = 'INSERT INTO `comentarios`(`des_comentario`, `id_usuarioDestino`, `id_usuarioOrigen`, `rating_comentario`, `fecha_alta`)'
   + 'VALUES (?, ?, ?, ?, ?)'
  dbConn.query(sql,[req.body.comentario, req.body.idUsuarioDestino, req.body.idUsuarioOrigen, req.body.rating, getDate()], (err,rows) => {
      if(err) throw err;      
      console.log(rows);
      res.send(rows);
    });
};

let getPromedioByIdProfesor = (req, res) => {
  console.log("Get Promedio profesor con id: " + req.params.idUsuario);

  var sql = 'SELECT AVG(c.rating_comentario) as rating, r.votos, r.id_rating FROM comentarios c '
  + 'JOIN usuario u ON c.id_usuarioDestino = u.id_usuario '
  + 'JOIN rating r ON r.id_rating = u.id_rating_fk '
  + 'WHERE c.id_usuarioDestino = ?'
  dbConn.query(sql,[req.params.idUsuario], (err,rows) => {
      if(err) throw err;      
      console.log(rows);
      res.send(rows);
    });
};

let updateNuevoRating = (req, res) => {
  console.log("Update nuevo rating con el id_usuario: " + req.body.idRating);

  var sql = 'UPDATE rating SET votos = ?, rating = ? WHERE  id_rating = ?'
  dbConn.query(sql,[(req.body.votos + 1), req.body.rating.toFixed(1), req.body.idRating], (err,rows) => {
      if(err) throw err;      
      console.log(rows);
      res.send(rows);
    });
};

let findProfesorMateriaDomicilioRating = (req, res) => {
  console.log("llegue a leer Buscar varios valores a busacar", req.query);
  var values = [];
  var tieneProfesor = (req.query.nameProfesor != 'undefined' && req.query.nameProfesor != '' && req.query.nameProfesor);
  var tieneDomicilio = (req.query.domicilio != 'undefined' && req.query.domicilio != '' && req.query.domicilio);
  var tieneMateria = (req.query.nameMateria != 'undefined' && req.query.nameMateria != '' && req.query.nameMateria);
  var tieneRating = (req.query.valueRating != 'undefined' && req.query.valueRating != '' && req.query.valueRating);
  var cruzarDomicilio = ((tieneDomicilio) ? ' Inner' : ' left');
  var cruzarMateria = ((tieneMateria) ? ' Inner' : ' left');
  var cruzarRating = ((tieneRating) ? ' Inner' : ' left');

  var sql = 'SELECT  u.id_usuario,u.nombre_usuario,u.apellido, u.esProfesor, u.src, d.des_domicilio,d.latitude,d.longitude, m.des_moneda,um.monto,r.votos,r.rating, ma.nombre_materia'
    + ' FROM usuario u'
    + cruzarDomicilio + ' join domicilio d on d.id_domicilio = u.id_domicilio_fk'
    + ' left join usuariopormoneda um on um.id_usuario_fk = u.id_usuario'
    + ' left join moneda m on m.id_moneda = um.id_moneda_fk'
    + cruzarRating + ' join rating r on r.id_rating = u.id_rating_fk'
    + ' left join materiaporprofesor mp on mp.id_usuario_fk = u.id_usuario'
    + cruzarMateria + ' join materia ma on ma.id_materia = mp.id_materia_fk'
    + ' WHERE u.esProfesor = 1  ';
  var habroParentesis = false;
  if (tieneRating) {
    console.log("Buscos por nombre value: ", req.query.valueRating);
    sql = sql.concat(' and ').concat('r.rating >= ?');
    values.push(req.query.valueRating);
  }
  if (tieneProfesor) {
    console.log("Buscos por nombre profesor: ", req.query.nameProfesor);
    if (!habroParentesis) {
      sql = sql.concat(' and ( ');
      habroParentesis = true;
    }
    sql = sql.concat(' u.nombre_usuario like ? or u.nombre_usuario like ? ');
    values.push('%'.concat(req.query.nameProfesor).concat('%'));
    values.push('%'.concat(req.query.nameProfesor.trim()).concat('%'));
  }
  if (tieneDomicilio) {
    console.log("Buscos por nombre domicilio: ", req.query.domicilio);
    if (!habroParentesis) {
      sql = sql.concat(' and ( ')
      habroParentesis = true;
    } else {
      sql = sql.concat(' or ');
    }
    sql = sql.concat('d.des_domicilio like ? or d.des_domicilio like ?');
    values.push('%'.concat(req.query.domicilio).concat('%'));
    values.push('%'.concat(req.query.domicilio.trim()).concat('%'));
  }
  if (tieneMateria) {
    console.log("Buscos por nombre materia: ", req.query.nameMateria);
    if (!habroParentesis) {
      sql = sql.concat(' and ( ');
      habroParentesis = true;
    } else {
      sql = sql.concat(' or ');
    }
    sql = sql.concat('ma.nombre_materia like ? or ma.nombre_materia like ?');
    values.push('%'.concat(req.query.nameMateria).concat('%'));
    values.push('%'.concat(req.query.nameMateria.trim()).concat('%'));
  }
  if (habroParentesis)
    sql = sql.concat(' ) ');
  console.log("Consulta a realizar: ", sql);
  console.log("Consulta a realizar: ", values);
  dbConn.query(sql, values, (err, rows) => {
    if (err) throw err;
    console.log(rows);
    res.send(rows);
  });
};

let postUser = (req, res) => {

  console.log("Email: ", req.body.email);
  var emailBusqueda = req.body.email;
  var sql = 'INSERT INTO `usuario`(`password`, `nombre_usuario`, `apellido`, email) VALUES (?, ?, ?, ?)'
  dbConn.query(sql,[req.body.password, req.body.nombre, req.body.apellido, req.body.email], (err,rows) => {
      if(err) throw err;      
      console.log(rows);
      res.send(rows);
    });

};

// let createUser = (req, res) => {

//   //Obtener id busqueda req.param.tagid
//   console.log("Usuario: ", req.body.usuario);
//   var id_usuario = req.body.usuario.id_usuario;
//   console.log(id_usuario);
//   var sql = 'SELECT * FROM usuario WHERE id_usuario=?';
//   dbConn.query(sql, [id_usuario], (err, rows) => {
//     if (err) {
//       console.error(err.stack)
//       res.status(409).send({ msg: "Error al creado el usuario: " + err });
//       throw err;
//     }
//     console.log(rows.length);
//     if (rows.length > 0) {
//       res.status(409).send({ msg: "Ya existe el usuario:  " + id_usuario });
//       return res;
//     }
//     else {
//       console.log("Vamos a  crear el Usuario ");
//       var sql = 'INSERT INTO usuario set ?';
//       console.log(sql);
//       dbConn.query(sql, req.body.usuario, (err, rows) => {
//         if (err) {
//           console.error(err.stack)
//           res.status(409).send({ msg: "error al creado el usuario: " + err });
//           throw err;
//         }
//         console.log('Usuario creado');
//         res.status(200).send({ msg: "Profesor creado!!!!." });
//       });
//     }
//   });

// };

let changeUserPassword = (req, res) => {

  console.log("Email: ", req.body.email);
  var emailBusqueda = req.body.email;
  var sql = 'UPDATE `usuario` SET `password`=? where email = ? '
  dbConn.query(sql,[req.body.newPassword, req.body.email], (err,rows) => {
      if(err) throw err;      
      console.log(rows);
      res.send(rows);
    });

};

// let changeUserPassword = (req, res) => {

//   //Obtener id busqueda req.param.tagid
//   console.log("Email: ", req.body.email);
//   var emailBusqueda = req.body.email;
//   var sql = 'SELECT * FROM usuario WHERE email=?';
//   dbConn.query(sql, [emailBusqueda], (err, rows) => {
//     if (err) {
//       console.error(err.stack)
//       res.status(409).send({ msg: "Error al cambiar contraseña: " + err });
//       throw err;
//     }
//     console.log(rows.length);
//     if (rows.length == 0) {
//       res.status(409).send({ msg: "No existe un usuario con el email " + emailBusqueda });
//       return res;
//     }
//     else {
//       console.log(rows[0].password)
//       console.log(req.body.oldPassword)
//       if (rows[0].password != req.body.oldPassword) {
//         res.status(409).send({ msg: "La contraseña antigua es incorrecta" });
//         throw err;
//       }
//       else {
//         console.log("Cambiando contraseña ");
//         var sqlPassword = 'UPDATE `usuario` SET `password`= ? WHERE email = ?';
//         console.log(sqlPassword);
//         dbConn.query(sqlPassword, [req.body.password, req.body.email], (err, rows) => {
//           if (err) {
//             console.error(err.stack)
//             res.status(409).send({ msg: "error al cambiar contraseña: " + err });
//             throw err;
//           }
//           console.log('Se cambio contraseña');
//           res.status(200).send({ msg: "Se cambio contraseña" });
//         });
//       }
//     }
//   });

// };

let updateUsuario = (req, res) => {

  var sql = 'UPDATE usuario SET '
  + 'nombre_usuario = ?, instagram = ?, whatsApp = ?, apellido = ?, telefono = ?, email = ? WHERE id_usuario = ?'
  dbConn.query(sql,[req.body.nombre, req.body.instagram, req.body.whatsApp, req.body.apellido, req.body.telefono, req.body.email, req.body.idUsuario], (err,rows) => {
      if(err) throw err;      
      console.log(rows);
      res.send(rows);
    });

};
let updateDomicilio = (req, res) => {

  var sql = 'UPDATE `domicilio` SET `des_domicilio`= ? WHERE id_domicilio = ?'
  dbConn.query(sql,[req.body.desDomicilio, req.body.idDomicilio], (err,rows) => {
      if(err) throw err;      
      console.log(rows);
      res.send(rows);
    });

};
let updateMoney = (req, res) => {

  var sql = 'UPDATE `usuariopormoneda` SET `id_moneda_fk` = ?,`monto` = ? WHERE id_usuario_fk = ?'
  dbConn.query(sql,[req.body.money.id_moneda, req.body.money.monto, req.body.idUsuario], (err,rows) => {
      if(err) throw err;      
      console.log(rows);
      res.send(rows);
    });

};
let deleteDondeClases = (req, res) => {

  console.log("*******************")
  console.log("Delete Donde Clases")
  console.log("*******************")

  var sql = 'DELETE FROM `dondedaclasesporprofesor` WHERE id_usuario_fk = ?'
  dbConn.query(sql,[req.body.idUsuario], (err,rows) => {
      if(err) throw err;      
      console.log(rows);
      res.send(rows);
    });

};
let deleteTipoClases = (req, res) => {

  console.log("*******************")
  console.log("Delete Tipo Clases")
  console.log("*******************")

  var sql = 'DELETE FROM `tipoClasesProfesor` WHERE id_usuario_fk = ?'
  dbConn.query(sql,[req.body.idUsuario], (err,rows) => {
      if(err) throw err;      
      console.log(rows);
      res.send(rows);
    });

};
let deleteMaterias = (req, res) => {

  console.log("*******************")
  console.log("Delete Materias")
  console.log("*******************")

  var sql = 'DELETE FROM `materiaporprofesor` WHERE id_usuario_fk = ?'
  dbConn.query(sql,[req.body.idUsuario], (err,rows) => {
      if(err) throw err;      
      console.log(rows);
      res.send(rows);
    });
};

let delateUsuarioHorarios = (req, res) => {

  console.log("*******************")
  console.log("Delete UsuarioHorarios")
  console.log("*******************")

  var sql = 'DELETE FROM `usuarioHorarios` WHERE id_usuario_fk = ?'
  dbConn.query(sql,[req.body.idUsuario], (err,rows) => {
      if(err) throw err;      
      console.log(rows);
      res.send(rows);
    });
};

let postDondeClases = (req, res) => {
  
  for(var i = 0; i < req.body.dondeClases.length; i++){
    var sql = 'INSERT INTO `dondedaclasesporprofesor` (`id_dondeDaClases_fk`, `id_usuario_fk`) VALUES (?, ?)'
    dbConn.query(sql,[req.body.dondeClases[i].id_dondeClases, req.body.idUsuario], (err,rows) => {
        if(err) throw err;      
        console.log(rows);
        //res.send(rows);
      });
  }
  res.send();
};
let postTipoClases = (req, res) => {

  for(var i = 0; i < req.body.tipoClases.length; i++){
    var sql = 'INSERT INTO `tipoClasesProfesor` (`id_clase_fk`, `id_usuario_fk`) VALUES (?, ?)'
    dbConn.query(sql,[req.body.tipoClases[i].id_tipoClases, req.body.idUsuario], (err,rows) => {
        if(err) throw err;      
        console.log(rows);
        //res.send(rows);
      });
  }
  res.send();
};
let postMaterias = (req, res) => {

  for(var i = 0; i < req.body.materias.length; i++){
    var sql = 'INSERT INTO `materiaporprofesor`(`id_materia_fk`, `id_usuario_fk`, `des_materia`) VALUES (?, ?, ?)'
    dbConn.query(sql,[req.body.materias[i].id_materia, req.body.idUsuario, req.body.materias[i].des_materia], (err,rows) => {
        if(err) throw err;      
        console.log(rows);
        //res.send(rows);
      });
  }
  res.send();
};
let postUsuarioHorarios = (req, res) => {

  for(var i = 0; i < req.body.horarios.length; i++){
    var sql = 'INSERT INTO `usuarioHorarios`(`id_usuario_fk`, `dia`, `turno`) VALUES (?, ?, ?)'
    dbConn.query(sql,[req.body.idUsuario, req.body.horarios[i].dia, req.body.horarios[i].turno], (err,rows) => {
        if(err) throw err;      
        console.log(rows);
      });
  }
  res.send();
};
let updateUsuarioRespuestasCantidad = (req, res) => {

  var sql = 'UPDATE usuarioRespuestas SET res_cantidad = (res_cantidad + 1) WHERE id_usuario_fk = ?'
  dbConn.query(sql,[req.body.idUsuario], (err,rows) => {
      if(err) throw err;      
      console.log(rows);
      res.send(rows);
    });

};
let updateUsuarioRespuestasBuenas = (req, res) => {

  var sql = 'UPDATE usuarioRespuestas SET res_buenas = (res_buenas + 1) WHERE id_usuario_fk = ?'
  dbConn.query(sql,[req.body.idUsuario], (err,rows) => {
      if(err) throw err;      
      console.log(rows);
      res.send(rows);
    });

};

module.exports = {
  findAll, findAllById, findByIdProfesor, findAllByIdProfesorByDondeDaClases,
  findByIdProfesorByMaterias, findByIdProfesorByClases, findAllByMail,
  findAllByIdProfesorByHorarios, findByIdUsuarioByComentarios, findProfesorMateriaDomicilioRating, findAllProfesores, changeUserPassword, postUser, getComentariosByIdUsuario,
  postNuevoComentario, getPromedioByIdProfesor, updateNuevoRating,
  updateUsuario, updateDomicilio, updateMoney, 
  deleteDondeClases, deleteTipoClases, deleteMaterias,
  postDondeClases, postTipoClases, postMaterias,
  updateUsuarioRespuestasCantidad, updateUsuarioRespuestasBuenas,
  delateUsuarioHorarios, postUsuarioHorarios
};