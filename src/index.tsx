import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'mobx-react';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import HomeStore from './stores/HomeStore';
import './index.css';

const stores = { homeStore: new HomeStore() };

ReactDOM.render(
  <Provider {...stores}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
