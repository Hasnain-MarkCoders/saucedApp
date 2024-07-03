import { Alert, Image, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { scale } from 'react-native-size-matters'
import CustomButtom from '../CustomButtom/CustomButtom'
const UserCard = ({url="", name="", title=""}) => {
  return (
    <View style={{
        minWidth:scale(140),
        flexBasis:"47%",
        borderRadius:scale(10),
        borderColor:"#FFA100",
        borderWidth:1,
        alignItems:"center",
        gap:scale(10),
        justifyContent:"space-between",
        paddingVertical:scale(15),
        paddingHorizontal:scale(15),
        margin:scale(5),
    }}>
       
     
     { url && <Image style={{
        width:scale(58),
        height:scale(58),
        borderRadius:scale(50),

      }}
      source={{uri:url}}
      
      ></Image>}
        <Text style={{
        color:"white",
        fontSize:scale(14)

      }}>{name}</Text>
      
    
       <CustomButtom buttonTextStyle={{ fontSize: scale(12) }}
              buttonstyle={{ width: "100%", borderColor: "#FFA100", padding: 8, backgroundColor: "#2E210A" }}onPress={()=>Alert.alert(`${title} ${name}`)} title={title}/> 

    </View>
  )
}

export default UserCard

const styles = StyleSheet.create({})