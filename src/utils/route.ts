import { history } from './';

export const goPage = (url: string) => {
  history.push(url);
};

export const goBack = () => {
  history.goBack();
};

export const jumpExternalURL = (url: string) => {
  location.href = url;
};


