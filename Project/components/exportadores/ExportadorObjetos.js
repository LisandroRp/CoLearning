import { Component } from 'react';
import { withNavigation } from 'react-navigation';


class ExportadorObjetos extends Component {

    createUsuario(usuario) {
        var usuarioNuevo
        return usuarioNuevo = {
            id_usuario: usuario.id_usuario,
            nombre_usuario: usuario.nombre_usuario,
            apellido: usuario.apellido,
            src: this.profileImage(usuario.id_usuario),
            esProfesor: usuario.esProfesor,
            domicilio: usuario.des_domicilio,
            dondeClases: [],
            tipoClases: [],
            instagram: usuario.instagram,
            telefono: usuario.telefono,
            email: usuario.email,
            whatsApp: usuario.whatsApp,
            rating: usuario.rating,
            votos: usuario.votos,
            materias: [],
            money: { id_moneda: usuario.id_moneda, des_moneda: usuario.des_moneda, monto: usuario.monto, codigo: usuario.codigo },
            res_buenas: usuario.res_buenas,
            res_mejores: usuario.res_mejores,
            res_cantidad: usuario.res_cantidad,
            horarios: []
        }
    }
    createUsuarioBasico(usuario) {
        var usuarioNuevo
        return usuarioNuevo = {
            id_usuario: usuario.id_usuario,
            nombre_usuario: usuario.nombre_usuario,
            apellido: usuario.apellido,
            src: this.profileImage(usuario.id_usuario),
            esProfesor: usuario.esProfesor,
            instagram: usuario.instagram,
            telefono: usuario.telefono,
            email: usuario.email,
            whatsApp: usuario.whatsApp,
            rating: usuario.rating,
            res_buenas: usuario.res_buenas,
            res_mejores: usuario.res_mejores,
            res_cantidad: usuario.res_cantidad
        }
    }
    createProfesorHome(profesor) {
        var profesorNuevo
        return profesorNuevo = {
            id_usuario: profesor.id_usuario,
            nombre_usuario: profesor.nombre_usuario,
            apellido: profesor.apellido,
            src: this.profileImage(profesor.id_usuario),
            esProfesor: true,
            des_domicilio: profesor.des_domicilio,
            rating: { rating: profesor.rating, votos: profesor.votos },
            dondeClases: [],
            tipoClases: [],
            money: { id_moneda: profesor.id_moneda, des_moneda: profesor.des_moneda, monto: profesor.monto },
            materias: []
        }
    }
    createForo(foro) {
        var foroNuevo
        return foroNuevo = {
            id_foro: foro.id_foro,
            id_usuario: foro.id_usuario,
            nombre_usuario: foro.nombre_usuario,
            apellido: foro.apellido,
            nombre_foro: foro.nombre_foro,
            esProfesor: foro.esProfesor,
            esAnonimo: foro.esAnonimo,
            pregunta: foro.pregunta,
            tags: [],
            respuestasCant: foro.respuestasCant,
            fecha_alta: foro.fecha_alta,
            resuelto: foro.resuelto,
            respuestas: []
        }
    }
    createTag(id_tag, nombre_tag){
        var tag
        return tag = {
            id_tag: id_tag,
            nombre_tag: nombre_tag
        }
    }
    createTipoClases(id_tipoClases, des_tipoClases) {
        var tipoClasesNuevo
        return tipoClasesNuevo = {
            id_tipoClases: id_tipoClases,
            des_tipoClases: des_tipoClases
        }
    }
    createMaterias(id_meteria, nombre_materia) {
        var materiaNueva
        return materiaNueva = {
            id_meteria: id_meteria,
            nombre_materia: nombre_materia
        }
    }
    createDondeClases(id_dondeClases, des_dondeClases) {
        var dondeClasesNuevo
        return dondeClasesNuevo = {
            id_dondeClases: id_dondeClases,
            des_dondeClases: des_dondeClases
        }
    }
    profileImage(id) {

        switch (id) {

            case 1: return (require("../../assets/Profile/Brad.jpg"))

            case 2: return (require("../../assets/Profile/Leo.jpg"))

            case 3: return (require("../../assets/Profile/Johnny.jpg"))

            case 4: return (require("../../assets/Profile/Megan.jpg"))

            case 5: return (require("../../assets/Profile/Coral.jpg"))

            case 6: return (require("../../assets/Profile/Mark.jpg"))

            default: return (null)
        }
    }
}
export default new ExportadorObjetos();