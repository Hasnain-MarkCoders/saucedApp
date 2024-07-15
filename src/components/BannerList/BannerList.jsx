import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import React, { memo, useEffect, useMemo, useRef, useState } from 'react';
import { FlatList } from 'react-native-gesture-handler';
import Banner from '../Banner/Banner';
import { scale } from 'react-native-size-matters';

const BannerList = ({
    data = [],
    hasMore = true,
    setPage = () => {},
    loading = false
}) => {
    const memoData = useMemo(() => data);
    const flatListRef = useRef(null);
    const [key, setKey] = useState(0);
  
    useEffect(() => {
        // Scroll to top when data length changes
        if (memoData.length > 0 && flatListRef.current) {
            flatListRef.current.scrollToIndex({ animated: true, index: 0 });
        }
    }, [memoData]);

    return (
        <View style={{ gap: scale(20) }}>
            <View style={{
                flexDirection: "row",
                gap: scale(10)
            }}>
                <FlatList
                    ref={flatListRef}
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                    pagingEnabled={true}
                    onViewableItemsChanged={({ viewableItems }) => {
                        if (viewableItems.length > 0) {
                            const visibleIndex = viewableItems[0].index;
                            setKey(visibleIndex % 8);  // Cycle through 0 to 7
                        }
                    }}
                    style={{ maxHeight: scale(130) }}
                    data={memoData}
                    onEndReachedThreshold={1}
                    onEndReached={() => {
                        if (!loading && hasMore) setPage(currentPage => currentPage + 1);
                    }}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => <Banner url={item?.urls?.small} infoText={""} showText={false} />}
                />
                <View style={{
                    paddingVertical: scale(10),
                    justifyContent: "center",
                    gap: scale(3)
                }}>
                    {Array.from({ length: 8 }).map((_, index) => (  // Only create 8 dots
                        <View
                            key={index}
                            style={{
                                backgroundColor: key === index ? "#FFA100" : "#D9D9D9",
                                width: scale(key === index ?5 : 5),
                                height: scale(key === index ? 5 : 5),
                                borderRadius: scale(10)
                            }}
                        />
                    ))}
                </View>
            </View>
            {loading && <ActivityIndicator size="small" style={{ marginBottom: scale(20) }} color="#FFA100" />}
        </View>
    );
};

export default memo(BannerList);
