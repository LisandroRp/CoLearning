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
            isLoading: true,
            comentarios: [{
                id_comentario: 1,
                id_usuarioOrigen: 1,
                id_usuarioDestino: 2,
                rating: 3,
                fecha_alta: "2020-08-14",
                des_comentario: "Terrible Gato"
            }]
        };
        this.Star = ExportadorLogos.traerEstrellaLlena();
        this.Star_With_Border = ExportadorLogos.traerEstrellaBorde();
    }
    componentDidMount = async () => {
        //ApiController.getComentariosByIdProfesor(await this.props.navigation.getParam("id_usuario"), this.okComentarios.bind(this))
        this.keyboardDidShow = Keyboard.addListener('keyboardDidShow', this.keyboardDidShow)
        this.keyboardWillShow = Keyboard.addListener('keyboardWillShow', this.keyboardWillShow)
        this.keyboardWillHide = Keyboard.addListener('keyboardWillHide', this.keyboardWillHide)
    }
    okComentarios(comentariosBase){
        this.setState({comentarios: comentariosBase})
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

    vote(i) {
        this.setState({ rating: i })
    }

    render() {
        var rating2 = this.state.rating
        let React_Native_Rating_Bar = [];
        for (var i = 1; i <= this.state.max_rating; i++) {
            React_Native_Rating_Bar.push(
                <TouchableOpacity
                    activeOpacity={0.7}
                    key={i}
                    onPress={this.vote.bind(this, i)}
                >
                    <FontAwesome name={i <= rating2
                        ? 'heart'
                        : 'heart-o'} style={styles.heartImage} size={hp(5)} />
                </TouchableOpacity>
            );
        }
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
                        keyExtractor={(item) => {
                            return item.id_curso.toString();
                        }}
                        renderItem={({ item }) => {
                            return (
                                <View>
                                    <TouchableOpacity style={[this.marginSize(item), styles.card]} onPress={() => this.props.onPressGo(item.id_curso, item.nombre_curso, item.institucion, item.direccion)}>
                                        <View style={{ flexDirection: "row" }} >
                                            <Image style={styles.image} source={require("../assets/icon.png")} />
                                            <View style={styles.cardContent}>
                                                <Text style={styles.cardTitulo}>{item.nombre_curso}</Text>
                                            </View>
                                            <View style={styles.starView} >
                                                {/* <Image style={styles.StarImage} source={require("../Contenido/Logos/Star_Llena.png")} /> */}
                                                <Image style={styles.starImage} source={ExportadorLogos.traerEstrellaLlena()} />
                                                <Text style={styles.rating}>{item.rating + "/5"}</Text>
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
    contentList: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        padding: 2,
        alignSelf: 'center'
    },
    image: {
        width: wp(49),
        height: hp(24.5),
        margin: 1,
        borderWidth: 1.5,
        borderColor: 'black',
        resizeMode: 'stretch',
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
        overflow: 'hidden'
    },
    //Star View
    heartView: {
        justifyContent: 'center',
        flexDirection: 'row',
        marginTop: hp(1.5),
        marginBottom: hp(1)
    },
    heartImage: {
        color: "#f66"
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