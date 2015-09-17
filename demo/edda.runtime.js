'use strict';

import Signal from 'demo/signal.js';
// TODO: helpers: Signal.Action, Signal.Native....

export default function Runtime() {}

/**
 * When the stack of DSL changes, evaluate the Language.Node.
 */
Runtime.prototype.onchange = function(instance, change, stack) {
  var result = this[change.type].apply(this, change.args);
  return [ result ];
};

/**
 * Signal is in fact the whole store, which contain all changes in this slice.
 * Some helpers could help State methods distinguish the changes from those
 * accumulated data. So State methods usually needn't not touch the store,
 * and for Effects it depends on the context.
 *
 * And it follows these guidlines:
 *
 * Action: Store -> Store' ~> Effect
 * via: (ActionLabel => run( Signal, Action:{ State, Effect } )
 *
 * `{ Component.onClick = () => call something captured in
 *                              the component when the parent creates it }`
 * via: Effect.DOM -> default effect utility of DOM rendering,
 *                    will handle the part of rendering static name of action
 *                    to actual native callbacks. So rendering function only
 *                    need to receive ActionNames defined in the constants.
 *                    And these actions will be fired as new Signals come from
 *                    one of the input sources.
 * ----
 *
 *  "Component" -> Effect (composable render functions) +
 *                 specific interesting parts of the Signal,
 *                 no matter whether it changes in each run
 *
 *  "Action" -> The picked State method to change the Signal in the run.
 *              And also may fire an Event to perform the switching.
 *              `Signal -> (Signal', Event)`
 *
 *  The flow:
 *
 *      Store -> Action -> Store' -> Component
 *
 *  becomes:
 *
 *      Signal -> Action -> (Signal', Event) -> Effect
 *
 *  consider the outermost Effect will receive the whole Signal' (Store),
 *  there is no need to dispatch different part to specific Effect. So although
 *  the route method will return (Action, Effect) when it is invoked, the
 *  Effect it returns, is in fact always the outermost Effect.
 */

Runtime.prototype.start = function() {};
Runtime.prototype.generators = function(generators) {
  this._generators = generators;
};

/**
 * Route: contain lots of Action.
 * It should be able to pick the corresponding one according
 * to the incoming Signal. For example, if after one run the
 * State return a Signal as {ACTION: 'foo', ....} with the action
 * label (like consts in other frameworks) from our signal helper,
 * it should be able to know the current action is foo, and the
 * corresponding instance should be picked in this run.
 */
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
      signal = new Signal.Native(change.type, change);
    } else {
      // The change is already a signal.
      signal = change;
    }

    var { action, effect } = this._route(signal);
    if (!action) { return; }   // no corresponding one.
    // Note that `_kickoff` may interrupt the queue, if the result
    // contains an Event.
    this._kickoff(signal, action, effect);
  });
  this._queue = this._queue.catch(this._onQueueError.bind(this));
};

Runtime.prototype._kickoff = function(currentsig , action, effect) {
  // Fill the Signal: the data varying over time.
  action.result = currentsig;
  // Let the effect been executed after the action method.
  effect._action = action;
  effect._effectProcedure.push(() => {
    // Effects should not change the result (Signal, Event), so we can
    // collect them after that.
    var { signal, event } = effect._data;
    if (event) { this._onEventEnd(signal, event); }
    else { this._onSignalEnd(signal); }
  });
  // While running the effect, it will be executed after the action,
  // and get the result from that.
  effect.run();
};

Runtime.prototype._onEventEnd = function(signal, event) {
  var newInstance = this._switcher(event);
  // And then interrupt all the following handlers of signals and
  // native events.
  this._interrupt();
  // Finally, switch to the next instance with the signal.
  newInstance.run(signal);
};

Runtime.prototype._onSignalEnd = function(signal) {
  // Feedback to the beginning.
  //
  // dirty trick: to prevent really implementing an infinite loop,
  // if it isn't changed we pause the application until the next
  // change (native event or action) from generators.
  //
  // We detect if it get changed in this way, since one in theory can only
  // do synthesizing to create a new signal to "change" it. And every action
  // must synthesize the signals to keep the change.
  //
  // And if an Action want to reset the whole data, it can fire an Event so
  // that the new Edda instance will receive the new Signal as the only initial
  // Signal, or it can reset the data fields one by one.
  if (!signal._synthetic) { return; }
  // Otherwise, let the loop begins.
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

Runtime.prototype._interrupt = function() {
  var interrupt = new Runtime.Interrupt();
  this._reject(interrupt);
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
