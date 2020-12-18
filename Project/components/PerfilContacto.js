import React, { Component } from 'react';
import { View, ScrollView, StyleSheet, ActivityIndicator, Text, RefreshControl, Dimensions, TouchableOpacity, StatusBar, FlatList } from 'react-native';
import { SearchBar, Icon } from 'react-native-elements';
import { withNavigation } from 'react-navigation';
import { FontAwesome, Feather, Fontisto, MaterialCommunityIcons } from '@expo/vector-icons';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

import ApiController from "../controller/ApiController";
import ExportadorLogos from './exportadores/ExportadorLogos'
import ExportadorObjetos from './exportadores/ExportadorObjetos'
import ExportadorContacto from './exportadores/ExportadorContacto'


var { height, width } = Dimensions.get('window');

class UserContactoEdit extends Component {

    constructor(props) {
        super(props);
        this.state = {
            perfil: {},
            rating: 0,
            max_rating: 5,
            isLoading: true,
            id_idioma: 0,
            tema: '',
            direccion: '',
            usuario: {},
            dias: ["L", "Ma", "Mi", "J", "V", "S", "D"],
            turnos: ["Mañana", "Tarde", "Noche"],
            nuevosHorarios: []
        };
        this.Star = ExportadorLogos.traerEstrellaLlena();
        this.Star_With_Border = ExportadorLogos.traerEstrellaBorde();
    }
    componentDidMount = async () =>{
        ApiController.getUsuarioById((await this.props.navigation.getParam("id_usuario")) ? await this.props.navigation.getParam("id_usuario") : this.props.id_usuario, this.okUsuario.bind(this))
    }
    okUsuario(usuario){
        ApiController.getHorarios(ExportadorObjetos.createUsuario(usuario), this.okHorarios.bind(this))
    }
    okHorarios(usuario, horarios){
        usuario.horarios = horarios
        this.setState({usuario: usuario, isLoading: false})
    }

    addBorderSize(index) {
        if (index < this.state.dias.length) {
            return { borderRightWidth: 1 }
        }
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
    //************************ */
    //Contacto
    //************************ */
    //Horarios
    isCheckHorario(dia, turno) {
        var contador = 0;
        if(this.state.usuario.horarios){
            while (contador < this.state.usuario.horarios.length) {
                if (this.state.usuario.horarios[contador].dia == dia && this.state.usuario.horarios[contador].turno == turno) {
                    return <TouchableOpacity><FontAwesome name={"check"} size={hp(3)} color="#5EC43A" /></TouchableOpacity>
                }
                contador++
            }
        }
        return
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

    render() {
        const element = (data, index) => (
            <View style={[styles.checkBoxContainer]}>
                {/* <TouchableOpacity style={[styles.checkBox, styles.shadow]} disabled={true} onPress={() => this.abmDondeClases(data, index)} /> */}
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
                <ScrollView refreshControl={
                    <RefreshControl refreshing={this.state.isRefreshing} tintColor={"#F28C0F"} onRefresh={() => {this.setState({isLoading: true}), ApiController.getUsuarioById(this.state.usuario.id_usuario, this.okUsuario.bind(this))}} />
                } style={styles.containerScroll}>
                <View style={styles.container}>
                    <View style={styles.allSocialMediaContainer}>
                        <View style={styles.topBox}>
                            <Text style={[styles.text, { fontSize: wp(4.8) }]}>Horarios Disponibles</Text>
                        </View>
                        
                        <Table style={{ flexDirection: "row" }}>
                            <TableWrapper style={{ width: 80 }}>
                                <Cell data="" style={styles.singleHead} />
                                <TableWrapper style={{ flexDirection: 'row'}}>
                                    <Col data={turnos} heightArr={[hp(6), hp(6), hp(6)]} textStyle={styles.text} />
                                </TableWrapper>
                            </TableWrapper>

                            {/* Right Wrapper */}
                            <TableWrapper style={{ flex: 1 }}>
                                <Cols data={tableData} heightArr={[hp(3.3), hp(6), hp(6), hp(6), hp(6), hp(6), hp(6)]} textStyle={styles.text} />
                            </TableWrapper>
                        </Table>
                        <View style={{borderColor: "#DFD8C8", borderBottomWidth: 1, paddingBottom: hp(3.3), marginHorizontal: wp(8)}}/>
                            
                        {this.contactoList().length != 0 ?     
                        <View style={styles.bottomBox}>
                                <Text style={[styles.text, { fontSize: wp(4.8), alignSelf: "center" }]}>Contacto</Text>
                                <FlatList
                                    data={this.contactoList()}
                                    numColumns={2}
                                    scrollEnabled= {false}
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
                        <View/>
                        }
                    </View>
                    </View>
                </ScrollView>
            );
        }
    }
};
const resizeMode = 'center';
const styles = StyleSheet.create({

    containerScroll: {
        backgroundColor: "#FFF7EE",
        flex: 1,
    },

    container: {
        backgroundColor: "#FFF7EE",
        justifyContent: "center",
        flex: 1,
    },

    socialMedia: {
        color: 'black',
        textDecorationLine: 'underline',
    },
    topBox: {
        alignItems: "center",
        paddingBottom: hp(2.2),
        marginHorizontal: wp(8),
        marginVertical: hp(2.2)
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
    // row: {
    //     flexDirection: 'row',
    //     height: hp(5),
    //     borderTopWidth: 1,
    //     borderColor: "#DFD8C8",
    // },
    // tableHeaderText: {
    //     flex: 1,
    //     borderLeftWidth: 1,
    //     borderColor: "#DFD8C8",
    // },
    // lineTableBox: {
    //     justifyContent: "center",
    //     paddingTop: hp(2.2),
    //     paddingBottom: hp(2.2),
    //     borderBottomWidth: 1,
    //     borderColor: "#DFD8C8",
    //     flexDirection: "row"
    // },
    // borderTable: {
    //     padding: 2,
    //     borderColor: "#DFD8C8"
    // },
    // textTableContainer: {
    //     borderBottomWidth: 1,
    //     paddingBottom: 5,
    //     borderColor: "#DFD8C8"
    // },
    // textTable: {
    //     fontFamily: "HelveticaNeue",
    //     textAlign: "center",
    //     color: "#52575D"
    // },
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
        backgroundColor: "transparent",
        position: 'absolute',
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
    }

})
export default withNavigation(UserContactoEdit);