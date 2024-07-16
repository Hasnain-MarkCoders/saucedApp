import { Image, StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux'
import { scale } from 'react-native-size-matters'

const CustomInput = ({title="",uri="",multiline=false,numberOfLines=1,name="", cb=()=>{},placeholder="",showTitle=true, secureTextEntry=false ,onChange=()=>{}, showImage = false, value="",imageStyles={}, updaterFn = ()=>{},containterStyle={},labelStyle={} ,inputStyle={}}) => {

  return (
    <View style={{
        ...containterStyle,
      
      }}>
       { showTitle && <Text style={{
          fontSize:20,
          color:"white",
          borderBottomColor:"white",
          ...labelStyle,
        }}>{title}</Text>}
        <View style={{
          position:"relative"
        }}>
    {      showImage &&
            <Image style={{
              width:scale(30),
              height:scale(30),
              borderRadius:scale(50),
              position:"absolute",
              top:10,
              left:10,
              zIndex:1,
              ...imageStyles
            }} source={{uri}}/>}
       <TextInput
       multiline={multiline}
       numberOfLines={numberOfLines}
       placeholder={placeholder}
       placeholderTextColor="white"
       secureTextEntry={secureTextEntry}
       style={{
        color:"white",
        borderBottomColor:"white",
        borderBottomWidth:1,
        ...inputStyle,
        
       }}
       onChangeText={(text) => {onChange(text, name,updaterFn ), cb()}}
        value={value}
      />
        </View>
      
      </View>
  )
}

export default CustomInput

const styles = StyleSheet.create({})