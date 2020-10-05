const express = require('express')
const router = express.Router()
const usuarioController =   require('./controller/usuaurio.controller');
const catalogoController =   require('./controller/catalogo.controller');
const foroController =   require('./controller/foro.controller');

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

router.get('/users/:id', (req, res) => {
    console.log("Consultar Usuarios por id: ", req.params);
    if(!req.params.id || req.params.id =='undefined' || req.params.id == '') 
        res.status(409).send({ msg: "El campo id usuario es requerido." });
    else
        usuarioController.findAllById(req,res);  
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

router.get('/foros/tags/:name', (req, res) => {
    console.log("Consultar Foros y Tags por nombre: ", req.params);
    if(!req.params.name || req.params.name =='undefined' || req.params.name == '') 
        res.status(409).send({ msg: "El campo nombre Foros y Tags es requerido." });
    else
        foroController.findAllByNames(req,res);  
});

router.get('/foros/foro/:name', (req, res) => {
    console.log("Consultar Foros por nombre: ", req.params);
    if(!req.params.name || req.params.name =='undefined' || req.params.name == '') 
        res.status(409).send({ msg: "El campo nombre foro es requerido." });
    else
        foroController.findForosByName(req,res);  
});
//**************************/Fin Recursos catalogo**************************** */


module.exports = router