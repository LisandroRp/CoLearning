import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { StyleSheet, Image, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'
import { ScrollView } from 'react-native-gesture-handler';
import Icon from '@expo/vector-icons/Ionicons';
import { FontAwesome } from '@expo/vector-icons';
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

import LogIn from './components/LogIn'
import SwitchLogIn from './components/SwitchLogIn'
import SwitchCrearUser from './components/SwitchCrearUser'
import SwitchContraseña from './components/SwitchContraseña'
import ClasesMenu from './components/ClasesMenu'
import CursosMenu from './components/CursosMenu'
import Cursos from './components/Cursos'
import UsuarioEspecifico from './components/UsuarioEspecifico'
import UserComentarios from './components/UserComentarios'
import UserCalendario from './components/UserCalendario'
import Clases from './components/Clases'
import CursoEspecifico from './components/CursoEspecifico';
import MapaVarios from './components/MapaVarios'
import MapaUnico from './components/MapaUnico'
import Home from './components/Home'
import HomeClases from './components/HomeClases'
import HomeCursos from './components/HomeCursos'
import DatosPersonales from './components/DatosPersonales'
import ChatList from './components/ChatList'
import ChatEspecifico from './components/Chat'
import ForoMenu from './components/ForoMenu'
import Foros from './components/Foros'
import ForoEspecifico from './components/ForoEspecifico'

import UserDataManager from './components/UserDataManager';
import ExportadorLogos from './components/exportadores/ExportadorLogos';


console.disableYellowBox = true

//UserDataManager.getInstance().setCurrentPositionFromReact()

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
  checkLogin(IdUser) {
    this.props.navigation.navigate('drawer', { IdUser: IdUser });
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
    this.props.navigation.navigate('SignUpClass')
  }
}
class SwitchCrearUserScreen extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <SwitchCrearUser
        onPress={this.checkPassword.bind(this)}
      />
    );
  }
  checkPassword() {
    this.props.navigation.navigate('SignUpClass')
  }
}

//******************************************* */
//******************MAPAS******************** */
//******************************************* */
class MapaVariosScreen extends React.Component {

  static navigationOptions = ({ navigation }) => {
    return {
      title: "Mapa",
      headerStyle: {
        backgroundColor: '#F28C0F',
        height: 66,
        borderBottomWidth: 0
      },
      headerTintColor: 'white',
    };
  }

  constructor(props) {
    super(props);
    this.state = {
      tipo: this.props.navigation.getParam('tipo'),
    }
  }
  render() {
    return (
      <MapaVarios
        onPressGoCurso={this.pasarDetallesCurso.bind(this)}
        onPressGoProfesor={this.pasarDetallesProfesor.bind(this)}
        onPressMap={this.pasarMapaUnico.bind(this)}
      />
    );
  }
  pasarDetallesCurso(id_curso, nombre, direccion) {
    this.props.navigation.navigate('cursoEspecifico', { id_curso: id_curso });
  }
  pasarDetallesProfesor(id_profesor, nombre, direccion, esProfesor) {
    if(esProfesor){
      this.props.navigation.navigate('profesorEspecifico', { id_profesor: id_profesor });
    }
    else{
      this.props.navigation.navigate('usuarioEspecifico', { id_profesor: id_profesor });
    }
  }
  pasarMapaUnico(id_profesor, nombre, direccion) {
    this.props.navigation.navigate('mapaUnico', {id_profesor: 2, nombre: nombre, direccion: direccion});
  }
}

class MapaUnicoScreen extends React.Component {

  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('nombre', 'Mapa'),
      headerStyle: {
        backgroundColor: '#F28C0F',
        height: 66,
        borderBottomWidth: 0
      },
      headerTintColor: 'white',
    };
  }
  render() {
    return (
      <MapaUnico
        onPressGo={this.pasarConcierto.bind(this)}
      />
    );
  }
  pasarConcierto(id) {
    this.props.navigation.navigate('Detalle', { IdEvento: id });
  }
}
//******************************************* */
//******************Clases******************** */
//******************************************* */
class ClasesMenuScreen extends React.Component {
  
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

