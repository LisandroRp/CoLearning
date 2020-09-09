import React, { Component } from 'react';
import { withNavigation } from 'react-navigation';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Modal,
  Keyboard,
  Dimensions,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  TouchableWithoutFeedback
} from 'react-native';
import DropDownItem from 'react-native-drop-down-item';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Ionicons, SimpleLineIcons, FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import ApiController from '../controller/ApiController';
var { height, width } = Dimensions.get('window');

class ForoEspecifico extends Component {

  constructor(props) {
    super(props);
    this.state = {
      foro: {
        id_foro: 1,
        nombre_foro: 'Duda Existencial',
        pregunta: 'Consejos para leer mas rápido',
        des_foro: "Que puedo hacer gente. Ayuda!!!",
        id_usuario: 1,
        nombre_usuario: "Lorenzo Coco",
        esProfesor: true,
        respuestas: 114,
        rating: 5,
        fecha_inicio: "24 de Junio",
        tags: [{ id_tag: 1, nombre_tag: "React Native" }, { id_tag: 2, nombre_tag: "Programming" }],
      },

      respuestas: [{ id_respues: 1, id_foro: 1, id_usuario: 1, nombre_usuario: "Leila Pereyra", esProfesor: false, fecha: "24 de Junio", nombre_respuesta: '5 consejos', des_respuesta: "1-2-3-4-5", ratingUp: 10, ratingDown: 4, ratingTotal: 6 }],
      isLoading: false,
      modalVisible: false

    };
  }
  componentDidMount = async () => {
    //ApiController.getForo(await this.props.navigation.getParam('id_foro'), this.okForo.bind(this))
    this.setState({ nombre_curso: await this.props.navigation.getParam('nombre_curso'), institucion: await this.props.navigation.getParam('institucion'), isLoading: false })
  }

  okForo(foro) {
    this.setState({ foro: foro, isLoading: false })
  }

