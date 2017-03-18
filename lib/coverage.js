'use babel';

// @flow

import { addDecoratorFromMap } from './decorations';

export type Statements = {
  map: Object,
  coverage: Object,
}

const addCoverageToStatementMap = coverageData => (statement, index) => ({
  ...statement,
  covered: coverageData[index],
});

const applyStatementsToEditor = (statements: Statements) => {
  const editor = atom.workspace.getActiveTextEditor();
  return Object.keys(statements.map)
    .map(key => statements.map[key])
    .map(addCoverageToStatementMap(statements.coverage))
    .map(addDecoratorFromMap(editor));
};

export { applyStatementsToEditor };
