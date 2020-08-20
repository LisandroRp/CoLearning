// Initialize express router
let router = require('express').Router();
let usuarioController = require('./controller/UsuarioController');
let comentarioController = require('./controller/ComentarioController');
let genericoController = require('./controller/ControlerGenerico');
let direccionController = require('./controller/DireccionController');
       
// Set default API response
router.get('/', function (req, res) 
{
    res.json(
    {
       status: 'Estoy Funcionando',
       message: 'Se esta ejecutando la Api!',
    });
});

//**************************Inicio Recursos Genericos**************************** */
router.get('/usuarios', (req, res) => {
    genericoController.getAllUsuarios(req,res);
});

router.get('/ratings', (req, res) => {
    genericoController.getAllRatings(req,res);
});

router.get('/foros', (req, res) => {
    genericoController.getAllForos(req,res);
});

router.get('/cursos', (req, res) => {
    genericoController.getAllCursos(req,res);
});

router.get('/cursoPorAlumnos', (req, res) => {
    genericoController.getAllCursoPorAlumnos(req,res);
});

router.get('/comentarios', (req, res) => {
    genericoController.getAllComentarios(req,res);
});

router.get('/clases', (req, res) => {
    genericoController.getAllClases(req,res);
});


router.get('/materias', (req, res) => {
    genericoController.getAllMaterias(req,res);
});

router.get('/tipoClases', (req, res) => {
    genericoController.getAllTipoClase(req,res);
});

router.get('/materias', (req, res) => {
    genericoController.getAllMaterias(req,res);
});

router.get('/tags', (req, res) => {
    genericoController.getAllTag(req,res);
});

router.get('/institutos', (req, res) => {
    genericoController.getAllInstituto(req,res);
});

router.get('/profesores/cursos', (req, res) => {
    console.log("Consultar Profesor por cursos: ", req.query);
    if(!req.query.idProfesor || req.query.idProfesor =='undefined' || req.query.idProfesor == '') 
        res.status(409).send({ msg: "El campo id usuario es requerido." });
    else
        genericoController.getCursosByProfesorById(req,res);
});

router.get('/profesores/cursos/:name', (req, res) => {
    console.log("Consultar Profesor por cursos: ", req.params.name);
    if(!req.params.name || req.params.name =='undefined' || req.params.name == '') 
        res.status(409).send({ msg: "El campo id nombre es requerido." });
    else
        genericoController.getCursosByProfesorByName(req,res);
});

router.get('/clases/profesores/:name', (req, res) => {
    console.log("Consultar profesores por clases: ", req.params.name);
    if(!req.params.name || req.params.name =='undefined' || req.params.name == '') 
        res.status(409).send({ msg: "El campo id nombre es requerido." });
    else
        genericoController.getProfesorByClasesByName(req,res);
});

router.get('/profesores/clases/materias/:name', (req, res) => {
    console.log("Consultar profesores por clases: ", req.params.name);
    if(!req.params.name || req.params.name =='undefined' || req.params.name == '') 
        res.status(409).send({ msg: "El campo id nombre es requerido." });
    else
        genericoController.getProfesorByClaseByMateriaByName(req,res);
});


router.get('/profesores/:name', (req, res) => {
    console.log("Consultar profesores por clases: ", req.params.name);
    if(!req.params.name || req.params.name =='undefined' || req.params.name == '') 
        res.status(409).send({ msg: "El campo id nombre es requerido." });
    else
        genericoController.getProfesorByClaseByMateriaByName1(req,res);
});

router.get('/cursos/:name', (req, res) => {
    console.log("Consultar cursos por nombre: ", req.params.name);
    if(!req.params.name || req.params.name =='undefined' || req.params.name == '') 
        res.status(409).send({ msg: "El campo id nombre es requerido." });
    else
        genericoController.getCursosByTipoClaseByMateriaByName(req,res);
});

router.get('/foros/:name', (req, res) => {
    console.log("Consultar foros por nombre: ", req.params.name);
    if(!req.params.name || req.params.name =='undefined' || req.params.name == '') 
        res.status(409).send({ msg: "El campo id nombre es requerido." });
    else
        genericoController.getForoByTagsByName(req,res);
});

router.get('/tags/foros', (req, res) => {
    console.log("Consultar foros por nombre: ", req.query.tag);
    if(!req.query.tag || req.query.tag =='undefined' || req.query.tag == '') 
        res.status(409).send({ msg: "El campo id nombre es requerido." });
    else
        console.log(req.query.tag);
        res.sendStatus(200);
});

router.get('/institutos/:name', (req, res) => {
    console.log("Consultar institutos por nombre: ", req.params.name);
    if(!req.params.name || req.params.name =='undefined' || req.params.name == '') 
        res.status(409).send({ msg: "El campo id nombre es requerido." });
    else
        genericoController.getInstitoByName(req,res);
});
//************************** Fin Recursos Genericos**************************** */

//************************** Inicio Recursos Usuario**************************** */
router.get('/usuarios/idUsuario', (req, res) => {
    if(!req.query.idUsuario || req.query.idUsuario =='undefined' || req.query.idUsuario == '') 
        res.status(409).send({ msg: "El campo id usuario es requerido." });
    else
        usuarioController.getUsuarioById(req,res);
});

router.get('/usuarios/mail', (req, res) => {
    if(!req.query.mail || req.query.mail =='undefined' || req.query.mail == '') 
        res.status(409).send({ msg: "El campo id mail es requerido." });
    else
        usuarioController.getUsuarioByMail(req,res);
});

router.get('/usuarios/mails/:mail', (req, res) => {
    if(!req.params.mail || req.params.mail =='undefined' || req.params.mail == '') 
        res.status(409).send({ msg: "El campo id mail es requerido." });
    else
        usuarioController.getUsuarioByNameMail(req,res);
});

router.get('/usuarios/name/:name', (req, res) => {
    if(!req.params.name || req.params.name =='undefined' || req.params.name == '') 
        res.status(409).send({ msg: "El campo id mail es requerido." });
    else
        usuarioController.getUsuarioByName(req,res);
});


//************************** Fin Recursos Usuario**************************** */

//************************** Inicio Recursos Direccion**************************** */
router.get('/direcciones', (req, res) => {
    direccionController.getAllDireccion(req,res);
});

//EndPoint para leer direccion por id
router.get('/direcciones',(req, res) =>{
    if(!req.query.idDireccion || req.query.idDireccion =='undefined' || req.query.idDireccion == '') 
        res.status(409).send({ msg: "El campo id direccion es requerido." });
    else
        direccionController.getDirreccionById(req,res);
});

//************************** Fin Recursos Direccion**************************** */

// Export API routes
module.exports = router;