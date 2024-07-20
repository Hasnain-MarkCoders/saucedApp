import React, {  useState } from 'react';
import { View, SafeAreaView, ImageBackground, ScrollView, Alert, Image, Text, TouchableOpacity, StyleSheet, Vibration } from 'react-native';
import home from './../../../assets/images/home.png';
import Header from '../../components/Header/Header';
import CustomButtom from '../../components/CustomButtom/CustomButtom';
import { useNavigation } from '@react-navigation/native';
import { scale } from 'react-native-size-matters';
import { useDispatch, useSelector } from 'react-redux';
import { handleAuth } from '../../../android/app/Redux/userReducer';
import { handleText } from '../../../utils.js';
import CustomEditModal from '../../components/EditModal.jsx/EditModal';
import CustomConfirmModal from '../../components/CustomConfirmModal/CustomConfirmModal';
import useAxios, { host } from '../../../Axios/useAxios';
import { launchImageLibrary } from 'react-native-image-picker';
import CustomInput from '../../components/CustomInput/CustomInput';
import SelectDropdown from 'react-native-select-dropdown'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import CustomAlertModal from '../../components/CustomAlertModal/CustomAlertModal.jsx';


const emojisWithIcons = [
    { "title": "Chicken wings" },
    { "title": "Tacos" },
    { "title": "Pizza" },
    { "title": "Burgers" },
    { "title": "French fries" },
    { "title": "Nachos" },
    { "title": "Eggs" },
    { "title": "Burritos" },
    { "title": "Fried rice" },
    { "title": "Spring rolls" },
    { "title": "Sandwiches" },
    { "title": "Potato chips" },
    { "title": "Popcorn" },
    { "title": "Shrimp" },
    { "title": "Vegetable sticks" }
]



