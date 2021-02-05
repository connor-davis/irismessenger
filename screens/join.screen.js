import React, { useState } from 'react';
import { Alert, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { generateKeyPair, hashText } from '../lib/encryption';
import { setUserEmail, setUserID, setUserName, setUserKeys } from '../lib/slices/user.slice';

let JoinScreen = () => {
    let dispatch = useDispatch();
    let [name, setName] = useState("");
    let [email, setEmail] = useState("");
    let [areKeysGenerating, setAreKeysGenerating] = useState(false);

    return (
            <View style={{ flex: 1 }}>
                {areKeysGenerating ? (
                    <View style={{ flex: 1, flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                        <Text style={{ fontWeight: "bold" }}>Generating Security Keys</Text>
                        <Text style={{ fontWeight: "300" }}>Please be patient and do not exit the app...</Text>
                    </View>
                ) : (
                        <View style={{ flex: 1, flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                            <View style={{
                                width: "90%",
                                backgroundColor: "rgb(232, 232, 232)",
                                paddingHorizontal: 20,
                                paddingVertical: 5,
                                marginBottom: 5,
                                borderRadius: 20,
                            }}>
                                <TextInput placeholder="What would you be called?" value={name} onChangeText={(text) => setName(text)} style={{ textAlign: "center", color: "rgb(0,0,0)" }} placeholderTextColor="rgb(132,132,132)"></TextInput>
                            </View>
                            <View style={{
                                width: "90%",
                                backgroundColor: "rgb(232, 232, 232)",
                                paddingHorizontal: 20,
                                paddingVertical: 5,
                                borderRadius: 20,
                            }}>
                                <TextInput placeholder="What is your email?" value={email} onChangeText={(text) => setEmail(text)} style={{ textAlign: "center", color: "rgb(0,0,0)" }} placeholderTextColor="rgb(132,132,132)"></TextInput>
                            </View>
                            <TouchableOpacity onPress={() => {
                                let generateKeys = async () => {
                                    let keys = await generateKeyPair();
                                    setAreKeysGenerating(false);

                                    dispatch(setUserKeys(keys));
                                    dispatch(setUserName(name));
                                    dispatch(setUserEmail(email));
                                    dispatch(setUserID(hashText(email)));
                                }

                                setAreKeysGenerating(true);
                                
                                setTimeout(() => {
                                    generateKeys();
                                }, 1000);
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
                    )}
            </View>
    );
}

export default JoinScreen;