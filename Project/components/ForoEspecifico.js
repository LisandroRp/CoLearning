import React, { Component } from 'react';
import { withNavigation } from 'react-navigation';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity
} from 'react-native';
import DropDownItem from 'react-native-drop-down-item';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Ionicons, SimpleLineIcons, FontAwesome, FontAwesome5 } from "@expo/vector-icons";
var { height, width } = Dimensions.get('window');

class ForoEspecifico extends Component {

  constructor(props) {
    super(props);
    this.state = {
      foro: {
        id_foro: 1,
        nombre_foro: 'Duda Existencial',
        pregunta: 'Como hacer para estudiar para Investigacion Operativa??',
        des_foro: "Que puedo hacer gente. Ayuda!!!",
        id_usuario: 1,
        nombre_usuario: "Lorenzo Coco",
        esProfesor: true,
        respuestas: 114,
        rating: 5,
        fecha_inicio: "24 de Junio",
        tags: [{ id_tag: 1, nombre_tag: "React Native" }, { id_tag: 2, nombre_tag: "Programming" }]
      },

      respuestas: [{ id_respues: 1, id_foro: 1, id_usuario: 1, nombre_usuario: "Lisandro", esProfesor: false, fecha: "24 de Junio", nombre_respuesta: 'Es esta Brohh', des_respuesta: "Era joda broh, no entendi nada de tu pregunta", ratingUp: 10, ratingDown: 4, ratingTotal: 6 }],
      modalVisible: false,
      isLoading: false,

    };
  }
  componentDidMount = async () => {
    this.setState({ nombre_curso: await this.props.navigation.getParam('nombre_curso'), institucion: await this.props.navigation.getParam('institucion'), isLoading: false })
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
  render() {
    if (this.state.isLoading) {
      return (
        <View style={styles.container}>
          <ActivityIndicator size="large" color="#3399ff" backgroundColor=' #616161' style={{ flex: 2 }}></ActivityIndicator>
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
                      <View style={[{ flex: 1, height: '100%'}]}>
                        <View style={styles.tituloRespuestaContainer}>
                        <Text style={styles.tituloRespuesta}>{item.nombre_respuesta}</Text>
                        </View>
                          <View><Text></Text></View>
                          <View style={[{ flexDirection: 'row', flex:1, position: 'absolute', bottom: 0, right: 0, marginRight: 10}]}>
                            <Text style={styles.cardSubTitulo}>Preguntado el {item.fecha} por </Text>
                            <Text style={styles.cardSubTituloUsuario} onPress={() => this.props.onPressGoUsuario(item.id_usuario, item.nombre_usuario, item.profesor)}>{item.nombre_usuario}</Text>
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
  bannerContainer: {
    height: height * 0.08,
    backgroundColor: 'black'
  },
  bottomBanner: {
    position: "absolute",
    bottom: 0,
    alignSelf: 'center',
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
    flex:1
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
  image: {
    height: height * 0.55,
    width: width,
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
  },
})

export default withNavigation(ForoEspecifico);