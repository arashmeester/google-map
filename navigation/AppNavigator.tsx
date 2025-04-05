import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SafeAreaProvider } from "react-native-safe-area-context";
import {
    StatusBar,
  } from 'react-native';
import HomeScreen from "../screens/HomeScreen";
// import DetailsScreen from '../screens/DetailsScreen';

type RootStackParamList = {
  Home: undefined;
  Details: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => (
    <SafeAreaProvider>
      <NavigationContainer>
        <StatusBar
          animated={true}
          backgroundColor="#61dafb"
          barStyle="dark-content"
        />
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={HomeScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
);

export default AppNavigator;
