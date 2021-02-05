import React from 'react';
import { Alert, Button, FlatList, ScrollView, Text, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { setUser } from '../lib/slices/user.slice';
import { persistor } from '../lib/store';

let ChatsScreen = () => {
    let dispatch = useDispatch();
    return (
        <View>
        </View>
    );
}

export default ChatsScreen;