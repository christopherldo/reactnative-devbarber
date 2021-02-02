import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import Preload from '../screens/Preload';
import SignIn from '../screens/SignIn';
import SignUp from '../screens/SignUp';
import Barber from '../screens/Barber';
import Account from '../screens/Account';

import MainTab from '../stacks/MainTab';

const Stack = createStackNavigator();

export default () => (
  <Stack.Navigator
    initialRouteName="Preload"
    // initialRouteName="SignUp"
    screenOptions={{
      headerShown: false,
    }}>
    <Stack.Screen name="Preload" component={Preload} />
    <Stack.Screen name="SignIn" component={SignIn} />
    <Stack.Screen name="SignUp" component={SignUp} />
    <Stack.Screen name="Barber" component={Barber} />
    <Stack.Screen name="Account" component={Account} />

    <Stack.Screen name="MainTab" component={MainTab} />
  </Stack.Navigator>
);
