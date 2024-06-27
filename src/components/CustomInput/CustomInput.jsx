import { StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'

const CustomInput = ({title="",name="",secureTextEntry=false ,onChange=()=>{}, value="", updaterFn = ()=>{},containterStyle={},labelStyle={} ,inputStyle={}}) => {
  return (
    <View style={{
        ...containterStyle
      }}>
        <Text style={{
          fontSize:20,
          color:"white",
          borderBottomColor:"white",
          ...labelStyle,
        }}>{title}</Text>
       <TextInput
       secureTextEntry={secureTextEntry}
       style={{
        color:"white",
        borderBottomColor:"white",
        borderBottomWidth:1,
        ...inputStyle
       }}
       onChangeText={(text) => onChange(text, name,updaterFn )}
        value={value}
      />
      
      </View>
  )
}

export default CustomInput

const styles = StyleSheet.create({})