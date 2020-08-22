import React, { Component } from 'react';
import { View, Image, StyleSheet, ActivityIndicator, Text, ScrollView, Dimensions, Keyboard, TouchableOpacity, StatusBar, KeyboardAvoidingView, TouchableWithoutFeedback } from 'react-native';
import { SearchBar, Icon } from 'react-native-elements';
import { withNavigation } from 'react-navigation';
import { FontAwesome } from '@expo/vector-icons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import ExportadorLogos from './exportadores/ExportadorLogos'

var { height, width } = Dimensions.get('window');

class ClasesMenu extends Component {

    constructor(props) {
        super(props);
        this.state = {
            rating: 0,
            max_rating: 5,
            isLoading: false,
            nombre_profesor: "",
            tema: '',
            direccion: '',
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
                    <ActivityIndicator size="large" color="#A01A50" backgroundColor=' #616161' style={{ flex: 1 }}></ActivityIndicator>
                </View>
            );
        }
        else {
            return (
                <KeyboardAvoidingView style={[styles.container]} behavior="position" keyboardVerticalOffset={hp(2.2)} enabled>
                <TouchableWithoutFeedback style={{ flex: 1}} onPress={Keyboard.dismiss}>
                    <View style={styles.searchContainer}>
                    <SearchBar
                            placeholder="Nombre Profesor"
                            platform='ios'
                            onChangeText={value => this.setState({nombre_profesor: value})}
                            value={this.state.nombre_profesor}
                            inputContainerStyle={styles.searchShadow}
                            placeholderTextColor='rgba(0, 0, 0, 0.3)'
                            containerStyle={styles.searchBar}
                            cancelButtonProps={{buttonTextStyle: {color: '#F28C0F'}}}
                            buttonStyle={{}}
                            searchIcon={{ color: 'rgba(0, 0, 0, 0.3)' }}
                        />
                        <SearchBar
                            placeholder="Tema"
                            platform='ios'
                            onChangeText={value => this.setState({tema: value})}
                            value={this.state.tema}
                            inputContainerStyle={styles.searchShadow}
                            placeholderTextColor='rgba(0, 0, 0, 0.3)'
                            containerStyle={styles.searchBar}
                            cancelButtonProps={{buttonTextStyle: {color: '#F28C0F'}}}
                            buttonStyle={{}}
                            searchIcon={{ color: 'rgba(0, 0, 0, 0.3)' }}
                        />
                        <SearchBar
                            placeholder="Direccion"
                            platform='ios'
                            onChangeText={value => this.setState({direccion: value})}
                            value={this.state.direccion}
                            inputContainerStyle={styles.searchShadow}
                            placeholderTextColor= 'rgba(0, 0, 0, 0.3)'
                            containerStyle={styles.searchBar}
                            cancelButtonProps={{buttonTextStyle: {color: '#F28C0F'}}}
                            buttonStyle={{}}
                            searchIcon={{ color: 'rgba(0, 0, 0, 0.3)' }}
                        />
                        <View style={styles.heartView}>{React_Native_Rating_Bar}</View>
                        <Text>Votos: {this.state.rating}</Text>

                        <TouchableOpacity style={styles.buscarButton} onPress={() => { this.props.onPressSearch() }}>
                            <Text style={styles.screenButtonText}>
                                Buscar Clases
                </Text>
                        </TouchableOpacity>
                    </View>
                   </TouchableWithoutFeedback>
               </KeyboardAvoidingView>
            );
        }
    }
};
const resizeMode = 'center';
const styles = StyleSheet.create({

    container: {
        backgroundColor: "#FFF7EE",
        justifyContent: 'center',
        flex: 1
    },

    searchBar: {
            backgroundColor: "#FFF7EE",
            width: wp(90),
            paddingHorizontal: wp(2)
    },
    searchContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    searchShadow: {
        backgroundColor: 'white',
        shadowColor: 'grey',
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
    //FlatList
    contentList: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        padding: 2,
        alignSelf: 'center'
    },
    image: {
        width: wp(49),
        height: hp(24.5),
        margin: 1,
        borderWidth: 1.5,
        borderColor: 'black',
        resizeMode: 'stretch',
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
        overflow: 'hidden'
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
    textImage: {
        textAlign: 'center',
        fontSize: hp(4),
        textTransform: 'uppercase',
        color: "#2A73E0",
        letterSpacing: wp(1),
        fontWeight: 'bold',
        textShadowColor: 'black',
        textShadowOffset: { width: 2.2, height: 2.2 },
        textShadowRadius: 0.1
    },

    Text: {
        fontSize: height * 0.027,
        color: "#3399ff",
        textAlign: "center"
    },
    //Star View
    heartView: {
        justifyContent: 'center',
        flexDirection: 'row',
        marginTop: hp(1.5),
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
    },

})
export default withNavigation(ClasesMenu);