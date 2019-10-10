import uuid from 'uuid/v5';
import { addToLogCollection } from './db';

/**
 * copy from https://github.com/ant-design/ant-design-pro/blob/master/src/components/_utils/pathTools.js
 */
// /userinfo/2144/id => ['/userinfo','/useinfo/2144,'/userindo/2144/id']
export const urlToList = (url: string) => {
  const urllist = url.split('/').filter(i => i);
  return urllist.map((urlItem, index) => urlItem && `/${urllist.slice(0, index + 1).join('/')}`);
};

// preventing XSS attacks
export const escape = (str: string) => {
  if (!str) {
    return str;
  }
  return str.replace(/<\/script/g, '<\\/script').replace(/<!--/g, '<\\!--');
};

export const getBase64Str = (file: any) => new Promise((resolve) => {
  const fileReader = new FileReader();
  fileReader.readAsDataURL(file);
  // eslint-disable-next-line
  fileReader.onload = function () {
    resolve(this.result as any);
  };
});

export const pxToRem = (px: number) => `${Math.round(px / 28 * 1000) / 1000}rem`;

// // 生成随机数字加字母(index - 最大长度)
// export const generateHash = (index = 10) => Math.random().toString(36).slice(2, index + 2);

export const handleRequestError = async ({
  error, logTitle, showMessage = true, showUnexpectMessage = true, page = 'unknown'
}: {
  error: any;
  page?: string;
  logTitle: string;
  showMessage?: boolean;
  showUnexpectMessage?: boolean;
}): Promise<any> => {
  try {
    const errorJson = await error.response.json();
    if (errorJson && errorJson.message) {
      addToLogCollection({
        createAt: Date.now(), page, title: logTitle, desc: `[code - ${errorJson.code || 'unknown'}]${errorJson.message}`
      });
      if (showMessage) {
        // Toast.fail(errorJson.message);
      }
      return;
    }
    throw error;
  } catch (err) {
    console.error(`『${page}-${logTitle}』`, error);
    addToLogCollection({
      createAt: Date.now(), page, title: logTitle, desc: String(error)
    });
    if (showMessage && showUnexpectMessage) {
      // Toast.fail('网络错误，请重试');
    }
  }
};

export const uuidGen = () => uuid(Math.random().toString(36).slice(2, 12), uuid.DNS);
