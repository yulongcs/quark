import React from 'react'
import { Router, Route, Switch } from 'react-router-dom'
import PropTypes from 'prop-types'
import createHistory from 'history/createBrowserHistory'
import asyncComponent from './AsyncComponent'
import Header from './routes/Header/Header'

const history = createHistory()

function App(props) {
  const AsyncHome = asyncComponent(() => import('./routes/Home/containers/Home'), props.store, ['home', require('./routes/Home/reducers').default])
  const AsyncTest = asyncComponent(() => import('./routes/Test/containers/Test'), props.store, ['test', require('./routes/Test/reducers').default])
  const AsyncAbout = asyncComponent(() => import('./routes/About/About'))
  const AsyncNotFound = asyncComponent(() => import('./routes/NotFound/NotFound'))
  return (
    <Router history={history}>
      <div>
        <Header />
        <div>
          <Switch>
            <Route exact path='/' component={AsyncHome} />
            <Route exact path='/test' component={AsyncTest} />
            <Route exact path='/about' component={AsyncAbout} />
            <Route path='*' component={AsyncNotFound} />
          </Switch>
        </div>
      </div>
    </Router>
  )
}

App.propTypes = {
  store: PropTypes.object
}

export default App
