import test from 'tape';
import dispatcher from '../src/actionDispatcher';

function mockElm() {
  const elm = {};
  elm.fireEvent = ev => {
    elm.listener(ev);
  }
  elm.addEventListener = (n, l) => elm.listener = l;
  return elm;
}

test('actionDispatcher test', (t) => {
  t.plan(1);

  const event = 'fake';
  const action = e => ({type: 'increment', event: e});
  const oldVnodevnode = { data: {} },
        vnode = {
          data: {
            on: { event: action}
          },
          elm: mockElm()
        };

  const dispatch = a => {
    t.deepEqual(a, {type: 'increment', event: 'fake'});
    t.end();
  }

  const actionDispatcher = dispatcher(dispatch);
  actionDispatcher.update(oldVnodevnode, vnode);
  vnode.elm.fireEvent(event);
});
