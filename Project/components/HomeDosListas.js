import React from 'react';
import { StyleSheet, Text, View, ScrollView, Image, TouchableWithoutFeedback, Animated, Dimensions, SafeAreaView, FlatList } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import {Animated as Animated2} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

let SCREEN_WIDTH = Dimensions.get('window').width
let SCREEN_HEIGHT = Dimensions.get('window').height
var images = [
  { id: 1, src: require('../assets/2.png') },
  { id: 2, src: require('../assets/2.png') },
  { id: 3, src: require('../assets/2.png') },
  { id: 4, src: require('../assets/2.png') },
]
var images2 = [
  { id: 12, src: require('../assets/2.png') },
  { id: 22, src: require('../assets/2.png') },
  { id: 32, src: require('../assets/2.png') },
  { id: 42, src: require('../assets/2.png') },
]

export default class App extends React.Component {

  constructor() {
    super()
    this.state = {
      activeImage: null,
      activeImage2: null,
      flag: false,
      y:0
    }
  }

  onCarouselItemChange = (index) => {
    //this.openImage(index)
  }
  onCarouselItemChange2 = (index) => {
    //this.openImage2(index)
  }

  componentWillMount() {
    this.allImages = {}
    this.allImages2 = {}
    this.oldPosition = {}
    this.oldPosition2 = {}
    this.position = new Animated.ValueXY()
    this.position2 = new Animated.ValueXY()
    this.dimensions = new Animated.ValueXY()
    this.dimensions2 = new Animated.ValueXY()
    this.animation = new Animated.Value(0)
    this.animation2 = new Animated.Value(0)
    this.activeImageStyle = null
    this.activeImageStyle2 = null
  }

