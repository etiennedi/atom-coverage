'use babel';

// @flow

import { addDecoratorFromMap } from './decorations';

export type Statements = {
  map: Object,
  coverage: Object,
}

const applyStatementsToEditor = (statements: Statements) => {
  const editor = atom.workspace.getActiveTextEditor();
  Object.keys(statements.map)
    .map(key => statements.map[key])
    .map(addDecoratorFromMap(editor));
};

export { applyStatementsToEditor };