  votar(voto, item, index) {
    var nuevasRespuestas = this.state.respuestas
    if (voto) {
      nuevasRespuestas[index].ratingTotal = nuevasRespuestas[index].ratingTotal + 1
      this.setState({ respuestas: nuevasRespuestas })
    }
    else {
      nuevasRespuestas[index].ratingTotal = nuevasRespuestas[index].ratingTotal - 1
      this.setState({ respuestas: nuevasRespuestas })
    }
  }
  addComment(){

  }
  render() {
    if (this.state.isLoading) {
      return (
        <View style={styles.container}>
          <ActivityIndicator size="large" color="#F28C0F" backgroundColor=' #616161' style={{ flex: 2 }}></ActivityIndicator>
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <ScrollView>
            <View style={styles.preguntaContainer}>
              <Text style={styles.titulo}>{this.state.foro.pregunta}</Text>
              <Text style={styles.descripcion}>{this.state.foro.des_foro}</Text>
            </View>
            <View style={styles.todo}>
              {(this.state.respuestas).map((item, index) => (
                <DropDownItem contentVisible={false}
                  header={
                    <View style={styles.backgroundTitulo}>
                      <View style={[{ marginLeft: 10 }]}>
                        <TouchableOpacity onPress={() => { this.votar(true, item, index) }}>
                          <FontAwesome style={[{ marginBottom: 8 }]} name={"thumbs-up"} size={hp(3)} color="#5EC43A"></FontAwesome>
                        </TouchableOpacity>
                        <Text style={styles.rating}>{item.ratingTotal}</Text>
                        <TouchableOpacity onPress={() => { this.votar(false, item, index) }}>
                          <FontAwesome style={[{ marginTop: 8 }]} name={"thumbs-down"} size={hp(3)} color="#FA5454"></FontAwesome>
                        </TouchableOpacity>
                      </View>
                      <View style={[{ flex: 1, height: '100%' }]}>
                        <View style={styles.tituloRespuestaContainer}>
                          <Text style={styles.tituloRespuesta}>{item.nombre_respuesta}</Text>
                        </View>
                        <View><Text></Text></View>
                        <View style={[{ flexDirection: 'row', flex: 1, position: 'absolute', bottom: 0, right: 0, marginRight: 10 }]}>
                          <Text style={styles.cardSubTitulo}>Preguntado el {item.fecha} por </Text>
                          <Text style={styles.cardSubTituloUsuario} onPress={() => this.props.onPressGoUsuario(item.id_usuario, item.nombre_usuario, item.esProfesor)}>{item.nombre_usuario}</Text>
                        </View>
                      </View>

                    </View>
                  }
                >

                  <Text style={styles.descripcion}>{item.des_respuesta}</Text>
                </DropDownItem>
              ))}
            </View>
          </ScrollView>
          <TouchableOpacity style={styles.bubble} onPress={() => this.setState({ modalVisible: true })}>
            <FontAwesome name={"plus"} size={hp(3.3)} color="white"></FontAwesome>
          </TouchableOpacity>


          <Modal
            animationType="fade"
            visible={this.state.modalVisible}
            transparent={true}
            onRequestClose={() => this.setState({ modalVisible: false })}  >
            <TouchableOpacity style={styles.modalContainer} activeOpacity={1} onPress={Keyboard.dismiss}>

              <View style={styles.modal}>
                <TextInput style={styles.inputTitle}
                  value={this.state.email}
                  maxLength={33}
                  placeholder="Titulo"
                  placeholderTextColor="grey"
                  underlineColorAndroid='transparent'
                  onChangeText={(text) => this.setState({ mail: text })}
                />
                <TextInput style={styles.inputDescripcion}
                  value={this.state.email}
                  multiline={true}
                  maxLength={660}
                  placeholder="Respuesta"
                  placeholderTextColor="grey"
                  underlineColorAndroid='transparent'
                  onChangeText={(text) => this.setState({ mail: text })}
                />
                <View style={[{ flexDirection: "row"}]}>
                  <TouchableOpacity style={[styles.buttonContainerLogin]}
                    onPress={() => this.setState({modalVisible: false})}>
                    <Text style={styles.loginText}>Cancelar</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={[styles.buttonContainerLogin]}
                    onPress={() => this.addComment()}>
                    <Text style={styles.loginText}>Agregar</Text>
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
    justifyContent: 'center',
    backgroundColor: '#FFF7EE'
  },
  todo: {
    backgroundColor: '#F5F4F4',
    marginHorizontal: wp("4"),
    marginVertical: hp("2"),
    borderRadius: 10,
    opacity: 2,
    shadowColor: '#00000035',
    shadowOffset: {
      width: 0.01,
      height: 0.25,
    },
    shadowOpacity: 2,
    shadowRadius: 8,
    elevation: 2
  },
  backgroundTitulo: {
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
    paddingHorizontal: wp("2"),
    paddingVertical: hp("2"),
    flexDirection: 'row',
    justifyContent: 'center'
  },
  preguntaContainer: {
    backgroundColor: 'white',
    padding: 10,
    marginHorizontal: wp("4"),
    marginVertical: hp("2"),
    paddingHorizontal: wp("5"),
    borderRadius: 10,
    opacity: 2,
    shadowColor: '#00000035',
    shadowOffset: {
      width: 0.01,
      height: 0.25,
    },
    shadowOpacity: 2,
    shadowRadius: 8,
    elevation: 2
  },
  titulo: {
    fontSize: hp(2.8),
    fontWeight: 'bold',
    color: '#F28C0F',
    textAlign: 'left'
  },
  tituloRespuestaContainer: {
    fontSize: hp(2.5),
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'left',
    justifyContent: 'center',
    flex: 1
  },
  tituloRespuesta: {
    fontSize: hp(2.5),
    marginLeft: 20,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'left'
  },
  descripcion: {
    color: 'black',
    marginVertical: hp("2"),
    fontSize: hp(2),
  },
  rating: {
    fontSize: hp(2.2),
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center'
  },
  cardSubTitulo: {
    marginTop: 1,
    fontSize: height * 0.015,
    color: "black"
  },
  cardSubTituloUsuario: {
    marginTop: 1,
    fontSize: height * 0.0166,
    color: '#F28C0F',
    fontWeight: "bold"
  },
  bubble: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: hp(7),
    height: hp(7),
    margin: hp(2.2),
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
    shadowRadius: 8,
    elevation: 2
  },
  /*************************************** */
  //MODAAAAL
  modalContainer: {
    flex: 1,
    justifyContent: "center",
  },
  modal: {
    height: hp(66),
    width: wp(80),
    marginTop: hp(10),
    alignSelf: "center",
    backgroundColor: '#FFF7EE',
    borderRadius: 22,
    opacity: .95,
    alignItems: "center",
    shadowColor: '#00000035',
    shadowOffset: {
      width: 0.01,
      height: 0.25,
    },
    shadowOpacity: 2,
    shadowRadius: 8,
    elevation: 2
  },
  inputTitle: {
    borderBottomColor: '#F5FCFF',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    borderBottomWidth: 1,
    width: 300,
    height: hp(5),
    paddingHorizontal: hp(2.2),
    marginTop: hp(2.2),
    flexDirection: 'column',
    textAlign: 'center',

    shadowColor: "#808080",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5
  },
  inputDescripcion: {
    borderBottomColor: '#F5FCFF',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    borderBottomWidth: 1,
    width: 300,
    flex: 1,
    paddingTop: hp(2.2),
    paddingHorizontal: hp(2.2),
    textAlignVertical: "top",
    marginTop: hp(2.2),
    marginBottom: hp(2.2),
    flexDirection: 'column',
    shadowColor: "#808080",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  buttonContainerLogin: {
    height: 45,
    justifyContent: 'center',
    marginHorizontal: wp(5),
    alignItems: 'center',
    marginBottom: hp(2.2),
    borderRadius: 10,
    paddingHorizontal: wp(3.3),
    backgroundColor: "#F28C0F"
  },
  loginText: {
    color: 'white'
  }
})

export default withNavigation(ForoEspecifico);