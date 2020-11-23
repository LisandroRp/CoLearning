var dbConn = require('../config/db.config');

let findChatByIdOrigen = (req, res) =>
{      
    console.log("llegue a leer Buscar chat por name",req.params.idUsuario);
    var idBusqueda = req.params.idUsuario;
    console.log(idBusqueda);
    var sql = ' Select u.nombre_usuario,u.apellido,u.esProfesor,u.id_usuario,cc.id_chat,cc.ultimoMensaje,cc.horaUltimoMensaje    '
    + ' From chatUsuario cuc' 
    + ' LEFT join usuario u on u.id_usuario = cuc.id_usuario_fk'   
    + ' LEFT JOIN chats cc on cc.id_chat = cuc.id_chat_fk' 
    + ' Where cuc.id_usuario_fk <> ? and  cuc.id_chat_fk in '
    + ' (select cu.id_chat_fk from chatUsuario cu LEFT JOIN chats c on c.id_chat = cu.id_chat_fk where cu.id_usuario_fk = ? GROUP by cu.id_chatUsuario,cu.id_chat_fk, cu.id_usuario_fk) '
    + ' GROUP BY u.nombre_usuario,u.apellido,u.esProfesor,u.id_usuario,cc.ultimoMensaje,cc.horaUltimoMensaje';
    dbConn.query(sql,[idBusqueda,idBusqueda], (err,rows) => {
        if(err) throw err;      
        console.log('El foro by id: ' + idBusqueda);
        console.log(rows);
        res.send(rows);
      });
};

let existeChat = (req, res) =>
{      
    console.log("llegue a leer Buscar chat por id de usuario: ",req.query.idUsuarioOrigen);
    var idUsuarioOrigen = req.query.idUsuarioOrigen;
    var idUsuarioDestino = req.query.idUsuarioDestino;
    console.log(idUsuarioOrigen);
    console.log(idUsuarioDestino)
    var sql = "SELECT c.id_chat_fk as id_chat FROM chatUsuario c JOIN (SELECT c.id_chat_fk FROM chatUsuario c where c.id_usuario_fk = ?)z " +
    "ON c.id_chat_fk = z.id_chat_fk WHERE c.id_usuario_fk = ?"
    dbConn.query(sql,[idUsuarioOrigen, idUsuarioDestino], (err,rows) => {
        if(err) throw err;      
        console.log(rows);
        res.send(rows);
      });
};

module.exports ={existeChat, findChatByIdOrigen};