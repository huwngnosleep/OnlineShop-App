  
import { combineReducers } from 'redux'

import productsReducer from './reducers/products.reducer'

export default combineReducers({
    products: productsReducer,
})