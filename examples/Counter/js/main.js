/** @jsx html */

import { html } from 'snabbdom-jsx';
import mount from '../../../src/mount'
import App from './containers/App'
import configureStore from './store/configureStore'

const store = configureStore()

mount(
  store,
  () => <App state={store.getState()} />,
  document.getElementById('placeholder')
)
