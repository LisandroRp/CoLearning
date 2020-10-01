import React, { Component } from 'react';
import { withNavigation } from 'react-navigation';
import { View, Image, StyleSheet, ActivityIndicator, FlatList, Modal, TextInput, TouchableOpacity, StatusBar, ScrollView, Text, Keyboard, Dimensions } from 'react-native';
import { SearchBar } from 'react-native-elements';
import { FontAwesome } from '@expo/vector-icons';
import AntDesign from 'react-native-vector-icons/MaterialIcons'

import ExportadorLogos from './exportadores/ExportadorLogos'

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import ApiController from '../controller/ApiController';

var { height, width } = Dimensions.get('window');

class Clases extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            modalVisible: false,
            profesores: [{ id_profesor: 1, nombre_profesor: 'Roberto', apellido: 'Gonzalez', esProfesor: true, direccion: "Av. Cordoba, 111", rating: 5, money: { id_moneda: { id_moneda: 1, nombre: "$" }, monto: "200" } },
            { id_profesor: 2, nombre_profesor: 'Rodrigo', apellido: 'Gomez', direccion: "9 de Julio, 50", rating: 5, money: { id_moneda: { id_moneda: 1, nombre: "$" }, monto: "400" } },
            { id_profesor: 3, nombre_profesor: 'Juan', apellido: 'Marinelli', esProfesor: true, direccion: "Ezeiza, Canning", rating: 5, money: { id_moneda: { id_moneda: 1, nombre: "$" }, monto: "300" } }
            ],
            memory: [{ id_profesor: 1, nombre_profesor: 'Roberto', apellido: 'Gonzalez', esProfesor: true, direccion: "Av. Cordoba, 111", rating: 5, money: { id_moneda: { id_moneda: 1, nombre: "$" }, monto: "200" } },
            { id_profesor: 2, nombre_profesor: 'Rodrigo', apellido: 'Gomez', direccion: "9 de Julio, 50", rating: 5, money: { id_moneda: { id_moneda: 1, nombre: "$" }, monto: "400" } },
            { id_profesor: 3, nombre_profesor: 'Juan', apellido: 'Marinelli', esProfesor: true, direccion: "Ezeiza, Canning", rating: 5, money: { id_moneda: { id_moneda: 1, nombre: "$" }, monto: "300" } }
            ],
            filtrarPrecio: false,
            minPrice: null,
            maxPrice: null
        };
    }
    componentDidMount = async () => {
        //ApiController.getProfesoresFilter(await this.navigation.getParam("nombre_profesor"), await this.navigation.getParam("tema_profesor"), await this.navigation.getParam("direccion_profesor"), this.okProfesores.bind(this))
        this.keyboardDidShow = Keyboard.addListener('keyboardDidShow', this.keyboardDidShow)
        this.keyboardWillShow = Keyboard.addListener('keyboardWillShow', this.keyboardWillShow)
        this.keyboardWillHide = Keyboard.addListener('keyboardWillHide', this.keyboardWillHide)
    }
    okProfesores(profesoresBase) {
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
        if (item.id_profesor != this.state.profesores[this.state.profesores.length - 1].id_profesor) {

            return { marginTop: height * 0.028 }
        } else {
            return { marginBottom: height * 0.028, marginTop: height * 0.028 }
        }
    }
    filtrarPrecio(){
        var clasesPrecio =[]
        for(var i = 0; i < this.state.profesores.length; i++){
            console.log(this.state.profesores[i].money.monto)
            if((this.state.profesores[i].money.monto <= parseInt(this.state.maxPrice)) && (this.state.profesores[i].money.monto >= parseInt(this.state.minPrice))){
                clasesPrecio.push(this.state.profesores[i])
            }
        }
        this.setState({profesores: clasesPrecio, isLoading: false})
    }
    noFiltrar() {
        this.setState({ profesores: this.state.memory, filtrarPrecio: false, minPrice: null, maxPrice: null })
    }
    ActivarFiltrarPrecio() {
        if (this.state.maxPrice == null || this.state.minPrice == null || this.state.minPrice == '' || this.state.maxPrice == '') {
            alert('Hay un espacio en Blanco')
        } else {
            if(parseInt(this.state.minPrice) > parseInt(this.state.maxPrice)){
                alert('El precio menor no puede ser superior al precio mayor')
                return;
            }
            if(parseInt(this.state.maxPrice) == parseInt(this.state.minPrice)){
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
        var resultt = this.state.profesores
        if (flag == 0) {
            resultt = this.state.profesores.sort((a, b) => {
                return b.money.monto - a.money.monto
            });
        } else {
            resultt = this.state.profesores.sort((a, b) => {
                return a.money.monto - b.money.monto
            });
        }
        this.setState({ profesores: resultt, minPrice: null, maxPrice: null});
    }
    searchProfesor = value => {
        const filterDeProfesores = this.state.memory.filter(profesores => {
            let profesorLowercase = (
                profesores.nombre_profesor +
                ' ' +
                profesores.apellido +
                ' ' +
                profesores.direccion
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
            if (this.state.filtrarPrecio == false) {
                return (
                    <View style={styles.container}>
                        <StatusBar barStyle="black" backgroundColor="white" />
                        <View style={{ backgroundColor: '#F28C0F' }}>
                            <SearchBar
                                placeholder="Search..."
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

                                <TouchableOpacity onPress={() => {
                                    this.setModalVisible(true);
                                }} style={styles.fab}>
                                    <AntDesign name="attach-money" size={hp(2.7)} color="white" style={{ textAlign:"right" }} />
                                </TouchableOpacity>

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
                                    return item.id_profesor.toString();
                                }}
                                renderItem={({ item }) => {
                                    return (
                                        <View>
                                            <TouchableOpacity style={[this.marginSize(item), styles.card, styles.shadow]} onPress={() => this.props.onPressGo(item.id_profesor, item.nombre_profesor + " " + item.apellido, item.esProfesor)}>
                                                <View style={{ flexDirection: "row" }} >
                                                    <Image style={styles.image} source={require("../assets/icon.png")} />
                                                    <View style={styles.cardContent}>
                                                        <Text style={styles.cardTitulo}>{item.nombre_profesor + " " + item.apellido}</Text>
                                                        <Text style={styles.cardSubTitulo}>{item.direccion}</Text>
                                                        <View style={{ flexDirection: "row", marginLeft: 2, marginTop: 5 }}>
                                                            <Text style={styles.cardSubTituloMoney}>A partir de: </Text>
                                                            <Text style={styles.cardSubTituloMoneyMonto}>{item.money.id_moneda.nombre}{item.money.monto}/h</Text>
                                                        </View>
                                                    </View>
                                                    <View style={styles.starView} >
                                                        <Image style={styles.starImage} source={ExportadorLogos.traerEstrellaLlena()} />
                                                        {/* <FontAwesome name="star" style={styles.HeartImage}
                                                    size={hp(5)}
                                                /> */}
                                                        <Text style={styles.rating}>{item.rating + "/5"}</Text>
                                                    </View>
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
                                            maxLength= {4}
                                            placeholder="Min."
                                            keyboardType= "numeric"
                                            placeholderTextColor="grey"
                                            underlineColorAndroid='transparent'
                                            onChangeText={(text) => this.setState({ minPrice: text })}
                                        />
                                        <TextInput style={[styles.inputMonto, styles.shadowLight]}
                                            value={this.state.nuevoMonto}
                                            maxLength= {4}
                                            placeholder="Max."
                                            keyboardType= "numeric"
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
            else {
                return (
                    <View style={styles.container}>
                        <StatusBar barStyle="black" backgroundColor="white" />
                        <View style={{ backgroundColor: '#F28C0F' }}>
                            <SearchBar
                                placeholder="Search..."
                                platform='ios'
                                onChangeText={value => this.searchProfesor(value)}
                                value={this.state.value}
                                inputContainerStyle={{ backgroundColor: '#FFF7EE' }}
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

                                <TouchableOpacity onPress={() => {
                                    this.noFiltrar();
                                }} style={styles.fab}>
                                    <AntDesign name="money-off" size={25} color="white" style={{ marginLeft: 0.5 }} />
                                </TouchableOpacity>

                                <TouchableOpacity style={[styles.buttonContainer, styles.shadow]}
                                    onPress={() => this.OrdenarPorPrecio(1)}>
                                    <Text style={styles.loginText}>Precio: Menor to Mayor</Text>
                                </TouchableOpacity>
                            </View>
                            <FlatList
                                style={styles.contentList}
                                columnWrapperStyle={styles.listContainer}
                                data={this.state.profesores.sort((a, b) => a.nombre_profesor.localeCompare(b.nombre_profesor))}
                                initialNumToRender={50}
                                keyExtractor={(item) => {
                                    return item.id_profesor.toString();
                                }}
                                renderItem={({ item }) => {
                                    return (
                                        <View>
                                            <TouchableOpacity style={[this.marginSize(item), styles.card, styles.shadow]} onPress={() => this.props.onPressGo(item.id_profesor, item.nombre_profesor + " " + item.apellido, item.esProfesor)}>
                                                <View style={{ flexDirection: "row" }} >
                                                    <Image style={styles.image} source={require("../assets/icon.png")} />
                                                    <View style={styles.cardContent}>
                                                        <Text style={styles.cardTitulo}>{item.nombre_profesor + " " + item.apellido}</Text>
                                                        <Text style={styles.cardSubTitulo}>{item.direccion}</Text>
                                                        <View style={{ flexDirection: "row", marginLeft: 2, marginTop: 5 }}>
                                                            <Text style={styles.cardSubTituloMoney}>A partir de: </Text>
                                                            <Text style={styles.cardSubTituloMoneyMonto}>{item.money.id_moneda.nombre}{item.money.monto}/h</Text>
                                                        </View>
                                                    </View>
                                                    <View style={styles.starView} >
                                                        <Image style={styles.starImage} source={ExportadorLogos.traerEstrellaLlena()} />
                                                        {/* <FontAwesome name="star" style={styles.HeartImage}
                                                                size={hp(5)}
                                                            /> */}
                                                        <Text style={styles.rating}>{item.rating + "/5"}</Text>
                                                    </View>
                                                </View>
                                            </TouchableOpacity>
                                        </View>
                                    )
                                }
                                } />
                        </ScrollView>
                    </View>
                )
            }
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
        marginTop: 10
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
        borderRadius: wp(8)/2,
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
        padding: 10,
        flexDirection: 'row',
    },
    image: {
        width: wp("20"),
        height: wp("20"),
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
        fontWeight: 'bold'
    },

    cardSubTitulo: {
        marginTop: 1,
        marginLeft: 2,
        fontSize: wp(3),
        color: "black"
    },
    cardSubTituloMoney: {
        marginTop: 1,
        fontSize: wp(3),
        color: "black"
    },
    cardSubTituloMoneyMonto: {
        fontWeight: "bold",
        marginTop: 1,
        fontSize: wp(3),
        color: "green"
    },

    //Estrellas
    starImage: {
        height: hp(4.4),
        width: hp(4.4)
    },
    starView: {
        alignItems: 'center',
        justifyContent: "center",
        paddingHorizontal: wp("5")
    },
    rating: {
        marginTop: 5,
        fontSize: wp(3),
        color: "orange"
    },
    //MODAL
    /*************************************** */
    modalContainer: {
        flex: 1,
        justifyContent: "center"
    },
    modal: {
        width: wp(55),
        marginTop: hp(15),
        padding: hp(2),
        alignSelf: "center",
        backgroundColor: '#FFF7EE',
        borderRadius: 22,
        opacity: .95,
        alignItems: "center"
    },
    inputMoney: {
        borderBottomColor: '#F5FCFF',
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        borderBottomWidth: 1,
        marginHorizontal: wp(2),
        height: hp(5),
        paddingHorizontal: hp(2.2),
        marginTop: hp(2.2),
        flexDirection: 'column',
        textAlign: 'center'
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
        height: hp(5),
        marginTop: hp(2),
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