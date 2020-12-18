import React from 'react';
import { GiftedChat } from 'react-native-gifted-chat'; // 0.3.0
import { View, Image, StyleSheet, ActivityIndicator, FlatList, SafeAreaView, TouchableOpacity, StatusBar, Text, Dimensions, ScrollView, RefreshControl } from 'react-native';
import { SearchBar, ThemeConsumer } from 'react-native-elements';
import { withNavigation } from 'react-navigation';

import fireBase from '../FirebaseList';
import ExportadorObjetos from './exportadores/ExportadorObjetos'
import ExportadorLogos from './exportadores/ExportadorLogos'

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import ApiController from '../controller/ApiController';

var { height, width } = Dimensions.get('window');

class ChatList extends React.Component {

  constructor(props) {
    super(props);
  }
  static navigationOptions = ({ navigation }) => ({
    title: (navigation.state.params || {}).name || 'Chat!',
  });

  state = {
    chatList: [
      { id_chat: 1, id_usuario: 1, nombre_usuario: "Pedro", apellido: "Gonzales" },
      { id_chat: 2, id_usuario: 2, nombre_usuario: "Juan", apellido: "Gonzales" },
      { id_chat: 3, id_usuario: 3, nombre_usuario: "Gabriel", apellido: "Gonzales" }
    ],
    memory: [
      { id_chat: 1, id_usuario: 1, nombre_usuario: "Pedro", apellido: "Gonzales" },
      { id_chat: 2, id_usuario: 2, nombre_usuario: "Juan", apellido: "Gonzales" },
      { id_chat: 3, id_usuario: 3, nombre_usuario: "Gabriel", apellido: "Gonzales" }
    ],
    id_user: this.props.id_usuario,
    value: "",
    isLoading: true,
    isLoadingFont: true,
    flag: false
  };

  componentDidMount() {
    ApiController.getChatsByIdUsuario(this.props.id_usuario, this.okChats.bind(this))
    this.loadFont();
  }
  okChats(chatList) {
    this.setState({ chatList: chatList, memory: chatList, isLoading: false })
  }

  loadFont = async () => {
    await Font.loadAsync({
        'mainFont': require('../assets/fonts/LettersForLearners.ttf'),
    });
    this.setState({ isLoadingFont: false })
}
  ///////////////////////////////////////

  marginSize(item) {
    if (item.id_usuario != this.state.chatList[this.state.chatList.length - 1].id_usuario) {
      return { marginTop: height * 0.015 }
    } else {
      return { marginBottom: height * 0.015, marginTop: height * 0.015 }
    }
  }
  
  whoSend(id_usuarioUltimoMensaje, nombreChat) {
    if (id_usuarioUltimoMensaje === "") {
      return ''
    }
    else {
      if (id_usuarioUltimoMensaje == this.state.id_user) {
        return "Yo: "
      }
      else {
        return nombreChat + ": "
      }
    }
  }
  whatTime(hours, minutes) {
    var horaTotal
    if (isNaN(hours)) {
      return ''
    }
    else {
      if (hours < 10) {
        if (minutes < 10) {
          return "0" + hours + ':' + "0" + minutes
        }
        else {
          return "0" + hours + ':' + minutes
        }
      }
      else {
        if (minutes < 10) {
          return hours + ':' + "0" + minutes
        }
        else {
          return hours + ':' + minutes
        }
      }
    }
  }
  searchChat = value => {
    const filterDeChats = this.state.memory.filter(chatList => {
      let chatLowercase = (
        chatList.nombre_usuario +
        ' ' +
        chatList.apellido
      ).toLowerCase();

      let searchTermLowercase = value.toLowerCase();

      return chatLowercase.indexOf(searchTermLowercase) > -1;
    });
    this.setState({ chatList: filterDeChats });
    this.setState({ value })
  };

