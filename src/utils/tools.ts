export const titleToLowerCase = (str: string) => {
  if (!(str && str.trim())) {
    return str;
  }
  const f = str.substring(0, 1).toLocaleLowerCase();
  const t = str.substring(1, str.length);
  return f + t;
};

export const urlSearchParse = (key: string | false = false) => {
  const args = {};
  const query = location.search.substring(1) || location.href.split('?')[1];
  const pairs = query.split('&');
  for (const item of pairs) {
    const pos = item.indexOf('=');
    if (pos === -1) { continue; }
    const name = item.substring(0, pos);
    let value = item.substring(pos + 1);
    value = decodeURIComponent(value);
    args[name] = value;
  }
  return key ? args[key] : args;
};

// 计算字节数
export const getSizeOf = (str: string) => str.replace(/[^\x00-\xff]/g, 'xx').length;


/**
 * copy from https://github.com/ant-design/ant-design-pro/blob/master/src/components/_utils/pathTools.js 
 */
// /userinfo/2144/id => ['/userinfo','/useinfo/2144,'/userindo/2144/id']
export const urlToList = (url: string) => {
  const urllist = url.split('/').filter(i => i);
  return urllist.map((urlItem, index) => urlItem && `/${urllist.slice(0, index + 1).join('/')}`);
};

// escape 防xss攻击
export const escape = (str: string) => str.replace(/<\/script/g, '<\\/script').replace(/<!--/g, '<\\!--');

// 数组对调位置
export const transposeArr = (arr: any[], index1: number, index2: number) => {
  arr.splice(index1 - 1, 1, ...arr.splice(index2 - 1, 1, arr[index1 - 1]));
  return arr;
};
