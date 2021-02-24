export const SIGN_UP = 'SIGN_UP'
export const SIGN_IN = 'SIGN_IN'

export const signUp = (email, password) => {
    return async (dispatch) => {
        const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCMEzk2YpEMUMD8BusNCOWAgPTYPgsXgrg',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email,
                password,
                returnSecureToken: true
            })
        })
        
        if(!response.ok) {
            throw new Error('Something went wrong!')
        }

        const resData = await response.json()

        dispatch({
            type: SIGN_UP,
            token: resData.idToken,
            userId: resData.localId,
        })
    }
}

export const signIn = (email, password) => {
    return async (dispatch) => {
        const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCMEzk2YpEMUMD8BusNCOWAgPTYPgsXgrg',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email,
                password,
                returnSecureToken: true
            })
        })

        if(!response.ok) {
            const resData = await response.json()
            throw new Error(resData.error.message)
        }

        const resData = await response.json()

        dispatch({
            type: SIGN_IN, 
            token: resData.idToken,
            userId: resData.localId,
        })
    }
}