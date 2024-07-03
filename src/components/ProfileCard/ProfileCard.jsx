import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { scale } from 'react-native-size-matters'
import { useSelector } from 'react-redux'

const ProfileCard = () => {
    const auth = useSelector(state => state.auth)
    console.log(auth)
    const url = auth?.user?.url || ""
    const name = auth?.user?.name || ""
    const circles = [1,1,1,1,1]
    return (
        <View style={{
            width: "100%",
            paddingVertical:scale(20),
            paddingHorizontal:scale(10),
            borderRadius: scale(12),
            borderColor: "#FFA100",
            borderWidth: scale(1),
            gap:scale(20)
        }}>
            <View style={{
                flexDirection: "row",
                justifyContent:"flex-start",
                gap:scale(10)
            }}>
                <Image
                    style={{
                        width: scale(100),
                        height: scale(100),
                        borderRadius: scale(50),
                        borderColor: "#FFA100",
                        borderWidth: scale(1)
                    }}
                    source={{ uri: url }}
                />
                <View style={{
                    gap:scale(14)
                }}>

                    <Text style={{
                        color: "white",
                        fontWeight: 600,
                        fontSize: scale(20),
                        lineHeight: scale(24),
                    }}>{name}</Text>
                    <View>
                        <View style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            gap: scale(10)
                        }}>
                            <View style={{
                                alignItems:"center"
                            }}>
                                <Text style={{
                                    color: "#FFA100",
                                    fontWeight: 600,
                                    fontSize: scale(30),
                                    lineHeight: scale(36),
                                }}>450</Text>
                                <Text style={{
                        color: "white",
                        fontWeight: 600,
                        fontSize: scale(10),
                        lineHeight: scale(25),
                    }}>Followers</Text>
                            </View>

                            <View>
                                <Text style={{
                                    color: "#FFA100",
                                    fontWeight: 600,
                                    fontSize: scale(30),
                                    lineHeight: scale(36),
                                }}>450</Text>
                                <Text style={{
                        color: "white",
                        fontWeight: 600,
                        fontSize: scale(10),
                        lineHeight: scale(25),
                    }}>Followers</Text>
                            </View>

                            <View>
                                <Text style={{
                                    color: "#FFA100",
                                    fontWeight: 600,
                                    fontSize: scale(30),
                                    lineHeight: scale(36),
                                }}>450</Text>
                                <Text style={{
                        color: "white",
                        fontWeight: 600,
                        fontSize: scale(10),
                        lineHeight: scale(25),
                    }}>Followers</Text>
                            </View>

                        </View>
                    </View>
                </View>
            </View>
            <View style={{
                flexDirection:"row",
                justifyContent:"space-between"
            }}>
                <View style={{
                    flexDirection:"row",
                    gap:scale(5)
                }}>
                    <Text style={{
                        color:"#fff",
                        fontSize:scale(10)
                    }}>
                        Joined Date:
                    </Text>
                    <Text style={{
                        color:"#FFA100",
                        fontSize:scale(10)
                    }}>
                    28-06-2024
                    </Text>
                </View>
                <View style={{
                    gap:scale(10),
                    alignItems:"center",
                    flexDirection:"row",
                    
                }}>
                    <View style={{
                        width:scale(10),
                        height:scale(10),
                        borderRadius:scale(50),
                        backgroundColor:"#FFA100"
                    }}>

                    </View>
                    {circles.map((item, index)=><View key={index} style={{
                        width:scale(10),
                        height:scale(10),
                        borderRadius:scale(50),
                        backgroundColor:"#774d06"
                    }}>

                    </View>)}
                    
                </View>
            </View>
        </View>
    )
}

export default ProfileCard

const styles = StyleSheet.create({})