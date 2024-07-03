import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';

import SingleSauce from '../SingleSauce/SingleSauce';

const SauceList = ({ data = [], title = "" }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>{title}</Text>
            <FlatList
             showsHorizontalScrollIndicator={false} 
                horizontal
                data={data}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => <SingleSauce url={item.url} title={item.title} />}
                ItemSeparatorComponent={() => <View style={styles.separator} />}
            />
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
