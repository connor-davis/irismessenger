import 'react-native-gesture-handler';

import { Alert, Text, View } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { Provider, useSelector } from 'react-redux';
import React, { useEffect } from 'react';
import { persistor, store } from './lib/store';

import ChatsScreen from './screens/chats.screen';
import FriendsScreen from './screens/friends.screen';
import HeaderRightMain from './components/HeaderRightMain';
import JoinScreen from './screens/join.screen';
import { PersistGate } from 'redux-persist/integration/react';
import SettingsScreen from './screens/settings.screen';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';
import { init } from './lib/protocol';
import { selectUser } from './lib/slices/user.slice';

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

  useEffect(() => {
    init();
  }, []);

  return data.id ? (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{
        headerTitle: false,
        headerStyle: {
          backgroundColor: 'rgb(242, 242, 242)',
          elevation: 0.0
        },
        headerTintColor: "#000000",
        headerPressColorAndroid: "#cecece"
      }}
      >
        <Stack.Screen name="Chats" component={ChatsScreen} options={{
          headerRight: () => <HeaderRightMain />,
        }} />
        <Stack.Screen name="Friends" component={FriendsScreen} />
        <Stack.Screen name="Settings" component={SettingsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  ) : (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Join" component={JoinScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;