import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Keyboard,
  Image,
  Dimensions
} from 'react-native';
import { withNavigation } from 'react-navigation';
import ApiController from '../controller/ApiController';
import firebaseSvc from '../FirebaseSvc';
import { MaterialCommunityIcons, Feather } from "@expo/vector-icons";
import ExportadorLogos from './exportadores/ExportadorLogos'

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
var { height, width } = Dimensions.get('window');

class LogIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "LeoR97@gmail.com",
      password: "leonardo",
      usuario: { id_usuario: 0, esProfesor: true }
    }
  }

  checkLogin() {
    ApiController.getUsuarioByMail(this.state.email, this.checkUsuario.bind(this))

    //this.props.onPressLogin(this.state.mail, this.state.usuario.esProfesor);
  }

  checkUsuario(data) {
    if (data.email == this.state.email && data.password == this.state.password && this.state.email != null) {
      this.setState({ usuario: data })
      this.props.onPressLogin(data.id_usuario, data.esProfesor);
      //this.firebaseLogin()
    } else {
      alert("Contraseña incorrecta");
    }
  }

  // using Fire.js
  firebaseLogin = async () => {
    console.log('pressing login... email:' + this.state.email);
    const user = {
      email: this.state.email,
      password: this.state.password,
    };

    const response = firebaseSvc.login(
      user,
      this.loginSuccess,
      this.loginFailed
    );
  };

  loginSuccess = () => {
    console.log('login successful');
    this.props.onPressLogin(this.state.id_usuario, this.state.usuario.esProfesor);
  };
  loginFailed = () => {
    console.log('login failed ***');
    const user = {
      email: this.state.email,
      password: this.state.password,
    }
    firebaseSvc.observeAuth(user)
  };

  render() {
    return (
      <TouchableWithoutFeedback style={{ flex: 1 }} onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView style={[styles.container]} behavior="position" keyboardVerticalOffset={hp(3)} enabled>
          {/* <Image style={styles.bgImage} source={{ uri: "https://lorempixel.com/900/1400/nightlife/8/" }}/> */}
          <View>
            <Image
              style={{ height: hp(40), width: wp(80), resizeMode: 'contain'}}
              source={ExportadorLogos.traerLogoBlanco()}></Image>
          </View>
          <View style={styles.inputContainer}>
            <TextInput style={styles.inputs}
              value={this.state.email}
              placeholder="Email"
              underlineColorAndroid='transparent'
              onChangeText={(text) => this.setState({ email: text })}
            />
            <View style={styles.logoSocialMedia}>
              <MaterialCommunityIcons style={[{ textAlign: "center" }]} name={"email-outline"} size={hp(2.5)} color='#F28C0F' />
            </View>
          </View>

          <View style={styles.inputContainer}>
            <TextInput style={styles.inputs}
              value={this.state.password}
              placeholder="Password"
              secureTextEntry={true}
              underlineColorAndroid='transparent'
              onChangeText={(text) => this.setState({ password: text })}
            />
            <View style={styles.logoSocialMedia}>
              <Feather style={[{ textAlign: "center" }]} name={"lock"} size={hp(2.5)} color='#F28C0F'></Feather>
            </View>
          </View>


          <TouchableOpacity style={[styles.buttonContainerLogin]}
            onPress={() => this.checkLogin()}>
            <Text style={styles.loginText}>Iniciar Sesión</Text>
          </TouchableOpacity>

          <View>
            <TouchableOpacity style={styles.buttonContainerPass} onPress={() => this.props.onPressCreate()}>
              <Text style={styles.btnText}>Crear Cuenta</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonContainerPass} onPress={() => this.props.onPressPass()}>
              <Text style={styles.btnText}>Cambiar Contraseña</Text>
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
    backgroundColor: '#F5FCFF',
    borderRadius: 10,
    borderBottomWidth: 1,
    height: hp(5.5),
    width: wp(77),
    marginBottom: hp(2.5),
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
    marginLeft: 16,
    flex: 1,
  },
  buttonContainerLogin: {
    paddingVertical: hp(1.5),
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: hp(5),
    marginBottom: hp(3.3),
    borderRadius: 10,
    marginHorizontal: wp(10),
    backgroundColor: "#FFF7EE"
  },
  buttonContainerPass: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: hp(2),
    borderRadius: 30
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
export default withNavigation(LogIn);  