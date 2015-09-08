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
  this[change.type].apply(this, change.args);
  return [];
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
    this._state.queue = this._state.queue.then((data) => {
      console.log('>>>> execute Effect');
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
    this._data = null;
  }
};

/**
 * Close the procedure definition, do nothing.
 */
Runtime.prototype.done = function() {};

Runtime.prototype.next = function(step) {
  // Another Effect chain.
  if (step instanceof Runtime) {
    this._effectProcedure.concat(step._effectProcedure);
  } else if ('function' === typeof step) {
    // An native function.
    this._effectProcedure.push(step);
  } else {
    throw new Error('TypeError: step is neither another Effect nor function');
  }
};

/**
 * A pure syntax node.
 */
Runtime.prototype.match = function() {
  this.next(() => {
    this._cases = [];
  });
};

/**
 * To make a function test all branches until one is true,
 * and then run it when the procedure is executing.
 */
Runtime.prototype.end = function() {
  this.next((data) => {
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
  this.next(() => {
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
  this.next(() => {
    var branch = this._cases[this._cases.length - 1];
    if (step instanceof Runtime) {
      // Set a function will execute the subprocedure when it
      // is called with data.
      branch.todo = (data) => {
        step._data = data;
        step.run();
      };
    } else {
      branch.todo = step;
    }
  });
};

/**
 * Remember we will swap `loop` and `until` at syntax level, so
 * we can get the pred before we run the loop.
 */
Runtime.prototype.loop = function(step) {
  this.next((data) => {
    var loopTimes = this._loopTimes;
    this._loopTimes = null;
    for (let i = 0; i < loopTimes; i++) {
      if (step instanceof Runtime) {
        step._data = data;
        step.run();
      } else {
        step(data);
      }
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
  this.next((data) => {
    this._loopTimes = pred(data);
    if ('number' !== typeof this._loopTimes) {
      throw new Error('TypeError: loop times must be a number.');
    } else if (0 > this._loopTimes) {
      throw new Error('Loop times must larger than 0.');
    }
  });
};