const CheckinScreen = () => {
    const auth = useSelector(state => state.auth)
    const profileUri = auth?.url
    const navigation = useNavigation()
    const [showModal, setShowModal] = useState(false)
    const [showBlockModal, setShowBlockmodal] = useState(false)
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [loading, setLoading] = useState(false)
    const [isEnabled, setIsEnabled] = useState(true)
    const [value, setValue] = useState({ Name: auth?.name })
    const [imageUri, setImageUri] = useState("");
    const [imageUris, setImageUris] = useState([]);
    const [alertModal, setAlertModal] =useState(false)
    const [message, setMessage] = useState("")
    const [data, setData] = useState({
        description: "",
        select: ""
    });
    const dispatch = useDispatch()
    const axiosInstance = useAxios()

    const handleLogout = () => {
        dispatch(handleAuth({
            "token": null,
            "uid": null,
            "name": null,
            "email": null,
            "provider": null,
            "type": null,
            "status": null,
            "_id": null,
            "url": null,
            "authenticated": false,
        }))
    }


    const handleChangeName = async () => {
        try {
            setLoading(true)
            setIsEnabled(false)
            // await new Promise(resolve => setTimeout(resolve, 2000));
            await axiosInstance.patch("/change-name", { newName: value?.Name })
            dispatch(handleAuth({
                "name": value?.Name,
            }))
            setShowModal(false)

        } catch {
            console.log(error)
            Alert.alert(error.message || error.toString())
        }

        finally {
            setLoading(false)
            setIsEnabled(true)
            setShowModal(false)

        }
    };




    const handleBlock = async () => {
        try {
            setLoading(true)
            setIsEnabled(false)
            await new Promise(resolve => setTimeout(resolve, 2000));
            setShowBlockmodal(false)
        } catch {
            console.log(error)
            Alert.alert(error.message || error.toString())
        }

        finally {
            setLoading(false)
            setIsEnabled(true)
            setShowBlockmodal(false)

        }
    };


    const handleDelete = async () => {
        try {
            setLoading(true)
            setIsEnabled(false)
            await new Promise(resolve => setTimeout(resolve, 2000));
            setShowDeleteModal(false)
        } catch {
            console.log(error)
            Alert.alert(error.message || error.toString())
        }

        finally {
            setLoading(false)
            setIsEnabled(true)
            setShowDeleteModal(false)

        }
    };
    const handleImagePicker = () => {
        const options = {
            mediaType: 'photo',
            // maxWidth: 300,
            // maxHeight: 300,
            quality: 1,
            selectionLimit: 0,
        };

        launchImageLibrary(options, response => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response?.error);
                Alert.alert('Error', 'Something went wrong while picking the image.');
            } else {
                const sources = response.assets.map(asset => ({
                    uri: asset?.uri,
                    type: asset?.type,
                    name: asset?.fileName,
                }));

                setImageUris(prevUris => [...prevUris, ...sources.map(source => source?.uri)]);
            }
        });
    };


    const handleImage = async (file) => {
        const data = new FormData()
        data.append('image', file);
        var postData = {
            method: 'POST',
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': 'Bearer ' + auth?.token
            },
            body: data,
        }
        return fetch(`${host}/change-image`, postData)
            .then((response) => response.json())
            .then((responseJson) => {
                // console.log('responseJson', responseJson);
                //      dispatch(handleAuth({
                //         url
                //     }))
                console.log("responseJson", responseJson)
                if (responseJson.code > 200) {
                    Alert.alert(responseJson?.error)
                }
                return responseJson;
            })
            .catch((error) => {
                console.log('error', error);
                Alert.alert(error)
            });
    }


    const handleSubmit = () => {
        if(!data.description){
              setMessage("Please write description.")
              return setAlertModal(true)
        }
        if(!data.select){
            setMessage("Please slect an option from list.")
            return setAlertModal(true)
      }
        Vibration.vibrate(10)
        setLoading(true)

        if (imageUri.length<1){
           
            setTimeout(()=>{
                setMessage("Check complete.")
                setAlertModal(true)
                setTimeout(()=>{
                    setLoading(false)
                    navigation.navigate("AllCheckinsScreen")
                },1000)
            },2000)
            return
        }
        const uploadPromises = imageUris.map(uri => {
            return handleImage({
                uri,
                type: 'image/jpeg', // Assuming JPEG for simplicity; adjust as needed
                name: uri.split('/').pop(), // Extract filename from URI
            });
        });

        Promise.allSettled(uploadPromises).then(results => {
            results.forEach((result, index) => {
                if (result.status === 'fulfilled') {
                    setMessage("Check complete.")
                    setAlertModal(true)
                    setTimeout(()=>{
                    setLoading(false)
                        navigation.navigate("AllCheckinsScreen")
                    },2000)
                    setImageUris([])
        setLoading(false)

                } else {
                    console.error(`Failed to upload image ${index + 1}: ${result?.reason}`);
                    setMessage(`Check Failed: Failed to upload image ${index + 1}: ${result?.reason}`)
                    setAlertModal(true)
                      setLoading(false)

                }
            });
        }).catch(error => {
            setMessage(error?.message)
            setAlertModal(true)
            console.error('An error occurred during uploads:', error);
            // Alert.alert('Upload Error', 'An error occurred while uploading images.');
            setLoading(false)

        });
     
    };

    
    return (
        <ImageBackground style={{ flex: 1, width: '100%', height: '100%' }} source={home}>
            <SafeAreaView style={{ flex: 1 }}>
                <ScrollView

                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                    style={{ flex: 1 }}>
                    <Header showMenu={false} cb={() => navigation.goBack()} showProfilePic={false} showDescription={false} title="Add Check-in" />
                    <View style={{ paddingHorizontal: 20, flex: 1, justifyContent: "space-between", paddingVertical: 40, paddingBottom: 100, gap: scale(10) }}>

                        <View style={{ alignItems: "center", gap: 20 }}>
                            <CustomInput
                imageStyles={{top:"4%", left:"4%", transform: [{ translateY: 10 }], width:scale(25), height:scale(25), aspectRatio:"1/1"}}

                                showImage={true}
                                uri={profileUri}
                                multiline={true}
                                numberOfLines={5}
                                name="description"
                                onChange={handleText}
                                updaterFn={setData}
                                value={data.description}
                                showTitle={false}
                                placeholder="Description"
                                containterStyle={{
                                    width: "100%",
                                    flexGrow: 1,
                                }}
                                inputStyle={{
                                    borderColor: "#FFA100",
                                    backgroundColor: "#2e210a",
                                    color: "white",
                                    borderWidth: 1,
                                    borderRadius: 10,
                                    fontSize: scale(14),
                                    padding: 15,
                                    textAlignVertical: 'top',
                                    paddingLeft: scale(50)

                                }} />
                            <SelectDropdown
                                data={emojisWithIcons}
                                onSelect={(selectedItem, index) => {
                                    console.log(selectedItem, index);
                                    setData(prev=>({...prev, select:selectedItem?.title}))
                                }}
                                renderButton={(selectedItem, isOpened) => {
                                    return (
                                        <View style={styles.dropdownButtonStyle}>
                                            <Text style={styles.dropdownButtonTxtStyle}>
                                                {(selectedItem && selectedItem.title) || 'Food'}
                                            </Text>
                                            <Icon name={isOpened ? 'chevron-up' : 'chevron-down'} style={styles.dropdownButtonArrowStyle} />
                                        </View>
                                    );
                                }}
                                renderItem={(item, index, isSelected) => {
                                    return (
                                        <View style={{ ...styles.dropdownItemStyle, ...(isSelected && { backgroundColor: '#FFA100' }) }}>
                                            <Icon name={item.icon} style={styles.dropdownItemIconStyle} />
                                            <Text style={{ ...styles.dropdownItemTxtStyle, ...(isSelected && { color: "black" }) }}>{item.title}</Text>
                                        </View>
                                    );
                                }}
                                showsVerticalScrollIndicator={false}
                                dropdownStyle={styles.dropdownMenuStyle}
                            />

                            <View style={{
                                width: "flex",
                                width: "100%",
                                flexWrap: "wrap",
                                flexDirection: "row",
                                gap: scale(20),
                                justifyContent: "center"
                            }}>
                                {imageUris.map((uri, index) => (
                                    <Image key={index} source={{ uri }} style={{
                                        width: scale(100), borderColor: "#FFA100",
                                        borderWidth: 1, height: scale(100), borderRadius: scale(12)
                                    }} />
                                ))}
                                <TouchableOpacity

                                    onPress={handleImagePicker}
                                    style={{
                                        width: imageUris[0] ? scale(100) : "100%",

                                    }}>

                                    <View style={{
                                        minHeight: scale(100),

                                        borderColor: "#FFA100",
                                        borderWidth: 1,
                                        backgroundColor: "#2e210a",
                                        borderRadius: scale(12),
                                        width: "100%",
                                        marginBottom: scale(60),
                                        justifyContent: "center",
                                        alignItems: "center",
                                        borderStyle: 'dashed'
                                    }}>
                                        <Text style={{
                                            fontSize: scale(16),
                                            lineHeight: scale(19),
                                            color: "white",
                                            fontWeight: 700
                                        }}>
                                            {imageUris[0] ? "+" : "Upload a picture"}
                                        </Text>

                                    </View>
                                </TouchableOpacity>
                            </View>

                            <CustomButtom
                            loading={loading}
                                showIcon={false}
                                buttonTextStyle={{ fontSize: scale(16) }}
                                buttonstyle={{ width: "100%", borderColor: "#FFA100", backgroundColor: "#2e210a", paddingHorizontal: scale(15), paddingVertical: scale(13), display: "flex", gap: 10, flexDirection: "row-reverse", alignItems: "center", justifyContent: "center" }}
                                onPress={() => handleSubmit()}
                                title={"Submit"}
                            />
                            <View style={{
                                borderColor: "#FFA100", backgroundColor: "#2e210a"
                            }}>

                            </View>

                        </View>
                    </View>
                    <CustomEditModal
                        isEnabled={isEnabled}
                        loading={loading}
                        initialValue={"hasnain"}
                        placeholder={"Change your name..."}
                        title={"Name"}
                        modalVisible={showModal} setModalVisible={setShowModal}
                        cb={handleChangeName}
                        setValue={setValue}
                        value={value?.Name}
                    />
                    <CustomConfirmModal
                        isEnabled={isEnabled}
                        loading={loading}
                        title={"Block Account?"}
                        modalVisible={showBlockModal} setModalVisible={setShowBlockmodal}
                        cb={handleBlock}
                    />
                    <CustomConfirmModal
                        isEnabled={isEnabled}
                        loading={loading}
                        title={"Delete Account?"}
                        modalVisible={showDeleteModal} setModalVisible={setShowDeleteModal}
                        cb={handleDelete}
                    />
                         <CustomAlertModal
                            title={message}
                            modalVisible={alertModal}
                            setModalVisible={()=>setAlertModal(false)}
                            />
                </ScrollView>
            </SafeAreaView>
        </ImageBackground>
    );
};

export default CheckinScreen;


const styles = StyleSheet.create({
    dropdownButtonStyle: {
        width: "100%",
        height: 50,
        backgroundColor: "#2e210a",
        borderRadius: 12,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 12,
        borderColor: "#FFA100",
        borderWidth: 1
    },
    dropdownButtonTxtStyle: {
        flex: 1,
        fontSize: 18,
        fontWeight: '500',
        color: 'white',
        fontSize:scale(14)
    },
    dropdownButtonArrowStyle: {
        fontSize: 28,
    },
    dropdownButtonIconStyle: {
        fontSize: 28,
        marginRight: 8,
    },
    dropdownMenuStyle: {
        backgroundColor: "#2e210a",
        borderColor: "#FFA100",
        borderWidth: 1,
        borderRadius: 8,
    },
    dropdownItemStyle: {
        width: '100%',
        flexDirection: 'row',
        borderRadius: 8,
        paddingHorizontal: 12,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 8,
    },
    dropdownItemTxtStyle: {
        flex: 1,
        fontSize: scale(14),
        fontWeight: '500',
        color: 'white',
    },
    dropdownItemIconStyle: {
        fontSize: 28,
        marginRight: 8,
    },
});