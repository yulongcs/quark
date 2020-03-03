import { history } from 'umi';

export const goPage = (url: string, replace = false) => {
  if (replace) {
    history.replace(url);
    return;
  }
  history.push(url);
};

export const goBack = () => history.goBack();

export const jumpExternalUrl = (url: string, replace = false) => {
  if (replace) {
    window.location.replace(url);
    return;
  }
  window.location.href = url;
};
