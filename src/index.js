import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import { createStore } from 'redux';
import { reducer } from './reducers/Reducer';
import Calculator from './Calculator';

const store = createStore(reducer);
const onAction = symbol => store.dispatch({ type: 'BAO', symbol: symbol });
const render = () => ReactDOM.render(
  <Calculator
    value={store.getState()}
    onAction={onAction} />,
  document.getElementById('root')
);

render();
store.subscribe(render);
reportWebVitals();
