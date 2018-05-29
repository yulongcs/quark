// import * as fs from 'fs';
// import * as path from 'path';
// import * as React from 'react';
// import * as ReactDOMServer from 'react-dom/server';
// import * as Loadable from 'react-loadable';
// import { StaticRouter as Router } from 'react-router-dom';
// import { WithRouterApp } from '../src/App/index-charon';
// // import Store from '../../src/Home/Store';
// const manifest = require('../build/asset-manifest.json');

// const renderPage = (req: Request) => {
//   // const filePath = path.resolve(__dirname, '..', '..', 'build', 'index.html');
//   const filePath = path.join(__dirname, '../build/index-charon.html');
//   const htmlData = fs.readFileSync(filePath, 'utf8');
//   const modules: string[] = [];
//   const extractAssets = (assets: { [key: string]: string | any }, chunks: string[]) => Object.keys(assets)
//     .filter(asset => chunks.indexOf(asset.replace('.js', '')) > -1)
//     .map(k => assets[k]);

//   // render app
//   const context = {};
//   const html = ReactDOMServer.renderToString(
//     /* tslint:disable */
//     <Loadable.Capture report={m => modules.push(m)}>
//       <Router
//         location={req.url}
//         context={context}
//       >
//         <WithRouterApp />
//       </Router>
//     </Loadable.Capture>
//     /* tslint:enable */
//   );

//   // inject the rendered app into html
//   const extraChunks = extractAssets(manifest, modules)
//     .map(c => `<script type="text/javascript" src="/${c}"></script>`);
//   // const initialState = Store.init();
//   // extraChunks.push(`<script type="text/javascript">window.initialState=${Store}</script>`);

//   return htmlData
//     .replace(
//       '<div id="root"></div>',
//       `<div id="root">${html}</div>`
//     )
//     .replace(
//       '</body>',
//       extraChunks.join('') + '</body>'
//     );
// };

// export default renderPage;
