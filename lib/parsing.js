'use babel';

// @flow

import { readFile } from 'fs';
import { join } from 'path';

import type { Statements } from './coverage';

export type ParsedCoverage = {
  statements: Statements,
}

const readFilePromise = (path : string) : Promise<Buffer> => new Promise((resolve, reject) => {
  readFile(path, (error, data) => {
    if (error) {
      return reject(error);
    }
    return resolve(data);
  });
});

export const parseCoverageFile = () : Promise<ParsedCoverage> => {
  const rootPath = atom.project.getPaths()[0];

  const pathToCoverage: string = atom.config.get('atom-coverage.pathToCoverageJson');
  const coveragePath = join(rootPath, pathToCoverage);

  const currentPath = atom.workspace.getActivePaneItem().buffer.file.path;

  return readFilePromise(coveragePath).then((data) => {
    const coverage = JSON.parse(data.toString());
    const currentFileCoverage = coverage[currentPath];

    const statements : Statements = {
      map: currentFileCoverage.statementMap,
      coverage: currentFileCoverage.s,
    };

    return {
      statements,
    };
  });
};
