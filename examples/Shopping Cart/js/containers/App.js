/** @jsx html */

import { html } from 'snabbdom-jsx'
import ProductsContainer from './ProductsContainer'
import CartContainer from './CartContainer'

export default ({ state }) =>
  <div>
    <h2>Shopping Cart Example</h2>
    <hr/>
    <ProductsContainer state={state} />
    <hr/>
    <CartContainer state={state} />
  </div>
