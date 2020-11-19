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
  Image
} from 'react-native';
import DropDownItem from 'react-native-drop-down-item';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { AntDesign, SimpleLineIcons, FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import ApiController from '../controller/ApiController';
import ExportadorObjetos from './exportadores/ExportadorObjetos';
import { isLoading } from 'expo-font';
var { height, width } = Dimensions.get('window');

class ForoEspecifico extends Component {

  constructor(props) {
    super(props);
    this.state = {
      nombre_foro: "",
      pregunta: "",
      foro: {},
      respuestas: [],
      marginTop: 0,
      respuestas: [{ id_respuesta: 1, id_foro: 1, id_usuario: 1, nombre_usuario: "Leila Peredaa", esProfesor: false, fecha: "24 de Junio", nombre_respuesta: '5 conseassssssssssssssssdn asfd iluasmfpafmasn mf,as jos', des_respuesta: "1-2-3-4-5", ratingUp: 10, ratingDown: 4, votos: 6 }],
      isLoadingParams: true,
      isLoadingRespuestas: true,
      modalVisible: false

    };
  }
  componentDidMount = async () => {
    ApiController.getForo(await this.props.navigation.getParam('id_foro'), this.okForo.bind(this))
    ApiController.getRespuestasForo(await this.props.navigation.getParam('id_foro'), this.okRespuestasForo.bind(this))
  }
  okForo(foro) {
    this.setState({ foro: foro[0], isLoadingParams: false })
  }
  okRespuestasForo(respuestas) {
    this.setState({ respuestas: respuestas, isLoadingRespuestas: false })
  }

  votar(voto, item, index) {
    var nuevasRespuestas = this.state.respuestas
    if (voto) {
      nuevasRespuestas[index].votos = nuevasRespuestas[index].votos + 1
      this.setState({ respuestas: nuevasRespuestas })
    }
    else {
      nuevasRespuestas[index].votos = nuevasRespuestas[index].votos - 1
      this.setState({ respuestas: nuevasRespuestas })
    }
  }
  addComment() {

  }
  onLayout = (e) => {
    this.setState({
      marginTop: e.nativeEvent.layout.height,
    })
  }
  render() {
    if (this.state.isLoadingParams || this.state.isLoadingRespuestas) {
      return (
        <View style={styles.container}>
          <ActivityIndicator size="large" color="#F28C0F" backgroundColor=' #616161' style={{ flex: 2 }}></ActivityIndicator>
        </View>
      );
    } else {
      if (this.state.isLoadingRespuestas) {
        return (
          <View style={styles.container}>
            <ActivityIndicator size="large" color="#F28C0F" backgroundColor=' #616161' style={{ flex: 2, marginTop: this.state.marginTop }}></ActivityIndicator>
            {this.state.foro.esAnonimo ?
              <View style={[{ flexDirection: 'row', position: "absolute" }]}>
                <View style={styles.preguntaContainer} onLayout={this.onLayout}>
                  <Text style={styles.titulo}>{this.state.foro.nombre_foro}</Text>
                  <Text style={styles.descripcion}>{this.state.foro.pregunta}</Text>
                  <View style={{ flex: 0, marginTop: hp(1), justifyContent: "flex-end", flexDirection: "row" }}>
                    <Text style={styles.cardSubTitulo}>Preguntado el {this.state.foro.fecha_alta}</Text>
                  </View>
                </View>
              </View>
              :
              <View style={[{ flexDirection: 'row', position: "absolute" }]}>
                <View style={styles.preguntaContainer} onLayout={this.onLayout}>
                  <View style={[{ flexDirection: 'row', marginBottom: hp(1) }]}>
                    {ExportadorObjetos.profileImage(this.state.foro.id_usuario_fk) ?
                      <TouchableOpacity style={styles.imageContainer} onPress={() => this.props.onPressGoUsuario(this.state.foro.id_usuario_fk, this.state.foro.nombre_usuario, this.state.foro.esProfesor)}>
                        <Image
                          source={ExportadorObjetos.profileImage(this.state.foro.id_usuario_fk)}
                          style={[styles.image, { resizeMode: ((this.state.foro.id_usuario_fk == 0) ? 'contain' : 'contain') }]}
                        />
                      </TouchableOpacity>
                      :
                      <TouchableOpacity style={styles.imageContainer} onPress={() => this.props.onPressGoUsuario(this.state.foro.id_usuario_fk, this.state.foro.nombre_usuario, this.state.foro.esProfesor)}>
                        <Text style={{ fontSize: wp(4), textAlign: "center", color: 'white', alignContent: 'center' }}>
                          {this.state.foro.nombre_usuario.slice(0, 1).toUpperCase()}{this.state.foro.apellido.slice(0, 1).toUpperCase()}
                        </Text>
                      </TouchableOpacity>
                    }
                    <View style={[{ flexDirection: 'column', flex: 1 }]}>
                      <TouchableOpacity onPress={() => this.props.onPressGoUsuario(this.state.foro.id_usuario_fk, this.state.foro.nombre_usuario, this.state.foro.esProfesor)}>
                        <Text numberOfLines={1} style={styles.cardTitulo}>{this.state.foro.nombre_usuario} {this.state.foro.apellido}</Text>
                      </TouchableOpacity>
                      <Text style={[styles.cardSubTitulo2, { marginHorizontal: wp(2) }]}>Preguntado el {this.state.foro.fecha_alta}</Text>
                    </View>
                  </View>
                  <Text style={styles.titulo}>{this.state.foro.nombre_foro}</Text>
                  <Text style={styles.descripcion}>{this.state.foro.pregunta}</Text>
                </View>
              </View>
            }
            <TouchableOpacity style={styles.bubble} onPress={() => this.setState({ modalVisible: true })}>
              <FontAwesome name={"plus"} size={hp(3.3)} color="white"></FontAwesome>
            </TouchableOpacity>
          </View >
        );
      }
      else {
        return (
          <View style={styles.container}>

            <View style={[{ flex: 1 }]}>
              <ScrollView style={{ paddingTop: this.state.marginTop + hp(2) }}>
                <View style={styles.todo}>
                  {(this.state.respuestas).map((item, index) => (
                    <DropDownItem key={item.id_respuesta.toString()} contentVisible={false}
                      header={
                        <View style={styles.backgroundTitulo}>
                          <View style={[{ marginBottom: wp(5) }]}>
                            <TouchableOpacity onPress={() => { this.votar(true, item, index) }}>
                              <FontAwesome style={[{ marginBottom: 8 }]} name={"thumbs-up"} size={hp(2.5)} color="#5EC43A"></FontAwesome>
                            </TouchableOpacity>
                            <Text style={styles.rating}>{item.votos}</Text>
                            <TouchableOpacity onPress={() => { this.votar(false, item, index) }}>
                              <FontAwesome style={[{ marginTop: 8 }]} name={"thumbs-down"} size={hp(2.5)} color="#FA5454"></FontAwesome>
                            </TouchableOpacity>
                          </View>
                          <View style={[{ flex: 1, height: '100%' }]}>
                            <View style={[{ flex: 1, height: '100%', flexDirection: "row" }]}>
                              <View style={[{ flex: 1, height: '100%' }]}>
                                <View style={styles.tituloRespuestaContainer}>
                                  <Text style={styles.tituloRespuesta}>{item.nombre_respuesta}</Text>
                                </View>
                              </View>
                              <View style={[{ justifyContent: "center" }]}>
                                <AntDesign style={{ textAlign: 'center' }} name={"caretdown"} size={wp(3.3)} color="#F28C0F" />
                              </View>
                            </View>
                            <View style={{ flex: 0, marginVertical: hp(1) }}>
                              <View style={[{ flexDirection: 'row', justifyContent: "flex-end", flexWrap: "wrap" }]}>
                                <Text style={styles.cardSubTitulo}>Respondido el {item.fecha} por </Text>
                                <Text style={styles.cardSubTituloUsuario} numberOfLines={1} onPress={() => this.props.onPressGoUsuario(item.id_usuario, item.nombre_usuario, item.esProfesor)}>{item.nombre_usuario} {item.apellido}</Text>
                              </View>
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
              {this.state.foro.esAnonimo ?
                <View style={[{ flexDirection: 'row', position: "absolute" }]}>
                  <View style={styles.preguntaContainer} onLayout={this.onLayout}>
                    <Text style={styles.titulo}>{this.state.foro.nombre_foro}</Text>
                    <Text style={styles.descripcion}>{this.state.foro.pregunta}</Text>
                    <View style={{ flex: 0, marginTop: hp(1), justifyContent: "flex-end", flexDirection: "row" }}>
                      <Text style={styles.cardSubTitulo}>Preguntado el {this.state.foro.fecha_alta}</Text>
                    </View>
                  </View>
                </View>
                :
                <View style={[{ flexDirection: 'row', position: "absolute" }]}>
                  <View style={styles.preguntaContainer} onLayout={this.onLayout}>
                    <View style={[{ flexDirection: 'row', marginBottom: hp(1) }]}>
                    {ExportadorObjetos.profileImage(this.state.foro.id_usuario_fk) ?
                      <TouchableOpacity style={styles.imageContainer} onPress={() => this.props.onPressGoUsuario(this.state.foro.id_usuario_fk, this.state.foro.nombre_usuario, this.state.foro.esProfesor)}>
                        <Image
                          source={ExportadorObjetos.profileImage(this.state.foro.id_usuario_fk)}
                          style={[styles.image, { resizeMode: ((this.state.foro.id_usuario_fk == 0) ? 'contain' : 'contain') }]}
                        />
                      </TouchableOpacity>
                      :
                      <TouchableOpacity style={styles.imageContainer} onPress={() => this.props.onPressGoUsuario(this.state.foro.id_usuario_fk, this.state.foro.nombre_usuario, this.state.foro.esProfesor)}>
                        <Text style={{ fontSize: wp(4), textAlign: "center", color: 'white', alignContent: 'center' }}>
                          {this.state.foro.nombre_usuario.slice(0, 1).toUpperCase()}{this.state.foro.apellido.slice(0, 1).toUpperCase()}
                        </Text>
                      </TouchableOpacity>
                    }
                      <View style={[{ flexDirection: 'column', flex: 1 }]}>
                        <TouchableOpacity onPress={() => this.props.onPressGoUsuario(this.state.foro.id_usuario_fk, this.state.foro.nombre_usuario, this.state.foro.esProfesor)}>
                          <Text numberOfLines={1} style={styles.cardTitulo}>{this.state.foro.nombre_usuario} {this.state.foro.apellido}</Text>
                        </TouchableOpacity>
                        <Text style={[styles.cardSubTitulo2, { marginHorizontal: wp(2) }]}>Preguntado el {this.state.foro.fecha_alta}</Text>
                      </View>
                    </View>
                    <Text style={styles.titulo}>{this.state.foro.nombre_foro}</Text>
                    <Text style={styles.descripcion}>{this.state.foro.pregunta}</Text>
                  </View>
                </View>
              }
            </View>
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
                  <View style={[{ flexDirection: "row", justifyContent: "center" }]}>
                    <TouchableOpacity style={[styles.buttonContainerLogin]}
                      onPress={() => this.setState({ modalVisible: false })}>
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
}
const resizeMode = 'center';
const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    paddingHorizontal: wp(5),
    paddingTop: wp(5),
    flexDirection: 'row',
    justifyContent: 'center'
  },
  preguntaContainer: {
    flex: 1,
    backgroundColor: 'white',
    padding: hp(1.5),
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
  titulo: {
    fontSize: wp(4.4),
    fontWeight: 'bold',
    color: '#F28C0F',
    textAlign: 'left'
  },
  tituloRespuestaContainer: {
    flex: 1,
    fontSize: wp(2.5),
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'left',
    justifyContent: 'center',
  },
  tituloRespuesta: {
    fontSize: wp(4.4),
    marginLeft: 20,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'left'
  },
  descripcion: {
    color: 'black',
    marginTop: hp(0.5),
    fontSize: wp(3.3),
  },
  fecha: {
    color: 'black',
    marginTop: hp(0.5),
    fontSize: wp(3),
  },
  rating: {
    fontSize: wp(4),
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center'
  },
  cardSubTitulo: {
    marginTop: 1,
    fontSize: wp(3),
    color: "black"
  },
  cardSubTitulo2: {
    fontSize: wp(3),
    color: "black"
  },
  cardSubTituloUsuario: {
    marginTop: 1,
    fontSize: wp(3.3),
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
  imageContainer: {
    width: hp("5.5"),
    height: hp("5.5"),
    borderWidth: 2,
    borderColor: "#ebf0f7",
    borderRadius: 100,
    margin: 5,
    marginRight: 5,
    justifyContent: 'center',
    alignSelf: "flex-start",
    backgroundColor: "#F28C0F"
  },
  image: {
    resizeMode: "contain",
    height: "100%",
    width: "100%",
    borderRadius: 100,
    justifyContent: 'center',
},
  cardTitulo: {
    fontSize: wp(4.4),
    color: '#F28C0F',
    fontWeight: 'bold',
    marginHorizontal: wp(2),
    marginTop: hp(1)
  },
  /*************************************** */
  //MODAAAAL
  modalContainer: {
    flex: 1,
    justifyContent: "center",
  },
  modal: {
    flex: 1,
    marginTop: hp(25),
    marginBottom: hp(15),
    marginHorizontal: wp(10),
    paddingHorizontal: wp(5),
    backgroundColor: '#FFF7EE',
    borderRadius: 22,
    opacity: .95,
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
    flex: 0.2,
    borderBottomColor: '#F5FCFF',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    borderBottomWidth: 1,
    marginTop: hp(2.2),
    flexDirection: 'column',
    textAlign: 'center',
    fontSize: wp(3.5),
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
    flex: 1.8,
    borderBottomColor: '#F5FCFF',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    borderBottomWidth: 1,
    paddingTop: hp(2.2),
    paddingHorizontal: hp(2.2),
    textAlignVertical: "top",
    marginTop: hp(2.2),
    marginBottom: hp(2.2),
    fontSize: wp(3.3),
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
    paddingVertical: hp(1.5),
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