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
import ApiController from '../controller/ApiController';

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
      clases: [{ id: 0, src: ExportadorLogos.traerClNaranja(), nombre: 'Co-Learning', apellido: "", materias: [], tipoClases: [], rating: '' },
      {
        nombre: 'Juan',
        apellido: 'Marinelli',
        src: require("../assets/leila.jpg"),
        esProfesor: true,
        domicilio: 'Ezeiza, Canning',
        rating: {rating: 5, votos: 1503},
        dondeClases: [{ id: 1, des_domicilio: "En su casa" },
        { id: 2, des_domicilio: "A Domicilio" },
        { id: 3, des_domicilio: "En un Instituto" }],
        tipoClases: [{ id: 1, des_tipoClases: "Particulares" },
        { id: 2, des_tipoClases: "Grupales" },
        { id: 3, des_tipoClases: "Virtuales" }],
        instagram: "@LisandroRp",
        whatsApp: "1144373492",
        materias: [{ nombre_materia: "Ingles", des_materia: "Examenes Internacionales" },
        { nombre_materia: "Matematica", des_materia: "Clases avanzadas de amtematica" }]
      },
      {
        nombre: 'Leila',
        apellido: 'Pereyra',
        src: require("../assets/caca.jpg"),
        esProfesor: false,
        domicilio: 'Nordelta',
        rating: {rating: 2, votos: 103},
        dondeClases: [{ id: 1, des_domicilio: "En su casa" },
        { id: 2, des_domicilio: "A Domicilio" },
        { id: 3, des_domicilio: "En un Instituto" }],
        tipoClases: [{ id: 1, des_tipoClases: "Particulares" },
        { id: 2, des_tipoClases: "Grupales" },
        { id: 3, des_tipoClases: "Virtuales" }],
        instagram: "@LisandroRp",
        whatsApp: "1144373492",
        materias: [{ nombre_materia: "Chino", des_materia: "Examenes Internacionales" },
        { nombre_materia: "Latin", des_materia: "Clases avanzadas de amtematica" }]
      }],
      activeImage: { id: 0, src: ExportadorLogos.traerClNaranja(), nombre: 'Co-Learning', apellido: "", materias: [], tipoClases: [], rating: ''},
      y: 0,
      max_rating: 5,
      isLoading: true
    }
    this.Star = ExportadorLogos.traerEstrellaLlena();
    this.Star_With_Border = ExportadorLogos.traerEstrellaBorde();
  }
  componentDidMount = async () => {
    //ApiController.getProfesores(this.okProfesores.bind(this))
    this.setState({isLoading: false})
  }
  okUsuarios(profesoresBase){
    console.log(profesoresBase)
    var profesores = [{ id: 0, src: ExportadorLogos.traerClNaranja(), nombre: 'Co-Learning', apellido: "", materias: [], tipoClases: [], rating: '' }]
    profesores.concat(profesoresBase)
    this.setState({clases: profesores, isLoading: false})
  }
  UNSAFE_componentWillMount() {
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
          useNativeDriver: false,
          duration: 300
        }),
        Animated.timing(this.position.y, {
          toValue: this.oldPosition.y,
          useNativeDriver: false,
          duration: 250
        }),
        Animated.timing(this.dimensions.x, {
          toValue: this.oldPosition.width,
          useNativeDriver: false,
          duration: 250
        }),
        Animated.timing(this.dimensions.y, {
          toValue: this.oldPosition.height,
          useNativeDriver: false,
          duration: 250
        }),
        Animated.timing(this.animation, {
          toValue: 0,
          useNativeDriver: false,
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
        duration: 300,
        useNativeDriver: false
      }),
      Animated.timing(this.position.y, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false
      }),
      Animated.timing(this.dimensions.x, {
        toValue: wp(90),
        duration: 300,
        useNativeDriver: false
      }),
      Animated.timing(this.dimensions.y, {
        toValue: hp(40),
        duration: 300,
        useNativeDriver: false
      }),
      Animated.timing(this.animation, {
        toValue: 1,
        duration: 300,
        useNativeDriver: false
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
              duration: 300,
              useNativeDriver: false
            }),
            Animated.timing(this.position.y, {
              toValue: dy,
              duration: 300,
              useNativeDriver: false
            }),
            Animated.timing(this.dimensions.x, {
              toValue: wp(90),
              duration: 300,
              useNativeDriver: false
            }),
            Animated.timing(this.dimensions.y, {
              toValue: hp(40),
              duration: 300,
              useNativeDriver: false
            }),
            Animated.timing(this.animation, {
              toValue: 1,
              duration: 300,
              useNativeDriver: false
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
        useNativeDriver: false,
        duration: 300
      }),
      Animated.timing(this.position.y, {
        toValue: this.oldPosition.y,
        useNativeDriver: false,
        duration: 250
      }),
      Animated.timing(this.dimensions.x, {
        toValue: this.oldPosition.width,
        useNativeDriver: false,
        duration: 250
      }),
      Animated.timing(this.dimensions.y, {
        toValue: this.oldPosition.height,
        useNativeDriver: false,
        duration: 250
      }),
      Animated.timing(this.animation, {
        toValue: 0,
        duration: 250,
        useNativeDriver: false
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
          {this.state.activeImage ? (i <= this.state.activeImage.rating.rating
                     ? <Image style={styles.starImage} source={ExportadorLogos.traerEstrellaLlena()}></Image>
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
          <ActivityIndicator size="large" color="#F28C0F" backgroundColor=' #616161' style={{ flex: 1 }}></ActivityIndicator>
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
            autoplay= {false}
            delay = {1000}
            loop = {true}
            removeClippedSubviews={false}
            initialScrollIndex={0}
            onSnapToItem={(index) => this.onCarouselItemChange(index)}
          />
         <View style={{ position: 'absolute', bottom: hp(5), left: 0, right: 0, justifyContent: 'center', alignItems: 'center' }}>
            <Image source={ExportadorLogos.traerLogoNaranja()} style={styles.fondoImage}></Image>
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
            {this.state.activeImage ? (this.state.activeImage.id != 0 ? <Text style={styles.tituloProfesor}>{this.state.activeImage.nombre + " " + this.state.activeImage.apellido}</Text> : <Image source={ExportadorLogos.traerLogoNaranja()} style={styles.imageTitulo}/>) : <View></View>}
            {this.state.activeImage ? (this.state.activeImage.id != 0 ? <Text style={styles.domicilioProfesor}>{this.state.activeImage.domicilio}  </Text> : <View></View>) : <View></View>}
              {this.state.activeImage ? ( this.state.activeImage.id == 0 ? <Text style={{textAlign: 'justify', fontSize: wp(4.4)}}>CoLearning te recomienda una gran variedad de profesores a partir de las distintas clases que notamos de tu interés. {'\n'}{'\n'} Además te da la posibilidad de visualizar cuales son los profesores más populares de la aplicación y los cercanos a tu zona actual.</Text> : <Text></Text>): <Text></Text>}
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
              <TouchableOpacity style={[styles.button, { backgroundColor: this.inactiveImageButton() }]} onPress={() => this.props.onPressGo(this.state.activeImage.id, this.state.activeImage.nombre + " " + this.state.activeImage.apellido, this.state.activeImage.domicilio, this.state.activeImage.esProfesor)} >
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
          style={[styles.carouselImage,{ resizeMode: ((item.id == 0) ? 'contain' : 'contain')}]}
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
  imageTitulo:{
    alignSelf: 'center',
    height: hp(5),
    resizeMode: 'contain',
    marginBottom: hp(2)
  },
  fondoImage:{
    width: wp(80),
    resizeMode: 'contain'
  },
  carousel: {
    //backgroundColor: 'white',
    marginTop: 10,
  },
  carouselImage: {
    height: hp(25),
    width: hp(25),
    borderRadius: 100
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
  tituloProfesor: { 
    fontSize: 20,
    color: '#F28C0F',
    fontWeight: 'bold',
    textAlign: 'center',
    paddingBottom: 10 
  },
  domicilioProfesor: { 
    fontSize: wp(3.3),
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
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