import React, { Component } from 'react';
import { withNavigation } from 'react-navigation';
import { View, Image, StyleSheet, ActivityIndicator, FlatList, Modal, TextInput, TouchableOpacity, StatusBar, ScrollView, Text, Keyboard, Dimensions } from 'react-native';
import { SearchBar } from 'react-native-elements';
import { FontAwesome } from '@expo/vector-icons';
import AntDesign from 'react-native-vector-icons/MaterialIcons'

import ExportadorLogos from './exportadores/ExportadorLogos'

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import ApiController from '../controller/ApiController';
import ExportadorObjetos from './exportadores/ExportadorObjetos';

var { height, width } = Dimensions.get('window');

class Clases extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            modalVisible: false,
            profesores: [],
            memory: [],
            filtrarPrecio: false,
            minPrice: null,
            maxPrice: null
        };
    }
    componentDidMount = async () => {
        ApiController.getProfesoresFilter(await this.props.navigation.getParam("nombre_profesor"), await this.props.navigation.getParam("materia"), await this.props.navigation.getParam("des_domicilio"), await this.props.navigation.getParam("rating"), this.okProfesores.bind(this))
        this.keyboardDidShow = Keyboard.addListener('keyboardDidShow', this.keyboardDidShow)
        this.keyboardWillShow = Keyboard.addListener('keyboardWillShow', this.keyboardWillShow)
        this.keyboardWillHide = Keyboard.addListener('keyboardWillHide', this.keyboardWillHide)
    }
    okProfesores(profesoresBase) {
        console.log(profesoresBase)
        this.setState({ profesores: profesoresBase, memory: profesoresBase, isLoading: false })
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
        if (item.id_usuario != this.state.profesores[this.state.profesores.length - 1].id_usuario) {

            return { marginTop: height * 0.028 }
        } else {
            return { marginBottom: height * 0.028, marginTop: height * 0.028 }
        }
    }
    filtrarPrecio() {
        var clasesPrecio = []
        for (var i = 0; i < this.state.profesores.length; i++) {
            console.log(this.state.profesores[i].monto)
            if ((this.state.profesores[i].monto <= parseInt(this.state.maxPrice)) && (this.state.profesores[i].monto >= parseInt(this.state.minPrice))) {
                clasesPrecio.push(this.state.profesores[i])
            }
        }
        this.setState({ profesores: clasesPrecio, isLoading: false })
    }
    noFiltrar() {
        this.setState({ profesores: this.state.memory, filtrarPrecio: false, minPrice: null, maxPrice: null })
    }
    ActivarFiltrarPrecio() {
        if (this.state.maxPrice == null || this.state.minPrice == null || this.state.minPrice == '' || this.state.maxPrice == '') {
            alert('Hay un espacio en Blanco')
        } else {
            if (parseInt(this.state.minPrice) > parseInt(this.state.maxPrice)) {
                alert('El precio menor no puede ser superior al precio mayor')
                return;
            }
            if (parseInt(this.state.maxPrice) == parseInt(this.state.minPrice)) {
                alert('Los precios no pueden ser iguales')
                return;
            }
            this.setState({ filtrarPrecio: true, modalVisible: false })
            this.filtrarPrecio()
        }
    }
    setModalVisible(visible) {
        this.setState({ modalVisible: visible, minPrice: null, maxPrice: null });
    }
    OrdenarPorPrecio(flag) {
        var result = this.state.profesores
        if (flag == 0) {
            result = this.state.profesores.sort((a, b) => {
                return b.monto - a.monto
            });
        } else {
            result = this.state.profesores.sort((a, b) => {
                return a.monto - b.monto
            });
        }
        this.setState({ profesores: result, minPrice: null, maxPrice: null });
    }
    searchProfesor = value => {
        const filterDeProfesores = this.state.memory.filter(profesores => {
            let profesorLowercase = (
                profesores.nombre_usuario +
                ' ' +
                profesores.apellido +
                ' ' +
                profesores.des_domicilio
            ).toLowerCase();

            let searchTermLowercase = value.toLowerCase();

            return profesorLowercase.indexOf(searchTermLowercase) > -1;
        });
        this.setState({ profesores: filterDeProfesores });
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
                            onChangeText={value => this.searchProfesor(value)}
                            value={this.state.value}
                            inputContainerStyle={{ backgroundColor: '#FFF7EE', height: hp(5) }}
                            placeholderTextColor='rgba(0, 0, 0, 0.3)'
                            cancelButtonProps={{ buttonTextStyle: { color: 'white', paddingTop: 0 } }}
                            containerStyle={{ backgroundColor: '#F28C0F', paddingTop: 0, marginHorizontal: wp(3.3) }}
                            buttonStyle={{}}
                            searchIcon={{ color: 'rgba(0, 0, 0, 0.3)' }}
                        />
                    </View>
                    <ScrollView>
                        <View style={styles.priceFilterView}>
                            <TouchableOpacity style={[styles.buttonContainer, styles.shadow]}
                                onPress={() => this.OrdenarPorPrecio(0)}>
                                <Text style={styles.loginText}>Precio: Mayor to Menor</Text>
                            </TouchableOpacity>
                            {(this.state.filtrarPrecio == false) ?
                                <TouchableOpacity onPress={() => {
                                    this.setModalVisible(true);
                                }} style={styles.fab}>
                                    <AntDesign name="attach-money" size={hp(2.7)} color="white" style={{ textAlign: "right" }} />
                                </TouchableOpacity>
                                :
                                <TouchableOpacity onPress={() => {
                                    this.noFiltrar();
                                }} style={styles.fab}>
                                    <AntDesign name="money-off" size={25} color="white" style={{ marginLeft: 0.5 }} />
                                </TouchableOpacity>
                            }
                            <TouchableOpacity style={[styles.buttonContainer, styles.shadow]}
                                onPress={() => [this.OrdenarPorPrecio(1)]}>
                                <Text style={styles.loginText}>Precio: Menor to Mayor</Text>
                            </TouchableOpacity>
                        </View>
                        <FlatList
                            style={styles.contentList}
                            columnWrapperStyle={styles.listContainer}
                            data={this.state.profesores}
                            initialNumToRender={50}
                            keyExtractor={(item) => {
                                return item.id_usuario.toString();
                            }}
                            renderItem={({ item }) => {
                                return (
                                    <View>
                                        <TouchableOpacity style={[this.marginSize(item), styles.card, styles.shadow]} onPress={() => this.props.onPressGo(item.id_usuario, item.nombre_usuario, item.apellido, item.des_domicilio, item.esProfesor)}>
                                            {ExportadorObjetos.profileImage(item.id_usuario) ?
                                                <View style={[styles.imageContainer, { borderWidth: 0 }]}>
                                                    <Image
                                                        source={ExportadorObjetos.profileImage(item.id_usuario)}
                                                        style={[styles.image, { resizeMode: ((item.id_usuario == 0) ? 'contain' : 'contain') }]}
                                                    />
                                                </View>
                                                :
                                                <View style={[styles.imageContainer, { borderWidth: 2 }]}>
                                                    <Text style={{ fontSize: wp(7.7), textAlign: "center", color: '#F28C0F', alignContent: 'center' }}>
                                                        {item.nombre_usuario.slice(0, 1).toUpperCase()}{item.apellido.slice(0, 1).toUpperCase()}
                                                    </Text>
                                                </View>
                                            }
                                            <View style={styles.cardContent}>
                                                <Text style={styles.cardTitulo} numberOfLines={2}>{item.nombre_usuario + " " + item.apellido}</Text>
                                                <Text style={styles.cardSubTitulo} numberOfLines={2}>{item.des_domicilio}</Text>
                                                {item.nombre_materia ? 
                                                    <Text style={[styles.cardSubTituloMateria]} numberOfLines={1}>{item.nombre_materia}</Text>
                                                :
                                                <View/>
                                                }
                                                {item.des_moneda && item.monto ?
                                                    <View style={{ flex: 1, flexDirection: "row", marginLeft: 2, marginTop: 5 }}>
                                                        <Text style={styles.cardSubTituloMoney}>A partir de: </Text>

                                                        <Text style={styles.cardSubTituloMoneyMonto}>{item.des_moneda}{item.monto}/h</Text>
                                                    </View>
                                                    :
                                                    <View />
                                                }

                                            </View>
                                            <View style={styles.starView}>
                                                <Image style={styles.starImage} source={ExportadorLogos.traerEstrellaLlena()} />
                                                {/* <FontAwesome name="star" style={styles.HeartImage}
                                                    size={hp(5)}
                                                /> */}
                                                <Text style={styles.rating}>{item.rating + "/5"}</Text>
                                                <Text style={styles.votos}>Votos: {item.votos}</Text>
                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                )
                            }
                            } />
                    </ScrollView>
                    <Modal
                        animationType="fade"
                        visible={this.state.modalVisible}
                        transparent={true}
                        onRequestClose={() => this.setState({ modalVisible: false })}  >
                        <TouchableOpacity style={[styles.modalContainer, styles.shadow]} activeOpacity={1} onPress={Keyboard.dismiss}>

                            <View style={styles.modal}>
                                <Text style={styles.cardTitulo}>Precio</Text>
                                <View style={[{ flexDirection: "row", justifyContent: 'space-between' }]}>
                                    <TextInput style={[styles.inputMonto, styles.shadowLight]}
                                        value={this.state.nuevoMonto}
                                        maxLength={4}
                                        placeholder="Min."
                                        keyboardType="numeric"
                                        placeholderTextColor="grey"
                                        underlineColorAndroid='transparent'
                                        onChangeText={(text) => this.setState({ minPrice: text })}
                                    />
                                    <TextInput style={[styles.inputMonto, styles.shadowLight]}
                                        value={this.state.nuevoMonto}
                                        maxLength={4}
                                        placeholder="Max."
                                        keyboardType="numeric"
                                        placeholderTextColor="grey"
                                        underlineColorAndroid='transparent'
                                        onChangeText={(text) => this.setState({ maxPrice: text })}
                                    />
                                </View>
                                <View style={[{ flexDirection: "row" }]}>
                                    <TouchableOpacity style={[styles.buttonContainerLogin]}
                                        onPress={() => this.setModalVisible(false)}>
                                        <Text style={styles.loginText}>Cancelar</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={[styles.buttonContainerLogin]}
                                        onPress={() => [this.ActivarFiltrarPrecio()]}>
                                        <Text style={styles.loginText}>Aceptar</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </TouchableOpacity>
                    </Modal>
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
    priceFilterView: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: hp(1.1)
    },
    buttonContainer: {
        flex: 1,
        paddingVertical: hp(1.5),
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: "#F28C0F",
        alignItems: 'center',
        borderRadius: 10,
        marginHorizontal: 15
    },
    fab: {
        width: wp(8),
        height: wp(8),
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#F28C0F',
        borderRadius: wp(8) / 2,
    },
    shadow: {
        shadowColor: '#00000045',
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: 0.37,
        shadowRadius: 7.49,
        elevation: 12,
    },
    shadowLight: {
        shadowColor: "#808080",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5
    },
    // FlatList

    card: {
        marginLeft: height * 0.028,
        marginRight: height * 0.028,
        borderRadius: 10,
        backgroundColor: "white",
        padding: wp(2.5),
        flexDirection: 'row',
    },
    imageContainer: {
        width: hp("8"),
        height: hp("8"),
        borderColor: "#F28C0F",
        borderRadius: hp(8) / 2,
        margin: 5,
        marginRight: 5,
        justifyContent: 'center',
        alignSelf: "flex-start",
        backgroundColor: "#FFF7EE"
    },
    image: {
        resizeMode: "contain",
        height: "100%",
        width: "100%",
        borderRadius: 100,
        justifyContent: 'center',
    },
    cardContent: {
        flex: 1.6,
        marginLeft: wp(3.3),
        marginVertical: hp(0.5)
    },
    cardTitulo: {
        fontSize: wp(4.4),
        color: "#F28C0F",
        fontWeight: 'bold'
    },

    cardSubTitulo: {
        marginTop: 1,
        marginLeft: 2,
        fontSize: wp(3),
        color: "black"
    },
    cardSubTituloMateria: {
        marginTop: 1,
        marginLeft: 2,
        fontWeight: "bold",
        fontSize: wp(3.3),
        color: "black"
    },
    cardSubTituloMoney: {
        marginTop: 1,
        fontSize: wp(3),
        color: "black"
    },
    cardSubTituloMoneyMonto: {
        flexShrink: 1,
        fontWeight: "bold",
        marginTop: 1,
        fontSize: wp(3),
        color: "green"
    },

    //Estrellas
    starImage: {
        height: hp(4.4),
        width: hp(4.4),
    },
    starView: {
        flex: 0.4,
        justifyContent: "center",
        alignItems: "center",
    },
    rating: {
        marginTop: hp(0.5),
        fontSize: wp(3)
    },
    votos: {
        marginTop: hp(0.22),
        textAlign: "center",
        fontSize: wp(2.5)
    },
    //MODAL
    /*************************************** */
    modalContainer: {
        flex: 1,
        justifyContent: "center"
    },
    modal: {
        flex: 1,
        marginTop: hp(35),
        marginBottom: hp(43),
        marginHorizontal: wp(20),
        padding: hp(2),
        backgroundColor: '#FFF7EE',
        borderRadius: 22,
        opacity: .95,
        alignItems: "center"
    },
    inputMonto: {
        borderBottomColor: '#F5FCFF',
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        borderBottomWidth: 1,
        flex: 1,
        marginHorizontal: wp(2),
        height: hp(5),
        paddingHorizontal: hp(2.2),
        marginTop: hp(2.2),
        flexDirection: 'column',
        textAlign: 'center'
    },
    buttonContainerLogin: {
        flex: 1,
        marginTop: hp(2),
        paddingVertical: hp(1.5),
        justifyContent: 'center',
        marginHorizontal: wp(2),
        alignItems: 'center',
        marginBottom: hp(2.2),
        borderRadius: 10,
        paddingHorizontal: wp(3.3),
        backgroundColor: "#F28C0F"
    },
    loginText: {
        fontSize: wp(3),
        color: 'white'
    }
    //MODAL

})
export default withNavigation(Clases);