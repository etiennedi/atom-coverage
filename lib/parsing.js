'use babel';

// @flow

import { join } from 'path';

import readFile from './helpers/readFilePromise';
import type { Statements } from './coverage';

export type ParsedCoverage = {
  statements: Statements,
}

const getCurrentPath = () => atom.workspace.getActivePaneItem().buffer.file.path;

export type Dependencies = {
  rootPath: string,
  coveragePathSetting: string,
  getCurrentPath: Function,
  readFile: Function,
};

export const createParseCoverageFile = ({
  rootPath,
  coveragePathSetting,
  getCurrentPath,
  readFile,
} : Dependencies) => () : Promise<ParsedCoverage> => {
  const coveragePath = join(rootPath, coveragePathSetting);


  return readFile(coveragePath).then((data) => {
    const coverage = JSON.parse(data.toString());
    const currentFileCoverage = coverage[getCurrentPath()];

    const statements : Statements = {
      map: currentFileCoverage.statementMap,
      coverage: currentFileCoverage.s,
    };

    return {
      statements,
    };
  });
};

const parseCoverageFile = createParseCoverageFile({
  rootPath: atom.project.getPaths()[0],
  coveragePathSetting: atom.config.get('atom-coverage.pathToCoverageJson'),
  getCurrentPath,
  readFile,
});

export default parseCoverageFile;
