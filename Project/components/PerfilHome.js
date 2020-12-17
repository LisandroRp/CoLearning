import React from "react";
import {
    StyleSheet,
    Text,
    View,
    StatusBar,
    RefreshControl,
    Image,
    Modal,
    ScrollView,
    Keyboard,
    FlatList,
    ActivityIndicator,
    TouchableOpacity,
    TextInput
} from "react-native";
import { FontAwesome, FontAwesome5, Ionicons, AntDesign, Fontisto, MaterialCommunityIcons } from '@expo/vector-icons';
import DropDownItem from 'react-native-drop-down-item';
import RNPickerSelect from 'react-native-picker-select';
import { withNavigation } from 'react-navigation';

import ApiController from "../controller/ApiController";
import ExportadorLogos from './exportadores/ExportadorLogos'
import ExportadorObjetos from './exportadores/ExportadorObjetos'
import ExportadorContacto from './exportadores/ExportadorContacto'

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

function createData(item) {
    return {
        key: item.id_moneda,
        label: item.des_moneda,
        value: item.id_moneda
    };
}
function createNuevaMoney(item, monto) {
    return {
        codigo: item.codigo,
        des_moneda: item.des_moneda,
        id_moneda: item.id_moneda,
        monto: monto
    };
}

class PerfilHome extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            isLoadingMonedas: true,
            isRefreshing: false,
            modalVisible: false,
            max_rating: 5,
            usuario: {},
            nuevaMoney: {},
            nuevaMoneda: "",
            nuevoMonto: "",
            monedasBase: []
        };
        this.Star = ExportadorLogos.traerEstrellaLlena();
        this.Star_With_Border = ExportadorLogos.traerEstrellaBorde();
    }
    componentDidMount = async () => {
        ApiController.getUsuarioById((await this.props.navigation.getParam("id_usuario")) ? await this.props.navigation.getParam("id_usuario") : this.props.id_usuario, this.okUsuario.bind(this))
        ApiController.getMonedas(this.okMonedas.bind(this))
    }
    okMonedas(monedas){
        this.setState({monedasBase: monedas, isLoadingMonedas: false})
    }
    okUsuario(usuario) {
        console.log(usuario)
        if (usuario.esProfesor) {
            ApiController.getDondeClasesProfesor(ExportadorObjetos.createUsuario(usuario), this.okDondeClases.bind(this))
        }
        else {
            usuario.src = ExportadorObjetos.profileImage(usuario.id_usuario)
            this.setState({ usuario: usuario, isLoading: false })
        }
    }
    okDondeClases(usuario, dondeClases) {
        usuario.dondeClases = dondeClases
        ApiController.getTipoClasesProfesor(usuario, this.okTipoClases.bind(this))
    }
    okTipoClases(usuario, tipoClases) {
        usuario.tipoClases = tipoClases
        ApiController.getMateriasProfesor(usuario, this.okMateriasProfesor.bind(this))

    }
    okMateriasProfesor(usuario, materias) {
        usuario.materias = materias
        this.setState({
            usuario: usuario,
            nuevaMoney: usuario.money,
            nuevaMoneda: usuario.money.id_moneda,
            nuevoMonto: usuario.money.monto,
            isLoading: false
        })
    }

    vote(i) {
        var usuarioUpdate = this.state.usuario
        usuarioUpdate.rating = i
        this.setState({ usuario: usuarioUpdate })
    }
    //************************ */
    //Contacto
    //************************ */
    contactoList() {
        var contactoList = []

        if (this.state.usuario.instagram != "" && this.state.usuario.instagram) {
            contactoList.push({ id_contacto: 0, des_contacto: this.state.usuario.instagram })
        }
        if (this.state.usuario.telefono != "" && this.state.usuario.telefono) {
            contactoList.push({ id_contacto: 1, des_contacto: this.state.usuario.telefono })
        }
        if (this.state.usuario.email != "" && this.state.usuario.email) {
            contactoList.push({ id_contacto: 2, des_contacto: this.state.usuario.email })
        }
        if (this.state.usuario.whatsApp != "" && this.state.usuario.whatsApp) {
            contactoList.push({ id_contacto: 3, des_contacto: this.state.usuario.whatsApp })
        }
        return contactoList
    }
    //************************ */
    //Contacto
    //************************ */
    queDondeClase(id_usuario) {
        switch (id_usuario) {

            case 1:

                return <FontAwesome5 style={[{ marginBottom: 10, flex: 1 }]} name={"home"} size={hp(3.3)} color='#F28C0F' />;
            case 2:

                return <FontAwesome style={[{ marginBottom: 10, flex: 1 }]} name={"car"} size={hp(3.3)} color='#F28C0F' />;
            case 3:

                return <FontAwesome5 style={[{ marginBottom: 10, flex: 1 }]} name={"school"} size={hp(3.3)} color='#F28C0F' />;
            default:

                return <View></View>;
        }
    }
    queTipoClase(id_usuario) {
        switch (id_usuario) {

            case 1:

                return <FontAwesome style={[{ marginBottom: 10, flex: 1 }]} name={"user"} size={hp(4)} color='#F28C0F' />;
            case 2:

                return <FontAwesome style={[{ marginBottom: 10, flex: 1 }]} name={"group"} size={hp(4)} color='#F28C0F' />;
            case 3:

                return <Ionicons style={[{ marginBottom: 10, flex: 1 }]} name={"ios-tv"} size={hp(4)} color='#F28C0F' />;
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

    okChat(chat) {
        if (chat == null || chat.length == 0) {
            ApiController.postCrearChat(this.props.id_usuario, this.state.usuario.id_usuario, this.okChatCreado.bind(this))
        }
        else {
            this.props.onPressGoChat(chat[0].id_chat, this.state.usuario.id_usuario, this.state.usuario.nombre_usuario + " " + this.state.usuario.apellido)
        }
    }
    okChatCreado(chat) {
        this.props.onPressGoChat(chat.insertId, this.state.usuario.id_usuario,  this.state.usuario.nombre_usuario + " " + this.state.usuario.apellido)
    }
    moneyPikerList(item) {
        var moneyPiker = []
        for (var i = 0; i < item.length; i++) {
            moneyPiker.push(createData(item[i]));
        }
        return moneyPiker
    }
    addNewMoney() {
        if(this.state.nuevaMoneda != 0 && this.state.nuevaMoneda != null){
            var nuevaMoneda = this.buscarMoneda()
            ApiController.getCurrency(this.state.nuevaMoney.codigo, nuevaMoneda, this.okCurrency.bind(this))
        }
        else{
            alert("Debe seleccionarse un tipo de moneda")
        }
    }
    okCurrency(nuevaMoneda, nuevoMonto){

        this.setState({ 
            nuevoMonto: (Object.values(nuevoMonto)[0] * this.state.nuevoMonto).toFixed(2),
            nuevaMoneda: nuevaMoneda.id_moneda,
            nuevaMoney: createNuevaMoney(nuevaMoneda, (Object.values(nuevoMonto)[0] * this.state.nuevoMonto).toFixed(2)),
            modalVisible: false
        })
    }
    buscarMoneda() {
        var contador = 0;
        while (contador < this.state.monedasBase.length) {
            if (this.state.monedasBase[contador].id_moneda == this.state.nuevaMoneda) {
                return this.state.monedasBase[contador]
            }
            contador++;
        }
    }
    render() {
        var aux = -1
        let React_Native_Rating_Bar = [];

        for (var i = 1; i <= this.state.max_rating; i++) {
            aux++
            React_Native_Rating_Bar.push(
                <View
                    key={i}
                >
                    {i <= this.state.usuario.rating
                        ? <Image style={styles.starImage} source={ExportadorLogos.traerEstrellaLlena()}></Image>
                        : this.state.usuario.rating > (aux)
                            ? (this.state.usuario.rating % parseInt(this.state.usuario.rating)) >= 0.75
                                ? (<Image style={styles.starImage} source={ExportadorLogos.traerEstrellaMucho()} />)
                                : (this.state.usuario.rating % parseInt(this.state.usuario.rating)) <= 0.25
                                    ? (<Image style={styles.starImage} source={ExportadorLogos.traerEstrellaPoco()} />)
                                    : (<Image style={styles.starImage} source={ExportadorLogos.traerEstrellaHalf()} />)
                            : (<Image style={styles.starImage} source={ExportadorLogos.traerEstrellaBorde()} />)
                    }
                </View>
            );
        }
        if (this.state.isLoading || this.state.isLoadingMonedas) {
            return (
                <View style={styles.container}>
                    <StatusBar barStyle="black" backgroundColor="white" />
                    <ActivityIndicator size="large" color="#F28C0F" backgroundColor=' #616161' style={{ flex: 1 }}></ActivityIndicator>
                </View>
            );
        }
        else {
            return (
                <View style={styles.container}>
                    <ScrollView showsVerticalScrollIndicator={false} 
                    refreshControl={
                        <RefreshControl refreshing={this.state.isRefreshing} onRefresh={() => {this.setState({isLoading: true}), ApiController.getUsuarioById(this.state.usuario.id_usuario, this.okUsuario.bind(this))}} />
                    }>
                        <View>
                            <View style={{ alignSelf: "center" }}>
                                <View style={[styles.profileImage, { backgroundColor: (this.state.usuario.src == null ? "#F28C0F" : "transparent") }]}>
                                    {this.state.usuario.src == null ?
                                        <Text style={{ fontSize: wp(25), textAlign: "center", color: 'white', alignContent: 'center' }}>
                                            {this.state.usuario.nombre_usuario.slice(0, 1).toUpperCase()}{this.state.usuario.apellido.slice(0, 1).toUpperCase()}
                                        </Text>
                                        :
                                        <Image source={this.state.usuario.src} style={styles.image} resizeMode="contain"></Image>
                                    }

                                </View>
                            </View>

                            <View style={styles.infoContainer}>
                                <Text numberOfLines={2} style={[styles.text, { fontSize: wp(6.6), textAlign: "center", fontWeight: 'bold', color: '#F28C0F' }]}>{this.state.usuario.nombre_usuario} {this.state.usuario.apellido}</Text>
                                <Text numberOfLines={1} style={[styles.text, { color: "#AEB5BC", fontSize: wp(3.3) }]}>{this.state.usuario.domicilio}</Text>
                            </View>
                            {
                                this.state.usuario.esProfesor ?
                                    <TouchableOpacity style={[styles.moneyView, styles.shadowMoney]} onPress={() => this.setState({modalVisible: true})}>
                                        <Text style={styles.moneyText}>{this.state.usuario.money.des_moneda ? this.state.nuevaMoney.des_moneda : "$"}</Text>
                                        <Text style={styles.moneyText}>{this.state.usuario.money.monto ? this.state.nuevoMonto : 0}</Text>
                                        <Text style={styles.moneyText2}>/h</Text>
                                    </TouchableOpacity>
                                    :
                                    <View />
                            }
                        </View>

                        <View style={styles.statsContainer}>
                            {
                                this.state.usuario.esProfesor ?
                                    <View style={[styles.statsBoxStar]}>
                                        <View style={styles.starView}>
                                            {React_Native_Rating_Bar}
                                        </View>
                                        <View style={{ flexDirection: 'row' }}>
                                            {/* <Text style={[styles.text, styles.subText]}>rating: {this.state.usuario.rating}</Text> */}
                                            <Text style={[styles.text, styles.subText]}>Votos: {this.state.usuario.votos}</Text>
                                        </View>
                                    </View> :
                                    <View />
                            }
                            <View style={[styles.statsBoxForo]}>
                                <View style={{ flexDirection: 'row' }}>
                                    <FontAwesome style={[{ flex: 0.5, textAlign: 'right', marginRight: wp(5) }]} name={"thumbs-up"} size={hp(3)} color="#5EC43A" />
                                    {this.state.usuario.res_buenas ?
                                        <Text numberOfLines={1} style={[styles.text, { fontSize: wp(5), flex: 0.5 }]}>{this.state.usuario.res_buenas}</Text>
                                        :
                                        <Text numberOfLines={1} style={[styles.text, { fontSize: wp(5), flex: 0.5 }]}>0</Text>
                                    }
                                </View>
                                <View style={{ flexDirection: 'row' }}>
                                    <FontAwesome style={[{ flex: 0.5, textAlign: 'right', marginRight: wp(5) }]} name={"check"} size={hp(3)} color="#5EC43A" />
                                    {this.state.usuario.res_mejores ?
                                        <Text numberOfLines={1} style={[styles.text, { fontSize: wp(5), flex: 0.5 }]}>{this.state.usuario.res_mejores}</Text>
                                        :
                                        <Text numberOfLines={1} style={[styles.text, { fontSize: wp(5), flex: 0.5 }]}>0</Text>
                                    }
                                </View>
                                {this.state.usuario.res_cantidad ?
                                    <Text style={[styles.text, styles.subText, { marginTop: hp(1) }]}>Respuestas Foro: {this.state.usuario.res_cantidad}</Text>
                                    :
                                    <Text style={[styles.text, styles.subText, { marginTop: hp(1) }]}>Respuestas Foro: 0</Text>
                                }
                            </View>
                        </View>
                        {/*/////////////////////////////////////////////////////////////////////////// */}
                        {this.state.usuario.esProfesor ?
                            <View>
                                <View style={styles.bottomBox}>
                                    <Text style={[styles.text, { fontSize: wp(4.8), alignSelf: "center" }]}>Ubicación de Clases</Text>

                                    <View style={[{ flexDirection: 'row' }]}>
                                        {this.state.usuario.dondeClases.length != 0 ?
                                            this.state.usuario.dondeClases.map((item) => (
                                                <View style={[{ padding: 10, marginTop: 10, flex: 1, alignItems: "center", borderRadius: 10 }]} key={item.id_dondeClases}>
                                                    {this.queDondeClase(item.id_dondeClases)}
                                                    <Text numberOfLines={1} style={[styles.text, styles.subText]}>{item.des_dondeClases}</Text>
                                                </View>
                                            ))
                                            :
                                            <View style={[{ padding: 10, marginTop: 10, flex: 1, alignItems: "center", borderRadius: 10 }]}>
                                                <Text>No se han cargado la ubicación de las clases</Text>
                                            </View>
                                        }
                                    </View>
                                </View>

                                <View style={styles.bottomBox}>
                                    <Text style={[styles.text, { fontSize: wp(4.8), alignSelf: "center" }]}>Tipo de Clases</Text>

                                    <View style={[{ flexDirection: 'row' }]}>
                                        {this.state.usuario.tipoClases.length != 0 ?
                                            this.state.usuario.tipoClases.map((item) => (
                                                <View style={[{ padding: 10, flex: 1, marginTop: 10, alignItems: "center", borderRadius: 10 }]} key={item.id_tipoClases}>
                                                    {this.queTipoClase(item.id_tipoClases)}
                                                    <Text numberOfLines={1} style={[styles.text, styles.subText]}>{item.des_tipoClases}</Text>
                                                </View>
                                            ))
                                            :
                                            <View style={[{ padding: 10, marginTop: 10, flex: 1, alignItems: "center", borderRadius: 10 }]}>
                                                <Text>No se han cargado el tipo de las clases</Text>
                                            </View>
                                        }
                                    </View>
                                </View>

                                <View style={styles.dropDownViewContainer}>
                                    <Text style={[styles.text, { fontSize: wp(4.8), textAlign: 'center' }]}>Materias</Text>
                                    {this.state.usuario.materias.length != 0 ?
                                        this.state.usuario.materias.map((item, index) => (
                                            <View style={[styles.dropDownContainer, this.marginSize(index)]} key={item.nombre_materia}>
                                                <DropDownItem contentVisible={false}
                                                    header={
                                                        <View style={styles.backgroundTitulo}>
                                                            <Text style={styles.titulo}>{item.nombre_materia}</Text>
                                                            <View style={{ position: 'absolute', right: 0 }}>
                                                                <AntDesign style={{ textAlign: 'center', marginRight: wp(3.3) }} name={"caretdown"} size={wp(3.3)} color="white" />
                                                            </View>
                                                        </View>
                                                    }
                                                >

                                                    <Text style={styles.descripcion}>{item.des_materia}</Text>
                                                </DropDownItem>
                                            </View>
                                        )
                                        )
                                        :
                                        <View style={[{ padding: 10, margin: 10, flex: 1, alignItems: "center", borderRadius: 10 }]}>
                                            <Text>No se han agregado materias</Text>
                                        </View>
                                    }
                                </View>
                            </View>
                            /////////////
                            :
                            /////////////    
                            (this.contactoList().length != 0 ?
                                <View style={styles.bottomBox}>
                                    <Text style={[styles.text, { fontSize: wp(4.8), alignSelf: "center" }]}>Contacto</Text>
                                    <FlatList
                                        data={this.contactoList()}
                                        numColumns={2}
                                        initialNumToRender={50}
                                        keyExtractor={(item) => {
                                            return item.id_contacto.toString();
                                        }}
                                        renderItem={({ item }) => {
                                            return (
                                                ExportadorContacto.contacto(item)
                                            )
                                        }
                                        } />
                                </View>
                                :
                                <View />
                            )
                        }

                    </ScrollView>
                    {(this.props.navigation.getParam("id_usuario") && this.props.navigation.getParam("id_usuario") != this.props.id_usuario) ?
                        <TouchableOpacity style={[styles.dm]} onPress={() => ApiController.getExisteChat(this.props.id_usuario, this.state.usuario.id_usuario, this.okChat.bind(this))}>
                            <FontAwesome name="comments" size={hp(3)} color={"white"} />
                        </TouchableOpacity>
                        :
                        <View />
                    }

                    <Modal
                        animationType="fade"
                        visible={this.state.modalVisible}
                        transparent={true}
                        onRequestClose={() => this.setState({ modalVisible: false })}  >
                        <TouchableOpacity style={[styles.modalContainer, styles.shadow]} activeOpacity={1} onPress={Keyboard.dismiss}>

                            <View style={styles.modal}>
                                <View style={[{ flexDirection: "row", justifyContent: 'space-between' }]}>
                                    <RNPickerSelect
                                        useNativeAndroidPickerStyle={false}
                                        placeholder={{
                                            label: "$$",
                                            value: 0
                                        }}
                                        placeholderTextColor="black"
                                        style={{
                                            inputIOS: [styles.inputMoney, styles.shadowLight],
                                            inputAndroid: [styles.inputMoney, styles.shadowLight]
                                        }}
                                        value={this.state.nuevaMoneda}
                                        onValueChange={(id_monedaNueva) => this.setState({ nuevaMoneda: id_monedaNueva })}
                                        items={this.moneyPikerList(this.state.monedasBase)}
                                    />
                                </View>
                                <View style={[{ flexDirection: "row" }]}>
                                    <TouchableOpacity style={[styles.buttonContainerModalMoney]}
                                        onPress={() => this.addNewMoney()}>
                                        <Text style={styles.loginText}>Aceptar</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </TouchableOpacity>
                    </Modal>
                </View>
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
        fontSize: wp(3),
        textAlign: "center",
        color: "#AEB5BC",
        textTransform: "uppercase",
        fontWeight: "500",
        flex: 1
    },
    profileImage: {
        width: wp(50),
        height: wp(50),
        borderRadius: 100,
        marginTop: hp(5),
        justifyContent: "center",
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
        width: hp(6.6),
        height: hp(6.6),
        marginRight: wp(5.5),
        marginBottom: hp(3),
        borderRadius: 100,
        alignItems: "center",
        justifyContent: "center",
        shadowColor: '#00000025',
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
        width: wp(7.7),
        height: wp(7.7)
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
    dropDownContainer: {
        backgroundColor: 'white',
        borderRadius: 10
    },
    backgroundTitulo: {
        backgroundColor: '#F28C0F',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: "center",
        paddingHorizontal: wp("2"),
        paddingVertical: hp(1.5)
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
    socialMediaContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: hp(2.2),
        marginBottom: hp(2.2),
    },
    socialMedia: {
        color: 'black',
        textAlign: "center",
        textDecorationLine: 'underline',
    },
    //SHADOW
    shadow: {
        shadowColor: '#00000045',
        shadowOffset: {
            width: 0.01,
            height: 0.25,
        },
        shadowOpacity: 2,
        shadowRadius: 8,
        elevation: 2
    },
    shadowLight: {
        shadowColor: "#808080",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5
    },
    //SHADOW
    //MODAL
    /*************************************** */
    modalContainer: {
        flex: 1,
        justifyContent: "center"
    },
    modal: {
        flex: 1,
        marginVertical: hp(42),
        marginHorizontal: wp(25),
        padding: hp(2),
        alignSelf: "center",
        backgroundColor: '#FFF7EE',
        borderRadius: 22,
        opacity: .95,
        alignItems: "center"
    },
    inputMoney: {
        borderBottomColor: '#F5FCFF',
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        borderBottomWidth: 1,
        fontSize: wp(3.5),
        marginHorizontal: wp(2),
        height: hp(5),
        paddingHorizontal: hp(2.2),
        flexDirection: 'column',
        textAlign: 'center'
    },
    inputMonto: {
        borderBottomColor: '#F5FCFF',
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        borderBottomWidth: 1,
        flex: 1,
        marginHorizontal: wp(2),
        fontSize: wp(3.5),
        height: hp(5),
        paddingHorizontal: hp(2.2),
        flexDirection: 'column',
        textAlign: 'center'
    },
    buttonContainerModalMoney: {
        paddingVertical: hp(1.5),
        marginTop: hp(2),
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        paddingHorizontal: wp(3.3),
        backgroundColor: "#F28C0F"
    },
    loginText: {
        fontSize: wp(3.3),
        color: 'white'
    }
    //MODAL
});
export default withNavigation(PerfilHome);