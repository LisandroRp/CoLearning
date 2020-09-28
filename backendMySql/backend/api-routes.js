const express = require('express')
const router = express.Router()
const employeeController =   require('./controller/employee.controller');
const usuarioController =   require('./controller/usuaurio.controller');
const catalogoController =   require('./controller/catalogo.controller');
// Retrieve all employees router.get('/employees', employeeController.findAll);

//**************************Inicio Recursos Usuario **************************** */
router.get('/users', (req, res) => {
    console.log("findAll usuarioss");
    usuarioController.findAll(req,res);
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

//**************************/Fin Recursos catalogo**************************** */
router.get('/employees', (req, res) => {
    console.log("LLegue..........");
    employeeController.findAll(req,res);
});
// Create a new employee
router.post('/employees', employeeController.create);
// Retrieve a single employee with id
router.get('/employees/:id', employeeController.findById);
// Update a employee with id
router.put('/employees/:id', employeeController.update);
// Delete a employee with id
router.delete('/employees/:id', employeeController.delete);

module.exports = router