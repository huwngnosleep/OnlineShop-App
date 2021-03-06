import React from 'react'
import { StyleSheet, View, Text, Button, FlatList} from 'react-native'
import Colors from '../../constants/Colors'
import { useDispatch, useSelector } from 'react-redux'

import CartItem from '../../components/shop/CartItem'

import * as cartActions from '../../store/actions/cart.actions'
import * as orderActions from '../../store/actions/order.actions'

const CartScreen = (props) => {
    const cartTotalAmount = useSelector((state) => state.cart.totalAmount)
    const cartItems = useSelector((state) => {
        const transformedCartItems = []
        for(const key in state.cart.items) {
            transformedCartItems.push({
                productId: key,
                title: state.cart.items[key].title,
                price: state.cart.items[key].price,
                quantity: state.cart.items[key].quantity,
                sum: state.cart.items[key].sum,
            })
        }
        return transformedCartItems
    })

    const dispatch = useDispatch()

    return <View style={styles.screen} >
        <View style={styles.summary}>
            <Text style={styles.summaryText}>
                Total: <Text style={styles.totalPrice}>${cartTotalAmount === 0 ? cartTotalAmount : cartTotalAmount.toFixed(2)}</Text>
            </Text>
            <Button 
                color={Colors.secondary} 
                title="Order Now" 
                disabled={cartItems.length === 0}  
                onPress={() => {
                    dispatch(orderActions.addOrder(cartItems, cartTotalAmount))
                }}  
            />
        </View>
        <FlatList data={cartItems} 
            keyExtractor={(item) => item.productId}
            renderItem={(itemData) => <CartItem 
                deletable
                quantity={itemData.item.quantity} 
                title={itemData.item.title}
                amount={itemData.item.sum}
                onRemove={() => {
                    dispatch(cartActions.removeFromCart(itemData.item.productId))
                }}
            />}
        />
    </View>
}

CartScreen.navigationOptions = {
    headerTitle: 'Your Cart',
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        margin: 20,
    },
    summary: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
        padding: 10,
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: {width: 0, height: 2},
        shadowRadius: 8,
        elevation: 5,
        borderRadius: 10,
        backgroundColor: 'white',
    },
    summaryText: {
        fontFamily: 'open-sans-bold',
        fontSize: 18,
    },
    totalPrice: {
        color: Colors.primary,
    },
})

export default CartScreen