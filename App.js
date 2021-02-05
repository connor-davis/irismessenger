import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Alert, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import ChatsScreen from './screens/chats.screen';
import JoinScreen from './screens/join.screen';
import FriendsScreen from './screens/friends.screen';
import SettingsScreen from './screens/settings.screen';
import { Provider, useSelector } from 'react-redux';
import { persistor, store } from './lib/store';
import { selectUser } from './lib/slices/user.slice';
import { PersistGate } from 'redux-persist/integration/react';

const Stack = createStackNavigator();

let App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Root />
      </PersistGate>
    </Provider>
  );
}

let Root = () => {
  let data = useSelector(selectUser);

  return (
    <NavigationContainer>
      {data.email ? (
        <Stack.Navigator screenOptions={{
          headerTitle: "Iris Messenger",
          headerStyle: {
            backgroundColor: 'rgb(242, 242, 242)',
            elevation: 0.0
          },
          headerRight: () => (
            <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
              <TouchableOpacity style={{ paddingRight: 15 }} onPress={() => Alert.alert("Friends")}>
                <Text>Friends</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{ paddingRight: 15 }} onPress={() => Alert.alert("Settings")}>
                <Text>Settings</Text>
              </TouchableOpacity>
            </View>
          )
        }}
        >
          <Stack.Screen name="Chats" component={(props) => <ChatsScreen {...props} />} />
          <Stack.Screen name="Friends" component={FriendsScreen} />
          <Stack.Screen name="Settings" component={SettingsScreen} />
        </Stack.Navigator>) : (
          <Stack.Navigator>
            <Stack.Screen name="Join" component={JoinScreen} options={{ headerShown: false }} />
          </Stack.Navigator>
        )}
    </NavigationContainer>
  );
}

export default App;