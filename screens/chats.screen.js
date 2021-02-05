import React, { useEffect } from 'react';
import { Alert, Button, FlatList, ScrollView, Text, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { p2p, start } from '../lib/protocol';
import { setUser } from '../lib/slices/user.slice';
import { persistor } from '../lib/store';

let ChatsScreen = () => {
    let dispatch = useDispatch();

    useEffect(() => {
        start();

        p2p.addListener("trackerconnect", (tracker, stats) => {
            console.log(stats);
        });
    }, []);

    return (
        <View>
        </View>
    );
}

export default ChatsScreen;