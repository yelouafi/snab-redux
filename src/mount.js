import snabbdom from 'snabbdom';
import clazz from 'snabbdom/modules/class';
import props from 'snabbdom/modules/props';
import style from 'snabbdom/modules/style';
import actionDispatcher from './actionDispatcher';

const raf = window.requestAnimationFrame || (cb => cb());

export default function mount(store, render, elm, snabbdomModules=[]) {

  const patch = snabbdom.init([
    clazz, props, style, actionDispatcher(dispatch),
    ...snabbdomModules
  ]);

  let vnode = elm;
  let frameRequested = false;

  function updateUI() {
    if(!frameRequested)  {
      raf( () => {
        frameRequested = false;
        const newVnode = render(dispatch);
        vnode = patch(vnode, newVnode);
      });
      frameRequested = true;
    }
  }

  function dispatch(action) {
    if(action !== undefined)
      store.dispatch(action);
  }

  store.subscribe(updateUI);
  updateUI();

}
