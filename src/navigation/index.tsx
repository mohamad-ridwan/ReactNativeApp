import { NavigationContainer } from '@react-navigation/native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/home-screen';
import LoginScreen from '../screens/login-screen';
import { navigationRef } from './RootNavigation';
import TabNavigator from './TabNavigator';
import AllProductsScreen from '../screens/all-products-screen';

const Stack = createNativeStackNavigator();

export default function Navigation() {
    return (
        <NavigationContainer ref={navigationRef}>
            <TabNavigator>
                <Stack.Screen
                    name="Home"
                    component={HomeScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="AllProducts"
                    component={AllProductsScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Login"
                    component={LoginScreen}
                    options={{ headerShown: false }}
                />
            </TabNavigator>
        </NavigationContainer>
    )
}
