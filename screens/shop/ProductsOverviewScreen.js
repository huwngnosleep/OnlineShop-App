import React from 'react'
import { Button, FlatList } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'

import CustomHeaderButton from '../../components/UI/CustomHeaderButton'
import ProductItem from '../../components/shop/ProductItem'
import * as cartActions from '../../store/actions/cart.actions'

import Colors from '../../constants/Colors'

const ProductsOverviewScreen = (props) => {
    const products = useSelector((state) => state.products.availableProducts)

    const dispatch = useDispatch()

    const selectItemHandler = (id, title) => {
        props.navigation.navigate('ProductDetailScreen', { 
            productId: id,
            productTitle: title,
        })
    }
    return(
        <FlatList 
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