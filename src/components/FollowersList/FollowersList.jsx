import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { FlatList } from 'react-native-gesture-handler';
import UserCard from '../UserCard/UserCard';
import { scale } from 'react-native-size-matters';

const FollowersList = ({
    data=[],
    hasMore=true,
    setPage=()=>{},
    loading=false,
    numColumns=2
}) => {
  return (
    
   <View style={{
    gap:scale(20),
}}>
    <FlatList
    showsHorizontalScrollIndicator={false} 
    showsVerticalScrollIndicator={false}
    numColumns={numColumns}
       data={data}
       onEndReachedThreshold={0.5}
       onEndReached={() => {
        if (!loading && hasMore) {
            setPage(currentPage => currentPage + 1);
        }
      }}
       keyExtractor={(item, index) => index.toString()}
       renderItem={({ item }) => <UserCard url={item?.urls?.raw} title={"Follow"} name={"Hasnain"} showText={false} />}

   />
   {

    loading &&   <ActivityIndicator size="small" color="#FFA100" />
    }

</View>

  )
}

export default FollowersList

const styles = StyleSheet.create({})