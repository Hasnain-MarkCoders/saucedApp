import { Image, ImageBackground, StyleSheet, Text, TouchableOpacity, Vibration, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import home from "./../../../assets/images/home.png"
import { handleText } from '../../../utils'
import { scale } from 'react-native-size-matters'
import qr from "./../../../assets/images/qr.png"
import CustomInput from '../../components/CustomInput/CustomInput'
import QRScreen from '../QRScreen/QRScreen'
import { useNavigation } from '@react-navigation/native'
import SauceList from '../../components/SauceList/SauceList'
import ProductSearchList from '../../components/ProductSearchList/ProductSearchList'
import { UNSPLASH_URL, VITE_UNSPLASH_ACCESSKEY } from "@env"
import axios from 'axios'
const SearchScreen = () => {

    const [data, setData] = useState([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(false);
    const [query, setQuery] = useState({
        search: "",
    });
    const [showQRCode, setShowQRCode] = useState(false)
    const navigation = useNavigation()

    useEffect(() => {
        const fetchPhotos = async () => {
            if (!hasMore || loading) return;

            setLoading(true);
            try {
                const res = await axios.get(`${UNSPLASH_URL}/photos`, {
                    params: {
                        client_id: VITE_UNSPLASH_ACCESSKEY,
                        page: page
                    }
                });
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

    useEffect(() => {
        console.log("query.search", query.search)
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

                setData(prev=>[...res?.data?.results,...prev]);

            } catch (error) {
                console.error('Failed to fetch photos:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchPhotos();
    }, [query.search, page]);
    return (
        <>
        {
  showQRCode ?
    <QRScreen   navigation={navigation} showQRCode={showQRCode} closeQR={()=>{setShowQRCode(false)}}/>
       : <ImageBackground

            source={home}
            style={{
                flex: 1,
                paddingHorizontal:scale(20),
                paddingVertical:scale(20)
            }}>
            <View style={{
                marginBottom: scale(20)
            }}>
                <View style={{
                    flexDirection: "row",
                    alignItems: 'end',
                    marginBottom: scale(10),
                    gap: 10
                }}>
                    <CustomInput
                        name="search"
                        onChange={handleText}
                        updaterFn={setQuery}
                        value={query.search}
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

                    <TouchableOpacity onPress={() => { setShowQRCode(true) }}>
                        <View>

                            <Image source={qr} style={{
                                 borderRadius: scale(10),
                                 width: scale(50),
                                 height: scale(50)
                            }} />
                        </View>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity onPress={()=>{
                                    Vibration.vibrate(10)
                                    navigation.navigate("SauceDetails")
                                }}>

                <Text style={[{ color: "white",
        fontSize: scale(10),
        lineHeight: scale(13),
        fontFamily: "Montserrat"}, { textDecorationLine: "underline" }]}>
                    Don't see what you're looking for? Request a sauce or brand.
                </Text>
                </TouchableOpacity>

            </View>
            <View style={{
                flex:1,
                gap:scale(20)
            }}>
                <ProductSearchList  loading={loading} hasMore={hasMore} setPage={setPage} data={data}/>

            </View>
        </ImageBackground>
        }
        </>
    )
}

export default SearchScreen