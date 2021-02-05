import React from 'react';
import { FlatList, ScrollView, Text, View } from 'react-native';

let ChatsScreen = () => {
    return (
        <View>
            <ScrollView>
                <FlatList children={() => (
                    <></>
                )}></FlatList>
            </ScrollView>
        </View>
    );
}

export default ChatsScreen;