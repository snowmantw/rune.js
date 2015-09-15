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
	
	var _playlangJs = __webpack_require__(57);
	
	var _playlangJs2 = _interopRequireDefault(_playlangJs);
	
	var _effectJs = __webpack_require__(65);
	
	var _effectJs2 = _interopRequireDefault(_effectJs);
	
	var playlang = new _playlangJs2['default']();
	playlang.start().next(function (ctx) {
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
	  new _effectJs2['default']().start().until(function () {
	    return 2;
	  }).loop(function (data) {
	    console.log('>>>>> second case loop', data);
	  }).done();
	})['case'](function (data) {
	  return data === 1;
	}).to(function () {
	  new _effectJs2['default']().start().until(function () {
	    return 2;
	  }).loop(function () {
	    console.log('>>>>> duplicated second case loop');
	  }).done();
	}).end().until(function (data) {
	  console.log('>>>>> data: ', data);return 4;
	}).loop(function () {
	  new _effectJs2['default']().start().until(function () {
	    return 2;
	  }).loop(function (data) {
	    console.log('>>>>> loop X loop', data);
	  }).done();
	}).run();
	
	/*

	fn = (ctx, a, b) => {
	  var p = new Playlang()
	  ctx.returns(p.start().next((ctx) => {
	    // It's good to shadowing the outer one,
	    // since we already booked to return that.
	    ctx.returns(a + b);
	  }));
	};

	// DONT USE; NOT IMPLEMENTED INTENTIONALLY
	gn = (ctx, a, b) => {
	  var p = new Playlang()
	  ctx.returns(new Promise((r, j) => {
	    setTimeout(r(a - b), 1000);
	  }).then((result) => {
	    return result + 1;
	  }));
	};

	hn = (ctx, a, b) => {
	  var p = new Playlang()
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
	exports['default'] = Playlang;
	
	var _demoPlaylangInterfaceJs = __webpack_require__(58);
	
	var _demoPlaylangInterfaceJs2 = _interopRequireDefault(_demoPlaylangInterfaceJs);
	
	var _demoPlaylangRuntimeJs = __webpack_require__(60);
	
	var _demoPlaylangRuntimeJs2 = _interopRequireDefault(_demoPlaylangRuntimeJs);
	
	function Playlang() {
	  this._runtime = new _demoPlaylangRuntimeJs2['default']();
	  this._interface = new _demoPlaylangInterfaceJs2['default'](this._runtime);
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
	
	Runtime.prototype.done = function () {
	  this.queue = this.queue['catch'](this.onProcessError.bind(this));
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
	      // If it's also a Playlang statements, concat it.
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
	  var _this10 = this;
	
	  var updateResult = function updateResult(result) {
	    _this10.result = result;
	  };
	  var generatePromise = function generatePromise(step) {
	    var newPromise = step(_this10.result);
	    if (newPromise.next) {
	      return newPromise.queue;
	    } else if (newPromise.then) {
	      return newPromise;
	    } else {
	      // Ordinary function will return the result.
	      var newResult = newPromise;
	      updateResult(newResult);
	      return _Promise.resolve(newResult);
	    }
	  };
	  var candidates = _Array$from(arguments);
	  this.queue = this.queue.then(function () {
	    return _Promise.race(candidates.map(function (step) {
	      return generatePromise(step);
	    })).then(updateResult);
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
	  var _this11 = this;
	
	  var generated = function generated(candidates) {
	    var updateResult = function updateResult(result) {
	      _this11.result = result;
	    };
	    var generatePromise = function generatePromise(step) {
	      var context = new Runtime.Context();
	      step(context, _this11.result);
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
	    _this11.queue = _this11.queue.then(function () {
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
	
	function Effect(state) {
	  this._runtime = new _demoEffectRuntimeJs2['default'](state);
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
	  var state = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];
	
	  // Accumlated state need to apply effects, like data to render.
	  // If none, means it's a sub-procedure need to be concated.
	  this._state = state;
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
	
	  if (this._state) {
	    // Append before we append our Effect function.
	    // So that if the error is an interruption and already captured
	    // by the handler, it will not effect the following steps.
	    this._state.queue = this._state.queue['catch'](this._state.onProcessError.bind(this._state));
	
	    // Concat the built effect after the accumulating.
	    this._state.queue = this._state.queue.then(function () {
	      // Get the result from the ended state.
	      var data = _this._state.result;
	      _this._effectProcedure.forEach(function (p) {
	        // Note: all composed Effect and native function will receive the
	        // same accumulated result from the State, and it should be considered
	        // as an immutable value. This means, Effects or functions should not
	        // modify it and to expect the next one can use the new value.
	        p(data);
	      });
	      _this._effectProcedure.length = 0;
	    });
	    this._state.resolve();
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
	    this._data = null;
	  }
	};
	
	/**
	 * Close the procedure definition, do nothing.
	 */
	Runtime.prototype.done = function () {
	  return this;
	};
	
	Runtime.prototype.next = function (step) {
	  var _this2 = this;
	
	  this._effectProcedure.push(function () {
	    if ('function' !== typeof step) {
	      throw new Error('TypeError: step is not a function: ' + typeof step);
	    }
	
	    var result = step();
	    if (result instanceof Runtime) {
	      // It's a generator that generates new Effect chain.
	      // So we need to execute it now.
	      result._data = _this2._data;
	      result.run();
	    }
	    // Else, it is a plain function and it's done when executing it.
	  });
	};
	
	/**
	 * A pure syntax node.
	 */
	Runtime.prototype.match = function () {
	  var _this3 = this;
	
	  this.next(function () {
	    _this3._cases = [];
	  });
	};
	
	/**
	 * To make a function test all branches until one is true,
	 * and then run it when the procedure is executing.
	 */
	Runtime.prototype.end = function () {
	  var _this4 = this;
	
	  this.next(function (data) {
	    var cases = _this4._cases;
	    var _iteratorNormalCompletion = true;
	    var _didIteratorError = false;
	    var _iteratorError = undefined;
	
	    try {
	      for (var _iterator = _getIterator(cases), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	        var branch = _step.value;
	
	        if (branch.prediction(data)) {
	          console.log('>>>>>>> is true');
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
	
	  this.next(function () {
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
	
	  this.next(function () {
	    var branch = _this6._cases[_this6._cases.length - 1];
	    if (step instanceof Runtime) {
	      console.log('>>>> step instanceof Runtime');
	      // Set a function will execute the subprocedure when it
	      // is called with data.
	      branch.todo = function (data) {
	        step._data = data;
	        step.run();
	      };
	    } else {
	      console.log('>>>> step NOT instanceof Runtime', step);
	      branch.todo = step;
	    }
	  });
	};
	
	/**
	 * Remember we will swap `loop` and `until` at syntax level, so
	 * we can get the pred before we run the loop.
	 */
	Runtime.prototype.loop = function (step) {
	  var _this7 = this;
	
	  this.next(function (data) {
	    var loopTimes = _this7._loopTimes;
	    _this7._loopTimes = null;
	    for (var i = 0; i < loopTimes; i++) {
	      if (step instanceof Runtime) {
	        console.log('>>>>>_______  loop, instanceof', loopTimes);
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
	Runtime.prototype.until = function (pred) {
	  var _this8 = this;
	
	  this.next(function (data) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMDQyZDBiY2NjYTFjZDNhNzIzYzEiLCJ3ZWJwYWNrOi8vLy4vcGxheWxhbmctZGVtby5qcyIsIndlYnBhY2s6Ly8vLi4vfi9iYWJlbC1ydW50aW1lL2NvcmUtanMvcHJvbWlzZS5qcyIsIndlYnBhY2s6Ly8vLi4vfi9iYWJlbC1ydW50aW1lL34vY29yZS1qcy9saWJyYXJ5L2ZuL3Byb21pc2UuanMiLCJ3ZWJwYWNrOi8vLy4uL34vYmFiZWwtcnVudGltZS9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNi5zdHJpbmcuaXRlcmF0b3IuanMiLCJ3ZWJwYWNrOi8vLy4uL34vYmFiZWwtcnVudGltZS9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzLyQuc3RyaW5nLWF0LmpzIiwid2VicGFjazovLy8uLi9+L2JhYmVsLXJ1bnRpbWUvfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy8kLnRvLWludGVnZXIuanMiLCJ3ZWJwYWNrOi8vLy4uL34vYmFiZWwtcnVudGltZS9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzLyQuZGVmaW5lZC5qcyIsIndlYnBhY2s6Ly8vLi4vfi9iYWJlbC1ydW50aW1lL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvJC5pdGVyLWRlZmluZS5qcyIsIndlYnBhY2s6Ly8vLi4vfi9iYWJlbC1ydW50aW1lL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvJC5saWJyYXJ5LmpzIiwid2VicGFjazovLy8uLi9+L2JhYmVsLXJ1bnRpbWUvfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy8kLmRlZi5qcyIsIndlYnBhY2s6Ly8vLi4vfi9iYWJlbC1ydW50aW1lL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvJC5nbG9iYWwuanMiLCJ3ZWJwYWNrOi8vLy4uL34vYmFiZWwtcnVudGltZS9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzLyQuY29yZS5qcyIsIndlYnBhY2s6Ly8vLi4vfi9iYWJlbC1ydW50aW1lL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvJC5yZWRlZi5qcyIsIndlYnBhY2s6Ly8vLi4vfi9iYWJlbC1ydW50aW1lL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvJC5oaWRlLmpzIiwid2VicGFjazovLy8uLi9+L2JhYmVsLXJ1bnRpbWUvfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy8kLmpzIiwid2VicGFjazovLy8uLi9+L2JhYmVsLXJ1bnRpbWUvfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy8kLnByb3BlcnR5LWRlc2MuanMiLCJ3ZWJwYWNrOi8vLy4uL34vYmFiZWwtcnVudGltZS9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzLyQuc3VwcG9ydC1kZXNjLmpzIiwid2VicGFjazovLy8uLi9+L2JhYmVsLXJ1bnRpbWUvfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy8kLmZhaWxzLmpzIiwid2VicGFjazovLy8uLi9+L2JhYmVsLXJ1bnRpbWUvfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy8kLmhhcy5qcyIsIndlYnBhY2s6Ly8vLi4vfi9iYWJlbC1ydW50aW1lL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvJC53a3MuanMiLCJ3ZWJwYWNrOi8vLy4uL34vYmFiZWwtcnVudGltZS9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzLyQuc2hhcmVkLmpzIiwid2VicGFjazovLy8uLi9+L2JhYmVsLXJ1bnRpbWUvfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy8kLnVpZC5qcyIsIndlYnBhY2s6Ly8vLi4vfi9iYWJlbC1ydW50aW1lL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvJC5pdGVyYXRvcnMuanMiLCJ3ZWJwYWNrOi8vLy4uL34vYmFiZWwtcnVudGltZS9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzLyQuaXRlci1jcmVhdGUuanMiLCJ3ZWJwYWNrOi8vLy4uL34vYmFiZWwtcnVudGltZS9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzLyQudGFnLmpzIiwid2VicGFjazovLy8uLi9+L2JhYmVsLXJ1bnRpbWUvfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy8kLml0ZXItYnVnZ3kuanMiLCJ3ZWJwYWNrOi8vLy4uL34vYmFiZWwtcnVudGltZS9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL3dlYi5kb20uaXRlcmFibGUuanMiLCJ3ZWJwYWNrOi8vLy4uL34vYmFiZWwtcnVudGltZS9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNi5hcnJheS5pdGVyYXRvci5qcyIsIndlYnBhY2s6Ly8vLi4vfi9iYWJlbC1ydW50aW1lL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvJC51bnNjb3BlLmpzIiwid2VicGFjazovLy8uLi9+L2JhYmVsLXJ1bnRpbWUvfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy8kLml0ZXItc3RlcC5qcyIsIndlYnBhY2s6Ly8vLi4vfi9iYWJlbC1ydW50aW1lL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvJC50by1pb2JqZWN0LmpzIiwid2VicGFjazovLy8uLi9+L2JhYmVsLXJ1bnRpbWUvfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy8kLmlvYmplY3QuanMiLCJ3ZWJwYWNrOi8vLy4uL34vYmFiZWwtcnVudGltZS9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzLyQuY29mLmpzIiwid2VicGFjazovLy8uLi9+L2JhYmVsLXJ1bnRpbWUvfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczYucHJvbWlzZS5qcyIsIndlYnBhY2s6Ly8vLi4vfi9iYWJlbC1ydW50aW1lL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvJC5jdHguanMiLCJ3ZWJwYWNrOi8vLy4uL34vYmFiZWwtcnVudGltZS9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzLyQuYS1mdW5jdGlvbi5qcyIsIndlYnBhY2s6Ly8vLi4vfi9iYWJlbC1ydW50aW1lL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvJC5jbGFzc29mLmpzIiwid2VicGFjazovLy8uLi9+L2JhYmVsLXJ1bnRpbWUvfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy8kLmlzLW9iamVjdC5qcyIsIndlYnBhY2s6Ly8vLi4vfi9iYWJlbC1ydW50aW1lL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvJC5hbi1vYmplY3QuanMiLCJ3ZWJwYWNrOi8vLy4uL34vYmFiZWwtcnVudGltZS9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzLyQuc3RyaWN0LW5ldy5qcyIsIndlYnBhY2s6Ly8vLi4vfi9iYWJlbC1ydW50aW1lL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvJC5mb3Itb2YuanMiLCJ3ZWJwYWNrOi8vLy4uL34vYmFiZWwtcnVudGltZS9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzLyQuaXRlci1jYWxsLmpzIiwid2VicGFjazovLy8uLi9+L2JhYmVsLXJ1bnRpbWUvfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy8kLmlzLWFycmF5LWl0ZXIuanMiLCJ3ZWJwYWNrOi8vLy4uL34vYmFiZWwtcnVudGltZS9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzLyQudG8tbGVuZ3RoLmpzIiwid2VicGFjazovLy8uLi9+L2JhYmVsLXJ1bnRpbWUvfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9jb3JlLmdldC1pdGVyYXRvci1tZXRob2QuanMiLCJ3ZWJwYWNrOi8vLy4uL34vYmFiZWwtcnVudGltZS9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzLyQuc2V0LXByb3RvLmpzIiwid2VicGFjazovLy8uLi9+L2JhYmVsLXJ1bnRpbWUvfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy8kLnNhbWUuanMiLCJ3ZWJwYWNrOi8vLy4uL34vYmFiZWwtcnVudGltZS9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzLyQuc3BlY2llcy5qcyIsIndlYnBhY2s6Ly8vLi4vfi9iYWJlbC1ydW50aW1lL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvJC5taWNyb3Rhc2suanMiLCJ3ZWJwYWNrOi8vLy4uL34vYmFiZWwtcnVudGltZS9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzLyQudGFzay5qcyIsIndlYnBhY2s6Ly8vLi4vfi9iYWJlbC1ydW50aW1lL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvJC5pbnZva2UuanMiLCJ3ZWJwYWNrOi8vLy4uL34vYmFiZWwtcnVudGltZS9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzLyQuaHRtbC5qcyIsIndlYnBhY2s6Ly8vLi4vfi9iYWJlbC1ydW50aW1lL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvJC5kb20tY3JlYXRlLmpzIiwid2VicGFjazovLy8uLi9+L2JhYmVsLXJ1bnRpbWUvfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy8kLm1peC5qcyIsIndlYnBhY2s6Ly8vLi4vfi9iYWJlbC1ydW50aW1lL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvJC5pdGVyLWRldGVjdC5qcyIsIndlYnBhY2s6Ly8vLi4vfi9iYWJlbC1ydW50aW1lL2hlbHBlcnMvaW50ZXJvcC1yZXF1aXJlLWRlZmF1bHQuanMiLCJ3ZWJwYWNrOi8vLy4vcGxheWxhbmcuanMiLCJ3ZWJwYWNrOi8vLy4vcGxheWxhbmcuaW50ZXJmYWNlLmpzIiwid2VicGFjazovLy8uLi9kaXN0L3J1bmUuanMiLCJ3ZWJwYWNrOi8vLy4vcGxheWxhbmcucnVudGltZS5qcyIsIndlYnBhY2s6Ly8vLi4vfi9iYWJlbC1ydW50aW1lL2NvcmUtanMvYXJyYXkvZnJvbS5qcyIsIndlYnBhY2s6Ly8vLi4vfi9iYWJlbC1ydW50aW1lL34vY29yZS1qcy9saWJyYXJ5L2ZuL2FycmF5L2Zyb20uanMiLCJ3ZWJwYWNrOi8vLy4uL34vYmFiZWwtcnVudGltZS9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNi5hcnJheS5mcm9tLmpzIiwid2VicGFjazovLy8uLi9+L2JhYmVsLXJ1bnRpbWUvfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy8kLnRvLW9iamVjdC5qcyIsIndlYnBhY2s6Ly8vLi9lZmZlY3QuanMiLCJ3ZWJwYWNrOi8vLy4vZWZmZWN0LmludGVyZmFjZS5qcyIsIndlYnBhY2s6Ly8vLi9lZmZlY3QucnVudGltZS5qcyIsIndlYnBhY2s6Ly8vLi4vfi9iYWJlbC1ydW50aW1lL2NvcmUtanMvZ2V0LWl0ZXJhdG9yLmpzIiwid2VicGFjazovLy8uLi9+L2JhYmVsLXJ1bnRpbWUvfi9jb3JlLWpzL2xpYnJhcnkvZm4vZ2V0LWl0ZXJhdG9yLmpzIiwid2VicGFjazovLy8uLi9+L2JhYmVsLXJ1bnRpbWUvfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9jb3JlLmdldC1pdGVyYXRvci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsdUJBQWU7QUFDZjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7OztBQ3RDQSxhQUFZLENBQUM7Ozs7Ozt1Q0FFUSxFQUFlOzs7O3FDQUNqQixFQUFhOzs7O0FBRWhDLEtBQUksUUFBUSxHQUFHLDZCQUFjLENBQUM7QUFDOUIsU0FBUSxDQUFDLEtBQUssRUFBRSxDQUNiLElBQUksQ0FBQyxVQUFDLEdBQUcsRUFBSztBQUFFLFVBQU8sQ0FBQyxHQUFHLENBQUMsdUJBQXVCLEVBQUUsQ0FBQyxDQUFDLENBQUUsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQ25GLEtBQUssQ0FBQyxVQUFDLENBQUM7VUFBSyxDQUFDLEtBQUssQ0FBQztFQUFBLENBQUMsQ0FDckIsSUFBSSxDQUFDLFVBQUMsR0FBRyxFQUFFLENBQUMsRUFBSztBQUNoQixNQUFHLENBQUMsT0FBTyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztFQUNwQixDQUFDLENBQ0QsS0FBSyxDQUFDLFVBQUMsQ0FBQztVQUFLLENBQUMsS0FBSyxDQUFDO0VBQUEsQ0FBQyxDQUNyQixJQUFJLENBQUMsVUFBQyxHQUFHLEVBQUUsQ0FBQyxFQUFLO0FBQ2hCLFVBQU8sQ0FBQyxHQUFHLENBQUMsMkJBQTJCLENBQUMsQ0FBQztBQUN6QyxNQUFHLENBQUMsT0FBTyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztFQUNwQixDQUFDLENBQ0QsS0FBSyxDQUFDLFVBQUMsQ0FBQztVQUFLLENBQUMsS0FBSyxFQUFFO0VBQUEsQ0FBQyxDQUN0QixJQUFJLENBQUMsVUFBQyxHQUFHLEVBQUUsQ0FBQyxFQUFLO0FBQ2hCLFVBQU8sQ0FBQyxHQUFHLENBQUMsMkJBQTJCLENBQUMsQ0FBQztBQUN6QyxNQUFHLENBQUMsT0FBTyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztFQUNwQixDQUFDLENBQ0QsSUFBSSxDQUFDLFVBQUMsR0FBRyxFQUFFLENBQUMsRUFBSztBQUFFLFVBQU8sQ0FBQyxHQUFHLENBQUMsdUJBQXVCLEVBQUUsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBRSxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztFQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQ2hHLElBQUksQ0FBQyxVQUFDLEdBQUcsRUFBSztBQUNiLFVBQU8sQ0FBQyxHQUFHLENBQUMscUJBQXFCLEVBQUUsR0FBRyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDbEQsTUFBRyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUM1QixDQUFDLENBQ0QsS0FBSyxFQUFFLFFBQ0QsQ0FBQyxVQUFDLENBQUM7VUFBSyxDQUFDLEdBQUcsRUFBRTtFQUFBLENBQUMsQ0FBQyxFQUFFLENBQUMsVUFBQyxHQUFHLEVBQUUsQ0FBQyxFQUFLO0FBQUUsTUFBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7RUFBQyxDQUFDLFFBQ3RELENBQUMsVUFBQyxD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RUFBRSxDQUNuQyxRQUFRLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FDdkMsV0FBVyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7RUFDNUM7O0FBRUQsVUFBUyxDQUFDLFNBQVMsQ0FBQyxLQUFLLEdBQUcsd0JBQUssTUFBTSxDQUFDLE9BQU8sRUFBRSxPQUFPLENBQUMsQ0FBQztBQUMxRCxVQUFTLENBQUMsU0FBUyxDQUFDLElBQUksR0FBRyx3QkFBSyxNQUFNLENBQUMsTUFBTSxFQUFFLE1BQU0sQ0FBQyxDQUFDO0FBQ3ZELFVBQVMsQ0FBQyxTQUFTLENBQUMsTUFBTSxHQUFHLHdCQUFLLE1BQU0sQ0FBQyxRQUFRLEVBQUUsTUFBTSxDQUFDLENBQUM7QUFDM0QsVUFBUyxDQUFDLFNBQVMsQ0FBQyxJQUFJLEdBQUcsd0JBQUssTUFBTSxDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUMsQ0FBQztBQUN2RCxVQUFTLENBQUMsU0FBUyxDQUFDLEtBQUssR0FBRyx3QkFBSyxNQUFNLENBQUMsT0FBTyxFQUFFLE9BQU8sQ0FBQyxDQUFDO0FBQzFELFVBQVMsQ0FBQyxTQUFTLENBQUMsR0FBRyxHQUFHLHdCQUFLLE1BQU0sQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDLENBQUM7QUFDcEQsVUFBUyxDQUFDLFNBQVMsUUFBSyxHQUFHLHdCQUFLLE1BQU0sQ0FBQyxNQUFNLEVBQUUsTUFBTSxDQUFDLENBQUM7QUFDdkQsVUFBUyxDQUFDLFNBQVMsQ0FBQyxFQUFFLEdBQUcsd0JBQUssTUFBTSxDQUFDLElBQUksRUFBRSxNQUFNLENBQUMsQ0FBQztBQUNuRCxVQUFTLENBQUMsU0FBUyxDQUFDLEVBQUUsR0FBRyx3QkFBSyxNQUFNLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxDQUFDO0FBQ25ELFVBQVMsQ0FBQyxTQUFTLENBQUMsSUFBSSxHQUFHLHdCQUFLLE1BQU0sQ0FBQyxNQUFNLEVBQUUsT0FBTyxDQUFDLENB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RSxNQUFNLENBQUMsQ0FBQztBQUN2RCxVQUFTLENBQUMsU0FBUyxDQUFDLEdBQUcsR0FBRyx3QkFBSyxNQUFNLENBQUMsS0FBSyxFQUFFLE1BQU0sQ0FBQyxDQUFDO0FBQ3JELFVBQVMsQ0FBQyxTQUFTLENBQUMsSUFBSSxHQUFHLHdCQUFLLE1BQU0sQ0FBQyxNQUFNLEVBQUUsTUFBTSxDQUFDLENBQUM7QUFDdkQsVUFBUyxDQUFDLFNBQVMsQ0FBQyxLQUFLLEdBQUcsd0JBQUssTUFBTSxDQUFDLE9BQU8sRUFBRSxPQUFPLENBQUMsQ0FBQztBQUMxRCxVQUFTLENBQUMsU0FBUyxDQUFDLEdBQUcsR0FBRyx3QkFBSyxNQUFNLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQyxDQUFDO0FBQ3BELFVBQVMsQ0FBQyxTQUFTLFFBQUssR0FBRyx3QkFBSyxNQUFNLENBQUMsTUFBTSxFQUFFLE1BQU0sQ0FBQyxDQUFDO0FBQ3ZELFVBQVMsQ0FBQyxTQUFTLENBQUMsRUFBRSxHQUFHLHdCQUFLLE1BQU0sQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDLENBQUM7QUFDbkQsVUFBUyxDQUFDLFNBQVMsQ0FBQyxJQUFJLEdBQUcsd0JBQUssTUFBTSxDQUFDLE1BQU0sRUFBRSxPQUFPLENBQUMsQ0FBQztBQUN4RCxVQUFTLENBQUMsU0FBUyxDQUFDLEtBQUssR0FBRyx3QkFBSyxNQUFNLENBQUMsT0FBTyxFQUFFLEtBQUssQ0FBQyxDQUFDOztBQUV4RCxVQUFTLENBQUMsU0FBUyxDQUFDLFFBQVEsR0FBRyxVQUFTLE9BQU8sRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFOztBQUU1RCxVQUFPLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsQ0FBQztFQUM5QyxDQUFDOztBQUVGLFVBQVMsQ0FBQyxTQUFTLENBQUMsVUFBVSxHQUFHLFVBQVMsT0FBTyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUU7Ozs7QUFJOUQsVUFBTyxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENB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c291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGV4cG9ydHM6IHt9LFxuIFx0XHRcdGlkOiBtb2R1bGVJZCxcbiBcdFx0XHRsb2FkZWQ6IGZhbHNlXG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiB3ZWJwYWNrL2Jvb3RzdHJhcCAwNDJkMGJjY2NhMWNkM2E3MjNjMVxuICoqLyIsIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IFBsYXlsYW5nIGZyb20gJy4vcGxheWxhbmcuanMnO1xuaW1wb3J0IEVmZmVjdCBmcm9tICcuL2VmZmVjdC5qcyc7XG5cbnZhciBwbGF5bGFuZyA9IG5ldyBQbGF5bGFuZygpO1xucGxheWxhbmcuc3RhcnQoKVxuICAubmV4dCgoY3R4KSA9PiB7IGNvbnNvbGUubG9nKCc+Pj4+Pj4+Pj4+ICMwOiAzIGFzIGEnLCAzKTsgY3R4LnJldHVybnMoMyk7IH0pLmFzKCdhJylcbiAgLnVudGlsKCh4KSA9PiB4ID09PSA5KVxuICAubG9vcCgoY3R4LCB4KSA9PiB7XG4gICAgY3R4LnJldHVybnMoeCArIDEpO1xuICB9KVxuICAudW50aWwoKHgpID0+IHggPT09IDkpXG4gIC5sb29wKChjdHgsIHgpID0+IHtcbiAgICBjb25zb2xlLmxvZygnPj4+Pj4+PiBJIHNob3VsZCBub3QgcnVuIScpO1xuICAgIGN0eC5yZXR1cm5zKHggKyAxKTtcbiAgfSlcbiAgLnVudGlsKCh4KSA9PiB4ID09PSAxMClcbiAgLmxvb3AoKGN0eCwgeCkgPT4ge1xuICAgIGNvbnNvbGUubG9nKCc+Pj4+Pj4+IEkgc2hvdWxkIHJ1biBvbmNlJyk7XG4gICAgY3R4LnJldHVybnMoeCArIDEpO1xuICB9KVxuICAubmV4dCgoY3R4LCB4KSA9PiB7IGNvbnNvbGUubG9nKCc+Pj4+Pj4+PiAjMTogKyA0IGFzIGInLCB4LCB4ICsgNCk7IGN0eC5yZXR1cm5zKHggKyA0KTt9KS5hcygnYicpXG4gIC5uZXh0KChjdHgpID0+IHtcbiAgICBjb25zb2xlLmxvZygnPj4+Pj4+Pj4+ICMgKyBhIGI6ICcsIGN0eC5hICsgY3R4LmIpO1xuICAgIGN0eC5yZXR1cm5zKGN0eC5hICsgY3R4LmIpO1xuICB9KVxuICAubWF0Y2goKVxuICAgIC5jYXNlKChuKSA9PiBuIDwgMTcpLnRvKChjdHgsIGEpID0+IHsgY3R4LnJldHVybnMoYSArIDEpO30pXG4gICAgLmNhc2UoKG4pID0+IG4gPiAxNyApLnRvKChjdHgsIGIpID0+IHsgY3R4LnJldHVybnMoYiArIDk5OSk7fSlcbiAgICAuY2FzZSgobikgPT4gbiA9PT0gMTcgKS50bygoY3R4LCBjKSA9PiB7XG4gICAgICBuZXcgUHJvbWlzZSgociwgaikgPT4ge1xuICAgICAgICBzZXRUaW1lb3V0KHIsIDIwMDApO1xuICAgICAgfSkudGhlbigoKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKCc+Pj4+Pj4+Pj4gIyBhZnRlciB3YWl0aW5nIDIgc2VjczsgKyAxOiAnLGMgLGMgKyAxKTtcbiAgICAgICAgY3R4LnJldHVybnMoYysxKTtcbiAgICAgIH0pO1xuICAgIH0pXG4gICAgLmNhc2UoKG4pID0+IG4gPT09IDE3ICkudG8oKGN0eCwgZCkgPT4ge1xuICAgICAgY3R4LnJldHVybnMoZCAtIDI1NSk7XG4gICAgfSlcbiAgLmVuZCgpXG4gIC5uZXh0KChjdHgsIHgpID0+IHsgY29uc29sZS5sb2coJz4+Pj4+Pj4+ICMgKyA1OicsIHgsIHggKyA1KTsgY3R4LnJldHVybnMoeCArIDUpO30pXG4gIC5hbGwoKGN0eCkgPT4ge2N0eC5yZXR1cm5zKDEpOyB9LFxuICAgICAgKGN0eCkgPT4ge1xuICAgICAgICBjdHgucmV0dXJucyhuZXcgUHJvbWlzZSgociwgaikgPT4ge1xuICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4geyByKDIwKTsgfSwgMTAwMCk7XG4gICAgICAgIH0pKTtcbiAgICAgIH0pXG4gIC5uZXh0KChjdHgsIHJzKSA9PiB7XG4gICAgY29uc29sZS5sb2coJz4+Pj4+Pj4+PiAjIGFmdGVyIHxhbGx8OiAnLCBycyk7XG4gICAgY3R4LnJldHVybnMocnMpO1xuICB9KVxuICAuYW55KChjdHgsIHJzKSA9PiB7Y3R4LnJldHVybnMocnNbMF0gKyByc1sxXSk7IH0sXG4gICAgICAoY3R4LCBycykgPT4ge1xuICAgICAgICBjdHgucmV0dXJucyhuZXcgUHJvbWlzZSgociwgaikgPT4ge1xuICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4geyByKHJzWzBdIC0gcnNbMV0pOyB9LCAxMDAwKTtcbiAgICAgICAgfSkpO1xuICAgICAgfSlcbiAgLm5leHQoKGN0eCwgcikgPT4ge1xuICAgIGNvbnNvbGUubG9nKCc+Pj4+Pj4+Pj4gIyBhZnRlciB8YW55fDsgcmVzZXQgYXMgWzEsIDIsIDNdOiAnLCByKTtcbiAgICBjdHgucmV0dXJucygxLCAyLCAzKTtcbiAgfSlcbiAgLm5leHQoKGN0eCwgcnMpID0+IHtcbiAgICBjb25zb2xlLmxvZygnPj4+Pj4+Pj4+ICMgcmV0dXJuIG11bHRpcGxlIHZhbHVlcyB3aWxsIGJlY29tZSBhcnJheTogJywgcnMpO1xuICAgIGN0eC5yZXR1cm5zKDEpO1xuICB9KVxuICAubmV4dCgoY3R4KSA9PiB7XG4gICAgY29uc29sZS5sb2coJz4+Pj4+IHRyeSB0byByYWlzZSBlcnJvciBvciBpbnRlcnJ1cHRpb24nKTtcbiAgICAvL2N0eC5yYWlzZSgnVFJZIFRPIFJBSVNFJyk7XG4gICAgY3R4LmludGVycnVwdCgzKTtcbiAgICAvLyBgaW50ZXJydXB0c2Agc2hvdWxkIGNhbmNlbCB0aGUgYHJldHVybnNgLlxuICAgIGN0eC5yZXR1cm5zKDMpO1xuICB9KVxuICAubmV4dCgoY3R4LCBycykgPT4ge1xuICAgIGNvbnNvbGUubG9nKCc+Pj4+Pj4+IHNob3VsZCBub3QgcnVuIScpO1xuICAgIGN0eC5yZXR1cm5zKDEpO1xuICB9KVxuICAubmV4dCgoY3R4LCBycykgPT4ge1xuICAgIGNvbnNvbGUubG9nKCc+Pj4+Pj4+IHNob3VsZCBub3QgcnVuIScpO1xuICAgIGN0eC5yZXR1cm5zKDEpO1xuICB9KVxuICAuZWZmZWN0KClcbiAgLnN0YXJ0KClcbiAgLnVudGlsKChkYXRhKSA9PiB7IGNvbnNvbGUubG9nKCc+Pj4+PiBkYXRhOiAnLCBkYXRhKTsgcmV0dXJuIDM7fSlcbiAgLmxvb3AoKGRhdGEpID0+IHtcbiAgICBjb25zb2xlLmxvZygnPj4+Pj4+PiB0ZXN0IGxvb3A7IGRhdGE6ICcsIGRhdGEpO1xuICB9KVxuICAubWF0Y2goKVxuICAgIC5jYXNlKChkYXRhKSA9PiBkYXRhID09PSAyKVxuICAgIC50bygoKSA9PiB7XG4gICAgICByZXR1cm4gKG5ldyBFZmZlY3QoKSkuc3RhcnQoKVxuICAgICAgICAudW50aWwoKCkgPT4gMilcbiAgICAgICAgLmxvb3AoKCkgPT4ge1xuICAgICAgICAgIGNvbnNvbGUubG9nKCc+Pj4+PiBmaXJzdCBjYXNlIGxvb3AnKTtcbiAgICAgICAgfSlcbiAgICAgICAgLmRvbmUoKTtcbiAgICB9KVxuICAgIC5jYXNlKChkYXRhKSA9PiBkYXRhID09PSAxKVxuICAgIC50bygoKSA9PiB7XG4gICAgICAobmV3IEVmZmVjdCgpKS5zdGFydCgpXG4gICAgICAgIC51bnRpbCgoKSA9PiAyKVxuICAgICAgICAubG9vcCgoZGF0YSkgPT4ge1xuICAgICAgICAgIGNvbnNvbGUubG9nKCc+Pj4+PiBzZWNvbmQgY2FzZSBsb29wJywgZGF0YSk7XG4gICAgICAgIH0pXG4gICAgICAgIC5kb25lKCk7XG4gICAgfSlcbiAgICAuY2FzZSgoZGF0YSkgPT4gZGF0YSA9PT0gMSlcbiAgICAudG8oKCkgPT4ge1xuICAgICAgKG5ldyBFZmZlY3QoKSkuc3RhcnQoKVxuICAgICAgICAudW50aWwoKCkgPT4gMilcbiAgICAgICAgLmxvb3AoKCkgPT4ge1xuICAgICAgICAgIGNvbnNvbGUubG9nKCc+Pj4+PiBkdXBsaWNhdGVkIHNlY29uZCBjYXNlIGxvb3AnKTtcbiAgICAgICAgfSlcbiAgICAgICAgLmRvbmUoKTtcbiAgICB9KVxuICAuZW5kKClcbiAgLnVudGlsKChkYXRhKSA9PiB7IGNvbnNvbGUubG9nKCc+Pj4+PiBkYXRhOiAnLCBkYXRhKTsgcmV0dXJuIDQ7fSlcbiAgLmxvb3AoKCkgPT4ge1xuICAgIChuZXcgRWZmZWN0KCkpLnN0YXJ0KClcbiAgICAgIC51bnRpbCgoKSA9PiAyKVxuICAgICAgLmxvb3AoKGRhdGEpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coJz4+Pj4+IGxvb3AgWCBsb29wJywgZGF0YSk7XG4gICAgICB9KVxuICAgICAgLmRvbmUoKTtcbiAgfSlcbiAgLnJ1bigpO1xuXG4vKlxuXG5mbiA9IChjdHgsIGEsIGIpID0+IHtcbiAgdmFyIHAgPSBuZXcgUGxheWxhbmcoKVxuICBjdHgucmV0dXJucyhwLnN0YXJ0KCkubmV4dCgoY3R4KSA9PiB7XG4gICAgLy8gSXQncyBnb29kIHRvIHNoYWRvd2luZyB0aGUgb3V0ZXIgb25lLFxuICAgIC8vIHNpbmNlIHdlIGFscmVhZHkgYm9va2VkIHRvIHJldHVybiB0aGF0LlxuICAgIGN0eC5yZXR1cm5zKGEgKyBiKTtcbiAgfSkpO1xufTtcblxuLy8gRE9OVCBVU0U7IE5PVCBJTVBMRU1FTlRFRCBJTlRFTlRJT05BTExZXG5nbiA9IChjdHgsIGEsIGIpID0+IHtcbiAgdmFyIHAgPSBuZXcgUGxheWxhbmcoKVxuICBjdHgucmV0dXJucyhuZXcgUHJvbWlzZSgociwgaikgPT4ge1xuICAgIHNldFRpbWVvdXQocihhIC0gYiksIDEwMDApO1xuICB9KS50aGVuKChyZXN1bHQpID0+IHtcbiAgICByZXR1cm4gcmVzdWx0ICsgMTtcbiAgfSkpO1xufTtcblxuaG4gPSAoY3R4LCBhLCBiKSA9PiB7XG4gIHZhciBwID0gbmV3IFBsYXlsYW5nKClcbiAgKG5ldyBQcm9taXNlKChyLCBqKSA9PiB7XG4gICAgc2V0VGltZW91dChyKGEgLSBiKSwgMTAwMCk7XG4gIH0pLnRoZW4oKHJlc3VsdCkgPT4ge1xuICAgIC8vIFVzZSBhIGNsb3N1cmUgdG8gcmV0dXJuIGl0LFxuICAgIC8vIGp1c3QgbGlrZSBvdGhlciBvcmRpbmFyeSBmdW5jdGlvbnMuXG4gICAgY3R4LnJldHVybnMocmVzdWx0ICsgMSk7XG4gIH0pO1xufTtcblxuICovXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3BsYXlsYW5nLWRlbW8uanNcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IHsgXCJkZWZhdWx0XCI6IHJlcXVpcmUoXCJjb3JlLWpzL2xpYnJhcnkvZm4vcHJvbWlzZVwiKSwgX19lc01vZHVsZTogdHJ1ZSB9O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi4vfi9iYWJlbC1ydW50aW1lL2NvcmUtanMvcHJvbWlzZS5qc1xuICoqIG1vZHVsZSBpZCA9IDFcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsInJlcXVpcmUoJy4uL21vZHVsZXMvZXM2Lm9iamVjdC50by1zdHJpbmcnKTtcbnJlcXVpcmUoJy4uL21vZHVsZXMvZXM2LnN0cmluZy5pdGVyYXRvcicpO1xucmVxdWlyZSgnLi4vbW9kdWxlcy93ZWIuZG9tLml0ZXJhYmxlJyk7XG5yZXF1aXJlKCcuLi9tb2R1bGVzL2VzNi5wcm9taXNlJyk7XG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4uL21vZHVsZXMvJC5jb3JlJykuUHJvbWlzZTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4uL34vYmFiZWwtcnVudGltZS9+L2NvcmUtanMvbGlicmFyeS9mbi9wcm9taXNlLmpzXG4gKiogbW9kdWxlIGlkID0gMlxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xudmFyICRhdCAgPSByZXF1aXJlKCcuLyQuc3RyaW5nLWF0JykodHJ1ZSk7XG5cbi8vIDIxLjEuMy4yNyBTdHJpbmcucHJvdG90eXBlW0BAaXRlcmF0b3JdKClcbnJlcXVpcmUoJy4vJC5pdGVyLWRlZmluZScpKFN0cmluZywgJ1N0cmluZycsIGZ1bmN0aW9uKGl0ZXJhdGVkKXtcbiAgdGhpcy5fdCA9IFN0cmluZyhpdGVyYXRlZCk7IC8vIHRhcmdldFxuICB0aGlzLl9pID0gMDsgICAgICAgICAgICAgICAgLy8gbmV4dCBpbmRleFxuLy8gMjEuMS41LjIuMSAlU3RyaW5nSXRlcmF0b3JQcm90b3R5cGUlLm5leHQoKVxufSwgZnVuY3Rpb24oKXtcbiAgdmFyIE8gICAgID0gdGhpcy5fdFxuICAgICwgaW5kZXggPSB0aGlzLl9pXG4gICAgLCBwb2ludDtcbiAgaWYoaW5kZXggPj0gTy5sZW5ndGgpcmV0dXJuIHt2YWx1ZTogdW5kZWZpbmVkLCBkb25lOiB0cnVlfTtcbiAgcG9pbnQgPSAkYXQoTywgaW5kZXgpO1xuICB0aGlzLl9pICs9IHBvaW50Lmxlbmd0aDtcbiAgcmV0dXJuIHt2YWx1ZTogcG9pbnQsIGRvbmU6IGZhbHNlfTtcbn0pO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi4vfi9iYWJlbC1ydW50aW1lL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM2LnN0cmluZy5pdGVyYXRvci5qc1xuICoqIG1vZHVsZSBpZCA9IDRcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIi8vIHRydWUgIC0+IFN0cmluZyNhdFxuLy8gZmFsc2UgLT4gU3RyaW5nI2NvZGVQb2ludEF0XG52YXIgdG9JbnRlZ2VyID0gcmVxdWlyZSgnLi8kLnRvLWludGVnZXInKVxuICAsIGRlZmluZWQgICA9IHJlcXVpcmUoJy4vJC5kZWZpbmVkJyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKFRPX1NUUklORyl7XG4gIHJldHVybiBmdW5jdGlvbih0aGF0LCBwb3Mpe1xuICAgIHZhciBzID0gU3RyaW5nKGRlZmluZWQodGhhdCkpXG4gICAgICAsIGkgPSB0b0ludGVnZXIocG9zKVxuICAgICAgLCBsID0gcy5sZW5ndGhcbiAgICAgICwgYSwgYjtcbiAgICBpZihpIDwgMCB8fCBpID49IGwpcmV0dXJuIFRPX1NUUklORyA/ICcnIDogdW5kZWZpbmVkO1xuICAgIGEgPSBzLmNoYXJDb2RlQXQoaSk7XG4gICAgcmV0dXJuIGEgPCAweGQ4MDAgfHwgYSA+IDB4ZGJmZiB8fCBpICsgMSA9PT0gbFxuICAgICAgfHwgKGIgPSBzLmNoYXJDb2RlQXQoaSArIDEpKSA8IDB4ZGMwMCB8fCBiID4gMHhkZmZmXG4gICAgICAgID8gVE9fU1RSSU5HID8gcy5jaGFyQXQoaSkgOiBhXG4gICAgICAgIDogVE9fU1RSSU5HID8gcy5zbGljZShpLCBpICsgMikgOiAoYSAtIDB4ZDgwMCA8PCAxMCkgKyAoYiAtIDB4ZGMwMCkgKyAweDEwMDAwO1xuICB9O1xufTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4uL34vYmFiZWwtcnVudGltZS9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzLyQuc3RyaW5nLWF0LmpzXG4gKiogbW9kdWxlIGlkID0gNVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiLy8gNy4xLjQgVG9JbnRlZ2VyXG52YXIgY2VpbCAgPSBNYXRoLmNlaWxcbiAgLCBmbG9vciA9IE1hdGguZmxvb3I7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0KXtcbiAgcmV0dXJuIGlzTmFOKGl0ID0gK2l0KSA/IDAgOiAoaXQgPiAwID8gZmxvb3IgOiBjZWlsKShpdCk7XG59O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi4vfi9iYWJlbC1ydW50aW1lL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvJC50by1pbnRlZ2VyLmpzXG4gKiogbW9kdWxlIGlkID0gNlxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiLy8gNy4yLjEgUmVxdWlyZU9iamVjdENvZXJjaWJsZShhcmd1bWVudClcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXQpe1xuICBpZihpdCA9PSB1bmRlZmluZWQpdGhyb3cgVHlwZUVycm9yKFwiQ2FuJ3QgY2FsbCBtZXRob2Qgb24gIFwiICsgaXQpO1xuICByZXR1cm4gaXQ7XG59O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi4vfi9iYWJlbC1ydW50aW1lL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvJC5kZWZpbmVkLmpzXG4gKiogbW9kdWxlIGlkID0gN1xuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xudmFyIExJQlJBUlkgICAgICAgICA9IHJlcXVpcmUoJy4vJC5saWJyYXJ5JylcbiAgLCAkZGVmICAgICAgICAgICAgPSByZXF1aXJlKCcuLyQuZGVmJylcbiAgLCAkcmVkZWYgICAgICAgICAgPSByZXF1aXJlKCcuLyQucmVkZWYnKVxuICAsIGhpZGUgICAgICAgICAgICA9IHJlcXVpcmUoJy4vJC5oaWRlJylcbiAgLCBoYXMgICAgICAgICAgICAgPSByZXF1aXJlKCcuLyQuaGFzJylcbiAgLCBTWU1CT0xfSVRFUkFUT1IgPSByZXF1aXJlKCcuLyQud2tzJykoJ2l0ZXJhdG9yJylcbiAgLCBJdGVyYXRvcnMgICAgICAgPSByZXF1aXJlKCcuLyQuaXRlcmF0b3JzJylcbiAgLCBGRl9JVEVSQVRPUiAgICAgPSAnQEBpdGVyYXRvcidcbiAgLCBLRVlTICAgICAgICAgICAgPSAna2V5cydcbiAgLCBWQUxVRVMgICAgICAgICAgPSAndmFsdWVzJztcbnZhciByZXR1cm5UaGlzID0gZnVuY3Rpb24oKXsgcmV0dXJuIHRoaXM7IH07XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKEJhc2UsIE5BTUUsIENvbnN0cnVjdG9yLCBuZXh0LCBERUZBVUxULCBJU19TRVQsIEZPUkNFKXtcbiAgcmVxdWlyZSgnLi8kLml0ZXItY3JlYXRlJykoQ29uc3RydWN0b3IsIE5BTUUsIG5leHQpO1xuICB2YXIgY3JlYXRlTWV0aG9kID0gZnVuY3Rpb24oa2luZCl7XG4gICAgc3dpdGNoKGtpbmQpe1xuICAgICAgY2FzZSBLRVlTOiByZXR1cm4gZnVuY3Rpb24ga2V5cygpeyByZXR1cm4gbmV3IENvbnN0cnVjdG9yKHRoaXMsIGtpbmQpOyB9O1xuICAgICAgY2FzZSBWQUxVRVM6IHJldHVybiBmdW5jdGlvbiB2YWx1ZXMoKXsgcmV0dXJuIG5ldyBDb25zdHJ1Y3Rvcih0aGlzLCBraW5kKTsgfTtcbiAgICB9IHJldHVybiBmdW5jdGlvbiBlbnRyaWVzKCl7IHJldHVybiBuZXcgQ29uc3RydWN0b3IodGhpcywga2luZCk7IH07XG4gIH07XG4gIHZhciBUQUcgICAgICA9IE5BTUUgKyAnIEl0ZXJhdG9yJ1xuICAgICwgcHJvdG8gICAgPSBCYXNlLnByb3RvdHlwZVxuICAgICwgX25hdGl2ZSAgPSBwcm90b1tTWU1CT0xfSVRFUkFUT1JdIHx8IHByb3RvW0ZGX0lURVJBVE9SXSB8fCBERUZBVUxUICYmIHByb3RvW0RFRkFVTFRdXG4gICAgLCBfZGVmYXVsdCA9IF9uYXRpdmUgfHwgY3JlYXRlTWV0aG9kKERFRkFVTFQpXG4gICAgLCBtZXRob2RzLCBrZXk7XG4gIC8vIEZpeCBuYXRpdmVcbiAgaWYoX25hdGl2ZSl7XG4gICAgdmFyIEl0ZXJhdG9yUHJvdG90eXBlID0gcmVxdWlyZSgnLi8kJykuZ2V0UHJvdG8oX2RlZmF1bHQuY2FsbChuZXcgQmFzZSkpO1xuICAgIC8vIFNldCBAQHRvU3RyaW5nVGFnIHRvIG5hdGl2ZSBpdGVyYXRvcnNcbiAgICByZXF1aXJlKCcuLyQudGFnJykoSXRlcmF0b3JQcm90b3R5cGUsIFRBRywgdHJ1ZSk7XG4gICAgLy8gRkYgZml4XG4gICAgaWYoIUxJQlJBUlkgJiYgaGFzKHByb3RvLCBGRl9JVEVSQVRPUikpaGlkZShJdGVyYXRvclByb3RvdHlwZSwgU1lNQk9MX0lURVJBVE9SLCByZXR1cm5UaGlzKTtcbiAgfVxuICAvLyBEZWZpbmUgaXRlcmF0b3JcbiAgaWYoIUxJQlJBUlkgfHwgRk9SQ0UpaGlkZShwcm90bywgU1lNQk9MX0lURVJBVE9SLCBfZGVmYXVsdCk7XG4gIC8vIFBsdWcgZm9yIGxpYnJhcnlcbiAgSXRlcmF0b3JzW05BTUVdID0gX2RlZmF1bHQ7XG4gIEl0ZXJhdG9yc1tUQUddICA9IHJldHVyblRoaXM7XG4gIGlmKERFRkFVTFQpe1xuICAgIG1ldGhvZHMgPSB7XG4gICAgICBrZXlzOiAgICBJU19TRVQgICAgICAgICAgICA/IF9kZWZhdWx0IDogY3JlYXRlTWV0aG9kKEtFWVMpLFxuICAgICAgdmFsdWVzOiAgREVGQVVMVCA9PSBWQUxVRVMgPyBfZGVmYXVsdCA6IGNyZWF0ZU1ldGhvZChWQUxVRVMpLFxuICAgICAgZW50cmllczogREVGQVVMVCAhPSBWQUxVRVMgPyBfZGVmYXVsdCA6IGNyZWF0ZU1ldGhvZCgnZW50cmllcycpXG4gICAgfTtcbiAgICBpZihGT1JDRSlmb3Ioa2V5IGluIG1ldGhvZHMpe1xuICAgICAgaWYoIShrZXkgaW4gcHJvdG8pKSRyZWRlZihwcm90bywga2V5LCBtZXRob2RzW2tleV0pO1xuICAgIH0gZWxzZSAkZGVmKCRkZWYuUCArICRkZWYuRiAqIHJlcXVpcmUoJy4vJC5pdGVyLWJ1Z2d5JyksIE5BTUUsIG1ldGhvZHMpO1xuICB9XG59O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi4vfi9iYWJlbC1ydW50aW1lL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvJC5pdGVyLWRlZmluZS5qc1xuICoqIG1vZHVsZSBpZCA9IDhcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gdHJ1ZTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4uL34vYmFiZWwtcnVudGltZS9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzLyQubGlicmFyeS5qc1xuICoqIG1vZHVsZSBpZCA9IDlcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsInZhciBnbG9iYWwgICAgPSByZXF1aXJlKCcuLyQuZ2xvYmFsJylcbiAgLCBjb3JlICAgICAgPSByZXF1aXJlKCcuLyQuY29yZScpXG4gICwgUFJPVE9UWVBFID0gJ3Byb3RvdHlwZSc7XG52YXIgY3R4ID0gZnVuY3Rpb24oZm4sIHRoYXQpe1xuICByZXR1cm4gZnVuY3Rpb24oKXtcbiAgICByZXR1cm4gZm4uYXBwbHkodGhhdCwgYXJndW1lbnRzKTtcbiAgfTtcbn07XG52YXIgJGRlZiA9IGZ1bmN0aW9uKHR5cGUsIG5hbWUsIHNvdXJjZSl7XG4gIHZhciBrZXksIG93biwgb3V0LCBleHBcbiAgICAsIGlzR2xvYmFsID0gdHlwZSAmICRkZWYuR1xuICAgICwgaXNQcm90byAgPSB0eXBlICYgJGRlZi5QXG4gICAgLCB0YXJnZXQgICA9IGlzR2xvYmFsID8gZ2xvYmFsIDogdHlwZSAmICRkZWYuU1xuICAgICAgICA/IGdsb2JhbFtuYW1lXSA6IChnbG9iYWxbbmFtZV0gfHwge30pW1BST1RPVFlQRV1cbiAgICAsIGV4cG9ydHMgID0gaXNHbG9iYWwgPyBjb3JlIDogY29yZVtuYW1lXSB8fCAoY29yZVtuYW1lXSA9IHt9KTtcbiAgaWYoaXNHbG9iYWwpc291cmNlID0gbmFtZTtcbiAgZm9yKGtleSBpbiBzb3VyY2Upe1xuICAgIC8vIGNvbnRhaW5zIGluIG5hdGl2ZVxuICAgIG93biA9ICEodHlwZSAmICRkZWYuRikgJiYgdGFyZ2V0ICYmIGtleSBpbiB0YXJnZXQ7XG4gICAgaWYob3duICYmIGtleSBpbiBleHBvcnRzKWNvbnRpbnVlO1xuICAgIC8vIGV4cG9ydCBuYXRpdmUgb3IgcGFzc2VkXG4gICAgb3V0ID0gb3duID8gdGFyZ2V0W2tleV0gOiBzb3VyY2Vba2V5XTtcbiAgICAvLyBwcmV2ZW50IGdsb2JhbCBwb2xsdXRpb24gZm9yIG5hbWVzcGFjZXNcbiAgICBpZihpc0dsb2JhbCAmJiB0eXBlb2YgdGFyZ2V0W2tleV0gIT0gJ2Z1bmN0aW9uJylleHAgPSBzb3VyY2Vba2V5XTtcbiAgICAvLyBiaW5kIHRpbWVycyB0byBnbG9iYWwgZm9yIGNhbGwgZnJvbSBleHBvcnQgY29udGV4dFxuICAgIGVsc2UgaWYodHlwZSAmICRkZWYuQiAmJiBvd24pZXhwID0gY3R4KG91dCwgZ2xvYmFsKTtcbiAgICAvLyB3cmFwIGdsb2JhbCBjb25zdHJ1Y3RvcnMgZm9yIHByZXZlbnQgY2hhbmdlIHRoZW0gaW4gbGlicmFyeVxuICAgIGVsc2UgaWYodHlwZSAmICRkZWYuVyAmJiB0YXJnZXRba2V5XSA9PSBvdXQpIWZ1bmN0aW9uKEMpe1xuICAgICAgZXhwID0gZnVuY3Rpb24ocGFyYW0pe1xuICAgICAgICByZXR1cm4gdGhpcyBpbnN0YW5jZW9mIEMgPyBuZXcgQyhwYXJhbSkgOiBDKHBhcmFtKTtcbiAgICAgIH07XG4gICAgICBleHBbUFJPVE9UWVBFXSA9IENbUFJPVE9UWVBFXTtcbiAgICB9KG91dCk7XG4gICAgZWxzZSBleHAgPSBpc1Byb3RvICYmIHR5cGVvZiBvdXQgPT0gJ2Z1bmN0aW9uJyA/IGN0eChGdW5jdGlvbi5jYWxsLCBvdXQpIDogb3V0O1xuICAgIC8vIGV4cG9ydFxuICAgIGV4cG9ydHNba2V5XSA9IGV4cDtcbiAgICBpZihpc1Byb3RvKShleHBvcnRzW1BST1RPVFlQRV0gfHwgKGV4cG9ydHNbUFJPVE9UWVBFXSA9IHt9KSlba2V5XSA9IG91dDtcbiAgfVxufTtcbi8vIHR5cGUgYml0bWFwXG4kZGVmLkYgPSAxOyAgLy8gZm9yY2VkXG4kZGVmLkcgPSAyOyAgLy8gZ2xvYmFsXG4kZGVmLlMgPSA0OyAgLy8gc3RhdGljXG4kZGVmLlAgPSA4OyAgLy8gcHJvdG9cbiRkZWYuQiA9IDE2OyAvLyBiaW5kXG4kZGVmLlcgPSAzMjsgLy8gd3JhcFxubW9kdWxlLmV4cG9ydHMgPSAkZGVmO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi4vfi9iYWJlbC1ydW50aW1lL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvJC5kZWYuanNcbiAqKiBtb2R1bGUgaWQgPSAxMFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwidmFyIGdsb2JhbCA9IHR5cGVvZiBzZWxmICE9ICd1bmRlZmluZWQnICYmIHNlbGYuTWF0aCA9PSBNYXRoID8gc2VsZiA6IEZ1bmN0aW9uKCdyZXR1cm4gdGhpcycpKCk7XG5tb2R1bGUuZXhwb3J0cyA9IGdsb2JhbDtcbmlmKHR5cGVvZiBfX2cgPT0gJ251bWJlcicpX19nID0gZ2xvYmFsOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVuZGVmXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuLi9+L2JhYmVsLXJ1bnRpbWUvfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy8kLmdsb2JhbC5qc1xuICoqIG1vZHVsZSBpZCA9IDExXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJ2YXIgY29yZSA9IG1vZHVsZS5leHBvcnRzID0ge307XG5pZih0eXBlb2YgX19lID09ICdudW1iZXInKV9fZSA9IGNvcmU7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW5kZWZcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4uL34vYmFiZWwtcnVudGltZS9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzLyQuY29yZS5qc1xuICoqIG1vZHVsZSBpZCA9IDEyXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vJC5oaWRlJyk7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuLi9+L2JhYmVsLXJ1bnRpbWUvfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy8kLnJlZGVmLmpzXG4gKiogbW9kdWxlIGlkID0gMTNcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsInZhciAkICAgICAgICAgID0gcmVxdWlyZSgnLi8kJylcbiAgLCBjcmVhdGVEZXNjID0gcmVxdWlyZSgnLi8kLnByb3BlcnR5LWRlc2MnKTtcbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi8kLnN1cHBvcnQtZGVzYycpID8gZnVuY3Rpb24ob2JqZWN0LCBrZXksIHZhbHVlKXtcbiAgcmV0dXJuICQuc2V0RGVzYyhvYmplY3QsIGtleSwgY3JlYXRlRGVzYygxLCB2YWx1ZSkpO1xufSA6IGZ1bmN0aW9uKG9iamVjdCwga2V5LCB2YWx1ZSl7XG4gIG9iamVjdFtrZXldID0gdmFsdWU7XG4gIHJldHVybiBvYmplY3Q7XG59O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi4vfi9iYWJlbC1ydW50aW1lL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvJC5oaWRlLmpzXG4gKiogbW9kdWxlIGlkID0gMTRcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsInZhciAkT2JqZWN0ID0gT2JqZWN0O1xubW9kdWxlLmV4cG9ydHMgPSB7XG4gIGNyZWF0ZTogICAgICRPYmplY3QuY3JlYXRlLFxuICBnZXRQcm90bzogICAkT2JqZWN0LmdldFByb3RvdHlwZU9mLFxuICBpc0VudW06ICAgICB7fS5wcm9wZXJ0eUlzRW51bWVyYWJsZSxcbiAgZ2V0RGVzYzogICAgJE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IsXG4gIHNldERlc2M6ICAgICRPYmplY3QuZGVmaW5lUHJvcGVydHksXG4gIHNldERlc2NzOiAgICRPYmplY3QuZGVmaW5lUHJvcGVydGllcyxcbiAgZ2V0S2V5czogICAgJE9iamVjdC5rZXlzLFxuICBnZXROYW1lczogICAkT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMsXG4gIGdldFN5bWJvbHM6ICRPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzLFxuICBlYWNoOiAgICAgICBbXS5mb3JFYWNoXG59O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi4vfi9iYWJlbC1ydW50aW1lL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvJC5qc1xuICoqIG1vZHVsZSBpZCA9IDE1XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGJpdG1hcCwgdmFsdWUpe1xuICByZXR1cm4ge1xuICAgIGVudW1lcmFibGUgIDogIShiaXRtYXAgJiAxKSxcbiAgICBjb25maWd1cmFibGU6ICEoYml0bWFwICYgMiksXG4gICAgd3JpdGFibGUgICAgOiAhKGJpdG1hcCAmIDQpLFxuICAgIHZhbHVlICAgICAgIDogdmFsdWVcbiAgfTtcbn07XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuLi9+L2JhYmVsLXJ1bnRpbWUvfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy8kLnByb3BlcnR5LWRlc2MuanNcbiAqKiBtb2R1bGUgaWQgPSAxNlxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiLy8gVGhhbmsncyBJRTggZm9yIGhpcyBmdW5ueSBkZWZpbmVQcm9wZXJ0eVxubW9kdWxlLmV4cG9ydHMgPSAhcmVxdWlyZSgnLi8kLmZhaWxzJykoZnVuY3Rpb24oKXtcbiAgcmV0dXJuIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh7fSwgJ2EnLCB7Z2V0OiBmdW5jdGlvbigpeyByZXR1cm4gNzsgfX0pLmEgIT0gNztcbn0pO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi4vfi9iYWJlbC1ydW50aW1lL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvJC5zdXBwb3J0LWRlc2MuanNcbiAqKiBtb2R1bGUgaWQgPSAxN1xuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihleGVjKXtcbiAgdHJ5IHtcbiAgICByZXR1cm4gISFleGVjKCk7XG4gIH0gY2F0Y2goZSl7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbn07XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuLi9+L2JhYmVsLXJ1bnRpbWUvfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy8kLmZhaWxzLmpzXG4gKiogbW9kdWxlIGlkID0gMThcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsInZhciBoYXNPd25Qcm9wZXJ0eSA9IHt9Lmhhc093blByb3BlcnR5O1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCwga2V5KXtcbiAgcmV0dXJuIGhhc093blByb3BlcnR5LmNhbGwoaXQsIGtleSk7XG59O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi4vfi9iYWJlbC1ydW50aW1lL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvJC5oYXMuanNcbiAqKiBtb2R1bGUgaWQgPSAxOVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwidmFyIHN0b3JlICA9IHJlcXVpcmUoJy4vJC5zaGFyZWQnKSgnd2tzJylcbiAgLCBTeW1ib2wgPSByZXF1aXJlKCcuLyQuZ2xvYmFsJykuU3ltYm9sO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihuYW1lKXtcbiAgcmV0dXJuIHN0b3JlW25hbWVdIHx8IChzdG9yZVtuYW1lXSA9XG4gICAgU3ltYm9sICYmIFN5bWJvbFtuYW1lXSB8fCAoU3ltYm9sIHx8IHJlcXVpcmUoJy4vJC51aWQnKSkoJ1N5bWJvbC4nICsgbmFtZSkpO1xufTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4uL34vYmFiZWwtcnVudGltZS9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzLyQud2tzLmpzXG4gKiogbW9kdWxlIGlkID0gMjBcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsInZhciBnbG9iYWwgPSByZXF1aXJlKCcuLyQuZ2xvYmFsJylcbiAgLCBTSEFSRUQgPSAnX19jb3JlLWpzX3NoYXJlZF9fJ1xuICAsIHN0b3JlICA9IGdsb2JhbFtTSEFSRURdIHx8IChnbG9iYWxbU0hBUkVEXSA9IHt9KTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oa2V5KXtcbiAgcmV0dXJuIHN0b3JlW2tleV0gfHwgKHN0b3JlW2tleV0gPSB7fSk7XG59O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi4vfi9iYWJlbC1ydW50aW1lL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvJC5zaGFyZWQuanNcbiAqKiBtb2R1bGUgaWQgPSAyMVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwidmFyIGlkID0gMFxuICAsIHB4ID0gTWF0aC5yYW5kb20oKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oa2V5KXtcbiAgcmV0dXJuICdTeW1ib2woJy5jb25jYXQoa2V5ID09PSB1bmRlZmluZWQgPyAnJyA6IGtleSwgJylfJywgKCsraWQgKyBweCkudG9TdHJpbmcoMzYpKTtcbn07XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuLi9+L2JhYmVsLXJ1bnRpbWUvfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy8kLnVpZC5qc1xuICoqIG1vZHVsZSBpZCA9IDIyXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IHt9O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi4vfi9iYWJlbC1ydW50aW1lL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvJC5pdGVyYXRvcnMuanNcbiAqKiBtb2R1bGUgaWQgPSAyM1xuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xudmFyICQgPSByZXF1aXJlKCcuLyQnKVxuICAsIEl0ZXJhdG9yUHJvdG90eXBlID0ge307XG5cbi8vIDI1LjEuMi4xLjEgJUl0ZXJhdG9yUHJvdG90eXBlJVtAQGl0ZXJhdG9yXSgpXG5yZXF1aXJlKCcuLyQuaGlkZScpKEl0ZXJhdG9yUHJvdG90eXBlLCByZXF1aXJlKCcuLyQud2tzJykoJ2l0ZXJhdG9yJyksIGZ1bmN0aW9uKCl7IHJldHVybiB0aGlzOyB9KTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihDb25zdHJ1Y3RvciwgTkFNRSwgbmV4dCl7XG4gIENvbnN0cnVjdG9yLnByb3RvdHlwZSA9ICQuY3JlYXRlKEl0ZXJhdG9yUHJvdG90eXBlLCB7bmV4dDogcmVxdWlyZSgnLi8kLnByb3BlcnR5LWRlc2MnKSgxLG5leHQpfSk7XG4gIHJlcXVpcmUoJy4vJC50YWcnKShDb25zdHJ1Y3RvciwgTkFNRSArICcgSXRlcmF0b3InKTtcbn07XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuLi9+L2JhYmVsLXJ1bnRpbWUvfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy8kLml0ZXItY3JlYXRlLmpzXG4gKiogbW9kdWxlIGlkID0gMjRcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsInZhciBoYXMgID0gcmVxdWlyZSgnLi8kLmhhcycpXG4gICwgaGlkZSA9IHJlcXVpcmUoJy4vJC5oaWRlJylcbiAgLCBUQUcgID0gcmVxdWlyZSgnLi8kLndrcycpKCd0b1N0cmluZ1RhZycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0LCB0YWcsIHN0YXQpe1xuICBpZihpdCAmJiAhaGFzKGl0ID0gc3RhdCA/IGl0IDogaXQucHJvdG90eXBlLCBUQUcpKWhpZGUoaXQsIFRBRywgdGFnKTtcbn07XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuLi9+L2JhYmVsLXJ1bnRpbWUvfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy8kLnRhZy5qc1xuICoqIG1vZHVsZSBpZCA9IDI1XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIvLyBTYWZhcmkgaGFzIGJ1Z2d5IGl0ZXJhdG9ycyB3L28gYG5leHRgXG5tb2R1bGUuZXhwb3J0cyA9ICdrZXlzJyBpbiBbXSAmJiAhKCduZXh0JyBpbiBbXS5rZXlzKCkpO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi4vfi9iYWJlbC1ydW50aW1lL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvJC5pdGVyLWJ1Z2d5LmpzXG4gKiogbW9kdWxlIGlkID0gMjZcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsInJlcXVpcmUoJy4vZXM2LmFycmF5Lml0ZXJhdG9yJyk7XG52YXIgSXRlcmF0b3JzID0gcmVxdWlyZSgnLi8kLml0ZXJhdG9ycycpO1xuSXRlcmF0b3JzLk5vZGVMaXN0ID0gSXRlcmF0b3JzLkhUTUxDb2xsZWN0aW9uID0gSXRlcmF0b3JzLkFycmF5O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi4vfi9iYWJlbC1ydW50aW1lL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvd2ViLmRvbS5pdGVyYWJsZS5qc1xuICoqIG1vZHVsZSBpZCA9IDI3XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIndXNlIHN0cmljdCc7XG52YXIgc2V0VW5zY29wZSA9IHJlcXVpcmUoJy4vJC51bnNjb3BlJylcbiAgLCBzdGVwICAgICAgID0gcmVxdWlyZSgnLi8kLml0ZXItc3RlcCcpXG4gICwgSXRlcmF0b3JzICA9IHJlcXVpcmUoJy4vJC5pdGVyYXRvcnMnKVxuICAsIHRvSU9iamVjdCAgPSByZXF1aXJlKCcuLyQudG8taW9iamVjdCcpO1xuXG4vLyAyMi4xLjMuNCBBcnJheS5wcm90b3R5cGUuZW50cmllcygpXG4vLyAyMi4xLjMuMTMgQXJyYXkucHJvdG90eXBlLmtleXMoKVxuLy8gMjIuMS4zLjI5IEFycmF5LnByb3RvdHlwZS52YWx1ZXMoKVxuLy8gMjIuMS4zLjMwIEFycmF5LnByb3RvdHlwZVtAQGl0ZXJhdG9yXSgpXG5yZXF1aXJlKCcuLyQuaXRlci1kZWZpbmUnKShBcnJheSwgJ0FycmF5JywgZnVuY3Rpb24oaXRlcmF0ZWQsIGtpbmQpe1xuICB0aGlzLl90ID0gdG9JT2JqZWN0KGl0ZXJhdGVkKTsgLy8gdGFyZ2V0XG4gIHRoaXMuX2kgPSAwOyAgICAgICAgICAgICAgICAgICAvLyBuZXh0IGluZGV4XG4gIHRoaXMuX2sgPSBraW5kOyAgICAgICAgICAgICAgICAvLyBraW5kXG4vLyAyMi4xLjUuMi4xICVBcnJheUl0ZXJhdG9yUHJvdG90eXBlJS5uZXh0KClcbn0sIGZ1bmN0aW9uKCl7XG4gIHZhciBPICAgICA9IHRoaXMuX3RcbiAgICAsIGtpbmQgID0gdGhpcy5fa1xuICAgICwgaW5kZXggPSB0aGlzLl9pKys7XG4gIGlmKCFPIHx8IGluZGV4ID49IE8ubGVuZ3RoKXtcbiAgICB0aGlzLl90ID0gdW5kZWZpbmVkO1xuICAgIHJldHVybiBzdGVwKDEpO1xuICB9XG4gIGlmKGtpbmQgPT0gJ2tleXMnICApcmV0dXJuIHN0ZXAoMCwgaW5kZXgpO1xuICBpZihraW5kID09ICd2YWx1ZXMnKXJldHVybiBzdGVwKDAsIE9baW5kZXhdKTtcbiAgcmV0dXJuIHN0ZXAoMCwgW2luZGV4LCBPW2luZGV4XV0pO1xufSwgJ3ZhbHVlcycpO1xuXG4vLyBhcmd1bWVudHNMaXN0W0BAaXRlcmF0b3JdIGlzICVBcnJheVByb3RvX3ZhbHVlcyUgKDkuNC40LjYsIDkuNC40LjcpXG5JdGVyYXRvcnMuQXJndW1lbnRzID0gSXRlcmF0b3JzLkFycmF5O1xuXG5zZXRVbnNjb3BlKCdrZXlzJyk7XG5zZXRVbnNjb3BlKCd2YWx1ZXMnKTtcbnNldFVuc2NvcGUoJ2VudHJpZXMnKTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4uL34vYmFiZWwtcnVudGltZS9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNi5hcnJheS5pdGVyYXRvci5qc1xuICoqIG1vZHVsZSBpZCA9IDI4XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKCl7IC8qIGVtcHR5ICovIH07XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuLi9+L2JhYmVsLXJ1bnRpbWUvfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy8kLnVuc2NvcGUuanNcbiAqKiBtb2R1bGUgaWQgPSAyOVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihkb25lLCB2YWx1ZSl7XG4gIHJldHVybiB7dmFsdWU6IHZhbHVlLCBkb25lOiAhIWRvbmV9O1xufTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4uL34vYmFiZWwtcnVudGltZS9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzLyQuaXRlci1zdGVwLmpzXG4gKiogbW9kdWxlIGlkID0gMzBcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIi8vIHRvIGluZGV4ZWQgb2JqZWN0LCB0b09iamVjdCB3aXRoIGZhbGxiYWNrIGZvciBub24tYXJyYXktbGlrZSBFUzMgc3RyaW5nc1xyXG52YXIgSU9iamVjdCA9IHJlcXVpcmUoJy4vJC5pb2JqZWN0JylcclxuICAsIGRlZmluZWQgPSByZXF1aXJlKCcuLyQuZGVmaW5lZCcpO1xyXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0KXtcclxuICByZXR1cm4gSU9iamVjdChkZWZpbmVkKGl0KSk7XHJcbn07XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuLi9+L2JhYmVsLXJ1bnRpbWUvfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy8kLnRvLWlvYmplY3QuanNcbiAqKiBtb2R1bGUgaWQgPSAzMVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiLy8gaW5kZXhlZCBvYmplY3QsIGZhbGxiYWNrIGZvciBub24tYXJyYXktbGlrZSBFUzMgc3RyaW5nc1xudmFyIGNvZiA9IHJlcXVpcmUoJy4vJC5jb2YnKTtcbm1vZHVsZS5leHBvcnRzID0gMCBpbiBPYmplY3QoJ3onKSA/IE9iamVjdCA6IGZ1bmN0aW9uKGl0KXtcbiAgcmV0dXJuIGNvZihpdCkgPT0gJ1N0cmluZycgPyBpdC5zcGxpdCgnJykgOiBPYmplY3QoaXQpO1xufTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4uL34vYmFiZWwtcnVudGltZS9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzLyQuaW9iamVjdC5qc1xuICoqIG1vZHVsZSBpZCA9IDMyXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJ2YXIgdG9TdHJpbmcgPSB7fS50b1N0cmluZztcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCl7XG4gIHJldHVybiB0b1N0cmluZy5jYWxsKGl0KS5zbGljZSg4LCAtMSk7XG59O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi4vfi9iYWJlbC1ydW50aW1lL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvJC5jb2YuanNcbiAqKiBtb2R1bGUgaWQgPSAzM1xuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xudmFyICQgICAgICAgICAgPSByZXF1aXJlKCcuLyQnKVxuICAsIExJQlJBUlkgICAgPSByZXF1aXJlKCcuLyQubGlicmFyeScpXG4gICwgZ2xvYmFsICAgICA9IHJlcXVpcmUoJy4vJC5nbG9iYWwnKVxuICAsIGN0eCAgICAgICAgPSByZXF1aXJlKCcuLyQuY3R4JylcbiAgLCBjbGFzc29mICAgID0gcmVxdWlyZSgnLi8kLmNsYXNzb2YnKVxuICAsICRkZWYgICAgICAgPSByZXF1aXJlKCcuLyQuZGVmJylcbiAgLCBpc09iamVjdCAgID0gcmVxdWlyZSgnLi8kLmlzLW9iamVjdCcpXG4gICwgYW5PYmplY3QgICA9IHJlcXVpcmUoJy4vJC5hbi1vYmplY3QnKVxuICAsIGFGdW5jdGlvbiAgPSByZXF1aXJlKCcuLyQuYS1mdW5jdGlvbicpXG4gICwgc3RyaWN0TmV3ICA9IHJlcXVpcmUoJy4vJC5zdHJpY3QtbmV3JylcbiAgLCBmb3JPZiAgICAgID0gcmVxdWlyZSgnLi8kLmZvci1vZicpXG4gICwgc2V0UHJvdG8gICA9IHJlcXVpcmUoJy4vJC5zZXQtcHJvdG8nKS5zZXRcbiAgLCBzYW1lICAgICAgID0gcmVxdWlyZSgnLi8kLnNhbWUnKVxuICAsIHNwZWNpZXMgICAgPSByZXF1aXJlKCcuLyQuc3BlY2llcycpXG4gICwgU1BFQ0lFUyAgICA9IHJlcXVpcmUoJy4vJC53a3MnKSgnc3BlY2llcycpXG4gICwgUkVDT1JEICAgICA9IHJlcXVpcmUoJy4vJC51aWQnKSgncmVjb3JkJylcbiAgLCBhc2FwICAgICAgID0gcmVxdWlyZSgnLi8kLm1pY3JvdGFzaycpXG4gICwgUFJPTUlTRSAgICA9ICdQcm9taXNlJ1xuICAsIHByb2Nlc3MgICAgPSBnbG9iYWwucHJvY2Vzc1xuICAsIGlzTm9kZSAgICAgPSBjbGFzc29mKHByb2Nlc3MpID09ICdwcm9jZXNzJ1xuICAsIFAgICAgICAgICAgPSBnbG9iYWxbUFJPTUlTRV1cbiAgLCBXcmFwcGVyO1xuXG52YXIgdGVzdFJlc29sdmUgPSBmdW5jdGlvbihzdWIpe1xuICB2YXIgdGVzdCA9IG5ldyBQKGZ1bmN0aW9uKCl7fSk7XG4gIGlmKHN1Yil0ZXN0LmNvbnN0cnVjdG9yID0gT2JqZWN0O1xuICByZXR1cm4gUC5yZXNvbHZlKHRlc3QpID09PSB0ZXN0O1xufTtcblxudmFyIHVzZU5hdGl2ZSA9IGZ1bmN0aW9uKCl7XG4gIHZhciB3b3JrcyA9IGZhbHNlO1xuICBmdW5jdGlvbiBQMih4KXtcbiAgICB2YXIgc2VsZiA9IG5ldyBQKHgpO1xuICAgIHNldFByb3RvKHNlbGYsIFAyLnByb3RvdHlwZSk7XG4gICAgcmV0dXJuIHNlbGY7XG4gIH1cbiAgdHJ5IHtcbiAgICB3b3JrcyA9IFAgJiYgUC5yZXNvbHZlICYmIHRlc3RSZXNvbHZlKCk7XG4gICAgc2V0UHJvdG8oUDIsIFApO1xuICAgIFAyLnByb3RvdHlwZSA9ICQuY3JlYXRlKFAucHJvdG90eXBlLCB7Y29uc3RydWN0b3I6IHt2YWx1ZTogUDJ9fSk7XG4gICAgLy8gYWN0dWFsIEZpcmVmb3ggaGFzIGJyb2tlbiBzdWJjbGFzcyBzdXBwb3J0LCB0ZXN0IHRoYXRcbiAgICBpZighKFAyLnJlc29sdmUoNSkudGhlbihmdW5jdGlvbigpe30pIGluc3RhbmNlb2YgUDIpKXtcbiAgICAgIHdvcmtzID0gZmFsc2U7XG4gICAgfVxuICAgIC8vIGFjdHVhbCBWOCBidWcsIGh0dHBzOi8vY29kZS5nb29nbGUuY29tL3AvdjgvaXNzdWVzL2RldGFpbD9pZD00MTYyXG4gICAgaWYod29ya3MgJiYgcmVxdWlyZSgnLi8kLnN1cHBvcnQtZGVzYycpKXtcbiAgICAgIHZhciB0aGVuYWJsZVRoZW5Hb3R0ZW4gPSBmYWxzZTtcbiAgICAgIFAucmVzb2x2ZSgkLnNldERlc2Moe30sICd0aGVuJywge1xuICAgICAgICBnZXQ6IGZ1bmN0aW9uKCl7IHRoZW5hYmxlVGhlbkdvdHRlbiA9IHRydWU7IH1cbiAgICAgIH0pKTtcbiAgICAgIHdvcmtzID0gdGhlbmFibGVUaGVuR290dGVuO1xuICAgIH1cbiAgfSBjYXRjaChlKXsgd29ya3MgPSBmYWxzZTsgfVxuICByZXR1cm4gd29ya3M7XG59KCk7XG5cbi8vIGhlbHBlcnNcbnZhciBpc1Byb21pc2UgPSBmdW5jdGlvbihpdCl7XG4gIHJldHVybiBpc09iamVjdChpdCkgJiYgKHVzZU5hdGl2ZSA/IGNsYXNzb2YoaXQpID09ICdQcm9taXNlJyA6IFJFQ09SRCBpbiBpdCk7XG59O1xudmFyIHNhbWVDb25zdHJ1Y3RvciA9IGZ1bmN0aW9uKGEsIGIpe1xuICAvLyBsaWJyYXJ5IHdyYXBwZXIgc3BlY2lhbCBjYXNlXG4gIGlmKExJQlJBUlkgJiYgYSA9PT0gUCAmJiBiID09PSBXcmFwcGVyKXJldHVybiB0cnVlO1xuICByZXR1cm4gc2FtZShhLCBiKTtcbn07XG52YXIgZ2V0Q29uc3RydWN0b3IgPSBmdW5jdGlvbihDKXtcbiAgdmFyIFMgPSBhbk9iamVjdChDKVtTUEVDSUVTXTtcbiAgcmV0dXJuIFMgIT0gdW5kZWZpbmVkID8gUyA6IEM7XG59O1xudmFyIGlzVGhlbmFibGUgPSBmdW5jdGlvbihpdCl7XG4gIHZhciB0aGVuO1xuICByZXR1cm4gaXNPYmplY3QoaXQpICYmIHR5cGVvZiAodGhlbiA9IGl0LnRoZW4pID09ICdmdW5jdGlvbicgPyB0aGVuIDogZmFsc2U7XG59O1xudmFyIG5vdGlmeSA9IGZ1bmN0aW9uKHJlY29yZCwgaXNSZWplY3Qpe1xuICBpZihyZWNvcmQubilyZXR1cm47XG4gIHJlY29yZC5uID0gdHJ1ZTtcbiAgdmFyIGNoYWluID0gcmVjb3JkLmM7XG4gIGFzYXAoZnVuY3Rpb24oKXtcbiAgICB2YXIgdmFsdWUgPSByZWNvcmQudlxuICAgICAgLCBvayAgICA9IHJlY29yZC5zID09IDFcbiAgICAgICwgaSAgICAgPSAwO1xuICAgIHZhciBydW4gPSBmdW5jdGlvbihyZWFjdCl7XG4gICAgICB2YXIgY2IgPSBvayA/IHJlYWN0Lm9rIDogcmVhY3QuZmFpbFxuICAgICAgICAsIHJldCwgdGhlbjtcbiAgICAgIHRyeSB7XG4gICAgICAgIGlmKGNiKXtcbiAgICAgICAgICBpZighb2spcmVjb3JkLmggPSB0cnVlO1xuICAgICAgICAgIHJldCA9IGNiID09PSB0cnVlID8gdmFsdWUgOiBjYih2YWx1ZSk7XG4gICAgICAgICAgaWYocmV0ID09PSByZWFjdC5QKXtcbiAgICAgICAgICAgIHJlYWN0LnJlaihUeXBlRXJyb3IoJ1Byb21pc2UtY2hhaW4gY3ljbGUnKSk7XG4gICAgICAgICAgfSBlbHNlIGlmKHRoZW4gPSBpc1RoZW5hYmxlKHJldCkpe1xuICAgICAgICAgICAgdGhlbi5jYWxsKHJldCwgcmVhY3QucmVzLCByZWFjdC5yZWopO1xuICAgICAgICAgIH0gZWxzZSByZWFjdC5yZXMocmV0KTtcbiAgICAgICAgfSBlbHNlIHJlYWN0LnJlaih2YWx1ZSk7XG4gICAgICB9IGNhdGNoKGVycil7XG4gICAgICAgIHJlYWN0LnJlaihlcnIpO1xuICAgICAgfVxuICAgIH07XG4gICAgd2hpbGUoY2hhaW4ubGVuZ3RoID4gaSlydW4oY2hhaW5baSsrXSk7IC8vIHZhcmlhYmxlIGxlbmd0aCAtIGNhbid0IHVzZSBmb3JFYWNoXG4gICAgY2hhaW4ubGVuZ3RoID0gMDtcbiAgICByZWNvcmQubiA9IGZhbHNlO1xuICAgIGlmKGlzUmVqZWN0KXNldFRpbWVvdXQoZnVuY3Rpb24oKXtcbiAgICAgIGFzYXAoZnVuY3Rpb24oKXtcbiAgICAgICAgaWYoaXNVbmhhbmRsZWQocmVjb3JkLnApKXtcbiAgICAgICAgICBpZihpc05vZGUpe1xuICAgICAgICAgICAgcHJvY2Vzcy5lbWl0KCd1bmhhbmRsZWRSZWplY3Rpb24nLCB2YWx1ZSwgcmVjb3JkLnApO1xuICAgICAgICAgIH0gZWxzZSBpZihnbG9iYWwuY29uc29sZSAmJiBjb25zb2xlLmVycm9yKXtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ1VuaGFuZGxlZCBwcm9taXNlIHJlamVjdGlvbicsIHZhbHVlKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmVjb3JkLmEgPSB1bmRlZmluZWQ7XG4gICAgICB9KTtcbiAgICB9LCAxKTtcbiAgfSk7XG59O1xudmFyIGlzVW5oYW5kbGVkID0gZnVuY3Rpb24ocHJvbWlzZSl7XG4gIHZhciByZWNvcmQgPSBwcm9taXNlW1JFQ09SRF1cbiAgICAsIGNoYWluICA9IHJlY29yZC5hIHx8IHJlY29yZC5jXG4gICAgLCBpICAgICAgPSAwXG4gICAgLCByZWFjdDtcbiAgaWYocmVjb3JkLmgpcmV0dXJuIGZhbHNlO1xuICB3aGlsZShjaGFpbi5sZW5ndGggPiBpKXtcbiAgICByZWFjdCA9IGNoYWluW2krK107XG4gICAgaWYocmVhY3QuZmFpbCB8fCAhaXNVbmhhbmRsZWQocmVhY3QuUCkpcmV0dXJuIGZhbHNlO1xuICB9IHJldHVybiB0cnVlO1xufTtcbnZhciAkcmVqZWN0ID0gZnVuY3Rpb24odmFsdWUpe1xuICB2YXIgcmVjb3JkID0gdGhpcztcbiAgaWYocmVjb3JkLmQpcmV0dXJuO1xuICByZWNvcmQuZCA9IHRydWU7XG4gIHJlY29yZCA9IHJlY29yZC5yIHx8IHJlY29yZDsgLy8gdW53cmFwXG4gIHJlY29yZC52ID0gdmFsdWU7XG4gIHJlY29yZC5zID0gMjtcbiAgcmVjb3JkLmEgPSByZWNvcmQuYy5zbGljZSgpO1xuICBub3RpZnkocmVjb3JkLCB0cnVlKTtcbn07XG52YXIgJHJlc29sdmUgPSBmdW5jdGlvbih2YWx1ZSl7XG4gIHZhciByZWNvcmQgPSB0aGlzXG4gICAgLCB0aGVuO1xuICBpZihyZWNvcmQuZClyZXR1cm47XG4gIHJlY29yZC5kID0gdHJ1ZTtcbiAgcmVjb3JkID0gcmVjb3JkLnIgfHwgcmVjb3JkOyAvLyB1bndyYXBcbiAgdHJ5IHtcbiAgICBpZih0aGVuID0gaXNUaGVuYWJsZSh2YWx1ZSkpe1xuICAgICAgYXNhcChmdW5jdGlvbigpe1xuICAgICAgICB2YXIgd3JhcHBlciA9IHtyOiByZWNvcmQsIGQ6IGZhbHNlfTsgLy8gd3JhcFxuICAgICAgICB0cnkge1xuICAgICAgICAgIHRoZW4uY2FsbCh2YWx1ZSwgY3R4KCRyZXNvbHZlLCB3cmFwcGVyLCAxKSwgY3R4KCRyZWplY3QsIHdyYXBwZXIsIDEpKTtcbiAgICAgICAgfSBjYXRjaChlKXtcbiAgICAgICAgICAkcmVqZWN0LmNhbGwod3JhcHBlciwgZSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICByZWNvcmQudiA9IHZhbHVlO1xuICAgICAgcmVjb3JkLnMgPSAxO1xuICAgICAgbm90aWZ5KHJlY29yZCwgZmFsc2UpO1xuICAgIH1cbiAgfSBjYXRjaChlKXtcbiAgICAkcmVqZWN0LmNhbGwoe3I6IHJlY29yZCwgZDogZmFsc2V9LCBlKTsgLy8gd3JhcFxuICB9XG59O1xuXG4vLyBjb25zdHJ1Y3RvciBwb2x5ZmlsbFxuaWYoIXVzZU5hdGl2ZSl7XG4gIC8vIDI1LjQuMy4xIFByb21pc2UoZXhlY3V0b3IpXG4gIFAgPSBmdW5jdGlvbiBQcm9taXNlKGV4ZWN1dG9yKXtcbiAgICBhRnVuY3Rpb24oZXhlY3V0b3IpO1xuICAgIHZhciByZWNvcmQgPSB7XG4gICAgICBwOiBzdHJpY3ROZXcodGhpcywgUCwgUFJPTUlTRSksICAgICAgICAgLy8gPC0gcHJvbWlzZVxuICAgICAgYzogW10sICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIDwtIGF3YWl0aW5nIHJlYWN0aW9uc1xuICAgICAgYTogdW5kZWZpbmVkLCAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIDwtIGNoZWNrZWQgaW4gaXNVbmhhbmRsZWQgcmVhY3Rpb25zXG4gICAgICBzOiAwLCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gPC0gc3RhdGVcbiAgICAgIGQ6IGZhbHNlLCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyA8LSBkb25lXG4gICAgICB2OiB1bmRlZmluZWQsICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gPC0gdmFsdWVcbiAgICAgIGg6IGZhbHNlLCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyA8LSBoYW5kbGVkIHJlamVjdGlvblxuICAgICAgbjogZmFsc2UgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIDwtIG5vdGlmeVxuICAgIH07XG4gICAgdGhpc1tSRUNPUkRdID0gcmVjb3JkO1xuICAgIHRyeSB7XG4gICAgICBleGVjdXRvcihjdHgoJHJlc29sdmUsIHJlY29yZCwgMSksIGN0eCgkcmVqZWN0LCByZWNvcmQsIDEpKTtcbiAgICB9IGNhdGNoKGVycil7XG4gICAgICAkcmVqZWN0LmNhbGwocmVjb3JkLCBlcnIpO1xuICAgIH1cbiAgfTtcbiAgcmVxdWlyZSgnLi8kLm1peCcpKFAucHJvdG90eXBlLCB7XG4gICAgLy8gMjUuNC41LjMgUHJvbWlzZS5wcm90b3R5cGUudGhlbihvbkZ1bGZpbGxlZCwgb25SZWplY3RlZClcbiAgICB0aGVuOiBmdW5jdGlvbiB0aGVuKG9uRnVsZmlsbGVkLCBvblJlamVjdGVkKXtcbiAgICAgIHZhciBTID0gYW5PYmplY3QoYW5PYmplY3QodGhpcykuY29uc3RydWN0b3IpW1NQRUNJRVNdO1xuICAgICAgdmFyIHJlYWN0ID0ge1xuICAgICAgICBvazogICB0eXBlb2Ygb25GdWxmaWxsZWQgPT0gJ2Z1bmN0aW9uJyA/IG9uRnVsZmlsbGVkIDogdHJ1ZSxcbiAgICAgICAgZmFpbDogdHlwZW9mIG9uUmVqZWN0ZWQgPT0gJ2Z1bmN0aW9uJyAgPyBvblJlamVjdGVkICA6IGZhbHNlXG4gICAgICB9O1xuICAgICAgdmFyIHByb21pc2UgPSByZWFjdC5QID0gbmV3IChTICE9IHVuZGVmaW5lZCA/IFMgOiBQKShmdW5jdGlvbihyZXMsIHJlail7XG4gICAgICAgIHJlYWN0LnJlcyA9IGFGdW5jdGlvbihyZXMpO1xuICAgICAgICByZWFjdC5yZWogPSBhRnVuY3Rpb24ocmVqKTtcbiAgICAgIH0pO1xuICAgICAgdmFyIHJlY29yZCA9IHRoaXNbUkVDT1JEXTtcbiAgICAgIHJlY29yZC5jLnB1c2gocmVhY3QpO1xuICAgICAgaWYocmVjb3JkLmEpcmVjb3JkLmEucHVzaChyZWFjdCk7XG4gICAgICBpZihyZWNvcmQucylub3RpZnkocmVjb3JkLCBmYWxzZSk7XG4gICAgICByZXR1cm4gcHJvbWlzZTtcbiAgICB9LFxuICAgIC8vIDI1LjQuNS4xIFByb21pc2UucHJvdG90eXBlLmNhdGNoKG9uUmVqZWN0ZWQpXG4gICAgJ2NhdGNoJzogZnVuY3Rpb24ob25SZWplY3RlZCl7XG4gICAgICByZXR1cm4gdGhpcy50aGVuKHVuZGVmaW5lZCwgb25SZWplY3RlZCk7XG4gICAgfVxuICB9KTtcbn1cblxuLy8gZXhwb3J0XG4kZGVmKCRkZWYuRyArICRkZWYuVyArICRkZWYuRiAqICF1c2VOYXRpdmUsIHtQcm9taXNlOiBQfSk7XG5yZXF1aXJlKCcuLyQudGFnJykoUCwgUFJPTUlTRSk7XG5zcGVjaWVzKFApO1xuc3BlY2llcyhXcmFwcGVyID0gcmVxdWlyZSgnLi8kLmNvcmUnKVtQUk9NSVNFXSk7XG5cbi8vIHN0YXRpY3NcbiRkZWYoJGRlZi5TICsgJGRlZi5GICogIXVzZU5hdGl2ZSwgUFJPTUlTRSwge1xuICAvLyAyNS40LjQuNSBQcm9taXNlLnJlamVjdChyKVxuICByZWplY3Q6IGZ1bmN0aW9uIHJlamVjdChyKXtcbiAgICByZXR1cm4gbmV3IHRoaXMoZnVuY3Rpb24ocmVzLCByZWopeyByZWoocik7IH0pO1xuICB9XG59KTtcbiRkZWYoJGRlZi5TICsgJGRlZi5GICogKCF1c2VOYXRpdmUgfHwgdGVzdFJlc29sdmUodHJ1ZSkpLCBQUk9NSVNFLCB7XG4gIC8vIDI1LjQuNC42IFByb21pc2UucmVzb2x2ZSh4KVxuICByZXNvbHZlOiBmdW5jdGlvbiByZXNvbHZlKHgpe1xuICAgIHJldHVybiBpc1Byb21pc2UoeCkgJiYgc2FtZUNvbnN0cnVjdG9yKHguY29uc3RydWN0b3IsIHRoaXMpXG4gICAgICA/IHggOiBuZXcgdGhpcyhmdW5jdGlvbihyZXMpeyByZXMoeCk7IH0pO1xuICB9XG59KTtcbiRkZWYoJGRlZi5TICsgJGRlZi5GICogISh1c2VOYXRpdmUgJiYgcmVxdWlyZSgnLi8kLml0ZXItZGV0ZWN0JykoZnVuY3Rpb24oaXRlcil7XG4gIFAuYWxsKGl0ZXIpWydjYXRjaCddKGZ1bmN0aW9uKCl7fSk7XG59KSksIFBST01JU0UsIHtcbiAgLy8gMjUuNC40LjEgUHJvbWlzZS5hbGwoaXRlcmFibGUpXG4gIGFsbDogZnVuY3Rpb24gYWxsKGl0ZXJhYmxlKXtcbiAgICB2YXIgQyAgICAgID0gZ2V0Q29uc3RydWN0b3IodGhpcylcbiAgICAgICwgdmFsdWVzID0gW107XG4gICAgcmV0dXJuIG5ldyBDKGZ1bmN0aW9uKHJlcywgcmVqKXtcbiAgICAgIGZvck9mKGl0ZXJhYmxlLCBmYWxzZSwgdmFsdWVzLnB1c2gsIHZhbHVlcyk7XG4gICAgICB2YXIgcmVtYWluaW5nID0gdmFsdWVzLmxlbmd0aFxuICAgICAgICAsIHJlc3VsdHMgICA9IEFycmF5KHJlbWFpbmluZyk7XG4gICAgICBpZihyZW1haW5pbmcpJC5lYWNoLmNhbGwodmFsdWVzLCBmdW5jdGlvbihwcm9taXNlLCBpbmRleCl7XG4gICAgICAgIEMucmVzb2x2ZShwcm9taXNlKS50aGVuKGZ1bmN0aW9uKHZhbHVlKXtcbiAgICAgICAgICByZXN1bHRzW2luZGV4XSA9IHZhbHVlO1xuICAgICAgICAgIC0tcmVtYWluaW5nIHx8IHJlcyhyZXN1bHRzKTtcbiAgICAgICAgfSwgcmVqKTtcbiAgICAgIH0pO1xuICAgICAgZWxzZSByZXMocmVzdWx0cyk7XG4gICAgfSk7XG4gIH0sXG4gIC8vIDI1LjQuNC40IFByb21pc2UucmFjZShpdGVyYWJsZSlcbiAgcmFjZTogZnVuY3Rpb24gcmFjZShpdGVyYWJsZSl7XG4gICAgdmFyIEMgPSBnZXRDb25zdHJ1Y3Rvcih0aGlzKTtcbiAgICByZXR1cm4gbmV3IEMoZnVuY3Rpb24ocmVzLCByZWope1xuICAgICAgZm9yT2YoaXRlcmFibGUsIGZhbHNlLCBmdW5jdGlvbihwcm9taXNlKXtcbiAgICAgICAgQy5yZXNvbHZlKHByb21pc2UpLnRoZW4ocmVzLCByZWopO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cbn0pO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi4vfi9iYWJlbC1ydW50aW1lL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM2LnByb21pc2UuanNcbiAqKiBtb2R1bGUgaWQgPSAzNFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiLy8gb3B0aW9uYWwgLyBzaW1wbGUgY29udGV4dCBiaW5kaW5nXG52YXIgYUZ1bmN0aW9uID0gcmVxdWlyZSgnLi8kLmEtZnVuY3Rpb24nKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oZm4sIHRoYXQsIGxlbmd0aCl7XG4gIGFGdW5jdGlvbihmbik7XG4gIGlmKHRoYXQgPT09IHVuZGVmaW5lZClyZXR1cm4gZm47XG4gIHN3aXRjaChsZW5ndGgpe1xuICAgIGNhc2UgMTogcmV0dXJuIGZ1bmN0aW9uKGEpe1xuICAgICAgcmV0dXJuIGZuLmNhbGwodGhhdCwgYSk7XG4gICAgfTtcbiAgICBjYXNlIDI6IHJldHVybiBmdW5jdGlvbihhLCBiKXtcbiAgICAgIHJldHVybiBmbi5jYWxsKHRoYXQsIGEsIGIpO1xuICAgIH07XG4gICAgY2FzZSAzOiByZXR1cm4gZnVuY3Rpb24oYSwgYiwgYyl7XG4gICAgICByZXR1cm4gZm4uY2FsbCh0aGF0LCBhLCBiLCBjKTtcbiAgICB9O1xuICB9IHJldHVybiBmdW5jdGlvbigvKiAuLi5hcmdzICovKXtcbiAgICAgIHJldHVybiBmbi5hcHBseSh0aGF0LCBhcmd1bWVudHMpO1xuICAgIH07XG59O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi4vfi9iYWJlbC1ydW50aW1lL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvJC5jdHguanNcbiAqKiBtb2R1bGUgaWQgPSAzNVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCl7XG4gIGlmKHR5cGVvZiBpdCAhPSAnZnVuY3Rpb24nKXRocm93IFR5cGVFcnJvcihpdCArICcgaXMgbm90IGEgZnVuY3Rpb24hJyk7XG4gIHJldHVybiBpdDtcbn07XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuLi9+L2JhYmVsLXJ1bnRpbWUvfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy8kLmEtZnVuY3Rpb24uanNcbiAqKiBtb2R1bGUgaWQgPSAzNlxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiLy8gZ2V0dGluZyB0YWcgZnJvbSAxOS4xLjMuNiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nKClcbnZhciBjb2YgPSByZXF1aXJlKCcuLyQuY29mJylcbiAgLCBUQUcgPSByZXF1aXJlKCcuLyQud2tzJykoJ3RvU3RyaW5nVGFnJylcbiAgLy8gRVMzIHdyb25nIGhlcmVcbiAgLCBBUkcgPSBjb2YoZnVuY3Rpb24oKXsgcmV0dXJuIGFyZ3VtZW50czsgfSgpKSA9PSAnQXJndW1lbnRzJztcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCl7XG4gIHZhciBPLCBULCBCO1xuICByZXR1cm4gaXQgPT09IHVuZGVmaW5lZCA/ICdVbmRlZmluZWQnIDogaXQgPT09IG51bGwgPyAnTnVsbCdcbiAgICAvLyBAQHRvU3RyaW5nVGFnIGNhc2VcbiAgICA6IHR5cGVvZiAoVCA9IChPID0gT2JqZWN0KGl0KSlbVEFHXSkgPT0gJ3N0cmluZycgPyBUXG4gICAgLy8gYnVpbHRpblRhZyBjYXNlXG4gICAgOiBBUkcgPyBjb2YoTylcbiAgICAvLyBFUzMgYXJndW1lbnRzIGZhbGxiYWNrXG4gICAgOiAoQiA9IGNvZihPKSkgPT0gJ09iamVjdCcgJiYgdHlwZW9mIE8uY2FsbGVlID09ICdmdW5jdGlvbicgPyAnQXJndW1lbnRzJyA6IEI7XG59O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi4vfi9iYWJlbC1ydW50aW1lL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvJC5jbGFzc29mLmpzXG4gKiogbW9kdWxlIGlkID0gMzdcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIi8vIGh0dHA6Ly9qc3BlcmYuY29tL2NvcmUtanMtaXNvYmplY3Rcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXQpe1xuICByZXR1cm4gaXQgIT09IG51bGwgJiYgKHR5cGVvZiBpdCA9PSAnb2JqZWN0JyB8fCB0eXBlb2YgaXQgPT0gJ2Z1bmN0aW9uJyk7XG59O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi4vfi9iYWJlbC1ydW50aW1lL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvJC5pcy1vYmplY3QuanNcbiAqKiBtb2R1bGUgaWQgPSAzOFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwidmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi8kLmlzLW9iamVjdCcpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCl7XG4gIGlmKCFpc09iamVjdChpdCkpdGhyb3cgVHlwZUVycm9yKGl0ICsgJyBpcyBub3QgYW4gb2JqZWN0IScpO1xuICByZXR1cm4gaXQ7XG59O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi4vfi9iYWJlbC1ydW50aW1lL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvJC5hbi1vYmplY3QuanNcbiAqKiBtb2R1bGUgaWQgPSAzOVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCwgQ29uc3RydWN0b3IsIG5hbWUpe1xuICBpZighKGl0IGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKXRocm93IFR5cGVFcnJvcihuYW1lICsgXCI6IHVzZSB0aGUgJ25ldycgb3BlcmF0b3IhXCIpO1xuICByZXR1cm4gaXQ7XG59O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi4vfi9iYWJlbC1ydW50aW1lL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvJC5zdHJpY3QtbmV3LmpzXG4gKiogbW9kdWxlIGlkID0gNDBcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsInZhciBjdHggICAgICAgICA9IHJlcXVpcmUoJy4vJC5jdHgnKVxuICAsIGNhbGwgICAgICAgID0gcmVxdWlyZSgnLi8kLml0ZXItY2FsbCcpXG4gICwgaXNBcnJheUl0ZXIgPSByZXF1aXJlKCcuLyQuaXMtYXJyYXktaXRlcicpXG4gICwgYW5PYmplY3QgICAgPSByZXF1aXJlKCcuLyQuYW4tb2JqZWN0JylcbiAgLCB0b0xlbmd0aCAgICA9IHJlcXVpcmUoJy4vJC50by1sZW5ndGgnKVxuICAsIGdldEl0ZXJGbiAgID0gcmVxdWlyZSgnLi9jb3JlLmdldC1pdGVyYXRvci1tZXRob2QnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXRlcmFibGUsIGVudHJpZXMsIGZuLCB0aGF0KXtcbiAgdmFyIGl0ZXJGbiA9IGdldEl0ZXJGbihpdGVyYWJsZSlcbiAgICAsIGYgICAgICA9IGN0eChmbiwgdGhhdCwgZW50cmllcyA/IDIgOiAxKVxuICAgICwgaW5kZXggID0gMFxuICAgICwgbGVuZ3RoLCBzdGVwLCBpdGVyYXRvcjtcbiAgaWYodHlwZW9mIGl0ZXJGbiAhPSAnZnVuY3Rpb24nKXRocm93IFR5cGVFcnJvcihpdGVyYWJsZSArICcgaXMgbm90IGl0ZXJhYmxlIScpO1xuICAvLyBmYXN0IGNhc2UgZm9yIGFycmF5cyB3aXRoIGRlZmF1bHQgaXRlcmF0b3JcbiAgaWYoaXNBcnJheUl0ZXIoaXRlckZuKSlmb3IobGVuZ3RoID0gdG9MZW5ndGgoaXRlcmFibGUubGVuZ3RoKTsgbGVuZ3RoID4gaW5kZXg7IGluZGV4Kyspe1xuICAgIGVudHJpZXMgPyBmKGFuT2JqZWN0KHN0ZXAgPSBpdGVyYWJsZVtpbmRleF0pWzBdLCBzdGVwWzFdKSA6IGYoaXRlcmFibGVbaW5kZXhdKTtcbiAgfSBlbHNlIGZvcihpdGVyYXRvciA9IGl0ZXJGbi5jYWxsKGl0ZXJhYmxlKTsgIShzdGVwID0gaXRlcmF0b3IubmV4dCgpKS5kb25lOyApe1xuICAgIGNhbGwoaXRlcmF0b3IsIGYsIHN0ZXAudmFsdWUsIGVudHJpZXMpO1xuICB9XG59O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi4vfi9iYWJlbC1ydW50aW1lL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvJC5mb3Itb2YuanNcbiAqKiBtb2R1bGUgaWQgPSA0MVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiLy8gY2FsbCBzb21ldGhpbmcgb24gaXRlcmF0b3Igc3RlcCB3aXRoIHNhZmUgY2xvc2luZyBvbiBlcnJvclxudmFyIGFuT2JqZWN0ID0gcmVxdWlyZSgnLi8kLmFuLW9iamVjdCcpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdGVyYXRvciwgZm4sIHZhbHVlLCBlbnRyaWVzKXtcbiAgdHJ5IHtcbiAgICByZXR1cm4gZW50cmllcyA/IGZuKGFuT2JqZWN0KHZhbHVlKVswXSwgdmFsdWVbMV0pIDogZm4odmFsdWUpO1xuICAvLyA3LjQuNiBJdGVyYXRvckNsb3NlKGl0ZXJhdG9yLCBjb21wbGV0aW9uKVxuICB9IGNhdGNoKGUpe1xuICAgIHZhciByZXQgPSBpdGVyYXRvclsncmV0dXJuJ107XG4gICAgaWYocmV0ICE9PSB1bmRlZmluZWQpYW5PYmplY3QocmV0LmNhbGwoaXRlcmF0b3IpKTtcbiAgICB0aHJvdyBlO1xuICB9XG59O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi4vfi9iYWJlbC1ydW50aW1lL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvJC5pdGVyLWNhbGwuanNcbiAqKiBtb2R1bGUgaWQgPSA0MlxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiLy8gY2hlY2sgb24gZGVmYXVsdCBBcnJheSBpdGVyYXRvclxudmFyIEl0ZXJhdG9ycyA9IHJlcXVpcmUoJy4vJC5pdGVyYXRvcnMnKVxuICAsIElURVJBVE9SICA9IHJlcXVpcmUoJy4vJC53a3MnKSgnaXRlcmF0b3InKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXQpe1xuICByZXR1cm4gKEl0ZXJhdG9ycy5BcnJheSB8fCBBcnJheS5wcm90b3R5cGVbSVRFUkFUT1JdKSA9PT0gaXQ7XG59O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi4vfi9iYWJlbC1ydW50aW1lL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvJC5pcy1hcnJheS1pdGVyLmpzXG4gKiogbW9kdWxlIGlkID0gNDNcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIi8vIDcuMS4xNSBUb0xlbmd0aFxudmFyIHRvSW50ZWdlciA9IHJlcXVpcmUoJy4vJC50by1pbnRlZ2VyJylcbiAgLCBtaW4gICAgICAgPSBNYXRoLm1pbjtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXQpe1xuICByZXR1cm4gaXQgPiAwID8gbWluKHRvSW50ZWdlcihpdCksIDB4MWZmZmZmZmZmZmZmZmYpIDogMDsgLy8gcG93KDIsIDUzKSAtIDEgPT0gOTAwNzE5OTI1NDc0MDk5MVxufTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4uL34vYmFiZWwtcnVudGltZS9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzLyQudG8tbGVuZ3RoLmpzXG4gKiogbW9kdWxlIGlkID0gNDRcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsInZhciBjbGFzc29mICAgPSByZXF1aXJlKCcuLyQuY2xhc3NvZicpXG4gICwgSVRFUkFUT1IgID0gcmVxdWlyZSgnLi8kLndrcycpKCdpdGVyYXRvcicpXG4gICwgSXRlcmF0b3JzID0gcmVxdWlyZSgnLi8kLml0ZXJhdG9ycycpO1xubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuLyQuY29yZScpLmdldEl0ZXJhdG9yTWV0aG9kID0gZnVuY3Rpb24oaXQpe1xuICBpZihpdCAhPSB1bmRlZmluZWQpcmV0dXJuIGl0W0lURVJBVE9SXSB8fCBpdFsnQEBpdGVyYXRvciddIHx8IEl0ZXJhdG9yc1tjbGFzc29mKGl0KV07XG59O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi4vfi9iYWJlbC1ydW50aW1lL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvY29yZS5nZXQtaXRlcmF0b3ItbWV0aG9kLmpzXG4gKiogbW9kdWxlIGlkID0gNDVcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIi8vIFdvcmtzIHdpdGggX19wcm90b19fIG9ubHkuIE9sZCB2OCBjYW4ndCB3b3JrIHdpdGggbnVsbCBwcm90byBvYmplY3RzLlxuLyogZXNsaW50LWRpc2FibGUgbm8tcHJvdG8gKi9cbnZhciBnZXREZXNjICA9IHJlcXVpcmUoJy4vJCcpLmdldERlc2NcbiAgLCBpc09iamVjdCA9IHJlcXVpcmUoJy4vJC5pcy1vYmplY3QnKVxuICAsIGFuT2JqZWN0ID0gcmVxdWlyZSgnLi8kLmFuLW9iamVjdCcpO1xudmFyIGNoZWNrID0gZnVuY3Rpb24oTywgcHJvdG8pe1xuICBhbk9iamVjdChPKTtcbiAgaWYoIWlzT2JqZWN0KHByb3RvKSAmJiBwcm90byAhPT0gbnVsbCl0aHJvdyBUeXBlRXJyb3IocHJvdG8gKyBcIjogY2FuJ3Qgc2V0IGFzIHByb3RvdHlwZSFcIik7XG59O1xubW9kdWxlLmV4cG9ydHMgPSB7XG4gIHNldDogT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8ICgnX19wcm90b19fJyBpbiB7fSAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG4gICAgPyBmdW5jdGlvbihidWdneSwgc2V0KXtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBzZXQgPSByZXF1aXJlKCcuLyQuY3R4JykoRnVuY3Rpb24uY2FsbCwgZ2V0RGVzYyhPYmplY3QucHJvdG90eXBlLCAnX19wcm90b19fJykuc2V0LCAyKTtcbiAgICAgICAgICBzZXQoe30sIFtdKTtcbiAgICAgICAgfSBjYXRjaChlKXsgYnVnZ3kgPSB0cnVlOyB9XG4gICAgICAgIHJldHVybiBmdW5jdGlvbiBzZXRQcm90b3R5cGVPZihPLCBwcm90byl7XG4gICAgICAgICAgY2hlY2soTywgcHJvdG8pO1xuICAgICAgICAgIGlmKGJ1Z2d5KU8uX19wcm90b19fID0gcHJvdG87XG4gICAgICAgICAgZWxzZSBzZXQoTywgcHJvdG8pO1xuICAgICAgICAgIHJldHVybiBPO1xuICAgICAgICB9O1xuICAgICAgfSgpXG4gICAgOiB1bmRlZmluZWQpLFxuICBjaGVjazogY2hlY2tcbn07XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuLi9+L2JhYmVsLXJ1bnRpbWUvfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy8kLnNldC1wcm90by5qc1xuICoqIG1vZHVsZSBpZCA9IDQ2XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IE9iamVjdC5pcyB8fCBmdW5jdGlvbiBpcyh4LCB5KXtcbiAgcmV0dXJuIHggPT09IHkgPyB4ICE9PSAwIHx8IDEgLyB4ID09PSAxIC8geSA6IHggIT0geCAmJiB5ICE9IHk7XG59O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi4vfi9iYWJlbC1ydW50aW1lL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvJC5zYW1lLmpzXG4gKiogbW9kdWxlIGlkID0gNDdcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIid1c2Ugc3RyaWN0JztcbnZhciAkICAgICAgID0gcmVxdWlyZSgnLi8kJylcbiAgLCBTUEVDSUVTID0gcmVxdWlyZSgnLi8kLndrcycpKCdzcGVjaWVzJyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKEMpe1xuICBpZihyZXF1aXJlKCcuLyQuc3VwcG9ydC1kZXNjJykgJiYgIShTUEVDSUVTIGluIEMpKSQuc2V0RGVzYyhDLCBTUEVDSUVTLCB7XG4gICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgIGdldDogZnVuY3Rpb24oKXsgcmV0dXJuIHRoaXM7IH1cbiAgfSk7XG59O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi4vfi9iYWJlbC1ydW50aW1lL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvJC5zcGVjaWVzLmpzXG4gKiogbW9kdWxlIGlkID0gNDhcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsInZhciBnbG9iYWwgICAgPSByZXF1aXJlKCcuLyQuZ2xvYmFsJylcclxuICAsIG1hY3JvdGFzayA9IHJlcXVpcmUoJy4vJC50YXNrJykuc2V0XHJcbiAgLCBPYnNlcnZlciAgPSBnbG9iYWwuTXV0YXRpb25PYnNlcnZlciB8fCBnbG9iYWwuV2ViS2l0TXV0YXRpb25PYnNlcnZlclxyXG4gICwgcHJvY2VzcyAgID0gZ2xvYmFsLnByb2Nlc3NcclxuICAsIGhlYWQsIGxhc3QsIG5vdGlmeTtcclxuXHJcbmZ1bmN0aW9uIGZsdXNoKCl7XHJcbiAgd2hpbGUoaGVhZCl7XHJcbiAgICBoZWFkLmZuLmNhbGwoKTsgLy8gPC0gY3VycmVudGx5IHdlIHVzZSBpdCBvbmx5IGZvciBQcm9taXNlIC0gdHJ5IC8gY2F0Y2ggbm90IHJlcXVpcmVkXHJcbiAgICBoZWFkID0gaGVhZC5uZXh0O1xyXG4gIH0gbGFzdCA9IHVuZGVmaW5lZDtcclxufVxyXG5cclxuLy8gTm9kZS5qc1xyXG5pZihyZXF1aXJlKCcuLyQuY29mJykocHJvY2VzcykgPT0gJ3Byb2Nlc3MnKXtcclxuICBub3RpZnkgPSBmdW5jdGlvbigpe1xyXG4gICAgcHJvY2Vzcy5uZXh0VGljayhmbHVzaCk7XHJcbiAgfTtcclxuLy8gYnJvd3NlcnMgd2l0aCBNdXRhdGlvbk9ic2VydmVyXHJcbn0gZWxzZSBpZihPYnNlcnZlcil7XHJcbiAgdmFyIHRvZ2dsZSA9IDFcclxuICAgICwgbm9kZSAgID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoJycpO1xyXG4gIG5ldyBPYnNlcnZlcihmbHVzaCkub2JzZXJ2ZShub2RlLCB7Y2hhcmFjdGVyRGF0YTogdHJ1ZX0pOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLW5ld1xyXG4gIG5vdGlmeSA9IGZ1bmN0aW9uKCl7XHJcbiAgICBub2RlLmRhdGEgPSB0b2dnbGUgPSAtdG9nZ2xlO1xyXG4gIH07XHJcbi8vIGZvciBvdGhlciBlbnZpcm9ubWVudHMgLSBtYWNyb3Rhc2sgYmFzZWQgb246XHJcbi8vIC0gc2V0SW1tZWRpYXRlXHJcbi8vIC0gTWVzc2FnZUNoYW5uZWxcclxuLy8gLSB3aW5kb3cucG9zdE1lc3NhZ1xyXG4vLyAtIG9ucmVhZHlzdGF0ZWNoYW5nZVxyXG4vLyAtIHNldFRpbWVvdXRcclxufSBlbHNlIHtcclxuICBub3RpZnkgPSBmdW5jdGlvbigpe1xyXG4gICAgLy8gc3RyYW5nZSBJRSArIHdlYnBhY2sgZGV2IHNlcnZlciBidWcgLSB1c2UgLmNhbGwoZ2xvYmFsKVxyXG4gICAgbWFjcm90YXNrLmNhbGwoZ2xvYmFsLCBmbHVzaCk7XHJcbiAgfTtcclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBhc2FwKGZuKXtcclxuICB2YXIgdGFzayA9IHtmbjogZm4sIG5leHQ6IHVuZGVmaW5lZH07XHJcbiAgaWYobGFzdClsYXN0Lm5leHQgPSB0YXNrO1xyXG4gIGlmKCFoZWFkKXtcclxuICAgIGhlYWQgPSB0YXNrO1xyXG4gICAgbm90aWZ5KCk7XHJcbiAgfSBsYXN0ID0gdGFzaztcclxufTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4uL34vYmFiZWwtcnVudGltZS9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzLyQubWljcm90YXNrLmpzXG4gKiogbW9kdWxlIGlkID0gNDlcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIid1c2Ugc3RyaWN0JztcbnZhciBjdHggICAgICAgICAgICAgICAgPSByZXF1aXJlKCcuLyQuY3R4JylcbiAgLCBpbnZva2UgICAgICAgICAgICAgPSByZXF1aXJlKCcuLyQuaW52b2tlJylcbiAgLCBodG1sICAgICAgICAgICAgICAgPSByZXF1aXJlKCcuLyQuaHRtbCcpXG4gICwgY2VsICAgICAgICAgICAgICAgID0gcmVxdWlyZSgnLi8kLmRvbS1jcmVhdGUnKVxuICAsIGdsb2JhbCAgICAgICAgICAgICA9IHJlcXVpcmUoJy4vJC5nbG9iYWwnKVxuICAsIHByb2Nlc3MgICAgICAgICAgICA9IGdsb2JhbC5wcm9jZXNzXG4gICwgc2V0VGFzayAgICAgICAgICAgID0gZ2xvYmFsLnNldEltbWVkaWF0ZVxuICAsIGNsZWFyVGFzayAgICAgICAgICA9IGdsb2JhbC5jbGVhckltbWVkaWF0ZVxuICAsIE1lc3NhZ2VDaGFubmVsICAgICA9IGdsb2JhbC5NZXNzYWdlQ2hhbm5lbFxuICAsIGNvdW50ZXIgICAgICAgICAgICA9IDBcbiAgLCBxdWV1ZSAgICAgICAgICAgICAgPSB7fVxuICAsIE9OUkVBRFlTVEFURUNIQU5HRSA9ICdvbnJlYWR5c3RhdGVjaGFuZ2UnXG4gICwgZGVmZXIsIGNoYW5uZWwsIHBvcnQ7XG52YXIgcnVuID0gZnVuY3Rpb24oKXtcbiAgdmFyIGlkID0gK3RoaXM7XG4gIGlmKHF1ZXVlLmhhc093blByb3BlcnR5KGlkKSl7XG4gICAgdmFyIGZuID0gcXVldWVbaWRdO1xuICAgIGRlbGV0ZSBxdWV1ZVtpZF07XG4gICAgZm4oKTtcbiAgfVxufTtcbnZhciBsaXN0bmVyID0gZnVuY3Rpb24oZXZlbnQpe1xuICBydW4uY2FsbChldmVudC5kYXRhKTtcbn07XG4vLyBOb2RlLmpzIDAuOSsgJiBJRTEwKyBoYXMgc2V0SW1tZWRpYXRlLCBvdGhlcndpc2U6XG5pZighc2V0VGFzayB8fCAhY2xlYXJUYXNrKXtcbiAgc2V0VGFzayA9IGZ1bmN0aW9uIHNldEltbWVkaWF0ZShmbil7XG4gICAgdmFyIGFyZ3MgPSBbXSwgaSA9IDE7XG4gICAgd2hpbGUoYXJndW1lbnRzLmxlbmd0aCA+IGkpYXJncy5wdXNoKGFyZ3VtZW50c1tpKytdKTtcbiAgICBxdWV1ZVsrK2NvdW50ZXJdID0gZnVuY3Rpb24oKXtcbiAgICAgIGludm9rZSh0eXBlb2YgZm4gPT0gJ2Z1bmN0aW9uJyA/IGZuIDogRnVuY3Rpb24oZm4pLCBhcmdzKTtcbiAgICB9O1xuICAgIGRlZmVyKGNvdW50ZXIpO1xuICAgIHJldHVybiBjb3VudGVyO1xuICB9O1xuICBjbGVhclRhc2sgPSBmdW5jdGlvbiBjbGVhckltbWVkaWF0ZShpZCl7XG4gICAgZGVsZXRlIHF1ZXVlW2lkXTtcbiAgfTtcbiAgLy8gTm9kZS5qcyAwLjgtXG4gIGlmKHJlcXVpcmUoJy4vJC5jb2YnKShwcm9jZXNzKSA9PSAncHJvY2Vzcycpe1xuICAgIGRlZmVyID0gZnVuY3Rpb24oaWQpe1xuICAgICAgcHJvY2Vzcy5uZXh0VGljayhjdHgocnVuLCBpZCwgMSkpO1xuICAgIH07XG4gIC8vIEJyb3dzZXJzIHdpdGggTWVzc2FnZUNoYW5uZWwsIGluY2x1ZGVzIFdlYldvcmtlcnNcbiAgfSBlbHNlIGlmKE1lc3NhZ2VDaGFubmVsKXtcbiAgICBjaGFubmVsID0gbmV3IE1lc3NhZ2VDaGFubmVsO1xuICAgIHBvcnQgICAgPSBjaGFubmVsLnBvcnQyO1xuICAgIGNoYW5uZWwucG9ydDEub25tZXNzYWdlID0gbGlzdG5lcjtcbiAgICBkZWZlciA9IGN0eChwb3J0LnBvc3RNZXNzYWdlLCBwb3J0LCAxKTtcbiAgLy8gQnJvd3NlcnMgd2l0aCBwb3N0TWVzc2FnZSwgc2tpcCBXZWJXb3JrZXJzXG4gIC8vIElFOCBoYXMgcG9zdE1lc3NhZ2UsIGJ1dCBpdCdzIHN5bmMgJiB0eXBlb2YgaXRzIHBvc3RNZXNzYWdlIGlzICdvYmplY3QnXG4gIH0gZWxzZSBpZihnbG9iYWwuYWRkRXZlbnRMaXN0ZW5lciAmJiB0eXBlb2YgcG9zdE1lc3NhZ2UgPT0gJ2Z1bmN0aW9uJyAmJiAhZ2xvYmFsLmltcG9ydFNjcmlwdCl7XG4gICAgZGVmZXIgPSBmdW5jdGlvbihpZCl7XG4gICAgICBnbG9iYWwucG9zdE1lc3NhZ2UoaWQgKyAnJywgJyonKTtcbiAgICB9O1xuICAgIGdsb2JhbC5hZGRFdmVudExpc3RlbmVyKCdtZXNzYWdlJywgbGlzdG5lciwgZmFsc2UpO1xuICAvLyBJRTgtXG4gIH0gZWxzZSBpZihPTlJFQURZU1RBVEVDSEFOR0UgaW4gY2VsKCdzY3JpcHQnKSl7XG4gICAgZGVmZXIgPSBmdW5jdGlvbihpZCl7XG4gICAgICBodG1sLmFwcGVuZENoaWxkKGNlbCgnc2NyaXB0JykpW09OUkVBRFlTVEFURUNIQU5HRV0gPSBmdW5jdGlvbigpe1xuICAgICAgICBodG1sLnJlbW92ZUNoaWxkKHRoaXMpO1xuICAgICAgICBydW4uY2FsbChpZCk7XG4gICAgICB9O1xuICAgIH07XG4gIC8vIFJlc3Qgb2xkIGJyb3dzZXJzXG4gIH0gZWxzZSB7XG4gICAgZGVmZXIgPSBmdW5jdGlvbihpZCl7XG4gICAgICBzZXRUaW1lb3V0KGN0eChydW4sIGlkLCAxKSwgMCk7XG4gICAgfTtcbiAgfVxufVxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIHNldDogICBzZXRUYXNrLFxuICBjbGVhcjogY2xlYXJUYXNrXG59O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi4vfi9iYWJlbC1ydW50aW1lL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvJC50YXNrLmpzXG4gKiogbW9kdWxlIGlkID0gNTBcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIi8vIGZhc3QgYXBwbHksIGh0dHA6Ly9qc3BlcmYubG5raXQuY29tL2Zhc3QtYXBwbHkvNVxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihmbiwgYXJncywgdGhhdCl7XG4gIHZhciB1biA9IHRoYXQgPT09IHVuZGVmaW5lZDtcbiAgc3dpdGNoKGFyZ3MubGVuZ3RoKXtcbiAgICBjYXNlIDA6IHJldHVybiB1biA/IGZuKClcbiAgICAgICAgICAgICAgICAgICAgICA6IGZuLmNhbGwodGhhdCk7XG4gICAgY2FzZSAxOiByZXR1cm4gdW4gPyBmbihhcmdzWzBdKVxuICAgICAgICAgICAgICAgICAgICAgIDogZm4uY2FsbCh0aGF0LCBhcmdzWzBdKTtcbiAgICBjYXNlIDI6IHJldHVybiB1biA/IGZuKGFyZ3NbMF0sIGFyZ3NbMV0pXG4gICAgICAgICAgICAgICAgICAgICAgOiBmbi5jYWxsKHRoYXQsIGFyZ3NbMF0sIGFyZ3NbMV0pO1xuICAgIGNhc2UgMzogcmV0dXJuIHVuID8gZm4oYXJnc1swXSwgYXJnc1sxXSwgYXJnc1syXSlcbiAgICAgICAgICAgICAgICAgICAgICA6IGZuLmNhbGwodGhhdCwgYXJnc1swXSwgYXJnc1sxXSwgYXJnc1syXSk7XG4gICAgY2FzZSA0OiByZXR1cm4gdW4gPyBmbihhcmdzWzBdLCBhcmdzWzFdLCBhcmdzWzJdLCBhcmdzWzNdKVxuICAgICAgICAgICAgICAgICAgICAgIDogZm4uY2FsbCh0aGF0LCBhcmdzWzBdLCBhcmdzWzFdLCBhcmdzWzJdLCBhcmdzWzNdKTtcbiAgfSByZXR1cm4gICAgICAgICAgICAgIGZuLmFwcGx5KHRoYXQsIGFyZ3MpO1xufTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4uL34vYmFiZWwtcnVudGltZS9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzLyQuaW52b2tlLmpzXG4gKiogbW9kdWxlIGlkID0gNTFcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi8kLmdsb2JhbCcpLmRvY3VtZW50ICYmIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudDtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4uL34vYmFiZWwtcnVudGltZS9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzLyQuaHRtbC5qc1xuICoqIG1vZHVsZSBpZCA9IDUyXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJ2YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuLyQuaXMtb2JqZWN0JylcbiAgLCBkb2N1bWVudCA9IHJlcXVpcmUoJy4vJC5nbG9iYWwnKS5kb2N1bWVudFxuICAvLyBpbiBvbGQgSUUgdHlwZW9mIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQgaXMgJ29iamVjdCdcbiAgLCBpcyA9IGlzT2JqZWN0KGRvY3VtZW50KSAmJiBpc09iamVjdChkb2N1bWVudC5jcmVhdGVFbGVtZW50KTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXQpe1xuICByZXR1cm4gaXMgPyBkb2N1bWVudC5jcmVhdGVFbGVtZW50KGl0KSA6IHt9O1xufTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4uL34vYmFiZWwtcnVudGltZS9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzLyQuZG9tLWNyZWF0ZS5qc1xuICoqIG1vZHVsZSBpZCA9IDUzXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJ2YXIgJHJlZGVmID0gcmVxdWlyZSgnLi8kLnJlZGVmJyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKHRhcmdldCwgc3JjKXtcbiAgZm9yKHZhciBrZXkgaW4gc3JjKSRyZWRlZih0YXJnZXQsIGtleSwgc3JjW2tleV0pO1xuICByZXR1cm4gdGFyZ2V0O1xufTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4uL34vYmFiZWwtcnVudGltZS9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzLyQubWl4LmpzXG4gKiogbW9kdWxlIGlkID0gNTRcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsInZhciBTWU1CT0xfSVRFUkFUT1IgPSByZXF1aXJlKCcuLyQud2tzJykoJ2l0ZXJhdG9yJylcbiAgLCBTQUZFX0NMT1NJTkcgICAgPSBmYWxzZTtcbnRyeSB7XG4gIHZhciByaXRlciA9IFs3XVtTWU1CT0xfSVRFUkFUT1JdKCk7XG4gIHJpdGVyWydyZXR1cm4nXSA9IGZ1bmN0aW9uKCl7IFNBRkVfQ0xPU0lORyA9IHRydWU7IH07XG4gIEFycmF5LmZyb20ocml0ZXIsIGZ1bmN0aW9uKCl7IHRocm93IDI7IH0pO1xufSBjYXRjaChlKXsgLyogZW1wdHkgKi8gfVxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihleGVjKXtcbiAgaWYoIVNBRkVfQ0xPU0lORylyZXR1cm4gZmFsc2U7XG4gIHZhciBzYWZlID0gZmFsc2U7XG4gIHRyeSB7XG4gICAgdmFyIGFyciAgPSBbN11cbiAgICAgICwgaXRlciA9IGFycltTWU1CT0xfSVRFUkFUT1JdKCk7XG4gICAgaXRlci5uZXh0ID0gZnVuY3Rpb24oKXsgc2FmZSA9IHRydWU7IH07XG4gICAgYXJyW1NZTUJPTF9JVEVSQVRPUl0gPSBmdW5jdGlvbigpeyByZXR1cm4gaXRlcjsgfTtcbiAgICBleGVjKGFycik7XG4gIH0gY2F0Y2goZSl7IC8qIGVtcHR5ICovIH1cbiAgcmV0dXJuIHNhZmU7XG59O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi4vfi9iYWJlbC1ydW50aW1lL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvJC5pdGVyLWRldGVjdC5qc1xuICoqIG1vZHVsZSBpZCA9IDU1XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJcInVzZSBzdHJpY3RcIjtcblxuZXhwb3J0c1tcImRlZmF1bHRcIl0gPSBmdW5jdGlvbiAob2JqKSB7XG4gIHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7XG4gICAgXCJkZWZhdWx0XCI6IG9ialxuICB9O1xufTtcblxuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4uL34vYmFiZWwtcnVudGltZS9oZWxwZXJzL2ludGVyb3AtcmVxdWlyZS1kZWZhdWx0LmpzXG4gKiogbW9kdWxlIGlkID0gNTZcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IEludGVyZmFjZSBmcm9tICdkZW1vL3BsYXlsYW5nLmludGVyZmFjZS5qcyc7XG5pbXBvcnQgUnVudGltZSBmcm9tICdkZW1vL3BsYXlsYW5nLnJ1bnRpbWUuanMnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBQbGF5bGFuZygpIHtcbiAgdGhpcy5fcnVudGltZSA9IG5ldyBSdW50aW1lKCk7XG4gIHRoaXMuX2ludGVyZmFjZSA9IG5ldyBJbnRlcmZhY2UodGhpcy5fcnVudGltZSk7XG4gIHJldHVybiB0aGlzLl9pbnRlcmZhY2U7XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3BsYXlsYW5nLmpzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgUnVuZSBmcm9tICdkaXN0L3J1bmUuanMnO1xuXG4vKipcbiAqIEEgZGVtbyBlRFNMIHdpdGggbW9zdCBmZWF0dXJlcyBhIGZ1bGwgbGFuZ3VhZ2Ugc2hvdWxkIGJlIHdpdGguXG4gKiBUaGlzIGZpbGUgY29udGFpbnMgb25seSBpbnRlcmZhY2VuLCB3aGljaCBtZWFucyBpdCBuZWVkIHRvIGJlIGluc3RhbnRpYXRlZFxuICogd2l0aCBhIHJ1bnRpbWUgdG8gZXhlY3V0ZSB0aGUgbGFuZ3VhZ2UuXG4gKlxuICogTm90ZTogc2luY2UgdG8gaGFuZGxlIGFzeW5jIGZ1bmN0aW9uIHByb3Blcmx5IG5lZWQgZXh0cmEgZWZmb3J0cyxcbiAqIHNvIHRoaXMgZGVtbyBsYW5ndWFnZSBkb2Vzbid0IGZ1bGx5IGhhbmRsZSB0aGVtIHlldC4gQWx0aG91Z2ggdGhpcyBlRFNMXG4gKiBpbmRlZWQgcHV0IGFsbCBzdGVwcyBpbiBhIFByb21pc2UgdG8gYmUgdGhlIGZpcnN0IHN0ZXAgdG93YXJkIHRoYXQuXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIEludGVyZmFjZShydW50aW1lKSB7XG4gIHRoaXMuY29udGV4dCA9IHtcbiAgICBzdGFydGVkOiBmYWxzZSxcbiAgICBzdG9wcGVkOiBmYWxzZSxcbiAgICBsb29waW5nOiBmYWxzZSxcbiAgICBtYXRjaGluZzogZmFsc2VcbiAgfTtcbiAgdGhpcy5zdGFjayA9IFtdO1xuICB0aGlzLl9ydW50aW1lID0gcnVudGltZTtcbiAgdGhpcy5fZXZhbHVhdG9yID0gKG5ldyBSdW5lLkV2YWx1YXRlKCkpXG4gICAgLmFuYWx5emVyKHRoaXMuX2FuYWx5emVPcmRlci5iaW5kKHRoaXMpKVxuICAgIC5pbnRlcnByZXRlcih0aGlzLl9pbnRlcnByZXQuYmluZCh0aGlzKSk7XG59XG5cbkludGVyZmFjZS5wcm90b3R5cGUuc3RhcnQgPSBSdW5lLmRlZmluZSgnc3RhcnQnLCAnYmVnaW4nKTtcbkludGVyZmFjZS5wcm90b3R5cGUuZG9uZSA9IFJ1bmUuZGVmaW5lKCdkb25lJywgJ2V4aXQnKTtcbkludGVyZmFjZS5wcm90b3R5cGUuZWZmZWN0ID0gUnVuZS5kZWZpbmUoJ2VmZmVjdCcsICdleGl0Jyk7XG5JbnRlcmZhY2UucHJvdG90eXBlLm5leHQgPSBSdW5lLmRlZmluZSgnbmV4dCcsICdwdXNoJyk7XG5JbnRlcmZhY2UucHJvdG90eXBlLm1hdGNoID0gUnVuZS5kZWZpbmUoJ21hdGNoJywgJ2JlZ2luJyk7XG5JbnRlcmZhY2UucHJvdG90eXBlLmVuZCA9IFJ1bmUuZGVmaW5lKCdlbmQnLCAnZW5kJyk7XG5JbnRlcmZhY2UucHJvdG90eXBlLmNhc2UgPSBSdW5lLmRlZmluZSgnY2FzZScsICdwdXNoJyk7XG5JbnRlcmZhY2UucHJvdG90eXBlLnRvID0gUnVuZS5kZWZpbmUoJ3RvJywgJ3B1c2gnKTtcbkludGVyZmFjZS5wcm90b3R5cGUuYXMgPSBSdW5lLmRlZmluZSgnYXMnLCAncHVzaCcpO1xuSW50ZXJmYWNlLnByb3RvdHlwZS5sb29wID0gUnVuZS5kZWZpbmUoJ2xvb3AnLCAnYmVnaW4nKTtcbkludGVyZmFjZS5wcm90b3R5cGUudW50aWwgPSBSdW5lLmRlZmluZSgndW50aWwnLCAnZW5kJyk7XG5JbnRlcmZhY2UucHJvdG90eXBlLmFueSA9IFJ1bmUuZGVmaW5lKCdhbnknLCAncHVzaCcpO1xuSW50ZXJmYWNlLnByb3RvdHlwZS5hbGwgPSBSdW5lLmRlZmluZSgnYWxsJywgJ3B1c2gnKTtcblxuSW50ZXJmYWNlLnByb3RvdHlwZS5vbmNoYW5nZSA9IGZ1bmN0aW9uKGNvbnRleHQsIG5vZGUsIHN0YWNrKSB7XG4gIC8vIFdoZW4gaXQncyBjaGFuZ2VkLCBldmFsdWF0ZSBpdCB3aXRoIGFuYWx5emVycyAmIGludGVycHJldGVyLlxuICByZXR1cm4gdGhpcy5fZXZhbHVhdG9yKGNvbnRleHQsIG5vZGUsIHN0YWNrKTtcbn07XG5cbkludGVyZmFjZS5wcm90b3R5cGUuX2ludGVycHJldCA9IGZ1bmN0aW9uKGNvbnRleHQsIG5vZGUsIHN0YWNrKSB7XG4gIC8vIFdlbGwgaW4gdGhpcyBlRFNMIHdlIGRlbGVnYXRlIHRoZSBpbnRlcnByZXRpb24gdG8gdGhlIHJ1bnRpbWUuXG4gIC8vIFdlIGRvbid0IHBhc3MgY29udGV4dCB0byBydW50aW1lIHNpbmNlIHRoZSBydW50aW1lIHdpbGwga2VlcFxuICAvLyB0aGUgZXNzZW50aWFsIHN0YXRlcyBieSBpdHMgb3duLlxuICByZXR1cm4gdGhpcy5fcnVudGltZS5vbmNoYW5nZS5hcHBseSh0aGlzLl9ydW50aW1lLCBhcmd1bWVudHMpO1xufTtcblxuLy8gSW4gdGhpcyBlRFNMIHdlIG5vdyBvbmx5IGhhdmUgdGhpcyBhbmFseXplci4gQ291bGQgYWRkIG1vcmUgYW5kIHJlZ2lzdGVyIGl0XG4vLyBpbiB0aGUgY29udHJ1Y3Rpb24gb2YgJ3RoaXMuX2V2YWx1YXRvcicuXG5JbnRlcmZhY2UucHJvdG90eXBlLl9hbmFseXplT3JkZXIgPSBmdW5jdGlvbihjb250ZXh0LCBjaGFuZ2UsIHN0YWNrKSB7XG4gIGlmICgnc3RhcnQnID09PSBjaGFuZ2UudHlwZSkge1xuICAgIGNvbnRleHQuc3RhcnRlZCA9IHRydWU7XG4gIH0gZWxzZSBpZiAoJ3N0b3AnKSB7XG4gICAgY29udGV4dC5zdG9wcGVkID0gdHJ1ZTtcbiAgfVxuICBpZiAoJ3N0YXJ0JyA9PT0gY2hhbmdlLnR5cGUgJiYgY29udGV4dC5zdG9wcGVkKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdTaG91bGQgbm90IHN0YXJ0IGEgcHJvY2VzcyBhZ2FpbicgK1xuICAgICAgICAnYWZ0ZXIgaXRcXCdzIGFscmVhZHkgc3RvcHBlZCcpO1xuICB9IGVsc2UgaWYgKCduZXh0JyA9PT0gY2hhbmdlLnR5cGUgJiYgIWNvbnRleHQuc3RhcnRlZCkge1xuICAgIHRocm93IG5ldyBFcnJvcignU2hvdWxkIG5vdCBjb25jYXQgc3RlcHMgd2hpbGUgaXRcXCdzIG5vdCBzdGFydGVkJyk7XG4gIH0gZWxzZSBpZiAoJ3N0b3AnID09PSBjaGFuZ2UudHlwZSAmJiAhY29udGV4dC5zdGFydGVkKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdTaG91bGQgbm90IHN0b3AgYSBwcm9jZXNzIGJlZm9yZSBpdFxcJ3Mgc3RhcnRlZCcpO1xuICB9XG59O1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9wbGF5bGFuZy5pbnRlcmZhY2UuanNcbiAqKi8iLCIoZnVuY3Rpb24oZSwgYSkgeyBmb3IodmFyIGkgaW4gYSkgZVtpXSA9IGFbaV07IH0oZXhwb3J0cywgLyoqKioqKi8gKGZ1bmN0aW9uKG1vZHVsZXMpIHsgLy8gd2VicGFja0Jvb3RzdHJhcFxuLyoqKioqKi8gXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4vKioqKioqLyBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG4vKioqKioqL1xuLyoqKioqKi8gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuLyoqKioqKi8gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG4vKioqKioqL1xuLyoqKioqKi8gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuLyoqKioqKi8gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuLyoqKioqKi8gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4vKioqKioqL1xuLyoqKioqKi8gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4vKioqKioqLyBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuLyoqKioqKi8gXHRcdFx0ZXhwb3J0czoge30sXG4vKioqKioqLyBcdFx0XHRpZDogbW9kdWxlSWQsXG4vKioqKioqLyBcdFx0XHRsb2FkZWQ6IGZhbHNlXG4vKioqKioqLyBcdFx0fTtcbi8qKioqKiovXG4vKioqKioqLyBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4vKioqKioqLyBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG4vKioqKioqL1xuLyoqKioqKi8gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbi8qKioqKiovIFx0XHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcbi8qKioqKiovXG4vKioqKioqLyBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbi8qKioqKiovIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4vKioqKioqLyBcdH1cbi8qKioqKiovXG4vKioqKioqL1xuLyoqKioqKi8gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuLyoqKioqKi8gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuLyoqKioqKi9cbi8qKioqKiovIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbi8qKioqKiovIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcbi8qKioqKiovXG4vKioqKioqLyBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4vKioqKioqLyBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG4vKioqKioqL1xuLyoqKioqKi8gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbi8qKioqKiovIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oMCk7XG4vKioqKioqLyB9KVxuLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbi8qKioqKiovIChbXG4vKiAwICovXG4vKioqLyBmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMpIHtcblxuXHQndXNlIHN0cmljdCc7XG5cdFxuXHQvKipcblx0ICogR2VuZXJpYyBidWlsZGVyIHRoYXQgd291bGQgcHVzaCBub2RlcyBpbnRvIHRoZSBlRFNMIHN0YWNrLlxuXHQgKiBVc2VyIGNvdWxkIGluaGVyaXQgdGhpcyB0byBkZWZpbmUgdGhlIG5ldyBlRFNMLlxuXHQgKiAtLS1cblx0ICogVGhlIGRlZmF1bHQgc2VtYW50aWNzIG9ubHkgY29udGFpbiB0aGVzZSBvcGVyYXRpb25zOlxuXHQgKlxuXHQgKiAxLiBbcHVzaF0gOiBwdXNoIHRvIHRoZSBjdXJyZW50IHN0YWNrXG5cdCAqIDIuIFtiZWdpbl06IGNyZWF0ZSBhIG5ldyBzdGFjayBhbmQgc3dpdGNoIHRvIGl0LFxuXHQgKiAgICAgICAgICAgICBhbmQgdGhlbiBwdXNoIHRoZSBub2RlIGludG8gdGhlIHN0YWNrLlxuXHQgKiAzLiBbZW5kXSAgOiBhZnRlciBwdXNoIHRoZSBub2RlIGludG8gdGhlIHN0YWNrLFxuXHQgKiAgICAgICAgICAgICBjaGFuZ2UgdGhlIGN1cnJlbnQgc3RhY2sgdG8gdGhlIHByZXZpb3VzIG9uZS5cblx0ICogNC4gW2V4aXRdIDogZXhpdCB0aGUgY29udGV4dCBvZiB0aGlzIGVEU0w7IHRoZSBsYXN0IHJlc3VsdFxuXHQgKiAgICAgICAgICAgICBvZiBpdCB3b3VsZCBiZSBwYXNzZWQgdG8gdGhlIHJldHVybiB2YWx1ZSBvZlxuXHQgKiAgICAgICAgICAgICB0aGlzIGNoYWluLlxuXHQgKlxuXHQgKiBTdGFjayBjb3VsZCBiZSBuZXN0ZWQ6IHdoZW4gW2JlZ2luXSBhIG5ldyBzdGFjayBpbiBmYWN0IGl0IHdvdWxkXG5cdCAqIHB1c2ggdGhlIHN0YWNrIGludG8gdGhlIHByZXZpb3VzIG9uZS4gU28gdGhlIHN0YWNrIGNvbXByaXNlXG5cdCAqIFtub2RlXSBhbmQgW3N0YWNrXS5cblx0ICogLS0tXG5cdCAqIEFsdGhvdWdoIHRoZSBlRFNMIGluc3RhbmNlIHNob3VsZCB3cmFwIHRoZXNlIGJhc2ljIG9wZXJhdGlvbnNcblx0ICogdG8gbWFuaXB1bGF0ZSB0aGUgc3RhY2ssIHRoZXkgYWxsIG5lZWQgdG8gY29udmVydCB0aGUgbWV0aG9kXG5cdCAqIGNhbGwgdG8gbm9kZXMuIFNvICdSdW5lJyBwcm92aWRlIGEgd2F5IHRvIHNpbXBsaWZ5IHRoZSB3b3JrOiBpZlxuXHQgKiB0aGUgaW5zdGFuY2UgY2FsbCB0aGUgW2RlZmluZV0gbWV0aG9kIHRoZSBuYW1lIG9mIHRoZSBtZXRob2QsXG5cdCAqIGl0IGNvdWxkIGFzc29jaWF0ZSB0aGUgb3BlcmFuZCBvZiB0aGUgZURTTCB3aXRoIHRoZSBzdGFjayBtYW5pcHVsYXRpb24uXG5cdCAqIEZvciBleGFtcGxlOlxuXHQgKlxuXHQgKiAgICB2YXIgZURTTCA9IGZ1bmN0aW9uKCkge307XG5cdCAqICAgIGVEU0wucHJvdG90eXBlLnRyYW5zYWN0aW9uID0gUnVuZS5kZWZpbmUoJ3RyYW5zYWN0aW9uJywgJ2JlZ2luJyk7XG5cdCAqICAgIGVEU0wucHJvdG90eXBlLnByZSA9IFJ1bmUuZGVmaW5lKCdwcmUnLCAncHVzaCcpO1xuXHQgKiAgICBlRFNMLnByb3RvdHlwZS5wZXJmb3JtID0gUnVuZS5kZWZpbmUoJ3BlcmZvcm0nLCAncHVzaCcpO1xuXHQgKiAgICBlRFNMLnByb3RvdHlwZS5wb3N0ID0gUnVuZS5kZWZpbmUoJ3Bvc3QnLCAnZW5kJyk7XG5cdCAqXG5cdCAqIFRoZW4gdGhlIGVEU0wgY291bGQgYmUgdXNlZCBhczpcblx0ICpcblx0ICogICAgKG5ldyBlRFNMKVxuXHQgKiAgICAgIC50cmFuc2FjdGlvbigpXG5cdCAqICAgICAgLnByZShjYilcblx0ICogICAgICAucGVyZm9ybShjYilcblx0ICogICAgICAucG9zdChjYilcblx0ICpcblx0ICogQW5kIHRoZSBzdGFjayB3b3VsZCBiZTpcblx0ICpcblx0ICogICAgW1xuXHQgKiAgICAgIG5vZGU8J3RyYW5zYWN0aW9uJyw+XG5cdCAqICAgICAgbm9kZTwncHJlJywgY2I+XG5cdCAqICAgICAgbm9kZTwncHJlZm9ybScsIGNiPlxuXHQgKiAgICAgIG5vZGU8J3Bvc3QnLCBjYj5cblx0ICogICAgXVxuXHQgKlxuXHQgKiBIb3dldmVyLCB0aGlzIHNpbXBsZSBhcHByb2FjaCB0aGUgc2VtYW50aWNzIHJ1bGVzIGFuZCBhbmFseXplcnMgdG9cblx0ICogZ3VhcmFudGVlIHRoZSBzdGFjayBpcyB2YWxpZC4gRm9yIGV4YW1wbGUsIGlmIHdlIGhhdmUgYSBtYWxmb3JtZWRcblx0ICogc3RhY2sgYmVjYXVzZSBvZiB0aGUgZm9sbG93aW5nIGVEU0wgcHJvZ3JhbTpcblx0ICpcblx0ICogICAgKG5ldyBlRFNMKVxuXHQgKiAgICAgIC5wb3N0KGNiKVxuXHQgKiAgICAgIC5wcmUoY2IpXG5cdCAqICAgICAgLnBlcmZvcm0oY2IpXG5cdCAqICAgICAgLnRyYW5zYWN0aW9uKClcblx0ICpcblx0ICogVGhlIHJ1bnRpbWUgbWF5IHJlcG9ydCBlcnJvdCBiZWNhdXNlIHdoZW4gJy5wb3N0KGNiKScgdGhlcmUgaXMgbm8gc3RhY2tcblx0ICogY3JlYXRlZCBieSB0aGUgYmVnaW5uaW5nIHN0ZXAsIG5hbWVseSB0aGUgJy5wcmUoY2IpJyBpbiBvdXIgY2FzZS5cblx0ICogTmV2ZXJ0aGVsZXNzLCB0aGUgZXJyb3IgbWVzc2FnZSBpcyB0b28gbG93LWxldmVsIGZvciB0aGUgbGFuZ3VhZ2UgdXNlcixcblx0ICogc2luY2UgdGhleSBzaG91bGQgY2FyZSBubyBzdGFjayB0aGluZ3MgYW5kIHNob3VsZCBvbmx5IGNhcmUgYWJvdXQgdGhlIGVEU0xcblx0ICogaXRzZWxmLlxuXHQgKlxuXHQgKiBUaGUgc29sdXRpb24gaXMgdG8gcHJvdmlkZSBhIGJhc2ljIHN0YWNrIG9yZGVyaW5nIGFuYWx5emVyIGFuZCBsZXQgdGhlXG5cdCAqIGxhbmd1YWdlIGRlY2lkZSBob3cgdG8gZGVzY3JpYmUgdGhlIGVycm9yLiBBbmQgc2luY2Ugd2UgZG9uJ3QgaGF2ZVxuXHQgKiBhbnkgY29udGV4dCBpbmZvcm1hdGlvbiBhYm91dCB2YXJpYWJsZXMsIHNjb3BlIGFuZCBvdGhlciBlbGVtZW50c1xuXHQgKiBhcyBhIGNvbXBsZXRlIHByb2dyYW1taW5nIGxhbmd1YWdlLCB3ZSBvbmx5IG5lZWQgdG8gZ3VhcmFudGVlIHRoZSBvcmRlciBpc1xuXHQgKiBjb3JyZWN0LCBhbmQgbWFrZSBpbmNvcnJlY3QgY2FzZXMgbWVhbmluZ2Z1bC4gTW9yZW92ZXIsIHNpbmNlIHRoZSBhbmFseXplclxuXHQgKiBuZWVkcyB0byBhbmFseXplIHRoZSBzdGF0ZXMgd2hlbmV2ZXIgdGhlIGluY29taW5nIG5vZGUgY29tZXMsIGl0IGlzIGluIGZhY3Rcblx0ICogYW4gZXZhbHVhdGlvbiBwcm9jZXNzLCBzbyB1c2VyIGNvdWxkIGNvbWJpbmUgdGhlIGFuYWx5emluZyBhbmQgaW50ZXJwcmV0aW5nXG5cdCAqIHBoYXNlIGludG8gdGhlIHNhbWUgZnVuY3Rpb24uIEZvciBleGFtcGxlOlxuXHQgKlxuXHQgKiAgICBydW50aW1lLm9uY2hhbmdlKChjb250ZXh0LCBub2RlLCBzdGFjaykgPT4ge1xuXHQgKiAgICAgICAgLy8gSWYgdGhlIGNoYW5nZSBpcyB0byBzd2l0Y2ggdG8gYSBuZXcgc3RhY2ssXG5cdCAqICAgICAgICAvLyB0aGUgJ3N0YWNrJyBoZXJlIHdvdWxkIGJlIHRoZSBuZXcgc3RhY2suXG5cdCAqICAgICAgICB2YXIge3R5cGUsIGFyZ3N9ID0gbm9kZTtcblx0ICogICAgICAgIGlmICgncHJlJyA9PT0gdHlwZSkge1xuXHQgKiAgICAgICAgICBjb250ZXh0LmluaXQgPSB0cnVlO1xuXHQgKiAgICAgICAgfSBlbHNlIGlmICgncG9zdCcgPT09IHR5cGUgJiYgIWNvbnRleHQuaW5pdCkge1xuXHQgKiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1RoZXJlIG11c3QgYmUgb25lIFwicHJlXCIgbm9kZSBiZWZvcmUgdGhlIFwicG9zdFwiLicpO1xuXHQgKiAgICAgICAgfVxuXHQgKiAgICB9KTtcblx0ICpcblx0ICogV2l0aCBzdWNoIGZlYXR1cmUsIGlmIHRoZSBpbmNvbWluZyBub2RlIG9yIHRoZSBzdGFjayBpcyBtYWxmb3JtZWQsXG5cdCAqIGl0IHNob3VsZCB0aHJvdyB0aGUgZXJyb3IuIFRoZSBlcnJvciBjYXB0dXJlZCBieSB0aGUgaW5zdGFuY2UgbGlrZSB0aGlzXG5cdCAqIGNvdWxkIGJlIGEgJ2NvbXBpbGF0aW9uIGVycm9yJy5cblx0ICpcblx0ICogVGhlIG5vdGljZWFibGUgZmFjdCBpcyBUaGUgY2FsbGJhY2sgb2YgdGhlICdvbmNoYW5nZScgaXMgYWN0dWFsbHkgYSByZWR1Y2VyLFxuXHQgKiBzbyB1c2VyIGNvdWxkIHRyZWF0IHRoZSBwcm9jZXNzIG9mIHRoaXMgZXZhbHVhdGlvbiAmIGFuYWx5emluZyBhcyBhIHJlZHVjaW5nXG5cdCAqIHByb2Nlc3Mgb24gYW4gaW5maW5pdGUgc3RyZWFtLiBBbmQgc2luY2Ugd2UgaGF2ZSBhIHN0YWNrIG1hY2hpbmUsIGlmIHRoZVxuXHQgKiByZWR1Y2VyIHJldHVybiBub3RoaW5nLCB0aGUgc3RhY2sgd291bGQgYmUgZW1wdHkuIE90aGVyd2lzZSwgaWYgdGhlIHJlZHVjZXJcblx0ICogcmV0dXJuIGEgbmV3IHN0YWNrLCBpdCB3b3VsZCByZXBsYWNlIHRoZSBvbGQgb25lLlxuXHQgKlxuXHQgKiBBbmQgcGxlYXNlIG5vdGUgdGhlIGV4YW1wbGUgaXMgbXVjaCBzaW1wbGlmaWVkLiBGb3IgdGhlXG5cdCAqIHJlYWwgZURTTCBpdCBzaG91bGQgYmUgdXNlZCBvbmx5IGFzIGFuIGVudHJ5IHRvIGRpc3BhdGNoIHRoZSBjaGFuZ2UgdG9cblx0ICogdGhlIHJlYWwgaGFuZGxlcnMsIHdoaWNoIG1heSBjb21wcmlzZSBzZXZlcmFsIHN0YXRlcyBhbmQgY29tcG9uZW50cy5cblx0ICovXG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHtcblx0ICB2YWx1ZTogdHJ1ZVxuXHR9KTtcblx0ZXhwb3J0c1snZGVmYXVsdCddID0gUnVuZTtcblx0XG5cdGZ1bmN0aW9uIFJ1bmUoKSB7fVxuXHRcblx0LyoqXG5cdCAqIEhlbHBlciBtZXRob2QgdG8gYnVpbGQgaW50ZXJmYWNlIG9mIGEgc3BlY2lmaWMgRFNMLiBJdCB3b3VsZCByZXR1cm4gYSBtZXRob2Rcblx0ICogb2YgdGhlIERTTCBhbmQgdGhlbiB0aGUgaW50ZXJmYWNlIGNvdWxkIGF0dGFjaCBpdC5cblx0ICpcblx0ICogVGhlIHJldHVybmluZyBmdW5jdGlvbiB3b3VsZCBhc3N1bWUgdGhhdCB0aGUgJ3RoaXMnIGluc2lkZSBpdCBpcyB0aGUgcnVudGltZVxuXHQgKiBvZiB0aGUgbGFuZ3VhZ2UuIEFuZCBzaW5jZSB0aGUgbWV0aG9kIGl0IHJldHVybnMgd291bGQgcmVxdWlyZSB0byBhY2Nlc3Mgc29tZVxuXHQgKiBtZW1iZXJzIG9mIHRoZSAndGhpcycsIHRoZSAndGhpcycgc2hvdWxkIGhhdmUgJ3RoaXMuc3RhY2snIGFuZCAndGhpcy5jb250ZXh0J1xuXHQgKiBhcyB0aGUgbWV0aG9kIHJlcXVpcmVzLlxuXHQgKlxuXHQgKiBJZiBpdCdzIGFuICdleGl0JyBub2RlLCBtZWFucyB0aGUgc2Vzc2lvbiBpcyBlbmRlZCBhbmQgdGhlIGludGVycHJldGVyIHNob3VsZFxuXHQgKiByZXR1cm4gYSBzdGFjayBjb250YWlucyBvbmx5IG9uZSBub2RlIGFzIHRoZSByZXN1bHQgb2YgdGhlIHNlc3Npb24sIG9yIHRoZVxuXHQgKiBzZXNzaW9uIHJldHVybnMgbm90aGluZy4gRm9yIG90aGVyIGluc3RydWN0aW9ucyB0aGUgc3RhY2sgY2FuIGtlZXAgc29tZVxuXHQgKiBjb21wdXRlZCByZXN1bHQgdG8gc2ltdWxhdGUgcmVhbCBzdGFjayBtYWNoaW5lLiBCdXQgaXQncyBPSyB0byBub3QgdXNlIHRoaXNcblx0ICogZmVhdHVyZSBhbmQgYWx3YXlzIHJldHVybiBhbiBlbXB0eSAnc3RhY2snIGV2ZXJ5dGltZSB0aGUgJ29uY2hhbmdlJyBnZXRcblx0ICogY2FsbGVkIGFuZCBpbnRlcnVwdGVkLiBJbiB0aGlzIG1vZGUgaXQgbWVhbnMgdGhlIGxhbmd1YWdlIHdhbnQgdG8ga2VlcFxuXHQgKiBhbGwgc3RhdGVzIGJ5IGl0c2VsZi5cblx0ICpcblx0ICogUGxlYXNlIG5vdGUgdGhhdCBmcm9tIHRoZSBkZXNjcmlwdGlvbiBhYm92ZSwgJ2VuZCcgbWVhbnMgc3RhY2sgKHN1YnN0YWNrKVxuXHQgKiBlbmRzLiBJdCdzIHRvdGFsbHkgaXJyZWxldmFudCB0byAnZXhpdCcuXG5cdCAqXG5cdCAqIFRoZSBsYXN0IGFyZ3VtZW50ICdkb2MnIGlzIHdoYXQgZGVzaWduZXIgY291bGQgcHV0IHRoZSBkZXNjcmlwdGlvbiBhYm91dFxuXHQgKiB0aGUgbWV0aG9kLiBJZiBzZXQsIGl0IHdvdWxkIGFwcGVuZCB0aGUgJ3J1bmUuZG9jJ1xuXHQgKiBwcm9wZXJ0eSBpbiB0aGUgZnVuY3Rpb24gaXQgcmV0dXJucy4gQW5kIHRoZW4gdGhlIGxhbmd1YWdlIGluc3RhbmNlIGNvdWxkXG5cdCAqIGNhbGwgYFJ1bmUuZG9jdW1lbnQoPGluc3RhbmNlPilgIHRvIGdldCBhIG1ldGhvZCB0aGF0IHdvdWxkIHJldHVyblxuXHQgKiAneyBtZXRob2ROYW1lOiBkZXNjcmlwdGlvbiB9JyB3aGVuIGl0IGdvdCBpbnZva2VkLlxuXHQgKi9cblx0UnVuZS5kZWZpbmUgPSBmdW5jdGlvbiAobWV0aG9kLCBhcykge1xuXHQgIHZhciBkb2MgPSBhcmd1bWVudHMubGVuZ3RoIDw9IDIgfHwgYXJndW1lbnRzWzJdID09PSB1bmRlZmluZWQgPyAnJyA6IGFyZ3VtZW50c1syXTtcblx0XG5cdCAgdmFyIGJ1aWx0ID0gZnVuY3Rpb24gYnVpbHQoKSB7XG5cdCAgICB2YXIgbm9kZSwgcmVzdWx0c3RhY2s7XG5cdFxuXHQgICAgZm9yICh2YXIgX2xlbiA9IGFyZ3VtZW50cy5sZW5ndGgsIGFyZ3MgPSBBcnJheShfbGVuKSwgX2tleSA9IDA7IF9rZXkgPCBfbGVuOyBfa2V5KyspIHtcblx0ICAgICAgYXJnc1tfa2V5XSA9IGFyZ3VtZW50c1tfa2V5XTtcblx0ICAgIH1cblx0XG5cdCAgICBzd2l0Y2ggKGFzKSB7XG5cdCAgICAgIGNhc2UgJ3B1c2gnOlxuXHQgICAgICAgIG5vZGUgPSBuZXcgUnVuZS5Ob2RlKG1ldGhvZCwgYXJncywgdGhpcy5zdGFjayk7XG5cdCAgICAgICAgdGhpcy5zdGFjay5wdXNoKG5vZGUpO1xuXHQgICAgICAgIHJlc3VsdHN0YWNrID0gdGhpcy5vbmNoYW5nZSh0aGlzLmNvbnRleHQsIG5vZGUsIHRoaXMuc3RhY2spO1xuXHQgICAgICAgIGJyZWFrO1xuXHQgICAgICBjYXNlICdiZWdpbic6XG5cdCAgICAgICAgdGhpcy5fcHJldnN0YWNrID0gdGhpcy5zdGFjaztcblx0ICAgICAgICB0aGlzLnN0YWNrID0gW107XG5cdCAgICAgICAgbm9kZSA9IG5ldyBSdW5lLk5vZGUobWV0aG9kLCBhcmdzLCB0aGlzLnN0YWNrKTtcblx0ICAgICAgICB0aGlzLnN0YWNrLnB1c2gobm9kZSk7IC8vIGFzIHRoZSBmaXJzdCBub2RlIG9mIHRoZSBuZXcgc3RhY2suXG5cdCAgICAgICAgcmVzdWx0c3RhY2sgPSB0aGlzLm9uY2hhbmdlKHRoaXMuY29udGV4dCwgbm9kZSwgdGhpcy5zdGFjayk7XG5cdCAgICAgICAgYnJlYWs7XG5cdCAgICAgIGNhc2UgJ2VuZCc6XG5cdCAgICAgICAgbm9kZSA9IG5ldyBSdW5lLk5vZGUobWV0aG9kLCBhcmdzLCB0aGlzLnN0YWNrKTtcblx0ICAgICAgICB0aGlzLnN0YWNrLnB1c2gobm9kZSk7IC8vIHRoZSBsYXN0IG5vZGUgb2YgdGhlIHN0YWNrLlxuXHQgICAgICAgIHRoaXMuc3RhY2sgPSB0aGlzLl9wcmV2c3RhY2s7IC8vIHN3aXRjaCBiYWNrIHRvIHRoZSBwcmV2aW91cyBzdGFjay5cblx0ICAgICAgICByZXN1bHRzdGFjayA9IHRoaXMub25jaGFuZ2UodGhpcy5jb250ZXh0LCBub2RlLCB0aGlzLnN0YWNrKTtcblx0ICAgICAgICBicmVhaztcblx0ICAgICAgY2FzZSAnZXhpdCc6XG5cdCAgICAgICAgbm9kZSA9IG5ldyBSdW5lLk5vZGUobWV0aG9kLCBhcmdzLCB0aGlzLnN0YWNrKTtcblx0ICAgICAgICB0aGlzLnN0YWNrLnB1c2gobm9kZSk7IC8vIHRoZSBsYXN0IG5vZGUgb2YgdGhlIHN0YWNrLlxuXHQgICAgICAgIHJlc3VsdHN0YWNrID0gdGhpcy5vbmNoYW5nZSh0aGlzLmNvbnRleHQsIG5vZGUsIHRoaXMuc3RhY2spO1xuXHQgICAgICAgIGlmICghcmVzdWx0c3RhY2spIHtcblx0ICAgICAgICAgIHRocm93IG5ldyBFcnJvcignXFwnZXhpdFxcJyBub2RlIFxcJycgKyBub2RlLnR5cGUgKyAnXFwnIHNob3VsZFxcbiAgICAgICAgICAgIHJldHVybiBhIHJlc3VsdHN0YWNrLicpO1xuXHQgICAgICAgIH1cblx0ICAgICAgICByZXR1cm4gcmVzdWx0c3RhY2tbMF07XG5cdCAgICB9XG5cdCAgICAvLyBJZiB0aGUgaGFuZGxlciB1cGRhdGVzIHRoZSBzdGFjaywgaXQgd291bGQgcmVwbGFjZSB0aGUgZXhpc3Rpbmcgb25lLlxuXHQgICAgaWYgKHJlc3VsdHN0YWNrKSB7XG5cdCAgICAgIHRoaXMuc3RhY2sgPSByZXN1bHRzdGFjaztcblx0ICAgIH1cblx0ICAgIHJldHVybiB0aGlzO1xuXHQgIH07XG5cdCAgYnVpbHQucnVuZSA9IHtcblx0ICAgICdhcyc6IGFzLFxuXHQgICAgJ2RvYyc6IGRvYyxcblx0ICAgICdtZXRob2QnOiBtZXRob2Rcblx0ICB9O1xuXHQgIHJldHVybiBidWlsdDtcblx0fTtcblx0XG5cdC8qKlxuXHQgKiBHZW5lcmF0ZSBhIG1ldGhvZCB0aGF0IHdvdWxkIHJldHVybiBhbGwgZG9jdW1lbnRzIG9mIHRoZSBtZXRob2RzLFxuXHQgKiBpbiBhIGZvcm0gb2YgJ3sgbWV0aG9kTmFtZTogZGVzY3JpcHRpb24gfScuXG5cdCAqXG5cdCAqIFRoZSBhcmd1bWVudCBtdXN0IGJlIHRoZSBsYW5ndWFnZSBpbnN0YW5jZSB3aXRoIGFsbCBkZWZpbmVkIG1ldGhvZHMuXG5cdCAqL1xuXHRSdW5lLnB1Ymxpc2ggPSBmdW5jdGlvbiAoaW5zdGFuY2UpIHtcblx0ICB2YXIgZ2VuZXJhdGVkID0gT2JqZWN0LmtleXMoaW5zdGFuY2UpLnJlZHVjZShmdW5jdGlvbiAoZG9jLCBuYW1lKSB7XG5cdCAgICB2YXIgbWV0aG9kID0gaW5zdGFuY2VbbmFtZV07XG5cdCAgICBpZiAobWV0aG9kLnJ1bmUpIHtcblx0ICAgICAgZG9jW25hbWVdID0gbWV0aG9kLnJ1bmUuZG9jO1xuXHQgICAgfVxuXHQgIH0sIHt9KTtcblx0ICByZXR1cm4gZnVuY3Rpb24gKCkge1xuXHQgICAgcmV0dXJuIGdlbmVyYXRlZDtcblx0ICB9O1xuXHR9O1xuXHRcblx0UnVuZS5Ob2RlID0gZnVuY3Rpb24gKHR5cGUsIGFyZ3MsIHN0YWNrKSB7XG5cdCAgdGhpcy50eXBlID0gdHlwZTtcblx0ICB0aGlzLmFyZ3MgPSBhcmdzO1xuXHQgIHRoaXMuc3RhY2sgPSBzdGFjaztcblx0fTtcblx0XG5cdFJ1bmUuRXZhbHVhdGUgPSBmdW5jdGlvbiAoKSB7XG5cdCAgdmFyIGNvbnRleHQgPSBhcmd1bWVudHMubGVuZ3RoIDw9IDAgfHwgYXJndW1lbnRzWzBdID09PSB1bmRlZmluZWQgPyB7fSA6IGFyZ3VtZW50c1swXTtcblx0XG5cdCAgdGhpcy5fYW5hbHl6ZXJzID0gW107XG5cdCAgdGhpcy5faW50ZXJwcmV0ZXIgPSBudWxsO1xuXHQgIHRoaXMuX2NvbnRleHQgPSBjb250ZXh0O1xuXHR9O1xuXHRcblx0LyoqXG5cdCAqIEFuYWx5emVyIGNvdWxkIHJlY2VpdmUgdGhlIHN0YWNrIGNoYW5nZSBmcm9tICdSdW5lI2V2YWx1YXRlJyxcblx0ICogYW5kIGl0IHdvdWxkIGJlIGNhbGxlZCB3aXRoIHRoZSBhcmd1bWVudHMgYXMgdGhlIGZ1bmN0aW9uIGRlc2NyaWJlczpcblx0ICpcblx0ICogICAgIFJ1bmUucHJvdG90eXBlLmV2YWx1YXRlKChjb250ZXh0LCBjaGFuZ2UsIHN0YWNrKSA9PiB7XG5cdCAqICAgICAgICAvLyAuLi5cblx0ICogICAgIH0pO1xuXHQgKlxuXHQgKiBTbyB0aGUgYW5hbHl6ZXIgY291bGQgYmU6XG5cdCAqXG5cdCAqICAgIGZ1bmN0aW9uKGNvbnRleHQsIGNoYW5nZSwgc3RhY2spIHtcblx0ICogICAgICAvLyBEbyBzb21lIGNoZWNrIGFuZCBtYXliZSBjaGFuZ2VkIHRoZSBjb250ZXh0LlxuXHQgKiAgICAgIC8vIFRoZSBuZXh0IGFuYWx5emVyIHRvIHRoZSBpbnRlcnByZXRlciB3b3VsZCBhY2NlcHQgdGhlIGFsdGVybmF0ZWRcblx0ICogICAgICAvLyBjb250ZXh0IGFzIHRoZSBhcmd1bWVudCAnY29udGV4dCcuXG5cdCAqICAgICAgY29udGV4dC5zb21lRmxhZyA9IHRydWU7XG5cdCAqICAgICAgLy8gV2hlbiB0aGVyZSBpcyB3cm9uZywgdGhyb3cgaXQuXG5cdCAqICAgICAgdGhyb3cgbmV3IEVycm9yKCdTb21lIGFuYWx5emluZyBlcnJvcicpO1xuXHQgKiAgICB9O1xuXHQgKlxuXHQgKiBOb3RlIHRoYXQgdGhlIGFuYWx5emVyICgnYScpIHdvdWxkIGJlIGludm9rZWQgd2l0aCBlbXB0eSAndGhpcycgb2JqZWN0LFxuXHQgKiBzbyB0aGUgZnVuY3Rpb24gcmVsaWVzIG9uICd0aGlzJyBzaG91bGQgYmluZCBpdHNlbGYgZmlyc3QuXG5cdCAqL1xuXHRSdW5lLkV2YWx1YXRlLnByb3RvdHlwZS5hbmFseXplciA9IGZ1bmN0aW9uIChhKSB7XG5cdCAgdGhpcy5fYW5hbHl6ZXJzLnB1c2goYSk7XG5cdCAgcmV0dXJuIHRoaXM7XG5cdH07XG5cdFxuXHQvKipcblx0ICogT25lIEV2YWx1YXRlIGNhbiBvbmx5IGhhdmUgb25lIGludGVycHJldGVyLCBhbmQgaXQgd291bGQgcmV0dXJuXG5cdCAqIHRoZSBmdW5jdGlvbiBjb3VsZCBjb25zdW1lIGV2ZXJ5IHN0YWNrIGNoYW5nZSBmcm9tICdSdW5lI2V2YWx1YXRlJy5cblx0ICpcblx0ICogVGhlIGNvZGUgaXMgYSBsaXR0bGUgY29tcGxpY2F0ZWQ6IHdlIGhhdmUgdHdvIGtpbmRzIG9mICdyZWR1Y2luZyc6XG5cdCAqIG9uZSBpcyB0byByZWR1Y2UgYWxsIGFuYWx5emVycyB3aXRoIHRoZSBzaW5nbGUgaW5jb21pbmcgY2hhbmdlLFxuXHQgKiBhbm90aGVyIGlzIHRvIHJlZHVjZSBhbGwgaW5jb21pbmcgY2hhbmdlcyB3aXRoIHRoaXMgYW5hbHl6ZXJzICsgaW50ZXJwcmV0ZXIuXG5cdCAqXG5cdCAqIFRoZSBhbmFseXplciBhbmQgaW50ZXJwcmV0ZXIgc2hvdWxkIGNoYW5nZSB0aGUgY29udGV4dCwgdG8gbWVtb3JpemUgdGhlXG5cdCAqIHN0YXRlcyBvZiB0aGUgZXZhbHVhdGlvbi4gVGhlIGRpZmZlcmVuY2UgaXMgaW50ZXJwcmV0ZXIgc2hvdWxkIHJldHVybiBvbmVcblx0ICogbmV3IHN0YWNrIGlmIGl0IG5lZWRzIHRvIHVwZGF0ZSB0aGUgZXhpc3Rpbmcgb25lLiBUaGUgc3RhY2sgaXQgcmV0dXJucyB3b3VsZFxuXHQgKiByZXBsYWNlIHRoZSBleGlzdGluZyBvbmUsIHNvIGFueXRoaW5nIHN0aWxsIGluIHRoZSBvbGQgb25lIHdvdWxkIGJlIHdpcGVkXG5cdCAqIG91dC4gVGhlIGludGVycHJldGVyIGNvdWxkIHJldHVybiBub3RoaW5nICgndW5kZWZpbmVkJykgdG8ga2VlcCB0aGUgc3RhY2tcblx0ICogdW50b3VjaGVkLlxuXHQgKlxuXHQgKiBUaGUgYW5hbHl6ZXJzIGFuZCBpbnRlcnByZXRlciBjb3VsZCBjaGFuZ2UgdGhlICdjb250ZXh0JyBwYXNzIHRvIHRoZW0uXG5cdCAqIEFuZCBzaW5jZSB3ZSBtYXkgdXBkYXRlIHRoZSBzdGFjayBhcyBhYm92ZSwgdGhlIGNvbnRleHQgc2hvdWxkIG1lbW9yaXplXG5cdCAqIHRob3NlIGluZm9ybWF0aW9uIG5vdCB0byBiZSBvdmVyd3JpdHRlbiB3aGlsZSB0aGUgc3RhY2sgZ2V0IHdpcGVkIG91dC5cblx0ICpcblx0ICogQW5kIGlmIHRoZSBpbnRlcnByZXRpbmcgbm9kZSBpcyB0aGUgZXhpdCBub2RlIG9mIHRoZSBzZXNzaW9uLCBpbnRlcnByZXRlclxuXHQgKiBzaG91bGQgcmV0dXJuIGEgbmV3IHN0YWNrIGNvbnRhaW5zIG9ubHkgb25lIGZpbmFsIHJlc3VsdCBub2RlLiBJZiB0aGVyZVxuXHQgKiBpcyBubyBzdWNoIG5vZGUsIHRoZSByZXN1bHQgb2YgdGhpcyBzZXNzaW9uIGlzICd1bmRlZmluZWQnLlxuXHQgKi9cblx0UnVuZS5FdmFsdWF0ZS5wcm90b3R5cGUuaW50ZXJwcmV0ZXIgPSBmdW5jdGlvbiAoaW5wdCkge1xuXHQgIHZhciBfdGhpcyA9IHRoaXM7XG5cdFxuXHQgIC8vIFRoZSBjdXN0b21pemVkIGxhbmd1YWdlIHNob3VsZCBnaXZlIHRoZSBkZWZhdWx0IGNvbnRleHQuXG5cdCAgcmV0dXJuIGZ1bmN0aW9uIChjb250ZXh0LCBjaGFuZ2UsIHN0YWNrKSB7XG5cdCAgICB0cnkge1xuXHQgICAgICAvLyBBbmFseXplcnMgY291bGQgY2hhbmdlIHRoZSBjb250ZXh0LlxuXHQgICAgICBfdGhpcy5fYW5hbHl6ZXJzLnJlZHVjZShmdW5jdGlvbiAoY3R4LCBhbmFseXplcikge1xuXHQgICAgICAgIGFuYWx5emVyLmNhbGwoe30sIGNvbnRleHQsIGNoYW5nZSwgc3RhY2spO1xuXHQgICAgICB9LCBjb250ZXh0KTtcblx0ICAgIH0gY2F0Y2ggKGUpIHtcblx0ICAgICAgX3RoaXMuX2hhbmRsZUVycm9yKGUsIGNvbnRleHQsIGNoYW5nZSwgc3RhY2spO1xuXHQgICAgfVxuXHQgICAgLy8gQWZ0ZXIgYW5hbHl6ZSBpdCwgaW50ZXJwcmV0IHRoZSBub2RlIGFuZCByZXR1cm4gdGhlIG5ldyBzdGFjayAoaWYgYW55KS5cblx0ICAgIHZhciBuZXdTdGFjayA9IGlucHQoY29udGV4dCwgY2hhbmdlLCBzdGFjayk7XG5cdCAgICByZXR1cm4gbmV3U3RhY2s7XG5cdCAgfTtcblx0fTtcblx0XG5cdFJ1bmUuRXZhbHVhdGUucHJvdG90eXBlLl9oYW5kbGVFcnJvciA9IGZ1bmN0aW9uIChlcnIsIGNvbnRleHQsIGNoYW5nZSwgc3RhY2spIHtcblx0ICAvLyBUT0RPOiBleHBhbmQgaXQgdG8gcHJvdmlkZSBtb3JlIHNvcGhpc3RpYyBkZWJ1Z2dpbmcgbWVzc2FnZS5cblx0ICB0aHJvdyBuZXcgRXJyb3IoJ1doZW4gY2hhbmdlICcgKyBjaGFuZ2UudHlwZSArICcgY29tZXMgZXJyb3IgXFwnJyArIGVyciArICdcXCcgaGFwcGVuZWQnKTtcblx0fTtcblx0bW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzWydkZWZhdWx0J107XG5cbi8qKiovIH1cbi8qKioqKiovIF0pKSk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LGV5SjJaWEp6YVc5dUlqb3pMQ0p6YjNWeVkyVnpJanBiSW5kbFluQmhZMnM2THk4dmQyVmljR0ZqYXk5aWIyOTBjM1J5WVhBZ05qWmpNVEZpTkdFM1lUUm1OR0ZtTURobU0yWWlMQ0ozWldKd1lXTnJPaTh2THk0dmMzSmpMM0oxYm1VdWFuTWlYU3dpYm1GdFpYTWlPbHRkTENKdFlYQndhVzVuY3lJNklqdEJRVUZCTzBGQlEwRTdPMEZCUlVFN1FVRkRRVHM3UVVGRlFUdEJRVU5CTzBGQlEwRTdPMEZCUlVFN1FVRkRRVHRCUVVOQkxIVkNRVUZsTzBGQlEyWTdRVUZEUVR0QlFVTkJPenRCUVVWQk8wRkJRMEU3TzBGQlJVRTdRVUZEUVRzN1FVRkZRVHRCUVVOQk8wRkJRMEU3T3p0QlFVZEJPMEZCUTBFN08wRkJSVUU3UVVGRFFUczdRVUZGUVR0QlFVTkJPenRCUVVWQk8wRkJRMEU3T3pzN096czdRVU4wUTBFc1lVRkJXU3hEUVVGRE96czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenR6UWtGeFIxY3NTVUZCU1RzN1FVRkJZaXhWUVVGVExFbEJRVWtzUjBGQlJ5eEZRVUZGT3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3TzBGQk5FSnFReXhMUVVGSkxFTkJRVU1zVFVGQlRTeEhRVUZITEZWQlFWTXNUVUZCVFN4RlFVRkZMRVZCUVVVc1JVRkJXVHRQUVVGV0xFZEJRVWNzZVVSQlFVY3NSVUZCUlRzN1FVRkRla01zVDBGQlNTeExRVUZMTEVkQlFVY3NVMEZCVWl4TFFVRkxMRWRCUVhGQ08wRkJRelZDTEZOQlFVa3NTVUZCU1N4RlFVRkZMRmRCUVZjc1EwRkJRenM3ZFVOQlJFRXNTVUZCU1R0QlFVRktMRmRCUVVrN096dEJRVVV4UWl4aFFVRlJMRVZCUVVVN1FVRkRVaXhaUVVGTExFMUJRVTA3UVVGRFZDeGhRVUZKTEVkQlFVY3NTVUZCU1N4SlFVRkpMRU5CUVVNc1NVRkJTU3hEUVVGRExFMUJRVTBzUlVGQlJTeEpRVUZKTEVWQlFVVXNTVUZCU1N4RFFVRkRMRXRCUVVzc1EwRkJReXhEUVVGRE8wRkJReTlETEdGQlFVa3NRMEZCUXl4TFFVRkxMRU5CUVVNc1NVRkJTU3hEUVVGRExFbEJRVWtzUTBGQlF5eERRVUZETzBGQlEzUkNMRzlDUVVGWExFZEJRMVFzU1VGQlNTeERRVUZETEZGQlFWRXNRMEZCUXl4SlFVRkpMRU5CUVVNc1QwRkJUeXhGUVVGRkxFbEJRVWtzUlVGQlJTeEpRVUZKTEVOQlFVTXNTMEZCU3l4RFFVRkRMRU5CUVVNN1FVRkRhRVFzWlVGQlRUdEJRVU5TTEZsQlFVc3NUMEZCVHp0QlFVTldMR0ZCUVVrc1EwRkJReXhWUVVGVkxFZEJRVWNzU1VGQlNTeERRVUZETEV0QlFVc3NRMEZCUXp0QlFVTTNRaXhoUVVGSkxFTkJRVU1zUzBGQlN5eEhRVUZITEVWQlFVVXNRMEZCUXp0QlFVTm9RaXhoUVVGSkxFZEJRVWNzU1VGQlNTeEpRVUZKTEVOQlFVTXNTVUZCU1N4RFFVRkRMRTFCUVUwc1JVRkJSU3hKUVVGSkxFVkJRVVVzU1VGQlNTeERRVUZETEV0QlFVc3NRMEZCUXl4RFFVRkRPMEZCUXk5RExHRkJRVWtzUTBGQlF5eExRVUZMTEVOQlFVTXNTVUZCU1N4RFFVRkRMRWxCUVVrc1EwRkJReXhEUVVGRE8wRkJRM1JDTEc5Q1FVRlhMRWRCUTFRc1NVRkJTU3hEUVVGRExGRkJRVkVzUTBGQlF5eEpRVUZKTEVOQlFVTXNUMEZCVHl4RlFVRkZMRWxCUVVrc1JVRkJSU3hKUVVGSkxFTkJRVU1zUzBGQlN5eERRVUZETEVOQlFVTTdRVUZEYUVRc1pVRkJUVHRCUVVOU0xGbEJRVXNzUzBGQlN6dEJRVU5TTEdGQlFVa3NSMEZCUnl4SlFVRkpMRWxCUVVrc1EwRkJReXhKUVVGSkxFTkJRVU1zVFVGQlRTeEZRVUZGTEVsQlFVa3NSVUZCUlN4SlFVRkpMRU5CUVVNc1MwRkJTeXhEUVVGRExFTkJRVU03UVVGREwwTXNZVUZCU1N4RFFVRkRMRXRCUVVzc1EwRkJReXhKUVVGSkxFTkJRVU1zU1VGQlNTeERRVUZETEVOQlFVTTdRVUZEZEVJc1lVRkJTU3hEUVVGRExFdEJRVXNzUjBGRFVpeEpRVUZKTEVOQlFVTXNWVUZCVlN4RFFVRkRPMEZCUTJ4Q0xHOUNRVUZYTEVkQlExUXNTVUZCU1N4RFFVRkRMRkZCUVZFc1EwRkJReXhKUVVGSkxFTkJRVU1zVDBGQlR5eEZRVUZGTEVsQlFVa3NSVUZCUlN4SlFVRkpMRU5CUVVNc1MwRkJTeXhEUVVGRExFTkJRVU03UVVGRGFFUXNaVUZCVFR0QlFVTlNMRmxCUVVzc1RVRkJUVHRCUVVOVUxHRkJRVWtzUjBGQlJ5eEpRVUZKTEVsQlFVa3NRMEZCUXl4SlFVRkpMRU5CUVVNc1RVRkJUU3hGUVVGRkxFbEJRVWtzUlVGQlJTeEpRVUZKTEVOQlFVTXNTMEZCU3l4RFFVRkRMRU5CUVVNN1FVRkRMME1zWVVGQlNTeERRVUZETEV0QlFVc3NRMEZCUXl4SlFVRkpMRU5CUVVNc1NVRkJTU3hEUVVGRExFTkJRVU03UVVGRGRFSXNiMEpCUVZjc1IwRkRWQ3hKUVVGSkxFTkJRVU1zVVVGQlVTeERRVUZETEVsQlFVa3NRMEZCUXl4UFFVRlBMRVZCUVVVc1NVRkJTU3hGUVVGRkxFbEJRVWtzUTBGQlF5eExRVUZMTEVOQlFVTXNRMEZCUXp0QlFVTm9SQ3hoUVVGSkxFTkJRVU1zVjBGQlZ5eEZRVUZGTzBGQlEyaENMR2xDUVVGTkxFbEJRVWtzUzBGQlN5eHpRa0ZCYVVJc1NVRkJTU3hEUVVGRExFbEJRVWtzYTBSQlEyaENMRU5CUVVNN1ZVRkRNMEk3UVVGRFJDeG5Ra0ZCVHl4WFFVRlhMRU5CUVVNc1EwRkJReXhEUVVGRExFTkJRVU03UVVGQlFTeE5RVU42UWpzN1FVRkZSQ3hUUVVGSkxGZEJRVmNzUlVGQlJUdEJRVU5tTEZkQlFVa3NRMEZCUXl4TFFVRkxMRWRCUVVjc1YwRkJWeXhEUVVGRE8wMUJRekZDTzBGQlEwUXNXVUZCVHl4SlFVRkpMRU5CUVVNN1NVRkRZaXhEUVVGRE8wRkJRMFlzVVVGQlN5eERRVUZETEVsQlFVa3NSMEZCUnp0QlFVTllMRk5CUVVrc1JVRkJSU3hGUVVGRk8wRkJRMUlzVlVGQlN5eEZRVUZGTEVkQlFVYzdRVUZEVml4aFFVRlJMRVZCUVVVc1RVRkJUVHRKUVVOcVFpeERRVUZETzBGQlEwWXNWVUZCVHl4TFFVRkxMRU5CUVVNN1JVRkRaQ3hEUVVGRE96czdPenM3T3p0QlFWRkdMRXRCUVVrc1EwRkJReXhQUVVGUExFZEJRVWNzVlVGQlV5eFJRVUZSTEVWQlFVVTdRVUZEYUVNc1QwRkJTU3hUUVVGVExFZEJRVWNzVFVGQlRTeERRVUZETEVsQlFVa3NRMEZCUXl4UlFVRlJMRU5CUVVNc1EwRkJReXhOUVVGTkxFTkJRVU1zVlVGQlF5eEhRVUZITEVWQlFVVXNTVUZCU1N4RlFVRkxPMEZCUXpGRUxGTkJRVWtzVFVGQlRTeEhRVUZITEZGQlFWRXNRMEZCUXl4SlFVRkpMRU5CUVVNc1EwRkJRenRCUVVNMVFpeFRRVUZKTEUxQlFVMHNRMEZCUXl4SlFVRkpMRVZCUVVVN1FVRkRaaXhWUVVGSExFTkJRVU1zU1VGQlNTeERRVUZETEVkQlFVY3NUVUZCVFN4RFFVRkRMRWxCUVVrc1EwRkJReXhIUVVGSExFTkJRVU03VFVGRE4wSTdTVUZEUml4RlFVRkZMRVZCUVVVc1EwRkJReXhEUVVGRE8wRkJRMUFzVlVGQlR5eFpRVUZYTzBGQlEyaENMRmxCUVU4c1UwRkJVeXhEUVVGRE8wbEJRMnhDTEVOQlFVTTdSVUZEU0N4RFFVRkRPenRCUVVWR0xFdEJRVWtzUTBGQlF5eEpRVUZKTEVkQlFVY3NWVUZCVXl4SlFVRkpMRVZCUVVVc1NVRkJTU3hGUVVGRkxFdEJRVXNzUlVGQlJUdEJRVU4wUXl4UFFVRkpMRU5CUVVNc1NVRkJTU3hIUVVGSExFbEJRVWtzUTBGQlF6dEJRVU5xUWl4UFFVRkpMRU5CUVVNc1NVRkJTU3hIUVVGSExFbEJRVWtzUTBGQlF6dEJRVU5xUWl4UFFVRkpMRU5CUVVNc1MwRkJTeXhIUVVGSExFdEJRVXNzUTBGQlF6dEZRVU53UWl4RFFVRkRPenRCUVVWR0xFdEJRVWtzUTBGQlF5eFJRVUZSTEVkQlFVY3NXVUZCZFVJN1QwRkJaQ3hQUVVGUExIbEVRVUZITEVWQlFVVTdPMEZCUTI1RExFOUJRVWtzUTBGQlF5eFZRVUZWTEVkQlFVY3NSVUZCUlN4RFFVRkRPMEZCUTNKQ0xFOUJRVWtzUTBGQlF5eFpRVUZaTEVkQlFVY3NTVUZCU1N4RFFVRkRPMEZCUTNwQ0xFOUJRVWtzUTBGQlF5eFJRVUZSTEVkQlFVY3NUMEZCVHl4RFFVRkRPMFZCUTNwQ0xFTkJRVU03T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096dEJRWGRDUml4TFFVRkpMRU5CUVVNc1VVRkJVU3hEUVVGRExGTkJRVk1zUTBGQlF5eFJRVUZSTEVkQlFVY3NWVUZCVXl4RFFVRkRMRVZCUVVVN1FVRkROME1zVDBGQlNTeERRVUZETEZWQlFWVXNRMEZCUXl4SlFVRkpMRU5CUVVNc1EwRkJReXhEUVVGRExFTkJRVU03UVVGRGVFSXNWVUZCVHl4SlFVRkpMRU5CUVVNN1JVRkRZaXhEUVVGRE96czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3TzBGQmVVSkdMRXRCUVVrc1EwRkJReXhSUVVGUkxFTkJRVU1zVTBGQlV5eERRVUZETEZkQlFWY3NSMEZCUnl4VlFVRlRMRWxCUVVrc1JVRkJSVHM3T3p0QlFVVnVSQ3hWUVVGUExGVkJRVU1zVDBGQlR5eEZRVUZGTEUxQlFVMHNSVUZCUlN4TFFVRkxMRVZCUVVzN1FVRkRha01zVTBGQlNUczdRVUZGUml4aFFVRkxMRlZCUVZVc1EwRkJReXhOUVVGTkxFTkJRVU1zVlVGQlF5eEhRVUZITEVWQlFVVXNVVUZCVVN4RlFVRkxPMEZCUTNoRExHbENRVUZSTEVOQlFVTXNTVUZCU1N4RFFVRkRMRVZCUVVVc1JVRkJSU3hQUVVGUExFVkJRVVVzVFVGQlRTeEZRVUZGTEV0QlFVc3NRMEZCUXl4RFFVRkRPMUZCUXpORExFVkJRVVVzVDBGQlR5eERRVUZETEVOQlFVTTdUVUZEWWl4RFFVRkRMRTlCUVUwc1EwRkJReXhGUVVGRk8wRkJRMVFzWVVGQlN5eFpRVUZaTEVOQlFVTXNRMEZCUXl4RlFVRkZMRTlCUVU4c1JVRkJSU3hOUVVGTkxFVkJRVVVzUzBGQlN5eERRVUZETEVOQlFVTTdUVUZET1VNN08wRkJSVVFzVTBGQlNTeFJRVUZSTEVkQlFVY3NTVUZCU1N4RFFVRkRMRTlCUVU4c1JVRkJSU3hOUVVGTkxFVkJRVVVzUzBGQlN5eERRVUZETEVOQlFVTTdRVUZETlVNc1dVRkJUeXhSUVVGUkxFTkJRVU03U1VGRGFrSXNRMEZCUXp0RlFVTklMRU5CUVVNN08wRkJSVVlzUzBGQlNTeERRVUZETEZGQlFWRXNRMEZCUXl4VFFVRlRMRU5CUVVNc1dVRkJXU3hIUVVOd1F5eFZRVUZUTEVkQlFVY3NSVUZCUlN4UFFVRlBMRVZCUVVVc1RVRkJUU3hGUVVGRkxFdEJRVXNzUlVGQlJUczdRVUZGY0VNc1UwRkJUU3hKUVVGSkxFdEJRVXNzYTBKQlFXZENMRTFCUVUwc1EwRkJReXhKUVVGSkxIVkNRVUZwUWl4SFFVRkhMR2xDUVVGaExFTkJRVU03UlVGRE4wVXNRMEZCUXlJc0ltWnBiR1VpT2lKeWRXNWxMbXB6SWl3aWMyOTFjbU5sYzBOdmJuUmxiblFpT2xzaUlGeDBMeThnVkdobElHMXZaSFZzWlNCallXTm9aVnh1SUZ4MGRtRnlJR2x1YzNSaGJHeGxaRTF2WkhWc1pYTWdQU0I3ZlR0Y2JseHVJRngwTHk4Z1ZHaGxJSEpsY1hWcGNtVWdablZ1WTNScGIyNWNiaUJjZEdaMWJtTjBhVzl1SUY5ZmQyVmljR0ZqYTE5eVpYRjFhWEpsWDE4b2JXOWtkV3hsU1dRcElIdGNibHh1SUZ4MFhIUXZMeUJEYUdWamF5QnBaaUJ0YjJSMWJHVWdhWE1nYVc0Z1kyRmphR1ZjYmlCY2RGeDBhV1lvYVc1emRHRnNiR1ZrVFc5a2RXeGxjMXR0YjJSMWJHVkpaRjBwWEc0Z1hIUmNkRngwY21WMGRYSnVJR2x1YzNSaGJHeGxaRTF2WkhWc1pYTmJiVzlrZFd4bFNXUmRMbVY0Y0c5eWRITTdYRzVjYmlCY2RGeDBMeThnUTNKbFlYUmxJR0VnYm1WM0lHMXZaSFZzWlNBb1lXNWtJSEIxZENCcGRDQnBiblJ2SUhSb1pTQmpZV05vWlNsY2JpQmNkRngwZG1GeUlHMXZaSFZzWlNBOUlHbHVjM1JoYkd4bFpFMXZaSFZzWlhOYmJXOWtkV3hsU1dSZElEMGdlMXh1SUZ4MFhIUmNkR1Y0Y0c5eWRITTZJSHQ5TEZ4dUlGeDBYSFJjZEdsa09pQnRiMlIxYkdWSlpDeGNiaUJjZEZ4MFhIUnNiMkZrWldRNklHWmhiSE5sWEc0Z1hIUmNkSDA3WEc1Y2JpQmNkRngwTHk4Z1JYaGxZM1YwWlNCMGFHVWdiVzlrZFd4bElHWjFibU4wYVc5dVhHNGdYSFJjZEcxdlpIVnNaWE5iYlc5a2RXeGxTV1JkTG1OaGJHd29iVzlrZFd4bExtVjRjRzl5ZEhNc0lHMXZaSFZzWlN3Z2JXOWtkV3hsTG1WNGNHOXlkSE1zSUY5ZmQyVmljR0ZqYTE5eVpYRjFhWEpsWDE4cE8xeHVYRzRnWEhSY2RDOHZJRVpzWVdjZ2RHaGxJRzF2WkhWc1pTQmhjeUJzYjJGa1pXUmNiaUJjZEZ4MGJXOWtkV3hsTG14dllXUmxaQ0E5SUhSeWRXVTdYRzVjYmlCY2RGeDBMeThnVW1WMGRYSnVJSFJvWlNCbGVIQnZjblJ6SUc5bUlIUm9aU0J0YjJSMWJHVmNiaUJjZEZ4MGNtVjBkWEp1SUcxdlpIVnNaUzVsZUhCdmNuUnpPMXh1SUZ4MGZWeHVYRzVjYmlCY2RDOHZJR1Y0Y0c5elpTQjBhR1VnYlc5a2RXeGxjeUJ2WW1wbFkzUWdLRjlmZDJWaWNHRmphMTl0YjJSMWJHVnpYMThwWEc0Z1hIUmZYM2RsWW5CaFkydGZjbVZ4ZFdseVpWOWZMbTBnUFNCdGIyUjFiR1Z6TzF4dVhHNGdYSFF2THlCbGVIQnZjMlVnZEdobElHMXZaSFZzWlNCallXTm9aVnh1SUZ4MFgxOTNaV0p3WVdOclgzSmxjWFZwY21WZlh5NWpJRDBnYVc1emRHRnNiR1ZrVFc5a2RXeGxjenRjYmx4dUlGeDBMeThnWDE5M1pXSndZV05yWDNCMVlteHBZMTl3WVhSb1gxOWNiaUJjZEY5ZmQyVmljR0ZqYTE5eVpYRjFhWEpsWDE4dWNDQTlJRndpWENJN1hHNWNiaUJjZEM4dklFeHZZV1FnWlc1MGNua2diVzlrZFd4bElHRnVaQ0J5WlhSMWNtNGdaWGh3YjNKMGMxeHVJRngwY21WMGRYSnVJRjlmZDJWaWNHRmphMTl5WlhGMWFYSmxYMThvTUNrN1hHNWNibHh1WEc0dktpb2dWMFZDVUVGRFN5QkdUMDlVUlZJZ0tpcGNiaUFxS2lCM1pXSndZV05yTDJKdmIzUnpkSEpoY0NBMk5tTXhNV0kwWVRkaE5HWTBZV1l3T0dZelpseHVJQ29xTHlJc0lpZDFjMlVnYzNSeWFXTjBKenRjYmx4dUx5b3FYRzRnS2lCSFpXNWxjbWxqSUdKMWFXeGtaWElnZEdoaGRDQjNiM1ZzWkNCd2RYTm9JRzV2WkdWeklHbHVkRzhnZEdobElHVkVVMHdnYzNSaFkyc3VYRzRnS2lCVmMyVnlJR052ZFd4a0lHbHVhR1Z5YVhRZ2RHaHBjeUIwYnlCa1pXWnBibVVnZEdobElHNWxkeUJsUkZOTUxseHVJQ29nTFMwdFhHNGdLaUJVYUdVZ1pHVm1ZWFZzZENCelpXMWhiblJwWTNNZ2IyNXNlU0JqYjI1MFlXbHVJSFJvWlhObElHOXdaWEpoZEdsdmJuTTZYRzRnS2x4dUlDb2dNUzRnVzNCMWMyaGRJRG9nY0hWemFDQjBieUIwYUdVZ1kzVnljbVZ1ZENCemRHRmphMXh1SUNvZ01pNGdXMkpsWjJsdVhUb2dZM0psWVhSbElHRWdibVYzSUhOMFlXTnJJR0Z1WkNCemQybDBZMmdnZEc4Z2FYUXNYRzRnS2lBZ0lDQWdJQ0FnSUNBZ0lDQmhibVFnZEdobGJpQndkWE5vSUhSb1pTQnViMlJsSUdsdWRHOGdkR2hsSUhOMFlXTnJMbHh1SUNvZ015NGdXMlZ1WkYwZ0lEb2dZV1owWlhJZ2NIVnphQ0IwYUdVZ2JtOWtaU0JwYm5SdklIUm9aU0J6ZEdGamF5eGNiaUFxSUNBZ0lDQWdJQ0FnSUNBZ0lHTm9ZVzVuWlNCMGFHVWdZM1Z5Y21WdWRDQnpkR0ZqYXlCMGJ5QjBhR1VnY0hKbGRtbHZkWE1nYjI1bExseHVJQ29nTkM0Z1cyVjRhWFJkSURvZ1pYaHBkQ0IwYUdVZ1kyOXVkR1Y0ZENCdlppQjBhR2x6SUdWRVUwdzdJSFJvWlNCc1lYTjBJSEpsYzNWc2RGeHVJQ29nSUNBZ0lDQWdJQ0FnSUNBZ2IyWWdhWFFnZDI5MWJHUWdZbVVnY0dGemMyVmtJSFJ2SUhSb1pTQnlaWFIxY200Z2RtRnNkV1VnYjJaY2JpQXFJQ0FnSUNBZ0lDQWdJQ0FnSUhSb2FYTWdZMmhoYVc0dVhHNGdLbHh1SUNvZ1UzUmhZMnNnWTI5MWJHUWdZbVVnYm1WemRHVmtPaUIzYUdWdUlGdGlaV2RwYmwwZ1lTQnVaWGNnYzNSaFkyc2dhVzRnWm1GamRDQnBkQ0IzYjNWc1pGeHVJQ29nY0hWemFDQjBhR1VnYzNSaFkyc2dhVzUwYnlCMGFHVWdjSEpsZG1sdmRYTWdiMjVsTGlCVGJ5QjBhR1VnYzNSaFkyc2dZMjl0Y0hKcGMyVmNiaUFxSUZ0dWIyUmxYU0JoYm1RZ1czTjBZV05yWFM1Y2JpQXFJQzB0TFZ4dUlDb2dRV3gwYUc5MVoyZ2dkR2hsSUdWRVUwd2dhVzV6ZEdGdVkyVWdjMmh2ZFd4a0lIZHlZWEFnZEdobGMyVWdZbUZ6YVdNZ2IzQmxjbUYwYVc5dWMxeHVJQ29nZEc4Z2JXRnVhWEIxYkdGMFpTQjBhR1VnYzNSaFkyc3NJSFJvWlhrZ1lXeHNJRzVsWldRZ2RHOGdZMjl1ZG1WeWRDQjBhR1VnYldWMGFHOWtYRzRnS2lCallXeHNJSFJ2SUc1dlpHVnpMaUJUYnlBblVuVnVaU2NnY0hKdmRtbGtaU0JoSUhkaGVTQjBieUJ6YVcxd2JHbG1lU0IwYUdVZ2QyOXlhem9nYVdaY2JpQXFJSFJvWlNCcGJuTjBZVzVqWlNCallXeHNJSFJvWlNCYlpHVm1hVzVsWFNCdFpYUm9iMlFnZEdobElHNWhiV1VnYjJZZ2RHaGxJRzFsZEdodlpDeGNiaUFxSUdsMElHTnZkV3hrSUdGemMyOWphV0YwWlNCMGFHVWdiM0JsY21GdVpDQnZaaUIwYUdVZ1pVUlRUQ0IzYVhSb0lIUm9aU0J6ZEdGamF5QnRZVzVwY0hWc1lYUnBiMjR1WEc0Z0tpQkdiM0lnWlhoaGJYQnNaVHBjYmlBcVhHNGdLaUFnSUNCMllYSWdaVVJUVENBOUlHWjFibU4wYVc5dUtDa2dlMzA3WEc0Z0tpQWdJQ0JsUkZOTUxuQnliM1J2ZEhsd1pTNTBjbUZ1YzJGamRHbHZiaUE5SUZKMWJtVXVaR1ZtYVc1bEtDZDBjbUZ1YzJGamRHbHZiaWNzSUNkaVpXZHBiaWNwTzF4dUlDb2dJQ0FnWlVSVFRDNXdjbTkwYjNSNWNHVXVjSEpsSUQwZ1VuVnVaUzVrWldacGJtVW9KM0J5WlNjc0lDZHdkWE5vSnlrN1hHNGdLaUFnSUNCbFJGTk1MbkJ5YjNSdmRIbHdaUzV3WlhKbWIzSnRJRDBnVW5WdVpTNWtaV1pwYm1Vb0ozQmxjbVp2Y20wbkxDQW5jSFZ6YUNjcE8xeHVJQ29nSUNBZ1pVUlRUQzV3Y205MGIzUjVjR1V1Y0c5emRDQTlJRkoxYm1VdVpHVm1hVzVsS0Nkd2IzTjBKeXdnSjJWdVpDY3BPMXh1SUNwY2JpQXFJRlJvWlc0Z2RHaGxJR1ZFVTB3Z1kyOTFiR1FnWW1VZ2RYTmxaQ0JoY3pwY2JpQXFYRzRnS2lBZ0lDQW9ibVYzSUdWRVUwd3BYRzRnS2lBZ0lDQWdJQzUwY21GdWMyRmpkR2x2YmlncFhHNGdLaUFnSUNBZ0lDNXdjbVVvWTJJcFhHNGdLaUFnSUNBZ0lDNXdaWEptYjNKdEtHTmlLVnh1SUNvZ0lDQWdJQ0F1Y0c5emRDaGpZaWxjYmlBcVhHNGdLaUJCYm1RZ2RHaGxJSE4wWVdOcklIZHZkV3hrSUdKbE9seHVJQ3BjYmlBcUlDQWdJRnRjYmlBcUlDQWdJQ0FnYm05a1pUd25kSEpoYm5OaFkzUnBiMjRuTEQ1Y2JpQXFJQ0FnSUNBZ2JtOWtaVHduY0hKbEp5d2dZMkkrWEc0Z0tpQWdJQ0FnSUc1dlpHVThKM0J5WldadmNtMG5MQ0JqWWo1Y2JpQXFJQ0FnSUNBZ2JtOWtaVHduY0c5emRDY3NJR05pUGx4dUlDb2dJQ0FnWFZ4dUlDcGNiaUFxSUVodmQyVjJaWElzSUhSb2FYTWdjMmx0Y0d4bElHRndjSEp2WVdOb0lIUm9aU0J6WlcxaGJuUnBZM01nY25Wc1pYTWdZVzVrSUdGdVlXeDVlbVZ5Y3lCMGIxeHVJQ29nWjNWaGNtRnVkR1ZsSUhSb1pTQnpkR0ZqYXlCcGN5QjJZV3hwWkM0Z1JtOXlJR1Y0WVcxd2JHVXNJR2xtSUhkbElHaGhkbVVnWVNCdFlXeG1iM0p0WldSY2JpQXFJSE4wWVdOcklHSmxZMkYxYzJVZ2IyWWdkR2hsSUdadmJHeHZkMmx1WnlCbFJGTk1JSEJ5YjJkeVlXMDZYRzRnS2x4dUlDb2dJQ0FnS0c1bGR5QmxSRk5NS1Z4dUlDb2dJQ0FnSUNBdWNHOXpkQ2hqWWlsY2JpQXFJQ0FnSUNBZ0xuQnlaU2hqWWlsY2JpQXFJQ0FnSUNBZ0xuQmxjbVp2Y20wb1kySXBYRzRnS2lBZ0lDQWdJQzUwY21GdWMyRmpkR2x2YmlncFhHNGdLbHh1SUNvZ1ZHaGxJSEoxYm5ScGJXVWdiV0Y1SUhKbGNHOXlkQ0JsY25KdmRDQmlaV05oZFhObElIZG9aVzRnSnk1d2IzTjBLR05pS1NjZ2RHaGxjbVVnYVhNZ2JtOGdjM1JoWTJ0Y2JpQXFJR055WldGMFpXUWdZbmtnZEdobElHSmxaMmx1Ym1sdVp5QnpkR1Z3TENCdVlXMWxiSGtnZEdobElDY3VjSEpsS0dOaUtTY2dhVzRnYjNWeUlHTmhjMlV1WEc0Z0tpQk9aWFpsY25Sb1pXeGxjM01zSUhSb1pTQmxjbkp2Y2lCdFpYTnpZV2RsSUdseklIUnZieUJzYjNjdGJHVjJaV3dnWm05eUlIUm9aU0JzWVc1bmRXRm5aU0IxYzJWeUxGeHVJQ29nYzJsdVkyVWdkR2hsZVNCemFHOTFiR1FnWTJGeVpTQnVieUJ6ZEdGamF5QjBhR2x1WjNNZ1lXNWtJSE5vYjNWc1pDQnZibXg1SUdOaGNtVWdZV0p2ZFhRZ2RHaGxJR1ZFVTB4Y2JpQXFJR2wwYzJWc1ppNWNiaUFxWEc0Z0tpQlVhR1VnYzI5c2RYUnBiMjRnYVhNZ2RHOGdjSEp2ZG1sa1pTQmhJR0poYzJsaklITjBZV05ySUc5eVpHVnlhVzVuSUdGdVlXeDVlbVZ5SUdGdVpDQnNaWFFnZEdobFhHNGdLaUJzWVc1bmRXRm5aU0JrWldOcFpHVWdhRzkzSUhSdklHUmxjMk55YVdKbElIUm9aU0JsY25KdmNpNGdRVzVrSUhOcGJtTmxJSGRsSUdSdmJpZDBJR2hoZG1WY2JpQXFJR0Z1ZVNCamIyNTBaWGgwSUdsdVptOXliV0YwYVc5dUlHRmliM1YwSUhaaGNtbGhZbXhsY3l3Z2MyTnZjR1VnWVc1a0lHOTBhR1Z5SUdWc1pXMWxiblJ6WEc0Z0tpQmhjeUJoSUdOdmJYQnNaWFJsSUhCeWIyZHlZVzF0YVc1bklHeGhibWQxWVdkbExDQjNaU0J2Ym14NUlHNWxaV1FnZEc4Z1ozVmhjbUZ1ZEdWbElIUm9aU0J2Y21SbGNpQnBjMXh1SUNvZ1kyOXljbVZqZEN3Z1lXNWtJRzFoYTJVZ2FXNWpiM0p5WldOMElHTmhjMlZ6SUcxbFlXNXBibWRtZFd3dUlFMXZjbVZ2ZG1WeUxDQnphVzVqWlNCMGFHVWdZVzVoYkhsNlpYSmNiaUFxSUc1bFpXUnpJSFJ2SUdGdVlXeDVlbVVnZEdobElITjBZWFJsY3lCM2FHVnVaWFpsY2lCMGFHVWdhVzVqYjIxcGJtY2dibTlrWlNCamIyMWxjeXdnYVhRZ2FYTWdhVzRnWm1GamRGeHVJQ29nWVc0Z1pYWmhiSFZoZEdsdmJpQndjbTlqWlhOekxDQnpieUIxYzJWeUlHTnZkV3hrSUdOdmJXSnBibVVnZEdobElHRnVZV3g1ZW1sdVp5QmhibVFnYVc1MFpYSndjbVYwYVc1blhHNGdLaUJ3YUdGelpTQnBiblJ2SUhSb1pTQnpZVzFsSUdaMWJtTjBhVzl1TGlCR2IzSWdaWGhoYlhCc1pUcGNiaUFxWEc0Z0tpQWdJQ0J5ZFc1MGFXMWxMbTl1WTJoaGJtZGxLQ2hqYjI1MFpYaDBMQ0J1YjJSbExDQnpkR0ZqYXlrZ1BUNGdlMXh1SUNvZ0lDQWdJQ0FnSUM4dklFbG1JSFJvWlNCamFHRnVaMlVnYVhNZ2RHOGdjM2RwZEdOb0lIUnZJR0VnYm1WM0lITjBZV05yTEZ4dUlDb2dJQ0FnSUNBZ0lDOHZJSFJvWlNBbmMzUmhZMnNuSUdobGNtVWdkMjkxYkdRZ1ltVWdkR2hsSUc1bGR5QnpkR0ZqYXk1Y2JpQXFJQ0FnSUNBZ0lDQjJZWElnZTNSNWNHVXNJR0Z5WjNOOUlEMGdibTlrWlR0Y2JpQXFJQ0FnSUNBZ0lDQnBaaUFvSjNCeVpTY2dQVDA5SUhSNWNHVXBJSHRjYmlBcUlDQWdJQ0FnSUNBZ0lHTnZiblJsZUhRdWFXNXBkQ0E5SUhSeWRXVTdYRzRnS2lBZ0lDQWdJQ0FnZlNCbGJITmxJR2xtSUNnbmNHOXpkQ2NnUFQwOUlIUjVjR1VnSmlZZ0lXTnZiblJsZUhRdWFXNXBkQ2tnZTF4dUlDb2dJQ0FnSUNBZ0lDQWdkR2h5YjNjZ2JtVjNJRVZ5Y205eUtDZFVhR1Z5WlNCdGRYTjBJR0psSUc5dVpTQmNJbkJ5WlZ3aUlHNXZaR1VnWW1WbWIzSmxJSFJvWlNCY0luQnZjM1JjSWk0bktUdGNiaUFxSUNBZ0lDQWdJQ0I5WEc0Z0tpQWdJQ0I5S1R0Y2JpQXFYRzRnS2lCWGFYUm9JSE4xWTJnZ1ptVmhkSFZ5WlN3Z2FXWWdkR2hsSUdsdVkyOXRhVzVuSUc1dlpHVWdiM0lnZEdobElITjBZV05ySUdseklHMWhiR1p2Y20xbFpDeGNiaUFxSUdsMElITm9iM1ZzWkNCMGFISnZkeUIwYUdVZ1pYSnliM0l1SUZSb1pTQmxjbkp2Y2lCallYQjBkWEpsWkNCaWVTQjBhR1VnYVc1emRHRnVZMlVnYkdsclpTQjBhR2x6WEc0Z0tpQmpiM1ZzWkNCaVpTQmhJQ2RqYjIxd2FXeGhkR2x2YmlCbGNuSnZjaWN1WEc0Z0tseHVJQ29nVkdobElHNXZkR2xqWldGaWJHVWdabUZqZENCcGN5QlVhR1VnWTJGc2JHSmhZMnNnYjJZZ2RHaGxJQ2R2Ym1Ob1lXNW5aU2NnYVhNZ1lXTjBkV0ZzYkhrZ1lTQnlaV1IxWTJWeUxGeHVJQ29nYzI4Z2RYTmxjaUJqYjNWc1pDQjBjbVZoZENCMGFHVWdjSEp2WTJWemN5QnZaaUIwYUdseklHVjJZV3gxWVhScGIyNGdKaUJoYm1Gc2VYcHBibWNnWVhNZ1lTQnlaV1IxWTJsdVoxeHVJQ29nY0hKdlkyVnpjeUJ2YmlCaGJpQnBibVpwYm1sMFpTQnpkSEpsWVcwdUlFRnVaQ0J6YVc1alpTQjNaU0JvWVhabElHRWdjM1JoWTJzZ2JXRmphR2x1WlN3Z2FXWWdkR2hsWEc0Z0tpQnlaV1IxWTJWeUlISmxkSFZ5YmlCdWIzUm9hVzVuTENCMGFHVWdjM1JoWTJzZ2QyOTFiR1FnWW1VZ1pXMXdkSGt1SUU5MGFHVnlkMmx6WlN3Z2FXWWdkR2hsSUhKbFpIVmpaWEpjYmlBcUlISmxkSFZ5YmlCaElHNWxkeUJ6ZEdGamF5d2dhWFFnZDI5MWJHUWdjbVZ3YkdGalpTQjBhR1VnYjJ4a0lHOXVaUzVjYmlBcVhHNGdLaUJCYm1RZ2NHeGxZWE5sSUc1dmRHVWdkR2hsSUdWNFlXMXdiR1VnYVhNZ2JYVmphQ0J6YVcxd2JHbG1hV1ZrTGlCR2IzSWdkR2hsWEc0Z0tpQnlaV0ZzSUdWRVUwd2dhWFFnYzJodmRXeGtJR0psSUhWelpXUWdiMjVzZVNCaGN5QmhiaUJsYm5SeWVTQjBieUJrYVhOd1lYUmphQ0IwYUdVZ1kyaGhibWRsSUhSdlhHNGdLaUIwYUdVZ2NtVmhiQ0JvWVc1a2JHVnljeXdnZDJocFkyZ2diV0Y1SUdOdmJYQnlhWE5sSUhObGRtVnlZV3dnYzNSaGRHVnpJR0Z1WkNCamIyMXdiMjVsYm5SekxseHVJQ292WEc1bGVIQnZjblFnWkdWbVlYVnNkQ0JtZFc1amRHbHZiaUJTZFc1bEtDa2dlMzFjYmx4dUx5b3FYRzRnS2lCSVpXeHdaWElnYldWMGFHOWtJSFJ2SUdKMWFXeGtJR2x1ZEdWeVptRmpaU0J2WmlCaElITndaV05wWm1saklFUlRUQzRnU1hRZ2QyOTFiR1FnY21WMGRYSnVJR0VnYldWMGFHOWtYRzRnS2lCdlppQjBhR1VnUkZOTUlHRnVaQ0IwYUdWdUlIUm9aU0JwYm5SbGNtWmhZMlVnWTI5MWJHUWdZWFIwWVdOb0lHbDBMbHh1SUNwY2JpQXFJRlJvWlNCeVpYUjFjbTVwYm1jZ1puVnVZM1JwYjI0Z2QyOTFiR1FnWVhOemRXMWxJSFJvWVhRZ2RHaGxJQ2QwYUdsekp5QnBibk5wWkdVZ2FYUWdhWE1nZEdobElISjFiblJwYldWY2JpQXFJRzltSUhSb1pTQnNZVzVuZFdGblpTNGdRVzVrSUhOcGJtTmxJSFJvWlNCdFpYUm9iMlFnYVhRZ2NtVjBkWEp1Y3lCM2IzVnNaQ0J5WlhGMWFYSmxJSFJ2SUdGalkyVnpjeUJ6YjIxbFhHNGdLaUJ0WlcxaVpYSnpJRzltSUhSb1pTQW5kR2hwY3ljc0lIUm9aU0FuZEdocGN5Y2djMmh2ZFd4a0lHaGhkbVVnSjNSb2FYTXVjM1JoWTJzbklHRnVaQ0FuZEdocGN5NWpiMjUwWlhoMEoxeHVJQ29nWVhNZ2RHaGxJRzFsZEdodlpDQnlaWEYxYVhKbGN5NWNiaUFxWEc0Z0tpQkpaaUJwZENkeklHRnVJQ2RsZUdsMEp5QnViMlJsTENCdFpXRnVjeUIwYUdVZ2MyVnpjMmx2YmlCcGN5QmxibVJsWkNCaGJtUWdkR2hsSUdsdWRHVnljSEpsZEdWeUlITm9iM1ZzWkZ4dUlDb2djbVYwZFhKdUlHRWdjM1JoWTJzZ1kyOXVkR0ZwYm5NZ2IyNXNlU0J2Ym1VZ2JtOWtaU0JoY3lCMGFHVWdjbVZ6ZFd4MElHOW1JSFJvWlNCelpYTnphVzl1TENCdmNpQjBhR1ZjYmlBcUlITmxjM05wYjI0Z2NtVjBkWEp1Y3lCdWIzUm9hVzVuTGlCR2IzSWdiM1JvWlhJZ2FXNXpkSEoxWTNScGIyNXpJSFJvWlNCemRHRmpheUJqWVc0Z2EyVmxjQ0J6YjIxbFhHNGdLaUJqYjIxd2RYUmxaQ0J5WlhOMWJIUWdkRzhnYzJsdGRXeGhkR1VnY21WaGJDQnpkR0ZqYXlCdFlXTm9hVzVsTGlCQ2RYUWdhWFFuY3lCUFN5QjBieUJ1YjNRZ2RYTmxJSFJvYVhOY2JpQXFJR1psWVhSMWNtVWdZVzVrSUdGc2QyRjVjeUJ5WlhSMWNtNGdZVzRnWlcxd2RIa2dKM04wWVdOckp5QmxkbVZ5ZVhScGJXVWdkR2hsSUNkdmJtTm9ZVzVuWlNjZ1oyVjBYRzRnS2lCallXeHNaV1FnWVc1a0lHbHVkR1Z5ZFhCMFpXUXVJRWx1SUhSb2FYTWdiVzlrWlNCcGRDQnRaV0Z1Y3lCMGFHVWdiR0Z1WjNWaFoyVWdkMkZ1ZENCMGJ5QnJaV1Z3WEc0Z0tpQmhiR3dnYzNSaGRHVnpJR0o1SUdsMGMyVnNaaTVjYmlBcVhHNGdLaUJRYkdWaGMyVWdibTkwWlNCMGFHRjBJR1p5YjIwZ2RHaGxJR1JsYzJOeWFYQjBhVzl1SUdGaWIzWmxMQ0FuWlc1a0p5QnRaV0Z1Y3lCemRHRmpheUFvYzNWaWMzUmhZMnNwWEc0Z0tpQmxibVJ6TGlCSmRDZHpJSFJ2ZEdGc2JIa2dhWEp5Wld4bGRtRnVkQ0IwYnlBblpYaHBkQ2N1WEc0Z0tseHVJQ29nVkdobElHeGhjM1FnWVhKbmRXMWxiblFnSjJSdll5Y2dhWE1nZDJoaGRDQmtaWE5wWjI1bGNpQmpiM1ZzWkNCd2RYUWdkR2hsSUdSbGMyTnlhWEIwYVc5dUlHRmliM1YwWEc0Z0tpQjBhR1VnYldWMGFHOWtMaUJKWmlCelpYUXNJR2wwSUhkdmRXeGtJR0Z3Y0dWdVpDQjBhR1VnSjNKMWJtVXVaRzlqSjF4dUlDb2djSEp2Y0dWeWRIa2dhVzRnZEdobElHWjFibU4wYVc5dUlHbDBJSEpsZEhWeWJuTXVJRUZ1WkNCMGFHVnVJSFJvWlNCc1lXNW5kV0ZuWlNCcGJuTjBZVzVqWlNCamIzVnNaRnh1SUNvZ1kyRnNiQ0JnVW5WdVpTNWtiMk4xYldWdWRDZzhhVzV6ZEdGdVkyVStLV0FnZEc4Z1oyVjBJR0VnYldWMGFHOWtJSFJvWVhRZ2QyOTFiR1FnY21WMGRYSnVYRzRnS2lBbmV5QnRaWFJvYjJST1lXMWxPaUJrWlhOamNtbHdkR2x2YmlCOUp5QjNhR1Z1SUdsMElHZHZkQ0JwYm5admEyVmtMbHh1SUNvdlhHNVNkVzVsTG1SbFptbHVaU0E5SUdaMWJtTjBhVzl1S0cxbGRHaHZaQ3dnWVhNc0lHUnZZeUE5SUNjbktTQjdYRzRnSUhaaGNpQmlkV2xzZENBOUlHWjFibU4wYVc5dUtDNHVMbUZ5WjNNcElIdGNiaUFnSUNCMllYSWdibTlrWlN3Z2NtVnpkV3gwYzNSaFkyczdYRzRnSUNBZ2MzZHBkR05vSUNoaGN5a2dlMXh1SUNBZ0lDQWdZMkZ6WlNBbmNIVnphQ2M2WEc0Z0lDQWdJQ0FnSUc1dlpHVWdQU0J1WlhjZ1VuVnVaUzVPYjJSbEtHMWxkR2h2WkN3Z1lYSm5jeXdnZEdocGN5NXpkR0ZqYXlrN1hHNGdJQ0FnSUNBZ0lIUm9hWE11YzNSaFkyc3VjSFZ6YUNodWIyUmxLVHRjYmlBZ0lDQWdJQ0FnY21WemRXeDBjM1JoWTJzZ1BWeHVJQ0FnSUNBZ0lDQWdJSFJvYVhNdWIyNWphR0Z1WjJVb2RHaHBjeTVqYjI1MFpYaDBMQ0J1YjJSbExDQjBhR2x6TG5OMFlXTnJLVHRjYmlBZ0lDQWdJQ0FnWW5KbFlXczdYRzRnSUNBZ0lDQmpZWE5sSUNkaVpXZHBiaWM2WEc0Z0lDQWdJQ0FnSUhSb2FYTXVYM0J5WlhaemRHRmpheUE5SUhSb2FYTXVjM1JoWTJzN1hHNGdJQ0FnSUNBZ0lIUm9hWE11YzNSaFkyc2dQU0JiWFR0Y2JpQWdJQ0FnSUNBZ2JtOWtaU0E5SUc1bGR5QlNkVzVsTGs1dlpHVW9iV1YwYUc5a0xDQmhjbWR6TENCMGFHbHpMbk4wWVdOcktUdGNiaUFnSUNBZ0lDQWdkR2hwY3k1emRHRmpheTV3ZFhOb0tHNXZaR1VwT3lBZ0x5OGdZWE1nZEdobElHWnBjbk4wSUc1dlpHVWdiMllnZEdobElHNWxkeUJ6ZEdGamF5NWNiaUFnSUNBZ0lDQWdjbVZ6ZFd4MGMzUmhZMnNnUFZ4dUlDQWdJQ0FnSUNBZ0lIUm9hWE11YjI1amFHRnVaMlVvZEdocGN5NWpiMjUwWlhoMExDQnViMlJsTENCMGFHbHpMbk4wWVdOcktUdGNiaUFnSUNBZ0lDQWdZbkpsWVdzN1hHNGdJQ0FnSUNCallYTmxJQ2RsYm1Rbk9seHVJQ0FnSUNBZ0lDQnViMlJsSUQwZ2JtVjNJRkoxYm1VdVRtOWtaU2h0WlhSb2IyUXNJR0Z5WjNNc0lIUm9hWE11YzNSaFkyc3BPMXh1SUNBZ0lDQWdJQ0IwYUdsekxuTjBZV05yTG5CMWMyZ29ibTlrWlNrN0lDQXZMeUIwYUdVZ2JHRnpkQ0J1YjJSbElHOW1JSFJvWlNCemRHRmpheTVjYmlBZ0lDQWdJQ0FnZEdocGN5NXpkR0ZqYXlBOVhHNGdJQ0FnSUNBZ0lDQWdkR2hwY3k1ZmNISmxkbk4wWVdOck95QXZMeUJ6ZDJsMFkyZ2dZbUZqYXlCMGJ5QjBhR1VnY0hKbGRtbHZkWE1nYzNSaFkyc3VYRzRnSUNBZ0lDQWdJSEpsYzNWc2RITjBZV05ySUQxY2JpQWdJQ0FnSUNBZ0lDQjBhR2x6TG05dVkyaGhibWRsS0hSb2FYTXVZMjl1ZEdWNGRDd2dibTlrWlN3Z2RHaHBjeTV6ZEdGamF5azdYRzRnSUNBZ0lDQWdJR0p5WldGck8xeHVJQ0FnSUNBZ1kyRnpaU0FuWlhocGRDYzZYRzRnSUNBZ0lDQWdJRzV2WkdVZ1BTQnVaWGNnVW5WdVpTNU9iMlJsS0cxbGRHaHZaQ3dnWVhKbmN5d2dkR2hwY3k1emRHRmpheWs3WEc0Z0lDQWdJQ0FnSUhSb2FYTXVjM1JoWTJzdWNIVnphQ2h1YjJSbEtUc2dJQzh2SUhSb1pTQnNZWE4wSUc1dlpHVWdiMllnZEdobElITjBZV05yTGx4dUlDQWdJQ0FnSUNCeVpYTjFiSFJ6ZEdGamF5QTlYRzRnSUNBZ0lDQWdJQ0FnZEdocGN5NXZibU5vWVc1blpTaDBhR2x6TG1OdmJuUmxlSFFzSUc1dlpHVXNJSFJvYVhNdWMzUmhZMnNwTzF4dUlDQWdJQ0FnSUNCcFppQW9JWEpsYzNWc2RITjBZV05yS1NCN1hHNGdJQ0FnSUNBZ0lDQWdkR2h5YjNjZ2JtVjNJRVZ5Y205eUtHQW5aWGhwZENjZ2JtOWtaU0FuSkh0dWIyUmxMblI1Y0dWOUp5QnphRzkxYkdSY2JpQWdJQ0FnSUNBZ0lDQWdJSEpsZEhWeWJpQmhJSEpsYzNWc2RITjBZV05yTG1BcE8xeHVJQ0FnSUNBZ0lDQjlYRzRnSUNBZ0lDQWdJSEpsZEhWeWJpQnlaWE4xYkhSemRHRmphMXN3WFR0Y2JpQWdJQ0I5WEc0Z0lDQWdMeThnU1dZZ2RHaGxJR2hoYm1Sc1pYSWdkWEJrWVhSbGN5QjBhR1VnYzNSaFkyc3NJR2wwSUhkdmRXeGtJSEpsY0d4aFkyVWdkR2hsSUdWNGFYTjBhVzVuSUc5dVpTNWNiaUFnSUNCcFppQW9jbVZ6ZFd4MGMzUmhZMnNwSUh0Y2JpQWdJQ0FnSUhSb2FYTXVjM1JoWTJzZ1BTQnlaWE4xYkhSemRHRmphenRjYmlBZ0lDQjlYRzRnSUNBZ2NtVjBkWEp1SUhSb2FYTTdYRzRnSUgwN1hHNGdJR0oxYVd4MExuSjFibVVnUFNCN1hHNGdJQ0FnSjJGekp6b2dZWE1zWEc0Z0lDQWdKMlJ2WXljNklHUnZZeXhjYmlBZ0lDQW5iV1YwYUc5a0p6b2diV1YwYUc5a0xGeHVJQ0I5TzF4dUlDQnlaWFIxY200Z1luVnBiSFE3WEc1OU8xeHVYRzR2S2lwY2JpQXFJRWRsYm1WeVlYUmxJR0VnYldWMGFHOWtJSFJvWVhRZ2QyOTFiR1FnY21WMGRYSnVJR0ZzYkNCa2IyTjFiV1Z1ZEhNZ2IyWWdkR2hsSUcxbGRHaHZaSE1zWEc0Z0tpQnBiaUJoSUdadmNtMGdiMllnSjNzZ2JXVjBhRzlrVG1GdFpUb2daR1Z6WTNKcGNIUnBiMjRnZlNjdVhHNGdLbHh1SUNvZ1ZHaGxJR0Z5WjNWdFpXNTBJRzExYzNRZ1ltVWdkR2hsSUd4aGJtZDFZV2RsSUdsdWMzUmhibU5sSUhkcGRHZ2dZV3hzSUdSbFptbHVaV1FnYldWMGFHOWtjeTVjYmlBcUwxeHVVblZ1WlM1d2RXSnNhWE5vSUQwZ1puVnVZM1JwYjI0b2FXNXpkR0Z1WTJVcElIdGNiaUFnZG1GeUlHZGxibVZ5WVhSbFpDQTlJRTlpYW1WamRDNXJaWGx6S0dsdWMzUmhibU5sS1M1eVpXUjFZMlVvS0dSdll5d2dibUZ0WlNrZ1BUNGdlMXh1SUNBZ0lIWmhjaUJ0WlhSb2IyUWdQU0JwYm5OMFlXNWpaVnR1WVcxbFhUdGNiaUFnSUNCcFppQW9iV1YwYUc5a0xuSjFibVVwSUh0Y2JpQWdJQ0FnSUdSdlkxdHVZVzFsWFNBOUlHMWxkR2h2WkM1eWRXNWxMbVJ2WXp0Y2JpQWdJQ0I5WEc0Z0lIMHNJSHQ5S1R0Y2JpQWdjbVYwZFhKdUlHWjFibU4wYVc5dUtDa2dlMXh1SUNBZ0lISmxkSFZ5YmlCblpXNWxjbUYwWldRN1hHNGdJSDA3WEc1OU8xeHVYRzVTZFc1bExrNXZaR1VnUFNCbWRXNWpkR2x2YmloMGVYQmxMQ0JoY21kekxDQnpkR0ZqYXlrZ2UxeHVJQ0IwYUdsekxuUjVjR1VnUFNCMGVYQmxPMXh1SUNCMGFHbHpMbUZ5WjNNZ1BTQmhjbWR6TzF4dUlDQjBhR2x6TG5OMFlXTnJJRDBnYzNSaFkyczdYRzU5TzF4dVhHNVNkVzVsTGtWMllXeDFZWFJsSUQwZ1puVnVZM1JwYjI0b1kyOXVkR1Y0ZENBOUlIdDlLU0I3WEc0Z0lIUm9hWE11WDJGdVlXeDVlbVZ5Y3lBOUlGdGRPMXh1SUNCMGFHbHpMbDlwYm5SbGNuQnlaWFJsY2lBOUlHNTFiR3c3WEc0Z0lIUm9hWE11WDJOdmJuUmxlSFFnUFNCamIyNTBaWGgwTzF4dWZUdGNibHh1THlvcVhHNGdLaUJCYm1Gc2VYcGxjaUJqYjNWc1pDQnlaV05sYVhabElIUm9aU0J6ZEdGamF5QmphR0Z1WjJVZ1puSnZiU0FuVW5WdVpTTmxkbUZzZFdGMFpTY3NYRzRnS2lCaGJtUWdhWFFnZDI5MWJHUWdZbVVnWTJGc2JHVmtJSGRwZEdnZ2RHaGxJR0Z5WjNWdFpXNTBjeUJoY3lCMGFHVWdablZ1WTNScGIyNGdaR1Z6WTNKcFltVnpPbHh1SUNwY2JpQXFJQ0FnSUNCU2RXNWxMbkJ5YjNSdmRIbHdaUzVsZG1Gc2RXRjBaU2dvWTI5dWRHVjRkQ3dnWTJoaGJtZGxMQ0J6ZEdGamF5a2dQVDRnZTF4dUlDb2dJQ0FnSUNBZ0lDOHZJQzR1TGx4dUlDb2dJQ0FnSUgwcE8xeHVJQ3BjYmlBcUlGTnZJSFJvWlNCaGJtRnNlWHBsY2lCamIzVnNaQ0JpWlRwY2JpQXFYRzRnS2lBZ0lDQm1kVzVqZEdsdmJpaGpiMjUwWlhoMExDQmphR0Z1WjJVc0lITjBZV05yS1NCN1hHNGdLaUFnSUNBZ0lDOHZJRVJ2SUhOdmJXVWdZMmhsWTJzZ1lXNWtJRzFoZVdKbElHTm9ZVzVuWldRZ2RHaGxJR052Ym5SbGVIUXVYRzRnS2lBZ0lDQWdJQzh2SUZSb1pTQnVaWGgwSUdGdVlXeDVlbVZ5SUhSdklIUm9aU0JwYm5SbGNuQnlaWFJsY2lCM2IzVnNaQ0JoWTJObGNIUWdkR2hsSUdGc2RHVnlibUYwWldSY2JpQXFJQ0FnSUNBZ0x5OGdZMjl1ZEdWNGRDQmhjeUIwYUdVZ1lYSm5kVzFsYm5RZ0oyTnZiblJsZUhRbkxseHVJQ29nSUNBZ0lDQmpiMjUwWlhoMExuTnZiV1ZHYkdGbklEMGdkSEoxWlR0Y2JpQXFJQ0FnSUNBZ0x5OGdWMmhsYmlCMGFHVnlaU0JwY3lCM2NtOXVaeXdnZEdoeWIzY2dhWFF1WEc0Z0tpQWdJQ0FnSUhSb2NtOTNJRzVsZHlCRmNuSnZjaWduVTI5dFpTQmhibUZzZVhwcGJtY2daWEp5YjNJbktUdGNiaUFxSUNBZ0lIMDdYRzRnS2x4dUlDb2dUbTkwWlNCMGFHRjBJSFJvWlNCaGJtRnNlWHBsY2lBb0oyRW5LU0IzYjNWc1pDQmlaU0JwYm5admEyVmtJSGRwZEdnZ1pXMXdkSGtnSjNSb2FYTW5JRzlpYW1WamRDeGNiaUFxSUhOdklIUm9aU0JtZFc1amRHbHZiaUJ5Wld4cFpYTWdiMjRnSjNSb2FYTW5JSE5vYjNWc1pDQmlhVzVrSUdsMGMyVnNaaUJtYVhKemRDNWNiaUFxTDF4dVVuVnVaUzVGZG1Gc2RXRjBaUzV3Y205MGIzUjVjR1V1WVc1aGJIbDZaWElnUFNCbWRXNWpkR2x2YmloaEtTQjdYRzRnSUhSb2FYTXVYMkZ1WVd4NWVtVnljeTV3ZFhOb0tHRXBPMXh1SUNCeVpYUjFjbTRnZEdocGN6dGNibjA3WEc1Y2JpOHFLbHh1SUNvZ1QyNWxJRVYyWVd4MVlYUmxJR05oYmlCdmJteDVJR2hoZG1VZ2IyNWxJR2x1ZEdWeWNISmxkR1Z5TENCaGJtUWdhWFFnZDI5MWJHUWdjbVYwZFhKdVhHNGdLaUIwYUdVZ1puVnVZM1JwYjI0Z1kyOTFiR1FnWTI5dWMzVnRaU0JsZG1WeWVTQnpkR0ZqYXlCamFHRnVaMlVnWm5KdmJTQW5VblZ1WlNObGRtRnNkV0YwWlNjdVhHNGdLbHh1SUNvZ1ZHaGxJR052WkdVZ2FYTWdZU0JzYVhSMGJHVWdZMjl0Y0d4cFkyRjBaV1E2SUhkbElHaGhkbVVnZEhkdklHdHBibVJ6SUc5bUlDZHlaV1IxWTJsdVp5YzZYRzRnS2lCdmJtVWdhWE1nZEc4Z2NtVmtkV05sSUdGc2JDQmhibUZzZVhwbGNuTWdkMmwwYUNCMGFHVWdjMmx1WjJ4bElHbHVZMjl0YVc1bklHTm9ZVzVuWlN4Y2JpQXFJR0Z1YjNSb1pYSWdhWE1nZEc4Z2NtVmtkV05sSUdGc2JDQnBibU52YldsdVp5QmphR0Z1WjJWeklIZHBkR2dnZEdocGN5QmhibUZzZVhwbGNuTWdLeUJwYm5SbGNuQnlaWFJsY2k1Y2JpQXFYRzRnS2lCVWFHVWdZVzVoYkhsNlpYSWdZVzVrSUdsdWRHVnljSEpsZEdWeUlITm9iM1ZzWkNCamFHRnVaMlVnZEdobElHTnZiblJsZUhRc0lIUnZJRzFsYlc5eWFYcGxJSFJvWlZ4dUlDb2djM1JoZEdWeklHOW1JSFJvWlNCbGRtRnNkV0YwYVc5dUxpQlVhR1VnWkdsbVptVnlaVzVqWlNCcGN5QnBiblJsY25CeVpYUmxjaUJ6YUc5MWJHUWdjbVYwZFhKdUlHOXVaVnh1SUNvZ2JtVjNJSE4wWVdOcklHbG1JR2wwSUc1bFpXUnpJSFJ2SUhWd1pHRjBaU0IwYUdVZ1pYaHBjM1JwYm1jZ2IyNWxMaUJVYUdVZ2MzUmhZMnNnYVhRZ2NtVjBkWEp1Y3lCM2IzVnNaRnh1SUNvZ2NtVndiR0ZqWlNCMGFHVWdaWGhwYzNScGJtY2diMjVsTENCemJ5QmhibmwwYUdsdVp5QnpkR2xzYkNCcGJpQjBhR1VnYjJ4a0lHOXVaU0IzYjNWc1pDQmlaU0IzYVhCbFpGeHVJQ29nYjNWMExpQlVhR1VnYVc1MFpYSndjbVYwWlhJZ1kyOTFiR1FnY21WMGRYSnVJRzV2ZEdocGJtY2dLQ2QxYm1SbFptbHVaV1FuS1NCMGJ5QnJaV1Z3SUhSb1pTQnpkR0ZqYTF4dUlDb2dkVzUwYjNWamFHVmtMbHh1SUNwY2JpQXFJRlJvWlNCaGJtRnNlWHBsY25NZ1lXNWtJR2x1ZEdWeWNISmxkR1Z5SUdOdmRXeGtJR05vWVc1blpTQjBhR1VnSjJOdmJuUmxlSFFuSUhCaGMzTWdkRzhnZEdobGJTNWNiaUFxSUVGdVpDQnphVzVqWlNCM1pTQnRZWGtnZFhCa1lYUmxJSFJvWlNCemRHRmpheUJoY3lCaFltOTJaU3dnZEdobElHTnZiblJsZUhRZ2MyaHZkV3hrSUcxbGJXOXlhWHBsWEc0Z0tpQjBhRzl6WlNCcGJtWnZjbTFoZEdsdmJpQnViM1FnZEc4Z1ltVWdiM1psY25keWFYUjBaVzRnZDJocGJHVWdkR2hsSUhOMFlXTnJJR2RsZENCM2FYQmxaQ0J2ZFhRdVhHNGdLbHh1SUNvZ1FXNWtJR2xtSUhSb1pTQnBiblJsY25CeVpYUnBibWNnYm05a1pTQnBjeUIwYUdVZ1pYaHBkQ0J1YjJSbElHOW1JSFJvWlNCelpYTnphVzl1TENCcGJuUmxjbkJ5WlhSbGNseHVJQ29nYzJodmRXeGtJSEpsZEhWeWJpQmhJRzVsZHlCemRHRmpheUJqYjI1MFlXbHVjeUJ2Ym14NUlHOXVaU0JtYVc1aGJDQnlaWE4xYkhRZ2JtOWtaUzRnU1dZZ2RHaGxjbVZjYmlBcUlHbHpJRzV2SUhOMVkyZ2dibTlrWlN3Z2RHaGxJSEpsYzNWc2RDQnZaaUIwYUdseklITmxjM05wYjI0Z2FYTWdKM1Z1WkdWbWFXNWxaQ2N1WEc0Z0tpOWNibEoxYm1VdVJYWmhiSFZoZEdVdWNISnZkRzkwZVhCbExtbHVkR1Z5Y0hKbGRHVnlJRDBnWm5WdVkzUnBiMjRvYVc1d2RDa2dlMXh1SUNBdkx5QlVhR1VnWTNWemRHOXRhWHBsWkNCc1lXNW5kV0ZuWlNCemFHOTFiR1FnWjJsMlpTQjBhR1VnWkdWbVlYVnNkQ0JqYjI1MFpYaDBMbHh1SUNCeVpYUjFjbTRnS0dOdmJuUmxlSFFzSUdOb1lXNW5aU3dnYzNSaFkyc3BJRDArSUh0Y2JpQWdJQ0IwY25rZ2UxeHVJQ0FnSUNBZ0x5OGdRVzVoYkhsNlpYSnpJR052ZFd4a0lHTm9ZVzVuWlNCMGFHVWdZMjl1ZEdWNGRDNWNiaUFnSUNBZ0lIUm9hWE11WDJGdVlXeDVlbVZ5Y3k1eVpXUjFZMlVvS0dOMGVDd2dZVzVoYkhsNlpYSXBJRDArSUh0Y2JpQWdJQ0FnSUNBZ1lXNWhiSGw2WlhJdVkyRnNiQ2g3ZlN3Z1kyOXVkR1Y0ZEN3Z1kyaGhibWRsTENCemRHRmpheWs3WEc0Z0lDQWdJQ0I5TENCamIyNTBaWGgwS1R0Y2JpQWdJQ0I5SUdOaGRHTm9LR1VwSUh0Y2JpQWdJQ0FnSUhSb2FYTXVYMmhoYm1Sc1pVVnljbTl5S0dVc0lHTnZiblJsZUhRc0lHTm9ZVzVuWlN3Z2MzUmhZMnNwTzF4dUlDQWdJSDFjYmlBZ0lDQXZMeUJCWm5SbGNpQmhibUZzZVhwbElHbDBMQ0JwYm5SbGNuQnlaWFFnZEdobElHNXZaR1VnWVc1a0lISmxkSFZ5YmlCMGFHVWdibVYzSUhOMFlXTnJJQ2hwWmlCaGJua3BMbHh1SUNBZ0lIWmhjaUJ1WlhkVGRHRmpheUE5SUdsdWNIUW9ZMjl1ZEdWNGRDd2dZMmhoYm1kbExDQnpkR0ZqYXlrN1hHNGdJQ0FnY21WMGRYSnVJRzVsZDFOMFlXTnJPMXh1SUNCOU8xeHVmVHRjYmx4dVVuVnVaUzVGZG1Gc2RXRjBaUzV3Y205MGIzUjVjR1V1WDJoaGJtUnNaVVZ5Y205eUlEMWNibVoxYm1OMGFXOXVLR1Z5Y2l3Z1kyOXVkR1Y0ZEN3Z1kyaGhibWRsTENCemRHRmpheWtnZTF4dUlDQXZMeUJVVDBSUE9pQmxlSEJoYm1RZ2FYUWdkRzhnY0hKdmRtbGtaU0J0YjNKbElITnZjR2hwYzNScFl5QmtaV0oxWjJkcGJtY2diV1Z6YzJGblpTNWNiaUFnZEdoeWIzY2dibVYzSUVWeWNtOXlLR0JYYUdWdUlHTm9ZVzVuWlNBa2UyTm9ZVzVuWlM1MGVYQmxmU0JqYjIxbGN5Qmxjbkp2Y2lBbkpIdGxjbko5SnlCb1lYQndaVzVsWkdBcE8xeHVmVHRjYmx4dVhHNWNiaThxS2lCWFJVSlFRVU5MSUVaUFQxUkZVaUFxS2x4dUlDb3FJQzR2YzNKakwzSjFibVV1YW5OY2JpQXFLaThpWFN3aWMyOTFjbU5sVW05dmRDSTZJaUo5XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuLi9kaXN0L3J1bmUuanNcbiAqKiBtb2R1bGUgaWQgPSA1OVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgRWZmZWN0IGZyb20gJ2RlbW8vZWZmZWN0LmpzJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gUnVudGltZSgpIHt9XG5cbi8qKlxuICogV2hlbiB0aGUgc3RhY2sgb2YgRFNMIGNoYW5nZXMsIGV2YWx1YXRlIHRoZSBMYW5ndWFnZS5Ob2RlLlxuICovXG5SdW50aW1lLnByb3RvdHlwZS5vbmNoYW5nZSA9IGZ1bmN0aW9uKGluc3RhbmNlLCBjaGFuZ2UsIHN0YWNrKSB7XG4gIC8vIFNpbmNlIHdlIGRvbid0IG5lZWQgdG8ga2VlcCB0aGluZ3MgaW4gc3RhY2sgdW50aWwgd2UgaGF2ZVxuICAvLyByZWFsIGFuYWx5emVycywgdGhlICdvbmNoYW5nZScgaGFuZGxlciB3b3VsZCByZXR1cm4gZW1wdHkgc3RhY2tcbiAgLy8gdG8gbGV0IHRoZSBsYW5ndWFnZSBydW50aW1lIGNsZWFyIHRoZSBzdGFjayBldmVyeSBpbnN0cnVjdGlvbi5cbiAgdmFyIHJlc3VsdCA9IHRoaXNbY2hhbmdlLnR5cGVdLmFwcGx5KHRoaXMsIGNoYW5nZS5hcmdzKTtcbiAgLy8gcmV0dXJuIGVtcHR5ICdoYW5kbGVkJyBzdGFjayB0byBsZXQgUnVuZSBrZWVwIG5vIHN0YXRlcyBvZlxuICAvLyBldmVyeSBpbnN0cnVjdGlvbiwgZXhjZXB0IHRoZSByZXN1bHQuXG4gIHJldHVybiBbIHJlc3VsdCBdO1xuICAvLyBUT0RPOiBob3cgdG8gY29uY2F0IGBlZmZlY3RgOyBob3cgdG8gcGFzcyBzaWduYWwgJiBkYXRhLCBub3Qgb25seSBkYXRhO1xufTtcblxuUnVudGltZS5EZWZlcnJlZCA9IGZ1bmN0aW9uKCkge1xuICB2YXIgcHJvbWlzZSA9IG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICB0aGlzLnJlc29sdmUgPSByZXNvbHZlO1xuICAgIHRoaXMucmVqZWN0ID0gcmVqZWN0O1xuICB9KTtcbiAgdGhpcy5wcm9taXNlID0gcHJvbWlzZTtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG5SdW50aW1lLkNvbnRleHQgPSBmdW5jdGlvbihlbnZpcm9ubWVudCkge1xuICB0aGlzLmRlZmVycmVkID0gbmV3IFJ1bnRpbWUuRGVmZXJyZWQoKTtcbiAgZm9yICh2YXIgbmFtZSBpbiBlbnZpcm9ubWVudCkge1xuICAgIHRoaXNbbmFtZV0gPSBlbnZpcm9ubWVudFtuYW1lXTtcbiAgfVxufTtcblxuLyoqXG4gKiBSZXR1cm5pbmcgd2lsbCBtb3ZlIHRoZSBtYWluIHByb2Nlc3MgdG8gdGhlIG5leHQgc3RlcC5cbiAqL1xuUnVudGltZS5Db250ZXh0LnByb3RvdHlwZS5yZXR1cm5zID0gZnVuY3Rpb24ocmV0dmFyKSB7XG4gIGlmIChhcmd1bWVudHMubGVuZ3RoID4gMSkge1xuICAgIHJldHZhciA9IEFycmF5LmZyb20oYXJndW1lbnRzKTtcbiAgfVxuICBpZiAoIXRoaXMuaW50ZXJydXB0ZWQpIHtcbiAgICB0aGlzLnJldHZhciA9IHJldHZhcjtcbiAgICB0aGlzLmRlZmVycmVkLnJlc29sdmUocmV0dmFyKTtcbiAgfSBlbHNlIHtcbiAgICAvLyBJZiBpdCdzIGFscmVhZHkgaW50ZXJydXB0ZWQsIGRvIG5vdGhpbmcuXG4gICAgLy8gSW4gdGhlb3J5IHRoaXMgc2hvdWxkIG51bGxpZnkgYWxsIGVmZmVjdHMsIHNpbmNlIHdlIHNob3VsZFxuICAgIC8vIG5ldmVyIGRvIGVmZmVjdCBkdXJpbmcgc3RlcHMuIFNvIGlmIGEgcHJvY2VzcyB3YXMgaW50ZXJydXB0ZWRcbiAgICAvLyBiZWZvcmUgaXQgZW5kcyBhbGwgZGF0ZSBtYW5pcHVsYXRpb24gc3RlcHMsIGl0IHNob3VsZCBkbyBub3RoaW5nLlxuICAgIHRoaXMuZGVmZXJyZWQucmVqZWN0KCk7XG4gIH1cbn07XG5cblJ1bnRpbWUuQ29udGV4dC5wcm90b3R5cGUucmFpc2UgPSBmdW5jdGlvbihlcnIpIHtcbiAgLy8gVGhlIGVycm9yIHdpbGwgYmUgY2FwdHVyZWQgYnkgbWFpbiBxdWV1ZSdzIGBvblByb2Nlc3NFcnJvcmAuXG4gIHRoaXMuZGVmZXJyZWQucmVqZWN0KGVycik7XG59O1xuXG5SdW50aW1lLkNvbnRleHQucHJvdG90eXBlLmludGVycnVwdCA9IGZ1bmN0aW9uKHJlc3VsdCwgcmVhc29uID0gJycpIHtcbiAgdGhpcy5yZXN1bHQgPSByZXN1bHQ7XG4gIHRoaXMuaW50ZXJydXB0ZWQgPSB0cnVlO1xuICAvLyBUaGUgaW50ZXJydXB0IHdpbGwgYmUgY2FwdHVyZWQgYnkgbWFpbiBxdWV1ZSdzIGBvblByb2Nlc3NFcnJvcmAuXG4gIHZhciBpbnRlcnJ1cHQgPSBuZXcgUnVudGltZS5JbnRlcnJ1cHQocmVhc29uKTtcbiAgdGhpcy5kZWZlcnJlZC5yZWplY3QoaW50ZXJydXB0KTtcbn07XG5cblJ1bnRpbWUuSW50ZXJydXB0ID0gZnVuY3Rpb24oKSB7fTtcblxuUnVudGltZS5wcm90b3R5cGUub25Qcm9jZXNzRXJyb3IgPSBmdW5jdGlvbihlcnIpIHtcbiAgaWYgKCEoZXJyIGluc3RhbmNlb2YgUnVudGltZS5JbnRlcnJ1cHQpKSB7XG4gICAgLy8gUHJpbnQgaXQgdG8gZGVidWcuXG4gICAgY29uc29sZS5lcnJvcihlcnIpO1xuICAgIC8vIFRoZW4gdG8gaW50ZXJydXB0IHRoZSBwcm9jZXNzLlxuICAgIHRocm93IGVycjtcbiAgfSBlbHNlIHtcbiAgICAvLyBPbmx5IHRvIGludGVycnVwdCB0aGUgcHJvY2Vzcy5cbiAgfVxufTtcblxuUnVudGltZS5wcm90b3R5cGUuc3RhcnQgPSBmdW5jdGlvbigpIHtcbiAgdmFyIGRlZmVycmVkID0gbmV3IFJ1bnRpbWUuRGVmZXJyZWQoKTtcbiAgdGhpcy5xdWV1ZSA9IGRlZmVycmVkLnByb21pc2U7XG4gIC8vIFdlIHdpbGwgcmVzb2x2ZSBpdCBhdCBgZG9uZWAgYW55d2F5LCBzb1xuICAvLyBgcmVqZWN0YCBkb2Vzbid0IG1hdHRlci5cbiAgdGhpcy5yZXNvbHZlID0gZGVmZXJyZWQucmVzb2x2ZTtcbiAgdGhpcy5yZWplY3QgPSBkZWZlcnJlZC5yZWplY3Q7XG4gIHRoaXMucmVzdWx0ID0gbnVsbDsgLy8gdGhlIHJlc3VsdCBmcm9tIGVhY2ggc3RlcC5cbiAgdGhpcy5lbnZpcm9ubWVudCA9IHt9O1xufTtcblxuUnVudGltZS5wcm90b3R5cGUuYXMgPSBmdW5jdGlvbihuYW1lKSB7XG4gIHRoaXMucXVldWUgPSB0aGlzLnF1ZXVlLnRoZW4oKCkgPT4ge1xuICAgIGlmICgndW5kZWZpbmVkJyAhPT0gdHlwZW9mIHRoaXMuZW52aXJvbm1lbnRbbmFtZV0pIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignU2NvcGVkIHZhcmlhYmxlIFxcJycgKyBuYW1lICsgJ1xcJyBkZWZpbmVkIHR3aWNlJyk7XG4gICAgfVxuICAgIGlmICgndW5kZWZpbmVkJyAhPT0gdHlwZW9mIFJ1bnRpbWUuQ29udGV4dC5wcm90b3R5cGVbbmFtZV0pIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignUmVmdXNlIHRvIG5hbWUgdmFyaWFibGUgYXMgY29udGV4dCByZXZlcnNlZCB3b3JkOiAnICtcbiAgICAgICAgJ1xcJycgKyBuYW1lICsgJ1xcJycpO1xuICAgIH1cbiAgICB0aGlzLmVudmlyb25tZW50W25hbWVdID0gdGhpcy5yZXN1bHQ7XG4gICAgcmV0dXJuIHRoaXMucmVzdWx0O1xuICB9KTtcbn07XG5cblJ1bnRpbWUucHJvdG90eXBlLmRvbmUgPSBmdW5jdGlvbigpIHtcbiAgdGhpcy5xdWV1ZSA9IHRoaXMucXVldWUuY2F0Y2godGhpcy5vblByb2Nlc3NFcnJvci5iaW5kKHRoaXMpKTtcbiAgdGhpcy5yZXNvbHZlKCk7IC8vIFNvIHRoZSBxdWV1ZSBzdGFydCB0byBleGVjdXRlLlxufTtcblxuUnVudGltZS5wcm90b3R5cGUuX2NyZWF0ZUNvbnRleHQgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIG5ldyBSdW50aW1lLkNvbnRleHQodGhpcy5lbnZpcm9ubWVudCk7XG59O1xuXG5SdW50aW1lLnByb3RvdHlwZS5uZXh0ID0gZnVuY3Rpb24oc3RlcCkge1xuICB0aGlzLnF1ZXVlID0gdGhpcy5xdWV1ZS50aGVuKCgpID0+IHtcbiAgICB2YXIgY29udGV4dCA9IHRoaXMuX2NyZWF0ZUNvbnRleHQoKTtcbiAgICBzdGVwKGNvbnRleHQsIHRoaXMucmVzdWx0KTtcbiAgICByZXR1cm4gY29udGV4dC5kZWZlcnJlZC5wcm9taXNlO1xuICB9KS50aGVuKChyZXN1bHQpID0+IHtcbiAgICBpZiAocmVzdWx0Lm5leHQpIHtcbiAgICAgIC8vIElmIGl0J3MgYWxzbyBhIFBsYXlsYW5nIHN0YXRlbWVudHMsIGNvbmNhdCBpdC5cbiAgICAgIHJldHVybiByZXN1bHQucXVldWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIE5vIG1hdHRlciBpdCdzIHZhbHVlIGZyb20gYW4gb3JkaW5hcnkgZnVuY3Rpb24gb3JcbiAgICAgIC8vIGEgUHJvbWlzZSwgcmV0dXJuaW5nIGl0IGlzIGxlZ2l0IGZvciBhIFByb21pc2UuXG4gICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cbiAgfSlcbiAgLnRoZW4oKHJlc3VsdCkgPT4ge1xuICAgIC8vIEdldCB0aGUgcmVzdWx0IGZyb20gbmV3UHJvbWlzZSBhbmQgc2V0IGl0LlxuICAgIHRoaXMucmVzdWx0ID0gcmVzdWx0O1xuICB9KTtcbn07XG5cblJ1bnRpbWUucHJvdG90eXBlLm1hdGNoID0gZnVuY3Rpb24oKSB7XG4gIC8vIENvbGxlY3QgYWxsICdjYXNlJyBQcm9taXNlcyBoZXJlLlxuICB0aGlzLnF1ZXVlID0gdGhpcy5xdWV1ZS50aGVuKCgpID0+IHtcbiAgICB0aGlzLm1hdGNoaW5nID0gW107XG4gICAgdGhpcy5tYXRjaGluZy5tYXRjaGVkID0gZmFsc2U7XG4gIH0pO1xufTtcblxuLy8gTWF0Y2hpbmcgZW5kOiBleGVjdXRlIGFsbCBtYXRjaGluZyBjYXNlcy5cblJ1bnRpbWUucHJvdG90eXBlLmVuZCA9IGZ1bmN0aW9uKCkge1xuICB0aGlzLnF1ZXVlID0gdGhpcy5xdWV1ZS50aGVuKCgpID0+IHtcbiAgICB0aGlzLm1hdGNoaW5nID0gbnVsbDtcbiAgfSk7XG59O1xuXG4vKipcbiAqIGBwcmVkYCBtdXN0IGJlIGEgc3luYyBmdW5jdGlvbiBvbmx5IHJldHVybiB0cnVlIG9yIGZhbHNlLlxuICogSWYgbXVsdGlwbGUgYGNhc2VgIGNhbiBtYXRjaCB0aGUgcmVzdWx0LCBvbmx5IHRoZSBmaXJzdCBtYXRjaGluZyBvbmVcbiAqIHdpbGwgYmUgZXhlY3V0ZWQgYW5kIGxlYXZlIHRoZSByZXN1bHQuXG4gKi9cblJ1bnRpbWUucHJvdG90eXBlLmNhc2UgPSBmdW5jdGlvbihwcmVkKSB7XG4gIHRoaXMucXVldWUgPSB0aGlzLnF1ZXVlLnRoZW4oKCkgPT4ge1xuICAgIHZhciBpZCA9IHRoaXMubWF0Y2hpbmcubGVuZ3RoO1xuICAgIC8vIEluIGEgYG1hdGNoYCwgd2UgZG9uJ3QgdXBkYXRlIHRoZSByZXN1bHQsXG4gICAgLy8gc28gZXZlcnkgYGNhc2VgIGNhbiBqdWRnZSBpZiBpdCdzIHRydWUuXG4gICAgdmFyIHByZWRyZXN1bHQgPSBwcmVkKHRoaXMucmVzdWx0KTtcbiAgICB0aGlzLm1hdGNoaW5nW2lkXSA9IHByZWRyZXN1bHQ7XG4gICAgcmV0dXJuIGlkO1xuICB9KTtcbn07XG5cblJ1bnRpbWUucHJvdG90eXBlLnRvID0gZnVuY3Rpb24oc3RlcCkge1xuICAvLyBJdCdzIGFsd2F5cyBjYXNlLi50bywgc28gd2Ugb25seSBuZWVkIHRvIGNvbmNhdFxuICAvLyAndG8nIHByb21pc2UgYWZ0ZXIgdGhlICdjYXNlJyBwcm9taXNlLlxuICB0aGlzLnF1ZXVlID0gdGhpcy5xdWV1ZS50aGVuKChpZCkgPT4ge1xuICAgIC8vIE9ubHkgYXBwZW5kIHRoZSBzdGVwIGlmIHRoZSBwcmV2aW91cyBvbmUgaXMgdHJ1ZS5cbiAgICBpZiAoIXRoaXMubWF0Y2hpbmcubWF0Y2hlZCAmJiB0aGlzLm1hdGNoaW5nW2lkXSkge1xuICAgICAgdGhpcy5tYXRjaGluZy5tYXRjaGVkID0gdHJ1ZTtcbiAgICAgIHZhciBjb250ZXh0ID0gdGhpcy5fY3JlYXRlQ29udGV4dCgpO1xuICAgICAgc3RlcChjb250ZXh0LCB0aGlzLnJlc3VsdCk7XG4gICAgICByZXR1cm4gY29udGV4dC5kZWZlcnJlZC5wcm9taXNlO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdGhpcy5yZXN1bHQ7XG4gICAgfVxuICB9KS50aGVuKChyZXN1bHQpID0+IHtcbiAgICBpZiAocmVzdWx0Lm5leHQpIHtcbiAgICAgIHJldHVybiByZXN1bHQucXVldWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuICB9KVxuICAudGhlbigocmVzdWx0KSA9PiB7XG4gICAgaWYgKHRoaXMubWF0Y2hpbmcubWF0Y2hlZCkge1xuICAgICAgdGhpcy5yZXN1bHQgPSByZXN1bHQ7XG4gICAgfVxuICAgIC8vIE9yLCBkbyBub3QgdXBkYXRlIHRoZSByZXN1bHQgaXQgZ290LlxuICB9KTtcbn07XG5cbi8qKlxuICogUmVtZW1iZXIgd2Ugd2lsbCBzd2FwIGBsb29wYCBhbmQgYHVudGlsYCBhdCBzeW50YXggbGV2ZWwsIHNvXG4gKiB3ZSBjYW4gZ2V0IHRoZSBwcmVkIGJlZm9yZSB3ZSBydW4gdGhlIGxvb3AuXG4gKlxuICogMS4gRmlyc3QgYXBwbHkgdGhlIGBwcmVkYCBvbiB0aGUgcHJldmlvdXMgcmVzdWx0LlxuICogMi4gSWYgdHJ1ZSwgY29uY2F0IHRoZSBpdGVyYXRpb24gYW5kIHRoZSBuZXcgcHJlZGljdGluZyBzdGVwIGFmdGVyXG4gKiAgICB0aGUgbG9vcGluZyBwcm9taXNlLiBBbmQgdGhlIHByZWRpY2F0aW9uIHdpbGwgY29uY2F0IG5ldyBpdGVyYXRpb25cbiAqICAgIGludG8gdGhlIHRoZSBwcm9taXNlIGlmIGl0J3MgdHJ1ZS5cbiAqXG4gKiBOb3RlOiBvbmx5IHdoZW4gdGhlIHByZWRpY2F0aW9uIGdpdmVzIGZhbHNlLCB0aGUgbG9vcGluZyBwcm9taXNlIGZvclxuICogdGhlIG1haW4gcXVldWUgd2lsbCByZXNvbHZlLCBzbyBpdCBjYW4gcnVuIHRoZSBsb29waW5nIHdoaWxlIGJsb2NraW5nXG4gKiB0aGUgbWFpbiBxdWV1ZS5cbiAqL1xuUnVudGltZS5wcm90b3R5cGUubG9vcCA9IGZ1bmN0aW9uKHN0ZXApIHtcbiAgdGhpcy5xdWV1ZSA9IHRoaXMucXVldWUudGhlbigoKSA9PiB7XG4gICAgdmFyIGxvb3BxdWV1ZSA9IHRoaXMubG9vcGluZy5sb29waW5ncHJvbWlzZTtcbiAgICB2YXIgcHJlZCA9IHRoaXMubG9vcGluZy5wcmVkO1xuXG4gICAgdmFyIGFwcGVuZCA9ICgpID0+IHtcbiAgICAgIHRoaXMubG9vcGluZy5sb29waW5ncHJvbWlzZS5wcm9taXNlID1cbiAgICAgICAgbG9vcHF1ZXVlLnRoZW4oKCkgPT4ge1xuICAgICAgICAgIHZhciBjb250ZXh0ID0gdGhpcy5fY3JlYXRlQ29udGV4dCgpO1xuICAgICAgICAgIHN0ZXAoY29udGV4dCwgdGhpcy5yZXN1bHQpO1xuICAgICAgICAgIHJldHVybiBjb250ZXh0LmRlZmVycmVkLnByb21pc2U7XG4gICAgICAgIH0pLnRoZW4oKHJlc3VsdCkgPT4ge1xuICAgICAgICAgIGlmIChyZXN1bHQubmV4dCkge1xuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdC5xdWV1ZTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKChyZXN1bHQpID0+IHtcbiAgICAgICAgICB0aGlzLnJlc3VsdCA9IHJlc3VsdDtcbiAgICAgICAgICBpZiAoIXByZWQodGhpcy5yZXN1bHQpKSB7XG4gICAgICAgICAgICBhcHBlbmQoKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5sb29waW5nLnF1ZXVlYmxvY2tlci5yZXNvbHZlKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9O1xuICAgIC8vIEZpcnN0IGl0ZXJhdGlvbi5cbiAgICBpZiAoIXByZWQodGhpcy5yZXN1bHQpKSB7XG4gICAgICBhcHBlbmQoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5sb29waW5nLnF1ZXVlYmxvY2tlci5yZXNvbHZlKCk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLmxvb3BpbmcucXVldWVibG9ja2VyLnByb21pc2U7XG4gIH0pO1xufTtcblxuLyoqXG4gKiBSZW1lbWJlciB3ZSB3aWxsIHN3YXAgYGxvb3BgIGFuZCBgdW50aWxgIGF0IHN5bnRheCBsZXZlbCwgc29cbiAqIHdlIGNhbiBnZXQgdGhlIHByZWQgYmVmb3JlIHdlIHJ1biB0aGUgbG9vcC5cbiAqL1xuUnVudGltZS5wcm90b3R5cGUudW50aWwgPSBmdW5jdGlvbihwcmVkKSB7XG4gIHRoaXMucXVldWUgPSB0aGlzLnF1ZXVlLnRoZW4oKCkgPT4ge1xuICAgIHRoaXMubG9vcGluZyA9IHtcbiAgICAgICdwcmVkJzogcHJlZCxcbiAgICAgICdsb29waW5ncHJvbWlzZSc6IFByb21pc2UucmVzb2x2ZSgpLFxuICAgICAgJ3F1ZXVlYmxvY2tlcic6IG5ldyBSdW50aW1lLkRlZmVycmVkKClcbiAgICB9O1xuICAgIC8vIEFmdGVyIHRoZSBsb29waW5nLCBjbGVhciBpdC5cbiAgICB0aGlzLmxvb3BpbmcucXVldWVibG9ja2VyLnByb21pc2UgPSBcbiAgICAgIHRoaXMubG9vcGluZy5xdWV1ZWJsb2NrZXIucHJvbWlzZS50aGVuKCgpID0+IHtcbiAgICAgICAgdGhpcy5sb29waW5nID0gbnVsbDtcbiAgICAgIH0pO1xuICB9KTtcbn07XG5cblJ1bnRpbWUucHJvdG90eXBlLmFueSA9IGZ1bmN0aW9uKCkge1xuICB2YXIgdXBkYXRlUmVzdWx0ID0gKHJlc3VsdCkgPT4ge1xuICAgIHRoaXMucmVzdWx0ID0gcmVzdWx0O1xuICB9O1xuICB2YXIgZ2VuZXJhdGVQcm9taXNlID0gKHN0ZXApID0+IHtcbiAgICB2YXIgbmV3UHJvbWlzZSA9IHN0ZXAodGhpcy5yZXN1bHQpO1xuICAgIGlmIChuZXdQcm9taXNlLm5leHQpIHtcbiAgICAgIHJldHVybiBuZXdQcm9taXNlLnF1ZXVlO1xuICAgIH0gZWxzZSBpZiAobmV3UHJvbWlzZS50aGVuKSB7XG4gICAgICByZXR1cm4gbmV3UHJvbWlzZTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gT3JkaW5hcnkgZnVuY3Rpb24gd2lsbCByZXR1cm4gdGhlIHJlc3VsdC5cbiAgICAgIHZhciBuZXdSZXN1bHQgPSBuZXdQcm9taXNlO1xuICAgICAgdXBkYXRlUmVzdWx0KG5ld1Jlc3VsdCk7XG4gICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKG5ld1Jlc3VsdCk7XG4gICAgfVxuICB9O1xuICB2YXIgY2FuZGlkYXRlcyA9IEFycmF5LmZyb20oYXJndW1lbnRzKTtcbiAgdGhpcy5xdWV1ZSA9IHRoaXMucXVldWUudGhlbigoKSA9PiB7XG4gICAgcmV0dXJuIFByb21pc2UucmFjZShjYW5kaWRhdGVzLm1hcCgoc3RlcCkgPT4ge1xuICAgICAgcmV0dXJuIGdlbmVyYXRlUHJvbWlzZShzdGVwKTtcbiAgICB9KSkudGhlbih1cGRhdGVSZXN1bHQpO1xuICB9KTtcbn07XG5cblJ1bnRpbWUucHJvdG90eXBlLmFueSA9IGZ1bmN0aW9uKCkge1xuICB2YXIgYW55ID0gdGhpcy5fcmFjZU9yQWxsKCdyYWNlJyk7XG4gIHZhciBjYW5kaWRhdGVzID0gQXJyYXkuZnJvbShhcmd1bWVudHMpO1xuICBhbnkuY2FsbCh0aGlzLCBjYW5kaWRhdGVzKTtcbn07XG5cblJ1bnRpbWUucHJvdG90eXBlLmFsbCA9IGZ1bmN0aW9uKCkge1xuICB2YXIgYWxsID0gdGhpcy5fcmFjZU9yQWxsKCdhbGwnKTtcbiAgdmFyIGNhbmRpZGF0ZXMgPSBBcnJheS5mcm9tKGFyZ3VtZW50cyk7XG4gIGFsbC5jYWxsKHRoaXMsIGNhbmRpZGF0ZXMpO1xufTtcblxuUnVudGltZS5wcm90b3R5cGUuZWZmZWN0ID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiBuZXcgRWZmZWN0KHRoaXMpO1xufTtcblxuUnVudGltZS5wcm90b3R5cGUuX3JhY2VPckFsbCA9IGZ1bmN0aW9uKHByb21pc2VNZXRob2QpIHtcbiAgdmFyIGdlbmVyYXRlZCA9IChjYW5kaWRhdGVzKSA9PiB7XG4gICAgdmFyIHVwZGF0ZVJlc3VsdCA9IChyZXN1bHQpID0+IHtcbiAgICAgIHRoaXMucmVzdWx0ID0gcmVzdWx0O1xuICAgIH07XG4gICAgdmFyIGdlbmVyYXRlUHJvbWlzZSA9IChzdGVwKSA9PiB7XG4gICAgICB2YXIgY29udGV4dCA9IG5ldyBSdW50aW1lLkNvbnRleHQoKTtcbiAgICAgIHN0ZXAoY29udGV4dCwgdGhpcy5yZXN1bHQpO1xuICAgICAgcmV0dXJuIGNvbnRleHQuZGVmZXJyZWQucHJvbWlzZVxuICAgICAgICAudGhlbigocmVzdWx0KSA9PiB7XG4gICAgICAgICAgaWYgKHJlc3VsdC5uZXh0KSB7XG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0LnF1ZXVlO1xuICAgICAgICAgIH0gZWxzZSBpZiAocmVzdWx0LnRoZW4pIHtcbiAgICAgICAgICAgIHJldHVybiByZXN1bHQudGhlbih1cGRhdGVSZXN1bHQpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyBPcmRpbmFyeSBmdW5jdGlvbiB3aWxsIHJldHVybiB0aGUgcGxhaW4gcmVzdWx0LlxuICAgICAgICAgICAgLy8gQW5kIHdlIG5lZWQgdG8gdHVybiBpdCBhcyBhIHByb21pc2UuXG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHJlc3VsdCk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9O1xuICAgIHRoaXMucXVldWUgPSB0aGlzLnF1ZXVlLnRoZW4oKCkgPT4ge1xuICAgICAgLy8gQ2F0Y2ggZ2VuZXJhdGVQcm9taXNlLlxuICAgICAgdHJ5IHtcbiAgICAgICAgdmFyIGFsbFByb21pc2VzID0gY2FuZGlkYXRlcy5tYXAoKHN0ZXApID0+IHtcbiAgICAgICAgICByZXR1cm4gZ2VuZXJhdGVQcm9taXNlKHN0ZXApO1xuICAgICAgICB9KTtcbiAgICAgICAgaWYgKCdyYWNlJyA9PT0gcHJvbWlzZU1ldGhvZCkge1xuICAgICAgICAgIHJldHVybiBQcm9taXNlLnJhY2UoYWxsUHJvbWlzZXMpLnRoZW4odXBkYXRlUmVzdWx0KTtcbiAgICAgICAgfSBlbHNlIGlmICgnYWxsJyA9PT0gcHJvbWlzZU1ldGhvZCkge1xuICAgICAgICAgIHJldHVybiBQcm9taXNlLmFsbChhbGxQcm9taXNlcykudGhlbih1cGRhdGVSZXN1bHQpO1xuICAgICAgICB9XG4gICAgICB9IGNhdGNoKGUpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihlKTtcbiAgICAgICAgdGhyb3cgZTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfTtcbiAgcmV0dXJuIGdlbmVyYXRlZDtcbn07XG5cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vcGxheWxhbmcucnVudGltZS5qc1xuICoqLyIsIm1vZHVsZS5leHBvcnRzID0geyBcImRlZmF1bHRcIjogcmVxdWlyZShcImNvcmUtanMvbGlicmFyeS9mbi9hcnJheS9mcm9tXCIpLCBfX2VzTW9kdWxlOiB0cnVlIH07XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuLi9+L2JhYmVsLXJ1bnRpbWUvY29yZS1qcy9hcnJheS9mcm9tLmpzXG4gKiogbW9kdWxlIGlkID0gNjFcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsInJlcXVpcmUoJy4uLy4uL21vZHVsZXMvZXM2LnN0cmluZy5pdGVyYXRvcicpO1xucmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9lczYuYXJyYXkuZnJvbScpO1xubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuLi8uLi9tb2R1bGVzLyQuY29yZScpLkFycmF5LmZyb207XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuLi9+L2JhYmVsLXJ1bnRpbWUvfi9jb3JlLWpzL2xpYnJhcnkvZm4vYXJyYXkvZnJvbS5qc1xuICoqIG1vZHVsZSBpZCA9IDYyXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIndXNlIHN0cmljdCc7XG52YXIgY3R4ICAgICAgICAgPSByZXF1aXJlKCcuLyQuY3R4JylcbiAgLCAkZGVmICAgICAgICA9IHJlcXVpcmUoJy4vJC5kZWYnKVxuICAsIHRvT2JqZWN0ICAgID0gcmVxdWlyZSgnLi8kLnRvLW9iamVjdCcpXG4gICwgY2FsbCAgICAgICAgPSByZXF1aXJlKCcuLyQuaXRlci1jYWxsJylcbiAgLCBpc0FycmF5SXRlciA9IHJlcXVpcmUoJy4vJC5pcy1hcnJheS1pdGVyJylcbiAgLCB0b0xlbmd0aCAgICA9IHJlcXVpcmUoJy4vJC50by1sZW5ndGgnKVxuICAsIGdldEl0ZXJGbiAgID0gcmVxdWlyZSgnLi9jb3JlLmdldC1pdGVyYXRvci1tZXRob2QnKTtcbiRkZWYoJGRlZi5TICsgJGRlZi5GICogIXJlcXVpcmUoJy4vJC5pdGVyLWRldGVjdCcpKGZ1bmN0aW9uKGl0ZXIpeyBBcnJheS5mcm9tKGl0ZXIpOyB9KSwgJ0FycmF5Jywge1xuICAvLyAyMi4xLjIuMSBBcnJheS5mcm9tKGFycmF5TGlrZSwgbWFwZm4gPSB1bmRlZmluZWQsIHRoaXNBcmcgPSB1bmRlZmluZWQpXG4gIGZyb206IGZ1bmN0aW9uIGZyb20oYXJyYXlMaWtlLyosIG1hcGZuID0gdW5kZWZpbmVkLCB0aGlzQXJnID0gdW5kZWZpbmVkKi8pe1xuICAgIHZhciBPICAgICAgID0gdG9PYmplY3QoYXJyYXlMaWtlKVxuICAgICAgLCBDICAgICAgID0gdHlwZW9mIHRoaXMgPT0gJ2Z1bmN0aW9uJyA/IHRoaXMgOiBBcnJheVxuICAgICAgLCBtYXBmbiAgID0gYXJndW1lbnRzWzFdXG4gICAgICAsIG1hcHBpbmcgPSBtYXBmbiAhPT0gdW5kZWZpbmVkXG4gICAgICAsIGluZGV4ICAgPSAwXG4gICAgICAsIGl0ZXJGbiAgPSBnZXRJdGVyRm4oTylcbiAgICAgICwgbGVuZ3RoLCByZXN1bHQsIHN0ZXAsIGl0ZXJhdG9yO1xuICAgIGlmKG1hcHBpbmcpbWFwZm4gPSBjdHgobWFwZm4sIGFyZ3VtZW50c1syXSwgMik7XG4gICAgLy8gaWYgb2JqZWN0IGlzbid0IGl0ZXJhYmxlIG9yIGl0J3MgYXJyYXkgd2l0aCBkZWZhdWx0IGl0ZXJhdG9yIC0gdXNlIHNpbXBsZSBjYXNlXG4gICAgaWYoaXRlckZuICE9IHVuZGVmaW5lZCAmJiAhKEMgPT0gQXJyYXkgJiYgaXNBcnJheUl0ZXIoaXRlckZuKSkpe1xuICAgICAgZm9yKGl0ZXJhdG9yID0gaXRlckZuLmNhbGwoTyksIHJlc3VsdCA9IG5ldyBDOyAhKHN0ZXAgPSBpdGVyYXRvci5uZXh0KCkpLmRvbmU7IGluZGV4Kyspe1xuICAgICAgICByZXN1bHRbaW5kZXhdID0gbWFwcGluZyA/IGNhbGwoaXRlcmF0b3IsIG1hcGZuLCBbc3RlcC52YWx1ZSwgaW5kZXhdLCB0cnVlKSA6IHN0ZXAudmFsdWU7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGZvcihyZXN1bHQgPSBuZXcgQyhsZW5ndGggPSB0b0xlbmd0aChPLmxlbmd0aCkpOyBsZW5ndGggPiBpbmRleDsgaW5kZXgrKyl7XG4gICAgICAgIHJlc3VsdFtpbmRleF0gPSBtYXBwaW5nID8gbWFwZm4oT1tpbmRleF0sIGluZGV4KSA6IE9baW5kZXhdO1xuICAgICAgfVxuICAgIH1cbiAgICByZXN1bHQubGVuZ3RoID0gaW5kZXg7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxufSk7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuLi9+L2JhYmVsLXJ1bnRpbWUvfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczYuYXJyYXkuZnJvbS5qc1xuICoqIG1vZHVsZSBpZCA9IDYzXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIvLyA3LjEuMTMgVG9PYmplY3QoYXJndW1lbnQpXG52YXIgZGVmaW5lZCA9IHJlcXVpcmUoJy4vJC5kZWZpbmVkJyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0KXtcbiAgcmV0dXJuIE9iamVjdChkZWZpbmVkKGl0KSk7XG59O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi4vfi9iYWJlbC1ydW50aW1lL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvJC50by1vYmplY3QuanNcbiAqKiBtb2R1bGUgaWQgPSA2NFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgSW50ZXJmYWNlIGZyb20gJ2RlbW8vZWZmZWN0LmludGVyZmFjZS5qcyc7XG5pbXBvcnQgUnVudGltZSBmcm9tICdkZW1vL2VmZmVjdC5ydW50aW1lLmpzJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gRWZmZWN0KHN0YXRlKSB7XG4gIHRoaXMuX3J1bnRpbWUgPSBuZXcgUnVudGltZShzdGF0ZSk7XG4gIHRoaXMuX2ludGVyZmFjZSA9IG5ldyBJbnRlcmZhY2UodGhpcy5fcnVudGltZSk7XG4gIHJldHVybiB0aGlzLl9pbnRlcmZhY2U7XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL2VmZmVjdC5qc1xuICoqLyIsIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IFJ1bmUgZnJvbSAnZGlzdC9ydW5lLmpzJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gSW50ZXJmYWNlKHJ1bnRpbWUpIHtcbiAgdGhpcy5jb250ZXh0ID0ge1xuICAgIHN0YXJ0ZWQ6IGZhbHNlLFxuICAgIHN0b3BwZWQ6IGZhbHNlLFxuICAgIGxvb3Bpbmc6IGZhbHNlLFxuICAgIG1hdGNoaW5nOiBmYWxzZVxuICB9O1xuICB0aGlzLnN0YWNrID0gW107XG4gIHRoaXMuX3J1bnRpbWUgPSBydW50aW1lO1xuICB0aGlzLl9ldmFsdWF0b3IgPSAobmV3IFJ1bmUuRXZhbHVhdGUoKSlcbiAgICAuYW5hbHl6ZXIodGhpcy5fYW5hbHl6ZU9yZGVyLmJpbmQodGhpcykpXG4gICAgLmludGVycHJldGVyKHRoaXMuX2ludGVycHJldC5iaW5kKHRoaXMpKTtcbn1cblxuSW50ZXJmYWNlLnByb3RvdHlwZS5zdGFydCA9IFJ1bmUuZGVmaW5lKCdzdGFydCcsICdiZWdpbicpO1xuSW50ZXJmYWNlLnByb3RvdHlwZS5kb25lID0gUnVuZS5kZWZpbmUoJ2RvbmUnLCAnZXhpdCcpO1xuSW50ZXJmYWNlLnByb3RvdHlwZS5ydW4gPSBSdW5lLmRlZmluZSgncnVuJywgJ2V4aXQnKTtcbkludGVyZmFjZS5wcm90b3R5cGUubmV4dCA9IFJ1bmUuZGVmaW5lKCduZXh0JywgJ3B1c2gnKTtcbkludGVyZmFjZS5wcm90b3R5cGUubWF0Y2ggPSBSdW5lLmRlZmluZSgnbWF0Y2gnLCAnYmVnaW4nKTtcbkludGVyZmFjZS5wcm90b3R5cGUuZW5kID0gUnVuZS5kZWZpbmUoJ2VuZCcsICdlbmQnKTtcbkludGVyZmFjZS5wcm90b3R5cGUuY2FzZSA9IFJ1bmUuZGVmaW5lKCdjYXNlJywgJ3B1c2gnKTtcbkludGVyZmFjZS5wcm90b3R5cGUudG8gPSBSdW5lLmRlZmluZSgndG8nLCAncHVzaCcpO1xuSW50ZXJmYWNlLnByb3RvdHlwZS5sb29wID0gUnVuZS5kZWZpbmUoJ2xvb3AnLCAnYmVnaW4nKTtcbkludGVyZmFjZS5wcm90b3R5cGUudW50aWwgPSBSdW5lLmRlZmluZSgndW50aWwnLCAnZW5kJyk7XG5cbkludGVyZmFjZS5wcm90b3R5cGUub25jaGFuZ2UgPSBmdW5jdGlvbihjb250ZXh0LCBub2RlLCBzdGFjaykge1xuICAvLyBXaGVuIGl0J3MgY2hhbmdlZCwgZXZhbHVhdGUgaXQgd2l0aCBhbmFseXplcnMgJiBpbnRlcnByZXRlci5cbiAgcmV0dXJuIHRoaXMuX2V2YWx1YXRvcihjb250ZXh0LCBub2RlLCBzdGFjayk7XG59O1xuXG5JbnRlcmZhY2UucHJvdG90eXBlLl9pbnRlcnByZXQgPSBmdW5jdGlvbihjb250ZXh0LCBub2RlLCBzdGFjaykge1xuICAvLyBXZWxsIGluIHRoaXMgZURTTCB3ZSBkZWxlZ2F0ZSB0aGUgaW50ZXJwcmV0aW9uIHRvIHRoZSBydW50aW1lLlxuICAvLyBXZSBkb24ndCBwYXNzIGNvbnRleHQgdG8gcnVudGltZSBzaW5jZSB0aGUgcnVudGltZSB3aWxsIGtlZXBcbiAgLy8gdGhlIGVzc2VudGlhbCBzdGF0ZXMgYnkgaXRzIG93bi5cbiAgcmV0dXJuIHRoaXMuX3J1bnRpbWUub25jaGFuZ2UuYXBwbHkodGhpcy5fcnVudGltZSwgYXJndW1lbnRzKTtcbn07XG5cbi8vIEluIHRoaXMgZURTTCB3ZSBub3cgb25seSBoYXZlIHRoaXMgYW5hbHl6ZXIuIENvdWxkIGFkZCBtb3JlIGFuZCByZWdpc3RlciBpdFxuLy8gaW4gdGhlIGNvbnRydWN0aW9uIG9mICd0aGlzLl9ldmFsdWF0b3InLlxuSW50ZXJmYWNlLnByb3RvdHlwZS5fYW5hbHl6ZU9yZGVyID0gZnVuY3Rpb24oY29udGV4dCwgY2hhbmdlLCBzdGFjaykge1xuICBpZiAoJ3N0YXJ0JyA9PT0gY2hhbmdlLnR5cGUpIHtcbiAgICBjb250ZXh0LnN0YXJ0ZWQgPSB0cnVlO1xuICB9IGVsc2UgaWYgKCdzdG9wJykge1xuICAgIGNvbnRleHQuc3RvcHBlZCA9IHRydWU7XG4gIH1cbiAgaWYgKCdzdGFydCcgPT09IGNoYW5nZS50eXBlICYmIGNvbnRleHQuc3RvcHBlZCkge1xuICAgIHRocm93IG5ldyBFcnJvcignU2hvdWxkIG5vdCBzdGFydCBhIHByb2Nlc3MgYWdhaW4nICtcbiAgICAgICAgJ2FmdGVyIGl0XFwncyBhbHJlYWR5IHN0b3BwZWQnKTtcbiAgfSBlbHNlIGlmICgnbmV4dCcgPT09IGNoYW5nZS50eXBlICYmICFjb250ZXh0LnN0YXJ0ZWQpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ1Nob3VsZCBub3QgY29uY2F0IHN0ZXBzIHdoaWxlIGl0XFwncyBub3Qgc3RhcnRlZCcpO1xuICB9IGVsc2UgaWYgKCdzdG9wJyA9PT0gY2hhbmdlLnR5cGUgJiYgIWNvbnRleHQuc3RhcnRlZCkge1xuICAgIHRocm93IG5ldyBFcnJvcignU2hvdWxkIG5vdCBzdG9wIGEgcHJvY2VzcyBiZWZvcmUgaXRcXCdzIHN0YXJ0ZWQnKTtcbiAgfVxufTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vZWZmZWN0LmludGVyZmFjZS5qc1xuICoqLyIsIid1c2Ugc3RyaWN0JztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gUnVudGltZShzdGF0ZSA9IG51bGwpIHtcbiAgLy8gQWNjdW1sYXRlZCBzdGF0ZSBuZWVkIHRvIGFwcGx5IGVmZmVjdHMsIGxpa2UgZGF0YSB0byByZW5kZXIuXG4gIC8vIElmIG5vbmUsIG1lYW5zIGl0J3MgYSBzdWItcHJvY2VkdXJlIG5lZWQgdG8gYmUgY29uY2F0ZWQuXG4gIHRoaXMuX3N0YXRlID0gc3RhdGU7XG4gIHRoaXMuX2RhdGEgPSBudWxsO1xufVxuXG4vKipcbiAqIFdoZW4gdGhlIHN0YWNrIG9mIERTTCBjaGFuZ2VzLCBldmFsdWF0ZSB0aGUgTGFuZ3VhZ2UuTm9kZS5cbiAqL1xuUnVudGltZS5wcm90b3R5cGUub25jaGFuZ2UgPSBmdW5jdGlvbihpbnN0YW5jZSwgY2hhbmdlLCBzdGFjaykge1xuICB2YXIgcmVzdWx0ID0gdGhpc1tjaGFuZ2UudHlwZV0uYXBwbHkodGhpcywgY2hhbmdlLmFyZ3MpO1xuICByZXR1cm4gWyByZXN1bHQgXTtcbn07XG5cblJ1bnRpbWUucHJvdG90eXBlLnN0YXJ0ID0gZnVuY3Rpb24oKSB7XG4gIHRoaXMuX2VmZmVjdFByb2NlZHVyZSA9IFtdO1xuICB0aGlzLl9jYXNlcyA9IFtdO1xufTtcblxuUnVudGltZS5wcm90b3R5cGUucnVuID0gZnVuY3Rpb24oKSB7XG4gIGlmICh0aGlzLl9zdGF0ZSkge1xuICAgIC8vIEFwcGVuZCBiZWZvcmUgd2UgYXBwZW5kIG91ciBFZmZlY3QgZnVuY3Rpb24uXG4gICAgLy8gU28gdGhhdCBpZiB0aGUgZXJyb3IgaXMgYW4gaW50ZXJydXB0aW9uIGFuZCBhbHJlYWR5IGNhcHR1cmVkXG4gICAgLy8gYnkgdGhlIGhhbmRsZXIsIGl0IHdpbGwgbm90IGVmZmVjdCB0aGUgZm9sbG93aW5nIHN0ZXBzLlxuICAgIHRoaXMuX3N0YXRlLnF1ZXVlID0gdGhpcy5fc3RhdGUucXVldWUuY2F0Y2goXG4gICAgICB0aGlzLl9zdGF0ZS5vblByb2Nlc3NFcnJvci5iaW5kKHRoaXMuX3N0YXRlKVxuICAgICk7XG5cbiAgICAvLyBDb25jYXQgdGhlIGJ1aWx0IGVmZmVjdCBhZnRlciB0aGUgYWNjdW11bGF0aW5nLlxuICAgIHRoaXMuX3N0YXRlLnF1ZXVlID0gdGhpcy5fc3RhdGUucXVldWUudGhlbigoKSA9PiB7XG4gICAgICAvLyBHZXQgdGhlIHJlc3VsdCBmcm9tIHRoZSBlbmRlZCBzdGF0ZS5cbiAgICAgIHZhciBkYXRhID0gdGhpcy5fc3RhdGUucmVzdWx0O1xuICAgICAgdGhpcy5fZWZmZWN0UHJvY2VkdXJlLmZvckVhY2goKHApID0+IHtcbiAgICAgICAgLy8gTm90ZTogYWxsIGNvbXBvc2VkIEVmZmVjdCBhbmQgbmF0aXZlIGZ1bmN0aW9uIHdpbGwgcmVjZWl2ZSB0aGVcbiAgICAgICAgLy8gc2FtZSBhY2N1bXVsYXRlZCByZXN1bHQgZnJvbSB0aGUgU3RhdGUsIGFuZCBpdCBzaG91bGQgYmUgY29uc2lkZXJlZFxuICAgICAgICAvLyBhcyBhbiBpbW11dGFibGUgdmFsdWUuIFRoaXMgbWVhbnMsIEVmZmVjdHMgb3IgZnVuY3Rpb25zIHNob3VsZCBub3RcbiAgICAgICAgLy8gbW9kaWZ5IGl0IGFuZCB0byBleHBlY3QgdGhlIG5leHQgb25lIGNhbiB1c2UgdGhlIG5ldyB2YWx1ZS5cbiAgICAgICAgcChkYXRhKTtcbiAgICAgIH0pO1xuICAgICAgdGhpcy5fZWZmZWN0UHJvY2VkdXJlLmxlbmd0aCA9IDA7XG4gICAgfSk7XG4gICAgdGhpcy5fc3RhdGUucmVzb2x2ZSgpO1xuICB9IGVsc2UgaWYgKHRoaXMuX2RhdGEpIHtcbiAgICAvLyBTdWJwcmVjdWR1cmUgb25seSBzdGFydHMgZnJvbSBhIGRhdGEuXG4gICAgdGhpcy5fZWZmZWN0UHJvY2VkdXJlLmZvckVhY2goKHApID0+IHtcbiAgICAgIC8vIE5vdGU6IGFsbCBjb21wb3NlZCBFZmZlY3QgYW5kIG5hdGl2ZSBmdW5jdGlvbiB3aWxsIHJlY2VpdmUgdGhlXG4gICAgICAvLyBzYW1lIGFjY3VtdWxhdGVkIHJlc3VsdCBmcm9tIHRoZSBTdGF0ZSwgYW5kIGl0IHNob3VsZCBiZSBjb25zaWRlcmVkXG4gICAgICAvLyBhcyBhbiBpbW11dGFibGUgdmFsdWUuIFRoaXMgbWVhbnMsIEVmZmVjdHMgb3IgZnVuY3Rpb25zIHNob3VsZCBub3RcbiAgICAgIC8vIG1vZGlmeSBpdCBhbmQgdG8gZXhwZWN0IHRoZSBuZXh0IG9uZSBjYW4gdXNlIHRoZSBuZXcgdmFsdWUuXG4gICAgICBwKHRoaXMuX2RhdGEpO1xuICAgIH0pO1xuICAgIHRoaXMuX2VmZmVjdFByb2NlZHVyZS5sZW5ndGggPSAwO1xuICAgIHRoaXMuX2RhdGEgPSBudWxsO1xuICB9XG59O1xuXG4vKipcbiAqIENsb3NlIHRoZSBwcm9jZWR1cmUgZGVmaW5pdGlvbiwgZG8gbm90aGluZy5cbiAqL1xuUnVudGltZS5wcm90b3R5cGUuZG9uZSA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gdGhpcztcbn07XG5cblJ1bnRpbWUucHJvdG90eXBlLm5leHQgPSBmdW5jdGlvbihzdGVwKSB7XG4gIHRoaXMuX2VmZmVjdFByb2NlZHVyZS5wdXNoKCgpID0+IHtcbiAgICBpZiAoJ2Z1bmN0aW9uJyAhPT0gdHlwZW9mKHN0ZXApKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1R5cGVFcnJvcjogc3RlcCBpcyBub3QgYSBmdW5jdGlvbjogJyArIHR5cGVvZihzdGVwKSk7XG4gICAgfVxuXG4gICAgdmFyIHJlc3VsdCA9IHN0ZXAoKTtcbiAgICBpZiAocmVzdWx0IGluc3RhbmNlb2YgUnVudGltZSkge1xuICAgICAgLy8gSXQncyBhIGdlbmVyYXRvciB0aGF0IGdlbmVyYXRlcyBuZXcgRWZmZWN0IGNoYWluLlxuICAgICAgLy8gU28gd2UgbmVlZCB0byBleGVjdXRlIGl0IG5vdy5cbiAgICAgIHJlc3VsdC5fZGF0YSA9IHRoaXMuX2RhdGE7XG4gICAgICByZXN1bHQucnVuKCk7XG4gICAgfVxuICAgIC8vIEVsc2UsIGl0IGlzIGEgcGxhaW4gZnVuY3Rpb24gYW5kIGl0J3MgZG9uZSB3aGVuIGV4ZWN1dGluZyBpdC5cbiAgfSk7XG59O1xuXG4vKipcbiAqIEEgcHVyZSBzeW50YXggbm9kZS5cbiAqL1xuUnVudGltZS5wcm90b3R5cGUubWF0Y2ggPSBmdW5jdGlvbigpIHtcbiAgdGhpcy5uZXh0KCgpID0+IHtcbiAgICB0aGlzLl9jYXNlcyA9IFtdO1xuICB9KTtcbn07XG5cbi8qKlxuICogVG8gbWFrZSBhIGZ1bmN0aW9uIHRlc3QgYWxsIGJyYW5jaGVzIHVudGlsIG9uZSBpcyB0cnVlLFxuICogYW5kIHRoZW4gcnVuIGl0IHdoZW4gdGhlIHByb2NlZHVyZSBpcyBleGVjdXRpbmcuXG4gKi9cblJ1bnRpbWUucHJvdG90eXBlLmVuZCA9IGZ1bmN0aW9uKCkge1xuICB0aGlzLm5leHQoKGRhdGEpID0+IHtcbiAgICB2YXIgY2FzZXMgPSB0aGlzLl9jYXNlcztcbiAgICBmb3IgKGxldCBicmFuY2ggb2YgY2FzZXMpIHtcbiAgICAgIGlmIChicmFuY2gucHJlZGljdGlvbihkYXRhKSkge1xuICAgICAgICBjb25zb2xlLmxvZygnPj4+Pj4+PiBpcyB0cnVlJyk7XG4gICAgICAgIGJyYW5jaC50b2RvKGRhdGEpO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG4gICAgY2FzZXMubGVuZ3RoID0gMDtcbiAgfSk7XG59O1xuXG4vKipcbiAqIGBwcmVkYCBtdXN0IGJlIGEgZnVuY3Rpb24gcmV0dXJuIHRydWUvZmFsc2UuXG4gKi9cblJ1bnRpbWUucHJvdG90eXBlLmNhc2UgPSBmdW5jdGlvbihwcmVkKSB7XG4gIHRoaXMubmV4dCgoKSA9PiB7XG4gICAgdGhpcy5fY2FzZXMucHVzaCh7XG4gICAgICAncHJlZGljdGlvbic6IHByZWQsXG4gICAgICAndG9kbyc6IG51bGxcbiAgICB9KTtcbiAgfSk7XG59O1xuXG4vKipcbiAqIGBzdGVwYDogYW5vdGhlciBFZmZlY3Qgb3IgbmF0aXZlIGZ1bmN0aW9uLlxuICovXG5SdW50aW1lLnByb3RvdHlwZS50byA9IGZ1bmN0aW9uKHN0ZXApIHtcbiAgdGhpcy5uZXh0KCgpID0+IHtcbiAgICB2YXIgYnJhbmNoID0gdGhpcy5fY2FzZXNbdGhpcy5fY2FzZXMubGVuZ3RoIC0gMV07XG4gICAgaWYgKHN0ZXAgaW5zdGFuY2VvZiBSdW50aW1lKSB7XG4gICAgICBjb25zb2xlLmxvZygnPj4+PiBzdGVwIGluc3RhbmNlb2YgUnVudGltZScpO1xuICAgICAgLy8gU2V0IGEgZnVuY3Rpb24gd2lsbCBleGVjdXRlIHRoZSBzdWJwcm9jZWR1cmUgd2hlbiBpdFxuICAgICAgLy8gaXMgY2FsbGVkIHdpdGggZGF0YS5cbiAgICAgIGJyYW5jaC50b2RvID0gKGRhdGEpID0+IHtcbiAgICAgICAgc3RlcC5fZGF0YSA9IGRhdGE7XG4gICAgICAgIHN0ZXAucnVuKCk7XG4gICAgICB9O1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zb2xlLmxvZygnPj4+PiBzdGVwIE5PVCBpbnN0YW5jZW9mIFJ1bnRpbWUnLCBzdGVwKTtcbiAgICAgIGJyYW5jaC50b2RvID0gc3RlcDtcbiAgICB9XG4gIH0pO1xufTtcblxuLyoqXG4gKiBSZW1lbWJlciB3ZSB3aWxsIHN3YXAgYGxvb3BgIGFuZCBgdW50aWxgIGF0IHN5bnRheCBsZXZlbCwgc29cbiAqIHdlIGNhbiBnZXQgdGhlIHByZWQgYmVmb3JlIHdlIHJ1biB0aGUgbG9vcC5cbiAqL1xuUnVudGltZS5wcm90b3R5cGUubG9vcCA9IGZ1bmN0aW9uKHN0ZXApIHtcbiAgdGhpcy5uZXh0KChkYXRhKSA9PiB7XG4gICAgdmFyIGxvb3BUaW1lcyA9IHRoaXMuX2xvb3BUaW1lcztcbiAgICB0aGlzLl9sb29wVGltZXMgPSBudWxsO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbG9vcFRpbWVzOyBpKyspIHtcbiAgICAgIGlmIChzdGVwIGluc3RhbmNlb2YgUnVudGltZSkge1xuICAgICAgICBjb25zb2xlLmxvZygnPj4+Pj5fX19fX19fICBsb29wLCBpbnN0YW5jZW9mJywgbG9vcFRpbWVzKTtcbiAgICAgICAgc3RlcC5fZGF0YSA9IGRhdGE7XG4gICAgICAgIHN0ZXAucnVuKCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzdGVwKGRhdGEpO1xuICAgICAgfVxuICAgIH1cbiAgfSk7XG59O1xuXG4vKipcbiAqIFJlbWVtYmVyIHdlIHdpbGwgc3dhcCBgbG9vcGAgYW5kIGB1bnRpbGAgYXQgc3ludGF4IGxldmVsLCBzb1xuICogd2UgY2FuIGdldCB0aGUgbG9vcCB0aW1lIGJlZm9yZSB3ZSBydW4gdGhlIGxvb3AuXG4gKlxuICogVGhlIGBwcmVkYCBzaG91bGQgYmUgYSBmdW5jdGlvbiByZXR1cm5zIGEgcG9zaXRpdmUgbnVtYmVyLFxuICogd2hpY2ggaXMgZ2VuZXJhdGVkIGZyb20gdGhlIGBkYXRhYC5cbiAqL1xuUnVudGltZS5wcm90b3R5cGUudW50aWwgPSBmdW5jdGlvbihwcmVkKSB7XG4gIHRoaXMubmV4dCgoZGF0YSkgPT4ge1xuICAgIHRoaXMuX2xvb3BUaW1lcyA9IHByZWQoZGF0YSk7XG4gICAgaWYgKCdudW1iZXInICE9PSB0eXBlb2YgdGhpcy5fbG9vcFRpbWVzKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1R5cGVFcnJvcjogbG9vcCB0aW1lcyBtdXN0IGJlIGEgbnVtYmVyLicpO1xuICAgIH0gZWxzZSBpZiAoMCA+IHRoaXMuX2xvb3BUaW1lcykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdMb29wIHRpbWVzIG11c3QgbGFyZ2VyIHRoYW4gMC4nKTtcbiAgICB9XG4gIH0pO1xufTtcblxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9lZmZlY3QucnVudGltZS5qc1xuICoqLyIsIm1vZHVsZS5leHBvcnRzID0geyBcImRlZmF1bHRcIjogcmVxdWlyZShcImNvcmUtanMvbGlicmFyeS9mbi9nZXQtaXRlcmF0b3JcIiksIF9fZXNNb2R1bGU6IHRydWUgfTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4uL34vYmFiZWwtcnVudGltZS9jb3JlLWpzL2dldC1pdGVyYXRvci5qc1xuICoqIG1vZHVsZSBpZCA9IDY4XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJyZXF1aXJlKCcuLi9tb2R1bGVzL3dlYi5kb20uaXRlcmFibGUnKTtcbnJlcXVpcmUoJy4uL21vZHVsZXMvZXM2LnN0cmluZy5pdGVyYXRvcicpO1xubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuLi9tb2R1bGVzL2NvcmUuZ2V0LWl0ZXJhdG9yJyk7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuLi9+L2JhYmVsLXJ1bnRpbWUvfi9jb3JlLWpzL2xpYnJhcnkvZm4vZ2V0LWl0ZXJhdG9yLmpzXG4gKiogbW9kdWxlIGlkID0gNjlcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsInZhciBhbk9iamVjdCA9IHJlcXVpcmUoJy4vJC5hbi1vYmplY3QnKVxuICAsIGdldCAgICAgID0gcmVxdWlyZSgnLi9jb3JlLmdldC1pdGVyYXRvci1tZXRob2QnKTtcbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi8kLmNvcmUnKS5nZXRJdGVyYXRvciA9IGZ1bmN0aW9uKGl0KXtcbiAgdmFyIGl0ZXJGbiA9IGdldChpdCk7XG4gIGlmKHR5cGVvZiBpdGVyRm4gIT0gJ2Z1bmN0aW9uJyl0aHJvdyBUeXBlRXJyb3IoaXQgKyAnIGlzIG5vdCBpdGVyYWJsZSEnKTtcbiAgcmV0dXJuIGFuT2JqZWN0KGl0ZXJGbi5jYWxsKGl0KSk7XG59O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi4vfi9iYWJlbC1ydW50aW1lL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvY29yZS5nZXQtaXRlcmF0b3IuanNcbiAqKiBtb2R1bGUgaWQgPSA3MFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIl0sInNvdXJjZVJvb3QiOiIifQ==