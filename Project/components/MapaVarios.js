import React, { Component } from 'react';
import { StyleSheet, Text, View, ActivityIndicator, Dimensions, Image } from "react-native";
import { Entypo } from '@expo/vector-icons';
import MapView from 'react-native-maps';
import { Marker, Callout } from 'react-native-maps';
import Carousel from 'react-native-snap-carousel';
import { withNavigation } from 'react-navigation';

import UserDataManager from './UserDataManager';
import ApiController from '../controller/ApiController';
import ExportadorObjetos from './exportadores/ExportadorObjetos';

//const MapView = Components.MapView;

const Images = [
  { uri: "https://i.imgur.com/sNam9iJ.jpg" },
  { uri: "https://i.imgur.com/N7rlQYt.jpg" },
  { uri: "https://i.imgur.com/UDrH0wm.jpg" },
  { uri: "https://i.imgur.com/Ka8kNST.jpg" }
]

const { width, height } = Dimensions.get("window");

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { TouchableOpacity } from 'react-native-gesture-handler';

const CARD_HEIGHT = height / 4.5;
const CARD_WIDTH = width * 0.9;

class MapaVarios extends Component {
  state = {
    markers: [],
    coordinates: [],
    region: {
      latitude: 45.52220671242907,
      longitude: -122.6653281029795,
      latitudeDelta: 0.04864195044303443,
      longitudeDelta: 0.040142817690068,
    },
    miLatitude: -34.896500,
    miLongitude: -58.631620,
    isLoading: true,
    tipoMapa: ""
  };

  componentDidMount = async () => {
    ApiController.getProfesoresFilter(await this.props.navigation.getParam("nombre_profesor"), await this.props.navigation.getParam("materia"), await this.props.navigation.getParam("des_domicilio"), await this.props.navigation.getParam("rating"), this.okProfesores.bind(this))
  }
  okProfesores(profesoresBase) {
    console.log(profesoresBase)
    this.setState({ miLongitude: UserDataManager.getInstance().getLongitude(), miLatitude: UserDataManager.getInstance().getLatitude(), tipoMapa: this.props.navigation.getParam('tipo'), coordinates: profesoresBase, isLoading: false })
  }

