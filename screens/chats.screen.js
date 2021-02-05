import React, { useEffect } from 'react';
import { View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { init } from '../lib/protocol';
import { selectUser } from '../lib/slices/user.slice';

let ChatsScreen = () => {
    let user = useSelector(selectUser);
    let dispatch = useDispatch();

    useEffect(() => {
        init()
    }, []);

    return (
        <View>
        </View>
    );
}

export default ChatsScreen;