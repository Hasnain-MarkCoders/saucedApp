import { ImageBackground, SafeAreaView, StyleSheet, ScrollView, Text, View, Keyboard, TouchableOpacity, Vibration, Image, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import Header from '../../components/Header/Header.jsx'
import home from './../../../assets/images/home.png';
import { scale, verticalScale } from 'react-native-size-matters';
import { UNSPLASH_URL, VITE_UNSPLASH_ACCESSKEY } from "@env"
import axios from 'axios';
import FollowersList from '../../components/FollowersList/FollowersList.jsx';
import { useNavigation, useRoute } from '@react-navigation/native';
import { FlatList } from 'react-native-gesture-handler';
import HorizontalUsersList from '../../components/HorizontalUsersList/HorizontalUsersList.jsx';
import SauceList from '../../components/SauceList/SauceList.jsx';
import { handleText, topRatedSauces } from '../../../utils.js';
import ProfileCard from '../../components/ProfileCard/ProfileCard.jsx';
import CustomInput from '../../components/CustomInput/CustomInput.jsx';
import ExternalUserCard from '../../components/ExternalUserCard/ExternalUserCard.jsx';
import CustomButtom from '../../components/CustomButtom/CustomButtom.jsx';
import arrow from "./../../../assets/images/arrow.png";

const ExternalProfileScreen = ({
}) => {
    const route = useRoute()
    const name = route?.params?.name
    const url = route?.params?.url
    const [data, setData] = useState([])
    const [page, setPage] = useState(1)
    const [hasMore, setHasMore] = useState(true)
    const [loading, setLoading] = useState(false);
    const [isKeyBoard, setIsKeyBoard] = useState(false)
    const [query, setQuery] = useState({
        search: "",
    });
    const navigation = useNavigation()
    useEffect(() => {
        const showSubscription = Keyboard.addListener("keyboardDidShow", () => {
            setIsKeyBoard(true)
            console.log('Keyboard is open');
        });
        const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
            setIsKeyBoard(false)
            console.log('Keyboard is closed');
        });

        // Cleanup function
        return () => {
            showSubscription.remove();
            hideSubscription.remove();
        };
    }, []);
    useEffect(() => {
        const fetchPhotos = async () => {
            if (!query?.search?.trim()) {
                return
            }
            console.log("query.search", query.search)
            if (loading) return;
            console.log("page", page)
            setLoading(true);
            try {
                const res = await axios.get(`${UNSPLASH_URL}/search/photos`, {
                    params: {
                        client_id: VITE_UNSPLASH_ACCESSKEY,
                        page: page,
                        query: query?.search
                    }
                });

                setData(prev => [...prev, ...res.data.results]);

            } catch (error) {
                console.error('Failed to fetch photos:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchPhotos();
    }, [query.search, page]);

    useEffect(() => {
        const fetchPhotos = async () => {
            if (query?.search.trim()) {
                return
            }
            if (!hasMore || loading) return;
            setLoading(true);
            try {
                const res = await axios.get(`${UNSPLASH_URL}/photos`, {
                    params: {
                        client_id: VITE_UNSPLASH_ACCESSKEY,
                        page: page
                    }
                });
                console.log("page", page)
                if (res.data.length === 0) {
                    setHasMore(false);
                } else {
                    setData(prevData => [...prevData, ...res.data]);
                }
            } catch (error) {
                console.error('Failed to fetch photos:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchPhotos();
    }, [page]);
    return (
        <ImageBackground style={{ flex: 1, width: '100%', height: '100%' }} source={home}>
            <SafeAreaView style={{ flex: 1, paddingBottom: isKeyBoard ? 0 : verticalScale(0) }}>

                <Header
                    showMenu={false}
                    cb={() => navigation.goBack()} showProfilePic={false} headerContainerStyle={{
                        paddingBottom: scale(20)
                    }} showText={false} />

                <FlatList
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                    data={[1, 1, 1]}
                    renderItem={({ item, index }) => {
                        return (
                            <View style={{
                                width: "100%",
                                flex: 1,
                                paddingHorizontal: scale(20)

                            }}>

                                {
                                    index == 0 && <View style={{
                                        marginBottom: scale(20)
                                    }}>

                                        <View style={{
                                            flexDirection: "row",
                                            gap: scale(10)
                                        }}>

                                            <Text
                                                numberOfLines={1} ellipsizeMode="tail"

                                                style={{
                                                    color: "white",
                                                    fontWeight: 600,
                                                    fontSize: scale(35),
                                                    lineHeight: scale(50),
                                                    marginBottom: scale(20),
                                                    maxWidth: scale(130)

                                                }}>
                                                {name}

                                            </Text>

                                            <Text style={{
                                                color: "white",
                                                fontWeight: 600,
                                                fontSize: scale(35),
                                                lineHeight: scale(50),
                                                marginBottom: scale(20)

                                            }}>
                                                Profile

                                            </Text>
                                        </View>
                                        <ExternalUserCard name={name} url={url} />


                                    </View>
                                }
                                {
                                    index == 1 && <View>
                                        <View style={{
                                            marginBottom: scale(10)
                                        }}>

                                            <CustomInput
                                                cb={() => setPage(1)}
                                                name="search"
                                                onChange={handleText}
                                                updaterFn={setQuery}
                                                value={query.search}
                                                showTitle={false}
                                                placeholder="Search favourite..."
                                                containterStyle={{
                                                    flexGrow: 1,
                                                }}
                                                inputStyle={{
                                                    borderColor: "#FFA100",
                                                    borderWidth: 1,
                                                    borderRadius: 10,
                                                    padding: 15,

                                                }} />
                                        </View>
                                        <TouchableOpacity onPress={() => {
                                            Vibration.vibrate(10)
                                            navigation.navigate("AllReviews")
                                           
                                        }}>

                                            <Text style={{
                                                textDecorationLine: "underline", color: "white",
                                                fontSize: scale(10),
                                                fontWeight:700,
                                                lineHeight: scale(13),
                                                fontFamily: "Montserrat"
                                            }}>
                                                All hot sauce reviews
                                            </Text>
                                        </TouchableOpacity>

                                    </View>
                                }
                                {
                                    index == 2 && <View style={{
                                        marginTop: scale(30)
                                    }}>

                                        <SauceList name={name} title='favorites' data={topRatedSauces} />

                                        <View style={{
                                            marginTop:scale(60),
                                            marginBottom:scale(20),
                                            gap:scale(20)
                                        }}>
                                        <CustomButtom
                                    Icon={() => <Image source={arrow} />}
                                    showIcon={true}
                                    buttonTextStyle={{ fontSize: scale(14), fontWeight:700 }}
                                    buttonstyle={{ width: "100%", borderColor: "#FFA100", backgroundColor: "#2e210a", padding: 15, display: "flex", gap: 10, flexDirection: "row-reverse", alignItems: "center", justifyContent: "space-between" }}
                                    onPress={() => {
                                        Vibration.vibrate(10);
                                        Alert.alert("Blocked")

                                    }}
                                    title={`Blocked ${name}`}
                                    
                                />


<CustomButtom
                                    Icon={() => <Image source={arrow} />}
                                    showIcon={true}
                                    buttonTextStyle={{ fontSize: scale(14) , fontWeight:700}}
                                    buttonstyle={{ width: "100%", borderColor: "#FFA100", backgroundColor: "#2e210a", padding: 15, display: "flex", gap: 10, flexDirection: "row-reverse", alignItems: "center", justifyContent: "space-between" }}
                                    onPress={() => {
                                        Vibration.vibrate(10);
                                        Alert.alert("reported")

                                    }}
                                    title={`Report ${name}`}
                                    
                                />


<CustomButtom
                                    Icon={() => <Image source={arrow} />}
                                    showIcon={true}
                                    buttonTextStyle={{ fontSize: scale(14), fontWeight:700}}
                                    buttonstyle={{ width: "100%", borderColor: "#FFA100", backgroundColor: "#2e210a", padding: 15, display: "flex", gap: 10, flexDirection: "row-reverse", alignItems: "center", justifyContent: "space-between" }}
                                    onPress={() => {
                                        Vibration.vibrate(10);
                                        // navigation.navigate("SauceDetails")
                                        Alert.alert("shared")
                                    }}
                                    title={`Share ${name} Profile`}
                                    
                                />
                                        </View>
                                    </View>

                                }
                            </View>
                        )
                    }}
                />
            </SafeAreaView>
        </ImageBackground>
    )
}

export default ExternalProfileScreen

const styles = StyleSheet.create({
    separator: {
        marginRight: scale(20),
    }

})