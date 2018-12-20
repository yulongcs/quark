import { createHashHistory as createHistory } from 'history';
// import { createBrowserHistory as createHistory } from 'history';

const history = createHistory();

export const goPage = (url: string) => history.push(url);

export const goBack = () => history.goBack();

export const jumpExternalUrl =(url: string) => location.href = url;

export default history;
