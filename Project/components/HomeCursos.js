import React from 'react';
import { StyleSheet, Text, View, StatusBar, Image, ActivityIndicator, Animated, Dimensions, SafeAreaView, FlatList } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { withNavigation } from 'react-navigation';

import ExportadorLogos from './exportadores/ExportadorLogos'

let SCREEN_WIDTH = Dimensions.get('window').width
let SCREEN_HEIGHT = Dimensions.get('window').height

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { FontAwesome } from '@expo/vector-icons';

var images = [
  { id: 0, src: null, nombre: 'Co-Learning' },
  { id: 1, src: require('../assets/2.png'), nombre: 'Lorenzo', tipo: 'clase', rating: 2 },
  { id: 2, src: require('../assets/Logo.png'), nombre: 'Cruso Programacion', tipo: 'curso' },
  { id: 3, src: require('../assets/2.png') },
  { id: 4, src: require('../assets/2.png') },

]

class HomeClases extends React.Component {

  constructor() {
    super()
    this.state = {
      clases: [{ id: 0, src: require("../assets/Title.png"), nombre: 'Co-Learning', apellido: "", materias: [], tipoClases: [], rating: '' },
      {
        nombre: 'Caca',
        apellido: 'Arcolucci',
        src: require("../assets/leila.jpg"),
        esProfesor: false,
        domicilio: 'Spega Ñeri',
        rating: {rating: 5, votos: 1503},
        dondeClases: [{ id: 1, des_domicilio: "En su casa" },
        { id: 2, des_domicilio: "A Domicilio" },
        { id: 3, des_domicilio: "En un Instituto" }],
        tipoClases: [{ id: 1, des_tipoClases: "Particulares" },
        { id: 2, des_tipoClases: "Grupales" },
        { id: 3, des_tipoClases: "Virtuales" }],
        instagram: "@LisandroRp",
        whatsApp: "1144373492",
        materias: [{ nombre_materia: "Ingles", des_materia: "Doy clases de ingles nivel avanzado perri" },
        { nombre_materia: "Perreo", des_materia: "Enseño perrear hasta el piso" }]
      }, {
        nombre: 'Leila',
        apellido: 'Arcolucci',
        src: require("../assets/leila.jpg"),
        esProfesor: true,
        rating: {rating: 5, votos: 1503},
        domicilio: 'Spega Ñeri',
        dondeClases: [{ id: 1, des_domicilio: "En su casa" },
        { id: 2, des_domicilio: "A Domicilio" },
        { id: 3, des_domicilio: "En un Instituto" }],
        tipoClases: [{ id: 1, des_tipoClases: "Particulares" },
        { id: 2, des_tipoClases: "Grupales" },
        { id: 3, des_tipoClases: "Virtuales" }],
        instagram: "@LisandroRp",
        whatsApp: "1144373492",
        materias: [{ nombre_materia: "Ingles", des_materia: "Doy clases de ingles nivel avanzado perri" },
        { nombre_materia: "Perreo", des_materia: "Enseño perrear hasta el piso" }]
      }, {
        nombre: 'Leila',
        apellido: 'Arcolucci',
        src: require("../assets/leila.jpg"),
        esProfesor: true,
        rating: {rating: 5, votos: 1503},
        domicilio: 'Spega Ñeri',
        dondeClases: [{ id: 1, des_domicilio: "En su casa" },
        { id: 2, des_domicilio: "A Domicilio" },
        { id: 3, des_domicilio: "En un Instituto" }],
        tipoClases: [{ id: 1, des_tipoClases: "Particulares" },
        { id: 2, des_tipoClases: "Grupales" },
        { id: 3, des_tipoClases: "Virtuales" }],
        instagram: "@LisandroRp",
        whatsApp: "1144373492",
        materias: [{ nombre_materia: "Ingles", des_materia: "Doy clases de ingles nivel avanzado perri" },
        { nombre_materia: "Perreo", des_materia: "Enseño perrear hasta el piso" }]
      }],
      activeImage: { id: 0, src: require("../assets/Title.png"), nombre: 'Co-Learning', apellido: "", materias: [], tipoClases: [], rating: ''},
      y: 0,
      max_rating: 5,
      isLoading: true
    }
    this.Star = ExportadorLogos.traerEstrellaLlena();
    this.Star_With_Border = ExportadorLogos.traerEstrellaBorde();
  }
  componentDidMount = async () => {
    this.setState({ isLoading: false })
  }

