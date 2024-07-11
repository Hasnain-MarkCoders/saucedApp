import React, { useDebugValue, useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View, Alert } from 'react-native';
import { scale } from 'react-native-size-matters';
import { useDispatch, useSelector } from 'react-redux';
import { launchImageLibrary } from 'react-native-image-picker';
import { handleAuth } from '../../../android/app/Redux/userReducer';
import useAxios from '../../../Axios/useAxios';

const UploadImage = () => {
    const auth = useSelector(state => state.auth);
    const [imageUri, setImageUri] = useState(auth?.url);
    const axiosInstance = useAxios()
    
    const dispatch = useDispatch()
    const handleImage = async(url, asset)=>{
        const data = new FormData()
        data.append("image", asset)
        try {
            const res = await axiosInstance.post("/change-image", data);
            console.log(res);
            dispatch(handleAuth({ url }));
        } catch (error) {
            console.error('Error uploading image:', error);
            Alert.alert('Upload Error', 'Failed to upload image.');
        }
        dispatch(handleAuth({
                url
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

                const file = {
                    uri: response?.assets[0]?.uri,
                    type: response?.assets[0]?.type,
                    name: response?.assets[0]?.fileName,
                }
                handleImage(source.uri,file)
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
