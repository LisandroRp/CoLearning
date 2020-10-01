import React from "react";
import { Component } from 'react';
import { StyleSheet, Text, View, Linking, TextInput } from "react-native";
import { FontAwesome, MaterialCommunityIcons, Feather, Entypo, Fontisto } from '@expo/vector-icons';

import ExportadorCreadores from "./ExportadorCreadores"
import { widthPercentageToDP as wp, heightPercentageToDP as hp, heightPercentageToDP } from 'react-native-responsive-screen';


class ExportadorContacto extends React.Component {

    contacto(item) {

        switch (item.id_contacto) {

            case 0:

                return (
                <View style={[{ flex: 1}]}>
                    <View style={styles.socialMediaContainer}>
                        {/* <Image style={styles.logoSocialMediaImage} source={ExportadorLogos.traerInstagram()} /> */}
                        <View style={styles.logoSocialMedia}>
                            <Fontisto style={{ textAlign: "center", paddingBottom: hp(1.5) }} name={"instagram"} size={hp(2.5)} color='#F28C0F' />
                        </View>
                        <Text style={styles.socialMedia} onPress={() => Linking.openURL(ExportadorCreadores.queLinkInstagram() + item.des_contacto)}>{item.des_contacto}</Text>
                    </View>
                </View>
                )

            case 1:

                return (
                <View style={[{ flex: 1 }]}>
                    <View style={styles.socialMediaContainer}>
                        <View style={styles.logoSocialMedia}>
                            <Feather style={{ textAlign: "center", paddingBottom: hp(1.5) }} name={"phone"} size={hp(2.5)} color='#F28C0F' />
                        </View>
                        <Text style={styles.socialMedia} onPress={() => Linking.openURL(`tel:${item.des_contacto}`)} >{item.des_contacto}</Text>
                    </View>
                </View>
                )

            case 2: 
            return (
            <View style={[{ flex: 1 }]}>
                <View style={styles.socialMediaContainer}>
                    <View style={styles.logoSocialMedia}>
                        <MaterialCommunityIcons style={{ textAlign: "center", paddingBottom: hp(1.2) }} name={"email-outline"} size={hp(2.5)} color='#F28C0F' />
                    </View>
                    <Text style={styles.socialMedia} onPress={() => Linking.openURL('mailto:' + item.des_contacto)}>{item.des_contacto}</Text>
                </View>
            </View>
            )

            case 3: 
            return (
            <View style={[{ flex: 1 }]}>
                <View style={styles.socialMediaContainer}>
                    <View style={styles.logoSocialMedia}>
                        <Fontisto style={{ textAlign: "center", paddingBottom: hp(1.5) }} name={"whatsapp"} size={hp(2.5)} color='#F28C0F' />
                    </View>
                    {/* <Image style={styles.logoSocialMediaImage} source={ExportadorLogos.traerWpp()} /> */}
                    <Text style={styles.socialMedia}  onPress={() => Linking.openURL('whatsapp://send?&phone=+549' + item.des_contacto)}>{item.des_contacto}</Text>
                </View>
            </View>
            )
        }
    }
}
const styles = StyleSheet.create({
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
},
})
export default new ExportadorContacto();