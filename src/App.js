import React from 'react'
import { Router, Route, Switch } from 'react-router-dom'
import createHistory from 'history/createBrowserHistory'
import asyncComponent from './components/AsyncComponent'
// import { injectAsyncReducer } from './store/createStore'
// import xreducer from './routes/Home/reducers'

const history = createHistory()

/* eslint-disable */
function App(props) {
  // console.log(props.store) func
  const AsyncHome = asyncComponent(() => import('./routes/Home/containers/Home'), props.store, ['about', require('./routes/Home/reducers').default])
  const AsyncAbout = asyncComponent(() => import('./routes/About/About'))
  const AsyncNotFound = asyncComponent(() => import('./routes/NotFound/NotFound'))

  return (
    <Router history={history}>
      <div>
        <div>
          <Switch>
            <Route exact path='/' component={AsyncHome} />
            <Route exact path='/about' component={AsyncAbout} />
            <Route path='*' component={AsyncNotFound} />
          </Switch>
        </div>
      </div>
    </Router>
  )
}

export default App
