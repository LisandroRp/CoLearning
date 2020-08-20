import React, { Component } from 'react';
import { View, Image, StyleSheet, ActivityIndicator, Text, ScrollView, Dimensions, Keyboard, TouchableOpacity, StatusBar, ImageBackground, FlatList } from 'react-native';
import { SearchBar, Icon } from 'react-native-elements';
import { withNavigation } from 'react-navigation';
import { FontAwesome } from '@expo/vector-icons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import ExportadorLogos from './exportadores/ExportadorLogos'
import ExportadorCreadores from './exportadores/ExportadorCreadores'

var { height, width } = Dimensions.get('window');

class UserCalendario extends Component {

    constructor(props) {
        super(props);
        this.state = {
            perfil: {},
            rating: 0,
            max_rating: 5,
            isLoading: true,
            id_idioma: 0,
            tema: '',
            direccion: '',
            usuario: {
                id_usuario: 1,
                nombre_usuario: 'Leila',
                apellido: 'Arcolucci',
                src: require("../assets/leila.jpg"),
                esProfesor: true,
                domicilio: 'Spega Ñeri',
                dondeClases: [{ id_dondeClases: 1, des_dondeClases: "En su casa" },
                { id_dondeClases: 2, des_dondeClases: "A Domicilio" },
                { id_dondeClases: 3, des_dondeClases: "Instituto" }],
                tipoClases: [{ id_tipoClases: 1, des_tipoClases: "Particulares" },
                { id_tipoClases: 2, des_tipoClases: "Grupales" },
                { id_tipoClases: 3, des_tipoClases: "Virtuales" }],
                mail: 'lisandro@gmail.com',
                instagram: "@LisandroRp",
                whatsApp: "1144373492",
                telefono: '1112244455',
                materias: [{ nombre_materia: "Ingles", des_materia: "Doy clases de ingles nivel avanzado perri" },
                { nombre_materia: "Perreo", des_materia: "Enseño perrear hasta el piso" }],
                latitud: 123,
                longitud: 123
            }
        };
        this.Star = ExportadorLogos.traerEstrellaLlena();
        this.Star_With_Border = ExportadorLogos.traerEstrellaBorde();
    }
    componentDidMount() {
        this.keyboardDidShow = Keyboard.addListener('keyboardDidShow', this.keyboardDidShow)
        this.keyboardWillShow = Keyboard.addListener('keyboardWillShow', this.keyboardWillShow)
        this.keyboardWillHide = Keyboard.addListener('keyboardWillHide', this.keyboardWillHide)
    }

    keyboardDidShow = () => {
        this.setState({ searchBarFocused: true })
    }
    keyboardWillShow = () => {
        this.setState({ searchBarFocused: true })
    }
    keyboardWillHide = () => {
        this.setState({ searchBarFocused: false })
    }


    render() {
        if (this.state.isLoading) {
            return (
                <View style={styles.container}>
                    <StatusBar barStyle="black" backgroundColor="white" />
                    <ActivityIndicator size="large" color="#F28C0F" backgroundColor=' #616161' style={{ flex: 1 }}></ActivityIndicator>
                </View>
            );
        }
        else {
            return (
                <View style={styles.container}>
                    {this.state.usuario.mail ?
                        <View style={styles.socialMediaContainer}>
                            <Image style={styles.logoSocialMedia} source={ExportadorLogos.traerMail()} />
                            <Text style={styles.socialMedia}>{this.state.usuario.mail}</Text>
                        </View>
                        : <View />}

                    {this.state.usuario.instagram ?
                        <View style={styles.socialMediaContainer}>
                            <Image style={styles.logoSocialMedia} source={ExportadorLogos.traerInstagram()} />
                            <Text style={styles.socialMedia} onPress={() => Linking.openURL(ExportadorCreadores.queLinkInstagram() + this.state.usuario.instagram)}>{this.state.rutina.instagram}</Text>
                        </View>
                        : <View />}

                    {this.state.usuario.whatsApp ?
                        <View style={styles.socialMediaContainer}>
                            <Image style={styles.logoSocialMedia} source={ExportadorLogos.traerWpp()} />
                            <Text style={styles.socialMedia}>{this.state.usuario.whatsApp}</Text>
                        </View>
                        : <View />}

                    {this.state.usuario.telefono ?
                        <View style={styles.socialMediaContainer}>
                            <Image style={styles.logoSocialMedia} source={ExportadorLogos.traerInstagram()} />
                            <Text style={styles.socialMedia}>{this.state.usuario.telefono}</Text>
                        </View>
                        : <View />}
                </View>
            );
        }
    }
};
const resizeMode = 'center';
const styles = StyleSheet.create({

    container: {
        backgroundColor: "#FFF7EE",
        flex: 1
    },

    socialMedia:{
        color: "white",
        textDecorationLine: 'underline',
      },
    
      logoSocialMedia:{
        height: height * 0.044,
        width: height * 0.044,
        alignSelf: "center",
        marginRight: width * 0.033
      },
      socialMediaContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: height * 0.02
      },

})
export default withNavigation(UserCalendario);