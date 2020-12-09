import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, YellowBox, TouchableOpacity} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'
import { ScrollView } from 'react-native-gesture-handler';
import Icon from '@expo/vector-icons/Ionicons';
import { FontAwesome, FontAwesome5, MaterialCommunityIcons, Entypo } from '@expo/vector-icons';
import {
  createSwitchNavigator,
  createAppContainer
} from 'react-navigation';
import {
  createMaterialTopTabNavigator,
  createBottomTabNavigator
} from 'react-navigation-tabs';
import {
  createStackNavigator
} from 'react-navigation-stack';
import {
  createDrawerNavigator, DrawerItems
} from 'react-navigation-drawer';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import * as Font from 'expo-font';

import LogIn from './components/LogIn'
import SwitchLogIn from './components/SwitchLogIn'
import SwitchCrearUser from './components/SwitchCrearUser'
import SwitchContraseña from './components/SwitchContraseña'
import ClasesMenu from './components/ClasesMenu'
import CursosMenu from './components/CursosMenu'
import Cursos from './components/Cursos'
import UsuarioEspecifico from './components/UsuarioEspecifico'
import PerfilComentarios from './components/PerfilComentarios'
import PerfilContacto from './components/PerfilContacto'
import PerfilContactoEdit from './components/PerfilContactoEdit'
import Clases from './components/Clases'
import CursoEspecifico from './components/CursoEspecifico';
import MapaVarios from './components/MapaVarios'
import MapaUnico from './components/MapaUnico'
import HomeClases from './components/HomeClases'
import HomeCursos from './components/HomeCursos'
import PerfilHome from './components/PerfilHome'
import PerfilValidation from './components/PerfilValidation'
import PerfilEdit from './components/PerfilEdit'
import ChatList from './components/ChatList'
import ChatEspecifico from './components/Chat'
import ForoMenu from './components/ForoMenu'
import ForoNew from './components/ForoNew';
import Foros from './components/Foros'
import ForoEspecifico from './components/ForoEspecifico'
import Planes from './components/Planes'

import UserDataManager from './components/UserDataManager';
import ExportadorLogos from './components/exportadores/ExportadorLogos';

require('react-native').unstable_enableLogBox()

YellowBox.ignoreWarnings(['']);

console.disableYellowBox = true

var esProfesorTodo = false
var id_perfil = 0
var eraMapa = false
Font.loadAsync({
  'shakies': require('./assets/fonts/Shakies-TT.ttf'),
});

UserDataManager.getInstance().setCurrentPositionFromReact()

class App extends Component {

  render() {
    return <AppContainer />
  }
}
export default App;


class SwitchLogInScreen extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <SwitchLogIn
        onPressLogin={this.checkLogin.bind(this)}
        onPressPass={this.goPass.bind(this)}
        onPressCreate={this.goCreate.bind(this)}
      />
    )
  }
  checkLogin(id_usuario, esProfesor) {
    esProfesorTodo = esProfesor
    id_perfil = id_usuario
    this.props.navigation.navigate('drawer', {esProfesor: esProfesor });
  }

  goPass() {
    this.props.navigation.navigate('switchContraseña');
  }

  goCreate() {
    this.props.navigation.navigate('switchCrearUser');
  }
}
class SwitchContraseñaScreen extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <SwitchContraseña
        onPress={this.checkPassword.bind(this)}
      />
    );
  }
  checkPassword() {
    this.props.navigation.navigate('switchLogIn')
  }
}
class SwitchCrearUserScreen extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <SwitchCrearUser
        onPressCreate={this.createAccount.bind(this)}
        onPressCancel={this.goLogIn.bind(this)}
      />
    );
  }
  createAccount() {
    this.props.navigation.navigate('SignUpClass')
  }
  goLogIn() {
    this.props.navigation.navigate('switchLogIn')
  }
}

//******************************************* */
//******************MAPAS******************** */
//******************************************* */
class MapaVariosScreen extends React.Component {

  static navigationOptions = ({ navigation }) => {
    return {
      title: "Mapa",
      // headerStyle: {
      //   backgroundColor: '#F28C0F',
      //   height: 0,
      //   borderBottomWidth: 0
      // },
      // headerTitleStyle: {
      //   fontSize: hp(2),
      // }, 
      // headerTintColor: 'white',
      headerShown: false
    };
  }

  constructor(props) {
    super(props);
    this.state = {
    }
  }
  render() {
    return (
      <MapaVarios
        onPressGoCurso={this.pasarDetallesCurso.bind(this)}
        onPressGoProfesor={this.pasarDetallesProfesor.bind(this)}
        onPressMap={this.pasarMapaUnico.bind(this)}
        onPressVolver={this.volver.bind(this)}
      />
    );
  }
  pasarDetallesCurso(id_curso, nombre, domicilio) {
    eraMapa = true
    this.props.navigation.navigate('cursoEspecifico', { id_curso: id_curso });
  }
  pasarDetallesProfesor(id_usuario, nombre, domicilio) {
      eraMapa = true
      this.props.navigation.navigate('profesorEspecifico', { id_usuario: id_usuario });
  }
  pasarMapaUnico(id, nombre, apellido, domicilio, tipoMapa) {
    eraMapa = true
    this.props.navigation.navigate('mapaUnico', {id: id, nombre: nombre, domicilio: domicilio, tipoMapa: tipoMapa, mapa: true, });
  }
  volver(curso) {
    eraMapa = false
    if(curso){
      this.props.navigation.navigate('cursos');
    }
    else{
      this.props.navigation.navigate('profesores');
    }
  }
}
class MapaUnicoScreen extends React.Component {

