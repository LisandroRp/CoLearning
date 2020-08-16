import { Component } from 'react';


class ExportadorLogos extends Component {

    traerFavoritos(favorito) {
        if (favorito) {
            return require('../../contenido/logos/Star_Llena.png')
        } else {
            return require('../../contenido/logos/Star_Borde.png')
        }
    }
    traerEstrellaLlena() {
            return require('../../contenido/logos/Star_Llena.png')
    }
    traerEstrellaBorde() {
        return require('../../contenido/logos/Star_Borde.png')
    }
}
export default new ExportadorLogos();