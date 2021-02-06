import { ADD_TO_CART, REMOVE_FROM_CART } from '../actions/cart.actions'
import { ADD_ORDER } from '../actions/order.actions'
import CartItem from '../../models/cart-item'
import { DELETE_PRODUCT } from '../actions/products.action'

const initialState = {
    items: {},
    totalAmount: 0,
}

export default (state = initialState, action) => {
    switch(action.type) {
        case ADD_TO_CART:
            const addedProduct = action.product
            const { price, title } = addedProduct

            if(state.items[addedProduct.id]) {
                const updatedCartItem = new CartItem(
                    state.items[addedProduct.id].quantity + 1,
                    price,
                    title,
                    state.items[addedProduct.id].sum + price,
                )
                return{
                    ...state,
                    items: {
                        ...state.items,
                        [addedProduct.id]: updatedCartItem,
                    },
                    totalAmount: state.totalAmount + price,
                }
            } else {
                const newCartItem = new CartItem(1, price, title, price)
                return {
                    ...state
                    , items: {
                        ...state.items, 
                        [addedProduct.id]: newCartItem,
                    },
                    totalAmount: state.totalAmount + price,
                }
            }
        case REMOVE_FROM_CART:
            const selectedCartItem = state.items[action.productId]
            const currentQuantity = state.items[action.productId].quantity
            let updatedCartItems;
            if (currentQuantity > 1) {
                const updatedCartItem = new CartItem(
                selectedCartItem.quantity - 1,
                selectedCartItem.price,
                selectedCartItem.title,
                selectedCartItem.sum - selectedCartItem.price
                )
                updatedCartItems = { ...state.items, [action.productId]: updatedCartItem }
            } else {
                updatedCartItems = { ...state.items }
                delete updatedCartItems[action.productId]
            }
            return {
                ...state,
                items: updatedCartItems,
                totalAmount: state.totalAmount - selectedCartItem.price,
            }
        case ADD_ORDER: 
            return initialState
        case DELETE_PRODUCT:
            if(!state.items[action.productId]) {
                return state
            }
            const updatedItems = {...state.items}
            const itemAmount = state.items[action.productId].sum
            delete updatedItems[action.productId]
            return {
                ...state,
                items: updatedItems,
                totalAmount: state.totalAmount - itemAmount,
            }
    }
    
    return state
}