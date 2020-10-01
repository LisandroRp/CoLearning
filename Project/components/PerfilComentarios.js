import React, { Component } from 'react';
import { View, Image, StyleSheet, ActivityIndicator, Text, ScrollView, Dimensions, Keyboard, TouchableOpacity, StatusBar, ImageBackground, FlatList } from 'react-native';
import { SearchBar, Icon } from 'react-native-elements';
import { withNavigation } from 'react-navigation';
import { FontAwesome } from '@expo/vector-icons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import ExportadorLogos from './exportadores/ExportadorLogos'
import ApiController from '../controller/ApiController';

var { height, width } = Dimensions.get('window');

class UserCalendario extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            max_rating: 5,
            nombre_usuario: "Pedro",
            comentarios: [{
                id_comentario: 1,
                id_usuarioOrigen: "Maria Belen",
                id_usuarioDestino: 2,
                rating: 3,
                fecha_alta: "2020-08-14",
                des_comentario: "Terrible GatTerrible Gato el profe,no me responde nunca, siempre me clava visto, solo quiero aprovbar la puta madreo el profe,no me responde nunca, siempre me clava visto, solo quiero aprovbar la puta madre"
            }],
            esProfesor: true
        };
        this.Star = ExportadorLogos.traerEstrellaLlena();
        this.Star_With_Border = ExportadorLogos.traerEstrellaBorde();
    }
    componentDidMount = async () => {
        //Traer el esProfesor de los usuarios de cada comentario para mandarlo e ir al perfil de los comentarios
        //ApiController.getComentariosByIdProfesor(await this.props.navigation.getParam("id_usuario"), this.okComentarios.bind(this))
        this.keyboardDidShow = Keyboard.addListener('keyboardDidShow', this.keyboardDidShow)
        this.keyboardWillShow = Keyboard.addListener('keyboardWillShow', this.keyboardWillShow)
        this.keyboardWillHide = Keyboard.addListener('keyboardWillHide', this.keyboardWillHide)
    }
    okComentarios(comentariosBase) {
        this.setState({ comentarios: comentariosBase })
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

    marginSize(index) {
        if (index != this.state.comentarios.length - 1) {
            return { marginBottom: hp(3), marginTop: hp(3) }
        } else {
            return { marginBottom: hp(3) }
        }
    }
    
    starsRow(comentario_rating) {

        var rating2 = comentario_rating
        let React_Native_Rating_Bar = [];
        for (var i = 1; i <= this.state.max_rating; i++) {
            React_Native_Rating_Bar.push(
                <View
                    activeOpacity={0.7}
                    key={i}
                >
                    {i <= rating2
                        ? <Image style={styles.starImage} source={ExportadorLogos.traerEstrellaLlena()}></Image>
                        : <Image style={styles.starImage} source={ExportadorLogos.traerEstrellaBorde()}></Image>
                    }
                    {/* <FontAwesome name={i <= rating2
                        ? 'star'
                        : 'star'} style={styles.heartImage} size={hp(4)} /> */}
                </View>
            );
        }
        return React_Native_Rating_Bar
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
                    <FlatList
                        style={styles.contentList}
                        columnWrapperStyle={styles.listContainer}
                        data={this.state.comentarios}
                        initialNumToRender={50}
                        keyExtractor={(item, index) => {
                            return index.toString();
                        }}
                        renderItem={({ item }) => {
                            return (
                                <View>
                                    <TouchableOpacity style={[this.marginSize(item), styles.card]} onPress={() => this.props.onPressGoPerfil(item.id_usuarioOrigen, this.state.esProfesor)}>
                                        <View style={{ flexDirection: "row" }} >
                                            {/* <Image style={styles.image} source={require("../assets/icon.png")} /> */}
                                            <View style={styles.image}>
                                                <Text style={{ fontSize: hp(5), textAlign: "center", color: 'white', alignContent: 'center' }}>
                                                    {item.id_usuarioOrigen.slice(0, 1).toUpperCase()}
                                                </Text>
                                            </View>
                                            <View style={{ flexDirection: "column", flex: 1 }} >
                                                <View style={styles.cardContent}>
                                                    <Text style={styles.cardTitulo}>{item.id_usuarioOrigen}</Text>
                                                    <View style={[styles.statsBoxStar]}>
                                                        <View style={styles.starView}>{this.starsRow(item.rating)}</View>
                                                    </View>
                                                </View>
                                                <View style={{ flexDirection: "row"}}>
                                                    <Text style={styles.cardComentario}>{item.des_comentario}</Text>
                                                </View>
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            )
                        }
                        } />
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

    //FlatList
    card: {
        shadowColor: '#00000055',
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 0.37,
        shadowRadius: 7.49,
        elevation: 12,

        marginLeft: height * 0.028,
        marginRight: height * 0.028,
        borderRadius: 10,
        backgroundColor: "white",
        padding: 10,
        flexDirection: 'column',

    },
    image: {
        width: hp("8"),
        height: hp("8"),
        borderWidth: 2,
        borderColor: "#ebf0f7",
        borderRadius: 100,
        margin: 5,
        marginRight: 5,
        justifyContent: 'center',
        alignSelf: "flex-start",
        backgroundColor: "#F28C0F"
    },
    cardContent: {
        flex: 1,
        paddingRight: 5,
        justifyContent: 'flex-start',
        flexDirection: "row",
    },
    cardTitulo: {
        fontSize: wp(4.4),
        color: '#F28C0F',
        fontWeight: 'bold',
        marginHorizontal: wp(2),
        marginTop: hp(1)
    },

    cardComentario: {
        margin: wp(2),
        fontSize: height * 0.015,
        color: "black",
        flex: 1,
        flexWrap: 'wrap'
    },
    cardSubTituloUsuario: {
        marginTop: 1,
        fontSize: height * 0.0166,
        color: '#F28C0F',
        fontWeight: 'bold'
    },
    //Stars
    starView: {
        justifyContent: 'center',
        flexDirection: 'row',
        marginTop: hp(1)
    },
    starImage: {
        width: hp(2.5),
        height: hp(2.5),
    },
    statsBoxStar: {
        flex:1,
        marginLeft: wp(3),
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    //Boton

    buscarButton: {
        backgroundColor: 'white',
        borderRadius: 10,
        borderColor: 'black',
        borderWidth: 1,
        alignItems: 'center',
        width: width * 0.33,
        marginHorizontal: height * 0.025,
        marginVertical: height * 0.025,
        alignSelf: 'center',
        opacity: .95
    },
    screenButtonText: {
        marginVertical: height * 0.02,
        fontWeight: 'bold',
        fontSize: height * 0.025
    },

})
export default withNavigation(UserCalendario);