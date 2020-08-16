var direcciones = require('../model/Direccion');
var bodyParser = require('body-parser');


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


let getDirreccionById = (req, res) =>
{      
    console.log("llegue a leer con filtro");
    //Obtener id busqueda req.param.tagid
    console.log(req.query.idDireccion);
    let idBusqueda = {idDireccion: req.query.idDireccion};
    console.log(idBusqueda);
    //Listar resultados
    direcciones.findOne(idBusqueda)
    .then
    (
        (direccion)=>
        {
            console.log(direccion); 
            if(direccion == null)
                res.status(206).send({ msg: "NO existe usuario."});
            else
                res.status(200).send(direccion); //devuelvo resultado query   
        },
        (err)=>{console.log(err);}
    )       
};



module.exports = {getAllDireccion,getDirreccionById};