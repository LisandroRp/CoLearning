import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  KeyboardAvoidingView,
  TouchableOpacity,
  Image,
  Dimensions
} from 'react-native';
import ApiController from '../controller/ApiController';
import { SimpleLineIcons, Feather } from "@expo/vector-icons";
import ExportadorLogos from './exportadores/ExportadorLogos'

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
var { height, width } = Dimensions.get('window');

class LogIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mail: "",
      oldPassword: "",
      newPassword: ""
    }
  }

  checkChange() {
    //ApiController.getUsuario(this.checkUsuario.bind(this), this.state.username)
    this.props.onPress()
}

checkUsuario(data) {
    if (data.password == this.state.oldPassword && this.state.newPassword != null) {
        ApiController.changePassword(this.state.mail, this.state.newPassword, this.okChange.bind(this));
    } else {
        alert("Volver a intentar");
    }
}

okChange() {
    alert("Cambio de contraseña exitoso");
    this.props.onPress();
}

  render() {
    return (
      <TouchableWithoutFeedback style={{ flex: 1 }} onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView style={[styles.container]} behavior="position" keyboardVerticalOffset={hp(3)} enabled>
        {/* <Image style={styles.bgImage} source={{ uri: "https://lorempixel.com/900/1400/nightlife/8/" }}/> */}
        <View>
          <Image
            style={{ height: 300, width: 300, resizeMode: 'contain', }}
            source={ExportadorLogos.traerLogoBlanco()}></Image>
        </View>
          <View style={styles.inputContainer}>
            <TextInput style={styles.inputs}
              value={this.state.mail}
              placeholder="Mail"
              underlineColorAndroid='transparent'
              onChangeText={(text) => this.setState({ mail: text })}
            />
            <View style={styles.logoSocialMedia}>
              <SimpleLineIcons style={[{ textAlign: "center" }]} name={"user"} size={hp(3.3)} color='#F28C0F'></SimpleLineIcons>
            </View>
          </View>

          <View style={styles.inputContainer}>
            <TextInput style={styles.inputs}
              value={this.state.password}
              placeholder="Contraseña Anterior"
              secureTextEntry={true}
              underlineColorAndroid='transparent'
              onChangeText={(text) => this.setState({ password: text })}
            />
            <View style={styles.logoSocialMedia}>
              <Feather style={[{ textAlign: "center" }]} name={"lock"} size={hp(3.3)} color='#F28C0F'></Feather>
            </View>
          </View>
          <View style={styles.inputContainer}>
            <TextInput style={styles.inputs}
              value={this.state.password}
              placeholder="Contraseña Nueva"
              secureTextEntry={true}
              underlineColorAndroid='transparent'
              onChangeText={(text) => this.setState({ password: text })}
            />
            <View style={styles.logoSocialMedia}>
              <Feather style={[{ textAlign: "center" }]} name={"unlock"} size={hp(3.3)} color='#F28C0F'></Feather>
            </View>
          </View>

          <View style={[{ flexDirection: "row", justifyContent: "space-around" }]}>
          <TouchableOpacity style={[styles.buttonContainerLogin]}
            onPress={() => this.props.onPress()}>
            <Text style={styles.loginText}>Cancelar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.buttonContainerLogin]}
            onPress={() => this.okChange()}>
            <Text style={styles.loginText}>Cambiar</Text>
          </TouchableOpacity>
          </View>
          </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
    );
  }
}

const resizeMode = 'center';

const styles = StyleSheet.create({
  container: {
    //flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    backgroundColor: '#F28C0F',
  },
  inputContainer: {
    borderBottomColor: '#F5FCFF',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    borderBottomWidth: 1,
    width: 300,
    height: 45,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',

    shadowColor: "#808080",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  logoSocialMedia: {
    height: height * 0.044,
    width: height * 0.044,
    justifyContent: "center",
    marginRight: width * 0.033,
    textAlign: "center",
  },
  inputs: {
    height: 45,
    marginLeft: 16,
    borderBottomColor: '#FFFFFF',
    flex: 1,
  },
  inputIcon: {
    width: 30,
    height: 30,
    marginRight: 15,
    justifyContent: 'center'
  },
  buttonContainerLogin: {
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: hp(5),
    marginBottom: hp(3.3),
    borderRadius: 10,
    paddingHorizontal: wp(3.3),
    backgroundColor: "#FFF7EE"
  },
  buttonContainerPass: {
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: hp(2),
    width: 300,
    borderRadius: 30,
    backgroundColor: 'transparent'
  },
  btnByRegister: {
    height: 50,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
    width: 300,
    backgroundColor: 'transparent'
  },

  loginText: {
    color: '#F28C0F',
    fontWeight: 'bold',
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
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
    resizeMode: 'cover'
  },
  btnText: {
    color: "black",
    fontWeight: 'bold',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
  },
  textByRegister: {
    color: "white",
    fontWeight: 'bold',
    textAlign: 'center',

    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 100
  }
})
export default LogIn;  