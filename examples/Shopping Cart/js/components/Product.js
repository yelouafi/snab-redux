/** @jsx html */

import { html } from 'snabbdom-jsx'

export default ({ price, quantity, title }) =>

    <div> {title} - &#36;{price} {quantity ? `x ${quantity}` : ''} </div>
