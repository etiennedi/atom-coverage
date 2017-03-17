import { createParseCoverageFile } from './parsing';

const data = {
  'currentPath.js': {
    statementMap: 'statementMap',
    s: 'coverage',
  },
};

const parseCoverageFile = createParseCoverageFile({
  rootPath: '/somePath',
  coveragePathSetting: 'coverage.json',
  getCurrentPath: () => 'currentPath.js',
  readFile: () => Promise.resolve(JSON.stringify(data)),
});

describe('parseCoverageFile', () => {
  it('returns the data', () => parseCoverageFile().then(
    (result) => {
      expect(result).toEqual({
        statements: {
          coverage: 'coverage',
          map: 'statementMap',
        },
      });
    },
  ));
});
