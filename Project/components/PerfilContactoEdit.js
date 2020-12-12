import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    ActivityIndicator,
    Text,
    TextInput,
    Dimensions,
    Keyboard,
    TouchableOpacity,
    StatusBar,
    TouchableWithoutFeedback,
    FlatList,
    Animated,
    KeyboardAvoidingView
} from 'react-native';
import { withNavigation } from 'react-navigation';
import { FontAwesome, Feather, Fontisto, MaterialCommunityIcons, Entypo } from '@expo/vector-icons';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

import ApiController from "../controller/ApiController";
import ExportadorLogos from './exportadores/ExportadorLogos'
import ExportadorObjetos from './exportadores/ExportadorObjetos'

var { height, width } = Dimensions.get('window');

class UserContactoEdit extends Component {

    constructor(props) {
        super(props);
        this.state = {
            perfil: {},
            isLoading: true,
            cambiosHorarios: false,
            cambiosContacto: false,
            usuario: {
                id_usuario: 1,
                esProfesor: true,
                dondeClases: [{ id_dondeClases: 1, des_dondeClases: "En su casa" },
                { id_dondeClases: 2, des_dondeClases: "A Domicilio" },
                { id_dondeClases: 3, des_dondeClases: "Instituto" }],
                tipoClases: [{ id_tipoClases: 1, des_tipoClases: "Particulares" },
                { id_tipoClases: 2, des_tipoClases: "Grupales" },
                { id_tipoClases: 3, des_tipoClases: "Virtuales" }],
                instagram: "",
                telefono: "",
                email: "",
                whatsApp: "",
                instagram: "juanmarinelli",
                telefono: "1144373492",
                email: "1144373492",
                whatsApp: "1144373492",
                horarios: [{ dia: 1, turno: 1 }]
            },
            nuevoContacto: [],
            nuevosHorarios: [],
            dias: ["L", "Ma", "Mi", "J", "V", "S", "D"],
            turnos: ["Mañana", "Tarde", "Noche"],
            endValue: 1,
            duration: 500,
            startValueContactBar: new Animated.Value(0),
            endValueContactBar: -hp(15),
            durationContactBar: 500,
        };
        this.Star = ExportadorLogos.traerEstrellaLlena();
        this.Star_With_Border = ExportadorLogos.traerEstrellaBorde();
    }
    componentDidMount() {
        ApiController.getUsuarioById(this.props.id_usuario, this.okUsuario.bind(this))
    }
    okUsuario(usuario) {
        ApiController.getHorarios(ExportadorObjetos.createUsuario(usuario), this.okHorarios.bind(this))
    }
    okHorarios(usuario, horarios) {
        usuario.horarios = horarios
        this.setState({
            usuario: usuario,
            nuevoContacto: this.contactoList(usuario),
            nuevosHorarios: usuario.horarios,
            isLoading: false
        })
    }

