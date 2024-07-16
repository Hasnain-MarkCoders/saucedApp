import { ImageBackground, SafeAreaView, StyleSheet, ScrollView, Text, View, Keyboard, TouchableOpacity, Vibration, Image, ActivityIndicator } from 'react-native'
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
import { generateThreeDigitRandomNumber, handleText, topRatedSauces } from '../../../utils.js';
import ProfileCard from '../../components/ProfileCard/ProfileCard.jsx';
import CustomInput from '../../components/CustomInput/CustomInput.jsx';
import ExternalUserCard from '../../components/ExternalUserCard/ExternalUserCard.jsx';
import ProfileImage from '../../components/ProfileImage/ProfileImage.jsx';
import emptyheart from "./../../../assets/images/emptyHeart.png"
import filledHeart from "./../../../assets/images/filledHeart.png"
import { useSelector } from 'react-redux';
import Snackbar from 'react-native-snackbar';
import CustomComment from '../../components/CustomComment/CustomComment.jsx';
const AllCheckinsScreen = ({
}) => {
    const route = useRoute()
    const [commentStatus, setCommentStatus] = useState(false)
    const name = route?.params?.name
    const url = route?.params?.url
    const auth = useSelector(state => state.auth)
    const uri = auth.url
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
                                    index == 0 &&

                                    <Text style={{
                                        color: "white",
                                        fontWeight: 600,
                                        fontSize: scale(35),
                                        lineHeight: scale(50),
                                        marginBottom: scale(20)

                                    }}>
                                        Check-ins

                                    </Text>
                                }
                                {
                                    index == 1 && <View style={{
                                    }}>


                                        <FlatList
                                            showsVerticalScrollIndicator={false}
                                            showsHorizontalScrollIndicator={false}
                                            data={data}
                                            onEndReachedThreshold={0.5}
                                            onEndReached={() => {
                                                if (!loading && hasMore) {
                                                    setPage(currentPage => currentPage + 1);
                                                }
                                            }}
                                            keyExtractor={(item, index) => index.toString()}
                                            renderItem={({ item, index }) => <CustomComment showImages={index%2!==0} profileUri={item?.urls?.small} uri={item.urls.small} />}
                                        />
     {

loading &&   <ActivityIndicator size="small" style={{marginBottom:scale(20)}} color="#FFA100" />
}



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

export default AllCheckinsScreen

const styles = StyleSheet.create({
    separator: {
        marginRight: scale(20),
    }

})