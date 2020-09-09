import React, { Component } from 'react';
import { View, Image, StyleSheet, ActivityIndicator, FlatList, Modal, TextInput, TouchableOpacity, StatusBar, TouchableWithoutFeedback, Text, Keyboard, Dimensions } from 'react-native';
import { SearchBar, Icon } from 'react-native-elements';
import { FontAwesome } from '@expo/vector-icons';
import { withNavigation } from 'react-navigation';

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import ApiController from '../controller/ApiController';

var { height, width } = Dimensions.get('window');

class PerfilValidation extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true
        }
    }
componentDidMount = async () =>{
    this.props.goPerfil(this.props.esProfesorTodo)
}
    render() {
        if (this.state.isLoading) {
            return (
                <View style={{flex: 1}}>
                    <StatusBar barStyle="black" backgroundColor="white" />
                    <ActivityIndicator size="large" color="#F28C0F" backgroundColor=' #616161' style={{ flex: 1 }}></ActivityIndicator>
                </View>
            );
        }
    }
};

export default withNavigation(PerfilValidation);