  onCarouselItemChange = (index) => {
    let location = this.state.coordinates[index];

    this._map.animateToRegion({
      latitude: location.latitude,
      longitude: location.longitude,
      latitudeDelta: 0.09,
      longitudeDelta: 0.035
    })

    this.state.markers[index].showCallout()
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
  volver = async () => {
    this.props.onPressVolver(await this.props.navigation.getParam("curso"))
  }
  render() {
    if (this.state.isLoading) {
      return (
        <View style={styles.container}>
          <ActivityIndicator size="large" color="#F28C0F" backgroundColor=' #616161' style={{ flex: 1 }} />
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
              longitude: this.state.miLongitude,
              latitude: this.state.miLatitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}>
            {
              this.state.coordinates.map((marker, index) => (
                <Marker
                  key={(this.state.tipoMapa == "Curso" ? marker.id_curso : marker.id_usuario)}
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


          </MapView>
          <View style={styles.safeArea} />
          <TouchableOpacity style={[styles.backBubble, styles.shadow]} onPress={() => this.volver()}>
            <Entypo name="chevron-left" size={hp(4.4)} style={{ textAlignVertical: "center" }} color={'#F28C0F'} />
          </TouchableOpacity>
          <Carousel
            ref={(c) => { this._carousel = c; }}
            data={this.state.coordinates}
            containerCustomStyle={styles.carousel}
            key={(item) => (this.state.tipoMapa == 'Curso' ? item.id_curso : item.id_usuario)}
            contentContainerCustomStyle={{ alignItems: 'center' }}
            renderItem={this.renderCarouselItem}
            sliderWidth={Dimensions.get('window').width}
            itemWidth={wp(80)}
            removeClippedSubviews={false}
            initialScrollIndex={0}
            onSnapToItem={(index) => this.onCarouselItemChange(index)}
          />
        </View>
      );
    }
  }
  renderCarouselItem = ({ item }) =>
    (this.state.tipoMapa == 'Curso') ?
      <View style={[styles.cardContainer, styles.shadow]}>
        <TouchableOpacity style={styles.cardContainer2} onPress={() => this.props.onPressGoCurso(item.id_curso, item.nombre_curso, item.des_domicilio)}>

          <View style={styles.cardImage}>
            <Text style={{ fontSize: hp(5), textAlign: "center", color: '#F28C0F', alignContent: 'center' }}>
              {item.nombre_curso.slice(0, 1).toUpperCase()}
            </Text>
          </View>

          <View style={{ flexDirection: 'column', flex: 1 }}>
            <Text style={styles.cardTitle}>{item.nombre_curso}</Text>
            <Text style={styles.cardInstituto}>{item.institucion}</Text>
            <Text style={styles.cardDireccion}>{item.des_domicilio}</Text>
            <TouchableOpacity style={styles.cardButton} onPress={() => this.props.onPressMap(item.id_curso, item.nombre_curso, item.des_domicilio)}><Text style={styles.cardButtonText}>Calcular Recorrido</Text></TouchableOpacity>
          </View>
        </TouchableOpacity>
      </View>
      /////////////////////
      :
      /////////////////////
      <View style={[styles.cardContainer, styles.shadow]}>
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
          <Text style={styles.cardDireccion}>{item.des_domicilio}</Text>
          <View style={styles.cardMoneyContainer}>
            <Text style={styles.cardSubTituloMoney}>A partir de: </Text>
            <Text style={styles.cardSubTituloMoneyMonto}>{item.des_moneda}{item.monto}/h</Text>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: "center" }}>
            <TouchableOpacity style={styles.cardButton} onPress={() => this.props.onPressMap(item.id_usuario, item.nombre_usuario, item.apellido, item.des_domicilio, this.state.tipoMapa)}><Text style={styles.cardButtonText}>Calcular Recorrido</Text></TouchableOpacity>
            <TouchableOpacity style={{ justifyContent: 'center', flex: 1, paddingLeft: wp(4) }} onPress={() => this.props.onPressGoProfesor(item.id_usuario, item.nombre_usuario, item.des_domicilio, true)}>
              <Entypo name="info-with-circle" size={hp(3.3)} color={"#F28C0F"} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
}

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
  //********************* */
  //CAROUSEL
  //********************* */
  carousel: {
    position: 'absolute',
    bottom: 0,
    paddingVertical: hp(4.4)
  },
  cardContainer: {
    backgroundColor: 'white',
    flex: 1,
    padding: hp(2),
    borderRadius: 24,
    flexDirection: 'row',
  },
  cardContainer2: {
    backgroundColor: 'white',
    height: hp(20),
    width: wp(80),
    padding: 24,
    borderRadius: 24,
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center',
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
    resizeMode: "contain",
    height: "100%",
    width: "100%",
    borderRadius: hp(10) / 2,
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
    marginBottom: hp(2),
    marginTop: hp(0.5)
  },
  cardButton: {
    backgroundColor: '#F28C0F',
    padding: hp(1.5),
    borderRadius: 10
  },
  cardButtonText: {
    textAlign: 'center',
    fontSize: wp(3),
    color: "white"
  },
  cardTiempo: {
    color: 'black',
    fontSize: 12
  },
  cardMoneyContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: hp(2)
  },
  cardSubTituloMoney: {
    marginTop: 1,
    fontSize: wp(3),
    color: "black"
  },
  cardSubTituloMoneyMonto: {
    fontWeight: "bold",
    marginTop: 1,
    fontSize: wp(3),
    color: "green"
  },
  backBubble: {
    alignItems: "center",
    justifyContent: "center",
    height: hp(5.5),
    width: hp(5.5),
    marginBottom: hp(5),
    marginTop: hp(2),
    marginLeft: wp(4),
    borderRadius: 50,
    backgroundColor: 'white'
  },
  backBubbleLoading: {
    position: "absolute",
    left: 0,
    top: 0,
  },
  shadow: {
    shadowColor: '#00000021',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 2,
    shadowRadius: 8,
    elevation: 55,
  }
});

export default withNavigation(MapaVarios);