  componentWillMount() {
    this.allImages = {}
    this.oldPosition = {}
    this.position = new Animated.ValueXY()
    this.dimensions = new Animated.ValueXY()
    this.animation = new Animated.Value(0)
    this.activeImageStyle = null
    this.inicio()
  }

  onCarouselItemChange = (index) => {
    if (this.state.activeImage == null) {
      this.openImage(index)
    } else {
      this.closeImage(index)
    }
  }
  onTouchImage = (index) => {
    if (this.state.activeImage == null) {
      this.openImage(index)
    } else {
      Animated.parallel([
        Animated.timing(this.position.x, {
          toValue: this.oldPosition.x,
          duration: 300
        }),
        Animated.timing(this.position.y, {
          toValue: this.oldPosition.y,
          duration: 250
        }),
        Animated.timing(this.dimensions.x, {
          toValue: this.oldPosition.width,
          duration: 250
        }),
        Animated.timing(this.dimensions.y, {
          toValue: this.oldPosition.height,
          duration: 250
        }),
        Animated.timing(this.animation, {
          toValue: 0,
          duration: 250
        })
      ]).start(() => {
        this.setState({
          activeImage: null
        })
      })
    }
  }
  inicio = () => {

    Animated.parallel([
      Animated.timing(this.position.x, {
        toValue: 0,
        duration: 300
      }),
      Animated.timing(this.position.y, {
        toValue: 0,
        duration: 300
      }),
      Animated.timing(this.dimensions.x, {
        toValue: wp(90),
        duration: 300
      }),
      Animated.timing(this.dimensions.y, {
        toValue: hp(40),
        duration: 300
      }),
      Animated.timing(this.animation, {
        toValue: 1,
        duration: 300
      })
    ]).start()

  }

