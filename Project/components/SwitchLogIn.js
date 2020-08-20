import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  KeyboardAvoidingView,
  TouchableOpacity,
  Image,
  Alert
} from 'react-native'; 
import ApiController from '../controller/ApiController';
import ExportadorLogos from './exportadores/ExportadorLogos'

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

class LogIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mail:  "JuanMn@gmail.com",
      password: "123",
    }
  }

  checkLogin() {
   
    //ApiController.getUsuarioByMail(this.state.mail, this.checkUsuario.bind(this))
    this.props.onPressLogin(this.state.mail);
  }

  checkUsuario(data) {
    if (data.mail == this.state.mail && data.password == this.state.password && this.state.mail != null) {
        this.props.onPressLogin(this.state.mail);
    } else {
        alert("Contraseña incorrecta");
    }
  }
 
  render() {
    return (
        <KeyboardAvoidingView style={[styles.container]} behavior="position" keyboardVerticalOffset={hp(3)} enabled>
       {/* <Image style={styles.bgImage} source={{ uri: "https://lorempixel.com/900/1400/nightlife/8/" }}/> */}
       <View style={[styles.imageContainer]}>
                        <Image
                            style={{height:300, width:300,resizeMode: 'contain',}}
                            source={ExportadorLogos.traerLogoBlanco()}></Image>
                    </View>
       <View style={{paddingTop:50}}>
        <View style={styles.inputContainer}>
          <TextInput style={styles.inputs}
              value= {this.state.mail}
              placeholder="Mail"
              underlineColorAndroid='transparent'
              onChangeText={(text) => this.setState({ mail: text })}
              />
          <Image style={styles.inputIcon} source={{uri: "https://img.icons8.com/office/40/000000/user.png"}}/>
        </View>
        
        <View style={styles.inputContainer}>
          <TextInput style={styles.inputs}
              value={this.state.password}
              placeholder="Password"
              secureTextEntry={true}
              underlineColorAndroid='transparent'
              onChangeText={(text) => this.setState({ password: text })}
              />
          <Image style={styles.inputIcon} source={{uri: "https://img.icons8.com/office/40/000000/forgot-password.png"}}/>
        </View>


        <TouchableOpacity style={[styles.buttonContainer, styles.loginButton]}
         onPress={() => this.checkLogin()}>
          <Text style={styles.loginText}>Login</Text>
        </TouchableOpacity>


        <TouchableOpacity style={styles.buttonContainer} onPress={() => this.props.onPressCreate()}>
            <Text style={styles.btnText}>Create an account</Text>
        </TouchableOpacity>
        <View style={{flexDirection:'center', width:100}}>
        <TouchableOpacity style={styles.buttonContainerPass} onPress={() => this.props.onPressPass()}>
            <Text style={styles.btnText}>Change password</Text>
        </TouchableOpacity>
        </View>
      </View>
      </KeyboardAvoidingView>
      
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
    borderRadius:30,
    borderBottomWidth: 1,
    width:300,
    height:45,
    marginBottom:20,
    flexDirection: 'row',
    alignItems:'center',

    shadowColor: "#808080",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  inputs:{
    height:45,
    marginLeft:16,
    borderBottomColor: '#FFFFFF',
    flex:1,
  },
  inputIcon:{
    width:30,
    height:30,
    marginRight:15,
    justifyContent: 'center'
  },
  buttonContainer: {
    height:45,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop:20,
    marginBottom:5,
    width:300,
    borderRadius:30,
    backgroundColor:'transparent'
  },
  buttonContainerPass: {
    height:20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:20,
    width:300,
    borderRadius:30,
    backgroundColor:'transparent'
  },
  btnByRegister: {
    height:50,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical:20,
    width:300,
    backgroundColor:'transparent'
  },
  loginButton: {
    backgroundColor: "#00b5ec",

    //shadowColor: "#808080",
    shadowOffset: {
      width: 0,
      height: 9,
    },
    shadowOpacity: 0.50,
    shadowRadius: 30,

    elevation: 19,
  },
  loginText: {
    color: 'white',
    fontWeight: 'bold',
  },
  bgImage:{
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
  btnText:{
    color:"white",
    fontWeight:'bold',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
  },
  textByRegister:{
    color:"white",
    fontWeight:'bold',
    textAlign:'center',

    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 100
  }
})
export default LogIn;  