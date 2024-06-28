import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
const SingleSauce = ({
    url="",
    title
}) => {
  return (
    <View style={{
        borderColor:"#FFA100",
        borderWidth:1,
        borderRadius:7,
        height:160,
        width:110,

    }}>


    <Image
    
    source={url}
    style={{
        width:"100%",
        height:"100%"
    }}>


    </Image>
    </View>
  )
}

export default SingleSauce

const styles = StyleSheet.create({})