var usuarios = require('../model/Usuario');
var clases = require('../model/Clases');
var cursoPorAlumnos = require('../model/CursoPorAlumno');
var cursos = require('../model/Cursos');
var direcciones = require('../model/Direccion');
var foros = require('../model/Foro');
var ratings = require('../model/Rating');
var materiaProfesor = require('../model/MateriaPorProfesor');
var claseProfesor = require('../model/ProfesorPorClase');
var tipoClase = require('../model/TipoClase');
var materias= require('../model/Materia');
var dondeDaClases= require('../model/DondeDaClases');
var comentarios = require('../model/Comentario')
var dondeDaClasesPorProfesor= require('../model/DondeDaClasesPorProfesor');
var dondeDaClasesPorProfesor= require('../model/DondeDaClasesPorProfesor');
var foroPorTag= require('../model/ForoPorTag');
var tag= require('../model/Tag');


var bodyParser = require('body-parser');
const Materia = require('../model/Materia');


let getAllUsuarios = (req, res) =>
{      
    console.log("llegue a leer getUsuarios" + req);
    //Listar resultados
    usuarios.find().then
    (
        (listaUsuarios)=>
        {
            res.send(listaUsuarios);   
            console.log(listaUsuarios);    
        },
        (err)=>{console.log(err);}
    )       
};

let getAllTag = (req, res) =>
{      
    console.log("llegue a leer getAllTag" + req);
    //Listar resultados
    tag.find().then
    (
        (listaTags)=>
        {
            res.send(listaTags);   
            console.log(listaTags);    
        },
        (err)=>{console.log(err);}
    )       
};

let getAllTipoClase = (req, res) =>
{      
    console.log("llegue a leer getUsuarios" + req);
    //Listar resultados
    tipoClase.find().then
    (
        (listaTipoClase)=>
        {
            res.send(listaTipoClase);   
            console.log(listaTipoClase);    
        },
        (err)=>{console.log(err);}
    )       
};

let getAllDondeDaClases = (req, res) =>
{      
    console.log("llegue a leer getUsuarios" + req);
    //Listar resultados
    dondeDaClases.find().then
    (
        (listaDondeDaClases)=>
        {
            res.send(listaDondeDaClases);   
            console.log(listaDondeDaClases);    
        },
        (err)=>{console.log(err);}
    )       
};


let getAllMaterias = (req, res) =>
{      
    console.log("llegue a leer getUsuarios" + req);
    //Listar resultados
    materias.find().then
    (
        (listaMaterias)=>
        {
            console.log(listaMaterias);    
            res.send(listaMaterias);   
        },
        (err)=>{console.log(err);}
    )       
};

let getAllRatings = (req, res) =>
{      
    console.log("llegue a leer getRatings" + req);
    //Listar resultados
    ratings.find().then
    (
        (listaRatings)=>
        {
            res.send(listaRatings);    
            console.log(listaRatings);    
        },
        (err)=>{console.log(err);}
    )       
};

let getAllForos = (req, res) =>
{      
    console.log("llegue a leer getForos" + req);
    //Listar resultados
    foros.find().then
    (
        (listaForos)=>
        {
            res.send(listaForos);  
            console.log(listaForos);    
        },
        (err)=>{console.log(err);}
    )       
};

let getAllDireccion = (req, res) =>
{      
    console.log("llegue a leer getDireccion "  + req);
    //Listar resultados
    direcciones.find().then
    (
        (listaDireccion)=>
        {
            res.send(listaDireccion);  
            console.log(listaDireccion);    
        },
        (err)=>{console.log(err);}
    )       
};

let getAllCursos = (req, res) =>
{      
    console.log("llegue a leer getCursos "  + req);
    //Listar resultados
    cursos.find().then
    (
        (listaCursos)=>
        {
            res.send(listaCursos);  
            console.log(listaCursos);    
        },
        (err)=>{console.log(err);}
    )       
};

let getAllCursoPorAlumnos = (req, res) =>
{      
    console.log("llegue a leer getCursoPorAlumnos "  + req);
    //Listar resultados
    cursoPorAlumnos.find().then
    (
        (listaCursoPorAlumnos)=>
        {
            res.send(listaCursoPorAlumnos);  
            console.log(listaCursoPorAlumnos);    
        },
        (err)=>{console.log(err);}
    )       
};



let getAllComentarios = (req, res) =>
{      
    console.log("llegue a leer getComentarios "  + req);
    //Listar resultados
    comentarios.find().then
    (
        (listaComentarios)=>
        {
            res.send(listaComentarios);  
            console.log(listaComentarios);    
        },
        (err)=>{console.log(err);}
    )       
};

