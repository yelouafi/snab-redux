/** @jsx html */

import { html } from 'snabbdom-jsx';

export default ({title}, children) =>

  <div>
    <h3>{title}</h3>
    <div>{children}</div>
  </div>
