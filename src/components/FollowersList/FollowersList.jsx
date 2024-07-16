import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
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
  useEffect(()=>{
console.log(loading)
  },[loading])
  return (
    
   <View style={{
    gap:scale(20),
    flex:1
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
       renderItem={({ item }) => <UserCard url={item?.urls?.small} title={"Follow"} name={item?.user?.username} showText={false} />}

   />
   {

    loading &&   <ActivityIndicator size="small" color="#FFA100" />
    }

</View>

  )
}

export default FollowersList

const styles = StyleSheet.create({})