    addBorderSize(index) {
        if (index < this.state.dias.length) {
            return { borderRightWidth: 1 }
        }
    }
    animateContactBar() {
        if (this.state.cambiosContacto || this.state.cambiosHorarios) {
            this.setState({ animationStyle: true })
            if (this.state.nuevoContacto.length > 2) {
                Animated.timing(this.state.startValueContactBar, {
                    toValue: this.state.endValueContactBar,
                    duration: this.state.durationContactBar,
                    useNativeDriver: true,
                }).start();
            }
            if (this.state.nuevoContacto.length > 0 && this.state.nuevoContacto.length < 3) {
                Animated.timing(this.state.startValueContactBar, {
                    toValue: this.state.endValueContactBar,
                    duration: this.state.durationContactBar,
                    useNativeDriver: true,
                }).start();
            }
            if (this.state.nuevoContacto.length < 1) {
                Animated.timing(this.state.startValueContactBar, {
                    toValue: this.state.endValueContactBar,
                    duration: this.state.durationContactBar,
                    useNativeDriver: true,
                }).start();
            }
        }
        else {
            this.setState({ animationStyle: true })
            Animated.timing(this.state.startValueContactBar, {
                toValue: this.state.endValueContactBar,
                duration: this.state.durationContactBar,
                useNativeDriver: true,
            }).start();
        }
    }
    desAnimateContactBar(id_contacto) {
        Animated.timing(this.state.startValueContactBar, {
            toValue: -hp(10),
            duration: this.state.durationContactBar,
            useNativeDriver: true,
        }).start();
        if (id_contacto == false) {
            setTimeout(() => this.setState({ animationStyle: false }), 500)
        }
        else {
            setTimeout(() => this.setState({ animationStyle: false, nuevoContacto: this.agregarContacto(id_contacto) }), 500)
        }
    }
    //************************ */
    //Contacto
    //************************ */
    contactoList(usuario) {
        var contactoList = []

        if (usuario.instagram != "" && usuario.instagram) {
            contactoList.push({ id_contacto: 0, des_contacto: usuario.instagram })
        }
        if (usuario.telefono != "" && usuario.telefono) {
            contactoList.push({ id_contacto: 1, des_contacto: usuario.telefono })
        }
        if (usuario.email != "" && usuario.email) {
            contactoList.push({ id_contacto: 2, des_contacto: usuario.email })
        }
        if (usuario.whatsApp != "" && usuario.whatsApp) {
            contactoList.push({ id_contacto: 3, des_contacto: usuario.whatsApp })
        }
        return contactoList
    }
    cambiarContacto(index, des_contacto) {
        var contactoNuevo = this.state.nuevoContacto
        contactoNuevo[index].des_contacto = des_contacto
        this.setState({ nuevoContacto: contactoNuevo, cambiosContacto: true })
    }
    sacarContacto(index) {
        var contactoNuevo = this.state.nuevoContacto
        contactoNuevo.splice(index, 1)
        this.setState({ nuevoContacto: contactoNuevo, cambiosContacto: true })
    }
    contactoEdit(index, item) {

        switch (item.id_contacto) {

            case 0:

                return (
                    <View style={[{ flex: 1 }]}>
                        <View style={styles.socialMediaContainer}>
                            <TouchableOpacity style={[{ marginRight: wp(11) }]} onPress={() => this.sacarContacto(index)}>
                                <Entypo name={"cross"} size={hp(2.2)} color="#E76921"></Entypo>
                            </TouchableOpacity>
                            {/* <Image style={styles.logoSocialMediaImage} source={ExportadorLogos.traerInstagram()} /> */}
                            <View style={styles.logoSocialMedia}>
                                <Fontisto style={{ textAlign: "center", paddingBottom: hp(1.5) }} name={"instagram"} size={hp(2.5)} color='#F28C0F' />
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={styles.arroba}>@</Text>
                                <TextInput style={styles.socialMedia} onChangeText={(value) => this.cambiarContacto(index, value)} ref={(input) => { this.instagram = input }}>{item.des_contacto}</TextInput>
                                <TouchableOpacity style={styles.pencilButton} onPress={() => this.instagram.focus()}>
                                    <FontAwesome style={{ textAlign: 'center' }} name={"pencil"} size={wp(4)} color="black" />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                )

            case 1:

                return (
                    <View style={[{ flex: 1 }]}>
                        <View style={styles.socialMediaContainer}>
                            <TouchableOpacity style={[{ marginRight: wp(11) }]} onPress={() => this.sacarContacto(index)}>
                                <Entypo name={"cross"} size={hp(2.2)} color="#E76921"></Entypo>
                            </TouchableOpacity>
                            <View style={styles.logoSocialMedia}>
                                <Feather style={{ textAlign: "center", paddingBottom: hp(1.5) }} name={"phone"} size={hp(2.5)} color='#F28C0F' />
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <TextInput style={styles.socialMedia} keyboardType={'numeric'} onChangeText={(value) => this.cambiarContacto(index, value)} ref={(input) => { this.telefono = input }}>{item.des_contacto}</TextInput>
                                <TouchableOpacity style={styles.pencilButton} onPress={() => this.telefono.focus()}>
                                    <FontAwesome style={{ textAlign: 'center' }} name={"pencil"} size={wp(4)} color="black" />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                )

            case 2:
                return (
                    <View style={[{ flex: 1 }]}>
                        <View style={styles.socialMediaContainer}>
                            <TouchableOpacity style={[{ marginRight: wp(11) }]} onPress={() => this.sacarContacto(index)}>
                                <Entypo name={"cross"} size={hp(2.2)} color="#E76921"></Entypo>
                            </TouchableOpacity>
                            <View style={styles.logoSocialMedia}>
                                <MaterialCommunityIcons style={{ textAlign: "center", paddingBottom: hp(1.2) }} name={"email-outline"} size={hp(2.5)} color='#F28C0F' />
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <TextInput style={styles.socialMedia} onChangeText={(value) => this.cambiarContacto(index, value)} ref={(input) => { this.email = input }}>{item.des_contacto}</TextInput>
                                <TouchableOpacity style={styles.pencilButton} onPress={() => this.email.focus()}>
                                    <FontAwesome style={{ textAlign: 'center' }} name={"pencil"} size={wp(4)} color="black" />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                )

            case 3:
                return (
                    <View style={[{ flex: 1 }]}>
                        <View style={styles.socialMediaContainer}>
                            <TouchableOpacity style={[{ marginRight: wp(11) }]} onPress={() => this.sacarContacto(index)}>
                                <Entypo name={"cross"} size={hp(2.2)} color="#E76921"></Entypo>
                            </TouchableOpacity>
                            <View style={styles.logoSocialMedia}>
                                <Fontisto style={{ textAlign: "center", paddingBottom: hp(1.5) }} name={"whatsapp"} size={hp(2.5)} color='#F28C0F' />
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <TextInput style={styles.socialMedia} keyboardType={'numeric'} onChangeText={(value) => this.cambiarContacto(index, value)} ref={(input) => { this.whatsApp = input }}>{item.des_contacto}</TextInput>
                                <TouchableOpacity style={styles.pencilButton} onPress={() => this.whatsApp.focus()}>
                                    <FontAwesome style={{ textAlign: 'center' }} name={"pencil"} size={wp(4)} color="black" />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                )
        }
    }
    agregarContacto(id_contacto) {
        var contactoList = this.state.nuevoContacto

        var flag = false
        for (var i = 0; i < contactoList.length; i++) {
            if (contactoList[i].id_contacto == (id_contacto - 1)) {
                flag = true
            }
        }
        if (id_contacto == 1) {
            if (flag) {
                alert("Instagram ya está en la lista")
                return contactoList
            }
            contactoList.push({ id_contacto: 0, des_contacto: this.state.usuario.instagram })
            return contactoList
        }
        if (id_contacto == 2) {
            if (flag) {
                alert("Telefono ya está en la lista")
                return contactoList
            }
            contactoList.push({ id_contacto: 1, des_contacto: this.state.usuario.telefono })
            return contactoList
        }
        if (id_contacto == 3) {
            if (flag) {
                alert("Email ya está en la lista")
                return contactoList
            }
            contactoList.push({ id_contacto: 2, des_contacto: this.state.usuario.email })
            return contactoList
        }
        if (id_contacto == 4) {
            if (flag) {
                alert("WhatsApp ya está en la lista")
                return contactoList
            }
            contactoList.push({ id_contacto: 3, des_contacto: this.state.usuario.whatsApp })
            return contactoList
        }
    }
    //************************ */
    //Contacto
    //************************ */
    //Horarios
    isCheckHorario(dia, turno) {
        var contador = 0;
        while (contador < this.state.nuevosHorarios.length) {
            if (this.state.nuevosHorarios[contador].dia == dia && this.state.nuevosHorarios[contador].turno == turno) {
                return <TouchableOpacity onPress={() => this.checkClases(true, dia, turno)}><FontAwesome name={"check"} size={hp(4)} color="#5EC43A" /></TouchableOpacity>
            }
            contador++
        }
        return
    }
    checkClases(esTick, dia, turno) {

        if (esTick) {
            var horarios = []
            for (var i = 0; i < this.state.nuevosHorarios.length; i++) {
                if (this.state.nuevosHorarios[i].dia != dia || this.state.nuevosHorarios[i].turno != turno) {
                    horarios.push(this.state.nuevosHorarios[i])
                }
            }
        }
        else {
            var horarios = this.state.nuevosHorarios
            var nuevoHorario = {
                dia: dia,
                turno: turno
            }
            horarios.push(nuevoHorario)
        }
        this.setState({ cambiosHorarios: true, nuevosHorarios: horarios })
    }
    turnos(cellIndex) {
        if (cellIndex === 0) {
            return { padding: 10 }
        }
    }
    flex(cellIndex) {
        if (cellIndex === 0) {
            return { flex: 1 }
        }
        else {
            return { flex: 1 }
        }
    }
    dias(pos) {
        switch (pos) {

            case 0:

                return "Lu"

            case 1:

                return "Ma"
            case 2:

                return "Mi"
            case 3:

                return "Ju"
            case 4:

                return "Vi"
            case 5:

                return "Sa"
            case 6:

                return "Do"
        }
    }
    showButton() {
        if (this.state.cambiosHorarios || this.state.cambiosContacto) {
            return (
                <TouchableOpacity style={styles.buscarButton} onPress={() => { this.onPressSave() }}>
                    <Text style={styles.screenButtonText}>
                        Aplicar Cambios
                            </Text>
                </TouchableOpacity>
            )
        }
    }
    onPressSave() {
        this.setState({ isLoading: true })
        if (this.state.cambiosContacto == true) {
            if (this.state.nuevoContacto.find(contacto => contacto.id_contacto == 2)) {
                var usuario = {
                    id_usuario: this.state.usuario.id_usuario,
                    nombre_usuario: this.state.usuario.nombre_usuario,
                    apellido: this.state.usuario.apellido,
                    instagram: this.state.nuevoContacto.find(contacto => contacto.id_contacto == 0) ? this.state.nuevoContacto.find(contacto => contacto.id_contacto == 0).des_contacto : null,
                    telefono: this.state.nuevoContacto.find(contacto => contacto.id_contacto == 1) ? this.state.nuevoContacto.find(contacto => contacto.id_contacto == 1).des_contacto : null,
                    email: this.state.nuevoContacto.find(contacto => contacto.id_contacto == 2).des_contacto,
                    whatsApp: this.state.nuevoContacto.find(contacto => contacto.id_contacto == 3) ? this.state.nuevoContacto.find(contacto => contacto.id_contacto == 3).des_contacto : null
                }
            }
            else {
                alert("Debe ingresar un Email antes de guardar los cambios")
                this.setState({ isLoading: false })
                return;
            }
            ApiController.updateUsuario(usuario, this.okUsuarioSave.bind(this))
        }
        else {
            this.okUsuarioSave();
        }
    }
    okUsuarioSave() {
        if (this.state.cambiosHorarios) {
            ApiController.delateUsuarioHorarios(this.state.usuario.id_usuario, this.okDelateUsuarioHorarios.bind(this))
        } else {
            this.okHorariosSave()
        }
    }
    okDelateUsuarioHorarios() {
        ApiController.postUsuarioHorarios(this.state.usuario.id_usuario, this.state.nuevosHorarios, this.okHorariosSave.bind(this))
    }
    okHorariosSave() {
        this.setState({ isLoading: false })
    }
    render() {
        const element = (data, index) => (
            <View style={[styles.checkBoxContainer]}>
                <TouchableOpacity style={[styles.checkBox, styles.shadow]} onPress={() => this.checkClases(false, data, index)} />
                {this.isCheckHorario(data, index)}
            </View>
        )
        const dia = (pos) => (
            <View style={[styles.diasContainer]}>
                <Text>{this.dias(pos)}</Text>
            </View>
        )
        const tableData = [
            [dia(0), element(0, 0), element(0, 1), element(0, 2)],
            [dia(1), element(1, 0), element(1, 1), element(1, 2)],
            [dia(2), element(2, 0), element(2, 1), element(2, 2)],
            [dia(3), element(3, 0), element(3, 1), element(3, 2)],
            [dia(4), element(4, 0), element(4, 1), element(4, 2)],
            [dia(5), element(5, 0), element(5, 1), element(5, 2)],
            [dia(6), element(6, 0), element(6, 1), element(6, 2)]
        ]
        const turnos = (
            this.state.turnos.map((data, index) => (
                <View style={styles.checkBoxContainer}>
                    <Text style={{ textAlign: "center" }}>{data}</Text>
                </View>
            ))
        )
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
                <View style={{ flex: 1 }}>
                    <TouchableWithoutFeedback style={{ flex: 1 }} onPress={Keyboard.dismiss}>
                        <KeyboardAvoidingView style={[styles.container]} behavior="position" keyboardVerticalOffset={hp(5)} enabled>
                            <View style={styles.allSocialMediaContainer}>
                                <View style={styles.topBox}>
                                    <Text style={[styles.text, { fontSize: wp(4.8) }]}>Horarios Disponibles</Text>
                                </View>

                                <Table style={{ flexDirection: "row" }}>
                                    <TableWrapper style={{ width: 80 }}>
                                        <Cell data="" style={styles.singleHead} />
                                        <TableWrapper style={{ flexDirection: 'row' }}>
                                            <Col data={turnos} heightArr={[hp(6.6), hp(6.6), hp(6.6)]} textStyle={styles.text} />
                                        </TableWrapper>
                                    </TableWrapper>

                                    {/* Right Wrapper */}
                                    <TableWrapper style={{ flex: 1 }}>
                                        <Cols data={tableData} heightArr={[hp(3.3), hp(6.6), hp(6.6), hp(6.6), hp(6.6), hp(6.6), hp(6.6)]} textStyle={styles.text} />
                                    </TableWrapper>
                                </Table>
                                <View style={{ borderColor: "#DFD8C8", borderBottomWidth: 1, paddingBottom: hp(3.3), marginHorizontal: wp(8) }} />

                                {this.state.nuevoContacto.length != -1 ?
                                    <View style={styles.bottomBox}>
                                        <View style={[{ flexDirection: 'row', justifyContent: "center", alignItems: 'center', marginBottom: hp(2) }]}>
                                            <Text style={[styles.text, { fontSize: wp(4.8), textAlign: 'center' }]}>Contacto</Text>
                                            <TouchableOpacity style={styles.bubblePlus} onPress={() => this.animateContactBar()}>
                                                <FontAwesome style={{ textAlign: 'center' }} name={"plus"} size={hp(2.5)} color="white" />
                                            </TouchableOpacity>
                                        </View>

                                        <FlatList
                                            data={this.state.nuevoContacto}
                                            numColumns={2}
                                            scrollEnabled={false}
                                            initialNumToRender={50}
                                            keyExtractor={(item) => {
                                                return item.id_contacto.toString();
                                            }}
                                            renderItem={({ index, item }) => {
                                                return (
                                                    this.contactoEdit(index, item)
                                                )
                                            }
                                            } />

                                    </View>
                                    :
                                    <View />
                                }
                                {this.showButton()}
                            </View>
                        </KeyboardAvoidingView>
                    </TouchableWithoutFeedback>
                    <Animated.View style={[styles.bottomAnimatedContainer, { transform: [{ translateY: this.state.startValueContactBar }] }]}>
                        <View style={[styles.searchBar]}>
                            <TouchableOpacity style={[styles.logoSocialMediaBar, { flex: 0.5 }]} onPress={() => this.desAnimateContactBar(false)}>
                                <Entypo style={{ textAlign: "center" }} name={"cross"} size={hp(2.5)} color="#FFF7EE"></Entypo>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.logoSocialMediaBar} onPress={() => this.desAnimateContactBar(1)}>
                                <Fontisto style={{ textAlign: "center" }} name={"instagram"} size={hp(2.5)} color='#FFF7EE' />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.logoSocialMediaBar} onPress={() => this.desAnimateContactBar(2)}>
                                <Feather style={{ textAlign: "center" }} name={"phone"} size={hp(2.5)} color='#FFF7EE' />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.logoSocialMediaBar} onPress={() => this.desAnimateContactBar(3)}>
                                <MaterialCommunityIcons style={{ textAlign: "center" }} name={"email-outline"} size={hp(2.5)} color='#FFF7EE' />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.logoSocialMediaBar} onPress={() => this.desAnimateContactBar(4)}>
                                <Fontisto style={{ textAlign: "center" }} name={"whatsapp"} size={hp(2.5)} color='#FFF7EE' />
                            </TouchableOpacity>
                        </View>
                    </Animated.View>
                </View>
            );
        }
    }
};
const resizeMode = 'center';
const styles = StyleSheet.create({

    container: {
        backgroundColor: "#FFF7EE",
        justifyContent: "center",
        flex: 1
    },
    topBox: {
        alignItems: "center",
        paddingBottom: hp(2.2),
        marginHorizontal: wp(8),
        marginBottom: hp(2)
    },
    bottomBox: {
        paddingTop: hp(2.2),
        paddingBottom: hp(2.2),
        borderBottomWidth: 1,
        borderColor: "#DFD8C8",
        marginHorizontal: wp(8)
    },
    text: {
        fontFamily: "HelveticaNeue",
        color: "#52575D"
    },
    //TABLA
    head: {
        borderTopWidth: 1,
        borderColor: "#DFD8C8"
    },
    title: { flex: 2, backgroundColor: '#f6f8fa' },
    titleText: { marginRight: 6, textAlign: 'right' },
    text: { textAlign: 'center' },
    btn: { width: 58, height: 18, marginLeft: 15, backgroundColor: '#c8e1ff', borderRadius: 2 },
    btnText: { textAlign: 'center' },
    diasContainer: {
        borderColor: "#DFD8C8",
        borderLeftWidth: 1,
        justifyContent: "center",
        alignItems: 'center',
        flex: 1
    },
    checkBoxContainer: {
        //marginTop: hp(4),
        borderColor: "#DFD8C8",
        borderTopWidth: 1,
        borderLeftWidth: 1,
        justifyContent: "center",
        alignItems: 'center',
        flex: 1
    },
    checkBox: {
        height: hp(2.5),
        width: hp(2.5),
        backgroundColor: "white",
        position: 'absolute'
    },
    shadow: {
        shadowColor: '#00000045',
        shadowOffset: {
            width: 0.05,
            height: 0.55,
        },
        shadowOpacity: 2,
        elevation: 29,
    },
    //TABLA
    logoSocialMediaImage: {
        height: height * 0.044,
        width: height * 0.044,
        alignSelf: "center",
        marginRight: width * 0.033,
        textAlign: "center",
    },
    allSocialMediaContainer: {
        flexDirection: 'column',
        marginTop: height * 0.02
    },
    //Contacto
    socialMediaContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: hp(2.2),
        marginBottom: hp(2.2)
    },
    socialMedia: {
        color: 'black',
        textAlign: "center",
        textDecorationLine: 'underline',
        marginHorizontal: wp(5)
    },
    arroba: {
        alignSelf: "center",
        position: "absolute",
        left: wp(2)
    },
    pencilButton: {
        alignSelf: "center",
        position: "absolute",
        right: 0
    },
    //Boton
    buscarButton: {
        backgroundColor: '#F28C0F',
        borderRadius: 10,
        alignItems: 'center',
        margin: hp(2),
        alignSelf: 'center',
        opacity: .95,
        paddingHorizontal: 10
    },
    screenButtonText: {
        marginVertical: hp(1.5),
        color: 'white',
        fontSize: wp(4.4)
    },
    bubblePlus: {
        width: hp(3.8),
        height: hp(3.8),
        marginLeft: wp(2.5),
        borderRadius: 100,
        alignContent: 'center',
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#F28C0F"
    },
    bottomAnimatedContainer: {
        flexDirection: 'row',
        backgroundColor: "#F28C0F",
        width: wp(100),
        bottom: -hp(15),
        position: 'absolute',
    },
    searchBar: {
        flexDirection: 'row',
        backgroundColor: "#F28C0F",
        width: wp(100),
        paddingBottom: hp(0)
    },
    logoSocialMediaBar: {
        flex: 1,
        marginVertical: hp(2)
    }
})
export default withNavigation(UserContactoEdit);