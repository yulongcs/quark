import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'mobx-react';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
/* stores start */
import rootStore from './stores/RootStore';
/* stores end */

const stores = {
  rootStore
};

ReactDOM.render(
  <Provider {...stores}>
    <Router basename={process.env.PUBLIC_URL}>
      <App rootStore={rootStore} />
    </Router>
  </Provider>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
