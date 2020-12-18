import { Component } from 'react';

//  var ip = '172.20.10.5';
var ip = '192.168.1.25';
//var ip = '172.20.10.8';
var url = 'http://'+ip+':8088/apiColearning'; //Local
//var url = 'https://enigmatic-sierra-01588.herokuapp.com/apiColearning' //Nube
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
updateChangePassword(email, oldPassword, newPassword, okChange) {
    let uri = url+'/users/changePassword'
    fetch(uri, {
        method: 'POST',
        mode: "cors",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email, newPassword: newPassword, oldPassword: oldPassword }),
    }).catch((err) => ([alert("Intentar de nuevo"), console.log(err)])).
    then(data => {
        okChange();
    })
}
postUser(nombre, apellido, email, password, okCreate) {
    let uri = url+'/users/postUser'
    fetch(uri, {
        method: 'POST',
        mode: "cors",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre: nombre, apellido: apellido, email: email, password: password }),
    }).catch((err) => ([alert("Intentar de nuevo"), console.log(err), okCreate(false)])).
    then(data => {
        okCreate(true);
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
getDondeClases(okDondeClases) {
    let uri = url+'/dondeDaClases'
    fetch(uri).then(res => {
        return res.json()
    }).catch((err) => ([alert("Intentar de nuevo"), console.log(err)])).
        then(data => {
            okDondeClases(data);
        })
}
getTipoClases(okTipoClases) {
    let uri = url+'/tipoClases'
    fetch(uri).then(res => {
        return res.json()
    }).catch((err) => ([alert("Intentar de nuevo"), console.log(err)])).
        then(data => {
            okTipoClases(data);
        })
}
updateUsuario(usuario, okUsuarioSave){
    let uri = url+'/user/updateUsuario'
    fetch(uri, {
        method: 'POST',
        mode: "cors",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
            idUsuario: usuario.id_usuario,
            nombre: usuario.nombre_usuario,
            apellido: usuario.apellido,
            instagram: usuario.instagram,
            telefono: usuario.telefono,
            email: usuario.email,
            whatsApp: usuario.whatsApp,
        }),
    }).then((res) => {
        return res.json();
    }).catch((err) => console.log(err)).then((res) => {
        okUsuarioSave(res);
    }).catch((err) => console.log(err));
}
updateDomicilio(id_domicilio, des_domicilio, okDomicilioSave){
    let uri = url+'/user/updateDomicilio'
    fetch(uri, {
        method: 'POST',
        mode: "cors",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
            idDomicilio: id_domicilio,
            desDomicilio: des_domicilio,
        }),
    }).then((res) => {
        return res.json();
    }).catch((err) => console.log(err)).then((res) => {
        okDomicilioSave(res);
    }).catch((err) => console.log(err));
}
updateMoney(id_usuario, money, okMoneySave){
    let uri = url+'/user/updateMoney'
    fetch(uri, {
        method: 'POST',
        mode: "cors",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
            idUsuario: id_usuario,
            money: money
        }),
    }).then((res) => {
        return res.json();
    }).catch((err) => console.log(err)).then((res) => {
        okMoneySave(res);
    }).catch((err) => console.log(err));
}
updateUsuarioRespuestasCantidad(id_usuario, okUsuarioRespuestasCantidad){
    let uri = url+'/user/updateUsuarioRespuestasCantidad'
    fetch(uri, {
        method: 'POST',
        mode: "cors",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
            idUsuario: id_usuario
        }),
    }).then((res) => {
        return res.json();
    }).catch((err) => console.log(err)).then((res) => {
        okUsuarioRespuestasCantidad(res);
    }).catch((err) => console.log(err));
}
updateUsuarioRespuestasBuenas(id_usuario, okUsuarioRespuestasBuenas){
    let uri = url+'/user/updateUsuarioRespuestasBuenas'
    fetch(uri, {
        method: 'POST',
        mode: "cors",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
            idUsuario: id_usuario
        }),
    }).then((res) => {
        return res.json();
    }).catch((err) => console.log(err)).then((res) => {
        okUsuarioRespuestasBuenas(res);
    }).catch((err) => console.log(err));
}
//Delete
deleteDondeClases(id_usuario, okDeleteDondeClases){
    let uri = url+'/user/deleteDondeClases'
    fetch(uri, {
        method: 'DELETE',
        mode: "cors",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
            idUsuario: id_usuario,
        }),
    }).then((res) => {
        return res.json();
    }).catch((err) => console.log(err)).then((res) => {
        okDeleteDondeClases(res);
    }).catch((err) => console.log(err));
}
deleteTipoClases(id_usuario, okDeleteTipoClases){
    let uri = url+'/user/deleteTipoClases'
    fetch(uri, {
        method: 'DELETE',
        mode: "cors",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
            idUsuario: id_usuario,
        }),
    }).then((res) => {
        return res.json();
    }).catch((err) => console.log(err)).then((res) => {
        okDeleteTipoClases(res);
    }).catch((err) => console.log(err));
}
deleteMaterias(id_usuario, okDeleteMaterias){
    let uri = url+'/user/deleteMaterias'
    fetch(uri, {
        method: 'DELETE',
        mode: "cors",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
            idUsuario: id_usuario,
        }),
    }).then((res) => {
        return res.json();
    }).catch((err) => console.log(err)).then((res) => {
        okDeleteMaterias(res);
    }).catch((err) => console.log(err));
}
delateUsuarioHorarios(id_usuario, okDelateUsuarioHorarios){
    let uri = url+'/user/delateUsuarioHorarios'
    fetch(uri, {
        method: 'DELETE',
        mode: "cors",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
            idUsuario: id_usuario,
        }),
    }).then((res) => {
        return res.json();
    }).catch((err) => console.log(err)).then((res) => {
        okDelateUsuarioHorarios(res);
    }).catch((err) => console.log(err));
}
//Post
postDondeClases(id_usuario, dondeClases, okDondeClasesSave){
    let uri = url+'/user/postDondeClases'
    fetch(uri, {
        method: 'POST',
        mode: "cors",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
            idUsuario: id_usuario,
            dondeClases: dondeClases,
        }),
    }).then((res) => {
        return res;
    }).catch((err) => console.log(err)).then((res) => {
        okDondeClasesSave(res);
    }).catch((err) => console.log(err));
}
postTipoClases(id_usuario, tipoClases, okTipoClasesSave){
    let uri = url+'/user/postTipoClases'
    fetch(uri, {
        method: 'POST',
        mode: "cors",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
            idUsuario: id_usuario,
            tipoClases: tipoClases
        }),
    }).then((res) => {
        return res;
    }).catch((err) => console.log(err)).then((res) => {
        okTipoClasesSave(res);
    }).catch((err) => console.log(err));
}
postMaterias(id_usuario, materias, okMateriasSave){
    let uri = url+'/user/postMaterias'
    fetch(uri, {
        method: 'POST',
        mode: "cors",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
            idUsuario: id_usuario,
            materias: materias
        }),
    }).then((res) => {
        return res;
    }).catch((err) => console.log(err)).then((res) => {
        okMateriasSave(res);
    }).catch((err) => console.log(err));
}
postUsuarioHorarios(id_usuario, horarios, okHorariosSave){
    let uri = url+'/user/postUsuarioHorarios'
    fetch(uri, {
        method: 'POST',
        mode: "cors",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
            idUsuario: id_usuario,
            horarios: horarios
        }),
    }).then((res) => {
        return res;
    }).catch((err) => console.log(err)).then((res) => {
        okHorariosSave(res);
    }).catch((err) => console.log(err));
}
//********************** */
//Comentarios
//********************** */
getComentariosUsuario(id_usuarioOrigen, id_usuarioDestino, okComentarios) {
    let uri = url+'/user/comentarios/'+ id_usuarioOrigen +'/' + id_usuarioDestino
    fetch(uri).then(res => {
        return res.json()
    }).catch((err) => ([alert("Intentar de nuevo"), console.log(err)])).
        then(data => {
            okComentarios(data);
        })
}
postComentario(id_usuarioOrigen, id_usuarioDestino, rating, comentario, okComentario) {
    let uri = url+'/user/newComentario'
    fetch(uri, {
        method: 'POST',
        mode: "cors",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idUsuarioOrigen: id_usuarioOrigen, idUsuarioDestino: id_usuarioDestino, rating: rating, comentario: comentario }),
    }).then((res) => {
        return res.json();
    }).catch((err) => console.log(err)).then((res) => {
        okComentario(res);
    }).catch((err) => console.log(err));
}
getPromedioByIdProfesor(id_usuario, okPromedio) {
    let uri = url+'/user/rating/'+ id_usuario
    fetch(uri).then(res => {
        return res.json()
    }).catch((err) => ([alert("Intentar de nuevo"), console.log(err)])).
        then(data => {
            okPromedio(data[0]);
        })
}
updateRating(id_rating, rating, votos, okRating) {
    let uri = url+'/user/updateRating'
    fetch(uri, {
        method: 'POST',
        mode: "cors",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idRating: id_rating, votos: votos, rating: rating }),
    }).then((res) => {
        return res.json();
    }).catch((err) => console.log(err)).then((res) => {
        okRating(res);
    }).catch((err) => console.log(err));
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
getProfesoresHomeAnalitycs(id_usuario, okProfesores) {
    let uri = url+'/profesores/' + id_usuario + '/analytics'
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
getDondeClasesProfesor(usuario, okDondeClases) {
    let uri = url+'/users/profesor/' + usuario.id_usuario + '/dondeDaClases'
    fetch(uri).then(res => {
        return res.json()
    }).catch((err) => ([alert("Intentar de nuevo"), console.log(err)])).
        then(data => {
            okDondeClases(usuario, data);
        })
}
getTipoClasesProfesor(usuario, okTipoClases) {
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
getYaVotasteRespuesta(id_usuario, id_respuesta, voto, index, okYaVotaste){
let uri = url+'/foros/foro/respuesta/'+ id_respuesta + '/user/'+id_usuario
fetch(uri).then(res => {
    return res.json()
}).catch((err) => ([alert("Intentar de nuevo"), console.log(err)])).
    then(yaVoto => {
        okYaVotaste(yaVoto, voto, index);
    })
}
postForo(id_usuario, titulo, pregunta, esAnonimo, descripcion, okForo) {
    let uri = url+'/crearForo/foro'
    fetch(uri, {
        method: 'POST',
        mode: "cors",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idUsuario: id_usuario, titulo: titulo, pregunta: pregunta, esAnonimo: esAnonimo, descripcion: descripcion}),
    }).then((res) => {
        return res.json();
    }).catch((err) => console.log(err)).then((res) => {
        okForo(res);
    }).catch((err) => console.log(err));
}
postForoTags(id_foro, id_tag) {
    let uri = url+'/crearForoTag/foroTag'
    fetch(uri, {
        method: 'POST',
        mode: "cors",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idForo: id_foro, idTag: id_tag }),
    }).then((res) => {
        return false;
    }).catch((err) => console.log(err)).then((res) => {
        return true;
    }).catch((err) => console.log(err));
}
postRespuestaForo(id_foro, id_usuario, titulo, respuesta, okRespuesta) {
    let uri = url+'/crearRespuesta/foro/respuesta'
    fetch(uri, {
        method: 'POST',
        mode: "cors",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idForo: id_foro, idUsuario: id_usuario, titulo: titulo, respuesta: respuesta }),
    }).then((res) => {
        return false;
    }).catch((err) => console.log(err)).then((res) => {
        okRespuesta();
    }).catch((err) => console.log(err));
}
updateRespuesta(id_respuesta, voto, index, okUpdateRespuesta) {
    let uri = url+'/foros/foro/updateRespuesta'
    fetch(uri, {
        method: 'POST',
        mode: "cors",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idRespuesta: id_respuesta, voto: voto }),
    }).then((res) => {
        return res.json();
    }).catch((err) => console.log(err)).then((res) => {
        if(voto == (-1)){
            okUpdateRespuesta(false, index);
        }
        else{
            okUpdateRespuesta(true, index);
        }
        
    }).catch((err) => console.log(err));
}
postUsuarioRespuesta(id_usuario, id_respuesta, voto, okVoto) {
    let uri = url+'/foros/foro/postUsuarioRespuesta'
    fetch(uri, {
        method: 'POST',
        mode: "cors",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idUsuario: id_usuario, idRespuesta: id_respuesta, voto: voto }),
    }).then((res) => {
        return res.json();
    }).catch((err) => console.log(err)).then((res) => {
        okVoto(voto);
    }).catch((err) => console.log(err));
}

