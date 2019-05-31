import { createBrowserHistory, createHashHistory } from 'history';
import config from '../config';

const history = config.history === 'browser' ? createBrowserHistory() : createHashHistory();

export const goPage = (url: string, replace: boolean = false) => {
  if (replace) {
    history.replace(url);
    return;
  }
  history.push(url);
};

export const goBack = () => history.goBack();

export const jumpExternalUrl = (url: string, replace: boolean = false) => {
  if (replace) {
    window.location.replace(url);
    return;
  }
  window.location.href = url;
};

export default history;
