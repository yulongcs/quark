import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import App from './App'
import registerServiceWorker from './registerServiceWorker'
import { configureStore } from './store/createStore'
// import root from './routes/root'

const store = configureStore()
// const AsyncHome = asyncComponent(() => import('./routes/Home/containers/Home'))
// const AsyncAbout = asyncComponent(() => import('./components/About'))
// const AsyncNotFound = asyncComponent(() => import('./components/NotFound'))

ReactDOM.render(
  <Provider store={store}>
    <App store={store} />
  </Provider>,
  document.getElementById('root')
)
registerServiceWorker()
