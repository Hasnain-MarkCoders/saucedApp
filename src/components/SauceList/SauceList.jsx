import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import { UNSPLASH_URL, VITE_UNSPLASH_ACCESSKEY } from "@env"
import SingleSauce from '../SingleSauce/SingleSauce';
import axios from 'axios';

const SauceList = ({  title = "" , name=""}) => {
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
        <View style={styles.container}>
            <View style={{
                flexDirection:"row", gap:scale(10)
            }}>
            <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            style={[styles.title, {maxWidth:scale(100)}]}>{name}</Text>
               <Text
            
            style={[styles.title]}>{title}</Text>
            </View>
         
            <FlatList
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                horizontal
                data={data}
                onEndReachedThreshold={0.5}
                onEndReached={() => {
                    if (!loading && hasMore) {
                        setPage(currentPage => currentPage + 1);
                    }
                }}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => <SingleSauce url={item?.urls?.small} title={item.user.username} />}
                ItemSeparatorComponent={() => <View style={styles.separator} />}
            />
             {

loading &&   <ActivityIndicator size="small" style={{marginBottom:scale(20)}} color="#FFA100" />
}
        </View>
    );
};

export default SauceList;

const styles = StyleSheet.create({
    container: {
        gap: verticalScale(20), // This property might not work as expected in all RN versions. If it doesn't, consider adding margins manually in child components.
    },
    title: {
        color: "white",
        lineHeight: verticalScale(29),
        fontSize: moderateScale(24),
        fontWeight: "600",
    },
    separator: {
        marginRight: scale(20),
    }
});
