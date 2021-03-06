'use babel';

// @flow

import { CompositeDisposable } from 'atom';
import parseCoverageFile from './parsing';
import { applyStatementsToEditor } from './coverage';

import type { ParsedCoverage } from './parsing';

export default {

  atomCoverageView: null,
  modalPanel: null,
  subscriptions: null,
  toggled: false,
  decoratorList: [],

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
    if (!this.toggled) {
      this.turnCoverageOn();
    } else {
      this.turnCoverageOff();
    }
    this.toggled = !this.toggled;
  },

  turnCoverageOn() {
    parseCoverageFile().then((coverage : ParsedCoverage) => {
      this.decoratorList = applyStatementsToEditor(coverage.statements);
    });
  },

  turnCoverageOff() {
    this.decoratorList.map(marker => marker.destroy());
  },
};
