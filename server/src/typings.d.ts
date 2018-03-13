declare module 'koa-onerror' {
  function onError(app: any, opts?: { [key: string]: string | any }): any;
  export default onError;
}

// // typings.d.ts
// declare module '*.less' {
//   const content: any;
//   export default content;
// }
