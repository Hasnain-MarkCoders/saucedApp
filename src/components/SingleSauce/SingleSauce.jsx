import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Image, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';

const SingleSauce = ({
    url = "",
    title=""
}) => {
const navigation = useNavigation()
    return (
        <TouchableOpacity
        onPress={()=>{navigation.navigate("ProductDetail", {url, title})}}
        style={styles.container}>
            <Image
              source={{uri:url}}
                style={styles.image}
            />
            <Text style={styles.text}>
              {title}
            </Text>
        </TouchableOpacity>
    );
};

export default SingleSauce;

const styles = StyleSheet.create({
    container: {
        borderRadius: moderateScale(7),
        height: verticalScale(160),
        width: scale(110),
        position:"relative",
        borderRadius:scale(10),
    },
    image: {
        width: "100%",
        height: "100%",
        objectFit:"cover",
        borderRadius:scale(10)

    },
    text:{
      position:"absolute",
      bottom:15,
      left:10,
      color:"white",
      width:"90%",
    }
});
