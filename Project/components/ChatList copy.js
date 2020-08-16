import React, { Component } from 'react';
import { View, Image, StyleSheet, ActivityIndicator, SafeAreaView, ScrollView, Dimensions, Keyboard, TouchableOpacity, StatusBar, ImageBackground, FlatList } from 'react-native';
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

class ChatList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            perfil: {},
            rating: 0,
            max_rating: 5,
            isLoading: false,
            id_idioma: 0,
            tema: '',
            direccion: '',
            clases: [{ id: 1, nombre: "idiomas" }, { id: 2, nombre: "Deportes" }, { id: 3, nombre: "Estudios" }, { id: 4, nombre: "Arte" }]
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
                  <SafeAreaView>
                    <Chat client={chatClient}>
                      <View style={{ display: 'flex', height: '100%', padding: 10 }}>
                        <ChannelList
                          filters={{ type: 'messaging', members: { $in: ['dark-wind-1'] } }}
                          sort={{ last_message_at: -1 }}
                          Preview={ChannelPreviewMessenger}
                          onSelect={(channel) => {
                            this.props.onPressGoChat(channel);
                          }}
                        />
                      </View>
                    </Chat>
                  </SafeAreaView>
                );
        }
    }
};
const resizeMode = 'center';
const styles = StyleSheet.create({

    container: {
        backgroundColor: "#FFEEEE",
        flex: 1
    }
})
export default withNavigation(ChatList);