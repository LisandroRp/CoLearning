import React from "react";
import { StyleSheet, Text, View, StatusBar, SafeAreaView, Image, ScrollView, TouchableOpacity, ActivityIndicator } from "react-native";
import { Ionicons, MaterialCommunityIcons, FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import DropDownItem from 'react-native-drop-down-item';
import { withNavigation } from 'react-navigation';

import ExportadorLogos from './exportadores/ExportadorLogos'

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

class CursoEspecifico extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            perfil: {},
            isLoading: false,
            id_idioma: 0,
            rating: 3,
            max_rating: 5,
            tema: '',
            direccion: '',
            curso: {
              id_curso: 1,
              id_usuario: 0,
              src: require("../assets/leila.jpg"),
              vacantes: 20,
              dondeClases: [{ id_dondeClases: 1, des_dondeClases: "En su casa" },
                { id_dondeClases: 2, des_dondeClases: "A Domicilio" },
                { id_dondeClases: 3, des_dondeClases: "Instituto" }],
                tipoClases: [{ id_tipoClases: 1, des_tipoClases: "Particulares" },
                { id_tipoClases: 2, des_tipoClases: "Grupales" },
                { id_tipoClases: 3, des_tipoClases: "Virtuales" }],
              integrantes: [],
              materias:[],
              nombre_curso: 'Programacion Avanzada',
              direccion: "Narnia",
              rating: 5
            },
        };
        this.Star = ExportadorLogos.traerEstrellaLlena();
        this.Star_With_Border = ExportadorLogos.traerEstrellaBorde();
    }
    vote(i) {
        this.setState({ rating: i })
    }
    queDondeClase(id_dondeClases) {
        switch (id_dondeClases) {

            case 1:

                return <FontAwesome5 style={[{ marginBottom: 10 }]} name={"home"} size={hp(3.3)} color='#F28C0F'></FontAwesome5>;
            case 2:

                return <FontAwesome style={[{ marginBottom: 10 }]} name={"car"} size={hp(3.3)} color='#F28C0F'></FontAwesome>;
            case 3:

                return <FontAwesome5 style={[{ marginBottom: 10 }]} name={"school"} size={hp(3.3)} color='#F28C0F'></FontAwesome5>;
            default:

                return <View></View>;
        }
    }
    queTipoClase(id_tipoClases) {
        switch (id_tipoClases) {

            case 1:

                return <FontAwesome style={[{ marginBottom: 10 }]} name={"user"} size={hp(4)} color='#F28C0F'></FontAwesome>;
            case 2:

                return <FontAwesome style={[{ marginBottom: 10 }]} name={"group"} size={hp(4)} color='#F28C0F'></FontAwesome>;
            case 3:

                return <Ionicons style={[{ marginBottom: 10 }]} name={"ios-tv"} size={hp(4)} color='#F28C0F'></Ionicons>;
            default:

                return <View></View>;
        }
    }
    marginSize(index) {
        if (index != this.state.curso.materias.length - 1) {

            return { marginTop: hp(3) }
        } else {
            return { marginBottom: hp(3), marginTop: hp(3) }
        }
    }
    render() {
        var rating2 = this.state.rating
        let React_Native_Rating_Bar = [];
        for (var i = 1; i <= this.state.max_rating; i++) {
            React_Native_Rating_Bar.push(
                <TouchableOpacity
                    activeOpacity={0.7}
                    key={i}
                    onPress={this.vote.bind(this, i)}
                >
                    {i <= rating2
                        ? <Image style={styles.starImage} source={ExportadorLogos.traerEstrellaLlena()}></Image>
                        : <Image style={styles.starImage} source={ExportadorLogos.traerEstrellaBorde()}></Image>
                    }
                    {/* <FontAwesome name={i <= rating2
                        ? 'star'
                        : 'star'} style={styles.heartImage} size={hp(4)} /> */}
                </TouchableOpacity>
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
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <View style={{ alignSelf: "center" }}>
                            <View style={styles.profileImage}>
                                <Image source={this.state.curso.src} style={styles.image} resizeMode="center"></Image>
                            </View>
                            <View style={styles.active}></View>
                        </View>

                        <View style={styles.infoContainer}>
                            <Text style={[styles.text, { fontWeight: "200", fontSize: 28, fontWeight: 'bold', color: '#F28C0F' }]}>{this.state.curso.nombre_curso}</Text>
                            <Text style={[styles.text, { color: "#AEB5BC", fontSize: 14 }]}>{this.state.curso.domicilio}</Text>
                        </View>

                        <View style={styles.statsContainer}>
                            <View style={[styles.statsBoxHearts]}>
                                <View style={styles.heartView}>{React_Native_Rating_Bar}</View>
                                <Text style={[styles.text, styles.subText]}>Votos: 1523</Text>
                            </View>
                        </View>
                        {/*/////////////////////////////////////////////////////////////////////////// */}

                            <View style={styles.bottomBox}>
                                <Text style={[styles.text, { fontSize: 20 }]}>Ubicación de Clases</Text>

                                <View style={[{ flexDirection: 'row' }]}>
                                    {this.state.curso.dondeClases.map((item) => (
                                        <View style={[{ padding: 10, marginHorizontal: 10, marginTop: 10, alignItems: "center", borderRadius: 10 }]}>
                                            {this.queDondeClase(item.id_dondeClases)}
                                            <Text style={[styles.text, styles.subText]}>{item.des_dondeClases}</Text>
                                        </View>
                                    ))}
                                </View>
                            </View>

                            <View style={styles.bottomBox}>
                                <Text style={[styles.text, { fontSize: 20 }]}>Tipo de Clases</Text>

                                <View style={[{ flexDirection: 'row' }]}>
                                    {this.state.curso.tipoClases.map((item) => (
                                        <View style={[{ padding: 10, marginHorizontal: 10, marginTop: 10, alignItems: "center", borderRadius: 10 }]}>
                                            {this.queTipoClase(item.id_tipoClases)}
                                            <Text style={[styles.text, styles.subText]}>{item.des_tipoClases}</Text>
                                        </View>
                                    ))}
                                </View>
                            </View>

                            <View style={styles.dropDownViewContainer}>
                                <Text style={[styles.text, { fontSize: 20, textAlign: 'center' }]}>Materias</Text>

                                {this.state.curso.materias.map((item, index) => (
                                    <View style={[styles.dropDownContainer, this.marginSize(index)]}>
                                        <DropDownItem contentVisible={false}
                                            header={
                                                <View style={styles.backgroundTitulo}><Text style={styles.titulo}>{item.nombre_materia}</Text></View>
                                            }
                                        >

                                            <Text style={styles.descripcion}>{item.des_materia}</Text>
                                        </DropDownItem>
                                    </View>
                                )
                                )
                                }
                            </View>



                    </ScrollView>
                </SafeAreaView>
            );
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF7EE'
    },
    text: {
        fontFamily: "HelveticaNeue",
        color: "#52575D"
    },
    image: {
        flex: 1,
        height: undefined,
        width: undefined
    },
    subText: {
        fontSize: 12,
        color: "#AEB5BC",
        textTransform: "uppercase",
        fontWeight: "500"
    },
    profileImage: {
        width: 200,
        height: 200,
        borderRadius: 100,
        overflow: "hidden",
        marginTop: hp(5)
    },
    dm: {
        backgroundColor: "#F28C0F",
        position: "absolute",
        bottom: 0,
        right: 0,
        width: hp(8),
        height: hp(8),
        marginRight: wp(5.5),
        marginBottom: hp(3),
        borderRadius: 100,
        alignItems: "center",
        justifyContent: "center",
        shadowColor: '#00000055',
        shadowOffset: {
            width: 0.01,
            height: 0.25,
        },
        shadowOpacity: 2,
        shadowRadius: 8,
        elevation: 2,
    },
    active: {
        backgroundColor: "#34FFB9",
        position: "absolute",
        bottom: 28,
        left: 10,
        padding: 4,
        height: 20,
        width: 20,
        borderRadius: 10
    },
    add: {
        backgroundColor: "#41444B",
        position: "absolute",
        bottom: 0,
        right: 0,
        width: 60,
        height: 60,
        borderRadius: 30,
        alignItems: "center",
        justifyContent: "center"
    },
    infoContainer: {
        alignSelf: "center",
        alignItems: "center",
        marginTop: 16
    },
    statsContainer: {
        flexDirection: "row",
        borderColor: "#DFD8C8",
        borderBottomWidth: 1,
        paddingBottom: hp(2.2),
        marginHorizontal: wp(8),
        marginTop: 32,
    },
    //Heart
    heartView: {
        justifyContent: 'center',
        flexDirection: 'row',
        marginTop: hp(1.5),
        marginBottom: hp(1),
        marginHorizontal: wp(2)
    },
    starImage: {
        width: hp(4),
        height: hp(4),
        color: "orange"
    },
    statsBoxHearts: {
        flex: 1,
        alignSelf: "stretch",
        borderColor: "#DFD8C8",
        borderRightWidth: 1,
        alignItems: 'center'
    },
    //Heart
    statsBoxForo: {
        alignItems: 'center',
        width: '100%',
        flex: 1,
    },
    mediaImageContainer: {
        width: 180,
        height: 200,
        borderRadius: 12,
        overflow: "hidden",
        marginHorizontal: 10
    },
    mediaCount: {
        backgroundColor: "#41444B",
        position: "absolute",
        top: "50%",
        marginTop: -50,
        marginLeft: 30,
        width: 100,
        height: 100,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 12,
        shadowColor: "rgba(0, 0, 0, 0.38)",
        shadowOffset: { width: 0, height: 10 },
        shadowRadius: 20,
        shadowOpacity: 1
    },

    activityIndicator: {
        backgroundColor: "#CABFAB",
        padding: 4,
        height: 12,
        width: 12,
        borderRadius: 6,
        marginTop: 3,
        marginRight: 20
    },
    bottomBox: {
        alignItems: "center",
        paddingTop: hp(2.2),
        paddingBottom: hp(2.2),
        borderBottomWidth: 1,
        borderColor: "#DFD8C8",
        marginHorizontal: wp(8)
    },
    //DROPDOWN
    dropDownViewContainer: {
        borderColor: "#DFD8C8",
        paddingTop: hp(2.2),
        marginHorizontal: wp(8),
        shadowColor: '#00000045',
        shadowOffset: {
            width: 0.01,
            height: 0.25,
        },
        shadowOpacity: 2,
        shadowRadius: 8,
        elevation: 2
    },
    titleClasesImparte: {
        fontSize: 24,
        textAlign: 'center',
    },
    dropDownContainer: {
        backgroundColor: 'white',
        borderRadius: 10
    },
    backgroundTitulo: {
        backgroundColor: '#F28C0F',
        borderRadius: 10,
        alignItems: 'center',
        paddingHorizontal: wp("2"),
        paddingVertical: hp("2"),
    },
    titulo: {
        fontSize: wp(4),
        color: 'white',
        textAlign: 'center'
    },
    descripcion: {
        color: 'black',
        marginHorizontal: wp("4"),
        marginVertical: hp("2"),
        fontSize: wp(3.5),
    },
});
export default withNavigation(CursoEspecifico);