  static navigationOptions = ({ navigation }) => {
    return {
      title: "Mapa",
      // headerStyle: {
      //   backgroundColor: '#F28C0F',
      //   height: 0,
      //   borderBottomWidth: 0
      // },
      // headerTitleStyle: {
      //   fontSize: hp(2),
      // }, 
      // headerTintColor: 'white',
      headerShown: false
    };
  }
  render() {
    return (
      <MapaUnico
        onPressVolver={this.volver.bind(this)}
        onPressGoPerfil={this.goPerfil.bind(this)}
      />
    );
  }
  volver(mapa) {
    if(mapa){
      this.props.navigation.navigate('mapaVarios');
    }
    else{
      this.props.navigation.navigate('profesorEspecifico', {id_mapa: true});
    }
  }
  goPerfil(id, tipoMapa) {
    if(tipoMapa == "Curso"){
      this.props.navigation.navigate('cursoEspecifico', {id_curso: id});
    }
    else{
      this.props.navigation.navigate('profesorEspecifico', {id_usuario: id});
    }
  }
}
//******************************************* */
//******************CHAT******************** */
//******************************************* */
class ChatEspecificoScreen extends React.Component {

  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam("nombre_chatDestino"),
      headerStyle: {
        backgroundColor: '#F28C0F',
        height: hp(10),
        borderBottomWidth: 0
      },
      headerTitleStyle: {
        fontSize: hp(2),
      }, 
      headerTintColor: 'white',
    };
  }

  constructor(props) {
    super(props);
    this.state = {
    }
  }
  render() {
    return (
      <ChatEspecifico
        onPressGoChat={this.pasarChat.bind(this)}
        id_usuario={id_perfil}
      />
    );
  }
  pasarChat(id_chat, nombre, domicilio) {
    this.props.navigation.navigate('cursoEspecifico', { id_curso: id_curso });
  }
}
//******************************************* */
//******************PERFIL******************* */
//******************************************* */
class PerfilHomeScreen extends React.Component {
  
  static navigationOptions = ({ navigation }) => {
    return {
      title: "Perfil",
      headerStyle: {
        backgroundColor: '#F28C0F',
        height: hp(10),
        borderBottomWidth: 0
      },
      headerTitleStyle: {
        fontSize: hp(2),
      }, 
      headerTintColor: 'white',
    };
  }
  
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <PerfilHome
        id_usuario={id_perfil}
        onPressSearch={this.buscarClase.bind(this)}
        onPressGoChat={this.goChat.bind(this)}
      />
    );

  }
  buscarClase() {
    this.props.navigation.navigate('Profesores', {});
  }
  goChat( id_chat, id_userDestino, nombre_chatDestino) {
    this.props.navigation.navigate('ChatEspecifico', {id_userDestino: id_userDestino, id_chat: id_chat , nombre_chatDestino: nombre_chatDestino });
  }
}
class PerfilEditScreen extends React.Component {
  
  static navigationOptions = ({ navigation }) => {
    return {
      title: "Editar",
      headerStyle: {
        backgroundColor: '#F28C0F',
        height: hp(10),
        borderBottomWidth: 0
      },
      headerTitleStyle: {
        fontSize: hp(2),
      }, 
      headerTintColor: 'white',
    };
  } 
  
  render() {
    return (
      <PerfilEdit
        id_usuario={id_perfil}
        goPerfil={this.goPerfil.bind(this)}
      />
    );

  }
  goPerfil(esProfesor) {
    if(esProfesor){
      this.props.navigation.navigate("PerfilProfesorStack");
    }
    else{
      this.props.navigation.navigate("PerfilUsuarioStack");
    }
  }
}
/////////////////////
//Contacto
///////////////////// 
class PerfilContactoScreen extends React.Component {
  
  static navigationOptions = ({ navigation }) => {
    return {
      title: "Contacto",
      headerStyle: {
        backgroundColor: '#6BA8FF',
        height: hp(10),
        borderBottomWidth: 0
      },
      headerTitleStyle: {
        fontSize: hp(2),
      }, 
      headerTintColor: '#A01A50',
    };
  } 
  
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <PerfilContacto
        id_usuario={id_perfil}
        onPressSearch={this.buscarClase.bind(this)}
      />
    );

  }
  buscarClase() {
    this.props.navigation.navigate('Profesores', {});
  }
}
class PerfilContactoEditScreen extends React.Component {
  
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <PerfilContactoEdit
        id_usuario={id_perfil}
        onPressSearch={this.buscarClase.bind(this)}
      />
    );

  }
  buscarClase() {
    this.props.navigation.navigate('Profesores', {});
  }
}
class PerfilComentariosScreen extends React.Component {
  