  openImage = (index) => {

    this.allImages[index].measure((x, y, width, height, pageX, pageY) => {
      this.oldPosition.x = x
      this.oldPosition.y = y
      this.oldPosition.width = width
      this.oldPosition.height = height
      this.setState({ y: y })

      this.position.setValue({
        x: pageX,
        y: pageY
      })

      this.dimensions.setValue({
        x: width,
        y: height
      })

      this.setState({
        activeImage: this.state.clases[index]
      }, () => {
        this.viewImage.measure((dx, dy, dWidth, dHeight, dPageX, dPageY) => {

          Animated.parallel([
            Animated.timing(this.position.x, {
              toValue: dx,
              duration: 300
            }),
            Animated.timing(this.position.y, {
              toValue: dy,
              duration: 300
            }),
            Animated.timing(this.dimensions.x, {
              toValue: wp(90),
              duration: 300
            }),
            Animated.timing(this.dimensions.y, {
              toValue: hp(40),
              duration: 300
            }),
            Animated.timing(this.animation, {
              toValue: 1,
              duration: 300
            })
          ]).start()
        })
      })
    })
  }
  closeImage = (index) => {
    Animated.parallel([
      Animated.timing(this.position.x, {
        toValue: this.oldPosition.x,
        duration: 300
      }),
      Animated.timing(this.position.y, {
        toValue: this.oldPosition.y,
        duration: 250
      }),
      Animated.timing(this.dimensions.x, {
        toValue: this.oldPosition.width,
        duration: 250
      }),
      Animated.timing(this.dimensions.y, {
        toValue: this.oldPosition.height,
        duration: 250
      }),
      Animated.timing(this.animation, {
        toValue: 0,
        duration: 250
      })
    ]).start(() => {
      this.setState({
        activeImage: null
      }), this.openImage(index)
    })
  }
  inactiveImageWidth() {
    if (this.state.activeImage != null && this.state.activeImage.id == 0) {
      return 0
    }
    else {
      return wp(44)
    }
  }
  inactiveBorderImageWidth() {
    if (this.state.activeImage != null && this.state.activeImage.id == 0) {
      return 0
    }
    else {
      return 0
    }
  }
  inactiveImageVotos() {
    if (this.state.activeImage != null && this.state.activeImage.id == 0) {
      return ''
    }
    else {
      return 'Votos: '
    }
  }
  inactiveImageButton() {
    if (this.state.activeImage != null && this.state.activeImage.id == 0) {
      return 'transparent'
    }
    else {
      return '#F28C0F'
    }
  }
  inactiveImageButtonText() {
    if (this.state.activeImage != null && this.state.activeImage.id == 0) {
      return ''
    }
    else {
      return 'Perfil'
    }
  }
  inactiveTitles(id_title){
    if (this.state.activeImage != null && this.state.activeImage.id == 0) {
      return ''
    }
    else{
      if(id_title == 1){
        return "Clases: "
      }
      else{
        return "Tipo de Clases:"
      }
    }
  }
  render() {

    const activeImageStyle = {
      width: this.dimensions.x,
      height: this.dimensions.y,
      left: this.position.x,
      top: this.state.y
    }
    const animatedContentY = this.animation.interpolate({
      inputRange: [-500, 1],
      outputRange: [-150, 0]
    })

    const animatedContentOpacity = this.animation.interpolate({
      inputRange: [0, 0.5, 50],
      outputRange: [0, 1, 1]
    })

    const animatedContentStyle = {
      opacity: animatedContentOpacity,
      transform: [{
        translateY: animatedContentY
      }],
    }

    const animatedCrossOpacity = {
      opacity: this.animation
    }
    let React_Native_Rating_Bar = [];
    for (var i = 1; i <= this.state.max_rating && (this.state.activeImage ? this.state.activeImage.id : 2) != 0; i++) {
      React_Native_Rating_Bar.push(
        <View
          key={i}
        >
          {this.state.activeImage ? (i <= this.state.activeImage.rating
                     ? <Image style={styles.startImage} source={ExportadorLogos.traerEstrellaLlena()}></Image>
                     : <Image style={styles.starImage} source={ExportadorLogos.traerEstrellaBorde()}></Image>)
                     : <View/>
                    }
        </View>
      );
    }
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
        <SafeAreaView style={styles.container}>
          <Carousel
            ref={(c) => { this._carousel = c; }}
            data={this.state.clases}
            containerCustomStyle={styles.carousel}
            contentContainerCustomStyle={{ alignItems: 'center' }}
            renderItem={this.renderCarouselItem}
            sliderWidth={Dimensions.get('window').width}
            itemWidth={wp(50)}
            removeClippedSubviews={false}
            initialScrollIndex={0}
            onSnapToItem={(index) => this.onCarouselItemChange(index)}
          />
          <View style={{ position: 'absolute', marginTop: hp(60), left: 0, right: 0, justifyContent: 'center', alignItems: 'center' }}>
            <Text >Hola</Text>
          </View>
          <Animated.View
            pointerEvents={this.state.activeImage ? "auto" : "none"}
            style={[styles.cardContainer, animatedContentStyle]}
          >
            <View style={[{ flexDirection: 'column', alignItems: 'center', backgroundColor: 'white' }]} ref={(view) => (this.viewImage = view)}>
              <Animated.Image
                source={this.state.activeImage ? this.state.activeImage.src : null}
                style={[styles.image, { borderWidth: this.inactiveBorderImageWidth(), width: this.inactiveImageWidth() }]}
              >
              </Animated.Image>
              <View style={styles.heartView}>{React_Native_Rating_Bar}</View>
              <Text>{this.inactiveImageVotos()}{this.state.activeImage ? this.state.activeImage.rating.votos : ''}</Text>
            </View>
            <Animated.View style={[{ backgroundColor: 'white', flex: 1, padding: 20, flexDirection: 'column'}]}>
              <Text style={{ fontSize: 20, color: '#F28C0F', fontWeight: 'bold', textAlign: 'center', paddingBottom: 10 }}>{this.state.activeImage ? this.state.activeImage.nombre + " " + this.state.activeImage.apellido : ''}</Text>
              {this.state.activeImage ? ( this.state.activeImage.id == 0 ? <Text style={{textAlign: 'justify'}}>Eiusmod consectetur cupidatat dolor Lorem excepteur excepteur. Nostrud sint officia consectetur eu pariatur laboris est velit. Laborum non cupidatat qui ut sit dolore proident. Eiusmod consectetur cupidatat dolor Lorem excepteur excepteur. Nostrud sint officia consectetur eu pariatur laboris est velit. Laborum non cupidatat qui ut sit dolore proident.Eiusmod consectetur cupidatat dolor Lorem excepteur excepteur. Nostrud sint officia consectetur eu pariatur laboris est velit. Laborum non cupidatat qui ut sit dolore proident.</Text> : <Text></Text>): <Text></Text>}
              {/* <View style={[styles.infoContainer, { backgroundColor: this.inactiveImageButton() }]}> */}
              
              <Text style={styles.infoTitle}>{this.inactiveTitles(1)}</Text>
              
              {this.state.activeImage ? this.state.activeImage.materias.map((item, index) => (
              <View>
              <Text>• {item.nombre_materia}</Text>
              </View>
              )) : <Text ></Text>
            }
            {/* </View> */}

            {/* <View style={[styles.infoContainer, { backgroundColor: this.inactiveImageButton() }]}> */}
            <Text style={styles.infoTitle}>{this.inactiveTitles(2)}</Text>
            
            {this.state.activeImage ? this.state.activeImage.tipoClases.map((item, index) => (
              <View>
              <Text >• {item.des_tipoClases}</Text>
              </View>
              )) : <Text></Text>
            }
            {/* </View> */}
              <TouchableOpacity style={[styles.button, { backgroundColor: this.inactiveImageButton() }]} onPress={() => this.props.onPressGo(this.state.activeImage.id, this.state.activeImage.nombre, this.state.activeImage.esProfesor)} >
                <Text style={{color: 'white'}}>{this.inactiveImageButtonText()}</Text>
              </TouchableOpacity>
            </Animated.View>
          </Animated.View>
          <View
            pointerEvents={this.state.activeImage ? "auto" : "none"}
          >
          </View>
        </SafeAreaView>
      );
    }
  }
  renderCarouselItem = ({ item, index }) =>
    <TouchableOpacity
      onPress={() => this.onTouchImage(index)}
      key={item.id}>
      <Animated.View
        style={{padding:10, shadowColor: '#00000015',
        shadowOffset: {
          width: 0,
          height: 0,
        },
        shadowOpacity: 2,
        shadowRadius: 8}}
      >
        <Image
          ref={(item) => (this.allImages[index] = item)}
          source={item.src}
          style={{ height: hp(25), width: hp(25), borderRadius: 100, resizeMode: ((item.id == 0) ? 'contain' : '')}}
        />
      </Animated.View>
    </TouchableOpacity>
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF7EE',
    alignItems: 'center',
    justifyContent: 'center',
  },
  carousel: {
    //backgroundColor: 'white',
    marginTop: 10,
  },
  //Heart
  heartView: {
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: hp(1.5),
    marginBottom: hp(1)
  },
  starImage: {
    height: hp(4),
    width: hp(4),
    marginHorizontal: 1
  },
  //Details Cards
  cardContainer: {
   backgroundColor: 'white',shadowColor: '#00000025',
    shadowOffset: {
      width: 3,
      height: 5,
    },
    shadowOpacity: 2,
    shadowRadius: 8,
    elevation: 55,
    flexDirection: 'row',
    height: hp(50),
    marginHorizontal: 10,
    marginBottom: 10,
    padding: 10,
    borderRadius: 10
  },
  image: {
    height: hp(37),
    borderRadius: 10,
  },
  infoContainer: {
    padding: 10,
    marginBottom: hp(2.5),
    borderRadius: 10
  },
  infoTitle: {
    fontSize: wp(3.3),
    fontWeight: 'bold',
    marginBottom: 3,
    marginTop: 15,
  },
  //Boton
  button: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginTop: 70
  }
});
export default withNavigation(HomeClases);