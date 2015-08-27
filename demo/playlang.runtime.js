'use strict';

export default function Runtime() {}

/**
 * When the stack of DSL changes, evaluate the Language.Node.
 */
Runtime.prototype.onchange = function(instance, change, stack) {
  // Since we don't need to keep things in stack until we have
  // real analyzers, the 'onchange' handler would return empty stack
  // to let the language runtime clear the stack every instruction.
  this[change.type].apply(this, change.args);
  // return empty 'handled' stack to let Rune keep no states of
  // every instruction, except the result.
  return [ this.queue ];
};

Runtime.Deferred = function() {
  var promise = new Promise((resolve, reject) => {
    this.resolve = resolve;
    this.reject = reject;
  });
  this.promise = promise;
  return this;
};

Runtime.Context = function() {
  this.deferred = new Runtime.Deferred();
};
Runtime.Context.prototype.returns = function(retvar) {
  this.retvar = retvar;
  this.deferred.resolve(retvar);
};

Runtime.prototype.start = function() {
  var deferred = new Runtime.Deferred();
  this.queue = deferred.promise;
  this.resolve = deferred.resolve;
  this.reject = deferred.reject;
  this.result = null; // the result from each step.
  return this;
};

Runtime.prototype.done = function() {
  this.resolve(); // So the queue start to execute.
};

Runtime.prototype.next = function(step) {
  this.queue = this.queue.then(() => {
    var context = new Runtime.Context();
    step(context, this.result);
    return context.deferred.promise;
  }).then((result) => {
    if (result.next) {
      // If it's also a Playlang statements, concat it.
      return result.queue;
    } else {
      // No matter it's value from an ordinary function or
      // a Promise, returning it is legit for a Promise.
      return result;
    }
  })
  .then((result) => {
    // Get the result from newPromise and set it.
    this.result = result;
  })
  .catch((err) => {
    this.reject(err);
  });
};

Runtime.prototype.match = function() {
  // Collect all 'case' Promises here.
  this.queue = this.queue.then(() => {
    this.matching = [];
    this.matching.matched = false;
  })
  .catch((err) => {
    this.reject(err);
  });
};

// Matching end: execute all matching cases.
Runtime.prototype.end = function() {
  this.queue = this.queue.then(() => {
    this.matching = null;
  }).catch((err) => {
    this.reject(err);
  });
};

/**
 * `pred` must be a sync function only return true or false.
 * If multiple `case` can match the result, only the first matching one
 * will be executed and leave the result.
 */
Runtime.prototype.case = function(pred) {
  this.queue = this.queue.then(() => {
    var id = this.matching.length;
    // In a `match`, we don't update the result,
    // so every `case` can judge if it's true.
    var predresult = pred(this.result);
    this.matching[id] = predresult;
    return id;
  }).catch((err) => {
    this.reject(err);
  });
};

Runtime.prototype.to = function(step) {
  // It's always case..to, so we only need to concat
  // 'to' promise after the 'case' promise.
  this.queue = this.queue.then((id) => {
    // Only append the step if the previous one is true.
    if (!this.matching.matched && this.matching[id]) {
      this.matching.matched = true;
      // If it matches the condition, execute the step before we move
      // to the next step of main queue.
      var newPromise = step(this.result);
      if (newPromise.next) {
        return newPromise.queue;
      } else {
        return newPromise;
      }
    } else {
      return this.result;
    }
  })
  .then((result) => {
    this.result = result;
  })
  .catch((err) => {
    this.reject(err);
  });
};

/**
 * Remember we will swap `loop` and `until` at syntax level, so
 * we can get the pred before we run the loop.
 *
 * 1. First apply the `pred` on the previous result.
 * 2. If true, concat the iteration and the new predicting step after
 *    the looping promise. And the predication will concat new iteration
 *    into the the promise if it's true.
 *
 * Note: only when the predication gives false, the looping promise for
 * the main queue will resolve, so it can run the looping while blocking
 * the main queue.
 */
Runtime.prototype.loop = function(step) {
  this.queue = this.queue.then(() => {
    var loopqueue = this.looping.loopingpromise.promise;
    var pred = this.looping.pred;
    var updateResult = (result) => {
      this.result = result;
    };
    var generatePromise = () => {
      var newPromise = step(this.result);
      if (newPromise.next) {
        return newPromise.queue.then(updateResult);
      } else if (newPromise.then) {
        return newPromise.then(updateResult);
      } else {
        // Ordinary function will return the result.
        var newResult = newPromise;
        updateResult(newResult);
        return Promise.resolve();
      }
    };
    this.looping.loopingpromise.promise =
      loopqueue.then(() => {
        if (pred(this.result)) {
          this.looping.loopingpromise.promise =
            loopqueue.then(generatePromise);
        } else {
          this.looping.queueblocker.resolve();
        }
      });
    // Block the main queue until the loop ends.
    return this.looping.queueblocker.promise;
  })
  .catch((err) => {
    this.reject(err);
  });
};

/**
 * Remember we will swap `loop` and `until` at syntax level, so
 * we can get the pred before we run the loop.
 */
Runtime.prototype.until = function(pred) {
  this.queue = this.queue.then(() => {
    this.looping = {
      'pred': pred,
      'loopingpromise': Promise.resolve(),
      'queueblocker': new Runtime.Deferred()
    };
  })
  .catch((err) => {
    this.reject(err);
  });
};

Runtime.prototype.any = function() {
  var updateResult = (result) => {
    this.result = result;
  };
  var generatePromise = (step) => {
    var newPromise = step(this.result);
    if (newPromise.next) {
      return newPromise.queue;
    } else if (newPromise.then) {
      return newPromise;
    } else {
      // Ordinary function will return the result.
      var newResult = newPromise;
      updateResult(newResult);
      return Promise.resolve(newResult);
    }
  };
  var candidates = Array.from(arguments);
  this.queue = this.queue.then(() => {
    return Promise.race(candidates.map((step) => {
      return generatePromise(step);
    })).then(updateResult);
  })
  .catch((err) => {
    this.reject(err);
  });
};

Runtime.prototype.any = function() {
  var any = this._raceOrAll('race');
  var candidates = Array.from(arguments);
  any.call(this, candidates);
};

Runtime.prototype.all = function() {
  var all = this._raceOrAll('all');
  var candidates = Array.from(arguments);
  all.call(this, candidates);
};

Runtime.prototype._raceOrAll = function(promiseMethod) {
  var generated = (candidates) => {
    var updateResult = (result) => {
      this.result = result;
    };
    var generatePromise = (step) => {
      var context = new Runtime.Context();
      step(context, this.result);
      return context.deferred.promise
        .then((result) => {
          if (result.next) {
            return result.queue;
          } else if (result.then) {
            return result.then(updateResult);
          } else {
            // Ordinary function will return the plain result.
            // And we need to turn it as a promise.
            return Promise.resolve(result);
          }
        });
    };
    this.queue = this.queue.then(() => {
      // Catch generatePromise.
      try {
        var allPromises = candidates.map((step) => {
          return generatePromise(step);
        });
        if ('race' === promiseMethod) {
          return Promise.race(allPromises).then(updateResult);
        } else if ('all' === promiseMethod) {
          return Promise.all(allPromises).then(updateResult);
        }
      } catch(e) {
        console.error(e);
        throw e;
      }
    })
    .catch((err) => {
      this.reject(err);
    });
  };
  return generated;
};

