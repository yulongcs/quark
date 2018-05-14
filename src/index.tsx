import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';
import App from './pages/App/index';
import rootStore from './stores/rootStore';
import registerServiceWorker from './registerServiceWorker';

const stores = { rootStore };

ReactDOM.render(
  <Provider {...stores}>
    <App />
  </Provider>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
