/** @jsx html */

import { html } from 'snabbdom-jsx'
import { addToCart } from '../actions'
import { getVisibleProducts } from '../reducers/products'
import ProductItem from '../components/ProductItem'
import ProductsList from '../components/ProductsList'

export default ({ state }) => {

  const products = getVisibleProducts(state.products)

  return (
    <ProductsList title="Products">
      {products.map(product =>
        <ProductItem
          key={product.id}
          product={product}
          onAddToCartClicked={() => addToCart(product.id)} />
      )}
    </ProductsList>
  )
}
