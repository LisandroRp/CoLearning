import React, { Component } from 'react';
import { View, Image, StyleSheet, ActivityIndicator, FlatList, Modal, TextInput, TouchableOpacity, StatusBar, TouchableWithoutFeedback, Text, Keyboard, Dimensions } from 'react-native';
import { SearchBar, Icon } from 'react-native-elements';
import ExportadorLogos from './exportadores/ExportadorLogos'
import { withNavigation } from 'react-navigation';

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

var { height, width } = Dimensions.get('window');

class Cursos extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            modalVisible: false,
            cursos: [
                { id_curso: 1, nombre_curso: 'Programacion Avanzada', usuario:{id_usuario: 1, nombre_usuario: 'Pedro'}, direccion: "Narnia", rating: 5 },
                { id_curso: 2, nombre_curso: 'Programacion Avanzada', usuario:{id_usuario: 1, nombre_usuario: 'Pedro'}, direccion: "Narnia", rating: 5 },
                { id_curso: 3, nombre_curso: 'Programacion Avanzada', usuario:{id_usuario: 1, nombre_usuario: 'Pedro'}, direccion: "Narnia", rating: 5 }
            ],
            memory: [
                { id_curso: 1, nombre_curso: 'Programacion Avanzada', usuario:{id_usuario: 1, nombre_usuario: 'Pedro'}, direccion: "Narnia", rating: 5 },
                { id_curso: 2, nombre_curso: 'Programacion Avanzada', usuario:{id_usuario: 1, nombre_usuario: 'Pedro'}, direccion: "Narnia", rating: 5 },
                { id_curso: 3, nombre_curso: 'Programacion Avanzada', usuario:{id_usuario: 1, nombre_usuario: 'Pedro'}, direccion: "Narnia", rating: 5 }
            ]
        };
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

    marginSize(item) {
        if (item.id_curso != this.state.cursos[this.state.cursos.length - 1].id_curso) {

            return { marginTop: height * 0.028 }
        } else {
            return { marginBottom: height * 0.028, marginTop: height * 0.028 }
        }
    }

    searchCursos = value => {
        const filterDeCursos = this.state.memory.filter(cursos => {
            let profesorLowercase = (
                cursos.nombre_curso +
                ' ' +
                cursos.institucion +
                ' ' +
                cursos.direccion
            ).toLowerCase();

            let searchTermLowercase = value.toLowerCase();

            return cursosLowercase.indexOf(searchTermLowercase) > -1;
        });
        this.setState({ profesores: filterDeCursos });
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
                            placeholder= "Search..."
                            platform='ios'
                            onChangeText={value => this.searchProfesor(value)}
                            value={this.state.value}
                            inputContainerStyle={{ backgroundColor: '#FFF7EE'}}
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
                        data={this.state.cursos.sort((a, b) => a.nombre_curso.localeCompare(b.nombre_curso))}
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
                                                <Text style={styles.cardSubTitulo}>{item.usuario.nombre_usuario}</Text>
                                                <Text style={styles.cardSubTitulo}>{item.direccion}</Text>
                                            </View>
                                            <View style={styles.starView} >
                                                {/* <Image style={styles.StarImage} source={require("../Contenido/Logos/Star_Llena.png")} /> */}
                                                <Image style={styles.starImage} source={ExportadorLogos.traerEstrellaLlena()}/>
                                                <Text style={styles.rating}>{item.rating + "/5"}</Text>
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
        backgroundColor: "#FFF7EE"
    },
    StatusBar: {
        height: hp(3),
        backgroundColor: "black"
    },

    slide: {
        backgroundColor: "black",
        marginTop: height * 0.05,
        marginBottom: height * 0.05,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        borderRadius: 10,
        opacity: .95,
    },

    slideText: {
        textAlign: "center",
        fontSize: height * 0.03,
        color: "#3399ff"
    },

    bgImage: {
        flex: 1,
        resizeMode,
        position: 'absolute',
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        resizeMode: 'cover'
    },
    slideContainer: {
        flex: 1,
        alignItems: "center",
    },

    TextContainer: {
        backgroundColor: 'grey',
        borderRadius: 10,
        width: wp("20"),
        height: hp("5.5"),
        flexDirection: 'row',
        alignItems: 'center',
        fontWeight: 'bold',
        fontSize: height * 0.02,
        textAlign: 'center',
        marginTop: height * 0.028,
        opacity: .95
    },

    ContainerInside: {
        width: width,
        height: height,
        alignItems: "center",
    },
    guardarButton: {
        backgroundColor: 'grey',
        borderRadius: 10,
        alignItems: 'center',
        width: width * 0.33,
        marginHorizontal: 22,
        marginTop: height * 0.05,
        alignSelf: 'center',
        opacity: .95
    },

    // FlatList

    card: {
        shadowColor: '#00000045',
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
        marginLeft: height * 0.028,
        paddingRight: 5,
        width: wp("40"),
        justifyContent: 'center',
    },
    cardTitulo: {
        fontSize: wp(4.4),
        color: "#F28C0F",
        fontWeight: 'bold',
        marginBottom: 5
    },

    cardSubTitulo: {
        marginTop: 1,
        fontSize: wp(3),
        color: "black"
    },
//Corazones
starImage: {
    height: hp(4.4),
    width: hp(4.4),
    color: "orange"
},
starView: {
    alignItems: 'center',
    justifyContent: "center",
    paddingHorizontal: wp("5")
},
rating: {
    marginTop: 5,
    fontSize: height * 0.018,
    color: "orange"
}
})
export default withNavigation(Cursos);