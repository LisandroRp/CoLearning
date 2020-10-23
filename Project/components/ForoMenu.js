import React, { Component } from 'react';
import { View, Image, StyleSheet, ActivityIndicator, Text, ScrollView, Dimensions, Keyboard, TouchableOpacity, StatusBar, ImageBackground, FlatList } from 'react-native';
import { SearchBar, Icon } from 'react-native-elements';
import { withNavigation } from 'react-navigation';
import Carousel from 'react-native-snap-carousel';
import { FontAwesome } from '@expo/vector-icons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import ExportadorLogos from './exportadores/ExportadorLogos'
import ApiController from '../controller/ApiController';

var { height, width } = Dimensions.get('window');

class ForoMenu extends Component {

    constructor(props) {
        super(props);
        this.state = {
            tema: "",
            forosPopulares: [{ id_foro: 2, nombre_foro: 'Programacion Avanzada', pregunta: 'Como hacer una imagen se ajuste a un View??', id_usuario: 1, nombre_usuario: "Leila Pereyra", esProfesor: false, respuestas: 114, rating: 5, fecha_alta: "24 de Junio", tags: [{ id_tag: 1, nombre_tag: "React Native" }, { id_tag: 2, nombre_tag: "Programming" }] },
            { id_foro: 1, nombre_foro: 'Duda Existencial', pregunta: 'Como hacer para estudiar para Investigacion Operativa??', id_usuario: 1, nombre_usuario: "Juan Marinelli", esProfesor: true, respuestas: 114, rating: 5, fecha_alta: "24 de Junio", tags: [{ id_tag: 1, nombre_tag: "Investigacion Operativa" }] }]  
        };
        this.Star = ExportadorLogos.traerEstrellaLlena();
        this.Star_With_Border = ExportadorLogos.traerEstrellaBorde();
    }
    componentDidMount() {
        //ApiController.getForosPopulares(this.okForosPopulares.bind(this))
        this.keyboardDidShow = Keyboard.addListener('keyboardDidShow', this.keyboardDidShow)
        this.keyboardWillShow = Keyboard.addListener('keyboardWillShow', this.keyboardWillShow)
        this.keyboardWillHide = Keyboard.addListener('keyboardWillHide', this.keyboardWillHide)
    }

    okForosPopulares(forosPopulares){
        this.setState({forosPopulares: forosPopulares})
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
    buscarForo(){
        if(!this.state.tema.trim()){
            alert("Debe proporcionar un tema")
        }
        else
        {
            this.props.onPressSearch(this.state.tema)
        }
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
                    <View style={styles.searchContainer}>
                    <SearchBar
                            placeholder="Tema"
                            platform='ios'
                            onChangeText={value => this.setState({tema: value})}
                            value={this.state.tema}
                            inputContainerStyle={[styles.searchShadow, {height: hp(5)}]}
                            placeholderTextColor='rgba(0, 0, 0, 0.3)'
                            containerStyle={styles.searchBar}
                            cancelButtonProps={{buttonTextStyle: {color: '#F28C0F'}}}
                            buttonStyle={{}}
                            searchIcon={{ color: 'rgba(0, 0, 0, 0.3)' }}
                        />

                        <TouchableOpacity style={styles.buscarButton} onPress={() => { this.buscarForo() }}>
                            <Text style={styles.screenButtonText}>
                                Buscar Foro
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <Carousel
                        ref={(c) => { this._carousel = c; }}
                        data={this.state.forosPopulares}
                        containerCustomStyle={styles.carousel}
                        contentContainerCustomStyle={{ alignItems: 'center' }}
                        renderItem={this.renderCarouselItem}
                        sliderWidth={Dimensions.get('window').width}
                        key={(item) => {item.id_foro.toString()}}
                        itemWidth={wp(77)}
                        removeClippedSubviews={false}
                        initialScrollIndex={0}
                    />
                </View>
            );
        }
    }
    renderCarouselItem = ({ item, index }) =>
        <TouchableOpacity
            onPress={() => this.props.onPressGoForo(item.id_foro, item.nombre_foro, item.pregunta)}
            key={item.id}>
            <View
                style={styles.cardContainer}
            >   
                <View>
                    <Text style={styles.cardTitulo} numberOfLines= {5}>{item.pregunta}</Text>
                </View>
                <View style={[{flex: 0.8, flexDirection: 'row', paddingTop: hp(1), flexWrap: "wrap"}]}>
                    {(item.tags).map((item) => (
                        <View style={styles.tagsContainer}>
                            <Text style={[styles.textTags]}>{item.nombre_tag}</Text>
                        </View>
                    ))}


                </View>
                <View style={[{ flex: 0.2, justifyContent: "flex-end"}]}>
                    <Text style={styles.cardSubTitulo}>Respuestas: {item.respuestas}</Text>
                    <View style={[{ flexDirection: 'row', flexWrap: "wrap" }]}>
                        <Text style={styles.cardSubTitulo}>Preguntado el {item.fecha_alta} por </Text>
                        <Text style={styles.cardSubTituloUsuario} numberOfLines={1} onPress={() => this.props.onPressGoUsuario(item.id_usuario, item.nombre_usuario, item.esProfesor)}>{item.nombre_usuario}</Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
};
const resizeMode = 'center';
const styles = StyleSheet.create({

    container: {
        backgroundColor: '#FFF7EE',
        flex: 1,
    },

    searchContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: hp(5),
        flex:0.75
    },
    searchBar: {
        backgroundColor: "#FFF7EE",
        width: wp(90),
        paddingHorizontal: wp(2)
    },
    searchShadow: {
        backgroundColor: 'white',
        shadowColor: 'grey',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.37,
        shadowRadius: 7.49,
        elevation: 12,
    },
    //CAROUSEL
    carousel: {
        flex:1.25
        //backgroundColor:'red'
    },
    cardContainer: {
        padding: 15,
        height: hp(40),
        width: wp(77),
        backgroundColor: 'white',
        borderRadius: 22,
        shadowColor: '#00000025',
        shadowOffset: {
            width: 3,
            height: 5,
        },
        shadowOpacity: 2,
        shadowRadius: 8,
        elevation: 55
    },
    cardTitulo: {
        fontSize: wp(5),
        color: '#F28C0F',
        fontWeight: 'bold',
    },

    cardSubTitulo: {
        marginTop: 1,
        fontSize: wp(3),
        color: "black"
    },
    cardSubTituloUsuario: {
        marginTop: 1,
        fontSize: wp(3.3),
        color: '#F28C0F',
        fontWeight: 'bold'
    },
    //TAGS
    tagsContainer: {
        padding: hp(0.66),
        margin: hp(0.5),
        backgroundColor: '#FFDEB9',
        alignItems: "center",
        borderRadius: 10
    },
    textTags: {
        fontSize: wp(3),
        color: 'black',
    },
    //CAROUSEL
    //Boton

    buscarButton: {
        backgroundColor: '#F28C0F',
        paddingVertical: hp(1.5),
        borderRadius: 10,
        alignItems: 'center',
        paddingHorizontal: 10,
        marginHorizontal: height * 0.025,
        marginVertical: height * 0.025,
        alignSelf: 'center',
        opacity: .95
    },
    screenButtonText: {
        color: 'white',
        fontSize: wp(4.4)
    }

})
export default withNavigation(ForoMenu);