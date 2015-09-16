'use strict';

export default function Runtime(state = null) {
  // Accumlated state need to apply effects, like data to render.
  // If none, means it's a sub-procedure need to be concated.
  this._state = state;
  this._data = null;
}

/**
 * When the stack of DSL changes, evaluate the Language.Node.
 */
Runtime.prototype.onchange = function(instance, change, stack) {
  var result = this[change.type].apply(this, change.args);
  return [ result ];
};

Runtime.prototype.start = function() {
  this._effectProcedure = [];
  this._cases = [];
};

Runtime.prototype.run = function() {
  if (this._state) {
    // Append before we append our Effect function.
    // So that if the error is an interruption and already captured
    // by the handler, it will not effect the following steps.
    this._state.queue = this._state.queue.catch(
      this._state.onProcessError.bind(this._state)
    );

    // Concat the built effect after the accumulating.
    this._state.queue = this._state.queue.then(() => {
      // Get the result from the ended state.
      var data = this._state.result;
      console.log('>>>> get the data from state: ', data);
      this._data = data;
      this._effectProcedure.forEach((p) => {
        // Note: all composed Effect and native function will receive the
        // same accumulated result from the State, and it should be considered
        // as an immutable value. This means, Effects or functions should not
        // modify it and to expect the next one can use the new value.
        p(data);
      });
      this._effectProcedure.length = 0;
    });
    this._state.resolve();
  } else if (this._data) {
    // Subprecudure only starts from a data.
    this._effectProcedure.forEach((p) => {
      // Note: all composed Effect and native function will receive the
      // same accumulated result from the State, and it should be considered
      // as an immutable value. This means, Effects or functions should not
      // modify it and to expect the next one can use the new value.
      p(this._data);
    });
    this._effectProcedure.length = 0;
  }
};

/**
 * Close the procedure definition, do nothing.
 */
Runtime.prototype.done = function() {
  return this;
};

Runtime.prototype._execute = function(step) {
  if ('function' !== typeof(step)) {
    throw new Error('TypeError: step is not a function: ' + typeof(step));
  }

  var result = step(this._data);
  if (result instanceof Runtime) {
    // It's a generator that generates new Effect chain.
    // So we need to execute it now.
    result._data = this._data;
    result.run();
  } else if ('undefined' !== typeof(result)) {
    // Else, it is a plain function and it's done when executing it.
    // So it shouldn't return anything.
    throw new Error('TypeError: step should return only Effect; now it is: ' +
      typeof(result));
  }

};

Runtime.prototype.next = function(step) {
  this._effectProcedure.push(() => {
    this._execute(step);
  });
};

/**
 * A pure syntax node.
 */
Runtime.prototype.match = function() {
  this._effectProcedure.push(() => {
    this._cases = [];
  });
};

/**
 * To make a function test all branches until one is true,
 * and then run it when the procedure is executing.
 */
Runtime.prototype.end = function() {
  this._effectProcedure.push(() => {
    var data = this._data;
    var cases = this._cases;
    for (let branch of cases) {
      if (branch.prediction(data)) {
        branch.todo(data);
        break;
      }
    }
    cases.length = 0;
  });
};

/**
 * `pred` must be a function return true/false.
 */
Runtime.prototype.case = function(pred) {
  this._effectProcedure.push(() => {
    this._cases.push({
      'prediction': pred,
      'todo': null
    });
  });
};

/**
 * `step`: another Effect or native function.
 */
Runtime.prototype.to = function(step) {
  this._effectProcedure.push(() => {
    var branch = this._cases[this._cases.length - 1];
    branch.todo = () => {
      this._execute(step);
    };
  });
};

/**
 * Remember we will swap `loop` and `until` at syntax level, so
 * we can get the pred before we run the loop.
 */
Runtime.prototype.loop = function(step) {
  this._effectProcedure.push(() => {
    var loopTimes = this._loopTimes;
    this._loopTimes = null;
    for (let i = 0; i < loopTimes; i++) {
      this._execute(step);
    }
  });
};

/**
 * Remember we will swap `loop` and `until` at syntax level, so
 * we can get the loop time before we run the loop.
 *
 * The `pred` should be a function returns a positive number,
 * which is generated from the `data`.
 */
Runtime.prototype.until = function(pred) {
  this._effectProcedure.push(() => {
    var data = this._data;
    this._loopTimes = pred(data);
    if ('number' !== typeof this._loopTimes) {
      throw new Error('TypeError: loop times must be a number.');
    } else if (0 > this._loopTimes) {
      throw new Error('Loop times must larger than 0.');
    }
  });
};

