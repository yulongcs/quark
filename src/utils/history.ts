import { createBrowserHistory, createHashHistory } from 'history';

const history = process.env.NODE_ENV === 'development' ? createHashHistory() : createBrowserHistory();

export const goPage = (url: string) => history.push(url);

export const goBack = () => history.goBack();

export const jumpExternalUrl = (url: string) => {
  window.location.href = url;
};

export default history;
