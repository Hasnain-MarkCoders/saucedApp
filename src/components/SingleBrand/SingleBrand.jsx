import React from 'react';
import { Image, StyleSheet, View, Text } from 'react-native';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';

const SingleBrand = ({
    url = "",
    title =""// This is currently not used in your styling or layout.
}) => {
  console.log(title)
    return (
        <View style={styles.container}>
            <Image
                source={url}
                style={styles.image}
            />
            {/* <Text style={{
              color:"white"
            }}>
            {title}
            </Text> */}
        </View>
    );
};

export default SingleBrand;

const styles = StyleSheet.create({
    container: {
        borderRadius: moderateScale(7),
    },
    image: {
        // width: "100%",
        // objectFit:"cover"
    }
});
