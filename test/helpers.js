import test from 'tape';
import { eq, ident, konst, flip, mapObj, guard, bind, pipe, byProp, path,
          actionsOf, reducerOf, wrapAction, wrapThunk } from '../src/helpers';

const inc = x => x + 1,
      sum = (x,y) => x + y,
      sub = (x,y) => x - y;

const model = {
  increment: inc,
  add: sum
};

test('helpers functions test', (t) => {


  t.equal(ident(2), 2);
  t.equal(konst(2)(), 2);
  t.equal(flip(sub)(3,5), 2);
  t.deepEqual(mapObj({x:1, y:2}, inc), {x:2, y:3});
  t.equal(guard(eq(10), inc)(2), undefined);
  t.equal(guard(eq(10), inc)(10), 11);
  t.equal(bind(sum, 10)(2), 12);
  t.equal(pipe(inc, inc)(2), 4);

  const obj = {
    a: '1a',
    down: {
      a: '2a',
      arr: [
        {id: 1, label: 'label 1'},
        {id: 2, label: 'label 2'}
      ]
    }
  };

  t.deepEqual(path('/a')(obj), '1a');

  t.end();
});

test('path function test', (t) => {

  const obj = {
    a: '1a',
    down: {
      a: '2a',
      arr: [
        {id: 1, label: 'label 1'},
        {id: 2, label: 'label 2'}
      ]
    }
  };
  t.equal(byProp('name')('yassine')({name: 'yassine'}), true);
  t.equal(path('/a')(obj), '1a');
  t.deepEqual(path(['down', 'arr', 1])(obj), {id: 1, label: 'label 1'});
  t.equal(path('/down/arr/2/label')(obj), 'label 2');
  t.end();
});


test('actions scaffolder test', (t) => {

  const actions = actionsOf(model);

  t.deepEqual(Object.keys(actions), ['increment', 'add']);
  t.equal(typeof actions.increment, 'function');
  t.equal(typeof actions.add, 'function');

  t.deepEqual(actions.increment(), {type: 'increment', args: []});
  t.deepEqual(actions.add(10), {type: 'add', args: [10]})

  t.end();
});

test('reducer scaffolder test', (t) => {

  const reducer = reducerOf(model);

  t.equal(typeof reducer, 'function');
  t.equal(reducer(1, {type: 'increment', args: []}), 2);
  t.equal(reducer(1, {type: 'add', args: [10]}), 11)

  t.end();
});

test('wrapAction test', (t) => {
  const wrapper = (id, action) => ({type: 'wrapper', id, action});

  t.deepEqual(wrapAction(wrapper, 1)({type: 'increment'}),
            {type: 'wrapper', id: 1, action: {type: 'increment'}})

  t.end();
});

test('wrapThunk test', (t) => {
  t.plan(1);

  const wrapper = (id, action) => ({type: 'wrapper', id, action});

  const dispatch = ac => {
    setTimeout(() => {
      t.deepEqual(ac, {type: 'wrapper', id: 1, action: {type: 'increment', state: 'child state'}});
      t.end();
    })
  };

  const model = { child: 'child state' };
  const childThunk = (dispatch, getState) => dispatch({type: 'increment', state: getState()})
  const context = wrapThunk(wrapper, s => s.child, 1);

  context(childThunk)(dispatch, () => model)
});
