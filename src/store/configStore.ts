import { createStore, applyMiddleware, compose, Reducer, AnyAction } from 'redux';
import thunk from 'redux-thunk';
import { request } from '@/util';

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
export default (rootReducer: Reducer<any, AnyAction>) => createStore(rootReducer, enhancer);
