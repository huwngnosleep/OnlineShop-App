import React, { useState, useEffect, useCallback } from 'react'
import { StyleSheet, ScrollView, Text, View, TextInput } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'

import CustomHeaderButton from '../../components/UI/CustomHeaderButton'
import * as productsActions from '../../store/actions/products.action'

const EditProductScreen = (props) => {
    const productId = props.navigation.getParam('productId')
    const editedProduct = useSelector((state) => 
        state.products.userProducts.find(
            (product) => product.id === productId
        )
    )

    const dispatch = useDispatch()

    const [title, setTitle] = useState(editedProduct ? editedProduct.title : '')
    const [imageUrl, setImageUrl] = useState(editedProduct ? editedProduct.imageUrl : '')
    const [price, setPrice] = useState('')
    const [description, setDescription] = useState(editedProduct ? editedProduct.description : '')

    

    const submitHandler = useCallback(() => {
        if(editedProduct) {
            dispatch(productsActions.updateProduct(productId, title, description, imageUrl))
        } else {
            dispatch(productsActions.createProduct(title, description, imageUrl, Number(price)))
        }
        props.navigation.goBack()
    }, [dispatch, productId, title, description, imageUrl, price])

    useEffect(() => {
        props.navigation.setParams({submitHandler})
    }, [submitHandler])

    return(
        <ScrollView style={styles.form}>
            <View style={styles.formControl} >
                <Text style={styles.label}>Hi there</Text>
                <TextInput 
                    style={styles.input}
                    value={title} 
                    onChangeText={(text) => setTitle(text)}
                />
            </View>
            <View style={styles.formControl} >
                <Text style={styles.label}>Image Url</Text>
                <TextInput 
                    style={styles.input}
                    value={imageUrl} 
                    onChangeText={(text) => setImageUrl(text)}
                />
            </View>
            {editedProduct ? null : <View style={styles.formControl} >
                <Text style={styles.label}>Price</Text>
                <TextInput 
                    style={styles.input}
                    value={price} 
                    onChangeText={(text) => setPrice(text)}
                />
            </View>}
            <View style={styles.formControl} >
                <Text style={styles.label}>Description</Text>
                <TextInput 
                    style={styles.input}
                    value={description} 
                    onChangeText={(text) => setDescription(text)}
                />
            </View>
        </ScrollView>
    )
}

EditProductScreen.navigationOptions = (navData) => {
    const submitHandler = navData.navigation.getParam('submitHandler')

    return {
        headerTitle: navData.navigation.getParam('productId') ? 'Edit Product' : 'Add Product',
        headerRight:
        <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
            <Item 
                title="Save"
                iconName="ios-checkmark"
                onPress={submitHandler}
            />
        </HeaderButtons>,
    }
}

const styles = StyleSheet.create({
    form: {
        margin: 20,
    },
    formControl: {
        width: '100%',
    },
    label: {
        fontFamily: 'open-sans-bold',
        marginVertical: 8,
    },
    input: {
        paddingHorizontal: 2,
        paddingVertical: 5,
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
    },
})

export default EditProductScreen