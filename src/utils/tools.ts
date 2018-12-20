import uuid from 'uuid/v5';

// compute bytes
export const getSizeOf = (str: string) => str.replace(/[^\x00-\xff]/g, 'xx').length;

/**
 * copy from https://github.com/ant-design/ant-design-pro/blob/master/src/components/_utils/pathTools.js 
 */
// /userinfo/2144/id => ['/userinfo','/useinfo/2144,'/userindo/2144/id']
export const urlToList = (url: string) => {
  const urllist = url.split('/').filter(i => i);
  return urllist.map((urlItem, index) => urlItem && `/${urllist.slice(0, index + 1).join('/')}`);
};

// preventing XSS attacks
export const escape = (str: string) => str.replace(/<\/script/g, '<\\/script').replace(/<!--/g, '<\\!--');

export const getBase64 = (file: any) => new Promise(resolve => {
  const fileReader = new FileReader();
  fileReader.readAsDataURL(file);
  fileReader.onload = function () {
    resolve(this.result as any);
  };
});

// // 生成随机数字加字母(index - 最大长度)
// export const generateHash = (index = 10) => Math.random().toString(36).slice(2, index + 2);

export const uuidGen = () => uuid(Math.random().toString(36).slice(2, 12), uuid.URL);