  constructor(props) {
    super(props)
  }
  render() {
    return (
      <PerfilComentarios
      id_usuario = {id_perfil}
      onPressGoPerfil={this.buscarUsuario.bind(this)}
      />
    );

  }
  buscarUsuario(id_usuario, esProfesor) {
    console.log(esProfesor)
    if(esProfesor){
      this.props.navigation.navigate('profesorEspecifico2', {id_usuario: id_usuario, esProfesor: esProfesor});
    }
    else{
      this.props.navigation.navigate('usuarioEspecifico', {id_usuario: id_usuario, esProfesor: esProfesor});
    }
  }
}
/////////////////////
//Contacto 
////////////////////
const PerfilTabNavigatorProfesor = createBottomTabNavigator({
  // Profesor: PerfilHomeScreen,
  // Contacto: PerfilContactoScreen,
  // Comentarios: PerfilComentariosScreen
  Profesor: {
    screen: PerfilHomeScreen,
    navigationOptions: {
      tabBarLabel: ({ focused }) => <Text numberOfLines={1} style={{ fontSize: hp(1.5), color: (focused ? '#A7370F' : "white")}}>Detalles</Text>,
      tabBarIcon: ({ tintColor }) => {return (<MaterialCommunityIcons name="account-details" size={hp(2.5)} color={tintColor} />)}
    }
  },
  Contacto: {
    screen: PerfilContactoScreen,
    navigationOptions: {
      tabBarLabel: ({ focused }) => <Text numberOfLines={1} style={{ fontSize: hp(1.5), color: (focused ? '#A7370F' : "white")}}>Contacto</Text>,
      tabBarIcon: ({ tintColor }) => {return (<MaterialCommunityIcons name="contact-mail-outline" size={hp(2.5)} color={tintColor} />)}
    }
  },
  Comentarios: {
    screen: PerfilComentariosScreen,
    navigationOptions: {
      tabBarLabel: ({ focused }) => <Text numberOfLines={1} style={{ fontSize: hp(1.5), color: (focused ? '#A7370F' : "white")}}>Comentarios</Text>,
      tabBarIcon: ({ tintColor }) => {return (<FontAwesome name="comments-o" size={hp(2.5)} color={tintColor} />)}
    }
  },
  
},
{
  navigationOptions: ({ navigation }) => {
    const { routeName } = navigation.state.routes[navigation.state.index]
    return {
      title: "Perfil",
      headerStyle: {
        backgroundColor: '#F28C0F',
        height: hp(10),
        borderBottomWidth: 0
      },
      headerTitleStyle: {
        fontSize: hp(2),
      }, 
      headerRight: () =>
      ( (!eraMapa  && navigation.getParam("id_usuario") != id_perfil) ?
        <View style={{ flexDirection: 'row' }}>
          <FontAwesome name="map-marker" style={{ paddingRight: wp(5), color: 'white' }}
            onPress={() => navigation.navigate("mapaUnico", {id: navigation.getParam('id_usuario'), nombre: navigation.getParam('nombre_profesor'), apellido: navigation.getParam('apellido'), domicilio: navigation.getParam('domicilio'), tipo: 'Unico', mapa: false })}
            size={22}
          />
        </View>
        :
        <View/>
      )
      ,
      headerTintColor: 'white',
    };
  },
swipeEnabled: true,
  Title: 'Ficha',
  tabBarOptions: {
    Title: 'Mi Plan',
    activeTintColor: '#A7370F',
    inactiveTintColor: 'white',
    style: {
      backgroundColor: '#F28C0F',
      borderTopColor: '#F28C0F'
    },
    labelStyle: {
      fontSize: 18,
      paddingVertical: 10
    }

  }
});
////////////////////
const PerfilTabNavigator = createBottomTabNavigator({
  // Perfil: PerfilHomeScreen,
  // Contacto: PerfilContactoScreen,
  // Comentarios: PerfilComentariosScreen
  Profesor: {
    screen: PerfilHomeScreen,
    navigationOptions: {
      tabBarLabel: ({ focused }) => <Text numberOfLines={1} style={{ fontSize: hp(1.5), color: (focused ? '#A7370F' : "white")}}>Detalles</Text>,
      tabBarIcon: ({ tintColor }) => {return (<MaterialCommunityIcons name="account-details" size={hp(2.5)} color={tintColor} />)}
    }
  },
  Contacto: {
    screen: PerfilContactoScreen,
    navigationOptions: {
      tabBarLabel: ({ focused }) => <Text numberOfLines={1} style={{ fontSize: hp(1.5), color: (focused ? '#A7370F' : "white")}}>Contacto</Text>,
      tabBarIcon: ({ tintColor }) => {return (<MaterialCommunityIcons name="contact-mail-outline" size={hp(2.5)} color={tintColor} />)}
    }
  },
  Comentarios: {
    screen: PerfilComentariosScreen,
    navigationOptions: {
      tabBarLabel: ({ focused }) => <Text numberOfLines={1} style={{ fontSize: hp(1.5), color: (focused ? '#A7370F' : "white")}}>Comentarios</Text>,
      tabBarIcon: ({ tintColor }) => {return (<FontAwesome name="comments-o" size={hp(2.5)} color={tintColor} />)}
    }
  },
},
{
  navigationOptions: ({ navigation })  => 
  {
    const { routeName } = navigation.state.routes[navigation.state.index]
    return {
      headerTitle: 'Perfil',
      headerTintColor: 'white',
      headerTitleStyle: {
        fontSize: hp(2),
      }, 
      headerLeft: () =>
        <Icon
          style={{ paddingLeft: wp(5), color: 'white' }}
          onPress={() => navigation.openDrawer()}
          name="md-menu"
          size={hp(3.3)}
        />
      ,
      headerRight: () => 
        <View style={{ flexDirection: 'row' }}>
          <FontAwesome name="edit" style={{ marginRight: wp(5), color: 'white' }}
            onPress={() => navigation.navigate("perfilEditTab")}
            size={hp(2.5)}
          />
        </View>
      ,
      headerStyle: {
        backgroundColor: '#F28C0F',
        height: hp(10),
        borderBottomWidth: 0
      }
    }
  },
swipeEnabled: true,
  Title: 'Ficha',
  tabBarOptions: {
    Title: 'Mi Plan',
    activeTintColor: '#A7370F',
    inactiveTintColor: 'white',
    style: {
      backgroundColor: '#F28C0F',
      borderTopColor: '#F28C0F'

    },
    labelStyle: {
      fontSize: 18,
      paddingVertical: 10
    }

  }
});
///////////////////////
const PerfilTabNavigatorEdit = createBottomTabNavigator({
  Perfil:{
  screen: PerfilEditScreen,
  navigationOptions: {
    tabBarLabel: ({ focused }) => <Text numberOfLines={1} style={{ fontSize: hp(1.5), color: (focused ? '#A7370F' : "white")}}>Detalles</Text>,
    tabBarIcon: ({ tintColor }) => {return (<MaterialCommunityIcons name="account-details" size={hp(2.5)} color={tintColor} />)}
  },
  },
  Contacto: {
    screen: PerfilContactoEditScreen,
    navigationOptions: {
      tabBarLabel: ({ focused }) => <Text numberOfLines={1} style={{ fontSize: hp(1.5), color: (focused ? '#A7370F' : "white")}}>Contacto</Text>,
      tabBarIcon: ({ tintColor }) => {return (<MaterialCommunityIcons name="contact-mail-outline" size={hp(2.5)} color={tintColor} />)}
    }
  },
},
{
  navigationOptions: ({ navigation })  => 
  {
    const { routeName } = navigation.state.routes[navigation.state.index]
    return {
      headerTitle: 'Editar',
      headerTintColor: 'white',
      headerTitleStyle: {
        fontSize: hp(2),
      }, 
      headerStyle: {
        backgroundColor: '#F28C0F',
        height: hp(10),
        shadowOffset: {
          height: 0,
      }
      }
    }
  },
swipeEnabled: true,
  Title: 'Ficha',
  tabBarOptions: {
    Title: 'Mi Plan',
    activeTintColor: '#A7370F',
    inactiveTintColor: 'white',
    style: {
      backgroundColor: '#F28C0F',
      borderTopColor: '#F28C0F'

    },
    labelStyle: {
      fontSize: 18,
      paddingVertical: 10
    }

  }
});
///////////////////////
const PerfilUsuarioStackNavigator = createStackNavigator(
  {
    PerfilHomeScreen: {
      screen: PerfilHomeScreen,
      navigationOptions: ({ navigation }) => {
        return {
          // headerLeft: () => <SomeElement />
          headerLeft: () =>
            <Icon
              style={{ paddingLeft: wp(5), color: 'white' }}
              onPress={() => navigation.openDrawer()}
              name="md-menu"
              size={hp(3.3)}
            />
          ,
          headerRight: () => 
          <View style={{ flexDirection: 'row' }}>
            <FontAwesome name="edit" style={{ marginRight: wp(5), color: 'white' }}
              onPress={() => navigation.navigate("perfilEdit")}
              size={hp(2.5)}
            />
          </View>
        }
      }     
    },
    perfilEdit: PerfilEditScreen,
    ChatEspecifico: ChatEspecificoScreen
})
////////////////
const PerfilProfesorStackNavigator = createStackNavigator(
  {
  PerfilTabNavigator: {
    screen: PerfilTabNavigator,
    navigationOptions: ({ navigation }) => {
      return {
        // headerLeft: () => <SomeElement />
        headerLeft: () =>
          <Icon
            style={{ paddingLeft: wp(5), color: 'white' }}
            onPress={() => navigation.openDrawer()}
            name="md-menu"
            size={hp(3.3)}
          />
        ,
      }
    }     
  },
  perfilEditTab: PerfilTabNavigatorEdit,
  perfilEdit: PerfilEditScreen,
  usuarioEspecifico: PerfilHomeScreen,
  profesorEspecifico: PerfilTabNavigatorProfesor,
  mapaUnico: MapaUnicoScreen,
  ChatEspecifico: ChatEspecificoScreen
}
);

