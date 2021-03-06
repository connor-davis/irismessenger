import { Text, TouchableOpacity, View } from "react-native";

import React from 'react';
import { useNavigation } from "@react-navigation/core";

let HeaderRightMain = () => {
    let navigation = useNavigation();

    return (
        <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
            <TouchableOpacity
                onPress={() => {
                    navigation.navigate("Friends")
                }}>
                <View
                    style={{
                        backgroundColor: 'transparent',
                        paddingHorizontal: 10,
                        paddingVertical: 10,
                        borderRadius: 10,
                        marginVertical: 10,
                    }}>
                    <Text
                        style={{
                            color: '#000000',
                        }}>
                        Friends
                    </Text>
                </View>
            </TouchableOpacity>

            <TouchableOpacity
                onPress={() => {
                    navigation.navigate("Settings")
                }}>
                <View
                    style={{
                        backgroundColor: 'transparent',
                        paddingHorizontal: 10,
                        paddingVertical: 10,
                        borderRadius: 10,
                        marginVertical: 10,
                    }}>
                    <Text
                        style={{
                            color: '#000000',
                        }}>
                        Settings
                    </Text>
                </View>
            </TouchableOpacity>
        </View>
    );
}

export default HeaderRightMain;