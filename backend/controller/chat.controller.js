var dbConn = require('../config/db.config');

function getHora(){
  time = new Date
  hours = time.getHours()
  minutes = time.getMinutes()

  if(hours < 10){
    if(minutes < 10){
      return "0" + hours + ':' + "0" + minutes
    }
    else{
      return "0" + hours + ':' + minutes
    }
  }
  else{
    if(minutes < 10){
      return hours + ':' + "0" + minutes
    }
    else{
      return hours + ':' + minutes
    }
  }
}

let findChatByIdOrigen = (req, res) => {
  console.log("llegue a leer Buscar chat por name", req.params.idUsuario);
  var idBusqueda = req.params.idUsuario;
  console.log(idBusqueda);
  var sql = ' Select u.nombre_usuario,u.apellido,u.esProfesor,u.id_usuario,cc.id_chat,cc.ultimoMensaje,cc.horaUltimoMensaje, cc.id_usuarioUltimoMensaje   '
    + ' From chatUsuario cuc'
    + ' LEFT join usuario u on u.id_usuario = cuc.id_usuario_fk'
    + ' LEFT JOIN chats cc on cc.id_chat = cuc.id_chat_fk'
    + ' Where cuc.id_usuario_fk <> ? and  cuc.id_chat_fk in '
    + ' (select cu.id_chat_fk from chatUsuario cu LEFT JOIN chats c on c.id_chat = cu.id_chat_fk where cu.id_usuario_fk = ? GROUP by cu.id_chatUsuario,cu.id_chat_fk, cu.id_usuario_fk) '
    + ' GROUP BY u.nombre_usuario,u.apellido,u.esProfesor,u.id_usuario,cc.ultimoMensaje,cc.horaUltimoMensaje';
  dbConn.query(sql, [idBusqueda, idBusqueda], (err, rows) => {
    if (err) throw err;
    console.log('El foro by id: ' + idBusqueda);
    console.log(rows);
    res.send(rows);
  });
};

let existeChat = (req, res) => {
  console.log("llegue a leer Buscar chat por id de usuario: ", req.query.idUsuarioOrigen);
  var idUsuarioOrigen = req.query.idUsuarioOrigen;
  var idUsuarioDestino = req.query.idUsuarioDestino;
  var sql = "SELECT c.id_chat_fk as id_chat FROM chatUsuario c JOIN (SELECT c.id_chat_fk FROM chatUsuario c where c.id_usuario_fk = ?)z " +
    "ON c.id_chat_fk = z.id_chat_fk WHERE c.id_usuario_fk = ?"
  dbConn.query(sql, [idUsuarioOrigen, idUsuarioDestino], (err, rows) => {
    if (err) throw err;
    console.log(rows);
    res.send(rows);
  });
};

let crearChat = (req, res) => {
  console.log("idUsuarioOrigen: ", req.body.idUsuarioOrigen);
  console.log("idUsuarioDestino: ", req.body.idUsuarioDestino);
  var sql = 'INSERT INTO `chats`(`ultimoMensaje`, `horaUltimoMensaje`, `id_usuarioUltimoMensaje`) ' +
    'VALUES (?,?,?)'
  dbConn.query(sql, ["", "", req.body.idUsuarioOrigen], (err, rows) => {
    if (err) throw err;
    id_chat = rows.insertId

    var sqlChatOrigen = 'INSERT INTO `chatUsuario`(`id_chat_fk`, `id_usuario_fk`) ' +
      'VALUES (?,?)'
    var sqlChatDestino = 'INSERT INTO `chatUsuario`(`id_chat_fk`, `id_usuario_fk`) ' +
      'VALUES (?,?)'
    dbConn.query(sqlChatOrigen, [id_chat, req.body.idUsuarioOrigen], (err, rows) => {
      if (err) throw err;
      console.log("Creadp chatUsuario con idUsuarioOrigen: ", rows.insertId);
    });
    dbConn.query(sqlChatDestino, [id_chat, req.body.idUsuarioDestino], (err, rows) => {
      if (err) throw err;
      console.log("Creadp chatUsuario con idUsuarioDestino: ", rows.insertId);
    });
    res.send(rows);
  });
};

let updateUltimoMensaje = (req, res) => {
  console.log("idUsuarioOrigen: ", req.body.idUsuarioOrigen);
  console.log("idChat: ", req.body.idChat);
  console.log("mensaje: ", req.body.mensaje);
  var idUsuarioOrigen = req.body.idUsuarioOrigen;
  var idChat = req.body.idChat;
  var mensaje = req.body.mensaje;

  var sql = "UPDATE `chats` SET `ultimoMensaje`= ?,`horaUltimoMensaje`= ?,`id_usuarioUltimoMensaje`= ? WHERE `id_chat`= ? "
  dbConn.query(sql, [mensaje, getHora(), idUsuarioOrigen, idChat], (err, rows) => {
    if (err) throw err;
    console.log(rows);
    res.send(rows);
  });
};

module.exports = { existeChat, findChatByIdOrigen, crearChat, updateUltimoMensaje };