import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Provider } from 'react-redux'
import store from './store/store'

import ShopNavigator from './navigation/Shop.navigator'

export default function App() {
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
