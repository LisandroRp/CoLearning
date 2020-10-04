var dbConn = require('../config/db.config');

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

let findTagsByIdForo = (req, res) =>
{      
    console.log("llegue a leer Buscar foro por id",req.params.id);
    var idBusqueda =  req.params.id;
    console.log(idBusqueda);
    var sql = ' SELECT f.id_foro,f.id_usuario,f.nombre_foro,f.pregunta,f.esProfesor,f.respuestasCant,f.fecha_alta,f.resuelto,t.id_tag,t.nombre_tag'
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
    var idBusqueda =  '%'+req.params.name+ '%';
    console.log(idBusqueda);
    var sql = ' SELECT f.id_foro,f.id_usuario,f.nombre_foro,f.pregunta,f.esProfesor,f.respuestasCant,f.fecha_alta,f.resuelto,t.id_tag,t.nombre_tag'
    + ' FROM foro f' 
    + ' Inner join foroportag ft on ft.id_foro_fk = f.id_foro'
    + ' Inner join tag t on ft.id_tag_fk = t.id_tag' 
    + ' WHERE f.nombre_foro like ?  or t.nombre_tag like  ?';
    dbConn.query(sql,[idBusqueda,idBusqueda], (err,rows) => {
        if(err) throw err;      
        console.log('El foro by id: ' + idBusqueda);
        console.log(rows);
        res.send(rows);
      });
};

module.exports ={findForosByName,findAllByNames,findTagsByIdForo};