//********************** */
//Chats
//********************** */
    getChatsByIdUsuario(id_usuario, okChats){
        let uri = url+'/chats/'+ id_usuario
    fetch(uri).then(res => {
        return res.json()
    }).catch((err) => ([alert("Intentar de nuevo"), console.log(err)])).
        then(data => {
            okChats(data);
        })
    }
    getExisteChat(id_usuarioOrigen, id_usuarioDestino, okChat) {
        let uri = url+'/chats/usuario/find?idUsuarioOrigen=' + id_usuarioOrigen + '&idUsuarioDestino=' + id_usuarioDestino
        fetch(uri).then(res => {
            return res.json()
        }).catch((err) => ([alert("Intentar de nuevo"), console.log(err)])).
            then(data => {
                okChat(data);
            })
    }
    postCrearChat(id_usuarioOrigen, id_usuarioDestino, okChatCreado) {
        let uri = url+'/chats/crearChat'
        fetch(uri, {
            method: 'POST',
            mode: "cors",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ idUsuarioOrigen: id_usuarioOrigen, idUsuarioDestino: id_usuarioDestino }),
        }).then((res) => {
            return res.json();
        }).catch((err) => console.log(err)).then((res) => {
            okChatCreado(res);
        }).catch((err) => console.log(err));
    }
    postUltimoMensaje(id_chat, id_usuarioOrigen, mensaje) {
        let uri = url+'/chats/ultimoMensaje'
        fetch(uri, {
            method: 'POST',
            mode: "cors",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ idChat: id_chat, idUsuarioOrigen: id_usuarioOrigen, mensaje: mensaje }),
        }).then((res) => {
            return ;
        }).catch((err) => console.log(err)).then((res) => {
            return ;
        }).catch((err) => console.log(err));
    }
//********************** */
//Apis
//********************** */
//Google
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
//Currency
getCurrency(oldCurrency, newCurrency, okCurrency) {
    let uriCurrency = 'https://free.currconv.com/api/v7/convert?q=' + oldCurrency + '_' + newCurrency.codigo +'&compact=ultra&apiKey=d193b37a9716366f2645'
    fetch(uriCurrency).then(res => {
        return res.json()
    }).catch((err) => {
        console.log(err)

    }).
        then(data => {
            okCurrency(newCurrency, data);
        }).catch((err => {
            console.log(err);
            alert("No funcionan las converciones en este momento");
        }));
}
}

export default new ApiController();