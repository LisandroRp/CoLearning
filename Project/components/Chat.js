import React from 'react';
import { GiftedChat } from 'react-native-gifted-chat'; // 0.3.0
import { View, Image, StyleSheet, ActivityIndicator, FlatList, Modal, TextInput, TouchableOpacity, StatusBar, TouchableWithoutFeedback, Text, Keyboard, Dimensions } from 'react-native';
import { withNavigation } from 'react-navigation';

import firebaseSvc from '../FirebaseSvc';

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

class Chat extends React.Component {

  constructor(props) {
    super(props);
  }

  state = {
    messages: [],
  };

  get userOrigen() {
    return {
      nombre: this.props.navigation.getParam('nombre_chatOrigen'),
      avatar: '',
      id_user: 1,
      _id: 1, // need for gifted-chat
    };
  }
  get userDestino() {
    return {
      nombre: this.props.navigation.getParam('nombre_chatDestino'),
      avatar: '',
      id_user: 2,
      _id: 2, // need for gifted-chat
    };
  }

  render() {
    return (
      <GiftedChat
        messages={this.state.messages}
        //onSend={firebaseSvc.send}
        onSend={messages => firebaseSvc.send(messages, this.userDestino)}
        user={this.userOrigen}
        inverted={true}
      />
      // <FlatList
      //                   style={styles.contentList}
      //                   columnWrapperStyle={styles.listContainer}
      //                   data={this.state.messages.sort((a, b) => a.createdAt.toString().localeCompare(b.createdAt.toString()))}
      //                   initialNumToRender={50}
      //                   keyExtractor={(item) => {
      //                       return item.id.toString();
      //                   }}
      //                   renderItem={({ item }) => {
      //                     console.log("********************************")
      //                     console.log(item.createdAt)
      //                       return (
      //                           <View>
      //                               <TouchableOpacity style={[styles.card]} onPress={() => this.props.onPressGo(item.id_curso, item.nombre_curso, item.institucion, item.direccion)}>
      //                                   <View style={{ flexDirection: "row" }} >
      //                                       <View style={styles.cardContent}>
      //                                       </View>
      //                                       <View style={styles.ViewHeart} >
      //                                           {/* <Image style={styles.StarImage} source={require("../Contenido/Logos/Star_Llena.png")} /> */}
      //                                           <Text style={styles.rating}>{item.text + " " + item.createdAt}</Text>
      //                                       </View>
      //                                   </View>
      //                               </TouchableOpacity>
      //                           </View>
      //                       )
      //                   }
      //                   } />
    );
  }

  componentDidMount() {
    firebaseSvc.refOn(message =>
      this.setState(previousState => ({
        messages: (GiftedChat.append(previousState.messages, message)).sort((a, b) => Date(a.createdAt).toString().localeCompare(Date(b.createdAt).toString())),
      }))
    );
  }
  componentWillUnmount() {
    firebaseSvc.refOff();
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
  })
export default withNavigation(Chat);
