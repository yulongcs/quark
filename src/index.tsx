import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'mobx-react';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
/* stores start */
import rootStore from './stores/RootStore';
import homeStore from './stores/HomeStore';
/* stores end */
import './index.css';
import './common/interceptors';

const stores = {
  rootStore,
  homeStore
};

ReactDOM.render(
  <Provider {...stores}>
    <Router basename={process.env.PUBLIC_URL}>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
