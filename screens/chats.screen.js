import React, { useEffect } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { receive, send } from '../lib/protocol';
import { selectUser, setUser } from '../lib/slices/user.slice';
import { useDispatch, useSelector } from 'react-redux';

let ChatsScreen = () => {
  let user = useSelector(selectUser);
  let dispatch = useDispatch();

  useEffect(() => {
    receive({ receiver: user, dispatch });
  }, []);

  return (
    <View style={{ flex: 1, alignItems: 'center' }}>
      <TouchableOpacity
        onPress={() => {
          send({
            to: user,
            message: 'Test message',
            user,
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
    </View>
  );
};

export default ChatsScreen;
