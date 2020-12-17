var dbConn = require('../config/db.config');

function getDate(){
  date = new Date
  return (date.getDate().toString() + "/" + date.getMonth().toString() + "/" + date.getFullYear().toString())
}

let findForosByName = (req, res) =>
{      
    console.log("llegue a leer Buscar foro por name",req.params.name);
    var idBusqueda =  '%'+req.params.name+ '%';
    console.log(idBusqueda);
    var sql = 'SELECT * FROM foro WHERE nombre_foro like ?';
    dbConn.query(sql,idBusqueda, (err,rows) => {
        if(err) throw err;      
        console.log('El foro by id: ' + idBusqueda);
        console.log(rows);
        res.send(rows);
      });
};

let findForosByIdAndName = (req, res) =>
{      
    console.log("llegue a leer Buscar foro por id",req.query);
    var sql = 'SELECT u.nombre_usuario,u.apellido, u.esProfesor, f.* FROM foro f inner join usuario u on f.id_usuario_fk = u.id_usuario WHERE ';
    var idBusqueda;
    if(req.query.id !='undefined' && req.query.id != '' && req.query.id){
      idBusqueda  =  req.query.id;
      sql =  sql +'id_foro = ?'; 
    }else if(req.query.name !='undefined' && req.query.name != '' && req.query.name){
      idBusqueda = '%'+req.query.name+ '%';
      sql = sql +'nombre_foro like ?';
    }
    console.log("Parametro de busqueda: ",idBusqueda);
    console.log("Consulta a realizar: ",sql);
    dbConn.query(sql,idBusqueda, (err,rows) => {
        if(err) throw err;      
        console.log('El foro by id: ' + idBusqueda);
        console.log(rows);
        res.send(rows);
      });
};

let findRespuestaByIdForo = (req, res) =>
{      
    console.log("llegue a leer Buscar respuesta por foro por id",req.params.id);
    var idBusqueda =  req.params.id;
    console.log(idBusqueda);
    var sql = ' SELECT u.id_usuario,u.nombre_usuario,u.apellido, u.esProfesor, r.*'
            + ' FROM foro f'
            + ' Inner join respuesta r on r.id_foro_fk = f.id_foro'
            + ' Inner join usuario u on u.id_usuario = r.id_usuario_fk'  
            + ' WHERE f.id_foro = ?';
    dbConn.query(sql,[idBusqueda], (err,rows) => {
        if(err) throw err;      
        console.log('El foro by id: ' + idBusqueda);
        console.log(rows);
        res.send(rows);
      });
};

let findTagsByIdForo = (req, res) =>
{      
    console.log("llegue a leer Buscar foro por id",req.params.id);
    var idBusqueda =  req.params.id;
    console.log(idBusqueda);
    var sql = ' SELECT f.id_foro,f.id_usuario_fk,f.nombre_foro,f.pregunta, f.respuestasCant,f.fecha_alta,f.resuelto,t.id_tag,t.nombre_tag'
            + ' FROM foro f' 
            + ' Inner join foroportag ft on ft.id_foro_fk = f.id_foro'
            + ' Inner join tag t on ft.id_tag_fk = t.id_tag' 
            + ' WHERE f.id_foro = ?';
    dbConn.query(sql,[idBusqueda], (err,rows) => {
        if(err) throw err;      
        console.log('El foro by id: ' + idBusqueda);
        console.log(rows);
        res.send(rows);
      });
};

let findAllByNames = (req, res) =>
{      
    console.log("llegue a leer Buscar foro por name",req.params.name);
    //var idBusqueda =  '%'+req.params.name+ '%';
    var idBusqueda = '%'.concat(req.params.name.concat('%'));
    console.log(idBusqueda);
    var sql = ' SELECT u.nombre_usuario,u.apellido, f.id_foro,f.id_usuario_fk as id_usuario,f.nombre_foro,f.pregunta,u.esProfesor,f.respuestasCant,f.fecha_alta,f.resuelto, f.esAnonimo,t.id_tag,t.nombre_tag'
    + ' FROM foro f' 
    + ' left join foroportag ft on ft.id_foro_fk = f.id_foro'
    + ' left join tag t on ft.id_tag_fk = t.id_tag'
    + ' left join usuario u on f.id_usuario_fk = u.id_usuario'    
    + ' WHERE f.nombre_foro like ?  or t.nombre_tag like  ? or f.pregunta like ?';
    dbConn.query(sql,[idBusqueda,idBusqueda,idBusqueda], (err,rows) => {
        if(err) throw err;      
        console.log('El foro by id: ' + idBusqueda);
        console.log(rows);
        res.send(rows);
      });
};

let findChatByIdOrigen = (req, res) =>
{      
    console.log("llegue a leer Buscar chat por name",req.params.idUsuario);
    var idBusqueda = req.params.idUsuario;
    console.log(idBusqueda);
    var sql = ' Select u.nombre_usuario,u.apellido,u.esProfesor,u.id_usuario,cc.ultimoMensaje,cc.horaUltimoMensaje    '
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

let crearForo = (req, res) =>
{      
    console.log("El usuario que quiere crear un foro es: ",req.body.idUsuario);
    var sql = 'INSERT INTO `foro`(`id_usuario_fk`, `nombre_foro`, `pregunta`, `fecha_alta`, `esAnonimo`, `descripcion`) ' +
    'VALUES (?,?,?,'+ getDate() +',?,?)'
    console.log(sql);  
    dbConn.query(sql,[req.body.idUsuario, req.body.titulo, req.body.pregunta, req.body.esAnonimo, req.body.descripcion], (err,rows) => {
        if(err) throw err;      
        console.log(rows);
        res.send(rows);
      });
};

let crearForoTags = (req, res) =>
{      
    console.log("idForo: ",req.body.idForo);
    console.log("idTag: ",req.body.idTag);
    var sql = 'INSERT INTO `foroportag`(`id_foro_fk`, `id_tag_fk`) ' +
    'VALUES (?,?)'
    dbConn.query(sql,[req.body.idForo, req.body.idTag], (err,rows) => {
        if(err) throw err;      
        console.log(rows);
        res.send(rows);
      });
};

let postUsuarioRespuestas = (req, res) =>
{      
    console.log("idForo: ",req.body.idForo);
    console.log("idUsuario: ",req.body.idUsuario);
    console.log("titulo: ",req.body.titulo);
    console.log("respuesta: ",req.body.respuesta);
    var sql = 'INSERT INTO `respuesta`(`id_foro_fk`, `id_usuario_fk`, `nombre_respuesta`, `des_respuesta`, `fecha_alta`) ' +
    'VALUES (?,?,?,?,?)'
    dbConn.query(sql,[req.body.idForo, req.body.idUsuario, req.body.titulo, req.body.respuesta, getDate()], (err,rows) => {
        if(err) throw err;      
        console.log(rows);
        res.send(rows);
      });
};

module.exports ={findForosByName,findAllByNames,findTagsByIdForo,findRespuestaByIdForo,findForosByIdAndName,findChatByIdOrigen, crearForo, crearForoTags, postUsuarioRespuestas};