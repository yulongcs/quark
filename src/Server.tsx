import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import * as Loadable from 'react-loadable';
import App from './App';
// import registerServiceWorker from './registerServiceWorker';
import './index.css';

window.onload = () => {
  Loadable.preloadReady().then(() => {
    ReactDOM.hydrate(
      <Router>
        <App pathname={location.pathname}/>
      </Router>,
      document.getElementById('root') as HTMLElement
    );
  });
};
// registerServiceWorker();
