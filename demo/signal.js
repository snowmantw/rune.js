'use strict';

export default function Signal(type, details) {
  this._timestamp = Date.now();
  this._synthetic = false;
  this.type = type;
  this.details = details;
}

Signal.Native = function(type, evt) {
  // To prevent some native event with weird format without the type.
  evt.type = type;
  var details = { nativeEvent: evt };
  var signal = new Signal(type, details);
  return signal;
};

Signal.Action = function(type, payload) {
  var details = { action: { 'type': type, 'payload': payload } };
  var signal = new Signal(type, details);
  return signal;
};

/**
 * Treat it as a whole new instance (immutable-like).
 * The major reason why we couldn't just copy it is in some native
 * event, there are some functions that can't be easily copied.
 */
Signal.prototype.synthesize = function(signal) {
  this._timestamp = Date.now();
  this._synthetic = true;
  Object.keys(signal.details).forEach((key) => {
    var newvalue = signal.details[key];
    if ('undefined' !== typeof(this.details[key])) {
      console.warn('When synthesizing, use new value to replace the old one: ',
        key);
    }
    this.details[key] = newvalue;
  });
  return this;
};

