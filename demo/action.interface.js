'use strict';

import Rune from 'dist/rune.js';

/**
 * A demo eDSL with most features a full language should be with.
 * This file contains only interfacen, which means it need to be instantiated
 * with a runtime to execute the language.
 *
 * Note: since to handle async function properly need extra efforts,
 * so this demo language doesn't fully handle them yet. Although this eDSL
 * indeed put all steps in a Promise to be the first step toward that.
 */
export default function Interface(runtime) {
  this.context = {
    started: false,
    stopped: false,
    looping: false,
    matching: false
  };
  this.stack = [];
  this._runtime = runtime;
  this._evaluator = (new Rune.Evaluate())
    .analyzer(this._analyzeOrder.bind(this))
    .interpreter(this._interpret.bind(this));
}

Interface.prototype.start = Rune.define('start', 'begin');
Interface.prototype.done = Rune.define('done', 'exit');
Interface.prototype.run = Rune.define('run', 'exit');
Interface.prototype.effect = Rune.define('effect', 'exit');
Interface.prototype.next = Rune.define('next', 'push');
Interface.prototype.match = Rune.define('match', 'begin');
Interface.prototype.end = Rune.define('end', 'end');
Interface.prototype.case = Rune.define('case', 'push');
Interface.prototype.to = Rune.define('to', 'push');
Interface.prototype.as = Rune.define('as', 'push');
Interface.prototype.loop = Rune.define('loop', 'begin');
Interface.prototype.until = Rune.define('until', 'end');
Interface.prototype.any = Rune.define('any', 'push');
Interface.prototype.all = Rune.define('all', 'push');

Interface.prototype.onchange = function(context, node, stack) {
  // When it's changed, evaluate it with analyzers & interpreter.
  return this._evaluator(context, node, stack);
};

Interface.prototype._interpret = function(context, node, stack) {
  // Well in this eDSL we delegate the interpretion to the runtime.
  // We don't pass context to runtime since the runtime will keep
  // the essential states by its own.
  return this._runtime.onchange.apply(this._runtime, arguments);
};

// In this eDSL we now only have this analyzer. Could add more and register it
// in the contruction of 'this._evaluator'.
Interface.prototype._analyzeOrder = function(context, change, stack) {
  if ('start' === change.type) {
    context.started = true;
  } else if ('stop') {
    context.stopped = true;
  }
  if ('start' === change.type && context.stopped) {
    throw new Error('Should not start a process again' +
        'after it\'s already stopped');
  } else if ('next' === change.type && !context.started) {
    throw new Error('Should not concat steps while it\'s not started');
  } else if ('stop' === change.type && !context.started) {
    throw new Error('Should not stop a process before it\'s started');
  }
};