  render() {
    if (this.state.isLoading || this.state.isLoadingFont) {
      return (
        <View style={styles.container}>
        <View style={{ backgroundColor: '#F28C0F' }}>
              <SearchBar
                placeholder="Buscar..."
                platform='ios'
                onChangeText={value => this.searchChat(value)}
                value={this.state.value}
                inputContainerStyle={{ backgroundColor: '#FFF7EE', height: hp(5) }}
                placeholderTextColor='rgba(0, 0, 0, 0.3)'
                cancelButtonProps={{ buttonTextStyle: { color: 'white', paddingTop: 0 } }}
                containerStyle={{ backgroundColor: '#F28C0F', paddingTop: 0, marginHorizontal: wp(3.3) }}
                buttonStyle={{}}
                searchIcon={{ color: 'rgba(0, 0, 0, 0.3)' }}
              />
          </View>
          <StatusBar barStyle="black" backgroundColor="white" />
          <ActivityIndicator size="large" color='#F28C0F' backgroundColor=' #616161' style={{ flex: 1 }}></ActivityIndicator>
        </View>
      );
    }
    else {
      if (this.state.chatList.length == 0) {
        return (
          <View style={styles.noComentariosContainer}>
          <View style={{ backgroundColor: '#F28C0F' }}>
              <SearchBar
                placeholder="Buscar..."
                platform='ios'
                onChangeText={value => this.searchChat(value)}
                value={this.state.value}
                inputContainerStyle={{ backgroundColor: '#FFF7EE', height: hp(5) }}
                placeholderTextColor='rgba(0, 0, 0, 0.3)'
                cancelButtonProps={{ buttonTextStyle: { color: 'white', paddingTop: 0 } }}
                containerStyle={{ backgroundColor: '#F28C0F', paddingTop: 0, marginHorizontal: wp(3.3) }}
                buttonStyle={{}}
                searchIcon={{ color: 'rgba(0, 0, 0, 0.3)' }}
              />
            </View>
          <ScrollView refreshControl={
            <RefreshControl refreshing={this.state.isRefreshing} tintColor={"#F28C0F"} onRefresh={() => {this.setState({isLoading: true}), ApiController.getChatsByIdUsuario(this.props.id_usuario, this.okChats.bind(this))}} />
        }
        style = {{flex:1}}>
            <View style={{ height: hp(80), justifyContent: 'center', alignItems: 'center' }}>
              <Image source={ExportadorLogos.traerLogoNaranja()} style={styles.fondoImage}></Image>
              <Text style={[styles.noComentariosMensaje, { fontFamily: "mainFont" }]}>No tienes ningun chat activo</Text>
            </View>
            </ScrollView>
          </View>
        )
      }
      else {
        return (
          <SafeAreaView style={styles.container}>
            <View style={{ backgroundColor: '#F28C0F' }}>
              <SearchBar
                placeholder="Buscar..."
                platform='ios'
                onChangeText={value => this.searchChat(value)}
                value={this.state.value}
                inputContainerStyle={{ backgroundColor: '#FFF7EE', height: hp(5) }}
                placeholderTextColor='rgba(0, 0, 0, 0.3)'
                cancelButtonProps={{ buttonTextStyle: { color: 'white', paddingTop: 0 } }}
                containerStyle={{ backgroundColor: '#F28C0F', paddingTop: 0, marginHorizontal: wp(3.3) }}
                buttonStyle={{}}
                searchIcon={{ color: 'rgba(0, 0, 0, 0.3)' }}
              />
            </View>
            <ScrollView refreshControl={
                        <RefreshControl refreshing={this.state.isRefreshing} tintColor={"#F28C0F"} onRefresh={() => {this.setState({isLoading: true}), ApiController.getChatsByIdUsuario(this.props.id_usuario, this.okChats.bind(this))}} />
                    }
                    style = {{flex:1}}>
            <FlatList
              style={styles.contentList}
              columnWrapperStyle={styles.listContainer}
              data={this.state.chatList}
              initialNumToRender={50}
              keyExtractor={(item) => {
                return item.id_usuario.toString();
              }}
              renderItem={({ item }) => {
                return (
                  <View>
                    {/* <TouchableOpacity style={[this.marginSize(item), styles.card]} onPress={() => {this.props.onPressGoChat(item.id_user, item.userDestino.id_user, item.userDestino.nombre), fireBase.refOff(this.state.id_user, this.state.chatList)}}> */}
                    <TouchableOpacity style={[this.marginSize(item), styles.card]} onPress={() => { this.props.onPressGoChat(item.id_chat, item.id_usuario, item.nombre_usuario + " " + item.apellido) }}>
                      <View style={{ flexDirection: "row" }} >
                        {ExportadorObjetos.profileImage(item.id_usuario) ?
                          <TouchableOpacity style={[styles.imageContainer, { borderWidth: 0 }]} onPress={() => { this.props.onPressGoUsuario(item.id_usuario, item.nombre_usuario + " " + item.apellido, item.esProfesor) }}>
                            <Image
                              source={ExportadorObjetos.profileImage(item.id_usuario)}
                              style={[styles.image, { resizeMode: ((item.id_usuario == 0) ? 'contain' : 'contain') }]}
                            />
                          </TouchableOpacity>
                          :
                          <TouchableOpacity style={[styles.imageContainer, { borderWidth: 2 }]} onPress={() => { this.props.onPressGoUsuario(item.id_usuario, item.nombre_usuario + " " + item.apellido, item.esProfesor) }}>
                            <Text style={{ fontSize: wp(7), textAlign: "center", color: '#F28C0F', alignContent: 'center' }}>
                              {item.nombre_usuario.slice(0, 1).toUpperCase()}{item.apellido.slice(0, 1).toUpperCase()}
                            </Text>
                          </TouchableOpacity>
                        }
                        <View style={styles.cardContent}>
                          <TouchableOpacity onPress={() => { this.props.onPressGoUsuario(item.id_usuario, item.nombre_usuario + " " + item.apellido, item.esProfesor) }}>
                            <Text style={styles.cardTitulo}>{item.nombre_usuario + " " + item.apellido}</Text>
                          </TouchableOpacity>
                          <View style={styles.cardMessageContainer}>
                            <View style={{ flexDirection: "row" }} >
                              <Text style={styles.cardSubTituloMessage}>{this.whoSend(item.id_usuarioUltimoMensaje, item.nombre_usuario)}</Text>
                              <Text style={styles.cardSubTituloMessage}>{item.ultimoMensaje}</Text>
                            </View>
                            <Text style={styles.cardSubTituloHours}>{item.horaUltimoMensaje}</Text>
                          </View>
                        </View>
                      </View>
                    </TouchableOpacity>
                  </View>
                )
              }
              } />
            </ScrollView>
          </SafeAreaView>
        );
      }
    }
  }
}
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
  noComentariosContainer: {
    backgroundColor: "#FFF7EE",
    flex: 1
  },
  fondoImage: {
    width: wp(80),
    height: wp(30),
    resizeMode: 'contain',
  },
  noComentariosMensaje: {
    marginHorizontal: wp(5),
    textAlign: "center",
    fontSize: wp(8),
    color: '#F28C0F'
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
    flexDirection: 'row'
  },
  cardMessageContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  image: {
    resizeMode: "contain",
    height: "100%",
    width: "100%",
    borderRadius: 100,
    justifyContent: 'center',
  },
  imageContainer: {
    width: hp(6.6),
    height: hp(6.6),
    borderColor: "#F28C0F",
    borderRadius: hp(8) / 2,
    margin: 5,
    marginRight: 5,
    justifyContent: 'center',
    alignSelf: "flex-start",
    backgroundColor: "#FFF7EE"
  },
  cardContent: {
    marginLeft: height * 0.028,
    paddingRight: 5,
    justifyContent: 'center',
    alignSelf: "stretch",
    width: wp(55)
  },
  cardTitulo: {
    fontSize: wp(4.4),
    color: "#F28C0F",
    fontWeight: 'bold'
  },

  cardSubTituloMessage: {
    marginTop: 1,
    fontSize: wp(3.3),
    color: "black",
  },
  cardSubTituloMessageContainer: {
    alignSelf: 'stretch',
    backgroundColor: 'blue'
  },
  cardSubTituloHours: {
    marginTop: 1,
    fontSize: wp(3.3),
    color: "black",
    textAlign: 'right'
  },
  //Corazones
  HeartImage: {
    color: "#f66"
  },
  ViewHeart: {
    alignItems: 'center',
    justifyContent: "center",
    paddingHorizontal: wp("5")
  },
  rating: {
    marginTop: 5,
    fontSize: height * 0.02,
    color: "#f66"
  }
})
export default withNavigation(ChatList);
