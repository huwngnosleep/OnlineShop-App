export const ADD_ORDER = 'ADD_ORDER'
export const SET_ORDERS = 'SET_ORDERS'

import Order from '../../models/order'

export const setOrders = () => {
    return async (dispatch) => {
        try {
            const response = await fetch('https://huwngnosleep-onlineshopapp-default-rtdb.firebaseio.com/orders.json')
        
            if (!response.ok) {
                throw new Error('Something went wrong!')
            }
    
            const resData = await response.json()
            
            const loadedOrders = []
        
            for (const key in resData) {
                loadedOrders.push(new Order(
                    key, 
                    resData[key].cartItems, 
                    resData[key].totalAmount,
                    new Date(resData[key].date)
                ))
            }
        
            dispatch({
                type: SET_ORDERS,
                orders: loadedOrders,
            })
            
        } catch (error) {
            throw error
        }


        dispatch({type: SET_ORDER, orders: []})
    }
}

export const addOrder = (cartItems, totalAmount) => {
    return async (dispatch) => {
        const response = await fetch('https://huwngnosleep-onlineshopapp-default-rtdb.firebaseio.com/orders.json', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                cartItems,
                totalAmount,
                date: new Date().toUTCString(),
            })
        })

        const resData = await response.json()


        dispatch({
            type: ADD_ORDER,
            orderData: { cartItems, totalAmount, date: resData.date}
        })
    }
}