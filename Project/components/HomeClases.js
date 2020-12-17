import React from 'react';
import { StyleSheet, Text, View, StatusBar, Image, ActivityIndicator, Animated, Dimensions, SafeAreaView, ScrollView, RefreshControl } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { withNavigation } from 'react-navigation';

import ExportadorLogos from './exportadores/ExportadorLogos'
import ExportadorObjetos from './exportadores/ExportadorObjetos'

let SCREEN_WIDTH = Dimensions.get('window').width
let SCREEN_HEIGHT = Dimensions.get('window').height

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { TouchableOpacity } from 'react-native-gesture-handler';
import * as Font from 'expo-font';
import { FontAwesome } from '@expo/vector-icons';
import ApiController from '../controller/ApiController';

class HomeClases extends React.Component {

  constructor() {
    super()
    this.state = {
      clases: [],
      activeImage: { id_usuario: 0, src: ExportadorLogos.traerClNaranja(), nombre_usuario: 'Co-Learning', apellido: "", materias: [], tipoClases: [], rating: '' },
      y: 0,
      max_rating: 5,
      isLoading: true,
      isLoadingFont: true
    }
    this.Star = ExportadorLogos.traerEstrellaLlena();
    this.Star_With_Border = ExportadorLogos.traerEstrellaBorde();
  }
  componentDidMount() {
    ApiController.getProfesoresHome(this.okProfesores.bind(this))
    this.loadFont()
    this.setState({ activeImage: this.state.clases[0] })
    //this.setState({ isLoading: false })
  }
  loadFont = async () => {
    await Font.loadAsync({
      'shakies': require('../assets/fonts/Shakies-TT.ttf'),
      'mainFont': require('../assets/fonts/LettersForLearners.ttf')
    });

    this.setState({ isLoadingFont: false })
  }
  okProfesores = async (profesoresBase) => {
    var lenght = 0

    profesoresBase.map((item, index) => lenght++)
    var contadorExterno = 0
    var contadorInterno = 0
    var contadorDondeClases = 0
    var flag = 0
    var arrayProfesores = [{ id_usuario: 0, src: ExportadorLogos.traerClNaranja(), nombre_usuario: 'Co-Learning', apellido: "", materias: [], tipoClases: [], rating: '' }]
    var arrayMaterias = []
    var arrayDondeClases = []
    var profesorActual
    var materiaActual
    while (contadorExterno < lenght) {
      contadorInterno = contadorExterno
      profesorActual = ExportadorObjetos.createProfesorHome(profesoresBase[contadorExterno])
      while (contadorInterno < lenght && profesoresBase[contadorInterno].id_usuario == profesorActual.id_usuario) {
        materiaActual = ExportadorObjetos.createMaterias(profesoresBase[contadorInterno].id_materia, profesoresBase[contadorInterno].nombre_materia)
        if (flag == 0) {
          while (contadorInterno < lenght && profesoresBase[contadorInterno].id_usuario == profesorActual.id_usuario && profesoresBase[contadorInterno].id_materia == materiaActual.id_meteria) {
            arrayDondeClases.push(ExportadorObjetos.createDondeClases(profesoresBase[contadorInterno].id_dondeClases, profesoresBase[contadorInterno].des_dondeClases))
            contadorInterno++
            contadorDondeClases++
          }
          flag = 1
          if (materiaActual.id_meteria != null) {
            arrayMaterias.push(materiaActual)
          }
        }
        else {
          if (materiaActual.id_meteria != null && arrayMaterias[arrayMaterias.length - 1].id_meteria != materiaActual.id_meteria) {
            arrayMaterias.push(materiaActual)
          }
          contadorInterno++
        }
      }
      profesorActual.materias = arrayMaterias
      profesorActual.dondeClases = arrayDondeClases
      arrayProfesores.push(profesorActual)
      flag = 0
      contadorDondeClases
      contadorExterno = contadorInterno
      arrayMaterias = []
      arrayDondeClases = []
    }
    this.setState({ clases: arrayProfesores, activeImage: arrayProfesores[0], isLoading: false })
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
    if (this.state.activeImage != null && this.state.activeImage.id_usuario == 0) {
      return 0
    }
    else {
      return wp(44)
    }
  }
  inactiveBorderImageWidth() {
    if (this.state.activeImage != null && this.state.activeImage.id_usuario == 0) {
      return 0
    }
    else {
      return 0
    }
  }
  inactiveImageVotos() {
    if (this.state.activeImage != null && this.state.activeImage.id_usuario == 0) {
      return ''
    }
    else {
      return 'Votos: '
    }
  }
  inactiveImageButton() {
    if (this.state.activeImage != null && this.state.activeImage.id_usuario == 0) {
      return 'transparent'
    }
    else {
      return '#F28C0F'
    }
  }
  inactiveImageButtonText() {
    if (this.state.activeImage != null && this.state.activeImage.id_usuario == 0) {
      return ''
    }
    else {
      return 'Perfil'
    }
  }
  inactiveTitles(id_title) {
    if (this.state.activeImage != null && this.state.activeImage.id_usuario == 0) {
      return ''
    }
    else {
      if (id_title == 1) {
        return "Clases: "
      }
      else {
        return "Donde da Clases:"
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
    var aux = -1
    for (var i = 1; i <= this.state.max_rating && (this.state.activeImage ? this.state.activeImage.id_usuario : 2) != 0; i++) {
      aux++
      React_Native_Rating_Bar.push(
        <View
          key={i}
        >
          {this.state.activeImage ? (i <= this.state.activeImage.rating.rating
            ? <Image style={styles.starImage} source={ExportadorLogos.traerEstrellaLlena()}></Image>
            : this.state.activeImage.rating.rating > (aux)
              ? (this.state.activeImage.rating.rating % parseInt(this.state.activeImage.rating.rating)) >= 0.75
                ? (<Image style={styles.starImage} source={ExportadorLogos.traerEstrellaMucho()} />)
                : (this.state.activeImage.rating.rating % parseInt(this.state.activeImage.rating.rating)) <= 0.25
                  ? (<Image style={styles.starImage} source={ExportadorLogos.traerEstrellaPoco()} />)
                  : (<Image style={styles.starImage} source={ExportadorLogos.traerEstrellaHalf()} />)
              : (<Image style={styles.starImage} source={ExportadorLogos.traerEstrellaBorde()} />)
          )
            :
            <View />
          }
        </View>
      );
    }
    if (this.state.isLoading || this.state.isLoadingFont) {
      return (
        <View style={styles.container}>
          <StatusBar barStyle="black" backgroundColor="white" />
          <ActivityIndicator size="large" color="#F28C0F" backgroundColor=' #616161' style={{ flex: 1 }}></ActivityIndicator>
        </View>
      );
    }
    else {
      return (
        <ScrollView
        style={styles.containerScrollView}
        refreshControl={
                        <RefreshControl refreshing={this.state.isRefreshing} onRefresh={() => {this.setState({isLoading: true}), ApiController.getProfesoresHome(this.okProfesores.bind(this))}} />
                    }>
        <SafeAreaView style={styles.container}>
          <Carousel
            ref={(c) => { this._carousel = c; }}
            data={this.state.clases}
            containerCustomStyle={styles.carousel}
            contentContainerCustomStyle={{ alignItems: 'center' }}
            renderItem={this.renderCarouselItem}
            sliderWidth={Dimensions.get('window').width}
            itemWidth={wp(55)}
            autoplay={false}
            delay={1000}
            loop={true}
            removeClippedSubviews={false}
            initialScrollIndex={0}
            onSnapToItem={(index) => this.onCarouselItemChange(index)}
          />
          <View style={{ position: 'absolute', top: hp(33), left: 0, right: 0, justifyContent: 'center', alignItems: 'center' }}>
            <Image source={ExportadorLogos.traerLogoNaranja()} style={styles.fondoImage}></Image>
          </View>

          <Animated.View
            pointerEvents={this.state.activeImage ? "auto" : "none"}
            style={[styles.cardContainer, styles.shadow, animatedContentStyle]}
          >
            {this.state.activeImage ? (this.state.activeImage.id_usuario != 0 ? (
              <View style={[styles.card]}>
                <View style={[{ flexDirection: 'column', alignItems: 'center', padding: 10, backgroundColor: 'white' }]} ref={(view) => (this.viewImage = view)}>
                  <View style={styles.shadowImage}>
                    {this.state.activeImage.src == null ?
                      <Animated.View
                        style={[styles.image, { borderWidth: this.inactiveBorderImageWidth(), width: this.inactiveImageWidth(), backgroundColor: (this.state.activeImage.src == null ? "#F28C0F" : "transparent") }]}
                      >
                        <Text style={{ fontSize: wp(20), textAlign: "center", color: 'white', alignContent: 'center' }}>
                          {this.state.activeImage.nombre_usuario.slice(0, 1).toUpperCase()}{this.state.activeImage.apellido.slice(0, 1).toUpperCase()}
                        </Text>
                      </Animated.View>
                      :
                      <Animated.Image
                        source={this.state.activeImage.src}
                        style={[styles.image, { borderWidth: this.inactiveBorderImageWidth(), width: this.inactiveImageWidth() }]}
                      />
                    }
                  </View>
                  <View style={styles.heartView}>{React_Native_Rating_Bar}</View>
                  <Text style={{ fontSize: wp(3), marginTop: 5 }}>{this.inactiveImageVotos()}{this.state.activeImage ? this.state.activeImage.rating.votos : ''}</Text>
                </View>
                <Animated.View style={[{ backgroundColor: 'white', flex: 1, padding: 10, flexDirection: 'column' }]}>

                  <View style={[{ flex: 1.5 }]}>
                    <Text style={styles.tituloProfesor} numberOfLines={2}>{this.state.activeImage.nombre_usuario + " " + this.state.activeImage.apellido}</Text>
                    <Text style={styles.domicilioProfesor} numberOfLines={2}>{this.state.activeImage.des_domicilio}</Text>
                    <View style={[styles.infoContainer]}>

                      <Text style={styles.infoTitle}>{this.inactiveTitles(1)}</Text>

                      {this.state.activeImage.materias.map((item, index) => (index < 3 ? (
                        <View>
                          <Text style={styles.infoDes} numberOfLines={1}>• {item.nombre_materia}</Text>
                        </View>
                      ) : <View></View>))
                      }
                    </View>

                    <View style={[styles.infoContainer]}>
                      <Text style={styles.infoTitle}>{this.inactiveTitles(2)}</Text>

                      {
                        this.state.activeImage.dondeClases.map((item, index) => (index < 3 ? (
                          <View>
                            <Text style={styles.infoDes} numberOfLines={1}>• {item.des_dondeClases}</Text>
                          </View>
                        ) : <View />))
                      }
                    </View>
                  </View>
                  <View style={styles.buttonContainer}>
                    {this.state.activeImage.money.des_moneda && this.state.activeImage.money.monto ?
                      <View style={{ flexDirection: "row", justifyContent: "center" }}>
                        <View style={[styles.moneyView, styles.shadowMoney]}>
                          <Text style={styles.moneyText}>{this.state.activeImage.money.des_moneda}</Text>
                          <Text style={styles.moneyText}>{this.state.activeImage.money.monto}</Text>
                          <Text style={styles.moneyText2}>/h</Text>
                        </View>
                      </View>
                      :
                      <View />
                    }
                    <TouchableOpacity style={[styles.button, { backgroundColor: this.inactiveImageButton() }]} onPress={() => this.props.onPressGo(this.state.activeImage.id_usuario, this.state.activeImage.nombre_usuario + " " + this.state.activeImage.apellido, this.state.activeImage.des_domicilio, this.state.activeImage.esProfesor)} >
                      <Text style={{ color: 'white' }}>{this.inactiveImageButtonText()}</Text>
                    </TouchableOpacity>
                  </View>
                </Animated.View>
              </View>
            )
              :
              <View style={[{ padding: 10, flexShrink: 1 }]} ref={(view) => (this.viewImage = view)}>

                <Image source={ExportadorLogos.traerLogoNaranja()} style={styles.imageTitulo} />
                <Text style={{ textAlign: 'left', fontWeight: "bold", fontFamily: "mainFont", fontSize: wp(5.8), flexShrink: 1 }}> Aquí podrás encontrar los mejores profesores, los más populares, la forma en que dictan sus clases, su valoración y la cercanía con tu zona. {'\n'}{'\n'} CoLearning te recomienda gran cantidad y variedad de opciones, según tu interés, a partir de tus búsquedas.</Text>

              </View>
            )
              : <View></View>}
          </Animated.View>

          <View
            pointerEvents={this.state.activeImage ? "auto" : "none"}
          >
          </View>
        </SafeAreaView>
        </ScrollView>
      );
    }
  }
  renderCarouselItem = ({ item, index }) =>
    <View
      key={item.id_usuario}>
      <Animated.View
        style={[styles.shadow, {
          alignSelf: "center"
        }]}
      >
        {item.src == null ?
          <View style={[styles.carouselImage, { backgroundColor: (item.src == null ? "#F28C0F" : "transparent") }]} ref={(item) => (this.allImages[index] = item)}>
            <Text style={{ fontSize: wp(20), textAlign: "center", color: 'white', alignContent: 'center' }}>
              {item.nombre_usuario.slice(0, 1).toUpperCase()}{item.apellido.slice(0, 1).toUpperCase()}
            </Text>
          </View>
          :
          <Image
            ref={(item) => (this.allImages[index] = item)}
            source={item.src}
            style={[styles.carouselImage, { resizeMode: ((item.id_usuario == 0) ? 'contain' : 'contain') }]}
          />
        }
      </Animated.View>
    </View>
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: hp(80),
    backgroundColor: '#FFF7EE',
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerScrollView: {
    flex: 1,
    backgroundColor: '#FFF7EE',
  },
  shadow: {
    shadowColor: '#00000025',
    shadowOffset: {
      width: 3,
      height: 5,
    },
    shadowOpacity: 2,
    shadowRadius: 8,
    elevation: 55
  },
  shadowImage: {
    shadowColor: '#00000555',
    shadowOffset: {
      width: 0,
      height: -1,
    },
    shadowOpacity: 2,
    shadowRadius: 5,
    elevation: 10
  },
  imageTitulo: {
    height: hp(5),
    width: wp(50),
    margin: 15,
    resizeMode: 'contain',
    alignSelf: 'center'
  },
  fondoImage: {
    width: wp(80),
    resizeMode: 'contain'
  },
  carousel: {
    flex: 0.6
  },
  carouselImage: {
    height: wp(50),
    width: wp(50),
    justifyContent: "center",
    borderRadius: wp(50) / 2
  },
  //Heart
  heartView: {
    justifyContent: 'center',
    flexDirection: 'row'
  },
  starImage: {
    height: hp(3.3),
    width: hp(3.3),
    marginHorizontal: 1
  },
  //Details Cards
  cardContainer: {
    backgroundColor: 'white',
    flex: 1.4,
    flexDirection: 'row',
    marginHorizontal: 10,
    marginBottom: 20,
    padding: 10,
    borderRadius: 10
  },
  card: {
    flexDirection: 'row',
    flex: 1,
    flexWrap: "wrap"
  },
  tituloProfesor: {
    fontSize: wp(5),
    flexWrap: "wrap",
    color: '#F28C0F',
    fontWeight: 'bold',
    textAlign: 'center',
    paddingBottom: 2
  },
  domicilioProfesor: {
    fontSize: wp(3.3),
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
    paddingBottom: hp(1)
  },
  image: {
    height: hp(33),
    justifyContent: "center",
    marginBottom: 22,
    borderRadius: 10
  },
  //INFO
  infoContainer: {
    flexShrink: 1,
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 10,
    paddingBottom: hp(1)
  },
  infoTitle: {
    flexWrap: "wrap",
    fontSize: wp(3.3),
    fontWeight: 'bold'
  },
  infoDes: {
    flexWrap: "wrap",
    fontSize: wp(3.3),
    marginTop: hp(0.2)
  },
  //Boton
  buttonContainer: {
    flex: 0.5,
    justifyContent: "flex-end"
    //marginRight: 10,
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    paddingVertical: hp(1.5),
    marginTop: 10
  },
  //MONEY
  moneyView: {
    flexDirection: 'row',
    backgroundColor: '#5EC43A',
    justifyContent: "center",
    borderRadius: 10,
    padding: 8
  },
  moneyText: {
    color: "green",
    fontWeight: 'bold',
    fontSize: wp(3.3)
  },
  moneyText2: {
    color: "green",
    fontSize: wp(3)
  },
  shadowMoney: {
    shadowColor: '#5EC43A',
    shadowOffset: {
      width: 0.01,
      height: 0.25,
    },
    shadowOpacity: 2,
    shadowRadius: 3
  },
  //MONEY
});
export default withNavigation(HomeClases);