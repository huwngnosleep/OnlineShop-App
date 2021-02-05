import React from 'react'
import { StyleSheet, View, } from 'react-native'

import { HeaderButton } from 'react-navigation-header-buttons'
import { Ionicons } from '@expo/vector-icons'

import Colors from '../../constants/Colors'

const CustomHeaderButton = (props) => {
    return(
        <HeaderButton 
            {...props} 
            IconComponent={Ionicons} 
            iconSize={23} color={Colors.secondary} 
        />
    )
}

const styles = StyleSheet.create({
    
})

export default CustomHeaderButton