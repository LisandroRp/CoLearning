import React, { Component } from 'react';
import { View, Image, StyleSheet, ActivityIndicator, Text, ScrollView, Dimensions, Keyboard, TouchableOpacity, StatusBar, KeyboardAvoidingView, TouchableWithoutFeedback } from 'react-native';
import { SearchBar, Icon } from 'react-native-elements';
import { withNavigation } from 'react-navigation';
import { FontAwesome, FontAwesome5, Ionicons } from '@expo/vector-icons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

import ExportadorLogos from './exportadores/ExportadorLogos'
import ApiController from "../controller/ApiController";

var { height, width } = Dimensions.get('window');

class ClasesMenu extends Component {

    constructor(props) {
        super(props);
        this.state = {
            rating: 0,
            max_rating: 5,
            isLoading: true,
            nombre_profesor: "",
            tema: '',
            domicilio: '',
            dondeClases: [],
            tipoClases: [],
            selecDondeClase: [false, false, false],
            selecTipoClases: [false, false, false]
        };
        this.Star = ExportadorLogos.traerEstrellaLlena();
        this.Star_With_Border = ExportadorLogos.traerEstrellaBorde();
    }
    componentDidMount() {
        ApiController.getDondeClases(this.okDondeClases.bind(this))
    }
    okDondeClases(dondeClases) {
        this.setState({dondeClases: dondeClases})
        ApiController.getTipoClases(this.okTipoClases.bind(this))
    }
    okTipoClases(tipoClases) {
        this.setState({tipoClases: tipoClases, isLoading: false})
    }
    vote(i) {
        this.setState({ rating: i })
    }
    queDondeClase(id_usuario, index) {
        switch (id_usuario) {

            case 1:

                return <FontAwesome5 style={[{ marginBottom: 10 }]} name={"home"} size={hp(2.2)} color={this.esDondeClaseIcon(index)} />;
            case 2:

                return <FontAwesome style={[{ marginBottom: 10 }]} name={"car"} size={hp(2.2)} color={this.esDondeClaseIcon(index)} />;
            case 3:

                return <FontAwesome5 style={[{ marginBottom: 10 }]} name={"school"} size={hp(2.2)} color={this.esDondeClaseIcon(index)} />;
            default:

                return <View></View>;
        }
    }
    esDondeClase(index) {
        if(this.state.selecDondeClase[index]){
            return {backgroundColor: "#F28C0F"}
        }
        else {
            return {backgroundColor: "white"}
        }
    }
    esDondeClaseIcon(index) {
        if(this.state.selecDondeClase[index]){
            return "white"
        }
        else {
            return "#F28C0F"
        }
    }
    esDondeClaseText(index) {
        if(this.state.selecDondeClase[index]){
            return {color: "white"}
        }
        else {
            return {color: "#AEB5BC",}
        }
    }
    cambiarDondeClase(index){
        var dondeClases = this.state.selecDondeClase
        dondeClases[index] = !dondeClases[index]
        this.setState({selecDondeClase: dondeClases})
    }
    queTipoClase(id_usuario, index) {
        switch (id_usuario) {

            case 1:

                return <FontAwesome style={[{ marginBottom: 10 }]} name={"user"} size={hp(2.2)} color= {this.esTipoClaseIcon(index)} />;
            case 2:

                return <FontAwesome style={[{ marginBottom: 10 }]} name={"group"} size={hp(2.2)} color= {this.esTipoClaseIcon(index)} />;
            case 3:

                return <Ionicons style={[{ marginBottom: 10 }]} name={"ios-tv"} size={hp(2.2)} color= {this.esTipoClaseIcon(index)} />;
            default:

                return <View></View>;
        }
    }
    esTipoClase(index) {
        if(this.state.selecTipoClases[index]){
            return {backgroundColor: "#F28C0F"}
        }
        else {
            return {backgroundColor: "white"}
        }
    }
    esTipoClaseIcon(index) {
        if(this.state.selecTipoClases[index]){
            return "white"
        }
        else {
            return "#F28C0F"
        }
    }
    esTipoClaseText(index) {
        if(this.state.selecTipoClases[index]){
            return {color: "white"}
        }
        else {
            return {color: "#AEB5BC",}
        }
    }
    cambiarTipoClase(index){
        var tipoClase = this.state.selecTipoClases
        tipoClase[index] = !tipoClase[index]
        this.setState({selecTipoClases: tipoClase})
    }
    buscarProfesor() {
        if (!this.state.tema.trim() && !this.state.nombre_profesor.trim()) {
            alert("Debe proporcionar el tema de la clase o el nombre del profesor")
            return
        }
        else {
            this.props.onPressSearch(this.state.nombre_profesor, this.state.tema, this.state.domicilio, this.state.rating)
        }
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
                    {i <= rating2
                        ? <Image style={styles.heartImage} source={ExportadorLogos.traerEstrellaLlena()}></Image>
                        : <Image style={styles.heartImage} source={ExportadorLogos.traerEstrellaBorde()}></Image>
                    }
                    {/* <FontAwesome name={i <= rating2
                                ? 'star'
                                : 'star'} style={styles.heartImage} size={hp(5)} /> */}
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
                    <View style={[styles.container]}>
                        <View style={styles.searchContainer}>
                            <SearchBar
                                placeholder="Nombre Profesor"
                                platform='ios'
                                onChangeText={value => this.setState({ nombre_profesor: value })}
                                value={this.state.nombre_profesor}
                                inputContainerStyle={[styles.searchShadow, { height: hp(5) }]}
                                placeholderTextColor='rgba(0, 0, 0, 0.3)'
                                containerStyle={styles.searchBar}
                                cancelButtonProps={{ buttonTextStyle: { color: '#F28C0F' } }}
                                buttonStyle={{}}
                                searchIcon={{ color: 'rgba(0, 0, 0, 0.3)' }}
                            />
                            <SearchBar
                                placeholder="Tema"
                                platform='ios'
                                onChangeText={value => this.setState({ tema: value })}
                                value={this.state.tema}
                                inputContainerStyle={[styles.searchShadow, { height: hp(5) }]}
                                placeholderTextColor='rgba(0, 0, 0, 0.3)'
                                containerStyle={styles.searchBar}
                                cancelButtonProps={{ buttonTextStyle: { color: '#F28C0F' } }}
                                buttonStyle={{}}
                                searchIcon={{ color: 'rgba(0, 0, 0, 0.3)' }}
                            />
                            <SearchBar
                                placeholder="Direccion"
                                platform='ios'
                                onChangeText={value => this.setState({ domicilio: value })}
                                value={this.state.domicilio}
                                inputContainerStyle={[styles.searchShadow, { height: hp(5) }]}
                                placeholderTextColor='rgba(0, 0, 0, 0.3)'
                                containerStyle={styles.searchBar}
                                cancelButtonProps={{ buttonTextStyle: { color: '#F28C0F' } }}
                                buttonStyle={{}}
                                searchIcon={{ color: 'rgba(0, 0, 0, 0.3)' }}
                            />
                            <View style={[{ flexDirection: 'row', marginHorizontal: wp(10), marginTop: hp(2) }]}>
                            {this.state.dondeClases.map((item, index) => (
                                <TouchableOpacity style={[styles.boxes, styles.searchShadow, this.esDondeClase(index)]} key={item.id_tipoClases} onPress={() => { this.cambiarDondeClase(index) }}>
                                    {this.queDondeClase(item.id_dondeClases, index)}
                                    <Text numberOfLines={2} style={[styles.text, styles.subText, this.esDondeClaseText(index)]}>{item.des_dondeClases}</Text>
                                </TouchableOpacity>
                            ))
                            }
                            </View>
                            <View style={[{ flexDirection: 'row', marginHorizontal: wp(10) }]}>
                            {this.state.tipoClases.map((item, index) => (
                                <TouchableOpacity style={[styles.boxes, styles.searchShadow, this.esTipoClase(index)]} key={item.id_tipoClases} onPress={() => { this.cambiarTipoClase(index) }}>
                                        {this.queTipoClase(item.id_tipoClases, index)}
                                        <Text numberOfLines={1} style={[styles.text, styles.subText, this.esTipoClaseText(index)]}>{item.des_tipoClases}</Text>
                                </TouchableOpacity>
                            ))
                            }
                            </View>
                            <View style={styles.heartView}>{React_Native_Rating_Bar}</View>
                            <Text>Minima Puntuación: {this.state.rating}</Text>
                            <TouchableOpacity style={styles.buscarButton} onPress={() => { this.buscarProfesor() }}>
                                <Text style={styles.screenButtonText}>
                                    Buscar Clases
                                </Text>
                            </TouchableOpacity>
                            </View>
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

    searchBar: {
        backgroundColor: "#FFF7EE",
        width: wp(90),
        paddingHorizontal: wp(2)
    },
    searchContainer: {   
        alignItems: 'center',
        paddingTop: hp(10),
    },
    searchShadow: {
        backgroundColor: 'white',
        shadowColor: 'grey',
        shadowOffset: {
            width: 0,
            height: hp(0.1),
        },
        shadowOpacity: 0.37,
        shadowRadius: 7.49,
        elevation: 12,
    },
    boxes: {
        padding: 10,
        flex: 1,
        marginTop: 10,
        marginHorizontal: wp(2),
        alignItems: "center",
        borderRadius: 10
    },
    text: {
        fontFamily: "HelveticaNeue",
        color: "#52575D"
    },
    subText: {
        fontSize: wp(2),
        textAlign: "center",
        textTransform: "uppercase",
        fontWeight: "500"
    },
    //Star View
    heartView: {
        justifyContent: 'center',
        flexDirection: 'row',
        marginTop: hp(3),
        marginBottom: hp(1)
    },
    heartImage: {
        height: hp(4),
        width: hp(4),
        color: "orange"
    },
    //Boton
    buscarButton: {
        backgroundColor: '#F28C0F',
        borderRadius: 10,
        alignItems: 'center',
        marginVertical: height * 0.025,
        alignSelf: 'center',
        opacity: .95,
        paddingHorizontal: 10
    },
    screenButtonText: {
        marginVertical: hp(1.5),
        color: 'white',
        fontSize: wp(4.4)
    }
})
export default withNavigation(ClasesMenu);