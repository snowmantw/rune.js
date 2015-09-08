'use strict';

import Interface from 'demo/effect.interface.js';
import Runtime from 'demo/effect.runtime.js';

export default function Effect(state) {
  this._runtime = new Runtime(state);
  this._interface = new Interface(this._runtime);
  return this._interface;
}
