import express from 'express';
import * as path from 'path';
import {S3Config} from '../../types';
import {resolveFilenames} from '../../utils/resolve-filenames';

export function serveLocalS3(app: express.Express, s3Config: S3Config): void {
  const {type, publicPath, responseHeaders = {}} = s3Config;

  for (const filename of resolveFilenames(s3Config)) {
    app.get(
      type === 'folder'
        ? path.join(publicPath, path.basename(filename))
        : publicPath,
      (_req, res) => {
        const {accessControlAllowOrigin} = responseHeaders;

        if (accessControlAllowOrigin) {
          res.setHeader(
            'Access-Control-Allow-Origin',
            accessControlAllowOrigin
          );
        }

        res.sendFile(filename);
      }
    );
  }
}
