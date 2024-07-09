import { Image, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { scale } from 'react-native-size-matters'
import { useSelector } from 'react-redux'
import heart from "./../../../assets/images/heart.png"
import { Rating, AirbnbRating } from 'react-native-ratings';

import star from "./../../../assets/images/star.png"
import TapRating from 'react-native-ratings/dist/TapRating'
import CustomRating from '../CustomRating/CustomRating'
const ProductCard = () => {
    const auth = useSelector(state => state.auth)
    console.log("auth", auth)
    const url = auth?.url || ""
    return (
        <View style={{
            width: "100%",
            paddingVertical: scale(20),
            paddingHorizontal: scale(10),
            borderRadius: scale(12),
            gap: scale(20)
        }}>
            <View style={{
                flexDirection: "row",
                justifyContent: "flex-start",
                gap: scale(10)
            }}>
                <Image
                    style={{
                        width: scale(120),
                        height: scale(100),
                        borderRadius: scale(10),
                        borderColor: "#FFA100",
                        borderWidth: scale(1)
                    }}
                    source={{ uri: url }}
                />
                <View style={{
                    gap: scale(14),
                    flexDirection: "row",
                    flexGrow: 1,
                    justifyContent: "space-between",

                }}>

                    <View>
                        <View>
                            <Text style={{
                                color: "white",
                                fontWeight: 600,
                                fontSize: scale(20),
                                lineHeight: scale(24),
                            }}>Hot Sauce</Text>
                            <Text style={{
                                color: "#FFA100",
                                fontWeight: 600,
                                fontSize: scale(12),
                                lineHeight: scale(25),
                            }}>Website Link</Text>
                        </View>
                        <View>
                            <Text style={{
                                color: "white",
                                fontWeight: 500,
                                fontSize: scale(12),
                                lineHeight: scale(14),
                            }}>212 Reviews</Text>
                           <CustomRating/>
                        </View>
                    </View>

                    <View>
                        <View style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                        }}>
                            <View style={{
                                alignItems: "center",
                                gap: scale(10)
                            }}>
                                <View style={{
                                    gap: scale(1),

                                }}>
                                    <Text style={{
                                        color: "#FFA100",
                                        fontWeight: 600,
                                        fontSize: scale(30),
                                        lineHeight: scale(36),
                                    }}>30</Text>
                                    <Text style={{
                                        color: "white",
                                        fontWeight: 600,
                                        fontSize: scale(10),
                                        lineHeight: scale(25),
                                        marginTop: scale(-6)
                                    }}>Check-ins</Text>
                                </View>
                                <TouchableOpacity>
                                    <Image style={{
                                        width: scale(25),
                                        height: scale(25)
                                    }} source={heart} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
            
        </View>
    )
}

export default ProductCard
