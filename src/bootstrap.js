import snabbdom from 'snabbdom';
import clazz from 'snabbdom/modules/class';
import props from 'snabbdom/modules/props';
import style from 'snabbdom/modules/style';
import actionDispatcher from './actionDispatcher';

const raf = window.requestAnimationFrame || (cb => cb());

export default function bootstrap(store, render, elm, snabbdomModules=[]) {

  const patch = snabbdom.init([
    clazz, props, style, actionDispatcher(store.dispatch),
    ...snabbdomModules
  ]);

  let vnode = elm;
  let frameRequested = false;

  function updateUI() {
    if(!frameRequested)  {
      raf( () => {
        frameRequested = false;
        const newVnode = render({state: store.getState()});
        vnode = patch(vnode, newVnode);
      });
      frameRequested = true;
    }
  }

  store.subscribe(updateUI);
  updateUI();

}