class PerfilValidationScreen extends React.Component {
  
  static navigationOptions = ({ navigation }) => {
    return {
      title: "Detalles",
      headerStyle: {
        backgroundColor: '#6BA8FF',
        height: hp(10),
        borderBottomWidth: 0
      },
      headerTitleStyle: {
        fontSize: hp(2),
      }, 
      headerTintColor: '#A01A50',
      headerStyle: {
        backgroundColor: '#6BA8FF',
        height: hp(10),
        borderBottomWidth: 0
      }
    };
  }
  
  render() {
    return (
      <PerfilValidation
        esProfesorTodo = {esProfesorTodo}
        goPerfil={this.goPerfil.bind(this)}
      />
    );

  }
  goPerfil(esProfesor) {
    if(esProfesor){
      this.props.navigation.navigate("PerfilProfesorStack");
    }
    else{
      this.props.navigation.navigate("PerfilUsuarioStack");
    }
  }
}
//******************************************* */
//******************CHAT******************** */
//******************************************* */
class LogInScreen extends React.Component {

  static navigationOptions = ({ navigation }) => {
    return {
      title: "Chats",
      headerStyle: {
        backgroundColor: '#F28C0F',
        height: hp(10),
        borderBottomWidth: 0
      },
      headerTitleStyle: {
        fontSize: hp(2),
      }, 
      headerTintColor: 'white',
    };
  }

  constructor(props) {
    super(props);
    this.state = {
    }
  }
  render() {
    return (
      <LogIn
      onPressLogin={this.pasarChat.bind(this)}
      onPressCreate={this.createAccount.bind(this)}
      />
    );
  }
  pasarChat(name, email, avatar) {
    this.props.navigation.navigate('ChatList', { name: name, email: email, avatar: avatar });
  }
  createAccount(){
    this.props.navigation.navigate('CreateAccount')
  }
}
class CreateAccountScreen extends React.Component {

  static navigationOptions = ({ navigation }) => {
    return {
      title: "Chats",
      headerStyle: {
        backgroundColor: '#6BA8FF',
        height: hp(10),
        borderBottomWidth: 0
      },
      headerTitleStyle: {
        fontSize: hp(2),
      }, 
      headerTintColor: '#A01A50',
    };
  }

  constructor(props) {
    super(props);
    this.state = {
    }
  }
  render() {
    return (
      <CreateAccount
      onPressLogin={this.pasarChat.bind(this)}
      onPressCreate={this.createAccount.bind(this)}
      />
    );
  }
  pasarChat(name, email, avatar) {
    this.props.navigation.navigate('ChatList', { name: name, email: email, avatar: avatar });
  }
  createAccount(){
    this.props.navigation.navigate('CreateAccount')
  }
}
class ChatListScreen extends React.Component {

  static navigationOptions = ({ navigation }) => {
    return {
      title: "Chats",
      headerStyle: {
        backgroundColor: '#F28C0F',
        height: hp(10),
        borderBottomWidth: 0
      },
      headerTitleStyle: {
        fontSize: hp(2),
      }, 
      headerTintColor: 'white',
    };
  }

  constructor(props) {
    super(props);
    this.state = {
    }
  }
  render() {
    return (
      <ChatList
        onPressGoChat={this.pasarChat.bind(this)}
        onPressGoUsuario={this.pasarUsuario.bind(this)}
        id_usuario={id_perfil}
      />
    );
  }
  pasarChat( id_chat, id_userDestino, nombre_chatDestino) {
    this.props.navigation.navigate('ChatEspecifico', {id_userDestino: id_userDestino, id_chat: id_chat , nombre_chatDestino: nombre_chatDestino });
  }
  pasarUsuario(id_usuario, nombre_usuario, esProfesor) {
    if(esProfesor){
      this.props.navigation.navigate('profesorEspecifico', {id_usuario: id_usuario, nombre_usuario: nombre_usuario, esProfesor: esProfesor});
    }
    else{
      this.props.navigation.navigate('usuarioEspecifico', {id_usuario: id_usuario, nombre_usuario: nombre_usuario, esProfesor: esProfesor});
    }
  }
}
const ChatListStackNavigator = createStackNavigator(
  {
    ChatListScreen: {
      screen: ChatListScreen,
      navigationOptions: ({ navigation }) => {
        return {
          // headerLeft: () => <SomeElement />
          headerLeft: () =>
            <Icon
              style={{ paddingLeft: wp(5), color: 'white' }}
              onPress={() => navigation.openDrawer()}
              name="md-menu"
              size={hp(3.3)}
            />
          ,
        }
      }     
    },
    CreateAccount: CreateAccountScreen,
    ChatEspecifico: ChatEspecificoScreen,
    usuarioEspecifico: PerfilHomeScreen,
    mapaUnico: MapaUnicoScreen,
    profesorEspecifico: PerfilTabNavigatorProfesor
  },
  {
    initialRouteName: 'ChatListScreen',
  }
);

