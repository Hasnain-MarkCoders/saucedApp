import {  Text, View, Image } from 'react-native'
import React from 'react'
import dot from "./../../../assets/images/dot.png"
import { scale } from 'react-native-size-matters'
const ProductBulletPoint = ({text, textStyles}) => {
  console.log(textStyles)
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
      fontSize:scale(12),
      fontWeight:600,
      lineHeight:18,
      ...textStyles
    }}>
     {text}
    </Text>
    </View>
  )
}

export default ProductBulletPoint
