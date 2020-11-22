import React from 'react';
import { GiftedChat, InputToolbar, Bubble, Send } from 'react-native-gifted-chat'; // 0.3.0
import { View, Image, StyleSheet, ActivityIndicator, FlatList, Modal, TextInput, TouchableOpacity, StatusBar, TouchableWithoutFeedback, Text, Keyboard, Dimensions } from 'react-native';
import { withNavigation } from 'react-navigation';

import firebaseSvc from '../FirebaseSvc';

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const customtInputToolbar = props => {
  return (
    <InputToolbar
      {...props}
      containerStyle={{
        marginLeft: 15,
        marginRight: 15,
        borderRadius: 15,
        borderTopWidth: 0,
        paddingTop: 5,
        borderTopColor: "transparent",
        shadowColor: 'grey',
        shadowOffset: {
          width: 0,
          height: 6,
        },
        shadowOpacity: 0.37,
        shadowRadius: 7.49,
        elevation: 12,
      }}
    />
  );
};

const customBubles = props => {
  return (
    <Bubble
      {...props}
      wrapperStyle={{
        right: {
          backgroundColor: '#F28C0F',
          marginBottom: hp(2),
        },
        left: {
          marginBottom: hp(2),
        }
      }}
    />
  );
}
const customSend = props => {
  return (
    <Bubble
      {...props}
      containerStyle={{
        borderColor: "red",
      }}
    />
  );
}
class Chat extends React.Component {

  constructor(props) {
    super(props);
  }

  state = {
    messages: [],
    isLoading: true,
    id_chat: ""
  };

  get userOrigen() {
    return {
      nombre: "Lisandro",
      avatar: '',
      id_user: this.props.navigation.getParam('id_userOrigen'),
      _id: this.props.navigation.getParam('id_userOrigen'), // need for gifted-chat
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
    if (this.state.isLoading) {
      return (
        <View style={styles.container}>
          <StatusBar barStyle="black" backgroundColor="white" />
          <ActivityIndicator size="large" color='#F28C0F' backgroundColor=' #616161' style={{ flex: 1 }}></ActivityIndicator>
        </View>
      );
    }
    else {
      return (
        <View style={styles.container}>
          <GiftedChat
            listViewProps={{ style: { backgroundColor: '#FFF7EE' } }}
            placeholder="Escriba un mensaje..."
            renderInputToolbar={props => customtInputToolbar(props)}
            renderBubble={props => customBubles(props)}
            messages={this.state.messages}
            //onSend={firebaseSvc.send}
            onSend={messages => firebaseSvc.send(this.state.id_chat, messages)}
            user={this.userOrigen}
            inverted={true}
            send={props => customSend(props)}
          />
        </View>
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
  }

  componentDidMount = async () => {
    this.setState({ id_chat: await this.props.navigation.getParam("id_chat") })
    firebaseSvc.refOn(await this.props.navigation.getParam("id_chat"), message =>
      this.setState(previousState => ({
        messages: (GiftedChat.append(previousState.messages, message)).sort((a, b) => Date(a.createdAt).toString().localeCompare(Date(b.createdAt).toString())),
        isLoading: false
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
    backgroundColor: "#FFF7EE"
  },
  StatusBar: {
    height: hp(3),
    backgroundColor: "black"
  },
})
export default withNavigation(Chat);
