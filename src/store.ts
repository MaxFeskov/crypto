import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/logOnlyInProduction';

import thunk from 'redux-thunk';
import globalErrors from './reducers/globalErrors';
import coins from './reducers/coins';

const enhancer = composeWithDevTools(applyMiddleware(thunk));

const configureStore = () => createStore(combineReducers({ globalErrors, coins }), enhancer);

const store = configureStore();

export default store;

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
