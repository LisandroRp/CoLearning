import { Component } from 'react';

//  var ip = '172.20.10.5';
var ip = '192.168.1.20';
//var ip = '172.20.10.8';
var url = 'http://'+ip+':8088/apiColearning';
const key ="AIzaSyCdgRdU-qT9RXGnIBSyEUNVvCJtGhai1Ck"

class ApiController extends Component {

//********************** */
//Usuarios
//********************** */
getUsuarioByMail(mail, okUsuario) {
    let uri = url+'/users/mail?email=' + mail
    fetch(uri).then(res => {
        return res.json()
    }).catch((err) => ([alert("Intentar de nuevo"), console.log(err)])).
        then(data => {
            okUsuario(data[0]);
        })
}
getUsuarioById(id_usuario, okUsuario) {
    let uri = url+'/users/' + id_usuario
    fetch(uri).then(res => {
        return res.json()
    }).catch((err) => ([alert("Intentar de nuevo"), console.log(err)])).
        then(data => {
            okUsuario(data[0]);
        })
}
getDondeClases(usuario, okDondeClases) {
    let uri = url+'/users/profesor/' + usuario.id_usuario + '/dondeDaClases'
    fetch(uri).then(res => {
        return res.json()
    }).catch((err) => ([alert("Intentar de nuevo"), console.log(err)])).
        then(data => {
            okDondeClases(usuario, data);
        })
}
getTipoClases(usuario, okTipoClases) {
    let uri = url+'/users/profesor/' + usuario.id_usuario + '/tipoClases'
    fetch(uri).then(res => {
        return res.json()
    }).catch((err) => ([alert("Intentar de nuevo"), console.log(err)])).
        then(data => {
            okTipoClases(usuario, data);
        })
}
getMateriasProfesor(usuario, okMaterias) {
    let uri = url+'/users/profesor/' + usuario.id_usuario + '/materias'
    fetch(uri).then(res => {
        return res.json()
    }).catch((err) => ([alert("Intentar de nuevo"), console.log(err)])).
        then(data => {
            okMaterias(usuario, data);
        })
}
getHorarios(usuario, okHorarios) {
    let uri = url+'/users/profesor/' + usuario.id_usuario + '/horarios'
    fetch(uri).then(res => {
        return res.json()
    }).catch((err) => ([alert("Intentar de nuevo"), console.log(err)])).
        then(data => {
            okHorarios(usuario, data);
        })
}
getMaterias(okMaterias) {
    let uri = url+'/materias'
    fetch(uri).then(res => {
        return res.json()
    }).catch((err) => ([alert("Intentar de nuevo"), console.log(err)])).
        then(data => {
            okMaterias(data);
        })
}
getMonedas(okMonedas) {
    let uri = url+'/monedas'
    fetch(uri).then(res => {
        return res.json()
    }).catch((err) => ([alert("Intentar de nuevo"), console.log(err)])).
        then(data => {
            okMonedas(data);
        })
}
getTags(okTags) {
    let uri = url+'/tags'
    fetch(uri).then(res => {
        return res.json()
    }).catch((err) => ([alert("Intentar de nuevo"), console.log(err)])).
        then(data => {
            okTags(data);
        })
}
//********************** */
//Profesores
//********************** */
getComentariosByIdProfesor(id_usuario, okComentarios) {
    let uri = url+'/users/user/' + id_usuario + '/comentarios'
    fetch(uri).then(res => {
        return res.json()
    }).catch((err) => ([alert("Intentar de nuevo"), console.log(err)])).
        then(data => {
            okComentarios(data);
        })
}
getProfesoresHome(okProfesores) {
    let uri = url+'/users/profesores'
    fetch(uri).then(res => {
        return res.json()
    }).catch((err) => ([alert("Intentar de nuevo"), console.log(err)])).
        then(data => {
            okProfesores(data);
        })
}
getProfesoresFilter(nombre, materia, domicilio, rating, okProfesores) {
    let uri = url+'/users/profesor/find?domicilio=' + domicilio + '&nameMateria=' + materia + '&nameProfesor=' + nombre + '&valueRating=' + rating
    fetch(uri).then(res => {
        return res.json()
    }).catch((err) => ([alert("Intentar de nuevo"), console.log(err)])).
        then(data => {
            okProfesores(data);
        })
}
//********************** */
//Foro
//********************** */
getForo(id_foro, okForo) {
    let uri = url+'/foros/foro?id=' + id_foro
    fetch(uri).then(res => {
        return res.json()
    }).catch((err) => ([alert("Intentar de nuevo"), console.log(err)])).
        then(data => {
            okForo(data);
        })
}
getFiltroForo(tema, okForo) {
    let uri = url+'/foros/tags/'+ tema
    fetch(uri).then(res => {
        return res.json()
    }).catch((err) => ([alert("Intentar de nuevo"), console.log(err)])).
        then(data => {
            okForo(data);
        })
}
getRespuestasForo(id_foro, okForo) {
    let uri = url+'/foros/foro/' + id_foro + '/respuestas'
    fetch(uri).then(res => {
        return res.json()
    }).catch((err) => ([alert("Intentar de nuevo"), console.log(err)])).
        then(data => {
            okForo(data);
        })
}
//********************** */
//Apis
//********************** */
    getCoordenadas(direccion,okCoordenadas) {
        let urigoogle = 'https://maps.googleapis.com/maps/api/geocode/json?address='+direccion+'&key=' + key
        
        fetch(urigoogle).then(res => {
            return res.json()
        }).catch((err) => {
            console.log(err)

        }).
            then(data => {
                okCoordenadas(data);
            }).catch((err => {
                console.log(err);
                alert("No existe la direccion");
            }));
    }
    getRoad(direccion, transporte, okRoad) {
        let urigoogle = 'https://maps.googleapis.com/maps/api/distancematrix/json?origins='+ direccion[0].latitude + ',' + direccion[0].longitude + '&destinations=' + direccion[1].latitude + ',' + direccion[1].longitude + '&mode=' + transporte + '&units=metric&key=' + key
        //let urigoogle = 'https://maps.googleapis.com/maps/api/distancematrix/json?origins=-34.856032,-58.503571&destinations=-34.882670,-58.497480&mode=transit&units=metric&key=AIzaSyCdgRdU-qT9RXGnIBSyEUNVvCJtGhai1Ck'
        
        fetch(urigoogle).then(res => {
            return res.json()
        }).catch((err) => {
            console.log(err),
            alert("No Existe Ruta con el Transporte Seleccionado");
        }).
            then(data => {
                okRoad(direccion, data);
            }).catch((err => {
                console.log(err);
                alert("No Existe Ruta con el Transporte Seleccionado");
            }));
    }
    
}

export default new ApiController();