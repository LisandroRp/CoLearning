import { Component } from 'react';


class ExportadorLogos extends Component {

    traerFavoritos(favorito) {
        if (favorito) {
            return require('../../contenido/logos/Star_Llena.png')
        } else {
            return require('../../contenido/logos/Star_Borde.png')
        }
    }
    //Estrellas
    traerEstrellaLlena() {
            return require('../../contenido/logos/Star_Llena.png')
    }
    traerEstrellaBorde() {
        return require('../../contenido/logos/Star_Borde.png')
    }
    //Estrellas
    //Logos App
    traerLogoNaranja(){
        return require('../../assets/Logo-Naranja.png')
    }
    traerLogoBlanco(){
        return require('../../assets/Logo-Blanco.png')
    }
    traerClNaranja(){
        return require('../../assets/CL-Naranja.png')
    }
    traerClBlanco(){
        return require('../../assets/CL-Blanco.png')
    }
    //Logos App
    //Social Media
    traerInstagram(){
        return require('../../contenido/logos/Instagram.png')
    }
    traerWpp(){
        return require('../../contenido/logos/WhatsApp.png')
    }
    traerMail(){
        //return require('../../contenido/logos/Mail.png')
    }
}
export default new ExportadorLogos();