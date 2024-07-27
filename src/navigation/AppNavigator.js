import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/LoginScreen';
import SelectionScreen from '../screens/SelectionScreen';
import DashboardScreen from '../screens/DashboardScreen';
import TestCrudOperations from '../screens/TestCrudOperations';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Selection" component={SelectionScreen} />
        <Stack.Screen name="Dashboard" component={DashboardScreen} />
        <Stack.Screen name="TestCrudOperations" component={TestCrudOperations} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
