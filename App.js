import React from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Form from './src/Form';
import Screens from './src/Screens'

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen
            name="Form"
            component={Form}
          />
          <Stack.Screen
            name="Screens"
            component={Screens}
          />
        </Stack.Navigator>
    </NavigationContainer>
  );
}