//******************************************* */
//******************Clases******************** */
//******************************************* */
class ClasesMenuScreen extends React.Component {
  
  static navigationOptions = ({ navigation }) => {
    return {
      //title: "Clases",
      //fontSize: hp(10)
    };
  }

  constructor(props) {
    super(props)
  }
  render() {
    return (
      <ClasesMenu
      onPressSearch={this.buscarClase.bind(this)}
      />
    );
  }

  buscarClase(nombre_profesor, materia, des_domicilio, rating) {
    this.props.navigation.navigate('profesores', {nombre_profesor: nombre_profesor, materia: materia, des_domicilio: des_domicilio, rating: rating, curso: false});
  }
}
class ClasesScreen extends React.Component {
  
  static navigationOptions = ({ navigation }) => {
    return {
      title: "Profesores",
      headerStyle: {
        backgroundColor: '#F28C0F',
        height: hp(10),
        shadowColor: 'transparent'
      },
      headerTitleStyle: {
        fontSize: hp(2),
      }, 
      headerRight: () => 
        <FontAwesome name="map" style={{ paddingRight: wp(5), color: 'white' }}
                onPress={() => navigation.navigate("mapaVarios", { nombre_profesor: navigation.getParam("nombre_profesor"), materia: navigation.getParam("materia"), des_domicilio: navigation.getParam("des_domicilio"), rating: navigation.getParam("rating"), tipo: 'Profesor' })}
                size={22}
        />
      ,
      headerTintColor: 'white',
    };
  }
  
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <Clases
        onPressGo={this.buscarProfesor.bind(this)}
      />
    );

  }
  buscarProfesor(id_usuario, nombre, apellido, domicilio, esProfesor) {
    if(esProfesor){
      this.props.navigation.navigate('profesorEspecifico', {id_usuario: id_usuario, nombre_profesor: nombre, apellido: apellido, domicilio: domicilio, esProfesor: esProfesor});
    }
    else{
      this.props.navigation.navigate('usuarioEspecifico', {id_usuario: id_usuario, nombre_profesor: nombre, esProfesor: esProfesor});
    }
  }
}
//******************************************* */
//******************CURSOS******************* */
//******************************************* */
class CursosMenuScreen extends React.Component {
  
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <CursosMenu
      onPressSearch={this.buscarClase.bind(this)}
      />
    );
  }

  buscarClase(nombre_curso, tema, domicilio) {
    this.props.navigation.navigate('cursos', {nombre_curso: nombre_curso, tema: tema, domicilio: domicilio});
  }
}
class CursosScreen extends React.Component {
  
  static navigationOptions = ({ navigation }) => {
    return {
      title: "Cursos",
      headerStyle: {
        backgroundColor: '#F28C0F',
        height: hp(10),
        shadowColor: 'transparent'
      },
      headerTitleStyle: {
        fontSize: hp(2),
      }, 
      headerRight: () => 
        <FontAwesome name="map" style={{ paddingRight: wp(5), color: 'white' }}
                onPress={() => navigation.navigate("mapaVarios", { tipo: 'Curso', curso: true })}
                size={22}
        />
      ,
      headerTintColor: 'white',
    };
  }
  
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <Cursos
        onPressGo={this.buscarCurso.bind(this)}
      />
    );

  }
  buscarCurso(id_curso, nombre_curso, institucion, domicilio) {
    this.props.navigation.navigate('cursoEspecifico', {id_curso: id_curso, nombre_curso: nombre_curso, institucion: institucion, domicilio: domicilio});

  }
}
class CursoEspecificoScreen extends React.Component {
  
  static navigationOptions = ({ navigation }) => {
    return {
      title: "Detalles",
      headerStyle: {
        backgroundColor: '#F28C0F',
        height: hp(10),
        borderBottomWidth: 0
      },
      headerTitleStyle: {
        fontSize: hp(2),
      }, 
      headerRight: () => 
        <View style={{ flexDirection: 'row' }}>
          <FontAwesome name="map-marker" style={{ paddingRight: wp(5), color: 'white' }}
            onPress={() => navigation.navigate("mapaUnico", {id_profesor: navigation.getParam('id_usuario'), nombre: navigation.getParam('nombre_curso'), domicilio: navigation.getParam('domicilio'), tipo: 'Unico', mapa: false })}
            size={22}
          />
        </View>
      ,
      headerTintColor: 'white',
    };
  }
  
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <CursoEspecifico
        onPressSearch={this.buscarCurso.bind(this)}
      />
    );

  }
  buscarCurso() {
    this.props.navigation.navigate('Profesores', {});
  }
}
//************** */
//BuscarTab
//************** */
const BuscarTabNavigator = createBottomTabNavigator({
  Clases: {
    screen: ClasesMenuScreen,
    navigationOptions: {
      tabBarLabel: ({ focused }) => <Text style={{ fontSize: hp(1.5), color: (focused ? '#A7370F' : "white")}}>Clases</Text>,
      tabBarIcon: ({ tintColor }) => {return (<FontAwesome5 name="chalkboard-teacher" size={hp(2.5)} color={tintColor} />)}
    }
  },
  Cursos: {
    screen: CursosMenuScreen,
    navigationOptions: {
      tabBarLabel: ({ focused }) => <Text style={{ fontSize: hp(1.5), color: (focused ? '#A7370F' : "white")}}>Cursos</Text>,
      tabBarIcon: ({ tintColor }) => {return (<MaterialCommunityIcons name="school" size={hp(2.5)} color={tintColor} />)}
    }
  }
},
{
  navigationOptions: ({ navigation }) => {
    const { routeName } = navigation.state.routes[navigation.state.index]
    return {
      headerTitle: () => (<Text style={{fontFamily: 'shakies', fontSize: wp(7), color: "white"}}>CoLearning</Text>),
      //headerTitle: 'CoLearning',
      //(<Image source={ExportadorLogos.traerLogoBlanco()} styles={styles.imageHeader} resizeMode='contain'/>),
      headerTintColor: 'white',
      headerStyle: {
        backgroundColor: '#F28C0F',
        height: hp(10),
        borderBottomWidth: 0,
      },
    }
  },
swipeEnabled: true,
  tabBarOptions: {
    Title: 'Mi Plan',
    activeTintColor: '#A7370F',
    inactiveTintColor: 'white',
    style: {
      backgroundColor: '#F28C0F',
      borderTopColor: '#F28C0F'
    },
    labelStyle: {
      fontSize: 18,
      paddingVertical: 10
    }

  }
});

