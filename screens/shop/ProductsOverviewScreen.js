import React from 'react'
import { StyleSheet, View, FlatList, Text } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'

import CustomHeaderButton from '../../components/UI/CustomHeaderButton'
import ProductItem from '../../components/shop/ProductItem'
import * as cartActions from '../../store/actions/cart.actions'

const ProductsOverviewScreen = (props) => {
    const products = useSelector((state) => state.products.availableProducts)

    const dispatch = useDispatch()
    return(
        <FlatList 
            data={products}
            renderItem={(itemData) => 
                <ProductItem 
                    imageUrl={itemData.item.imageUrl}
                    title={itemData.item.title}
                    price={itemData.item.price}
                    onViewDetail={() => {
                        props.navigation.navigate('ProductDetailScreen', { 
                            productId: itemData.item.id,
                            productTitle: itemData.item.title,
                        })
                    }}
                    onAddToCart={() => {
                        dispatch(cartActions.addToCart(itemData.item))
                    }}
                />
            }
        />
    )
}

ProductsOverviewScreen.navigationOptions = (navData) => {
    return {
        headerTitle: 'All Products',
        headerRight: <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
            <Item title="Cart" iconName="ios-cart" 
                onPress={() => {
                    navData.navigation.navigate('CartScreen')
                }}
            />
        </HeaderButtons>,
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

export default ProductsOverviewScreen