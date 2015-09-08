'use strict';

import Interface from 'demo/playlang.interface.js';
import Runtime from 'demo/playlang.runtime.js';

export default function Playlang() {
  this._runtime = new Runtime();
  this._interface = new Interface(this._runtime);
  return this._interface;
}
