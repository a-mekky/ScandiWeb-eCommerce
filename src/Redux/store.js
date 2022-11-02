import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { changeCurrency, addProductToCart } from './Reducers';


const reducer = combineReducers({ currency: changeCurrency, cart: addProductToCart })

const store = configureStore({ reducer });

store.subscribe(() => localStorage.setItem('reduxState', JSON.stringify(store.getState())))


export default store;