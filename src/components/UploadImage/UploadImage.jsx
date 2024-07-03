import React, { useDebugValue, useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View, Alert } from 'react-native';
import { scale } from 'react-native-size-matters';
import { useDispatch, useSelector } from 'react-redux';
import { launchImageLibrary } from 'react-native-image-picker';
import { handleAuth } from '../../../android/app/Redux/userReducer';

const UploadImage = () => {
    const auth = useSelector(state => state.auth);
    const [imageUri, setImageUri] = useState(auth?.user?.url);
    
    const dispatch = useDispatch()
    const handleImage = (url)=>{
        dispatch(handleAuth({
            ...auth,
            user:{
                ...auth.user,
                url:url
            }
        }))
    }

    const handleImagePicker = () => {
        const options = {
            mediaType: 'photo',
            maxWidth: 300,
            maxHeight: 300,
            quality: 1,
        };

        launchImageLibrary(options, response => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
                Alert.alert('Error', 'Something went wrong while picking the image.');
            } else {
                const source = { uri: response.assets[0].uri };
                setImageUri(source.uri);
                handleImage(source.uri)
                // Here you can also dispatch an action to update the user's profile picture in your backend
            }
        });
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={handleImagePicker}>
                <Image
                    style={styles.image}
                    source={{ uri: imageUri }}
                />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleImagePicker}>
                <Text style={styles.text}>Change Profile Picture</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "column",
        alignItems: "center",
        gap: scale(10),
        borderRadius: scale(12),
        borderColor: "#FFA100",
        borderWidth: scale(1),
        padding: scale(20),
    },
    image: {
        width: scale(100),
        height: scale(100),
        borderRadius: scale(50),
        borderColor: "#FFA100",
        borderWidth: scale(1),
    },
    text: {
        color: "#FFA100",
        fontSize: scale(12),
        lineHeight: scale(25),
    },
});

export default UploadImage;
