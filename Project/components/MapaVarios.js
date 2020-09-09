import React, { Component } from 'react';
import { StyleSheet, Text, View, Animated, Image, ActivityIndicator, Dimensions } from "react-native";
import MapView from 'react-native-maps';
import { Marker, Callout } from 'react-native-maps';
import Carousel from 'react-native-snap-carousel';
import { withNavigation } from 'react-navigation';
import UserDataManager from './UserDataManager';


import { Components } from 'expo';

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
    markers:[],
    coordinates: [
      { name: 'Matematica', direccion: 'Jujuy 3000', institucion: 'instituto locas organizadas', distancia: '100km', tiempo: "8hs", latitude: -34.901978, longitude: -58.621620},
      { name: 'Piano', direccion: 'Cordoba 565', latitude: -34.911988, longitude: -58.621620},
      { name: 'Guitarra', direccion: 'Giribone 909', latitude: -34.905988, longitude: -58.621620},
      // { name: 'Centro', latitude: -34.896500, longitude: -58.621620},
      // { name: 'Izquierda', latitude: -34.896500, longitude: -58.631620},
      // { name: 'Izquierda2', latitude: -34.896500, longitude: -58.641620},
      // { name: 'IzquierdaArriba', latitude: -34.890500, longitude: -58.641620},
      // { name: 'Derecha', latitude: -34.896500, longitude: -58.611620},
      // { name: 'Derecha2', latitude: -34.896500, longitude: -58.601620},
      // { name: 'DerechaAbajo', latitude: -34.901500, longitude: -58.601620},
      // { name: 'Ping Pong', latitude: -34.891988, longitude: -58.621620},
      // { name: 'Magia', latitude: -34.881988, longitude: -58.621620},
      // { name: 'Fortine', latitude: -34.886988, longitude: -58.621620},
      // { name: 'Play Station', latitude: -34.881988, longitude: -58.611620},
      // { name: 'Futbol', latitude: -34.911988, longitude: -58.631620},
    ],
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

  componentDidMount = async () =>{
    this.setState({tipoMapa: this.props.navigation.getParam('tipo'), isLoading: false })
    //this.obtenerPos(this.okPos.bind(this))
  }
  obtenerPos(okPos) {
    //this.setState({ miLongitude: UserDataManager.getInstance().getLongitude(), miLatitude: UserDataManager.getInstance().getLatitude() })
    okPos()
  }
  okPos() {
    this.setState({ isLoading: false })
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

  render() {
    if(this.state.isLoading){
      return (
        <View style={styles.container}>
          <ActivityIndicator size="large" color="#F28C0F" backgroundColor=' #616161' style={{ flex: 1 }}></ActivityIndicator>
        </View>
      );
    }else{
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


        </MapView>
        <Carousel
          ref={(c) => { this._carousel = c; }}
          data={this.state.coordinates}
          containerCustomStyle={styles.carousel}
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
  <View style={styles.cardContainer}>
  <TouchableOpacity style={styles.cardContainer2} onPress={() => this.props.onPressGoCurso(item.id_curso, item.nombre, item.direccion)}>

  <View style={styles.cardImage}>
      <Text style={{ fontSize: hp(5), textAlign:"center", color: '#F28C0F', alignContent: 'center' }}>
                          {item.name.slice(0, 1).toUpperCase()}
      </Text>
      </View>

    <View style={{flexDirection: 'column', width: 0, flexGrow: 1}}>
    <Text style={styles.cardTitle}>{item.name}</Text>
    <Text style={styles.cardInstituto}>{item.institucion}</Text>
    <Text style={styles.cardDireccion}>{item.direccion}</Text>
    <TouchableOpacity style={styles.cardButton} onPress={() => this.props.onPressMap(item.id_profesor, item.nombre, item.direccion)}><Text style={styles.cardButtonText}>Calcular Recorrido</Text></TouchableOpacity>
    </View>
    </TouchableOpacity>
  </View>
    :
  <View style={styles.cardContainer}>
    <TouchableOpacity style={styles.cardContainer2} onPress={() => this.props.onPressGoProfesor(item.id_profesor, item.nombre, item.direccion)}>

      <View style={styles.cardImage}>
      <Text style={{ fontSize: hp(5), textAlign:"center", color: '#F28C0F', alignContent: 'center' }}>
                          {item.name.slice(0, 1).toUpperCase()}
      </Text>
      </View>

      <View style={{flexDirection: 'column', width: 0, flexGrow: 1}}>
      <Text style={styles.cardTitle}>{item.name}</Text>
      <Text style={styles.cardDireccion}>{item.direccion}</Text>
      <TouchableOpacity style={styles.cardButton} onPress={() => this.props.onPressMap(item.id_profesor, item.name, item.direccion)}><Text style={styles.cardButtonText}>Calcular Recorrido</Text></TouchableOpacity>
      </View>
      </TouchableOpacity>
    </View>
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#FFF7EE'
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
    //backgroundColor: 'rgba(0, 0, 0, 0.6)',
    backgroundColor: 'white',
    height: hp(20),
    width: wp(80),
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
  cardContainer2: {
    //backgroundColor: 'rgba(0, 0, 0, 0.6)',
    backgroundColor: 'white',
    height: hp(20),
    width: wp(80),
    padding: 24,
    borderRadius: 24,
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center',
  },
  cardImage: {
    height: hp(10),
    width: hp(10),
    backgroundColor: '#FFF7EE',
    marginRight: wp(5),
    borderRadius: 100,
    justifyContent: "center"
  },
  cardTitle: {
    color: '#F28C0F',
    fontSize:wp(5.5),
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
    alignSelf: 'center',
    marginBottom: hp(2.5)
  },
  cardButton: {
    backgroundColor: '#F28C0F',
    alignSelf: 'center',
    padding: hp(2),
    borderRadius: 10,
    marginBottom: hp(2)
  },
  cardButtonText: {
    textAlign: 'center',
    fontSize: wp(3),
    color: "white"
  },
  cardTiempo: {
    color: 'black',
    fontSize: 12
  }
});

export default withNavigation(MapaVarios);