import * as React from 'react';
import * as ReactDOMServer from 'react-dom/server';
import { StaticRouter as Router } from 'react-router-dom';
import * as Loadable from 'react-loadable';
import * as Koa from 'koa';
import * as path from 'path';
import * as fs from 'fs';
import App from '../../src/App';
// import Store from '../../src/Home/Store';

const manifest = require('../../dist/client/asset-manifest.json');

const renderPage = (ctx: Koa.Context) => {
  // const filePath = path.resolve(__dirname, '..', '..', 'build', 'index.html');
  const filePath = path.join(__dirname, '../../dist/client/index.html');
  const htmlData = fs.readFileSync(filePath, 'utf8');
  const modules: Array<string> = [];
  const extractAssets = (assets: { [key: string]: string | any }, chunks: Array<string>) => Object.keys(assets)
    .filter(asset => chunks.indexOf(asset.replace('.js', '')) > -1)
    .map(k => assets[k]);

  // render app
  const context = {};
  const html = ReactDOMServer.renderToString(
    <Loadable.Capture report={m => modules.push(m)}>
      <Router
        location={ctx.req.url}
        context={context}
      >
        <App pathname={ctx.req.url || '/'} />
      </Router>
    </Loadable.Capture>
  );

  // inject the rendered app into html
  const extraChunks = extractAssets(manifest, modules)
    .map(c => `<script type="text/javascript" src="/${c}"></script>`);
  // const initialState = Store.init();
  // extraChunks.push(`<script type="text/javascript">window.initialState=${Store}</script>`);

  return htmlData
    .replace(
      '<div id="root"></div>',
      `<div id="root">${html}</div>`
    )
    .replace(
      '</body>',
      extraChunks.join('') + '</body>'
    );
};

export default renderPage;
