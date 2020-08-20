import React, { Component } from 'react';
import { withNavigation } from 'react-navigation';
import { View, Image, StyleSheet, ActivityIndicator, FlatList, Modal, TextInput, TouchableOpacity, StatusBar, TouchableWithoutFeedback, Text, Keyboard, Dimensions } from 'react-native';
import { SearchBar, Icon } from 'react-native-elements';
import { FontAwesome } from '@expo/vector-icons';

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
            profesores: [{ id_profesor: 1, nombre_profesor: 'Roberto', apellido: 'Gonzalez',esProfesor: true, direccion: "Narnia", rating: 5 },
            { id_profesor: 2, nombre_profesor: 'Rodrigo', apellido: 'Gonzalez', direccion: "Narnia", rating: 5 },
            { id_profesor: 3, nombre_profesor: 'Lucardo', apellido: 'Gonzalez',esProfesor: true, direccion: "Narnia", rating: 5 },
            { id_profesor: 4, nombre_profesor: 'Roberto', apellido: 'Gonzalez', direccion: "Narnia", rating: 5 },
            { id_profesor: 5, nombre_profesor: 'Roberto', apellido: 'Gonzalez', direccion: "Narnia", rating: 5 },
            { id_profesor: 6, nombre_profesor: 'Roberto', apellido: 'Gonzalez', direccion: "Narnia", rating: 5 },
            { id_profesor: 7, nombre_profesor: 'Roberto', apellido: 'Gonzalez', direccion: "Narnia", rating: 5 },
            { id_profesor: 8, nombre_profesor: 'Roberto', apellido: 'Gonzalez', direccion: "Narnia", rating: 5 }],
            memory: [{ id_profesor: 1, nombre_profesor: 'Roberto', apellido: 'Gonzalez',esProfesor: true, direccion: "Narnia", rating: 5 },
            { id_profesor: 2, nombre_profesor: 'Rodrigo', apellido: 'Gonzalez', direccion: "Narnia", rating: 5 },
            { id_profesor: 3, nombre_profesor: 'Lucardo', apellido: 'Gonzalez',esProfesor: true, direccion: "Narnia", rating: 5 },
            { id_profesor: 4, nombre_profesor: 'Roberto', apellido: 'Gonzalez', direccion: "Narnia", rating: 5 },
            { id_profesor: 5, nombre_profesor: 'Roberto', apellido: 'Gonzalez', direccion: "Narnia", rating: 5 },
            { id_profesor: 6, nombre_profesor: 'Roberto', apellido: 'Gonzalez', direccion: "Narnia", rating: 5 },
            { id_profesor: 7, nombre_profesor: 'Roberto', apellido: 'Gonzalez', direccion: "Narnia", rating: 5 },
            { id_profesor: 8, nombre_profesor: 'Roberto', apellido: 'Gonzalez', direccion: "Narnia", rating: 5 }]
        };
    }
    componentDidMount = async () => {
        //ApiController.getProfesoresFilter(await this.navigation.getParam("nombre_profesor"), await this.navigation.getParam("tema_profesor"), await this.navigation.getParam("direccion_profesor"), this.okProfesores.bind(this))
        this.keyboardDidShow = Keyboard.addListener('keyboardDidShow', this.keyboardDidShow)
        this.keyboardWillShow = Keyboard.addListener('keyboardWillShow', this.keyboardWillShow)
        this.keyboardWillHide = Keyboard.addListener('keyboardWillHide', this.keyboardWillHide)
      }
      okProfesores(profesoresBase){
        this.setState({profesores: profesoresBase, memory: profesoresBase, isLoading: false})
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
                        data={this.state.profesores.sort((a, b) => a.nombre_profesor.localeCompare(b.nombre_profesor))}
                        initialNumToRender={50}
                        keyExtractor={(item) => {
                            return item.id_profesor.toString();
                        }}
                        renderItem={({ item }) => {
                            return (
                                <View>
                                    <TouchableOpacity style={[this.marginSize(item), styles.card]} onPress={() => this.props.onPressGo(item.id_profesor, item.nombre_profesor + " " + item.apellido, item.esProfesor)}>
                                        <View style={{ flexDirection: "row" }} >
                                            <Image style={styles.image} source={require("../assets/icon.png")} />
                                            <View style={styles.cardContent}>
                                                <Text style={styles.cardTitulo}>{item.nombre_profesor + " " + item.apellido}</Text>
                                                <Text style={styles.cardSubTitulo}>{item.direccion}</Text>
                                            </View>
                                            <View style={styles.starView} >
                                                <Image style={styles.starImage} source={ExportadorLogos.traerEstrellaLlena()}/>
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
        fontSize: height * 0.018,
        color: "orange"
    }

})
export default withNavigation(Clases);