import React, {useEffect} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {init, send} from '../lib/protocol';
import {selectUser, setUser} from '../lib/slices/user.slice';

let ChatsScreen = () => {
  let user = useSelector(selectUser);
  let dispatch = useDispatch();

  useEffect(() => {
    init();
  }, []);

  return (
    <View style={{flex: 1, alignItems: 'center'}}>
      <TouchableOpacity
        onPress={() => {
          send();
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
            Send Message
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
