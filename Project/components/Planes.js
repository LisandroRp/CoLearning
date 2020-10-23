import React, { Component } from 'react';
import { View, Image, StyleSheet, ActivityIndicator, FlatList, Modal, TextInput, TouchableOpacity, StatusBar, TouchableWithoutFeedback, Text, Keyboard, Dimensions } from 'react-native';
import { SearchBar, Icon } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';
import { withNavigation } from 'react-navigation';

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import ApiController from '../controller/ApiController';
import { isLoading } from 'expo-font';
import { ScrollView } from 'react-native-gesture-handler';

var { height, width } = Dimensions.get('window');

class Planes extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            modalVisible: false,
            planes: [
                { id_plan: 1, nombre_plan: "Posicionamiento Instantáneo", des_plan: "Tu perfil o el curso seleccionado se posicionará primero en las búsquedas de todo el día. A medida que los demás profesores van contratando este plan se van posicionando más arriba en las búsquedas que el usuario anterior que contrató este plan", precio: 1 },
                { id_plan: 2, nombre_plan: "Posicionamiento Diario", des_plan: "Tu perfil o el curso seleccionado se posicionará durante todo el dia en las primeras posiciones cada 5 búsquedas relacionadas.", precio: 1 },
                { id_plan: 3, nombre_plan: "Posicionamiento Semanal", des_plan: "Tu perfil o el curso seleccionado se posicionará durante toda la semana en las primeras posiciones cada 10 búsquedas relacionadas.", precio: 1 },
                { id_plan: 4, nombre_plan: "Posicionamiento Mensual", des_plan: "Tu perfil o el curso seleccionado se posicionará durante todo el mes en las primeras posiciones cada 10 búsquedas relacionadas.", precio: 1 },
                { id_plan: 5, nombre_plan: "Premium", des_plan: "El plan se abona de manera mensual. Tu perfil y todos tus cursos se posicionaran en las primeras posiciones cada 10 búsquedas relacionadas. Además aparecerá un símbolo distintivo alado de tu perfil y tus cursos para mostrar que son parte de los usuarios premium de CoLearning.", precio: 1 }
            ]
        };
    }

    componentDidMount = async () => {
        //ApiController.getForos(await this.props.navigation.getParam("tema"), this.okPlanes.bind(this))
        this.keyboardDidShow = Keyboard.addListener('keyboardDidShow', this.keyboardDidShow)
        this.keyboardWillShow = Keyboard.addListener('keyboardWillShow', this.keyboardWillShow)
        this.keyboardWillHide = Keyboard.addListener('keyboardWillHide', this.keyboardWillHide)
    }
    okPlanes(planes) {
        this.setState({ planes: planes, isLoading: false })
    }
    marginSize(item) {
        if (item.id_plan != this.state.planes[this.state.planes.length - 1].id_plan) {

            return { marginTop: height * 0.028 }
        } else {
            return { marginBottom: height * 0.028, marginTop: height * 0.028 }
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
plan(){
    
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
                <ScrollView style={styles.container}>
                    {/* <View style={{ backgroundColor: "#F28C0F", justifyContent: "center", alignItems: "center", height: hp(10) }}>
                    <View style={[{}]} onPress={() => this.props.navigation.openDrawer()}>
                        <Ionicons style={{}} name={"md-menu"} size={hp(3)} color='white'/>
                    </View>
                    </View> */}
                    {this.state.planes.map((item) => (
                        <TouchableOpacity style={[this.marginSize(item), styles.card]} onPress={() => this.plan()}>
                            <View style={{ flexDirection: "column" }} >

                                <View style={styles.cardContent}>
                                    <Text numberOfLines={1} style={styles.cardTitulo}>{item.nombre_plan}</Text>
                                </View>
                                <View style={styles.cardContent}>
                                    <Text style={styles.cardSubTitulo}>{item.des_plan}</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    ))
                    }
                </ScrollView>
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
    // FlatList

    card: {
        flex: 1,
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
        padding: hp(1.5),
        flexDirection: 'row',
    },
    cardContent: {
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
})
export default withNavigation(Planes);