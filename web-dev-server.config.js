/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
import fs from 'fs';
import path from 'path';
import {legacyPlugin} from '@web/dev-server-legacy';
const indexHtml = fs.readFileSync(path.resolve(process.cwd(), 'index.html'), {
  encoding: 'utf8',
});

const mode = process.env.MODE || 'dev';
if (!['dev', 'prod'].includes(mode)) {
  throw new Error(`MODE must be "dev" or "prod", was "${mode}"`);
}

export default {
  nodeResolve: {exportConditions: mode === 'dev' ? ['development'] : []},
  preserveSymlinks: true,
  historyApiFallback: true,
  appIndex: 'index.html',
  rootDir: '.',
  watch: true,
  middleware: [
    async (context, next) => {
      // run other middlewares / static handlers first
      await next();

      // Only handle GET requests that resulted in 404.
      // Avoid requests for files (have a dot) and node_modules.
      const isGet =
        context.request.method === 'GET' || context.request.method === 'get';
      const is404 = context.response && context.response.status === 404;
      const isNodeModule = context.path.startsWith('/node_modules/');

      if (isGet && is404 && !isNodeModule) {
        // Serve index.html directly — avoid calling `next()` again
        context.response.status = 200;
        // some versions expose ctx.set, others expose headers - set both defensively
        if (typeof context.set === 'function') {
          context.set('Content-Type', 'text/html; charset=utf-8');
        } else if (
          context.response &&
          context.response.headers &&
          typeof context.response.headers.set === 'function'
        ) {
          context.response.headers.set(
            'content-type',
            'text/html; charset=utf-8'
          );
        }
        context.response.body = indexHtml;
      }
    },
  ],
  plugins: [
    legacyPlugin({
      polyfills: {
        // Manually imported in index.html file
        webcomponents: false,
      },
    }),
  ],
};
