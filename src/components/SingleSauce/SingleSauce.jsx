import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';

const SingleSauce = ({
    url = "",
    title
}) => {
    return (
        <View style={styles.container}>
            <Image
                source={url}
                style={styles.image}
            />
            <Text style={styles.text}>
              {title}
            </Text>
        </View>
    );
};

export default SingleSauce;

const styles = StyleSheet.create({
    container: {
        borderRadius: moderateScale(7),
        height: verticalScale(160),
        width: scale(110),
        position:"relative",

    },
    image: {
        width: "100%",
        height: "100%",
        objectFit:"contain"
    },
    text:{
      position:"absolute",
      bottom:15,
      left:10,
      color:"white",
      width:"90%",
    }
});
