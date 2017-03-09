'use babel';

import { CompositeDisposable, Range, Point } from 'atom';
import { readFile } from 'fs';
import { join } from 'path';

const createPointFromBoundary = boundary =>
  new Point(boundary.line - 1, boundary.column);

const createRangeFromStatement = statement =>
  new Range(
    createPointFromBoundary(statement.start),
    createPointFromBoundary(statement.end),
  );

const addDecoratorFromMap = editor => (statement) => {
  console.log('statement in addDec', statement);
  const range = createRangeFromStatement(statement);
  const marker = editor.markBufferRange(range, { invalidate: 'never' });
  return editor.decorateMarker(marker, { type: 'highlight', class: 'uncovered' });
};

export default {

  atomCoverageView: null,
  modalPanel: null,
  subscriptions: null,

  activate(/* state*/) {
    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'atom-coverage:toggle': () => this.toggle(),
    }));
  },

  deactivate() {
    this.subscriptions.dispose();
  },

  serialize() {

  },

  toggle() {
    const rootPath = atom.project.getPaths()[0];
    const pathToCoverage = atom.config.get('atom-coverage.pathToCoverageJson');

    const coveragePath = join(rootPath, pathToCoverage);
    const currentPath = atom.workspace.getActivePaneItem().buffer.file.path;

    const editor = atom.workspace.getActiveTextEditor();
    const range = new Range(new Point(12, 10), new Point(20, 20));
    const marker = editor.markBufferRange(range, { invalidate: 'never' });
    editor.decorateMarker(marker, {
    });

    readFile(coveragePath, (err, data) => {
      const coverage = JSON.parse(data);
      const currentFileCoverage = coverage[currentPath];

      this.decoratorList = Object.keys(currentFileCoverage.statementMap)
          .map(key => currentFileCoverage.statementMap[key])
          .map(addDecoratorFromMap(editor));
    });
  },
};