  openImage = (index) => {

    this.allImages[index].measure((x, y, width, height, pageX, pageY) => {
      this.oldPosition.x = pageX
      this.oldPosition.y = pageY-66
      this.oldPosition.width = width
      this.oldPosition.height = height
      this.setState({y: pageY-66})
      this.setState({flag: true})

      this.position.setValue({
        x: pageX,
        y: pageY-66
      })

      this.dimensions.setValue({
        x: width,
        y: height
      })

      this.setState({
        activeImage: images[index]
      }, () => {
        this.viewImage.measure((dx, dy, dWidth, dHeight, dPageX, dPageY) => {

          Animated.parallel([
            Animated.timing(this.position.x, {
              toValue: dPageX,
              duration: 300
            }),
            Animated.timing(this.position.y, {
              toValue: dPageY,
              duration: 300
            }),
            Animated.timing(this.dimensions.x, {
              toValue: dWidth,
              duration: 300
            }),
            Animated.timing(this.dimensions.y, {
              toValue: dHeight,
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
  closeImage = () => {
    this.setState({flag: false})
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
  openImage2 = (index) => {

    this.allImages2[index].measure((x, y, width, height, pageX, pageY) => {
      this.oldPosition2.x = pageX
      this.oldPosition2.y = pageY-66
      this.oldPosition2.width = width
      this.oldPosition2.height = height
      this.setState({y: pageY-66})

      this.position2.setValue({
        x: pageX,
        y: pageY-66
      })

      this.dimensions2.setValue({
        x: width,
        y: height
      })

      this.setState({
        activeImage2: images2[index]
      }, () => {
        this.viewImage2.measure((dx, dy, dWidth, dHeight, dPageX, dPageY) => {

          Animated2.parallel([
            Animated2.timing(this.position2.x, {
              toValue: dPageX,
              duration: 300
            }),
            Animated2.timing(this.position2.y, {
              toValue: dPageY,
              duration: 300
            }),
            Animated2.timing(this.dimensions2.x, {
              toValue: dWidth,
              duration: 300
            }),
            Animated2.timing(this.dimensions2.y, {
              toValue: dHeight,
              duration: 300
            }),
            Animated2.timing(this.animation2, {
              toValue: 1,
              duration: 300
            })
          ]).start()
        })
      })
    })
  }
  closeImage2 = () => {
    Animated2.parallel([
      Animated2.timing(this.position2.x, {
        toValue: this.oldPosition2.x,
        duration: 300
      }),
      Animated2.timing(this.position2.y, {
        toValue: this.oldPosition2.y,
        duration: 250
      }),
      Animated2.timing(this.dimensions2.x, {
        toValue: this.oldPosition2.width,
        duration: 250
      }),
      Animated2.timing(this.dimensions2.y, {
        toValue: this.oldPosition2.height,
        duration: 250
      }),
      Animated2.timing(this.animation2, {
        toValue: 0,
        duration: 250
      })
    ]).start(() => {
      this.setState({
        activeImage2: null
      })
    })
  }
  magia(){
    var activeImageStyle
    if(this.state.flag != true){
      return activeImageStyle = {
        width: this.dimensions.x,
        height: this.dimensions.y,
        left: this.position.x,
        top: this.state.y
      }
    }else{
      return activeImageStyle = {
        width: this.dimensions.x,
        height: this.dimensions.y,
        left: this.position.x,
        top: this.state.y
      }
    }
  }
  render() {

    const activeImageStyle = {
      width: this.dimensions.x,
      height: this.dimensions.y,
      left: this.position.x,
      top: this.position.y
    }
    const activeImageStyle2 = {
      width: this.dimensions2.x,
      height: this.dimensions2.y,
      left: this.position2.x,
      top: this.state.y
    }
    const animatedContentY = this.animation.interpolate({
      inputRange: [0, 1],
      outputRange: [-150, 0]
    })

    const animatedContentOpacity = this.animation.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [0, 1, 1]
    })

    const animatedContentStyle = {
      opacity: animatedContentOpacity,
      transform: [{
        translateY: animatedContentY
      }]
    }
    const animatedContentStyle2 = {
      opacity: animatedContentOpacity,
      transform: [{
        translateY: animatedContentY
      }]
    }

    const animatedCrossOpacity = {
      opacity: this.animation
    }
    const animatedCrossOpacity2 = {
      opacity: this.animation2
    }
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView style={{ flex: 1 }}>
        <Text>Populares</Text>
        <Carousel
          ref={(c) => { this._carousel = c; }}
          data={images}
          containerCustomStyle={styles.carousel}
          renderItem={this.renderCarouselItem}
          sliderWidth={Dimensions.get('window').width}
          itemWidth={wp(50)}
          removeClippedSubviews={false}
          onSnapToItem={(index) => this.onCarouselItemChange(index)}
        />
        
            <Text>Recomendados</Text>
            <Carousel
          ref={(c) => { this._carousel = c; }}
          data={images}
          containerCustomStyle={styles.carousel}
          renderItem={this.renderCarouselItem2}
          sliderWidth={Dimensions.get('window').width}
          itemWidth={wp(50)}
          removeClippedSubviews={false}
          onSnapToItem={(index) => this.onCarouselItemChange2(index)}
        />
          
        </ScrollView>
        <View style={StyleSheet.absoluteFill}
          pointerEvents={this.state.activeImage ? "auto" : "none"}
        >
          <View style={{ flex: 1, zIndex: 1001 }} ref={(view) => (this.viewImage = view)}>
            <Animated.Image
              source={this.state.activeImage ? this.state.activeImage.src : null}
              style={[{resizeMode: 'cover', top: 0, left: 0, height: null, width: null }, this.magia()]}
            >
            </Animated.Image>
            <TouchableWithoutFeedback onPress={() => this.closeImage()}>
              <Animated.View style={[{ position: 'absolute', top: 30, right: 30 }, animatedCrossOpacity]}>
                <Text style={{ fontSize: 24, fontWeight: 'bold', color: 'white' }}>X</Text>
              </Animated.View>
            </TouchableWithoutFeedback>
          </View>
          <Animated.View style={[{ flex: 1, zIndex: 1000, backgroundColor: 'white', padding: 20, paddingTop: 50 }, animatedContentStyle]}>
            <Text style={{ fontSize: 24, paddingBottom: 10 }}>Unsure Programmer</Text>
            <Text>Eiusmod consectetur cupidatat dolor Lorem excepteur excepteur. Nostrud sint officia consectetur eu pariatur laboris est velit. Laborum non cupidatat qui ut sit dolore proident.</Text>
          </Animated.View>
        </View>


        <View style={StyleSheet.absoluteFill}
          pointerEvents={this.state.activeImage2 ? "full" : "none"}
        >
          <View style={{ flex: 2, zIndex: 1001 }} ref={(view2) => (this.viewImage2 = view2)}>
            <Animated2.Image
              source={this.state.activeImage2 ? this.state.activeImage2.src : null}
              style={[{resizeMode: 'cover', top: 0, left: 0, height: null, width: null }, activeImageStyle2]}
            >
            </Animated2.Image>
            <TouchableWithoutFeedback onPress={() => this.closeImage2()}>
              <Animated2.View style={[{ position: 'absolute', top: 30, right: 30 }, animatedCrossOpacity2]}>
                <Text style={{ fontSize: 24, fontWeight: 'bold', color: 'white' }}>X</Text>
              </Animated2.View>
            </TouchableWithoutFeedback>
          </View>
          <Animated2.View style={[{ flex: 1, zIndex: 1000, backgroundColor: 'white', padding: 20, paddingTop: 50 }, animatedContentStyle2]}>
            <Text style={{ fontSize: 24, paddingBottom: 10 }}>Unsure Programmer</Text>
            <Text>Eiusmod consectetur cupidatat dolor Lorem excepteur excepteur. Nostrud sint officia consectetur eu pariatur laboris est velit. Laborum non cupidatat qui ut sit dolore proident.</Text>
          </Animated2.View>
        </View>
      </SafeAreaView>
    );
  }
  renderCarouselItem = ({ item, index }) =>
  <TouchableWithoutFeedback
                onPress={() => this.openImage(index)}
                key={item.id}>
                <Animated.View
                  style={{padding: 15 }}
                >
                  <Image
                    ref={(item) => (this.allImages[index] = item)}
                    source={item.src}
                    style={{height: 200, width: 200, resizeMode: 'cover', borderRadius: 20 }}
                  />
                </Animated.View>
              </TouchableWithoutFeedback>


renderCarouselItem2 = ({ item, index }) =>
  <TouchableWithoutFeedback
                onPress={() => this.openImage2(index)}
                key={item.id}>
                <Animated2.View
                  style={{padding: 15 }}
                >
                  <Image
                    ref={(item) => (this.allImages2[index] = item)}
                    source={item.src}
                    style={{height: 200, width: 200, resizeMode: 'cover', borderRadius: 20 }}
                  />
                </Animated2.View>
              </TouchableWithoutFeedback>

}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  //********************* */
  //CAROUSEL
  //********************* */
  carousel: {
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
    backgroundColor: 'black',
    marginRight: wp(5),
    borderRadius: 100
  },
  cardTitle: {
    color: '#6BA8FF',
    fontSize:wp(5.5),
    alignSelf: 'center',
    textAlign: 'center'
  },
  cardInstituto: {
    color: 'black',
    fontSize: 15,
    alignSelf: 'center',
    textAlign: 'center'
  },
  cardDireccion: {
    color: 'black',
    fontSize: 13.3,
    alignSelf: 'center',
    marginBottom: hp(2.5)
  },
  cardButton: {
    backgroundColor: '#6BA8FF',
    alignSelf: 'center',
    padding: hp(2),
    borderRadius: 100,
    marginBottom: hp(2),
    shadowColor: '#00000021',
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 2,
        shadowRadius: 8,
        elevation: 55,
    
  },
  cardButtonText: {
    textAlign: 'center',
    fontSize: wp(2.2),
    fontWeight: 'bold',
    color: "#A01A50"
  },
  cardTiempo: {
    color: 'black',
    fontSize: 12
  }
});