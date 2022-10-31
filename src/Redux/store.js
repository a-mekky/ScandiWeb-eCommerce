import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { changeCurrency, addProductToCart } from './Reducers';




const rootReducer = combineReducers({ currency: changeCurrency, cart: addProductToCart })
const store = configureStore({ reducer: rootReducer })



export default store;