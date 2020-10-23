import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  Image,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
  Alert,
  ScrollView
} from 'react-native';
import { FontAwesome, FontAwesome5, AntDesign, Entypo } from '@expo/vector-icons';
import { SearchBar } from "react-native-elements";
import MapView from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import { withNavigation } from 'react-navigation';
import { AsyncStorage } from 'react-native';
import { Marker, Callout } from 'react-native-maps';
import ApiController from '../controller/ApiController';
import Carousel from 'react-native-snap-carousel';
import UserDataManager from './UserDataManager';
import ExportadorObjetos from './exportadores/ExportadorObjetos';

const GOOGLE_MAPS_APIKEY = 'AIzaSyCdgRdU-qT9RXGnIBSyEUNVvCJtGhai1Ck';

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';



class MapaUnico extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      userSelected: [],
      isLoadingPos: true,
      isLoadingData: true,
      markers: [],
      coordinates: [],
      carousel: [],
      miLatitude: -34.897243,
      miLongitude: -58.627954,
      id_transporte: 1,
      tipoMapa: this.props.navigation.getParam('tipoMapa'),
      esMapa: this.props.navigation.getParam("mapa")
    };
  }

  componentDidMount = async () => {
    console.log(await this.props.navigation.getParam("id"))
    ApiController.getUsuarioById(await this.props.navigation.getParam("id"), this.okDatos.bind(this))
    this.traerPosicion(this.okPosicion.bind(this))
  }
  okDatos(usuario) {
    var newCoordinate = []
    newCoordinate.push(usuario)
    var newCarousel = []
    newCarousel.push(usuario)
    newCarousel.push({id_usuario: 0, nombre_usuario: 'Posicion', latitude: UserDataManager.getInstance().getLatitude(), longitude: UserDataManager.getInstance().getLongitude() })

    this.setState({ coordinates: newCoordinate, carousel: newCarousel, tipoMapa: this.props.navigation.getParam('tipo') })
    ApiController.getRoad(this.state.carousel, "Driving", this.okRoad.bind(this))
  }

  okRoad(newCarousel, road) {
    if (road.rows[0].elements[0].status == "ZERO_RESULTS") {
      newCarousel[0].distancia = 0
      newCarousel[0].tiempo = 0
      this.setState({ id_transporte: 1, carousel: newCarousel })
    }
    newCarousel[0].distancia = road.rows[0].elements[0].distance.text
    newCarousel[0].tiempo = road.rows[0].elements[0].duration.text
    this.setState({ carousel: newCarousel, isLoadingData: false })
  }
  traerPosicion(okPosicion) {
    this.setState({ miLongitude: UserDataManager.getInstance().getLongitude(), miLatitude: UserDataManager.getInstance().getLatitude() })
    okPosicion()
  }
  okPosicion() {
    this.setState({ isLoadingPos: false })
  }

  onCarouselItemChange = (index) => {
    let location = this.state.carousel[index];

    if (location.nombre == "Posicion") {
      this._map.animateToRegion({
        latitude: this.state.miLatitude,
        longitude: this.state.miLongitude,
        latitudeDelta: 0.09,
        longitudeDelta: 0.035
      })
    }
    else {
      this._map.animateToRegion({
        latitude: location.latitude,
        longitude: location.longitude,
        latitudeDelta: 0.09,
        longitudeDelta: 0.035
      })
    }
    this._carousel.snapToItem(index);
  }

  onMarkerPressed = (location, index) => {
    this._map.animateToRegion({
      latitude: location.latitude,
      longitude: location.longitude,
      latitudeDelta: 0.09,
      longitudeDelta: 0.035
    });

    this._carousel.snapToItem(index);
  }
  tipoDeTransporteContainer(tipo) {
    if (this.state.id_transporte == tipo) {
      return "#F28C0F"
    }
    else {
      return 'white'
    }
  }
  tipoDeTransporteLogo(tipo) {
    if (this.state.id_transporte == tipo) {
      return "white"
    }
    else {
      return '#F28C0F'
    }
  }
  queTransporte() {
    switch (this.state.id_transporte) {
      case 1:
        return "DRIVING"
      case 2:
        return 'TRANSIT'
      case 3:
        return 'WALKING'
      case 4:
        return 'BICYCLING'
    }
  }
  changeTransporte(carousel, id_transporte) {
    switch (id_transporte) {
      case 1:
        ApiController.getRoad(carousel, "driving", this.okRoad.bind(this))
        this.setState({ id_transporte: 1 })
        break;
      case 2:
        ApiController.getRoad(carousel, "transit", this.okRoad.bind(this))
        this.setState({ id_transporte: 2 })
        break;
      case 3:
        ApiController.getRoad(carousel, "walking", this.okRoad.bind(this))
        this.setState({ id_transporte: 3 })
        break;
      case 4:
        ApiController.getRoad(carousel, "bicycling", this.okRoad.bind(this))
        this.setState({ id_transporte: 4 })
        break;
    }
  }
  volver = async () => {
    this.props.onPressVolver(await this.props.navigation.getParam("mapa"))
  }
  render() {
    if (this.state.isLoadingPos || this.state.isLoadingData) {
      return (
        <View style={styles.container}>
    
          <ActivityIndicator size="large" color="#F28C0F" backgroundColor=' #616161' style={{ flex: 1 }}/>
          <TouchableOpacity style={[styles.backBubble, styles.shadow]} onPress={() => this.volver()}>
            <Entypo name="chevron-left" size={hp(4.4)} style={{ textAlignVertical: "center" }} color={'#F28C0F'} />
          </TouchableOpacity>
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <MapView
            ref={map => this._map = map}
            showsUserLocation={true}
            style={styles.map}
            initialRegion={{
              longitude: this.state.coordinates[0].longitude,
              latitude: this.state.coordinates[0].latitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}>
            {
              this.state.coordinates.map((marker, index) => (
                <Marker
                  key = {(item) => (this.state.tipoMapa == 'Curso' ? item.id_curso : item.id_usuario )}
                  ref={ref => this.state.markers[index] = ref}
                  onPress={() => this.onMarkerPressed(marker, index)}
                  coordinate={{ latitude: marker.latitude, longitude: marker.longitude }}
                >
                  <Callout>
                    <Text>{(this.state.tipoMapa == "Curso" ? marker.nombre_curso : marker.nombre_usuario)}</Text>
                  </Callout>

                </Marker>
              ))
            }
            <MapViewDirections
              origin={{
                latitude: this.state.miLatitude,
                longitude: this.state.miLongitude
              }}
              destination={{
                latitude: this.state.coordinates[0].latitude,
                longitude: this.state.coordinates[0].longitude
              }}
              apikey={GOOGLE_MAPS_APIKEY}
              strokeWidth={3}
              strokeColor="#F28C0F"
              mode={this.queTransporte()}
            />

          </MapView>
          <View style={styles.safeArea} />
          <TouchableOpacity style={[styles.backBubble, styles.shadow]} onPress={() => this.volver()}>
            <Entypo name="chevron-left" size={hp(4.4)} style={{ textAlignVertical: "center" }} color={'#F28C0F'} />
          </TouchableOpacity>
          <View style={styles.transportContainer}>
            <TouchableOpacity style={[styles.typeTransportContainer, styles.shadow, { backgroundColor: this.tipoDeTransporteContainer(1) }]} onPress={() => this.changeTransporte(this.state.carousel, 1)}><FontAwesome5 name="car" size={hp(3.3)} color={this.tipoDeTransporteLogo(1)} /></TouchableOpacity>
            <TouchableOpacity style={[styles.typeTransportContainer, styles.shadow, { backgroundColor: this.tipoDeTransporteContainer(2) }]} onPress={() => this.changeTransporte(this.state.carousel, 2)}><FontAwesome5 name="bus" size={hp(3.3)} color={this.tipoDeTransporteLogo(2)} /></TouchableOpacity>
            <TouchableOpacity style={[styles.typeTransportContainer, styles.shadow, { backgroundColor: this.tipoDeTransporteContainer(3) }]} onPress={() => this.changeTransporte(this.state.carousel, 3)}><FontAwesome5 name="walking" size={hp(3.3)} color={this.tipoDeTransporteLogo(3)} /></TouchableOpacity>
            <TouchableOpacity style={[styles.typeTransportContainer, styles.shadow, { backgroundColor: this.tipoDeTransporteContainer(4) }]} onPress={() => this.changeTransporte(this.state.carousel, 4)}><FontAwesome5 name="bicycle" size={hp(3.3)} color={this.tipoDeTransporteLogo(4)} /></TouchableOpacity>
          </View>
          <Carousel
            ref={(c) => { this._carousel = c; }}
            data={this.state.carousel}
            containerCustomStyle={styles.carousel}
            contentContainerCustomStyle={{ alignItems: 'center' }}
            renderItem={this.renderCarouselItem}
            sliderWidth={Dimensions.get('window').width}
            itemWidth={wp(80)}
            removeClippedSubviews={false}
            onSnapToItem={(index) => this.onCarouselItemChange(index)}
          />
        </View>
      );
    }
  }

  renderCarouselItem = ({ item }) =>
    (item.nombre_usuario == 'Posicion') ?
      <View style={[styles.cardContainerHome, styles.shadowCard]}>
        <FontAwesome name="home" size={hp(8)} color={"#F28C0F"} />
      </View>
      :
      ((this.state.tipoMapa == 'Curso') ?
        <View style={[styles.cardContainer, styles.shadowCard]}>
          <View style={{ justifyContent: "center" }}>
            <View style={styles.cardImage}>
              <Text style={{ fontSize: hp(5), textAlign: "center", color: '#F28C0F', alignContent: 'center' }}>
                {item.nombre.slice(0, 1).toUpperCase()}
              </Text>
            </View>
          </View>

          <View style={{ flexDirection: 'column', flex: 1 }}>
            <Text style={styles.cardTitle} numberOfLines={2}>{item.nombre}{item.apellido ? ('\n' + item.apellido) : ""}</Text>
            {item.institucion ? <Text style={styles.cardInstituto}>{item.institucion}</Text> : <View />}
            <Text style={styles.cardDireccion} numberOfLines={2}>{item.des_domicilio}</Text>
            <View style={{ flexDirection: 'row' }}>
              <View style={{ flex: 1 }}>
                <Text style={styles.cardDistancia}>Distancia: {item.distancia}</Text>
                <Text style={styles.cardTiempo}>Duración: {item.tiempo}</Text>
              </View>
              {this.state.esMapa ?
                <TouchableOpacity style={{ justifyContent: 'center', paddingLeft: wp(5) }} onPress={() => this.props.onPressGoPerfil(this.state.tipoMapa)}>
                  <Entypo name="info-with-circle" size={hp(3.3)} color={"#F28C0F"} />
                </TouchableOpacity>
                //
                :
                <View />
              }
            </View>
          </View>
        </View>
        :
        <View style={[styles.cardContainer, styles.shadowCard]}>
          <View style={{ justifyContent: "center" }}>
          {ExportadorObjetos.profileImage(item.id_usuario) ?
            <View style={[styles.cardImageContainer, {borderWidth: 0}]}>
            <Image
                source={ExportadorObjetos.profileImage(item.id_usuario)}
                style={[styles.cardImage, { resizeMode: ((item.id_usuario == 0) ? 'contain' : 'contain') }]}
              />
            </View>
              :
              <View style={[styles.cardImageContainer, {borderWidth: 1.5}]}>
              <Text style={{ fontSize: hp(5), textAlign: "center", color: '#F28C0F', alignContent: 'center' }}>
                {item.nombre_usuario.slice(0, 1).toUpperCase()}
              </Text>
            </View>
          }
          </View>

          <View style={{ flexDirection: 'column', flex: 1 }}>
            <Text style={styles.cardTitle} numberOfLines={2}>{item.nombre_usuario}{item.apellido ? ('\n' + item.apellido) : ""}</Text>
            {item.institucion ? <Text style={styles.cardInstituto}>{item.institucion}</Text> : <View />}
            <Text style={styles.cardDireccion} numberOfLines={2}>{item.des_domicilio}</Text>
            <View style={{ flexDirection: 'row' }}>
              <View style={{ flex: 1 }}>
                <Text style={styles.cardDistancia}>Distancia: {item.distancia}</Text>
                <Text style={styles.cardTiempo}>Duración: {item.tiempo}</Text>
              </View>
              {this.state.esMapa ?
                <TouchableOpacity style={{ justifyContent: 'center', paddingLeft: wp(5) }} onPress={() => this.props.onPressGoPerfil(item.id_usuario, this.state.tipoMapa)}>
                  <Entypo name="info-with-circle" size={hp(3.3)} color={"#F28C0F"} />
                </TouchableOpacity>
                //
                :
                <View />
              }
            </View>
          </View>
        </View>
      )

}

