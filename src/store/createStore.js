import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import axios from 'axios'
import Perf from 'react-addons-perf'
import version from './reducer'
// import projectsReducer from './Projects/reducers'

window.Perf = Perf

const reducer = combineReducers({
  version
})

const middlewares = []
if (process.env.NODE_ENV !== 'production') {
  /* eslint-disable global-require */
  middlewares.push(require('redux-immutable-state-invariant').default())
  /* eslint-disable global-require */
}

const storeEnhancers = compose(
  applyMiddleware(...middlewares),
  (window && window.devToolsExtension && process.env.NODE_ENV !== 'production') ? window.devToolsExtension() : f => f
)

export default createStore(
  reducer,
  {},
  compose(
    applyMiddleware(
      thunk.withExtraArgument(
        { axios }
      )
    ),
    storeEnhancers
  )
)
