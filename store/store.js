  
import { createStore, applyMiddleware } from 'redux'

import rootReducer from './root-reducer'

const middleWares = []

const store = createStore(rootReducer, applyMiddleware(...middleWares))

export default store