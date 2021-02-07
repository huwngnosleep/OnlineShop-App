import React, { useEffect, useCallback, useReducer } from 'react'
import { StyleSheet, ScrollView, Text, View, TextInput, Alert } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'

import CustomHeaderButton from '../../components/UI/CustomHeaderButton'
import Input from '../../components/UI/Input'
import * as productsActions from '../../store/actions/products.action'

const FORM_UPDATE = 'UPDATE'

const formReducer = (state, action) => {
    if(action.type === FORM_UPDATE) {
        const updatedValues = {
            ...state.inputValues,
            [action.input]: action.value,
        }
        const updatedValidities = {
            ...state.inputValidities,
            [action.input]: action.isValid,
        }
        let updatedFormIsValid = true
        for(const key in updatedValidities) {
            updatedFormIsValid = updatedFormIsValid && updatedValidities[key]
        }
        return {
            formIsValid: updatedFormIsValid,
            inputValidities: updatedValidities,
            inputValues: updatedValues,
        }
    }
    return state
}

const EditProductScreen = (props) => {
    const productId = props.navigation.getParam('productId')
    const editedProduct = useSelector((state) => 
        state.products.userProducts.find(
            (product) => product.id === productId
        )
    )

    const dispatch = useDispatch()

    const [formState, dispatchFormState] = useReducer(formReducer, {
        inputValues: {
            title: editedProduct ? editedProduct.title : '',
            imageUrl: editedProduct ? editedProduct.imageUrl : '',
            description: editedProduct ? editedProduct.description : '',
            price: '',
        }, 
        inputValidities: {
            title: editedProduct ? true : false,
            imageUrl: editedProduct ? true : false,
            description: editedProduct ? true : false,
            price: editedProduct ? true : false,
        }, 
        formIsValid: editedProduct ? true : false
    })

    const submitHandler = useCallback(() => {
        if(formState.formIsValid) {
            Alert.alert(
                'Wrong input!',
                'Please check the errors in the form.',
                [{ text: 'Okay'}]
            )
            return
        }
        if(editedProduct) {
            dispatch(productsActions.updateProduct(
                productId, 
                formState.inputValues.title, 
                formState.inputValues.description, 
                formState.inputValues.imageUrl
            ))
        } else {
            dispatch(productsActions.createProduct(
                formState.inputValues.title, 
                formState.inputValues.description, 
                formState.inputValues.imageUrl, 
                Number(formState.inputValues.price)))
        }
        props.navigation.goBack()
    }, [dispatch, productId, formState])

    useEffect(() => {
        props.navigation.setParams({submitHandler})
    }, [submitHandler])

    const inputChangeHandler = useCallback((inputIdentifier, inputValue, inputValidity) => {
        dispatchFormState({
            type: FORM_UPDATE, 
            value: inputValue,
            isValid: inputValidity,
            input: inputIdentifier,
        })
    }, [dispatchFormState])

    return(
        <ScrollView style={styles.form}>
            <Input 
                id='title'
                label='Title'
                errorText='Please enter a valid title!'
                onInputChange={inputChangeHandler}
                initialValue={editedProduct ? editedProduct.title : ''}
                initiallyValid={!!editedProduct}
                required
                keyboardType="default"
                autoCapitalize="sentences"
                autoCorrect
                returnKeyType="next"
            />
            <Input 
                id='imageUrl'
                label='Image URL'
                errorText='Please enter a valid image url!'
                onInputChange={inputChangeHandler}
                initialValue={editedProduct ? editedProduct.imageUrl : ''}
                initiallyValid={!!editedProduct}
                required
                keyboardType="default"
                returnKeyType="next"
            />
            {editedProduct ? null : <Input 
                    id='price'
                    label='Price' 
                    errorText='Please enter a valid price' 
                    onInputChange={inputChangeHandler}
                    keyboardType='decimal-pad'
                    returnKeyType="next"
                    min={0.1}
                />
            }
            <Input 
                id='description'
                label='Description'
                errorText='Please enter a valid description!'
                onInputChange={inputChangeHandler}
                keyboardType="default"
                autoCapitalize="sentences"
                autoCorrect
                multiline
                numberOfLines={3}
                initialValue={editedProduct ? editedProduct.description : ''}
                initiallyValid={!!editedProduct}
                required
                minLength={5}
            />
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
    
})

export default EditProductScreen