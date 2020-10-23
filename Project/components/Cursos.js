import React, { Component } from 'react';
import {
    View,
    Image,
    StyleSheet,
    ActivityIndicator,
    FlatList,
    Modal,
    TextInput,
    TouchableOpacity,
    StatusBar,
    ScrollView,
    Text,
    Keyboard,
    Dimensions
} from 'react-native';
import { SearchBar } from 'react-native-elements';
import ExportadorLogos from './exportadores/ExportadorLogos'
import { withNavigation } from 'react-navigation';
import AntDesign from 'react-native-vector-icons/MaterialIcons'

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import ApiController from '../controller/ApiController';

var { height, width } = Dimensions.get('window');

class Cursos extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            modalVisible: false,
            cursos: [
                { id_curso: 1, nombre_curso: 'Programacion Avanzada', usuario:{id_usuario: 1, nombre_usuario: 'Pedro'}, direccion: "Narnia", rating: 5, money: { id_moneda: { id_moneda: 1, nombre: "$" }, monto: "200" } },
                { id_curso: 2, nombre_curso: 'Magia para Principiantes', usuario:{id_usuario: 1, nombre_usuario: 'Pedro'}, direccion: "Narnia", rating: 5, money: { id_moneda: { id_moneda: 1, nombre: "$" }, monto: "20" } },
                { id_curso: 3, nombre_curso: 'Programacion Avanzada', usuario:{id_usuario: 1, nombre_usuario: 'Pedro'}, direccion: "Narnia", rating: 5, money: { id_moneda: { id_moneda: 1, nombre: "$" }, monto: "2000" } }
            ],
            memory: [
                { id_curso: 1, nombre_curso: 'Programacion Avanzada', usuario:{id_usuario: 1, nombre_usuario: 'Pedro'}, direccion: "Narnia", rating: 5, money: { id_moneda: { id_moneda: 1, nombre: "$" }, monto: "200" } },
                { id_curso: 2, nombre_curso: 'Magia para Principiantes', usuario:{id_usuario: 1, nombre_usuario: 'Pedro'}, direccion: "Narnia", rating: 5, money: { id_moneda: { id_moneda: 1, nombre: "$" }, monto: "200" } },
                { id_curso: 3, nombre_curso: 'Programacion Avanzada', usuario:{id_usuario: 1, nombre_usuario: 'Pedro'}, direccion: "Narnia", rating: 5, money: { id_moneda: { id_moneda: 1, nombre: "$" }, monto: "200" } }
            ],
            filtrarPrecio: false,
            minPrice: null,
            maxPrice: null
        };
    }
    componentDidMount() {
        //ApiController.getCursos(this.okCursos.bind(this))
        this.keyboardDidShow = Keyboard.addListener('keyboardDidShow', this.keyboardDidShow)
        this.keyboardWillShow = Keyboard.addListener('keyboardWillShow', this.keyboardWillShow)
        this.keyboardWillHide = Keyboard.addListener('keyboardWillHide', this.keyboardWillHide)
    }
    okCursos(cursos){
        this.setState({cursos: cursos, memory:cursos, isLoading: false})
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
    filtrarPrecio() {
        var cursoPrecio = []
        for (var i = 0; i < this.state.cursos.length; i++) {
            console.log(this.state.cursos[i].money.monto)
            if ((this.state.cursos[i].money.monto <= parseInt(this.state.maxPrice)) && (this.state.cursos[i].money.monto >= parseInt(this.state.minPrice))) {
                cursoPrecio.push(this.state.cursos[i])
            }
        }
        this.setState({ cursos: cursoPrecio, isLoading: false })
    }
    noFiltrar() {
        this.setState({ cursos: this.state.memory, filtrarPrecio: false, minPrice: null, maxPrice: null })
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
        var result = this.state.cursos
        if (flag == 0) {
            result = this.state.cursos.sort((a, b) => {
                return b.money.monto - a.money.monto
            });
        } else {
            result = this.state.cursos.sort((a, b) => {
                return a.money.monto - b.money.monto
            });
        }
        this.setState({ cursos: result, minPrice: null, maxPrice: null });
    }
    searchCursos = value => {
        const filterDeCursos = this.state.memory.filter(cursos => {
            let cursosLowercase = (
                cursos.nombre_curso +
                ' ' +
                cursos.institucion +
                ' ' +
                cursos.direccion
            ).toLowerCase();

            let searchTermLowercase = value.toLowerCase();

            return cursosLowercase.indexOf(searchTermLowercase) > -1;
        });
        this.setState({ cursos: filterDeCursos });
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
                            placeholder="Search..."
                            platform='ios'
                            onChangeText={value => this.searchCursos(value)}
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
                            data={this.state.cursos}
                            initialNumToRender={50}
                            keyExtractor={(item) => {
                                return item.id_curso.toString();
                            }}
                            renderItem={({ item }) => {
                                return (
                                    <View>
                                        <TouchableOpacity style={[this.marginSize(item), styles.card, styles.shadow]} onPress={() => this.props.onPressGo(item.id_profesor, item.nombre_profesor + " " + item.apellido, item.esProfesor)}>
                                            <Image style={styles.image} source={require("../assets/icon.png")} />
                                            <View style={styles.cardContent}>
                                                <Text style={styles.cardTitulo} numberOfLines={2}>{item.nombre_curso}</Text>
                                                <Text style={styles.cardSubTitulo} numberOfLines={2}>{item.direccion}</Text>
                                                <View style={{ flex: 1, flexDirection: "row", marginLeft: 2, marginTop: 5 }}>
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
    image: {
        width: wp("20"),
        height: wp("20"),
        borderWidth: 2,
        borderColor: "#ebf0f7",
        borderRadius: 10,
        alignSelf: "center"
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
export default withNavigation(Cursos);