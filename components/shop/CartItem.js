import React from 'react'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

const CartItem = (props) => {
    return(
        <View style={styles.cartItem} >
            <View style={styles.itemData} >
                <Text style={styles.quantity}>{props.quantity} </Text>
                <Text style={styles.title}>{props.title}</Text>
            </View>
            <View style={styles.itemData}>
                <Text style={styles.amount}>{props.amount}</Text>
                <TouchableOpacity activeOpacity={0.7} style={styles.buttonContainer} onPress={props.onRemove}>
                    <Ionicons name="ios-trash" size={23} color="red"/>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    cartItem: {
        padding: 10,
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 20,
        marginVertical: 10,
    },
    itemData: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    quantity: {
        fontFamily: 'open-sans',
        color: '#888',
        fontSize: 16,
    },
    title: {
        fontFamily: 'open-sans-bold',
        fontSize: 16,
    },
    amount: {
        fontFamily: 'open-sans-bold',
        fontSize: 16,
    },
    buttonContainer: {
        marginLeft: 20,
    },
})

export default CartItem