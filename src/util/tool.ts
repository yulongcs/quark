import { pxTransform as pxTransformUtil } from '@vdfor/util';

/**
 * copy from https://github.com/ant-design/ant-design-pro/blob/master/src/components/_utils/pathTools.js
 */
// /userinfo/2144/id => ['/userinfo','/useinfo/2144,'/userindo/2144/id']
export const urlToList = (url: string) => {
  const urllist = url.split('/').filter(i => i);
  return urllist.map((urlItem, index) => urlItem && `/${urllist.slice(0, index + 1).join('/')}`);
};

export const getBase64Str = (file: any) =>
  new Promise(resolve => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    // eslint-disable-next-line
    fileReader.onload = function() {
      resolve(this.result as any);
    };
  });

export const pxTransform = (px: number) => pxTransformUtil(px, 32);
