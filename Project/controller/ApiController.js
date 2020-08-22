import { Component } from 'react';

//  var ip = '172.20.10.5';
var ip = '192.168.1.105';
//var ip = '172.20.10.8';
var url = 'http://'+ip+':8080/apiColearning';
const key ="AIzaSyCdgRdU-qT9RXGnIBSyEUNVvCJtGhai1Ck"

class ApiController extends Component {

    getEventos(okEventos) {
        let uri = url+'/getEventos'
        fetch(uri).then(res => {
            return res.json()
        }).catch((err) => alert("Intentar de nuevo")).
            then(data => {
                okEventos(data);
            }).catch((err) => alert("Intentar de nuevo"));
    }
//********************** */
//Usuarios
//********************** */
getUsuarioByMail(mail, okUsuario) {
    let uri = url+'/usuarios/mail?mail=' + mail
    fetch(uri).then(res => {
        return res.json()
    }).catch((err) => alert("Intentar de nuevo1")).
        then(data => {
            okUsuario(data[0]);
        }).catch((err) => alert("Intentar de nuevo2"));
}
getUsuarioById(id_usuario, okUsuario) {
    let uri = url+'/usuarios/mail?mail=' + id_usuario
    fetch(uri).then(res => {
        return res.json()
    }).catch((err) => alert("Intentar de nuevo1")).
        then(data => {
            okUsuario(data[0]);
        }).catch((err) => alert("Intentar de nuevo2"));
}
getUsuarios(okUsuarios) {
    let uri = url+'/usuarios'
    fetch(uri).then(res => {
        return res.json()
    }).catch((err) => alert("Intentar de nuevo")).
        then(data => {
            okUsuarios(data);
        }).catch((err) => alert("Intentar de nuevo"));
}
//********************** */
//Profesores
//********************** */
getProfesores(okProfesor) {
    let uri = url+'/profesores'
    fetch(uri).then(res => {
        return res.json()
    }).catch((err) => alert("Intentar de nuevo")).
        then(data => {
            okProfesor(data);
        }).catch((err) => alert("Intentar de nuevo"));
}
getComentariosByIdProfesor(id_usuario, okComentarios) {
    let uri = url+'/profesores'
    fetch(uri).then(res => {
        return res.json()
    }).catch((err) => alert("Intentar de nuevo")).
        then(data => {
            okComentarios(data);
        }).catch((err) => alert("Intentar de nuevo"));
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
            console.log(err)

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