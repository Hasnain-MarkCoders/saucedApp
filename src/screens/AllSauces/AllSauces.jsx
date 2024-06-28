import { Image, ImageBackground, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import home from './../../../assets/images/home.png';
import banner from "./../../../assets/images/banner.png"
import qr from "./../../../assets/images/qr.png"
import sauce1 from "./../../../assets/images/sauce1.png"
import SingleSauce from '../../components/SingleSauce/SingleSauce';
import { featuredSauces, topRatedSauces } from '../../../utils';
import SauceList from '../../components/SauceList/SauceList';
import BrandList from '../../components/BrandList/BrandList';
const AllSauces = () => {
    return (
        <ImageBackground style={{
            flex: 1,
            width: '100%',
            height: '100%',
        }} source={home} >
            <ScrollView style={{
                flex: 1
            }}>

                <SafeAreaView style={{
                    paddingVertical: 70,
                    paddingHorizontal: 20,
                    flex: 1
                }}>
                    <View style={{
                        gap: 10
                    }}>
                        <View style={{
                            flexDirection: "row",
                            gap: 10
                        }}>
                            <View
                                style={{
                                    height: 50,
                                    borderRadius: 10,
                                    borderWidth: 1,
                                    borderColor: "#FFA100",
                                    flexGrow: 1,
                                }}>

                            </View>
                            <Image
                                source={qr}
                                style={{
                                    borderRadius: 10,
                                    width: 50,
                                    height: 50
                                }} />
                        </View>

                        <Text style={{
                            color: "white",
                            fontSize: 10,
                            lineHeight: 13,
                            fontFamily: "Montserrat"
                        }}>
                            Don't see what you're looking for, request a sauce or brand
                        </Text>
                    </View>


                    <View style={{
                        marginTop: 40,
                        gap: 50,

                    }}>

                        <View style={{
                            gap: 10
                        }}>

                            <View style={{ position: "relative", width: "100%", height: 130 }}>
                                <Image
                                    source={banner}
                                    style={{
                                        width: "100%",
                                        height: 130,
                                        borderRadius: 10
                                    }}
                                />
                                <View style={{
                                    position: "absolute",
                                    top: "50%",
                                    left: "10%",
                                    fontSize: 20,
                                    transform: [{ translateY: -25 }, { translateX: -10 }],
                                }}>

                                    <Text style={{
                                        color: "white",
                                        fontSize: 23,
                                        fontWeight: 'bold',
                                    }}>
                                        Hot Sauce
                                    </Text>
                                    <Text style={{
                                        color: "white",
                                        fontSize: 23,
                                        fontWeight: 'bold',
                                    }}>
                                        Event
                                    </Text>

                                </View>
                            </View>

                            <Text style={{
                                color: "white",
                                fontSize: 10,
                                lineHeight: 13,
                                fontFamily: "Montserrat"
                            }}>
                                Don't see what you're looking for, request a sauce or brand
                            </Text>
                        </View>
                        <SauceList title='Featured Sauces' data={featuredSauces} />
                        <SauceList title='Top Rated Sauces' data={topRatedSauces} />
                        <BrandList title='Top Rated Brands' data={topRatedSauces} />

                    </View>

                </SafeAreaView>
            </ScrollView>
        </ImageBackground>
    )
}

export default AllSauces

const styles = StyleSheet.create({})