{/* <MapViewDirections
  origin={{
    latitude: -34.89917857365071,
    longitude: -58.630689666256345
  }}
  destination={{
    latitude: -34.901978,
    longitude: -58.621620
  }}
  apikey={GOOGLE_MAPS_APIKEY}
  strokeWidth={3}
  strokeColor="hotpink"
  mode={this.queTransporte()}
/> */}
const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#FFF7EE'
  },
  safeArea: {
    backgroundColor: '#F28C0F',
    height: hp(5)
  },
  map: {
    ...StyleSheet.absoluteFillObject
  },
  marker: {
    backgroundColor: "#550bbc",
    padding: 5,
    borderRadius: 5,
  },
  text: {
    color: "#FFF",
    fontWeight: "bold"
  },
  backBubble: {
    position: "absolute",
    left: 0,
    alignItems: "center",
    justifyContent: "center",
    height: hp(5.5),
    width: hp(5.5),
    marginTop: hp(7),
    marginLeft: wp(4),
    borderRadius: 50,
    backgroundColor: 'white'
  },
  transportContainer: {
    position: 'absolute',
    height: 0,
    right: 0,
    marginTop: hp(10),
    marginRight: wp(5)
  },
  typeTransportContainer: {
    height: hp(5.5),
    width: hp(5.5),
    marginVertical: hp(2),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 100,
    backgroundColor: 'white'
  },
  shadow: {
    shadowColor: '#00000055',
    shadowOffset: {
      width: 2,
      height: 5,
    },
    shadowOpacity: 2,
    shadowRadius: 8,
    elevation: 55,
  },
  shadowCard: {
    shadowColor: '#00000021',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 2,
    shadowRadius: 8,
    elevation: 55
  },
  //********************* */
  //CAROUSEL
  //********************* */
  carousel: {
    position: 'absolute',
    bottom: 0,
    paddingVertical: hp(8.8)
  },
  cardContainer: {
    backgroundColor: 'white',
    flex: 1,
    padding: hp(2),
    borderRadius: 24,
    flexDirection: 'row',
  },
  cardImageContainer: {
    height: hp(10),
    width: hp(10),
    backgroundColor: '#FFF7EE',
    borderColor: "#F28C0F",
    marginRight: wp(5),
    borderRadius: hp(10) / 2,
    justifyContent: "center"
  },
  cardImage: {
    height: "100%",
    width: "100%",
    borderRadius: hp(10) / 2,
    resizeMode: "contain"
  },
  cardTitle: {
    color: '#F28C0F',
    fontSize: wp(5.5),
    alignSelf: 'center',
    textAlign: 'center'
  },
  cardInstituto: {
    color: 'black',
    fontSize: wp(4.4),
    alignSelf: 'center',
    textAlign: 'center'
  },
  cardDireccion: {
    color: 'black',
    fontSize: wp(3),
    textAlign: 'center',
    marginTop: hp(0.5),
    marginBottom: hp(3)
  },
  cardDistancia: {
    color: 'black',
    fontSize: wp(3)
  },
  cardTiempo: {
    color: 'black',
    fontSize: wp(3)
  },
  //********************* */
  //HOME
  //********************* */
  cardContainerHome: {
    backgroundColor: 'white',
    height: hp(15),
    width: hp(15),
    padding: 24,
    borderRadius: 80,
    alignSelf: 'center',
    alignItems: 'center'
  },
})

export default withNavigation(MapaUnico);