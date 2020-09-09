import React from "react";
import { StyleSheet, Text, View, StatusBar, SafeAreaView, Image, ScrollView, TouchableOpacity, ActivityIndicator } from "react-native";
import { Ionicons, MaterialCommunityIcons, FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import DropDownItem from 'react-native-drop-down-item';
import { withNavigation } from 'react-navigation';

import ExportadorLogos from './exportadores/ExportadorLogos'

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

class UsuarioEspecifico extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,     
            max_rating: 5,
            usuario: {
                id_usuario: 1,
                nombre_usuario: 'Juan',
                apellido: 'Marinelli',
                src: require("../assets/leila.jpg"),
                esProfesor: true,
                domicilio: 'Spega Ñeri',
                dondeClases: [{ id_dondeClases: 1, des_dondeClases: "En su casa" },
                { id_dondeClases: 2, des_dondeClases: "A Domicilio" },
                { id_dondeClases: 3, des_dondeClases: "Instituto" }],
                tipoClases: [{ id_tipoClases: 1, des_tipoClases: "Particulares" },
                { id_tipoClases: 2, des_tipoClases: "Grupales" },
                { id_tipoClases: 3, des_tipoClases: "Virtuales" }],
                instagram: "@LisandroRp",
                whatsApp: "1144373492",
                rating: 3,
                materias: [{ nombre_materia: "Ingles", des_materia: "Clases de Ingles avanzadas para examenes internacionales" },
                { nombre_materia: "Matematica", des_materia: "Clases de matematica de secundaria y universidad" }],
                latitud: 123,
                longitud: 123,
                money: {id_moneda: {id_moneda: 1, nombre: "$"}, monto: "100"}
            }
        };
        this.Star = ExportadorLogos.traerEstrellaLlena();
        this.Star_With_Border = ExportadorLogos.traerEstrellaBorde();
    }
    vote(i) {
        var usuarioUpdate = this.state.usuario
        usuarioUpdate.rating = i
        this.setState({ usuario: usuarioUpdate })
    }
    queDondeClase(id_usuario) {
        switch (id_usuario) {

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
    queTipoClase(id_usuario) {
        switch (id_usuario) {

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
        if (index != this.state.usuario.materias.length - 1) {

            return { marginTop: hp(3) }
        } else {
            return { marginBottom: hp(3), marginTop: hp(3) }
        }
    }
    render() {
        var rating2 = this.state.usuario.rating
        let React_Native_Rating_Bar = [];
        for (var i = 1; i <= this.state.max_rating; i++) {
            React_Native_Rating_Bar.push(
                <View
                    activeOpacity={0.7}
                    key={i}
                >
                    {i <= rating2
                        ? <Image style={styles.starImage} source={ExportadorLogos.traerEstrellaLlena()}></Image>
                        : <Image style={styles.starImage} source={ExportadorLogos.traerEstrellaBorde()}></Image>
                    }
                    {/* <FontAwesome name={i <= rating2
                        ? 'star'
                        : 'star'} style={styles.heartImage} size={hp(4)} /> */}
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
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <View>
                        <View style={{ alignSelf: "center" }}>
                            <View style={styles.profileImage}>
                                <Image source={this.state.usuario.src} style={styles.image} resizeMode="center"></Image>
                            </View>
                            <View style={styles.active}></View>
                        </View>

                        <View style={styles.infoContainer}>
                            <Text style={[styles.text, { fontWeight: "200", fontSize: 28, fontWeight: 'bold', color: '#F28C0F' }]}>{this.state.usuario.nombre_usuario} {this.state.usuario.apellido}</Text>
                            <Text style={[styles.text, { color: "#AEB5BC", fontSize: 14 }]}>{this.state.usuario.domicilio}</Text>
                        </View>
                        <View style={[styles.moneyView, styles.shadowMoney]}>
                            <Text style={styles.moneyText}>{this.state.usuario.money.id_moneda.nombre}{this.state.usuario.money.monto}</Text>
                            <Text style={styles.moneyText2}>/h</Text>
                        </View>
                        </View>

                        <View style={styles.statsContainer}>
                            {
                            this.state.usuario.esProfesor ? 
                            <View style={[styles.statsBoxStar]}>
                                <View style={styles.starView}>{React_Native_Rating_Bar}</View>
                                <Text style={[styles.text, styles.subText]}>Votos: 1523</Text>
                            </View> : 
                            <View/>
                            }
                            <View style={[styles.statsBoxForo]}>
                                <View style={{ flexDirection: 'row'}}>
                                    <FontAwesome style={[{flex: 0.5, textAlign: 'right', marginRight: wp(5)}]} name={"thumbs-up"} size={hp(3)} color="#5EC43A"/>
                                    <Text style={[styles.text, { fontSize: wp(5), flex: 0.5}]}>302</Text>
                                </View>
                                <View style={{ flexDirection: 'row'}}>
                                    <FontAwesome style={[{flex: 0.5, textAlign: 'right', marginRight: wp(5)}]} name={"check"} size={hp(3)} color="#5EC43A"/>
                                    <Text style={[styles.text, { fontSize: wp(5), flex: 0.5}]}>2</Text>
                                </View>
                                <Text style={[styles.text, styles.subText, {marginTop: hp(1)}]}>Respuestas Foro: 111</Text>
                            </View>
                        </View>
                        {/*/////////////////////////////////////////////////////////////////////////// */}
                        {this.state.usuario.esProfesor ?
                            <View style={styles.bottomBox}>
                                <Text style={[styles.text, { fontSize: 20 }]}>Ubicación de Clases</Text>

                                <View style={[{ flexDirection: 'row' }]}>
                                    {this.state.usuario.dondeClases.map((item) => (
                                        <View style={[{ padding: 10, marginHorizontal: 10, marginTop: 10, alignItems: "center", borderRadius: 10 }]} key= {item.id_dondeClases}>
                                            {this.queDondeClase(item.id_dondeClases)}
                                            <Text style={[styles.text, styles.subText]}>{item.des_dondeClases}</Text>
                                        </View>
                                    ))}
                                </View>
                            </View> : <View></View>}

                        {this.state.usuario.esProfesor ?
                            <View style={styles.bottomBox}>
                                <Text style={[styles.text, { fontSize: 20 }]}>Tipo de Clases</Text>

                                <View style={[{ flexDirection: 'row' }]}>
                                    {this.state.usuario.tipoClases.map((item) => (
                                        <View style={[{ padding: 10, marginHorizontal: 10, marginTop: 10, alignItems: "center", borderRadius: 10 }]} key = {item.id_tipoClases}>
                                            {this.queTipoClase(item.id_tipoClases)}
                                            <Text style={[styles.text, styles.subText]}>{item.des_tipoClases}</Text>
                                        </View>
                                    ))}
                                </View>
                            </View> : <View></View>}

                        {this.state.usuario.esProfesor ?
                            <View style={styles.dropDownViewContainer}>
                                <Text style={[styles.text, { fontSize: 20, textAlign: 'center' }]}>Materias</Text>

                                {this.state.usuario.materias.map((item, index) => (
                                    <View style={[styles.dropDownContainer, this.marginSize(index)]} key={item.nombre_materia}>
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
                            </View> : <View></View>}



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
        width: undefined,
        borderRadius: 100
    },
    subText: {
        fontSize: 12,
        color: "#AEB5BC",
        textTransform: "uppercase",
        fontWeight: "500"
    },
    profileImage: {
        width: hp(25),
        height: hp(25),
        borderRadius: 100,
        marginTop: hp(5),
        backgroundColor: 'transparent',
        shadowColor: '#00000045',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.37,
        shadowRadius: 7.49,
        elevation: 20,
    },
    //MONEY
    moneyView: {
        position: 'absolute',
        flexDirection: 'row',
        right: 0,
        backgroundColor: '#5EC43A',
        alignItems: "flex-end",
        borderRadius: 10,
        marginTop: hp(3),
        marginRight: wp(5),
        padding: 10
    },
    moneyText: {
        color: "green",
        fontWeight: 'bold',
        fontSize: wp(4.4)
    },
    moneyText2: {
        color: "green",
        fontSize: wp(3.5)
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
    //Stars
    starView: {
        justifyContent: 'center',
        flexDirection: 'row',
        marginTop: hp(1.5),
        marginBottom: hp(1),
        marginHorizontal: wp(2)
    },
    starImage: {
        width: hp(4),
        height: hp(4)
    },
    statsBoxStar: {
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
export default withNavigation(UsuarioEspecifico);