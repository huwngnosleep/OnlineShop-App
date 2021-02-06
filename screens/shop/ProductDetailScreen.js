import React from 'react'
import { StyleSheet, View, ScrollView, Image,Button, Text } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'

import Colors from '../../constants/Colors'

import * as cartActions from '../../store/actions/cart.actions'

const ProductDetailScreen = (props) => {
    const productId = props.navigation.getParam('productId')
    const selectedProduct = useSelector((state) => 
        state.products.availableProducts.find((product) => product.id === productId)
    ) 

    const dispatch = useDispatch()

    return(
        <ScrollView >
            <View style={styles.imageContainer}>
                <Image style={styles.image} source={{uri: selectedProduct.imageUrl}} />
            </View>
            <View style={styles.buttonContainer}>
                <Button color={Colors.primary} title="Add to Cart" 
                    onPress={() => {
                        dispatch(cartActions.addToCart(selectedProduct))
                    }} 
                />
            </View>
            <View style={styles.details}>
                <Text style={styles.price}>${selectedProduct.price.toFixed(2)}</Text>
                <Text style={styles.description}>{selectedProduct.description}</Text>
            </View>
        </ScrollView>
    )
}

ProductDetailScreen.navigationOptions = (navData) => {
    return {
        headerTitle: navData.navigation.getParam('productTitle')
    }
}

const styles = StyleSheet.create({
    imageContainer: {
        width: '100%',
        height: 300,
    },
    image: {
        height: '100%',
        width: '100%',
    },
    buttonContainer: {
        marginVertical: 10,
        alignItems: 'center',
    },
    details: {
        width: '100%',
        alignItems: 'center',
    },
    price: {
        fontSize: 20,
        color: '#888',
        textAlign: 'center',
        marginVertical: 20,
    },
    description: {
        fontSize: 16,
        marginVertical: 20,
        marginHorizontal: 20,
        textAlign: 'center',
    },
})

export default ProductDetailScreen