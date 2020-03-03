import { createStore, applyMiddleware, compose, Reducer } from 'redux';
import thunk from 'redux-thunk';
import { request } from '@/util';
import rootReducer from './rootReducer';

const composeEnhancers =
  typeof window === 'object' && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

const middlewares = [thunk.withExtraArgument({ request })];

if (process.env.NODE_ENV === 'development') {
  // eslint-disable-next-line
  middlewares.push(require('redux-logger').createLogger());
}

const enhancer = composeEnhancers(applyMiddleware(...middlewares));

// configStore
const configStore = (reducer: Reducer<any, any>) => createStore(reducer, enhancer);

export default configStore(rootReducer);
