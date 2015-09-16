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
  this._generators.forEach((generator) => {
    generator.onchange(this._pulse.bind(this));
  });
};

/**
 * Receive one nativeEvent OR signal.
 * TODO: QUEUING ONLY NATIVE EVENTS.
 */
Runtime.prototype._pulse = function(change) {
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
  this._kickoff(signal, state, effect);
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
  
};

Runtime.ptototype._onSignal = function(signal) {

};
