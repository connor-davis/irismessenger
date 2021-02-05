import React from 'react';
import { Button, FlatList, ScrollView, Text, View } from 'react-native';
import { persistor } from '../lib/store';

let ChatsScreen = () => {
    return (
        <View>
            <Button title="Clear Store" onPress={() => {
                persistor.purge();
            }} />
            <FlatList></FlatList>
        </View>
    );
}

export default ChatsScreen;