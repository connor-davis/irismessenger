import React, {useEffect, useState} from 'react';
import {Text, TextInput, TouchableOpacity, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {init, recieve, send} from '../lib/protocol';
import {selectUser, setUser} from '../lib/slices/user.slice';

let ChatsScreen = () => {
  let user = useSelector(selectUser);
  let dispatch = useDispatch();

  let [ipAddress, setIpAddress] = useState('');
  let [port, setPort] = useState('');

  useEffect(() => {
    recieve({user, dispatch});
  }, []);

  return (
    <View style={{flex: 1, alignItems: 'center'}}>
      <View
        style={{
          width: '90%',
          backgroundColor: 'rgb(232, 232, 232)',
          paddingHorizontal: 20,
          paddingVertical: 5,
          marginBottom: 5,
          borderRadius: 20,
        }}>
        <TextInput
          placeholder="Reciever Ip Address"
          value={ipAddress}
          onChangeText={(text) => setIpAddress(text)}
          style={{textAlign: 'center', color: 'rgb(0,0,0)'}}
          placeholderTextColor="rgb(132,132,132)"></TextInput>
      </View>
      <View
        style={{
          width: '90%',
          backgroundColor: 'rgb(232, 232, 232)',
          paddingHorizontal: 20,
          paddingVertical: 5,
          borderRadius: 20,
        }}>
        <TextInput
          placeholder="Reciever Port"
          value={port}
          onChangeText={(text) => setPort(text)}
          style={{textAlign: 'center', color: 'rgb(0,0,0)'}}
          placeholderTextColor="rgb(132,132,132)"></TextInput>
      </View>
      <TouchableOpacity
        onPress={() => {
          send({
            message: 'Test message',
            user,
            connection: {ip: ipAddress, port: parseInt(port)},
          });
        }}>
        <View
          style={{
            backgroundColor: 'rgb(0,0,0)',
            paddingHorizontal: 10,
            paddingVertical: 10,
            borderRadius: 10,
            marginVertical: 10,
          }}>
          <Text
            style={{
              color: 'rgb(232,232,232)',
            }}>
            Send "Test Message"
          </Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          dispatch(setUser({}));
        }}>
        <View
          style={{
            backgroundColor: 'rgb(0,0,0)',
            paddingHorizontal: 10,
            paddingVertical: 10,
            borderRadius: 10,
            marginVertical: 10,
          }}>
          <Text
            style={{
              color: 'rgb(232,232,232)',
            }}>
            Clear Storage
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default ChatsScreen;
