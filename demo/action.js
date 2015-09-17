'use strict';

import Interface from 'demo/action.interface.js';
import Runtime from 'demo/action.runtime.js';

export default function State() {
  this._runtime = new Runtime();
  this._interface = new Interface(this._runtime);
  return this._interface;
}
