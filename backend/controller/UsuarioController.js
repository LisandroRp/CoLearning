var clases = require('../model/Clases');
var comentarios = require('../model/Comentario')
var cursoPorAlumnos = require('../model/CursoPorAlumno');
var cursos = require('../model/Cursos');
var cursosPorDondeDaClases = require('../model/CursosPorDondeDaClases');
var cursosPorMaterias = require('../model/CursosPorMaterias');
var cursosPorTipoClases = require('../model/CursosPorTipoClases');
var direcciones = require('../model/Direccion');
var dondeDaClases= require('../model/DondeDaClases');
var dondeDaClasesPorProfesor= require('../model/DondeDaClasesPorProfesor');
var foros = require('../model/Foro');
var foroPorTag= require('../model/ForoPorTag');
var instituoPorProfesores = require('../model/InstituoPorProfesores');
var institutos = require('../model/Instituto');
var materias= require('../model/Materia');
var materiaProfesor = require('../model/MateriaPorProfesor');
var claseProfesor = require('../model/ProfesorPorClase');
var ratings = require('../model/Rating');
var tag= require('../model/Tag');
var tipoClase = require('../model/TipoClase');
var usuarios = require('../model/Usuario');

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



let getUsuarioByMail1 = (req, res) =>
{      
    //Listar resultados
    var respuesta;
    console.log("llegue a leer getUsuarioByMail1 "  + req.query.mail);
    let idBusqueda = {mail: req.query.mail};
    var user;
    usuarios.findOne(idBusqueda)
    .then
    (
        (usuario)=>
        {
            console.log(usuario); 
            if(usuario != null ){
                var respuesta = getUsuario(usuario.nombre_usuario);
                console.log("NO llego:" + respuesta);
                res.status(200).send(respuesta);
            }
               
        },
        (err)=>{console.log(err);}
    )  
   
};

function getUsuario (name) 
{      
    //Listar resultados
    console.log("llegue a leer getUsuario "  + name );
    usuarios.aggregate([
        {$match: { 'nombre_usuario':   name }},
        {$lookup: 
            {
                from: 'direccion',
                localField: 'idDireccion',
                foreignField: 'idDireccion',
                as: 'domicilio'
            }
        } ,
        {$lookup: 
            {
                from: 'materiaProfesor',
                localField: 'idUsuario',
                foreignField: 'idProfesor',
                as: 'materiaProfesores'
            }
        } , {$unwind: {
            path: "$materiaProfesores",
            preserveNullAndEmptyArrays: false
        }}
        ,{$lookup: 
            {
                from: 'materia',
                localField: 'materiaProfesores.idMateria_FK',
                foreignField: 'id_materia',
                as: 'materias'
            }
        },
        {$lookup: 
            {
                from: 'profesorPorClase',
                localField: 'idUsuario',
                foreignField: 'idProfesor',
                as: 'clasesProfesores'
            }
        } , {$unwind: {
            path: "$clasesProfesores",
            preserveNullAndEmptyArrays: false
        }},
        {$lookup: 
            {
                from: 'tipoClase',
                localField: 'clasesProfesores.idClase_FK',
                foreignField: 'id_tipoClases',
                as: 'tipoClases'
            }
        },
        {$lookup: 
            {
                from: 'dondeDaClasesPorProfesor',
                localField: 'idUsuario',
                foreignField: 'idProfesor',
                as: 'dondeDaClasesPorProfesor'
            }
        } , {$unwind: {
            path: "$dondeDaClasesPorProfesor",
            preserveNullAndEmptyArrays: false
        }},
        {$lookup: 
            {
                from: 'dondeDaClases',
                localField: 'dondeDaClasesPorProfesor.idDondeDaClases_Fk',
                foreignField: 'id_dondeClases',
                as: 'dondeClases'
            }
        }
    ]).exec((err, respuesta) => {
        if (err) console.log("Error:"+ err);
        console.log("Respuesta:" + respuesta);
        return  respuesta;   
    })
};

