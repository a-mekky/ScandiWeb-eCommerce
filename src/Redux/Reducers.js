

const initialState = localStorage.getItem('reduxState')
  ? JSON.parse(localStorage.getItem('reduxState'))
  : {
    currency: { currency: null },
    cart: { products: [] }
  }

export const changeCurrency = function (state = initialState.currency, action) {
  switch (action.type) {
    case 'changeCurrency':
      return {
        ...state,
        currency: action.payload.currency
      }
    case 'setCurrencyFirstTime':
      return {
        ...state,
        currency: action.payload.currency
      }
    default:
      return state
  }
}

export const addProductToCart = function (state = initialState.cart, action) {
  function handelValue(state, action) {
    let id = action.payload.itemId
    let value = action.payload.value
    let product = state.products.find((item) => {
      return item.itemId === id
    })
    let newState = state.products.filter(item => {
      return item.itemId !== id
    })
    let index = state.products.indexOf(product)

    if (product) {
      let newQty = { ...product, qty: product.qty + value }
      newState.splice(index, 0, newQty)
    }
    return newState
  }
  switch (action.type) {

    case 'addToCart':
      let x = state.products.filter((item) => {
        return item.productDetails.id === action.payload.productDetails.id
      })
      let y = x.find((item) => {
        return JSON.stringify(item.attributes[0]) === JSON.stringify(action.payload.attributes[0])
      })
      if (y != null) {
        let currentQty = y.qty
        let newQty = { ...y, qty: currentQty + 1 }
        let newState = state.products.filter(item => {
          return item !== y
        })
        newState.push(newQty)
        return {
          ...state,
          products: newState
        }
      }
      return {
        ...state,
        products: [...state.products, action.payload]
      }
    case 'incrementValue':
      return {
        ...state,
        products: handelValue(state, action)
      }
    case 'decrementValue':
      return {
        ...state,
        products: handelValue(state, action)
      }
    case 'removeProduct':
      let newProducts = state.products.filter((item) => {
        return item.itemId !== action.payload.itemId
      })
      return {
        ...state,
        products: newProducts
      }
    default:
      return state
  }
}