const BuscarStackNavigator = createStackNavigator({

  BuscarTabNavigator: {
    screen: BuscarTabNavigator,
    navigationOptions: ({ navigation }) => {
      return {
        headerLeft: () =>
          <Icon
            style={{ paddingLeft: wp(5), color: 'white' }}
            onPress={() => navigation.openDrawer()}
            name="md-menu"
            size={hp(3.3)}
          />
        ,
      }
    }     
  },
  profesores: ClasesScreen,
  cursos: CursosScreen,
  usuarioEspecifico: PerfilHomeScreen,
  profesorEspecifico: PerfilTabNavigatorProfesor,
  profesorEspecifico2: PerfilTabNavigatorProfesor,
  cursoEspecifico: CursoEspecificoScreen,
  mapaVarios: MapaVariosScreen, 
  mapaUnico: MapaUnicoScreen,
  ChatEspecifico: ChatEspecificoScreen
}
);
//******************************************* */
//******************HOME******************* */
//******************************************* */
class HomeClasesMenuScreen extends React.Component {

  static navigationOptions = ({ navigation }) => {
    return {
      title: "Clases",
      headerStyle: {
        backgroundColor: '#6BA8FF',
        height: hp(10),
        shadowColor: 'Clases'
      },
      headerTitleStyle: {
        fontSize: hp(2),
      }, 
      headerTintColor: '#A01A50',
    };
  }

  render() {
    return (
      <HomeClases
        onPressGo={this.buscarClase.bind(this)}
      />
    );
  }

  buscarClase(id_usuario, nombre, domicilio, esProfesor) {
      this.props.navigation.navigate('profesorEspecifico', {id_usuario: id_usuario, nombre_profesor: nombre, domicilio: domicilio, esProfesor: esProfesor});
  }
}
class HomeCursosScreen extends React.Component {
  
  static navigationOptions = ({ navigation }) => {
    return {
      title: "Cursos",
      headerStyle: {
        backgroundColor: '#6BA8FF',
        height: hp(10),
        shadowColor: 'transparent'
      },
      headerTitleStyle: {
        fontSize: hp(2),
      }, 
      headerTintColor: '#A01A50',
    };
  }
  render() {
    return (
      <HomeCursos
        onPressGo={this.buscarCurso.bind(this)}
      />
    );
  }

  buscarCurso(id_curso, nombre_curso, institucion, domicilio) {
    this.props.navigation.navigate('cursoEspecifico', {id_curso: id_curso, nombre_curso: nombre_curso, institucion: institucion, domicilio: domicilio});
  }
}
const HomeTabNavigator = createBottomTabNavigator({
  HomeClases: {
    screen: HomeClasesMenuScreen,
    navigationOptions: {
      tabBarLabel: ({ focused }) => <Text style={{ fontSize: hp(1.5), color: (focused ? '#A7370F' : "white")}}>Clases</Text>,
      tabBarIcon: ({ tintColor }) => {return (<FontAwesome5 name="chalkboard-teacher" size={hp(2.5)} color={tintColor} />)}
    }
  },
  HomeCursos: {
    screen: HomeCursosScreen,
    navigationOptions: {
      tabBarLabel: ({ focused }) => <Text style={{ fontSize: hp(1.5), color: (focused ? '#A7370F' : "white")}}>Cursos</Text>,
      tabBarIcon: ({ tintColor }) => {return (<MaterialCommunityIcons name="school" size={hp(2.5)} color={tintColor} />)}
    }
  }
},
{
  navigationOptions: ({ navigation }) => {
    const { routeName } = navigation.state.routes[navigation.state.index]
    return {
      headerTitle: 'Recomendados',
      headerTintColor: 'white',
      headerStyle: {
        backgroundColor: '#F28C0F',
        height: hp(10),
        borderBottomWidth: 0
      },
      headerTitleStyle: {
        fontSize: hp(2),
      }
    }
  },
swipeEnabled: true,
  Title: 'Ficha',
  tabBarOptions: {
    Title: 'Mi Plan',
    activeTintColor: '#A7370F',
    inactiveTintColor: 'white',   
    style: {
      backgroundColor: '#F28C0F',
      borderTopColor: '#FFC5C5'

    },
    labelStyle: {
      fontSize: 18,
      paddingVertical: 10
    }

  }
});

const HomeStackNavigator = createStackNavigator(
  {
    HomeScreen: {
      screen: HomeTabNavigator,
      navigationOptions: ({ navigation }) => {
        return {
          // headerLeft: () => <SomeElement />
          headerLeft: () =>
            <Icon
              style={{ paddingLeft: wp(5), color: 'white' }}
              onPress={() => navigation.openDrawer()}
              name="md-menu"
              size={hp(3.3)}
            />
          ,
        }
      }     
    },
    usuarioEspecifico: PerfilHomeScreen,
    profesorEspecifico: PerfilTabNavigatorProfesor,
    profesorEspecifico2: PerfilTabNavigatorProfesor,
    cursoEspecifico: CursoEspecificoScreen,
    mapaUnico: MapaUnicoScreen,
    ChatEspecifico: ChatEspecificoScreen
  },
  {
    initialRouteName: 'HomeScreen',
  }
);

//******************************************* */
//******************FORO******************** */
//******************************************* */
class ForoMenuScreen extends React.Component {
  
