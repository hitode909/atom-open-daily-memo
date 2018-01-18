'use babel';

import { CompositeDisposable } from 'atom';
import expandHomeDir from 'expand-home-dir';

export default {

  subscriptions: null,

  config: {
    directory: {
      type: 'string',
      default: '~/Documents/',
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
    const directory = expandHomeDir(atom.config.get('atom-open-daily-memo.directory'));
    const now = new Date();
    const date = [now.getFullYear(), now.getMonth()+1, now.getDate()].map(d=>d.toString().length>1?d:`0${d}`).join('');
    const extname = atom.config.get('atom-open-daily-memo.extname');
    return `${directory}/${date}${extname}`;
  }

};
