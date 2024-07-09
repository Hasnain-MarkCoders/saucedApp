import React, { useEffect, useState } from 'react';
import { View, SafeAreaView, ImageBackground, ScrollView, Alert, Image } from 'react-native';
import home from './../../../assets/images/home.png';
import Header from '../../components/Header/Header';
import CustomButtom from '../../components/CustomButtom/CustomButtom';
import arrow from "./../../../assets/images/arrow.png";

import { useNavigation } from '@react-navigation/native';
import { scale } from 'react-native-size-matters';
import { useDispatch } from 'react-redux';
import { handleAuth } from '../../../android/app/Redux/userReducer';

const SettingScreen = () => {
    const navigation = useNavigation()
 const dispatch = useDispatch()

    const handleLogout=()=>{
        dispatch(handleAuth({
            user:null,
            accessToken:null,
            refreshToken:null,
            authenticated:false
          }))
    }
    return (
        <ImageBackground style={{ flex: 1, width: '100%', height: '100%' }} source={home}>
            <SafeAreaView style={{ flex: 1 }}>
                <ScrollView 
                
                showsHorizontalScrollIndicator={false} 
                showsVerticalScrollIndicator={false}
                style={{ flex: 1 }}>
                    <Header  cb={() => navigation.navigate("Home")} showProfilePic={false} showDescription={false} title="Setting"/>
                    <View style={{ paddingHorizontal: 20, flex: 1, justifyContent: "space-between", paddingVertical: 40, paddingBottom: 100, gap: scale(10) }}>

                        <View style={{ alignItems: "center", gap: 20 }}>
                            <CustomButtom
                                Icon={() => <Image source={arrow} />}
                                showIcon={true}
                                buttonTextStyle={{ fontSize: scale(14) }}
                                buttonstyle={{ width: "100%", borderColor: "#FFA100", backgroundColor: "#2e210a", padding: 15, display: "flex", gap: 10, flexDirection: "row-reverse", alignItems: "center", justifyContent: "space-between" }}
                                onPress={() => Alert.alert("Edit Profile")}
                                title={"Edit Profile"}
                            />
                            <CustomButtom
                                Icon={() => <Image source={arrow} />}
                                showIcon={true}
                                buttonTextStyle={{ fontSize: scale(14) }}
                                buttonstyle={{ width: "100%", borderColor: "#FFA100", backgroundColor: "#2e210a", padding: 15, display: "flex", gap: 10, flexDirection: "row-reverse", alignItems: "center", justifyContent: "space-between" }}
                                onPress={() => Alert.alert("Blocked ")}
                                title={"Blocked "}
                            />

                            <CustomButtom
                                Icon={() => <Image source={arrow} />}
                                showIcon={true}
                                buttonTextStyle={{ fontSize: scale(14) }}
                                buttonstyle={{ width: "100%", borderColor: "#FFA100", backgroundColor: "#2e210a", padding: 15, display: "flex", gap: 10, flexDirection: "row-reverse", alignItems: "center", justifyContent: "space-between" }}
                                onPress={() => Alert.alert("Help & Support")}
                                title={"Help & Support"}
                            />


                            <CustomButtom
                                Icon={() => <Image source={arrow} />}
                                showIcon={true}
                                buttonTextStyle={{ fontSize: scale(14) }}
                                buttonstyle={{ width: "100%", borderColor: "#FFA100", backgroundColor: "#2e210a", padding: 15, display: "flex", gap: 10, flexDirection: "row-reverse", alignItems: "center", justifyContent: "space-between" }}
                                onPress={() => Alert.alert("Privacy Policy")}
                                title={"Privacy Policy"}
                            />

                            <CustomButtom
                                Icon={() => <Image source={arrow} />}
                                showIcon={true}
                                buttonTextStyle={{ fontSize: scale(14) }}
                                buttonstyle={{ width: "100%", borderColor: "#FFA100", backgroundColor: "#2e210a", padding: 15, display: "flex", gap: 10, flexDirection: "row-reverse", alignItems: "center", justifyContent: "space-between" }}
                                onPress={() => Alert.alert("Delete Account")}
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
                </ScrollView>

            </SafeAreaView>
        </ImageBackground>
    );
};

export default SettingScreen;
