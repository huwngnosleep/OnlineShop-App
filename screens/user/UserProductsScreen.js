import React from 'react'
import { Button, FlatList, Alert, View, StyleSheet, Dimensions } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'

import CustomHeaderButton from '../../components/UI/CustomHeaderButton'
import ProductItem from '../../components/shop/ProductItem'

import Colors from '../../constants/Colors'

import * as productActions from '../../store/actions/products.action'

const UserProductsScreen = (props) => {
    const userProducts = useSelector((state) => state.products.userProducts)

    const dispatch = useDispatch()

    const editProductHandler = (id) => {
        props.navigation.navigate('EditProductScreen', {productId: id})
    }

    const deleteHandler = (id) => {
        Alert.alert(
            'Are you sure?',
            'Do you really want to delete this item?',
            [{ text: 'No', style: 'default'},
            { text: 'Yes', style: 'destructive', onPress: () => {
                dispatch(productActions.deleteProduct(id))
            }}]
        )
    }

    return(
        <FlatList 
            data={userProducts}
            renderItem={(itemData) => 
                <ProductItem 
                    imageUrl={itemData.item.imageUrl}
                    title={itemData.item.title}
                    price={itemData.item.price}
                    onSelect={() => {
                        editProductHandler(itemData.item.id)
                    }}
                >
                    <View style={styles.button}><Button 
                        color={Colors.primary}
                        title="Edit"
                        onPress={() => {
                            editProductHandler(itemData.item.id)
                        }}
                    /></View>
                    <View style={styles.button}><Button 
                        color={Colors.secondary}
                        title="Delete"
                        onPress={() => {
                            deleteHandler(itemData.item.id)
                        }}
                    /></View>
                </ProductItem>
            }
        />
    )
}

UserProductsScreen.navigationOptions = (navData) => {
    return {
        headerTitle: 'Your Products',
        headerLeft: 
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                <Item 
                    title="Menu"
                    iconName="ios-menu"
                    onPress={() => {
                        navData.navigation.toggleDrawer()
                    }}
                />
            </HeaderButtons>,
        headerRight:
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                <Item 
                    title="Add"
                    iconName="ios-create"
                    onPress={() => {
                        navData.navigation.navigate('EditProductScreen')
                    }}
                />
            </HeaderButtons>,
    }
}

const styles = StyleSheet.create({
    button: {
        width: Dimensions.get('window').width / 5,
    }
})

export default UserProductsScreen