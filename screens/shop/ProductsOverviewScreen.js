import React, { useEffect, useState, useCallback } from 'react'
import { View, Button, FlatList, ActivityIndicator, Text } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'

import CustomHeaderButton from '../../components/UI/CustomHeaderButton'
import ProductItem from '../../components/shop/ProductItem'
import * as cartActions from '../../store/actions/cart.actions'
import * as productsActions from '../../store/actions/products.action'
import Colors from '../../constants/Colors'

const ProductsOverviewScreen = (props) => {
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState()
    const [isRefreshing, setIsRefreshing] = useState(false)

    const products = useSelector((state) => state.products.availableProducts)

    const dispatch = useDispatch()

    const loadProducts = useCallback(async () => {
        setError(null)
        setIsRefreshing(true)
        try {
            await dispatch(productsActions.fetchProducts())
        } catch (error) {
            setError(error.message)                
        }
        setIsRefreshing(false)
    }, [dispatch, setError, setIsRefreshing])

    useEffect(() => {
        const willFocusSubscript = props.navigation.addListener('willFocus', loadProducts)
        return () => {
            willFocusSubscript.remove()
        }
    }, [loadProducts])

    useEffect(() => {        
        setIsLoading(true)
        loadProducts().then(() => {
            setIsLoading(false)
        })
    }, [dispatch, loadProducts])

    const selectItemHandler = (productId, productTitle) => {
        props.navigation.navigate('ProductDetailScreen', { 
            productId,
            productTitle,
        })
    }

    if (error) {
        return <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text>{error}</Text>
            <Button onPress={loadProducts} title='Reload' />
        </View>
    }

    if (isLoading) {
        return <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <ActivityIndicator size='large' color={Colors.primary} />
        </View>
    }

    return(
        <FlatList 
            onRefresh={loadProducts}
            refreshing={isRefreshing}
            data={products}
            renderItem={(itemData) => 
                <ProductItem
                    imageUrl={itemData.item.imageUrl}
                    title={itemData.item.title}
                    price={itemData.item.price}
                    onSelect={() => {
                        selectItemHandler(itemData.item.id, itemData.item.title)
                    }}
                >
                    <Button 
                        color={Colors.primary}
                        title="View Details"
                        onPress={() => {
                            selectItemHandler(itemData.item.id, itemData.item.title)
                        }}
                    />
                    <Button 
                        color={Colors.secondary}
                        title="Add To Cart"
                        onPress={() => {
                            dispatch(cartActions.addToCart(itemData.item))
                        }}
                    />
                </ProductItem>
            }
        />
    )
}

ProductsOverviewScreen.navigationOptions = (navData) => {
    return {
        headerTitle: 'All Products',
        headerRight: 
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                <Item title="Cart" iconName="ios-cart" 
                    onPress={() => {
                        navData.navigation.navigate('CartScreen')
                    }}
                />
            </HeaderButtons>,
        headerLeft: 
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
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

export default ProductsOverviewScreen