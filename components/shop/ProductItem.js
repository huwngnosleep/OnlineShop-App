import React from 'react'
import { StyleSheet, View,Image, Text, TouchableOpacity } from 'react-native'

const ProductItem = (props) => {
    return(
        <TouchableOpacity activeOpacity={0.8} onPress={props.onSelect}>
            <View style={styles.container}>
                <View style={styles.imageContainer}>
                    <Image style={styles.image} source={{uri: props.imageUrl}} />
                </View>
                
                <View style={styles.details}>
                    <Text style={styles.title}>{props.title}</Text>
                    <Text style={styles.price}>${props.price.toFixed(2)}</Text>
                </View>
                <View style={styles.buttonContainer}>
                    {props.children}
                </View>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: {width: 0, height: 2},
        shadowRadius: 8,
        elevation: 5,
        borderRadius: 10,
        backgroundColor: 'white',
        height: 300,
        margin: 20,
    },
    imageContainer: {
        width: '100%',
        height: '60%',
        overflow: 'hidden',
    },
    image: {
        height: '100%',
        width: '100%',
    },
    details: {
        alignItems: 'center',
        height: '20%',
        padding: 10,
    },
    title: {
        fontFamily: 'open-sans-bold',
        fontSize: 18,
        marginVertical: 2,
    },
    price: {
        fontFamily: 'open-sans',
        fontSize: 14,
        color: '#888',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '20%',
        paddingHorizontal: 20,
    },
})

export default ProductItem