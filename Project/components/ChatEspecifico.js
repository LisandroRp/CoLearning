import React, { Component } from 'react';
import { View, Image, StyleSheet, ActivityIndicator, Text, SafeAreaView, Dimensions, Keyboard, TouchableOpacity, StatusBar, ImageBackground, FlatList } from 'react-native';
import { SearchBar, Icon } from 'react-native-elements';
import { withNavigation } from 'react-navigation';
import { FontAwesome } from '@expo/vector-icons';
import { StreamChat } from 'stream-chat';
import {
  Chat,
  Channel,
  MessageList,
  MessageInput,
  ChannelPreviewMessenger,
  ChannelList,
} from 'stream-chat-expo';

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import ExportadorLogos from './exportadores/ExportadorLogos'

var { height, width } = Dimensions.get('window');

const chatClient = new StreamChat('f8wwud5et5jd');
const userToken =
  'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoiZGFyay13aW5kLTEifQ.EVSYmMOVhgMf1aLRxuWqWjw1JhmSv8nDFdjpf7kxUiE';

const user = {
  id: 'dark-wind-1',
  name: 'Dark wind',
  image:
    'https://getstream.io/random_png/?id=dark-wind-1&amp;name=Dark+wind',
};

chatClient.setUser(user, userToken);

class ChatEspecifico extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
        };
        this.Star = ExportadorLogos.traerEstrellaLlena();
        this.Star_With_Border = ExportadorLogos.traerEstrellaBorde();
    }
    componentDidMount() {
        this.keyboardDidShow = Keyboard.addListener('keyboardDidShow', this.keyboardDidShow)
        this.keyboardWillShow = Keyboard.addListener('keyboardWillShow', this.keyboardWillShow)
        this.keyboardWillHide = Keyboard.addListener('keyboardWillHide', this.keyboardWillHide)
    }

    keyboardDidShow = () => {
        this.setState({ searchBarFocused: true })
    }
    keyboardWillShow = () => {
        this.setState({ searchBarFocused: true })
    }
    keyboardWillHide = () => {
        this.setState({ searchBarFocused: false })
    }

    vote(i) {
        this.setState({ rating: i })
    }

    render() {
        const { navigation } = this.props;
        const channel = navigation.getParam('channel');

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
      <SafeAreaView>
        <Chat client={chatClient} style={{ backgroundColor:"red"}}>
          <Channel client={chatClient} channel={channel}>
            <View style={{ display: 'flex', height: '100%'}}>
              <MessageList />
              <MessageInput />
            </View>
          </Channel>
        </Chat>
      </SafeAreaView>
    )
        }
    }
};
const resizeMode = 'center';
const styles = StyleSheet.create({

    container: {
        backgroundColor: "#FFF7EE",
        flex: 1
    },

    searchContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },

    ContainerInside: {
        backgroundColor: "black",
        marginTop: hp(5),
        padding: height * 0.04,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: 'center',
        height: height * 0.33,
        width: width * 0.88
    },
    //FlatList
    contentList: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        padding: 2,
        alignSelf: 'center'
    },
    image: {
        width: wp(49),
        height: hp(24.5),
        margin: 1,
        borderWidth: 1.5,
        borderColor: 'black',
        resizeMode: 'stretch',
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
        overflow: 'hidden'
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
    textImage: {
        textAlign: 'center',
        fontSize: hp(4),
        textTransform: 'uppercase',
        color: "#2A73E0",
        letterSpacing: wp(1),
        fontWeight: 'bold',
        textShadowColor: 'black',
        textShadowOffset: { width: 2.2, height: 2.2 },
        textShadowRadius: 0.1
    },

    Text: {
        fontSize: height * 0.027,
        color: "#3399ff",
        textAlign: "center"
    },
    //Star View
    heartView: {
        justifyContent: 'center',
        flexDirection: 'row',
        marginTop: hp(1.5),
        marginBottom: hp(1)
    },
    heartImage: {
        color: "#f66"
    },
    //Boton

    buscarButton: {
        backgroundColor: 'white',
        borderRadius: 10,
        borderColor: 'black',
        borderWidth: 1,
        alignItems: 'center',
        width: width * 0.33,
        marginHorizontal: height * 0.025,
        marginVertical: height * 0.025,
        alignSelf: 'center',
        opacity: .95
    },
    screenButtonText: {
        marginVertical: height * 0.02,
        fontWeight: 'bold',
        fontSize: height * 0.025
    },

})
export default withNavigation(ChatEspecifico);