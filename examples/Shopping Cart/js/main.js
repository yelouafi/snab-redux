/** @jsx html */

import { html } from 'snabbdom-jsx';
import mount from '../../../src/mount'
import { createStore, applyMiddleware } from 'redux'
import logger from 'redux-logger'
import thunk from 'redux-thunk'
import reducer from './reducers'
import { getAllProducts } from './actions'
import App from './containers/App'

const createStoreWithMiddleware = applyMiddleware(thunk, logger())(createStore)
const store = createStoreWithMiddleware(reducer)

store.dispatch(getAllProducts())

mount(
  store,
   () => <App state={store.getState()} />,
  document.getElementById('placeholder')
)
