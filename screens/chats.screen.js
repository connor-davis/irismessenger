import React from 'react';
import { Alert, Button, FlatList, ScrollView, Text, View } from 'react-native';
import { persistor } from '../lib/store';

let ChatsScreen = () => {
    return (
        <View>
            <Button title="Clear Store" onPress={() => {
                Alert.alert("Cleared");
                persistor.purge();
            }} />
        </View>
    );
}

export default ChatsScreen;