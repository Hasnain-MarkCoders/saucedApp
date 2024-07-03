import { ImageBackground, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Header from '../../components/Header/Header'
import home from './../../../assets/images/home.png';
import Banner from '../../components/Banner/Banner';
import { scale, verticalScale } from 'react-native-size-matters';
import { UNSPLASH_URL, VITE_UNSPLASH_ACCESSKEY } from "@env"
import axios from 'axios';
import BannerList from '../../components/BannerList/BannerList';
import AwardList from '../../components/AwardList/AwardList.jsx';
import { FlatList } from 'react-native-gesture-handler';

const Awards = () => {
    const [data, setData] = useState([])
    const [page, setPage] = useState(1)
    const [hasMore, setHasMore] = useState(true)
    const [loading, setLoading] = useState(false);
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
    return (
        <ImageBackground style={{ flex: 1, width: '100%', height: '100%' }} source={home}>
            <SafeAreaView style={{ flex: 1, paddingBottom: verticalScale(90) }}>
                <Header headerContainerStyle={{
                    paddingBottom: verticalScale(30)
                }} showText={false} />

                <FlatList
                    data={[1, 1]}
                    renderItem={({ item, index }) => {
                        return (<View style={{
                            paddingHorizontal: scale(20)

                        }}>
                            {

                                index == 0 && <BannerList loading={loading} hasMore={hasMore} setPage={setPage} data={data} />
                            }
                            {
                                index == 1 && <AwardList loading={loading} hasMore={hasMore} setPage={setPage} data={data} />

                            }
                        </View>)

                    }}

                />

            </SafeAreaView>
        </ImageBackground>
    )
}

export default Awards

const styles = StyleSheet.create({
    separator: {
        marginRight: scale(20),
    }

})