var multilabel = require('multilabelsvm' )
var actionClassifier = new multilabel.Classifier({kernel : 'linear'});
var dbConn = require('../config/db.config');
var mysql = require('mysql');

 function getValueDataSet(key){
    var input = ''+ key +'';
    console.log(key);
    var trainSet = [
        { input:'2',output: "Lengua" },
        { input:'2',output: "Lengua" },
        { input:'2',output: "Lengua" },
        { input:'2',output: "Lengua" },
        { input:'2',output: "Lengua" },
        { input:'2',output: "Lengua" },
        { input:'2',output: "Lengua" },
        { input:'2',output: "Lengua" },
        { input:'2',output: "Lengua" },
        { input:'2',output: "Lengua" },
        { input:'2',output: "Lengua" },
        { input:'2',output: "Lengua" },
        { input:'2',output: "Lengua" },
        { input:'2',output: "Lengua" },
        { input:'2',output: "Lengua" },
        { input:'2',output: "Lengua" },
        { input:'2',output: "Lengua" },
        { input:'2',output: "Lengua" },
        { input:'2',output: "Lengua" },
        { input:'2',output: "Lengua" },
        { input:'2',output: "Lengua" },
        { input:'2',output: "Lengua" },
        { input:'2',output: "Lengua" },
        { input:'2',output: "Lengua" },
        { input:'2',output: "Lengua" },
        { input:'2',output: "Lengua" },
        { input:'2',output: "Lengua" },
        { input:'2',output: "Lengua" },
        { input:'2',output: "Lengua" },
        { input:'2',output: "Lengua" },
        { input:'2',output: "Lengua" },
        { input:'2',output: "Lengua" },
        { input:'2',output: "Lengua" },
        { input:'2',output: "Lengua" },
        { input:'2',output: "Lengua" },
        { input:'2',output: "Lengua" },
        { input:'2',output: "Lengua" },
        { input:'2',output: "Lengua" },
        { input:'2',output: "Lengua" },
        { input:'2',output: "Lengua" },
        { input:'2',output: "Lengua" },
        { input:'2',output: "Lengua" },
        { input:'2',output: "Lengua" },
        { input:'2',output: "Lengua" },
        { input:'2',output: "Lengua" },
        { input:'2',output: "Lengua" },
        { input:'2',output: "Lengua" },
        { input:'2',output: "Lengua" },
        { input:'2',output: "Lengua" },
        { input:'2',output: "Lengua" },
        { input:'2',output: "Lengua" },
        { input:'2',output: "Lengua" },
        { input:'2',output: "Lengua" },
        { input:'2',output: "Lengua" },
        { input:'2',output: "Lengua" },
        { input:'2',output: "Lengua" },
        { input:'2',output: "Lengua" },
        { input:'2',output: "Lengua" },
        { input:'2',output: "Lengua" },
        { input:'2',output: "Lengua" },
     
        { input:'10',output: "Matematica" },
        { input:'10',output: "Matematica" },
        { input:'10',output: "Matematica" },
        { input:'10',output: "Matematica" },
        { input:'10',output: "Matematica" },
        { input:'10',output: "Matematica" },
        { input:'10',output: "Matematica" },
        { input:'10',output: "Matematica" },
        { input:'10',output: "Matematica" },
        { input:'10',output: "Matematica" },
        { input:'10',output: "Matematica" },
        { input:'10',output: "Matematica" },
        { input:'10',output: "Matematica" },
        { input:'10',output: "Matematica" },  
        { input:'10',output: "Matematica" },
        { input:'10',output: "Matematica" },
        { input:'10',output: "Matematica" },  
        { input:'10',output: "Matematica" },
        { input:'10',output: "Matematica" },
        { input:'10',output: "Matematica" },
        { input:'10',output: "Matematica" },
        { input:'10',output: "Matematica" },
        { input:'10',output: "Matematica" },
        { input:'10',output: "Matematica" },
        { input:'10',output: "Matematica" },
        { input:'10',output: "Matematica" },
        { input:'10',output: "Matematica" },
        { input:'10',output: "Matematica" },  
        { input:'10',output: "Matematica" },
        { input:'10',output: "Matematica" },
        { input:'10',output: "Matematica" },  
        { input:'10',output: "Matematica" },
        { input:'10',output: "Matematica" },
        { input:'10',output: "Matematica" },
        { input:'10',output: "Matematica" },
        { input:'10',output: "Matematica" },
        { input:'10',output: "Matematica" },
        { input:'10',output: "Matematica" },
        { input:'10',output: "Matematica" },
        { input:'10',output: "Matematica" },
        { input:'10',output: "Matematica" },
        { input:'10',output: "Matematica" },  
        { input:'10',output: "Matematica" },
        { input:'10',output: "Matematica" },
        { input:'10',output: "Matematica" },  
        { input:'10',output: "Matematica" },
        { input:'10',output: "Matematica" },
        { input:'10',output: "Matematica" },
        
        { input:'7',output: "Fisica" },
        { input:'7',output: "Fisica" },
        { input:'7',output: "Fisica" },
        { input:'7',output: "Fisica" },
        { input:'7',output: "Fisica" },
        { input:'7',output: "Fisica" },
        { input:'7',output: "Fisica" },
        { input:'7',output: "Fisica" },
        { input:'7',output: "Fisica" },
        { input:'7',output: "Fisica" },
        { input:'7',output: "Fisica" },
        { input:'7',output: "Fisica" },
        { input:'7',output: "Fisica" },
        { input:'7',output: "Fisica" },  
        { input:'7',output: "Fisica" },
        { input:'7',output: "Fisica" },
        { input:'7',output: "Fisica" },  
        { input:'7',output: "Fisica" },
        { input:'7',output: "Fisica" },
        { input:'7',output: "Fisica" },
        { input:'7',output: "Fisica" },
        { input:'7',output: "Fisica" },
        { input:'7',output: "Fisica" },
        { input:'7',output: "Fisica" },
        { input:'7',output: "Fisica" },
        { input:'7',output: "Fisica" },
        { input:'7',output: "Fisica" },
        { input:'7',output: "Fisica" },  
        { input:'7',output: "Fisica" },
        { input:'7',output: "Fisica" },
        { input:'7',output: "Fisica" },  
        { input:'7',output: "Fisica" },
        { input:'7',output: "Fisica" },
        { input:'7',output: "Fisica" },
        { input:'7',output: "Fisica" },
        { input:'7',output: "Fisica" },
        { input:'7',output: "Fisica" },
        { input:'7',output: "Fisica" },
        { input:'7',output: "Fisica" },
        { input:'7',output: "Fisica" },
        { input:'7',output: "Fisica" },
        { input:'7',output: "Fisica" },  
        { input:'7',output: "Fisica" },
        { input:'7',output: "Fisica" },
        { input:'7',output: "Fisica" },  
        { input:'7',output: "Fisica" },
        { input:'7',output: "Fisica" },
        { input:'7',output: "Fisica" },
        
        ]
        
        actionClassifier.trainBatch(trainSet);
    
    //console.log(actionClassifier.classify('10'))
    //console.log(actionClassifier.classify('2'))
    
    //backing up
    var json = actionClassifier.toJSON()
    var newActionClassifier = new multilabel.Classifier();
    //console.log('----------New Classifier----');
    //importing
    newActionClassifier.fromJSON(json);
    var value = newActionClassifier.classify(input);
    var result = '' + value;
    //console.log( c);
    //console.log(newActionClassifier.classify('2'));
    //console.log(newActionClassifier.classify('10'));
    return result;
}

