import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { FlatList } from 'react-native-gesture-handler'
import Banner from '../Banner/Banner'
import { scale } from 'react-native-size-matters'
const BannerList = ({
    data=[],
    hasMore=true,
    setPage=()=>{},
    loading=false
}) => {
  return (

   <View style={{
    gap:scale(20)
}}>

<FlatList
showsHorizontalScrollIndicator={false} 
   horizontal
   data={data}
   onEndReachedThreshold={0.5}
   onEndReached={() => {
    if (!loading && hasMore) setPage(currentPage => currentPage + 1);
  }}
  keyExtractor={(item, index) => index.toString()}
   renderItem={({ item }) => <Banner  url={item?.urls?.raw} infoText={""} showText={false} />}
   ItemSeparatorComponent={() => <View style={{
    marginRight:20
   }} />}
/>
   {

    loading &&   <ActivityIndicator size="small" style={{marginBottom:scale(20)}} color="#FFA100" />
    }
</View>
  )
}

export default BannerList