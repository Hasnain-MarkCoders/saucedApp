import { ImageBackground, SafeAreaView, StyleSheet, ScrollView, Text, View, Keyboard } from 'react-native'
import React, { useEffect, useState } from 'react'
import Header from '../../components/Header/Header.jsx'
import home from './../../../assets/images/home.png';
import { scale, verticalScale } from 'react-native-size-matters';
import { UNSPLASH_URL, VITE_UNSPLASH_ACCESSKEY } from "@env"
import axios from 'axios';
import FollowersList from '../../components/FollowersList/FollowersList.jsx';
import { useNavigation } from '@react-navigation/native';
import { handleText } from '../../../utils.js';
import CustomInput from '../../components/CustomInput/CustomInput.jsx';
import { FlatList } from 'react-native-gesture-handler';
const FollowingScreen = () => {
    const [data, setData] = useState([])
    const [page, setPage] = useState(1)
    const [hasMore, setHasMore] = useState(true)
    const [loading, setLoading] = useState(false);
    const [isKeyBoard, setIsKeyBoard]= useState(false)
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

                setData(prev=>[...res?.data?.results,...prev ]);

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
                    setData(prevData => [ ...res?.data,...prevData,]);
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
            <SafeAreaView style={{ flex: 1, paddingBottom:isKeyBoard ? 0 : verticalScale(0) }}>

                <Header cb={() => navigation.navigate("Home")} showProfilePic={false} headerContainerStyle={{
                    paddingBottom: scale(20)
                }} title={"Followers"} showText={false} />


                <FlatList
                 showsVerticalScrollIndicator={false}
                 showsHorizontalScrollIndicator={false}
                
                data={[1, 1]}
                    renderItem={({ item, index }) => {
                        return (
                            <View style={{
                                flex: 1,

                                paddingHorizontal: scale(20)

                            }}>
                                {index == 0 &&

                                    <View style={{
                                        marginBottom: scale(20)
                                    }}>

                                        <Text style={{
                                            color: "white",
                                            fontWeight: 600,
                                            fontSize: scale(35),
                                            lineHeight: scale(50),
                                            marginBottom: scale(20)

                                        }}>
                                            Following

                                        </Text>

                                        <CustomInput
                                            cb={() => setPage(1)}
                                            name="search"
                                            onChange={handleText}
                                            updaterFn={setQuery}
                                            value={query.search}
                                            showTitle={false}
                                            placeholder="Search Followers..."
                                            containterStyle={{
                                                flexGrow: 1,
                                            }}
                                            inputStyle={{
                                                borderColor: "#FFA100",
                                                borderWidth: 1,
                                                borderRadius: 10,
                                                padding: 15,

                                            }} />
                                    </View>}
                                {
                                    index == 1 &&  <View style={{
                                        alignItems:"center"
                                    }}>
                                        
                                        <Text style={{
                                        color: "white",
                                        fontWeight: 600,
                                        fontSize: scale(24),
                                        lineHeight: scale(28),
                                        marginBottom: scale(20),
                                        alignSelf:"flex-start"
                                    }}>
                                        All Following
                                    </Text><FollowersList loading={loading} hasMore={hasMore} setPage={setPage} data={data} /></View>
                                   
                                    
                                }
                            </View>

                        )
                    }}
                />
            </SafeAreaView>
        </ImageBackground>
    )
}

export default FollowingScreen

const styles = StyleSheet.create({
    separator: {
        marginRight: scale(20),
    }

})