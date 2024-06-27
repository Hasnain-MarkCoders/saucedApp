import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import dot from "./../../../assets/images/dot.png"
const CustomListItem = ({text}) => {
  return (
    <View
    style={{
      flexDirection:"row",
      gap:10,
      alignItems:"center",
    }}>
 
 <View>

 <Image style={{
      display:"flex"
    }} source={dot}/>

 </View>
   
    <Text style={{
      color:"white",
      fontFamily:"Montserrat",
      fontSize:14,
      fontWeight:600,
      lineHeight:18
    }}>
     {text}
    </Text>
    </View>
  )
}

export default CustomListItem
