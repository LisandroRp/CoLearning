import React, { Component } from 'react';
import { View, Image, StyleSheet, ActivityIndicator, FlatList, Modal, TextInput, TouchableOpacity, StatusBar, TouchableWithoutFeedback, Text, Keyboard, Dimensions } from 'react-native';
import { SearchBar, Icon } from 'react-native-elements';
import { withNavigation } from 'react-navigation';

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

import ApiController from '../controller/ApiController';
import ExportadorObjetos from './exportadores/ExportadorObjetos'
import ExportadorLogos from './exportadores/ExportadorLogos';

var { height, width } = Dimensions.get('window');

class Foros extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            modalVisible: false,
            foros: [],
            memory: []
        };
    }
    componentDidMount = async () => {
        ApiController.getFiltroForo(await this.props.navigation.getParam("tema"), this.okForos.bind(this))
        this.keyboardDidShow = Keyboard.addListener('keyboardDidShow', this.keyboardDidShow)
        this.keyboardWillShow = Keyboard.addListener('keyboardWillShow', this.keyboardWillShow)
        this.keyboardWillHide = Keyboard.addListener('keyboardWillHide', this.keyboardWillHide)
    }
    okForos(foros) {
        var contador = 0
        var nuevosForos = []
        if (foros.length != 0) {
            var foroActual = ExportadorObjetos.createForo(foros[contador])
            while (contador < foros.length) {
                while (contador < foros.length && foroActual.id_foro == foros[contador].id_foro) {
                    if (foros[contador].id_tag != null) {
                        foroActual.tags.push(ExportadorObjetos.createTag(foros[contador].id_tag, foros[contador].nombre_tag))
                    }
                    contador++
                }
                nuevosForos.push(foroActual)
                if (contador < foros.length) {
                    foroActual = ExportadorObjetos.createForo(foros[contador])
                }
            }
            this.setState({ foros: nuevosForos, memory: nuevosForos, isLoading: false })
        }
        else {
            alert("No se han encontrado foros")
        }
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
                    <View style={{ backgroundColor: '#F28C0F' }}>
                        <SearchBar
                            placeholder="Buscar..."
                            platform='ios'
                            onChangeText={value => this.searchForos(value)}
                            value={this.state.value}
                            inputContainerStyle={{ backgroundColor: '#FFF7EE', height: hp(5) }}
                            placeholderTextColor='rgba(0, 0, 0, 0.3)'
                            cancelButtonProps={{ buttonTextStyle: { color: 'white', paddingTop: 0 } }}
                            containerStyle={{ backgroundColor: '#F28C0F', paddingTop: 0, marginHorizontal: wp(3.3) }}
                            buttonStyle={{}}
                            searchIcon={{ color: 'rgba(0, 0, 0, 0.3)' }}
                        />
                    </View>
                    <FlatList
                        style={styles.contentList}
                        data={this.state.foros.sort((a, b) => a.nombre_foro.localeCompare(b.nombre_foro))}
                        initialNumToRender={50}
                        keyExtractor={(item) => {
                            return item.id_foro.toString();
                        }}
                        renderItem={({ item }) => {
                            return (
                                <View>
                                    <TouchableOpacity style={[this.marginSize(item), styles.card]} onPress={() => this.props.onPressGoForo(item.id_foro, item.nombre_foro, item.pregunta)}>
                                        <View style={styles.cardContent}>
                                            <Text numberOfLines={2} style={styles.cardTitulo}>{item.pregunta}</Text>

                                            <View style={[{ flexDirection: 'row', flexWrap: "wrap", marginBottom: hp(1), flex: 1 }]}>
                                                {item.tags.length != 0 ?
                                                    (item.tags).map((item) => (
                                                        <View style={styles.tagsContainer}>
                                                            <Text numberOfLines={1} style={[styles.textTags]}>{item.nombre_tag}</Text>
                                                        </View>
                                                    ))
                                                    :
                                                    <View style={styles.tagsContainer}>
                                                        <Text numberOfLines={1} style={[styles.textTags]}>Sin tags</Text>
                                                    </View>
                                                }
                                            </View>
                                            <View style={[{ flexWrap: "wrap", flex: 1 }]}>
                                                <Text style={styles.cardSubTitulo}>Respuestas: {item.respuestasCant}</Text>
                                                <View style={[{ flexDirection: 'row', flexWrap: "wrap", flex: 1 }]}>
                                                    <Text style={styles.cardSubTitulo}>Preguntado el {item.fecha_alta}</Text>
                                                    {
                                                    item.esAnonimo ?
                                                    <View/>
                                                    :
                                                    <View style={[{ flexDirection: 'row', flexWrap: "wrap", flex: 1 }]}>
                                                        <Text style={styles.cardSubTitulo}> por </Text>
                                                        <Text style={styles.cardSubTituloUsuario} numberOfLines={1} onPress={() => this.props.onPressGoUsuario(item.id_usuario, item.nombre_usuario, item.esProfesor)}>{item.nombre_usuario} {item.apellido}</Text>
                                                    </View>
                                                    }
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
        marginHorizontal: wp(3.3)
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

        marginHorizontal: wp(5),
        borderRadius: 10,
        backgroundColor: "white",
        padding: 10,
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
        marginLeft: wp(4)
    },
    cardTitulo: {
        fontSize: wp(5),
        color: '#F28C0F',
        fontWeight: 'bold',
        marginBottom: 8
    },

    cardSubTitulo: {
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
        marginBottom: hp(0.5),
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