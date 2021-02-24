import React, { useState, useEffect } from 'react'
import { 
    StyleSheet,
    View, 
    KeyboardAvoidingView, 
    ScrollView, 
    Button, 
    Text, 
    TextInput,
    ActivityIndicator,
    Alert,
} from 'react-native'
import { useDispatch } from 'react-redux'
import * as authActions from '../../store/actions/auth.actions'

import Colors from '../../constants/Colors'

const AuthScreen = (props) => {
    const [isSignUp, setIsSignUp] = useState(false)
    const [error, setError] = useState()
    const [isLoading, setIsLoading] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const dispatch = useDispatch()

    useEffect(() => {
        if(error) {
            Alert.alert(
                'An error occured!',
                error,
                [{ text: 'Okay' }]
            )
        }
    })

    const authHandler = async () => {
        setIsLoading(true)
        setError(null)
        try {
            if (isSignUp) {
                await dispatch(authActions.signUp(email, password))

            } else {
                await dispatch(authActions.signIn(email, password))
                props.navigation.navigate('ShopNavigator')
            }
            
        } catch (error) {
            setError(error.message)    
        }
        setIsLoading(false)
    }

    const emailChangeHandler = (text) => {
        setEmail(text)
    }

    const passwordChangeHandler = (text) => {
        setPassword(text)
    }

    return(
        <KeyboardAvoidingView 
            behavior='padding'
            keyboardVerticalOffset={20}
            style={styles.screen}
        >
            
            <View style={styles.authContainer}>
                <ScrollView>
                    <Text style={styles.label}>Email</Text>
                    <TextInput 
                        style={styles.input}
                        keyboardType='email-address'
                        value={email}
                        required
                        email
                        autoCapitalize='none'
                        onChangeText={emailChangeHandler}
                    />
                    <Text style={styles.label}>Password</Text>
                    <TextInput 
                        style={styles.input}
                        keyboardType='default'
                        value={password}
                        secureTextEntry
                        required
                        autoCapitalize='none'
                        onChangeText={passwordChangeHandler}
                    />
                </ScrollView>
                <View style={styles.button}>
                    {isLoading ? <ActivityIndicator size='small' color={Colors.primary} /> : <Button 
                        title={isSignUp ? 'Sign up' : 'Sign in'} 
                        color={Colors.primary} 
                        onPress={authHandler} 
                    />}
                </View>
                <View style={styles.button}>
                    <Button 
                        title={`Switch to ${isSignUp ? 'Sign in' : 'Sign up'}`} 
                        color={Colors.primary}
                        onPress={() => {setIsSignUp((isSignUp) => !isSignUp)}} 
                    />
                </View>
            </View>
        </KeyboardAvoidingView>
    )
}

AuthScreen.navigationOptions = {
    headerTitle: 'Authenticate',
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',

    },
    button: {
        marginBottom: 10,

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
    authContainer: {
        padding: 10,
        width: '80%',
        maxWidth: 400,
        maxHeight: '50%',
        maxHeight: 400,
    },
})

export default AuthScreen