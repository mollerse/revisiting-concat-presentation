// CodeMirror, copyright (c) by Marijn Haverbeke and others
// Distributed under an MIT license: http://codemirror.net/LICENSE

// Ait syntax highlight - simple mode
//

(function(mod) {
  if (typeof exports == 'object' && typeof module == 'object')
    // CommonJS
    mod(
      require('codemirror/lib/codemirror'),
      require('codemirror/addon/mode/simple')
    );
  else if (typeof define == 'function' && define.amd)
    // AMD
    define(['codemirror/lib/codemirror', 'codemirror/addon/mode/simple'], mod); // Plain browser env
  else mod(CodeMirror);
})(function(CodeMirror) {
  'use strict';

  CodeMirror.defineSimpleMode('ait', {
    // The start state contains the rules that are intially used
    start: [
      // comments
      { regex: /#.*$/, token: 'comment' },
      // strings
      { regex: /"|'/, token: 'string', next: 'string' },
      // definition: defining word, defined word, etc
      { regex: /(.*)(:)(\s|$)/, token: ['constant', 'keyword'] },
      // numbers
      { regex: /(?:[+-]?)(?:\d+.?\d*)/, token: 'number' },
      // syntax
      { regex: /;|\[|\]|{|}/, token: 'keyword' },
      // words
      { regex: /[a-zA-Z0-9<>+-=\\\*%]+/, token: 'variable' }
    ],
    string: [
      { regex: /(?:[^\\]|\\.)*?("|')/, token: 'string', next: 'start' },
      { regex: /.*/, token: 'string' }
    ],
    // The meta property contains global information about the mode. It
    // can contain properties like lineComment, which are supported by
    // all modes, and also directives like dontIndentStates, which are
    // specific to simple modes.
    meta: {
      lineComment: ['#']
    }
  });

  CodeMirror.defineMIME('text/x-ait', 'ait');
});