  static navigationOptions = ({ navigation }) => {
    return {
      title: "Foros",
      headerStyle: {
        backgroundColor: '#F28C0F',
        height: hp(10),
        shadowColor: 'transparent',
      },
      headerTitleStyle: {
        fontSize: hp(2),
      }, 
      headerTintColor: 'white',
    };
  }
  
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <ForoMenu
      onPressSearch={this.buscarForos.bind(this)}
      onPressGoForo={this.buscarForo.bind(this)}
      onPressGoUsuario={this.buscarUsuario.bind(this)}
      />
    );

  }
  buscarForos(tema) {
    this.props.navigation.navigate('foros', {tema: tema});
  }
  buscarForo(id_foro, nombre_foro, pregunta) {
    this.props.navigation.navigate('foroEspecifico', {id_foro: id_foro, nombre_foro: nombre_foro, pregunta: pregunta});
  }
  buscarUsuario(id_usuario, nombre_usuario, esProfesor) {
    if(esProfesor){
      this.props.navigation.navigate('profesorEspecifico', {id_usuario: id_usuario, nombre_profesor: nombre_usuario, esProfesor: esProfesor});
    }
    else{
      this.props.navigation.navigate('usuarioEspecifico', {id_usuario: id_usuario, nombre_usuario: nombre_usuario, esProfesor: esProfesor});
    }
  }
}
class ForosScreen extends React.Component {
  
  static navigationOptions = ({ navigation }) => {
    return {
      title: "Foros",
      headerStyle: {
        backgroundColor: '#F28C0F',
        height: hp(10),
        shadowColor: 'transparent'
      },
      headerTitleStyle: {
        fontSize: hp(2),
      }, 
      headerTintColor: 'white',
    };
  }
  
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <Foros
        onPressGoForo={this.buscarForo.bind(this)}
        onPressGoUsuario={this.buscarUsuario.bind(this)}
      />
    );

  }
  
  buscarForo(id_foro, nombre_foro, pregunta) {
    this.props.navigation.navigate('foroEspecifico', {id_foro: id_foro, nombre_foro: nombre_foro, pregunta: pregunta});
  }
  buscarUsuario(id_usuario, nombre_usuario, esProfesor) {
    if(esProfesor){
      this.props.navigation.navigate('profesorEspecifico', {id_usuario: id_usuario, nombre_profesor: nombre_usuario, esProfesor: esProfesor});
    }
    else{
      this.props.navigation.navigate('usuarioEspecifico', {id_usuario: id_usuario, nombre_profesor: nombre_usuario, esProfesor: esProfesor});
    }
  }
}
class ForoNewScreen extends React.Component {
  
  static navigationOptions = ({ navigation }) => {
    return {
      title: "Crear Foro",
      headerStyle: {
        backgroundColor: '#F28C0F',
        height: hp(10),
        shadowColor: 'transparent'
      },
      headerTitleStyle: {
        fontSize: hp(2),
      }, 
      headerTintColor: 'white',
    };
  }
  
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <ForoNew
        onPressVolver={this.volver.bind(this)}
        id_usuario={id_perfil}
      />
    );

  }
  
  volver() {
    this.props.navigation.navigate('ForoMenuScreen');
  }
}
class ForoEspecificoScreen extends React.Component {
  
  static navigationOptions = ({ navigation }) => {
    return {
      title: "Foro",
      headerStyle: {
        backgroundColor: '#F28C0F',
        height: hp(10),
        borderBottomWidth: 0
      },
      headerTitleStyle: {
        fontSize: hp(2),
      }, 
      headerTintColor: 'white',
    };
  }
  
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <ForoEspecifico
      onPressGoUsuario={this.buscarUsuario.bind(this)}
      id_usuario={id_perfil}
      />
    );

  }
  buscarUsuario(id_usuario, nombre_usuario, esProfesor) {
    if(esProfesor){
      this.props.navigation.navigate('profesorEspecifico', {id_usuario: id_usuario, nombre_usuario: nombre_usuario, esProfesor: esProfesor});
    }
    else{
      this.props.navigation.navigate('usuarioEspecifico', {id_usuario: id_usuario, nombre_usuario: nombre_usuario, esProfesor: esProfesor});
    }
  }
}
const ForoStackNavigator = createStackNavigator(
  {
    ForoMenuScreen: {
      screen: ForoMenuScreen,
      navigationOptions: ({ navigation }) => {
        return {
          // headerLeft: () => <SomeElement />
          headerLeft: () =>
            <Icon
              style={{ paddingLeft: wp(5), color: 'white' }}
              onPress={() => navigation.openDrawer()}
              name="md-menu"
              size={hp(3.3)}
            />
          ,
          headerRight: () =>
            <FontAwesome
              style={{ paddingRight: wp(5), color: 'white' }}
              onPress={() => navigation.navigate("foroNew")}
              name="plus"
              size={hp(3)}
            />
        }
      }     
    },
    foros: ForosScreen,
    foroNew: ForoNewScreen,
    foroEspecifico: ForoEspecificoScreen,
    usuarioEspecifico: PerfilHomeScreen,
    mapaUnico: MapaUnicoScreen,
    profesorEspecifico: PerfilTabNavigatorProfesor,
    ChatEspecifico: ChatEspecificoScreen
  },
  {
    initialRouteName: 'ForoMenuScreen',
  }
);
//******************************************* */
//******************PLAN******************** */
//******************************************* */
class PlanMenuScreen2 extends React.Component {
  
  static navigationOptions = ({ navigation }) => {

    return {
      
      headerStyle: {
        backgroundColor: '#F28C0F',
        height: hp(10),
        borderBottomWidth: 0
      },
      drawerIcon: (esProfesorTodo ?  ({ tintColor }) => (<FontAwesome5 name="money-bill" size={20} color={tintColor} />) : ({ tintColor }) => (<MaterialCommunityIcons name="school" size={24} color={tintColor} />)),
      headerTitleStyle: {
        fontSize: hp(2),
      }, 
      headerTintColor: 'white',
    };
  }
  
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <Planes
      />
    );

  }
}
class PlanMenuScreen extends React.Component {
  
  static navigationOptions = ({ navigation }) => {

    return {
      
      headerStyle: {
        backgroundColor: '#F28C0F',
        height: hp(10),
        borderBottomWidth: 0
      },
      drawerIcon: (esProfesorTodo ?  ({ tintColor }) => (<FontAwesome5 name="money-bill" size={20} color={tintColor} />) : ({ tintColor }) => (<MaterialCommunityIcons name="school" size={24} color={tintColor} />)),
      headerTitleStyle: {
        fontSize: hp(2),
      }, 
      headerTintColor: 'white',
    };
  }
  
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <Planes
          onPressGoUsuario={this.buscarUsuario.bind(this)}
      />
    );

  }
  buscarUsuario() {
    this.props.navigation.navigate(PerfilComentariosScreen);
  }
}
const PlanStackNavigator = createStackNavigator(
  {
    PlanMenuScreen: {
      screen: PlanMenuScreen,
      navigationOptions: ({ navigation }) => {
        return {
          title: esProfesorTodo ? "Planes" : "Profesores",
          // headerLeft: () => <SomeElement />
          headerLeft: () =>
            <Icon
              style={{ paddingLeft: wp(5), color: 'white' }}
              onPress={() => navigation.openDrawer()}
              name="md-menu"
              size={hp(3.3)}
            />
          ,
          title: esProfesorTodo ? "Planes" : "Profesores",
        }
      }     
    },
    foros: ForosScreen,
  },
  {
    initialRouteName: 'PlanMenuScreen',
  }
);
//******************************************* */
//******************Drawer******************* */
//******************************************* */

