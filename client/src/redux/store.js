
import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from './reducer.js';
import thunkMiddleware from 'redux-thunk';

const composeEnhancer =
  typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE
    : compose;

const store = createStore(
  rootReducer,
  composeEnhancer(applyMiddleware(thunkMiddleware))
);

export default store;
