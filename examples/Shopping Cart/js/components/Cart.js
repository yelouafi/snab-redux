/** @jsx html */

import { html } from 'snabbdom-jsx'
import Product from './Product'

export default ({ products, total, onCheckoutClicked }) => {

  const hasProducts = products.length > 0
  const nodes = !hasProducts ?
      <em>Please add some products to cart.</em>
    : products.map( product =>
        <Product
          title={product.title}
          price={product.price}
          quantity={product.quantity}
          key={product.id}/>
      )

  return (
    <div>
      <h3>Your Cart</h3>
      <div>{nodes}</div>
      <p>Total: &#36;{total}</p>
      <button on-click={onCheckoutClicked}
        disabled={!hasProducts}>
        Checkout
      </button>
    </div>
  )
}
