import React from 'react';
import { StyleSheet, Text, View, ScrollView, Image, TouchableWithoutFeedback, Animated, Dimensions, SafeAreaView, FlatList } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import ExportadorLogos from './exportadores/ExportadorLogos'

let SCREEN_WIDTH = Dimensions.get('window').width
let SCREEN_HEIGHT = Dimensions.get('window').height

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { FontAwesome } from '@expo/vector-icons';

var images = [
  { id: 0, src: null, Nombre: 'Co-Learning' },
  { id: 1, src: require('../assets/2.png'), Nombre: 'Lorenzo', tipo: 'clase', rating: 2 },
  { id: 2, src: require('../assets/Logo.png'), Nombre: 'Cruso Programacion', tipo: 'curso' },
  { id: 3, src: require('../assets/2.png') },
  { id: 4, src: require('../assets/2.png') },

]

export default class App extends React.Component {

  constructor() {
    super()
    this.state = {
      clases: [{ id: 0, src: null, Nombre: 'Co-Learning' },{
        nombre: 'Leila',
        apellido: 'Arcolucci',
        foto: require("../assets/leila.jpg"),
        domicilio: 'Spega Ñeri',
        dondeClases: [{ id: 1, des_domicilio: "En su casa" },
        { id: 2, des_domicilio: "A Domicilio" },
        { id: 3, des_domicilio: "En un Instituto" }],
        tipoClases: [{ id: 1, des_tipoClases: "Particulares" },
        { id: 2, des_tipoClases: "Grupales" },
        { id: 3, des_tipoClases: "Virtuales" }],
        instagram: "@LisandroRp",
        whatsApp: "1144373492"

      },
        {
          nombre: 'Leila',
          apellido: 'Arcolucci',
          foto: require("../assets/leila.jpg"),
          domicilio: 'Spega Ñeri',
          dondeClases: [{ id: 1, des_domicilio: "En su casa" },
          { id: 2, des_domicilio: "A Domicilio" },
          { id: 3, des_domicilio: "En un Instituto" }],
          tipoClases: [{ id: 1, des_tipoClases: "Particulares" },
          { id: 2, des_tipoClases: "Grupales" },
          { id: 3, des_tipoClases: "Virtuales" }],
          instagram: "@LisandroRp",
          whatsApp: "1144373492"

        },
        {
          nombre: 'Leila',
          apellido: 'Arcolucci',
          foto: require("../assets/leila.jpg"),
          domicilio: 'Spega Ñeri',
          dondeClases: [{ id: 1, des_domicilio: "En su casa" },
          { id: 2, des_domicilio: "A Domicilio" },
          { id: 3, des_domicilio: "En un Instituto" }],
          tipoClases: [{ id: 1, des_tipoClases: "Particulares" },
          { id: 2, des_tipoClases: "Grupales" },
          { id: 3, des_tipoClases: "Virtuales" }],
          instagram: "@LisandroRp",
          whatsApp: "1144373492"

        }],
      activeImage: this.state.clases[0],
      y: 0,
      max_rating: 5
    }
    this.Star = ExportadorLogos.traerEstrellaLlena();
    this.Star_With_Border = ExportadorLogos.traerEstrellaBorde();
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
      return 5
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
      return '#FFEEEE'
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
          <FontAwesome name={i <= (this.state.activeImage ? this.state.activeImage.rating : 2)
            ? 'heart'
            : 'heart-o'} style={styles.heartImage} size={hp(4)} />
        </View>
      );
    }
    return (
      <SafeAreaView style={styles.container}>
        <Carousel
          ref={(c) => { this._carousel = c; }}
          data={this.stata.clases}
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
          style={[{ backgroundColor: 'white', flexDirection: 'row', height: hp(50), margin: 10, marginBottom: 10, padding: 10, borderRadius: 10 }, animatedContentStyle]}
        >
          <View style={[{ flexDirection: 'column', alignItems: 'center', backgroundColor: 'white' }]} ref={(view) => (this.viewImage = view)}>
            <Animated.Image
              source={this.state.activeImage ? this.state.activeImage.src : null}
              style={[styles.image, { borderWidth: this.inactiveBorderImageWidth(), width: this.inactiveImageWidth() }]}
            >
            </Animated.Image>
            <View style={styles.heartView}>{React_Native_Rating_Bar}</View>
            <Text>{this.inactiveImageVotos()}{this.state.activeImage ? this.state.activeImage.rating : 'Unsure Programmer'}</Text>
          </View>
          <Animated.View style={[{ backgroundColor: 'white', flex: 1, padding: 20, flexDirection: 'column', alignItems: 'center' }]}>
            <Text style={{ fontSize: 24, paddingBottom: 10 }}>{this.state.activeImage ? this.state.activeImage.Nombre : ''}</Text>
            <Text >Eiusmod consectetur cupidatat dolor Lorem excepteur excepteur. Nostrud sint officia consectetur eu pariatur laboris est velit. Laborum non cupidatat qui ut sit dolore proident.</Text>
            <TouchableOpacity style={[styles.button, { backgroundColor: this.inactiveImageButton() }]} onPress={() => this.props.onPressGo(this.state.activeImage.id, this.state.activeImage.tipo, this.state.activeImage.Nombre)} >
              <Text>{this.inactiveImageButtonText()}</Text>
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
  renderCarouselItem = ({ item, index }) =>
    <TouchableOpacity
      onPress={() => this.onTouchImage(index)}
      key={item.id}>
      <Animated.View
        style={{ padding: 15 }}
      >
        <Image
          ref={(item) => (this.allImages[index] = item)}
          source={item.src}
          style={{ height: hp(25), width: hp(25), borderRadius: 20 }}
        />
      </Animated.View>
    </TouchableOpacity>
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFEEEE',
    alignItems: 'center',
    justifyContent: 'center',
  },
  carousel: {
    backgroundColor: 'white',
    marginTop: 10,
    //backgroundColor:'red'
  },
  //Heart
  heartView: {
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: hp(1.5),
    marginBottom: hp(1)
  },
  heartImage: {
    color: "#f66",
    marginHorizontal: 1
  },
  //Details Cards
  image: {
    height: hp(37),
    borderRadius: 10,
    borderColor: "#6BA8FF"
  },
  //Boton
  button: {
    padding: 10,
    marginTop: hp(3.3),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10
  }
});