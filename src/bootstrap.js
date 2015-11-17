
import snabbdom from 'snabbdom';

export default function bootstrap(store, render, elm, snabbdomModules=[]) {

  const patch = snabbdom.init([
    require('snabbdom/modules/class'),
    require('snabbdom/modules/props'),
    require('snabbdom/modules/style'),
    require('./actionDispatcher')(store.dispatch),
    ...snabbdomModules
  ]);

  let vnode = elm;
  function updateUI() {
    const newVnode = render({state: store.getState()});
    vnode = patch(vnode, newVnode);
  }

  store.subscribe(updateUI);
  updateUI();

}
