import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import SingleBrand from '../SingleBrand/SingleBrand';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';

const BrandList = ({ data = [], title = "" }) => {
    const data1 = data.slice(0, data.length/2)
    const data2 = data.slice(data.length/2, data.length)

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{title}</Text>
            <View style={{
                gap:15
            }}>

            <FlatList
             showsHorizontalScrollIndicator={false} 
                horizontal
                data={data1}
                keyExtractor={item => item?.title}
                renderItem={({ item }) => <SingleBrand url={item.url} title={item.title} />}
                ItemSeparatorComponent={() => <View style={styles.separator} />}
            />
             <FlatList
              showsHorizontalScrollIndicator={false} 
                horizontal
                data={data2}
                keyExtractor={item => item?.title}
                renderItem={({ item }) => <SingleBrand url={item.url} title={item.title} />}
                ItemSeparatorComponent={() => <View style={styles.separator} />}
            />
            </View>

            
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        gap: verticalScale(20)
    },
    title: {
        color: "white",
        lineHeight: verticalScale(28.8),
        fontSize: moderateScale(24),
        fontWeight: "600",
    },
    separator: {
        marginRight: scale(10)
    }
});

export default BrandList;
