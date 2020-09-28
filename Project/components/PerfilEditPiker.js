import React from "react";
import { StyleSheet, Text, View, StatusBar, SafeAreaView, Image, ScrollView, TouchableOpacity, ActivityIndicator } from "react-native";
import { Ionicons, Entypo, FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import DropDownItem from 'react-native-drop-down-item';
import { withNavigation } from 'react-navigation';

import RNPickerSelect from 'react-native-picker-select';

import ExportadorLogos from './exportadores/ExportadorLogos'

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Picker from "react-native-picker-select";

function createData(item) {
    return {
        key: item.id_materia,
        label: item.nombre_materia,
        value: item.id_materia
    };
}

class PerfilEdit extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            max_rating: 5,
            actividad: '',
            usuario: {
                id_usuario: 1,
                nombre_usuario: 'Juan',
                apellido: 'Marinelli',
                src: require("../assets/leila.jpg"),
                esProfesor: true,
                domicilio: 'Narnia',
                dondeClases: [{ id_dondeClases: 1, des_dondeClases: "En su casa" },
                { id_dondeClases: 3, des_dondeClases: "Instituto" }],
                tipoClases: [{ id_tipoClases: 1, des_tipoClases: "Particulares" },
                { id_tipoClases: 2, des_tipoClases: "Grupales" }],
                instagram: "@LisandroRp",
                whatsApp: "1144373492",
                rating: 3,
                materias: [{ id_materia: 1, nombre_materia: "Ingles", des_materia: "Clases de Ingles avanzadas para examenes internacionales" },
                { id_materia: 2, nombre_materia: "Matematica", des_materia: "Clases de matematica de secundaria y universidad" }],
                latitud: 123,
                longitud: 123
            },
            nuevasMaterias: [],
            nuevasDondeClases: [],
            nuevasTipoClases: [],
            materiasBase: [{ id_materia: 1, nombre_materia: "Ingles" },
            { id_materia: 2, nombre_materia: "Matematica" },
            { id_materia: 3, nombre_materia: "Chino" }],
            dondeClasesBase: [{ id_dondeClases: 1, des_dondeClases: "En su casa" },
            { id_dondeClases: 2, des_dondeClases: "A Domicilio" },
            { id_dondeClases: 3, des_dondeClases: "Instituto" }],
            tipoClasesBase: [{ id_tipoClases: 1, des_tipoClases: "Particulares" },
            { id_tipoClases: 2, des_tipoClases: "Grupales" },
            { id_tipoClases: 3, des_tipoClases: "Virtuales" }],
            flag: 0
        };
        this.Star = ExportadorLogos.traerEstrellaLlena();
        this.Star_With_Border = ExportadorLogos.traerEstrellaBorde();
    }
    componentDidMount() {
        this.setState({ nuevasMaterias: this.state.usuario.materias, nuevasTipoClases: this.state.usuario.tipoClases, nuevasDondeClases: this.state.usuario.dondeClases })
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

                return <Ionicons style={[{ marginBottom: 7 }]} name={"ios-tv"} size={hp(4)} color='#F28C0F'></Ionicons>;
            default:

                return <View></View>;
        }
    }
    marginSize(index) {
        if (index != this.state.usuario.materias.length - 1) {
            return { marginBottom: hp(3), marginTop: hp(3) }
        } else {
            return { marginBottom: hp(3)}
        }
    }
    //Donde Clases
    isCheckDondeClases(id_dondeClases, item) {
        var contador = 0;
        while (contador < this.state.nuevasDondeClases.length) {
            if (this.state.nuevasDondeClases[contador].id_dondeClases == id_dondeClases) {
                return <TouchableOpacity onPress={() => this.abmDondeClases(this.state.nuevasDondeClases, item)}><FontAwesome name={"check"} size={hp(5)} color="#5EC43A" /></TouchableOpacity>
            }
            contador++
        }
        return
    }
    isCheckDondeClasesPosition(id_dondeClases) {
        var contador = 0;
        while (contador < this.state.nuevasDondeClases.length) {
            if (this.state.nuevasDondeClases[contador].id_dondeClases == id_dondeClases) {
                return
            }
            contador++
        }
        return { padding: hp(2.5) }
    }
    abmDondeClases(viejasDondeClases, dondeClases) {
        var nuevasDondeClases = []
        var contador = 0;
        var flag = 0;
        while (contador < viejasDondeClases.length) {
            if (viejasDondeClases[contador].id_dondeClases != dondeClases.id_dondeClases) {
                nuevasDondeClases.push(viejasDondeClases[contador])
                contador ++;
            }
            else{
                flag = 1
                contador++
            }
        }
        if(flag==0){
            nuevasDondeClases.push(dondeClases)
        }
        this.setState({nuevasDondeClases: nuevasDondeClases})
    }


    //Tipo Clases
    isCheckTipoClasesPosition(id_tipoClases) {
        var contador = 0;
        while (contador < this.state.nuevasTipoClases.length) {
            if (this.state.nuevasTipoClases[contador].id_tipoClases == id_tipoClases) {
                return
            }
            contador++
        }
        return { padding: hp(2.5) }
    }
    isCheckTipoClases(id_tipoClases, item) {
        var contador = 0;
        while (contador < this.state.nuevasTipoClases.length) {
            if (this.state.nuevasTipoClases[contador].id_tipoClases == id_tipoClases) {
                return <TouchableOpacity onPress={() => this.abmTipoClases(this.state.nuevasTipoClases, item)}><FontAwesome name={"check"} size={hp(5)} color="#5EC43A" /></TouchableOpacity>
            }
            contador++
        }
        return
    }
    abmTipoClases(viejasTipoClases, tipoClases) {
        var nuevasTipoClases = []
        var contador = 0;
        var flag=0;

        while (contador < viejasTipoClases.length) {
            if (viejasTipoClases[contador].id_tipoClases != tipoClases.id_tipoClases) {
                nuevasTipoClases.push(viejasTipoClases[contador])
                contador ++;
            }
            else{
                contador++
                flag = 1
            }
        }
        if(flag==0){
            nuevasTipoClases.push(tipoClases)
        }
    
        this.setState({nuevasTipoClases: nuevasTipoClases})
    }
    //************************ */
    // Materias
    //************************ */

    agregarMateria(nuevasMaterias) {
        if(nuevasMaterias.length != 0){
            if (nuevasMaterias[nuevasMaterias.length - 1].id_materia != 0) {
                var materiaVacia = { id_materia: 0, nombre_materia: '' }
                nuevasMaterias.push(materiaVacia)
                this.setState({ nuevasMaterias: nuevasMaterias })
            }
            else {
                alert("Ya existe espacio para agregar una materia")
            }
        }
        else{
            var materiaVacia = { id_materia: 0, nombre_materia: '' }
                nuevasMaterias.push(materiaVacia)
                this.setState({ nuevasMaterias: nuevasMaterias })
        }
        
    }
    sacarMateria(viejasMaterias, materia) {
        var contador = 0
        var nuevasMaterias = []
        while (contador < viejasMaterias.length) {
            if (viejasMaterias[contador].id_materia != materia.id_materia) {
                nuevasMaterias.push(viejasMaterias[contador])
                contador++;
            }
            else{
                contador++;
            }
        }
        this.setState({ nuevasMaterias: nuevasMaterias })
    }
    materiasPiker(item) {
        var materiasPiker = []
        for (var i = 0; i < item.length; i++) {
            materiasPiker.push(createData(item[i]));
        }
        return materiasPiker
    }
    cambiarMaterias(materias, materiaVieja, materiaNueva) {
        if(this.state.flag == 0){
            if (this.validarCambiarMateria(materias, materiaNueva)) {
                for (var i = 0; i < materias.length; i++) {
                    if (materias[i].id_materia == materiaVieja.id_materia) {
                        materias[i] = this.traerMateria(materiaNueva)
                    }
                }
                this.setState({ nuevasMaterias: materias })
            }
            else{
                this.setState({flag: 1})
            }
        }
        else{
            this.setState({flag: 0})
        }
        
    }
    validarCambiarMateria(materias, materiaNueva) {
        if (materiaNueva != 0) {
            var i = 0
            while (i < materias.length) {
                if (materias[i].id_materia == materiaNueva) {
                    alert("No puede agregar esta opcion como materia, porque ya existe.")
                    return false
                }
                i++;
            }
            return true
        }
        else {
            alert("No se puede seleccionar la opcion de default")
            return false
        }
    }
    traerMateria(id_materiaNueva) {
        var contador = 0
        while (contador < this.state.materiasBase.length) {
            if (this.state.materiasBase[contador].id_materia == id_materiaNueva) {
                return this.state.materiasBase[contador]
            }
            contador++
        }
    }

    render() {

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
                        <View style={styles.statsContainer}>
                        </View>
                        {/*/////////////////////////////////////////////////////////////////////////// */}
                        {this.state.usuario.esProfesor ?
                            <View style={styles.bottomBox}>
                                <Text style={[styles.text, { fontSize: 20 }]}>Ubicación de Clases</Text>

                                <View style={[{ flexDirection: 'row' }]}>
                                    {this.state.dondeClasesBase.map((item) => (
                                        <View style={[{ padding: 10, marginHorizontal: 10, marginTop: 10, alignItems: "center", borderRadius: 10 }]} key={item.id_dondeClases}>
                                            {this.queDondeClase(item.id_dondeClases)}
                                            <Text style={[styles.text, styles.subText]}>{item.des_dondeClases}</Text>
                                            <View style={[styles.checkBoxContainer, this.isCheckDondeClasesPosition(item.id_dondeClases)]}>
                                                <TouchableOpacity style={styles.checkBox} onPress={() => this.abmDondeClases(this.state.nuevasDondeClases, item)}/>
                                                {this.isCheckDondeClases(item.id_dondeClases, item)}
                                            </View>
                                        </View>
                                    ))}
                                </View>
                            </View> : <View></View>}

                        {this.state.usuario.esProfesor ?
                            <View style={styles.bottomBox}>
                                <Text style={[styles.text, { fontSize: 20 }]}>Tipo de Clases</Text>

                                <View style={[{ flexDirection: 'row' }]}>
                                    {this.state.tipoClasesBase.map((item) => (
                                        <View style={[{ padding: 10, marginHorizontal: 10, alignItems: "center", borderRadius: 10 }]} key={item.id_tipoClases}>
                                            {this.queTipoClase(item.id_tipoClases)}
                                            <Text style={[styles.text, styles.subText]}>{item.des_tipoClases}</Text>
                                            <View style={[styles.checkBoxContainer, this.isCheckTipoClasesPosition(item.id_tipoClases)]}>
                                                <TouchableOpacity style={[styles.checkBox]} onPress={() => this.abmTipoClases(this.state.nuevasTipoClases, item)}/>
                                                {this.isCheckTipoClases(item.id_tipoClases, item)}
                                            </View>
                                        </View>
                                    ))}
                                </View>
                            </View> : <View></View>}

                        {this.state.usuario.esProfesor ?
                            <View style={styles.pikerViewContainer}>
                                <View style={[{ flexDirection: 'row', justifyContent: "center", alignItems: 'center' }]}>
                                    <Text style={[styles.text, { fontSize: 20, textAlign: 'center' }]}>Materias</Text>
                                    <TouchableOpacity style={styles.bubblePlus} onPress={() => this.agregarMateria(this.state.nuevasMaterias)}>
                                        <FontAwesome name={"plus"} size={hp(2.5)} color="white"></FontAwesome>
                                    </TouchableOpacity>
                                </View>

                                {this.state.nuevasMaterias.map((item, index) => (
                                    <View style={[styles.pikerContainer, this.marginSize(index)]} key={item.id_materia}>
                                        <RNPickerSelect
                                            useNativeAndroidPickerStyle={false}
                                            placeholder={{
                                                label: "Materia",
                                                value: 0
                                            }}
                                            placeholderTextColor="black"
                                            style={{
                                                inputIOS: styles.iosPiker,
                                                inputAndroid: styles.androidPiker
                                            }}
                                            value={item.id_materia}
                                            onValueChange={(value) => this.cambiarMaterias(this.state.nuevasMaterias, item, value)}
                                            items={this.materiasPiker(this.state.materiasBase)}
                                        />
                                        <TouchableOpacity style={styles.bubbleCross} onPress={() => this.sacarMateria(this.state.nuevasMaterias, item)}>
                                            <Entypo name={"cross"} size={hp(2.5)} color="white"></Entypo>
                                        </TouchableOpacity>
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
    checkBoxContainer: {
        marginTop: hp(2.2),
        justifyContent: "center",
        alignItems: 'center'
    },
    checkBox: {
        height: hp(2.5),
        width: hp(2.5),
        backgroundColor: "white",
        shadowColor: '#00000045',
        shadowOffset: {
            width: 0.05,
            height: 0.55,
        },
        shadowOpacity: 2,
        elevation: 29,
        position: 'absolute'
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
        height: hp(4)
    },
    statsBoxHearts: {
        flex: 1,
        alignSelf: "stretch",
        borderColor: "#DFD8C8",
        borderRightWidth: 1,
        alignItems: 'center'
    },
    //Heart
    //Piker
    pikerViewContainer: {
        borderColor: "#DFD8C8",
        paddingTop: hp(2.2),
        marginHorizontal: wp(8),
        justifyContent: "center",
        alignItems: "center",
        shadowColor: '#00000045',
        shadowOffset: {
            width: 0.01,
            height: 0.25,
        },
        shadowOpacity: 2,
        shadowRadius: 8,
        elevation: 2
    },
    pikerContainer: {
        backgroundColor: 'white',
        width: wp("66"),
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 10
    },
    iosPiker: {
        backgroundColor: 'white',
        borderRadius: 10,
        width: wp("53"),
        height: hp("5.5"),
        alignItems: 'center',
        fontSize: wp(3.5),
        color: "black",
        textAlign: 'center'
    },
    androidPiker: {
        backgroundColor: 'red',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        width: wp("30"),
        height: hp("5.5"),
        alignSelf: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: wp(2),
        color: "black",
        textAlign: 'center'
    },
    //Piker
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

    titleClasesImparte: {
        fontSize: 24,
        textAlign: 'center',
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
    bubblePlus: {
        width: hp(4.4),
        height: hp(4.4),
        marginLeft: wp(2.5),
        borderRadius: 100,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#F28C0F",
        shadowColor: '#00000035',
        shadowOffset: {
            width: 0.01,
            height: 0.25,
        },
        shadowOpacity: 2,
        shadowRadius: 0,
        elevation: 2
    },
    bubbleCross: {
        width: hp(3.5),
        height: hp(3.5),
        marginLeft: wp(2.5),
        borderRadius: 100,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#F28C0F",
        shadowColor: '#00000035',
        shadowOffset: {
            width: 0.01,
            height: 0.25,
        },
        shadowOpacity: 2,
        shadowRadius: 0,
        elevation: 2
    }
});
export default withNavigation(PerfilEdit);