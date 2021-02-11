import React, { useEffect } from 'react'
import { StyleSheet, FlatList } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'

import CustomHeaderButton from '../../components/UI/CustomHeaderButton'
import OrderItem from '../../components/shop/OrderItem'
import * as ordersActions from '../../store/actions/order.actions'

const OrdersScreen = (props) => {
    const orders = useSelector((state) => state.orders.orders)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(ordersActions.setOrders())
    }, [dispatch])

    return(
        <FlatList 
            data={orders}
            renderItem={(itemData) => <OrderItem 
                totalAmount={itemData.item.totalAmount}
                date={itemData.item.readableDate}
                items={itemData.item.items}
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
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
})

export default OrdersScreen