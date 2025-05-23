import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { WishListProvider } from './src/context/WishListContext';
import ProductList from './src/screens/ProductList';
import { Product } from './src/types';
import ProductDetail from './src/screens/ProductDetail';
import WishListScreen from './src/screens/WishListScreen';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

export type RootStackParamList = {
    Products: undefined;
    ProductDetail: { product: Product };
    WishList: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
    return (
        <WishListProvider>
            <NavigationContainer>
                <Stack.Navigator
                    screenOptions={({ navigation }) => ({
                        headerStyle: {
                            backgroundColor: '#6200ee',
                        },
                        headerTitleStyle: {
                            fontWeight: 'bold',
                            fontSize: 20,
                            color: 'white',
                        },
                        headerTintColor: 'white',
                        headerRight: () => (
                            <TouchableOpacity onPress={() => navigation.navigate('WishList')} style={{ marginRight: 16 }}>
                                <Icon name="favorite" size={24} color="white" />
                            </TouchableOpacity>
                        ),
                    })}
                >
                    <Stack.Screen
                        name="Products"
                        component={ProductList}
                        options={{ title: 'Product List' }}
                    />
                    <Stack.Screen
                        name="ProductDetail"
                        component={ProductDetail}
                        options={({ route, navigation }) => ({
                            title: route.params?.product?.title || 'Product Detail',
                            headerRight: () => (
                                <TouchableOpacity onPress={() => navigation.navigate('WishList')} style={{ marginRight: 16 }}>
                                    <Icon name="favorite" size={24} color="white" />
                                </TouchableOpacity>
                            ),
                        })}
                    />
                    <Stack.Screen
                        name="WishList"
                        component={WishListScreen}
                        options={{ title: 'My Wish List' }}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        </WishListProvider>
    );
}