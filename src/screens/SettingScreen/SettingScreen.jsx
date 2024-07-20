import React, {  useState } from 'react';
import { View, SafeAreaView, ImageBackground, ScrollView,Alert, Image,Linking } from 'react-native';
import home from './../../../assets/images/home.png';
import Header from '../../components/Header/Header';
import CustomButtom from '../../components/CustomButtom/CustomButtom';
import arrow from "./../../../assets/images/arrow.png";
import { useNavigation } from '@react-navigation/native';
import { scale } from 'react-native-size-matters';
import { useDispatch, useSelector } from 'react-redux';
import { handleAuth } from '../../../android/app/Redux/userReducer';
import CustomConfirmModal from '../../components/CustomConfirmModal/CustomConfirmModal';
import auth from '@react-native-firebase/auth';

const SettingScreen = () => {
    const navigation = useNavigation()
    const [showBlockModal, setShowBlockmodal] = useState(false)
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [loading, setLoading] = useState(false)
    const [isEnabled, setIsEnabled] = useState(true)
 const dispatch = useDispatch()

    const handleLogout= async()=>{
        await auth().signOut()
        dispatch(  handleAuth({
            "token": null,
            "uid": null,
            "name": null,
            "email": null,
            "provider": null,
            "type": null,
            "status": null,
            "_id": null,
            "url":null,
            "authenticated": false,
          }))
    }



      
    const handleBlock = async () => {
        try{
            setLoading(true)
            setIsEnabled(false)
            await new Promise(resolve => setTimeout(resolve, 2000));
          setShowBlockmodal(false)
        }catch{
            console.log(error)
            Alert.alert(error.message || error.toString())
        }

        finally{
            setLoading(false)
            setIsEnabled(true)
          setShowBlockmodal(false)

        }
      };

           
    const handleDelete = async () => {
        try{
            setLoading(true)
            setIsEnabled(false)
            await new Promise(resolve => setTimeout(resolve, 2000));
          setShowDeleteModal(false)
        }catch{
            console.log(error)
            Alert.alert(error.message || error.toString())
        }

        finally{
            setLoading(false)
            setIsEnabled(true)
          setShowDeleteModal(false)

        }
      };

    return (
        <ImageBackground style={{ flex: 1, width: '100%', height: '100%' }} source={home}>
            <SafeAreaView style={{ flex: 1 }}>
                <ScrollView 
                
                showsHorizontalScrollIndicator={false} 
                showsVerticalScrollIndicator={false}
                style={{ flex: 1 }}>
                    <Header  cb={() => navigation.goBack()} showProfilePic={false} showDescription={false} title="Setting"/>
                    <View style={{ paddingHorizontal: 20, flex: 1, justifyContent: "space-between", paddingVertical: 40, paddingBottom: 100, gap: scale(10) }}>

                        <View style={{ alignItems: "center", gap: 20 }}>
                            <CustomButtom
                                Icon={() => <Image source={arrow} />}
                                showIcon={true}
                                buttonTextStyle={{ fontSize: scale(14) }}
                                buttonstyle={{ width: "100%", borderColor: "#FFA100", backgroundColor: "#2e210a", padding: 15, display: "flex", gap: 10, flexDirection: "row-reverse", alignItems: "center", justifyContent: "space-between" }}
                                onPress={() => navigation.navigate("Edit Profile")}
                                title={"Edit Profile"}
                            />
                            <CustomButtom
                                Icon={() => <Image source={arrow} />}
                                showIcon={true}
                                buttonTextStyle={{ fontSize: scale(14) }}
                                buttonstyle={{ width: "100%", borderColor: "#FFA100", backgroundColor: "#2e210a", padding: 15, display: "flex", gap: 10, flexDirection: "row-reverse", alignItems: "center", justifyContent: "space-between" }}
                                onPress={() => setShowBlockmodal(true)}
                                title={"Blocked "}
                            />

                            <CustomButtom
                                Icon={() => <Image source={arrow} />}
                                showIcon={true}
                                buttonTextStyle={{ fontSize: scale(14) }}
                                buttonstyle={{ width: "100%", borderColor: "#FFA100", backgroundColor: "#2e210a", padding: 15, display: "flex", gap: 10, flexDirection: "row-reverse", alignItems: "center", justifyContent: "space-between" }}
                                onPress={() => Linking.openURL("https://help.unsplash.com/en/")}
                                title={"Help & Support"}
                            />


                            <CustomButtom
                                Icon={() => <Image source={arrow} />}
                                showIcon={true}
                                buttonTextStyle={{ fontSize: scale(14) }}
                                buttonstyle={{ width: "100%", borderColor: "#FFA100", backgroundColor: "#2e210a", padding: 15, display: "flex", gap: 10, flexDirection: "row-reverse", alignItems: "center", justifyContent: "space-between" }}
                                onPress={() => Linking.openURL("https://unsplash.com/license")}
                                title={"Privacy Policy"}
                            />

                            <CustomButtom
                                Icon={() => <Image source={arrow} />}
                                showIcon={true}
                                buttonTextStyle={{ fontSize: scale(14) }}
                                buttonstyle={{ width: "100%", borderColor: "#FFA100", backgroundColor: "#2e210a", padding: 15, display: "flex", gap: 10, flexDirection: "row-reverse", alignItems: "center", justifyContent: "space-between" }}
                                onPress={() => setShowDeleteModal(true)}
                                title={"Delete Account"}
                            />

                            <CustomButtom
                                Icon={() => <Image source={arrow} />}
                                showIcon={true}
                                buttonTextStyle={{ fontSize: scale(14) }}
                                buttonstyle={{ width: "100%", borderColor: "#FFA100", backgroundColor: "#2e210a", padding: 15, display: "flex", gap: 10, flexDirection: "row-reverse", alignItems: "center", justifyContent: "space-between" }}
                                onPress={handleLogout}
                                title={"Log out"}
                            />

                        </View>
                    </View>
            
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
                </ScrollView>
            </SafeAreaView>
        </ImageBackground>
    );
};

export default SettingScreen;
