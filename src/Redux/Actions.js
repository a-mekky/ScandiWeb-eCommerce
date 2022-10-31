
import { createAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from 'uuid';



export const changeCurrency = createAction('changeCurrency', function changeCurrency(currency) {
    return {
        payload: {
            currency: currency
        }
    }
})

export const setCurrencyFirstTime = createAction('setCurrencyFirstTime', function setCurrencyFirstTime(currency) {
    return {
        payload: {
            currency: currency
        }
    }
})

export const addToCart = createAction('addToCart', function addToCart(productData, selectedAttributes) {
    return {
        payload: {
            itemId: uuidv4(),
            productDetails: productData,
            attributes: selectedAttributes,
            qty: 1,

        }
    }
})

export const incrementValue = createAction('incrementValue', function addToCart(value, itemId) {
    return {
        payload: {
            value: value,
            itemId: itemId
        }
    }
})

export const decrementValue = createAction('decrementValue', function addToCart(value, itemId) {
    return {
        payload: {
            value: value,
            itemId: itemId
        }
    }
})

export const removeProduct = createAction('removeProduct', function addToCart(itemId) {
    return {
        payload: {
            itemId: itemId
        }
    }
})