let findByIdProfesorByMateriasAnalytic = (req, res) => {
    console.log("llegue a leer findByIdProfesorByMateriasAnalytic con filtro");
    //Obtener id busqueda req.param.tagid
    console.log(req.params.idProfesor);
    var idBusqueda = req.params.idProfesor;
    var materia =  getValueDataSet(idBusqueda);
    //var values = [];
    console.log(materia);
    var sql = 'SELECT u.id_usuario,u.nombre_usuario,u.apellido,u.src, d.des_domicilio, m.id_materia, m.nombre_materia, do.id_dondeClases, do.des_dondeClases,mo.id_moneda, mo.des_moneda,um.monto,r.votos,r.rating'
    + ' FROM usuario u'
    + ' left join domicilio d on d.id_domicilio = u.id_domicilio_fk'
    + ' left join materiaporprofesor mp on mp.id_usuario_fk = u.id_usuario'
    + ' left join materia m on m.id_materia = mp.id_materia_fk'
    + ' left join dondedaclasesporprofesor dp on dp.id_usuario_fk = u.id_usuario '
    + ' left join dondedaclases do on do.id_dondeClases = dp.id_dondeDaClases_fk'
    + ' left join usuariopormoneda um on um.id_usuario_fk = u.id_usuario'
    + ' left join moneda mo on mo.id_moneda = um.id_moneda_fk'
    + ' left join rating r on r.id_rating = u.id_rating_fk'
    + ' WHERE (u.esProfesor = 1 and r.rating >= 3 and r.votos >= 50) or (m.nombre_materia like ? and u.esProfesor = 1 and r.rating >= 3)'
  //  + ' group by u.id_usuario,u.nombre_usuario,u.apellido,u.src, d.des_domicilio, m.id_materia, m.nombre_materia, do.id_dondeClases, do.des_dondeClases,mo.id_moneda, mo.des_moneda,um.monto,r.votos,r.rating'
    + ' Order by 1,6,8 desc';
    //values.push('%'.concat(materia).concat('%'));
    //console.log(sql + ' - ' + values);
    console.log(materia)
    dbConn.query(sql, ['%'.concat(materia).concat('%')], (err, rows) => {
      if (err) throw err;
      console.log('El usuario by id: ' + idBusqueda);
      console.log(rows);
      res.send(rows);
    });
  
  };
  
  module.exports = {findByIdProfesorByMateriasAnalytic}
