/** @jsx html */

import { html } from 'snabbdom-jsx'
import Counter from '../components/Counter'
import * as actions from '../actions/counter'

export default ({ state }) =>

  <Counter counter={state.counter} actions={actions} />
