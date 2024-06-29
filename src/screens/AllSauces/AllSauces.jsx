import React, { useEffect, useState } from 'react';
import { Image, ImageBackground, ScrollView, StyleSheet, Text, TouchableOpacity, View , Alert} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { scale, verticalScale, moderateScale, moderateVerticalScale } from 'react-native-size-matters';

import home from './../../../assets/images/home.png';
import banner from "./../../../assets/images/banner.png";
import qr from "./../../../assets/images/qr.png";
import SingleSauce from '../../components/SingleSauce/SingleSauce';
import { Brands, featuredSauces, handleText, topRatedSauces } from '../../../utils';
import SauceList from '../../components/SauceList/SauceList';
import BrandList from '../../components/BrandList/BrandList';
import CustomInput from '../../components/CustomInput/CustomInput';
import CustomButtom from '../../components/CustomButtom/CustomButtom';
import Ionicons from 'react-native-vector-icons/Ionicons';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';

const AllSauces = () => {

    const [showQR, setShowQR] = useState(false)
    const [torch, setTorch] = useState(false)
    const [data, setData] = useState({
        search: "",
    });


    onSuccess = e => {
        // Linking.openURL(e.data).catch(err =>
        //     console.error('An error occured', err)
        // );
        Alert.alert("QR Code", e.data);
    };
    useEffect(() => {
        console.log(data)
    }, [data])



    return (

        <>
            {showQR ?
                <View style={{
                    position: "relative",
                    width: "100%",
                    height: "100%"
                }}>
                    <QRCodeScanner
                    containerStyle={{
                        backgroundColor:"black"
                    }}
                    reactivateTimeout={5000}
                        fadeIn={true}
                        showMarker={true}
                        reactivate={true}
                        onRead={onSuccess}
                        flashMode={torch ? RNCamera.Constants.FlashMode.torch:RNCamera.Constants.FlashMode.off}
                        cameraStyle={{ width: '100%', height: '100%' }} // Making QR scanner full screen
                        topContent={
                            <Text>Scan the QR code from your computer.</Text>
                        }
                    />
                    <TouchableOpacity
                    onPress={()=>setShowQR(false)}
                    
                    style={{
                        position: "absolute",
                        top: 10,
                        right: 10
                    }}>
                        <Ionicons name={"close-sharp"} size={50} color={"black"} />
                    </TouchableOpacity>

                    <TouchableOpacity
                    onPress={()=>setTorch(prev=>!prev)}
                    
                    style={{
                        position: "absolute",
                        top: 10,
                        left: 10
                    }}>
                        <Ionicons name={torch?"flash-off-outline":"flash-outline"} size={50} color={"black"} />
                    </TouchableOpacity>

                    
                </View>



                : <ImageBackground source={home} style={styles.background}>
                    <ScrollView style={styles.scrollView}>
                        <SafeAreaView style={styles.safeArea}>







                            <View style={styles.searchContainer}>
                                <View style={styles.searchBarContainer}>
                                    <CustomInput
                                        name="search"
                                        onChange={handleText}
                                        updaterFn={setData}
                                        value={data.search}
                                        showTitle={false}
                                        placeholder="Search For Sauce..."
                                        containterStyle={{
                                            flexGrow: 1,
                                        }}
                                        inputStyle={{
                                            borderColor: "#FFA100",
                                            borderWidth: 1,
                                            borderRadius: 10,
                                            padding: 15,

                                        }} />

                                    <TouchableOpacity onPress={() => { setShowQR(true) }}>
                                        <View>

                                            <Image source={qr} style={styles.qrImage} />
                                        </View>
                                    </TouchableOpacity>
                                </View>
                                <Text style={styles.infoText}>
                                    Don't see what you're looking for? Request a sauce or brand.
                                </Text>

                            </View>

                            <View style={styles.mainBanner}>

                                <View style={styles.bannerContainer}>
                                    <Image source={banner} style={styles.bannerImage} />
                                    <View style={styles.bannerTextContainer}>
                                        <Text style={styles.bannerText}>Hot Sauce</Text>
                                        <Text style={styles.bannerText}>Event</Text>
                                    </View>

                                </View>
                                <Text style={styles.infoText}>
                                    Don't see what you're looking for? Request a sauce or brand.
                                </Text>
                            </View>
                            <View style={styles.contentContainer}>

                                <SauceList title='Featured Sauces' data={featuredSauces} />

                                <SauceList title='Top Rated Sauces' data={topRatedSauces} />
                                <CustomButtom
                                    buttonTextStyle={{ fontSize: verticalScale(15) }}
                                    buttonstyle={{ width: "100%", borderColor: "#FFA100", padding: verticalScale(15), backgroundColor: "#2E210A" }}
                                    onPress={() => console.log("hello from sauces list")}
                                    title={"Hot Sauce Map"}
                                />
                                <BrandList title='Top Rated Brands' data={Brands} />
                                <CustomButtom
                                    buttonTextStyle={{ fontSize: verticalScale(15) }}
                                    buttonstyle={{ width: "100%", borderColor: "#FFA100", padding: verticalScale(15), backgroundColor: "#2E210A" }}
                                    onPress={() => console.log("hello from sauces list")}
                                    title={"Want to List Sauce?"}
                                />

                            </View>
                        </SafeAreaView>
                    </ScrollView>
                </ImageBackground>}
        </>
    );
};

const styles = StyleSheet.create({
    background: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
    scrollView: {
        flex: 1,
    },
    safeArea: {
        paddingTop: verticalScale(30),
        paddingBottom: verticalScale(150),
        paddingHorizontal: moderateScale(20),
        flex: 1,
    },
    closeButton: {
        alignSelf: 'center',
        marginTop: 20,
    },
    fullScreen: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        flex: 1
    },
    searchContainer: {
        marginBottom: verticalScale(20),

    },
    searchBarContainer: {
        flexDirection: "row",
        alignItems: 'end',
        marginBottom: verticalScale(10),
        gap: 10
    },
    searchBar: {
        height: verticalScale(50),
        borderRadius: moderateScale(10),
        borderWidth: 1,
        borderColor: "#FFA100",
        flexGrow: 1,
        marginRight: scale(10),
    },
    qrImage: {
        borderRadius: moderateScale(10),
        width: scale(50),
        height: scale(50),
    },
    infoText: {
        color: "white",
        fontSize: moderateScale(10),
        lineHeight: verticalScale(13),
        fontFamily: "Montserrat",
    },
    contentContainer: {
        gap: verticalScale(40),
    },
    mainBanner: {
        position: "relative",
        gap: verticalScale(10),
        marginBottom: verticalScale(50)

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
});

export default AllSauces;
