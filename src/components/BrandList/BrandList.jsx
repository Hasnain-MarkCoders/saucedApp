import React from 'react';
import { View, Text, Image, FlatList, StyleSheet } from 'react-native';
import SingleSauce from '../SingleSauce/SingleSauce';
import SingleBrand from '../SingleBrand/SingleBrand';

const BrandList = ({ data = [] , title=""}) => {
    return (<View style={{
        gap:20
    }}>
        <Text style={{
            color:"white",
            lineHeight:28.8,
            fontSize:24,
            fontWeight:600,
        }}>{title}</Text>
        <FlatList
        horizontal
            data={data}
            keyExtractor={item => item?.title}
            renderItem={({ item }) =><SingleBrand url={item.url} title={item.title} />}
            ItemSeparatorComponent={() => <View style={{marginRight:20}} />}
        />
    </View>)
   
}
    ;



export default BrandList;