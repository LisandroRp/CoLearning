// Initialize express router
let router = require('express').Router();
let usuarioController = require('./controller/UsuarioController');
let comentarioController = require('./controller/ComentarioController');
let peliculaController = require('./controller/PeliculaController');
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

router.get('/getUsuarios', (req, res) => {
    usuarioController.getUsuarios(req,res);
});


router.get('/Usuarios', (req, res) => {
    usuarioController.getUsuarios(req,res);
});
//EndPoint para leer usuario por id
router.get('/getUsuarioById',(req, res) =>{
    if(!req.query.usuarioId || req.query.usuarioId =='undefined' || req.query.usuarioId == '') 
        res.status(409).send({ msg: "El campo id usuario es requerido." });
    else
        usuarioController.getUsuarioById(req,res);
});
//Homologo al anterior
router.get('/Usuarios/Usuario',(req, res) =>{
    if(!req.query.usuarioId || req.query.usuarioId =='undefined' || req.query.usuarioId == '') 
        res.status(409).send({ msg: "El campo id usuario es requerido." });
    else
        usuarioController.getUsuarioById(req,res);
});
router.get('/getUsuarioByIdOne',(req, res) =>{
    if(!req.query.usuarioId || req.query.usuarioId =='undefined' || req.query.usuarioId == '') 
        res.status(409).send({ msg: "El campo id usuario es requerido." });
    else
        usuarioController.getUsuarioByIdOne(req,res);
});
//Endpoint de insert un usuarios
router.post('/insertUsuario/Usuario',(req, res) =>{
    console.log("Insertar nuevo usuario: ", req.body);
    if(!req.body || req.body.usuarioId =='undefined' || req.body.password =='undefined' || req.body.usuarioId == '' || req.body.password == '') 
        res.status(409).send({ msg: "El campo id usuario es requerido." });
    else
        usuarioController.insertUsuario(req,res);
});
router.post('/Usuarios/Usuario',(req, res) =>{
    console.log("Insertar nuevo usuario: ", req.body);
    if(!req.body || req.body.usuarioId =='undefined' || req.body.password =='undefined' || req.body.usuarioId == '' || req.body.password == '') 
        res.status(409).send({ msg: "El campo id usuario es requerido." });
    else
        usuarioController.insertUsuario(req,res);
});
//EndPoint para actualizar password por usuario.
router.post('/updateUsuarioByPassword/Usuario',(req, res) =>{
    console.log("Actualizar usuario y password: ", req.body);
    if(!req.body.usuarioId || !req.body.password) 
        res.status(409).send({ msg: "El campo nombre y password son requeridos del usuario." });
    else
        usuarioController.updateUsuarioByPassword(req,res); 
});


//**************************Recursos de Usuarios**************************** */
//EndPoint para insertar comentario
router.post('/insertComentario/Comentario',(req, res) =>{
    console.log("Insertar nuevo comentatrio: ",req.body);
    if(!req.body || req.body.usuarioId =='undefined' || req.body.peliculaId =='undefined' || req.body.usuarioId == '' || req.body.usuarioId == null || req.body.peliculaId == '' || req.body.peliculaId == null) 
        res.status(409).send({ msg: "El campo usuario y pelicula son requeridos del comentario." });
    else
        comentarioController.insertComentario(req,res);
});
//EndPoint para leer comentartios de un usuarios
router.get('/getComentariosByUsuario',(req, res) =>{
    console.log("Obtener  comentatrio por usuario: ",req.query);
    if(!req.query || req.query.usuarioId =='undefined' || req.query.usuarioId == '' || req.query.usuarioId == null ) 
        res.status(409).send({ msg: "El campo usuario es requerido del comentario." });
    else
        comentarioController.getComentariosByUsuarioId(req,res);
});
//EndPoint para leer comentartios de un usuarios
router.get('/getComentariosByPeliculaId',(req, res) =>{   
    console.log("Obtener  comentatrio por pelicula: ",req.query);
    if(!req.query ||  req.query.peliculaId =='undefined' || req.query.peliculaId == '' || req.query.peliculaId == null) 
        res.status(409).send({ msg: "El campo pelicula es requeridos del comentario." });
    else
        comentarioController.getComentariosByPeliculaId(req,res);
});
//**************************Recursos de Peliculas**************************** */
//EndPoint para buscar pelicula por titulo.
router.get('/getPeliculasByTitle',(req, res) =>{
    console.log("Obtener  pelicula por titulo: ",req.query);
    if(!req.query ||  req.query.title =='undefined' || req.query.title == '' || req.query.title == null) 
        res.status(409).send({ msg: "El campo titulo  de pelicula es requeridos." });
    else
        peliculaController.getPeliculasByTitle(req,res);
});
//EndPoint para buscar pelicula por titulo y anio.
router.get('/getPeliculasByTitleAndYear',(req, res) =>{
    console.log('Param getPeliculasByTitleAndYear: ',req.query);
    if(typeof req.query.title !== 'undefined' && typeof req.query.year !== 'undefined') {
        console.log(req.query.title);
        console.log(req.query.year);
        peliculaController.getPeliculasByTitleAndYear(req,res);
    }else{
        res.status(409).send({ msg: "Parametros invalidos." });
    }    
});
//EndPoint para buscar pelicula por key de nombre de pelicula.
router.get('/getPeliculasByKey',(req, res) =>{
    console.log('Param getPeliculasByKey: ',req.query);
    if(typeof req.query.key !== 'undefined') {
        console.log(req.query.key);
        peliculaController.getPeliculasByKey(req,res);
    }else{
        res.status(410).send({ msg: "Parametros no ingresado o invalidos." });
    }    
});
//EndPoint para buscar pelicula por Id  de pelicula.
router.get('/getPeliculasAndSeriesById',(req, res) =>{
    console.log('Param getPeliculasAndSeriesById: ',req.query);
    if(typeof req.query.movieId !== 'undefined') {
        console.log(req.query.movieId);
        peliculaController.getPeliculasAndSeriesById(req,res);
    }else{
        res.status(410).send({ msg: "Parametros no ingresado o invalidos." });
    }    
});
//EndPoint para buscar series por key de nombre de pelicula.
router.get('/getSeriesByKey',(req, res) =>{
    console.log('Param getSeriesByKey: ',req.query);
    if(typeof req.query.key !== 'undefined') {
        console.log(req.query.key);
        peliculaController.getSeriesByKey(req,res);
    }else{
        res.status(410).send({ msg: "Parametros no ingresado o invalidos." });
    }    
});

// Export API routes
module.exports = router;