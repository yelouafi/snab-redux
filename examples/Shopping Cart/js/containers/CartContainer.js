/** @jsx html */

import { html } from 'snabbdom-jsx'
import { checkout } from '../actions'
import { getTotal, getCartProducts } from '../reducers'
import Cart from '../components/Cart'

export default({ state }) => {
  const products  = getCartProducts(state),
        total     = getTotal(state)

  return (
    <Cart
      products={products}
      total={total}
      onCheckoutClicked={checkout} />
  )
}
