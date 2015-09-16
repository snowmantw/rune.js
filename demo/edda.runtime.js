'use strict';

import Signal from 'demo/signal.js';

export default function Runtime() {}

/**
 * When the stack of DSL changes, evaluate the Language.Node.
 */
Runtime.prototype.onchange = function(instance, change, stack) {
  var result = this[change.type].apply(this, change.args);
  return [ result ];
};

Runtime.prototype.start = function() {};
Runtime.prototype.generators = function(generators) {
  this._generators = generators;
};

Runtime.prototype.route = function(route) {
  this._route = route;
};

Runtime.prototype.switcher = function(switcher) {
  this._switcher = switcher;
};

Runtime.prototype.done = function() {
  return this;
};

Runtime.prototype.run = function(signal) {
  var deferred = new Runtime.Deferred();
  this._queue = deferred.promise;
  this._resolve = deferred.resolve;
  this._reject = deferred.reject;

  // Everytime these input sources have new inputs, they
  // will push one new handler into the queue, and execute it.
  this._generators.forEach((generator) => {
    generator.onchange(this._pulse.bind(this));
  });
};

/**
 * Receive one nativeEvent OR signal.
 * The handler will be queued, and only when the
 * main queue is not interrupted, the task will be
 * executed.
 */
Runtime.prototype._pulse = function(change) {
  this._queue = this._queue.then(() => {
    var signal;
    if (!(change instanceof Signal)) {
      // Turn the native event to the signal.
      var data = change;
      signal = new Signal(change.type, data);
    } else {
      // The change is already a signal.
      signal = change;
    }

    var { state, effect } = this._route(signal);
    if (!state) { return; }   // no corresponding one.
    // _kickoff may interrupt the queue, if the result contains an Event.
    this._kickoff(signal, state, effect);
  });
  this._queue = this._queue.catch(this._onQueueError.bind(this));
};

Runtime.prototype._kickoff = function(currentsig ,state, effect) {
  // Fill the Signal: the data varying over time.
  state.result = currentsig;
  // Let the effect been executed after the state method.
  effect._state = state;
  effect._effectProcedure.push(() => {
    // Effects should not change the result (Signal, Event), so we can
    // collect them after that.
    var { signal, event } = effect._data;
    if (event) { this._onEvent(signal, event); }
    else { this._onSignal(signal); }
  });
  // While running the effect, it will be executed after the state,
  // and get the result from that.
  effect.run();
};

Runtime.prototype._onEvent = function(signal, event) {
  var newInstance = this._switcher(event);
  // And then interrupt all the following handlers of signals and
  // native events.
  this._interrupt();
  // Finally, switch to the next instance with the signal.
  newInstance.run(signal);
};

Runtime.prototype._interrupt = function() {
  var interrupt = new Runtime.Interrupt();
  this._reject(interrupt);
};

Runtime.prototype._onSignal = function(signal) {
  this._pulse(signal);
};

Runtime.prototype._onQueueError = function(err) {
  if (!(err instanceof Runtime.Interrupt)) {
    // Print it to debug.
    console.error(err);
    // Then to interrupt the queue.
    throw err;
  } else {
    // Only to interrupt the queue.
  }
};

Runtime.Deferred = function() {
  var promise = new Promise((resolve, reject) => {
    this.resolve = resolve;
    this.reject = reject;
  });
  this.promise = promise;
  return this;
};

Runtime.Interrupt = function() {};