  buscarClase(nombre_profesor, tema_profesor, direccion_profesor) {
    this.props.navigation.navigate('profesores', {nombre_profesor: nombre_profesor, tema_profesor: tema_profesor, direccion_profesor: direccion_profesor});
  }
}
class ClasesScreen extends React.Component {
  
  static navigationOptions = ({ navigation }) => {
    return {
      title: "Profesores",
      headerStyle: {
        backgroundColor: '#F28C0F',
        height: 66,
        shadowColor: 'transparent'
      },
      headerRight: (
        <FontAwesome name="map" style={{ paddingRight: 20, color: 'white' }}
                onPress={() => navigation.navigate("mapaVarios", { tipo: 'Profesor' })}
                size={22}
        />
      ),
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
  buscarProfesor(id_profesor, nombre, esProfesor) {
    if(esProfesor){
      this.props.navigation.navigate('profesorEspecifico', {id_profesor: id_profesor, nombre_profesor: nombre, esProfesor: esProfesor});
    }
    else{
      this.props.navigation.navigate('usuarioEspecifico', {id_profesor: id_profesor, nombre_profesor: nombre, esProfesor: esProfesor});
    }
  }
}
//******************************************* */
//******************USUARIO****************** */
//******************************************* */
class UsuarioEspecificoScreen extends React.Component {
  
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <UsuarioEspecifico
        onPressSearch={this.buscarClase.bind(this)}
      />
    );

  }
  buscarClase() {
    this.props.navigation.navigate('Profesores', {});
  }
}
class UserCalendarioScreen extends React.Component {
  
  static navigationOptions = ({ navigation }) => {
    return {
      title: "Contacto",
      headerStyle: {
        backgroundColor: '#6BA8FF',
        height: 66,
        borderBottomWidth: 0
      },
      headerTintColor: '#A01A50',
    };
  } 
  
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <UserCalendario
        onPressSearch={this.buscarClase.bind(this)}
      />
    );

  }
  buscarClase() {
    this.props.navigation.navigate('Profesores', {});
  }
}
class UserComentariosScreen extends React.Component {
  
