import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';

import globalErrors from './reducers/globalErrors';
import coins from './reducers/coins';
import api from './api';

const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

const enhancer = composeEnhancers(applyMiddleware(thunkMiddleware.withExtraArgument(api)));

const configureStore = () => createStore(combineReducers({ globalErrors, coins }), enhancer);

export default configureStore;
