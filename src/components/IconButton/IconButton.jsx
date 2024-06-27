import { Image, TouchableOpacity } from 'react-native';
import React from 'react';

const IconButton = ({
    onPress = () => {},
    buttonstyle={},
    imageStyle={},
    url=""
}) => {
  return (
    <TouchableOpacity
    onPress={onPress}
    style={{
      alignItems:"center",
      justifyContent:"center",
      padding: 20,
      borderRadius: 50,
      width:40,
      height:40,
      ...buttonstyle
    }}>
      <Image
        source={url}
      style={{
        minWidthwidth:40,
        minHeightheight:40,
        ...imageStyle
      }}/>
  </TouchableOpacity>
  );
};

export default IconButton;

