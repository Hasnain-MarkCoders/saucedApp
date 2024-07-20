import { Image, Text, TouchableOpacity, View, Linking } from 'react-native'
import React, { useState } from 'react'
import { scale } from 'react-native-size-matters'
import { useSelector } from 'react-redux'
import emptyheart from "./../../../assets/images/emptyHeart.png"
import filledHeart from "./../../../assets/images/filledHeart.png"

import Lightbox from 'react-native-lightbox';
import wishlist_icon from "./../../../assets/images/wishlist_icon.png"
import star from "./../../../assets/images/star.png"
import wishlist_filled from "./../../../assets/images/wishlist_filled.png"


import CustomRating from '../CustomRating/CustomRating'
import Snackbar from 'react-native-snackbar'
import { useNavigation } from '@react-navigation/native'
const ProductCard = ({
    url = "",
    title = "",
    setshowListModal = () => { }
}) => {
    const navigation = useNavigation()
    const [LightBox, setLightBox] = useState(false)
    const [productStatus, setproductStatus] = useState({
        isChecked: false,
        isAddedToWishList: false,
        isAddedToList: false
    })
    return (
        <View style={{
            width: "100%",
            paddingVertical: scale(20),
            gap: scale(20),
        }}>
            <View style={{
                flexDirection: "row",
                justifyContent: "flex-start",
                gap: scale(20),
            }}>
                <View style={{
                }}>

                    <Lightbox
                        activeProps={{ resizeMode: LightBox ? 'contain' : "cover" }}
                        springConfig={{ tension: 30, friction: 7 }}
                        onOpen={() => setLightBox(true)}
                        willClose={() => setLightBox(false)}
                    >
                        <Image
                            style={{
                                width: LightBox ? "100%" : scale(120),
                                height: LightBox ? "100%" : scale(100),
                                minWidth: scale(120),
                                minHeight: scale(100),
                                borderRadius: LightBox ? 0 : scale(10),
                                borderColor: LightBox ? 0 : "#FFA100",
                                borderWidth: LightBox ? 0 : scale(1)
                            }}
                            source={{ uri: url }}
                        />
                    </Lightbox>
                </View>
                <View style={{
                    gap: scale(14),
                    flexDirection: "row",
                    flexGrow: 1,
                    flexShrink: 1,
                    justifyContent: "space-between",

                }}>

                    <View style={{
                        gap: scale(10),
                        flexBasis: "50%"
                    }}>
                        <View>
                            <Text

                                numberOfLines={1} ellipsizeMode="tail"
                                style={{
                                    color: "white",
                                    fontWeight: 600,
                                    fontSize: scale(20),
                                    lineHeight: scale(24),
                                }}>{title}</Text>
                        </View>
                        <TouchableOpacity onPress={() => {
                            navigation.navigate("AllReviews")
                        }}>
                            <Text style={{
                                color: "white",
                                fontWeight: 500,
                                fontSize: scale(12),
                                lineHeight: scale(14),
                            }}>212 Reviews</Text>
                            <CustomRating ratingContainerStyle={{
                                pointerEvents: "none",
                            }

                            } />
                        </TouchableOpacity>
                    </View>

                    <View style={
                        {

                        }
                    }>
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
                                <View style={{
                                    flexDirection: "row",
                                    gap: scale(10)
                                }}>

                                    <TouchableOpacity
                                        onPress={() => {
                                            setproductStatus(prev => ({
                                                ...prev,
                                                isChecked: !prev.isChecked
                                            }));
                                            Snackbar.show({
                                                text: !productStatus.isChecked ? 'You love this product.' : "You unlove this product.",
                                                duration: Snackbar.LENGTH_SHORT,
                                                action: {
                                                    text: 'UNDO',
                                                    textColor: 'green',
                                                    onPress: () => {

                                                        setproductStatus(prev => ({
                                                            ...prev,
                                                            isChecked: !prev.isChecked

                                                        }))
                                                    },
                                                },
                                            });
                                        }}
                                    >
                                        <Image style={{
                                            width: scale(20),
                                            height: scale(20),
                                            objectFit: "contain"
                                        }} source={productStatus.isChecked ? filledHeart : emptyheart} />
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        onLongPress={() => {
                                            setshowListModal(true)
                                        }}
                                        onPress={() => {
                                            setproductStatus(prev => ({
                                                ...prev,
                                                isAddedToWishList: !prev.isAddedToWishList

                                            }));
                                            Snackbar.show({
                                                text: !productStatus.isAddedToWishList ? 'You Added this product in Wishlist.' : "You removed this product in Wishlist.",
                                                duration: Snackbar.LENGTH_SHORT,
                                                action: {
                                                    text: 'UNDO',
                                                    textColor: 'green',
                                                    onPress: () => {
                                                        setproductStatus(prev => ({
                                                            ...prev,
                                                            isAddedToWishList: false

                                                        }));

                                                    },
                                                },
                                            });
                                        }}
                                    >
                                        <Image style={{
                                            width: scale(20),
                                            height: scale(20)
                                        }} source={productStatus.isAddedToWishList ? wishlist_filled : wishlist_icon} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            </View>


            <View style={{
                alignItems: "flex-start",
                gap: scale(20)

            }}>

                <View style={{ flexDirection: "row", gap: scale(20), alignItems: "flex-start", }}>

                    <View>
                        <Text>
                            Website Link:
                        </Text>
                        <TouchableOpacity onPress={() => {
                            Linking.openURL(url)
                        }}>
                            <Text style={{
                                color: "#FFA100",
                                fontWeight: 600,
                                fontSize: scale(12),
                                lineHeight: scale(25),
                            }}>www.unsplash.com</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{
                        width: scale(1),
                        height: "80%",
                        backgroundColor: "#FFA100",
                    }}>

                    </View>
                    <View>
                        <Text>
                            Product Link:
                        </Text>
                        <TouchableOpacity onPress={() => {
                            Linking.openURL(url)
                        }}>
                            <Text style={{
                                color: "#FFA100",
                                fontWeight: 600,
                                fontSize: scale(12),
                                lineHeight: scale(25),
                            }}>amazon hot sauce bottles</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <TouchableOpacity
                    onPress={() => {
                        // Linking.openURL(url)
                        navigation.navigate("Checkin")

                    }}
                    style={{
                        paddingHorizontal: scale(10),
                        paddingVertical: scale(6),
                        backgroundColor: "#FFA100",
                        borderRadius: scale(5),
                        elevation: scale(5),
                        alignSelf: "flex-end",

                    }}>
                    <Text style={{
                        color: "black",
                        fontWeight: "700"

                    }}>Check in</Text>


                </TouchableOpacity>

            </View>

        </View>
    )
}

export default ProductCard
