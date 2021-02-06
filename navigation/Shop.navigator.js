import React from 'react'
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import { createDrawerNavigator } from 'react-navigation-drawer'
import { Ionicons } from '@expo/vector-icons'

import ProductsOverviewScreen from '../screens/shop/ProductsOverviewScreen'
import ProductDetailScreen from '../screens/shop/ProductDetailScreen'
import CartScreen from '../screens/shop/CartScreen'
import OrdersScreen from '../screens/shop/OrdersScreen'
import UserProductsScreen from '../screens/user/UserProductsScreen'
import EditProductScreen from '../screens/user/EditProductScreen'

import Colors from '../constants/Colors'

const defaultNavigationOptions = {
    headerStyle: {
        backgroundColor: Colors.primary,
    },
    headerTitleStyle: {
        fontFamily: 'open-sans-bold',
    },
    headerTintColor: 'white',
}

const ProductsNavigator = createStackNavigator({
    ProductsOverviewScreen,
    ProductDetailScreen,
    CartScreen,
}, {
    defaultNavigationOptions,
    navigationOptions: {
        drawerIcon: (drawerConfig) => <Ionicons name="ios-cart" size={23} color={drawerConfig.activeTintColor} />
    },
})

const OrdersNavigator = createStackNavigator({
    OrdersScreen,
}, {
    defaultNavigationOptions,
    navigationOptions: {
        drawerIcon: (drawerConfig) => <Ionicons name="ios-list" size={23} color={drawerConfig.activeTintColor} />
    }
})

const UserNavigator = createStackNavigator({
    UserProductsScreen,
    EditProductScreen,
}, {
    defaultNavigationOptions,
    navigationOptions: {
        drawerIcon: (drawerConfig) => <Ionicons name="ios-create" size={23} color={drawerConfig.activeTintColor} />
    },
})

const ShopNavigator = createDrawerNavigator({
    ProductsNavigator: {
        screen: ProductsNavigator,
        navigationOptions: {
            title: 'Products',
        }
    },
    OrdersNavigator: {
        screen: OrdersNavigator,
        navigationOptions: {
            title: 'Orders',
        }
    },
    UserNavigator: {
        screen: UserNavigator,
        navigationOptions: {
            title: 'Admin',
        }
    },
}, {
    contentOptions: {
        activeTintColor: Colors.primary,
    },
})

export default createAppContainer(ShopNavigator)