import { Image, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import banner from "./../../../assets/images/banner.png";
import { moderateScale, verticalScale } from 'react-native-size-matters';

const Banner = ({
    url = "",
    infoText="",
    showText =true
}) => {
    return (
        <View style={styles.mainBanner}>

           { url && <View style={styles.bannerContainer}>
             <Image source={{uri:url}} style={styles.bannerImage} />
            

                <View style={styles.bannerTextContainer}>
                    <Text style={styles.bannerText}>Hot Sauce</Text>
                    <Text style={styles.bannerText}>Event</Text>
                </View>

            </View>}
           {showText? <Text style={styles.infoText}>
            {infoText}
            </Text>:null}
        </View>
    )
}

export default Banner

const styles = StyleSheet.create({
    infoText: {
        color: "white",
        fontSize: moderateScale(10),
        lineHeight: verticalScale(13),
        fontFamily: "Montserrat",
    },
    mainBanner: {
        position: "relative",
        gap: verticalScale(10),
        marginBottom: verticalScale(50),
        minWidth:verticalScale(250)

    },
    bannerContainer: {
        position: "relative",
        width: "100%",
        height: verticalScale(130),
        gap: verticalScale(10),
    },
    bannerImage: {
        width: "100%",
        height: "100%",
        borderRadius: moderateScale(10),
    },
    bannerTextContainer: {
        position: "absolute",
        top: "50%",
        left: "10%",
        transform: [{ translateY: -25 }, { translateX: -10 }],
    },
    bannerText: {
        color: "white",
        fontSize: moderateScale(23),
        fontWeight: 'bold',
    }
})