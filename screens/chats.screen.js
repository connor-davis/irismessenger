import React, { useEffect } from 'react';
import { Button, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { addPeer, init } from '../lib/protocol';
import { selectUser } from '../lib/slices/user.slice';

let ChatsScreen = () => {
    let user = useSelector(selectUser);
    let dispatch = useDispatch();

    useEffect(() => {
        init(user.id, dispatch);
    }, []);

    return (
        <View>
            <Button title="Test Add Peer" onPress={() => {
                addPeer({ id: user.id, info: { name: user.name, }, peerId: user.id });
            }}/>
        </View>
    );
}

export default ChatsScreen;