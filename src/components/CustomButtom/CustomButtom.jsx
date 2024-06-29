import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import React from 'react'

const CustomButtom = ({
    title="",
    buttonstyle={},
    buttonTextStyle={},
    onPress=()=>{}
}) => {
  return (
    <TouchableOpacity
    onPress={onPress}
    
    style={{
        borderColor:"red",
        borderWidth:1,
        padding:20, 
      elevation:5,
        borderRadius:10,
        ...buttonstyle 
      }}>
    <Text style={{color:"white", textAlign:"center", ...buttonTextStyle}}>{title}</Text>
  </TouchableOpacity>
  )
}

export default CustomButtom

const styles = StyleSheet.create({})