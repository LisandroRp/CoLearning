import React, { Component } from 'react';
import { withNavigation } from 'react-navigation';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  Keyboard,
  FlatList,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  ActivityIndicator,
  Animated
} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { SearchBar } from 'react-native-elements';
import RNPickerSelect from 'react-native-picker-select';
import { Entypo, MaterialCommunityIcons, FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';


var { height, width } = Dimensions.get('window');

class EjerciciosNew extends Component {

  constructor(props) {
    super(props);
    this.state = {
      titulo: '',
      pregunta: '',
      descripcion: '',
      tag: '',
      tags: [{ id_tag: 1, nombre_tag: "React Native" }, { id_tag: 2, nombre_tag: "Magia" }],
      memory: [{ id_tag: 1, nombre_tag: "React Native" }, { id_tag: 2, nombre_tag: "Magia" }],
      tagsElegidos: [{ id_tag: 2, nombre_tag: "Magia" }],
      id_idioma: 0,
      animation: false,
      isLoading: false,
      actualizando: false,
      modalGuardarVisible: false,
      animationStyle: false,

      startValue: new Animated.Value(0),
      endValue: 1,
      duration: 500,
      startValueSearchBar: new Animated.Value(0),
      endValueSearchBar: hp(20),
      durationSearchBar: 500,
    };
  }
  componentDidMount = async () => {
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
  guardarEjercicio() {
    this.setState({ modalGuardarVisible: false, isLoading: true, actualizando: true })
    //base.crearEjercicio((id_ejercicio + 1), this.state.nombre, this.state.descripcion, this.state.ejecucion, this.state.id_elemento, this.state.id_musculo, this.showInterstitial.bind(this))
    base.crearEjercicio(this.state.nombre, this.state.descripcion, this.state.ejecucion, this.state.id_elemento, this.state.id_musculo, this.cancelarEjercicio.bind(this))
  }
  cancelarEjercicio() {
    this.props.onPressCancelar()
  }
  botonGuardar() {
    if (this.state.nombre == '') {
      alert()
      return
    }
    if (this.state.musculo == '') {
      alert()
      return
    }
    if (this.state.elemento == '') {
      alert()
      return
    }
    this.setState({ modalGuardarVisible: true })
  }

  animate() {
    this.setState({ animationStyle: true })
    Animated.timing(this.state.startValue, {
      toValue: this.state.endValue,
      duration: this.state.duration,
      useNativeDriver: true,
    }).start();
    Animated.timing(this.state.startValueSearchBar, {
      toValue: this.state.endValueSearchBar,
      duration: this.state.durationSearchBar,
      useNativeDriver: true,
    }).start();

  }
  desAnimate() {
    Animated.timing(this.state.startValue, {
      toValue: 0,
      duration: this.state.duration,
      useNativeDriver: true,
    }).start();
    Animated.timing(this.state.startValueSearchBar, {
      toValue: -hp(10),
      duration: this.state.durationSearchBar,
      useNativeDriver: true,
    }).start();
    setTimeout(() => this.setState({ animationStyle: false }), 500)
  }
  animationStyle() {
    if (this.state.animationStyle) {
      return {
        top: 0,
        right: 0
      }
    } else {
      return
    }
  }
  marginSize(item) {
    if(this.state.tags.length != 0){
      if (item.id_tag != this.state.tags[this.state.tags.length - 1].id_tag) {

        return { marginTop: height * 0.028 }
      } else {
        return { marginBottom: height * 0.028, marginTop: height * 0.028 }
      }
    }
  }
  marginElegidosSize(item) {
    if (item.id_tag != this.state.tagsElegidos[this.state.tagsElegidos.length - 1].id_tag) {

      return { marginTop: height * 0.028 }
    } else {
      return { marginBottom: height * 0.028, marginTop: height * 0.028 }
    }
  }
  searchTag = value => {
    const filterDeTags = this.state.memory.filter(tags => {
      let tagLowercase = (
        tags.nombre_tag
      ).toLowerCase();

      let searchTermLowercase = value.toLowerCase();

      return tagLowercase.indexOf(searchTermLowercase) > -1;
    });
    this.setState({ tags: filterDeTags });
    this.setState({ tag: value })
  };
  agregarTag(tag) {
    if (this.tagElegido(tag.id_tag) || this.state.tagsElegidos.length > 10) {
      if(this.state.tagsElegidos.length > 10){
        alert("Ha superado la cantidad maxima de tags.")
      }
      else{
        alert("El tag ya ha sido seleccionado previamente.")
      }
    } else {
      var tagElegidosNew = this.state.tagsElegidos
      tagElegidosNew.push(tag)
      this.setState({ tagsElegidos: tagElegidosNew })
    }
  }
  tagElegido(id_tag) {
    var i = 0;
    while (i < this.state.tagsElegidos.length) {
      if (this.state.tagsElegidos[i].id_tag == id_tag) {
        return true
      }
      else {
        i++
      }
    }
    return false
  }
  quitarTag(id_tag) {
    var i = 0;
    var tagsElegidosNew = []
    while (i < this.state.tagsElegidos.length) {
      if (this.state.tagsElegidos[i].id_tag != id_tag) {
        tagsElegidosNew.push(this.state.tagsElegidos[i])
        i++;
      }
      else {
        i++
      }
    }
    this.setState({ tagsElegidos: tagsElegidosNew })
  }

  crearForo(){
    this.props.onPressVolver()
  }
  render() {

    if (this.state.isLoading) {
      return (
        <View style={styles.container}>
          <ActivityIndicator size="large" color="#3399ff" style={{ marginBottom: 15 }}></ActivityIndicator>
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <KeyboardAvoidingView style={[styles.container]} behavior="position" keyboardVerticalOffset={height * 0.008} enabled>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
              <View style={[styles.inputContainerView, styles.shadowContainer]}>
                <View style={styles.inputContainerTitulo}>
                  <TextInput style={styles.inputTitulo}
                    value={this.state.titulo}
                    placeholder="Titulo"
                    placeholderTextColor={"grey"}
                    maxLength={22}

                    underlineColorAndroid='transparent'
                    onChangeText={(text) => this.setState({ titulo: text })}
                  />
                </View>
                <View style={styles.inputContainerPregunta}>
                  <TextInput style={styles.inputPregunta}
                    value={this.state.pregunta}
                    placeholder="Pregunta"
                    placeholderTextColor={"grey"}
                    multiline={true}
                    maxLength={66}

                    underlineColorAndroid='transparent'
                    onChangeText={(text) => this.setState({ pregunta: text })}
                  />
                </View>
                <View style={styles.inputContainerDescripcion}>
                  <TextInput style={styles.inputDescripcion}
                    multiline={true}
                    maxLength={222}
                    placeholder={"Descripcion"}
                    placeholderTextColor='grey'
                    onChangeText={(value) => this.setState({ descripcion: value })}
                    value={this.state.descripcion}
                  />
                </View>

                <TouchableOpacity style={styles.tagButton} onPress={() => { this.animate() }}>
                  <Text style={styles.screenButtonTagText}>
                    Tags
                      </Text>
                  <View style={{ backgroundColor: 'white', borderRadius: 10, padding: 5, marginLeft:wp(3) }}>
                    <Text style={[styles.screenButtonTagNumber]}>
                      {this.state.tagsElegidos.length}/10
                      </Text>
                  </View>
                </TouchableOpacity>
                <View style={{ flexDirection: "row", justifyContent: 'center', marginTop: hp(5) }}>
                <TouchableOpacity style={styles.button} onPress={() => { this.props.onPressVolver() }}>
                            <Text style={styles.screenButtonText}>
                                Cancelar
                            </Text>
                        </TouchableOpacity><TouchableOpacity style={styles.button} onPress={() => { this.crearForo() }}>
                            <Text style={styles.screenButtonText}>
                                Crear
                            </Text>
                        </TouchableOpacity>
                </View>

              </View>

            </TouchableWithoutFeedback>
          </KeyboardAvoidingView>
          <Animated.View style={[styles.fullScreenAnimate, this.animationStyle(), { opacity: this.state.startValue }]}>
            <FlatList
              style={{ paddingTop: hp(14), flex: 1 }}
              columnWrapperStyle={styles.listContainer}
              data={this.state.tags}
              numColumns={2}
              initialNumToRender={50}
              keyExtractor={(item) => {
                return item.id_tag.toString();
              }}
              renderItem={({ item }) => {
                return (
                  <View style={{ flex: 1 }}>
                    <TouchableOpacity style={[this.marginSize(item), styles.card]} onPress={() => this.agregarTag(item)}>
                      <Text>{item.nombre_tag}</Text>
                    </TouchableOpacity>
                  </View>
                )
              }
              } />
          </Animated.View>
          <Animated.View style={[styles.headerAnimatedContainer, { transform: [{ translateY: this.state.startValueSearchBar }] }]}>
            <View style={[styles.searchBar]}>
              <TouchableOpacity style={{ flex: 0.2, marginLeft: wp(3.3), marginVertical: wp(3.3) }} onPress={() => this.desAnimate()}>
                <Text style={{ color: 'white', textAlign: 'center', fontSize: wp(4.5) }}>Listo</Text>
              </TouchableOpacity>
              <SearchBar
                placeholder="Tag..."
                platform='ios'
                onChangeText={value => this.searchTag(value)}
                value={this.state.tag}
                inputContainerStyle={{ backgroundColor: '#FFF7EE' }}
                placeholderTextColor='rgba(0, 0, 0, 0.3)'
                cancelButtonProps={{ buttonTextStyle: { color: 'white', paddingTop: 0, fontSize: wp(4.4) } }}
                containerStyle={{ backgroundColor: '#F28C0F', paddingBottom: hp(1), paddingTop: 0, marginRight: wp(3.3), flex: 1 }}
                searchIcon={{ color: 'rgba(0, 0, 0, 0.3)' }}
              />
            </View>
            <FlatList
              style={[styles.tagBar]}
              columnWrapperStyle={styles.listContainer}
              horizontal={true}
              data={this.state.tagsElegidos}
              initialNumToRender={50}
              keyExtractor={(item) => {
                return item.id_tag.toString();
              }}
              renderItem={({ item }) => {
                return (
                  <View style={{ flexDirection: "row" }}>
                    <View style={[styles.headerCard]} onPress={() => this.props.onPressGo()}>
                      <TouchableOpacity onPress={() => this.quitarTag(item.id_tag)}>
                        <Entypo style={{marginRight: wp(1)}} name={"circle-with-cross"} size={hp(3)} color="#F28C0F"></Entypo>
                      </TouchableOpacity>
                      <Text style={{ fontSize: wp(3.3) }}>{item.nombre_tag}</Text>
                    </View>
                  </View>
                )
              }
              } />

          </Animated.View>
        </View>
      );
    }
  }
}
const resizeMode = 'center';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: "#FFF7EE"
  },
  //Header
  fullScreenAnimate: {
    flexDirection: "row",
    backgroundColor: "#FFF7EE",
    width: wp(100),
    height: hp(100),
    position: 'absolute',
    top: hp(100)
  },
  headerAnimatedContainer: {
    flexDirection: 'column',
    backgroundColor: "#F28C0F",
    width: wp(100),
    position: 'absolute',
    top: -hp(20)
  },
  searchBar: {
    flexDirection: 'row',
    backgroundColor: "#F28C0F",
    width: wp(100),
    paddingBottom: hp(0)
  },
  tagBar: {
    width: wp(100),
    height: hp(5.5),
    marginBottom: hp(1)
  },
  headerCard: {
    shadowColor: '#00000045',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 12,

    marginLeft: wp(2),
    marginRight: wp(2),
    borderRadius: 10,
    alignItems: 'center',
    backgroundColor: "white",
    paddingHorizontal: 10,
    flexDirection: 'row',
  },
  bubbleCross: {
    width: hp(3),
    height: hp(3),
    marginRight: wp(2.2),
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F28C0F",
    shadowColor: '#00000035',
    shadowOffset: {
      width: 0.01,
      height: 0.25,
    },
    shadowOpacity: 2,
    shadowRadius: 0,
  },
  //Inputs
  inputContainerTitulo: {
    borderBottomColor: '#F5FCFF',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    borderBottomWidth: 1,
    width: wp("70"),
    height: 45,
    marginBottom: 20,
    marginTop: hp(15),
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputTitulo: {
    marginHorizontal: wp(2.2),
    borderBottomColor: '#FFFFFF',
    flex: 1,
    textAlign: 'center'
  },
  inputContainerPregunta: {
    borderBottomColor: '#F5FCFF',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    borderBottomWidth: 1,
    width: wp("70"),
    height: hp(11),
    marginBottom: 20,
  },
  inputPregunta: {
    flex: 1,
    margin: wp(2.2),
    borderBottomColor: '#FFFFFF',
  },
  inputContainerView: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  inputContainerDescripcion: {
    borderBottomColor: '#F5FCFF',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    borderBottomWidth: 1,
    width: wp("70"),
    height: hp("15"),
    marginBottom: 20,
  },
  inputDescripcion: {
    flex: 1,
    margin: wp(2.2),
    borderBottomColor: '#FFFFFF',
  },
  
  shadowContainer:{
    shadowColor: "#808080",
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.25,
  shadowRadius: 3.84,
  elevation: 5
},
  //Botones
  tagButton: {
    backgroundColor: "#F28C0F",
    padding: 10,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  screenButtonTagText: {
    color: 'white',
    fontWeight: 'bold'
  },
  screenButtonTagNumber: {
    color: '#A7370F',
    fontWeight: 'bold'
  },
  button: {
    backgroundColor: '#F28C0F',
    borderRadius: 10,
    alignItems: 'center',
    paddingVertical: hp(1.5),
    paddingHorizontal: wp(3.3),
    marginHorizontal: height * 0.025,
    marginVertical: height * 0.025,
    alignSelf: 'center',
    opacity: .95
},
screenButtonText: {
  color: 'white',
  fontSize: wp(4.4)
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

    marginLeft: wp(2),
    marginRight: wp(2),
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "white",
    padding: 10,
    flexDirection: 'row',
  }
})


export default withNavigation(EjerciciosNew);