import React, { Component } from 'react';
import { View, Image, StyleSheet, ActivityIndicator, FlatList, Modal, TextInput, TouchableOpacity, StatusBar, TouchableWithoutFeedback, Text, Keyboard, Dimensions } from 'react-native';
import { SearchBar, Icon } from 'react-native-elements';
import { FontAwesome } from '@expo/vector-icons';
import { withNavigation } from 'react-navigation';

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import ApiController from '../controller/ApiController';

var { height, width } = Dimensions.get('window');

class Foros extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            modalVisible: false,
            foros: [
                { id_foro: 1, nombre_foro: 'Como cambiarle el color al titulo React Native', pregunta: 'Como cambiarle el color al titulo React Native?', id_usuario: 1, nombre_usuario: "Juan Marinelli", profesor: true, respuestas: 114, rating: 5, fecha_inicio: "24 de Junio", tags: [{ id_tag: 1, nombre_tag: "React Native" }, { id_tag: 2, nombre_tag: "Programming" }] },
                { id_foro: 2, nombre_foro: 'Consejos para leer mas rápido', pregunta: 'Consejos para leer mas rápido', id_usuario: 1, nombre_usuario: "Juan Marinelli", profesor: true, respuestas: 114, rating: 5, fecha_inicio: "24 de Junio", tags: [{ id_tag: 1, nombre_tag: "Leer" }, { id_tag: 2, nombre_tag: "Consejo" }] },
                { id_foro: 3, nombre_foro: 'Resolvér Ecuacion', pregunta: 'Como resolvér esta ecuacion x^2+X-5?', id_usuario: 1, nombre_usuario: "Juan Marinelli", profesor: true, respuestas: 114, rating: 5, fecha_inicio: "24 de Junio", tags: [{ id_tag: 1, nombre_tag: "Matematica" }, { id_tag: 2, nombre_tag: "Ecuaciones" }] }
            ],
            memory: [
                { id_foro: 1, nombre_foro: 'Como cambiarle el color al titulo React Native', pregunta: 'Como cambiarle el color al titulo React Native?', id_usuario: 1, nombre_usuario: "Juan Marinelli", profesor: true, respuestas: 114, rating: 5, fecha_inicio: "24 de Junio", tags: [{ id_tag: 1, nombre_tag: "React Native" }, { id_tag: 2, nombre_tag: "Programming" }] },
                { id_foro: 2, nombre_foro: 'Consejos para leer mas rápido', pregunta: 'Consejos para leer mas rápido', id_usuario: 1, nombre_usuario: "Juan Marinelli", profesor: true, respuestas: 114, rating: 5, fecha_inicio: "24 de Junio", tags: [{ id_tag: 1, nombre_tag: "Leer" }, { id_tag: 2, nombre_tag: "Consejo" }] },
                { id_foro: 3, nombre_foro: 'Resolvér Ecuacion', pregunta: 'Como resolvér esta ecuacion x^2+X-5?', id_usuario: 1, nombre_usuario: "Juan Marinelli", profesor: true, respuestas: 114, rating: 5, fecha_inicio: "24 de Junio", tags: [{ id_tag: 1, nombre_tag: "Matematica" }, { id_tag: 2, nombre_tag: "Ecuaciones" }] }
            ]
        };
    }
    componentDidMount = async () => {
        //ApiController.getForos(await this.props.navigation.getParam("tema"), this.okForos.bind(this))
        this.keyboardDidShow = Keyboard.addListener('keyboardDidShow', this.keyboardDidShow)
        this.keyboardWillShow = Keyboard.addListener('keyboardWillShow', this.keyboardWillShow)
        this.keyboardWillHide = Keyboard.addListener('keyboardWillHide', this.keyboardWillHide)
    }
    okForos(foros){
        this.setState({foros: foros, isLoading: false})
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

    marginSize(item) {
        if (item.id_foro != this.state.foros[this.state.foros.length - 1].id_foro) {

            return { marginTop: height * 0.028 }
        } else {
            return { marginBottom: height * 0.028, marginTop: height * 0.028 }
        }
    }

    searchForos = value => {
        const filterDeForos = this.state.memory.filter(foros => {
            let forosLowercase = (
                foros.nombre_foro +
                ' ' +
                foros.nombre_usuario +
                ' ' +
                foros.pregunta +
                ' ' +
                foros.tags
            ).toLowerCase();

            let searchTermLowercase = value.toLowerCase();

            return forosLowercase.indexOf(searchTermLowercase) > -1;
        });
        this.setState({ profesores: filterDeForos });
        this.setState({ value })
    };

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
                    <StatusBar barStyle="black" backgroundColor="white" />
                    <View style={{backgroundColor: '#F28C0F'}}>
                    <SearchBar
                            placeholder= "Buscar..."
                            platform='ios'
                            onChangeText={value => this.searchForos(value)}
                            value={this.state.value}
                            inputContainerStyle={{ backgroundColor: '#FFF7EE', height: hp(5)}}
                            placeholderTextColor='rgba(0, 0, 0, 0.3)'
                            cancelButtonProps={{buttonTextStyle: {color: 'white', paddingTop: 0}}}
                            containerStyle={{ backgroundColor: '#F28C0F', paddingTop: 0, marginHorizontal: wp(3.3)}}
                            buttonStyle={{}}
                            searchIcon={{ color: 'rgba(0, 0, 0, 0.3)' }}
                        />
                    </View>
                    <FlatList
                        style={styles.contentList}
                        columnWrapperStyle={styles.listContainer}
                        data={this.state.foros.sort((a, b) => a.nombre_foro.localeCompare(b.nombre_foro))}
                        initialNumToRender={50}
                        keyExtractor={(item) => {
                            return item.id_foro.toString();
                        }}
                        renderItem={({ item }) => {
                            return (
                                <View>
                                    <TouchableOpacity style={[this.marginSize(item), styles.card]} onPress={() => this.props.onPressGoForo(item.id_foro, item.nombre_foro)}>
                                        <View style={{ flexDirection: "row" }} >

                                            <View style={styles.cardContent}>
                                                <Text numberOfLines={2} style={styles.cardTitulo}>{item.pregunta}</Text>

                                                <View style={[{ flexDirection: 'row', marginBottom: hp(1.5)}]}>
                                                    {(item.tags).map((item) => (
                                                        <View style={styles.tagsContainer}>
                                                            <Text numberOfLines={1} style={[styles.textTags]}>{item.nombre_tag}</Text>
                                                        </View>
                                                    ))}


                                                </View>
                                                <Text style={styles.cardSubTitulo}>Respuestas: {item.respuestas}</Text>
                                                <View style={[{ flexDirection: 'row' }]}>
                                                    <Text style={styles.cardSubTitulo}>Preguntado el {item.fecha_inicio} por </Text>
                                                    <Text style={styles.cardSubTituloUsuario} onPress={() => this.props.onPressGoUsuario(item.id_usuario, item.nombre_usuario, item.profesor)}>{item.nombre_usuario}</Text>
                                                </View>

                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            )
                        }
                        } />
                </View>
            )
        }
    }
};
const resizeMode = 'center';
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF7EE'
    },
    StatusBar: {
        height: hp(3),
        backgroundColor: "black"
    },
    searchBar: {
        backgroundColor: '#F28C0F',
        shadowColor: '#00000525',
        shadowOffset: {
            width: 30,
            height: 50,
        },
        shadowOpacity: 2,
        shadowRadius: 0,
        elevation: 550,
    },
    searchBarInput: {
        backgroundColor: '#FFF7EE',
        marginRight: height * 0.028,
        marginLeft: height * 0.028
    },
    // FlatList

    card: {
        shadowColor: '#00000021',
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: 0.37,
        shadowRadius: 7.49,
        elevation: 12,

        marginLeft: height * 0.028,
        marginRight: height * 0.028,
        borderRadius: 10,
        backgroundColor: "white",
        padding: 10,
        flexDirection: 'row',
    },
    image: {
        width: wp("20"),
        height: hp("11"),
        borderWidth: 2,
        borderColor: "#ebf0f7",
        borderRadius: 10,
        margin: 5,
        marginRight: 5,
        alignSelf: "center"
    },
    cardContent: {
        marginLeft: wp(4),
        paddingRight: 5,
        justifyContent: 'center',
    },
    cardTitulo: {
        fontSize: wp(5),
        color: '#F28C0F',
        fontWeight: 'bold',
        marginBottom: 8
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

})
export default withNavigation(Foros);