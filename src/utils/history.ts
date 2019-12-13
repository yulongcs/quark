import router from 'umi/router';

export const goPage = (url: string, replace = false) => {
  if (replace) {
    router.replace(url);
    return;
  }
  router.push(url);
};

export const goBack = () => router.goBack();

export const jumpExternalUrl = (url: string, replace = false) => {
  if (replace) {
    window.location.replace(url);
    return;
  }
  window.location.href = url;
};