let getUsuarioByNameMail = (req, res) =>
{      
    //Listar resultados
    var respuesta;
    console.log("llegue a leer getUsuarioByNameMail "  + req.params.mail );
    usuarios.aggregate([
        {$match: { 'mail': { $regex:  req.params.mail , $options: 'i'}}},
        {$lookup: 
            {
                from: 'direccion',
                localField: 'idDireccion',
                foreignField: 'idDireccion',
                as: 'domicilio'
            }
        } ,
        {$lookup: 
            {
                from: 'materiaPorProfesor',
                localField: 'idUsuario',
                foreignField: 'idProfesor',
                as: 'materiaProfesores'
            }
        } , {$unwind: {
            path: "$materiaProfesores",
            preserveNullAndEmptyArrays: false
        }}
        ,{$lookup: 
            {
                from: 'materia',
                localField: 'materiaProfesores.idMateria_FK',
                foreignField: 'id_materia',
                as: 'materias'
            }
        },
        {$lookup: 
            {
                from: 'profesorPorClase',
                localField: 'idUsuario',
                foreignField: 'idProfesor',
                as: 'clasesProfesores'
            }
        } , {$unwind: {
            path: "$clasesProfesores",
            preserveNullAndEmptyArrays: false
        }},
        {$lookup: 
            {
                from: 'tipoClase',
                localField: 'clasesProfesores.idClase_FK',
                foreignField: 'id_tipoClases',
                as: 'tipoClases'
            }
        },
        {$lookup: 
            {
                from: 'dondeDaClasesPorProfesor',
                localField: 'idUsuario',
                foreignField: 'idProfesor',
                as: 'dondeDaClasesPorProfesor'
            }
        } , {$unwind: {
            path: "$dondeDaClasesPorProfesor",
            preserveNullAndEmptyArrays: false
        }},
        {$lookup: 
            {
                from: 'dondeDaClases',
                localField: 'dondeDaClasesPorProfesor.idDondeDaClases_Fk',
                foreignField: 'id_dondeClases',
                as: 'dondeClases'
            }
        }
    ]).exec((err, respuesta) => {
        if (err) console.log(err);
        console.log(JSON.stringify(respuesta));
        res.send(respuesta);   
    });
};



let getUsuarioByName = (req, res) =>
{      
    //Listar resultados
    var respuesta;
    console.log("llegue a leer getUsuarioByName + Nombre:"  + req.params.name );
    usuarios.aggregate([
        {$match: { 'nombre_usuario': { $regex:  req.params.name , $options: 'i'}}},
        {$lookup: 
            {
                from: 'direccion',
                localField: 'idDireccion',
                foreignField: 'idDireccion',
                as: 'domicilio'
            }
        } ,
        {$lookup: 
            {
                from: 'materiaPorProfesor',
                localField: 'idUsuario',
                foreignField: 'idProfesor',
                as: 'materiaProfesores'
            }
        } , {$unwind: {
            path: "$materiaProfesores",
            preserveNullAndEmptyArrays: false
        }}
        ,{$lookup: 
            {
                from: 'materia',
                localField: 'materiaProfesores.idMateria_FK',
                foreignField: 'id_materia',
                as: 'materias'
            }
        },
        {$lookup: 
            {
                from: 'profesorPorClase',
                localField: 'idUsuario',
                foreignField: 'idProfesor',
                as: 'clasesProfesores'
            }
        } , {$unwind: {
            path: "$clasesProfesores",
            preserveNullAndEmptyArrays: false
        }},
        {$lookup: 
            {
                from: 'tipoClase',
                localField: 'clasesProfesores.idClase_FK',
                foreignField: 'id_tipoClases',
                as: 'tipoClases'
            }
        },
        {$lookup: 
            {
                from: 'dondeDaClasesPorProfesor',
                localField: 'idUsuario',
                foreignField: 'idProfesor',
                as: 'dondeDaClasesPorProfesor'
            }
        } , {$unwind: {
            path: "$dondeDaClasesPorProfesor",
            preserveNullAndEmptyArrays: false
        }},
        {$lookup: 
            {
                from: 'dondeDaClases',
                localField: 'dondeDaClasesPorProfesor.idDondeDaClases_Fk',
                foreignField: 'id_dondeClases',
                as: 'dondeClases'
            }
        }
    ]).exec((err, respuesta) => {
        if (err) console.log(err);
        console.log(JSON.stringify(respuesta));
        res.send(respuesta);   
    });
};

module.exports = {getUsuarios,getUsuarioById,insertUsuario,updateUsuarioByPassword,
    getUsuarioByIdOne,getUsuarioByMail,getUsuarioByNameMail,getUsuarioByName};