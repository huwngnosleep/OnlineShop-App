  
import { combineReducers } from 'redux'

import productsReducer from './reducers/products.reducer'
import cartReducer from './reducers/cart.reducer'
import orderReducer from './reducers/order.reducer'
import authReducer from './reducers/auth.reducer'

export default combineReducers({
    products: productsReducer,
    cart: cartReducer,
    orders: orderReducer,
    auth: authReducer,
})