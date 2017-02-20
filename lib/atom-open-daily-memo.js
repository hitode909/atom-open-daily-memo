'use babel';

import { CompositeDisposable } from 'atom';
import os from 'os';

export default {

  subscriptions: null,

  config: {
    directory: {
      type: 'string',
      default: '/tmp/',
    },
    extname: {
      type: 'string',
      default: '.md',
    },
  },

  activate(state) {
    this.subscriptions = new CompositeDisposable();

    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'atom-open-daily-memo:open-memo': () => this.openMemo()
    }));
  },

  deactivate() {
    this.subscriptions.dispose();
  },

  openMemo() {
    atom.workspace.open(this.memoFile());
  },

  memoFile() {
    const directory = atom.config.get('atom-open-daily-memo.directory');
    const date = new Date().toISOString().slice(0,10).replace(/-/g,"");
    const extname = atom.config.get('atom-open-daily-memo.extname');
    return `${directory}/${date}${extname}`;
  }

};
