import React from 'react';
import { GiftedChat } from 'react-native-gifted-chat'; // 0.3.0
import { View, Image, StyleSheet, ActivityIndicator, FlatList, SafeAreaView, TextInput, TouchableOpacity, StatusBar, TouchableWithoutFeedback, Text, Keyboard, Dimensions } from 'react-native';
import { withNavigation } from 'react-navigation';

import fireBase from '../FirebaseList';

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

var { height, width } = Dimensions.get('window');

class Chat extends React.Component {

  constructor(props) {
    super(props);
  }
  static navigationOptions = ({ navigation }) => ({
    title: (navigation.state.params || {}).name || 'Chat!',
  });

  state = {
    chatList: [],
    id_user: 1,
    isLoading: true,
    flag: false
  };

  marginSize(item) {
    if (item.id_user != this.state.chatList[this.state.chatList.length - 1].id_user) {

      return { marginTop: height * 0.028 }
    } else {
      return { marginBottom: height * 0.028, marginTop: height * 0.028 }
    }
  }
  whoSend(ultimoSender) {
    if(ultimoSender === ""){
      return 'Mensajes no disponibles'
    }
    else{
      if (ultimoSender.user.id_user == this.state.id_user) {
        return "Yo: "
      }
      else {
        return ultimoSender.user.nombre + ": "
      }
    }
  }
  whatTime(hours, minutes){
    if(isNaN(hours)){
      return ''
    }
    else{
      return hours + ':' + minutes
    }
  }

  render() {
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
        <SafeAreaView style={styles.container}>
          <FlatList
            style={styles.contentList}
            columnWrapperStyle={styles.listContainer}
            data={this.state.chatList.sort((a, b) => a.id_user.toString().localeCompare(b.id_user.toString()))}
            initialNumToRender={50}
            keyExtractor={(item) => {
              return item.id_user.toString();
            }}
            renderItem={({ item }) => {
              console.log("*************************")
              console.log(item)
              var hours = new Date(item.ultimoMensaje.createdAt).getHours()
              var minutes = new Date(item.ultimoMensaje.createdAt).getMinutes()
              return (
                <View>
                  <TouchableOpacity style={[this.marginSize(item), styles.card]} onPress={() => {this.props.onPressGoChat("Lisandro", item.userDestino.nombre), fireBase.refOff(this.state.id_user, this.state.chatList)}}>
                    <View style={{ flexDirection: "row" }} >
                      <View style={styles.CircleShapeView}>
                        <Text style={{ fontSize: hp(3.3), textAlign:"center", color: 'white', alignContent: 'center' }}>
                          {item.userDestino.nombre.slice(0, 1).toUpperCase()}{item.userDestino.apellido.slice(0, 1).toUpperCase()}
                        </Text>
                      </View>
                      {/* <Image style={styles.image} source={require("../assets/icon.png")} /> */}
                      <View style={styles.cardContent}>
                        <Text style={styles.cardTitulo}>{item.userDestino.nombre + " " + item.userDestino.apellido}</Text>
                        <View style={styles.cardMessageContainer}>
                          <View style={{ flexDirection: "row" }} >
                            <Text style={styles.cardSubTituloMessage}>{this.whoSend(item.ultimoMensaje)}</Text>
                            <Text style={styles.cardSubTituloMessage}>{item.ultimoMensaje.text}</Text>
                          </View>
                          <Text style={styles.cardSubTituloHours}>{this.whatTime(hours, minutes)}</Text>
                        </View>
                      </View>
                    </View>
                  </TouchableOpacity>
                </View>
              )
            }
            } />
        </SafeAreaView>
      );
    }
  }

  componentDidMount() {
    fireBase.refOffStart();
    this.check(this.isOk.bind(this));
    
    //this.check(this.dance.bind(this))
  }

  check(isOk) {
    setTimeout(function () {
      isOk()
    }, 500);
  }

  isOk() {
    fireBase.refOn(chat =>
      this.setState(previousState => ({
        chatList: (GiftedChat.append(previousState.chatList, chat)).sort((a, b) => a.createdAt.toString().localeCompare(b.createdAt.toString())),
        isLoading: false,
        flag: true
      }))
    );
  }
  componentWillUnmount() {
    fireBase.refOff(this.state.id_user, this.state.chatList);
  }
}
const resizeMode = 'center';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFEEEE"
  },
  StatusBar: {
    height: hp(3),
    backgroundColor: "black"
  },

  slide: {
    backgroundColor: "black",
    marginTop: height * 0.05,
    marginBottom: height * 0.05,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 10,
    opacity: .95,
  },

  slideText: {
    textAlign: "center",
    fontSize: height * 0.03,
    color: "#3399ff"
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
  slideContainer: {
    flex: 1,
    alignItems: "center",
  },

  TextContainer: {
    backgroundColor: 'grey',
    borderRadius: 10,
    width: wp("20"),
    height: hp("5.5"),
    flexDirection: 'row',
    alignItems: 'center',
    fontWeight: 'bold',
    fontSize: height * 0.02,
    textAlign: 'center',
    marginTop: height * 0.028,
    opacity: .95
  },

  ContainerInside: {
    width: width,
    height: height,
    alignItems: "center",
  },
  guardarButton: {
    backgroundColor: 'grey',
    borderRadius: 10,
    alignItems: 'center',
    width: width * 0.33,
    marginHorizontal: 22,
    marginTop: height * 0.05,
    alignSelf: 'center',
    opacity: .95
  },

  // FlatList

  card: {
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
    padding: 10,
    flexDirection: 'row'
  },
  cardMessageContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  image: {
    width: hp("8"),
    height: hp("8"),
    backgroundColor: "#ebf0f7",
    borderWidth: 2,
    borderColor: "#ebf0f7",
    borderRadius: 50,
    margin: 5,
    marginRight: 5,
    alignSelf: "center"
  },
  CircleShapeView: {
    height: hp("8"),
    width: hp("8"),
    borderRadius: 100,
    backgroundColor: '#6666ff',
    margin: 5,
    marginRight: 5,
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center'
},
  cardContent: {
    marginLeft: height * 0.028,
    paddingRight: 5,
    justifyContent: 'center',
    alignSelf: "stretch",
    width: wp(55)
  },
  cardTitulo: {
    fontSize: height * 0.028,
    color: "#3399ff",
    fontWeight: 'bold',
    marginBottom: 5
  },

  cardSubTituloMessage: {
    marginTop: 1,
    fontSize: height * 0.02,
    color: "#A01A50",
  },
  cardSubTituloMessageContainer: {
    alignSelf: 'stretch',
    backgroundColor: 'blue'
  },
  cardSubTituloHours: {
    marginTop: 1,
    fontSize: height * 0.02,
    color: "#A01A50",
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
export default withNavigation(Chat);
