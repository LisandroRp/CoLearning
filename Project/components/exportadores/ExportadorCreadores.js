import { Component } from 'react';
import { withNavigation } from 'react-navigation';


class ExportadorCreadores extends Component {

    queLink(id_creador){
        switch (id_creador) {

            case 1:

                return "https://www.instagram.com/morganfitnesspartner/"

            case 2:

                return "https://www.instagram.com/invafitness/"
        }
    }
    queLinkInstagram(){
                return "https://www.instagram.com/"
    }
}
export default new ExportadorCreadores();