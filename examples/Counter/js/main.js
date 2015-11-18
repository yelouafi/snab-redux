/** @jsx html */

import { html } from 'snabbdom-jsx';
import bootstrap from '../../../src/bootstrap'
import Counter from './components/Counter'
import * as actions from './actions/counter'
import configureStore from './store/configureStore'

bootstrap(
  configureStore(),
  ({state}) => <Counter counter={state.counter} actions={actions} />,
  document.getElementById('placeholder')
)
