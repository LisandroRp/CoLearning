import React from "react";
import { StyleSheet, Text, View, StatusBar, SafeAreaView, Image, ScrollView, TouchableOpacity, TouchableWithoutFeedback, ActivityIndicator, Animated, FlatList, Modal, Keyboard, TextInput } from "react-native";
import { FontAwesome, FontAwesome5, Ionicons, Entypo, AntDesign, Fontisto, Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { SearchBar } from 'react-native-elements';
import { withNavigation } from 'react-navigation';
import DropDownItem from 'react-native-drop-down-item';

import RNPickerSelect from 'react-native-picker-select';

import ExportadorLogos from './exportadores/ExportadorLogos'
import ExportadorContacto from './exportadores/ExportadorContacto'

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Picker from "react-native-picker-select";

function createData(item) {
    return {
        key: item.id_moneda,
        label: item.nombre_moneda,
        value: item.id_moneda
    };
}

class PerfilEdit extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            cambios: false,
            modalDescripcionVisible: false,
            modalVisible: false,
            materia: {},
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
                instagram: "juanmarinelli",
                telefono: "1144373492",
                email: "1144373492",
                whatsApp: "1144373492",
                rating: 3,
                materias: [{ id_materia: 1, nombre_materia: "Ingles", des_materia: "ClasesdeInglesavanzadasparaexamenesinternacionalesClasesdeInglesavanzadasparaexamenesinternacionalesClasesdeInglesavanzadasparaexamenesinternacionales" },
                { id_materia: 2, nombre_materia: "Matematica", des_materia: "Clases de matematica de secundaria y universidad" }],
                money: { id_moneda: { id_moneda: 1, nombre_moneda: "$" }, monto: "100" }
            },
            nuevoNombre: "",
            nuevoApellido: "",
            nuevoDomicilio: "",
            nuevasMaterias: [],
            nuevasDondeClases: [],
            nuevasTipoClases: [],
            nuevaMoneda: 1,
            nuevoMonto: '100',
            nuevaMoney: {},

            nuevaDescripcion: "",
            editableIndex: "",

            contactoNuevo: [],

            materiasBase: [{ id_materia: 1, nombre_materia: "Ingles", des_materia: "Clases de Ingles avanzadas para examenes internacionales" },
            { id_materia: 2, nombre_materia: "Matematica", des_materia: "Clases de Ingles avanzadas para examenes internacionales" },
            { id_materia: 3, nombre_materia: "Chino", des_materia: "" }],

            memory: [{ id_materia: 1, nombre_materia: "Ingles", des_materia: "Clases de Ingles avanzadas para examenes internacionales" },
            { id_materia: 2, nombre_materia: "Matematica", des_materia: "Clases de Ingles avanzadas para examenes internacionales" },
            { id_materia: 3, nombre_materia: "Chino", des_materia: "Clases de Ingles avanzadas para examenes internacionales" }],

            dondeClasesBase: [{ id_dondeClases: 1, des_dondeClases: "En su casa" },
            { id_dondeClases: 2, des_dondeClases: "A Domicilio" },
            { id_dondeClases: 3, des_dondeClases: "Instituto" }],

            tipoClasesBase: [{ id_tipoClases: 1, des_tipoClases: "Particulares" },
            { id_tipoClases: 2, des_tipoClases: "Grupales" },
            { id_tipoClases: 3, des_tipoClases: "Virtuales" }],

            monedaBase: [{ id_moneda: 1, nombre_moneda: "$" },
            { id_moneda: 2, nombre_moneda: "U$" }],
            flag: 0,

            startValue: new Animated.Value(0),
            endValue: 1,
            duration: 500,
            startValueSearchBar: new Animated.Value(0),
            endValueSearchBar: hp(20),
            durationSearchBar: 500,
        };
        this.Star = ExportadorLogos.traerEstrellaLlena();
        this.Star_With_Border = ExportadorLogos.traerEstrellaBorde();
    }
    componentDidMount() {
        this.setState({
            contactoNuevo: this.contactoList(),
            nuevasMaterias: this.state.usuario.materias,
            nuevasTipoClases: this.state.usuario.tipoClases,
            nuevasDondeClases: this.state.usuario.dondeClases,
            nuevaMoney: this.state.usuario.money,
            nuevoNombre: this.state.usuario.nombre_usuario,
            nuevoApellido: this.state.usuario.apellido,
            nuevoDomicilio: this.state.usuario.domicilio
        })
        this.setState({ isLoading: false })
    }
    //************************ */
    //Contacto
    //************************ */
    contactoList(){
        var contactoList = []

        if(this.state.usuario.instagram != "" && this.state.usuario.instagram){
            contactoList.push({ id_contacto: 0, des_contacto: this.state.usuario.instagram })
        }
        if(this.state.usuario.telefono != "" && this.state.usuario.telefono){
            contactoList.push({ id_contacto: 1, des_contacto: this.state.usuario.telefono })
        }
        if(this.state.usuario.email != "" && this.state.usuario.email){
            contactoList.push({ id_contacto: 2, des_contacto: this.state.usuario.email })
        }
        if(this.state.usuario.whatsApp != "" && this.state.usuario.whatsApp){
            contactoList.push({ id_contacto: 3, des_contacto: this.state.usuario.whatsApp })
        }
        return contactoList
    }
    cambiarContacto(index, des_contacto){
        var contactoNuevo = this.state.contactoNuevo
        contactoNuevo[index].des_contacto = des_contacto
        this.setState({contactoNuevo: contactoNuevo, cambios: true})
    }
    sacarContacto(index){
        var contactoNuevo = this.state.contactoNuevo
        contactoNuevo.splice(index, 1)
        this.setState({contactoNuevo: contactoNuevo, cambios: true})
    }
    contactoEdit(index, item) {

        switch (item.id_contacto) {

            case 0:

                return (
                <View style={[{ flex: 1  }]}>
                    <View style={styles.socialMediaContainer}>
                    <TouchableOpacity style={[{marginRight: wp(11)}]} onPress={() => this.sacarContacto(index)}>
                        <Entypo name={"cross"} size={hp(2.2)} color="#E76921"></Entypo>
                    </TouchableOpacity>
                        {/* <Image style={styles.logoSocialMediaImage} source={ExportadorLogos.traerInstagram()} /> */}
                        <View style={styles.logoSocialMedia}>
                            <Fontisto style={{ textAlign: "center", paddingBottom: hp(1.5) }} name={"instagram"} size={hp(2.5)} color='#F28C0F' />
                        </View>
                        <View style={{ flexDirection: 'row'}}>
                        <TextInput style={styles.socialMedia} onChangeText={(value) => this.cambiarContacto(index, value)} ref={(input) => { this.instagram = input }}>{item.des_contacto}</TextInput>
                        <TouchableOpacity style={styles.pencilButton} onPress={() => this.instagram.focus()}>
                                <FontAwesome style={{ textAlign: 'center'}} name={"pencil"} size={wp(4)} color="black"/>
                        </TouchableOpacity>
                        </View>
                    </View>
                </View>
                )

            case 1:

                return (
                <View style={[{ flex: 1 }]}>
                    <View style={styles.socialMediaContainer}>
                    <TouchableOpacity style={[{marginRight: wp(11)}]} onPress={() => this.sacarContacto(index)}>
                        <Entypo name={"cross"} size={hp(2.2)} color="#E76921"></Entypo>
                    </TouchableOpacity>
                        <View style={styles.logoSocialMedia}>
                            <Feather style={{ textAlign: "center", paddingBottom: hp(1.5) }} name={"phone"} size={hp(2.5)} color='#F28C0F' />
                        </View>
                        <View style={{ flexDirection: 'row'}}>
                        <TextInput style={styles.socialMedia} keyboardType={'numeric'} onChangeText={(value) => this.cambiarContacto(index, value)} ref={(input) => { this.telefono = input }}>{item.des_contacto}</TextInput>
                        <TouchableOpacity style={styles.pencilButton} onPress={() => this.telefono.focus()}>
                                <FontAwesome style={{ textAlign: 'center'}} name={"pencil"} size={wp(4)} color="black"/>
                        </TouchableOpacity>
                        </View>
                    </View>
                </View>
                )

            case 2: 
            return (
            <View style={[{ flex: 1 }]}>
                <View style={styles.socialMediaContainer}>
                <TouchableOpacity style={[{marginRight: wp(11)}]} onPress={() => this.sacarContacto(index)}>
                        <Entypo name={"cross"} size={hp(2.2)} color="#E76921"></Entypo>
                </TouchableOpacity>
                    <View style={styles.logoSocialMedia}>
                        <MaterialCommunityIcons style={{ textAlign: "center", paddingBottom: hp(1.2) }} name={"email-outline"} size={hp(2.5)} color='#F28C0F' />
                    </View>
                    <View style={{ flexDirection: 'row'}}>
                    <TextInput style={styles.socialMedia} onChangeText={(value) => this.cambiarContacto(index, value)} ref={(input) => { this.email = input }}>{item.des_contacto}</TextInput>
                    <TouchableOpacity style={styles.pencilButton} onPress={() => this.email.focus()}>
                                <FontAwesome style={{ textAlign: 'center'}} name={"pencil"} size={wp(4)} color="black"/>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            )

            case 3: 
            return (
            <View style={[{ flex: 1 }]}>
                <View style={styles.socialMediaContainer}>
                <TouchableOpacity style={[{marginRight: wp(11)}]} onPress={() => this.sacarContacto(index)}>
                        <Entypo name={"cross"} size={hp(2.2)} color="#E76921"></Entypo>
                </TouchableOpacity>
                    <View style={styles.logoSocialMedia}>
                        <Fontisto style={{ textAlign: "center", paddingBottom: hp(1.5) }} name={"whatsapp"} size={hp(2.5)} color='#F28C0F' />
                    </View>
                    <View style={{ flexDirection: 'row'}}>
                    <TextInput style={styles.socialMedia} keyboardType={'numeric'} onChangeText={(value) => this.cambiarContacto(index, value)} ref={(input) => { this.whatsApp = input }}>{item.des_contacto}</TextInput>
                    <TouchableOpacity style={styles.pencilButton} onPress={() => this.whatsApp.focus()}>
                                <FontAwesome style={{ textAlign: 'center'}} name={"pencil"} size={wp(4)} color="black"/>
                    </TouchableOpacity>
                    </View>
                </View>
            </View>
            )
        }
}
   //************************ */
    //Contacto
    //************************ */
    marginSize(index) {
        if (index != this.state.nuevasMaterias.length - 1) {
            return { marginBottom: hp(3), marginTop: hp(3) }
        } else {
            return { marginBottom: hp(3) }
        }
    }
    //************************ */
    //Donde Clases
    //************************ */

    queDondeClase(id_usuario) {
        switch (id_usuario) {

            case 1:

                return <FontAwesome5 style={[{ marginBottom: 10, textAlign: "center" }]} name={"home"} size={hp(3.3)} color='#F28C0F'></FontAwesome5>;
            case 2:

                return <FontAwesome style={[{ marginBottom: 10, textAlign: "center" }]} name={"car"} size={hp(3.3)} color='#F28C0F'></FontAwesome>;
            case 3:

                return <FontAwesome5 style={[{ marginBottom: 10, textAlign: "center" }]} name={"school"} size={hp(3.3)} color='#F28C0F'></FontAwesome5>;
            default:

                return <View></View>;
        }
    }
    isCheckDondeClases(id_dondeClases, item) {
        var contador = 0;
        while (contador < this.state.nuevasDondeClases.length) {
            if (this.state.nuevasDondeClases[contador].id_dondeClases == id_dondeClases) {
                return <TouchableOpacity onPress={() => this.abmDondeClases(this.state.nuevasDondeClases, item)}><FontAwesome name={"check"} size={hp(4.4)} color="#5EC43A" /></TouchableOpacity>
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
        return { padding: hp(2.2) }
    }
    abmDondeClases(viejasDondeClases, dondeClases) {
        var nuevasDondeClases = []
        var contador = 0;
        var flag = 0;
        while (contador < viejasDondeClases.length) {
            if (viejasDondeClases[contador].id_dondeClases != dondeClases.id_dondeClases) {
                nuevasDondeClases.push(viejasDondeClases[contador])
                contador++;
            }
            else {
                flag = 1
                contador++
            }
        }
        if (flag == 0) {
            nuevasDondeClases.push(dondeClases)
        }
        this.setState({ nuevasDondeClases: nuevasDondeClases, cambios: true })
    }

    //************************ */
    // Tipo Clases
    //************************ */

    queTipoClase(id_usuario) {
        switch (id_usuario) {

            case 1:

                return <FontAwesome style={[{ marginBottom: 10, textAlign: "center" }]} name={"user"} size={hp(4)} color='#F28C0F'></FontAwesome>;
            case 2:

                return <FontAwesome style={[{ marginBottom: 10, textAlign: "center" }]} name={"group"} size={hp(4)} color='#F28C0F'></FontAwesome>;
            case 3:

                return <Ionicons style={[{ marginBottom: 7, textAlign: "center" }]} name={"ios-tv"} size={hp(4)} color='#F28C0F'></Ionicons>;
            default:

                return <View></View>;
        }
    }
    isCheckTipoClasesPosition(id_tipoClases) {
        var contador = 0;
        while (contador < this.state.nuevasTipoClases.length) {
            if (this.state.nuevasTipoClases[contador].id_tipoClases == id_tipoClases) {
                return
            }
            contador++
        }
        return { padding: hp(2.2) }
    }
    isCheckTipoClases(id_tipoClases, item) {
        var contador = 0;
        while (contador < this.state.nuevasTipoClases.length) {
            if (this.state.nuevasTipoClases[contador].id_tipoClases == id_tipoClases) {
                return <TouchableOpacity onPress={() => this.abmTipoClases(this.state.nuevasTipoClases, item)}><FontAwesome name={"check"} size={hp(4.4)} color="#5EC43A" /></TouchableOpacity>
            }
            contador++
        }
        return
    }
    abmTipoClases(viejasTipoClases, tipoClases) {
        var nuevasTipoClases = []
        var contador = 0;
        var flag = 0;

        while (contador < viejasTipoClases.length) {
            if (viejasTipoClases[contador].id_tipoClases != tipoClases.id_tipoClases) {
                nuevasTipoClases.push(viejasTipoClases[contador])
                contador++;
            }
            else {
                contador++
                flag = 1
            }
        }
        if (flag == 0) {
            nuevasTipoClases.push(tipoClases)
        }

        this.setState({ nuevasTipoClases: nuevasTipoClases, cambios: true })
    }
    //************************ */
    // Materias
    //************************ */

    guardarMaterias(materiasViejas, materiaNueva) {

        var materiasNuevas = materiasViejas

        if (this.validarCambiarMateria(materiasViejas, materiaNueva)) {
            materiasNuevas.push(materiaNueva)
            this.setState({ nuevasMaterias: materiasNuevas, cambios: true })
            this.desAnimate()
        }
    }
    validarCambiarMateria(materiasViejas, materiaNueva) {
        var i = 0
        while (i < materiasViejas.length) {
            if (materiasViejas[i].id_materia == materiaNueva.id_materia) {
                alert("No puede agregar esta opcion como materia, porque ya existe.")
                return false
            }
            i++;
        }
        return true
    }
    sacarMateria(viejasMaterias, materia) {
        var contador = 0
        var nuevasMaterias = []
        while (contador < viejasMaterias.length) {
            if (viejasMaterias[contador].id_materia != materia.id_materia) {
                nuevasMaterias.push(viejasMaterias[contador])
                contador++;
            }
            else {
                contador++;
            }
        }
        this.setState({ nuevasMaterias: nuevasMaterias, cambios: true })
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
    //************************ */
    // Materias
    //************************ */
    //************************ */
    // Money
    //************************ */
    moneyPikerList(item) {
        var moneyPiker = []
        for (var i = 0; i < item.length; i++) {
            moneyPiker.push(createData(item[i]));
        }
        return moneyPiker
    }
    materiasFilter(item) {
        var materiasFilter = []
        for (var i = 0; i < item.length; i++) {
            materiasFilter.push(item[i]);
        }
        return materiasFilter
    }
    cambiarMoney(materias, materiaVieja, materiaNueva) {
        if (this.state.flag == 0) {
            if (this.validarCambiarMateria(materias, materiaNueva)) {
                for (var i = 0; i < materias.length; i++) {
                    if (materias[i].id_materia == materiaVieja.id_materia) {
                        materias[i] = this.traerMateria(materiaNueva)
                    }
                }
                this.setState({ nuevasMaterias: materias })
            }
            else {
                this.setState({ flag: 1 })
            }
        }
        else {
            this.setState({ flag: 0 })
        }

    }
    //************************ */
    // Money
    //************************ */
    animate() {
        this.setState({ animationStyle: true })
        Animated.timing(this.state.startValue, {
            toValue: this.state.endValue,
            duration: this.state.duration,
            useNativeDriver: true,
        }).start();
        Animated.timing(this.state.startValueSearchBar, {
            toValue: this.state.endValueSearchBar,
            duration: this.state.durationSearchBar,
            useNativeDriver: true,
        }).start();

    }
    desAnimate() {
        Animated.timing(this.state.startValue, {
            toValue: 0,
            duration: this.state.duration,
            useNativeDriver: true,
        }).start();
        Animated.timing(this.state.startValueSearchBar, {
            toValue: -hp(10),
            duration: this.state.durationSearchBar,
            useNativeDriver: true,
        }).start();
        setTimeout(() => this.setState({ animationStyle: false }), 500)
    }
    animationStyle() {
        if (this.state.animationStyle) {
            return {
                top: 0,
                right: 0
            }
        } else {
            return
        }
    }
    marginSize(item) {
        if (this.state.materiasBase.length != 0) {
            if (item.id_materia != this.state.materiasBase[this.state.materiasBase.length - 1].id_materia) {

                return { marginTop: hp(1) }
            } else {
                return { marginBottom: hp(2), marginTop: hp(2) }
            }
        }
    }
    searchMateria = value => {
        const filterDeMaterias = this.state.memory.filter(materiasBase => {
            let tagLowercase = (
                materiasBase.nombre_materia
            ).toLowerCase();

            let searchTermLowercase = value.toLowerCase();

            return tagLowercase.indexOf(searchTermLowercase) > -1;
        });
        this.setState({ materiasBase: filterDeMaterias });
        this.setState({ materia: value })
    };
    addNewMoney() {
        var newMoney = {
            id_moneda: this.buscarMoneda(),
            monto: this.state.nuevoMonto
        }
        this.setState({ nuevaMoney: newMoney, cambios: true, modalVisible: false })
    }
    buscarMoneda() {
        var contador = 0;
        while (contador < this.state.monedaBase.length) {
            if (this.state.monedaBase[contador].id_moneda == this.state.nuevaMoneda) {
                return this.state.monedaBase[contador]
            }
            contador++;
        }
    }

    activeEditabel(materiaIndex) {
        this.setState({ nuevaDescripcion: this.state.nuevasMaterias[materiaIndex].des_materia, editableIndex: materiaIndex, modalDescripcionVisible: true })
    }
    refresh() {
        if (this.state.nuevaDescripcion != this.state.nuevasMaterias[this.state.editableIndex].des_materia) {
            this.setState({ isLoading: true })
            setTimeout(() => { this.disableEditable() }, 500)
        }
        else {
            this.setState({ modalDescripcionVisible: false })
        }
    }
    disableEditable() {
        var materiasNuevas = this.state.nuevasMaterias

        materiasNuevas[this.state.editableIndex].des_materia = this.state.nuevaDescripcion
        this.setState({ nuevasMaterias: materiasNuevas, cambios: true, modalDescripcionVisible: false, isLoading: false })
    }
    changeNombre(){
        if(this.state.nuevoNombre != this.state.usuario.nombre_usuario ){
            this.setState({cambios: true})
        }
    }
    changeApellido(){
        if(this.state.nuevoApellido != this.state.usuario.apellido){
            this.setState({cambios: true})
        }
    }
    changeDomicilio(){
        if(this.state.nuevoDomicilio != this.state.usuario.domicilio){
            this.setState({cambios: true})
        }
    }
    
    showButton() {
        if (this.state.cambios) {
            return (
                <TouchableOpacity style={styles.buscarButton} onPress={() => { this.onPressSave() }}>
                    <Text style={styles.screenButtonText}>
                        Aplicar Cambios
                            </Text>
                </TouchableOpacity>
            )
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
                        <View>
                            <View style={{ alignSelf: "center" }}>
                                <View style={styles.profileImage}>
                                    <Image source={this.state.usuario.src} style={styles.image} resizeMode="center"></Image>
                                </View>
                            </View>

                            <View style={styles.infoContainer}>
                                <View style={{ flexDirection: "row", paddingHorizontal: wp(8) }}>
                                    <TextInput style={[styles.text, styles.titleName]} onEndEditing={() => this.changeNombre()} onChangeText={(value) => this.setState({ nuevoNombre: value })} ref={(input) => { this.nombre = input }}>{this.state.usuario.nombre_usuario}</TextInput>
                                    <TouchableOpacity style={{ alignSelf: "center", position: "absolute", right: 0 }} onPress={() => this.nombre.focus()}>
                                        <FontAwesome style={{ textAlign: 'center' }} name={"pencil"} size={wp(5)} color="#E76921" />
                                    </TouchableOpacity>
                                </View>
                                <View style={{ flexDirection: "row", paddingHorizontal: wp(8) }}>
                                    <TextInput style={[styles.text, styles.titleName]} onEndEditing={() => this.changeApellido()} onChangeText={(value) => this.setState({ nuevoApellido: value })} ref={(input) => { this.apellido = input }}>{this.state.usuario.apellido}</TextInput>
                                    <TouchableOpacity style={{ alignSelf: "center", position: "absolute", right: 0 }} onPress={() => this.apellido.focus()}>
                                        <FontAwesome style={{ textAlign: 'center' }} name={"pencil"} size={wp(5)} color="#E76921" />
                                    </TouchableOpacity>
                                </View>
                                {this.state.usuario.esProfesor ? 
                                <View style={{ flexDirection: "row", paddingHorizontal: wp(6), marginTop: hp(1) }}>
                                    <TextInput style={[styles.text, styles.titleDomicilio]} onEndEditing={() => this.changeDomicilio()} onChangeText={(value) => this.setState({ nuevoDomicilio: value })} ref={(input) => { this.direccion = input }}>{this.state.usuario.domicilio}</TextInput>
                                    <TouchableOpacity style={{ alignSelf: "center", position: "absolute", right: 0 }} onPress={() => this.direccion.focus()}>
                                        <FontAwesome style={{ textAlign: 'center' }} name={"pencil"} size={wp(4)} color="#AEB5BC" />
                                    </TouchableOpacity>
                                </View>
                                :
                                <View/>
                                }
                            </View>
                            {this.state.usuario.esProfesor ?
                                <TouchableOpacity style={[styles.moneyView, styles.shadowMoney]} onPress={() => [this.setState({ modalVisible: true }), console.log(this.state.usuario.domicilio)]} >
                                    <Text style={styles.moneyText}>{this.state.nuevaMoney.id_moneda.nombre_moneda}{this.state.nuevaMoney.monto}</Text>
                                    <Text style={styles.moneyText2}>/h</Text>
                                </TouchableOpacity>
                                :
                                <View />
                            }
                        </View>
                        <View style={styles.statsContainer}>
                        </View>
                        {/*/////////////////////////////////////////////////////////////////////////// */}
                        {this.state.usuario.esProfesor ?
                            <View>
                                <View style={styles.bottomBox}>
                                    <Text style={[styles.text, { fontSize: wp(4.8), textAlign: "center" }]}>Ubicación de Clases</Text>

                                    <View style={[{ flexDirection: 'row' }]}>
                                        {this.state.dondeClasesBase.map((item) => (
                                            <View style={[{ padding: 10, flex: 1, marginTop: 10, alignItems: "center", borderRadius: 10 }]} key={item.id_dondeClases}>
                                                <View>
                                                    {this.queDondeClase(item.id_dondeClases)}
                                                    <Text numberOfLines={1} style={[styles.text, styles.subText]}>{item.des_dondeClases}</Text>
                                                </View>
                                                <View style={[styles.checkBoxContainer, this.isCheckDondeClasesPosition(item.id_dondeClases)]}>
                                                    <TouchableOpacity style={styles.checkBox} onPress={() => this.abmDondeClases(this.state.nuevasDondeClases, item)} />
                                                    {this.isCheckDondeClases(item.id_dondeClases, item)}
                                                </View>
                                            </View>
                                        ))}
                                    </View>
                                </View>

                                <View style={styles.bottomBox}>
                                    <Text style={[styles.text, { fontSize: wp(4.8), textAlign: "center" }]}>Tipo de Clases</Text>

                                    <View style={[{ flexDirection: 'row' }]}>
                                        {this.state.tipoClasesBase.map((item) => (
                                            <View style={[{ padding: 10, flex: 1, marginTop: 10, alignItems: "center", borderRadius: 10 }]} key={item.id_tipoClases}>
                                                <View>
                                                    {this.queTipoClase(item.id_tipoClases)}
                                                    <Text numberOfLines={1} style={[styles.text, styles.subText]}>{item.des_tipoClases}</Text>
                                                </View>
                                                <View style={[styles.checkBoxContainer, this.isCheckTipoClasesPosition(item.id_tipoClases)]}>
                                                    <TouchableOpacity style={[styles.checkBox]} onPress={() => this.abmTipoClases(this.state.nuevasTipoClases, item)} />
                                                    {this.isCheckTipoClases(item.id_tipoClases, item)}
                                                </View>
                                            </View>
                                        ))}
                                    </View>
                                </View>

                                <View style={styles.materiasViewContainer}>
                                    <View style={[{ flexDirection: 'row', justifyContent: "center", alignItems: 'center', marginBottom: hp(2) }]}>
                                        <Text style={[styles.text, { fontSize: wp(4.8), textAlign: 'center' }]}>Materias</Text>
                                        <TouchableOpacity style={styles.bubblePlus} onPress={() => this.animate()}>
                                            <FontAwesome style={{ textAlign: 'center' }} name={"plus"} size={hp(2.5)} color="white" />
                                        </TouchableOpacity>
                                    </View>


                                    {this.state.nuevasMaterias.map((item, index) => (
                                        <View style={[styles.dropDownContainer, styles.shadow]} key={item.nombre_materia}>
                                            <DropDownItem contentVisible={false} key={index}
                                                header={
                                                    <View style={[styles.dropDownBackgroundTitulo]}>
                                                        <TouchableOpacity onPress={() => this.sacarMateria(this.state.nuevasMaterias, item)}>
                                                            <Entypo name={"circle-with-cross"} size={hp(3)} color="white"></Entypo>
                                                        </TouchableOpacity>
                                                        <Text style={styles.dropDownTitulo}>{item.nombre_materia}</Text>
                                                        <View >
                                                            <AntDesign style={{ textAlign: 'center', marginRight: wp(3.3) }} name={"caretdown"} size={wp(3.3)} color="white" />
                                                        </View>
                                                    </View>
                                                }
                                            >
                                                <View style={{width: wp(78.4)}}>
                                                    {(item.des_materia == "" || item.des_materia == undefined) ?

                                                        <TouchableOpacity style={styles.agregarButton} onPress={() => { this.activeEditabel(index) }}>
                                                            <Text style={styles.agregarButtonText}>
                                                                Agregar Descripcion
                                                            </Text>
                                                        </TouchableOpacity>
                                                        :

                                                        <View>
                                                            <View style={styles.dropDownInputContainer}>
                                                                <Text style={styles.dropDowndescripcion}>{item.des_materia}</Text>
                                                            </View>
                                                            <View>

                                                                <TouchableOpacity style={styles.bubbleEdit} onPress={() => this.activeEditabel(index)}>
                                                                    <FontAwesome style={{ textAlign: 'center' }} name={"edit"} size={wp(4)} color="white" />
                                                                </TouchableOpacity>
                                                            </View>
                                                        </View>


                                                    }
                                                </View>
                                            </DropDownItem>
                                        </View>
                                    ))}
                                    {/* {this.state.nuevasMaterias.map((item, index) => (
                                        <View style={[styles.materiasBackground, styles.shadow]}>
                                            <Text style={styles.materiasText}>{item.nombre_materia}</Text>
                                            <TouchableOpacity onPress={() => this.sacarMateria(this.state.nuevasMaterias, item)}>
                                                <Entypo style={{ marginRight: wp(2.5) }} name={"circle-with-cross"} size={hp(3.3)} color="white"></Entypo>
                                            </TouchableOpacity>
                                        </View>
                                    ))} */}
                                </View>
                                {this.showButton()}
                            </View>
                            ///////////////////                            
                            :
                            /////////////////// 
                            (this.state.contactoNuevo.length != 0 ?
                            <View style={styles.bottomBox}>
                                <Text style={[styles.text, { fontSize: wp(4.8), alignSelf: "center" }]}>Contacto</Text>
                                <FlatList
                                    data={this.state.contactoNuevo}
                                    numColumns={2}
                                    scrollEnabled= {false}
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
                            <View/>
                            )
                        }



                    </ScrollView>
                    <Animated.View style={[styles.fullScreenAnimate, this.animationStyle(), { opacity: this.state.startValue }]}>
                        <FlatList
                            style={{ paddingTop: hp(8), flex: 1 }}
                            columnWrapperStyle={styles.listContainer}
                            data={this.materiasFilter(this.state.materiasBase)}
                            numColumns={2}
                            scrollEnabled={false}
                            initialNumToRender={50}
                            keyExtractor={(item) => {
                                return item.id_materia.toString();
                            }}
                            renderItem={({ item }) => {
                                return (
                                    <View style={{ flex: 1 }}>
                                        <TouchableOpacity style={[this.marginSize(item), styles.card]} onPress={() => this.guardarMaterias(this.state.nuevasMaterias, item)}>
                                            <Text>{item.nombre_materia}</Text>
                                        </TouchableOpacity>
                                    </View>
                                )
                            }
                            } />
                    </Animated.View>
                    <Animated.View style={[styles.headerAnimatedContainer, { transform: [{ translateY: this.state.startValueSearchBar }] }]}>
                        <View style={[styles.searchBar]}>
                            <TouchableOpacity style={{ flex: 0.2, marginLeft: wp(3.3), marginVertical: wp(3.3) }} onPress={() => this.desAnimate()}>
                                <Text style={{ color: 'white', textAlign: 'center', fontSize: wp(4.5) }}>Listo</Text>
                            </TouchableOpacity>
                            <SearchBar
                                placeholder="Materia..."
                                platform='ios'
                                onChangeText={value => this.searchMateria(value)}
                                value={this.state.materia}
                                inputContainerStyle={{ backgroundColor: '#FFF7EE', height: hp(5) }}
                                placeholderTextColor='rgba(0, 0, 0, 0.3)'
                                cancelButtonProps={{ buttonTextStyle: { color: 'white', paddingTop: 0, fontSize: wp(4.4) } }}
                                containerStyle={{ backgroundColor: '#F28C0F', paddingBottom: hp(1), paddingTop: 0, marginRight: wp(3.3), flex: 1 }}
                                searchIcon={{ color: 'rgba(0, 0, 0, 0.3)' }}
                            />
                        </View>
                    </Animated.View>
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
                                        items={this.moneyPikerList(this.state.monedaBase)}
                                    />
                                    <TextInput style={[styles.inputMonto, styles.shadowLight]}
                                        value={this.state.nuevoMonto}
                                        keyboardType={'numeric'}
                                        placeholder="Monto"
                                        placeholderTextColor="grey"
                                        underlineColorAndroid='transparent'
                                        onChangeText={(monto) => this.setState({ nuevoMonto: monto })}
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
                    <Modal
                        animationType="fade"
                        visible={this.state.modalDescripcionVisible}
                        transparent={true}
                        onRequestClose={() => this.setState({ modalVisible: false })}  >
                        <TouchableOpacity style={[styles.modalContainer, styles.shadow]} activeOpacity={1} onPress={Keyboard.dismiss}>

                            <View style={styles.modalDescripcion}>
                                <TextInput style={styles.inputDescripcion}
                                    value={this.state.nuevaDescripcion}
                                    multiline={true}
                                    maxLength={660}
                                    placeholder="Descripcion"
                                    placeholderTextColor="grey"
                                    underlineColorAndroid='transparent'
                                    onChangeText={(text) => this.setState({ nuevaDescripcion: text })}
                                />
                                <View style={[{ flexDirection: "row", justifyContent: "center" }]}>
                                    <TouchableOpacity style={[styles.buttonContainerLogin]}
                                        onPress={() => this.setState({ modalDescripcionVisible: false })}>
                                        <Text style={styles.loginText}>Cancelar</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={[styles.buttonContainerLogin]}
                                        onPress={() => { this.refresh() }}>
                                        <Text style={styles.loginText}>Agregar</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </TouchableOpacity>
                    </Modal>
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
    titleName: {
        fontWeight: "200",
        fontSize: wp(6.6),
        fontWeight: 'bold',
        color: '#F28C0F',
    },
    titleDomicilio: {
        color: "#AEB5BC",
        fontSize: wp(4)
    },
    subText: {
        fontSize: wp(3),
        textAlign: "center",
        color: "#AEB5BC",
        textTransform: "uppercase",
        fontWeight: "500"
    },
    profileImage: {
        width: wp(50),
        height: wp(50),
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
        fontSize: wp(4)
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
    //CheckBox
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
    infoContainer: {
        alignItems: "center",
        marginTop: 16,
    },
    statsContainer: {
        flexDirection: "row",
        borderColor: "#DFD8C8",
        borderBottomWidth: 1,
        paddingBottom: hp(2.2),
        marginHorizontal: wp(8),
    },
    //Materias
    materiasViewContainer: {
        paddingTop: hp(2.2)
    },
    materiasBackground: {
        backgroundColor: '#F28C0F',
        flexDirection: 'row',
        borderRadius: 10,
        alignItems: 'center',
        paddingHorizontal: wp("2"),
        paddingVertical: hp(1),
        marginBottom: hp(2)
    },
    materiasText: {
        flex: 1,
        fontSize: wp(4),
        color: 'white',
        textAlign: 'center'
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
        borderRadius: 10,
        marginBottom: hp(2),
        marginHorizontal: wp(8),
        flex: 1
    },
    dropDownBackgroundTitulo: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: '#F28C0F',
        borderRadius: 10,
        paddingHorizontal: wp("2"),
        paddingVertical: hp(1),
    },
    dropDownTitulo: {
        //flex: 1,
        fontSize: wp(4),
        alignSelf: "center",
        color: 'white',
        textAlign: 'center'
    },
    dropDownDescripcion: {
        color: 'black',
        marginHorizontal: wp("4"),
        marginVertical: hp("2"),
        fontSize: wp(3.5),
    },
    dropDownInputContainer: {
        borderRadius: 10,
        marginBottom: hp(1)
    },
    dropDownInput: {
        paddingTop: hp(2.2),
        padding: hp(2.2),
        backgroundColor: '#FFF7EE',
    },
    //Boton de Guardar
    agregarButton: {
        backgroundColor: '#F28C0F',
        borderRadius: 10,
        alignItems: 'center',
        alignSelf: 'center',
        opacity: .95,
        paddingHorizontal: 10
    },
    agregarButtonText: {
        marginVertical: hp(1.5),
        color: 'white',
        fontSize: wp(3.5)
    },
    //DROPDOWN
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
    bubbleEdit: {
        alignSelf: "center",
        alignItems: "center",
        justifyContent: "center",
        width: hp(3.8),
        height: hp(3.8),
        borderRadius: hp(3.8) / 2,
        backgroundColor: "#F28C0F"
    },
    //Contacto
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
        marginHorizontal: wp(5)
    },
    pencilButton: {
        alignSelf: "center",
        position: "absolute",
        right: 0
    },
    //Boton de Guardar
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
    //Header
    fullScreenAnimate: {
        flexDirection: "row",
        backgroundColor: "#FFF7EE",
        width: wp(100),
        height: hp(100),
        position: 'absolute',
        top: hp(100)
    },
    headerAnimatedContainer: {
        flexDirection: 'column',
        backgroundColor: "#F28C0F",
        width: wp(100),
        position: 'absolute',
        top: -hp(20)
    },
    searchBar: {
        flexDirection: 'row',
        backgroundColor: "#F28C0F",
        width: wp(100),
        paddingBottom: hp(0)
    },
    // FlatList
    card: {
        shadowColor: '#00000045',
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: 0.37,
        shadowRadius: 7.49,
        elevation: 12,

        marginLeft: wp(2),
        marginRight: wp(2),
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "white",
        padding: 10,
        flexDirection: 'row',
    },
    //MODAL
    /*************************************** */
    modalContainer: {
        flex: 1,
        justifyContent: "center"
    },
    modal: {
        width: wp(50),
        marginTop: hp(10),
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
        marginHorizontal: wp(2),
        height: hp(5),
        paddingHorizontal: hp(2.2),
        marginTop: hp(2.2),
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
        height: hp(5),
        paddingHorizontal: hp(2.2),
        marginTop: hp(2.2),
        flexDirection: 'column',
        textAlign: 'center'
    },
    buttonContainerModalMoney: {
        paddingVertical: hp(1.5),
        marginTop: hp(2),
        justifyContent: 'center',
        marginHorizontal: wp(5),
        alignItems: 'center',
        marginBottom: hp(2.2),
        borderRadius: 10,
        paddingHorizontal: wp(3.3),
        backgroundColor: "#F28C0F"
    },
    loginText: {
        color: 'white'
    },
    //MODAL
    modalDescripcion: {
        height: hp(66),
        width: wp(80),
        marginTop: hp(10),
        alignSelf: "center",
        paddingHorizontal: wp(5),
        backgroundColor: '#FFF7EE',
        borderRadius: 22,
        opacity: .95,
    },
    inputTitle: {
        borderBottomColor: '#F5FCFF',
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        borderBottomWidth: 1,
        width: 300,
        height: hp(5),
        paddingHorizontal: hp(2.2),
        marginTop: hp(2.2),
        flexDirection: 'column',
        textAlign: 'center',

        shadowColor: "#808080",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5
    },
    inputDescripcion: {
        flex: 1,
        borderBottomColor: '#F5FCFF',
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        borderBottomWidth: 1,
        paddingTop: hp(2.2),
        paddingHorizontal: hp(2.2),
        textAlignVertical: "top",
        marginTop: hp(2.2),
        marginBottom: hp(2.2),
        flexDirection: 'column',
        shadowColor: "#808080",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
    buttonContainerLogin: {
        paddingVertical: hp(1.5),
        justifyContent: 'center',
        marginHorizontal: wp(5),
        alignItems: 'center',
        marginBottom: hp(2.2),
        borderRadius: 10,
        paddingHorizontal: wp(3.3),
        backgroundColor: "#F28C0F"
    }
});
export default withNavigation(PerfilEdit);