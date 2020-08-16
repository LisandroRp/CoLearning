var usuarios = require('../model/Usuario');
var clases = require('../model/Clases');
var cursoPorAlumnos = require('../model/CursoPorAlumno');
var cursos = require('../model/Cursos');
var direcciones = require('../model/Direccion');
var foros = require('../model/Foro');
var ratings = require('../model/Rating');

var bodyParser = require('body-parser');

 
let insertUsuario = (req,res) =>
{
    console.log(req.body);
    var newUsuario = usuarios({
        nombre:req.body.nombre,
        apellido:req.body.apellido,
        email:req.body.email,
        usuarioId:req.body.usuarioId,
        password:req.body.password
    });
    newUsuario.save().
    then
    (
        (newUsuario)=>
        {
            res.send(newUsuario); //devuelvo resultado query 
        },
        (err)=>{console.log(err);}
    ) 
}

let getUsuarios = (req, res) =>
{      
    console.log("llegue a leer");
    //Listar resultados
    usuarios.find()
    .then
    (
        (listaUsuarios)=>
        {
            res.send(listaUsuarios); //devuelvo resultado query   
            //console.log(listaContactos);    
        },
        (err)=>{console.log(err);}
    )       
};

let getUsuarioById = (req, res) =>
{      
    console.log("llegue a leer con filtro");
    //Obtener id busqueda req.param.tagid
    console.log(req.query.idUsuario);
    let idBusqueda = {idUsuario: req.query.idUsuario};
    console.log(idBusqueda);
    //Listar resultados
    usuarios.find(idBusqueda)
    .then
    (
        (listaUsuarios)=>
        {
            console.log(listaUsuarios); 
            res.send(listaUsuarios); //devuelvo resultado query   
               
        },
        (err)=>{console.log(err);}
    )       
};

let getUsuarioByMail = (req, res) =>
{      
    console.log("llegue a leer con filtro");
    //Obtener id busqueda req.param.tagid
    console.log(req.query.mail);
    let idBusqueda = {mail: req.query.mail};
    console.log(idBusqueda);
    //Listar resultados
    usuarios.find(idBusqueda)
    .then
    (
        (listaUsuarios)=>
        {
            console.log(listaUsuarios); 
            res.send(listaUsuarios); //devuelvo resultado query   
               
        },
        (err)=>{console.log(err);}
    )       
};

let getUsuarioByIdOne = (req, res) =>
{      
    console.log("llegue a leer con filtro");
    //Obtener id busqueda req.param.tagid
    console.log(req.query.usuarioId);
    let idBusqueda = {usuarioId: req.query.usuarioId};
    console.log(idBusqueda);
    //Listar resultados
    usuarios.findOne(idBusqueda)
    .then
    (
        (user)=>
        {
            console.log(user); 
            if(user == null)
                res.status(206).send({ msg: "NO existe usuario."});
            else
                res.status(200).send(user); //devuelvo resultado query   
        },
        (err)=>{console.log(err);}
    )       
};

let updateUsuarioByPassword = (req, res) =>
{      
    console.log("Actualizar usuario: ",req.body.usuarioId);
    //Obtener id busqueda req.param.tagid
    var myquery = { usuarioId: req.body.usuarioId};
    console.log("Actualizar key: ",myquery);
    var newvalues = { $set: {password: req.body.password } };
    console.log("Actualizar password: ",newvalues);
    //Listar resultados
    usuarios.updateMany(myquery, newvalues, function(err, res) {
        if (err) console.log(err);
        console.log("Documento actualizado",res.nModified);
      });    
      res.status(206).send({ msg: "Se actualizaron los usuarios." });  
};

module.exports = {getUsuarios,getUsuarioById,insertUsuario,updateUsuarioByPassword,getUsuarioByIdOne,getUsuarioByMail};