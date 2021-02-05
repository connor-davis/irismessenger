import React, { useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { hashText } from '../lib/encryption';
import { setUserEmail } from '../lib/slices/user.slice';

let JoinScreen = () => {
    let dispatch = useDispatch();
    let [email, setEmail] = useState("");

    return (
        <View style={{ flex: 1 }}>
            <View style={{ flex: 1, flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                <View style={{
                    width: "90%",
                    backgroundColor: "rgb(232, 232, 232)",
                    paddingHorizontal: 20,
                    paddingVertical: 5,
                    borderRadius: 20,
                }}>
                    <TextInput placeholder="What is your email?" value={email} onChangeText={(text) => setEmail(text)} style={{ textAlign: "center", color: "rgb(132,132,132)" }} placeholderTextColor="rgb(132,132,132)"></TextInput>
                </View>
                <TouchableOpacity onPress={() => {
                    dispatch(setUserID(hashText(email)));
                }}>
                    <View style={{
                        backgroundColor: "rgb(150,150,255)",
                        paddingHorizontal: 10,
                        paddingVertical: 10,
                        borderRadius: 10,
                        marginVertical: 10,
                    }}>
                        <Text style={{
                            color: "rgb(232,232,232)"
                        }}>Let's Begin</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    );
}

export default JoinScreen;