/** @jsx html */

import { html } from 'snabbdom-jsx'
import Product from './Product'

export default ({
  product: { title, price, inventory },
  onAddToCartClicked
 }) =>

  <div
    style={{ 'margin-bottom': '20px' }}>
    <Product
      title={title}
      price={price} />
    <button
      on-click={onAddToCartClicked}
      disabled={!inventory}>
      {inventory > 0 ? 'Add to cart' : 'Sold Out'}
    </button>
  </div>
