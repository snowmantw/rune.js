/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _Promise = __webpack_require__(1)['default'];
	
	var _interopRequireDefault = __webpack_require__(56)['default'];
	
	var _actionJs = __webpack_require__(57);
	
	var _actionJs2 = _interopRequireDefault(_actionJs);
	
	var _effectJs = __webpack_require__(65);
	
	var _effectJs2 = _interopRequireDefault(_effectJs);
	
	var action = new _actionJs2['default']();
	action.start().next(function (ctx) {
	  console.log('>>>>>>>>>> #0: 3 as a', 3);ctx.returns(3);
	}).as('a').until(function (x) {
	  return x === 9;
	}).loop(function (ctx, x) {
	  ctx.returns(x + 1);
	}).until(function (x) {
	  return x === 9;
	}).loop(function (ctx, x) {
	  console.log('>>>>>>> I should not run!');
	  ctx.returns(x + 1);
	}).until(function (x) {
	  return x === 10;
	}).loop(function (ctx, x) {
	  console.log('>>>>>>> I should run once');
	  ctx.returns(x + 1);
	}).next(function (ctx, x) {
	  console.log('>>>>>>>> #1: + 4 as b', x, x + 4);ctx.returns(x + 4);
	}).as('b').next(function (ctx) {
	  console.log('>>>>>>>>> # + a b: ', ctx.a + ctx.b);
	  ctx.returns(ctx.a + ctx.b);
	}).match()['case'](function (n) {
	  return n < 17;
	}).to(function (ctx, a) {
	  ctx.returns(a + 1);
	})['case'](function (n) {
	  return n > 17;
	}).to(function (ctx, b) {
	  ctx.returns(b + 999);
	})['case'](function (n) {
	  return n === 17;
	}).to(function (ctx, c) {
	  new _Promise(function (r, j) {
	    setTimeout(r, 2000);
	  }).then(function () {
	    console.log('>>>>>>>>> # after waiting 2 secs; + 1: ', c, c + 1);
	    ctx.returns(c + 1);
	  });
	})['case'](function (n) {
	  return n === 17;
	}).to(function (ctx, d) {
	  ctx.returns(d - 255);
	}).end().next(function (ctx, x) {
	  console.log('>>>>>>>> # + 5:', x, x + 5);ctx.returns(x + 5);
	}).all(function (ctx) {
	  ctx.returns(1);
	}, function (ctx) {
	  ctx.returns(new _Promise(function (r, j) {
	    setTimeout(function () {
	      r(20);
	    }, 1000);
	  }));
	}).next(function (ctx, rs) {
	  console.log('>>>>>>>>> # after |all|: ', rs);
	  ctx.returns(rs);
	}).any(function (ctx, rs) {
	  ctx.returns(rs[0] + rs[1]);
	}, function (ctx, rs) {
	  ctx.returns(new _Promise(function (r, j) {
	    setTimeout(function () {
	      r(rs[0] - rs[1]);
	    }, 1000);
	  }));
	}).next(function (ctx, r) {
	  console.log('>>>>>>>>> # after |any|; reset as [1, 2, 3]: ', r);
	  ctx.returns(1, 2, 3);
	}).next(function (ctx, rs) {
	  console.log('>>>>>>>>> # return multiple values will become array: ', rs);
	  ctx.returns(1);
	}).next(function (ctx) {
	  console.log('>>>>> try to raise error or interruption');
	  //ctx.raise('TRY TO RAISE');
	  ctx.interrupt(3);
	  // `interrupts` should cancel the `returns`.
	  ctx.returns(3);
	}).next(function (ctx, rs) {
	  console.log('>>>>>>> should not run!');
	  ctx.returns(1);
	}).next(function (ctx, rs) {
	  console.log('>>>>>>> should not run!');
	  ctx.returns(1);
	}).effect().start().until(function (data) {
	  console.log('>>>>> data: ', data);return 3;
	}).loop(function (data) {
	  console.log('>>>>>>> test loop; data: ', data);
	}).match()['case'](function (data) {
	  return data === 2;
	}).to(function () {
	  return new _effectJs2['default']().start().until(function () {
	    return 2;
	  }).loop(function () {
	    console.log('>>>>> first case loop');
	  }).done();
	})['case'](function (data) {
	  return data === 1;
	}).to(function () {
	  return new _effectJs2['default']().start().until(function () {
	    return 2;
	  }).loop(function (data) {
	    console.log('>>>>> second case loop', data);
	  }).done();
	})['case'](function (data) {
	  return data === 1;
	}).to(function () {
	  return new _effectJs2['default']().start().until(function () {
	    return 2;
	  }).loop(function () {
	    console.log('>>>>> duplicated second case loop');
	  }).done();
	}).end().until(function (data) {
	  console.log('>>>>> data; go 4 iterations: ', data);return 4;
	}).loop(function () {
	  return new _effectJs2['default']().start().until(function () {
	    return 2;
	  }).loop(function (data) {
	    console.log('>>>>> loop X loop', data);
	  }).next(function () {
	    console.log('>>>> inner loop done');
	  }).done();
	}).run();
	
	/*

	fn = (ctx, a, b) => {
	  var p = new State()
	  ctx.returns(p.start().next((ctx) => {
	    // It's good to shadowing the outer one,
	    // since we already booked to return that.
	    ctx.returns(a + b);
	  }));
	};

	// DONT USE; NOT IMPLEMENTED INTENTIONALLY
	gn = (ctx, a, b) => {
	  var p = new State()
	  ctx.returns(new Promise((r, j) => {
	    setTimeout(r(a - b), 1000);
	  }).then((result) => {
	    return result + 1;
	  }));
	};

	hn = (ctx, a, b) => {
	  var p = new State()
	  (new Promise((r, j) => {
	    setTimeout(r(a - b), 1000);
	  }).then((result) => {
	    // Use a closure to return it,
	    // just like other ordinary functions.
	    ctx.returns(result + 1);
	  });
	};

	 */

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(2), __esModule: true };

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(3);
	__webpack_require__(4);
	__webpack_require__(27);
	__webpack_require__(34);
	module.exports = __webpack_require__(12).Promise;

/***/ },
/* 3 */
/***/ function(module, exports) {



/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $at  = __webpack_require__(5)(true);
	
	// 21.1.3.27 String.prototype[@@iterator]()
	__webpack_require__(8)(String, 'String', function(iterated){
	  this._t = String(iterated); // target
	  this._i = 0;                // next index
	// 21.1.5.2.1 %StringIteratorPrototype%.next()
	}, function(){
	  var O     = this._t
	    , index = this._i
	    , point;
	  if(index >= O.length)return {value: undefined, done: true};
	  point = $at(O, index);
	  this._i += point.length;
	  return {value: point, done: false};
	});

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	// true  -> String#at
	// false -> String#codePointAt
	var toInteger = __webpack_require__(6)
	  , defined   = __webpack_require__(7);
	module.exports = function(TO_STRING){
	  return function(that, pos){
	    var s = String(defined(that))
	      , i = toInteger(pos)
	      , l = s.length
	      , a, b;
	    if(i < 0 || i >= l)return TO_STRING ? '' : undefined;
	    a = s.charCodeAt(i);
	    return a < 0xd800 || a > 0xdbff || i + 1 === l
	      || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
	        ? TO_STRING ? s.charAt(i) : a
	        : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
	  };
	};

/***/ },
/* 6 */
/***/ function(module, exports) {

	// 7.1.4 ToInteger
	var ceil  = Math.ceil
	  , floor = Math.floor;
	module.exports = function(it){
	  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
	};

/***/ },
/* 7 */
/***/ function(module, exports) {

	// 7.2.1 RequireObjectCoercible(argument)
	module.exports = function(it){
	  if(it == undefined)throw TypeError("Can't call method on  " + it);
	  return it;
	};

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var LIBRARY         = __webpack_require__(9)
	  , $def            = __webpack_require__(10)
	  , $redef          = __webpack_require__(13)
	  , hide            = __webpack_require__(14)
	  , has             = __webpack_require__(19)
	  , SYMBOL_ITERATOR = __webpack_require__(20)('iterator')
	  , Iterators       = __webpack_require__(23)
	  , FF_ITERATOR     = '@@iterator'
	  , KEYS            = 'keys'
	  , VALUES          = 'values';
	var returnThis = function(){ return this; };
	module.exports = function(Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCE){
	  __webpack_require__(24)(Constructor, NAME, next);
	  var createMethod = function(kind){
	    switch(kind){
	      case KEYS: return function keys(){ return new Constructor(this, kind); };
	      case VALUES: return function values(){ return new Constructor(this, kind); };
	    } return function entries(){ return new Constructor(this, kind); };
	  };
	  var TAG      = NAME + ' Iterator'
	    , proto    = Base.prototype
	    , _native  = proto[SYMBOL_ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT]
	    , _default = _native || createMethod(DEFAULT)
	    , methods, key;
	  // Fix native
	  if(_native){
	    var IteratorPrototype = __webpack_require__(15).getProto(_default.call(new Base));
	    // Set @@toStringTag to native iterators
	    __webpack_require__(25)(IteratorPrototype, TAG, true);
	    // FF fix
	    if(!LIBRARY && has(proto, FF_ITERATOR))hide(IteratorPrototype, SYMBOL_ITERATOR, returnThis);
	  }
	  // Define iterator
	  if(!LIBRARY || FORCE)hide(proto, SYMBOL_ITERATOR, _default);
	  // Plug for library
	  Iterators[NAME] = _default;
	  Iterators[TAG]  = returnThis;
	  if(DEFAULT){
	    methods = {
	      keys:    IS_SET            ? _default : createMethod(KEYS),
	      values:  DEFAULT == VALUES ? _default : createMethod(VALUES),
	      entries: DEFAULT != VALUES ? _default : createMethod('entries')
	    };
	    if(FORCE)for(key in methods){
	      if(!(key in proto))$redef(proto, key, methods[key]);
	    } else $def($def.P + $def.F * __webpack_require__(26), NAME, methods);
	  }
	};

/***/ },
/* 9 */
/***/ function(module, exports) {

	module.exports = true;

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	var global    = __webpack_require__(11)
	  , core      = __webpack_require__(12)
	  , PROTOTYPE = 'prototype';
	var ctx = function(fn, that){
	  return function(){
	    return fn.apply(that, arguments);
	  };
	};
	var $def = function(type, name, source){
	  var key, own, out, exp
	    , isGlobal = type & $def.G
	    , isProto  = type & $def.P
	    , target   = isGlobal ? global : type & $def.S
	        ? global[name] : (global[name] || {})[PROTOTYPE]
	    , exports  = isGlobal ? core : core[name] || (core[name] = {});
	  if(isGlobal)source = name;
	  for(key in source){
	    // contains in native
	    own = !(type & $def.F) && target && key in target;
	    if(own && key in exports)continue;
	    // export native or passed
	    out = own ? target[key] : source[key];
	    // prevent global pollution for namespaces
	    if(isGlobal && typeof target[key] != 'function')exp = source[key];
	    // bind timers to global for call from export context
	    else if(type & $def.B && own)exp = ctx(out, global);
	    // wrap global constructors for prevent change them in library
	    else if(type & $def.W && target[key] == out)!function(C){
	      exp = function(param){
	        return this instanceof C ? new C(param) : C(param);
	      };
	      exp[PROTOTYPE] = C[PROTOTYPE];
	    }(out);
	    else exp = isProto && typeof out == 'function' ? ctx(Function.call, out) : out;
	    // export
	    exports[key] = exp;
	    if(isProto)(exports[PROTOTYPE] || (exports[PROTOTYPE] = {}))[key] = out;
	  }
	};
	// type bitmap
	$def.F = 1;  // forced
	$def.G = 2;  // global
	$def.S = 4;  // static
	$def.P = 8;  // proto
	$def.B = 16; // bind
	$def.W = 32; // wrap
	module.exports = $def;

/***/ },
/* 11 */
/***/ function(module, exports) {

	var global = typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
	module.exports = global;
	if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef

/***/ },
/* 12 */
/***/ function(module, exports) {

	var core = module.exports = {};
	if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(14);

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	var $          = __webpack_require__(15)
	  , createDesc = __webpack_require__(16);
	module.exports = __webpack_require__(17) ? function(object, key, value){
	  return $.setDesc(object, key, createDesc(1, value));
	} : function(object, key, value){
	  object[key] = value;
	  return object;
	};

/***/ },
/* 15 */
/***/ function(module, exports) {

	var $Object = Object;
	module.exports = {
	  create:     $Object.create,
	  getProto:   $Object.getPrototypeOf,
	  isEnum:     {}.propertyIsEnumerable,
	  getDesc:    $Object.getOwnPropertyDescriptor,
	  setDesc:    $Object.defineProperty,
	  setDescs:   $Object.defineProperties,
	  getKeys:    $Object.keys,
	  getNames:   $Object.getOwnPropertyNames,
	  getSymbols: $Object.getOwnPropertySymbols,
	  each:       [].forEach
	};

/***/ },
/* 16 */
/***/ function(module, exports) {

	module.exports = function(bitmap, value){
	  return {
	    enumerable  : !(bitmap & 1),
	    configurable: !(bitmap & 2),
	    writable    : !(bitmap & 4),
	    value       : value
	  };
	};

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	// Thank's IE8 for his funny defineProperty
	module.exports = !__webpack_require__(18)(function(){
	  return Object.defineProperty({}, 'a', {get: function(){ return 7; }}).a != 7;
	});

/***/ },
/* 18 */
/***/ function(module, exports) {

	module.exports = function(exec){
	  try {
	    return !!exec();
	  } catch(e){
	    return true;
	  }
	};

/***/ },
/* 19 */
/***/ function(module, exports) {

	var hasOwnProperty = {}.hasOwnProperty;
	module.exports = function(it, key){
	  return hasOwnProperty.call(it, key);
	};

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	var store  = __webpack_require__(21)('wks')
	  , Symbol = __webpack_require__(11).Symbol;
	module.exports = function(name){
	  return store[name] || (store[name] =
	    Symbol && Symbol[name] || (Symbol || __webpack_require__(22))('Symbol.' + name));
	};

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	var global = __webpack_require__(11)
	  , SHARED = '__core-js_shared__'
	  , store  = global[SHARED] || (global[SHARED] = {});
	module.exports = function(key){
	  return store[key] || (store[key] = {});
	};

/***/ },
/* 22 */
/***/ function(module, exports) {

	var id = 0
	  , px = Math.random();
	module.exports = function(key){
	  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
	};

/***/ },
/* 23 */
/***/ function(module, exports) {

	module.exports = {};

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $ = __webpack_require__(15)
	  , IteratorPrototype = {};
	
	// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
	__webpack_require__(14)(IteratorPrototype, __webpack_require__(20)('iterator'), function(){ return this; });
	
	module.exports = function(Constructor, NAME, next){
	  Constructor.prototype = $.create(IteratorPrototype, {next: __webpack_require__(16)(1,next)});
	  __webpack_require__(25)(Constructor, NAME + ' Iterator');
	};

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	var has  = __webpack_require__(19)
	  , hide = __webpack_require__(14)
	  , TAG  = __webpack_require__(20)('toStringTag');
	
	module.exports = function(it, tag, stat){
	  if(it && !has(it = stat ? it : it.prototype, TAG))hide(it, TAG, tag);
	};

/***/ },
/* 26 */
/***/ function(module, exports) {

	// Safari has buggy iterators w/o `next`
	module.exports = 'keys' in [] && !('next' in [].keys());

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(28);
	var Iterators = __webpack_require__(23);
	Iterators.NodeList = Iterators.HTMLCollection = Iterators.Array;

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var setUnscope = __webpack_require__(29)
	  , step       = __webpack_require__(30)
	  , Iterators  = __webpack_require__(23)
	  , toIObject  = __webpack_require__(31);
	
	// 22.1.3.4 Array.prototype.entries()
	// 22.1.3.13 Array.prototype.keys()
	// 22.1.3.29 Array.prototype.values()
	// 22.1.3.30 Array.prototype[@@iterator]()
	__webpack_require__(8)(Array, 'Array', function(iterated, kind){
	  this._t = toIObject(iterated); // target
	  this._i = 0;                   // next index
	  this._k = kind;                // kind
	// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
	}, function(){
	  var O     = this._t
	    , kind  = this._k
	    , index = this._i++;
	  if(!O || index >= O.length){
	    this._t = undefined;
	    return step(1);
	  }
	  if(kind == 'keys'  )return step(0, index);
	  if(kind == 'values')return step(0, O[index]);
	  return step(0, [index, O[index]]);
	}, 'values');
	
	// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
	Iterators.Arguments = Iterators.Array;
	
	setUnscope('keys');
	setUnscope('values');
	setUnscope('entries');

/***/ },
/* 29 */
/***/ function(module, exports) {

	module.exports = function(){ /* empty */ };

/***/ },
/* 30 */
/***/ function(module, exports) {

	module.exports = function(done, value){
	  return {value: value, done: !!done};
	};

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	// to indexed object, toObject with fallback for non-array-like ES3 strings
	var IObject = __webpack_require__(32)
	  , defined = __webpack_require__(7);
	module.exports = function(it){
	  return IObject(defined(it));
	};

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	// indexed object, fallback for non-array-like ES3 strings
	var cof = __webpack_require__(33);
	module.exports = 0 in Object('z') ? Object : function(it){
	  return cof(it) == 'String' ? it.split('') : Object(it);
	};

/***/ },
/* 33 */
/***/ function(module, exports) {

	var toString = {}.toString;
	
	module.exports = function(it){
	  return toString.call(it).slice(8, -1);
	};

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $          = __webpack_require__(15)
	  , LIBRARY    = __webpack_require__(9)
	  , global     = __webpack_require__(11)
	  , ctx        = __webpack_require__(35)
	  , classof    = __webpack_require__(37)
	  , $def       = __webpack_require__(10)
	  , isObject   = __webpack_require__(38)
	  , anObject   = __webpack_require__(39)
	  , aFunction  = __webpack_require__(36)
	  , strictNew  = __webpack_require__(40)
	  , forOf      = __webpack_require__(41)
	  , setProto   = __webpack_require__(46).set
	  , same       = __webpack_require__(47)
	  , species    = __webpack_require__(48)
	  , SPECIES    = __webpack_require__(20)('species')
	  , RECORD     = __webpack_require__(22)('record')
	  , asap       = __webpack_require__(49)
	  , PROMISE    = 'Promise'
	  , process    = global.process
	  , isNode     = classof(process) == 'process'
	  , P          = global[PROMISE]
	  , Wrapper;
	
	var testResolve = function(sub){
	  var test = new P(function(){});
	  if(sub)test.constructor = Object;
	  return P.resolve(test) === test;
	};
	
	var useNative = function(){
	  var works = false;
	  function P2(x){
	    var self = new P(x);
	    setProto(self, P2.prototype);
	    return self;
	  }
	  try {
	    works = P && P.resolve && testResolve();
	    setProto(P2, P);
	    P2.prototype = $.create(P.prototype, {constructor: {value: P2}});
	    // actual Firefox has broken subclass support, test that
	    if(!(P2.resolve(5).then(function(){}) instanceof P2)){
	      works = false;
	    }
	    // actual V8 bug, https://code.google.com/p/v8/issues/detail?id=4162
	    if(works && __webpack_require__(17)){
	      var thenableThenGotten = false;
	      P.resolve($.setDesc({}, 'then', {
	        get: function(){ thenableThenGotten = true; }
	      }));
	      works = thenableThenGotten;
	    }
	  } catch(e){ works = false; }
	  return works;
	}();
	
	// helpers
	var isPromise = function(it){
	  return isObject(it) && (useNative ? classof(it) == 'Promise' : RECORD in it);
	};
	var sameConstructor = function(a, b){
	  // library wrapper special case
	  if(LIBRARY && a === P && b === Wrapper)return true;
	  return same(a, b);
	};
	var getConstructor = function(C){
	  var S = anObject(C)[SPECIES];
	  return S != undefined ? S : C;
	};
	var isThenable = function(it){
	  var then;
	  return isObject(it) && typeof (then = it.then) == 'function' ? then : false;
	};
	var notify = function(record, isReject){
	  if(record.n)return;
	  record.n = true;
	  var chain = record.c;
	  asap(function(){
	    var value = record.v
	      , ok    = record.s == 1
	      , i     = 0;
	    var run = function(react){
	      var cb = ok ? react.ok : react.fail
	        , ret, then;
	      try {
	        if(cb){
	          if(!ok)record.h = true;
	          ret = cb === true ? value : cb(value);
	          if(ret === react.P){
	            react.rej(TypeError('Promise-chain cycle'));
	          } else if(then = isThenable(ret)){
	            then.call(ret, react.res, react.rej);
	          } else react.res(ret);
	        } else react.rej(value);
	      } catch(err){
	        react.rej(err);
	      }
	    };
	    while(chain.length > i)run(chain[i++]); // variable length - can't use forEach
	    chain.length = 0;
	    record.n = false;
	    if(isReject)setTimeout(function(){
	      asap(function(){
	        if(isUnhandled(record.p)){
	          if(isNode){
	            process.emit('unhandledRejection', value, record.p);
	          } else if(global.console && console.error){
	            console.error('Unhandled promise rejection', value);
	          }
	        }
	        record.a = undefined;
	      });
	    }, 1);
	  });
	};
	var isUnhandled = function(promise){
	  var record = promise[RECORD]
	    , chain  = record.a || record.c
	    , i      = 0
	    , react;
	  if(record.h)return false;
	  while(chain.length > i){
	    react = chain[i++];
	    if(react.fail || !isUnhandled(react.P))return false;
	  } return true;
	};
	var $reject = function(value){
	  var record = this;
	  if(record.d)return;
	  record.d = true;
	  record = record.r || record; // unwrap
	  record.v = value;
	  record.s = 2;
	  record.a = record.c.slice();
	  notify(record, true);
	};
	var $resolve = function(value){
	  var record = this
	    , then;
	  if(record.d)return;
	  record.d = true;
	  record = record.r || record; // unwrap
	  try {
	    if(then = isThenable(value)){
	      asap(function(){
	        var wrapper = {r: record, d: false}; // wrap
	        try {
	          then.call(value, ctx($resolve, wrapper, 1), ctx($reject, wrapper, 1));
	        } catch(e){
	          $reject.call(wrapper, e);
	        }
	      });
	    } else {
	      record.v = value;
	      record.s = 1;
	      notify(record, false);
	    }
	  } catch(e){
	    $reject.call({r: record, d: false}, e); // wrap
	  }
	};
	
	// constructor polyfill
	if(!useNative){
	  // 25.4.3.1 Promise(executor)
	  P = function Promise(executor){
	    aFunction(executor);
	    var record = {
	      p: strictNew(this, P, PROMISE),         // <- promise
	      c: [],                                  // <- awaiting reactions
	      a: undefined,                           // <- checked in isUnhandled reactions
	      s: 0,                                   // <- state
	      d: false,                               // <- done
	      v: undefined,                           // <- value
	      h: false,                               // <- handled rejection
	      n: false                                // <- notify
	    };
	    this[RECORD] = record;
	    try {
	      executor(ctx($resolve, record, 1), ctx($reject, record, 1));
	    } catch(err){
	      $reject.call(record, err);
	    }
	  };
	  __webpack_require__(54)(P.prototype, {
	    // 25.4.5.3 Promise.prototype.then(onFulfilled, onRejected)
	    then: function then(onFulfilled, onRejected){
	      var S = anObject(anObject(this).constructor)[SPECIES];
	      var react = {
	        ok:   typeof onFulfilled == 'function' ? onFulfilled : true,
	        fail: typeof onRejected == 'function'  ? onRejected  : false
	      };
	      var promise = react.P = new (S != undefined ? S : P)(function(res, rej){
	        react.res = aFunction(res);
	        react.rej = aFunction(rej);
	      });
	      var record = this[RECORD];
	      record.c.push(react);
	      if(record.a)record.a.push(react);
	      if(record.s)notify(record, false);
	      return promise;
	    },
	    // 25.4.5.1 Promise.prototype.catch(onRejected)
	    'catch': function(onRejected){
	      return this.then(undefined, onRejected);
	    }
	  });
	}
	
	// export
	$def($def.G + $def.W + $def.F * !useNative, {Promise: P});
	__webpack_require__(25)(P, PROMISE);
	species(P);
	species(Wrapper = __webpack_require__(12)[PROMISE]);
	
	// statics
	$def($def.S + $def.F * !useNative, PROMISE, {
	  // 25.4.4.5 Promise.reject(r)
	  reject: function reject(r){
	    return new this(function(res, rej){ rej(r); });
	  }
	});
	$def($def.S + $def.F * (!useNative || testResolve(true)), PROMISE, {
	  // 25.4.4.6 Promise.resolve(x)
	  resolve: function resolve(x){
	    return isPromise(x) && sameConstructor(x.constructor, this)
	      ? x : new this(function(res){ res(x); });
	  }
	});
	$def($def.S + $def.F * !(useNative && __webpack_require__(55)(function(iter){
	  P.all(iter)['catch'](function(){});
	})), PROMISE, {
	  // 25.4.4.1 Promise.all(iterable)
	  all: function all(iterable){
	    var C      = getConstructor(this)
	      , values = [];
	    return new C(function(res, rej){
	      forOf(iterable, false, values.push, values);
	      var remaining = values.length
	        , results   = Array(remaining);
	      if(remaining)$.each.call(values, function(promise, index){
	        C.resolve(promise).then(function(value){
	          results[index] = value;
	          --remaining || res(results);
	        }, rej);
	      });
	      else res(results);
	    });
	  },
	  // 25.4.4.4 Promise.race(iterable)
	  race: function race(iterable){
	    var C = getConstructor(this);
	    return new C(function(res, rej){
	      forOf(iterable, false, function(promise){
	        C.resolve(promise).then(res, rej);
	      });
	    });
	  }
	});

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	// optional / simple context binding
	var aFunction = __webpack_require__(36);
	module.exports = function(fn, that, length){
	  aFunction(fn);
	  if(that === undefined)return fn;
	  switch(length){
	    case 1: return function(a){
	      return fn.call(that, a);
	    };
	    case 2: return function(a, b){
	      return fn.call(that, a, b);
	    };
	    case 3: return function(a, b, c){
	      return fn.call(that, a, b, c);
	    };
	  } return function(/* ...args */){
	      return fn.apply(that, arguments);
	    };
	};

/***/ },
/* 36 */
/***/ function(module, exports) {

	module.exports = function(it){
	  if(typeof it != 'function')throw TypeError(it + ' is not a function!');
	  return it;
	};

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	// getting tag from 19.1.3.6 Object.prototype.toString()
	var cof = __webpack_require__(33)
	  , TAG = __webpack_require__(20)('toStringTag')
	  // ES3 wrong here
	  , ARG = cof(function(){ return arguments; }()) == 'Arguments';
	
	module.exports = function(it){
	  var O, T, B;
	  return it === undefined ? 'Undefined' : it === null ? 'Null'
	    // @@toStringTag case
	    : typeof (T = (O = Object(it))[TAG]) == 'string' ? T
	    // builtinTag case
	    : ARG ? cof(O)
	    // ES3 arguments fallback
	    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
	};

/***/ },
/* 38 */
/***/ function(module, exports) {

	// http://jsperf.com/core-js-isobject
	module.exports = function(it){
	  return it !== null && (typeof it == 'object' || typeof it == 'function');
	};

/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(38);
	module.exports = function(it){
	  if(!isObject(it))throw TypeError(it + ' is not an object!');
	  return it;
	};

/***/ },
/* 40 */
/***/ function(module, exports) {

	module.exports = function(it, Constructor, name){
	  if(!(it instanceof Constructor))throw TypeError(name + ": use the 'new' operator!");
	  return it;
	};

/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	var ctx         = __webpack_require__(35)
	  , call        = __webpack_require__(42)
	  , isArrayIter = __webpack_require__(43)
	  , anObject    = __webpack_require__(39)
	  , toLength    = __webpack_require__(44)
	  , getIterFn   = __webpack_require__(45);
	module.exports = function(iterable, entries, fn, that){
	  var iterFn = getIterFn(iterable)
	    , f      = ctx(fn, that, entries ? 2 : 1)
	    , index  = 0
	    , length, step, iterator;
	  if(typeof iterFn != 'function')throw TypeError(iterable + ' is not iterable!');
	  // fast case for arrays with default iterator
	  if(isArrayIter(iterFn))for(length = toLength(iterable.length); length > index; index++){
	    entries ? f(anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
	  } else for(iterator = iterFn.call(iterable); !(step = iterator.next()).done; ){
	    call(iterator, f, step.value, entries);
	  }
	};

/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	// call something on iterator step with safe closing on error
	var anObject = __webpack_require__(39);
	module.exports = function(iterator, fn, value, entries){
	  try {
	    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
	  // 7.4.6 IteratorClose(iterator, completion)
	  } catch(e){
	    var ret = iterator['return'];
	    if(ret !== undefined)anObject(ret.call(iterator));
	    throw e;
	  }
	};

/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	// check on default Array iterator
	var Iterators = __webpack_require__(23)
	  , ITERATOR  = __webpack_require__(20)('iterator');
	module.exports = function(it){
	  return (Iterators.Array || Array.prototype[ITERATOR]) === it;
	};

/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.15 ToLength
	var toInteger = __webpack_require__(6)
	  , min       = Math.min;
	module.exports = function(it){
	  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
	};

/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	var classof   = __webpack_require__(37)
	  , ITERATOR  = __webpack_require__(20)('iterator')
	  , Iterators = __webpack_require__(23);
	module.exports = __webpack_require__(12).getIteratorMethod = function(it){
	  if(it != undefined)return it[ITERATOR] || it['@@iterator'] || Iterators[classof(it)];
	};

/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	// Works with __proto__ only. Old v8 can't work with null proto objects.
	/* eslint-disable no-proto */
	var getDesc  = __webpack_require__(15).getDesc
	  , isObject = __webpack_require__(38)
	  , anObject = __webpack_require__(39);
	var check = function(O, proto){
	  anObject(O);
	  if(!isObject(proto) && proto !== null)throw TypeError(proto + ": can't set as prototype!");
	};
	module.exports = {
	  set: Object.setPrototypeOf || ('__proto__' in {} // eslint-disable-line
	    ? function(buggy, set){
	        try {
	          set = __webpack_require__(35)(Function.call, getDesc(Object.prototype, '__proto__').set, 2);
	          set({}, []);
	        } catch(e){ buggy = true; }
	        return function setPrototypeOf(O, proto){
	          check(O, proto);
	          if(buggy)O.__proto__ = proto;
	          else set(O, proto);
	          return O;
	        };
	      }()
	    : undefined),
	  check: check
	};

/***/ },
/* 47 */
/***/ function(module, exports) {

	module.exports = Object.is || function is(x, y){
	  return x === y ? x !== 0 || 1 / x === 1 / y : x != x && y != y;
	};

/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $       = __webpack_require__(15)
	  , SPECIES = __webpack_require__(20)('species');
	module.exports = function(C){
	  if(__webpack_require__(17) && !(SPECIES in C))$.setDesc(C, SPECIES, {
	    configurable: true,
	    get: function(){ return this; }
	  });
	};

/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	var global    = __webpack_require__(11)
	  , macrotask = __webpack_require__(50).set
	  , Observer  = global.MutationObserver || global.WebKitMutationObserver
	  , process   = global.process
	  , head, last, notify;
	
	function flush(){
	  while(head){
	    head.fn.call(); // <- currently we use it only for Promise - try / catch not required
	    head = head.next;
	  } last = undefined;
	}
	
	// Node.js
	if(__webpack_require__(33)(process) == 'process'){
	  notify = function(){
	    process.nextTick(flush);
	  };
	// browsers with MutationObserver
	} else if(Observer){
	  var toggle = 1
	    , node   = document.createTextNode('');
	  new Observer(flush).observe(node, {characterData: true}); // eslint-disable-line no-new
	  notify = function(){
	    node.data = toggle = -toggle;
	  };
	// for other environments - macrotask based on:
	// - setImmediate
	// - MessageChannel
	// - window.postMessag
	// - onreadystatechange
	// - setTimeout
	} else {
	  notify = function(){
	    // strange IE + webpack dev server bug - use .call(global)
	    macrotask.call(global, flush);
	  };
	}
	
	module.exports = function asap(fn){
	  var task = {fn: fn, next: undefined};
	  if(last)last.next = task;
	  if(!head){
	    head = task;
	    notify();
	  } last = task;
	};

/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var ctx                = __webpack_require__(35)
	  , invoke             = __webpack_require__(51)
	  , html               = __webpack_require__(52)
	  , cel                = __webpack_require__(53)
	  , global             = __webpack_require__(11)
	  , process            = global.process
	  , setTask            = global.setImmediate
	  , clearTask          = global.clearImmediate
	  , MessageChannel     = global.MessageChannel
	  , counter            = 0
	  , queue              = {}
	  , ONREADYSTATECHANGE = 'onreadystatechange'
	  , defer, channel, port;
	var run = function(){
	  var id = +this;
	  if(queue.hasOwnProperty(id)){
	    var fn = queue[id];
	    delete queue[id];
	    fn();
	  }
	};
	var listner = function(event){
	  run.call(event.data);
	};
	// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
	if(!setTask || !clearTask){
	  setTask = function setImmediate(fn){
	    var args = [], i = 1;
	    while(arguments.length > i)args.push(arguments[i++]);
	    queue[++counter] = function(){
	      invoke(typeof fn == 'function' ? fn : Function(fn), args);
	    };
	    defer(counter);
	    return counter;
	  };
	  clearTask = function clearImmediate(id){
	    delete queue[id];
	  };
	  // Node.js 0.8-
	  if(__webpack_require__(33)(process) == 'process'){
	    defer = function(id){
	      process.nextTick(ctx(run, id, 1));
	    };
	  // Browsers with MessageChannel, includes WebWorkers
	  } else if(MessageChannel){
	    channel = new MessageChannel;
	    port    = channel.port2;
	    channel.port1.onmessage = listner;
	    defer = ctx(port.postMessage, port, 1);
	  // Browsers with postMessage, skip WebWorkers
	  // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
	  } else if(global.addEventListener && typeof postMessage == 'function' && !global.importScript){
	    defer = function(id){
	      global.postMessage(id + '', '*');
	    };
	    global.addEventListener('message', listner, false);
	  // IE8-
	  } else if(ONREADYSTATECHANGE in cel('script')){
	    defer = function(id){
	      html.appendChild(cel('script'))[ONREADYSTATECHANGE] = function(){
	        html.removeChild(this);
	        run.call(id);
	      };
	    };
	  // Rest old browsers
	  } else {
	    defer = function(id){
	      setTimeout(ctx(run, id, 1), 0);
	    };
	  }
	}
	module.exports = {
	  set:   setTask,
	  clear: clearTask
	};

/***/ },
/* 51 */
/***/ function(module, exports) {

	// fast apply, http://jsperf.lnkit.com/fast-apply/5
	module.exports = function(fn, args, that){
	  var un = that === undefined;
	  switch(args.length){
	    case 0: return un ? fn()
	                      : fn.call(that);
	    case 1: return un ? fn(args[0])
	                      : fn.call(that, args[0]);
	    case 2: return un ? fn(args[0], args[1])
	                      : fn.call(that, args[0], args[1]);
	    case 3: return un ? fn(args[0], args[1], args[2])
	                      : fn.call(that, args[0], args[1], args[2]);
	    case 4: return un ? fn(args[0], args[1], args[2], args[3])
	                      : fn.call(that, args[0], args[1], args[2], args[3]);
	  } return              fn.apply(that, args);
	};

/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(11).document && document.documentElement;

/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(38)
	  , document = __webpack_require__(11).document
	  // in old IE typeof document.createElement is 'object'
	  , is = isObject(document) && isObject(document.createElement);
	module.exports = function(it){
	  return is ? document.createElement(it) : {};
	};

/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	var $redef = __webpack_require__(13);
	module.exports = function(target, src){
	  for(var key in src)$redef(target, key, src[key]);
	  return target;
	};

/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

	var SYMBOL_ITERATOR = __webpack_require__(20)('iterator')
	  , SAFE_CLOSING    = false;
	try {
	  var riter = [7][SYMBOL_ITERATOR]();
	  riter['return'] = function(){ SAFE_CLOSING = true; };
	  Array.from(riter, function(){ throw 2; });
	} catch(e){ /* empty */ }
	module.exports = function(exec){
	  if(!SAFE_CLOSING)return false;
	  var safe = false;
	  try {
	    var arr  = [7]
	      , iter = arr[SYMBOL_ITERATOR]();
	    iter.next = function(){ safe = true; };
	    arr[SYMBOL_ITERATOR] = function(){ return iter; };
	    exec(arr);
	  } catch(e){ /* empty */ }
	  return safe;
	};

/***/ },
/* 56 */
/***/ function(module, exports) {

	"use strict";
	
	exports["default"] = function (obj) {
	  return obj && obj.__esModule ? obj : {
	    "default": obj
	  };
	};
	
	exports.__esModule = true;

/***/ },
/* 57 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _interopRequireDefault = __webpack_require__(56)['default'];
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	exports['default'] = State;
	
	var _demoActionInterfaceJs = __webpack_require__(58);
	
	var _demoActionInterfaceJs2 = _interopRequireDefault(_demoActionInterfaceJs);
	
	var _demoActionRuntimeJs = __webpack_require__(60);
	
	var _demoActionRuntimeJs2 = _interopRequireDefault(_demoActionRuntimeJs);
	
	function State() {
	  this._runtime = new _demoActionRuntimeJs2['default']();
	  this._interface = new _demoActionInterfaceJs2['default'](this._runtime);
	  return this._interface;
	}
	
	module.exports = exports['default'];

/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _interopRequireDefault = __webpack_require__(56)['default'];
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	exports['default'] = Interface;
	
	var _distRuneJs = __webpack_require__(59);
	
	var _distRuneJs2 = _interopRequireDefault(_distRuneJs);
	
	/**
	 * A demo eDSL with most features a full language should be with.
	 * This file contains only interfacen, which means it need to be instantiated
	 * with a runtime to execute the language.
	 *
	 * Note: since to handle async function properly need extra efforts,
	 * so this demo language doesn't fully handle them yet. Although this eDSL
	 * indeed put all steps in a Promise to be the first step toward that.
	 */
	
	function Interface(runtime) {
	  this.context = {
	    started: false,
	    stopped: false,
	    looping: false,
	    matching: false
	  };
	  this.stack = [];
	  this._runtime = runtime;
	  this._evaluator = new _distRuneJs2['default'].Evaluate().analyzer(this._analyzeOrder.bind(this)).interpreter(this._interpret.bind(this));
	}
	
	Interface.prototype.start = _distRuneJs2['default'].define('start', 'begin');
	Interface.prototype.done = _distRuneJs2['default'].define('done', 'exit');
	Interface.prototype.run = _distRuneJs2['default'].define('run', 'exit');
	Interface.prototype.effect = _distRuneJs2['default'].define('effect', 'exit');
	Interface.prototype.next = _distRuneJs2['default'].define('next', 'push');
	Interface.prototype.match = _distRuneJs2['default'].define('match', 'begin');
	Interface.prototype.end = _distRuneJs2['default'].define('end', 'end');
	Interface.prototype['case'] = _distRuneJs2['default'].define('case', 'push');
	Interface.prototype.to = _distRuneJs2['default'].define('to', 'push');
	Interface.prototype.as = _distRuneJs2['default'].define('as', 'push');
	Interface.prototype.loop = _distRuneJs2['default'].define('loop', 'begin');
	Interface.prototype.until = _distRuneJs2['default'].define('until', 'end');
	Interface.prototype.any = _distRuneJs2['default'].define('any', 'push');
	Interface.prototype.all = _distRuneJs2['default'].define('all', 'push');
	
	Interface.prototype.onchange = function (context, node, stack) {
	  // When it's changed, evaluate it with analyzers & interpreter.
	  return this._evaluator(context, node, stack);
	};
	
	Interface.prototype._interpret = function (context, node, stack) {
	  // Well in this eDSL we delegate the interpretion to the runtime.
	  // We don't pass context to runtime since the runtime will keep
	  // the essential states by its own.
	  return this._runtime.onchange.apply(this._runtime, arguments);
	};
	
	// In this eDSL we now only have this analyzer. Could add more and register it
	// in the contruction of 'this._evaluator'.
	Interface.prototype._analyzeOrder = function (context, change, stack) {
	  if ('start' === change.type) {
	    context.started = true;
	  } else if ('stop') {
	    context.stopped = true;
	  }
	  if ('start' === change.type && context.stopped) {
	    throw new Error('Should not start a process again' + 'after it\'s already stopped');
	  } else if ('next' === change.type && !context.started) {
	    throw new Error('Should not concat steps while it\'s not started');
	  } else if ('stop' === change.type && !context.started) {
	    throw new Error('Should not stop a process before it\'s started');
	  }
	};
	module.exports = exports['default'];

/***/ },
/* 59 */
/***/ function(module, exports) {

	(function(e, a) { for(var i in a) e[i] = a[i]; }(exports, /******/ (function(modules) { // webpackBootstrap
	/******/ 	// The module cache
	/******/ 	var installedModules = {};
	/******/
	/******/ 	// The require function
	/******/ 	function __webpack_require__(moduleId) {
	/******/
	/******/ 		// Check if module is in cache
	/******/ 		if(installedModules[moduleId])
	/******/ 			return installedModules[moduleId].exports;
	/******/
	/******/ 		// Create a new module (and put it into the cache)
	/******/ 		var module = installedModules[moduleId] = {
	/******/ 			exports: {},
	/******/ 			id: moduleId,
	/******/ 			loaded: false
	/******/ 		};
	/******/
	/******/ 		// Execute the module function
	/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
	/******/
	/******/ 		// Flag the module as loaded
	/******/ 		module.loaded = true;
	/******/
	/******/ 		// Return the exports of the module
	/******/ 		return module.exports;
	/******/ 	}
	/******/
	/******/
	/******/ 	// expose the modules object (__webpack_modules__)
	/******/ 	__webpack_require__.m = modules;
	/******/
	/******/ 	// expose the module cache
	/******/ 	__webpack_require__.c = installedModules;
	/******/
	/******/ 	// __webpack_public_path__
	/******/ 	__webpack_require__.p = "";
	/******/
	/******/ 	// Load entry module and return exports
	/******/ 	return __webpack_require__(0);
	/******/ })
	/************************************************************************/
	/******/ ([
	/* 0 */
	/***/ function(module, exports) {
	
		'use strict';
		
		/**
		 * Generic builder that would push nodes into the eDSL stack.
		 * User could inherit this to define the new eDSL.
		 * ---
		 * The default semantics only contain these operations:
		 *
		 * 1. [push] : push to the current stack
		 * 2. [begin]: create a new stack and switch to it,
		 *             and then push the node into the stack.
		 * 3. [end]  : after push the node into the stack,
		 *             change the current stack to the previous one.
		 * 4. [exit] : exit the context of this eDSL; the last result
		 *             of it would be passed to the return value of
		 *             this chain.
		 *
		 * Stack could be nested: when [begin] a new stack in fact it would
		 * push the stack into the previous one. So the stack comprise
		 * [node] and [stack].
		 * ---
		 * Although the eDSL instance should wrap these basic operations
		 * to manipulate the stack, they all need to convert the method
		 * call to nodes. So 'Rune' provide a way to simplify the work: if
		 * the instance call the [define] method the name of the method,
		 * it could associate the operand of the eDSL with the stack manipulation.
		 * For example:
		 *
		 *    var eDSL = function() {};
		 *    eDSL.prototype.transaction = Rune.define('transaction', 'begin');
		 *    eDSL.prototype.pre = Rune.define('pre', 'push');
		 *    eDSL.prototype.perform = Rune.define('perform', 'push');
		 *    eDSL.prototype.post = Rune.define('post', 'end');
		 *
		 * Then the eDSL could be used as:
		 *
		 *    (new eDSL)
		 *      .transaction()
		 *      .pre(cb)
		 *      .perform(cb)
		 *      .post(cb)
		 *
		 * And the stack would be:
		 *
		 *    [
		 *      node<'transaction',>
		 *      node<'pre', cb>
		 *      node<'preform', cb>
		 *      node<'post', cb>
		 *    ]
		 *
		 * However, this simple approach the semantics rules and analyzers to
		 * guarantee the stack is valid. For example, if we have a malformed
		 * stack because of the following eDSL program:
		 *
		 *    (new eDSL)
		 *      .post(cb)
		 *      .pre(cb)
		 *      .perform(cb)
		 *      .transaction()
		 *
		 * The runtime may report errot because when '.post(cb)' there is no stack
		 * created by the beginning step, namely the '.pre(cb)' in our case.
		 * Nevertheless, the error message is too low-level for the language user,
		 * since they should care no stack things and should only care about the eDSL
		 * itself.
		 *
		 * The solution is to provide a basic stack ordering analyzer and let the
		 * language decide how to describe the error. And since we don't have
		 * any context information about variables, scope and other elements
		 * as a complete programming language, we only need to guarantee the order is
		 * correct, and make incorrect cases meaningful. Moreover, since the analyzer
		 * needs to analyze the states whenever the incoming node comes, it is in fact
		 * an evaluation process, so user could combine the analyzing and interpreting
		 * phase into the same function. For example:
		 *
		 *    runtime.onchange((context, node, stack) => {
		 *        // If the change is to switch to a new stack,
		 *        // the 'stack' here would be the new stack.
		 *        var {type, args} = node;
		 *        if ('pre' === type) {
		 *          context.init = true;
		 *        } else if ('post' === type && !context.init) {
		 *          throw new Error('There must be one "pre" node before the "post".');
		 *        }
		 *    });
		 *
		 * With such feature, if the incoming node or the stack is malformed,
		 * it should throw the error. The error captured by the instance like this
		 * could be a 'compilation error'.
		 *
		 * The noticeable fact is The callback of the 'onchange' is actually a reducer,
		 * so user could treat the process of this evaluation & analyzing as a reducing
		 * process on an infinite stream. And since we have a stack machine, if the
		 * reducer return nothing, the stack would be empty. Otherwise, if the reducer
		 * return a new stack, it would replace the old one.
		 *
		 * And please note the example is much simplified. For the
		 * real eDSL it should be used only as an entry to dispatch the change to
		 * the real handlers, which may comprise several states and components.
		 */
		Object.defineProperty(exports, '__esModule', {
		  value: true
		});
		exports['default'] = Rune;
		
		function Rune() {}
		
		/**
		 * Helper method to build interface of a specific DSL. It would return a method
		 * of the DSL and then the interface could attach it.
		 *
		 * The returning function would assume that the 'this' inside it is the runtime
		 * of the language. And since the method it returns would require to access some
		 * members of the 'this', the 'this' should have 'this.stack' and 'this.context'
		 * as the method requires.
		 *
		 * If it's an 'exit' node, means the session is ended and the interpreter should
		 * return a stack contains only one node as the result of the session, or the
		 * session returns nothing. For other instructions the stack can keep some
		 * computed result to simulate real stack machine. But it's OK to not use this
		 * feature and always return an empty 'stack' everytime the 'onchange' get
		 * called and interupted. In this mode it means the language want to keep
		 * all states by itself.
		 *
		 * Please note that from the description above, 'end' means stack (substack)
		 * ends. It's totally irrelevant to 'exit'.
		 *
		 * The last argument 'doc' is what designer could put the description about
		 * the method. If set, it would append the 'rune.doc'
		 * property in the function it returns. And then the language instance could
		 * call `Rune.document(<instance>)` to get a method that would return
		 * '{ methodName: description }' when it got invoked.
		 */
		Rune.define = function (method, as) {
		  var doc = arguments.length <= 2 || arguments[2] === undefined ? '' : arguments[2];
		
		  var built = function built() {
		    var node, resultstack;
		
		    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
		      args[_key] = arguments[_key];
		    }
		
		    switch (as) {
		      case 'push':
		        node = new Rune.Node(method, args, this.stack);
		        this.stack.push(node);
		        resultstack = this.onchange(this.context, node, this.stack);
		        break;
		      case 'begin':
		        this._prevstack = this.stack;
		        this.stack = [];
		        node = new Rune.Node(method, args, this.stack);
		        this.stack.push(node); // as the first node of the new stack.
		        resultstack = this.onchange(this.context, node, this.stack);
		        break;
		      case 'end':
		        node = new Rune.Node(method, args, this.stack);
		        this.stack.push(node); // the last node of the stack.
		        this.stack = this._prevstack; // switch back to the previous stack.
		        resultstack = this.onchange(this.context, node, this.stack);
		        break;
		      case 'exit':
		        node = new Rune.Node(method, args, this.stack);
		        this.stack.push(node); // the last node of the stack.
		        resultstack = this.onchange(this.context, node, this.stack);
		        if (!resultstack) {
		          throw new Error('\'exit\' node \'' + node.type + '\' should\n            return a resultstack.');
		        }
		        return resultstack[0];
		    }
		    // If the handler updates the stack, it would replace the existing one.
		    if (resultstack) {
		      this.stack = resultstack;
		    }
		    return this;
		  };
		  built.rune = {
		    'as': as,
		    'doc': doc,
		    'method': method
		  };
		  return built;
		};
		
		/**
		 * Generate a method that would return all documents of the methods,
		 * in a form of '{ methodName: description }'.
		 *
		 * The argument must be the language instance with all defined methods.
		 */
		Rune.publish = function (instance) {
		  var generated = Object.keys(instance).reduce(function (doc, name) {
		    var method = instance[name];
		    if (method.rune) {
		      doc[name] = method.rune.doc;
		    }
		  }, {});
		  return function () {
		    return generated;
		  };
		};
		
		Rune.Node = function (type, args, stack) {
		  this.type = type;
		  this.args = args;
		  this.stack = stack;
		};
		
		Rune.Evaluate = function () {
		  var context = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
		
		  this._analyzers = [];
		  this._interpreter = null;
		  this._context = context;
		};
		
		/**
		 * Analyzer could receive the stack change from 'Rune#evaluate',
		 * and it would be called with the arguments as the function describes:
		 *
		 *     Rune.prototype.evaluate((context, change, stack) => {
		 *        // ...
		 *     });
		 *
		 * So the analyzer could be:
		 *
		 *    function(context, change, stack) {
		 *      // Do some check and maybe changed the context.
		 *      // The next analyzer to the interpreter would accept the alternated
		 *      // context as the argument 'context'.
		 *      context.someFlag = true;
		 *      // When there is wrong, throw it.
		 *      throw new Error('Some analyzing error');
		 *    };
		 *
		 * Note that the analyzer ('a') would be invoked with empty 'this' object,
		 * so the function relies on 'this' should bind itself first.
		 */
		Rune.Evaluate.prototype.analyzer = function (a) {
		  this._analyzers.push(a);
		  return this;
		};
		
		/**
		 * One Evaluate can only have one interpreter, and it would return
		 * the function could consume every stack change from 'Rune#evaluate'.
		 *
		 * The code is a little complicated: we have two kinds of 'reducing':
		 * one is to reduce all analyzers with the single incoming change,
		 * another is to reduce all incoming changes with this analyzers + interpreter.
		 *
		 * The analyzer and interpreter should change the context, to memorize the
		 * states of the evaluation. The difference is interpreter should return one
		 * new stack if it needs to update the existing one. The stack it returns would
		 * replace the existing one, so anything still in the old one would be wiped
		 * out. The interpreter could return nothing ('undefined') to keep the stack
		 * untouched.
		 *
		 * The analyzers and interpreter could change the 'context' pass to them.
		 * And since we may update the stack as above, the context should memorize
		 * those information not to be overwritten while the stack get wiped out.
		 *
		 * And if the interpreting node is the exit node of the session, interpreter
		 * should return a new stack contains only one final result node. If there
		 * is no such node, the result of this session is 'undefined'.
		 */
		Rune.Evaluate.prototype.interpreter = function (inpt) {
		  var _this = this;
		
		  // The customized language should give the default context.
		  return function (context, change, stack) {
		    try {
		      // Analyzers could change the context.
		      _this._analyzers.reduce(function (ctx, analyzer) {
		        analyzer.call({}, context, change, stack);
		      }, context);
		    } catch (e) {
		      _this._handleError(e, context, change, stack);
		    }
		    // After analyze it, interpret the node and return the new stack (if any).
		    var newStack = inpt(context, change, stack);
		    return newStack;
		  };
		};
		
		Rune.Evaluate.prototype._handleError = function (err, context, change, stack) {
		  // TODO: expand it to provide more sophistic debugging message.
		  throw new Error('When change ' + change.type + ' comes error \'' + err + '\' happened');
		};
		module.exports = exports['default'];
	
	/***/ }
	/******/ ])));
	//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNjZjMTFiNGE3YTRmNGFmMDhmM2YiLCJ3ZWJwYWNrOi8vLy4vc3JjL3J1bmUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVCQUFlO0FBQ2Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7QUN0Q0EsYUFBWSxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztzQkFxR1csSUFBSTs7QUFBYixVQUFTLElBQUksR0FBRyxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBNEJqQyxLQUFJLENBQUMsTUFBTSxHQUFHLFVBQVMsTUFBTSxFQUFFLEVBQUUsRUFBWTtPQUFWLEdBQUcseURBQUcsRUFBRTs7QUFDekMsT0FBSSxLQUFLLEdBQUcsU0FBUixLQUFLLEdBQXFCO0FBQzVCLFNBQUksSUFBSSxFQUFFLFdBQVcsQ0FBQzs7dUNBREEsSUFBSTtBQUFKLFdBQUk7OztBQUUxQixhQUFRLEVBQUU7QUFDUixZQUFLLE1BQU07QUFDVCxhQUFJLEdBQUcsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0FBQy9DLGFBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ3RCLG9CQUFXLEdBQ1QsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7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TUFBTSxFQUFFLEtBQUssRUFBRTs7QUFFcEMsU0FBTSxJQUFJLEtBQUssa0JBQWdCLE1BQU0sQ0FBQyxJQUFJLHVCQUFpQixHQUFHLGlCQUFhLENBQUM7RUFDN0UsQ0FBQyIsImZpbGUiOiJydW5lLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGV4cG9ydHM6IHt9LFxuIFx0XHRcdGlkOiBtb2R1bGVJZCxcbiBcdFx0XHRsb2FkZWQ6IGZhbHNlXG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiB3ZWJwYWNrL2Jvb3RzdHJhcCA2NmMxMWI0YTdhNGY0YWYwOGYzZlxuICoqLyIsIid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBHZW5lcmljIGJ1aWxkZXIgdGhhdCB3b3VsZCBwdXNoIG5vZGVzIGludG8gdGhlIGVEU0wgc3RhY2suXG4gKiBVc2VyIGNvdWxkIGluaGVyaXQgdGhpcyB0byBkZWZpbmUgdGhlIG5ldyBlRFNMLlxuICogLS0tXG4gKiBUaGUgZGVmYXVsdCBzZW1hbnRpY3Mgb25seSBjb250YWluIHRoZXNlIG9wZXJhdGlvbnM6XG4gKlxuICogMS4gW3B1c2hdIDogcHVzaCB0byB0aGUgY3VycmVudCBzdGFja1xuICogMi4gW2JlZ2luXTogY3JlYXRlIGEgbmV3IHN0YWNrIGFuZCBzd2l0Y2ggdG8gaXQsXG4gKiAgICAgICAgICAgICBhbmQgdGhlbiBwdXNoIHRoZSBub2RlIGludG8gdGhlIHN0YWNrLlxuICogMy4gW2VuZF0gIDogYWZ0ZXIgcHVzaCB0aGUgbm9kZSBpbnRvIHRoZSBzdGFjayxcbiAqICAgICAgICAgICAgIGNoYW5nZSB0aGUgY3VycmVudCBzdGFjayB0byB0aGUgcHJldmlvdXMgb25lLlxuICogNC4gW2V4aXRdIDogZXhpdCB0aGUgY29udGV4dCBvZiB0aGlzIGVEU0w7IHRoZSBsYXN0IHJlc3VsdFxuICogICAgICAgICAgICAgb2YgaXQgd291bGQgYmUgcGFzc2VkIHRvIHRoZSByZXR1cm4gdmFsdWUgb2ZcbiAqICAgICAgICAgICAgIHRoaXMgY2hhaW4uXG4gKlxuICogU3RhY2sgY291bGQgYmUgbmVzdGVkOiB3aGVuIFtiZWdpbl0gYSBuZXcgc3RhY2sgaW4gZmFjdCBpdCB3b3VsZFxuICogcHVzaCB0aGUgc3RhY2sgaW50byB0aGUgcHJldmlvdXMgb25lLiBTbyB0aGUgc3RhY2sgY29tcHJpc2VcbiAqIFtub2RlXSBhbmQgW3N0YWNrXS5cbiAqIC0tLVxuICogQWx0aG91Z2ggdGhlIGVEU0wgaW5zdGFuY2Ugc2hvdWxkIHdyYXAgdGhlc2UgYmFzaWMgb3BlcmF0aW9uc1xuICogdG8gbWFuaXB1bGF0ZSB0aGUgc3RhY2ssIHRoZXkgYWxsIG5lZWQgdG8gY29udmVydCB0aGUgbWV0aG9kXG4gKiBjYWxsIHRvIG5vZGVzLiBTbyAnUnVuZScgcHJvdmlkZSBhIHdheSB0byBzaW1wbGlmeSB0aGUgd29yazogaWZcbiAqIHRoZSBpbnN0YW5jZSBjYWxsIHRoZSBbZGVmaW5lXSBtZXRob2QgdGhlIG5hbWUgb2YgdGhlIG1ldGhvZCxcbiAqIGl0IGNvdWxkIGFzc29jaWF0ZSB0aGUgb3BlcmFuZCBvZiB0aGUgZURTTCB3aXRoIHRoZSBzdGFjayBtYW5pcHVsYXRpb24uXG4gKiBGb3IgZXhhbXBsZTpcbiAqXG4gKiAgICB2YXIgZURTTCA9IGZ1bmN0aW9uKCkge307XG4gKiAgICBlRFNMLnByb3RvdHlwZS50cmFuc2FjdGlvbiA9IFJ1bmUuZGVmaW5lKCd0cmFuc2FjdGlvbicsICdiZWdpbicpO1xuICogICAgZURTTC5wcm90b3R5cGUucHJlID0gUnVuZS5kZWZpbmUoJ3ByZScsICdwdXNoJyk7XG4gKiAgICBlRFNMLnByb3RvdHlwZS5wZXJmb3JtID0gUnVuZS5kZWZpbmUoJ3BlcmZvcm0nLCAncHVzaCcpO1xuICogICAgZURTTC5wcm90b3R5cGUucG9zdCA9IFJ1bmUuZGVmaW5lKCdwb3N0JywgJ2VuZCcpO1xuICpcbiAqIFRoZW4gdGhlIGVEU0wgY291bGQgYmUgdXNlZCBhczpcbiAqXG4gKiAgICAobmV3IGVEU0wpXG4gKiAgICAgIC50cmFuc2FjdGlvbigpXG4gKiAgICAgIC5wcmUoY2IpXG4gKiAgICAgIC5wZXJmb3JtKGNiKVxuICogICAgICAucG9zdChjYilcbiAqXG4gKiBBbmQgdGhlIHN0YWNrIHdvdWxkIGJlOlxuICpcbiAqICAgIFtcbiAqICAgICAgbm9kZTwndHJhbnNhY3Rpb24nLD5cbiAqICAgICAgbm9kZTwncHJlJywgY2I+XG4gKiAgICAgIG5vZGU8J3ByZWZvcm0nLCBjYj5cbiAqICAgICAgbm9kZTwncG9zdCcsIGNiPlxuICogICAgXVxuICpcbiAqIEhvd2V2ZXIsIHRoaXMgc2ltcGxlIGFwcHJvYWNoIHRoZSBzZW1hbnRpY3MgcnVsZXMgYW5kIGFuYWx5emVycyB0b1xuICogZ3VhcmFudGVlIHRoZSBzdGFjayBpcyB2YWxpZC4gRm9yIGV4YW1wbGUsIGlmIHdlIGhhdmUgYSBtYWxmb3JtZWRcbiAqIHN0YWNrIGJlY2F1c2Ugb2YgdGhlIGZvbGxvd2luZyBlRFNMIHByb2dyYW06XG4gKlxuICogICAgKG5ldyBlRFNMKVxuICogICAgICAucG9zdChjYilcbiAqICAgICAgLnByZShjYilcbiAqICAgICAgLnBlcmZvcm0oY2IpXG4gKiAgICAgIC50cmFuc2FjdGlvbigpXG4gKlxuICogVGhlIHJ1bnRpbWUgbWF5IHJlcG9ydCBlcnJvdCBiZWNhdXNlIHdoZW4gJy5wb3N0KGNiKScgdGhlcmUgaXMgbm8gc3RhY2tcbiAqIGNyZWF0ZWQgYnkgdGhlIGJlZ2lubmluZyBzdGVwLCBuYW1lbHkgdGhlICcucHJlKGNiKScgaW4gb3VyIGNhc2UuXG4gKiBOZXZlcnRoZWxlc3MsIHRoZSBlcnJvciBtZXNzYWdlIGlzIHRvbyBsb3ctbGV2ZWwgZm9yIHRoZSBsYW5ndWFnZSB1c2VyLFxuICogc2luY2UgdGhleSBzaG91bGQgY2FyZSBubyBzdGFjayB0aGluZ3MgYW5kIHNob3VsZCBvbmx5IGNhcmUgYWJvdXQgdGhlIGVEU0xcbiAqIGl0c2VsZi5cbiAqXG4gKiBUaGUgc29sdXRpb24gaXMgdG8gcHJvdmlkZSBhIGJhc2ljIHN0YWNrIG9yZGVyaW5nIGFuYWx5emVyIGFuZCBsZXQgdGhlXG4gKiBsYW5ndWFnZSBkZWNpZGUgaG93IHRvIGRlc2NyaWJlIHRoZSBlcnJvci4gQW5kIHNpbmNlIHdlIGRvbid0IGhhdmVcbiAqIGFueSBjb250ZXh0IGluZm9ybWF0aW9uIGFib3V0IHZhcmlhYmxlcywgc2NvcGUgYW5kIG90aGVyIGVsZW1lbnRzXG4gKiBhcyBhIGNvbXBsZXRlIHByb2dyYW1taW5nIGxhbmd1YWdlLCB3ZSBvbmx5IG5lZWQgdG8gZ3VhcmFudGVlIHRoZSBvcmRlciBpc1xuICogY29ycmVjdCwgYW5kIG1ha2UgaW5jb3JyZWN0IGNhc2VzIG1lYW5pbmdmdWwuIE1vcmVvdmVyLCBzaW5jZSB0aGUgYW5hbHl6ZXJcbiAqIG5lZWRzIHRvIGFuYWx5emUgdGhlIHN0YXRlcyB3aGVuZXZlciB0aGUgaW5jb21pbmcgbm9kZSBjb21lcywgaXQgaXMgaW4gZmFjdFxuICogYW4gZXZhbHVhdGlvbiBwcm9jZXNzLCBzbyB1c2VyIGNvdWxkIGNvbWJpbmUgdGhlIGFuYWx5emluZyBhbmQgaW50ZXJwcmV0aW5nXG4gKiBwaGFzZSBpbnRvIHRoZSBzYW1lIGZ1bmN0aW9uLiBGb3IgZXhhbXBsZTpcbiAqXG4gKiAgICBydW50aW1lLm9uY2hhbmdlKChjb250ZXh0LCBub2RlLCBzdGFjaykgPT4ge1xuICogICAgICAgIC8vIElmIHRoZSBjaGFuZ2UgaXMgdG8gc3dpdGNoIHRvIGEgbmV3IHN0YWNrLFxuICogICAgICAgIC8vIHRoZSAnc3RhY2snIGhlcmUgd291bGQgYmUgdGhlIG5ldyBzdGFjay5cbiAqICAgICAgICB2YXIge3R5cGUsIGFyZ3N9ID0gbm9kZTtcbiAqICAgICAgICBpZiAoJ3ByZScgPT09IHR5cGUpIHtcbiAqICAgICAgICAgIGNvbnRleHQuaW5pdCA9IHRydWU7XG4gKiAgICAgICAgfSBlbHNlIGlmICgncG9zdCcgPT09IHR5cGUgJiYgIWNvbnRleHQuaW5pdCkge1xuICogICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdUaGVyZSBtdXN0IGJlIG9uZSBcInByZVwiIG5vZGUgYmVmb3JlIHRoZSBcInBvc3RcIi4nKTtcbiAqICAgICAgICB9XG4gKiAgICB9KTtcbiAqXG4gKiBXaXRoIHN1Y2ggZmVhdHVyZSwgaWYgdGhlIGluY29taW5nIG5vZGUgb3IgdGhlIHN0YWNrIGlzIG1hbGZvcm1lZCxcbiAqIGl0IHNob3VsZCB0aHJvdyB0aGUgZXJyb3IuIFRoZSBlcnJvciBjYXB0dXJlZCBieSB0aGUgaW5zdGFuY2UgbGlrZSB0aGlzXG4gKiBjb3VsZCBiZSBhICdjb21waWxhdGlvbiBlcnJvcicuXG4gKlxuICogVGhlIG5vdGljZWFibGUgZmFjdCBpcyBUaGUgY2FsbGJhY2sgb2YgdGhlICdvbmNoYW5nZScgaXMgYWN0dWFsbHkgYSByZWR1Y2VyLFxuICogc28gdXNlciBjb3VsZCB0cmVhdCB0aGUgcHJvY2VzcyBvZiB0aGlzIGV2YWx1YXRpb24gJiBhbmFseXppbmcgYXMgYSByZWR1Y2luZ1xuICogcHJvY2VzcyBvbiBhbiBpbmZpbml0ZSBzdHJlYW0uIEFuZCBzaW5jZSB3ZSBoYXZlIGEgc3RhY2sgbWFjaGluZSwgaWYgdGhlXG4gKiByZWR1Y2VyIHJldHVybiBub3RoaW5nLCB0aGUgc3RhY2sgd291bGQgYmUgZW1wdHkuIE90aGVyd2lzZSwgaWYgdGhlIHJlZHVjZXJcbiAqIHJldHVybiBhIG5ldyBzdGFjaywgaXQgd291bGQgcmVwbGFjZSB0aGUgb2xkIG9uZS5cbiAqXG4gKiBBbmQgcGxlYXNlIG5vdGUgdGhlIGV4YW1wbGUgaXMgbXVjaCBzaW1wbGlmaWVkLiBGb3IgdGhlXG4gKiByZWFsIGVEU0wgaXQgc2hvdWxkIGJlIHVzZWQgb25seSBhcyBhbiBlbnRyeSB0byBkaXNwYXRjaCB0aGUgY2hhbmdlIHRvXG4gKiB0aGUgcmVhbCBoYW5kbGVycywgd2hpY2ggbWF5IGNvbXByaXNlIHNldmVyYWwgc3RhdGVzIGFuZCBjb21wb25lbnRzLlxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBSdW5lKCkge31cblxuLyoqXG4gKiBIZWxwZXIgbWV0aG9kIHRvIGJ1aWxkIGludGVyZmFjZSBvZiBhIHNwZWNpZmljIERTTC4gSXQgd291bGQgcmV0dXJuIGEgbWV0aG9kXG4gKiBvZiB0aGUgRFNMIGFuZCB0aGVuIHRoZSBpbnRlcmZhY2UgY291bGQgYXR0YWNoIGl0LlxuICpcbiAqIFRoZSByZXR1cm5pbmcgZnVuY3Rpb24gd291bGQgYXNzdW1lIHRoYXQgdGhlICd0aGlzJyBpbnNpZGUgaXQgaXMgdGhlIHJ1bnRpbWVcbiAqIG9mIHRoZSBsYW5ndWFnZS4gQW5kIHNpbmNlIHRoZSBtZXRob2QgaXQgcmV0dXJucyB3b3VsZCByZXF1aXJlIHRvIGFjY2VzcyBzb21lXG4gKiBtZW1iZXJzIG9mIHRoZSAndGhpcycsIHRoZSAndGhpcycgc2hvdWxkIGhhdmUgJ3RoaXMuc3RhY2snIGFuZCAndGhpcy5jb250ZXh0J1xuICogYXMgdGhlIG1ldGhvZCByZXF1aXJlcy5cbiAqXG4gKiBJZiBpdCdzIGFuICdleGl0JyBub2RlLCBtZWFucyB0aGUgc2Vzc2lvbiBpcyBlbmRlZCBhbmQgdGhlIGludGVycHJldGVyIHNob3VsZFxuICogcmV0dXJuIGEgc3RhY2sgY29udGFpbnMgb25seSBvbmUgbm9kZSBhcyB0aGUgcmVzdWx0IG9mIHRoZSBzZXNzaW9uLCBvciB0aGVcbiAqIHNlc3Npb24gcmV0dXJucyBub3RoaW5nLiBGb3Igb3RoZXIgaW5zdHJ1Y3Rpb25zIHRoZSBzdGFjayBjYW4ga2VlcCBzb21lXG4gKiBjb21wdXRlZCByZXN1bHQgdG8gc2ltdWxhdGUgcmVhbCBzdGFjayBtYWNoaW5lLiBCdXQgaXQncyBPSyB0byBub3QgdXNlIHRoaXNcbiAqIGZlYXR1cmUgYW5kIGFsd2F5cyByZXR1cm4gYW4gZW1wdHkgJ3N0YWNrJyBldmVyeXRpbWUgdGhlICdvbmNoYW5nZScgZ2V0XG4gKiBjYWxsZWQgYW5kIGludGVydXB0ZWQuIEluIHRoaXMgbW9kZSBpdCBtZWFucyB0aGUgbGFuZ3VhZ2Ugd2FudCB0byBrZWVwXG4gKiBhbGwgc3RhdGVzIGJ5IGl0c2VsZi5cbiAqXG4gKiBQbGVhc2Ugbm90ZSB0aGF0IGZyb20gdGhlIGRlc2NyaXB0aW9uIGFib3ZlLCAnZW5kJyBtZWFucyBzdGFjayAoc3Vic3RhY2spXG4gKiBlbmRzLiBJdCdzIHRvdGFsbHkgaXJyZWxldmFudCB0byAnZXhpdCcuXG4gKlxuICogVGhlIGxhc3QgYXJndW1lbnQgJ2RvYycgaXMgd2hhdCBkZXNpZ25lciBjb3VsZCBwdXQgdGhlIGRlc2NyaXB0aW9uIGFib3V0XG4gKiB0aGUgbWV0aG9kLiBJZiBzZXQsIGl0IHdvdWxkIGFwcGVuZCB0aGUgJ3J1bmUuZG9jJ1xuICogcHJvcGVydHkgaW4gdGhlIGZ1bmN0aW9uIGl0IHJldHVybnMuIEFuZCB0aGVuIHRoZSBsYW5ndWFnZSBpbnN0YW5jZSBjb3VsZFxuICogY2FsbCBgUnVuZS5kb2N1bWVudCg8aW5zdGFuY2U+KWAgdG8gZ2V0IGEgbWV0aG9kIHRoYXQgd291bGQgcmV0dXJuXG4gKiAneyBtZXRob2ROYW1lOiBkZXNjcmlwdGlvbiB9JyB3aGVuIGl0IGdvdCBpbnZva2VkLlxuICovXG5SdW5lLmRlZmluZSA9IGZ1bmN0aW9uKG1ldGhvZCwgYXMsIGRvYyA9ICcnKSB7XG4gIHZhciBidWlsdCA9IGZ1bmN0aW9uKC4uLmFyZ3MpIHtcbiAgICB2YXIgbm9kZSwgcmVzdWx0c3RhY2s7XG4gICAgc3dpdGNoIChhcykge1xuICAgICAgY2FzZSAncHVzaCc6XG4gICAgICAgIG5vZGUgPSBuZXcgUnVuZS5Ob2RlKG1ldGhvZCwgYXJncywgdGhpcy5zdGFjayk7XG4gICAgICAgIHRoaXMuc3RhY2sucHVzaChub2RlKTtcbiAgICAgICAgcmVzdWx0c3RhY2sgPVxuICAgICAgICAgIHRoaXMub25jaGFuZ2UodGhpcy5jb250ZXh0LCBub2RlLCB0aGlzLnN0YWNrKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdiZWdpbic6XG4gICAgICAgIHRoaXMuX3ByZXZzdGFjayA9IHRoaXMuc3RhY2s7XG4gICAgICAgIHRoaXMuc3RhY2sgPSBbXTtcbiAgICAgICAgbm9kZSA9IG5ldyBSdW5lLk5vZGUobWV0aG9kLCBhcmdzLCB0aGlzLnN0YWNrKTtcbiAgICAgICAgdGhpcy5zdGFjay5wdXNoKG5vZGUpOyAgLy8gYXMgdGhlIGZpcnN0IG5vZGUgb2YgdGhlIG5ldyBzdGFjay5cbiAgICAgICAgcmVzdWx0c3RhY2sgPVxuICAgICAgICAgIHRoaXMub25jaGFuZ2UodGhpcy5jb250ZXh0LCBub2RlLCB0aGlzLnN0YWNrKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdlbmQnOlxuICAgICAgICBub2RlID0gbmV3IFJ1bmUuTm9kZShtZXRob2QsIGFyZ3MsIHRoaXMuc3RhY2spO1xuICAgICAgICB0aGlzLnN0YWNrLnB1c2gobm9kZSk7ICAvLyB0aGUgbGFzdCBub2RlIG9mIHRoZSBzdGFjay5cbiAgICAgICAgdGhpcy5zdGFjayA9XG4gICAgICAgICAgdGhpcy5fcHJldnN0YWNrOyAvLyBzd2l0Y2ggYmFjayB0byB0aGUgcHJldmlvdXMgc3RhY2suXG4gICAgICAgIHJlc3VsdHN0YWNrID1cbiAgICAgICAgICB0aGlzLm9uY2hhbmdlKHRoaXMuY29udGV4dCwgbm9kZSwgdGhpcy5zdGFjayk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnZXhpdCc6XG4gICAgICAgIG5vZGUgPSBuZXcgUnVuZS5Ob2RlKG1ldGhvZCwgYXJncywgdGhpcy5zdGFjayk7XG4gICAgICAgIHRoaXMuc3RhY2sucHVzaChub2RlKTsgIC8vIHRoZSBsYXN0IG5vZGUgb2YgdGhlIHN0YWNrLlxuICAgICAgICByZXN1bHRzdGFjayA9XG4gICAgICAgICAgdGhpcy5vbmNoYW5nZSh0aGlzLmNvbnRleHQsIG5vZGUsIHRoaXMuc3RhY2spO1xuICAgICAgICBpZiAoIXJlc3VsdHN0YWNrKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGAnZXhpdCcgbm9kZSAnJHtub2RlLnR5cGV9JyBzaG91bGRcbiAgICAgICAgICAgIHJldHVybiBhIHJlc3VsdHN0YWNrLmApO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHRzdGFja1swXTtcbiAgICB9XG4gICAgLy8gSWYgdGhlIGhhbmRsZXIgdXBkYXRlcyB0aGUgc3RhY2ssIGl0IHdvdWxkIHJlcGxhY2UgdGhlIGV4aXN0aW5nIG9uZS5cbiAgICBpZiAocmVzdWx0c3RhY2spIHtcbiAgICAgIHRoaXMuc3RhY2sgPSByZXN1bHRzdGFjaztcbiAgICB9XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG4gIGJ1aWx0LnJ1bmUgPSB7XG4gICAgJ2FzJzogYXMsXG4gICAgJ2RvYyc6IGRvYyxcbiAgICAnbWV0aG9kJzogbWV0aG9kLFxuICB9O1xuICByZXR1cm4gYnVpbHQ7XG59O1xuXG4vKipcbiAqIEdlbmVyYXRlIGEgbWV0aG9kIHRoYXQgd291bGQgcmV0dXJuIGFsbCBkb2N1bWVudHMgb2YgdGhlIG1ldGhvZHMsXG4gKiBpbiBhIGZvcm0gb2YgJ3sgbWV0aG9kTmFtZTogZGVzY3JpcHRpb24gfScuXG4gKlxuICogVGhlIGFyZ3VtZW50IG11c3QgYmUgdGhlIGxhbmd1YWdlIGluc3RhbmNlIHdpdGggYWxsIGRlZmluZWQgbWV0aG9kcy5cbiAqL1xuUnVuZS5wdWJsaXNoID0gZnVuY3Rpb24oaW5zdGFuY2UpIHtcbiAgdmFyIGdlbmVyYXRlZCA9IE9iamVjdC5rZXlzKGluc3RhbmNlKS5yZWR1Y2UoKGRvYywgbmFtZSkgPT4ge1xuICAgIHZhciBtZXRob2QgPSBpbnN0YW5jZVtuYW1lXTtcbiAgICBpZiAobWV0aG9kLnJ1bmUpIHtcbiAgICAgIGRvY1tuYW1lXSA9IG1ldGhvZC5ydW5lLmRvYztcbiAgICB9XG4gIH0sIHt9KTtcbiAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBnZW5lcmF0ZWQ7XG4gIH07XG59O1xuXG5SdW5lLk5vZGUgPSBmdW5jdGlvbih0eXBlLCBhcmdzLCBzdGFjaykge1xuICB0aGlzLnR5cGUgPSB0eXBlO1xuICB0aGlzLmFyZ3MgPSBhcmdzO1xuICB0aGlzLnN0YWNrID0gc3RhY2s7XG59O1xuXG5SdW5lLkV2YWx1YXRlID0gZnVuY3Rpb24oY29udGV4dCA9IHt9KSB7XG4gIHRoaXMuX2FuYWx5emVycyA9IFtdO1xuICB0aGlzLl9pbnRlcnByZXRlciA9IG51bGw7XG4gIHRoaXMuX2NvbnRleHQgPSBjb250ZXh0O1xufTtcblxuLyoqXG4gKiBBbmFseXplciBjb3VsZCByZWNlaXZlIHRoZSBzdGFjayBjaGFuZ2UgZnJvbSAnUnVuZSNldmFsdWF0ZScsXG4gKiBhbmQgaXQgd291bGQgYmUgY2FsbGVkIHdpdGggdGhlIGFyZ3VtZW50cyBhcyB0aGUgZnVuY3Rpb24gZGVzY3JpYmVzOlxuICpcbiAqICAgICBSdW5lLnByb3RvdHlwZS5ldmFsdWF0ZSgoY29udGV4dCwgY2hhbmdlLCBzdGFjaykgPT4ge1xuICogICAgICAgIC8vIC4uLlxuICogICAgIH0pO1xuICpcbiAqIFNvIHRoZSBhbmFseXplciBjb3VsZCBiZTpcbiAqXG4gKiAgICBmdW5jdGlvbihjb250ZXh0LCBjaGFuZ2UsIHN0YWNrKSB7XG4gKiAgICAgIC8vIERvIHNvbWUgY2hlY2sgYW5kIG1heWJlIGNoYW5nZWQgdGhlIGNvbnRleHQuXG4gKiAgICAgIC8vIFRoZSBuZXh0IGFuYWx5emVyIHRvIHRoZSBpbnRlcnByZXRlciB3b3VsZCBhY2NlcHQgdGhlIGFsdGVybmF0ZWRcbiAqICAgICAgLy8gY29udGV4dCBhcyB0aGUgYXJndW1lbnQgJ2NvbnRleHQnLlxuICogICAgICBjb250ZXh0LnNvbWVGbGFnID0gdHJ1ZTtcbiAqICAgICAgLy8gV2hlbiB0aGVyZSBpcyB3cm9uZywgdGhyb3cgaXQuXG4gKiAgICAgIHRocm93IG5ldyBFcnJvcignU29tZSBhbmFseXppbmcgZXJyb3InKTtcbiAqICAgIH07XG4gKlxuICogTm90ZSB0aGF0IHRoZSBhbmFseXplciAoJ2EnKSB3b3VsZCBiZSBpbnZva2VkIHdpdGggZW1wdHkgJ3RoaXMnIG9iamVjdCxcbiAqIHNvIHRoZSBmdW5jdGlvbiByZWxpZXMgb24gJ3RoaXMnIHNob3VsZCBiaW5kIGl0c2VsZiBmaXJzdC5cbiAqL1xuUnVuZS5FdmFsdWF0ZS5wcm90b3R5cGUuYW5hbHl6ZXIgPSBmdW5jdGlvbihhKSB7XG4gIHRoaXMuX2FuYWx5emVycy5wdXNoKGEpO1xuICByZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogT25lIEV2YWx1YXRlIGNhbiBvbmx5IGhhdmUgb25lIGludGVycHJldGVyLCBhbmQgaXQgd291bGQgcmV0dXJuXG4gKiB0aGUgZnVuY3Rpb24gY291bGQgY29uc3VtZSBldmVyeSBzdGFjayBjaGFuZ2UgZnJvbSAnUnVuZSNldmFsdWF0ZScuXG4gKlxuICogVGhlIGNvZGUgaXMgYSBsaXR0bGUgY29tcGxpY2F0ZWQ6IHdlIGhhdmUgdHdvIGtpbmRzIG9mICdyZWR1Y2luZyc6XG4gKiBvbmUgaXMgdG8gcmVkdWNlIGFsbCBhbmFseXplcnMgd2l0aCB0aGUgc2luZ2xlIGluY29taW5nIGNoYW5nZSxcbiAqIGFub3RoZXIgaXMgdG8gcmVkdWNlIGFsbCBpbmNvbWluZyBjaGFuZ2VzIHdpdGggdGhpcyBhbmFseXplcnMgKyBpbnRlcnByZXRlci5cbiAqXG4gKiBUaGUgYW5hbHl6ZXIgYW5kIGludGVycHJldGVyIHNob3VsZCBjaGFuZ2UgdGhlIGNvbnRleHQsIHRvIG1lbW9yaXplIHRoZVxuICogc3RhdGVzIG9mIHRoZSBldmFsdWF0aW9uLiBUaGUgZGlmZmVyZW5jZSBpcyBpbnRlcnByZXRlciBzaG91bGQgcmV0dXJuIG9uZVxuICogbmV3IHN0YWNrIGlmIGl0IG5lZWRzIHRvIHVwZGF0ZSB0aGUgZXhpc3Rpbmcgb25lLiBUaGUgc3RhY2sgaXQgcmV0dXJucyB3b3VsZFxuICogcmVwbGFjZSB0aGUgZXhpc3Rpbmcgb25lLCBzbyBhbnl0aGluZyBzdGlsbCBpbiB0aGUgb2xkIG9uZSB3b3VsZCBiZSB3aXBlZFxuICogb3V0LiBUaGUgaW50ZXJwcmV0ZXIgY291bGQgcmV0dXJuIG5vdGhpbmcgKCd1bmRlZmluZWQnKSB0byBrZWVwIHRoZSBzdGFja1xuICogdW50b3VjaGVkLlxuICpcbiAqIFRoZSBhbmFseXplcnMgYW5kIGludGVycHJldGVyIGNvdWxkIGNoYW5nZSB0aGUgJ2NvbnRleHQnIHBhc3MgdG8gdGhlbS5cbiAqIEFuZCBzaW5jZSB3ZSBtYXkgdXBkYXRlIHRoZSBzdGFjayBhcyBhYm92ZSwgdGhlIGNvbnRleHQgc2hvdWxkIG1lbW9yaXplXG4gKiB0aG9zZSBpbmZvcm1hdGlvbiBub3QgdG8gYmUgb3ZlcndyaXR0ZW4gd2hpbGUgdGhlIHN0YWNrIGdldCB3aXBlZCBvdXQuXG4gKlxuICogQW5kIGlmIHRoZSBpbnRlcnByZXRpbmcgbm9kZSBpcyB0aGUgZXhpdCBub2RlIG9mIHRoZSBzZXNzaW9uLCBpbnRlcnByZXRlclxuICogc2hvdWxkIHJldHVybiBhIG5ldyBzdGFjayBjb250YWlucyBvbmx5IG9uZSBmaW5hbCByZXN1bHQgbm9kZS4gSWYgdGhlcmVcbiAqIGlzIG5vIHN1Y2ggbm9kZSwgdGhlIHJlc3VsdCBvZiB0aGlzIHNlc3Npb24gaXMgJ3VuZGVmaW5lZCcuXG4gKi9cblJ1bmUuRXZhbHVhdGUucHJvdG90eXBlLmludGVycHJldGVyID0gZnVuY3Rpb24oaW5wdCkge1xuICAvLyBUaGUgY3VzdG9taXplZCBsYW5ndWFnZSBzaG91bGQgZ2l2ZSB0aGUgZGVmYXVsdCBjb250ZXh0LlxuICByZXR1cm4gKGNvbnRleHQsIGNoYW5nZSwgc3RhY2spID0+IHtcbiAgICB0cnkge1xuICAgICAgLy8gQW5hbHl6ZXJzIGNvdWxkIGNoYW5nZSB0aGUgY29udGV4dC5cbiAgICAgIHRoaXMuX2FuYWx5emVycy5yZWR1Y2UoKGN0eCwgYW5hbHl6ZXIpID0+IHtcbiAgICAgICAgYW5hbHl6ZXIuY2FsbCh7fSwgY29udGV4dCwgY2hhbmdlLCBzdGFjayk7XG4gICAgICB9LCBjb250ZXh0KTtcbiAgICB9IGNhdGNoKGUpIHtcbiAgICAgIHRoaXMuX2hhbmRsZUVycm9yKGUsIGNvbnRleHQsIGNoYW5nZSwgc3RhY2spO1xuICAgIH1cbiAgICAvLyBBZnRlciBhbmFseXplIGl0LCBpbnRlcnByZXQgdGhlIG5vZGUgYW5kIHJldHVybiB0aGUgbmV3IHN0YWNrIChpZiBhbnkpLlxuICAgIHZhciBuZXdTdGFjayA9IGlucHQoY29udGV4dCwgY2hhbmdlLCBzdGFjayk7XG4gICAgcmV0dXJuIG5ld1N0YWNrO1xuICB9O1xufTtcblxuUnVuZS5FdmFsdWF0ZS5wcm90b3R5cGUuX2hhbmRsZUVycm9yID1cbmZ1bmN0aW9uKGVyciwgY29udGV4dCwgY2hhbmdlLCBzdGFjaykge1xuICAvLyBUT0RPOiBleHBhbmQgaXQgdG8gcHJvdmlkZSBtb3JlIHNvcGhpc3RpYyBkZWJ1Z2dpbmcgbWVzc2FnZS5cbiAgdGhyb3cgbmV3IEVycm9yKGBXaGVuIGNoYW5nZSAke2NoYW5nZS50eXBlfSBjb21lcyBlcnJvciAnJHtlcnJ9JyBoYXBwZW5lZGApO1xufTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL3J1bmUuanNcbiAqKi8iXSwic291cmNlUm9vdCI6IiJ9

/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _Promise = __webpack_require__(1)['default'];
	
	var _Array$from = __webpack_require__(61)['default'];
	
	var _interopRequireDefault = __webpack_require__(56)['default'];
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	exports['default'] = Runtime;
	
	var _demoEffectJs = __webpack_require__(65);
	
	var _demoEffectJs2 = _interopRequireDefault(_demoEffectJs);
	
	function Runtime() {}
	
	/**
	 * When the stack of DSL changes, evaluate the Language.Node.
	 */
	Runtime.prototype.onchange = function (instance, change, stack) {
	  // Since we don't need to keep things in stack until we have
	  // real analyzers, the 'onchange' handler would return empty stack
	  // to let the language runtime clear the stack every instruction.
	  var result = this[change.type].apply(this, change.args);
	  // return empty 'handled' stack to let Rune keep no states of
	  // every instruction, except the result.
	  return [result];
	  // TODO: how to concat `effect`; how to pass signal & data, not only data;
	};
	
	Runtime.Deferred = function () {
	  var _this = this;
	
	  var promise = new _Promise(function (resolve, reject) {
	    _this.resolve = resolve;
	    _this.reject = reject;
	  });
	  this.promise = promise;
	  return this;
	};
	
	Runtime.Context = function (environment) {
	  this.deferred = new Runtime.Deferred();
	  for (var name in environment) {
	    this[name] = environment[name];
	  }
	};
	
	/**
	 * Returning will move the main process to the next step.
	 */
	Runtime.Context.prototype.returns = function (retvar) {
	  if (arguments.length > 1) {
	    retvar = _Array$from(arguments);
	  }
	  if (!this.interrupted) {
	    this.retvar = retvar;
	    this.deferred.resolve(retvar);
	  } else {
	    // If it's already interrupted, do nothing.
	    // In theory this should nullify all effects, since we should
	    // never do effect during steps. So if a process was interrupted
	    // before it ends all date manipulation steps, it should do nothing.
	    this.deferred.reject();
	  }
	};
	
	Runtime.Context.prototype.raise = function (err) {
	  // The error will be captured by main queue's `onProcessError`.
	  this.deferred.reject(err);
	};
	
	Runtime.Context.prototype.interrupt = function (result) {
	  var reason = arguments.length <= 1 || arguments[1] === undefined ? '' : arguments[1];
	
	  this.result = result;
	  this.interrupted = true;
	  // The interrupt will be captured by main queue's `onProcessError`.
	  var interrupt = new Runtime.Interrupt(reason);
	  this.deferred.reject(interrupt);
	};
	
	Runtime.Interrupt = function () {};
	
	Runtime.prototype.onProcessError = function (err) {
	  if (!(err instanceof Runtime.Interrupt)) {
	    // Print it to debug.
	    console.error(err);
	    // Then to interrupt the process.
	    throw err;
	  } else {
	    // Only to interrupt the process.
	  }
	};
	
	Runtime.prototype.start = function () {
	  var deferred = new Runtime.Deferred();
	  this.queue = deferred.promise;
	  // We will resolve it at `done` anyway, so
	  // `reject` doesn't matter.
	  this.resolve = deferred.resolve;
	  this.reject = deferred.reject;
	  this.result = null; // the result from each step.
	  this.environment = {};
	};
	
	Runtime.prototype.as = function (name) {
	  var _this2 = this;
	
	  this.queue = this.queue.then(function () {
	    if ('undefined' !== typeof _this2.environment[name]) {
	      throw new Error('Scoped variable \'' + name + '\' defined twice');
	    }
	    if ('undefined' !== typeof Runtime.Context.prototype[name]) {
	      throw new Error('Refuse to name variable as context reversed word: ' + '\'' + name + '\'');
	    }
	    _this2.environment[name] = _this2.result;
	    return _this2.result;
	  });
	};
	
	/**
	 * Ends the definition but not run it.
	 */
	Runtime.prototype.done = function () {
	  this.queue = this.queue['catch'](this.onProcessError.bind(this));
	};
	
	/**
	 * Ends the definition and run it immediately with optional data.
	 */
	Runtime.prototype.run = function () {
	  var data = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];
	
	  this.queue = this.queue['catch'](this.onProcessError.bind(this));
	  this.result = data;
	  this.resolve(); // So the queue start to execute.
	};
	
	Runtime.prototype._createContext = function () {
	  return new Runtime.Context(this.environment);
	};
	
	Runtime.prototype.next = function (step) {
	  var _this3 = this;
	
	  this.queue = this.queue.then(function () {
	    var context = _this3._createContext();
	    step(context, _this3.result);
	    return context.deferred.promise;
	  }).then(function (result) {
	    if (result.next) {
	      // If it's also a Edda Action statements, concat it.
	      return result.queue;
	    } else {
	      // No matter it's value from an ordinary function or
	      // a Promise, returning it is legit for a Promise.
	      return result;
	    }
	  }).then(function (result) {
	    // Get the result from newPromise and set it.
	    _this3.result = result;
	  });
	};
	
	Runtime.prototype.match = function () {
	  var _this4 = this;
	
	  // Collect all 'case' Promises here.
	  this.queue = this.queue.then(function () {
	    _this4.matching = [];
	    _this4.matching.matched = false;
	  });
	};
	
	// Matching end: execute all matching cases.
	Runtime.prototype.end = function () {
	  var _this5 = this;
	
	  this.queue = this.queue.then(function () {
	    _this5.matching = null;
	  });
	};
	
	/**
	 * `pred` must be a sync function only return true or false.
	 * If multiple `case` can match the result, only the first matching one
	 * will be executed and leave the result.
	 */
	Runtime.prototype['case'] = function (pred) {
	  var _this6 = this;
	
	  this.queue = this.queue.then(function () {
	    var id = _this6.matching.length;
	    // In a `match`, we don't update the result,
	    // so every `case` can judge if it's true.
	    var predresult = pred(_this6.result);
	    _this6.matching[id] = predresult;
	    return id;
	  });
	};
	
	Runtime.prototype.to = function (step) {
	  var _this7 = this;
	
	  // It's always case..to, so we only need to concat
	  // 'to' promise after the 'case' promise.
	  this.queue = this.queue.then(function (id) {
	    // Only append the step if the previous one is true.
	    if (!_this7.matching.matched && _this7.matching[id]) {
	      _this7.matching.matched = true;
	      var context = _this7._createContext();
	      step(context, _this7.result);
	      return context.deferred.promise;
	    } else {
	      return _this7.result;
	    }
	  }).then(function (result) {
	    if (result.next) {
	      return result.queue;
	    } else {
	      return result;
	    }
	  }).then(function (result) {
	    if (_this7.matching.matched) {
	      _this7.result = result;
	    }
	    // Or, do not update the result it got.
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
	Runtime.prototype.loop = function (step) {
	  var _this8 = this;
	
	  this.queue = this.queue.then(function () {
	    var loopqueue = _this8.looping.loopingpromise;
	    var pred = _this8.looping.pred;
	
	    var append = function append() {
	      _this8.looping.loopingpromise.promise = loopqueue.then(function () {
	        var context = _this8._createContext();
	        step(context, _this8.result);
	        return context.deferred.promise;
	      }).then(function (result) {
	        if (result.next) {
	          return result.queue;
	        } else {
	          return result;
	        }
	      }).then(function (result) {
	        _this8.result = result;
	        if (!pred(_this8.result)) {
	          append();
	        } else {
	          _this8.looping.queueblocker.resolve();
	        }
	      });
	    };
	    // First iteration.
	    if (!pred(_this8.result)) {
	      append();
	    } else {
	      _this8.looping.queueblocker.resolve();
	    }
	    return _this8.looping.queueblocker.promise;
	  });
	};
	
	/**
	 * Remember we will swap `loop` and `until` at syntax level, so
	 * we can get the pred before we run the loop.
	 */
	Runtime.prototype.until = function (pred) {
	  var _this9 = this;
	
	  this.queue = this.queue.then(function () {
	    _this9.looping = {
	      'pred': pred,
	      'loopingpromise': _Promise.resolve(),
	      'queueblocker': new Runtime.Deferred()
	    };
	    // After the looping, clear it.
	    _this9.looping.queueblocker.promise = _this9.looping.queueblocker.promise.then(function () {
	      _this9.looping = null;
	    });
	  });
	};
	
	Runtime.prototype.any = function () {
	  var any = this._raceOrAll('race');
	  var candidates = _Array$from(arguments);
	  any.call(this, candidates);
	};
	
	Runtime.prototype.all = function () {
	  var all = this._raceOrAll('all');
	  var candidates = _Array$from(arguments);
	  all.call(this, candidates);
	};
	
	Runtime.prototype.effect = function () {
	  return new _demoEffectJs2['default'](this);
	};
	
	Runtime.prototype._raceOrAll = function (promiseMethod) {
	  var _this10 = this;
	
	  var generated = function generated(candidates) {
	    var updateResult = function updateResult(result) {
	      _this10.result = result;
	    };
	    var generatePromise = function generatePromise(step) {
	      var context = new Runtime.Context();
	      step(context, _this10.result);
	      return context.deferred.promise.then(function (result) {
	        if (result.next) {
	          return result.queue;
	        } else if (result.then) {
	          return result.then(updateResult);
	        } else {
	          // Ordinary function will return the plain result.
	          // And we need to turn it as a promise.
	          return _Promise.resolve(result);
	        }
	      });
	    };
	    _this10.queue = _this10.queue.then(function () {
	      // Catch generatePromise.
	      try {
	        var allPromises = candidates.map(function (step) {
	          return generatePromise(step);
	        });
	        if ('race' === promiseMethod) {
	          return _Promise.race(allPromises).then(updateResult);
	        } else if ('all' === promiseMethod) {
	          return _Promise.all(allPromises).then(updateResult);
	        }
	      } catch (e) {
	        console.error(e);
	        throw e;
	      }
	    });
	  };
	  return generated;
	};
	module.exports = exports['default'];

/***/ },
/* 61 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(62), __esModule: true };

/***/ },
/* 62 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(4);
	__webpack_require__(63);
	module.exports = __webpack_require__(12).Array.from;

/***/ },
/* 63 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var ctx         = __webpack_require__(35)
	  , $def        = __webpack_require__(10)
	  , toObject    = __webpack_require__(64)
	  , call        = __webpack_require__(42)
	  , isArrayIter = __webpack_require__(43)
	  , toLength    = __webpack_require__(44)
	  , getIterFn   = __webpack_require__(45);
	$def($def.S + $def.F * !__webpack_require__(55)(function(iter){ Array.from(iter); }), 'Array', {
	  // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
	  from: function from(arrayLike/*, mapfn = undefined, thisArg = undefined*/){
	    var O       = toObject(arrayLike)
	      , C       = typeof this == 'function' ? this : Array
	      , mapfn   = arguments[1]
	      , mapping = mapfn !== undefined
	      , index   = 0
	      , iterFn  = getIterFn(O)
	      , length, result, step, iterator;
	    if(mapping)mapfn = ctx(mapfn, arguments[2], 2);
	    // if object isn't iterable or it's array with default iterator - use simple case
	    if(iterFn != undefined && !(C == Array && isArrayIter(iterFn))){
	      for(iterator = iterFn.call(O), result = new C; !(step = iterator.next()).done; index++){
	        result[index] = mapping ? call(iterator, mapfn, [step.value, index], true) : step.value;
	      }
	    } else {
	      for(result = new C(length = toLength(O.length)); length > index; index++){
	        result[index] = mapping ? mapfn(O[index], index) : O[index];
	      }
	    }
	    result.length = index;
	    return result;
	  }
	});

/***/ },
/* 64 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.13 ToObject(argument)
	var defined = __webpack_require__(7);
	module.exports = function(it){
	  return Object(defined(it));
	};

/***/ },
/* 65 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _interopRequireDefault = __webpack_require__(56)['default'];
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	exports['default'] = Effect;
	
	var _demoEffectInterfaceJs = __webpack_require__(66);
	
	var _demoEffectInterfaceJs2 = _interopRequireDefault(_demoEffectInterfaceJs);
	
	var _demoEffectRuntimeJs = __webpack_require__(67);
	
	var _demoEffectRuntimeJs2 = _interopRequireDefault(_demoEffectRuntimeJs);
	
	function Effect(action) {
	  this._runtime = new _demoEffectRuntimeJs2['default'](action);
	  this._interface = new _demoEffectInterfaceJs2['default'](this._runtime);
	  return this._interface;
	}
	
	module.exports = exports['default'];

/***/ },
/* 66 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _interopRequireDefault = __webpack_require__(56)['default'];
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	exports['default'] = Interface;
	
	var _distRuneJs = __webpack_require__(59);
	
	var _distRuneJs2 = _interopRequireDefault(_distRuneJs);
	
	function Interface(runtime) {
	  this.context = {
	    started: false,
	    stopped: false,
	    looping: false,
	    matching: false
	  };
	  this.stack = [];
	  this._runtime = runtime;
	  this._evaluator = new _distRuneJs2['default'].Evaluate().analyzer(this._analyzeOrder.bind(this)).interpreter(this._interpret.bind(this));
	}
	
	Interface.prototype.start = _distRuneJs2['default'].define('start', 'begin');
	Interface.prototype.done = _distRuneJs2['default'].define('done', 'exit');
	Interface.prototype.run = _distRuneJs2['default'].define('run', 'exit');
	Interface.prototype.next = _distRuneJs2['default'].define('next', 'push');
	Interface.prototype.match = _distRuneJs2['default'].define('match', 'begin');
	Interface.prototype.end = _distRuneJs2['default'].define('end', 'end');
	Interface.prototype['case'] = _distRuneJs2['default'].define('case', 'push');
	Interface.prototype.to = _distRuneJs2['default'].define('to', 'push');
	Interface.prototype.loop = _distRuneJs2['default'].define('loop', 'begin');
	Interface.prototype.until = _distRuneJs2['default'].define('until', 'end');
	
	Interface.prototype.onchange = function (context, node, stack) {
	  // When it's changed, evaluate it with analyzers & interpreter.
	  return this._evaluator(context, node, stack);
	};
	
	Interface.prototype._interpret = function (context, node, stack) {
	  // Well in this eDSL we delegate the interpretion to the runtime.
	  // We don't pass context to runtime since the runtime will keep
	  // the essential states by its own.
	  return this._runtime.onchange.apply(this._runtime, arguments);
	};
	
	// In this eDSL we now only have this analyzer. Could add more and register it
	// in the contruction of 'this._evaluator'.
	Interface.prototype._analyzeOrder = function (context, change, stack) {
	  if ('start' === change.type) {
	    context.started = true;
	  } else if ('stop') {
	    context.stopped = true;
	  }
	  if ('start' === change.type && context.stopped) {
	    throw new Error('Should not start a process again' + 'after it\'s already stopped');
	  } else if ('next' === change.type && !context.started) {
	    throw new Error('Should not concat steps while it\'s not started');
	  } else if ('stop' === change.type && !context.started) {
	    throw new Error('Should not stop a process before it\'s started');
	  }
	};
	module.exports = exports['default'];

/***/ },
/* 67 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _getIterator = __webpack_require__(68)['default'];
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	exports['default'] = Runtime;
	
	function Runtime() {
	  var action = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];
	
	  // Accumlated states need to apply on effects, like data to render.
	  // And it will be generated by the action in asynchronous way.
	  // If none, means it's a sub-procedure need to be concated.
	  this._action = action;
	  this._data = null;
	}
	
	/**
	 * When the stack of DSL changes, evaluate the Language.Node.
	 */
	Runtime.prototype.onchange = function (instance, change, stack) {
	  var result = this[change.type].apply(this, change.args);
	  return [result];
	};
	
	Runtime.prototype.start = function () {
	  this._effectProcedure = [];
	  this._cases = [];
	};
	
	Runtime.prototype.run = function () {
	  var _this = this;
	
	  if (this._action) {
	    // Append before we append our Effect function.
	    // So that if the error is an interruption and already captured
	    // by the handler, it will not effect the following steps.
	    this._action.queue = this._action.queue['catch'](this._action.onProcessError.bind(this._action));
	
	    // Concat the built effect after the accumulating.
	    this._action.queue = this._action.queue.then(function () {
	      // Get the result from the ended action.
	      var data = _this._action.result;
	      console.log('>>>> get the data from action: ', data);
	      _this._data = data;
	      _this._effectProcedure.forEach(function (p) {
	        // Note: all composed Effect and native function will receive the
	        // same accumulated result from the State, and it should be considered
	        // as an immutable value. This means, Effects or functions should not
	        // modify it and to expect the next one can use the new value.
	        p(data);
	      });
	      _this._effectProcedure.length = 0;
	    });
	    this._action.resolve();
	  } else if (this._data) {
	    // Subprecudure only starts from a data.
	    this._effectProcedure.forEach(function (p) {
	      // Note: all composed Effect and native function will receive the
	      // same accumulated result from the State, and it should be considered
	      // as an immutable value. This means, Effects or functions should not
	      // modify it and to expect the next one can use the new value.
	      p(_this._data);
	    });
	    this._effectProcedure.length = 0;
	  }
	};
	
	/**
	 * Close the procedure definition, do nothing.
	 */
	Runtime.prototype.done = function () {
	  return this;
	};
	
	Runtime.prototype._execute = function (step) {
	  if ('function' !== typeof step) {
	    throw new Error('TypeError: step is not a function: ' + typeof step);
	  }
	
	  var result = step(this._data);
	  if (result instanceof Runtime) {
	    // It's a generator that generates new Effect chain.
	    // So we need to execute it now.
	    result._data = this._data;
	    result.run();
	  } else if ('undefined' !== typeof result) {
	    // Else, it is a plain function and it's done when executing it.
	    // So it shouldn't return anything.
	    throw new Error('TypeError: step should return only Effect; now it is: ' + typeof result);
	  }
	};
	
	Runtime.prototype.next = function (step) {
	  var _this2 = this;
	
	  this._effectProcedure.push(function () {
	    _this2._execute(step);
	  });
	};
	
	/**
	 * A pure syntax node.
	 */
	Runtime.prototype.match = function () {
	  var _this3 = this;
	
	  this._effectProcedure.push(function () {
	    _this3._cases = [];
	  });
	};
	
	/**
	 * To make a function test all branches until one is true,
	 * and then run it when the procedure is executing.
	 */
	Runtime.prototype.end = function () {
	  var _this4 = this;
	
	  this._effectProcedure.push(function () {
	    var data = _this4._data;
	    var cases = _this4._cases;
	    var _iteratorNormalCompletion = true;
	    var _didIteratorError = false;
	    var _iteratorError = undefined;
	
	    try {
	      for (var _iterator = _getIterator(cases), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	        var branch = _step.value;
	
	        if (branch.prediction(data)) {
	          branch.todo(data);
	          break;
	        }
	      }
	    } catch (err) {
	      _didIteratorError = true;
	      _iteratorError = err;
	    } finally {
	      try {
	        if (!_iteratorNormalCompletion && _iterator['return']) {
	          _iterator['return']();
	        }
	      } finally {
	        if (_didIteratorError) {
	          throw _iteratorError;
	        }
	      }
	    }
	
	    cases.length = 0;
	  });
	};
	
	/**
	 * `pred` must be a function return true/false.
	 */
	Runtime.prototype['case'] = function (pred) {
	  var _this5 = this;
	
	  this._effectProcedure.push(function () {
	    _this5._cases.push({
	      'prediction': pred,
	      'todo': null
	    });
	  });
	};
	
	/**
	 * `step`: another Effect or native function.
	 */
	Runtime.prototype.to = function (step) {
	  var _this6 = this;
	
	  this._effectProcedure.push(function () {
	    var branch = _this6._cases[_this6._cases.length - 1];
	    branch.todo = function () {
	      _this6._execute(step);
	    };
	  });
	};
	
	/**
	 * Remember we will swap `loop` and `until` at syntax level, so
	 * we can get the pred before we run the loop.
	 */
	Runtime.prototype.loop = function (step) {
	  var _this7 = this;
	
	  this._effectProcedure.push(function () {
	    var loopTimes = _this7._loopTimes;
	    _this7._loopTimes = null;
	    for (var i = 0; i < loopTimes; i++) {
	      _this7._execute(step);
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
	Runtime.prototype.until = function (pred) {
	  var _this8 = this;
	
	  this._effectProcedure.push(function () {
	    var data = _this8._data;
	    _this8._loopTimes = pred(data);
	    if ('number' !== typeof _this8._loopTimes) {
	      throw new Error('TypeError: loop times must be a number.');
	    } else if (0 > _this8._loopTimes) {
	      throw new Error('Loop times must larger than 0.');
	    }
	  });
	};
	module.exports = exports['default'];

/***/ },
/* 68 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(69), __esModule: true };

/***/ },
/* 69 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(27);
	__webpack_require__(4);
	module.exports = __webpack_require__(70);

/***/ },
/* 70 */
/***/ function(module, exports, __webpack_require__) {

	var anObject = __webpack_require__(39)
	  , get      = __webpack_require__(45);
	module.exports = __webpack_require__(12).getIterator = function(it){
	  var iterFn = get(it);
	  if(typeof iterFn != 'function')throw TypeError(it + ' is not iterable!');
	  return anObject(iterFn.call(it));
	};

/***/ }
/******/ ]);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgYWFlNWNjNTljMDhmNTMzZTU0NjkiLCJ3ZWJwYWNrOi8vLy4vZWRkYS1kZW1vLmpzIiwid2VicGFjazovLy8uLi9+L2JhYmVsLXJ1bnRpbWUvY29yZS1qcy9wcm9taXNlLmpzIiwid2VicGFjazovLy8uLi9+L2JhYmVsLXJ1bnRpbWUvfi9jb3JlLWpzL2xpYnJhcnkvZm4vcHJvbWlzZS5qcyIsIndlYnBhY2s6Ly8vLi4vfi9iYWJlbC1ydW50aW1lL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM2LnN0cmluZy5pdGVyYXRvci5qcyIsIndlYnBhY2s6Ly8vLi4vfi9iYWJlbC1ydW50aW1lL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvJC5zdHJpbmctYXQuanMiLCJ3ZWJwYWNrOi8vLy4uL34vYmFiZWwtcnVudGltZS9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzLyQudG8taW50ZWdlci5qcyIsIndlYnBhY2s6Ly8vLi4vfi9iYWJlbC1ydW50aW1lL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvJC5kZWZpbmVkLmpzIiwid2VicGFjazovLy8uLi9+L2JhYmVsLXJ1bnRpbWUvfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy8kLml0ZXItZGVmaW5lLmpzIiwid2VicGFjazovLy8uLi9+L2JhYmVsLXJ1bnRpbWUvfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy8kLmxpYnJhcnkuanMiLCJ3ZWJwYWNrOi8vLy4uL34vYmFiZWwtcnVudGltZS9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzLyQuZGVmLmpzIiwid2VicGFjazovLy8uLi9+L2JhYmVsLXJ1bnRpbWUvfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy8kLmdsb2JhbC5qcyIsIndlYnBhY2s6Ly8vLi4vfi9iYWJlbC1ydW50aW1lL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvJC5jb3JlLmpzIiwid2VicGFjazovLy8uLi9+L2JhYmVsLXJ1bnRpbWUvfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy8kLnJlZGVmLmpzIiwid2VicGFjazovLy8uLi9+L2JhYmVsLXJ1bnRpbWUvfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy8kLmhpZGUuanMiLCJ3ZWJwYWNrOi8vLy4uL34vYmFiZWwtcnVudGltZS9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzLyQuanMiLCJ3ZWJwYWNrOi8vLy4uL34vYmFiZWwtcnVudGltZS9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzLyQucHJvcGVydHktZGVzYy5qcyIsIndlYnBhY2s6Ly8vLi4vfi9iYWJlbC1ydW50aW1lL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvJC5zdXBwb3J0LWRlc2MuanMiLCJ3ZWJwYWNrOi8vLy4uL34vYmFiZWwtcnVudGltZS9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzLyQuZmFpbHMuanMiLCJ3ZWJwYWNrOi8vLy4uL34vYmFiZWwtcnVudGltZS9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzLyQuaGFzLmpzIiwid2VicGFjazovLy8uLi9+L2JhYmVsLXJ1bnRpbWUvfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy8kLndrcy5qcyIsIndlYnBhY2s6Ly8vLi4vfi9iYWJlbC1ydW50aW1lL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvJC5zaGFyZWQuanMiLCJ3ZWJwYWNrOi8vLy4uL34vYmFiZWwtcnVudGltZS9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzLyQudWlkLmpzIiwid2VicGFjazovLy8uLi9+L2JhYmVsLXJ1bnRpbWUvfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy8kLml0ZXJhdG9ycy5qcyIsIndlYnBhY2s6Ly8vLi4vfi9iYWJlbC1ydW50aW1lL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvJC5pdGVyLWNyZWF0ZS5qcyIsIndlYnBhY2s6Ly8vLi4vfi9iYWJlbC1ydW50aW1lL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvJC50YWcuanMiLCJ3ZWJwYWNrOi8vLy4uL34vYmFiZWwtcnVudGltZS9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzLyQuaXRlci1idWdneS5qcyIsIndlYnBhY2s6Ly8vLi4vfi9iYWJlbC1ydW50aW1lL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvd2ViLmRvbS5pdGVyYWJsZS5qcyIsIndlYnBhY2s6Ly8vLi4vfi9iYWJlbC1ydW50aW1lL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM2LmFycmF5Lml0ZXJhdG9yLmpzIiwid2VicGFjazovLy8uLi9+L2JhYmVsLXJ1bnRpbWUvfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy8kLnVuc2NvcGUuanMiLCJ3ZWJwYWNrOi8vLy4uL34vYmFiZWwtcnVudGltZS9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzLyQuaXRlci1zdGVwLmpzIiwid2VicGFjazovLy8uLi9+L2JhYmVsLXJ1bnRpbWUvfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy8kLnRvLWlvYmplY3QuanMiLCJ3ZWJwYWNrOi8vLy4uL34vYmFiZWwtcnVudGltZS9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzLyQuaW9iamVjdC5qcyIsIndlYnBhY2s6Ly8vLi4vfi9iYWJlbC1ydW50aW1lL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvJC5jb2YuanMiLCJ3ZWJwYWNrOi8vLy4uL34vYmFiZWwtcnVudGltZS9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNi5wcm9taXNlLmpzIiwid2VicGFjazovLy8uLi9+L2JhYmVsLXJ1bnRpbWUvfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy8kLmN0eC5qcyIsIndlYnBhY2s6Ly8vLi4vfi9iYWJlbC1ydW50aW1lL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvJC5hLWZ1bmN0aW9uLmpzIiwid2VicGFjazovLy8uLi9+L2JhYmVsLXJ1bnRpbWUvfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy8kLmNsYXNzb2YuanMiLCJ3ZWJwYWNrOi8vLy4uL34vYmFiZWwtcnVudGltZS9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzLyQuaXMtb2JqZWN0LmpzIiwid2VicGFjazovLy8uLi9+L2JhYmVsLXJ1bnRpbWUvfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy8kLmFuLW9iamVjdC5qcyIsIndlYnBhY2s6Ly8vLi4vfi9iYWJlbC1ydW50aW1lL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvJC5zdHJpY3QtbmV3LmpzIiwid2VicGFjazovLy8uLi9+L2JhYmVsLXJ1bnRpbWUvfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy8kLmZvci1vZi5qcyIsIndlYnBhY2s6Ly8vLi4vfi9iYWJlbC1ydW50aW1lL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvJC5pdGVyLWNhbGwuanMiLCJ3ZWJwYWNrOi8vLy4uL34vYmFiZWwtcnVudGltZS9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzLyQuaXMtYXJyYXktaXRlci5qcyIsIndlYnBhY2s6Ly8vLi4vfi9iYWJlbC1ydW50aW1lL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvJC50by1sZW5ndGguanMiLCJ3ZWJwYWNrOi8vLy4uL34vYmFiZWwtcnVudGltZS9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2NvcmUuZ2V0LWl0ZXJhdG9yLW1ldGhvZC5qcyIsIndlYnBhY2s6Ly8vLi4vfi9iYWJlbC1ydW50aW1lL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvJC5zZXQtcHJvdG8uanMiLCJ3ZWJwYWNrOi8vLy4uL34vYmFiZWwtcnVudGltZS9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzLyQuc2FtZS5qcyIsIndlYnBhY2s6Ly8vLi4vfi9iYWJlbC1ydW50aW1lL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvJC5zcGVjaWVzLmpzIiwid2VicGFjazovLy8uLi9+L2JhYmVsLXJ1bnRpbWUvfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy8kLm1pY3JvdGFzay5qcyIsIndlYnBhY2s6Ly8vLi4vfi9iYWJlbC1ydW50aW1lL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvJC50YXNrLmpzIiwid2VicGFjazovLy8uLi9+L2JhYmVsLXJ1bnRpbWUvfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy8kLmludm9rZS5qcyIsIndlYnBhY2s6Ly8vLi4vfi9iYWJlbC1ydW50aW1lL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvJC5odG1sLmpzIiwid2VicGFjazovLy8uLi9+L2JhYmVsLXJ1bnRpbWUvfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy8kLmRvbS1jcmVhdGUuanMiLCJ3ZWJwYWNrOi8vLy4uL34vYmFiZWwtcnVudGltZS9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzLyQubWl4LmpzIiwid2VicGFjazovLy8uLi9+L2JhYmVsLXJ1bnRpbWUvfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy8kLml0ZXItZGV0ZWN0LmpzIiwid2VicGFjazovLy8uLi9+L2JhYmVsLXJ1bnRpbWUvaGVscGVycy9pbnRlcm9wLXJlcXVpcmUtZGVmYXVsdC5qcyIsIndlYnBhY2s6Ly8vLi9hY3Rpb24uanMiLCJ3ZWJwYWNrOi8vLy4vYWN0aW9uLmludGVyZmFjZS5qcyIsIndlYnBhY2s6Ly8vLi4vZGlzdC9ydW5lLmpzIiwid2VicGFjazovLy8uL2FjdGlvbi5ydW50aW1lLmpzIiwid2VicGFjazovLy8uLi9+L2JhYmVsLXJ1bnRpbWUvY29yZS1qcy9hcnJheS9mcm9tLmpzIiwid2VicGFjazovLy8uLi9+L2JhYmVsLXJ1bnRpbWUvfi9jb3JlLWpzL2xpYnJhcnkvZm4vYXJyYXkvZnJvbS5qcyIsIndlYnBhY2s6Ly8vLi4vfi9iYWJlbC1ydW50aW1lL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM2LmFycmF5LmZyb20uanMiLCJ3ZWJwYWNrOi8vLy4uL34vYmFiZWwtcnVudGltZS9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzLyQudG8tb2JqZWN0LmpzIiwid2VicGFjazovLy8uL2VmZmVjdC5qcyIsIndlYnBhY2s6Ly8vLi9lZmZlY3QuaW50ZXJmYWNlLmpzIiwid2VicGFjazovLy8uL2VmZmVjdC5ydW50aW1lLmpzIiwid2VicGFjazovLy8uLi9+L2JhYmVsLXJ1bnRpbWUvY29yZS1qcy9nZXQtaXRlcmF0b3IuanMiLCJ3ZWJwYWNrOi8vLy4uL34vYmFiZWwtcnVudGltZS9+L2NvcmUtanMvbGlicmFyeS9mbi9nZXQtaXRlcmF0b3IuanMiLCJ3ZWJwYWNrOi8vLy4uL34vYmFiZWwtcnVudGltZS9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2NvcmUuZ2V0LWl0ZXJhdG9yLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1QkFBZTtBQUNmO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7O0FDdENBLGFBQVksQ0FBQzs7Ozs7O3FDQUVNLEVBQWE7Ozs7cUNBQ2IsRUFBYTs7OztBQUVoQyxLQUFJLE1BQU0sR0FBRywyQkFBWSxDQUFDO0FBQzFCLE9BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FDWCxJQUFJLENBQUMsVUFBQyxHQUFHLEVBQUs7QUFBRSxVQUFPLENBQUMsR0FBRyxDQUFDLHVCQUF1QixFQUFFLENBQUMsQ0FBQyxDQUFFLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUNuRixLQUFLLENBQUMsVUFBQyxDQUFDO1VBQUssQ0FBQyxLQUFLLENBQUM7RUFBQSxDQUFDLENBQ3JCLElBQUksQ0FBQyxVQUFDLEdBQUcsRUFBRSxDQUFDLEVBQUs7QUFDaEIsTUFBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7RUFDcEIsQ0FBQyxDQUNELEtBQUssQ0FBQyxVQUFDLENBQUM7VUFBSyxDQUFDLEtBQUssQ0FBQztFQUFBLENBQUMsQ0FDckIsSUFBSSxDQUFDLFVBQUMsR0FBRyxFQUFFLENBQUMsRUFBSztBQUNoQixVQUFPLENBQUMsR0FBRyxDQUFDLDJCQUEyQixDQUFDLENBQUM7QUFDekMsTUFBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7RUFDcEIsQ0FBQyxDQUNELEtBQUssQ0FBQyxVQUFDLENBQUM7VUFBSyxDQUFDLEtBQUssRUFBRTtFQUFBLENBQUMsQ0FDdEIsSUFBSSxDQUFDLFVBQUMsR0FBRyxFQUFFLENBQUMsRUFBSztBQUNoQixVQUFPLENBQUMsR0FBRyxDQUFDLDJCQUEyQixDQUFDLENBQUM7QUFDekMsTUFBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7RUFDcEIsQ0FBQyxDQUNELElBQUksQ0FBQyxVQUFDLEdBQUcsRUFBRSxDQUFDLEVBQUs7QUFBRSxVQUFPLENBQUMsR0FBRyxDQUFDLHVCQUF1QixFQUFFLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUUsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7RUFBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUNoRyxJQUFJLENBQUMsVUFBQyxHQUFHLEVBQUs7QUFDYixVQUFPLENBQUMsR0FBRyxDQUFDLHFCQUFxQixFQUFFLEdBQUcsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ2xELE1BQUcsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDNUIsQ0FBQyxDQUNELEtBQUssRUFBRSxRQUNELENBQUMsVUFBQyxDQUFDO1VBQUssQ0FBQyxHQUFHLEVBQUU7RUFBQSxDQUFDLENBQUMsRUFBRSxDQUFDLFVBQUMsR0FBRyxFQUFFLENBQUMsRUFBSztBQUFFLE1BQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0VBQUMsQ0FBQyxRQUN0RCxDQUFDLFVBQUMsQ0FBQztVQUFLLENB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O0FBQ2hCLE9BQUksQ0FBQyxRQUFRLEdBQUcsT0FBTyxDQUFDO0FBQ3hCLE9BQUksQ0FBQyxVQUFVLEdBQUksSUFBSSx3QkFBSyxRQUFRLEVBQUUsQ0FDbkMsUUFBUSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQ3ZDLFdBQVcsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0VBQzVDOztBQUVELFVBQVMsQ0FBQyxTQUFTLENBQUMsS0FBSyxHQUFHLHdCQUFLLE1BQU0sQ0FBQyxPQUFPLEVBQUUsT0FBTyxDQUFDLENBQUM7QUFDMUQsVUFBUyxDQUFDLFNBQVMsQ0FBQyxJQUFJLEdBQUcsd0JBQUssTUFBTSxDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUMsQ0FBQztBQUN2RCxVQUFTLENBQUMsU0FBUyxDQUFDLEdBQUcsR0FBRyx3QkFBSyxNQUFNLENBQUMsS0FBSyxFQUFFLE1BQU0sQ0FBQyxDQUFDO0FBQ3JELFVBQVMsQ0FBQyxTQUFTLENBQUMsTUFBTSxHQUFHLHdCQUFLLE1BQU0sQ0FBQyxRQUFRLEVBQUUsTUFBTSxDQUFDLENBQUM7QUFDM0QsVUFBUyxDQUFDLFNBQVMsQ0FBQyxJQUFJLEdBQUcsd0JBQUssTUFBTSxDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUMsQ0FBQztBQUN2RCxVQUFTLENBQUMsU0FBUyxDQUFDLEtBQUssR0FBRyx3QkFBSyxNQUFNLENBQUMsT0FBTyxFQUFFLE9BQU8sQ0FBQyxDQUFDO0FBQzFELFVBQVMsQ0FBQyxTQUFTLENBQUMsR0FBRyxHQUFHLHdCQUFLLE1BQU0sQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDLENBQUM7QUFDcEQsVUFBUyxDQUFDLFNBQVMsUUFBSyxHQUFHLHdCQUFLLE1BQU0sQ0FBQyxNQUFNLEVBQUUsTUFBTSxDQUFDLENBQUM7QUFDdkQsVUFBUyxDQUFDLFNBQVMsQ0FBQyxFQUFFLEdBQUcsd0JBQUssTUFBTSxDQUFDLElBQUksRUFBRSxNQUFNLENBQUMs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RixRQUFPLENBQUMsU0FBUyxDQUFDLEtBQUssR0FBRyxVQUFTLElBQUksRUFBRTs7O0FBQ3ZDLE9BQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsWUFBTTtBQUMvQixTQUFJLElBQUksR0FBRyxPQUFLLEtBQUssQ0FBQztBQUN0QixZQUFLLFVBQVUsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDN0IsU0FBSSxRQUFRLEtBQUssT0FBTyxPQUFLLFVBQVUsRUFBRTtBQUN2QyxhQUFNLElBQUksS0FBSyxDQUFDLHlDQUF5QyxDQUFDLENBQUM7TUFDNUQsTUFBTSxJQUFJLENBQUMsR0FBRyxPQUFLLFVBQVUsRUFBRTtBQUM5QixhQUFNLElBQUksS0FBSyxDQUFDLGdDQUFnQyxDQUFDLENBQUM7TUFDbkQ7SUFDRixDQUFDLENBQUM7RUFDSixDQUFDOzs7Ozs7O0FDaExGLG1CQUFrQix3RDs7Ozs7O0FDQWxCO0FBQ0E7QUFDQSwwQzs7Ozs7O0FDRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRyIsImZpbGUiOiJlZGRhLWRlbW8uZGlzdC5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRpZDogbW9kdWxlSWQsXG4gXHRcdFx0bG9hZGVkOiBmYWxzZVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogd2VicGFjay9ib290c3RyYXAgYWFlNWNjNTljMDhmNTMzZTU0NjlcbiAqKi8iLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCBBY3Rpb24gZnJvbSAnLi9hY3Rpb24uanMnO1xuaW1wb3J0IEVmZmVjdCBmcm9tICcuL2VmZmVjdC5qcyc7XG5cbnZhciBhY3Rpb24gPSBuZXcgQWN0aW9uKCk7XG5hY3Rpb24uc3RhcnQoKVxuICAubmV4dCgoY3R4KSA9PiB7IGNvbnNvbGUubG9nKCc+Pj4+Pj4+Pj4+ICMwOiAzIGFzIGEnLCAzKTsgY3R4LnJldHVybnMoMyk7IH0pLmFzKCdhJylcbiAgLnVudGlsKCh4KSA9PiB4ID09PSA5KVxuICAubG9vcCgoY3R4LCB4KSA9PiB7XG4gICAgY3R4LnJldHVybnMoeCArIDEpO1xuICB9KVxuICAudW50aWwoKHgpID0+IHggPT09IDkpXG4gIC5sb29wKChjdHgsIHgpID0+IHtcbiAgICBjb25zb2xlLmxvZygnPj4+Pj4+PiBJIHNob3VsZCBub3QgcnVuIScpO1xuICAgIGN0eC5yZXR1cm5zKHggKyAxKTtcbiAgfSlcbiAgLnVudGlsKCh4KSA9PiB4ID09PSAxMClcbiAgLmxvb3AoKGN0eCwgeCkgPT4ge1xuICAgIGNvbnNvbGUubG9nKCc+Pj4+Pj4+IEkgc2hvdWxkIHJ1biBvbmNlJyk7XG4gICAgY3R4LnJldHVybnMoeCArIDEpO1xuICB9KVxuICAubmV4dCgoY3R4LCB4KSA9PiB7IGNvbnNvbGUubG9nKCc+Pj4+Pj4+PiAjMTogKyA0IGFzIGInLCB4LCB4ICsgNCk7IGN0eC5yZXR1cm5zKHggKyA0KTt9KS5hcygnYicpXG4gIC5uZXh0KChjdHgpID0+IHtcbiAgICBjb25zb2xlLmxvZygnPj4+Pj4+Pj4+ICMgKyBhIGI6ICcsIGN0eC5hICsgY3R4LmIpO1xuICAgIGN0eC5yZXR1cm5zKGN0eC5hICsgY3R4LmIpO1xuICB9KVxuICAubWF0Y2goKVxuICAgIC5jYXNlKChuKSA9PiBuIDwgMTcpLnRvKChjdHgsIGEpID0+IHsgY3R4LnJldHVybnMoYSArIDEpO30pXG4gICAgLmNhc2UoKG4pID0+IG4gPiAxNyApLnRvKChjdHgsIGIpID0+IHsgY3R4LnJldHVybnMoYiArIDk5OSk7fSlcbiAgICAuY2FzZSgobikgPT4gbiA9PT0gMTcgKS50bygoY3R4LCBjKSA9PiB7XG4gICAgICBuZXcgUHJvbWlzZSgociwgaikgPT4ge1xuICAgICAgICBzZXRUaW1lb3V0KHIsIDIwMDApO1xuICAgICAgfSkudGhlbigoKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKCc+Pj4+Pj4+Pj4gIyBhZnRlciB3YWl0aW5nIDIgc2VjczsgKyAxOiAnLGMgLGMgKyAxKTtcbiAgICAgICAgY3R4LnJldHVybnMoYysxKTtcbiAgICAgIH0pO1xuICAgIH0pXG4gICAgLmNhc2UoKG4pID0+IG4gPT09IDE3ICkudG8oKGN0eCwgZCkgPT4ge1xuICAgICAgY3R4LnJldHVybnMoZCAtIDI1NSk7XG4gICAgfSlcbiAgLmVuZCgpXG4gIC5uZXh0KChjdHgsIHgpID0+IHsgY29uc29sZS5sb2coJz4+Pj4+Pj4+ICMgKyA1OicsIHgsIHggKyA1KTsgY3R4LnJldHVybnMoeCArIDUpO30pXG4gIC5hbGwoKGN0eCkgPT4ge2N0eC5yZXR1cm5zKDEpOyB9LFxuICAgICAgKGN0eCkgPT4ge1xuICAgICAgICBjdHgucmV0dXJucyhuZXcgUHJvbWlzZSgociwgaikgPT4ge1xuICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4geyByKDIwKTsgfSwgMTAwMCk7XG4gICAgICAgIH0pKTtcbiAgICAgIH0pXG4gIC5uZXh0KChjdHgsIHJzKSA9PiB7XG4gICAgY29uc29sZS5sb2coJz4+Pj4+Pj4+PiAjIGFmdGVyIHxhbGx8OiAnLCBycyk7XG4gICAgY3R4LnJldHVybnMocnMpO1xuICB9KVxuICAuYW55KChjdHgsIHJzKSA9PiB7Y3R4LnJldHVybnMocnNbMF0gKyByc1sxXSk7IH0sXG4gICAgICAoY3R4LCBycykgPT4ge1xuICAgICAgICBjdHgucmV0dXJucyhuZXcgUHJvbWlzZSgociwgaikgPT4ge1xuICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4geyByKHJzWzBdIC0gcnNbMV0pOyB9LCAxMDAwKTtcbiAgICAgICAgfSkpO1xuICAgICAgfSlcbiAgLm5leHQoKGN0eCwgcikgPT4ge1xuICAgIGNvbnNvbGUubG9nKCc+Pj4+Pj4+Pj4gIyBhZnRlciB8YW55fDsgcmVzZXQgYXMgWzEsIDIsIDNdOiAnLCByKTtcbiAgICBjdHgucmV0dXJucygxLCAyLCAzKTtcbiAgfSlcbiAgLm5leHQoKGN0eCwgcnMpID0+IHtcbiAgICBjb25zb2xlLmxvZygnPj4+Pj4+Pj4+ICMgcmV0dXJuIG11bHRpcGxlIHZhbHVlcyB3aWxsIGJlY29tZSBhcnJheTogJywgcnMpO1xuICAgIGN0eC5yZXR1cm5zKDEpO1xuICB9KVxuICAubmV4dCgoY3R4KSA9PiB7XG4gICAgY29uc29sZS5sb2coJz4+Pj4+IHRyeSB0byByYWlzZSBlcnJvciBvciBpbnRlcnJ1cHRpb24nKTtcbiAgICAvL2N0eC5yYWlzZSgnVFJZIFRPIFJBSVNFJyk7XG4gICAgY3R4LmludGVycnVwdCgzKTtcbiAgICAvLyBgaW50ZXJydXB0c2Agc2hvdWxkIGNhbmNlbCB0aGUgYHJldHVybnNgLlxuICAgIGN0eC5yZXR1cm5zKDMpO1xuICB9KVxuICAubmV4dCgoY3R4LCBycykgPT4ge1xuICAgIGNvbnNvbGUubG9nKCc+Pj4+Pj4+IHNob3VsZCBub3QgcnVuIScpO1xuICAgIGN0eC5yZXR1cm5zKDEpO1xuICB9KVxuICAubmV4dCgoY3R4LCBycykgPT4ge1xuICAgIGNvbnNvbGUubG9nKCc+Pj4+Pj4+IHNob3VsZCBub3QgcnVuIScpO1xuICAgIGN0eC5yZXR1cm5zKDEpO1xuICB9KVxuICAuZWZmZWN0KClcbiAgLnN0YXJ0KClcbiAgLnVudGlsKChkYXRhKSA9PiB7IGNvbnNvbGUubG9nKCc+Pj4+PiBkYXRhOiAnLCBkYXRhKTsgcmV0dXJuIDM7fSlcbiAgLmxvb3AoKGRhdGEpID0+IHtcbiAgICBjb25zb2xlLmxvZygnPj4+Pj4+PiB0ZXN0IGxvb3A7IGRhdGE6ICcsIGRhdGEpO1xuICB9KVxuICAubWF0Y2goKVxuICAgIC5jYXNlKChkYXRhKSA9PiBkYXRhID09PSAyKVxuICAgIC50bygoKSA9PiB7XG4gICAgICByZXR1cm4gKG5ldyBFZmZlY3QoKSkuc3RhcnQoKVxuICAgICAgICAudW50aWwoKCkgPT4gMilcbiAgICAgICAgLmxvb3AoKCkgPT4ge1xuICAgICAgICAgIGNvbnNvbGUubG9nKCc+Pj4+PiBmaXJzdCBjYXNlIGxvb3AnKTtcbiAgICAgICAgfSlcbiAgICAgICAgLmRvbmUoKTtcbiAgICB9KVxuICAgIC5jYXNlKChkYXRhKSA9PiBkYXRhID09PSAxKVxuICAgIC50bygoKSA9PiB7XG4gICAgICByZXR1cm4gKG5ldyBFZmZlY3QoKSkuc3RhcnQoKVxuICAgICAgICAudW50aWwoKCkgPT4gMilcbiAgICAgICAgLmxvb3AoKGRhdGEpID0+IHtcbiAgICAgICAgICBjb25zb2xlLmxvZygnPj4+Pj4gc2Vjb25kIGNhc2UgbG9vcCcsIGRhdGEpO1xuICAgICAgICB9KVxuICAgICAgICAuZG9uZSgpO1xuICAgIH0pXG4gICAgLmNhc2UoKGRhdGEpID0+IGRhdGEgPT09IDEpXG4gICAgLnRvKCgpID0+IHtcbiAgICAgIHJldHVybiAobmV3IEVmZmVjdCgpKS5zdGFydCgpXG4gICAgICAgIC51bnRpbCgoKSA9PiAyKVxuICAgICAgICAubG9vcCgoKSA9PiB7XG4gICAgICAgICAgY29uc29sZS5sb2coJz4+Pj4+IGR1cGxpY2F0ZWQgc2Vjb25kIGNhc2UgbG9vcCcpO1xuICAgICAgICB9KVxuICAgICAgICAuZG9uZSgpO1xuICAgIH0pXG4gIC5lbmQoKVxuICAudW50aWwoKGRhdGEpID0+IHsgY29uc29sZS5sb2coJz4+Pj4+IGRhdGE7IGdvIDQgaXRlcmF0aW9uczogJywgZGF0YSk7IHJldHVybiA0O30pXG4gIC5sb29wKCgpID0+IHtcbiAgICByZXR1cm4gKG5ldyBFZmZlY3QoKSkuc3RhcnQoKVxuICAgICAgLnVudGlsKCgpID0+IDIpXG4gICAgICAubG9vcCgoZGF0YSkgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZygnPj4+Pj4gbG9vcCBYIGxvb3AnLCBkYXRhKTtcbiAgICAgIH0pXG4gICAgICAubmV4dCgoKSA9PiB7IGNvbnNvbGUubG9nKCc+Pj4+IGlubmVyIGxvb3AgZG9uZScpO30gKVxuICAgICAgLmRvbmUoKTtcbiAgfSlcbiAgLnJ1bigpO1xuXG4vKlxuXG5mbiA9IChjdHgsIGEsIGIpID0+IHtcbiAgdmFyIHAgPSBuZXcgU3RhdGUoKVxuICBjdHgucmV0dXJucyhwLnN0YXJ0KCkubmV4dCgoY3R4KSA9PiB7XG4gICAgLy8gSXQncyBnb29kIHRvIHNoYWRvd2luZyB0aGUgb3V0ZXIgb25lLFxuICAgIC8vIHNpbmNlIHdlIGFscmVhZHkgYm9va2VkIHRvIHJldHVybiB0aGF0LlxuICAgIGN0eC5yZXR1cm5zKGEgKyBiKTtcbiAgfSkpO1xufTtcblxuLy8gRE9OVCBVU0U7IE5PVCBJTVBMRU1FTlRFRCBJTlRFTlRJT05BTExZXG5nbiA9IChjdHgsIGEsIGIpID0+IHtcbiAgdmFyIHAgPSBuZXcgU3RhdGUoKVxuICBjdHgucmV0dXJucyhuZXcgUHJvbWlzZSgociwgaikgPT4ge1xuICAgIHNldFRpbWVvdXQocihhIC0gYiksIDEwMDApO1xuICB9KS50aGVuKChyZXN1bHQpID0+IHtcbiAgICByZXR1cm4gcmVzdWx0ICsgMTtcbiAgfSkpO1xufTtcblxuaG4gPSAoY3R4LCBhLCBiKSA9PiB7XG4gIHZhciBwID0gbmV3IFN0YXRlKClcbiAgKG5ldyBQcm9taXNlKChyLCBqKSA9PiB7XG4gICAgc2V0VGltZW91dChyKGEgLSBiKSwgMTAwMCk7XG4gIH0pLnRoZW4oKHJlc3VsdCkgPT4ge1xuICAgIC8vIFVzZSBhIGNsb3N1cmUgdG8gcmV0dXJuIGl0LFxuICAgIC8vIGp1c3QgbGlrZSBvdGhlciBvcmRpbmFyeSBmdW5jdGlvbnMuXG4gICAgY3R4LnJldHVybnMocmVzdWx0ICsgMSk7XG4gIH0pO1xufTtcblxuICovXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL2VkZGEtZGVtby5qc1xuICoqLyIsIm1vZHVsZS5leHBvcnRzID0geyBcImRlZmF1bHRcIjogcmVxdWlyZShcImNvcmUtanMvbGlicmFyeS9mbi9wcm9taXNlXCIpLCBfX2VzTW9kdWxlOiB0cnVlIH07XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuLi9+L2JhYmVsLXJ1bnRpbWUvY29yZS1qcy9wcm9taXNlLmpzXG4gKiogbW9kdWxlIGlkID0gMVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwicmVxdWlyZSgnLi4vbW9kdWxlcy9lczYub2JqZWN0LnRvLXN0cmluZycpO1xucmVxdWlyZSgnLi4vbW9kdWxlcy9lczYuc3RyaW5nLml0ZXJhdG9yJyk7XG5yZXF1aXJlKCcuLi9tb2R1bGVzL3dlYi5kb20uaXRlcmFibGUnKTtcbnJlcXVpcmUoJy4uL21vZHVsZXMvZXM2LnByb21pc2UnKTtcbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi4vbW9kdWxlcy8kLmNvcmUnKS5Qcm9taXNlO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi4vfi9iYWJlbC1ydW50aW1lL34vY29yZS1qcy9saWJyYXJ5L2ZuL3Byb21pc2UuanNcbiAqKiBtb2R1bGUgaWQgPSAyXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIndXNlIHN0cmljdCc7XG52YXIgJGF0ICA9IHJlcXVpcmUoJy4vJC5zdHJpbmctYXQnKSh0cnVlKTtcblxuLy8gMjEuMS4zLjI3IFN0cmluZy5wcm90b3R5cGVbQEBpdGVyYXRvcl0oKVxucmVxdWlyZSgnLi8kLml0ZXItZGVmaW5lJykoU3RyaW5nLCAnU3RyaW5nJywgZnVuY3Rpb24oaXRlcmF0ZWQpe1xuICB0aGlzLl90ID0gU3RyaW5nKGl0ZXJhdGVkKTsgLy8gdGFyZ2V0XG4gIHRoaXMuX2kgPSAwOyAgICAgICAgICAgICAgICAvLyBuZXh0IGluZGV4XG4vLyAyMS4xLjUuMi4xICVTdHJpbmdJdGVyYXRvclByb3RvdHlwZSUubmV4dCgpXG59LCBmdW5jdGlvbigpe1xuICB2YXIgTyAgICAgPSB0aGlzLl90XG4gICAgLCBpbmRleCA9IHRoaXMuX2lcbiAgICAsIHBvaW50O1xuICBpZihpbmRleCA+PSBPLmxlbmd0aClyZXR1cm4ge3ZhbHVlOiB1bmRlZmluZWQsIGRvbmU6IHRydWV9O1xuICBwb2ludCA9ICRhdChPLCBpbmRleCk7XG4gIHRoaXMuX2kgKz0gcG9pbnQubGVuZ3RoO1xuICByZXR1cm4ge3ZhbHVlOiBwb2ludCwgZG9uZTogZmFsc2V9O1xufSk7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuLi9+L2JhYmVsLXJ1bnRpbWUvfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczYuc3RyaW5nLml0ZXJhdG9yLmpzXG4gKiogbW9kdWxlIGlkID0gNFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiLy8gdHJ1ZSAgLT4gU3RyaW5nI2F0XG4vLyBmYWxzZSAtPiBTdHJpbmcjY29kZVBvaW50QXRcbnZhciB0b0ludGVnZXIgPSByZXF1aXJlKCcuLyQudG8taW50ZWdlcicpXG4gICwgZGVmaW5lZCAgID0gcmVxdWlyZSgnLi8kLmRlZmluZWQnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oVE9fU1RSSU5HKXtcbiAgcmV0dXJuIGZ1bmN0aW9uKHRoYXQsIHBvcyl7XG4gICAgdmFyIHMgPSBTdHJpbmcoZGVmaW5lZCh0aGF0KSlcbiAgICAgICwgaSA9IHRvSW50ZWdlcihwb3MpXG4gICAgICAsIGwgPSBzLmxlbmd0aFxuICAgICAgLCBhLCBiO1xuICAgIGlmKGkgPCAwIHx8IGkgPj0gbClyZXR1cm4gVE9fU1RSSU5HID8gJycgOiB1bmRlZmluZWQ7XG4gICAgYSA9IHMuY2hhckNvZGVBdChpKTtcbiAgICByZXR1cm4gYSA8IDB4ZDgwMCB8fCBhID4gMHhkYmZmIHx8IGkgKyAxID09PSBsXG4gICAgICB8fCAoYiA9IHMuY2hhckNvZGVBdChpICsgMSkpIDwgMHhkYzAwIHx8IGIgPiAweGRmZmZcbiAgICAgICAgPyBUT19TVFJJTkcgPyBzLmNoYXJBdChpKSA6IGFcbiAgICAgICAgOiBUT19TVFJJTkcgPyBzLnNsaWNlKGksIGkgKyAyKSA6IChhIC0gMHhkODAwIDw8IDEwKSArIChiIC0gMHhkYzAwKSArIDB4MTAwMDA7XG4gIH07XG59O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi4vfi9iYWJlbC1ydW50aW1lL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvJC5zdHJpbmctYXQuanNcbiAqKiBtb2R1bGUgaWQgPSA1XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIvLyA3LjEuNCBUb0ludGVnZXJcbnZhciBjZWlsICA9IE1hdGguY2VpbFxuICAsIGZsb29yID0gTWF0aC5mbG9vcjtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXQpe1xuICByZXR1cm4gaXNOYU4oaXQgPSAraXQpID8gMCA6IChpdCA+IDAgPyBmbG9vciA6IGNlaWwpKGl0KTtcbn07XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuLi9+L2JhYmVsLXJ1bnRpbWUvfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy8kLnRvLWludGVnZXIuanNcbiAqKiBtb2R1bGUgaWQgPSA2XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIvLyA3LjIuMSBSZXF1aXJlT2JqZWN0Q29lcmNpYmxlKGFyZ3VtZW50KVxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCl7XG4gIGlmKGl0ID09IHVuZGVmaW5lZCl0aHJvdyBUeXBlRXJyb3IoXCJDYW4ndCBjYWxsIG1ldGhvZCBvbiAgXCIgKyBpdCk7XG4gIHJldHVybiBpdDtcbn07XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuLi9+L2JhYmVsLXJ1bnRpbWUvfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy8kLmRlZmluZWQuanNcbiAqKiBtb2R1bGUgaWQgPSA3XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIndXNlIHN0cmljdCc7XG52YXIgTElCUkFSWSAgICAgICAgID0gcmVxdWlyZSgnLi8kLmxpYnJhcnknKVxuICAsICRkZWYgICAgICAgICAgICA9IHJlcXVpcmUoJy4vJC5kZWYnKVxuICAsICRyZWRlZiAgICAgICAgICA9IHJlcXVpcmUoJy4vJC5yZWRlZicpXG4gICwgaGlkZSAgICAgICAgICAgID0gcmVxdWlyZSgnLi8kLmhpZGUnKVxuICAsIGhhcyAgICAgICAgICAgICA9IHJlcXVpcmUoJy4vJC5oYXMnKVxuICAsIFNZTUJPTF9JVEVSQVRPUiA9IHJlcXVpcmUoJy4vJC53a3MnKSgnaXRlcmF0b3InKVxuICAsIEl0ZXJhdG9ycyAgICAgICA9IHJlcXVpcmUoJy4vJC5pdGVyYXRvcnMnKVxuICAsIEZGX0lURVJBVE9SICAgICA9ICdAQGl0ZXJhdG9yJ1xuICAsIEtFWVMgICAgICAgICAgICA9ICdrZXlzJ1xuICAsIFZBTFVFUyAgICAgICAgICA9ICd2YWx1ZXMnO1xudmFyIHJldHVyblRoaXMgPSBmdW5jdGlvbigpeyByZXR1cm4gdGhpczsgfTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oQmFzZSwgTkFNRSwgQ29uc3RydWN0b3IsIG5leHQsIERFRkFVTFQsIElTX1NFVCwgRk9SQ0Upe1xuICByZXF1aXJlKCcuLyQuaXRlci1jcmVhdGUnKShDb25zdHJ1Y3RvciwgTkFNRSwgbmV4dCk7XG4gIHZhciBjcmVhdGVNZXRob2QgPSBmdW5jdGlvbihraW5kKXtcbiAgICBzd2l0Y2goa2luZCl7XG4gICAgICBjYXNlIEtFWVM6IHJldHVybiBmdW5jdGlvbiBrZXlzKCl7IHJldHVybiBuZXcgQ29uc3RydWN0b3IodGhpcywga2luZCk7IH07XG4gICAgICBjYXNlIFZBTFVFUzogcmV0dXJuIGZ1bmN0aW9uIHZhbHVlcygpeyByZXR1cm4gbmV3IENvbnN0cnVjdG9yKHRoaXMsIGtpbmQpOyB9O1xuICAgIH0gcmV0dXJuIGZ1bmN0aW9uIGVudHJpZXMoKXsgcmV0dXJuIG5ldyBDb25zdHJ1Y3Rvcih0aGlzLCBraW5kKTsgfTtcbiAgfTtcbiAgdmFyIFRBRyAgICAgID0gTkFNRSArICcgSXRlcmF0b3InXG4gICAgLCBwcm90byAgICA9IEJhc2UucHJvdG90eXBlXG4gICAgLCBfbmF0aXZlICA9IHByb3RvW1NZTUJPTF9JVEVSQVRPUl0gfHwgcHJvdG9bRkZfSVRFUkFUT1JdIHx8IERFRkFVTFQgJiYgcHJvdG9bREVGQVVMVF1cbiAgICAsIF9kZWZhdWx0ID0gX25hdGl2ZSB8fCBjcmVhdGVNZXRob2QoREVGQVVMVClcbiAgICAsIG1ldGhvZHMsIGtleTtcbiAgLy8gRml4IG5hdGl2ZVxuICBpZihfbmF0aXZlKXtcbiAgICB2YXIgSXRlcmF0b3JQcm90b3R5cGUgPSByZXF1aXJlKCcuLyQnKS5nZXRQcm90byhfZGVmYXVsdC5jYWxsKG5ldyBCYXNlKSk7XG4gICAgLy8gU2V0IEBAdG9TdHJpbmdUYWcgdG8gbmF0aXZlIGl0ZXJhdG9yc1xuICAgIHJlcXVpcmUoJy4vJC50YWcnKShJdGVyYXRvclByb3RvdHlwZSwgVEFHLCB0cnVlKTtcbiAgICAvLyBGRiBmaXhcbiAgICBpZighTElCUkFSWSAmJiBoYXMocHJvdG8sIEZGX0lURVJBVE9SKSloaWRlKEl0ZXJhdG9yUHJvdG90eXBlLCBTWU1CT0xfSVRFUkFUT1IsIHJldHVyblRoaXMpO1xuICB9XG4gIC8vIERlZmluZSBpdGVyYXRvclxuICBpZighTElCUkFSWSB8fCBGT1JDRSloaWRlKHByb3RvLCBTWU1CT0xfSVRFUkFUT1IsIF9kZWZhdWx0KTtcbiAgLy8gUGx1ZyBmb3IgbGlicmFyeVxuICBJdGVyYXRvcnNbTkFNRV0gPSBfZGVmYXVsdDtcbiAgSXRlcmF0b3JzW1RBR10gID0gcmV0dXJuVGhpcztcbiAgaWYoREVGQVVMVCl7XG4gICAgbWV0aG9kcyA9IHtcbiAgICAgIGtleXM6ICAgIElTX1NFVCAgICAgICAgICAgID8gX2RlZmF1bHQgOiBjcmVhdGVNZXRob2QoS0VZUyksXG4gICAgICB2YWx1ZXM6ICBERUZBVUxUID09IFZBTFVFUyA/IF9kZWZhdWx0IDogY3JlYXRlTWV0aG9kKFZBTFVFUyksXG4gICAgICBlbnRyaWVzOiBERUZBVUxUICE9IFZBTFVFUyA/IF9kZWZhdWx0IDogY3JlYXRlTWV0aG9kKCdlbnRyaWVzJylcbiAgICB9O1xuICAgIGlmKEZPUkNFKWZvcihrZXkgaW4gbWV0aG9kcyl7XG4gICAgICBpZighKGtleSBpbiBwcm90bykpJHJlZGVmKHByb3RvLCBrZXksIG1ldGhvZHNba2V5XSk7XG4gICAgfSBlbHNlICRkZWYoJGRlZi5QICsgJGRlZi5GICogcmVxdWlyZSgnLi8kLml0ZXItYnVnZ3knKSwgTkFNRSwgbWV0aG9kcyk7XG4gIH1cbn07XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuLi9+L2JhYmVsLXJ1bnRpbWUvfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy8kLml0ZXItZGVmaW5lLmpzXG4gKiogbW9kdWxlIGlkID0gOFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSB0cnVlO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi4vfi9iYWJlbC1ydW50aW1lL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvJC5saWJyYXJ5LmpzXG4gKiogbW9kdWxlIGlkID0gOVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwidmFyIGdsb2JhbCAgICA9IHJlcXVpcmUoJy4vJC5nbG9iYWwnKVxuICAsIGNvcmUgICAgICA9IHJlcXVpcmUoJy4vJC5jb3JlJylcbiAgLCBQUk9UT1RZUEUgPSAncHJvdG90eXBlJztcbnZhciBjdHggPSBmdW5jdGlvbihmbiwgdGhhdCl7XG4gIHJldHVybiBmdW5jdGlvbigpe1xuICAgIHJldHVybiBmbi5hcHBseSh0aGF0LCBhcmd1bWVudHMpO1xuICB9O1xufTtcbnZhciAkZGVmID0gZnVuY3Rpb24odHlwZSwgbmFtZSwgc291cmNlKXtcbiAgdmFyIGtleSwgb3duLCBvdXQsIGV4cFxuICAgICwgaXNHbG9iYWwgPSB0eXBlICYgJGRlZi5HXG4gICAgLCBpc1Byb3RvICA9IHR5cGUgJiAkZGVmLlBcbiAgICAsIHRhcmdldCAgID0gaXNHbG9iYWwgPyBnbG9iYWwgOiB0eXBlICYgJGRlZi5TXG4gICAgICAgID8gZ2xvYmFsW25hbWVdIDogKGdsb2JhbFtuYW1lXSB8fCB7fSlbUFJPVE9UWVBFXVxuICAgICwgZXhwb3J0cyAgPSBpc0dsb2JhbCA/IGNvcmUgOiBjb3JlW25hbWVdIHx8IChjb3JlW25hbWVdID0ge30pO1xuICBpZihpc0dsb2JhbClzb3VyY2UgPSBuYW1lO1xuICBmb3Ioa2V5IGluIHNvdXJjZSl7XG4gICAgLy8gY29udGFpbnMgaW4gbmF0aXZlXG4gICAgb3duID0gISh0eXBlICYgJGRlZi5GKSAmJiB0YXJnZXQgJiYga2V5IGluIHRhcmdldDtcbiAgICBpZihvd24gJiYga2V5IGluIGV4cG9ydHMpY29udGludWU7XG4gICAgLy8gZXhwb3J0IG5hdGl2ZSBvciBwYXNzZWRcbiAgICBvdXQgPSBvd24gPyB0YXJnZXRba2V5XSA6IHNvdXJjZVtrZXldO1xuICAgIC8vIHByZXZlbnQgZ2xvYmFsIHBvbGx1dGlvbiBmb3IgbmFtZXNwYWNlc1xuICAgIGlmKGlzR2xvYmFsICYmIHR5cGVvZiB0YXJnZXRba2V5XSAhPSAnZnVuY3Rpb24nKWV4cCA9IHNvdXJjZVtrZXldO1xuICAgIC8vIGJpbmQgdGltZXJzIHRvIGdsb2JhbCBmb3IgY2FsbCBmcm9tIGV4cG9ydCBjb250ZXh0XG4gICAgZWxzZSBpZih0eXBlICYgJGRlZi5CICYmIG93billeHAgPSBjdHgob3V0LCBnbG9iYWwpO1xuICAgIC8vIHdyYXAgZ2xvYmFsIGNvbnN0cnVjdG9ycyBmb3IgcHJldmVudCBjaGFuZ2UgdGhlbSBpbiBsaWJyYXJ5XG4gICAgZWxzZSBpZih0eXBlICYgJGRlZi5XICYmIHRhcmdldFtrZXldID09IG91dCkhZnVuY3Rpb24oQyl7XG4gICAgICBleHAgPSBmdW5jdGlvbihwYXJhbSl7XG4gICAgICAgIHJldHVybiB0aGlzIGluc3RhbmNlb2YgQyA/IG5ldyBDKHBhcmFtKSA6IEMocGFyYW0pO1xuICAgICAgfTtcbiAgICAgIGV4cFtQUk9UT1RZUEVdID0gQ1tQUk9UT1RZUEVdO1xuICAgIH0ob3V0KTtcbiAgICBlbHNlIGV4cCA9IGlzUHJvdG8gJiYgdHlwZW9mIG91dCA9PSAnZnVuY3Rpb24nID8gY3R4KEZ1bmN0aW9uLmNhbGwsIG91dCkgOiBvdXQ7XG4gICAgLy8gZXhwb3J0XG4gICAgZXhwb3J0c1trZXldID0gZXhwO1xuICAgIGlmKGlzUHJvdG8pKGV4cG9ydHNbUFJPVE9UWVBFXSB8fCAoZXhwb3J0c1tQUk9UT1RZUEVdID0ge30pKVtrZXldID0gb3V0O1xuICB9XG59O1xuLy8gdHlwZSBiaXRtYXBcbiRkZWYuRiA9IDE7ICAvLyBmb3JjZWRcbiRkZWYuRyA9IDI7ICAvLyBnbG9iYWxcbiRkZWYuUyA9IDQ7ICAvLyBzdGF0aWNcbiRkZWYuUCA9IDg7ICAvLyBwcm90b1xuJGRlZi5CID0gMTY7IC8vIGJpbmRcbiRkZWYuVyA9IDMyOyAvLyB3cmFwXG5tb2R1bGUuZXhwb3J0cyA9ICRkZWY7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuLi9+L2JhYmVsLXJ1bnRpbWUvfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy8kLmRlZi5qc1xuICoqIG1vZHVsZSBpZCA9IDEwXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJ2YXIgZ2xvYmFsID0gdHlwZW9mIHNlbGYgIT0gJ3VuZGVmaW5lZCcgJiYgc2VsZi5NYXRoID09IE1hdGggPyBzZWxmIDogRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcbm1vZHVsZS5leHBvcnRzID0gZ2xvYmFsO1xuaWYodHlwZW9mIF9fZyA9PSAnbnVtYmVyJylfX2cgPSBnbG9iYWw7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW5kZWZcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4uL34vYmFiZWwtcnVudGltZS9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzLyQuZ2xvYmFsLmpzXG4gKiogbW9kdWxlIGlkID0gMTFcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsInZhciBjb3JlID0gbW9kdWxlLmV4cG9ydHMgPSB7fTtcbmlmKHR5cGVvZiBfX2UgPT0gJ251bWJlcicpX19lID0gY29yZTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bmRlZlxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi4vfi9iYWJlbC1ydW50aW1lL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvJC5jb3JlLmpzXG4gKiogbW9kdWxlIGlkID0gMTJcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi8kLmhpZGUnKTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4uL34vYmFiZWwtcnVudGltZS9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzLyQucmVkZWYuanNcbiAqKiBtb2R1bGUgaWQgPSAxM1xuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwidmFyICQgICAgICAgICAgPSByZXF1aXJlKCcuLyQnKVxuICAsIGNyZWF0ZURlc2MgPSByZXF1aXJlKCcuLyQucHJvcGVydHktZGVzYycpO1xubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuLyQuc3VwcG9ydC1kZXNjJykgPyBmdW5jdGlvbihvYmplY3QsIGtleSwgdmFsdWUpe1xuICByZXR1cm4gJC5zZXREZXNjKG9iamVjdCwga2V5LCBjcmVhdGVEZXNjKDEsIHZhbHVlKSk7XG59IDogZnVuY3Rpb24ob2JqZWN0LCBrZXksIHZhbHVlKXtcbiAgb2JqZWN0W2tleV0gPSB2YWx1ZTtcbiAgcmV0dXJuIG9iamVjdDtcbn07XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuLi9+L2JhYmVsLXJ1bnRpbWUvfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy8kLmhpZGUuanNcbiAqKiBtb2R1bGUgaWQgPSAxNFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwidmFyICRPYmplY3QgPSBPYmplY3Q7XG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgY3JlYXRlOiAgICAgJE9iamVjdC5jcmVhdGUsXG4gIGdldFByb3RvOiAgICRPYmplY3QuZ2V0UHJvdG90eXBlT2YsXG4gIGlzRW51bTogICAgIHt9LnByb3BlcnR5SXNFbnVtZXJhYmxlLFxuICBnZXREZXNjOiAgICAkT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcixcbiAgc2V0RGVzYzogICAgJE9iamVjdC5kZWZpbmVQcm9wZXJ0eSxcbiAgc2V0RGVzY3M6ICAgJE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzLFxuICBnZXRLZXlzOiAgICAkT2JqZWN0LmtleXMsXG4gIGdldE5hbWVzOiAgICRPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyxcbiAgZ2V0U3ltYm9sczogJE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMsXG4gIGVhY2g6ICAgICAgIFtdLmZvckVhY2hcbn07XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuLi9+L2JhYmVsLXJ1bnRpbWUvfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy8kLmpzXG4gKiogbW9kdWxlIGlkID0gMTVcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oYml0bWFwLCB2YWx1ZSl7XG4gIHJldHVybiB7XG4gICAgZW51bWVyYWJsZSAgOiAhKGJpdG1hcCAmIDEpLFxuICAgIGNvbmZpZ3VyYWJsZTogIShiaXRtYXAgJiAyKSxcbiAgICB3cml0YWJsZSAgICA6ICEoYml0bWFwICYgNCksXG4gICAgdmFsdWUgICAgICAgOiB2YWx1ZVxuICB9O1xufTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4uL34vYmFiZWwtcnVudGltZS9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzLyQucHJvcGVydHktZGVzYy5qc1xuICoqIG1vZHVsZSBpZCA9IDE2XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIvLyBUaGFuaydzIElFOCBmb3IgaGlzIGZ1bm55IGRlZmluZVByb3BlcnR5XG5tb2R1bGUuZXhwb3J0cyA9ICFyZXF1aXJlKCcuLyQuZmFpbHMnKShmdW5jdGlvbigpe1xuICByZXR1cm4gT2JqZWN0LmRlZmluZVByb3BlcnR5KHt9LCAnYScsIHtnZXQ6IGZ1bmN0aW9uKCl7IHJldHVybiA3OyB9fSkuYSAhPSA3O1xufSk7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuLi9+L2JhYmVsLXJ1bnRpbWUvfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy8kLnN1cHBvcnQtZGVzYy5qc1xuICoqIG1vZHVsZSBpZCA9IDE3XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGV4ZWMpe1xuICB0cnkge1xuICAgIHJldHVybiAhIWV4ZWMoKTtcbiAgfSBjYXRjaChlKXtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxufTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4uL34vYmFiZWwtcnVudGltZS9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzLyQuZmFpbHMuanNcbiAqKiBtb2R1bGUgaWQgPSAxOFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwidmFyIGhhc093blByb3BlcnR5ID0ge30uaGFzT3duUHJvcGVydHk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0LCBrZXkpe1xuICByZXR1cm4gaGFzT3duUHJvcGVydHkuY2FsbChpdCwga2V5KTtcbn07XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuLi9+L2JhYmVsLXJ1bnRpbWUvfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy8kLmhhcy5qc1xuICoqIG1vZHVsZSBpZCA9IDE5XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJ2YXIgc3RvcmUgID0gcmVxdWlyZSgnLi8kLnNoYXJlZCcpKCd3a3MnKVxuICAsIFN5bWJvbCA9IHJlcXVpcmUoJy4vJC5nbG9iYWwnKS5TeW1ib2w7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKG5hbWUpe1xuICByZXR1cm4gc3RvcmVbbmFtZV0gfHwgKHN0b3JlW25hbWVdID1cbiAgICBTeW1ib2wgJiYgU3ltYm9sW25hbWVdIHx8IChTeW1ib2wgfHwgcmVxdWlyZSgnLi8kLnVpZCcpKSgnU3ltYm9sLicgKyBuYW1lKSk7XG59O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi4vfi9iYWJlbC1ydW50aW1lL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvJC53a3MuanNcbiAqKiBtb2R1bGUgaWQgPSAyMFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwidmFyIGdsb2JhbCA9IHJlcXVpcmUoJy4vJC5nbG9iYWwnKVxuICAsIFNIQVJFRCA9ICdfX2NvcmUtanNfc2hhcmVkX18nXG4gICwgc3RvcmUgID0gZ2xvYmFsW1NIQVJFRF0gfHwgKGdsb2JhbFtTSEFSRURdID0ge30pO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihrZXkpe1xuICByZXR1cm4gc3RvcmVba2V5XSB8fCAoc3RvcmVba2V5XSA9IHt9KTtcbn07XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuLi9+L2JhYmVsLXJ1bnRpbWUvfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy8kLnNoYXJlZC5qc1xuICoqIG1vZHVsZSBpZCA9IDIxXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJ2YXIgaWQgPSAwXG4gICwgcHggPSBNYXRoLnJhbmRvbSgpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihrZXkpe1xuICByZXR1cm4gJ1N5bWJvbCgnLmNvbmNhdChrZXkgPT09IHVuZGVmaW5lZCA/ICcnIDoga2V5LCAnKV8nLCAoKytpZCArIHB4KS50b1N0cmluZygzNikpO1xufTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4uL34vYmFiZWwtcnVudGltZS9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzLyQudWlkLmpzXG4gKiogbW9kdWxlIGlkID0gMjJcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIm1vZHVsZS5leHBvcnRzID0ge307XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuLi9+L2JhYmVsLXJ1bnRpbWUvfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy8kLml0ZXJhdG9ycy5qc1xuICoqIG1vZHVsZSBpZCA9IDIzXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIndXNlIHN0cmljdCc7XG52YXIgJCA9IHJlcXVpcmUoJy4vJCcpXG4gICwgSXRlcmF0b3JQcm90b3R5cGUgPSB7fTtcblxuLy8gMjUuMS4yLjEuMSAlSXRlcmF0b3JQcm90b3R5cGUlW0BAaXRlcmF0b3JdKClcbnJlcXVpcmUoJy4vJC5oaWRlJykoSXRlcmF0b3JQcm90b3R5cGUsIHJlcXVpcmUoJy4vJC53a3MnKSgnaXRlcmF0b3InKSwgZnVuY3Rpb24oKXsgcmV0dXJuIHRoaXM7IH0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKENvbnN0cnVjdG9yLCBOQU1FLCBuZXh0KXtcbiAgQ29uc3RydWN0b3IucHJvdG90eXBlID0gJC5jcmVhdGUoSXRlcmF0b3JQcm90b3R5cGUsIHtuZXh0OiByZXF1aXJlKCcuLyQucHJvcGVydHktZGVzYycpKDEsbmV4dCl9KTtcbiAgcmVxdWlyZSgnLi8kLnRhZycpKENvbnN0cnVjdG9yLCBOQU1FICsgJyBJdGVyYXRvcicpO1xufTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4uL34vYmFiZWwtcnVudGltZS9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzLyQuaXRlci1jcmVhdGUuanNcbiAqKiBtb2R1bGUgaWQgPSAyNFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwidmFyIGhhcyAgPSByZXF1aXJlKCcuLyQuaGFzJylcbiAgLCBoaWRlID0gcmVxdWlyZSgnLi8kLmhpZGUnKVxuICAsIFRBRyAgPSByZXF1aXJlKCcuLyQud2tzJykoJ3RvU3RyaW5nVGFnJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXQsIHRhZywgc3RhdCl7XG4gIGlmKGl0ICYmICFoYXMoaXQgPSBzdGF0ID8gaXQgOiBpdC5wcm90b3R5cGUsIFRBRykpaGlkZShpdCwgVEFHLCB0YWcpO1xufTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4uL34vYmFiZWwtcnVudGltZS9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzLyQudGFnLmpzXG4gKiogbW9kdWxlIGlkID0gMjVcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIi8vIFNhZmFyaSBoYXMgYnVnZ3kgaXRlcmF0b3JzIHcvbyBgbmV4dGBcbm1vZHVsZS5leHBvcnRzID0gJ2tleXMnIGluIFtdICYmICEoJ25leHQnIGluIFtdLmtleXMoKSk7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuLi9+L2JhYmVsLXJ1bnRpbWUvfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy8kLml0ZXItYnVnZ3kuanNcbiAqKiBtb2R1bGUgaWQgPSAyNlxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwicmVxdWlyZSgnLi9lczYuYXJyYXkuaXRlcmF0b3InKTtcbnZhciBJdGVyYXRvcnMgPSByZXF1aXJlKCcuLyQuaXRlcmF0b3JzJyk7XG5JdGVyYXRvcnMuTm9kZUxpc3QgPSBJdGVyYXRvcnMuSFRNTENvbGxlY3Rpb24gPSBJdGVyYXRvcnMuQXJyYXk7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuLi9+L2JhYmVsLXJ1bnRpbWUvfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy93ZWIuZG9tLml0ZXJhYmxlLmpzXG4gKiogbW9kdWxlIGlkID0gMjdcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIid1c2Ugc3RyaWN0JztcbnZhciBzZXRVbnNjb3BlID0gcmVxdWlyZSgnLi8kLnVuc2NvcGUnKVxuICAsIHN0ZXAgICAgICAgPSByZXF1aXJlKCcuLyQuaXRlci1zdGVwJylcbiAgLCBJdGVyYXRvcnMgID0gcmVxdWlyZSgnLi8kLml0ZXJhdG9ycycpXG4gICwgdG9JT2JqZWN0ICA9IHJlcXVpcmUoJy4vJC50by1pb2JqZWN0Jyk7XG5cbi8vIDIyLjEuMy40IEFycmF5LnByb3RvdHlwZS5lbnRyaWVzKClcbi8vIDIyLjEuMy4xMyBBcnJheS5wcm90b3R5cGUua2V5cygpXG4vLyAyMi4xLjMuMjkgQXJyYXkucHJvdG90eXBlLnZhbHVlcygpXG4vLyAyMi4xLjMuMzAgQXJyYXkucHJvdG90eXBlW0BAaXRlcmF0b3JdKClcbnJlcXVpcmUoJy4vJC5pdGVyLWRlZmluZScpKEFycmF5LCAnQXJyYXknLCBmdW5jdGlvbihpdGVyYXRlZCwga2luZCl7XG4gIHRoaXMuX3QgPSB0b0lPYmplY3QoaXRlcmF0ZWQpOyAvLyB0YXJnZXRcbiAgdGhpcy5faSA9IDA7ICAgICAgICAgICAgICAgICAgIC8vIG5leHQgaW5kZXhcbiAgdGhpcy5fayA9IGtpbmQ7ICAgICAgICAgICAgICAgIC8vIGtpbmRcbi8vIDIyLjEuNS4yLjEgJUFycmF5SXRlcmF0b3JQcm90b3R5cGUlLm5leHQoKVxufSwgZnVuY3Rpb24oKXtcbiAgdmFyIE8gICAgID0gdGhpcy5fdFxuICAgICwga2luZCAgPSB0aGlzLl9rXG4gICAgLCBpbmRleCA9IHRoaXMuX2krKztcbiAgaWYoIU8gfHwgaW5kZXggPj0gTy5sZW5ndGgpe1xuICAgIHRoaXMuX3QgPSB1bmRlZmluZWQ7XG4gICAgcmV0dXJuIHN0ZXAoMSk7XG4gIH1cbiAgaWYoa2luZCA9PSAna2V5cycgIClyZXR1cm4gc3RlcCgwLCBpbmRleCk7XG4gIGlmKGtpbmQgPT0gJ3ZhbHVlcycpcmV0dXJuIHN0ZXAoMCwgT1tpbmRleF0pO1xuICByZXR1cm4gc3RlcCgwLCBbaW5kZXgsIE9baW5kZXhdXSk7XG59LCAndmFsdWVzJyk7XG5cbi8vIGFyZ3VtZW50c0xpc3RbQEBpdGVyYXRvcl0gaXMgJUFycmF5UHJvdG9fdmFsdWVzJSAoOS40LjQuNiwgOS40LjQuNylcbkl0ZXJhdG9ycy5Bcmd1bWVudHMgPSBJdGVyYXRvcnMuQXJyYXk7XG5cbnNldFVuc2NvcGUoJ2tleXMnKTtcbnNldFVuc2NvcGUoJ3ZhbHVlcycpO1xuc2V0VW5zY29wZSgnZW50cmllcycpO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi4vfi9iYWJlbC1ydW50aW1lL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM2LmFycmF5Lml0ZXJhdG9yLmpzXG4gKiogbW9kdWxlIGlkID0gMjhcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oKXsgLyogZW1wdHkgKi8gfTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4uL34vYmFiZWwtcnVudGltZS9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzLyQudW5zY29wZS5qc1xuICoqIG1vZHVsZSBpZCA9IDI5XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGRvbmUsIHZhbHVlKXtcbiAgcmV0dXJuIHt2YWx1ZTogdmFsdWUsIGRvbmU6ICEhZG9uZX07XG59O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi4vfi9iYWJlbC1ydW50aW1lL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvJC5pdGVyLXN0ZXAuanNcbiAqKiBtb2R1bGUgaWQgPSAzMFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiLy8gdG8gaW5kZXhlZCBvYmplY3QsIHRvT2JqZWN0IHdpdGggZmFsbGJhY2sgZm9yIG5vbi1hcnJheS1saWtlIEVTMyBzdHJpbmdzXHJcbnZhciBJT2JqZWN0ID0gcmVxdWlyZSgnLi8kLmlvYmplY3QnKVxyXG4gICwgZGVmaW5lZCA9IHJlcXVpcmUoJy4vJC5kZWZpbmVkJyk7XHJcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXQpe1xyXG4gIHJldHVybiBJT2JqZWN0KGRlZmluZWQoaXQpKTtcclxufTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4uL34vYmFiZWwtcnVudGltZS9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzLyQudG8taW9iamVjdC5qc1xuICoqIG1vZHVsZSBpZCA9IDMxXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIvLyBpbmRleGVkIG9iamVjdCwgZmFsbGJhY2sgZm9yIG5vbi1hcnJheS1saWtlIEVTMyBzdHJpbmdzXG52YXIgY29mID0gcmVxdWlyZSgnLi8kLmNvZicpO1xubW9kdWxlLmV4cG9ydHMgPSAwIGluIE9iamVjdCgneicpID8gT2JqZWN0IDogZnVuY3Rpb24oaXQpe1xuICByZXR1cm4gY29mKGl0KSA9PSAnU3RyaW5nJyA/IGl0LnNwbGl0KCcnKSA6IE9iamVjdChpdCk7XG59O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi4vfi9iYWJlbC1ydW50aW1lL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvJC5pb2JqZWN0LmpzXG4gKiogbW9kdWxlIGlkID0gMzJcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsInZhciB0b1N0cmluZyA9IHt9LnRvU3RyaW5nO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0KXtcbiAgcmV0dXJuIHRvU3RyaW5nLmNhbGwoaXQpLnNsaWNlKDgsIC0xKTtcbn07XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuLi9+L2JhYmVsLXJ1bnRpbWUvfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy8kLmNvZi5qc1xuICoqIG1vZHVsZSBpZCA9IDMzXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIndXNlIHN0cmljdCc7XG52YXIgJCAgICAgICAgICA9IHJlcXVpcmUoJy4vJCcpXG4gICwgTElCUkFSWSAgICA9IHJlcXVpcmUoJy4vJC5saWJyYXJ5JylcbiAgLCBnbG9iYWwgICAgID0gcmVxdWlyZSgnLi8kLmdsb2JhbCcpXG4gICwgY3R4ICAgICAgICA9IHJlcXVpcmUoJy4vJC5jdHgnKVxuICAsIGNsYXNzb2YgICAgPSByZXF1aXJlKCcuLyQuY2xhc3NvZicpXG4gICwgJGRlZiAgICAgICA9IHJlcXVpcmUoJy4vJC5kZWYnKVxuICAsIGlzT2JqZWN0ICAgPSByZXF1aXJlKCcuLyQuaXMtb2JqZWN0JylcbiAgLCBhbk9iamVjdCAgID0gcmVxdWlyZSgnLi8kLmFuLW9iamVjdCcpXG4gICwgYUZ1bmN0aW9uICA9IHJlcXVpcmUoJy4vJC5hLWZ1bmN0aW9uJylcbiAgLCBzdHJpY3ROZXcgID0gcmVxdWlyZSgnLi8kLnN0cmljdC1uZXcnKVxuICAsIGZvck9mICAgICAgPSByZXF1aXJlKCcuLyQuZm9yLW9mJylcbiAgLCBzZXRQcm90byAgID0gcmVxdWlyZSgnLi8kLnNldC1wcm90bycpLnNldFxuICAsIHNhbWUgICAgICAgPSByZXF1aXJlKCcuLyQuc2FtZScpXG4gICwgc3BlY2llcyAgICA9IHJlcXVpcmUoJy4vJC5zcGVjaWVzJylcbiAgLCBTUEVDSUVTICAgID0gcmVxdWlyZSgnLi8kLndrcycpKCdzcGVjaWVzJylcbiAgLCBSRUNPUkQgICAgID0gcmVxdWlyZSgnLi8kLnVpZCcpKCdyZWNvcmQnKVxuICAsIGFzYXAgICAgICAgPSByZXF1aXJlKCcuLyQubWljcm90YXNrJylcbiAgLCBQUk9NSVNFICAgID0gJ1Byb21pc2UnXG4gICwgcHJvY2VzcyAgICA9IGdsb2JhbC5wcm9jZXNzXG4gICwgaXNOb2RlICAgICA9IGNsYXNzb2YocHJvY2VzcykgPT0gJ3Byb2Nlc3MnXG4gICwgUCAgICAgICAgICA9IGdsb2JhbFtQUk9NSVNFXVxuICAsIFdyYXBwZXI7XG5cbnZhciB0ZXN0UmVzb2x2ZSA9IGZ1bmN0aW9uKHN1Yil7XG4gIHZhciB0ZXN0ID0gbmV3IFAoZnVuY3Rpb24oKXt9KTtcbiAgaWYoc3ViKXRlc3QuY29uc3RydWN0b3IgPSBPYmplY3Q7XG4gIHJldHVybiBQLnJlc29sdmUodGVzdCkgPT09IHRlc3Q7XG59O1xuXG52YXIgdXNlTmF0aXZlID0gZnVuY3Rpb24oKXtcbiAgdmFyIHdvcmtzID0gZmFsc2U7XG4gIGZ1bmN0aW9uIFAyKHgpe1xuICAgIHZhciBzZWxmID0gbmV3IFAoeCk7XG4gICAgc2V0UHJvdG8oc2VsZiwgUDIucHJvdG90eXBlKTtcbiAgICByZXR1cm4gc2VsZjtcbiAgfVxuICB0cnkge1xuICAgIHdvcmtzID0gUCAmJiBQLnJlc29sdmUgJiYgdGVzdFJlc29sdmUoKTtcbiAgICBzZXRQcm90byhQMiwgUCk7XG4gICAgUDIucHJvdG90eXBlID0gJC5jcmVhdGUoUC5wcm90b3R5cGUsIHtjb25zdHJ1Y3Rvcjoge3ZhbHVlOiBQMn19KTtcbiAgICAvLyBhY3R1YWwgRmlyZWZveCBoYXMgYnJva2VuIHN1YmNsYXNzIHN1cHBvcnQsIHRlc3QgdGhhdFxuICAgIGlmKCEoUDIucmVzb2x2ZSg1KS50aGVuKGZ1bmN0aW9uKCl7fSkgaW5zdGFuY2VvZiBQMikpe1xuICAgICAgd29ya3MgPSBmYWxzZTtcbiAgICB9XG4gICAgLy8gYWN0dWFsIFY4IGJ1ZywgaHR0cHM6Ly9jb2RlLmdvb2dsZS5jb20vcC92OC9pc3N1ZXMvZGV0YWlsP2lkPTQxNjJcbiAgICBpZih3b3JrcyAmJiByZXF1aXJlKCcuLyQuc3VwcG9ydC1kZXNjJykpe1xuICAgICAgdmFyIHRoZW5hYmxlVGhlbkdvdHRlbiA9IGZhbHNlO1xuICAgICAgUC5yZXNvbHZlKCQuc2V0RGVzYyh7fSwgJ3RoZW4nLCB7XG4gICAgICAgIGdldDogZnVuY3Rpb24oKXsgdGhlbmFibGVUaGVuR290dGVuID0gdHJ1ZTsgfVxuICAgICAgfSkpO1xuICAgICAgd29ya3MgPSB0aGVuYWJsZVRoZW5Hb3R0ZW47XG4gICAgfVxuICB9IGNhdGNoKGUpeyB3b3JrcyA9IGZhbHNlOyB9XG4gIHJldHVybiB3b3Jrcztcbn0oKTtcblxuLy8gaGVscGVyc1xudmFyIGlzUHJvbWlzZSA9IGZ1bmN0aW9uKGl0KXtcbiAgcmV0dXJuIGlzT2JqZWN0KGl0KSAmJiAodXNlTmF0aXZlID8gY2xhc3NvZihpdCkgPT0gJ1Byb21pc2UnIDogUkVDT1JEIGluIGl0KTtcbn07XG52YXIgc2FtZUNvbnN0cnVjdG9yID0gZnVuY3Rpb24oYSwgYil7XG4gIC8vIGxpYnJhcnkgd3JhcHBlciBzcGVjaWFsIGNhc2VcbiAgaWYoTElCUkFSWSAmJiBhID09PSBQICYmIGIgPT09IFdyYXBwZXIpcmV0dXJuIHRydWU7XG4gIHJldHVybiBzYW1lKGEsIGIpO1xufTtcbnZhciBnZXRDb25zdHJ1Y3RvciA9IGZ1bmN0aW9uKEMpe1xuICB2YXIgUyA9IGFuT2JqZWN0KEMpW1NQRUNJRVNdO1xuICByZXR1cm4gUyAhPSB1bmRlZmluZWQgPyBTIDogQztcbn07XG52YXIgaXNUaGVuYWJsZSA9IGZ1bmN0aW9uKGl0KXtcbiAgdmFyIHRoZW47XG4gIHJldHVybiBpc09iamVjdChpdCkgJiYgdHlwZW9mICh0aGVuID0gaXQudGhlbikgPT0gJ2Z1bmN0aW9uJyA/IHRoZW4gOiBmYWxzZTtcbn07XG52YXIgbm90aWZ5ID0gZnVuY3Rpb24ocmVjb3JkLCBpc1JlamVjdCl7XG4gIGlmKHJlY29yZC5uKXJldHVybjtcbiAgcmVjb3JkLm4gPSB0cnVlO1xuICB2YXIgY2hhaW4gPSByZWNvcmQuYztcbiAgYXNhcChmdW5jdGlvbigpe1xuICAgIHZhciB2YWx1ZSA9IHJlY29yZC52XG4gICAgICAsIG9rICAgID0gcmVjb3JkLnMgPT0gMVxuICAgICAgLCBpICAgICA9IDA7XG4gICAgdmFyIHJ1biA9IGZ1bmN0aW9uKHJlYWN0KXtcbiAgICAgIHZhciBjYiA9IG9rID8gcmVhY3Qub2sgOiByZWFjdC5mYWlsXG4gICAgICAgICwgcmV0LCB0aGVuO1xuICAgICAgdHJ5IHtcbiAgICAgICAgaWYoY2Ipe1xuICAgICAgICAgIGlmKCFvaylyZWNvcmQuaCA9IHRydWU7XG4gICAgICAgICAgcmV0ID0gY2IgPT09IHRydWUgPyB2YWx1ZSA6IGNiKHZhbHVlKTtcbiAgICAgICAgICBpZihyZXQgPT09IHJlYWN0LlApe1xuICAgICAgICAgICAgcmVhY3QucmVqKFR5cGVFcnJvcignUHJvbWlzZS1jaGFpbiBjeWNsZScpKTtcbiAgICAgICAgICB9IGVsc2UgaWYodGhlbiA9IGlzVGhlbmFibGUocmV0KSl7XG4gICAgICAgICAgICB0aGVuLmNhbGwocmV0LCByZWFjdC5yZXMsIHJlYWN0LnJlaik7XG4gICAgICAgICAgfSBlbHNlIHJlYWN0LnJlcyhyZXQpO1xuICAgICAgICB9IGVsc2UgcmVhY3QucmVqKHZhbHVlKTtcbiAgICAgIH0gY2F0Y2goZXJyKXtcbiAgICAgICAgcmVhY3QucmVqKGVycik7XG4gICAgICB9XG4gICAgfTtcbiAgICB3aGlsZShjaGFpbi5sZW5ndGggPiBpKXJ1bihjaGFpbltpKytdKTsgLy8gdmFyaWFibGUgbGVuZ3RoIC0gY2FuJ3QgdXNlIGZvckVhY2hcbiAgICBjaGFpbi5sZW5ndGggPSAwO1xuICAgIHJlY29yZC5uID0gZmFsc2U7XG4gICAgaWYoaXNSZWplY3Qpc2V0VGltZW91dChmdW5jdGlvbigpe1xuICAgICAgYXNhcChmdW5jdGlvbigpe1xuICAgICAgICBpZihpc1VuaGFuZGxlZChyZWNvcmQucCkpe1xuICAgICAgICAgIGlmKGlzTm9kZSl7XG4gICAgICAgICAgICBwcm9jZXNzLmVtaXQoJ3VuaGFuZGxlZFJlamVjdGlvbicsIHZhbHVlLCByZWNvcmQucCk7XG4gICAgICAgICAgfSBlbHNlIGlmKGdsb2JhbC5jb25zb2xlICYmIGNvbnNvbGUuZXJyb3Ipe1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcignVW5oYW5kbGVkIHByb21pc2UgcmVqZWN0aW9uJywgdmFsdWUpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZWNvcmQuYSA9IHVuZGVmaW5lZDtcbiAgICAgIH0pO1xuICAgIH0sIDEpO1xuICB9KTtcbn07XG52YXIgaXNVbmhhbmRsZWQgPSBmdW5jdGlvbihwcm9taXNlKXtcbiAgdmFyIHJlY29yZCA9IHByb21pc2VbUkVDT1JEXVxuICAgICwgY2hhaW4gID0gcmVjb3JkLmEgfHwgcmVjb3JkLmNcbiAgICAsIGkgICAgICA9IDBcbiAgICAsIHJlYWN0O1xuICBpZihyZWNvcmQuaClyZXR1cm4gZmFsc2U7XG4gIHdoaWxlKGNoYWluLmxlbmd0aCA+IGkpe1xuICAgIHJlYWN0ID0gY2hhaW5baSsrXTtcbiAgICBpZihyZWFjdC5mYWlsIHx8ICFpc1VuaGFuZGxlZChyZWFjdC5QKSlyZXR1cm4gZmFsc2U7XG4gIH0gcmV0dXJuIHRydWU7XG59O1xudmFyICRyZWplY3QgPSBmdW5jdGlvbih2YWx1ZSl7XG4gIHZhciByZWNvcmQgPSB0aGlzO1xuICBpZihyZWNvcmQuZClyZXR1cm47XG4gIHJlY29yZC5kID0gdHJ1ZTtcbiAgcmVjb3JkID0gcmVjb3JkLnIgfHwgcmVjb3JkOyAvLyB1bndyYXBcbiAgcmVjb3JkLnYgPSB2YWx1ZTtcbiAgcmVjb3JkLnMgPSAyO1xuICByZWNvcmQuYSA9IHJlY29yZC5jLnNsaWNlKCk7XG4gIG5vdGlmeShyZWNvcmQsIHRydWUpO1xufTtcbnZhciAkcmVzb2x2ZSA9IGZ1bmN0aW9uKHZhbHVlKXtcbiAgdmFyIHJlY29yZCA9IHRoaXNcbiAgICAsIHRoZW47XG4gIGlmKHJlY29yZC5kKXJldHVybjtcbiAgcmVjb3JkLmQgPSB0cnVlO1xuICByZWNvcmQgPSByZWNvcmQuciB8fCByZWNvcmQ7IC8vIHVud3JhcFxuICB0cnkge1xuICAgIGlmKHRoZW4gPSBpc1RoZW5hYmxlKHZhbHVlKSl7XG4gICAgICBhc2FwKGZ1bmN0aW9uKCl7XG4gICAgICAgIHZhciB3cmFwcGVyID0ge3I6IHJlY29yZCwgZDogZmFsc2V9OyAvLyB3cmFwXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgdGhlbi5jYWxsKHZhbHVlLCBjdHgoJHJlc29sdmUsIHdyYXBwZXIsIDEpLCBjdHgoJHJlamVjdCwgd3JhcHBlciwgMSkpO1xuICAgICAgICB9IGNhdGNoKGUpe1xuICAgICAgICAgICRyZWplY3QuY2FsbCh3cmFwcGVyLCBlKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJlY29yZC52ID0gdmFsdWU7XG4gICAgICByZWNvcmQucyA9IDE7XG4gICAgICBub3RpZnkocmVjb3JkLCBmYWxzZSk7XG4gICAgfVxuICB9IGNhdGNoKGUpe1xuICAgICRyZWplY3QuY2FsbCh7cjogcmVjb3JkLCBkOiBmYWxzZX0sIGUpOyAvLyB3cmFwXG4gIH1cbn07XG5cbi8vIGNvbnN0cnVjdG9yIHBvbHlmaWxsXG5pZighdXNlTmF0aXZlKXtcbiAgLy8gMjUuNC4zLjEgUHJvbWlzZShleGVjdXRvcilcbiAgUCA9IGZ1bmN0aW9uIFByb21pc2UoZXhlY3V0b3Ipe1xuICAgIGFGdW5jdGlvbihleGVjdXRvcik7XG4gICAgdmFyIHJlY29yZCA9IHtcbiAgICAgIHA6IHN0cmljdE5ldyh0aGlzLCBQLCBQUk9NSVNFKSwgICAgICAgICAvLyA8LSBwcm9taXNlXG4gICAgICBjOiBbXSwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gPC0gYXdhaXRpbmcgcmVhY3Rpb25zXG4gICAgICBhOiB1bmRlZmluZWQsICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gPC0gY2hlY2tlZCBpbiBpc1VuaGFuZGxlZCByZWFjdGlvbnNcbiAgICAgIHM6IDAsICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyA8LSBzdGF0ZVxuICAgICAgZDogZmFsc2UsICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIDwtIGRvbmVcbiAgICAgIHY6IHVuZGVmaW5lZCwgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyA8LSB2YWx1ZVxuICAgICAgaDogZmFsc2UsICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIDwtIGhhbmRsZWQgcmVqZWN0aW9uXG4gICAgICBuOiBmYWxzZSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gPC0gbm90aWZ5XG4gICAgfTtcbiAgICB0aGlzW1JFQ09SRF0gPSByZWNvcmQ7XG4gICAgdHJ5IHtcbiAgICAgIGV4ZWN1dG9yKGN0eCgkcmVzb2x2ZSwgcmVjb3JkLCAxKSwgY3R4KCRyZWplY3QsIHJlY29yZCwgMSkpO1xuICAgIH0gY2F0Y2goZXJyKXtcbiAgICAgICRyZWplY3QuY2FsbChyZWNvcmQsIGVycik7XG4gICAgfVxuICB9O1xuICByZXF1aXJlKCcuLyQubWl4JykoUC5wcm90b3R5cGUsIHtcbiAgICAvLyAyNS40LjUuMyBQcm9taXNlLnByb3RvdHlwZS50aGVuKG9uRnVsZmlsbGVkLCBvblJlamVjdGVkKVxuICAgIHRoZW46IGZ1bmN0aW9uIHRoZW4ob25GdWxmaWxsZWQsIG9uUmVqZWN0ZWQpe1xuICAgICAgdmFyIFMgPSBhbk9iamVjdChhbk9iamVjdCh0aGlzKS5jb25zdHJ1Y3RvcilbU1BFQ0lFU107XG4gICAgICB2YXIgcmVhY3QgPSB7XG4gICAgICAgIG9rOiAgIHR5cGVvZiBvbkZ1bGZpbGxlZCA9PSAnZnVuY3Rpb24nID8gb25GdWxmaWxsZWQgOiB0cnVlLFxuICAgICAgICBmYWlsOiB0eXBlb2Ygb25SZWplY3RlZCA9PSAnZnVuY3Rpb24nICA/IG9uUmVqZWN0ZWQgIDogZmFsc2VcbiAgICAgIH07XG4gICAgICB2YXIgcHJvbWlzZSA9IHJlYWN0LlAgPSBuZXcgKFMgIT0gdW5kZWZpbmVkID8gUyA6IFApKGZ1bmN0aW9uKHJlcywgcmVqKXtcbiAgICAgICAgcmVhY3QucmVzID0gYUZ1bmN0aW9uKHJlcyk7XG4gICAgICAgIHJlYWN0LnJlaiA9IGFGdW5jdGlvbihyZWopO1xuICAgICAgfSk7XG4gICAgICB2YXIgcmVjb3JkID0gdGhpc1tSRUNPUkRdO1xuICAgICAgcmVjb3JkLmMucHVzaChyZWFjdCk7XG4gICAgICBpZihyZWNvcmQuYSlyZWNvcmQuYS5wdXNoKHJlYWN0KTtcbiAgICAgIGlmKHJlY29yZC5zKW5vdGlmeShyZWNvcmQsIGZhbHNlKTtcbiAgICAgIHJldHVybiBwcm9taXNlO1xuICAgIH0sXG4gICAgLy8gMjUuNC41LjEgUHJvbWlzZS5wcm90b3R5cGUuY2F0Y2gob25SZWplY3RlZClcbiAgICAnY2F0Y2gnOiBmdW5jdGlvbihvblJlamVjdGVkKXtcbiAgICAgIHJldHVybiB0aGlzLnRoZW4odW5kZWZpbmVkLCBvblJlamVjdGVkKTtcbiAgICB9XG4gIH0pO1xufVxuXG4vLyBleHBvcnRcbiRkZWYoJGRlZi5HICsgJGRlZi5XICsgJGRlZi5GICogIXVzZU5hdGl2ZSwge1Byb21pc2U6IFB9KTtcbnJlcXVpcmUoJy4vJC50YWcnKShQLCBQUk9NSVNFKTtcbnNwZWNpZXMoUCk7XG5zcGVjaWVzKFdyYXBwZXIgPSByZXF1aXJlKCcuLyQuY29yZScpW1BST01JU0VdKTtcblxuLy8gc3RhdGljc1xuJGRlZigkZGVmLlMgKyAkZGVmLkYgKiAhdXNlTmF0aXZlLCBQUk9NSVNFLCB7XG4gIC8vIDI1LjQuNC41IFByb21pc2UucmVqZWN0KHIpXG4gIHJlamVjdDogZnVuY3Rpb24gcmVqZWN0KHIpe1xuICAgIHJldHVybiBuZXcgdGhpcyhmdW5jdGlvbihyZXMsIHJlail7IHJlaihyKTsgfSk7XG4gIH1cbn0pO1xuJGRlZigkZGVmLlMgKyAkZGVmLkYgKiAoIXVzZU5hdGl2ZSB8fCB0ZXN0UmVzb2x2ZSh0cnVlKSksIFBST01JU0UsIHtcbiAgLy8gMjUuNC40LjYgUHJvbWlzZS5yZXNvbHZlKHgpXG4gIHJlc29sdmU6IGZ1bmN0aW9uIHJlc29sdmUoeCl7XG4gICAgcmV0dXJuIGlzUHJvbWlzZSh4KSAmJiBzYW1lQ29uc3RydWN0b3IoeC5jb25zdHJ1Y3RvciwgdGhpcylcbiAgICAgID8geCA6IG5ldyB0aGlzKGZ1bmN0aW9uKHJlcyl7IHJlcyh4KTsgfSk7XG4gIH1cbn0pO1xuJGRlZigkZGVmLlMgKyAkZGVmLkYgKiAhKHVzZU5hdGl2ZSAmJiByZXF1aXJlKCcuLyQuaXRlci1kZXRlY3QnKShmdW5jdGlvbihpdGVyKXtcbiAgUC5hbGwoaXRlcilbJ2NhdGNoJ10oZnVuY3Rpb24oKXt9KTtcbn0pKSwgUFJPTUlTRSwge1xuICAvLyAyNS40LjQuMSBQcm9taXNlLmFsbChpdGVyYWJsZSlcbiAgYWxsOiBmdW5jdGlvbiBhbGwoaXRlcmFibGUpe1xuICAgIHZhciBDICAgICAgPSBnZXRDb25zdHJ1Y3Rvcih0aGlzKVxuICAgICAgLCB2YWx1ZXMgPSBbXTtcbiAgICByZXR1cm4gbmV3IEMoZnVuY3Rpb24ocmVzLCByZWope1xuICAgICAgZm9yT2YoaXRlcmFibGUsIGZhbHNlLCB2YWx1ZXMucHVzaCwgdmFsdWVzKTtcbiAgICAgIHZhciByZW1haW5pbmcgPSB2YWx1ZXMubGVuZ3RoXG4gICAgICAgICwgcmVzdWx0cyAgID0gQXJyYXkocmVtYWluaW5nKTtcbiAgICAgIGlmKHJlbWFpbmluZykkLmVhY2guY2FsbCh2YWx1ZXMsIGZ1bmN0aW9uKHByb21pc2UsIGluZGV4KXtcbiAgICAgICAgQy5yZXNvbHZlKHByb21pc2UpLnRoZW4oZnVuY3Rpb24odmFsdWUpe1xuICAgICAgICAgIHJlc3VsdHNbaW5kZXhdID0gdmFsdWU7XG4gICAgICAgICAgLS1yZW1haW5pbmcgfHwgcmVzKHJlc3VsdHMpO1xuICAgICAgICB9LCByZWopO1xuICAgICAgfSk7XG4gICAgICBlbHNlIHJlcyhyZXN1bHRzKTtcbiAgICB9KTtcbiAgfSxcbiAgLy8gMjUuNC40LjQgUHJvbWlzZS5yYWNlKGl0ZXJhYmxlKVxuICByYWNlOiBmdW5jdGlvbiByYWNlKGl0ZXJhYmxlKXtcbiAgICB2YXIgQyA9IGdldENvbnN0cnVjdG9yKHRoaXMpO1xuICAgIHJldHVybiBuZXcgQyhmdW5jdGlvbihyZXMsIHJlail7XG4gICAgICBmb3JPZihpdGVyYWJsZSwgZmFsc2UsIGZ1bmN0aW9uKHByb21pc2Upe1xuICAgICAgICBDLnJlc29sdmUocHJvbWlzZSkudGhlbihyZXMsIHJlaik7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxufSk7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuLi9+L2JhYmVsLXJ1bnRpbWUvfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczYucHJvbWlzZS5qc1xuICoqIG1vZHVsZSBpZCA9IDM0XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIvLyBvcHRpb25hbCAvIHNpbXBsZSBjb250ZXh0IGJpbmRpbmdcbnZhciBhRnVuY3Rpb24gPSByZXF1aXJlKCcuLyQuYS1mdW5jdGlvbicpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihmbiwgdGhhdCwgbGVuZ3RoKXtcbiAgYUZ1bmN0aW9uKGZuKTtcbiAgaWYodGhhdCA9PT0gdW5kZWZpbmVkKXJldHVybiBmbjtcbiAgc3dpdGNoKGxlbmd0aCl7XG4gICAgY2FzZSAxOiByZXR1cm4gZnVuY3Rpb24oYSl7XG4gICAgICByZXR1cm4gZm4uY2FsbCh0aGF0LCBhKTtcbiAgICB9O1xuICAgIGNhc2UgMjogcmV0dXJuIGZ1bmN0aW9uKGEsIGIpe1xuICAgICAgcmV0dXJuIGZuLmNhbGwodGhhdCwgYSwgYik7XG4gICAgfTtcbiAgICBjYXNlIDM6IHJldHVybiBmdW5jdGlvbihhLCBiLCBjKXtcbiAgICAgIHJldHVybiBmbi5jYWxsKHRoYXQsIGEsIGIsIGMpO1xuICAgIH07XG4gIH0gcmV0dXJuIGZ1bmN0aW9uKC8qIC4uLmFyZ3MgKi8pe1xuICAgICAgcmV0dXJuIGZuLmFwcGx5KHRoYXQsIGFyZ3VtZW50cyk7XG4gICAgfTtcbn07XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuLi9+L2JhYmVsLXJ1bnRpbWUvfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy8kLmN0eC5qc1xuICoqIG1vZHVsZSBpZCA9IDM1XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0KXtcbiAgaWYodHlwZW9mIGl0ICE9ICdmdW5jdGlvbicpdGhyb3cgVHlwZUVycm9yKGl0ICsgJyBpcyBub3QgYSBmdW5jdGlvbiEnKTtcbiAgcmV0dXJuIGl0O1xufTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4uL34vYmFiZWwtcnVudGltZS9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzLyQuYS1mdW5jdGlvbi5qc1xuICoqIG1vZHVsZSBpZCA9IDM2XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIvLyBnZXR0aW5nIHRhZyBmcm9tIDE5LjEuMy42IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcoKVxudmFyIGNvZiA9IHJlcXVpcmUoJy4vJC5jb2YnKVxuICAsIFRBRyA9IHJlcXVpcmUoJy4vJC53a3MnKSgndG9TdHJpbmdUYWcnKVxuICAvLyBFUzMgd3JvbmcgaGVyZVxuICAsIEFSRyA9IGNvZihmdW5jdGlvbigpeyByZXR1cm4gYXJndW1lbnRzOyB9KCkpID09ICdBcmd1bWVudHMnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0KXtcbiAgdmFyIE8sIFQsIEI7XG4gIHJldHVybiBpdCA9PT0gdW5kZWZpbmVkID8gJ1VuZGVmaW5lZCcgOiBpdCA9PT0gbnVsbCA/ICdOdWxsJ1xuICAgIC8vIEBAdG9TdHJpbmdUYWcgY2FzZVxuICAgIDogdHlwZW9mIChUID0gKE8gPSBPYmplY3QoaXQpKVtUQUddKSA9PSAnc3RyaW5nJyA/IFRcbiAgICAvLyBidWlsdGluVGFnIGNhc2VcbiAgICA6IEFSRyA/IGNvZihPKVxuICAgIC8vIEVTMyBhcmd1bWVudHMgZmFsbGJhY2tcbiAgICA6IChCID0gY29mKE8pKSA9PSAnT2JqZWN0JyAmJiB0eXBlb2YgTy5jYWxsZWUgPT0gJ2Z1bmN0aW9uJyA/ICdBcmd1bWVudHMnIDogQjtcbn07XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuLi9+L2JhYmVsLXJ1bnRpbWUvfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy8kLmNsYXNzb2YuanNcbiAqKiBtb2R1bGUgaWQgPSAzN1xuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiLy8gaHR0cDovL2pzcGVyZi5jb20vY29yZS1qcy1pc29iamVjdFxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCl7XG4gIHJldHVybiBpdCAhPT0gbnVsbCAmJiAodHlwZW9mIGl0ID09ICdvYmplY3QnIHx8IHR5cGVvZiBpdCA9PSAnZnVuY3Rpb24nKTtcbn07XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuLi9+L2JhYmVsLXJ1bnRpbWUvfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy8kLmlzLW9iamVjdC5qc1xuICoqIG1vZHVsZSBpZCA9IDM4XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJ2YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuLyQuaXMtb2JqZWN0Jyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0KXtcbiAgaWYoIWlzT2JqZWN0KGl0KSl0aHJvdyBUeXBlRXJyb3IoaXQgKyAnIGlzIG5vdCBhbiBvYmplY3QhJyk7XG4gIHJldHVybiBpdDtcbn07XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuLi9+L2JhYmVsLXJ1bnRpbWUvfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy8kLmFuLW9iamVjdC5qc1xuICoqIG1vZHVsZSBpZCA9IDM5XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0LCBDb25zdHJ1Y3RvciwgbmFtZSl7XG4gIGlmKCEoaXQgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpdGhyb3cgVHlwZUVycm9yKG5hbWUgKyBcIjogdXNlIHRoZSAnbmV3JyBvcGVyYXRvciFcIik7XG4gIHJldHVybiBpdDtcbn07XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuLi9+L2JhYmVsLXJ1bnRpbWUvfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy8kLnN0cmljdC1uZXcuanNcbiAqKiBtb2R1bGUgaWQgPSA0MFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwidmFyIGN0eCAgICAgICAgID0gcmVxdWlyZSgnLi8kLmN0eCcpXG4gICwgY2FsbCAgICAgICAgPSByZXF1aXJlKCcuLyQuaXRlci1jYWxsJylcbiAgLCBpc0FycmF5SXRlciA9IHJlcXVpcmUoJy4vJC5pcy1hcnJheS1pdGVyJylcbiAgLCBhbk9iamVjdCAgICA9IHJlcXVpcmUoJy4vJC5hbi1vYmplY3QnKVxuICAsIHRvTGVuZ3RoICAgID0gcmVxdWlyZSgnLi8kLnRvLWxlbmd0aCcpXG4gICwgZ2V0SXRlckZuICAgPSByZXF1aXJlKCcuL2NvcmUuZ2V0LWl0ZXJhdG9yLW1ldGhvZCcpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdGVyYWJsZSwgZW50cmllcywgZm4sIHRoYXQpe1xuICB2YXIgaXRlckZuID0gZ2V0SXRlckZuKGl0ZXJhYmxlKVxuICAgICwgZiAgICAgID0gY3R4KGZuLCB0aGF0LCBlbnRyaWVzID8gMiA6IDEpXG4gICAgLCBpbmRleCAgPSAwXG4gICAgLCBsZW5ndGgsIHN0ZXAsIGl0ZXJhdG9yO1xuICBpZih0eXBlb2YgaXRlckZuICE9ICdmdW5jdGlvbicpdGhyb3cgVHlwZUVycm9yKGl0ZXJhYmxlICsgJyBpcyBub3QgaXRlcmFibGUhJyk7XG4gIC8vIGZhc3QgY2FzZSBmb3IgYXJyYXlzIHdpdGggZGVmYXVsdCBpdGVyYXRvclxuICBpZihpc0FycmF5SXRlcihpdGVyRm4pKWZvcihsZW5ndGggPSB0b0xlbmd0aChpdGVyYWJsZS5sZW5ndGgpOyBsZW5ndGggPiBpbmRleDsgaW5kZXgrKyl7XG4gICAgZW50cmllcyA/IGYoYW5PYmplY3Qoc3RlcCA9IGl0ZXJhYmxlW2luZGV4XSlbMF0sIHN0ZXBbMV0pIDogZihpdGVyYWJsZVtpbmRleF0pO1xuICB9IGVsc2UgZm9yKGl0ZXJhdG9yID0gaXRlckZuLmNhbGwoaXRlcmFibGUpOyAhKHN0ZXAgPSBpdGVyYXRvci5uZXh0KCkpLmRvbmU7ICl7XG4gICAgY2FsbChpdGVyYXRvciwgZiwgc3RlcC52YWx1ZSwgZW50cmllcyk7XG4gIH1cbn07XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuLi9+L2JhYmVsLXJ1bnRpbWUvfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy8kLmZvci1vZi5qc1xuICoqIG1vZHVsZSBpZCA9IDQxXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIvLyBjYWxsIHNvbWV0aGluZyBvbiBpdGVyYXRvciBzdGVwIHdpdGggc2FmZSBjbG9zaW5nIG9uIGVycm9yXG52YXIgYW5PYmplY3QgPSByZXF1aXJlKCcuLyQuYW4tb2JqZWN0Jyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0ZXJhdG9yLCBmbiwgdmFsdWUsIGVudHJpZXMpe1xuICB0cnkge1xuICAgIHJldHVybiBlbnRyaWVzID8gZm4oYW5PYmplY3QodmFsdWUpWzBdLCB2YWx1ZVsxXSkgOiBmbih2YWx1ZSk7XG4gIC8vIDcuNC42IEl0ZXJhdG9yQ2xvc2UoaXRlcmF0b3IsIGNvbXBsZXRpb24pXG4gIH0gY2F0Y2goZSl7XG4gICAgdmFyIHJldCA9IGl0ZXJhdG9yWydyZXR1cm4nXTtcbiAgICBpZihyZXQgIT09IHVuZGVmaW5lZClhbk9iamVjdChyZXQuY2FsbChpdGVyYXRvcikpO1xuICAgIHRocm93IGU7XG4gIH1cbn07XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuLi9+L2JhYmVsLXJ1bnRpbWUvfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy8kLml0ZXItY2FsbC5qc1xuICoqIG1vZHVsZSBpZCA9IDQyXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIvLyBjaGVjayBvbiBkZWZhdWx0IEFycmF5IGl0ZXJhdG9yXG52YXIgSXRlcmF0b3JzID0gcmVxdWlyZSgnLi8kLml0ZXJhdG9ycycpXG4gICwgSVRFUkFUT1IgID0gcmVxdWlyZSgnLi8kLndrcycpKCdpdGVyYXRvcicpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCl7XG4gIHJldHVybiAoSXRlcmF0b3JzLkFycmF5IHx8IEFycmF5LnByb3RvdHlwZVtJVEVSQVRPUl0pID09PSBpdDtcbn07XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuLi9+L2JhYmVsLXJ1bnRpbWUvfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy8kLmlzLWFycmF5LWl0ZXIuanNcbiAqKiBtb2R1bGUgaWQgPSA0M1xuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiLy8gNy4xLjE1IFRvTGVuZ3RoXG52YXIgdG9JbnRlZ2VyID0gcmVxdWlyZSgnLi8kLnRvLWludGVnZXInKVxuICAsIG1pbiAgICAgICA9IE1hdGgubWluO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCl7XG4gIHJldHVybiBpdCA+IDAgPyBtaW4odG9JbnRlZ2VyKGl0KSwgMHgxZmZmZmZmZmZmZmZmZikgOiAwOyAvLyBwb3coMiwgNTMpIC0gMSA9PSA5MDA3MTk5MjU0NzQwOTkxXG59O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi4vfi9iYWJlbC1ydW50aW1lL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvJC50by1sZW5ndGguanNcbiAqKiBtb2R1bGUgaWQgPSA0NFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwidmFyIGNsYXNzb2YgICA9IHJlcXVpcmUoJy4vJC5jbGFzc29mJylcbiAgLCBJVEVSQVRPUiAgPSByZXF1aXJlKCcuLyQud2tzJykoJ2l0ZXJhdG9yJylcbiAgLCBJdGVyYXRvcnMgPSByZXF1aXJlKCcuLyQuaXRlcmF0b3JzJyk7XG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vJC5jb3JlJykuZ2V0SXRlcmF0b3JNZXRob2QgPSBmdW5jdGlvbihpdCl7XG4gIGlmKGl0ICE9IHVuZGVmaW5lZClyZXR1cm4gaXRbSVRFUkFUT1JdIHx8IGl0WydAQGl0ZXJhdG9yJ10gfHwgSXRlcmF0b3JzW2NsYXNzb2YoaXQpXTtcbn07XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuLi9+L2JhYmVsLXJ1bnRpbWUvfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9jb3JlLmdldC1pdGVyYXRvci1tZXRob2QuanNcbiAqKiBtb2R1bGUgaWQgPSA0NVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiLy8gV29ya3Mgd2l0aCBfX3Byb3RvX18gb25seS4gT2xkIHY4IGNhbid0IHdvcmsgd2l0aCBudWxsIHByb3RvIG9iamVjdHMuXG4vKiBlc2xpbnQtZGlzYWJsZSBuby1wcm90byAqL1xudmFyIGdldERlc2MgID0gcmVxdWlyZSgnLi8kJykuZ2V0RGVzY1xuICAsIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi8kLmlzLW9iamVjdCcpXG4gICwgYW5PYmplY3QgPSByZXF1aXJlKCcuLyQuYW4tb2JqZWN0Jyk7XG52YXIgY2hlY2sgPSBmdW5jdGlvbihPLCBwcm90byl7XG4gIGFuT2JqZWN0KE8pO1xuICBpZighaXNPYmplY3QocHJvdG8pICYmIHByb3RvICE9PSBudWxsKXRocm93IFR5cGVFcnJvcihwcm90byArIFwiOiBjYW4ndCBzZXQgYXMgcHJvdG90eXBlIVwiKTtcbn07XG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgc2V0OiBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHwgKCdfX3Byb3RvX18nIGluIHt9IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcbiAgICA/IGZ1bmN0aW9uKGJ1Z2d5LCBzZXQpe1xuICAgICAgICB0cnkge1xuICAgICAgICAgIHNldCA9IHJlcXVpcmUoJy4vJC5jdHgnKShGdW5jdGlvbi5jYWxsLCBnZXREZXNjKE9iamVjdC5wcm90b3R5cGUsICdfX3Byb3RvX18nKS5zZXQsIDIpO1xuICAgICAgICAgIHNldCh7fSwgW10pO1xuICAgICAgICB9IGNhdGNoKGUpeyBidWdneSA9IHRydWU7IH1cbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIHNldFByb3RvdHlwZU9mKE8sIHByb3RvKXtcbiAgICAgICAgICBjaGVjayhPLCBwcm90byk7XG4gICAgICAgICAgaWYoYnVnZ3kpTy5fX3Byb3RvX18gPSBwcm90bztcbiAgICAgICAgICBlbHNlIHNldChPLCBwcm90byk7XG4gICAgICAgICAgcmV0dXJuIE87XG4gICAgICAgIH07XG4gICAgICB9KClcbiAgICA6IHVuZGVmaW5lZCksXG4gIGNoZWNrOiBjaGVja1xufTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4uL34vYmFiZWwtcnVudGltZS9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzLyQuc2V0LXByb3RvLmpzXG4gKiogbW9kdWxlIGlkID0gNDZcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gT2JqZWN0LmlzIHx8IGZ1bmN0aW9uIGlzKHgsIHkpe1xuICByZXR1cm4geCA9PT0geSA/IHggIT09IDAgfHwgMSAvIHggPT09IDEgLyB5IDogeCAhPSB4ICYmIHkgIT0geTtcbn07XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuLi9+L2JhYmVsLXJ1bnRpbWUvfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy8kLnNhbWUuanNcbiAqKiBtb2R1bGUgaWQgPSA0N1xuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xudmFyICQgICAgICAgPSByZXF1aXJlKCcuLyQnKVxuICAsIFNQRUNJRVMgPSByZXF1aXJlKCcuLyQud2tzJykoJ3NwZWNpZXMnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oQyl7XG4gIGlmKHJlcXVpcmUoJy4vJC5zdXBwb3J0LWRlc2MnKSAmJiAhKFNQRUNJRVMgaW4gQykpJC5zZXREZXNjKEMsIFNQRUNJRVMsIHtcbiAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgZ2V0OiBmdW5jdGlvbigpeyByZXR1cm4gdGhpczsgfVxuICB9KTtcbn07XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuLi9+L2JhYmVsLXJ1bnRpbWUvfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy8kLnNwZWNpZXMuanNcbiAqKiBtb2R1bGUgaWQgPSA0OFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwidmFyIGdsb2JhbCAgICA9IHJlcXVpcmUoJy4vJC5nbG9iYWwnKVxyXG4gICwgbWFjcm90YXNrID0gcmVxdWlyZSgnLi8kLnRhc2snKS5zZXRcclxuICAsIE9ic2VydmVyICA9IGdsb2JhbC5NdXRhdGlvbk9ic2VydmVyIHx8IGdsb2JhbC5XZWJLaXRNdXRhdGlvbk9ic2VydmVyXHJcbiAgLCBwcm9jZXNzICAgPSBnbG9iYWwucHJvY2Vzc1xyXG4gICwgaGVhZCwgbGFzdCwgbm90aWZ5O1xyXG5cclxuZnVuY3Rpb24gZmx1c2goKXtcclxuICB3aGlsZShoZWFkKXtcclxuICAgIGhlYWQuZm4uY2FsbCgpOyAvLyA8LSBjdXJyZW50bHkgd2UgdXNlIGl0IG9ubHkgZm9yIFByb21pc2UgLSB0cnkgLyBjYXRjaCBub3QgcmVxdWlyZWRcclxuICAgIGhlYWQgPSBoZWFkLm5leHQ7XHJcbiAgfSBsYXN0ID0gdW5kZWZpbmVkO1xyXG59XHJcblxyXG4vLyBOb2RlLmpzXHJcbmlmKHJlcXVpcmUoJy4vJC5jb2YnKShwcm9jZXNzKSA9PSAncHJvY2Vzcycpe1xyXG4gIG5vdGlmeSA9IGZ1bmN0aW9uKCl7XHJcbiAgICBwcm9jZXNzLm5leHRUaWNrKGZsdXNoKTtcclxuICB9O1xyXG4vLyBicm93c2VycyB3aXRoIE11dGF0aW9uT2JzZXJ2ZXJcclxufSBlbHNlIGlmKE9ic2VydmVyKXtcclxuICB2YXIgdG9nZ2xlID0gMVxyXG4gICAgLCBub2RlICAgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSgnJyk7XHJcbiAgbmV3IE9ic2VydmVyKGZsdXNoKS5vYnNlcnZlKG5vZGUsIHtjaGFyYWN0ZXJEYXRhOiB0cnVlfSk7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tbmV3XHJcbiAgbm90aWZ5ID0gZnVuY3Rpb24oKXtcclxuICAgIG5vZGUuZGF0YSA9IHRvZ2dsZSA9IC10b2dnbGU7XHJcbiAgfTtcclxuLy8gZm9yIG90aGVyIGVudmlyb25tZW50cyAtIG1hY3JvdGFzayBiYXNlZCBvbjpcclxuLy8gLSBzZXRJbW1lZGlhdGVcclxuLy8gLSBNZXNzYWdlQ2hhbm5lbFxyXG4vLyAtIHdpbmRvdy5wb3N0TWVzc2FnXHJcbi8vIC0gb25yZWFkeXN0YXRlY2hhbmdlXHJcbi8vIC0gc2V0VGltZW91dFxyXG59IGVsc2Uge1xyXG4gIG5vdGlmeSA9IGZ1bmN0aW9uKCl7XHJcbiAgICAvLyBzdHJhbmdlIElFICsgd2VicGFjayBkZXYgc2VydmVyIGJ1ZyAtIHVzZSAuY2FsbChnbG9iYWwpXHJcbiAgICBtYWNyb3Rhc2suY2FsbChnbG9iYWwsIGZsdXNoKTtcclxuICB9O1xyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGFzYXAoZm4pe1xyXG4gIHZhciB0YXNrID0ge2ZuOiBmbiwgbmV4dDogdW5kZWZpbmVkfTtcclxuICBpZihsYXN0KWxhc3QubmV4dCA9IHRhc2s7XHJcbiAgaWYoIWhlYWQpe1xyXG4gICAgaGVhZCA9IHRhc2s7XHJcbiAgICBub3RpZnkoKTtcclxuICB9IGxhc3QgPSB0YXNrO1xyXG59O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi4vfi9iYWJlbC1ydW50aW1lL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvJC5taWNyb3Rhc2suanNcbiAqKiBtb2R1bGUgaWQgPSA0OVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xudmFyIGN0eCAgICAgICAgICAgICAgICA9IHJlcXVpcmUoJy4vJC5jdHgnKVxuICAsIGludm9rZSAgICAgICAgICAgICA9IHJlcXVpcmUoJy4vJC5pbnZva2UnKVxuICAsIGh0bWwgICAgICAgICAgICAgICA9IHJlcXVpcmUoJy4vJC5odG1sJylcbiAgLCBjZWwgICAgICAgICAgICAgICAgPSByZXF1aXJlKCcuLyQuZG9tLWNyZWF0ZScpXG4gICwgZ2xvYmFsICAgICAgICAgICAgID0gcmVxdWlyZSgnLi8kLmdsb2JhbCcpXG4gICwgcHJvY2VzcyAgICAgICAgICAgID0gZ2xvYmFsLnByb2Nlc3NcbiAgLCBzZXRUYXNrICAgICAgICAgICAgPSBnbG9iYWwuc2V0SW1tZWRpYXRlXG4gICwgY2xlYXJUYXNrICAgICAgICAgID0gZ2xvYmFsLmNsZWFySW1tZWRpYXRlXG4gICwgTWVzc2FnZUNoYW5uZWwgICAgID0gZ2xvYmFsLk1lc3NhZ2VDaGFubmVsXG4gICwgY291bnRlciAgICAgICAgICAgID0gMFxuICAsIHF1ZXVlICAgICAgICAgICAgICA9IHt9XG4gICwgT05SRUFEWVNUQVRFQ0hBTkdFID0gJ29ucmVhZHlzdGF0ZWNoYW5nZSdcbiAgLCBkZWZlciwgY2hhbm5lbCwgcG9ydDtcbnZhciBydW4gPSBmdW5jdGlvbigpe1xuICB2YXIgaWQgPSArdGhpcztcbiAgaWYocXVldWUuaGFzT3duUHJvcGVydHkoaWQpKXtcbiAgICB2YXIgZm4gPSBxdWV1ZVtpZF07XG4gICAgZGVsZXRlIHF1ZXVlW2lkXTtcbiAgICBmbigpO1xuICB9XG59O1xudmFyIGxpc3RuZXIgPSBmdW5jdGlvbihldmVudCl7XG4gIHJ1bi5jYWxsKGV2ZW50LmRhdGEpO1xufTtcbi8vIE5vZGUuanMgMC45KyAmIElFMTArIGhhcyBzZXRJbW1lZGlhdGUsIG90aGVyd2lzZTpcbmlmKCFzZXRUYXNrIHx8ICFjbGVhclRhc2spe1xuICBzZXRUYXNrID0gZnVuY3Rpb24gc2V0SW1tZWRpYXRlKGZuKXtcbiAgICB2YXIgYXJncyA9IFtdLCBpID0gMTtcbiAgICB3aGlsZShhcmd1bWVudHMubGVuZ3RoID4gaSlhcmdzLnB1c2goYXJndW1lbnRzW2krK10pO1xuICAgIHF1ZXVlWysrY291bnRlcl0gPSBmdW5jdGlvbigpe1xuICAgICAgaW52b2tlKHR5cGVvZiBmbiA9PSAnZnVuY3Rpb24nID8gZm4gOiBGdW5jdGlvbihmbiksIGFyZ3MpO1xuICAgIH07XG4gICAgZGVmZXIoY291bnRlcik7XG4gICAgcmV0dXJuIGNvdW50ZXI7XG4gIH07XG4gIGNsZWFyVGFzayA9IGZ1bmN0aW9uIGNsZWFySW1tZWRpYXRlKGlkKXtcbiAgICBkZWxldGUgcXVldWVbaWRdO1xuICB9O1xuICAvLyBOb2RlLmpzIDAuOC1cbiAgaWYocmVxdWlyZSgnLi8kLmNvZicpKHByb2Nlc3MpID09ICdwcm9jZXNzJyl7XG4gICAgZGVmZXIgPSBmdW5jdGlvbihpZCl7XG4gICAgICBwcm9jZXNzLm5leHRUaWNrKGN0eChydW4sIGlkLCAxKSk7XG4gICAgfTtcbiAgLy8gQnJvd3NlcnMgd2l0aCBNZXNzYWdlQ2hhbm5lbCwgaW5jbHVkZXMgV2ViV29ya2Vyc1xuICB9IGVsc2UgaWYoTWVzc2FnZUNoYW5uZWwpe1xuICAgIGNoYW5uZWwgPSBuZXcgTWVzc2FnZUNoYW5uZWw7XG4gICAgcG9ydCAgICA9IGNoYW5uZWwucG9ydDI7XG4gICAgY2hhbm5lbC5wb3J0MS5vbm1lc3NhZ2UgPSBsaXN0bmVyO1xuICAgIGRlZmVyID0gY3R4KHBvcnQucG9zdE1lc3NhZ2UsIHBvcnQsIDEpO1xuICAvLyBCcm93c2VycyB3aXRoIHBvc3RNZXNzYWdlLCBza2lwIFdlYldvcmtlcnNcbiAgLy8gSUU4IGhhcyBwb3N0TWVzc2FnZSwgYnV0IGl0J3Mgc3luYyAmIHR5cGVvZiBpdHMgcG9zdE1lc3NhZ2UgaXMgJ29iamVjdCdcbiAgfSBlbHNlIGlmKGdsb2JhbC5hZGRFdmVudExpc3RlbmVyICYmIHR5cGVvZiBwb3N0TWVzc2FnZSA9PSAnZnVuY3Rpb24nICYmICFnbG9iYWwuaW1wb3J0U2NyaXB0KXtcbiAgICBkZWZlciA9IGZ1bmN0aW9uKGlkKXtcbiAgICAgIGdsb2JhbC5wb3N0TWVzc2FnZShpZCArICcnLCAnKicpO1xuICAgIH07XG4gICAgZ2xvYmFsLmFkZEV2ZW50TGlzdGVuZXIoJ21lc3NhZ2UnLCBsaXN0bmVyLCBmYWxzZSk7XG4gIC8vIElFOC1cbiAgfSBlbHNlIGlmKE9OUkVBRFlTVEFURUNIQU5HRSBpbiBjZWwoJ3NjcmlwdCcpKXtcbiAgICBkZWZlciA9IGZ1bmN0aW9uKGlkKXtcbiAgICAgIGh0bWwuYXBwZW5kQ2hpbGQoY2VsKCdzY3JpcHQnKSlbT05SRUFEWVNUQVRFQ0hBTkdFXSA9IGZ1bmN0aW9uKCl7XG4gICAgICAgIGh0bWwucmVtb3ZlQ2hpbGQodGhpcyk7XG4gICAgICAgIHJ1bi5jYWxsKGlkKTtcbiAgICAgIH07XG4gICAgfTtcbiAgLy8gUmVzdCBvbGQgYnJvd3NlcnNcbiAgfSBlbHNlIHtcbiAgICBkZWZlciA9IGZ1bmN0aW9uKGlkKXtcbiAgICAgIHNldFRpbWVvdXQoY3R4KHJ1biwgaWQsIDEpLCAwKTtcbiAgICB9O1xuICB9XG59XG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgc2V0OiAgIHNldFRhc2ssXG4gIGNsZWFyOiBjbGVhclRhc2tcbn07XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuLi9+L2JhYmVsLXJ1bnRpbWUvfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy8kLnRhc2suanNcbiAqKiBtb2R1bGUgaWQgPSA1MFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiLy8gZmFzdCBhcHBseSwgaHR0cDovL2pzcGVyZi5sbmtpdC5jb20vZmFzdC1hcHBseS81XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGZuLCBhcmdzLCB0aGF0KXtcbiAgdmFyIHVuID0gdGhhdCA9PT0gdW5kZWZpbmVkO1xuICBzd2l0Y2goYXJncy5sZW5ndGgpe1xuICAgIGNhc2UgMDogcmV0dXJuIHVuID8gZm4oKVxuICAgICAgICAgICAgICAgICAgICAgIDogZm4uY2FsbCh0aGF0KTtcbiAgICBjYXNlIDE6IHJldHVybiB1biA/IGZuKGFyZ3NbMF0pXG4gICAgICAgICAgICAgICAgICAgICAgOiBmbi5jYWxsKHRoYXQsIGFyZ3NbMF0pO1xuICAgIGNhc2UgMjogcmV0dXJuIHVuID8gZm4oYXJnc1swXSwgYXJnc1sxXSlcbiAgICAgICAgICAgICAgICAgICAgICA6IGZuLmNhbGwodGhhdCwgYXJnc1swXSwgYXJnc1sxXSk7XG4gICAgY2FzZSAzOiByZXR1cm4gdW4gPyBmbihhcmdzWzBdLCBhcmdzWzFdLCBhcmdzWzJdKVxuICAgICAgICAgICAgICAgICAgICAgIDogZm4uY2FsbCh0aGF0LCBhcmdzWzBdLCBhcmdzWzFdLCBhcmdzWzJdKTtcbiAgICBjYXNlIDQ6IHJldHVybiB1biA/IGZuKGFyZ3NbMF0sIGFyZ3NbMV0sIGFyZ3NbMl0sIGFyZ3NbM10pXG4gICAgICAgICAgICAgICAgICAgICAgOiBmbi5jYWxsKHRoYXQsIGFyZ3NbMF0sIGFyZ3NbMV0sIGFyZ3NbMl0sIGFyZ3NbM10pO1xuICB9IHJldHVybiAgICAgICAgICAgICAgZm4uYXBwbHkodGhhdCwgYXJncyk7XG59O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi4vfi9iYWJlbC1ydW50aW1lL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvJC5pbnZva2UuanNcbiAqKiBtb2R1bGUgaWQgPSA1MVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuLyQuZ2xvYmFsJykuZG9jdW1lbnQgJiYgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi4vfi9iYWJlbC1ydW50aW1lL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvJC5odG1sLmpzXG4gKiogbW9kdWxlIGlkID0gNTJcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsInZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4vJC5pcy1vYmplY3QnKVxuICAsIGRvY3VtZW50ID0gcmVxdWlyZSgnLi8kLmdsb2JhbCcpLmRvY3VtZW50XG4gIC8vIGluIG9sZCBJRSB0eXBlb2YgZG9jdW1lbnQuY3JlYXRlRWxlbWVudCBpcyAnb2JqZWN0J1xuICAsIGlzID0gaXNPYmplY3QoZG9jdW1lbnQpICYmIGlzT2JqZWN0KGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCl7XG4gIHJldHVybiBpcyA/IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoaXQpIDoge307XG59O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi4vfi9iYWJlbC1ydW50aW1lL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvJC5kb20tY3JlYXRlLmpzXG4gKiogbW9kdWxlIGlkID0gNTNcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsInZhciAkcmVkZWYgPSByZXF1aXJlKCcuLyQucmVkZWYnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24odGFyZ2V0LCBzcmMpe1xuICBmb3IodmFyIGtleSBpbiBzcmMpJHJlZGVmKHRhcmdldCwga2V5LCBzcmNba2V5XSk7XG4gIHJldHVybiB0YXJnZXQ7XG59O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi4vfi9iYWJlbC1ydW50aW1lL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvJC5taXguanNcbiAqKiBtb2R1bGUgaWQgPSA1NFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwidmFyIFNZTUJPTF9JVEVSQVRPUiA9IHJlcXVpcmUoJy4vJC53a3MnKSgnaXRlcmF0b3InKVxuICAsIFNBRkVfQ0xPU0lORyAgICA9IGZhbHNlO1xudHJ5IHtcbiAgdmFyIHJpdGVyID0gWzddW1NZTUJPTF9JVEVSQVRPUl0oKTtcbiAgcml0ZXJbJ3JldHVybiddID0gZnVuY3Rpb24oKXsgU0FGRV9DTE9TSU5HID0gdHJ1ZTsgfTtcbiAgQXJyYXkuZnJvbShyaXRlciwgZnVuY3Rpb24oKXsgdGhyb3cgMjsgfSk7XG59IGNhdGNoKGUpeyAvKiBlbXB0eSAqLyB9XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGV4ZWMpe1xuICBpZighU0FGRV9DTE9TSU5HKXJldHVybiBmYWxzZTtcbiAgdmFyIHNhZmUgPSBmYWxzZTtcbiAgdHJ5IHtcbiAgICB2YXIgYXJyICA9IFs3XVxuICAgICAgLCBpdGVyID0gYXJyW1NZTUJPTF9JVEVSQVRPUl0oKTtcbiAgICBpdGVyLm5leHQgPSBmdW5jdGlvbigpeyBzYWZlID0gdHJ1ZTsgfTtcbiAgICBhcnJbU1lNQk9MX0lURVJBVE9SXSA9IGZ1bmN0aW9uKCl7IHJldHVybiBpdGVyOyB9O1xuICAgIGV4ZWMoYXJyKTtcbiAgfSBjYXRjaChlKXsgLyogZW1wdHkgKi8gfVxuICByZXR1cm4gc2FmZTtcbn07XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuLi9+L2JhYmVsLXJ1bnRpbWUvfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy8kLml0ZXItZGV0ZWN0LmpzXG4gKiogbW9kdWxlIGlkID0gNTVcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIlwidXNlIHN0cmljdFwiO1xuXG5leHBvcnRzW1wiZGVmYXVsdFwiXSA9IGZ1bmN0aW9uIChvYmopIHtcbiAgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHtcbiAgICBcImRlZmF1bHRcIjogb2JqXG4gIH07XG59O1xuXG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi4vfi9iYWJlbC1ydW50aW1lL2hlbHBlcnMvaW50ZXJvcC1yZXF1aXJlLWRlZmF1bHQuanNcbiAqKiBtb2R1bGUgaWQgPSA1NlxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgSW50ZXJmYWNlIGZyb20gJ2RlbW8vYWN0aW9uLmludGVyZmFjZS5qcyc7XG5pbXBvcnQgUnVudGltZSBmcm9tICdkZW1vL2FjdGlvbi5ydW50aW1lLmpzJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gU3RhdGUoKSB7XG4gIHRoaXMuX3J1bnRpbWUgPSBuZXcgUnVudGltZSgpO1xuICB0aGlzLl9pbnRlcmZhY2UgPSBuZXcgSW50ZXJmYWNlKHRoaXMuX3J1bnRpbWUpO1xuICByZXR1cm4gdGhpcy5faW50ZXJmYWNlO1xufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9hY3Rpb24uanNcbiAqKi8iLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCBSdW5lIGZyb20gJ2Rpc3QvcnVuZS5qcyc7XG5cbi8qKlxuICogQSBkZW1vIGVEU0wgd2l0aCBtb3N0IGZlYXR1cmVzIGEgZnVsbCBsYW5ndWFnZSBzaG91bGQgYmUgd2l0aC5cbiAqIFRoaXMgZmlsZSBjb250YWlucyBvbmx5IGludGVyZmFjZW4sIHdoaWNoIG1lYW5zIGl0IG5lZWQgdG8gYmUgaW5zdGFudGlhdGVkXG4gKiB3aXRoIGEgcnVudGltZSB0byBleGVjdXRlIHRoZSBsYW5ndWFnZS5cbiAqXG4gKiBOb3RlOiBzaW5jZSB0byBoYW5kbGUgYXN5bmMgZnVuY3Rpb24gcHJvcGVybHkgbmVlZCBleHRyYSBlZmZvcnRzLFxuICogc28gdGhpcyBkZW1vIGxhbmd1YWdlIGRvZXNuJ3QgZnVsbHkgaGFuZGxlIHRoZW0geWV0LiBBbHRob3VnaCB0aGlzIGVEU0xcbiAqIGluZGVlZCBwdXQgYWxsIHN0ZXBzIGluIGEgUHJvbWlzZSB0byBiZSB0aGUgZmlyc3Qgc3RlcCB0b3dhcmQgdGhhdC5cbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gSW50ZXJmYWNlKHJ1bnRpbWUpIHtcbiAgdGhpcy5jb250ZXh0ID0ge1xuICAgIHN0YXJ0ZWQ6IGZhbHNlLFxuICAgIHN0b3BwZWQ6IGZhbHNlLFxuICAgIGxvb3Bpbmc6IGZhbHNlLFxuICAgIG1hdGNoaW5nOiBmYWxzZVxuICB9O1xuICB0aGlzLnN0YWNrID0gW107XG4gIHRoaXMuX3J1bnRpbWUgPSBydW50aW1lO1xuICB0aGlzLl9ldmFsdWF0b3IgPSAobmV3IFJ1bmUuRXZhbHVhdGUoKSlcbiAgICAuYW5hbHl6ZXIodGhpcy5fYW5hbHl6ZU9yZGVyLmJpbmQodGhpcykpXG4gICAgLmludGVycHJldGVyKHRoaXMuX2ludGVycHJldC5iaW5kKHRoaXMpKTtcbn1cblxuSW50ZXJmYWNlLnByb3RvdHlwZS5zdGFydCA9IFJ1bmUuZGVmaW5lKCdzdGFydCcsICdiZWdpbicpO1xuSW50ZXJmYWNlLnByb3RvdHlwZS5kb25lID0gUnVuZS5kZWZpbmUoJ2RvbmUnLCAnZXhpdCcpO1xuSW50ZXJmYWNlLnByb3RvdHlwZS5ydW4gPSBSdW5lLmRlZmluZSgncnVuJywgJ2V4aXQnKTtcbkludGVyZmFjZS5wcm90b3R5cGUuZWZmZWN0ID0gUnVuZS5kZWZpbmUoJ2VmZmVjdCcsICdleGl0Jyk7XG5JbnRlcmZhY2UucHJvdG90eXBlLm5leHQgPSBSdW5lLmRlZmluZSgnbmV4dCcsICdwdXNoJyk7XG5JbnRlcmZhY2UucHJvdG90eXBlLm1hdGNoID0gUnVuZS5kZWZpbmUoJ21hdGNoJywgJ2JlZ2luJyk7XG5JbnRlcmZhY2UucHJvdG90eXBlLmVuZCA9IFJ1bmUuZGVmaW5lKCdlbmQnLCAnZW5kJyk7XG5JbnRlcmZhY2UucHJvdG90eXBlLmNhc2UgPSBSdW5lLmRlZmluZSgnY2FzZScsICdwdXNoJyk7XG5JbnRlcmZhY2UucHJvdG90eXBlLnRvID0gUnVuZS5kZWZpbmUoJ3RvJywgJ3B1c2gnKTtcbkludGVyZmFjZS5wcm90b3R5cGUuYXMgPSBSdW5lLmRlZmluZSgnYXMnLCAncHVzaCcpO1xuSW50ZXJmYWNlLnByb3RvdHlwZS5sb29wID0gUnVuZS5kZWZpbmUoJ2xvb3AnLCAnYmVnaW4nKTtcbkludGVyZmFjZS5wcm90b3R5cGUudW50aWwgPSBSdW5lLmRlZmluZSgndW50aWwnLCAnZW5kJyk7XG5JbnRlcmZhY2UucHJvdG90eXBlLmFueSA9IFJ1bmUuZGVmaW5lKCdhbnknLCAncHVzaCcpO1xuSW50ZXJmYWNlLnByb3RvdHlwZS5hbGwgPSBSdW5lLmRlZmluZSgnYWxsJywgJ3B1c2gnKTtcblxuSW50ZXJmYWNlLnByb3RvdHlwZS5vbmNoYW5nZSA9IGZ1bmN0aW9uKGNvbnRleHQsIG5vZGUsIHN0YWNrKSB7XG4gIC8vIFdoZW4gaXQncyBjaGFuZ2VkLCBldmFsdWF0ZSBpdCB3aXRoIGFuYWx5emVycyAmIGludGVycHJldGVyLlxuICByZXR1cm4gdGhpcy5fZXZhbHVhdG9yKGNvbnRleHQsIG5vZGUsIHN0YWNrKTtcbn07XG5cbkludGVyZmFjZS5wcm90b3R5cGUuX2ludGVycHJldCA9IGZ1bmN0aW9uKGNvbnRleHQsIG5vZGUsIHN0YWNrKSB7XG4gIC8vIFdlbGwgaW4gdGhpcyBlRFNMIHdlIGRlbGVnYXRlIHRoZSBpbnRlcnByZXRpb24gdG8gdGhlIHJ1bnRpbWUuXG4gIC8vIFdlIGRvbid0IHBhc3MgY29udGV4dCB0byBydW50aW1lIHNpbmNlIHRoZSBydW50aW1lIHdpbGwga2VlcFxuICAvLyB0aGUgZXNzZW50aWFsIHN0YXRlcyBieSBpdHMgb3duLlxuICByZXR1cm4gdGhpcy5fcnVudGltZS5vbmNoYW5nZS5hcHBseSh0aGlzLl9ydW50aW1lLCBhcmd1bWVudHMpO1xufTtcblxuLy8gSW4gdGhpcyBlRFNMIHdlIG5vdyBvbmx5IGhhdmUgdGhpcyBhbmFseXplci4gQ291bGQgYWRkIG1vcmUgYW5kIHJlZ2lzdGVyIGl0XG4vLyBpbiB0aGUgY29udHJ1Y3Rpb24gb2YgJ3RoaXMuX2V2YWx1YXRvcicuXG5JbnRlcmZhY2UucHJvdG90eXBlLl9hbmFseXplT3JkZXIgPSBmdW5jdGlvbihjb250ZXh0LCBjaGFuZ2UsIHN0YWNrKSB7XG4gIGlmICgnc3RhcnQnID09PSBjaGFuZ2UudHlwZSkge1xuICAgIGNvbnRleHQuc3RhcnRlZCA9IHRydWU7XG4gIH0gZWxzZSBpZiAoJ3N0b3AnKSB7XG4gICAgY29udGV4dC5zdG9wcGVkID0gdHJ1ZTtcbiAgfVxuICBpZiAoJ3N0YXJ0JyA9PT0gY2hhbmdlLnR5cGUgJiYgY29udGV4dC5zdG9wcGVkKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdTaG91bGQgbm90IHN0YXJ0IGEgcHJvY2VzcyBhZ2FpbicgK1xuICAgICAgICAnYWZ0ZXIgaXRcXCdzIGFscmVhZHkgc3RvcHBlZCcpO1xuICB9IGVsc2UgaWYgKCduZXh0JyA9PT0gY2hhbmdlLnR5cGUgJiYgIWNvbnRleHQuc3RhcnRlZCkge1xuICAgIHRocm93IG5ldyBFcnJvcignU2hvdWxkIG5vdCBjb25jYXQgc3RlcHMgd2hpbGUgaXRcXCdzIG5vdCBzdGFydGVkJyk7XG4gIH0gZWxzZSBpZiAoJ3N0b3AnID09PSBjaGFuZ2UudHlwZSAmJiAhY29udGV4dC5zdGFydGVkKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdTaG91bGQgbm90IHN0b3AgYSBwcm9jZXNzIGJlZm9yZSBpdFxcJ3Mgc3RhcnRlZCcpO1xuICB9XG59O1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9hY3Rpb24uaW50ZXJmYWNlLmpzXG4gKiovIiwiKGZ1bmN0aW9uKGUsIGEpIHsgZm9yKHZhciBpIGluIGEpIGVbaV0gPSBhW2ldOyB9KGV4cG9ydHMsIC8qKioqKiovIChmdW5jdGlvbihtb2R1bGVzKSB7IC8vIHdlYnBhY2tCb290c3RyYXBcbi8qKioqKiovIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuLyoqKioqKi8gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuLyoqKioqKi9cbi8qKioqKiovIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbi8qKioqKiovIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuLyoqKioqKi9cbi8qKioqKiovIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbi8qKioqKiovIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbi8qKioqKiovIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuLyoqKioqKi9cbi8qKioqKiovIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuLyoqKioqKi8gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbi8qKioqKiovIFx0XHRcdGV4cG9ydHM6IHt9LFxuLyoqKioqKi8gXHRcdFx0aWQ6IG1vZHVsZUlkLFxuLyoqKioqKi8gXHRcdFx0bG9hZGVkOiBmYWxzZVxuLyoqKioqKi8gXHRcdH07XG4vKioqKioqL1xuLyoqKioqKi8gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuLyoqKioqKi8gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuLyoqKioqKi9cbi8qKioqKiovIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4vKioqKioqLyBcdFx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG4vKioqKioqL1xuLyoqKioqKi8gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4vKioqKioqLyBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuLyoqKioqKi8gXHR9XG4vKioqKioqL1xuLyoqKioqKi9cbi8qKioqKiovIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbi8qKioqKiovIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcbi8qKioqKiovXG4vKioqKioqLyBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4vKioqKioqLyBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG4vKioqKioqL1xuLyoqKioqKi8gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuLyoqKioqKi8gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuLyoqKioqKi9cbi8qKioqKiovIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4vKioqKioqLyBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuLyoqKioqKi8gfSlcbi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG4vKioqKioqLyAoW1xuLyogMCAqL1xuLyoqKi8gZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzKSB7XG5cblx0J3VzZSBzdHJpY3QnO1xuXHRcblx0LyoqXG5cdCAqIEdlbmVyaWMgYnVpbGRlciB0aGF0IHdvdWxkIHB1c2ggbm9kZXMgaW50byB0aGUgZURTTCBzdGFjay5cblx0ICogVXNlciBjb3VsZCBpbmhlcml0IHRoaXMgdG8gZGVmaW5lIHRoZSBuZXcgZURTTC5cblx0ICogLS0tXG5cdCAqIFRoZSBkZWZhdWx0IHNlbWFudGljcyBvbmx5IGNvbnRhaW4gdGhlc2Ugb3BlcmF0aW9uczpcblx0ICpcblx0ICogMS4gW3B1c2hdIDogcHVzaCB0byB0aGUgY3VycmVudCBzdGFja1xuXHQgKiAyLiBbYmVnaW5dOiBjcmVhdGUgYSBuZXcgc3RhY2sgYW5kIHN3aXRjaCB0byBpdCxcblx0ICogICAgICAgICAgICAgYW5kIHRoZW4gcHVzaCB0aGUgbm9kZSBpbnRvIHRoZSBzdGFjay5cblx0ICogMy4gW2VuZF0gIDogYWZ0ZXIgcHVzaCB0aGUgbm9kZSBpbnRvIHRoZSBzdGFjayxcblx0ICogICAgICAgICAgICAgY2hhbmdlIHRoZSBjdXJyZW50IHN0YWNrIHRvIHRoZSBwcmV2aW91cyBvbmUuXG5cdCAqIDQuIFtleGl0XSA6IGV4aXQgdGhlIGNvbnRleHQgb2YgdGhpcyBlRFNMOyB0aGUgbGFzdCByZXN1bHRcblx0ICogICAgICAgICAgICAgb2YgaXQgd291bGQgYmUgcGFzc2VkIHRvIHRoZSByZXR1cm4gdmFsdWUgb2Zcblx0ICogICAgICAgICAgICAgdGhpcyBjaGFpbi5cblx0ICpcblx0ICogU3RhY2sgY291bGQgYmUgbmVzdGVkOiB3aGVuIFtiZWdpbl0gYSBuZXcgc3RhY2sgaW4gZmFjdCBpdCB3b3VsZFxuXHQgKiBwdXNoIHRoZSBzdGFjayBpbnRvIHRoZSBwcmV2aW91cyBvbmUuIFNvIHRoZSBzdGFjayBjb21wcmlzZVxuXHQgKiBbbm9kZV0gYW5kIFtzdGFja10uXG5cdCAqIC0tLVxuXHQgKiBBbHRob3VnaCB0aGUgZURTTCBpbnN0YW5jZSBzaG91bGQgd3JhcCB0aGVzZSBiYXNpYyBvcGVyYXRpb25zXG5cdCAqIHRvIG1hbmlwdWxhdGUgdGhlIHN0YWNrLCB0aGV5IGFsbCBuZWVkIHRvIGNvbnZlcnQgdGhlIG1ldGhvZFxuXHQgKiBjYWxsIHRvIG5vZGVzLiBTbyAnUnVuZScgcHJvdmlkZSBhIHdheSB0byBzaW1wbGlmeSB0aGUgd29yazogaWZcblx0ICogdGhlIGluc3RhbmNlIGNhbGwgdGhlIFtkZWZpbmVdIG1ldGhvZCB0aGUgbmFtZSBvZiB0aGUgbWV0aG9kLFxuXHQgKiBpdCBjb3VsZCBhc3NvY2lhdGUgdGhlIG9wZXJhbmQgb2YgdGhlIGVEU0wgd2l0aCB0aGUgc3RhY2sgbWFuaXB1bGF0aW9uLlxuXHQgKiBGb3IgZXhhbXBsZTpcblx0ICpcblx0ICogICAgdmFyIGVEU0wgPSBmdW5jdGlvbigpIHt9O1xuXHQgKiAgICBlRFNMLnByb3RvdHlwZS50cmFuc2FjdGlvbiA9IFJ1bmUuZGVmaW5lKCd0cmFuc2FjdGlvbicsICdiZWdpbicpO1xuXHQgKiAgICBlRFNMLnByb3RvdHlwZS5wcmUgPSBSdW5lLmRlZmluZSgncHJlJywgJ3B1c2gnKTtcblx0ICogICAgZURTTC5wcm90b3R5cGUucGVyZm9ybSA9IFJ1bmUuZGVmaW5lKCdwZXJmb3JtJywgJ3B1c2gnKTtcblx0ICogICAgZURTTC5wcm90b3R5cGUucG9zdCA9IFJ1bmUuZGVmaW5lKCdwb3N0JywgJ2VuZCcpO1xuXHQgKlxuXHQgKiBUaGVuIHRoZSBlRFNMIGNvdWxkIGJlIHVzZWQgYXM6XG5cdCAqXG5cdCAqICAgIChuZXcgZURTTClcblx0ICogICAgICAudHJhbnNhY3Rpb24oKVxuXHQgKiAgICAgIC5wcmUoY2IpXG5cdCAqICAgICAgLnBlcmZvcm0oY2IpXG5cdCAqICAgICAgLnBvc3QoY2IpXG5cdCAqXG5cdCAqIEFuZCB0aGUgc3RhY2sgd291bGQgYmU6XG5cdCAqXG5cdCAqICAgIFtcblx0ICogICAgICBub2RlPCd0cmFuc2FjdGlvbicsPlxuXHQgKiAgICAgIG5vZGU8J3ByZScsIGNiPlxuXHQgKiAgICAgIG5vZGU8J3ByZWZvcm0nLCBjYj5cblx0ICogICAgICBub2RlPCdwb3N0JywgY2I+XG5cdCAqICAgIF1cblx0ICpcblx0ICogSG93ZXZlciwgdGhpcyBzaW1wbGUgYXBwcm9hY2ggdGhlIHNlbWFudGljcyBydWxlcyBhbmQgYW5hbHl6ZXJzIHRvXG5cdCAqIGd1YXJhbnRlZSB0aGUgc3RhY2sgaXMgdmFsaWQuIEZvciBleGFtcGxlLCBpZiB3ZSBoYXZlIGEgbWFsZm9ybWVkXG5cdCAqIHN0YWNrIGJlY2F1c2Ugb2YgdGhlIGZvbGxvd2luZyBlRFNMIHByb2dyYW06XG5cdCAqXG5cdCAqICAgIChuZXcgZURTTClcblx0ICogICAgICAucG9zdChjYilcblx0ICogICAgICAucHJlKGNiKVxuXHQgKiAgICAgIC5wZXJmb3JtKGNiKVxuXHQgKiAgICAgIC50cmFuc2FjdGlvbigpXG5cdCAqXG5cdCAqIFRoZSBydW50aW1lIG1heSByZXBvcnQgZXJyb3QgYmVjYXVzZSB3aGVuICcucG9zdChjYiknIHRoZXJlIGlzIG5vIHN0YWNrXG5cdCAqIGNyZWF0ZWQgYnkgdGhlIGJlZ2lubmluZyBzdGVwLCBuYW1lbHkgdGhlICcucHJlKGNiKScgaW4gb3VyIGNhc2UuXG5cdCAqIE5ldmVydGhlbGVzcywgdGhlIGVycm9yIG1lc3NhZ2UgaXMgdG9vIGxvdy1sZXZlbCBmb3IgdGhlIGxhbmd1YWdlIHVzZXIsXG5cdCAqIHNpbmNlIHRoZXkgc2hvdWxkIGNhcmUgbm8gc3RhY2sgdGhpbmdzIGFuZCBzaG91bGQgb25seSBjYXJlIGFib3V0IHRoZSBlRFNMXG5cdCAqIGl0c2VsZi5cblx0ICpcblx0ICogVGhlIHNvbHV0aW9uIGlzIHRvIHByb3ZpZGUgYSBiYXNpYyBzdGFjayBvcmRlcmluZyBhbmFseXplciBhbmQgbGV0IHRoZVxuXHQgKiBsYW5ndWFnZSBkZWNpZGUgaG93IHRvIGRlc2NyaWJlIHRoZSBlcnJvci4gQW5kIHNpbmNlIHdlIGRvbid0IGhhdmVcblx0ICogYW55IGNvbnRleHQgaW5mb3JtYXRpb24gYWJvdXQgdmFyaWFibGVzLCBzY29wZSBhbmQgb3RoZXIgZWxlbWVudHNcblx0ICogYXMgYSBjb21wbGV0ZSBwcm9ncmFtbWluZyBsYW5ndWFnZSwgd2Ugb25seSBuZWVkIHRvIGd1YXJhbnRlZSB0aGUgb3JkZXIgaXNcblx0ICogY29ycmVjdCwgYW5kIG1ha2UgaW5jb3JyZWN0IGNhc2VzIG1lYW5pbmdmdWwuIE1vcmVvdmVyLCBzaW5jZSB0aGUgYW5hbHl6ZXJcblx0ICogbmVlZHMgdG8gYW5hbHl6ZSB0aGUgc3RhdGVzIHdoZW5ldmVyIHRoZSBpbmNvbWluZyBub2RlIGNvbWVzLCBpdCBpcyBpbiBmYWN0XG5cdCAqIGFuIGV2YWx1YXRpb24gcHJvY2Vzcywgc28gdXNlciBjb3VsZCBjb21iaW5lIHRoZSBhbmFseXppbmcgYW5kIGludGVycHJldGluZ1xuXHQgKiBwaGFzZSBpbnRvIHRoZSBzYW1lIGZ1bmN0aW9uLiBGb3IgZXhhbXBsZTpcblx0ICpcblx0ICogICAgcnVudGltZS5vbmNoYW5nZSgoY29udGV4dCwgbm9kZSwgc3RhY2spID0+IHtcblx0ICogICAgICAgIC8vIElmIHRoZSBjaGFuZ2UgaXMgdG8gc3dpdGNoIHRvIGEgbmV3IHN0YWNrLFxuXHQgKiAgICAgICAgLy8gdGhlICdzdGFjaycgaGVyZSB3b3VsZCBiZSB0aGUgbmV3IHN0YWNrLlxuXHQgKiAgICAgICAgdmFyIHt0eXBlLCBhcmdzfSA9IG5vZGU7XG5cdCAqICAgICAgICBpZiAoJ3ByZScgPT09IHR5cGUpIHtcblx0ICogICAgICAgICAgY29udGV4dC5pbml0ID0gdHJ1ZTtcblx0ICogICAgICAgIH0gZWxzZSBpZiAoJ3Bvc3QnID09PSB0eXBlICYmICFjb250ZXh0LmluaXQpIHtcblx0ICogICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdUaGVyZSBtdXN0IGJlIG9uZSBcInByZVwiIG5vZGUgYmVmb3JlIHRoZSBcInBvc3RcIi4nKTtcblx0ICogICAgICAgIH1cblx0ICogICAgfSk7XG5cdCAqXG5cdCAqIFdpdGggc3VjaCBmZWF0dXJlLCBpZiB0aGUgaW5jb21pbmcgbm9kZSBvciB0aGUgc3RhY2sgaXMgbWFsZm9ybWVkLFxuXHQgKiBpdCBzaG91bGQgdGhyb3cgdGhlIGVycm9yLiBUaGUgZXJyb3IgY2FwdHVyZWQgYnkgdGhlIGluc3RhbmNlIGxpa2UgdGhpc1xuXHQgKiBjb3VsZCBiZSBhICdjb21waWxhdGlvbiBlcnJvcicuXG5cdCAqXG5cdCAqIFRoZSBub3RpY2VhYmxlIGZhY3QgaXMgVGhlIGNhbGxiYWNrIG9mIHRoZSAnb25jaGFuZ2UnIGlzIGFjdHVhbGx5IGEgcmVkdWNlcixcblx0ICogc28gdXNlciBjb3VsZCB0cmVhdCB0aGUgcHJvY2VzcyBvZiB0aGlzIGV2YWx1YXRpb24gJiBhbmFseXppbmcgYXMgYSByZWR1Y2luZ1xuXHQgKiBwcm9jZXNzIG9uIGFuIGluZmluaXRlIHN0cmVhbS4gQW5kIHNpbmNlIHdlIGhhdmUgYSBzdGFjayBtYWNoaW5lLCBpZiB0aGVcblx0ICogcmVkdWNlciByZXR1cm4gbm90aGluZywgdGhlIHN0YWNrIHdvdWxkIGJlIGVtcHR5LiBPdGhlcndpc2UsIGlmIHRoZSByZWR1Y2VyXG5cdCAqIHJldHVybiBhIG5ldyBzdGFjaywgaXQgd291bGQgcmVwbGFjZSB0aGUgb2xkIG9uZS5cblx0ICpcblx0ICogQW5kIHBsZWFzZSBub3RlIHRoZSBleGFtcGxlIGlzIG11Y2ggc2ltcGxpZmllZC4gRm9yIHRoZVxuXHQgKiByZWFsIGVEU0wgaXQgc2hvdWxkIGJlIHVzZWQgb25seSBhcyBhbiBlbnRyeSB0byBkaXNwYXRjaCB0aGUgY2hhbmdlIHRvXG5cdCAqIHRoZSByZWFsIGhhbmRsZXJzLCB3aGljaCBtYXkgY29tcHJpc2Ugc2V2ZXJhbCBzdGF0ZXMgYW5kIGNvbXBvbmVudHMuXG5cdCAqL1xuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7XG5cdCAgdmFsdWU6IHRydWVcblx0fSk7XG5cdGV4cG9ydHNbJ2RlZmF1bHQnXSA9IFJ1bmU7XG5cdFxuXHRmdW5jdGlvbiBSdW5lKCkge31cblx0XG5cdC8qKlxuXHQgKiBIZWxwZXIgbWV0aG9kIHRvIGJ1aWxkIGludGVyZmFjZSBvZiBhIHNwZWNpZmljIERTTC4gSXQgd291bGQgcmV0dXJuIGEgbWV0aG9kXG5cdCAqIG9mIHRoZSBEU0wgYW5kIHRoZW4gdGhlIGludGVyZmFjZSBjb3VsZCBhdHRhY2ggaXQuXG5cdCAqXG5cdCAqIFRoZSByZXR1cm5pbmcgZnVuY3Rpb24gd291bGQgYXNzdW1lIHRoYXQgdGhlICd0aGlzJyBpbnNpZGUgaXQgaXMgdGhlIHJ1bnRpbWVcblx0ICogb2YgdGhlIGxhbmd1YWdlLiBBbmQgc2luY2UgdGhlIG1ldGhvZCBpdCByZXR1cm5zIHdvdWxkIHJlcXVpcmUgdG8gYWNjZXNzIHNvbWVcblx0ICogbWVtYmVycyBvZiB0aGUgJ3RoaXMnLCB0aGUgJ3RoaXMnIHNob3VsZCBoYXZlICd0aGlzLnN0YWNrJyBhbmQgJ3RoaXMuY29udGV4dCdcblx0ICogYXMgdGhlIG1ldGhvZCByZXF1aXJlcy5cblx0ICpcblx0ICogSWYgaXQncyBhbiAnZXhpdCcgbm9kZSwgbWVhbnMgdGhlIHNlc3Npb24gaXMgZW5kZWQgYW5kIHRoZSBpbnRlcnByZXRlciBzaG91bGRcblx0ICogcmV0dXJuIGEgc3RhY2sgY29udGFpbnMgb25seSBvbmUgbm9kZSBhcyB0aGUgcmVzdWx0IG9mIHRoZSBzZXNzaW9uLCBvciB0aGVcblx0ICogc2Vzc2lvbiByZXR1cm5zIG5vdGhpbmcuIEZvciBvdGhlciBpbnN0cnVjdGlvbnMgdGhlIHN0YWNrIGNhbiBrZWVwIHNvbWVcblx0ICogY29tcHV0ZWQgcmVzdWx0IHRvIHNpbXVsYXRlIHJlYWwgc3RhY2sgbWFjaGluZS4gQnV0IGl0J3MgT0sgdG8gbm90IHVzZSB0aGlzXG5cdCAqIGZlYXR1cmUgYW5kIGFsd2F5cyByZXR1cm4gYW4gZW1wdHkgJ3N0YWNrJyBldmVyeXRpbWUgdGhlICdvbmNoYW5nZScgZ2V0XG5cdCAqIGNhbGxlZCBhbmQgaW50ZXJ1cHRlZC4gSW4gdGhpcyBtb2RlIGl0IG1lYW5zIHRoZSBsYW5ndWFnZSB3YW50IHRvIGtlZXBcblx0ICogYWxsIHN0YXRlcyBieSBpdHNlbGYuXG5cdCAqXG5cdCAqIFBsZWFzZSBub3RlIHRoYXQgZnJvbSB0aGUgZGVzY3JpcHRpb24gYWJvdmUsICdlbmQnIG1lYW5zIHN0YWNrIChzdWJzdGFjaylcblx0ICogZW5kcy4gSXQncyB0b3RhbGx5IGlycmVsZXZhbnQgdG8gJ2V4aXQnLlxuXHQgKlxuXHQgKiBUaGUgbGFzdCBhcmd1bWVudCAnZG9jJyBpcyB3aGF0IGRlc2lnbmVyIGNvdWxkIHB1dCB0aGUgZGVzY3JpcHRpb24gYWJvdXRcblx0ICogdGhlIG1ldGhvZC4gSWYgc2V0LCBpdCB3b3VsZCBhcHBlbmQgdGhlICdydW5lLmRvYydcblx0ICogcHJvcGVydHkgaW4gdGhlIGZ1bmN0aW9uIGl0IHJldHVybnMuIEFuZCB0aGVuIHRoZSBsYW5ndWFnZSBpbnN0YW5jZSBjb3VsZFxuXHQgKiBjYWxsIGBSdW5lLmRvY3VtZW50KDxpbnN0YW5jZT4pYCB0byBnZXQgYSBtZXRob2QgdGhhdCB3b3VsZCByZXR1cm5cblx0ICogJ3sgbWV0aG9kTmFtZTogZGVzY3JpcHRpb24gfScgd2hlbiBpdCBnb3QgaW52b2tlZC5cblx0ICovXG5cdFJ1bmUuZGVmaW5lID0gZnVuY3Rpb24gKG1ldGhvZCwgYXMpIHtcblx0ICB2YXIgZG9jID0gYXJndW1lbnRzLmxlbmd0aCA8PSAyIHx8IGFyZ3VtZW50c1syXSA9PT0gdW5kZWZpbmVkID8gJycgOiBhcmd1bWVudHNbMl07XG5cdFxuXHQgIHZhciBidWlsdCA9IGZ1bmN0aW9uIGJ1aWx0KCkge1xuXHQgICAgdmFyIG5vZGUsIHJlc3VsdHN0YWNrO1xuXHRcblx0ICAgIGZvciAodmFyIF9sZW4gPSBhcmd1bWVudHMubGVuZ3RoLCBhcmdzID0gQXJyYXkoX2xlbiksIF9rZXkgPSAwOyBfa2V5IDwgX2xlbjsgX2tleSsrKSB7XG5cdCAgICAgIGFyZ3NbX2tleV0gPSBhcmd1bWVudHNbX2tleV07XG5cdCAgICB9XG5cdFxuXHQgICAgc3dpdGNoIChhcykge1xuXHQgICAgICBjYXNlICdwdXNoJzpcblx0ICAgICAgICBub2RlID0gbmV3IFJ1bmUuTm9kZShtZXRob2QsIGFyZ3MsIHRoaXMuc3RhY2spO1xuXHQgICAgICAgIHRoaXMuc3RhY2sucHVzaChub2RlKTtcblx0ICAgICAgICByZXN1bHRzdGFjayA9IHRoaXMub25jaGFuZ2UodGhpcy5jb250ZXh0LCBub2RlLCB0aGlzLnN0YWNrKTtcblx0ICAgICAgICBicmVhaztcblx0ICAgICAgY2FzZSAnYmVnaW4nOlxuXHQgICAgICAgIHRoaXMuX3ByZXZzdGFjayA9IHRoaXMuc3RhY2s7XG5cdCAgICAgICAgdGhpcy5zdGFjayA9IFtdO1xuXHQgICAgICAgIG5vZGUgPSBuZXcgUnVuZS5Ob2RlKG1ldGhvZCwgYXJncywgdGhpcy5zdGFjayk7XG5cdCAgICAgICAgdGhpcy5zdGFjay5wdXNoKG5vZGUpOyAvLyBhcyB0aGUgZmlyc3Qgbm9kZSBvZiB0aGUgbmV3IHN0YWNrLlxuXHQgICAgICAgIHJlc3VsdHN0YWNrID0gdGhpcy5vbmNoYW5nZSh0aGlzLmNvbnRleHQsIG5vZGUsIHRoaXMuc3RhY2spO1xuXHQgICAgICAgIGJyZWFrO1xuXHQgICAgICBjYXNlICdlbmQnOlxuXHQgICAgICAgIG5vZGUgPSBuZXcgUnVuZS5Ob2RlKG1ldGhvZCwgYXJncywgdGhpcy5zdGFjayk7XG5cdCAgICAgICAgdGhpcy5zdGFjay5wdXNoKG5vZGUpOyAvLyB0aGUgbGFzdCBub2RlIG9mIHRoZSBzdGFjay5cblx0ICAgICAgICB0aGlzLnN0YWNrID0gdGhpcy5fcHJldnN0YWNrOyAvLyBzd2l0Y2ggYmFjayB0byB0aGUgcHJldmlvdXMgc3RhY2suXG5cdCAgICAgICAgcmVzdWx0c3RhY2sgPSB0aGlzLm9uY2hhbmdlKHRoaXMuY29udGV4dCwgbm9kZSwgdGhpcy5zdGFjayk7XG5cdCAgICAgICAgYnJlYWs7XG5cdCAgICAgIGNhc2UgJ2V4aXQnOlxuXHQgICAgICAgIG5vZGUgPSBuZXcgUnVuZS5Ob2RlKG1ldGhvZCwgYXJncywgdGhpcy5zdGFjayk7XG5cdCAgICAgICAgdGhpcy5zdGFjay5wdXNoKG5vZGUpOyAvLyB0aGUgbGFzdCBub2RlIG9mIHRoZSBzdGFjay5cblx0ICAgICAgICByZXN1bHRzdGFjayA9IHRoaXMub25jaGFuZ2UodGhpcy5jb250ZXh0LCBub2RlLCB0aGlzLnN0YWNrKTtcblx0ICAgICAgICBpZiAoIXJlc3VsdHN0YWNrKSB7XG5cdCAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1xcJ2V4aXRcXCcgbm9kZSBcXCcnICsgbm9kZS50eXBlICsgJ1xcJyBzaG91bGRcXG4gICAgICAgICAgICByZXR1cm4gYSByZXN1bHRzdGFjay4nKTtcblx0ICAgICAgICB9XG5cdCAgICAgICAgcmV0dXJuIHJlc3VsdHN0YWNrWzBdO1xuXHQgICAgfVxuXHQgICAgLy8gSWYgdGhlIGhhbmRsZXIgdXBkYXRlcyB0aGUgc3RhY2ssIGl0IHdvdWxkIHJlcGxhY2UgdGhlIGV4aXN0aW5nIG9uZS5cblx0ICAgIGlmIChyZXN1bHRzdGFjaykge1xuXHQgICAgICB0aGlzLnN0YWNrID0gcmVzdWx0c3RhY2s7XG5cdCAgICB9XG5cdCAgICByZXR1cm4gdGhpcztcblx0ICB9O1xuXHQgIGJ1aWx0LnJ1bmUgPSB7XG5cdCAgICAnYXMnOiBhcyxcblx0ICAgICdkb2MnOiBkb2MsXG5cdCAgICAnbWV0aG9kJzogbWV0aG9kXG5cdCAgfTtcblx0ICByZXR1cm4gYnVpbHQ7XG5cdH07XG5cdFxuXHQvKipcblx0ICogR2VuZXJhdGUgYSBtZXRob2QgdGhhdCB3b3VsZCByZXR1cm4gYWxsIGRvY3VtZW50cyBvZiB0aGUgbWV0aG9kcyxcblx0ICogaW4gYSBmb3JtIG9mICd7IG1ldGhvZE5hbWU6IGRlc2NyaXB0aW9uIH0nLlxuXHQgKlxuXHQgKiBUaGUgYXJndW1lbnQgbXVzdCBiZSB0aGUgbGFuZ3VhZ2UgaW5zdGFuY2Ugd2l0aCBhbGwgZGVmaW5lZCBtZXRob2RzLlxuXHQgKi9cblx0UnVuZS5wdWJsaXNoID0gZnVuY3Rpb24gKGluc3RhbmNlKSB7XG5cdCAgdmFyIGdlbmVyYXRlZCA9IE9iamVjdC5rZXlzKGluc3RhbmNlKS5yZWR1Y2UoZnVuY3Rpb24gKGRvYywgbmFtZSkge1xuXHQgICAgdmFyIG1ldGhvZCA9IGluc3RhbmNlW25hbWVdO1xuXHQgICAgaWYgKG1ldGhvZC5ydW5lKSB7XG5cdCAgICAgIGRvY1tuYW1lXSA9IG1ldGhvZC5ydW5lLmRvYztcblx0ICAgIH1cblx0ICB9LCB7fSk7XG5cdCAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcblx0ICAgIHJldHVybiBnZW5lcmF0ZWQ7XG5cdCAgfTtcblx0fTtcblx0XG5cdFJ1bmUuTm9kZSA9IGZ1bmN0aW9uICh0eXBlLCBhcmdzLCBzdGFjaykge1xuXHQgIHRoaXMudHlwZSA9IHR5cGU7XG5cdCAgdGhpcy5hcmdzID0gYXJncztcblx0ICB0aGlzLnN0YWNrID0gc3RhY2s7XG5cdH07XG5cdFxuXHRSdW5lLkV2YWx1YXRlID0gZnVuY3Rpb24gKCkge1xuXHQgIHZhciBjb250ZXh0ID0gYXJndW1lbnRzLmxlbmd0aCA8PSAwIHx8IGFyZ3VtZW50c1swXSA9PT0gdW5kZWZpbmVkID8ge30gOiBhcmd1bWVudHNbMF07XG5cdFxuXHQgIHRoaXMuX2FuYWx5emVycyA9IFtdO1xuXHQgIHRoaXMuX2ludGVycHJldGVyID0gbnVsbDtcblx0ICB0aGlzLl9jb250ZXh0ID0gY29udGV4dDtcblx0fTtcblx0XG5cdC8qKlxuXHQgKiBBbmFseXplciBjb3VsZCByZWNlaXZlIHRoZSBzdGFjayBjaGFuZ2UgZnJvbSAnUnVuZSNldmFsdWF0ZScsXG5cdCAqIGFuZCBpdCB3b3VsZCBiZSBjYWxsZWQgd2l0aCB0aGUgYXJndW1lbnRzIGFzIHRoZSBmdW5jdGlvbiBkZXNjcmliZXM6XG5cdCAqXG5cdCAqICAgICBSdW5lLnByb3RvdHlwZS5ldmFsdWF0ZSgoY29udGV4dCwgY2hhbmdlLCBzdGFjaykgPT4ge1xuXHQgKiAgICAgICAgLy8gLi4uXG5cdCAqICAgICB9KTtcblx0ICpcblx0ICogU28gdGhlIGFuYWx5emVyIGNvdWxkIGJlOlxuXHQgKlxuXHQgKiAgICBmdW5jdGlvbihjb250ZXh0LCBjaGFuZ2UsIHN0YWNrKSB7XG5cdCAqICAgICAgLy8gRG8gc29tZSBjaGVjayBhbmQgbWF5YmUgY2hhbmdlZCB0aGUgY29udGV4dC5cblx0ICogICAgICAvLyBUaGUgbmV4dCBhbmFseXplciB0byB0aGUgaW50ZXJwcmV0ZXIgd291bGQgYWNjZXB0IHRoZSBhbHRlcm5hdGVkXG5cdCAqICAgICAgLy8gY29udGV4dCBhcyB0aGUgYXJndW1lbnQgJ2NvbnRleHQnLlxuXHQgKiAgICAgIGNvbnRleHQuc29tZUZsYWcgPSB0cnVlO1xuXHQgKiAgICAgIC8vIFdoZW4gdGhlcmUgaXMgd3JvbmcsIHRocm93IGl0LlxuXHQgKiAgICAgIHRocm93IG5ldyBFcnJvcignU29tZSBhbmFseXppbmcgZXJyb3InKTtcblx0ICogICAgfTtcblx0ICpcblx0ICogTm90ZSB0aGF0IHRoZSBhbmFseXplciAoJ2EnKSB3b3VsZCBiZSBpbnZva2VkIHdpdGggZW1wdHkgJ3RoaXMnIG9iamVjdCxcblx0ICogc28gdGhlIGZ1bmN0aW9uIHJlbGllcyBvbiAndGhpcycgc2hvdWxkIGJpbmQgaXRzZWxmIGZpcnN0LlxuXHQgKi9cblx0UnVuZS5FdmFsdWF0ZS5wcm90b3R5cGUuYW5hbHl6ZXIgPSBmdW5jdGlvbiAoYSkge1xuXHQgIHRoaXMuX2FuYWx5emVycy5wdXNoKGEpO1xuXHQgIHJldHVybiB0aGlzO1xuXHR9O1xuXHRcblx0LyoqXG5cdCAqIE9uZSBFdmFsdWF0ZSBjYW4gb25seSBoYXZlIG9uZSBpbnRlcnByZXRlciwgYW5kIGl0IHdvdWxkIHJldHVyblxuXHQgKiB0aGUgZnVuY3Rpb24gY291bGQgY29uc3VtZSBldmVyeSBzdGFjayBjaGFuZ2UgZnJvbSAnUnVuZSNldmFsdWF0ZScuXG5cdCAqXG5cdCAqIFRoZSBjb2RlIGlzIGEgbGl0dGxlIGNvbXBsaWNhdGVkOiB3ZSBoYXZlIHR3byBraW5kcyBvZiAncmVkdWNpbmcnOlxuXHQgKiBvbmUgaXMgdG8gcmVkdWNlIGFsbCBhbmFseXplcnMgd2l0aCB0aGUgc2luZ2xlIGluY29taW5nIGNoYW5nZSxcblx0ICogYW5vdGhlciBpcyB0byByZWR1Y2UgYWxsIGluY29taW5nIGNoYW5nZXMgd2l0aCB0aGlzIGFuYWx5emVycyArIGludGVycHJldGVyLlxuXHQgKlxuXHQgKiBUaGUgYW5hbHl6ZXIgYW5kIGludGVycHJldGVyIHNob3VsZCBjaGFuZ2UgdGhlIGNvbnRleHQsIHRvIG1lbW9yaXplIHRoZVxuXHQgKiBzdGF0ZXMgb2YgdGhlIGV2YWx1YXRpb24uIFRoZSBkaWZmZXJlbmNlIGlzIGludGVycHJldGVyIHNob3VsZCByZXR1cm4gb25lXG5cdCAqIG5ldyBzdGFjayBpZiBpdCBuZWVkcyB0byB1cGRhdGUgdGhlIGV4aXN0aW5nIG9uZS4gVGhlIHN0YWNrIGl0IHJldHVybnMgd291bGRcblx0ICogcmVwbGFjZSB0aGUgZXhpc3Rpbmcgb25lLCBzbyBhbnl0aGluZyBzdGlsbCBpbiB0aGUgb2xkIG9uZSB3b3VsZCBiZSB3aXBlZFxuXHQgKiBvdXQuIFRoZSBpbnRlcnByZXRlciBjb3VsZCByZXR1cm4gbm90aGluZyAoJ3VuZGVmaW5lZCcpIHRvIGtlZXAgdGhlIHN0YWNrXG5cdCAqIHVudG91Y2hlZC5cblx0ICpcblx0ICogVGhlIGFuYWx5emVycyBhbmQgaW50ZXJwcmV0ZXIgY291bGQgY2hhbmdlIHRoZSAnY29udGV4dCcgcGFzcyB0byB0aGVtLlxuXHQgKiBBbmQgc2luY2Ugd2UgbWF5IHVwZGF0ZSB0aGUgc3RhY2sgYXMgYWJvdmUsIHRoZSBjb250ZXh0IHNob3VsZCBtZW1vcml6ZVxuXHQgKiB0aG9zZSBpbmZvcm1hdGlvbiBub3QgdG8gYmUgb3ZlcndyaXR0ZW4gd2hpbGUgdGhlIHN0YWNrIGdldCB3aXBlZCBvdXQuXG5cdCAqXG5cdCAqIEFuZCBpZiB0aGUgaW50ZXJwcmV0aW5nIG5vZGUgaXMgdGhlIGV4aXQgbm9kZSBvZiB0aGUgc2Vzc2lvbiwgaW50ZXJwcmV0ZXJcblx0ICogc2hvdWxkIHJldHVybiBhIG5ldyBzdGFjayBjb250YWlucyBvbmx5IG9uZSBmaW5hbCByZXN1bHQgbm9kZS4gSWYgdGhlcmVcblx0ICogaXMgbm8gc3VjaCBub2RlLCB0aGUgcmVzdWx0IG9mIHRoaXMgc2Vzc2lvbiBpcyAndW5kZWZpbmVkJy5cblx0ICovXG5cdFJ1bmUuRXZhbHVhdGUucHJvdG90eXBlLmludGVycHJldGVyID0gZnVuY3Rpb24gKGlucHQpIHtcblx0ICB2YXIgX3RoaXMgPSB0aGlzO1xuXHRcblx0ICAvLyBUaGUgY3VzdG9taXplZCBsYW5ndWFnZSBzaG91bGQgZ2l2ZSB0aGUgZGVmYXVsdCBjb250ZXh0LlxuXHQgIHJldHVybiBmdW5jdGlvbiAoY29udGV4dCwgY2hhbmdlLCBzdGFjaykge1xuXHQgICAgdHJ5IHtcblx0ICAgICAgLy8gQW5hbHl6ZXJzIGNvdWxkIGNoYW5nZSB0aGUgY29udGV4dC5cblx0ICAgICAgX3RoaXMuX2FuYWx5emVycy5yZWR1Y2UoZnVuY3Rpb24gKGN0eCwgYW5hbHl6ZXIpIHtcblx0ICAgICAgICBhbmFseXplci5jYWxsKHt9LCBjb250ZXh0LCBjaGFuZ2UsIHN0YWNrKTtcblx0ICAgICAgfSwgY29udGV4dCk7XG5cdCAgICB9IGNhdGNoIChlKSB7XG5cdCAgICAgIF90aGlzLl9oYW5kbGVFcnJvcihlLCBjb250ZXh0LCBjaGFuZ2UsIHN0YWNrKTtcblx0ICAgIH1cblx0ICAgIC8vIEFmdGVyIGFuYWx5emUgaXQsIGludGVycHJldCB0aGUgbm9kZSBhbmQgcmV0dXJuIHRoZSBuZXcgc3RhY2sgKGlmIGFueSkuXG5cdCAgICB2YXIgbmV3U3RhY2sgPSBpbnB0KGNvbnRleHQsIGNoYW5nZSwgc3RhY2spO1xuXHQgICAgcmV0dXJuIG5ld1N0YWNrO1xuXHQgIH07XG5cdH07XG5cdFxuXHRSdW5lLkV2YWx1YXRlLnByb3RvdHlwZS5faGFuZGxlRXJyb3IgPSBmdW5jdGlvbiAoZXJyLCBjb250ZXh0LCBjaGFuZ2UsIHN0YWNrKSB7XG5cdCAgLy8gVE9ETzogZXhwYW5kIGl0IHRvIHByb3ZpZGUgbW9yZSBzb3BoaXN0aWMgZGVidWdnaW5nIG1lc3NhZ2UuXG5cdCAgdGhyb3cgbmV3IEVycm9yKCdXaGVuIGNoYW5nZSAnICsgY2hhbmdlLnR5cGUgKyAnIGNvbWVzIGVycm9yIFxcJycgKyBlcnIgKyAnXFwnIGhhcHBlbmVkJyk7XG5cdH07XG5cdG1vZHVsZS5leHBvcnRzID0gZXhwb3J0c1snZGVmYXVsdCddO1xuXG4vKioqLyB9XG4vKioqKioqLyBdKSkpO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxleUoyWlhKemFXOXVJam96TENKemIzVnlZMlZ6SWpwYkluZGxZbkJoWTJzNkx5OHZkMlZpY0dGamF5OWliMjkwYzNSeVlYQWdOalpqTVRGaU5HRTNZVFJtTkdGbU1EaG1NMllpTENKM1pXSndZV05yT2k4dkx5NHZjM0pqTDNKMWJtVXVhbk1pWFN3aWJtRnRaWE1pT2x0ZExDSnRZWEJ3YVc1bmN5STZJanRCUVVGQk8wRkJRMEU3TzBGQlJVRTdRVUZEUVRzN1FVRkZRVHRCUVVOQk8wRkJRMEU3TzBGQlJVRTdRVUZEUVR0QlFVTkJMSFZDUVVGbE8wRkJRMlk3UVVGRFFUdEJRVU5CT3p0QlFVVkJPMEZCUTBFN08wRkJSVUU3UVVGRFFUczdRVUZGUVR0QlFVTkJPMEZCUTBFN096dEJRVWRCTzBGQlEwRTdPMEZCUlVFN1FVRkRRVHM3UVVGRlFUdEJRVU5CT3p0QlFVVkJPMEZCUTBFN096czdPenM3UVVOMFEwRXNZVUZCV1N4RFFVRkRPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3p0elFrRnhSMWNzU1VGQlNUczdRVUZCWWl4VlFVRlRMRWxCUVVrc1IwRkJSeXhGUVVGRk96czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN08wRkJORUpxUXl4TFFVRkpMRU5CUVVNc1RVRkJUU3hIUVVGSExGVkJRVk1zVFVGQlRTeEZRVUZGTEVWQlFVVXNSVUZCV1R0UFFVRldMRWRCUVVjc2VVUkJRVWNzUlVGQlJUczdRVUZEZWtNc1QwRkJTU3hMUVVGTExFZEJRVWNzVTBGQlVpeExRVUZMTEVkQlFYRkNPMEZCUXpWQ0xGTkJRVWtzU1VGQlNTeEZRVUZGTEZkQlFWY3NRMEZCUXpzN2RVTkJSRUVzU1VGQlNUdEJRVUZLTEZkQlFVazdPenRCUVVVeFFpeGhRVUZSTEVWQlFVVTdRVUZEVWl4WlFVRkxMRTFCUVUwN1FVRkRWQ3hoUVVGSkxFZEJRVWNzU1VGQlNTeEpRVUZKTEVOQlFVTXNTVUZCU1N4RFFVRkRMRTFCUVUwc1JVRkJSU3hKUVVGSkxFVkJRVVVzU1VGQlNTeERRVUZETEV0QlFVc3NRMEZCUXl4RFFVRkRPMEZCUXk5RExHRkJRVWtzUTBGQlF5eExRVUZMTEVOQlFVTXNTVUZCU1N4RFFVRkRMRWxCUVVrc1EwRkJReXhEUVVGRE8wRkJRM1JDTEc5Q1FVRlhMRWRCUTFRc1NVRkJTU3hEUVVGRExGRkJRVkVzUTBGQlF5eEpRVUZKTEVOQlFVTXNUMEZCVHl4RlFVRkZMRWxCUVVrc1JVRkJSU3hKUVVGSkxFTkJRVU1zUzBGQlN5eERRVUZETEVOQlFVTTdRVUZEYUVRc1pVRkJUVHRCUVVOU0xGbEJRVXNzVDBGQlR6dEJRVU5XTEdGQlFVa3NRMEZCUXl4VlFVRlZMRWRCUVVjc1NVRkJTU3hEUVVGRExFdEJRVXNzUTBGQlF6dEJRVU0zUWl4aFFVRkpMRU5CUVVNc1MwRkJTeXhIUVVGSExFVkJRVVVzUTBGQlF6dEJRVU5vUWl4aFFVRkpMRWRCUVVjc1NVRkJTU3hKUVVGSkxFTkJRVU1zU1VGQlNTeERRVUZETEUxQlFVMHNSVUZCUlN4SlFVRkpMRVZCUVVVc1NVRkJTU3hEUVVGRExFdEJRVXNzUTBGQlF5eERRVUZETzBGQlF5OURMR0ZCUVVrc1EwRkJReXhMUVVGTExFTkJRVU1zU1VGQlNTeERRVUZETEVsQlFVa3NRMEZCUXl4RFFVRkRPMEZCUTNSQ0xHOUNRVUZYTEVkQlExUXNTVUZCU1N4RFFVRkRMRkZCUVZFc1EwRkJReXhKUVVGSkxFTkJRVU1zVDBGQlR5eEZRVUZGTEVsQlFVa3NSVUZCUlN4SlFVRkpMRU5CUVVNc1MwRkJTeXhEUVVGRExFTkJRVU03UVVGRGFFUXNaVUZCVFR0QlFVTlNMRmxCUVVzc1MwRkJTenRCUVVOU0xHRkJRVWtzUjBGQlJ5eEpRVUZKTEVsQlFVa3NRMEZCUXl4SlFVRkpMRU5CUVVNc1RVRkJUU3hGUVVGRkxFbEJRVWtzUlVGQlJTeEpRVUZKTEVOQlFVTXNTMEZCU3l4RFFVRkRMRU5CUVVNN1FVRkRMME1zWVVGQlNTeERRVUZETEV0QlFVc3NRMEZCUXl4SlFVRkpMRU5CUVVNc1NVRkJTU3hEUVVGRExFTkJRVU03UVVGRGRFSXNZVUZCU1N4RFFVRkRMRXRCUVVzc1IwRkRVaXhKUVVGSkxFTkJRVU1zVlVGQlZTeERRVUZETzBGQlEyeENMRzlDUVVGWExFZEJRMVFzU1VGQlNTeERRVUZETEZGQlFWRXNRMEZCUXl4SlFVRkpMRU5CUVVNc1QwRkJUeXhGUVVGRkxFbEJRVWtzUlVGQlJTeEpRVUZKTEVOQlFVTXNTMEZCU3l4RFFVRkRMRU5CUVVNN1FVRkRhRVFzWlVGQlRUdEJRVU5TTEZsQlFVc3NUVUZCVFR0QlFVTlVMR0ZCUVVrc1IwRkJSeXhKUVVGSkxFbEJRVWtzUTBGQlF5eEpRVUZKTEVOQlFVTXNUVUZCVFN4RlFVRkZMRWxCUVVrc1JVRkJSU3hKUVVGSkxFTkJRVU1zUzBGQlN5eERRVUZETEVOQlFVTTdRVUZETDBNc1lVRkJTU3hEUVVGRExFdEJRVXNzUTBGQlF5eEpRVUZKTEVOQlFVTXNTVUZCU1N4RFFVRkRMRU5CUVVNN1FVRkRkRUlzYjBKQlFWY3NSMEZEVkN4SlFVRkpMRU5CUVVNc1VVRkJVU3hEUVVGRExFbEJRVWtzUTBGQlF5eFBRVUZQTEVWQlFVVXNTVUZCU1N4RlFVRkZMRWxCUVVrc1EwRkJReXhMUVVGTExFTkJRVU1zUTBGQlF6dEJRVU5vUkN4aFFVRkpMRU5CUVVNc1YwRkJWeXhGUVVGRk8wRkJRMmhDTEdsQ1FVRk5MRWxCUVVrc1MwRkJTeXh6UWtGQmFVSXNTVUZCU1N4RFFVRkRMRWxCUVVrc2EwUkJRMmhDTEVOQlFVTTdWVUZETTBJN1FVRkRSQ3huUWtGQlR5eFhRVUZYTEVOQlFVTXNRMEZCUXl4RFFVRkRMRU5CUVVNN1FVRkJRU3hOUVVONlFqczdRVUZGUkN4VFFVRkpMRmRCUVZjc1JVRkJSVHRCUVVObUxGZEJRVWtzUTBGQlF5eExRVUZMTEVkQlFVY3NWMEZCVnl4RFFVRkRPMDFCUXpGQ08wRkJRMFFzV1VGQlR5eEpRVUZKTEVOQlFVTTdTVUZEWWl4RFFVRkRPMEZCUTBZc1VVRkJTeXhEUVVGRExFbEJRVWtzUjBGQlJ6dEJRVU5ZTEZOQlFVa3NSVUZCUlN4RlFVRkZPMEZCUTFJc1ZVRkJTeXhGUVVGRkxFZEJRVWM3UVVGRFZpeGhRVUZSTEVWQlFVVXNUVUZCVFR0SlFVTnFRaXhEUVVGRE8wRkJRMFlzVlVGQlR5eExRVUZMTEVOQlFVTTdSVUZEWkN4RFFVRkRPenM3T3pzN096dEJRVkZHTEV0QlFVa3NRMEZCUXl4UFFVRlBMRWRCUVVjc1ZVRkJVeXhSUVVGUkxFVkJRVVU3UVVGRGFFTXNUMEZCU1N4VFFVRlRMRWRCUVVjc1RVRkJUU3hEUVVGRExFbEJRVWtzUTBGQlF5eFJRVUZSTEVOQlFVTXNRMEZCUXl4TlFVRk5MRU5CUVVNc1ZVRkJReXhIUVVGSExFVkJRVVVzU1VGQlNTeEZRVUZMTzBGQlF6RkVMRk5CUVVrc1RVRkJUU3hIUVVGSExGRkJRVkVzUTBGQlF5eEpRVUZKTEVOQlFVTXNRMEZCUXp0QlFVTTFRaXhUUVVGSkxFMUJRVTBzUTBGQlF5eEpRVUZKTEVWQlFVVTdRVUZEWml4VlFVRkhMRU5CUVVNc1NVRkJTU3hEUVVGRExFZEJRVWNzVFVGQlRTeERRVUZETEVsQlFVa3NRMEZCUXl4SFFVRkhMRU5CUVVNN1RVRkROMEk3U1VGRFJpeEZRVUZGTEVWQlFVVXNRMEZCUXl4RFFVRkRPMEZCUTFBc1ZVRkJUeXhaUVVGWE8wRkJRMmhDTEZsQlFVOHNVMEZCVXl4RFFVRkRPMGxCUTJ4Q0xFTkJRVU03UlVGRFNDeERRVUZET3p0QlFVVkdMRXRCUVVrc1EwRkJReXhKUVVGSkxFZEJRVWNzVlVGQlV5eEpRVUZKTEVWQlFVVXNTVUZCU1N4RlFVRkZMRXRCUVVzc1JVRkJSVHRCUVVOMFF5eFBRVUZKTEVOQlFVTXNTVUZCU1N4SFFVRkhMRWxCUVVrc1EwRkJRenRCUVVOcVFpeFBRVUZKTEVOQlFVTXNTVUZCU1N4SFFVRkhMRWxCUVVrc1EwRkJRenRCUVVOcVFpeFBRVUZKTEVOQlFVTXNTMEZCU3l4SFFVRkhMRXRCUVVzc1EwRkJRenRGUVVOd1FpeERRVUZET3p0QlFVVkdMRXRCUVVrc1EwRkJReXhSUVVGUkxFZEJRVWNzV1VGQmRVSTdUMEZCWkN4UFFVRlBMSGxFUVVGSExFVkJRVVU3TzBGQlEyNURMRTlCUVVrc1EwRkJReXhWUVVGVkxFZEJRVWNzUlVGQlJTeERRVUZETzBGQlEzSkNMRTlCUVVrc1EwRkJReXhaUVVGWkxFZEJRVWNzU1VGQlNTeERRVUZETzBGQlEzcENMRTlCUVVrc1EwRkJReXhSUVVGUkxFZEJRVWNzVDBGQlR5eERRVUZETzBWQlEzcENMRU5CUVVNN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenRCUVhkQ1JpeExRVUZKTEVOQlFVTXNVVUZCVVN4RFFVRkRMRk5CUVZNc1EwRkJReXhSUVVGUkxFZEJRVWNzVlVGQlV5eERRVUZETEVWQlFVVTdRVUZETjBNc1QwRkJTU3hEUVVGRExGVkJRVlVzUTBGQlF5eEpRVUZKTEVOQlFVTXNRMEZCUXl4RFFVRkRMRU5CUVVNN1FVRkRlRUlzVlVGQlR5eEpRVUZKTEVOQlFVTTdSVUZEWWl4RFFVRkRPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN08wRkJlVUpHTEV0QlFVa3NRMEZCUXl4UlFVRlJMRU5CUVVNc1UwRkJVeXhEUVVGRExGZEJRVmNzUjBGQlJ5eFZRVUZUTEVsQlFVa3NSVUZCUlRzN096dEJRVVZ1UkN4VlFVRlBMRlZCUVVNc1QwRkJUeXhGUVVGRkxFMUJRVTBzUlVGQlJTeExRVUZMTEVWQlFVczdRVUZEYWtNc1UwRkJTVHM3UVVGRlJpeGhRVUZMTEZWQlFWVXNRMEZCUXl4TlFVRk5MRU5CUVVNc1ZVRkJReXhIUVVGSExFVkJRVVVzVVVGQlVTeEZRVUZMTzBGQlEzaERMR2xDUVVGUkxFTkJRVU1zU1VGQlNTeERRVUZETEVWQlFVVXNSVUZCUlN4UFFVRlBMRVZCUVVVc1RVRkJUU3hGUVVGRkxFdEJRVXNzUTBGQlF5eERRVUZETzFGQlF6TkRMRVZCUVVVc1QwRkJUeXhEUVVGRExFTkJRVU03VFVGRFlpeERRVUZETEU5QlFVMHNRMEZCUXl4RlFVRkZPMEZCUTFRc1lVRkJTeXhaUVVGWkxFTkJRVU1zUTBGQlF5eEZRVUZGTEU5QlFVOHNSVUZCUlN4TlFVRk5MRVZCUVVVc1MwRkJTeXhEUVVGRExFTkJRVU03VFVGRE9VTTdPMEZCUlVRc1UwRkJTU3hSUVVGUkxFZEJRVWNzU1VGQlNTeERRVUZETEU5QlFVOHNSVUZCUlN4TlFVRk5MRVZCUVVVc1MwRkJTeXhEUVVGRExFTkJRVU03UVVGRE5VTXNXVUZCVHl4UlFVRlJMRU5CUVVNN1NVRkRha0lzUTBGQlF6dEZRVU5JTEVOQlFVTTdPMEZCUlVZc1MwRkJTU3hEUVVGRExGRkJRVkVzUTBGQlF5eFRRVUZUTEVOQlFVTXNXVUZCV1N4SFFVTndReXhWUVVGVExFZEJRVWNzUlVGQlJTeFBRVUZQTEVWQlFVVXNUVUZCVFN4RlFVRkZMRXRCUVVzc1JVRkJSVHM3UVVGRmNFTXNVMEZCVFN4SlFVRkpMRXRCUVVzc2EwSkJRV2RDTEUxQlFVMHNRMEZCUXl4SlFVRkpMSFZDUVVGcFFpeEhRVUZITEdsQ1FVRmhMRU5CUVVNN1JVRkROMFVzUTBGQlF5SXNJbVpwYkdVaU9pSnlkVzVsTG1weklpd2ljMjkxY21ObGMwTnZiblJsYm5RaU9sc2lJRngwTHk4Z1ZHaGxJRzF2WkhWc1pTQmpZV05vWlZ4dUlGeDBkbUZ5SUdsdWMzUmhiR3hsWkUxdlpIVnNaWE1nUFNCN2ZUdGNibHh1SUZ4MEx5OGdWR2hsSUhKbGNYVnBjbVVnWm5WdVkzUnBiMjVjYmlCY2RHWjFibU4wYVc5dUlGOWZkMlZpY0dGamExOXlaWEYxYVhKbFgxOG9iVzlrZFd4bFNXUXBJSHRjYmx4dUlGeDBYSFF2THlCRGFHVmpheUJwWmlCdGIyUjFiR1VnYVhNZ2FXNGdZMkZqYUdWY2JpQmNkRngwYVdZb2FXNXpkR0ZzYkdWa1RXOWtkV3hsYzF0dGIyUjFiR1ZKWkYwcFhHNGdYSFJjZEZ4MGNtVjBkWEp1SUdsdWMzUmhiR3hsWkUxdlpIVnNaWE5iYlc5a2RXeGxTV1JkTG1WNGNHOXlkSE03WEc1Y2JpQmNkRngwTHk4Z1EzSmxZWFJsSUdFZ2JtVjNJRzF2WkhWc1pTQW9ZVzVrSUhCMWRDQnBkQ0JwYm5SdklIUm9aU0JqWVdOb1pTbGNiaUJjZEZ4MGRtRnlJRzF2WkhWc1pTQTlJR2x1YzNSaGJHeGxaRTF2WkhWc1pYTmJiVzlrZFd4bFNXUmRJRDBnZTF4dUlGeDBYSFJjZEdWNGNHOXlkSE02SUh0OUxGeHVJRngwWEhSY2RHbGtPaUJ0YjJSMWJHVkpaQ3hjYmlCY2RGeDBYSFJzYjJGa1pXUTZJR1poYkhObFhHNGdYSFJjZEgwN1hHNWNiaUJjZEZ4MEx5OGdSWGhsWTNWMFpTQjBhR1VnYlc5a2RXeGxJR1oxYm1OMGFXOXVYRzRnWEhSY2RHMXZaSFZzWlhOYmJXOWtkV3hsU1dSZExtTmhiR3dvYlc5a2RXeGxMbVY0Y0c5eWRITXNJRzF2WkhWc1pTd2diVzlrZFd4bExtVjRjRzl5ZEhNc0lGOWZkMlZpY0dGamExOXlaWEYxYVhKbFgxOHBPMXh1WEc0Z1hIUmNkQzh2SUVac1lXY2dkR2hsSUcxdlpIVnNaU0JoY3lCc2IyRmtaV1JjYmlCY2RGeDBiVzlrZFd4bExteHZZV1JsWkNBOUlIUnlkV1U3WEc1Y2JpQmNkRngwTHk4Z1VtVjBkWEp1SUhSb1pTQmxlSEJ2Y25SeklHOW1JSFJvWlNCdGIyUjFiR1ZjYmlCY2RGeDBjbVYwZFhKdUlHMXZaSFZzWlM1bGVIQnZjblJ6TzF4dUlGeDBmVnh1WEc1Y2JpQmNkQzh2SUdWNGNHOXpaU0IwYUdVZ2JXOWtkV3hsY3lCdlltcGxZM1FnS0Y5ZmQyVmljR0ZqYTE5dGIyUjFiR1Z6WDE4cFhHNGdYSFJmWDNkbFluQmhZMnRmY21WeGRXbHlaVjlmTG0wZ1BTQnRiMlIxYkdWek8xeHVYRzRnWEhRdkx5QmxlSEJ2YzJVZ2RHaGxJRzF2WkhWc1pTQmpZV05vWlZ4dUlGeDBYMTkzWldKd1lXTnJYM0psY1hWcGNtVmZYeTVqSUQwZ2FXNXpkR0ZzYkdWa1RXOWtkV3hsY3p0Y2JseHVJRngwTHk4Z1gxOTNaV0p3WVdOclgzQjFZbXhwWTE5d1lYUm9YMTljYmlCY2RGOWZkMlZpY0dGamExOXlaWEYxYVhKbFgxOHVjQ0E5SUZ3aVhDSTdYRzVjYmlCY2RDOHZJRXh2WVdRZ1pXNTBjbmtnYlc5a2RXeGxJR0Z1WkNCeVpYUjFjbTRnWlhod2IzSjBjMXh1SUZ4MGNtVjBkWEp1SUY5ZmQyVmljR0ZqYTE5eVpYRjFhWEpsWDE4b01DazdYRzVjYmx4dVhHNHZLaW9nVjBWQ1VFRkRTeUJHVDA5VVJWSWdLaXBjYmlBcUtpQjNaV0p3WVdOckwySnZiM1J6ZEhKaGNDQTJObU14TVdJMFlUZGhOR1kwWVdZd09HWXpabHh1SUNvcUx5SXNJaWQxYzJVZ2MzUnlhV04wSnp0Y2JseHVMeW9xWEc0Z0tpQkhaVzVsY21saklHSjFhV3hrWlhJZ2RHaGhkQ0IzYjNWc1pDQndkWE5vSUc1dlpHVnpJR2x1ZEc4Z2RHaGxJR1ZFVTB3Z2MzUmhZMnN1WEc0Z0tpQlZjMlZ5SUdOdmRXeGtJR2x1YUdWeWFYUWdkR2hwY3lCMGJ5QmtaV1pwYm1VZ2RHaGxJRzVsZHlCbFJGTk1MbHh1SUNvZ0xTMHRYRzRnS2lCVWFHVWdaR1ZtWVhWc2RDQnpaVzFoYm5ScFkzTWdiMjVzZVNCamIyNTBZV2x1SUhSb1pYTmxJRzl3WlhKaGRHbHZibk02WEc0Z0tseHVJQ29nTVM0Z1czQjFjMmhkSURvZ2NIVnphQ0IwYnlCMGFHVWdZM1Z5Y21WdWRDQnpkR0ZqYTF4dUlDb2dNaTRnVzJKbFoybHVYVG9nWTNKbFlYUmxJR0VnYm1WM0lITjBZV05ySUdGdVpDQnpkMmwwWTJnZ2RHOGdhWFFzWEc0Z0tpQWdJQ0FnSUNBZ0lDQWdJQ0JoYm1RZ2RHaGxiaUJ3ZFhOb0lIUm9aU0J1YjJSbElHbHVkRzhnZEdobElITjBZV05yTGx4dUlDb2dNeTRnVzJWdVpGMGdJRG9nWVdaMFpYSWdjSFZ6YUNCMGFHVWdibTlrWlNCcGJuUnZJSFJvWlNCemRHRmpheXhjYmlBcUlDQWdJQ0FnSUNBZ0lDQWdJR05vWVc1blpTQjBhR1VnWTNWeWNtVnVkQ0J6ZEdGamF5QjBieUIwYUdVZ2NISmxkbWx2ZFhNZ2IyNWxMbHh1SUNvZ05DNGdXMlY0YVhSZElEb2daWGhwZENCMGFHVWdZMjl1ZEdWNGRDQnZaaUIwYUdseklHVkVVMHc3SUhSb1pTQnNZWE4wSUhKbGMzVnNkRnh1SUNvZ0lDQWdJQ0FnSUNBZ0lDQWdiMllnYVhRZ2QyOTFiR1FnWW1VZ2NHRnpjMlZrSUhSdklIUm9aU0J5WlhSMWNtNGdkbUZzZFdVZ2IyWmNiaUFxSUNBZ0lDQWdJQ0FnSUNBZ0lIUm9hWE1nWTJoaGFXNHVYRzRnS2x4dUlDb2dVM1JoWTJzZ1kyOTFiR1FnWW1VZ2JtVnpkR1ZrT2lCM2FHVnVJRnRpWldkcGJsMGdZU0J1WlhjZ2MzUmhZMnNnYVc0Z1ptRmpkQ0JwZENCM2IzVnNaRnh1SUNvZ2NIVnphQ0IwYUdVZ2MzUmhZMnNnYVc1MGJ5QjBhR1VnY0hKbGRtbHZkWE1nYjI1bExpQlRieUIwYUdVZ2MzUmhZMnNnWTI5dGNISnBjMlZjYmlBcUlGdHViMlJsWFNCaGJtUWdXM04wWVdOclhTNWNiaUFxSUMwdExWeHVJQ29nUVd4MGFHOTFaMmdnZEdobElHVkVVMHdnYVc1emRHRnVZMlVnYzJodmRXeGtJSGR5WVhBZ2RHaGxjMlVnWW1GemFXTWdiM0JsY21GMGFXOXVjMXh1SUNvZ2RHOGdiV0Z1YVhCMWJHRjBaU0IwYUdVZ2MzUmhZMnNzSUhSb1pYa2dZV3hzSUc1bFpXUWdkRzhnWTI5dWRtVnlkQ0IwYUdVZ2JXVjBhRzlrWEc0Z0tpQmpZV3hzSUhSdklHNXZaR1Z6TGlCVGJ5QW5VblZ1WlNjZ2NISnZkbWxrWlNCaElIZGhlU0IwYnlCemFXMXdiR2xtZVNCMGFHVWdkMjl5YXpvZ2FXWmNiaUFxSUhSb1pTQnBibk4wWVc1alpTQmpZV3hzSUhSb1pTQmJaR1ZtYVc1bFhTQnRaWFJvYjJRZ2RHaGxJRzVoYldVZ2IyWWdkR2hsSUcxbGRHaHZaQ3hjYmlBcUlHbDBJR052ZFd4a0lHRnpjMjlqYVdGMFpTQjBhR1VnYjNCbGNtRnVaQ0J2WmlCMGFHVWdaVVJUVENCM2FYUm9JSFJvWlNCemRHRmpheUJ0WVc1cGNIVnNZWFJwYjI0dVhHNGdLaUJHYjNJZ1pYaGhiWEJzWlRwY2JpQXFYRzRnS2lBZ0lDQjJZWElnWlVSVFRDQTlJR1oxYm1OMGFXOXVLQ2tnZTMwN1hHNGdLaUFnSUNCbFJGTk1MbkJ5YjNSdmRIbHdaUzUwY21GdWMyRmpkR2x2YmlBOUlGSjFibVV1WkdWbWFXNWxLQ2QwY21GdWMyRmpkR2x2Ymljc0lDZGlaV2RwYmljcE8xeHVJQ29nSUNBZ1pVUlRUQzV3Y205MGIzUjVjR1V1Y0hKbElEMGdVblZ1WlM1a1pXWnBibVVvSjNCeVpTY3NJQ2R3ZFhOb0p5azdYRzRnS2lBZ0lDQmxSRk5NTG5CeWIzUnZkSGx3WlM1d1pYSm1iM0p0SUQwZ1VuVnVaUzVrWldacGJtVW9KM0JsY21admNtMG5MQ0FuY0hWemFDY3BPMXh1SUNvZ0lDQWdaVVJUVEM1d2NtOTBiM1I1Y0dVdWNHOXpkQ0E5SUZKMWJtVXVaR1ZtYVc1bEtDZHdiM04wSnl3Z0oyVnVaQ2NwTzF4dUlDcGNiaUFxSUZSb1pXNGdkR2hsSUdWRVUwd2dZMjkxYkdRZ1ltVWdkWE5sWkNCaGN6cGNiaUFxWEc0Z0tpQWdJQ0FvYm1WM0lHVkVVMHdwWEc0Z0tpQWdJQ0FnSUM1MGNtRnVjMkZqZEdsdmJpZ3BYRzRnS2lBZ0lDQWdJQzV3Y21Vb1kySXBYRzRnS2lBZ0lDQWdJQzV3WlhKbWIzSnRLR05pS1Z4dUlDb2dJQ0FnSUNBdWNHOXpkQ2hqWWlsY2JpQXFYRzRnS2lCQmJtUWdkR2hsSUhOMFlXTnJJSGR2ZFd4a0lHSmxPbHh1SUNwY2JpQXFJQ0FnSUZ0Y2JpQXFJQ0FnSUNBZ2JtOWtaVHduZEhKaGJuTmhZM1JwYjI0bkxENWNiaUFxSUNBZ0lDQWdibTlrWlR3bmNISmxKeXdnWTJJK1hHNGdLaUFnSUNBZ0lHNXZaR1U4SjNCeVpXWnZjbTBuTENCallqNWNiaUFxSUNBZ0lDQWdibTlrWlR3bmNHOXpkQ2NzSUdOaVBseHVJQ29nSUNBZ1hWeHVJQ3BjYmlBcUlFaHZkMlYyWlhJc0lIUm9hWE1nYzJsdGNHeGxJR0Z3Y0hKdllXTm9JSFJvWlNCelpXMWhiblJwWTNNZ2NuVnNaWE1nWVc1a0lHRnVZV3g1ZW1WeWN5QjBiMXh1SUNvZ1ozVmhjbUZ1ZEdWbElIUm9aU0J6ZEdGamF5QnBjeUIyWVd4cFpDNGdSbTl5SUdWNFlXMXdiR1VzSUdsbUlIZGxJR2hoZG1VZ1lTQnRZV3htYjNKdFpXUmNiaUFxSUhOMFlXTnJJR0psWTJGMWMyVWdiMllnZEdobElHWnZiR3h2ZDJsdVp5QmxSRk5NSUhCeWIyZHlZVzA2WEc0Z0tseHVJQ29nSUNBZ0tHNWxkeUJsUkZOTUtWeHVJQ29nSUNBZ0lDQXVjRzl6ZENoallpbGNiaUFxSUNBZ0lDQWdMbkJ5WlNoallpbGNiaUFxSUNBZ0lDQWdMbkJsY21admNtMG9ZMklwWEc0Z0tpQWdJQ0FnSUM1MGNtRnVjMkZqZEdsdmJpZ3BYRzRnS2x4dUlDb2dWR2hsSUhKMWJuUnBiV1VnYldGNUlISmxjRzl5ZENCbGNuSnZkQ0JpWldOaGRYTmxJSGRvWlc0Z0p5NXdiM04wS0dOaUtTY2dkR2hsY21VZ2FYTWdibThnYzNSaFkydGNiaUFxSUdOeVpXRjBaV1FnWW5rZ2RHaGxJR0psWjJsdWJtbHVaeUJ6ZEdWd0xDQnVZVzFsYkhrZ2RHaGxJQ2N1Y0hKbEtHTmlLU2NnYVc0Z2IzVnlJR05oYzJVdVhHNGdLaUJPWlhabGNuUm9aV3hsYzNNc0lIUm9aU0JsY25KdmNpQnRaWE56WVdkbElHbHpJSFJ2YnlCc2IzY3RiR1YyWld3Z1ptOXlJSFJvWlNCc1lXNW5kV0ZuWlNCMWMyVnlMRnh1SUNvZ2MybHVZMlVnZEdobGVTQnphRzkxYkdRZ1kyRnlaU0J1YnlCemRHRmpheUIwYUdsdVozTWdZVzVrSUhOb2IzVnNaQ0J2Ym14NUlHTmhjbVVnWVdKdmRYUWdkR2hsSUdWRVUweGNiaUFxSUdsMGMyVnNaaTVjYmlBcVhHNGdLaUJVYUdVZ2MyOXNkWFJwYjI0Z2FYTWdkRzhnY0hKdmRtbGtaU0JoSUdKaGMybGpJSE4wWVdOcklHOXlaR1Z5YVc1bklHRnVZV3g1ZW1WeUlHRnVaQ0JzWlhRZ2RHaGxYRzRnS2lCc1lXNW5kV0ZuWlNCa1pXTnBaR1VnYUc5M0lIUnZJR1JsYzJOeWFXSmxJSFJvWlNCbGNuSnZjaTRnUVc1a0lITnBibU5sSUhkbElHUnZiaWQwSUdoaGRtVmNiaUFxSUdGdWVTQmpiMjUwWlhoMElHbHVabTl5YldGMGFXOXVJR0ZpYjNWMElIWmhjbWxoWW14bGN5d2djMk52Y0dVZ1lXNWtJRzkwYUdWeUlHVnNaVzFsYm5SelhHNGdLaUJoY3lCaElHTnZiWEJzWlhSbElIQnliMmR5WVcxdGFXNW5JR3hoYm1kMVlXZGxMQ0IzWlNCdmJteDVJRzVsWldRZ2RHOGdaM1ZoY21GdWRHVmxJSFJvWlNCdmNtUmxjaUJwYzF4dUlDb2dZMjl5Y21WamRDd2dZVzVrSUcxaGEyVWdhVzVqYjNKeVpXTjBJR05oYzJWeklHMWxZVzVwYm1kbWRXd3VJRTF2Y21WdmRtVnlMQ0J6YVc1alpTQjBhR1VnWVc1aGJIbDZaWEpjYmlBcUlHNWxaV1J6SUhSdklHRnVZV3g1ZW1VZ2RHaGxJSE4wWVhSbGN5QjNhR1Z1WlhabGNpQjBhR1VnYVc1amIyMXBibWNnYm05a1pTQmpiMjFsY3l3Z2FYUWdhWE1nYVc0Z1ptRmpkRnh1SUNvZ1lXNGdaWFpoYkhWaGRHbHZiaUJ3Y205alpYTnpMQ0J6YnlCMWMyVnlJR052ZFd4a0lHTnZiV0pwYm1VZ2RHaGxJR0Z1WVd4NWVtbHVaeUJoYm1RZ2FXNTBaWEp3Y21WMGFXNW5YRzRnS2lCd2FHRnpaU0JwYm5SdklIUm9aU0J6WVcxbElHWjFibU4wYVc5dUxpQkdiM0lnWlhoaGJYQnNaVHBjYmlBcVhHNGdLaUFnSUNCeWRXNTBhVzFsTG05dVkyaGhibWRsS0NoamIyNTBaWGgwTENCdWIyUmxMQ0J6ZEdGamF5a2dQVDRnZTF4dUlDb2dJQ0FnSUNBZ0lDOHZJRWxtSUhSb1pTQmphR0Z1WjJVZ2FYTWdkRzhnYzNkcGRHTm9JSFJ2SUdFZ2JtVjNJSE4wWVdOckxGeHVJQ29nSUNBZ0lDQWdJQzh2SUhSb1pTQW5jM1JoWTJzbklHaGxjbVVnZDI5MWJHUWdZbVVnZEdobElHNWxkeUJ6ZEdGamF5NWNiaUFxSUNBZ0lDQWdJQ0IyWVhJZ2UzUjVjR1VzSUdGeVozTjlJRDBnYm05a1pUdGNiaUFxSUNBZ0lDQWdJQ0JwWmlBb0ozQnlaU2NnUFQwOUlIUjVjR1VwSUh0Y2JpQXFJQ0FnSUNBZ0lDQWdJR052Ym5SbGVIUXVhVzVwZENBOUlIUnlkV1U3WEc0Z0tpQWdJQ0FnSUNBZ2ZTQmxiSE5sSUdsbUlDZ25jRzl6ZENjZ1BUMDlJSFI1Y0dVZ0ppWWdJV052Ym5SbGVIUXVhVzVwZENrZ2UxeHVJQ29nSUNBZ0lDQWdJQ0FnZEdoeWIzY2dibVYzSUVWeWNtOXlLQ2RVYUdWeVpTQnRkWE4wSUdKbElHOXVaU0JjSW5CeVpWd2lJRzV2WkdVZ1ltVm1iM0psSUhSb1pTQmNJbkJ2YzNSY0lpNG5LVHRjYmlBcUlDQWdJQ0FnSUNCOVhHNGdLaUFnSUNCOUtUdGNiaUFxWEc0Z0tpQlhhWFJvSUhOMVkyZ2dabVZoZEhWeVpTd2dhV1lnZEdobElHbHVZMjl0YVc1bklHNXZaR1VnYjNJZ2RHaGxJSE4wWVdOcklHbHpJRzFoYkdadmNtMWxaQ3hjYmlBcUlHbDBJSE5vYjNWc1pDQjBhSEp2ZHlCMGFHVWdaWEp5YjNJdUlGUm9aU0JsY25KdmNpQmpZWEIwZFhKbFpDQmllU0IwYUdVZ2FXNXpkR0Z1WTJVZ2JHbHJaU0IwYUdselhHNGdLaUJqYjNWc1pDQmlaU0JoSUNkamIyMXdhV3hoZEdsdmJpQmxjbkp2Y2ljdVhHNGdLbHh1SUNvZ1ZHaGxJRzV2ZEdsalpXRmliR1VnWm1GamRDQnBjeUJVYUdVZ1kyRnNiR0poWTJzZ2IyWWdkR2hsSUNkdmJtTm9ZVzVuWlNjZ2FYTWdZV04wZFdGc2JIa2dZU0J5WldSMVkyVnlMRnh1SUNvZ2MyOGdkWE5sY2lCamIzVnNaQ0IwY21WaGRDQjBhR1VnY0hKdlkyVnpjeUJ2WmlCMGFHbHpJR1YyWVd4MVlYUnBiMjRnSmlCaGJtRnNlWHBwYm1jZ1lYTWdZU0J5WldSMVkybHVaMXh1SUNvZ2NISnZZMlZ6Y3lCdmJpQmhiaUJwYm1acGJtbDBaU0J6ZEhKbFlXMHVJRUZ1WkNCemFXNWpaU0IzWlNCb1lYWmxJR0VnYzNSaFkyc2diV0ZqYUdsdVpTd2dhV1lnZEdobFhHNGdLaUJ5WldSMVkyVnlJSEpsZEhWeWJpQnViM1JvYVc1bkxDQjBhR1VnYzNSaFkyc2dkMjkxYkdRZ1ltVWdaVzF3ZEhrdUlFOTBhR1Z5ZDJselpTd2dhV1lnZEdobElISmxaSFZqWlhKY2JpQXFJSEpsZEhWeWJpQmhJRzVsZHlCemRHRmpheXdnYVhRZ2QyOTFiR1FnY21Wd2JHRmpaU0IwYUdVZ2IyeGtJRzl1WlM1Y2JpQXFYRzRnS2lCQmJtUWdjR3hsWVhObElHNXZkR1VnZEdobElHVjRZVzF3YkdVZ2FYTWdiWFZqYUNCemFXMXdiR2xtYVdWa0xpQkdiM0lnZEdobFhHNGdLaUJ5WldGc0lHVkVVMHdnYVhRZ2MyaHZkV3hrSUdKbElIVnpaV1FnYjI1c2VTQmhjeUJoYmlCbGJuUnllU0IwYnlCa2FYTndZWFJqYUNCMGFHVWdZMmhoYm1kbElIUnZYRzRnS2lCMGFHVWdjbVZoYkNCb1lXNWtiR1Z5Y3l3Z2QyaHBZMmdnYldGNUlHTnZiWEJ5YVhObElITmxkbVZ5WVd3Z2MzUmhkR1Z6SUdGdVpDQmpiMjF3YjI1bGJuUnpMbHh1SUNvdlhHNWxlSEJ2Y25RZ1pHVm1ZWFZzZENCbWRXNWpkR2x2YmlCU2RXNWxLQ2tnZTMxY2JseHVMeW9xWEc0Z0tpQklaV3h3WlhJZ2JXVjBhRzlrSUhSdklHSjFhV3hrSUdsdWRHVnlabUZqWlNCdlppQmhJSE53WldOcFptbGpJRVJUVEM0Z1NYUWdkMjkxYkdRZ2NtVjBkWEp1SUdFZ2JXVjBhRzlrWEc0Z0tpQnZaaUIwYUdVZ1JGTk1JR0Z1WkNCMGFHVnVJSFJvWlNCcGJuUmxjbVpoWTJVZ1kyOTFiR1FnWVhSMFlXTm9JR2wwTGx4dUlDcGNiaUFxSUZSb1pTQnlaWFIxY201cGJtY2dablZ1WTNScGIyNGdkMjkxYkdRZ1lYTnpkVzFsSUhSb1lYUWdkR2hsSUNkMGFHbHpKeUJwYm5OcFpHVWdhWFFnYVhNZ2RHaGxJSEoxYm5ScGJXVmNiaUFxSUc5bUlIUm9aU0JzWVc1bmRXRm5aUzRnUVc1a0lITnBibU5sSUhSb1pTQnRaWFJvYjJRZ2FYUWdjbVYwZFhKdWN5QjNiM1ZzWkNCeVpYRjFhWEpsSUhSdklHRmpZMlZ6Y3lCemIyMWxYRzRnS2lCdFpXMWlaWEp6SUc5bUlIUm9aU0FuZEdocGN5Y3NJSFJvWlNBbmRHaHBjeWNnYzJodmRXeGtJR2hoZG1VZ0ozUm9hWE11YzNSaFkyc25JR0Z1WkNBbmRHaHBjeTVqYjI1MFpYaDBKMXh1SUNvZ1lYTWdkR2hsSUcxbGRHaHZaQ0J5WlhGMWFYSmxjeTVjYmlBcVhHNGdLaUJKWmlCcGRDZHpJR0Z1SUNkbGVHbDBKeUJ1YjJSbExDQnRaV0Z1Y3lCMGFHVWdjMlZ6YzJsdmJpQnBjeUJsYm1SbFpDQmhibVFnZEdobElHbHVkR1Z5Y0hKbGRHVnlJSE5vYjNWc1pGeHVJQ29nY21WMGRYSnVJR0VnYzNSaFkyc2dZMjl1ZEdGcGJuTWdiMjVzZVNCdmJtVWdibTlrWlNCaGN5QjBhR1VnY21WemRXeDBJRzltSUhSb1pTQnpaWE56YVc5dUxDQnZjaUIwYUdWY2JpQXFJSE5sYzNOcGIyNGdjbVYwZFhKdWN5QnViM1JvYVc1bkxpQkdiM0lnYjNSb1pYSWdhVzV6ZEhKMVkzUnBiMjV6SUhSb1pTQnpkR0ZqYXlCallXNGdhMlZsY0NCemIyMWxYRzRnS2lCamIyMXdkWFJsWkNCeVpYTjFiSFFnZEc4Z2MybHRkV3hoZEdVZ2NtVmhiQ0J6ZEdGamF5QnRZV05vYVc1bExpQkNkWFFnYVhRbmN5QlBTeUIwYnlCdWIzUWdkWE5sSUhSb2FYTmNiaUFxSUdabFlYUjFjbVVnWVc1a0lHRnNkMkY1Y3lCeVpYUjFjbTRnWVc0Z1pXMXdkSGtnSjNOMFlXTnJKeUJsZG1WeWVYUnBiV1VnZEdobElDZHZibU5vWVc1blpTY2daMlYwWEc0Z0tpQmpZV3hzWldRZ1lXNWtJR2x1ZEdWeWRYQjBaV1F1SUVsdUlIUm9hWE1nYlc5a1pTQnBkQ0J0WldGdWN5QjBhR1VnYkdGdVozVmhaMlVnZDJGdWRDQjBieUJyWldWd1hHNGdLaUJoYkd3Z2MzUmhkR1Z6SUdKNUlHbDBjMlZzWmk1Y2JpQXFYRzRnS2lCUWJHVmhjMlVnYm05MFpTQjBhR0YwSUdaeWIyMGdkR2hsSUdSbGMyTnlhWEIwYVc5dUlHRmliM1psTENBblpXNWtKeUJ0WldGdWN5QnpkR0ZqYXlBb2MzVmljM1JoWTJzcFhHNGdLaUJsYm1SekxpQkpkQ2R6SUhSdmRHRnNiSGtnYVhKeVpXeGxkbUZ1ZENCMGJ5QW5aWGhwZENjdVhHNGdLbHh1SUNvZ1ZHaGxJR3hoYzNRZ1lYSm5kVzFsYm5RZ0oyUnZZeWNnYVhNZ2QyaGhkQ0JrWlhOcFoyNWxjaUJqYjNWc1pDQndkWFFnZEdobElHUmxjMk55YVhCMGFXOXVJR0ZpYjNWMFhHNGdLaUIwYUdVZ2JXVjBhRzlrTGlCSlppQnpaWFFzSUdsMElIZHZkV3hrSUdGd2NHVnVaQ0IwYUdVZ0ozSjFibVV1Wkc5akoxeHVJQ29nY0hKdmNHVnlkSGtnYVc0Z2RHaGxJR1oxYm1OMGFXOXVJR2wwSUhKbGRIVnlibk11SUVGdVpDQjBhR1Z1SUhSb1pTQnNZVzVuZFdGblpTQnBibk4wWVc1alpTQmpiM1ZzWkZ4dUlDb2dZMkZzYkNCZ1VuVnVaUzVrYjJOMWJXVnVkQ2c4YVc1emRHRnVZMlUrS1dBZ2RHOGdaMlYwSUdFZ2JXVjBhRzlrSUhSb1lYUWdkMjkxYkdRZ2NtVjBkWEp1WEc0Z0tpQW5leUJ0WlhSb2IyUk9ZVzFsT2lCa1pYTmpjbWx3ZEdsdmJpQjlKeUIzYUdWdUlHbDBJR2R2ZENCcGJuWnZhMlZrTGx4dUlDb3ZYRzVTZFc1bExtUmxabWx1WlNBOUlHWjFibU4wYVc5dUtHMWxkR2h2WkN3Z1lYTXNJR1J2WXlBOUlDY25LU0I3WEc0Z0lIWmhjaUJpZFdsc2RDQTlJR1oxYm1OMGFXOXVLQzR1TG1GeVozTXBJSHRjYmlBZ0lDQjJZWElnYm05a1pTd2djbVZ6ZFd4MGMzUmhZMnM3WEc0Z0lDQWdjM2RwZEdOb0lDaGhjeWtnZTF4dUlDQWdJQ0FnWTJGelpTQW5jSFZ6YUNjNlhHNGdJQ0FnSUNBZ0lHNXZaR1VnUFNCdVpYY2dVblZ1WlM1T2IyUmxLRzFsZEdodlpDd2dZWEpuY3l3Z2RHaHBjeTV6ZEdGamF5azdYRzRnSUNBZ0lDQWdJSFJvYVhNdWMzUmhZMnN1Y0hWemFDaHViMlJsS1R0Y2JpQWdJQ0FnSUNBZ2NtVnpkV3gwYzNSaFkyc2dQVnh1SUNBZ0lDQWdJQ0FnSUhSb2FYTXViMjVqYUdGdVoyVW9kR2hwY3k1amIyNTBaWGgwTENCdWIyUmxMQ0IwYUdsekxuTjBZV05yS1R0Y2JpQWdJQ0FnSUNBZ1luSmxZV3M3WEc0Z0lDQWdJQ0JqWVhObElDZGlaV2RwYmljNlhHNGdJQ0FnSUNBZ0lIUm9hWE11WDNCeVpYWnpkR0ZqYXlBOUlIUm9hWE11YzNSaFkyczdYRzRnSUNBZ0lDQWdJSFJvYVhNdWMzUmhZMnNnUFNCYlhUdGNiaUFnSUNBZ0lDQWdibTlrWlNBOUlHNWxkeUJTZFc1bExrNXZaR1VvYldWMGFHOWtMQ0JoY21kekxDQjBhR2x6TG5OMFlXTnJLVHRjYmlBZ0lDQWdJQ0FnZEdocGN5NXpkR0ZqYXk1d2RYTm9LRzV2WkdVcE95QWdMeThnWVhNZ2RHaGxJR1pwY25OMElHNXZaR1VnYjJZZ2RHaGxJRzVsZHlCemRHRmpheTVjYmlBZ0lDQWdJQ0FnY21WemRXeDBjM1JoWTJzZ1BWeHVJQ0FnSUNBZ0lDQWdJSFJvYVhNdWIyNWphR0Z1WjJVb2RHaHBjeTVqYjI1MFpYaDBMQ0J1YjJSbExDQjBhR2x6TG5OMFlXTnJLVHRjYmlBZ0lDQWdJQ0FnWW5KbFlXczdYRzRnSUNBZ0lDQmpZWE5sSUNkbGJtUW5PbHh1SUNBZ0lDQWdJQ0J1YjJSbElEMGdibVYzSUZKMWJtVXVUbTlrWlNodFpYUm9iMlFzSUdGeVozTXNJSFJvYVhNdWMzUmhZMnNwTzF4dUlDQWdJQ0FnSUNCMGFHbHpMbk4wWVdOckxuQjFjMmdvYm05a1pTazdJQ0F2THlCMGFHVWdiR0Z6ZENCdWIyUmxJRzltSUhSb1pTQnpkR0ZqYXk1Y2JpQWdJQ0FnSUNBZ2RHaHBjeTV6ZEdGamF5QTlYRzRnSUNBZ0lDQWdJQ0FnZEdocGN5NWZjSEpsZG5OMFlXTnJPeUF2THlCemQybDBZMmdnWW1GamF5QjBieUIwYUdVZ2NISmxkbWx2ZFhNZ2MzUmhZMnN1WEc0Z0lDQWdJQ0FnSUhKbGMzVnNkSE4wWVdOcklEMWNiaUFnSUNBZ0lDQWdJQ0IwYUdsekxtOXVZMmhoYm1kbEtIUm9hWE11WTI5dWRHVjRkQ3dnYm05a1pTd2dkR2hwY3k1emRHRmpheWs3WEc0Z0lDQWdJQ0FnSUdKeVpXRnJPMXh1SUNBZ0lDQWdZMkZ6WlNBblpYaHBkQ2M2WEc0Z0lDQWdJQ0FnSUc1dlpHVWdQU0J1WlhjZ1VuVnVaUzVPYjJSbEtHMWxkR2h2WkN3Z1lYSm5jeXdnZEdocGN5NXpkR0ZqYXlrN1hHNGdJQ0FnSUNBZ0lIUm9hWE11YzNSaFkyc3VjSFZ6YUNodWIyUmxLVHNnSUM4dklIUm9aU0JzWVhOMElHNXZaR1VnYjJZZ2RHaGxJSE4wWVdOckxseHVJQ0FnSUNBZ0lDQnlaWE4xYkhSemRHRmpheUE5WEc0Z0lDQWdJQ0FnSUNBZ2RHaHBjeTV2Ym1Ob1lXNW5aU2gwYUdsekxtTnZiblJsZUhRc0lHNXZaR1VzSUhSb2FYTXVjM1JoWTJzcE8xeHVJQ0FnSUNBZ0lDQnBaaUFvSVhKbGMzVnNkSE4wWVdOcktTQjdYRzRnSUNBZ0lDQWdJQ0FnZEdoeWIzY2dibVYzSUVWeWNtOXlLR0FuWlhocGRDY2dibTlrWlNBbkpIdHViMlJsTG5SNWNHVjlKeUJ6YUc5MWJHUmNiaUFnSUNBZ0lDQWdJQ0FnSUhKbGRIVnliaUJoSUhKbGMzVnNkSE4wWVdOckxtQXBPMXh1SUNBZ0lDQWdJQ0I5WEc0Z0lDQWdJQ0FnSUhKbGRIVnliaUJ5WlhOMWJIUnpkR0ZqYTFzd1hUdGNiaUFnSUNCOVhHNGdJQ0FnTHk4Z1NXWWdkR2hsSUdoaGJtUnNaWElnZFhCa1lYUmxjeUIwYUdVZ2MzUmhZMnNzSUdsMElIZHZkV3hrSUhKbGNHeGhZMlVnZEdobElHVjRhWE4wYVc1bklHOXVaUzVjYmlBZ0lDQnBaaUFvY21WemRXeDBjM1JoWTJzcElIdGNiaUFnSUNBZ0lIUm9hWE11YzNSaFkyc2dQU0J5WlhOMWJIUnpkR0ZqYXp0Y2JpQWdJQ0I5WEc0Z0lDQWdjbVYwZFhKdUlIUm9hWE03WEc0Z0lIMDdYRzRnSUdKMWFXeDBMbkoxYm1VZ1BTQjdYRzRnSUNBZ0oyRnpKem9nWVhNc1hHNGdJQ0FnSjJSdll5YzZJR1J2WXl4Y2JpQWdJQ0FuYldWMGFHOWtKem9nYldWMGFHOWtMRnh1SUNCOU8xeHVJQ0J5WlhSMWNtNGdZblZwYkhRN1hHNTlPMXh1WEc0dktpcGNiaUFxSUVkbGJtVnlZWFJsSUdFZ2JXVjBhRzlrSUhSb1lYUWdkMjkxYkdRZ2NtVjBkWEp1SUdGc2JDQmtiMk4xYldWdWRITWdiMllnZEdobElHMWxkR2h2WkhNc1hHNGdLaUJwYmlCaElHWnZjbTBnYjJZZ0ozc2diV1YwYUc5a1RtRnRaVG9nWkdWelkzSnBjSFJwYjI0Z2ZTY3VYRzRnS2x4dUlDb2dWR2hsSUdGeVozVnRaVzUwSUcxMWMzUWdZbVVnZEdobElHeGhibWQxWVdkbElHbHVjM1JoYm1ObElIZHBkR2dnWVd4c0lHUmxabWx1WldRZ2JXVjBhRzlrY3k1Y2JpQXFMMXh1VW5WdVpTNXdkV0pzYVhOb0lEMGdablZ1WTNScGIyNG9hVzV6ZEdGdVkyVXBJSHRjYmlBZ2RtRnlJR2RsYm1WeVlYUmxaQ0E5SUU5aWFtVmpkQzVyWlhsektHbHVjM1JoYm1ObEtTNXlaV1IxWTJVb0tHUnZZeXdnYm1GdFpTa2dQVDRnZTF4dUlDQWdJSFpoY2lCdFpYUm9iMlFnUFNCcGJuTjBZVzVqWlZ0dVlXMWxYVHRjYmlBZ0lDQnBaaUFvYldWMGFHOWtMbkoxYm1VcElIdGNiaUFnSUNBZ0lHUnZZMXR1WVcxbFhTQTlJRzFsZEdodlpDNXlkVzVsTG1Sdll6dGNiaUFnSUNCOVhHNGdJSDBzSUh0OUtUdGNiaUFnY21WMGRYSnVJR1oxYm1OMGFXOXVLQ2tnZTF4dUlDQWdJSEpsZEhWeWJpQm5aVzVsY21GMFpXUTdYRzRnSUgwN1hHNTlPMXh1WEc1U2RXNWxMazV2WkdVZ1BTQm1kVzVqZEdsdmJpaDBlWEJsTENCaGNtZHpMQ0J6ZEdGamF5a2dlMXh1SUNCMGFHbHpMblI1Y0dVZ1BTQjBlWEJsTzF4dUlDQjBhR2x6TG1GeVozTWdQU0JoY21kek8xeHVJQ0IwYUdsekxuTjBZV05ySUQwZ2MzUmhZMnM3WEc1OU8xeHVYRzVTZFc1bExrVjJZV3gxWVhSbElEMGdablZ1WTNScGIyNG9ZMjl1ZEdWNGRDQTlJSHQ5S1NCN1hHNGdJSFJvYVhNdVgyRnVZV3g1ZW1WeWN5QTlJRnRkTzF4dUlDQjBhR2x6TGw5cGJuUmxjbkJ5WlhSbGNpQTlJRzUxYkd3N1hHNGdJSFJvYVhNdVgyTnZiblJsZUhRZ1BTQmpiMjUwWlhoME8xeHVmVHRjYmx4dUx5b3FYRzRnS2lCQmJtRnNlWHBsY2lCamIzVnNaQ0J5WldObGFYWmxJSFJvWlNCemRHRmpheUJqYUdGdVoyVWdabkp2YlNBblVuVnVaU05sZG1Gc2RXRjBaU2NzWEc0Z0tpQmhibVFnYVhRZ2QyOTFiR1FnWW1VZ1kyRnNiR1ZrSUhkcGRHZ2dkR2hsSUdGeVozVnRaVzUwY3lCaGN5QjBhR1VnWm5WdVkzUnBiMjRnWkdWelkzSnBZbVZ6T2x4dUlDcGNiaUFxSUNBZ0lDQlNkVzVsTG5CeWIzUnZkSGx3WlM1bGRtRnNkV0YwWlNnb1kyOXVkR1Y0ZEN3Z1kyaGhibWRsTENCemRHRmpheWtnUFQ0Z2UxeHVJQ29nSUNBZ0lDQWdJQzh2SUM0dUxseHVJQ29nSUNBZ0lIMHBPMXh1SUNwY2JpQXFJRk52SUhSb1pTQmhibUZzZVhwbGNpQmpiM1ZzWkNCaVpUcGNiaUFxWEc0Z0tpQWdJQ0JtZFc1amRHbHZiaWhqYjI1MFpYaDBMQ0JqYUdGdVoyVXNJSE4wWVdOcktTQjdYRzRnS2lBZ0lDQWdJQzh2SUVSdklITnZiV1VnWTJobFkyc2dZVzVrSUcxaGVXSmxJR05vWVc1blpXUWdkR2hsSUdOdmJuUmxlSFF1WEc0Z0tpQWdJQ0FnSUM4dklGUm9aU0J1WlhoMElHRnVZV3g1ZW1WeUlIUnZJSFJvWlNCcGJuUmxjbkJ5WlhSbGNpQjNiM1ZzWkNCaFkyTmxjSFFnZEdobElHRnNkR1Z5Ym1GMFpXUmNiaUFxSUNBZ0lDQWdMeThnWTI5dWRHVjRkQ0JoY3lCMGFHVWdZWEpuZFcxbGJuUWdKMk52Ym5SbGVIUW5MbHh1SUNvZ0lDQWdJQ0JqYjI1MFpYaDBMbk52YldWR2JHRm5JRDBnZEhKMVpUdGNiaUFxSUNBZ0lDQWdMeThnVjJobGJpQjBhR1Z5WlNCcGN5QjNjbTl1Wnl3Z2RHaHliM2NnYVhRdVhHNGdLaUFnSUNBZ0lIUm9jbTkzSUc1bGR5QkZjbkp2Y2lnblUyOXRaU0JoYm1Gc2VYcHBibWNnWlhKeWIzSW5LVHRjYmlBcUlDQWdJSDA3WEc0Z0tseHVJQ29nVG05MFpTQjBhR0YwSUhSb1pTQmhibUZzZVhwbGNpQW9KMkVuS1NCM2IzVnNaQ0JpWlNCcGJuWnZhMlZrSUhkcGRHZ2daVzF3ZEhrZ0ozUm9hWE1uSUc5aWFtVmpkQ3hjYmlBcUlITnZJSFJvWlNCbWRXNWpkR2x2YmlCeVpXeHBaWE1nYjI0Z0ozUm9hWE1uSUhOb2IzVnNaQ0JpYVc1a0lHbDBjMlZzWmlCbWFYSnpkQzVjYmlBcUwxeHVVblZ1WlM1RmRtRnNkV0YwWlM1d2NtOTBiM1I1Y0dVdVlXNWhiSGw2WlhJZ1BTQm1kVzVqZEdsdmJpaGhLU0I3WEc0Z0lIUm9hWE11WDJGdVlXeDVlbVZ5Y3k1d2RYTm9LR0VwTzF4dUlDQnlaWFIxY200Z2RHaHBjenRjYm4wN1hHNWNiaThxS2x4dUlDb2dUMjVsSUVWMllXeDFZWFJsSUdOaGJpQnZibXg1SUdoaGRtVWdiMjVsSUdsdWRHVnljSEpsZEdWeUxDQmhibVFnYVhRZ2QyOTFiR1FnY21WMGRYSnVYRzRnS2lCMGFHVWdablZ1WTNScGIyNGdZMjkxYkdRZ1kyOXVjM1Z0WlNCbGRtVnllU0J6ZEdGamF5QmphR0Z1WjJVZ1puSnZiU0FuVW5WdVpTTmxkbUZzZFdGMFpTY3VYRzRnS2x4dUlDb2dWR2hsSUdOdlpHVWdhWE1nWVNCc2FYUjBiR1VnWTI5dGNHeHBZMkYwWldRNklIZGxJR2hoZG1VZ2RIZHZJR3RwYm1SeklHOW1JQ2R5WldSMVkybHVaeWM2WEc0Z0tpQnZibVVnYVhNZ2RHOGdjbVZrZFdObElHRnNiQ0JoYm1Gc2VYcGxjbk1nZDJsMGFDQjBhR1VnYzJsdVoyeGxJR2x1WTI5dGFXNW5JR05vWVc1blpTeGNiaUFxSUdGdWIzUm9aWElnYVhNZ2RHOGdjbVZrZFdObElHRnNiQ0JwYm1OdmJXbHVaeUJqYUdGdVoyVnpJSGRwZEdnZ2RHaHBjeUJoYm1Gc2VYcGxjbk1nS3lCcGJuUmxjbkJ5WlhSbGNpNWNiaUFxWEc0Z0tpQlVhR1VnWVc1aGJIbDZaWElnWVc1a0lHbHVkR1Z5Y0hKbGRHVnlJSE5vYjNWc1pDQmphR0Z1WjJVZ2RHaGxJR052Ym5SbGVIUXNJSFJ2SUcxbGJXOXlhWHBsSUhSb1pWeHVJQ29nYzNSaGRHVnpJRzltSUhSb1pTQmxkbUZzZFdGMGFXOXVMaUJVYUdVZ1pHbG1abVZ5Wlc1alpTQnBjeUJwYm5SbGNuQnlaWFJsY2lCemFHOTFiR1FnY21WMGRYSnVJRzl1WlZ4dUlDb2dibVYzSUhOMFlXTnJJR2xtSUdsMElHNWxaV1J6SUhSdklIVndaR0YwWlNCMGFHVWdaWGhwYzNScGJtY2diMjVsTGlCVWFHVWdjM1JoWTJzZ2FYUWdjbVYwZFhKdWN5QjNiM1ZzWkZ4dUlDb2djbVZ3YkdGalpTQjBhR1VnWlhocGMzUnBibWNnYjI1bExDQnpieUJoYm5sMGFHbHVaeUJ6ZEdsc2JDQnBiaUIwYUdVZ2IyeGtJRzl1WlNCM2IzVnNaQ0JpWlNCM2FYQmxaRnh1SUNvZ2IzVjBMaUJVYUdVZ2FXNTBaWEp3Y21WMFpYSWdZMjkxYkdRZ2NtVjBkWEp1SUc1dmRHaHBibWNnS0NkMWJtUmxabWx1WldRbktTQjBieUJyWldWd0lIUm9aU0J6ZEdGamExeHVJQ29nZFc1MGIzVmphR1ZrTGx4dUlDcGNiaUFxSUZSb1pTQmhibUZzZVhwbGNuTWdZVzVrSUdsdWRHVnljSEpsZEdWeUlHTnZkV3hrSUdOb1lXNW5aU0IwYUdVZ0oyTnZiblJsZUhRbklIQmhjM01nZEc4Z2RHaGxiUzVjYmlBcUlFRnVaQ0J6YVc1alpTQjNaU0J0WVhrZ2RYQmtZWFJsSUhSb1pTQnpkR0ZqYXlCaGN5QmhZbTkyWlN3Z2RHaGxJR052Ym5SbGVIUWdjMmh2ZFd4a0lHMWxiVzl5YVhwbFhHNGdLaUIwYUc5elpTQnBibVp2Y20xaGRHbHZiaUJ1YjNRZ2RHOGdZbVVnYjNabGNuZHlhWFIwWlc0Z2QyaHBiR1VnZEdobElITjBZV05ySUdkbGRDQjNhWEJsWkNCdmRYUXVYRzRnS2x4dUlDb2dRVzVrSUdsbUlIUm9aU0JwYm5SbGNuQnlaWFJwYm1jZ2JtOWtaU0JwY3lCMGFHVWdaWGhwZENCdWIyUmxJRzltSUhSb1pTQnpaWE56YVc5dUxDQnBiblJsY25CeVpYUmxjbHh1SUNvZ2MyaHZkV3hrSUhKbGRIVnliaUJoSUc1bGR5QnpkR0ZqYXlCamIyNTBZV2x1Y3lCdmJteDVJRzl1WlNCbWFXNWhiQ0J5WlhOMWJIUWdibTlrWlM0Z1NXWWdkR2hsY21WY2JpQXFJR2x6SUc1dklITjFZMmdnYm05a1pTd2dkR2hsSUhKbGMzVnNkQ0J2WmlCMGFHbHpJSE5sYzNOcGIyNGdhWE1nSjNWdVpHVm1hVzVsWkNjdVhHNGdLaTljYmxKMWJtVXVSWFpoYkhWaGRHVXVjSEp2ZEc5MGVYQmxMbWx1ZEdWeWNISmxkR1Z5SUQwZ1puVnVZM1JwYjI0b2FXNXdkQ2tnZTF4dUlDQXZMeUJVYUdVZ1kzVnpkRzl0YVhwbFpDQnNZVzVuZFdGblpTQnphRzkxYkdRZ1oybDJaU0IwYUdVZ1pHVm1ZWFZzZENCamIyNTBaWGgwTGx4dUlDQnlaWFIxY200Z0tHTnZiblJsZUhRc0lHTm9ZVzVuWlN3Z2MzUmhZMnNwSUQwK0lIdGNiaUFnSUNCMGNua2dlMXh1SUNBZ0lDQWdMeThnUVc1aGJIbDZaWEp6SUdOdmRXeGtJR05vWVc1blpTQjBhR1VnWTI5dWRHVjRkQzVjYmlBZ0lDQWdJSFJvYVhNdVgyRnVZV3g1ZW1WeWN5NXlaV1IxWTJVb0tHTjBlQ3dnWVc1aGJIbDZaWElwSUQwK0lIdGNiaUFnSUNBZ0lDQWdZVzVoYkhsNlpYSXVZMkZzYkNoN2ZTd2dZMjl1ZEdWNGRDd2dZMmhoYm1kbExDQnpkR0ZqYXlrN1hHNGdJQ0FnSUNCOUxDQmpiMjUwWlhoMEtUdGNiaUFnSUNCOUlHTmhkR05vS0dVcElIdGNiaUFnSUNBZ0lIUm9hWE11WDJoaGJtUnNaVVZ5Y205eUtHVXNJR052Ym5SbGVIUXNJR05vWVc1blpTd2djM1JoWTJzcE8xeHVJQ0FnSUgxY2JpQWdJQ0F2THlCQlpuUmxjaUJoYm1Gc2VYcGxJR2wwTENCcGJuUmxjbkJ5WlhRZ2RHaGxJRzV2WkdVZ1lXNWtJSEpsZEhWeWJpQjBhR1VnYm1WM0lITjBZV05ySUNocFppQmhibmtwTGx4dUlDQWdJSFpoY2lCdVpYZFRkR0ZqYXlBOUlHbHVjSFFvWTI5dWRHVjRkQ3dnWTJoaGJtZGxMQ0J6ZEdGamF5azdYRzRnSUNBZ2NtVjBkWEp1SUc1bGQxTjBZV05yTzF4dUlDQjlPMXh1ZlR0Y2JseHVVblZ1WlM1RmRtRnNkV0YwWlM1d2NtOTBiM1I1Y0dVdVgyaGhibVJzWlVWeWNtOXlJRDFjYm1aMWJtTjBhVzl1S0dWeWNpd2dZMjl1ZEdWNGRDd2dZMmhoYm1kbExDQnpkR0ZqYXlrZ2UxeHVJQ0F2THlCVVQwUlBPaUJsZUhCaGJtUWdhWFFnZEc4Z2NISnZkbWxrWlNCdGIzSmxJSE52Y0docGMzUnBZeUJrWldKMVoyZHBibWNnYldWemMyRm5aUzVjYmlBZ2RHaHliM2NnYm1WM0lFVnljbTl5S0dCWGFHVnVJR05vWVc1blpTQWtlMk5vWVc1blpTNTBlWEJsZlNCamIyMWxjeUJsY25KdmNpQW5KSHRsY25KOUp5Qm9ZWEJ3Wlc1bFpHQXBPMXh1ZlR0Y2JseHVYRzVjYmk4cUtpQlhSVUpRUVVOTElFWlBUMVJGVWlBcUtseHVJQ29xSUM0dmMzSmpMM0oxYm1VdWFuTmNiaUFxS2k4aVhTd2ljMjkxY21ObFVtOXZkQ0k2SWlKOVxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi4vZGlzdC9ydW5lLmpzXG4gKiogbW9kdWxlIGlkID0gNTlcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IEVmZmVjdCBmcm9tICdkZW1vL2VmZmVjdC5qcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIFJ1bnRpbWUoKSB7fVxuXG4vKipcbiAqIFdoZW4gdGhlIHN0YWNrIG9mIERTTCBjaGFuZ2VzLCBldmFsdWF0ZSB0aGUgTGFuZ3VhZ2UuTm9kZS5cbiAqL1xuUnVudGltZS5wcm90b3R5cGUub25jaGFuZ2UgPSBmdW5jdGlvbihpbnN0YW5jZSwgY2hhbmdlLCBzdGFjaykge1xuICAvLyBTaW5jZSB3ZSBkb24ndCBuZWVkIHRvIGtlZXAgdGhpbmdzIGluIHN0YWNrIHVudGlsIHdlIGhhdmVcbiAgLy8gcmVhbCBhbmFseXplcnMsIHRoZSAnb25jaGFuZ2UnIGhhbmRsZXIgd291bGQgcmV0dXJuIGVtcHR5IHN0YWNrXG4gIC8vIHRvIGxldCB0aGUgbGFuZ3VhZ2UgcnVudGltZSBjbGVhciB0aGUgc3RhY2sgZXZlcnkgaW5zdHJ1Y3Rpb24uXG4gIHZhciByZXN1bHQgPSB0aGlzW2NoYW5nZS50eXBlXS5hcHBseSh0aGlzLCBjaGFuZ2UuYXJncyk7XG4gIC8vIHJldHVybiBlbXB0eSAnaGFuZGxlZCcgc3RhY2sgdG8gbGV0IFJ1bmUga2VlcCBubyBzdGF0ZXMgb2ZcbiAgLy8gZXZlcnkgaW5zdHJ1Y3Rpb24sIGV4Y2VwdCB0aGUgcmVzdWx0LlxuICByZXR1cm4gWyByZXN1bHQgXTtcbiAgLy8gVE9ETzogaG93IHRvIGNvbmNhdCBgZWZmZWN0YDsgaG93IHRvIHBhc3Mgc2lnbmFsICYgZGF0YSwgbm90IG9ubHkgZGF0YTtcbn07XG5cblJ1bnRpbWUuRGVmZXJyZWQgPSBmdW5jdGlvbigpIHtcbiAgdmFyIHByb21pc2UgPSBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgdGhpcy5yZXNvbHZlID0gcmVzb2x2ZTtcbiAgICB0aGlzLnJlamVjdCA9IHJlamVjdDtcbiAgfSk7XG4gIHRoaXMucHJvbWlzZSA9IHByb21pc2U7XG4gIHJldHVybiB0aGlzO1xufTtcblxuUnVudGltZS5Db250ZXh0ID0gZnVuY3Rpb24oZW52aXJvbm1lbnQpIHtcbiAgdGhpcy5kZWZlcnJlZCA9IG5ldyBSdW50aW1lLkRlZmVycmVkKCk7XG4gIGZvciAodmFyIG5hbWUgaW4gZW52aXJvbm1lbnQpIHtcbiAgICB0aGlzW25hbWVdID0gZW52aXJvbm1lbnRbbmFtZV07XG4gIH1cbn07XG5cbi8qKlxuICogUmV0dXJuaW5nIHdpbGwgbW92ZSB0aGUgbWFpbiBwcm9jZXNzIHRvIHRoZSBuZXh0IHN0ZXAuXG4gKi9cblJ1bnRpbWUuQ29udGV4dC5wcm90b3R5cGUucmV0dXJucyA9IGZ1bmN0aW9uKHJldHZhcikge1xuICBpZiAoYXJndW1lbnRzLmxlbmd0aCA+IDEpIHtcbiAgICByZXR2YXIgPSBBcnJheS5mcm9tKGFyZ3VtZW50cyk7XG4gIH1cbiAgaWYgKCF0aGlzLmludGVycnVwdGVkKSB7XG4gICAgdGhpcy5yZXR2YXIgPSByZXR2YXI7XG4gICAgdGhpcy5kZWZlcnJlZC5yZXNvbHZlKHJldHZhcik7XG4gIH0gZWxzZSB7XG4gICAgLy8gSWYgaXQncyBhbHJlYWR5IGludGVycnVwdGVkLCBkbyBub3RoaW5nLlxuICAgIC8vIEluIHRoZW9yeSB0aGlzIHNob3VsZCBudWxsaWZ5IGFsbCBlZmZlY3RzLCBzaW5jZSB3ZSBzaG91bGRcbiAgICAvLyBuZXZlciBkbyBlZmZlY3QgZHVyaW5nIHN0ZXBzLiBTbyBpZiBhIHByb2Nlc3Mgd2FzIGludGVycnVwdGVkXG4gICAgLy8gYmVmb3JlIGl0IGVuZHMgYWxsIGRhdGUgbWFuaXB1bGF0aW9uIHN0ZXBzLCBpdCBzaG91bGQgZG8gbm90aGluZy5cbiAgICB0aGlzLmRlZmVycmVkLnJlamVjdCgpO1xuICB9XG59O1xuXG5SdW50aW1lLkNvbnRleHQucHJvdG90eXBlLnJhaXNlID0gZnVuY3Rpb24oZXJyKSB7XG4gIC8vIFRoZSBlcnJvciB3aWxsIGJlIGNhcHR1cmVkIGJ5IG1haW4gcXVldWUncyBgb25Qcm9jZXNzRXJyb3JgLlxuICB0aGlzLmRlZmVycmVkLnJlamVjdChlcnIpO1xufTtcblxuUnVudGltZS5Db250ZXh0LnByb3RvdHlwZS5pbnRlcnJ1cHQgPSBmdW5jdGlvbihyZXN1bHQsIHJlYXNvbiA9ICcnKSB7XG4gIHRoaXMucmVzdWx0ID0gcmVzdWx0O1xuICB0aGlzLmludGVycnVwdGVkID0gdHJ1ZTtcbiAgLy8gVGhlIGludGVycnVwdCB3aWxsIGJlIGNhcHR1cmVkIGJ5IG1haW4gcXVldWUncyBgb25Qcm9jZXNzRXJyb3JgLlxuICB2YXIgaW50ZXJydXB0ID0gbmV3IFJ1bnRpbWUuSW50ZXJydXB0KHJlYXNvbik7XG4gIHRoaXMuZGVmZXJyZWQucmVqZWN0KGludGVycnVwdCk7XG59O1xuXG5SdW50aW1lLkludGVycnVwdCA9IGZ1bmN0aW9uKCkge307XG5cblJ1bnRpbWUucHJvdG90eXBlLm9uUHJvY2Vzc0Vycm9yID0gZnVuY3Rpb24oZXJyKSB7XG4gIGlmICghKGVyciBpbnN0YW5jZW9mIFJ1bnRpbWUuSW50ZXJydXB0KSkge1xuICAgIC8vIFByaW50IGl0IHRvIGRlYnVnLlxuICAgIGNvbnNvbGUuZXJyb3IoZXJyKTtcbiAgICAvLyBUaGVuIHRvIGludGVycnVwdCB0aGUgcHJvY2Vzcy5cbiAgICB0aHJvdyBlcnI7XG4gIH0gZWxzZSB7XG4gICAgLy8gT25seSB0byBpbnRlcnJ1cHQgdGhlIHByb2Nlc3MuXG4gIH1cbn07XG5cblJ1bnRpbWUucHJvdG90eXBlLnN0YXJ0ID0gZnVuY3Rpb24oKSB7XG4gIHZhciBkZWZlcnJlZCA9IG5ldyBSdW50aW1lLkRlZmVycmVkKCk7XG4gIHRoaXMucXVldWUgPSBkZWZlcnJlZC5wcm9taXNlO1xuICAvLyBXZSB3aWxsIHJlc29sdmUgaXQgYXQgYGRvbmVgIGFueXdheSwgc29cbiAgLy8gYHJlamVjdGAgZG9lc24ndCBtYXR0ZXIuXG4gIHRoaXMucmVzb2x2ZSA9IGRlZmVycmVkLnJlc29sdmU7XG4gIHRoaXMucmVqZWN0ID0gZGVmZXJyZWQucmVqZWN0O1xuICB0aGlzLnJlc3VsdCA9IG51bGw7IC8vIHRoZSByZXN1bHQgZnJvbSBlYWNoIHN0ZXAuXG4gIHRoaXMuZW52aXJvbm1lbnQgPSB7fTtcbn07XG5cblJ1bnRpbWUucHJvdG90eXBlLmFzID0gZnVuY3Rpb24obmFtZSkge1xuICB0aGlzLnF1ZXVlID0gdGhpcy5xdWV1ZS50aGVuKCgpID0+IHtcbiAgICBpZiAoJ3VuZGVmaW5lZCcgIT09IHR5cGVvZiB0aGlzLmVudmlyb25tZW50W25hbWVdKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1Njb3BlZCB2YXJpYWJsZSBcXCcnICsgbmFtZSArICdcXCcgZGVmaW5lZCB0d2ljZScpO1xuICAgIH1cbiAgICBpZiAoJ3VuZGVmaW5lZCcgIT09IHR5cGVvZiBSdW50aW1lLkNvbnRleHQucHJvdG90eXBlW25hbWVdKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1JlZnVzZSB0byBuYW1lIHZhcmlhYmxlIGFzIGNvbnRleHQgcmV2ZXJzZWQgd29yZDogJyArXG4gICAgICAgICdcXCcnICsgbmFtZSArICdcXCcnKTtcbiAgICB9XG4gICAgdGhpcy5lbnZpcm9ubWVudFtuYW1lXSA9IHRoaXMucmVzdWx0O1xuICAgIHJldHVybiB0aGlzLnJlc3VsdDtcbiAgfSk7XG59O1xuXG4vKipcbiAqIEVuZHMgdGhlIGRlZmluaXRpb24gYnV0IG5vdCBydW4gaXQuXG4gKi9cblJ1bnRpbWUucHJvdG90eXBlLmRvbmUgPSBmdW5jdGlvbigpIHtcbiAgdGhpcy5xdWV1ZSA9IHRoaXMucXVldWUuY2F0Y2godGhpcy5vblByb2Nlc3NFcnJvci5iaW5kKHRoaXMpKTtcbn07XG5cbi8qKlxuICogRW5kcyB0aGUgZGVmaW5pdGlvbiBhbmQgcnVuIGl0IGltbWVkaWF0ZWx5IHdpdGggb3B0aW9uYWwgZGF0YS5cbiAqL1xuUnVudGltZS5wcm90b3R5cGUucnVuID0gZnVuY3Rpb24oZGF0YSA9IG51bGwpIHtcbiAgdGhpcy5xdWV1ZSA9IHRoaXMucXVldWUuY2F0Y2godGhpcy5vblByb2Nlc3NFcnJvci5iaW5kKHRoaXMpKTtcbiAgdGhpcy5yZXN1bHQgPSBkYXRhO1xuICB0aGlzLnJlc29sdmUoKTsgLy8gU28gdGhlIHF1ZXVlIHN0YXJ0IHRvIGV4ZWN1dGUuXG59O1xuXG5SdW50aW1lLnByb3RvdHlwZS5fY3JlYXRlQ29udGV4dCA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gbmV3IFJ1bnRpbWUuQ29udGV4dCh0aGlzLmVudmlyb25tZW50KTtcbn07XG5cblJ1bnRpbWUucHJvdG90eXBlLm5leHQgPSBmdW5jdGlvbihzdGVwKSB7XG4gIHRoaXMucXVldWUgPSB0aGlzLnF1ZXVlLnRoZW4oKCkgPT4ge1xuICAgIHZhciBjb250ZXh0ID0gdGhpcy5fY3JlYXRlQ29udGV4dCgpO1xuICAgIHN0ZXAoY29udGV4dCwgdGhpcy5yZXN1bHQpO1xuICAgIHJldHVybiBjb250ZXh0LmRlZmVycmVkLnByb21pc2U7XG4gIH0pLnRoZW4oKHJlc3VsdCkgPT4ge1xuICAgIGlmIChyZXN1bHQubmV4dCkge1xuICAgICAgLy8gSWYgaXQncyBhbHNvIGEgRWRkYSBBY3Rpb24gc3RhdGVtZW50cywgY29uY2F0IGl0LlxuICAgICAgcmV0dXJuIHJlc3VsdC5xdWV1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gTm8gbWF0dGVyIGl0J3MgdmFsdWUgZnJvbSBhbiBvcmRpbmFyeSBmdW5jdGlvbiBvclxuICAgICAgLy8gYSBQcm9taXNlLCByZXR1cm5pbmcgaXQgaXMgbGVnaXQgZm9yIGEgUHJvbWlzZS5cbiAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuICB9KVxuICAudGhlbigocmVzdWx0KSA9PiB7XG4gICAgLy8gR2V0IHRoZSByZXN1bHQgZnJvbSBuZXdQcm9taXNlIGFuZCBzZXQgaXQuXG4gICAgdGhpcy5yZXN1bHQgPSByZXN1bHQ7XG4gIH0pO1xufTtcblxuUnVudGltZS5wcm90b3R5cGUubWF0Y2ggPSBmdW5jdGlvbigpIHtcbiAgLy8gQ29sbGVjdCBhbGwgJ2Nhc2UnIFByb21pc2VzIGhlcmUuXG4gIHRoaXMucXVldWUgPSB0aGlzLnF1ZXVlLnRoZW4oKCkgPT4ge1xuICAgIHRoaXMubWF0Y2hpbmcgPSBbXTtcbiAgICB0aGlzLm1hdGNoaW5nLm1hdGNoZWQgPSBmYWxzZTtcbiAgfSk7XG59O1xuXG4vLyBNYXRjaGluZyBlbmQ6IGV4ZWN1dGUgYWxsIG1hdGNoaW5nIGNhc2VzLlxuUnVudGltZS5wcm90b3R5cGUuZW5kID0gZnVuY3Rpb24oKSB7XG4gIHRoaXMucXVldWUgPSB0aGlzLnF1ZXVlLnRoZW4oKCkgPT4ge1xuICAgIHRoaXMubWF0Y2hpbmcgPSBudWxsO1xuICB9KTtcbn07XG5cbi8qKlxuICogYHByZWRgIG11c3QgYmUgYSBzeW5jIGZ1bmN0aW9uIG9ubHkgcmV0dXJuIHRydWUgb3IgZmFsc2UuXG4gKiBJZiBtdWx0aXBsZSBgY2FzZWAgY2FuIG1hdGNoIHRoZSByZXN1bHQsIG9ubHkgdGhlIGZpcnN0IG1hdGNoaW5nIG9uZVxuICogd2lsbCBiZSBleGVjdXRlZCBhbmQgbGVhdmUgdGhlIHJlc3VsdC5cbiAqL1xuUnVudGltZS5wcm90b3R5cGUuY2FzZSA9IGZ1bmN0aW9uKHByZWQpIHtcbiAgdGhpcy5xdWV1ZSA9IHRoaXMucXVldWUudGhlbigoKSA9PiB7XG4gICAgdmFyIGlkID0gdGhpcy5tYXRjaGluZy5sZW5ndGg7XG4gICAgLy8gSW4gYSBgbWF0Y2hgLCB3ZSBkb24ndCB1cGRhdGUgdGhlIHJlc3VsdCxcbiAgICAvLyBzbyBldmVyeSBgY2FzZWAgY2FuIGp1ZGdlIGlmIGl0J3MgdHJ1ZS5cbiAgICB2YXIgcHJlZHJlc3VsdCA9IHByZWQodGhpcy5yZXN1bHQpO1xuICAgIHRoaXMubWF0Y2hpbmdbaWRdID0gcHJlZHJlc3VsdDtcbiAgICByZXR1cm4gaWQ7XG4gIH0pO1xufTtcblxuUnVudGltZS5wcm90b3R5cGUudG8gPSBmdW5jdGlvbihzdGVwKSB7XG4gIC8vIEl0J3MgYWx3YXlzIGNhc2UuLnRvLCBzbyB3ZSBvbmx5IG5lZWQgdG8gY29uY2F0XG4gIC8vICd0bycgcHJvbWlzZSBhZnRlciB0aGUgJ2Nhc2UnIHByb21pc2UuXG4gIHRoaXMucXVldWUgPSB0aGlzLnF1ZXVlLnRoZW4oKGlkKSA9PiB7XG4gICAgLy8gT25seSBhcHBlbmQgdGhlIHN0ZXAgaWYgdGhlIHByZXZpb3VzIG9uZSBpcyB0cnVlLlxuICAgIGlmICghdGhpcy5tYXRjaGluZy5tYXRjaGVkICYmIHRoaXMubWF0Y2hpbmdbaWRdKSB7XG4gICAgICB0aGlzLm1hdGNoaW5nLm1hdGNoZWQgPSB0cnVlO1xuICAgICAgdmFyIGNvbnRleHQgPSB0aGlzLl9jcmVhdGVDb250ZXh0KCk7XG4gICAgICBzdGVwKGNvbnRleHQsIHRoaXMucmVzdWx0KTtcbiAgICAgIHJldHVybiBjb250ZXh0LmRlZmVycmVkLnByb21pc2U7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB0aGlzLnJlc3VsdDtcbiAgICB9XG4gIH0pLnRoZW4oKHJlc3VsdCkgPT4ge1xuICAgIGlmIChyZXN1bHQubmV4dCkge1xuICAgICAgcmV0dXJuIHJlc3VsdC5xdWV1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG4gIH0pXG4gIC50aGVuKChyZXN1bHQpID0+IHtcbiAgICBpZiAodGhpcy5tYXRjaGluZy5tYXRjaGVkKSB7XG4gICAgICB0aGlzLnJlc3VsdCA9IHJlc3VsdDtcbiAgICB9XG4gICAgLy8gT3IsIGRvIG5vdCB1cGRhdGUgdGhlIHJlc3VsdCBpdCBnb3QuXG4gIH0pO1xufTtcblxuLyoqXG4gKiBSZW1lbWJlciB3ZSB3aWxsIHN3YXAgYGxvb3BgIGFuZCBgdW50aWxgIGF0IHN5bnRheCBsZXZlbCwgc29cbiAqIHdlIGNhbiBnZXQgdGhlIHByZWQgYmVmb3JlIHdlIHJ1biB0aGUgbG9vcC5cbiAqXG4gKiAxLiBGaXJzdCBhcHBseSB0aGUgYHByZWRgIG9uIHRoZSBwcmV2aW91cyByZXN1bHQuXG4gKiAyLiBJZiB0cnVlLCBjb25jYXQgdGhlIGl0ZXJhdGlvbiBhbmQgdGhlIG5ldyBwcmVkaWN0aW5nIHN0ZXAgYWZ0ZXJcbiAqICAgIHRoZSBsb29waW5nIHByb21pc2UuIEFuZCB0aGUgcHJlZGljYXRpb24gd2lsbCBjb25jYXQgbmV3IGl0ZXJhdGlvblxuICogICAgaW50byB0aGUgdGhlIHByb21pc2UgaWYgaXQncyB0cnVlLlxuICpcbiAqIE5vdGU6IG9ubHkgd2hlbiB0aGUgcHJlZGljYXRpb24gZ2l2ZXMgZmFsc2UsIHRoZSBsb29waW5nIHByb21pc2UgZm9yXG4gKiB0aGUgbWFpbiBxdWV1ZSB3aWxsIHJlc29sdmUsIHNvIGl0IGNhbiBydW4gdGhlIGxvb3Bpbmcgd2hpbGUgYmxvY2tpbmdcbiAqIHRoZSBtYWluIHF1ZXVlLlxuICovXG5SdW50aW1lLnByb3RvdHlwZS5sb29wID0gZnVuY3Rpb24oc3RlcCkge1xuICB0aGlzLnF1ZXVlID0gdGhpcy5xdWV1ZS50aGVuKCgpID0+IHtcbiAgICB2YXIgbG9vcHF1ZXVlID0gdGhpcy5sb29waW5nLmxvb3Bpbmdwcm9taXNlO1xuICAgIHZhciBwcmVkID0gdGhpcy5sb29waW5nLnByZWQ7XG5cbiAgICB2YXIgYXBwZW5kID0gKCkgPT4ge1xuICAgICAgdGhpcy5sb29waW5nLmxvb3Bpbmdwcm9taXNlLnByb21pc2UgPVxuICAgICAgICBsb29wcXVldWUudGhlbigoKSA9PiB7XG4gICAgICAgICAgdmFyIGNvbnRleHQgPSB0aGlzLl9jcmVhdGVDb250ZXh0KCk7XG4gICAgICAgICAgc3RlcChjb250ZXh0LCB0aGlzLnJlc3VsdCk7XG4gICAgICAgICAgcmV0dXJuIGNvbnRleHQuZGVmZXJyZWQucHJvbWlzZTtcbiAgICAgICAgfSkudGhlbigocmVzdWx0KSA9PiB7XG4gICAgICAgICAgaWYgKHJlc3VsdC5uZXh0KSB7XG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0LnF1ZXVlO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICAgLnRoZW4oKHJlc3VsdCkgPT4ge1xuICAgICAgICAgIHRoaXMucmVzdWx0ID0gcmVzdWx0O1xuICAgICAgICAgIGlmICghcHJlZCh0aGlzLnJlc3VsdCkpIHtcbiAgICAgICAgICAgIGFwcGVuZCgpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmxvb3BpbmcucXVldWVibG9ja2VyLnJlc29sdmUoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgLy8gRmlyc3QgaXRlcmF0aW9uLlxuICAgIGlmICghcHJlZCh0aGlzLnJlc3VsdCkpIHtcbiAgICAgIGFwcGVuZCgpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmxvb3BpbmcucXVldWVibG9ja2VyLnJlc29sdmUoKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMubG9vcGluZy5xdWV1ZWJsb2NrZXIucHJvbWlzZTtcbiAgfSk7XG59O1xuXG4vKipcbiAqIFJlbWVtYmVyIHdlIHdpbGwgc3dhcCBgbG9vcGAgYW5kIGB1bnRpbGAgYXQgc3ludGF4IGxldmVsLCBzb1xuICogd2UgY2FuIGdldCB0aGUgcHJlZCBiZWZvcmUgd2UgcnVuIHRoZSBsb29wLlxuICovXG5SdW50aW1lLnByb3RvdHlwZS51bnRpbCA9IGZ1bmN0aW9uKHByZWQpIHtcbiAgdGhpcy5xdWV1ZSA9IHRoaXMucXVldWUudGhlbigoKSA9PiB7XG4gICAgdGhpcy5sb29waW5nID0ge1xuICAgICAgJ3ByZWQnOiBwcmVkLFxuICAgICAgJ2xvb3Bpbmdwcm9taXNlJzogUHJvbWlzZS5yZXNvbHZlKCksXG4gICAgICAncXVldWVibG9ja2VyJzogbmV3IFJ1bnRpbWUuRGVmZXJyZWQoKVxuICAgIH07XG4gICAgLy8gQWZ0ZXIgdGhlIGxvb3BpbmcsIGNsZWFyIGl0LlxuICAgIHRoaXMubG9vcGluZy5xdWV1ZWJsb2NrZXIucHJvbWlzZSA9IFxuICAgICAgdGhpcy5sb29waW5nLnF1ZXVlYmxvY2tlci5wcm9taXNlLnRoZW4oKCkgPT4ge1xuICAgICAgICB0aGlzLmxvb3BpbmcgPSBudWxsO1xuICAgICAgfSk7XG4gIH0pO1xufTtcblxuUnVudGltZS5wcm90b3R5cGUuYW55ID0gZnVuY3Rpb24oKSB7XG4gIHZhciBhbnkgPSB0aGlzLl9yYWNlT3JBbGwoJ3JhY2UnKTtcbiAgdmFyIGNhbmRpZGF0ZXMgPSBBcnJheS5mcm9tKGFyZ3VtZW50cyk7XG4gIGFueS5jYWxsKHRoaXMsIGNhbmRpZGF0ZXMpO1xufTtcblxuUnVudGltZS5wcm90b3R5cGUuYWxsID0gZnVuY3Rpb24oKSB7XG4gIHZhciBhbGwgPSB0aGlzLl9yYWNlT3JBbGwoJ2FsbCcpO1xuICB2YXIgY2FuZGlkYXRlcyA9IEFycmF5LmZyb20oYXJndW1lbnRzKTtcbiAgYWxsLmNhbGwodGhpcywgY2FuZGlkYXRlcyk7XG59O1xuXG5SdW50aW1lLnByb3RvdHlwZS5lZmZlY3QgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIG5ldyBFZmZlY3QodGhpcyk7XG59O1xuXG5SdW50aW1lLnByb3RvdHlwZS5fcmFjZU9yQWxsID0gZnVuY3Rpb24ocHJvbWlzZU1ldGhvZCkge1xuICB2YXIgZ2VuZXJhdGVkID0gKGNhbmRpZGF0ZXMpID0+IHtcbiAgICB2YXIgdXBkYXRlUmVzdWx0ID0gKHJlc3VsdCkgPT4ge1xuICAgICAgdGhpcy5yZXN1bHQgPSByZXN1bHQ7XG4gICAgfTtcbiAgICB2YXIgZ2VuZXJhdGVQcm9taXNlID0gKHN0ZXApID0+IHtcbiAgICAgIHZhciBjb250ZXh0ID0gbmV3IFJ1bnRpbWUuQ29udGV4dCgpO1xuICAgICAgc3RlcChjb250ZXh0LCB0aGlzLnJlc3VsdCk7XG4gICAgICByZXR1cm4gY29udGV4dC5kZWZlcnJlZC5wcm9taXNlXG4gICAgICAgIC50aGVuKChyZXN1bHQpID0+IHtcbiAgICAgICAgICBpZiAocmVzdWx0Lm5leHQpIHtcbiAgICAgICAgICAgIHJldHVybiByZXN1bHQucXVldWU7XG4gICAgICAgICAgfSBlbHNlIGlmIChyZXN1bHQudGhlbikge1xuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdC50aGVuKHVwZGF0ZVJlc3VsdCk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIE9yZGluYXJ5IGZ1bmN0aW9uIHdpbGwgcmV0dXJuIHRoZSBwbGFpbiByZXN1bHQuXG4gICAgICAgICAgICAvLyBBbmQgd2UgbmVlZCB0byB0dXJuIGl0IGFzIGEgcHJvbWlzZS5cbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUocmVzdWx0KTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgdGhpcy5xdWV1ZSA9IHRoaXMucXVldWUudGhlbigoKSA9PiB7XG4gICAgICAvLyBDYXRjaCBnZW5lcmF0ZVByb21pc2UuXG4gICAgICB0cnkge1xuICAgICAgICB2YXIgYWxsUHJvbWlzZXMgPSBjYW5kaWRhdGVzLm1hcCgoc3RlcCkgPT4ge1xuICAgICAgICAgIHJldHVybiBnZW5lcmF0ZVByb21pc2Uoc3RlcCk7XG4gICAgICAgIH0pO1xuICAgICAgICBpZiAoJ3JhY2UnID09PSBwcm9taXNlTWV0aG9kKSB7XG4gICAgICAgICAgcmV0dXJuIFByb21pc2UucmFjZShhbGxQcm9taXNlcykudGhlbih1cGRhdGVSZXN1bHQpO1xuICAgICAgICB9IGVsc2UgaWYgKCdhbGwnID09PSBwcm9taXNlTWV0aG9kKSB7XG4gICAgICAgICAgcmV0dXJuIFByb21pc2UuYWxsKGFsbFByb21pc2VzKS50aGVuKHVwZGF0ZVJlc3VsdCk7XG4gICAgICAgIH1cbiAgICAgIH0gY2F0Y2goZSkge1xuICAgICAgICBjb25zb2xlLmVycm9yKGUpO1xuICAgICAgICB0aHJvdyBlO1xuICAgICAgfVxuICAgIH0pO1xuICB9O1xuICByZXR1cm4gZ2VuZXJhdGVkO1xufTtcblxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9hY3Rpb24ucnVudGltZS5qc1xuICoqLyIsIm1vZHVsZS5leHBvcnRzID0geyBcImRlZmF1bHRcIjogcmVxdWlyZShcImNvcmUtanMvbGlicmFyeS9mbi9hcnJheS9mcm9tXCIpLCBfX2VzTW9kdWxlOiB0cnVlIH07XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuLi9+L2JhYmVsLXJ1bnRpbWUvY29yZS1qcy9hcnJheS9mcm9tLmpzXG4gKiogbW9kdWxlIGlkID0gNjFcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsInJlcXVpcmUoJy4uLy4uL21vZHVsZXMvZXM2LnN0cmluZy5pdGVyYXRvcicpO1xucmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9lczYuYXJyYXkuZnJvbScpO1xubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuLi8uLi9tb2R1bGVzLyQuY29yZScpLkFycmF5LmZyb207XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuLi9+L2JhYmVsLXJ1bnRpbWUvfi9jb3JlLWpzL2xpYnJhcnkvZm4vYXJyYXkvZnJvbS5qc1xuICoqIG1vZHVsZSBpZCA9IDYyXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIndXNlIHN0cmljdCc7XG52YXIgY3R4ICAgICAgICAgPSByZXF1aXJlKCcuLyQuY3R4JylcbiAgLCAkZGVmICAgICAgICA9IHJlcXVpcmUoJy4vJC5kZWYnKVxuICAsIHRvT2JqZWN0ICAgID0gcmVxdWlyZSgnLi8kLnRvLW9iamVjdCcpXG4gICwgY2FsbCAgICAgICAgPSByZXF1aXJlKCcuLyQuaXRlci1jYWxsJylcbiAgLCBpc0FycmF5SXRlciA9IHJlcXVpcmUoJy4vJC5pcy1hcnJheS1pdGVyJylcbiAgLCB0b0xlbmd0aCAgICA9IHJlcXVpcmUoJy4vJC50by1sZW5ndGgnKVxuICAsIGdldEl0ZXJGbiAgID0gcmVxdWlyZSgnLi9jb3JlLmdldC1pdGVyYXRvci1tZXRob2QnKTtcbiRkZWYoJGRlZi5TICsgJGRlZi5GICogIXJlcXVpcmUoJy4vJC5pdGVyLWRldGVjdCcpKGZ1bmN0aW9uKGl0ZXIpeyBBcnJheS5mcm9tKGl0ZXIpOyB9KSwgJ0FycmF5Jywge1xuICAvLyAyMi4xLjIuMSBBcnJheS5mcm9tKGFycmF5TGlrZSwgbWFwZm4gPSB1bmRlZmluZWQsIHRoaXNBcmcgPSB1bmRlZmluZWQpXG4gIGZyb206IGZ1bmN0aW9uIGZyb20oYXJyYXlMaWtlLyosIG1hcGZuID0gdW5kZWZpbmVkLCB0aGlzQXJnID0gdW5kZWZpbmVkKi8pe1xuICAgIHZhciBPICAgICAgID0gdG9PYmplY3QoYXJyYXlMaWtlKVxuICAgICAgLCBDICAgICAgID0gdHlwZW9mIHRoaXMgPT0gJ2Z1bmN0aW9uJyA/IHRoaXMgOiBBcnJheVxuICAgICAgLCBtYXBmbiAgID0gYXJndW1lbnRzWzFdXG4gICAgICAsIG1hcHBpbmcgPSBtYXBmbiAhPT0gdW5kZWZpbmVkXG4gICAgICAsIGluZGV4ICAgPSAwXG4gICAgICAsIGl0ZXJGbiAgPSBnZXRJdGVyRm4oTylcbiAgICAgICwgbGVuZ3RoLCByZXN1bHQsIHN0ZXAsIGl0ZXJhdG9yO1xuICAgIGlmKG1hcHBpbmcpbWFwZm4gPSBjdHgobWFwZm4sIGFyZ3VtZW50c1syXSwgMik7XG4gICAgLy8gaWYgb2JqZWN0IGlzbid0IGl0ZXJhYmxlIG9yIGl0J3MgYXJyYXkgd2l0aCBkZWZhdWx0IGl0ZXJhdG9yIC0gdXNlIHNpbXBsZSBjYXNlXG4gICAgaWYoaXRlckZuICE9IHVuZGVmaW5lZCAmJiAhKEMgPT0gQXJyYXkgJiYgaXNBcnJheUl0ZXIoaXRlckZuKSkpe1xuICAgICAgZm9yKGl0ZXJhdG9yID0gaXRlckZuLmNhbGwoTyksIHJlc3VsdCA9IG5ldyBDOyAhKHN0ZXAgPSBpdGVyYXRvci5uZXh0KCkpLmRvbmU7IGluZGV4Kyspe1xuICAgICAgICByZXN1bHRbaW5kZXhdID0gbWFwcGluZyA/IGNhbGwoaXRlcmF0b3IsIG1hcGZuLCBbc3RlcC52YWx1ZSwgaW5kZXhdLCB0cnVlKSA6IHN0ZXAudmFsdWU7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGZvcihyZXN1bHQgPSBuZXcgQyhsZW5ndGggPSB0b0xlbmd0aChPLmxlbmd0aCkpOyBsZW5ndGggPiBpbmRleDsgaW5kZXgrKyl7XG4gICAgICAgIHJlc3VsdFtpbmRleF0gPSBtYXBwaW5nID8gbWFwZm4oT1tpbmRleF0sIGluZGV4KSA6IE9baW5kZXhdO1xuICAgICAgfVxuICAgIH1cbiAgICByZXN1bHQubGVuZ3RoID0gaW5kZXg7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxufSk7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuLi9+L2JhYmVsLXJ1bnRpbWUvfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczYuYXJyYXkuZnJvbS5qc1xuICoqIG1vZHVsZSBpZCA9IDYzXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIvLyA3LjEuMTMgVG9PYmplY3QoYXJndW1lbnQpXG52YXIgZGVmaW5lZCA9IHJlcXVpcmUoJy4vJC5kZWZpbmVkJyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0KXtcbiAgcmV0dXJuIE9iamVjdChkZWZpbmVkKGl0KSk7XG59O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi4vfi9iYWJlbC1ydW50aW1lL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvJC50by1vYmplY3QuanNcbiAqKiBtb2R1bGUgaWQgPSA2NFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgSW50ZXJmYWNlIGZyb20gJ2RlbW8vZWZmZWN0LmludGVyZmFjZS5qcyc7XG5pbXBvcnQgUnVudGltZSBmcm9tICdkZW1vL2VmZmVjdC5ydW50aW1lLmpzJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gRWZmZWN0KGFjdGlvbikge1xuICB0aGlzLl9ydW50aW1lID0gbmV3IFJ1bnRpbWUoYWN0aW9uKTtcbiAgdGhpcy5faW50ZXJmYWNlID0gbmV3IEludGVyZmFjZSh0aGlzLl9ydW50aW1lKTtcbiAgcmV0dXJuIHRoaXMuX2ludGVyZmFjZTtcbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vZWZmZWN0LmpzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgUnVuZSBmcm9tICdkaXN0L3J1bmUuanMnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBJbnRlcmZhY2UocnVudGltZSkge1xuICB0aGlzLmNvbnRleHQgPSB7XG4gICAgc3RhcnRlZDogZmFsc2UsXG4gICAgc3RvcHBlZDogZmFsc2UsXG4gICAgbG9vcGluZzogZmFsc2UsXG4gICAgbWF0Y2hpbmc6IGZhbHNlXG4gIH07XG4gIHRoaXMuc3RhY2sgPSBbXTtcbiAgdGhpcy5fcnVudGltZSA9IHJ1bnRpbWU7XG4gIHRoaXMuX2V2YWx1YXRvciA9IChuZXcgUnVuZS5FdmFsdWF0ZSgpKVxuICAgIC5hbmFseXplcih0aGlzLl9hbmFseXplT3JkZXIuYmluZCh0aGlzKSlcbiAgICAuaW50ZXJwcmV0ZXIodGhpcy5faW50ZXJwcmV0LmJpbmQodGhpcykpO1xufVxuXG5JbnRlcmZhY2UucHJvdG90eXBlLnN0YXJ0ID0gUnVuZS5kZWZpbmUoJ3N0YXJ0JywgJ2JlZ2luJyk7XG5JbnRlcmZhY2UucHJvdG90eXBlLmRvbmUgPSBSdW5lLmRlZmluZSgnZG9uZScsICdleGl0Jyk7XG5JbnRlcmZhY2UucHJvdG90eXBlLnJ1biA9IFJ1bmUuZGVmaW5lKCdydW4nLCAnZXhpdCcpO1xuSW50ZXJmYWNlLnByb3RvdHlwZS5uZXh0ID0gUnVuZS5kZWZpbmUoJ25leHQnLCAncHVzaCcpO1xuSW50ZXJmYWNlLnByb3RvdHlwZS5tYXRjaCA9IFJ1bmUuZGVmaW5lKCdtYXRjaCcsICdiZWdpbicpO1xuSW50ZXJmYWNlLnByb3RvdHlwZS5lbmQgPSBSdW5lLmRlZmluZSgnZW5kJywgJ2VuZCcpO1xuSW50ZXJmYWNlLnByb3RvdHlwZS5jYXNlID0gUnVuZS5kZWZpbmUoJ2Nhc2UnLCAncHVzaCcpO1xuSW50ZXJmYWNlLnByb3RvdHlwZS50byA9IFJ1bmUuZGVmaW5lKCd0bycsICdwdXNoJyk7XG5JbnRlcmZhY2UucHJvdG90eXBlLmxvb3AgPSBSdW5lLmRlZmluZSgnbG9vcCcsICdiZWdpbicpO1xuSW50ZXJmYWNlLnByb3RvdHlwZS51bnRpbCA9IFJ1bmUuZGVmaW5lKCd1bnRpbCcsICdlbmQnKTtcblxuSW50ZXJmYWNlLnByb3RvdHlwZS5vbmNoYW5nZSA9IGZ1bmN0aW9uKGNvbnRleHQsIG5vZGUsIHN0YWNrKSB7XG4gIC8vIFdoZW4gaXQncyBjaGFuZ2VkLCBldmFsdWF0ZSBpdCB3aXRoIGFuYWx5emVycyAmIGludGVycHJldGVyLlxuICByZXR1cm4gdGhpcy5fZXZhbHVhdG9yKGNvbnRleHQsIG5vZGUsIHN0YWNrKTtcbn07XG5cbkludGVyZmFjZS5wcm90b3R5cGUuX2ludGVycHJldCA9IGZ1bmN0aW9uKGNvbnRleHQsIG5vZGUsIHN0YWNrKSB7XG4gIC8vIFdlbGwgaW4gdGhpcyBlRFNMIHdlIGRlbGVnYXRlIHRoZSBpbnRlcnByZXRpb24gdG8gdGhlIHJ1bnRpbWUuXG4gIC8vIFdlIGRvbid0IHBhc3MgY29udGV4dCB0byBydW50aW1lIHNpbmNlIHRoZSBydW50aW1lIHdpbGwga2VlcFxuICAvLyB0aGUgZXNzZW50aWFsIHN0YXRlcyBieSBpdHMgb3duLlxuICByZXR1cm4gdGhpcy5fcnVudGltZS5vbmNoYW5nZS5hcHBseSh0aGlzLl9ydW50aW1lLCBhcmd1bWVudHMpO1xufTtcblxuLy8gSW4gdGhpcyBlRFNMIHdlIG5vdyBvbmx5IGhhdmUgdGhpcyBhbmFseXplci4gQ291bGQgYWRkIG1vcmUgYW5kIHJlZ2lzdGVyIGl0XG4vLyBpbiB0aGUgY29udHJ1Y3Rpb24gb2YgJ3RoaXMuX2V2YWx1YXRvcicuXG5JbnRlcmZhY2UucHJvdG90eXBlLl9hbmFseXplT3JkZXIgPSBmdW5jdGlvbihjb250ZXh0LCBjaGFuZ2UsIHN0YWNrKSB7XG4gIGlmICgnc3RhcnQnID09PSBjaGFuZ2UudHlwZSkge1xuICAgIGNvbnRleHQuc3RhcnRlZCA9IHRydWU7XG4gIH0gZWxzZSBpZiAoJ3N0b3AnKSB7XG4gICAgY29udGV4dC5zdG9wcGVkID0gdHJ1ZTtcbiAgfVxuICBpZiAoJ3N0YXJ0JyA9PT0gY2hhbmdlLnR5cGUgJiYgY29udGV4dC5zdG9wcGVkKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdTaG91bGQgbm90IHN0YXJ0IGEgcHJvY2VzcyBhZ2FpbicgK1xuICAgICAgICAnYWZ0ZXIgaXRcXCdzIGFscmVhZHkgc3RvcHBlZCcpO1xuICB9IGVsc2UgaWYgKCduZXh0JyA9PT0gY2hhbmdlLnR5cGUgJiYgIWNvbnRleHQuc3RhcnRlZCkge1xuICAgIHRocm93IG5ldyBFcnJvcignU2hvdWxkIG5vdCBjb25jYXQgc3RlcHMgd2hpbGUgaXRcXCdzIG5vdCBzdGFydGVkJyk7XG4gIH0gZWxzZSBpZiAoJ3N0b3AnID09PSBjaGFuZ2UudHlwZSAmJiAhY29udGV4dC5zdGFydGVkKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdTaG91bGQgbm90IHN0b3AgYSBwcm9jZXNzIGJlZm9yZSBpdFxcJ3Mgc3RhcnRlZCcpO1xuICB9XG59O1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9lZmZlY3QuaW50ZXJmYWNlLmpzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBSdW50aW1lKGFjdGlvbiA9IG51bGwpIHtcbiAgLy8gQWNjdW1sYXRlZCBzdGF0ZXMgbmVlZCB0byBhcHBseSBvbiBlZmZlY3RzLCBsaWtlIGRhdGEgdG8gcmVuZGVyLlxuICAvLyBBbmQgaXQgd2lsbCBiZSBnZW5lcmF0ZWQgYnkgdGhlIGFjdGlvbiBpbiBhc3luY2hyb25vdXMgd2F5LlxuICAvLyBJZiBub25lLCBtZWFucyBpdCdzIGEgc3ViLXByb2NlZHVyZSBuZWVkIHRvIGJlIGNvbmNhdGVkLlxuICB0aGlzLl9hY3Rpb24gPSBhY3Rpb247XG4gIHRoaXMuX2RhdGEgPSBudWxsO1xufVxuXG4vKipcbiAqIFdoZW4gdGhlIHN0YWNrIG9mIERTTCBjaGFuZ2VzLCBldmFsdWF0ZSB0aGUgTGFuZ3VhZ2UuTm9kZS5cbiAqL1xuUnVudGltZS5wcm90b3R5cGUub25jaGFuZ2UgPSBmdW5jdGlvbihpbnN0YW5jZSwgY2hhbmdlLCBzdGFjaykge1xuICB2YXIgcmVzdWx0ID0gdGhpc1tjaGFuZ2UudHlwZV0uYXBwbHkodGhpcywgY2hhbmdlLmFyZ3MpO1xuICByZXR1cm4gWyByZXN1bHQgXTtcbn07XG5cblJ1bnRpbWUucHJvdG90eXBlLnN0YXJ0ID0gZnVuY3Rpb24oKSB7XG4gIHRoaXMuX2VmZmVjdFByb2NlZHVyZSA9IFtdO1xuICB0aGlzLl9jYXNlcyA9IFtdO1xufTtcblxuUnVudGltZS5wcm90b3R5cGUucnVuID0gZnVuY3Rpb24oKSB7XG4gIGlmICh0aGlzLl9hY3Rpb24pIHtcbiAgICAvLyBBcHBlbmQgYmVmb3JlIHdlIGFwcGVuZCBvdXIgRWZmZWN0IGZ1bmN0aW9uLlxuICAgIC8vIFNvIHRoYXQgaWYgdGhlIGVycm9yIGlzIGFuIGludGVycnVwdGlvbiBhbmQgYWxyZWFkeSBjYXB0dXJlZFxuICAgIC8vIGJ5IHRoZSBoYW5kbGVyLCBpdCB3aWxsIG5vdCBlZmZlY3QgdGhlIGZvbGxvd2luZyBzdGVwcy5cbiAgICB0aGlzLl9hY3Rpb24ucXVldWUgPSB0aGlzLl9hY3Rpb24ucXVldWUuY2F0Y2goXG4gICAgICB0aGlzLl9hY3Rpb24ub25Qcm9jZXNzRXJyb3IuYmluZCh0aGlzLl9hY3Rpb24pXG4gICAgKTtcblxuICAgIC8vIENvbmNhdCB0aGUgYnVpbHQgZWZmZWN0IGFmdGVyIHRoZSBhY2N1bXVsYXRpbmcuXG4gICAgdGhpcy5fYWN0aW9uLnF1ZXVlID0gdGhpcy5fYWN0aW9uLnF1ZXVlLnRoZW4oKCkgPT4ge1xuICAgICAgLy8gR2V0IHRoZSByZXN1bHQgZnJvbSB0aGUgZW5kZWQgYWN0aW9uLlxuICAgICAgdmFyIGRhdGEgPSB0aGlzLl9hY3Rpb24ucmVzdWx0O1xuICAgICAgY29uc29sZS5sb2coJz4+Pj4gZ2V0IHRoZSBkYXRhIGZyb20gYWN0aW9uOiAnLCBkYXRhKTtcbiAgICAgIHRoaXMuX2RhdGEgPSBkYXRhO1xuICAgICAgdGhpcy5fZWZmZWN0UHJvY2VkdXJlLmZvckVhY2goKHApID0+IHtcbiAgICAgICAgLy8gTm90ZTogYWxsIGNvbXBvc2VkIEVmZmVjdCBhbmQgbmF0aXZlIGZ1bmN0aW9uIHdpbGwgcmVjZWl2ZSB0aGVcbiAgICAgICAgLy8gc2FtZSBhY2N1bXVsYXRlZCByZXN1bHQgZnJvbSB0aGUgU3RhdGUsIGFuZCBpdCBzaG91bGQgYmUgY29uc2lkZXJlZFxuICAgICAgICAvLyBhcyBhbiBpbW11dGFibGUgdmFsdWUuIFRoaXMgbWVhbnMsIEVmZmVjdHMgb3IgZnVuY3Rpb25zIHNob3VsZCBub3RcbiAgICAgICAgLy8gbW9kaWZ5IGl0IGFuZCB0byBleHBlY3QgdGhlIG5leHQgb25lIGNhbiB1c2UgdGhlIG5ldyB2YWx1ZS5cbiAgICAgICAgcChkYXRhKTtcbiAgICAgIH0pO1xuICAgICAgdGhpcy5fZWZmZWN0UHJvY2VkdXJlLmxlbmd0aCA9IDA7XG4gICAgfSk7XG4gICAgdGhpcy5fYWN0aW9uLnJlc29sdmUoKTtcbiAgfSBlbHNlIGlmICh0aGlzLl9kYXRhKSB7XG4gICAgLy8gU3VicHJlY3VkdXJlIG9ubHkgc3RhcnRzIGZyb20gYSBkYXRhLlxuICAgIHRoaXMuX2VmZmVjdFByb2NlZHVyZS5mb3JFYWNoKChwKSA9PiB7XG4gICAgICAvLyBOb3RlOiBhbGwgY29tcG9zZWQgRWZmZWN0IGFuZCBuYXRpdmUgZnVuY3Rpb24gd2lsbCByZWNlaXZlIHRoZVxuICAgICAgLy8gc2FtZSBhY2N1bXVsYXRlZCByZXN1bHQgZnJvbSB0aGUgU3RhdGUsIGFuZCBpdCBzaG91bGQgYmUgY29uc2lkZXJlZFxuICAgICAgLy8gYXMgYW4gaW1tdXRhYmxlIHZhbHVlLiBUaGlzIG1lYW5zLCBFZmZlY3RzIG9yIGZ1bmN0aW9ucyBzaG91bGQgbm90XG4gICAgICAvLyBtb2RpZnkgaXQgYW5kIHRvIGV4cGVjdCB0aGUgbmV4dCBvbmUgY2FuIHVzZSB0aGUgbmV3IHZhbHVlLlxuICAgICAgcCh0aGlzLl9kYXRhKTtcbiAgICB9KTtcbiAgICB0aGlzLl9lZmZlY3RQcm9jZWR1cmUubGVuZ3RoID0gMDtcbiAgfVxufTtcblxuLyoqXG4gKiBDbG9zZSB0aGUgcHJvY2VkdXJlIGRlZmluaXRpb24sIGRvIG5vdGhpbmcuXG4gKi9cblJ1bnRpbWUucHJvdG90eXBlLmRvbmUgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG5SdW50aW1lLnByb3RvdHlwZS5fZXhlY3V0ZSA9IGZ1bmN0aW9uKHN0ZXApIHtcbiAgaWYgKCdmdW5jdGlvbicgIT09IHR5cGVvZihzdGVwKSkge1xuICAgIHRocm93IG5ldyBFcnJvcignVHlwZUVycm9yOiBzdGVwIGlzIG5vdCBhIGZ1bmN0aW9uOiAnICsgdHlwZW9mKHN0ZXApKTtcbiAgfVxuXG4gIHZhciByZXN1bHQgPSBzdGVwKHRoaXMuX2RhdGEpO1xuICBpZiAocmVzdWx0IGluc3RhbmNlb2YgUnVudGltZSkge1xuICAgIC8vIEl0J3MgYSBnZW5lcmF0b3IgdGhhdCBnZW5lcmF0ZXMgbmV3IEVmZmVjdCBjaGFpbi5cbiAgICAvLyBTbyB3ZSBuZWVkIHRvIGV4ZWN1dGUgaXQgbm93LlxuICAgIHJlc3VsdC5fZGF0YSA9IHRoaXMuX2RhdGE7XG4gICAgcmVzdWx0LnJ1bigpO1xuICB9IGVsc2UgaWYgKCd1bmRlZmluZWQnICE9PSB0eXBlb2YocmVzdWx0KSkge1xuICAgIC8vIEVsc2UsIGl0IGlzIGEgcGxhaW4gZnVuY3Rpb24gYW5kIGl0J3MgZG9uZSB3aGVuIGV4ZWN1dGluZyBpdC5cbiAgICAvLyBTbyBpdCBzaG91bGRuJ3QgcmV0dXJuIGFueXRoaW5nLlxuICAgIHRocm93IG5ldyBFcnJvcignVHlwZUVycm9yOiBzdGVwIHNob3VsZCByZXR1cm4gb25seSBFZmZlY3Q7IG5vdyBpdCBpczogJyArXG4gICAgICB0eXBlb2YocmVzdWx0KSk7XG4gIH1cblxufTtcblxuUnVudGltZS5wcm90b3R5cGUubmV4dCA9IGZ1bmN0aW9uKHN0ZXApIHtcbiAgdGhpcy5fZWZmZWN0UHJvY2VkdXJlLnB1c2goKCkgPT4ge1xuICAgIHRoaXMuX2V4ZWN1dGUoc3RlcCk7XG4gIH0pO1xufTtcblxuLyoqXG4gKiBBIHB1cmUgc3ludGF4IG5vZGUuXG4gKi9cblJ1bnRpbWUucHJvdG90eXBlLm1hdGNoID0gZnVuY3Rpb24oKSB7XG4gIHRoaXMuX2VmZmVjdFByb2NlZHVyZS5wdXNoKCgpID0+IHtcbiAgICB0aGlzLl9jYXNlcyA9IFtdO1xuICB9KTtcbn07XG5cbi8qKlxuICogVG8gbWFrZSBhIGZ1bmN0aW9uIHRlc3QgYWxsIGJyYW5jaGVzIHVudGlsIG9uZSBpcyB0cnVlLFxuICogYW5kIHRoZW4gcnVuIGl0IHdoZW4gdGhlIHByb2NlZHVyZSBpcyBleGVjdXRpbmcuXG4gKi9cblJ1bnRpbWUucHJvdG90eXBlLmVuZCA9IGZ1bmN0aW9uKCkge1xuICB0aGlzLl9lZmZlY3RQcm9jZWR1cmUucHVzaCgoKSA9PiB7XG4gICAgdmFyIGRhdGEgPSB0aGlzLl9kYXRhO1xuICAgIHZhciBjYXNlcyA9IHRoaXMuX2Nhc2VzO1xuICAgIGZvciAobGV0IGJyYW5jaCBvZiBjYXNlcykge1xuICAgICAgaWYgKGJyYW5jaC5wcmVkaWN0aW9uKGRhdGEpKSB7XG4gICAgICAgIGJyYW5jaC50b2RvKGRhdGEpO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG4gICAgY2FzZXMubGVuZ3RoID0gMDtcbiAgfSk7XG59O1xuXG4vKipcbiAqIGBwcmVkYCBtdXN0IGJlIGEgZnVuY3Rpb24gcmV0dXJuIHRydWUvZmFsc2UuXG4gKi9cblJ1bnRpbWUucHJvdG90eXBlLmNhc2UgPSBmdW5jdGlvbihwcmVkKSB7XG4gIHRoaXMuX2VmZmVjdFByb2NlZHVyZS5wdXNoKCgpID0+IHtcbiAgICB0aGlzLl9jYXNlcy5wdXNoKHtcbiAgICAgICdwcmVkaWN0aW9uJzogcHJlZCxcbiAgICAgICd0b2RvJzogbnVsbFxuICAgIH0pO1xuICB9KTtcbn07XG5cbi8qKlxuICogYHN0ZXBgOiBhbm90aGVyIEVmZmVjdCBvciBuYXRpdmUgZnVuY3Rpb24uXG4gKi9cblJ1bnRpbWUucHJvdG90eXBlLnRvID0gZnVuY3Rpb24oc3RlcCkge1xuICB0aGlzLl9lZmZlY3RQcm9jZWR1cmUucHVzaCgoKSA9PiB7XG4gICAgdmFyIGJyYW5jaCA9IHRoaXMuX2Nhc2VzW3RoaXMuX2Nhc2VzLmxlbmd0aCAtIDFdO1xuICAgIGJyYW5jaC50b2RvID0gKCkgPT4ge1xuICAgICAgdGhpcy5fZXhlY3V0ZShzdGVwKTtcbiAgICB9O1xuICB9KTtcbn07XG5cbi8qKlxuICogUmVtZW1iZXIgd2Ugd2lsbCBzd2FwIGBsb29wYCBhbmQgYHVudGlsYCBhdCBzeW50YXggbGV2ZWwsIHNvXG4gKiB3ZSBjYW4gZ2V0IHRoZSBwcmVkIGJlZm9yZSB3ZSBydW4gdGhlIGxvb3AuXG4gKi9cblJ1bnRpbWUucHJvdG90eXBlLmxvb3AgPSBmdW5jdGlvbihzdGVwKSB7XG4gIHRoaXMuX2VmZmVjdFByb2NlZHVyZS5wdXNoKCgpID0+IHtcbiAgICB2YXIgbG9vcFRpbWVzID0gdGhpcy5fbG9vcFRpbWVzO1xuICAgIHRoaXMuX2xvb3BUaW1lcyA9IG51bGw7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsb29wVGltZXM7IGkrKykge1xuICAgICAgdGhpcy5fZXhlY3V0ZShzdGVwKTtcbiAgICB9XG4gIH0pO1xufTtcblxuLyoqXG4gKiBSZW1lbWJlciB3ZSB3aWxsIHN3YXAgYGxvb3BgIGFuZCBgdW50aWxgIGF0IHN5bnRheCBsZXZlbCwgc29cbiAqIHdlIGNhbiBnZXQgdGhlIGxvb3AgdGltZSBiZWZvcmUgd2UgcnVuIHRoZSBsb29wLlxuICpcbiAqIFRoZSBgcHJlZGAgc2hvdWxkIGJlIGEgZnVuY3Rpb24gcmV0dXJucyBhIHBvc2l0aXZlIG51bWJlcixcbiAqIHdoaWNoIGlzIGdlbmVyYXRlZCBmcm9tIHRoZSBgZGF0YWAuXG4gKi9cblJ1bnRpbWUucHJvdG90eXBlLnVudGlsID0gZnVuY3Rpb24ocHJlZCkge1xuICB0aGlzLl9lZmZlY3RQcm9jZWR1cmUucHVzaCgoKSA9PiB7XG4gICAgdmFyIGRhdGEgPSB0aGlzLl9kYXRhO1xuICAgIHRoaXMuX2xvb3BUaW1lcyA9IHByZWQoZGF0YSk7XG4gICAgaWYgKCdudW1iZXInICE9PSB0eXBlb2YgdGhpcy5fbG9vcFRpbWVzKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1R5cGVFcnJvcjogbG9vcCB0aW1lcyBtdXN0IGJlIGEgbnVtYmVyLicpO1xuICAgIH0gZWxzZSBpZiAoMCA+IHRoaXMuX2xvb3BUaW1lcykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdMb29wIHRpbWVzIG11c3QgbGFyZ2VyIHRoYW4gMC4nKTtcbiAgICB9XG4gIH0pO1xufTtcblxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9lZmZlY3QucnVudGltZS5qc1xuICoqLyIsIm1vZHVsZS5leHBvcnRzID0geyBcImRlZmF1bHRcIjogcmVxdWlyZShcImNvcmUtanMvbGlicmFyeS9mbi9nZXQtaXRlcmF0b3JcIiksIF9fZXNNb2R1bGU6IHRydWUgfTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4uL34vYmFiZWwtcnVudGltZS9jb3JlLWpzL2dldC1pdGVyYXRvci5qc1xuICoqIG1vZHVsZSBpZCA9IDY4XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJyZXF1aXJlKCcuLi9tb2R1bGVzL3dlYi5kb20uaXRlcmFibGUnKTtcbnJlcXVpcmUoJy4uL21vZHVsZXMvZXM2LnN0cmluZy5pdGVyYXRvcicpO1xubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuLi9tb2R1bGVzL2NvcmUuZ2V0LWl0ZXJhdG9yJyk7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuLi9+L2JhYmVsLXJ1bnRpbWUvfi9jb3JlLWpzL2xpYnJhcnkvZm4vZ2V0LWl0ZXJhdG9yLmpzXG4gKiogbW9kdWxlIGlkID0gNjlcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsInZhciBhbk9iamVjdCA9IHJlcXVpcmUoJy4vJC5hbi1vYmplY3QnKVxuICAsIGdldCAgICAgID0gcmVxdWlyZSgnLi9jb3JlLmdldC1pdGVyYXRvci1tZXRob2QnKTtcbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi8kLmNvcmUnKS5nZXRJdGVyYXRvciA9IGZ1bmN0aW9uKGl0KXtcbiAgdmFyIGl0ZXJGbiA9IGdldChpdCk7XG4gIGlmKHR5cGVvZiBpdGVyRm4gIT0gJ2Z1bmN0aW9uJyl0aHJvdyBUeXBlRXJyb3IoaXQgKyAnIGlzIG5vdCBpdGVyYWJsZSEnKTtcbiAgcmV0dXJuIGFuT2JqZWN0KGl0ZXJGbi5jYWxsKGl0KSk7XG59O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi4vfi9iYWJlbC1ydW50aW1lL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvY29yZS5nZXQtaXRlcmF0b3IuanNcbiAqKiBtb2R1bGUgaWQgPSA3MFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIl0sInNvdXJjZVJvb3QiOiIifQ==