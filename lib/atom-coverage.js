// @flow

'use babel';

import AtomCoverageView from './atom-coverage-view';
import { CompositeDisposable } from 'atom';
import { readFile } from 'fs'

export default {

  atomCoverageView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.atomCoverageView = new AtomCoverageView(state.atomCoverageViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.atomCoverageView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'atom-coverage:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.atomCoverageView.destroy();
  },

  serialize() {
    return {
      atomCoverageViewState: this.atomCoverageView.serialize()
    };
  },

  toggle() {
    console.log('AtomCoverage was toggled!');

    readFile('')



    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