  static navigationOptions = ({ navigation }) => {
    return {
      title: "Comentarios",
      headerStyle: {
        backgroundColor: '#6BA8FF',
        height: 66,
        borderBottomWidth: 0
      },
      headerTintColor: '#A01A50',
    };
  } 
  
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <UserComentarios
        onPressSearch={this.buscarClase.bind(this)}
      />
    );

  }
  buscarClase() {
    this.props.navigation.navigate('Profesores', {});
  }
}
//************** */
//UsuarioTab
//************** */
const UsuarioTabNavigator = createBottomTabNavigator({
  Profesor: UsuarioEspecificoScreen,
},
{
  navigationOptions: ({ navigation }) => {
    const { routeName } = navigation.state.routes[navigation.state.index]
    return {
      title: "Detalles",
      headerStyle: {
        backgroundColor: '#F28C0F',
        height: 66,
        borderBottomWidth: 0
      },
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
const ProfesorTabNavigator = createBottomTabNavigator({
  Profesor: UsuarioEspecificoScreen,
  Calendario: UserCalendarioScreen,
  Comentario: UserComentariosScreen
},
{
  navigationOptions: ({ navigation }) => {
    const { routeName } = navigation.state.routes[navigation.state.index]
    return {
      title: "Detalles",
      headerStyle: {
        backgroundColor: '#F28C0F',
        height: 66,
        borderBottomWidth: 0
      },
      headerRight: (
        <View style={{ flexDirection: 'row' }}>
          <FontAwesome name="map-marker" style={{ paddingRight: 20, color: 'white' }}
            onPress={() => navigation.navigate("mapaUnico", {id_profesor: 2, nombre: navigation.getParam('nombre_profesor'), direccion: navigation.getParam('direccion'), tipo: 'Unico' })}
            size={22}
          />
        </View>
      ),
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

  buscarClase() {
    this.props.navigation.navigate('cursos', {});
  }
}
class CursosScreen extends React.Component {
  
  static navigationOptions = ({ navigation }) => {
    return {
      title: "Cursos",
      headerStyle: {
        backgroundColor: '#F28C0F',
        height: 66,
        shadowColor: 'transparent'
      },
      headerRight: (
        <FontAwesome name="map" style={{ paddingRight: 20, color: 'white' }}
                onPress={() => navigation.navigate("mapaVarios", { tipo: 'Curso' })}
                size={22}
        />
      ),
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
  buscarCurso(id_curso, nombre_curso, institucion, direccion) {
    this.props.navigation.navigate('cursoEspecifico', {id_curso: id_curso, nombre_curso: nombre_curso, institucion: institucion, direccion: direccion});
  }
}
class CursoEspecificoScreen extends React.Component {
  
  static navigationOptions = ({ navigation }) => {
    return {
      title: "Detalles",
      headerStyle: {
        backgroundColor: '#F28C0F',
        height: 66,
        borderBottomWidth: 0
      },
      headerRight: (
        <View style={{ flexDirection: 'row' }}>
          <FontAwesome name="map-marker" style={{ paddingRight: 20, color: 'white' }}
            onPress={() => navigation.navigate("mapaUnico", {id_profesor: 2, nombre: navigation.getParam('nombre_curso'), direccion: navigation.getParam('direccion'), tipo: 'Unico' })}
            size={22}
          />
        </View>
      ),
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
  Clases: ClasesMenuScreen,
  Cursos: CursosMenuScreen
},
{
  navigationOptions: ({ navigation }) => {
    const { routeName } = navigation.state.routes[navigation.state.index]
    return {
      headerTitle: 'CoLearning',
      //(<Image source={ExportadorLogos.traerLogoBlanco()} styles={styles.imageHeader} resizeMode='contain'/>),
      headerTintColor: 'white',
      headerStyle: {
        backgroundColor: '#F28C0F',
        height: 66,
        borderBottomWidth: 0,
      },
    }
  },
swipeEnabled: true,
  Title: 'Ficha',
  tabBarOptions: {
    Title: 'Mi Plan',
    activeTintColor: '#A7370F',
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
        headerLeft: (
          <Icon
            style={{ paddingLeft: 10, color: 'white' }}
            onPress={() => navigation.openDrawer()}
            name="md-menu"
            size={30}
          />
        ),
      }
    }     
  },
  profesores: ClasesScreen,
  cursos: CursosScreen,
  usuarioEspecifico: UsuarioTabNavigator,
  profesorEspecifico: ProfesorTabNavigator,
  cursoEspecifico: CursoEspecificoScreen,
  mapaVarios: MapaVariosScreen, 
  mapaUnico: MapaUnicoScreen,
}
);
//******************************************* */
//******************PERFIL******************* */
//******************************************* */
class PerfilScreen extends React.Component {
  
  static navigationOptions = ({ navigation }) => {
    return {
      title: "Datos Personales",
      headerStyle: {
        backgroundColor: '#6BA8FF',
        height: 66,
        borderBottomWidth: 0
      },
      headerTintColor: '#A01A50',
      headerStyle: {
        backgroundColor: '#6BA8FF',
        height: 66,
        borderBottomWidth: 0
      }
    };
  }
  
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <DatosPersonales
        onPressSearch={this.buscarClase.bind(this)}
      />
    );

  }
  buscarClase() {
    this.props.navigation.navigate('Profesores', {});
  }
}
const PerfilTabNavigator = createBottomTabNavigator({
  Perfil: PerfilScreen,
},
{
  navigationOptions: ({ navigation }) => {
    const { routeName } = navigation.state.routes[navigation.state.index]
    return {
      headerTitle: 'Perfil',
      headerTintColor: 'white',
      headerLeft: (
        <Icon
          style={{ paddingLeft: 10, color: '#A01A50' }}
          onPress={() => navigation.openDrawer()}
          name="md-menu"
          size={30}
        />
      ),
      headerStyle: {
        backgroundColor: '#F28C0F',
        height: 66,
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
const PerfilStackNavigator = createStackNavigator(
  {
    PerfilTabNavigator: {
      screen: PerfilTabNavigator,
      navigationOptions: ({ navigation }) => {
        return {
          // headerLeft: () => <SomeElement />
          headerLeft: (
            <Icon
              style={{ paddingLeft: 10, color: 'white' }}
              onPress={() => navigation.openDrawer()}
              name="md-menu"
              size={30}
            />
          ),
        }
      }     
    },
  },
  {
    initialRouteName: 'PerfilTabNavigator',
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
        height: 66,
        shadowColor: 'Clases'
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

  buscarClase(id_profesor, nombre, esProfesor) {
    if(esProfesor){
      this.props.navigation.navigate('profesorEspecifico', {id_profesor: id_profesor, nombre_profesor: nombre, esProfesor: esProfesor});
    }
    else{
      this.props.navigation.navigate('usuarioEspecifico', {id_profesor: id_profesor, nombre_profesor: nombre, esProfesor: esProfesor});
    }
  }
}
class HomeCursosScreen extends React.Component {
  
  static navigationOptions = ({ navigation }) => {
    return {
      title: "Cursos",
      headerStyle: {
        backgroundColor: '#6BA8FF',
        height: 66,
        shadowColor: 'transparent'
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

  buscarCurso(id_curso, nombre_curso, institucion, direccion) {
    this.props.navigation.navigate('cursoEspecifico', {id_curso: id_curso, nombre_curso: nombre_curso, institucion: institucion, direccion: direccion});
  }
}
const HomeTabNavigator = createBottomTabNavigator({
  HomeClases: HomeClasesMenuScreen,
  HomeCursos: HomeCursosScreen
},
{
  navigationOptions: ({ navigation }) => {
    const { routeName } = navigation.state.routes[navigation.state.index]
    return {
      headerTitle: 'Recomendados',
      headerTintColor: 'white',
      headerStyle: {
        backgroundColor: '#F28C0F',
        height: 66,
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
          headerLeft: (
            <Icon
              style={{ paddingLeft: 10, color: 'white' }}
              onPress={() => navigation.openDrawer()}
              name="md-menu"
              size={30}
            />
          ),
        }
      }     
    },
    usuarioEspecifico: UsuarioTabNavigator,
    profesorEspecifico: ProfesorTabNavigator,
    cursoEspecifico: CursoEspecificoScreen,
    mapaUnico: MapaUnicoScreen
  },
  {
    initialRouteName: 'HomeScreen',
  }
);

//******************************************* */
//******************CHAT******************** */
//******************************************* */
class LogInScreen extends React.Component {

  static navigationOptions = ({ navigation }) => {
    return {
      title: "Chats",
      headerStyle: {
        backgroundColor: '#F28C0F',
        height: 66,
        borderBottomWidth: 0
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
        height: 66,
        borderBottomWidth: 0
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
        height: 66,
        borderBottomWidth: 0
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
      />
    );
  }
  pasarChat(nombre_chatOrigen, nombre_chatDestino) {
    this.props.navigation.navigate('ChatEspecifico', { nombre_chatOrigen: nombre_chatOrigen, nombre_chatDestino: nombre_chatDestino });
  }
}
class ChatEspecificoScreen extends React.Component {

  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam("nombre_chatDestino"),
      headerStyle: {
        backgroundColor: '#6BA8FF',
        height: 66,
        borderBottomWidth: 0
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
      <ChatEspecifico
        onPressGoChat={this.pasarChat.bind(this)}
      />
    );
  }
  pasarChat(id_chat, nombre, direccion) {
    this.props.navigation.navigate('cursoEspecifico', { id_curso: id_curso });
  }
}
const ChatListStackNavigator = createStackNavigator(
  {
    LogInScreen: {
      screen: LogInScreen,
      navigationOptions: ({ navigation }) => {
        return {
          // headerLeft: () => <SomeElement />
          headerLeft: (
            <Icon
              style={{ paddingLeft: 10, color: '#A01A50' }}
              onPress={() => navigation.openDrawer()}
              name="md-menu"
              size={30}
            />
          ),
        }
      }     
    },
    CreateAccount: CreateAccountScreen,
    ChatList: ChatListScreen,
    ChatEspecifico: ChatEspecificoScreen
  },
  {
    initialRouteName: 'LogInScreen',
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
        height: 66,
        shadowColor: 'transparent'
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
  buscarForos(id_profesor, nombre, direccion) {
    this.props.navigation.navigate('foros', {id_profesor: id_profesor, nombre_profesor: nombre, direccion: direccion});
  }
  buscarForo(id_foro, nombre_foro) {
    this.props.navigation.navigate('foroEspecifico', {id_foro: id_foro, nombre_foro: nombre_foro});
  }
  buscarUsuario(id_usuario, nombre_usuario, esProfesor) {
    if(esProfesor){
      this.props.navigation.navigate('profesorEspecifico', {id_profesor: id_usuario, nombre_profesor: nombre_usuario});
    }
    else{
      this.props.navigation.navigate('usuarioEspecifico', {id_usuario: id_usuario, nombre_usuario: nombre_usuario});
    }
  }
}
class ForosScreen extends React.Component {
  
  static navigationOptions = ({ navigation }) => {
    return {
      title: "Foros",
      headerStyle: {
        backgroundColor: '#F28C0F',
        height: 66,
        shadowColor: 'transparent'
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
  buscarForo(id_foro, nombre_foro) {
    this.props.navigation.navigate('foroEspecifico', {id_foro: id_foro, nombre_foro: nombre_foro});
  }
  buscarUsuario(id_usuario, nombre_usuario, esProfesor) {
    if(esProfesor){
      this.props.navigation.navigate('profesorEspecifico', {id_profesor: id_usuario, nombre_profesor: nombre_usuario, esProfesor: esProfesor});
    }
    else{
      this.props.navigation.navigate('usuarioEspecifico', {id_profesor: id_usuario, nombre_profesor: nombre_usuario, esProfesor: esProfesor});
    }
  }
}
class ForoEspecificoScreen extends React.Component {
  
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('nombre_foro', 'Foro'),
      headerStyle: {
        backgroundColor: '#F28C0F',
        height: 66,
        borderBottomWidth: 0
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
          headerLeft: (
            <Icon
              style={{ paddingLeft: 10, color: 'white' }}
              onPress={() => navigation.openDrawer()}
              name="md-menu"
              size={30}
            />
          ),
        }
      }     
    },
    foros: ForosScreen,
    foroEspecifico: ForoEspecificoScreen,
    usuarioEspecifico: UsuarioTabNavigator,
    profesorEspecifico: ProfesorTabNavigator,
  },
  {
    initialRouteName: 'ForoMenuScreen',
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
    <LinearGradient colors={['#F28C0F', '#F28C0F']} style={styles.profile}>
      <Image style={styles.imageDrawer} source={ExportadorLogos.traerLogoBlanco()}></Image>
    </LinearGradient>
    <ScrollView style={{ borderTopWidth: 0, marginTop: 0, paddingTop: 0 }}>
      <DrawerItems {...props} style={{ borderTopWidth: 0, marginTop: 0, paddingTop: 0 }} />
    </ScrollView>
  </View>
)
const AppDrawerNavigator = createDrawerNavigator({
  Home: {
    screen: HomeStackNavigator,
    navigationOptions: {
      title: "Inicio",
      drawerIcon: ({ tintColor }) => (<FontAwesome name="home" size={24} color={tintColor} />)
    }
  },
  Clases: {
    screen: BuscarStackNavigator,
    navigationOptions: {
      title: "Buscar Profesores",
      drawerIcon: ({ tintColor }) => (<FontAwesome name="search" size={24} color={tintColor} />)
    }
  },
  Chat: {
    screen: ChatListStackNavigator,
    navigationOptions: {
      title: "Chats",
      drawerIcon: ({ tintColor }) => (<FontAwesome name="comments" size={24} color={tintColor} />)
    }
  },
  Foro: {
    screen: ForoStackNavigator,
    navigationOptions: {
      title: "Foro",
      drawerIcon: ({ tintColor }) => (<FontAwesome name="list" size={24} color={tintColor} />)
    }
  },
  Perfil: {
    screen: PerfilStackNavigator,
    navigationOptions: {
      title: "Perfil",
      drawerIcon: ({ tintColor }) => (<FontAwesome name="user" size={24} color={tintColor} />)
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
        fontSize: 15
      }
    },
  },
  //  {
  //     drawerBackgroundColor: '#ebf0f7',
  //     contentOptions: {
  //       //Esto sirve para cambiar algunos colores
  //       activeTintColor: '#6666ff',
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
  drawer: { screen: AppDrawerNavigator }
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
    width: hp(28),
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
