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
  Animated,
  Modal
} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { SearchBar } from 'react-native-elements';
import * as Font from 'expo-font';
import { Entypo, MaterialCommunityIcons, FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import ApiController from '../controller/ApiController';


var { height, width } = Dimensions.get('window');
const pedro = new Date
class EjerciciosNew extends Component {

  constructor(props) {
    super(props);
    this.state = {
      titulo: '',
      pregunta: '',
      descripcion: '',
      tag: '',
      esAnonimo: false,
      tagsBase: [],
      memory: [],
      tags: [],
      id_idioma: 0,
      animation: false,
      isLoading: true,
      isLoadingFont: true,
      actualizando: false,
      modalGuardarVisible: false,
      animationStyle: false,
      modalVisible: false,

      startValue: new Animated.Value(0),
      endValue: 1,
      duration: 500,
      startValueSearchBar: new Animated.Value(0),
      endValueSearchBar: hp(20),
      durationSearchBar: 500,
    };
  }
  componentDidMount = async () => {
    ApiController.getTags(this.okTags.bind(this))
    this.loadFont()
    this.keyboardDidShow = Keyboard.addListener('keyboardDidShow', this.keyboardDidShow)
    this.keyboardWillShow = Keyboard.addListener('keyboardWillShow', this.keyboardWillShow)
    this.keyboardWillHide = Keyboard.addListener('keyboardWillHide', this.keyboardWillHide)
  }
  okTags(tags) {
    this.setState({ tagsBase: tags, memory: tags, isLoading: false })
  }
  loadFont = async () => {
    await Font.loadAsync({
      'shakies': require('../assets/fonts/Shakies-TT.ttf'),
      'mainFont': require('../assets/fonts/LettersForLearners.ttf')
    });

    this.setState({ isLoadingFont: false })
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
    if (this.state.tagsBase.length != 0) {
      if (item.id_tag != this.state.tagsBase[this.state.tagsBase.length - 1].id_tag) {

        return { marginTop: hp(1.5) }
      } else {
        return { marginBottom: hp(1.5), marginTop: hp(1.5) }
      }
    }
  }
  marginElegidosSize(item) {
    if (item.id_tag != this.state.tags[this.state.tags.length - 1].id_tag) {

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
    this.setState({ tagsBase: filterDeTags });
    this.setState({ tag: value })
  };
  agregarTag(tag) {
    if (this.tagElegido(tag.id_tag) || this.state.tags.length >= 10) {
      if (this.state.tags.length >= 10) {
        alert("Ha superado la cantidad maxima de tags.")
      }
      else {
        alert("El tag ya ha sido seleccionado previamente.")
      }
    } else {
      var tagElegidosNew = this.state.tags
      tagElegidosNew.push(tag)
      this.setState({ tags: tagElegidosNew })
    }
  }
  tagElegido(id_tag) {
    var i = 0;
    while (i < this.state.tags.length) {
      if (this.state.tags[i].id_tag == id_tag) {
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
    while (i < this.state.tags.length) {
      if (this.state.tags[i].id_tag != id_tag) {
        tagsElegidosNew.push(this.state.tags[i])
        i++;
      }
      else {
        i++
      }
    }
    this.setState({ tags: tagsElegidosNew })
  }
  isAnonimo() {
    if (this.state.esAnonimo) {
      return <TouchableOpacity onPress={() => this.setState({ esAnonimo: false })}><FontAwesome name={"check"} size={hp(4)} color="#5EC43A" /></TouchableOpacity>
    }
  }
  crearForo() {
    if (!this.state.titulo.trim() || !this.state.pregunta.trim()) {
      alert("Debe completar el titulo y la pregunta para crear un foro")
    }
    else {
      ApiController.postForo(this.props.id_usuario, this.state.titulo, this.state.pregunta, this.state.esAnonimo, this.state.descripcion, this.okForo.bind(this))
    }
  }
  okForo(res) {
    if (res) {
      try {
        this.subitTags(res.insertId)
      }
      catch {
        alert("Ocurrio un error al relacionar los tags")
      }
      this.setState({ modalVisible: true })
    }
    else {
      alert("Ocurrio un error al crear el foro")
    }
  }
  subitTags(id_foro) {
    for (var i = 0; i < this.state.tags.length; i++) {
      ApiController.postForoTags(id_foro, this.state.tags[i].id_tag)
    }
  }
  render() {

    if (this.state.isLoading || this.state.isLoadingFont) {
      return (
        <View style={styles.container}>
          <ActivityIndicator size="large" color="#F28C0F" style={{ flex: 1 }}></ActivityIndicator>
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
                  <View style={{ backgroundColor: 'white', borderRadius: 10, padding: 5, marginLeft: wp(3) }}>
                    <Text style={[styles.screenButtonTagNumber]}>
                      {this.state.tags.length}/10
                      </Text>
                  </View>
                </TouchableOpacity>
                <View style={{ flexDirection: "row", justifyContent: 'center', flex: 0.5 }}>
                  <View style={{ justifyContent: 'center', alignItems: "flex-end", flex: 1.1, marginRight: wp(3) }}>
                    <Text style={{ fontSize: wp(4) }}>Anónimo: </Text>
                  </View>
                  <View style={[styles.checkBoxContainer]}>
                    <TouchableOpacity style={[styles.checkBox, styles.shadow]} onPress={() => this.setState({ esAnonimo: true })} />
                    {this.isAnonimo()}
                  </View>
                </View>
                <View style={{ flexDirection: "row", marginTop: hp(5), flex: 1 }}>
                  <TouchableOpacity style={styles.button} onPress={() => { this.props.onPressVolver() }}>
                    <Text style={styles.screenButtonText}>
                      Cancelar
                            </Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.button} onPress={() => { this.crearForo() }}>
                    <Text style={styles.screenButtonText}>
                      Crear
                            </Text>
                  </TouchableOpacity>
                </View>

              </View>

            </TouchableWithoutFeedback>
          </KeyboardAvoidingView>
          <Animated.View style={[styles.fullScreenAnimate, this.animationStyle(), { opacity: this.state.startValue }]}>
            <ScrollView>
              <FlatList
                style={{ paddingTop: hp(14), paddingBottom: hp(14), flex: 1 }}
                columnWrapperStyle={styles.listContainer}
                data={this.state.tagsBase}
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
            </ScrollView>
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
              data={this.state.tags}
              initialNumToRender={50}
              keyExtractor={(item) => {
                return item.id_tag.toString();
              }}
              renderItem={({ item }) => {
                return (
                  <View style={{ flexDirection: "row" }}>
                    <View style={[styles.headerCard]} onPress={() => this.props.onPressGo()}>
                      <TouchableOpacity onPress={() => this.quitarTag(item.id_tag)}>
                        <Entypo style={{ marginRight: wp(1) }} name={"circle-with-cross"} size={hp(3)} color="#F28C0F"></Entypo>
                      </TouchableOpacity>
                      <Text style={{ fontSize: wp(3.3) }}>{item.nombre_tag}</Text>
                    </View>
                  </View>
                )
              }
              } />

          </Animated.View>
          <Modal
            animationType="fade"
            visible={this.state.modalVisible}
            transparent={true}
            onRequestClose={() => this.setState({ modalVisible: false })}  >
            <TouchableOpacity style={styles.modalContainer} activeOpacity={1} onPress={Keyboard.dismiss}>
              <View style={[styles.modal, styles.shadow]}>
                <View style={{ flex: 0.60, justifyContent: "center", flexDirection: 'column' }}>
                  <Text style={styles.textModal}>Se ha creado exitosamente el foro</Text>
                  <Text style={styles.textModal}>{this.state.titulo}</Text>
                </View>
                <View style={styles.modal2}>

                  <TouchableOpacity onPress={() => { this.setState({ modalVisible: false }), this.props.onPressVolver() }} style={styles.modalExisteButtonAceptar}>
                    <Text style={styles.textButton}>Aceptar</Text>

                  </TouchableOpacity>
                </View>
              </View>
            </TouchableOpacity>
          </Modal>
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

  shadowContainer: {
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
  checkBoxContainer: {
    borderColor: "#DFD8C8",
    justifyContent: "center",
    alignItems: 'flex-start',
    flex: 0.8
  },
  checkBox: {
    height: hp(2.5),
    width: hp(2.5),
    backgroundColor: "white",
    position: 'absolute',
    marginLeft: wp(1)
  },
  shadow: {
    shadowColor: '#00000045',
    shadowOffset: {
      width: 0.05,
      height: 0.55,
    },
    shadowOpacity: 2,
    elevation: 29,
  },
  button: {
    flex: 1,
    backgroundColor: '#F28C0F',
    borderRadius: 10,
    alignItems: 'center',
    paddingVertical: hp(1.5),
    paddingHorizontal: wp(3.3),
    marginHorizontal: wp(3),
    alignSelf: 'flex-start',
    opacity: .95,
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
  },
  //Modal
  //MODAAAAL
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  modal: {
    marginTop: hp(40),
    marginBottom: hp(44),
    paddingTop: hp(1.5),
    borderColor: '#F28C0F',
    borderWidth: 2,
    backgroundColor: '#FFF7EE',
    borderRadius: 22,
    opacity: .95,
  },
  modal2: {
    flex: 0.40,
    flexDirection: 'row',
    borderColor: '#F28C0F',
    borderTopWidth: 2,
    bottom: 0,
    opacity: .95
  },
  textModal: {
    color: '#F28C0F',
    marginHorizontal: wp(5),
    fontSize: wp(6),
    alignSelf: 'center',
    textAlign: 'center',
    fontWeight: 'bold',
    fontFamily: "mainFont"
  },
  textButton: {
    color: '#F28C0F',
    marginHorizontal: wp(5),
    fontSize: wp(4.8),
    alignSelf: 'center',
    textAlign: 'center',
    fontWeight: 'bold',
    paddingTop: hp(0.1),
    fontFamily: "mainFont"
  },
  modalExisteButtonAceptar: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: "center",
    borderBottomRightRadius: 22,
    borderBottomLeftRadius: 22
  }
})


export default withNavigation(EjerciciosNew);