import { NavigationContainer } from '@react-navigation/native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/home-screen';
import LoginScreen from '../screens/login-screen';
import { navigationRef } from './RootNavigation';
import TabNavigator from './TabNavigator';
import SearchScreen from '../screens/search-screen';
import ProfileScreen from '../screens/profile-screen';
import FavoriteScreen from '../screens/favorite-screen';
import CategoriesScreen from '../screens/categories-screen';
import ProductsByCategoryScreen from '../screens/products-by-category-screen';
import ProductDetailScreen from '../screens/product-detail-screen';

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
                    name="Search"
                    component={SearchScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Favorite"
                    component={FavoriteScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Profile"
                    component={ProfileScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Categories"
                    component={CategoriesScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="ProductsByCategory"
                    component={ProductsByCategoryScreen as any}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="ProductDetail"
                    component={ProductDetailScreen as any}
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
