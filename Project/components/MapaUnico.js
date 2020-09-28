import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  Image,
  TouchableOpacity,
  FlatList,
  Dimensions,
  Alert,
  ScrollView
} from 'react-native';
import { FontAwesome, FontAwesome5 } from '@expo/vector-icons';
import { SearchBar } from "react-native-elements";
import MapView from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import { withNavigation } from 'react-navigation';
import { AsyncStorage } from 'react-native';
import { Marker, Callout } from 'react-native-maps';
import ApiController from '../controller/ApiController';
import Carousel from 'react-native-snap-carousel';
import UserDataManager from './UserDataManager';

const GOOGLE_MAPS_APIKEY = 'AIzaSyCdgRdU-qT9RXGnIBSyEUNVvCJtGhai1Ck';

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';



class MapaUnico extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      userSelected: [],
      idEvento: null,
      evento: {},
      isLoadingPos: true,
      isLoadingData: true,
      markers: [],
      coordinates: [
        { name: 'Matematica', latitude: -34.856093, longitude: -58.503515 }
      ],
      carousel: [
        { name: 'Matematica', latitude: -34.856093, longitude: -58.503515 },
        { name: 'Posicion', latitude: -34.897243, longitude: -58.627954 }
      ],
      miLatitude: -34.897243,
      miLongitude: -58.627954,
      id_transporte: 1,
      tipoMapa: this.props.navigation.getParam('tipo')
    };
  }

  componentDidMount = async () => {
    //ApiController.getUsuario(await this.props.navigation.getParam("id_usuario"), this.okDatos.bind(this))
    this.cargarDatos()
    this.traerPosicion(this.okPosicion.bind(this))
  }
  okDatos(usuario){
    var coordinate = []
    coordinate.push(usuario)
    var carousel = []
    carousel.push(usuario)
    carousel.push({ name: 'Posicion', latitude: UserDataManager.getInstance().getLatitude(), longitude: UserDataManager.getInstance().getLongitude() })
    
    this.setState({coordinate: coordinate, carousel: carousel})
  }
  cargarDatos = async () => {
    let coordinates = [
      { name: await this.props.navigation.getParam('nombre'), latitude: -34.856093, longitude: -58.503515 },
    ]
    let carousel = [
      { name: await this.props.navigation.getParam('nombre'), direccion: await this.props.navigation.getParam('direccion'), distancia: '', tiempo: '', latitude: -34.856093, longitude: -58.503515 },
      { name: 'Posicion', direccion: await this.props.navigation.getParam('nombre'), latitude: this.state.miLatitude, longitude: this.state.miLongitude }
    ]
    //VA ESTE Y SACAR EL LOADING Y EL CAROUSEL DEL STATE DE ABAJO//
    ApiController.getRoad(carousel, "Driving", this.okRoad.bind(this))
    this.setState({ coordinates: coordinates, carousel: carousel})
  }
  okRoad(carousel, road) {
    if(road.rows[0].elements[0].status == "ZERO_RESULTS"){
      carousel[0].distancia = 0
      carousel[0].tiempo = 0
      this.setState({id_transporte: 0, carousel: carousel})
    }
    carousel[0].distancia = road.rows[0].elements[0].distance.text
    carousel[0].tiempo = road.rows[0].elements[0].duration.text
    this.setState({ carousel: carousel, isLoadingData: false })
  }
  traerPosicion(okPosicion) {
    this.setState({ miLongitude: UserDataManager.getInstance().getLongitude(), miLatitude: UserDataManager.getInstance().getLatitude() })
    okPosicion()
  }
  okPosicion() {
    this.setState({ isLoadingPos: false })
  }
  cargarDetalle() {
    ApiController.getDetalle(this.okDetalle.bind(this), this.state.idEvento);
  }

  onCarouselItemChange = (index) => {
    let location = this.state.carousel[index];

    if (location.name == "Posicion") {
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
  render() {
    if (this.state.isLoadingPos || this.state.isLoadingData) {
      return (
        <View style={styles.container}>
          <ActivityIndicator size="large" color="#F28C0F" backgroundColor=' #616161' style={{ flex: 1 }}></ActivityIndicator>
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
                  key={marker.name}
                  ref={ref => this.state.markers[index] = ref}
                  onPress={() => this.onMarkerPressed(marker, index)}
                  coordinate={{ latitude: marker.latitude, longitude: marker.longitude }}
                >
                  <Callout>
                    <Text>{marker.name}</Text>
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
          <View style={styles.transportContainer}>
            <TouchableOpacity style={[styles.typeTransportContainer, { backgroundColor: this.tipoDeTransporteContainer(1) }]} onPress={() => this.changeTransporte(this.state.carousel, 1)}><FontAwesome5 name="car" size={hp(3.3)} color={this.tipoDeTransporteLogo(1)} /></TouchableOpacity>
            <TouchableOpacity style={[styles.typeTransportContainer, { backgroundColor: this.tipoDeTransporteContainer(2) }]} onPress={() => this.changeTransporte(this.state.carousel, 2)}><FontAwesome5 name="bus" size={hp(3.3)} color={this.tipoDeTransporteLogo(2)} /></TouchableOpacity>
            <TouchableOpacity style={[styles.typeTransportContainer, { backgroundColor: this.tipoDeTransporteContainer(3) }]} onPress={() => this.changeTransporte(this.state.carousel, 3)}><FontAwesome5 name="walking" size={hp(3.3)} color={this.tipoDeTransporteLogo(3)} /></TouchableOpacity>
            <TouchableOpacity style={[styles.typeTransportContainer, { backgroundColor: this.tipoDeTransporteContainer(4) }]} onPress={() => this.changeTransporte(this.state.carousel, 4)}><FontAwesome5 name="bicycle" size={hp(3.3)} color={this.tipoDeTransporteLogo(4)} /></TouchableOpacity>
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
    (item.name == 'Posicion') ?
      <View style={styles.cardContainerHome}>
        <FontAwesome name="home" size={hp(11)} color={"#F28C0F"} />
      </View>
      :
      <View style={styles.cardContainer}>

        <View style={styles.cardImage}>
          <FontAwesome name="user" size={hp(5.5)} color={"white"} />
        </View>

        <View style={{ flexDirection: 'column', width: 0, flexGrow: 1 }}>
          <Text style={styles.cardTitle}>{item.name}</Text>
          <Text style={styles.cardDireccion}>{item.direccion}</Text>
          <Text style={styles.cardDistancia}>Distancia: {item.distancia}</Text>
          <Text style={styles.cardTiempo}>Duración: {item.tiempo}</Text>
        </View>
      </View>
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
  transportContainer: {
    position: 'absolute',
    height: 0,
    right: 0,
    marginTop: hp(2),
    marginRight: wp(5)
  },
  typeTransportContainer: {
    height: hp(5.5),
    width: hp(5.5),
    marginVertical: hp(2),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 100,
    backgroundColor: 'white',
    shadowColor: '#00000055',
    shadowOffset: {
      width: 2,
      height: 5,
    },
    shadowOpacity: 2,
    shadowRadius: 8,
    elevation: 55,
  },
  //********************* */
  //CAROUSEL
  //********************* */
  carousel: {
    position: 'absolute',
    bottom: 0,
    paddingVertical: hp(4.4)
  },
  cardContainer: {
    //backgroundColor: 'rgba(0, 0, 0, 0.6)',
    backgroundColor: 'white',
    height: hp(20),
    width: wp(80),
    padding: 24,
    borderRadius: 24,
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center',
    shadowColor: '#00000021',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 2,
    shadowRadius: 8,
    elevation: 55,
    flexWrap: 'wrap'
  },
  cardImage: {
    height: hp(10),
    width: hp(10),
    backgroundColor: '#F28C0F',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: wp(5),
    borderRadius: 100
  },
  cardTitle: {
    color: '#F28C0F',
    fontSize: wp(4.4),
    alignSelf: 'center',
    textAlign: 'center'
  },
  cardDireccion: {
    color: 'black',
    fontSize: wp(3),
    alignSelf: 'center',
    marginBottom: wp(3)
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
    //backgroundColor: 'rgba(0, 0, 0, 0.6)',
    backgroundColor: 'white',
    height: hp(18),
    width: hp(18),
    padding: 24,
    borderRadius: 80,
    alignSelf: 'center',
    alignItems: 'center',
    shadowColor: '#00000021',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 2,
    shadowRadius: 8,
    elevation: 55,
  },
})

export default withNavigation(MapaUnico);