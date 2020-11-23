const express = require('express')
const router = express.Router()
const usuarioController =   require('./controller/usuaurio.controller');
const catalogoController =   require('./controller/catalogo.controller');
const foroController =   require('./controller/foro.controller');
const chatController =   require('./controller/chat.controller');

//**************************Inicio Recursos Usuario **************************** */
router.get('/users', (req, res) => {
    console.log("findAll usuarioss");
    usuarioController.findAll(req,res);
});

router.get('/users/mail', (req, res) => {
    console.log("Consultar Usuarios por mail: ", req.query);
    if(!req.query.email || req.query.email =='undefined' || req.query.email == '') 
        res.status(409).send({ msg: "El campo mail usuario es requerido." });
    else
        usuarioController.findAllByMail(req,res);  
});

router.get('/users/profesores', (req, res) => {
    console.log("Consultar Profesor todos los profesores: ", req.params);
    usuarioController.findAllProfesores(req,res);  
});

router.get('/users/:id', (req, res) => {
    console.log("Consultar Usuarios por id: ", req.params);
    if(!req.params.id || req.params.id =='undefined' || req.params.id == '') 
        res.status(409).send({ msg: "El campo id usuario es requerido." });
    else
        usuarioController.findAllById(req,res);  
});

router.get('/users/user/:id/comentarios', (req, res) => {
    console.log("Consultar Usuarios por comentario id: ", req.params);
    if(!req.params.id || req.params.id =='undefined' || req.params.id == '') 
        res.status(409).send({ msg: "El campo id usuario es requerido." });
    else
        usuarioController.findByIdUsuarioByComentarios(req,res);  
});

router.get('/users/profesor/find', (req, res) => {
    console.log("Consultar Profesor por id: ", req.query);
    var notengoDomicilio = (req.query.domicilio =='undefined' || req.query.domicilio == '' || !req.query.domicilio);
    var notengoNombre = (req.query.nameProfesor =='undefined' || req.query.nameProfesor == '' || !req.query.nameProfesor);
    var notengoMateria = (req.query.nameMateria =='undefined' || req.query.nameMateria == '' || !req.query.nameMateria);
    var notengoRating = (req.query.valueRating =='undefined' || req.query.valueRating == '' || !req.query.valueRating);
    if(notengoRating && notengoDomicilio && notengoMateria && notengoNombre) 
        res.status(409).send({ msg: "Debe ingresar un campo de busqueda." });
    else
        usuarioController.findProfesorMateriaDomicilioRating(req,res);  
});


router.get('/users/profesor/:id', (req, res) => {
    console.log("Consultar Profesor por id: ", req.params);
    if(!req.params.id || req.params.id =='undefined' || req.params.id == '') 
        res.status(409).send({ msg: "El campo id Profesor es requerido." });
    else
        usuarioController.findByIdProfesor(req,res);  
});

router.get('/users/profesor/:idProfesor/materias', (req, res) => {
    console.log("Consultar Profesor por id por materias: ", req.params);
    if(!req.params.idProfesor || req.params.idProfesor =='undefined' || req.params.idProfesor == '') 
        res.status(409).send({ msg: "El campo id Profesor es requerido." });
    else
        usuarioController.findByIdProfesorByMaterias(req,res);  
});

router.get('/users/profesor/:idProfesor/dondeDaClases', (req, res) => {
    console.log("Consultar Profesor por id por dondeDaClases: ", req.params);
    if(!req.params.idProfesor || req.params.idProfesor =='undefined' || req.params.idProfesor == '') 
        res.status(409).send({ msg: "El campo id Profesor es requerido." });
    else
        usuarioController.findAllByIdProfesorByDondeDaClases(req,res);  
});

router.get('/users/profesor/:idProfesor/tipoClases', (req, res) => {
    console.log("Consultar Profesor por id por tipoClases: ", req.params);
    if(!req.params.idProfesor || req.params.idProfesor =='undefined' || req.params.idProfesor == '') 
        res.status(409).send({ msg: "El campo id Profesor es requerido." });
    else
        usuarioController.findByIdProfesorByClases(req,res);  
});

router.get('/users/profesor/:idProfesor/horarios', (req, res) => {
    console.log("Consultar Profesor por id por horarios: ", req.params);
    if(!req.params.idProfesor || req.params.idProfesor =='undefined' || req.params.idProfesor == '') 
        res.status(409).send({ msg: "El campo id Profesor es requerido." });
    else
        usuarioController.findAllByIdProfesorByHorarios(req,res);  
});

router.post('/users/profesor', (req, res) => {
    console.log("Crear Profesor : ", req.body);
    if(!req.body.usuario || req.body.usuario =='undefined' || req.body.usuario == '') 
        res.status(409).send({ msg: "NO se puede crear el profesor requerido." });
    else{
        usuarioController.createUser(req,res);
    }
});

//**************************/Fin Recursos Usuario**************************** */

//**************************Inicio Recursos catalogo**************************** */
router.get('/clases', (req, res) => {
    console.log("findAll clases");
    catalogoController.findAllClases(req,res);
});

router.get('/comentarios', (req, res) => {
    console.log("findAll comentarios");
    catalogoController.findAllComentarios(req,res);
});

