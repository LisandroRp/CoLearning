import React from "react";
import { StyleSheet, Text, View, StatusBar, SafeAreaView, Image, ScrollView, TouchableOpacity, TouchableWithoutFeedback, ActivityIndicator, Animated, FlatList, Modal, Keyboard, TextInput } from "react-native";
import { Ionicons, Entypo, FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import { SearchBar } from 'react-native-elements';
import { withNavigation } from 'react-navigation';

import RNPickerSelect from 'react-native-picker-select';

import ExportadorLogos from './exportadores/ExportadorLogos'

import { widthPercentageToDP as wp, heightPercentageToDP as hp, heightPercentageToDP } from 'react-native-responsive-screen';
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
            max_rating: 5,
            actividad: '',
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
                instagram: "@LisandroRp",
                whatsApp: "1144373492",
                rating: 3,
                materias: [{ id_materia: 1, nombre_materia: "Ingles", des_materia: "Clases de Ingles avanzadas para examenes internacionales" },
                { id_materia: 2, nombre_materia: "Matematica", des_materia: "Clases de matematica de secundaria y universidad" }],
                latitud: 123,
                longitud: 123,
                money: { id_moneda: { id_moneda: 1, nombre_moneda: "$" }, monto: "100" }
            },
            nuevasMaterias: [],
            nuevasDondeClases: [],
            nuevasTipoClases: [],
            nuevaMoneda: 1,
            nuevoMonto: '100',
            nuevaMoney: {},

            materiasBase: [{ id_materia: 1, nombre_materia: "Ingles" },
            { id_materia: 2, nombre_materia: "Matematica" },
            { id_materia: 3, nombre_materia: "Chino" }],

            memory: [{ id_materia: 1, nombre_materia: "Ingles" },
            { id_materia: 2, nombre_materia: "Matematica" },
            { id_materia: 3, nombre_materia: "Chino" }],

            dondeClasesBase: [{ id_dondeClases: 1, des_dondeClases: "En su casa" },
            { id_dondeClases: 2, des_dondeClases: "A Domicilio" },
            { id_dondeClases: 3, des_dondeClases: "Instituto" }],

            tipoClasesBase: [{ id_tipoClases: 1, des_tipoClases: "Particulares" },
            { id_tipoClases: 2, des_tipoClases: "Grupales" },
            { id_tipoClases: 3, des_tipoClases: "Virtuales" }],

            monedaBase: [{id_moneda: 1, nombre_moneda: "$"},
            {id_moneda: 2, nombre_moneda: "U$"}],
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
        this.setState({ nuevasMaterias: this.state.usuario.materias, nuevasTipoClases: this.state.usuario.tipoClases, nuevasDondeClases: this.state.usuario.dondeClases, nuevaMoney: this.state.usuario.money })
        this.setState({isLoading: false})
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
        if (index != this.state.nuevasMaterias.length - 1) {
            return { marginBottom: hp(3), marginTop: hp(3) }
        } else {
            return { marginBottom: hp(3) }
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
        this.setState({ nuevasDondeClases: nuevasDondeClases })
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

        this.setState({ nuevasTipoClases: nuevasTipoClases })
    }
    //************************ */
    // Materias
    //************************ */

    agregarMateria(nuevasMaterias) {
        if (nuevasMaterias.length != 0) {
            if (nuevasMaterias[nuevasMaterias.length - 1].id_materia != 0) {
                var materiaVacia = { id_materia: 0, nombre_materia: '' }
                nuevasMaterias.push(materiaVacia)
                this.setState({ nuevasMaterias: nuevasMaterias })
            }
            else {
                alert("Ya existe espacio para agregar una materia")
            }
        }
        else {
            var materiaVacia = { id_materia: 0, nombre_materia: '' }
            nuevasMaterias.push(materiaVacia)
            this.setState({ nuevasMaterias: nuevasMaterias })
        }

    }
    guardarMaterias(materias, materiaNueva) {

        var materiasNuevas = materias;
        if (this.validarCambiarMateria(materias, materiaNueva)) {
            materiasNuevas.push(materiaNueva)
            this.setState({ nuevasMaterias: materiasNuevas })
            this.desAnimate()
        }
    }
    validarCambiarMateria(materias, materiaNueva) {
        var i = 0
        while (i < materias.length) {
            if (materias[i].id_materia == materiaNueva.id_materia) {
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
        this.setState({ nuevasMaterias: nuevasMaterias })
    }
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
    traerMateria(id_materiaNueva) {
        var contador = 0
        while (contador < this.state.materiasBase.length) {
            if (this.state.materiasBase[contador].id_materia == id_materiaNueva) {
                return this.state.materiasBase[contador]
            }
            contador++
        }
    }
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
    addNewMoney(){
        var newMoney= {
            id_moneda: this.buscarMoneda(),
            monto: this.state.nuevoMonto
        }
        this.setState({nuevaMoney: newMoney, modalVisible: false})
    }
    buscarMoneda(){
        var contador = 0;
        while(contador < this.state.monedaBase.length){
            if(this.state.monedaBase[contador].id_moneda == this.state.nuevaMoneda){
                return this.state.monedaBase[contador]
            }
            contador ++;
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
                                <View style={styles.active}></View>
                            </View>

                            <View style={styles.infoContainer}>
                                <Text style={[styles.text, { fontWeight: "200", fontSize: 28, fontWeight: 'bold', color: '#F28C0F' }]}>{this.state.usuario.nombre_usuario} {this.state.usuario.apellido}</Text>
                                <Text style={[styles.text, { color: "#AEB5BC", fontSize: 14 }]}>{this.state.usuario.domicilio}</Text>
                            </View>
                            <TouchableOpacity style={[styles.moneyView, styles.shadowMoney]} onPress={() => this.setState({ modalVisible: true })} >
                                <Text style={styles.moneyText}>{this.state.nuevaMoney.id_moneda.nombre_moneda}{this.state.nuevaMoney.monto}</Text>
                                <Text style={styles.moneyText2}>/h</Text>
                            </TouchableOpacity>
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
                                                <TouchableOpacity style={styles.checkBox} onPress={() => this.abmDondeClases(this.state.nuevasDondeClases, item)} />
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
                                                <TouchableOpacity style={[styles.checkBox]} onPress={() => this.abmTipoClases(this.state.nuevasTipoClases, item)} />
                                                {this.isCheckTipoClases(item.id_tipoClases, item)}
                                            </View>
                                        </View>
                                    ))}
                                </View>
                            </View> : <View></View>}

                        {this.state.usuario.esProfesor ?
                            <View style={styles.materiasViewContainer}>
                                <View style={[{ flexDirection: 'row', justifyContent: "center", alignItems: 'center', marginBottom: hp(2) }]}>
                                    <Text style={[styles.text, { fontSize: 20, textAlign: 'center' }]}>Materias</Text>
                                    {/* <TouchableOpacity style={styles.bubblePlus} onPress={() => this.agregarMateria(this.state.nuevasMaterias)}> */}
                                    <TouchableOpacity style={styles.bubblePlus} onPress={() => this.animate()}>
                                        <FontAwesome style={{textAlign: 'center'}} name={"plus"} size={hp(2.5)} color="white"></FontAwesome>
                                    </TouchableOpacity>
                                </View>

                                {this.state.nuevasMaterias.map((item, index) => (
                                    <View style={[styles.materiasBackground, styles.shadow]}>
                                        <Text style={styles.materiasText}>{item.nombre_materia}</Text>
                                        <TouchableOpacity onPress={() => this.sacarMateria(this.state.nuevasMaterias, item)}>
                                            <Entypo style={{marginRight: wp(2.5)}} name={"circle-with-cross"} size={hp(3.3)} color="white"></Entypo>
                                        </TouchableOpacity>
                                    </View>
                                ))}
                            </View> : <View></View>}



                    </ScrollView>
                    <Animated.View style={[styles.fullScreenAnimate, this.animationStyle(), { opacity: this.state.startValue }]}>
                        <FlatList
                            style={{ paddingTop: hp(8), flex: 1 }}
                            columnWrapperStyle={styles.listContainer}
                            data={this.materiasFilter(this.state.materiasBase)}
                            numColumns={2}
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
                                inputContainerStyle={{ backgroundColor: '#FFF7EE' }}
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
                                 onValueChange={(id_monedaNueva) => this.setState({nuevaMoneda: id_monedaNueva})}
                                 items={this.moneyPikerList(this.state.monedaBase)}
                             />
                                <TextInput style={[styles.inputMonto, styles.shadowLight]}
                                    value={this.state.nuevoMonto}
                                    placeholder="Monto"
                                    placeholderTextColor="grey"
                                    underlineColorAndroid='transparent'
                                    onChangeText={(text) => this.setState({ mail: text })}
                                />
                                </View>
                                <View style={[{ flexDirection: "row" }]}>
                                    <TouchableOpacity style={[styles.buttonContainerLogin]}
                                        onPress={() => this.addNewMoney()}>
                                        <Text style={styles.loginText}>Aceptar</Text>
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
    //Materias
    materiasViewContainer: {
        borderColor: "#DFD8C8",
        paddingTop: hp(2.2),
        marginHorizontal: wp(8),
        justifyContent: "center",
        alignItems: "center",
    },
    materiasContainer: {
        backgroundColor: 'white',
        borderRadius: 10
    },
    materiasBackground: {
        backgroundColor: '#F28C0F',
        flexDirection: 'row',
        borderRadius: 10,
        alignItems: 'center',
        paddingHorizontal: wp("2"),
        paddingVertical: hp("2"),
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
        alignItems: "center",
        paddingTop: hp(2.2),
        paddingBottom: hp(2.2),
        borderBottomWidth: 1,
        borderColor: "#DFD8C8",
        marginHorizontal: wp(8)
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
  buttonContainerLogin: {
    height: hp(5.5),
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
  }
    //MODAL
});
export default withNavigation(PerfilEdit);