  
import { combineReducers } from 'redux'

import productsReducer from './reducers/products.reducer'
import cartReducer from './reducers/cart.reducer'
import orderReducer from './reducers/order.reducer'

export default combineReducers({
    products: productsReducer,
    cart: cartReducer,
    orders: orderReducer,
})