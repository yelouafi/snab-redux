/** @jsx html */

import { html } from 'snabbdom-jsx';

export default ({
    counter,
    actions: { increment, incrementIfOdd, incrementAsync, decrement }
  }) =>
      <p>
        Clicked: {counter} times
        {' '}
        <button on-click={increment}>+</button>
        {' '}
        <button on-click={decrement}>-</button>
        {' '}
        <button on-click={incrementIfOdd}>Increment if odd</button>
        {' '}
        <button on-click={() => incrementAsync()}>Increment async</button>
      </p>;
