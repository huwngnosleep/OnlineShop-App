import { ADD_ORDER, SET_ORDERS } from "../actions/order.actions"
import Order from '../../models/order'

const initialState = {
    orders: [],
}

export default (state = initialState, action) => {
    switch(action.type) {
        case SET_ORDERS: 
            return {
                orders: action.orders
            }
        case ADD_ORDER:
            const newOrder = new Order(
                new Date().toString(), 
                action.orderData.cartItems,
                action.orderData.totalAmount,
                new Date(),
            )
            return {...state, orders: state.orders.concat(newOrder)}
    }

    return state
}