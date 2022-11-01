import { gql } from "@apollo/client"



// Get Categories From API
const GET_CATEGORIES = () => gql`{
    categories{
        name
    }}`

// Get All Products From API
const GET_PRODUCTS = () => gql`
{
  category{
		name
    products{
      id
      brand
      name
      inStock
      category
      brand
      description
      gallery
    attributes{
      name
      type
      items{
        displayValue
        value
        id
      }
    }
    prices{
      currency{
        label
        symbol
      }
      amount
    }
    }
  }
}`;

const GET_CURRENCIES = () => gql`
{
  currencies{
    symbol
    label
  }
}
`

const GET_ProductByID = (ID) => gql`
{
  product(id: "${ID}" ) {
    id
    name
    inStock
    category
    brand
    description
    gallery
    attributes {
      name
      type
      items {
        displayValue
        value
        id
      }
    }
    prices {
      currency {
        label
        symbol
      }
      amount
    }
  }
}
`
const GET_ProductByCategory = (category) => gql`
{
  category(input: { title: "${category}" }) {
    name
    products {
      id
      brand
      name
      inStock
      gallery
      attributes{
        name
        type
        items{
          displayValue
          value
          id
        }
      }
      prices {
        currency {
          label
          symbol
        }
        amount
      }
    }
  }
}
`

export {
  GET_CATEGORIES,
  GET_PRODUCTS,
  GET_CURRENCIES,
  GET_ProductByID,
  GET_ProductByCategory,
}