const DrawerConfig = {
  contentComponent: ({ navigation }) => {
    return (<MenuDrawer navigation={navigation} />)
  },
  contentOptions: {
    activeTintColor: '#3399ff'
  }
}
const customDrawerComponent = (props) => (
  <View style={{ flex: 1 }}>
    <ScrollView style={{ borderTopWidth: 0, marginTop: 0, paddingTop: 0, flex: 1 }}>
    <LinearGradient colors={['#F28C0F', '#F28C0F']} style={styles.profile}>
      <Image style={styles.imageDrawer} source={ExportadorLogos.traerLogoBlanco()}></Image>
    </LinearGradient>
    <DrawerItems {...props} style={{ borderTopWidth: 0, marginTop: 0, paddingTop: 0 }} />
    <TouchableOpacity style={{flex: 1, alignItems: "center", justifyContent: "flex-end", marginTop: hp(33), flexDirection: "row", padding: wp(5)}} onPress={() => props.navigation.navigate('switchLogIn')}>
      <Entypo style={{opacity: 0.6}} name={"log-out"} size={wp(6.6)} color="white" />
      <Text style={{ color: "white", fontWeight: "bold", fontSize: wp(3.5), marginLeft: wp(2)}}>Cerrar Sesión</Text>
    </TouchableOpacity>  
    </ScrollView>
  </View>
)

const PerfilSwitchNavigator = createSwitchNavigator({
  PerfilValidation: PerfilValidationScreen,
  PerfilProfesorStack: PerfilProfesorStackNavigator,
  PerfilUsuarioStack: PerfilUsuarioStackNavigator
});

const AppDrawerNavigator = createDrawerNavigator({
  Home: {
    screen: HomeStackNavigator,
    navigationOptions: {
      title: "Inicio",
      drawerIcon: ({ tintColor }) => (<FontAwesome name="home" size={wp(6.6)} color={tintColor} />)
    }
  },
  Clases: {
    screen: BuscarStackNavigator,
    navigationOptions: {
      title: "Buscar Profesores",
      drawerIcon: ({ tintColor }) => (<FontAwesome name="search" size={wp(6.6)} color={tintColor} />)
    }
  },
  Chat: {
    screen: ChatListStackNavigator,
    navigationOptions: {
      title: "Chats",
      drawerIcon: ({ tintColor }) => (<FontAwesome name="comments" size={wp(6.6)} color={tintColor} />)
    }
  },
  Foro: {
    screen: ForoStackNavigator,
    navigationOptions: {
      title: "Foros",
      drawerIcon: ({ tintColor }) => (<FontAwesome name="list" size={wp(6.6)} color={tintColor} />)
    }
  },
  Planes: {
    screen: PlanStackNavigator,
    navigationOptions: {
      title: "Clases",
      drawerIcon: (esProfesorTodo ?  ({ tintColor }) => ([<FontAwesome5 name="money-check-alt" size={24} color={tintColor} />]) : ({ tintColor }) => ([<MaterialCommunityIcons name="school" size={24} color={tintColor} />]))
    }
  },
  Perfil: {
    screen: PerfilSwitchNavigator,
    navigationOptions: {
      title: "Perfil",
      drawerIcon: ({ tintColor }) => (<FontAwesome name="user" size={wp(6.6)} color={tintColor} />)
    }
  }
},
  // DrawerConfig,

  {
    //drawerType: 'slide',
    overlayColor: 'rgba(0, 0, 0, 0.5)',
    contentComponent: customDrawerComponent,
    drawerOpenRoute: 'DrawerOpen',
    drawerCloseRoute: 'DraweClose',
    drawerToggleRoute: 'DrawerToggle',
    drawerBackgroundColor: '#F28C0F',
    //drawerWidth: width * 0.56,
    contentOptions: {
      //Esto sirve para cambiar algunos colores
      activeTintColor: '#A7370F',
      inactiveTintColor: 'white',
      labelStyle: {
        fontSize: wp(3.5)
      }
    },
  },
  //  {
  //     drawerBackgroundColor: '#ebf0f7',
  //     contentOptions: {
  //       //Esto sirve para cambiar algunos colores
  //       activeTintColor: '#hp(10)hp(10)ff',
  //       inactiveTintColor:'#3399ff'
  //     }
  //   }
);


// *****************************************************
// **********************Switch*************************
// *****************************************************

const AppSwitchNavigator = createSwitchNavigator({
  switchLogIn: {screen: SwitchLogInScreen},
  switchContraseña: { screen: SwitchContraseñaScreen },
  switchCrearUser: { screen: SwitchCrearUserScreen },
  drawer: { screen: AppDrawerNavigator },
});

const AppContainer = createAppContainer(AppSwitchNavigator);
//const AppContainer = createAppContainer(AppDrawerNavigator);

const resizeMode = 'center';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }, name: {
    fontSize: 20,
    paddingLeft: 10,
    paddingTop: 5,
    color: 'white',
    textAlign: 'left',
  },
  profile: {
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 0,
    paddingTop: hp(2),
    height: hp(20),
    borderBottomColor: '#3399ff',
    backgroundColor: '#3399ff',
  },
  imgView: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  imageDrawer: {
    width: hp(25),
    resizeMode: 'contain'
  },
  imageHeader: {
    height: 2,
    width: 2,
  },
  profileText: {
    flex: 3,
    paddingLeft: 10,
    flexDirection: 'column',
    justifyContent: 'center'
  },
  bgImage: {
    position: 'absolute',
    width: '100%',
    justifyContent: 'center',
  }
});