router.get('/dondeDaClases', (req, res) => {
    console.log("findAll DondeDaClases");
    catalogoController.findAllDondedaclases(req,res);
});

router.get('/foros', (req, res) => {
    console.log("findAll foros");
    catalogoController.findAllForo(req,res);
});

router.get('/institutos', (req, res) => {
    console.log("findAll Institutos");
    catalogoController.findAllInstituto(req,res);
});

router.get('/materias', (req, res) => {
    console.log("findAll materias");
    catalogoController.findAllMaterias(req,res);
});

router.get('/ratings', (req, res) => {
    console.log("findAll ratings");
    catalogoController.findAllRating(req,res);
});

router.get('/tags', (req, res) => {
    console.log("findAll tags");
    catalogoController.findAllTag(req,res);
});

router.get('/tipoClases', (req, res) => {
    console.log("findAll tipoClases");
    catalogoController.findAllTipoclase(req,res);
});

router.get('/monedas', (req, res) => {
    console.log("findAll monedas");
    catalogoController.findAllMonedas(req,res);
});

//**************************/Fin Recursos catalogo**************************** */

//**************************/Inicio Recursos foro**************************** */
router.get('/foros/foro/:id/tags', (req, res) => {
    console.log("Consultar Foros por id: ", req.params);
    if(!req.params.id || req.params.id =='undefined' || req.params.id == '') 
        res.status(409).send({ msg: "El campo id foro es requerido." });
    else
        foroController.findTagsByIdForo(req,res);  
});

router.get('/foros/foro/:id/respuestas', (req, res) => {
    console.log("Consultar Foros por id y sus respuestas: ", req.params);
    if(!req.params.id || req.params.id =='undefined' || req.params.id == '') 
        res.status(409).send({ msg: "El campo id foro es requerido." });
    else
        foroController.findRespuestaByIdForo(req,res);  
});

router.get('/foros/tags/:name', (req, res) => {
    console.log("Consultar Foros y Tags por nombre: ", req.params);
    if(!req.params.name || req.params.name =='undefined' || req.params.name == '') 
        res.status(409).send({ msg: "El campo nombre Foros y Tags es requerido." });
    else
        foroController.findAllByNames(req,res);  
});

router.get('/foros/foro', (req, res) => {
    console.log("Consultar Foros id o nombre: ", req.query);
    
    if((!req.query.name && !req.query.id) || (req.query.name =='undefined' 
        && req.query.id =='undefined') || (req.query.id == '' && req.query.name == '')) 
        res.status(409).send({ msg: "El campo nombre o id del foro es requerido." });
    else
        foroController.findForosByIdAndName(req,res);  
});
/////////////////////
//Crear Foro
/////////////////////
//EndPoint para crear Foro
router.post('/crearForo/foro',(req, res) =>{
    console.log("Crear Foro: ", req.body);
    if(!req.body.idUsuario || !req.body.titulo || !req.body.pregunta || !req.body.descripcion) 
        res.status(409).send(false);
    else
        foroController.crearForo(req,res); 
});

//EndPoint para crear ForoTags
router.post('/crearForoTag/foroTag',(req, res) =>{
    console.log("Crear ForoTags: ", req.body);
    if(!req.body.idForo || !req.body.idTag) 
        res.status(409).send({ msg: "Ha ocurrido un error" });
    else
        foroController.crearForoTags(req,res); 
});
/////////////////////
//Crear Foro
/////////////////////

//EndPoint para crear ForoTags
router.post('/crearRespuesta/foro/respuesta',(req, res) =>{
    console.log("Crear RespuestaForo: ", req.body);
    if(!req.body.titulo || !req.body.respuesta) 
        res.status(409).send({ msg: "Ha ocurrido un error" });
    else
        foroController.crearRespuestaForo(req,res); 
});


//**************************/Fin Recursos Fro**************************** */

//**************************/Inicio Recursos Chat**************************** */
router.get('/chats/usuario/find', (req, res) => {
    console.log("Consultar chat por id: ", req.query);
    var idUsuarioOrigen = (req.query.idUsuarioOrigen =='undefined' || req.query.idUsuarioOrigen == '' || !req.query.idUsuarioOrigen);
    var idUsuarioDestino = (req.query.idUsuarioDestino =='undefined' || req.query.idUsuarioDestino == '' || !req.query.idUsuarioDestino);
    console.log(idUsuarioOrigen + " " + idUsuarioDestino)
    if(idUsuarioOrigen && idUsuarioDestino) 
        res.status(409).send({ msg: "No Se pudo ejecutar la busqueda." });
    else
        chatController.existeChat(req,res);  
});

router.get('/chats/:idUsuario', (req, res) => {
    console.log("Consultar Foros id o nombre: ", req.params);
    
    if((!req.params.idUsuario && !req.params.idUsuario) || (req.params.idUsuario =='undefined' 
        && req.params.idUsuario =='undefined') || (req.params.idUsuario == '' && req.params.idUsuario == '')) 
        res.status(409).send({ msg: "El campo nombre o id del usuario es requerido." });
    else
        chatController.findChatByIdOrigen(req,res);  
});

//**************************/Fin Recursos chat**************************** */

module.exports = router