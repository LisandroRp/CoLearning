import React, { Component } from 'react';
import { View, Image, StyleSheet, ActivityIndicator, Text, ScrollView, Dimensions, Keyboard, TouchableOpacity, StatusBar, ImageBackground, FlatList } from 'react-native';
import { SearchBar, Icon } from 'react-native-elements';
import { withNavigation } from 'react-navigation';
import Carousel from 'react-native-snap-carousel';
import { FontAwesome } from '@expo/vector-icons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import ExportadorLogos from './exportadores/ExportadorLogos'

var { height, width } = Dimensions.get('window');

class ForoMenu extends Component {

    constructor(props) {
        super(props);
        this.state = {
            perfil: {},
            isLoading: false,
            id_idioma: 0,
            rating: 0,
            max_rating: 5,
            tema: '',
            direccion: '',
            foros: [
                { id_foro: 1, nombre_foro: 'Duda Existencial', pregunta: 'Como hacer para estudiar para Investigacion Operativa??', id_usuario: 1, nombre_usuario: "Lorenzo Coco", profesor: true, respuestas: 114, rating: 5, fecha_inicio: "24 de Junio", tags: [{ id_tag: 1, nombre_tag: "React Native" }, { id_tag: 2, nombre_tag: "Programming" }] },
                { id_foro: 2, nombre_foro: 'Programacion Avanzada', pregunta: 'Como hacer para estudiar para Investigacion Operativa??', id_usuario: 1, nombre_usuario: "Lorenzo Coco", profesor: true, respuestas: 114, rating: 5, fecha_inicio: "24 de Junio", tags: [{ id_tag: 1, nombre_tag: "React Native" }, { id_tag: 2, nombre_tag: "Programming" }] },
                { id_foro: 3, nombre_foro: 'Programacion Avanzada', pregunta: 'Como hacer para estudiar para Investigacion Operativa??', id_usuario: 1, nombre_usuario: "Lorenzo Coco", profesor: true, respuestas: 114, rating: 5, fecha_inicio: "24 de Junio", tags: [{ id_tag: 1, nombre_tag: "React Native" }, { id_tag: 2, nombre_tag: "Programming" }] },
                { id_foro: 4, nombre_foro: 'Programacion Avanzada', pregunta: 'Como hacer para estudiar para Investigacion Operativa??', id_usuario: 1, nombre_usuario: "Lorenzo Coco", profesor: true, respuestas: 114, rating: 5, fecha_inicio: "24 de Junio", tags: [{ id_tag: 1, nombre_tag: "React Native" }, { id_tag: 2, nombre_tag: "Programming" }] },
                { id_foro: 5, nombre_foro: 'Programacion Avanzada', pregunta: 'Como hacer para estudiar para Investigacion Operativa??', id_usuario: 1, nombre_usuario: "Lorenzo Coco", profesor: true, respuestas: 114, rating: 5, fecha_inicio: "24 de Junio", tags: [{ id_tag: 1, nombre_tag: "React Native" }, { id_tag: 2, nombre_tag: "Programming" }] }
            ]
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
    vote(i) {
        this.setState({ rating: i })
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
                            value={this.state.tema}
                            inputContainerStyle={styles.searchShadow}
                            placeholderTextColor='rgba(0, 0, 0, 0.3)'
                            containerStyle={styles.searchBar}
                            cancelButtonProps={{buttonTextStyle: {color: '#F28C0F'}}}
                            buttonStyle={{}}
                            searchIcon={{ color: 'rgba(0, 0, 0, 0.3)' }}
                        />

                        <TouchableOpacity style={styles.buscarButton} onPress={() => { this.props.onPressSearch() }}>
                            <Text style={styles.screenButtonText}>
                                Buscar Foro
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <Carousel
                        ref={(c) => { this._carousel = c; }}
                        data={this.state.foros}
                        containerCustomStyle={styles.carousel}
                        contentContainerCustomStyle={{ alignItems: 'center' }}
                        renderItem={this.renderCarouselItem}
                        sliderWidth={Dimensions.get('window').width}
                        itemWidth={wp(77)}
                        removeClippedSubviews={false}
                        initialScrollIndex={0}
                    //onSnapToItem={(index) => this.onCarouselItemChange(index)}
                    />
                </View>
            );
        }
    }
    renderCarouselItem = ({ item, index }) =>
        <TouchableOpacity
            onPress={() => this.props.onPressGoForo(item.id_foro, item.nombre_foro)}
            key={item.id}>
            <View
                style={styles.cardContainer}
            >
                <Text style={styles.cardTitulo}>{item.pregunta}</Text>

                <View style={[{ flexDirection: 'row'}]}>
                    {(item.tags).map((item) => (
                        <View style={styles.tagsContainer}>
                            <Text style={[styles.textTags]}>{item.nombre_tag}</Text>
                        </View>
                    ))}


                </View>
                <View style={[{ position: 'absolute', bottom: 0, margin: 10 }]}>
                    <Text style={styles.cardSubTitulo}>Respuestas: {item.respuestas}</Text>
                    <View style={[{ flexDirection: 'row' }]}>
                        <Text style={styles.cardSubTitulo}>Preguntado el {item.fecha_inicio} por </Text>
                        <Text style={styles.cardSubTituloUsuario} onPress={() => this.props.onPressGoUsuario(item.id_usuario, item.nombre_usuario, item.profesor)}>{item.nombre_usuario}</Text>
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
        marginHorizontal: wp(10)
    },
    searchShadow: {
        backgroundColor: 'white',
        shadowColor: '#00000045',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.37,
        shadowRadius: 7.49,
        elevation: 12,
    },
    ContainerInside: {
        backgroundColor: "black",
        marginTop: hp(5),
        padding: height * 0.04,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: 'center',
        height: height * 0.33,
        width: width * 0.88
    },
    ContainerInside: {
        backgroundColor: "black",
        marginTop: hp(5),
        padding: height * 0.04,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: 'center',
        height: height * 0.33,
        width: width * 0.88
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
        marginBottom: 8,
    },

    cardSubTitulo: {
        marginTop: 1,
        fontSize: height * 0.015,
        color: "black"
    },
    cardSubTituloUsuario: {
        marginTop: 1,
        fontSize: height * 0.0166,
        color: '#F28C0F',
        fontWeight: 'bold'
    },
    //TAGS
    tagsContainer: {
        padding: 5,
        marginRight: 5,
        marginBottom: 5,
        backgroundColor: '#FFDEB9',
        alignItems: "center",
        borderRadius: 10
    },
    textTags: {
        marginTop: 1,
        fontSize: wp(3),
        color: 'black',
    },
    //CAROUSEL
    //Boton

    buscarButton: {
        backgroundColor: '#F28C0F',
        borderRadius: 10,
        alignItems: 'center',
        width: width * 0.33,
        marginHorizontal: height * 0.025,
        marginVertical: height * 0.025,
        alignSelf: 'center',
        opacity: .95
    },
    screenButtonText: {
        marginVertical: height * 0.02,
        color: 'white',
        fontSize: height * 0.025
    }

})
export default withNavigation(ForoMenu);