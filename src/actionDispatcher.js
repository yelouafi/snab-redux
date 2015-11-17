import { pipe } from './helpers';

export default function(dispatch) {

  function fnInvoker(o) {
    return Array.isArray(o.fn) ? pipe(...o.fn, dispatch) : pipe(o.fn, dispatch);
  }

  function updateEventListeners(oldVnode, vnode) {
    let name, cur, old, elm = vnode.elm,
        oldOn = oldVnode.data.on || {}, on = vnode.data.on;

    if (!on) return;
    for (name in on) {
      cur = on[name];
      old = oldOn[name];
      if (old === undefined) {
        cur = {fn: cur};
        on[name] = cur;
        elm.addEventListener(name, fnInvoker(cur));
      } else {
        old.fn = cur;
        on[name] = old
      }
    }
  }

  return {
    create: updateEventListeners,
    update: updateEventListeners
  };
}
