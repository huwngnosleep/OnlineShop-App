import React from 'react'
import { StyleSheet, FlatList, Text } from 'react-native'
import { useSelector } from 'react-redux'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'

import CustomHeaderButton from '../../components/UI/CustomHeaderButton'
import OrderItem from '../../components/shop/OrderItem'

const OrdersScreen = (props) => {
    const orders = useSelector((state) => state.orders.orders)

    return(
        <FlatList 
            data={orders}
            renderItem={(itemData) => <OrderItem 
                totalAmount={itemData.item.totalAmount}
                date={itemData.item.readableDate}
            />}
        />
    )
}

OrdersScreen.navigationOptions = (navData) => {
    
    return {
        headerTitle: 'Your Orders',
        headerLeft: <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
            <Item 
                title="Menu"
                iconName="ios-menu"
                onPress={() => {
                    navData.navigation.toggleDrawer()
                }}
            />
        </HeaderButtons>
    }
}

const styles = StyleSheet.create({
    
})

export default OrdersScreen