let getAllClases = (req, res) =>
{      
    console.log("llegue a leer getClases "  + req);
    //Listar resultados
    clases.find().then
    (
        (listaClases)=>
        {
            res.send(listaClases);  
            console.log(listaClases);    
        },
        (err)=>{console.log(err);}
    )       
};


let getCursosByProfesorById = (req, res) =>
{      
    console.log("llegue a leer getCursosByProfesor "  + req.query.idProfesor);
    //Listar resultados
    usuarios.aggregate([
        { "$match": { "idUsuario":  req.query.idProfesor} },
        {$lookup: 
            {
                from: 'cursos',
                localField: 'idUsuario',
                foreignField: 'idProfesor',
                as: 'cursosdetails'
            }
        }
    ]).exec((err, respuesta) => {
        if (err) console.log(err);
        console.log(JSON.stringify(respuesta));
        res.send(respuesta);
    });   
};

let getCursosByProfesorByName = (req, res) =>
{      
    //Listar resultados
    console.log("llegue a leer getCursosByProfesorByName "  + req.params.name );
    usuarios.aggregate([
        {$match: { 'nombre_usuario': { $regex:  req.params.name , $options: 'i'}}} ,
        {$lookup: 
            {
                from: 'cursos',
                localField: 'idUsuario',
                foreignField: 'idProfesor',
                as: 'cursosdetails'
            }
        }
    ]).exec((err, respuesta) => {
        if (err) console.log(err);
        console.log(JSON.stringify(respuesta));
        res.send(respuesta);
    });   
};

let getProfesorByClasesByName = (req, res) =>
{      
    //Listar resultados
    console.log("llegue a leer getProfesorByClasesByName "  + req.params.name );
    clases.aggregate([
        {$match: { 'nombre_usuario': { $regex:  req.params.name , $options: 'i'}}} ,
        {$lookup: 
            {
                from: 'usuario',
                localField: 'idProfesor',
                foreignField: 'idUsuario',
                as: 'profesoresDetails'
            }
        }
    ]).exec((err, respuesta) => {
        if (err) console.log(err);
        console.log(JSON.stringify(respuesta));
        res.send(respuesta);
    });   
};

let getProfesorByClaseByMateriaByName = (req, res) =>
{      
    //Listar resultados
    var respuesta;
    console.log("llegue a leer getProfesorByClaseByMateriaByName "  + req.params.name );
    usuarios.find( {'nombre_usuario': { $regex:  req.params.name , $options: 'i'}}).then
    (
        (listaUsuarios)=>
        {
            console.log(listaUsuarios); 
            for (let index = 0; index < listaUsuarios.length; index++) {
                var usuario = listaUsuarios[index];
                console.log("Objeto encontrado de usuario: " + usuario);
                materiaProfesor.aggregate([
                    {$match: { 'idProfesor': { $regex:  usuario.idUsuario , $options: 'i'}}} ,
                    {$lookup: 
                        {
                            from: 'materia',
                            localField: 'idMateria_FK',
                            foreignField: 'id_materia',
                            as: 'materiaProfesores'
                        }
                    } 
                ]).exec((err, respuesta1) => {
                    if (err) console.log(err);
                    console.log("respuesta consulta 2" + JSON.stringify(respuesta1));
                    var usuarioVar = JSON.parse(JSON.stringify(usuario));
                    usuarioVar.listaMateriaProfesores = [];
                    console.log("usuario con listado :" +JSON.stringify(usuarioVar));
                    for (let index = 0; index < respuesta1.length; index++) {
                        var element = respuesta1[index];
                        console.log("usuario con materia:" +JSON.stringify(element));
                        usuarioVar.listaMateriaProfesores.push(element);
                    }
                    console.log("usuario con el listado:" +JSON.stringify(usuarioVar));
                    listaUsuarios[index] = usuarioVar; 
                    console.log("listado completado:" + listaUsuarios);
                    res.send(JSON.parse(JSON.stringify(listaUsuarios)));              
                });
            }

        },
        (err)=>{console.log(err);}
    );  
};

let getProfesorByClaseByMateriaByName1 = (req, res) =>
{      
    //Listar resultados
    var respuesta;
    console.log("llegue a leer getProfesorByClaseByMateriaByName "  + req.params.name );
    usuarios.aggregate([
        {$match: { 'nombre_usuario': { $regex:  req.params.name , $options: 'i'}}} ,
        {$lookup: 
            {
                from: materiaProfesor.collection.name,
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



module.exports = {getAllUsuarios,getAllRatings,getAllForos,getAllDireccion,getAllCursos,
    getAllCursoPorAlumnos,getAllComentarios,getAllClases,
    getCursosByProfesorById,getCursosByProfesorByName,getProfesorByClasesByName
    ,getProfesorByClaseByMateriaByName,getProfesorByClaseByMateriaByName1
    ,getAllMaterias,getAllDondeDaClases,getAllTipoClase,getAllTag};