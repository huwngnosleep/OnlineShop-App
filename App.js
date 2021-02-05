import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Provider } from 'react-redux'
import store from './store/store'
import AppLoading from 'expo-app-loading'
import * as Font from 'expo-font'

import ShopNavigator from './navigation/Shop.navigator'

const fetchFonts = () => {
  return Font.loadAsync({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
  })
}

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false)

  if(!fontLoaded) {
    return <AppLoading 
      startAsync={fetchFonts}
      onFinish={() => {
        setFontLoaded(true)
      }}
      onError={(error) => console.log(error)}
    />
  }

  return (
      <Provider store={store} >
          <View style={styles.container}>
            <ShopNavigator />
          </View>
      </Provider>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
