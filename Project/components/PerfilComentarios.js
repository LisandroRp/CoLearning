import React, { Component } from 'react';
import { View, Image, StyleSheet, ActivityIndicator, Text, TextInput, Dimensions, Keyboard, TouchableOpacity, StatusBar, Modal, FlatList } from 'react-native';
import { SearchBar, Icon } from 'react-native-elements';
import { withNavigation } from 'react-navigation';
import { FontAwesome } from '@expo/vector-icons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import ExportadorLogos from './exportadores/ExportadorLogos'
import ApiController from '../controller/ApiController';
import ExportadorObjetos from './exportadores/ExportadorObjetos';
import * as Font from 'expo-font';

var { height, width } = Dimensions.get('window');

class UserCalendario extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            isLoadingFont: true,
            modalVisible: false,
            id_usuario: this.props.navigation.getParam("id_usuario"),
            max_rating: 5,
            nombre_usuario: "Pedro",
            newRating: 0,
            comentarios: [],
            esProfesor: true,
            comentario: ""
        };
        this.Star = ExportadorLogos.traerEstrellaLlena();
        this.Star_With_Border = ExportadorLogos.traerEstrellaBorde();
    }
    componentDidMount = async () => {
        //Traer el esProfesor de los usuarios de cada comentario para mandarlo e ir al perfil de los comentarios
        ApiController.getComentariosByIdProfesor((await this.props.navigation.getParam("id_usuario")) ? await this.props.navigation.getParam("id_usuario") : this.props.id_usuario, this.okComentarios.bind(this))
        this.loadFont()
        this.keyboardDidShow = Keyboard.addListener('keyboardDidShow', this.keyboardDidShow)
        this.keyboardWillShow = Keyboard.addListener('keyboardWillShow', this.keyboardWillShow)
        this.keyboardWillHide = Keyboard.addListener('keyboardWillHide', this.keyboardWillHide)
    }
    okComentarios(comentariosBase) {
        comentariosBase.map((item, index) => (comentariosBase[index].src = ExportadorObjetos.profileImage(item.id_usuarioOrigen)))
        this.setState({ comentarios: comentariosBase, isLoading: false })
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
    loadFont = async () => {
        await Font.loadAsync({
            'mainFont': require('../assets/fonts/LettersForLearners.ttf'),
        });
        this.setState({ isLoadingFont: false })
    }

    marginSize(index) {
        if (index != this.state.comentarios.length - 1) {
            return { marginBottom: hp(3), marginTop: hp(3) }
        } else {
            return { marginBottom: hp(3) }
        }
    }
    vote(i) {
        this.setState({ newRating: i })
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
    starsRowModal() {

        var rating2 = this.state.newRating
        var aux = -1
        let React_Native_Rating_Bar = [];
        for (var i = 1; i <= this.state.max_rating; i++) {
            aux++
            React_Native_Rating_Bar.push(
                <TouchableOpacity style={styles.starModalContainer}
                    activeOpacity={0.7}
                    key={i}
                    onPress={this.vote.bind(this, i)}>
                    {i <= rating2
                        ? (<Image style={styles.starImageModal} source={ExportadorLogos.traerEstrellaLlena()} />)
                        : rating2 > (aux)
                                        ? (<Image style={styles.starImageModal} source={ExportadorLogos.traerEstrellaHalf()} />)
                                        : (<Image style={styles.starImageModal} source={ExportadorLogos.traerEstrellaBorde()} />)
                        
                    }
                </TouchableOpacity>
            );
        }
        return React_Native_Rating_Bar
    }
    addComment()  {
        this.setState({ modalVisible: false, isLoading: true})
        //ApiController.yaComento(this.state.id_usuario, this.okYaVoto.bind(this))
        this.setState({ modalVisible: false })
    }
    okYaVoto(boolean){
        if(boolean){
            alert("Usted ya calificó a este profesor")
        }
        else{
            //ApiController.comentar(this.state.id_usuario, this.state.newRating, this.state.comentario, this.okComentario.bind(this))
        }
    }
    okComentario(){
        //ApiController.traerVotosRating(this.state.id_usuario, this.okTraerVotosRating.bind(this))
    }
    okTraerVotosRating(object){
        //ApiController.updateUsuarioRating(object.rating / object.votos, object.votos, this.okTraerVotosRating.bind(this))
    }
    okTraerVotosRating(){
        //ApiController.getComentariosByIdProfesor(this.state.id_usuario, this.okComentarios.bind(this))
    }
    render() {
        if (this.state.isLoading || this.state.isLoadingFont) {
            return (
                <View style={styles.container}>
                    <StatusBar barStyle="black" backgroundColor="white" />
                    <ActivityIndicator size="large" color="#F28C0F" backgroundColor=' #616161' style={{ flex: 1 }}></ActivityIndicator>
                </View>
            );
        }
        else {
            if (this.state.comentarios.length == 0) {
                return (
                    <View style={styles.noComentariosContainer}>
                        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                            <Image source={ExportadorLogos.traerLogoNaranja()} style={styles.fondoImage}></Image>
                            <Text style={[styles.noComentariosMensaje, { fontFamily: "mainFont" }]}>Este profesor no ha sido calificado</Text>
                        </View>
                        {
                            this.props.navigation.getParam("id_usuario") ?
                                <TouchableOpacity style={styles.bubble} onPress={() => this.setState({ modalVisible: true })}>
                                    <FontAwesome name={"plus"} size={hp(3.3)} color="white"></FontAwesome>
                                </TouchableOpacity>
                                :
                                <View />
                        }
                        {this.modalComentar()}
                    </View>
                )
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
                            renderItem={({ item, index }) => {
                                return (
                                    <View style={[this.marginSize(index), styles.card]}>
                                        <View style={{ flexDirection: "row" }} >
                                            <TouchableOpacity style={styles.imageContainer} onPress={() => this.props.onPressGoPerfil(item.id_usuarioOrigen, item.esProfesor)}>
                                                {item.src == null ?
                                                    <Text style={{ fontSize: wp(7.7), textAlign: "center", color: 'white', alignContent: 'center' }}>
                                                        {item.nombre_usuario.slice(0, 1).toUpperCase()}{item.apellido.slice(0, 1).toUpperCase()}
                                                    </Text>
                                                    :
                                                    <Image style={styles.image} source={item.src} />
                                                }
                                            </TouchableOpacity>
                                            <View style={{ flexDirection: "column", flex: 1 }} >
                                                <View style={styles.cardContent}>
                                                    <TouchableOpacity style={{ flex: 1 }} onPress={() => this.props.onPressGoPerfil(item.id_usuarioOrigen, item.esProfesor)}>
                                                        <Text numberOfLines={2} style={styles.cardTitulo}>{item.nombre_usuario} {item.apellido}</Text>
                                                    </TouchableOpacity>
                                                    <View style={[styles.statsBoxStar]}>
                                                        <View style={styles.starView}>{this.starsRow(item.rating_comentario)}</View>
                                                    </View>
                                                </View>
                                                <View style={{ flexDirection: "row" }}>
                                                    <Text style={styles.cardComentario}>{item.des_comentario}</Text>
                                                </View>
                                                <View>
                                                    <Text style={styles.cardDate}>{item.fecha_alta}</Text>
                                                </View>
                                            </View>
                                        </View>
                                    </View>
                                )
                            }
                            } />
                        {
                            this.props.navigation.getParam("id_usuario") ?
                                <TouchableOpacity style={styles.bubble} onPress={() => this.setState({ modalVisible: true })}>
                                    <FontAwesome name={"plus"} size={hp(3.3)} color="white"></FontAwesome>
                                </TouchableOpacity>
                                :
                                <View />
                        }
                        {this.modalComentar()}
                    </View>
                );
            }
        }
    }
    modalComentar = () =>
        <Modal
            animationType="fade"
            visible={this.state.modalVisible}
            transparent={true}
            onRequestClose={() => this.setState({ modalVisible: false })}  >
            <TouchableOpacity style={styles.modalContainer} activeOpacity={1} onPress={Keyboard.dismiss}>

                <View style={styles.modal}>
                    <View style={[styles.starContainerModal, styles.shadowContainerModal]}>
                        {this.starsRowModal(0)}
                    </View>
                    <TextInput style={[styles.inputDescripcion, styles.shadowContainerModal]}
                        value={this.state.comentario}
                        multiline={true}
                        maxLength={660}
                        placeholder="Comentario"
                        placeholderTextColor="grey"
                        underlineColorAndroid='transparent'
                        onChangeText={(text) => this.setState({ comentario: text })}
                    />
                    <View style={[{ flexDirection: "row", justifyContent: "center" }]}>
                        <TouchableOpacity style={[styles.buttonContainerLogin]}
                            onPress={() => this.setState({ modalVisible: false })}>
                            <Text style={styles.loginText}>Cancelar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.buttonContainerLogin]}
                            onPress={() => this.addComment()}>
                            <Text style={styles.loginText}>Agregar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </TouchableOpacity>
        </Modal>
};
const resizeMode = 'center';
const styles = StyleSheet.create({

    container: {
        backgroundColor: "#FFF7EE",
        flex: 1
    },
    noComentariosContainer: {
        backgroundColor: "#FFF7EE",
        justifyContent: "center",
        flex: 1
    },
    fondoImage: {
        width: wp(80),
        height: wp(30),
        resizeMode: 'contain',
    },
    noComentariosMensaje: {
        marginHorizontal: wp(5),
        textAlign: "center",
        fontSize: wp(8),
        color: '#F28C0F'
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
    imageContainer: {
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
    image: {
        flex: 1,
        height: undefined,
        width: undefined,
        borderRadius: 100
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
        fontSize: wp(3.2),
        color: "black",
        flex: 1,
        flexWrap: 'wrap'
    },
    cardDate: {
        textAlign: "right",
        fontSize: wp(3),
        color: "#F28C0F"
    },
    //Stars
    starView: {
        justifyContent: 'center',
        flexDirection: 'row',
    },
    starImage: {
        width: hp(2.5),
        height: hp(2.5),
    },
    statsBoxStar: {
        flex: 0.8,
        flexDirection: 'row',
        alignItems: "center",
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
    bubble: {
        backgroundColor: "#F28C0F",
        position: "absolute",
        bottom: 0,
        right: 0,
        width: hp(6.6),
        height: hp(6.6),
        marginRight: wp(5.5),
        marginBottom: hp(3),
        borderRadius: 100,
        alignItems: "center",
        justifyContent: "center",
        shadowColor: '#00000025',
        shadowOffset: {
            width: 0.01,
            height: 0.25,
        },
        shadowOpacity: 2,
        shadowRadius: 8,
        elevation: 2
    },
    /*************************************** */
    //MODAAAAL
    modalContainer: {
        flex: 1,
        justifyContent: "center",
    },
    modal: {
        flex: 1,
        marginTop: hp(20),
        marginBottom: hp(20),
        marginHorizontal: wp(10),
        padding: wp(5),
        backgroundColor: '#FFF7EE',
        borderRadius: 22,
        opacity: .95,
        shadowColor: '#00000035',
        shadowOffset: {
            width: 0.01,
            height: 0.25,
        },
        shadowOpacity: 2,
        shadowRadius: 8,
        elevation: 2
    },
    starModalContainer: {
        alignItems: "center",
        flex: 1
    },
    starContainerModal: {
        flex: 0.3,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        backgroundColor: '#FFFFFF',
    },
    starImageModal: {
        height: "66%",
        width: "66%"
    },
    inputDescripcion: {
        flex: 1.7,
        borderBottomColor: '#F5FCFF',
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        borderBottomWidth: 1,
        paddingTop: hp(2.2),
        paddingHorizontal: hp(2.2),
        textAlignVertical: "top",
        fontSize: wp(3.3),
        marginTop: hp(2.2),
        marginBottom: hp(2.2),
        flexDirection: 'column'
    },
    buttonContainerLogin: {
        height: 45,
        justifyContent: 'center',
        marginHorizontal: wp(5),
        alignItems: 'center',
        borderRadius: 10,
        paddingHorizontal: wp(3.3),
        backgroundColor: "#F28C0F"
    },
    loginText: {
        color: 'white'
    },
    shadowContainerModal: {
        shadowColor: "#808080",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5
    }
})
export default withNavigation(UserCalendario);