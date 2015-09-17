'use strict';

import Rune from 'dist/rune.js';

export default function Interface(runtime) {
  this.context = {
    started: false,
    withgenerators: false,
    withroute: false,
    withswitcher: false
  };
  this.stack = [];
  this._runtime = runtime;
  this._evaluator = (new Rune.Evaluate())
    .analyzer(this._analyzeOrder.bind(this))
    .interpreter(this._interpret.bind(this));
}

Interface.prototype.start = Rune.define('start', 'begin');
Interface.prototype.generators = Rune.define('generators', 'push',
    `Gives an array of generators to generate inputs, and the Edda
     instance can call the generator's "onchange" method to be notified.
     Yes, this is the most ugly bridge to the old observer pattern,
     but another way, namely to loop over generators, will cost us too
     much. Maybe it will be availalbe if we want to have a 'strict' mode.

     generators:: [(() -> Signal)] -> ()`);

Interface.prototype.route = Rune.define('route', 'push',
    `Gives a function that receives one Signal and returns
     a (Action, Effect) pair, and then the Edda instance
     will feed the Signal to the Action, get the output of (Signal, Event)
     pair, then apply the Signal to the Effect.

     route:: (Signal -> (Action, Effect)) -> ()`);

Interface.prototype.switcher = Rune.define('switcher', 'push',
    `Gives a function that receives one Event and generates
     another Edda instance, so that the next tick it will
     use the new instance instead of the current one.

     switcher:: (Event -> Edda) -> () `);

Interface.prototype.done = Rune.define('done', 'exit',
    `The end of the definition of an Edda instance`);

Interface.prototype.run = Rune.define('run', 'exit',
    `Executes the Edda instance. It's an option to give it an initial
     Signal as this the argument of this method, or it will create one
     empty Signal to kick off the Edda instance.`);

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
