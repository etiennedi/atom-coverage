'use babel';

import AtomCoverageView from './atom-coverage-view';
import { CompositeDisposable, Range, Point } from 'atom';
import { readFile } from 'fs'
import { join } from 'path';

export default {

  atomCoverageView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'atom-coverage:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.subscriptions.dispose();
  },

  serialize() {
    return {
      atomCoverageViewState: this.atomCoverageView.serialize()
    };
  },

  toggle() {
    const rootPath = atom.project.getPaths()[0];
    const pathToCoverage = atom.config.get('atom-coverage.pathToCoverageJson');

    const coveragePath = join(rootPath, pathToCoverage )
    const currentPath = atom.workspace.getActivePaneItem().buffer.file.path;

    const editor =  atom.workspace.getActiveTextEditor();
    const range = new Range(new Point(12,10), new Point(20,20));
    const marker = editor.markBufferRange(range, {invalidate: 'never'})
    editor.decorateMarker(marker, {
        type: 'highlight', class: "my-line-class"
    } )


    readFile(coveragePath, (err, data) => {
        const coverage = JSON.parse(data);
        console.log(coverage[currentPath])
    });

  }
};
