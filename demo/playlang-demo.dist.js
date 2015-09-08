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
	  ctx.interrupt('TEST INTERRUPT');
	  // `interrupts` should cancel the `returns`.
	  ctx.returns(3);
	}).next(function (ctx, rs) {
	  console.log('>>>>>>> should not run!');
	  ctx.returns(1);
	}).next(function (ctx, rs) {
	  console.log('>>>>>>> should not run!');
	  ctx.returns(1);
	}).effect().start().until(function () {
	  return 3;
	}).loop(function () {
	  console.log('>>>>>>> test loop');
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
	
	Runtime.Context.prototype.interrupt = function () {
	  var reason = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];
	
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
	  this[change.type].apply(this, change.args);
	  return [];
	};
	
	Runtime.prototype.start = function () {
	  this._effectProcedure = [];
	  this._cases = [];
	};
	
	Runtime.prototype.run = function () {
	  var _this = this;
	
	  if (this._state) {
	    // Concat the built effect after the accumulating.
	    this._state.queue = this._state.queue.then(function (data) {
	      _this._effectProcedure.forEach(function (p) {
	        // Note: all composed Effect and native function will receive the
	        // same accumulated result from the State, and it should be considered
	        // as an immutable value. This means, Effects or functions should not
	        // modify it and to expect the next one can use the new value.
	        p(data);
	      });
	      _this._effectProcedure.length = 0;
	    })['catch'](this._state.onProcessError.bind(this._state));
	    this._state.done();
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
	Runtime.prototype.done = function () {};
	
	Runtime.prototype.next = function (step) {
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
	Runtime.prototype.match = function () {
	  var _this2 = this;
	
	  this.next(function () {
	    _this2._cases = [];
	  });
	};
	
	/**
	 * To make a function test all branches until one is true,
	 * and then run it when the procedure is executing.
	 */
	Runtime.prototype.end = function () {
	  var _this3 = this;
	
	  this.next(function (data) {
	    var cases = _this3._cases;
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
	  var _this4 = this;
	
	  this.next(function () {
	    _this4._cases.push({
	      'prediction': pred,
	      'todo': null
	    });
	  });
	};
	
	/**
	 * `step`: another Effect or native function.
	 */
	Runtime.prototype.to = function (step) {
	  var _this5 = this;
	
	  this.next(function () {
	    var branch = _this5._cases[_this5._cases.length - 1];
	    if (step instanceof Runtime) {
	      // Set a function will execute the subprocedure when it
	      // is called with data.
	      branch.todo = function (data) {
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
	Runtime.prototype.loop = function (step) {
	  var _this6 = this;
	
	  this.next(function (data) {
	    var loopTimes = _this6._loopTimes;
	    _this6._loopTimes = null;
	    for (var i = 0; i < loopTimes; i++) {
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
	Runtime.prototype.until = function (pred) {
	  var _this7 = this;
	
	  this.next(function (data) {
	    _this7._loopTimes = pred(data);
	    if ('number' !== typeof _this7._loopTimes) {
	      throw new Error('TypeError: loop times must be a number.');
	    } else if (0 > _this7._loopTimes) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMjg5NWI1MmQ3Y2VmOGUyMTVlNDIiLCJ3ZWJwYWNrOi8vLy4vcGxheWxhbmctZGVtby5qcyIsIndlYnBhY2s6Ly8vLi4vfi9iYWJlbC1ydW50aW1lL2NvcmUtanMvcHJvbWlzZS5qcyIsIndlYnBhY2s6Ly8vLi4vfi9iYWJlbC1ydW50aW1lL34vY29yZS1qcy9saWJyYXJ5L2ZuL3Byb21pc2UuanMiLCJ3ZWJwYWNrOi8vLy4uL34vYmFiZWwtcnVudGltZS9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNi5zdHJpbmcuaXRlcmF0b3IuanMiLCJ3ZWJwYWNrOi8vLy4uL34vYmFiZWwtcnVudGltZS9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzLyQuc3RyaW5nLWF0LmpzIiwid2VicGFjazovLy8uLi9+L2JhYmVsLXJ1bnRpbWUvfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy8kLnRvLWludGVnZXIuanMiLCJ3ZWJwYWNrOi8vLy4uL34vYmFiZWwtcnVudGltZS9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzLyQuZGVmaW5lZC5qcyIsIndlYnBhY2s6Ly8vLi4vfi9iYWJlbC1ydW50aW1lL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvJC5pdGVyLWRlZmluZS5qcyIsIndlYnBhY2s6Ly8vLi4vfi9iYWJlbC1ydW50aW1lL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvJC5saWJyYXJ5LmpzIiwid2VicGFjazovLy8uLi9+L2JhYmVsLXJ1bnRpbWUvfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy8kLmRlZi5qcyIsIndlYnBhY2s6Ly8vLi4vfi9iYWJlbC1ydW50aW1lL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvJC5nbG9iYWwuanMiLCJ3ZWJwYWNrOi8vLy4uL34vYmFiZWwtcnVudGltZS9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzLyQuY29yZS5qcyIsIndlYnBhY2s6Ly8vLi4vfi9iYWJlbC1ydW50aW1lL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvJC5yZWRlZi5qcyIsIndlYnBhY2s6Ly8vLi4vfi9iYWJlbC1ydW50aW1lL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvJC5oaWRlLmpzIiwid2VicGFjazovLy8uLi9+L2JhYmVsLXJ1bnRpbWUvfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy8kLmpzIiwid2VicGFjazovLy8uLi9+L2JhYmVsLXJ1bnRpbWUvfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy8kLnByb3BlcnR5LWRlc2MuanMiLCJ3ZWJwYWNrOi8vLy4uL34vYmFiZWwtcnVudGltZS9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzLyQuc3VwcG9ydC1kZXNjLmpzIiwid2VicGFjazovLy8uLi9+L2JhYmVsLXJ1bnRpbWUvfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy8kLmZhaWxzLmpzIiwid2VicGFjazovLy8uLi9+L2JhYmVsLXJ1bnRpbWUvfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy8kLmhhcy5qcyIsIndlYnBhY2s6Ly8vLi4vfi9iYWJlbC1ydW50aW1lL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvJC53a3MuanMiLCJ3ZWJwYWNrOi8vLy4uL34vYmFiZWwtcnVudGltZS9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzLyQuc2hhcmVkLmpzIiwid2VicGFjazovLy8uLi9+L2JhYmVsLXJ1bnRpbWUvfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy8kLnVpZC5qcyIsIndlYnBhY2s6Ly8vLi4vfi9iYWJlbC1ydW50aW1lL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvJC5pdGVyYXRvcnMuanMiLCJ3ZWJwYWNrOi8vLy4uL34vYmFiZWwtcnVudGltZS9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzLyQuaXRlci1jcmVhdGUuanMiLCJ3ZWJwYWNrOi8vLy4uL34vYmFiZWwtcnVudGltZS9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzLyQudGFnLmpzIiwid2VicGFjazovLy8uLi9+L2JhYmVsLXJ1bnRpbWUvfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy8kLml0ZXItYnVnZ3kuanMiLCJ3ZWJwYWNrOi8vLy4uL34vYmFiZWwtcnVudGltZS9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL3dlYi5kb20uaXRlcmFibGUuanMiLCJ3ZWJwYWNrOi8vLy4uL34vYmFiZWwtcnVudGltZS9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNi5hcnJheS5pdGVyYXRvci5qcyIsIndlYnBhY2s6Ly8vLi4vfi9iYWJlbC1ydW50aW1lL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvJC51bnNjb3BlLmpzIiwid2VicGFjazovLy8uLi9+L2JhYmVsLXJ1bnRpbWUvfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy8kLml0ZXItc3RlcC5qcyIsIndlYnBhY2s6Ly8vLi4vfi9iYWJlbC1ydW50aW1lL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvJC50by1pb2JqZWN0LmpzIiwid2VicGFjazovLy8uLi9+L2JhYmVsLXJ1bnRpbWUvfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy8kLmlvYmplY3QuanMiLCJ3ZWJwYWNrOi8vLy4uL34vYmFiZWwtcnVudGltZS9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzLyQuY29mLmpzIiwid2VicGFjazovLy8uLi9+L2JhYmVsLXJ1bnRpbWUvfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczYucHJvbWlzZS5qcyIsIndlYnBhY2s6Ly8vLi4vfi9iYWJlbC1ydW50aW1lL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvJC5jdHguanMiLCJ3ZWJwYWNrOi8vLy4uL34vYmFiZWwtcnVudGltZS9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzLyQuYS1mdW5jdGlvbi5qcyIsIndlYnBhY2s6Ly8vLi4vfi9iYWJlbC1ydW50aW1lL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvJC5jbGFzc29mLmpzIiwid2VicGFjazovLy8uLi9+L2JhYmVsLXJ1bnRpbWUvfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy8kLmlzLW9iamVjdC5qcyIsIndlYnBhY2s6Ly8vLi4vfi9iYWJlbC1ydW50aW1lL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvJC5hbi1vYmplY3QuanMiLCJ3ZWJwYWNrOi8vLy4uL34vYmFiZWwtcnVudGltZS9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzLyQuc3RyaWN0LW5ldy5qcyIsIndlYnBhY2s6Ly8vLi4vfi9iYWJlbC1ydW50aW1lL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvJC5mb3Itb2YuanMiLCJ3ZWJwYWNrOi8vLy4uL34vYmFiZWwtcnVudGltZS9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzLyQuaXRlci1jYWxsLmpzIiwid2VicGFjazovLy8uLi9+L2JhYmVsLXJ1bnRpbWUvfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy8kLmlzLWFycmF5LWl0ZXIuanMiLCJ3ZWJwYWNrOi8vLy4uL34vYmFiZWwtcnVudGltZS9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzLyQudG8tbGVuZ3RoLmpzIiwid2VicGFjazovLy8uLi9+L2JhYmVsLXJ1bnRpbWUvfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9jb3JlLmdldC1pdGVyYXRvci1tZXRob2QuanMiLCJ3ZWJwYWNrOi8vLy4uL34vYmFiZWwtcnVudGltZS9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzLyQuc2V0LXByb3RvLmpzIiwid2VicGFjazovLy8uLi9+L2JhYmVsLXJ1bnRpbWUvfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy8kLnNhbWUuanMiLCJ3ZWJwYWNrOi8vLy4uL34vYmFiZWwtcnVudGltZS9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzLyQuc3BlY2llcy5qcyIsIndlYnBhY2s6Ly8vLi4vfi9iYWJlbC1ydW50aW1lL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvJC5taWNyb3Rhc2suanMiLCJ3ZWJwYWNrOi8vLy4uL34vYmFiZWwtcnVudGltZS9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzLyQudGFzay5qcyIsIndlYnBhY2s6Ly8vLi4vfi9iYWJlbC1ydW50aW1lL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvJC5pbnZva2UuanMiLCJ3ZWJwYWNrOi8vLy4uL34vYmFiZWwtcnVudGltZS9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzLyQuaHRtbC5qcyIsIndlYnBhY2s6Ly8vLi4vfi9iYWJlbC1ydW50aW1lL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvJC5kb20tY3JlYXRlLmpzIiwid2VicGFjazovLy8uLi9+L2JhYmVsLXJ1bnRpbWUvfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy8kLm1peC5qcyIsIndlYnBhY2s6Ly8vLi4vfi9iYWJlbC1ydW50aW1lL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvJC5pdGVyLWRldGVjdC5qcyIsIndlYnBhY2s6Ly8vLi4vfi9iYWJlbC1ydW50aW1lL2hlbHBlcnMvaW50ZXJvcC1yZXF1aXJlLWRlZmF1bHQuanMiLCJ3ZWJwYWNrOi8vLy4vcGxheWxhbmcuanMiLCJ3ZWJwYWNrOi8vLy4vcGxheWxhbmcuaW50ZXJmYWNlLmpzIiwid2VicGFjazovLy8uLi9kaXN0L3J1bmUuanMiLCJ3ZWJwYWNrOi8vLy4vcGxheWxhbmcucnVudGltZS5qcyIsIndlYnBhY2s6Ly8vLi4vfi9iYWJlbC1ydW50aW1lL2NvcmUtanMvYXJyYXkvZnJvbS5qcyIsIndlYnBhY2s6Ly8vLi4vfi9iYWJlbC1ydW50aW1lL34vY29yZS1qcy9saWJyYXJ5L2ZuL2FycmF5L2Zyb20uanMiLCJ3ZWJwYWNrOi8vLy4uL34vYmFiZWwtcnVudGltZS9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNi5hcnJheS5mcm9tLmpzIiwid2VicGFjazovLy8uLi9+L2JhYmVsLXJ1bnRpbWUvfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy8kLnRvLW9iamVjdC5qcyIsIndlYnBhY2s6Ly8vLi9lZmZlY3QuanMiLCJ3ZWJwYWNrOi8vLy4vZWZmZWN0LmludGVyZmFjZS5qcyIsIndlYnBhY2s6Ly8vLi9lZmZlY3QucnVudGltZS5qcyIsIndlYnBhY2s6Ly8vLi4vfi9iYWJlbC1ydW50aW1lL2NvcmUtanMvZ2V0LWl0ZXJhdG9yLmpzIiwid2VicGFjazovLy8uLi9+L2JhYmVsLXJ1bnRpbWUvfi9jb3JlLWpzL2xpYnJhcnkvZm4vZ2V0LWl0ZXJhdG9yLmpzIiwid2VicGFjazovLy8uLi9+L2JhYmVsLXJ1bnRpbWUvfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9jb3JlLmdldC1pdGVyYXRvci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsdUJBQWU7QUFDZjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7OztBQ3RDQSxhQUFZLENBQUM7Ozs7Ozt1Q0FFUSxFQUFlOzs7O0FBRXBDLEtBQUksUUFBUSxHQUFHLDZCQUFjLENBQUM7QUFDOUIsU0FBUSxDQUFDLEtBQUssRUFBRSxDQUNiLElBQUksQ0FBQyxVQUFDLEdBQUcsRUFBSztBQUFFLFVBQU8sQ0FBQyxHQUFHLENBQUMsdUJBQXVCLEVBQUUsQ0FBQyxDQUFDLENBQUUsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQ25GLEtBQUssQ0FBQyxVQUFDLENBQUM7VUFBSyxDQUFDLEtBQUssQ0FBQztFQUFBLENBQUMsQ0FDckIsSUFBSSxDQUFDLFVBQUMsR0FBRyxFQUFFLENBQUMsRUFBSztBQUNoQixNQUFHLENBQUMsT0FBTyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztFQUNwQixDQUFDLENBQ0QsS0FBSyxDQUFDLFVBQUMsQ0FBQztVQUFLLENBQUMsS0FBSyxDQUFDO0VBQUEsQ0FBQyxDQUNyQixJQUFJLENBQUMsVUFBQyxHQUFHLEVBQUUsQ0FBQyxFQUFLO0FBQ2hCLFVBQU8sQ0FBQyxHQUFHLENBQUMsMkJBQTJCLENBQUMsQ0FBQztBQUN6QyxNQUFHLENBQUMsT0FBTyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztFQUNwQixDQUFDLENBQ0QsS0FBSyxDQUFDLFVBQUMsQ0FBQztVQUFLLENBQUMsS0FBSyxFQUFFO0VBQUEsQ0FBQyxDQUN0QixJQUFJLENBQUMsVUFBQyxHQUFHLEVBQUUsQ0FBQyxFQUFLO0FBQ2hCLFVBQU8sQ0FBQyxHQUFHLENBQUMsMkJBQTJCLENBQUMsQ0FBQztBQUN6QyxNQUFHLENBQUMsT0FBTyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztFQUNwQixDQUFDLENBQ0QsSUFBSSxDQUFDLFVBQUMsR0FBRyxFQUFFLENBQUMsRUFBSztBQUFFLFVBQU8sQ0FBQyxHQUFHLENBQUMsdUJBQXVCLEVBQUUsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBRSxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztFQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQ2hHLElBQUksQ0FBQyxVQUFDLEdBQUcsRUFBSztBQUNiLFVBQU8sQ0FBQyxHQUFHLENBQUMscUJBQXFCLEVBQUUsR0FBRyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDbEQsTUFBRyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUM1QixDQUFDLENBQ0QsS0FBSyxFQUFFLFFBQ0QsQ0FBQyxVQUFDLENBQUM7VUFBSyxDQUFDLEdBQUcsRUFBRTtFQUFBLENBQUMsQ0FBQyxFQUFFLENBQUMsVUFBQyxHQUFHLEVBQUUsQ0FBQyxFQUFLO0FBQUUsTUFBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7RUFBQyxDQUFDLFFBQ3RELENBQUMsVUFBQyxDQUFDO1VBQUssQ0FBQyxH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QUFNLENBQUMsQ0FBQztBQUN2RCxVQUFTLENBQUMsU0FBUyxDQUFDLE1BQU0sR0FBRyx3QkFBSyxNQUFNLENBQUMsUUFBUSxFQUFFLE1BQU0sQ0FBQyxDQUFDO0FBQzNELFVBQVMsQ0FBQyxTQUFTLENBQUMsSUFBSSxHQUFHLHdCQUFLLE1BQU0sQ0FBQyxNQUFNLEVBQUUsTUFBTSxDQUFDLENBQUM7QUFDdkQsVUFBUyxDQUFDLFNBQVMsQ0FBQyxLQUFLLEdBQUcsd0JBQUssTUFBTSxDQUFDLE9BQU8sRUFBRSxPQUFPLENBQUMsQ0FBQztBQUMxRCxVQUFTLENBQUMsU0FBUyxDQUFDLEdBQUcsR0FBRyx3QkFBSyxNQUFNLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQyxDQUFDO0FBQ3BELFVBQVMsQ0FBQyxTQUFTLFFBQUssR0FBRyx3QkFBSyxNQUFNLENBQUMsTUFBTSxFQUFFLE1BQU0sQ0FBQyxDQUFDO0FBQ3ZELFVBQVMsQ0FBQyxTQUFTLENBQUMsRUFBRSxHQUFHLHdCQUFLLE1BQU0sQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDLENBQUM7QUFDbkQsVUFBUyxDQUFDLFNBQVMsQ0FBQyxFQUFFLEdBQUcsd0JBQUssTUFBTSxDQUFDLElBQUksRUFBRSxNQUFNLENBQUMsQ0FBQztBQUNuRCxVQUFTLENBQUMsU0FBUyxDQUFDLElBQUksR0FBRyx3QkFBSyxNQUFNLENBQUMsTUFBTSxFQUFFLE9BQU8sQ0FBQyxDQUFDO0FBQ3hELFVBQVMsQ0FBQyxTQUFTLENBQUMsS0FBSyxHQUFHLHdCQUFLLE1BQU0sQ0FBQyxPQUFPLEVBQUUsS0FBSyxDQUFDLENBQUM7QUFDeEQsVUFBUyxDQUFDLFNBQVMsQ0FBQyxHQUFHLEdBQUcsd0JBQUssTUFBTSxDQUFDLEtBQUssRUFBRSxNQUFNLENBQUMsQ0FBQztBQUNyRCxVQUFTLENBQUMsU0FBUyxDQUFDLEdBQUcsR0FBRyx3QkFBSyxNQUFNLENBQUMsS0FBSyxFQUFFLE1BQU0sQ0FBQyxDQUFDOztBQUVyRCxVQUFTLENBQUMsU0FBUyxDQUFDLFFBQVEsR0FBRyxVQUFTLE9BQU8sRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFOztBQUU1RCxVQUFPLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsQ0FBQztFQUM5QyxDQUFDOztBQUVGLFVBQVMsQ0FBQyxTQUFTLENBQUMsVUFBVSxHQUFHLFVBQVMsT0FBTyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUU7Ozs7QUFJOUQsVUFBTyxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxTQUFTLENBQUMsQ0FBQztFQUMvRCxDQUFDOzs7O0FBSUYsVUFBUyxDQUFDLFNBQVMsQ0FBQyxhQUFhLEdBQUcsVUFBUyxPQUFPLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRTtBQUNuRSxPQUFJLE9BQU8sS0FBSyxNQUFNLENBQUMsSUFBSSxFQUFFO0FBQzNCLFlBQU8sQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO0lBQ3hCLE1BQU0sSUFBSSxNQUFNLEVBQUU7QUFDakIsWUFBTyxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7SUFDeEI7QUFDRCxPQUFJLE9BQU8sS0FBSyxNQUFNLENBQUMsSUFBSSxJQUFJLE9BQU8sQ0FBQyxPQUFPLEVBQUU7QUFDOUMsV0FBTSxJQUFJLEtBQUssQ0FBQyxrQ0FBa0MsR0FDOUMsNkJBQTZCLENBQUMsQ0FBQztJQUNwQyxNQUFNLElBQUksTUFBTSxLQUFLLE1BQU0sQ0FBQyxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFO0FBQ3JELFdBQU0sSUFBSSxLQUFLLENBQUMsaURBQWlELENBQUMsQ0FBQztJQUNwRSxNQUFNLElBQUksTUFBTSxLQUFLLE1BQU0sQ0FBQyxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFO0FBQ3JELFdBQU0sSUFBSSxLQUFLLENBQUMsZ0RBQWdELENBQUMsQ0FBQztJQUNuRTtFQUNGLENBQUM7Ozs7Ozs7QUNyRUYsa0JBQWlCLDZCQUE2QixFQUFFLHVDQUF1QztBQUN2RjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3QkFBdUI7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0NBQThDO0FBQzlDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBZ0IsV0FBVztBQUMzQjtBQUNBO0FBQ0EsYUFBWTtBQUNaO0FBQ0E7QUFDQSxTQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUU7QUFDRjs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFD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Q0FBQyxnQ0FBZ0MsQ0FBQyxDQUFDO01BQ25EO0lBQ0YsQ0FBQyxDQUFDO0VBQ0osQ0FBQzs7Ozs7OztBQy9KRixtQkFBa0Isd0Q7Ozs7OztBQ0FsQjtBQUNBO0FBQ0EsMEM7Ozs7OztBQ0ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEciLCJmaWxlIjoicGxheWxhbmctZGVtby5kaXN0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGV4cG9ydHM6IHt9LFxuIFx0XHRcdGlkOiBtb2R1bGVJZCxcbiBcdFx0XHRsb2FkZWQ6IGZhbHNlXG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiB3ZWJwYWNrL2Jvb3RzdHJhcCAyODk1YjUyZDdjZWY4ZTIxNWU0MlxuICoqLyIsIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IFBsYXlsYW5nIGZyb20gJy4vcGxheWxhbmcuanMnO1xuXG52YXIgcGxheWxhbmcgPSBuZXcgUGxheWxhbmcoKTtcbnBsYXlsYW5nLnN0YXJ0KClcbiAgLm5leHQoKGN0eCkgPT4geyBjb25zb2xlLmxvZygnPj4+Pj4+Pj4+PiAjMDogMyBhcyBhJywgMyk7IGN0eC5yZXR1cm5zKDMpOyB9KS5hcygnYScpXG4gIC51bnRpbCgoeCkgPT4geCA9PT0gOSlcbiAgLmxvb3AoKGN0eCwgeCkgPT4ge1xuICAgIGN0eC5yZXR1cm5zKHggKyAxKTtcbiAgfSlcbiAgLnVudGlsKCh4KSA9PiB4ID09PSA5KVxuICAubG9vcCgoY3R4LCB4KSA9PiB7XG4gICAgY29uc29sZS5sb2coJz4+Pj4+Pj4gSSBzaG91bGQgbm90IHJ1biEnKTtcbiAgICBjdHgucmV0dXJucyh4ICsgMSk7XG4gIH0pXG4gIC51bnRpbCgoeCkgPT4geCA9PT0gMTApXG4gIC5sb29wKChjdHgsIHgpID0+IHtcbiAgICBjb25zb2xlLmxvZygnPj4+Pj4+PiBJIHNob3VsZCBydW4gb25jZScpO1xuICAgIGN0eC5yZXR1cm5zKHggKyAxKTtcbiAgfSlcbiAgLm5leHQoKGN0eCwgeCkgPT4geyBjb25zb2xlLmxvZygnPj4+Pj4+Pj4gIzE6ICsgNCBhcyBiJywgeCwgeCArIDQpOyBjdHgucmV0dXJucyh4ICsgNCk7fSkuYXMoJ2InKVxuICAubmV4dCgoY3R4KSA9PiB7XG4gICAgY29uc29sZS5sb2coJz4+Pj4+Pj4+PiAjICsgYSBiOiAnLCBjdHguYSArIGN0eC5iKTtcbiAgICBjdHgucmV0dXJucyhjdHguYSArIGN0eC5iKTtcbiAgfSlcbiAgLm1hdGNoKClcbiAgICAuY2FzZSgobikgPT4gbiA8IDE3KS50bygoY3R4LCBhKSA9PiB7IGN0eC5yZXR1cm5zKGEgKyAxKTt9KVxuICAgIC5jYXNlKChuKSA9PiBuID4gMTcgKS50bygoY3R4LCBiKSA9PiB7IGN0eC5yZXR1cm5zKGIgKyA5OTkpO30pXG4gICAgLmNhc2UoKG4pID0+IG4gPT09IDE3ICkudG8oKGN0eCwgYykgPT4ge1xuICAgICAgbmV3IFByb21pc2UoKHIsIGopID0+IHtcbiAgICAgICAgc2V0VGltZW91dChyLCAyMDAwKTtcbiAgICAgIH0pLnRoZW4oKCkgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZygnPj4+Pj4+Pj4+ICMgYWZ0ZXIgd2FpdGluZyAyIHNlY3M7ICsgMTogJyxjICxjICsgMSk7XG4gICAgICAgIGN0eC5yZXR1cm5zKGMrMSk7XG4gICAgICB9KTtcbiAgICB9KVxuICAgIC5jYXNlKChuKSA9PiBuID09PSAxNyApLnRvKChjdHgsIGQpID0+IHtcbiAgICAgIGN0eC5yZXR1cm5zKGQgLSAyNTUpO1xuICAgIH0pXG4gIC5lbmQoKVxuICAubmV4dCgoY3R4LCB4KSA9PiB7IGNvbnNvbGUubG9nKCc+Pj4+Pj4+PiAjICsgNTonLCB4LCB4ICsgNSk7IGN0eC5yZXR1cm5zKHggKyA1KTt9KVxuICAuYWxsKChjdHgpID0+IHtjdHgucmV0dXJucygxKTsgfSxcbiAgICAgIChjdHgpID0+IHtcbiAgICAgICAgY3R4LnJldHVybnMobmV3IFByb21pc2UoKHIsIGopID0+IHtcbiAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHsgcigyMCk7IH0sIDEwMDApO1xuICAgICAgICB9KSk7XG4gICAgICB9KVxuICAubmV4dCgoY3R4LCBycykgPT4ge1xuICAgIGNvbnNvbGUubG9nKCc+Pj4+Pj4+Pj4gIyBhZnRlciB8YWxsfDogJywgcnMpO1xuICAgIGN0eC5yZXR1cm5zKHJzKTtcbiAgfSlcbiAgLmFueSgoY3R4LCBycykgPT4ge2N0eC5yZXR1cm5zKHJzWzBdICsgcnNbMV0pOyB9LFxuICAgICAgKGN0eCwgcnMpID0+IHtcbiAgICAgICAgY3R4LnJldHVybnMobmV3IFByb21pc2UoKHIsIGopID0+IHtcbiAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHsgcihyc1swXSAtIHJzWzFdKTsgfSwgMTAwMCk7XG4gICAgICAgIH0pKTtcbiAgICAgIH0pXG4gIC5uZXh0KChjdHgsIHIpID0+IHtcbiAgICBjb25zb2xlLmxvZygnPj4+Pj4+Pj4+ICMgYWZ0ZXIgfGFueXw7IHJlc2V0IGFzIFsxLCAyLCAzXTogJywgcik7XG4gICAgY3R4LnJldHVybnMoMSwgMiwgMyk7XG4gIH0pXG4gIC5uZXh0KChjdHgsIHJzKSA9PiB7XG4gICAgY29uc29sZS5sb2coJz4+Pj4+Pj4+PiAjIHJldHVybiBtdWx0aXBsZSB2YWx1ZXMgd2lsbCBiZWNvbWUgYXJyYXk6ICcsIHJzKTtcbiAgICBjdHgucmV0dXJucygxKTtcbiAgfSlcbiAgLm5leHQoKGN0eCkgPT4ge1xuICAgIGNvbnNvbGUubG9nKCc+Pj4+PiB0cnkgdG8gcmFpc2UgZXJyb3Igb3IgaW50ZXJydXB0aW9uJyk7XG4gICAgLy9jdHgucmFpc2UoJ1RSWSBUTyBSQUlTRScpO1xuICAgIGN0eC5pbnRlcnJ1cHQoJ1RFU1QgSU5URVJSVVBUJyk7XG4gICAgLy8gYGludGVycnVwdHNgIHNob3VsZCBjYW5jZWwgdGhlIGByZXR1cm5zYC5cbiAgICBjdHgucmV0dXJucygzKTtcbiAgfSlcbiAgLm5leHQoKGN0eCwgcnMpID0+IHtcbiAgICBjb25zb2xlLmxvZygnPj4+Pj4+PiBzaG91bGQgbm90IHJ1biEnKTtcbiAgICBjdHgucmV0dXJucygxKTtcbiAgfSlcbiAgLm5leHQoKGN0eCwgcnMpID0+IHtcbiAgICBjb25zb2xlLmxvZygnPj4+Pj4+PiBzaG91bGQgbm90IHJ1biEnKTtcbiAgICBjdHgucmV0dXJucygxKTtcbiAgfSlcbiAgLmVmZmVjdCgpXG4gIC5zdGFydCgpXG4gIC51bnRpbCgoKSA9PiAzKVxuICAubG9vcCgoKSA9PiB7XG4gICAgY29uc29sZS5sb2coJz4+Pj4+Pj4gdGVzdCBsb29wJyk7XG4gIH0pXG4gIC5ydW4oKTtcblxuLypcblxuZm4gPSAoY3R4LCBhLCBiKSA9PiB7XG4gIHZhciBwID0gbmV3IFBsYXlsYW5nKClcbiAgY3R4LnJldHVybnMocC5zdGFydCgpLm5leHQoKGN0eCkgPT4ge1xuICAgIC8vIEl0J3MgZ29vZCB0byBzaGFkb3dpbmcgdGhlIG91dGVyIG9uZSxcbiAgICAvLyBzaW5jZSB3ZSBhbHJlYWR5IGJvb2tlZCB0byByZXR1cm4gdGhhdC5cbiAgICBjdHgucmV0dXJucyhhICsgYik7XG4gIH0pKTtcbn07XG5cbi8vIERPTlQgVVNFOyBOT1QgSU1QTEVNRU5URUQgSU5URU5USU9OQUxMWVxuZ24gPSAoY3R4LCBhLCBiKSA9PiB7XG4gIHZhciBwID0gbmV3IFBsYXlsYW5nKClcbiAgY3R4LnJldHVybnMobmV3IFByb21pc2UoKHIsIGopID0+IHtcbiAgICBzZXRUaW1lb3V0KHIoYSAtIGIpLCAxMDAwKTtcbiAgfSkudGhlbigocmVzdWx0KSA9PiB7XG4gICAgcmV0dXJuIHJlc3VsdCArIDE7XG4gIH0pKTtcbn07XG5cbmhuID0gKGN0eCwgYSwgYikgPT4ge1xuICB2YXIgcCA9IG5ldyBQbGF5bGFuZygpXG4gIChuZXcgUHJvbWlzZSgociwgaikgPT4ge1xuICAgIHNldFRpbWVvdXQocihhIC0gYiksIDEwMDApO1xuICB9KS50aGVuKChyZXN1bHQpID0+IHtcbiAgICAvLyBVc2UgYSBjbG9zdXJlIHRvIHJldHVybiBpdCxcbiAgICAvLyBqdXN0IGxpa2Ugb3RoZXIgb3JkaW5hcnkgZnVuY3Rpb25zLlxuICAgIGN0eC5yZXR1cm5zKHJlc3VsdCArIDEpO1xuICB9KTtcbn07XG5cbiAqL1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9wbGF5bGFuZy1kZW1vLmpzXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSB7IFwiZGVmYXVsdFwiOiByZXF1aXJlKFwiY29yZS1qcy9saWJyYXJ5L2ZuL3Byb21pc2VcIiksIF9fZXNNb2R1bGU6IHRydWUgfTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4uL34vYmFiZWwtcnVudGltZS9jb3JlLWpzL3Byb21pc2UuanNcbiAqKiBtb2R1bGUgaWQgPSAxXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJyZXF1aXJlKCcuLi9tb2R1bGVzL2VzNi5vYmplY3QudG8tc3RyaW5nJyk7XG5yZXF1aXJlKCcuLi9tb2R1bGVzL2VzNi5zdHJpbmcuaXRlcmF0b3InKTtcbnJlcXVpcmUoJy4uL21vZHVsZXMvd2ViLmRvbS5pdGVyYWJsZScpO1xucmVxdWlyZSgnLi4vbW9kdWxlcy9lczYucHJvbWlzZScpO1xubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuLi9tb2R1bGVzLyQuY29yZScpLlByb21pc2U7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuLi9+L2JhYmVsLXJ1bnRpbWUvfi9jb3JlLWpzL2xpYnJhcnkvZm4vcHJvbWlzZS5qc1xuICoqIG1vZHVsZSBpZCA9IDJcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIid1c2Ugc3RyaWN0JztcbnZhciAkYXQgID0gcmVxdWlyZSgnLi8kLnN0cmluZy1hdCcpKHRydWUpO1xuXG4vLyAyMS4xLjMuMjcgU3RyaW5nLnByb3RvdHlwZVtAQGl0ZXJhdG9yXSgpXG5yZXF1aXJlKCcuLyQuaXRlci1kZWZpbmUnKShTdHJpbmcsICdTdHJpbmcnLCBmdW5jdGlvbihpdGVyYXRlZCl7XG4gIHRoaXMuX3QgPSBTdHJpbmcoaXRlcmF0ZWQpOyAvLyB0YXJnZXRcbiAgdGhpcy5faSA9IDA7ICAgICAgICAgICAgICAgIC8vIG5leHQgaW5kZXhcbi8vIDIxLjEuNS4yLjEgJVN0cmluZ0l0ZXJhdG9yUHJvdG90eXBlJS5uZXh0KClcbn0sIGZ1bmN0aW9uKCl7XG4gIHZhciBPICAgICA9IHRoaXMuX3RcbiAgICAsIGluZGV4ID0gdGhpcy5faVxuICAgICwgcG9pbnQ7XG4gIGlmKGluZGV4ID49IE8ubGVuZ3RoKXJldHVybiB7dmFsdWU6IHVuZGVmaW5lZCwgZG9uZTogdHJ1ZX07XG4gIHBvaW50ID0gJGF0KE8sIGluZGV4KTtcbiAgdGhpcy5faSArPSBwb2ludC5sZW5ndGg7XG4gIHJldHVybiB7dmFsdWU6IHBvaW50LCBkb25lOiBmYWxzZX07XG59KTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4uL34vYmFiZWwtcnVudGltZS9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNi5zdHJpbmcuaXRlcmF0b3IuanNcbiAqKiBtb2R1bGUgaWQgPSA0XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIvLyB0cnVlICAtPiBTdHJpbmcjYXRcbi8vIGZhbHNlIC0+IFN0cmluZyNjb2RlUG9pbnRBdFxudmFyIHRvSW50ZWdlciA9IHJlcXVpcmUoJy4vJC50by1pbnRlZ2VyJylcbiAgLCBkZWZpbmVkICAgPSByZXF1aXJlKCcuLyQuZGVmaW5lZCcpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihUT19TVFJJTkcpe1xuICByZXR1cm4gZnVuY3Rpb24odGhhdCwgcG9zKXtcbiAgICB2YXIgcyA9IFN0cmluZyhkZWZpbmVkKHRoYXQpKVxuICAgICAgLCBpID0gdG9JbnRlZ2VyKHBvcylcbiAgICAgICwgbCA9IHMubGVuZ3RoXG4gICAgICAsIGEsIGI7XG4gICAgaWYoaSA8IDAgfHwgaSA+PSBsKXJldHVybiBUT19TVFJJTkcgPyAnJyA6IHVuZGVmaW5lZDtcbiAgICBhID0gcy5jaGFyQ29kZUF0KGkpO1xuICAgIHJldHVybiBhIDwgMHhkODAwIHx8IGEgPiAweGRiZmYgfHwgaSArIDEgPT09IGxcbiAgICAgIHx8IChiID0gcy5jaGFyQ29kZUF0KGkgKyAxKSkgPCAweGRjMDAgfHwgYiA+IDB4ZGZmZlxuICAgICAgICA/IFRPX1NUUklORyA/IHMuY2hhckF0KGkpIDogYVxuICAgICAgICA6IFRPX1NUUklORyA/IHMuc2xpY2UoaSwgaSArIDIpIDogKGEgLSAweGQ4MDAgPDwgMTApICsgKGIgLSAweGRjMDApICsgMHgxMDAwMDtcbiAgfTtcbn07XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuLi9+L2JhYmVsLXJ1bnRpbWUvfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy8kLnN0cmluZy1hdC5qc1xuICoqIG1vZHVsZSBpZCA9IDVcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIi8vIDcuMS40IFRvSW50ZWdlclxudmFyIGNlaWwgID0gTWF0aC5jZWlsXG4gICwgZmxvb3IgPSBNYXRoLmZsb29yO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCl7XG4gIHJldHVybiBpc05hTihpdCA9ICtpdCkgPyAwIDogKGl0ID4gMCA/IGZsb29yIDogY2VpbCkoaXQpO1xufTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4uL34vYmFiZWwtcnVudGltZS9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzLyQudG8taW50ZWdlci5qc1xuICoqIG1vZHVsZSBpZCA9IDZcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIi8vIDcuMi4xIFJlcXVpcmVPYmplY3RDb2VyY2libGUoYXJndW1lbnQpXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0KXtcbiAgaWYoaXQgPT0gdW5kZWZpbmVkKXRocm93IFR5cGVFcnJvcihcIkNhbid0IGNhbGwgbWV0aG9kIG9uICBcIiArIGl0KTtcbiAgcmV0dXJuIGl0O1xufTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4uL34vYmFiZWwtcnVudGltZS9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzLyQuZGVmaW5lZC5qc1xuICoqIG1vZHVsZSBpZCA9IDdcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIid1c2Ugc3RyaWN0JztcbnZhciBMSUJSQVJZICAgICAgICAgPSByZXF1aXJlKCcuLyQubGlicmFyeScpXG4gICwgJGRlZiAgICAgICAgICAgID0gcmVxdWlyZSgnLi8kLmRlZicpXG4gICwgJHJlZGVmICAgICAgICAgID0gcmVxdWlyZSgnLi8kLnJlZGVmJylcbiAgLCBoaWRlICAgICAgICAgICAgPSByZXF1aXJlKCcuLyQuaGlkZScpXG4gICwgaGFzICAgICAgICAgICAgID0gcmVxdWlyZSgnLi8kLmhhcycpXG4gICwgU1lNQk9MX0lURVJBVE9SID0gcmVxdWlyZSgnLi8kLndrcycpKCdpdGVyYXRvcicpXG4gICwgSXRlcmF0b3JzICAgICAgID0gcmVxdWlyZSgnLi8kLml0ZXJhdG9ycycpXG4gICwgRkZfSVRFUkFUT1IgICAgID0gJ0BAaXRlcmF0b3InXG4gICwgS0VZUyAgICAgICAgICAgID0gJ2tleXMnXG4gICwgVkFMVUVTICAgICAgICAgID0gJ3ZhbHVlcyc7XG52YXIgcmV0dXJuVGhpcyA9IGZ1bmN0aW9uKCl7IHJldHVybiB0aGlzOyB9O1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihCYXNlLCBOQU1FLCBDb25zdHJ1Y3RvciwgbmV4dCwgREVGQVVMVCwgSVNfU0VULCBGT1JDRSl7XG4gIHJlcXVpcmUoJy4vJC5pdGVyLWNyZWF0ZScpKENvbnN0cnVjdG9yLCBOQU1FLCBuZXh0KTtcbiAgdmFyIGNyZWF0ZU1ldGhvZCA9IGZ1bmN0aW9uKGtpbmQpe1xuICAgIHN3aXRjaChraW5kKXtcbiAgICAgIGNhc2UgS0VZUzogcmV0dXJuIGZ1bmN0aW9uIGtleXMoKXsgcmV0dXJuIG5ldyBDb25zdHJ1Y3Rvcih0aGlzLCBraW5kKTsgfTtcbiAgICAgIGNhc2UgVkFMVUVTOiByZXR1cm4gZnVuY3Rpb24gdmFsdWVzKCl7IHJldHVybiBuZXcgQ29uc3RydWN0b3IodGhpcywga2luZCk7IH07XG4gICAgfSByZXR1cm4gZnVuY3Rpb24gZW50cmllcygpeyByZXR1cm4gbmV3IENvbnN0cnVjdG9yKHRoaXMsIGtpbmQpOyB9O1xuICB9O1xuICB2YXIgVEFHICAgICAgPSBOQU1FICsgJyBJdGVyYXRvcidcbiAgICAsIHByb3RvICAgID0gQmFzZS5wcm90b3R5cGVcbiAgICAsIF9uYXRpdmUgID0gcHJvdG9bU1lNQk9MX0lURVJBVE9SXSB8fCBwcm90b1tGRl9JVEVSQVRPUl0gfHwgREVGQVVMVCAmJiBwcm90b1tERUZBVUxUXVxuICAgICwgX2RlZmF1bHQgPSBfbmF0aXZlIHx8IGNyZWF0ZU1ldGhvZChERUZBVUxUKVxuICAgICwgbWV0aG9kcywga2V5O1xuICAvLyBGaXggbmF0aXZlXG4gIGlmKF9uYXRpdmUpe1xuICAgIHZhciBJdGVyYXRvclByb3RvdHlwZSA9IHJlcXVpcmUoJy4vJCcpLmdldFByb3RvKF9kZWZhdWx0LmNhbGwobmV3IEJhc2UpKTtcbiAgICAvLyBTZXQgQEB0b1N0cmluZ1RhZyB0byBuYXRpdmUgaXRlcmF0b3JzXG4gICAgcmVxdWlyZSgnLi8kLnRhZycpKEl0ZXJhdG9yUHJvdG90eXBlLCBUQUcsIHRydWUpO1xuICAgIC8vIEZGIGZpeFxuICAgIGlmKCFMSUJSQVJZICYmIGhhcyhwcm90bywgRkZfSVRFUkFUT1IpKWhpZGUoSXRlcmF0b3JQcm90b3R5cGUsIFNZTUJPTF9JVEVSQVRPUiwgcmV0dXJuVGhpcyk7XG4gIH1cbiAgLy8gRGVmaW5lIGl0ZXJhdG9yXG4gIGlmKCFMSUJSQVJZIHx8IEZPUkNFKWhpZGUocHJvdG8sIFNZTUJPTF9JVEVSQVRPUiwgX2RlZmF1bHQpO1xuICAvLyBQbHVnIGZvciBsaWJyYXJ5XG4gIEl0ZXJhdG9yc1tOQU1FXSA9IF9kZWZhdWx0O1xuICBJdGVyYXRvcnNbVEFHXSAgPSByZXR1cm5UaGlzO1xuICBpZihERUZBVUxUKXtcbiAgICBtZXRob2RzID0ge1xuICAgICAga2V5czogICAgSVNfU0VUICAgICAgICAgICAgPyBfZGVmYXVsdCA6IGNyZWF0ZU1ldGhvZChLRVlTKSxcbiAgICAgIHZhbHVlczogIERFRkFVTFQgPT0gVkFMVUVTID8gX2RlZmF1bHQgOiBjcmVhdGVNZXRob2QoVkFMVUVTKSxcbiAgICAgIGVudHJpZXM6IERFRkFVTFQgIT0gVkFMVUVTID8gX2RlZmF1bHQgOiBjcmVhdGVNZXRob2QoJ2VudHJpZXMnKVxuICAgIH07XG4gICAgaWYoRk9SQ0UpZm9yKGtleSBpbiBtZXRob2RzKXtcbiAgICAgIGlmKCEoa2V5IGluIHByb3RvKSkkcmVkZWYocHJvdG8sIGtleSwgbWV0aG9kc1trZXldKTtcbiAgICB9IGVsc2UgJGRlZigkZGVmLlAgKyAkZGVmLkYgKiByZXF1aXJlKCcuLyQuaXRlci1idWdneScpLCBOQU1FLCBtZXRob2RzKTtcbiAgfVxufTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4uL34vYmFiZWwtcnVudGltZS9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzLyQuaXRlci1kZWZpbmUuanNcbiAqKiBtb2R1bGUgaWQgPSA4XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IHRydWU7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuLi9+L2JhYmVsLXJ1bnRpbWUvfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy8kLmxpYnJhcnkuanNcbiAqKiBtb2R1bGUgaWQgPSA5XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJ2YXIgZ2xvYmFsICAgID0gcmVxdWlyZSgnLi8kLmdsb2JhbCcpXG4gICwgY29yZSAgICAgID0gcmVxdWlyZSgnLi8kLmNvcmUnKVxuICAsIFBST1RPVFlQRSA9ICdwcm90b3R5cGUnO1xudmFyIGN0eCA9IGZ1bmN0aW9uKGZuLCB0aGF0KXtcbiAgcmV0dXJuIGZ1bmN0aW9uKCl7XG4gICAgcmV0dXJuIGZuLmFwcGx5KHRoYXQsIGFyZ3VtZW50cyk7XG4gIH07XG59O1xudmFyICRkZWYgPSBmdW5jdGlvbih0eXBlLCBuYW1lLCBzb3VyY2Upe1xuICB2YXIga2V5LCBvd24sIG91dCwgZXhwXG4gICAgLCBpc0dsb2JhbCA9IHR5cGUgJiAkZGVmLkdcbiAgICAsIGlzUHJvdG8gID0gdHlwZSAmICRkZWYuUFxuICAgICwgdGFyZ2V0ICAgPSBpc0dsb2JhbCA/IGdsb2JhbCA6IHR5cGUgJiAkZGVmLlNcbiAgICAgICAgPyBnbG9iYWxbbmFtZV0gOiAoZ2xvYmFsW25hbWVdIHx8IHt9KVtQUk9UT1RZUEVdXG4gICAgLCBleHBvcnRzICA9IGlzR2xvYmFsID8gY29yZSA6IGNvcmVbbmFtZV0gfHwgKGNvcmVbbmFtZV0gPSB7fSk7XG4gIGlmKGlzR2xvYmFsKXNvdXJjZSA9IG5hbWU7XG4gIGZvcihrZXkgaW4gc291cmNlKXtcbiAgICAvLyBjb250YWlucyBpbiBuYXRpdmVcbiAgICBvd24gPSAhKHR5cGUgJiAkZGVmLkYpICYmIHRhcmdldCAmJiBrZXkgaW4gdGFyZ2V0O1xuICAgIGlmKG93biAmJiBrZXkgaW4gZXhwb3J0cyljb250aW51ZTtcbiAgICAvLyBleHBvcnQgbmF0aXZlIG9yIHBhc3NlZFxuICAgIG91dCA9IG93biA/IHRhcmdldFtrZXldIDogc291cmNlW2tleV07XG4gICAgLy8gcHJldmVudCBnbG9iYWwgcG9sbHV0aW9uIGZvciBuYW1lc3BhY2VzXG4gICAgaWYoaXNHbG9iYWwgJiYgdHlwZW9mIHRhcmdldFtrZXldICE9ICdmdW5jdGlvbicpZXhwID0gc291cmNlW2tleV07XG4gICAgLy8gYmluZCB0aW1lcnMgdG8gZ2xvYmFsIGZvciBjYWxsIGZyb20gZXhwb3J0IGNvbnRleHRcbiAgICBlbHNlIGlmKHR5cGUgJiAkZGVmLkIgJiYgb3duKWV4cCA9IGN0eChvdXQsIGdsb2JhbCk7XG4gICAgLy8gd3JhcCBnbG9iYWwgY29uc3RydWN0b3JzIGZvciBwcmV2ZW50IGNoYW5nZSB0aGVtIGluIGxpYnJhcnlcbiAgICBlbHNlIGlmKHR5cGUgJiAkZGVmLlcgJiYgdGFyZ2V0W2tleV0gPT0gb3V0KSFmdW5jdGlvbihDKXtcbiAgICAgIGV4cCA9IGZ1bmN0aW9uKHBhcmFtKXtcbiAgICAgICAgcmV0dXJuIHRoaXMgaW5zdGFuY2VvZiBDID8gbmV3IEMocGFyYW0pIDogQyhwYXJhbSk7XG4gICAgICB9O1xuICAgICAgZXhwW1BST1RPVFlQRV0gPSBDW1BST1RPVFlQRV07XG4gICAgfShvdXQpO1xuICAgIGVsc2UgZXhwID0gaXNQcm90byAmJiB0eXBlb2Ygb3V0ID09ICdmdW5jdGlvbicgPyBjdHgoRnVuY3Rpb24uY2FsbCwgb3V0KSA6IG91dDtcbiAgICAvLyBleHBvcnRcbiAgICBleHBvcnRzW2tleV0gPSBleHA7XG4gICAgaWYoaXNQcm90bykoZXhwb3J0c1tQUk9UT1RZUEVdIHx8IChleHBvcnRzW1BST1RPVFlQRV0gPSB7fSkpW2tleV0gPSBvdXQ7XG4gIH1cbn07XG4vLyB0eXBlIGJpdG1hcFxuJGRlZi5GID0gMTsgIC8vIGZvcmNlZFxuJGRlZi5HID0gMjsgIC8vIGdsb2JhbFxuJGRlZi5TID0gNDsgIC8vIHN0YXRpY1xuJGRlZi5QID0gODsgIC8vIHByb3RvXG4kZGVmLkIgPSAxNjsgLy8gYmluZFxuJGRlZi5XID0gMzI7IC8vIHdyYXBcbm1vZHVsZS5leHBvcnRzID0gJGRlZjtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4uL34vYmFiZWwtcnVudGltZS9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzLyQuZGVmLmpzXG4gKiogbW9kdWxlIGlkID0gMTBcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsInZhciBnbG9iYWwgPSB0eXBlb2Ygc2VsZiAhPSAndW5kZWZpbmVkJyAmJiBzZWxmLk1hdGggPT0gTWF0aCA/IHNlbGYgOiBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpO1xubW9kdWxlLmV4cG9ydHMgPSBnbG9iYWw7XG5pZih0eXBlb2YgX19nID09ICdudW1iZXInKV9fZyA9IGdsb2JhbDsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bmRlZlxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi4vfi9iYWJlbC1ydW50aW1lL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvJC5nbG9iYWwuanNcbiAqKiBtb2R1bGUgaWQgPSAxMVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwidmFyIGNvcmUgPSBtb2R1bGUuZXhwb3J0cyA9IHt9O1xuaWYodHlwZW9mIF9fZSA9PSAnbnVtYmVyJylfX2UgPSBjb3JlOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVuZGVmXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuLi9+L2JhYmVsLXJ1bnRpbWUvfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy8kLmNvcmUuanNcbiAqKiBtb2R1bGUgaWQgPSAxMlxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuLyQuaGlkZScpO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi4vfi9iYWJlbC1ydW50aW1lL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvJC5yZWRlZi5qc1xuICoqIG1vZHVsZSBpZCA9IDEzXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJ2YXIgJCAgICAgICAgICA9IHJlcXVpcmUoJy4vJCcpXG4gICwgY3JlYXRlRGVzYyA9IHJlcXVpcmUoJy4vJC5wcm9wZXJ0eS1kZXNjJyk7XG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vJC5zdXBwb3J0LWRlc2MnKSA/IGZ1bmN0aW9uKG9iamVjdCwga2V5LCB2YWx1ZSl7XG4gIHJldHVybiAkLnNldERlc2Mob2JqZWN0LCBrZXksIGNyZWF0ZURlc2MoMSwgdmFsdWUpKTtcbn0gOiBmdW5jdGlvbihvYmplY3QsIGtleSwgdmFsdWUpe1xuICBvYmplY3Rba2V5XSA9IHZhbHVlO1xuICByZXR1cm4gb2JqZWN0O1xufTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4uL34vYmFiZWwtcnVudGltZS9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzLyQuaGlkZS5qc1xuICoqIG1vZHVsZSBpZCA9IDE0XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJ2YXIgJE9iamVjdCA9IE9iamVjdDtcbm1vZHVsZS5leHBvcnRzID0ge1xuICBjcmVhdGU6ICAgICAkT2JqZWN0LmNyZWF0ZSxcbiAgZ2V0UHJvdG86ICAgJE9iamVjdC5nZXRQcm90b3R5cGVPZixcbiAgaXNFbnVtOiAgICAge30ucHJvcGVydHlJc0VudW1lcmFibGUsXG4gIGdldERlc2M6ICAgICRPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yLFxuICBzZXREZXNjOiAgICAkT2JqZWN0LmRlZmluZVByb3BlcnR5LFxuICBzZXREZXNjczogICAkT2JqZWN0LmRlZmluZVByb3BlcnRpZXMsXG4gIGdldEtleXM6ICAgICRPYmplY3Qua2V5cyxcbiAgZ2V0TmFtZXM6ICAgJE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzLFxuICBnZXRTeW1ib2xzOiAkT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyxcbiAgZWFjaDogICAgICAgW10uZm9yRWFjaFxufTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4uL34vYmFiZWwtcnVudGltZS9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzLyQuanNcbiAqKiBtb2R1bGUgaWQgPSAxNVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihiaXRtYXAsIHZhbHVlKXtcbiAgcmV0dXJuIHtcbiAgICBlbnVtZXJhYmxlICA6ICEoYml0bWFwICYgMSksXG4gICAgY29uZmlndXJhYmxlOiAhKGJpdG1hcCAmIDIpLFxuICAgIHdyaXRhYmxlICAgIDogIShiaXRtYXAgJiA0KSxcbiAgICB2YWx1ZSAgICAgICA6IHZhbHVlXG4gIH07XG59O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi4vfi9iYWJlbC1ydW50aW1lL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvJC5wcm9wZXJ0eS1kZXNjLmpzXG4gKiogbW9kdWxlIGlkID0gMTZcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIi8vIFRoYW5rJ3MgSUU4IGZvciBoaXMgZnVubnkgZGVmaW5lUHJvcGVydHlcbm1vZHVsZS5leHBvcnRzID0gIXJlcXVpcmUoJy4vJC5mYWlscycpKGZ1bmN0aW9uKCl7XG4gIHJldHVybiBPYmplY3QuZGVmaW5lUHJvcGVydHkoe30sICdhJywge2dldDogZnVuY3Rpb24oKXsgcmV0dXJuIDc7IH19KS5hICE9IDc7XG59KTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4uL34vYmFiZWwtcnVudGltZS9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzLyQuc3VwcG9ydC1kZXNjLmpzXG4gKiogbW9kdWxlIGlkID0gMTdcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oZXhlYyl7XG4gIHRyeSB7XG4gICAgcmV0dXJuICEhZXhlYygpO1xuICB9IGNhdGNoKGUpe1xuICAgIHJldHVybiB0cnVlO1xuICB9XG59O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi4vfi9iYWJlbC1ydW50aW1lL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvJC5mYWlscy5qc1xuICoqIG1vZHVsZSBpZCA9IDE4XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJ2YXIgaGFzT3duUHJvcGVydHkgPSB7fS5oYXNPd25Qcm9wZXJ0eTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXQsIGtleSl7XG4gIHJldHVybiBoYXNPd25Qcm9wZXJ0eS5jYWxsKGl0LCBrZXkpO1xufTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4uL34vYmFiZWwtcnVudGltZS9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzLyQuaGFzLmpzXG4gKiogbW9kdWxlIGlkID0gMTlcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsInZhciBzdG9yZSAgPSByZXF1aXJlKCcuLyQuc2hhcmVkJykoJ3drcycpXG4gICwgU3ltYm9sID0gcmVxdWlyZSgnLi8kLmdsb2JhbCcpLlN5bWJvbDtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24obmFtZSl7XG4gIHJldHVybiBzdG9yZVtuYW1lXSB8fCAoc3RvcmVbbmFtZV0gPVxuICAgIFN5bWJvbCAmJiBTeW1ib2xbbmFtZV0gfHwgKFN5bWJvbCB8fCByZXF1aXJlKCcuLyQudWlkJykpKCdTeW1ib2wuJyArIG5hbWUpKTtcbn07XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuLi9+L2JhYmVsLXJ1bnRpbWUvfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy8kLndrcy5qc1xuICoqIG1vZHVsZSBpZCA9IDIwXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJ2YXIgZ2xvYmFsID0gcmVxdWlyZSgnLi8kLmdsb2JhbCcpXG4gICwgU0hBUkVEID0gJ19fY29yZS1qc19zaGFyZWRfXydcbiAgLCBzdG9yZSAgPSBnbG9iYWxbU0hBUkVEXSB8fCAoZ2xvYmFsW1NIQVJFRF0gPSB7fSk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGtleSl7XG4gIHJldHVybiBzdG9yZVtrZXldIHx8IChzdG9yZVtrZXldID0ge30pO1xufTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4uL34vYmFiZWwtcnVudGltZS9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzLyQuc2hhcmVkLmpzXG4gKiogbW9kdWxlIGlkID0gMjFcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsInZhciBpZCA9IDBcbiAgLCBweCA9IE1hdGgucmFuZG9tKCk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGtleSl7XG4gIHJldHVybiAnU3ltYm9sKCcuY29uY2F0KGtleSA9PT0gdW5kZWZpbmVkID8gJycgOiBrZXksICcpXycsICgrK2lkICsgcHgpLnRvU3RyaW5nKDM2KSk7XG59O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi4vfi9iYWJlbC1ydW50aW1lL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvJC51aWQuanNcbiAqKiBtb2R1bGUgaWQgPSAyMlxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSB7fTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4uL34vYmFiZWwtcnVudGltZS9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzLyQuaXRlcmF0b3JzLmpzXG4gKiogbW9kdWxlIGlkID0gMjNcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIid1c2Ugc3RyaWN0JztcbnZhciAkID0gcmVxdWlyZSgnLi8kJylcbiAgLCBJdGVyYXRvclByb3RvdHlwZSA9IHt9O1xuXG4vLyAyNS4xLjIuMS4xICVJdGVyYXRvclByb3RvdHlwZSVbQEBpdGVyYXRvcl0oKVxucmVxdWlyZSgnLi8kLmhpZGUnKShJdGVyYXRvclByb3RvdHlwZSwgcmVxdWlyZSgnLi8kLndrcycpKCdpdGVyYXRvcicpLCBmdW5jdGlvbigpeyByZXR1cm4gdGhpczsgfSk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oQ29uc3RydWN0b3IsIE5BTUUsIG5leHQpe1xuICBDb25zdHJ1Y3Rvci5wcm90b3R5cGUgPSAkLmNyZWF0ZShJdGVyYXRvclByb3RvdHlwZSwge25leHQ6IHJlcXVpcmUoJy4vJC5wcm9wZXJ0eS1kZXNjJykoMSxuZXh0KX0pO1xuICByZXF1aXJlKCcuLyQudGFnJykoQ29uc3RydWN0b3IsIE5BTUUgKyAnIEl0ZXJhdG9yJyk7XG59O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi4vfi9iYWJlbC1ydW50aW1lL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvJC5pdGVyLWNyZWF0ZS5qc1xuICoqIG1vZHVsZSBpZCA9IDI0XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJ2YXIgaGFzICA9IHJlcXVpcmUoJy4vJC5oYXMnKVxuICAsIGhpZGUgPSByZXF1aXJlKCcuLyQuaGlkZScpXG4gICwgVEFHICA9IHJlcXVpcmUoJy4vJC53a3MnKSgndG9TdHJpbmdUYWcnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCwgdGFnLCBzdGF0KXtcbiAgaWYoaXQgJiYgIWhhcyhpdCA9IHN0YXQgPyBpdCA6IGl0LnByb3RvdHlwZSwgVEFHKSloaWRlKGl0LCBUQUcsIHRhZyk7XG59O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi4vfi9iYWJlbC1ydW50aW1lL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvJC50YWcuanNcbiAqKiBtb2R1bGUgaWQgPSAyNVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiLy8gU2FmYXJpIGhhcyBidWdneSBpdGVyYXRvcnMgdy9vIGBuZXh0YFxubW9kdWxlLmV4cG9ydHMgPSAna2V5cycgaW4gW10gJiYgISgnbmV4dCcgaW4gW10ua2V5cygpKTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4uL34vYmFiZWwtcnVudGltZS9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzLyQuaXRlci1idWdneS5qc1xuICoqIG1vZHVsZSBpZCA9IDI2XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJyZXF1aXJlKCcuL2VzNi5hcnJheS5pdGVyYXRvcicpO1xudmFyIEl0ZXJhdG9ycyA9IHJlcXVpcmUoJy4vJC5pdGVyYXRvcnMnKTtcbkl0ZXJhdG9ycy5Ob2RlTGlzdCA9IEl0ZXJhdG9ycy5IVE1MQ29sbGVjdGlvbiA9IEl0ZXJhdG9ycy5BcnJheTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4uL34vYmFiZWwtcnVudGltZS9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL3dlYi5kb20uaXRlcmFibGUuanNcbiAqKiBtb2R1bGUgaWQgPSAyN1xuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xudmFyIHNldFVuc2NvcGUgPSByZXF1aXJlKCcuLyQudW5zY29wZScpXG4gICwgc3RlcCAgICAgICA9IHJlcXVpcmUoJy4vJC5pdGVyLXN0ZXAnKVxuICAsIEl0ZXJhdG9ycyAgPSByZXF1aXJlKCcuLyQuaXRlcmF0b3JzJylcbiAgLCB0b0lPYmplY3QgID0gcmVxdWlyZSgnLi8kLnRvLWlvYmplY3QnKTtcblxuLy8gMjIuMS4zLjQgQXJyYXkucHJvdG90eXBlLmVudHJpZXMoKVxuLy8gMjIuMS4zLjEzIEFycmF5LnByb3RvdHlwZS5rZXlzKClcbi8vIDIyLjEuMy4yOSBBcnJheS5wcm90b3R5cGUudmFsdWVzKClcbi8vIDIyLjEuMy4zMCBBcnJheS5wcm90b3R5cGVbQEBpdGVyYXRvcl0oKVxucmVxdWlyZSgnLi8kLml0ZXItZGVmaW5lJykoQXJyYXksICdBcnJheScsIGZ1bmN0aW9uKGl0ZXJhdGVkLCBraW5kKXtcbiAgdGhpcy5fdCA9IHRvSU9iamVjdChpdGVyYXRlZCk7IC8vIHRhcmdldFxuICB0aGlzLl9pID0gMDsgICAgICAgICAgICAgICAgICAgLy8gbmV4dCBpbmRleFxuICB0aGlzLl9rID0ga2luZDsgICAgICAgICAgICAgICAgLy8ga2luZFxuLy8gMjIuMS41LjIuMSAlQXJyYXlJdGVyYXRvclByb3RvdHlwZSUubmV4dCgpXG59LCBmdW5jdGlvbigpe1xuICB2YXIgTyAgICAgPSB0aGlzLl90XG4gICAgLCBraW5kICA9IHRoaXMuX2tcbiAgICAsIGluZGV4ID0gdGhpcy5faSsrO1xuICBpZighTyB8fCBpbmRleCA+PSBPLmxlbmd0aCl7XG4gICAgdGhpcy5fdCA9IHVuZGVmaW5lZDtcbiAgICByZXR1cm4gc3RlcCgxKTtcbiAgfVxuICBpZihraW5kID09ICdrZXlzJyAgKXJldHVybiBzdGVwKDAsIGluZGV4KTtcbiAgaWYoa2luZCA9PSAndmFsdWVzJylyZXR1cm4gc3RlcCgwLCBPW2luZGV4XSk7XG4gIHJldHVybiBzdGVwKDAsIFtpbmRleCwgT1tpbmRleF1dKTtcbn0sICd2YWx1ZXMnKTtcblxuLy8gYXJndW1lbnRzTGlzdFtAQGl0ZXJhdG9yXSBpcyAlQXJyYXlQcm90b192YWx1ZXMlICg5LjQuNC42LCA5LjQuNC43KVxuSXRlcmF0b3JzLkFyZ3VtZW50cyA9IEl0ZXJhdG9ycy5BcnJheTtcblxuc2V0VW5zY29wZSgna2V5cycpO1xuc2V0VW5zY29wZSgndmFsdWVzJyk7XG5zZXRVbnNjb3BlKCdlbnRyaWVzJyk7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuLi9+L2JhYmVsLXJ1bnRpbWUvfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczYuYXJyYXkuaXRlcmF0b3IuanNcbiAqKiBtb2R1bGUgaWQgPSAyOFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbigpeyAvKiBlbXB0eSAqLyB9O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi4vfi9iYWJlbC1ydW50aW1lL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvJC51bnNjb3BlLmpzXG4gKiogbW9kdWxlIGlkID0gMjlcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oZG9uZSwgdmFsdWUpe1xuICByZXR1cm4ge3ZhbHVlOiB2YWx1ZSwgZG9uZTogISFkb25lfTtcbn07XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuLi9+L2JhYmVsLXJ1bnRpbWUvfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy8kLml0ZXItc3RlcC5qc1xuICoqIG1vZHVsZSBpZCA9IDMwXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIvLyB0byBpbmRleGVkIG9iamVjdCwgdG9PYmplY3Qgd2l0aCBmYWxsYmFjayBmb3Igbm9uLWFycmF5LWxpa2UgRVMzIHN0cmluZ3NcclxudmFyIElPYmplY3QgPSByZXF1aXJlKCcuLyQuaW9iamVjdCcpXHJcbiAgLCBkZWZpbmVkID0gcmVxdWlyZSgnLi8kLmRlZmluZWQnKTtcclxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCl7XHJcbiAgcmV0dXJuIElPYmplY3QoZGVmaW5lZChpdCkpO1xyXG59O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi4vfi9iYWJlbC1ydW50aW1lL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvJC50by1pb2JqZWN0LmpzXG4gKiogbW9kdWxlIGlkID0gMzFcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIi8vIGluZGV4ZWQgb2JqZWN0LCBmYWxsYmFjayBmb3Igbm9uLWFycmF5LWxpa2UgRVMzIHN0cmluZ3NcbnZhciBjb2YgPSByZXF1aXJlKCcuLyQuY29mJyk7XG5tb2R1bGUuZXhwb3J0cyA9IDAgaW4gT2JqZWN0KCd6JykgPyBPYmplY3QgOiBmdW5jdGlvbihpdCl7XG4gIHJldHVybiBjb2YoaXQpID09ICdTdHJpbmcnID8gaXQuc3BsaXQoJycpIDogT2JqZWN0KGl0KTtcbn07XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuLi9+L2JhYmVsLXJ1bnRpbWUvfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy8kLmlvYmplY3QuanNcbiAqKiBtb2R1bGUgaWQgPSAzMlxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwidmFyIHRvU3RyaW5nID0ge30udG9TdHJpbmc7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXQpe1xuICByZXR1cm4gdG9TdHJpbmcuY2FsbChpdCkuc2xpY2UoOCwgLTEpO1xufTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4uL34vYmFiZWwtcnVudGltZS9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzLyQuY29mLmpzXG4gKiogbW9kdWxlIGlkID0gMzNcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIid1c2Ugc3RyaWN0JztcbnZhciAkICAgICAgICAgID0gcmVxdWlyZSgnLi8kJylcbiAgLCBMSUJSQVJZICAgID0gcmVxdWlyZSgnLi8kLmxpYnJhcnknKVxuICAsIGdsb2JhbCAgICAgPSByZXF1aXJlKCcuLyQuZ2xvYmFsJylcbiAgLCBjdHggICAgICAgID0gcmVxdWlyZSgnLi8kLmN0eCcpXG4gICwgY2xhc3NvZiAgICA9IHJlcXVpcmUoJy4vJC5jbGFzc29mJylcbiAgLCAkZGVmICAgICAgID0gcmVxdWlyZSgnLi8kLmRlZicpXG4gICwgaXNPYmplY3QgICA9IHJlcXVpcmUoJy4vJC5pcy1vYmplY3QnKVxuICAsIGFuT2JqZWN0ICAgPSByZXF1aXJlKCcuLyQuYW4tb2JqZWN0JylcbiAgLCBhRnVuY3Rpb24gID0gcmVxdWlyZSgnLi8kLmEtZnVuY3Rpb24nKVxuICAsIHN0cmljdE5ldyAgPSByZXF1aXJlKCcuLyQuc3RyaWN0LW5ldycpXG4gICwgZm9yT2YgICAgICA9IHJlcXVpcmUoJy4vJC5mb3Itb2YnKVxuICAsIHNldFByb3RvICAgPSByZXF1aXJlKCcuLyQuc2V0LXByb3RvJykuc2V0XG4gICwgc2FtZSAgICAgICA9IHJlcXVpcmUoJy4vJC5zYW1lJylcbiAgLCBzcGVjaWVzICAgID0gcmVxdWlyZSgnLi8kLnNwZWNpZXMnKVxuICAsIFNQRUNJRVMgICAgPSByZXF1aXJlKCcuLyQud2tzJykoJ3NwZWNpZXMnKVxuICAsIFJFQ09SRCAgICAgPSByZXF1aXJlKCcuLyQudWlkJykoJ3JlY29yZCcpXG4gICwgYXNhcCAgICAgICA9IHJlcXVpcmUoJy4vJC5taWNyb3Rhc2snKVxuICAsIFBST01JU0UgICAgPSAnUHJvbWlzZSdcbiAgLCBwcm9jZXNzICAgID0gZ2xvYmFsLnByb2Nlc3NcbiAgLCBpc05vZGUgICAgID0gY2xhc3NvZihwcm9jZXNzKSA9PSAncHJvY2VzcydcbiAgLCBQICAgICAgICAgID0gZ2xvYmFsW1BST01JU0VdXG4gICwgV3JhcHBlcjtcblxudmFyIHRlc3RSZXNvbHZlID0gZnVuY3Rpb24oc3ViKXtcbiAgdmFyIHRlc3QgPSBuZXcgUChmdW5jdGlvbigpe30pO1xuICBpZihzdWIpdGVzdC5jb25zdHJ1Y3RvciA9IE9iamVjdDtcbiAgcmV0dXJuIFAucmVzb2x2ZSh0ZXN0KSA9PT0gdGVzdDtcbn07XG5cbnZhciB1c2VOYXRpdmUgPSBmdW5jdGlvbigpe1xuICB2YXIgd29ya3MgPSBmYWxzZTtcbiAgZnVuY3Rpb24gUDIoeCl7XG4gICAgdmFyIHNlbGYgPSBuZXcgUCh4KTtcbiAgICBzZXRQcm90byhzZWxmLCBQMi5wcm90b3R5cGUpO1xuICAgIHJldHVybiBzZWxmO1xuICB9XG4gIHRyeSB7XG4gICAgd29ya3MgPSBQICYmIFAucmVzb2x2ZSAmJiB0ZXN0UmVzb2x2ZSgpO1xuICAgIHNldFByb3RvKFAyLCBQKTtcbiAgICBQMi5wcm90b3R5cGUgPSAkLmNyZWF0ZShQLnByb3RvdHlwZSwge2NvbnN0cnVjdG9yOiB7dmFsdWU6IFAyfX0pO1xuICAgIC8vIGFjdHVhbCBGaXJlZm94IGhhcyBicm9rZW4gc3ViY2xhc3Mgc3VwcG9ydCwgdGVzdCB0aGF0XG4gICAgaWYoIShQMi5yZXNvbHZlKDUpLnRoZW4oZnVuY3Rpb24oKXt9KSBpbnN0YW5jZW9mIFAyKSl7XG4gICAgICB3b3JrcyA9IGZhbHNlO1xuICAgIH1cbiAgICAvLyBhY3R1YWwgVjggYnVnLCBodHRwczovL2NvZGUuZ29vZ2xlLmNvbS9wL3Y4L2lzc3Vlcy9kZXRhaWw/aWQ9NDE2MlxuICAgIGlmKHdvcmtzICYmIHJlcXVpcmUoJy4vJC5zdXBwb3J0LWRlc2MnKSl7XG4gICAgICB2YXIgdGhlbmFibGVUaGVuR290dGVuID0gZmFsc2U7XG4gICAgICBQLnJlc29sdmUoJC5zZXREZXNjKHt9LCAndGhlbicsIHtcbiAgICAgICAgZ2V0OiBmdW5jdGlvbigpeyB0aGVuYWJsZVRoZW5Hb3R0ZW4gPSB0cnVlOyB9XG4gICAgICB9KSk7XG4gICAgICB3b3JrcyA9IHRoZW5hYmxlVGhlbkdvdHRlbjtcbiAgICB9XG4gIH0gY2F0Y2goZSl7IHdvcmtzID0gZmFsc2U7IH1cbiAgcmV0dXJuIHdvcmtzO1xufSgpO1xuXG4vLyBoZWxwZXJzXG52YXIgaXNQcm9taXNlID0gZnVuY3Rpb24oaXQpe1xuICByZXR1cm4gaXNPYmplY3QoaXQpICYmICh1c2VOYXRpdmUgPyBjbGFzc29mKGl0KSA9PSAnUHJvbWlzZScgOiBSRUNPUkQgaW4gaXQpO1xufTtcbnZhciBzYW1lQ29uc3RydWN0b3IgPSBmdW5jdGlvbihhLCBiKXtcbiAgLy8gbGlicmFyeSB3cmFwcGVyIHNwZWNpYWwgY2FzZVxuICBpZihMSUJSQVJZICYmIGEgPT09IFAgJiYgYiA9PT0gV3JhcHBlcilyZXR1cm4gdHJ1ZTtcbiAgcmV0dXJuIHNhbWUoYSwgYik7XG59O1xudmFyIGdldENvbnN0cnVjdG9yID0gZnVuY3Rpb24oQyl7XG4gIHZhciBTID0gYW5PYmplY3QoQylbU1BFQ0lFU107XG4gIHJldHVybiBTICE9IHVuZGVmaW5lZCA/IFMgOiBDO1xufTtcbnZhciBpc1RoZW5hYmxlID0gZnVuY3Rpb24oaXQpe1xuICB2YXIgdGhlbjtcbiAgcmV0dXJuIGlzT2JqZWN0KGl0KSAmJiB0eXBlb2YgKHRoZW4gPSBpdC50aGVuKSA9PSAnZnVuY3Rpb24nID8gdGhlbiA6IGZhbHNlO1xufTtcbnZhciBub3RpZnkgPSBmdW5jdGlvbihyZWNvcmQsIGlzUmVqZWN0KXtcbiAgaWYocmVjb3JkLm4pcmV0dXJuO1xuICByZWNvcmQubiA9IHRydWU7XG4gIHZhciBjaGFpbiA9IHJlY29yZC5jO1xuICBhc2FwKGZ1bmN0aW9uKCl7XG4gICAgdmFyIHZhbHVlID0gcmVjb3JkLnZcbiAgICAgICwgb2sgICAgPSByZWNvcmQucyA9PSAxXG4gICAgICAsIGkgICAgID0gMDtcbiAgICB2YXIgcnVuID0gZnVuY3Rpb24ocmVhY3Qpe1xuICAgICAgdmFyIGNiID0gb2sgPyByZWFjdC5vayA6IHJlYWN0LmZhaWxcbiAgICAgICAgLCByZXQsIHRoZW47XG4gICAgICB0cnkge1xuICAgICAgICBpZihjYil7XG4gICAgICAgICAgaWYoIW9rKXJlY29yZC5oID0gdHJ1ZTtcbiAgICAgICAgICByZXQgPSBjYiA9PT0gdHJ1ZSA/IHZhbHVlIDogY2IodmFsdWUpO1xuICAgICAgICAgIGlmKHJldCA9PT0gcmVhY3QuUCl7XG4gICAgICAgICAgICByZWFjdC5yZWooVHlwZUVycm9yKCdQcm9taXNlLWNoYWluIGN5Y2xlJykpO1xuICAgICAgICAgIH0gZWxzZSBpZih0aGVuID0gaXNUaGVuYWJsZShyZXQpKXtcbiAgICAgICAgICAgIHRoZW4uY2FsbChyZXQsIHJlYWN0LnJlcywgcmVhY3QucmVqKTtcbiAgICAgICAgICB9IGVsc2UgcmVhY3QucmVzKHJldCk7XG4gICAgICAgIH0gZWxzZSByZWFjdC5yZWoodmFsdWUpO1xuICAgICAgfSBjYXRjaChlcnIpe1xuICAgICAgICByZWFjdC5yZWooZXJyKTtcbiAgICAgIH1cbiAgICB9O1xuICAgIHdoaWxlKGNoYWluLmxlbmd0aCA+IGkpcnVuKGNoYWluW2krK10pOyAvLyB2YXJpYWJsZSBsZW5ndGggLSBjYW4ndCB1c2UgZm9yRWFjaFxuICAgIGNoYWluLmxlbmd0aCA9IDA7XG4gICAgcmVjb3JkLm4gPSBmYWxzZTtcbiAgICBpZihpc1JlamVjdClzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG4gICAgICBhc2FwKGZ1bmN0aW9uKCl7XG4gICAgICAgIGlmKGlzVW5oYW5kbGVkKHJlY29yZC5wKSl7XG4gICAgICAgICAgaWYoaXNOb2RlKXtcbiAgICAgICAgICAgIHByb2Nlc3MuZW1pdCgndW5oYW5kbGVkUmVqZWN0aW9uJywgdmFsdWUsIHJlY29yZC5wKTtcbiAgICAgICAgICB9IGVsc2UgaWYoZ2xvYmFsLmNvbnNvbGUgJiYgY29uc29sZS5lcnJvcil7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKCdVbmhhbmRsZWQgcHJvbWlzZSByZWplY3Rpb24nLCB2YWx1ZSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJlY29yZC5hID0gdW5kZWZpbmVkO1xuICAgICAgfSk7XG4gICAgfSwgMSk7XG4gIH0pO1xufTtcbnZhciBpc1VuaGFuZGxlZCA9IGZ1bmN0aW9uKHByb21pc2Upe1xuICB2YXIgcmVjb3JkID0gcHJvbWlzZVtSRUNPUkRdXG4gICAgLCBjaGFpbiAgPSByZWNvcmQuYSB8fCByZWNvcmQuY1xuICAgICwgaSAgICAgID0gMFxuICAgICwgcmVhY3Q7XG4gIGlmKHJlY29yZC5oKXJldHVybiBmYWxzZTtcbiAgd2hpbGUoY2hhaW4ubGVuZ3RoID4gaSl7XG4gICAgcmVhY3QgPSBjaGFpbltpKytdO1xuICAgIGlmKHJlYWN0LmZhaWwgfHwgIWlzVW5oYW5kbGVkKHJlYWN0LlApKXJldHVybiBmYWxzZTtcbiAgfSByZXR1cm4gdHJ1ZTtcbn07XG52YXIgJHJlamVjdCA9IGZ1bmN0aW9uKHZhbHVlKXtcbiAgdmFyIHJlY29yZCA9IHRoaXM7XG4gIGlmKHJlY29yZC5kKXJldHVybjtcbiAgcmVjb3JkLmQgPSB0cnVlO1xuICByZWNvcmQgPSByZWNvcmQuciB8fCByZWNvcmQ7IC8vIHVud3JhcFxuICByZWNvcmQudiA9IHZhbHVlO1xuICByZWNvcmQucyA9IDI7XG4gIHJlY29yZC5hID0gcmVjb3JkLmMuc2xpY2UoKTtcbiAgbm90aWZ5KHJlY29yZCwgdHJ1ZSk7XG59O1xudmFyICRyZXNvbHZlID0gZnVuY3Rpb24odmFsdWUpe1xuICB2YXIgcmVjb3JkID0gdGhpc1xuICAgICwgdGhlbjtcbiAgaWYocmVjb3JkLmQpcmV0dXJuO1xuICByZWNvcmQuZCA9IHRydWU7XG4gIHJlY29yZCA9IHJlY29yZC5yIHx8IHJlY29yZDsgLy8gdW53cmFwXG4gIHRyeSB7XG4gICAgaWYodGhlbiA9IGlzVGhlbmFibGUodmFsdWUpKXtcbiAgICAgIGFzYXAoZnVuY3Rpb24oKXtcbiAgICAgICAgdmFyIHdyYXBwZXIgPSB7cjogcmVjb3JkLCBkOiBmYWxzZX07IC8vIHdyYXBcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICB0aGVuLmNhbGwodmFsdWUsIGN0eCgkcmVzb2x2ZSwgd3JhcHBlciwgMSksIGN0eCgkcmVqZWN0LCB3cmFwcGVyLCAxKSk7XG4gICAgICAgIH0gY2F0Y2goZSl7XG4gICAgICAgICAgJHJlamVjdC5jYWxsKHdyYXBwZXIsIGUpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmVjb3JkLnYgPSB2YWx1ZTtcbiAgICAgIHJlY29yZC5zID0gMTtcbiAgICAgIG5vdGlmeShyZWNvcmQsIGZhbHNlKTtcbiAgICB9XG4gIH0gY2F0Y2goZSl7XG4gICAgJHJlamVjdC5jYWxsKHtyOiByZWNvcmQsIGQ6IGZhbHNlfSwgZSk7IC8vIHdyYXBcbiAgfVxufTtcblxuLy8gY29uc3RydWN0b3IgcG9seWZpbGxcbmlmKCF1c2VOYXRpdmUpe1xuICAvLyAyNS40LjMuMSBQcm9taXNlKGV4ZWN1dG9yKVxuICBQID0gZnVuY3Rpb24gUHJvbWlzZShleGVjdXRvcil7XG4gICAgYUZ1bmN0aW9uKGV4ZWN1dG9yKTtcbiAgICB2YXIgcmVjb3JkID0ge1xuICAgICAgcDogc3RyaWN0TmV3KHRoaXMsIFAsIFBST01JU0UpLCAgICAgICAgIC8vIDwtIHByb21pc2VcbiAgICAgIGM6IFtdLCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyA8LSBhd2FpdGluZyByZWFjdGlvbnNcbiAgICAgIGE6IHVuZGVmaW5lZCwgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyA8LSBjaGVja2VkIGluIGlzVW5oYW5kbGVkIHJlYWN0aW9uc1xuICAgICAgczogMCwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIDwtIHN0YXRlXG4gICAgICBkOiBmYWxzZSwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gPC0gZG9uZVxuICAgICAgdjogdW5kZWZpbmVkLCAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIDwtIHZhbHVlXG4gICAgICBoOiBmYWxzZSwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gPC0gaGFuZGxlZCByZWplY3Rpb25cbiAgICAgIG46IGZhbHNlICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyA8LSBub3RpZnlcbiAgICB9O1xuICAgIHRoaXNbUkVDT1JEXSA9IHJlY29yZDtcbiAgICB0cnkge1xuICAgICAgZXhlY3V0b3IoY3R4KCRyZXNvbHZlLCByZWNvcmQsIDEpLCBjdHgoJHJlamVjdCwgcmVjb3JkLCAxKSk7XG4gICAgfSBjYXRjaChlcnIpe1xuICAgICAgJHJlamVjdC5jYWxsKHJlY29yZCwgZXJyKTtcbiAgICB9XG4gIH07XG4gIHJlcXVpcmUoJy4vJC5taXgnKShQLnByb3RvdHlwZSwge1xuICAgIC8vIDI1LjQuNS4zIFByb21pc2UucHJvdG90eXBlLnRoZW4ob25GdWxmaWxsZWQsIG9uUmVqZWN0ZWQpXG4gICAgdGhlbjogZnVuY3Rpb24gdGhlbihvbkZ1bGZpbGxlZCwgb25SZWplY3RlZCl7XG4gICAgICB2YXIgUyA9IGFuT2JqZWN0KGFuT2JqZWN0KHRoaXMpLmNvbnN0cnVjdG9yKVtTUEVDSUVTXTtcbiAgICAgIHZhciByZWFjdCA9IHtcbiAgICAgICAgb2s6ICAgdHlwZW9mIG9uRnVsZmlsbGVkID09ICdmdW5jdGlvbicgPyBvbkZ1bGZpbGxlZCA6IHRydWUsXG4gICAgICAgIGZhaWw6IHR5cGVvZiBvblJlamVjdGVkID09ICdmdW5jdGlvbicgID8gb25SZWplY3RlZCAgOiBmYWxzZVxuICAgICAgfTtcbiAgICAgIHZhciBwcm9taXNlID0gcmVhY3QuUCA9IG5ldyAoUyAhPSB1bmRlZmluZWQgPyBTIDogUCkoZnVuY3Rpb24ocmVzLCByZWope1xuICAgICAgICByZWFjdC5yZXMgPSBhRnVuY3Rpb24ocmVzKTtcbiAgICAgICAgcmVhY3QucmVqID0gYUZ1bmN0aW9uKHJlaik7XG4gICAgICB9KTtcbiAgICAgIHZhciByZWNvcmQgPSB0aGlzW1JFQ09SRF07XG4gICAgICByZWNvcmQuYy5wdXNoKHJlYWN0KTtcbiAgICAgIGlmKHJlY29yZC5hKXJlY29yZC5hLnB1c2gocmVhY3QpO1xuICAgICAgaWYocmVjb3JkLnMpbm90aWZ5KHJlY29yZCwgZmFsc2UpO1xuICAgICAgcmV0dXJuIHByb21pc2U7XG4gICAgfSxcbiAgICAvLyAyNS40LjUuMSBQcm9taXNlLnByb3RvdHlwZS5jYXRjaChvblJlamVjdGVkKVxuICAgICdjYXRjaCc6IGZ1bmN0aW9uKG9uUmVqZWN0ZWQpe1xuICAgICAgcmV0dXJuIHRoaXMudGhlbih1bmRlZmluZWQsIG9uUmVqZWN0ZWQpO1xuICAgIH1cbiAgfSk7XG59XG5cbi8vIGV4cG9ydFxuJGRlZigkZGVmLkcgKyAkZGVmLlcgKyAkZGVmLkYgKiAhdXNlTmF0aXZlLCB7UHJvbWlzZTogUH0pO1xucmVxdWlyZSgnLi8kLnRhZycpKFAsIFBST01JU0UpO1xuc3BlY2llcyhQKTtcbnNwZWNpZXMoV3JhcHBlciA9IHJlcXVpcmUoJy4vJC5jb3JlJylbUFJPTUlTRV0pO1xuXG4vLyBzdGF0aWNzXG4kZGVmKCRkZWYuUyArICRkZWYuRiAqICF1c2VOYXRpdmUsIFBST01JU0UsIHtcbiAgLy8gMjUuNC40LjUgUHJvbWlzZS5yZWplY3QocilcbiAgcmVqZWN0OiBmdW5jdGlvbiByZWplY3Qocil7XG4gICAgcmV0dXJuIG5ldyB0aGlzKGZ1bmN0aW9uKHJlcywgcmVqKXsgcmVqKHIpOyB9KTtcbiAgfVxufSk7XG4kZGVmKCRkZWYuUyArICRkZWYuRiAqICghdXNlTmF0aXZlIHx8IHRlc3RSZXNvbHZlKHRydWUpKSwgUFJPTUlTRSwge1xuICAvLyAyNS40LjQuNiBQcm9taXNlLnJlc29sdmUoeClcbiAgcmVzb2x2ZTogZnVuY3Rpb24gcmVzb2x2ZSh4KXtcbiAgICByZXR1cm4gaXNQcm9taXNlKHgpICYmIHNhbWVDb25zdHJ1Y3Rvcih4LmNvbnN0cnVjdG9yLCB0aGlzKVxuICAgICAgPyB4IDogbmV3IHRoaXMoZnVuY3Rpb24ocmVzKXsgcmVzKHgpOyB9KTtcbiAgfVxufSk7XG4kZGVmKCRkZWYuUyArICRkZWYuRiAqICEodXNlTmF0aXZlICYmIHJlcXVpcmUoJy4vJC5pdGVyLWRldGVjdCcpKGZ1bmN0aW9uKGl0ZXIpe1xuICBQLmFsbChpdGVyKVsnY2F0Y2gnXShmdW5jdGlvbigpe30pO1xufSkpLCBQUk9NSVNFLCB7XG4gIC8vIDI1LjQuNC4xIFByb21pc2UuYWxsKGl0ZXJhYmxlKVxuICBhbGw6IGZ1bmN0aW9uIGFsbChpdGVyYWJsZSl7XG4gICAgdmFyIEMgICAgICA9IGdldENvbnN0cnVjdG9yKHRoaXMpXG4gICAgICAsIHZhbHVlcyA9IFtdO1xuICAgIHJldHVybiBuZXcgQyhmdW5jdGlvbihyZXMsIHJlail7XG4gICAgICBmb3JPZihpdGVyYWJsZSwgZmFsc2UsIHZhbHVlcy5wdXNoLCB2YWx1ZXMpO1xuICAgICAgdmFyIHJlbWFpbmluZyA9IHZhbHVlcy5sZW5ndGhcbiAgICAgICAgLCByZXN1bHRzICAgPSBBcnJheShyZW1haW5pbmcpO1xuICAgICAgaWYocmVtYWluaW5nKSQuZWFjaC5jYWxsKHZhbHVlcywgZnVuY3Rpb24ocHJvbWlzZSwgaW5kZXgpe1xuICAgICAgICBDLnJlc29sdmUocHJvbWlzZSkudGhlbihmdW5jdGlvbih2YWx1ZSl7XG4gICAgICAgICAgcmVzdWx0c1tpbmRleF0gPSB2YWx1ZTtcbiAgICAgICAgICAtLXJlbWFpbmluZyB8fCByZXMocmVzdWx0cyk7XG4gICAgICAgIH0sIHJlaik7XG4gICAgICB9KTtcbiAgICAgIGVsc2UgcmVzKHJlc3VsdHMpO1xuICAgIH0pO1xuICB9LFxuICAvLyAyNS40LjQuNCBQcm9taXNlLnJhY2UoaXRlcmFibGUpXG4gIHJhY2U6IGZ1bmN0aW9uIHJhY2UoaXRlcmFibGUpe1xuICAgIHZhciBDID0gZ2V0Q29uc3RydWN0b3IodGhpcyk7XG4gICAgcmV0dXJuIG5ldyBDKGZ1bmN0aW9uKHJlcywgcmVqKXtcbiAgICAgIGZvck9mKGl0ZXJhYmxlLCBmYWxzZSwgZnVuY3Rpb24ocHJvbWlzZSl7XG4gICAgICAgIEMucmVzb2x2ZShwcm9taXNlKS50aGVuKHJlcywgcmVqKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG59KTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4uL34vYmFiZWwtcnVudGltZS9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNi5wcm9taXNlLmpzXG4gKiogbW9kdWxlIGlkID0gMzRcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIi8vIG9wdGlvbmFsIC8gc2ltcGxlIGNvbnRleHQgYmluZGluZ1xudmFyIGFGdW5jdGlvbiA9IHJlcXVpcmUoJy4vJC5hLWZ1bmN0aW9uJyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGZuLCB0aGF0LCBsZW5ndGgpe1xuICBhRnVuY3Rpb24oZm4pO1xuICBpZih0aGF0ID09PSB1bmRlZmluZWQpcmV0dXJuIGZuO1xuICBzd2l0Y2gobGVuZ3RoKXtcbiAgICBjYXNlIDE6IHJldHVybiBmdW5jdGlvbihhKXtcbiAgICAgIHJldHVybiBmbi5jYWxsKHRoYXQsIGEpO1xuICAgIH07XG4gICAgY2FzZSAyOiByZXR1cm4gZnVuY3Rpb24oYSwgYil7XG4gICAgICByZXR1cm4gZm4uY2FsbCh0aGF0LCBhLCBiKTtcbiAgICB9O1xuICAgIGNhc2UgMzogcmV0dXJuIGZ1bmN0aW9uKGEsIGIsIGMpe1xuICAgICAgcmV0dXJuIGZuLmNhbGwodGhhdCwgYSwgYiwgYyk7XG4gICAgfTtcbiAgfSByZXR1cm4gZnVuY3Rpb24oLyogLi4uYXJncyAqLyl7XG4gICAgICByZXR1cm4gZm4uYXBwbHkodGhhdCwgYXJndW1lbnRzKTtcbiAgICB9O1xufTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4uL34vYmFiZWwtcnVudGltZS9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzLyQuY3R4LmpzXG4gKiogbW9kdWxlIGlkID0gMzVcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXQpe1xuICBpZih0eXBlb2YgaXQgIT0gJ2Z1bmN0aW9uJyl0aHJvdyBUeXBlRXJyb3IoaXQgKyAnIGlzIG5vdCBhIGZ1bmN0aW9uIScpO1xuICByZXR1cm4gaXQ7XG59O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi4vfi9iYWJlbC1ydW50aW1lL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvJC5hLWZ1bmN0aW9uLmpzXG4gKiogbW9kdWxlIGlkID0gMzZcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIi8vIGdldHRpbmcgdGFnIGZyb20gMTkuMS4zLjYgT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZygpXG52YXIgY29mID0gcmVxdWlyZSgnLi8kLmNvZicpXG4gICwgVEFHID0gcmVxdWlyZSgnLi8kLndrcycpKCd0b1N0cmluZ1RhZycpXG4gIC8vIEVTMyB3cm9uZyBoZXJlXG4gICwgQVJHID0gY29mKGZ1bmN0aW9uKCl7IHJldHVybiBhcmd1bWVudHM7IH0oKSkgPT0gJ0FyZ3VtZW50cyc7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXQpe1xuICB2YXIgTywgVCwgQjtcbiAgcmV0dXJuIGl0ID09PSB1bmRlZmluZWQgPyAnVW5kZWZpbmVkJyA6IGl0ID09PSBudWxsID8gJ051bGwnXG4gICAgLy8gQEB0b1N0cmluZ1RhZyBjYXNlXG4gICAgOiB0eXBlb2YgKFQgPSAoTyA9IE9iamVjdChpdCkpW1RBR10pID09ICdzdHJpbmcnID8gVFxuICAgIC8vIGJ1aWx0aW5UYWcgY2FzZVxuICAgIDogQVJHID8gY29mKE8pXG4gICAgLy8gRVMzIGFyZ3VtZW50cyBmYWxsYmFja1xuICAgIDogKEIgPSBjb2YoTykpID09ICdPYmplY3QnICYmIHR5cGVvZiBPLmNhbGxlZSA9PSAnZnVuY3Rpb24nID8gJ0FyZ3VtZW50cycgOiBCO1xufTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4uL34vYmFiZWwtcnVudGltZS9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzLyQuY2xhc3NvZi5qc1xuICoqIG1vZHVsZSBpZCA9IDM3XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIvLyBodHRwOi8vanNwZXJmLmNvbS9jb3JlLWpzLWlzb2JqZWN0XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0KXtcbiAgcmV0dXJuIGl0ICE9PSBudWxsICYmICh0eXBlb2YgaXQgPT0gJ29iamVjdCcgfHwgdHlwZW9mIGl0ID09ICdmdW5jdGlvbicpO1xufTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4uL34vYmFiZWwtcnVudGltZS9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzLyQuaXMtb2JqZWN0LmpzXG4gKiogbW9kdWxlIGlkID0gMzhcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsInZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4vJC5pcy1vYmplY3QnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXQpe1xuICBpZighaXNPYmplY3QoaXQpKXRocm93IFR5cGVFcnJvcihpdCArICcgaXMgbm90IGFuIG9iamVjdCEnKTtcbiAgcmV0dXJuIGl0O1xufTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4uL34vYmFiZWwtcnVudGltZS9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzLyQuYW4tb2JqZWN0LmpzXG4gKiogbW9kdWxlIGlkID0gMzlcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXQsIENvbnN0cnVjdG9yLCBuYW1lKXtcbiAgaWYoIShpdCBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSl0aHJvdyBUeXBlRXJyb3IobmFtZSArIFwiOiB1c2UgdGhlICduZXcnIG9wZXJhdG9yIVwiKTtcbiAgcmV0dXJuIGl0O1xufTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4uL34vYmFiZWwtcnVudGltZS9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzLyQuc3RyaWN0LW5ldy5qc1xuICoqIG1vZHVsZSBpZCA9IDQwXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJ2YXIgY3R4ICAgICAgICAgPSByZXF1aXJlKCcuLyQuY3R4JylcbiAgLCBjYWxsICAgICAgICA9IHJlcXVpcmUoJy4vJC5pdGVyLWNhbGwnKVxuICAsIGlzQXJyYXlJdGVyID0gcmVxdWlyZSgnLi8kLmlzLWFycmF5LWl0ZXInKVxuICAsIGFuT2JqZWN0ICAgID0gcmVxdWlyZSgnLi8kLmFuLW9iamVjdCcpXG4gICwgdG9MZW5ndGggICAgPSByZXF1aXJlKCcuLyQudG8tbGVuZ3RoJylcbiAgLCBnZXRJdGVyRm4gICA9IHJlcXVpcmUoJy4vY29yZS5nZXQtaXRlcmF0b3ItbWV0aG9kJyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0ZXJhYmxlLCBlbnRyaWVzLCBmbiwgdGhhdCl7XG4gIHZhciBpdGVyRm4gPSBnZXRJdGVyRm4oaXRlcmFibGUpXG4gICAgLCBmICAgICAgPSBjdHgoZm4sIHRoYXQsIGVudHJpZXMgPyAyIDogMSlcbiAgICAsIGluZGV4ICA9IDBcbiAgICAsIGxlbmd0aCwgc3RlcCwgaXRlcmF0b3I7XG4gIGlmKHR5cGVvZiBpdGVyRm4gIT0gJ2Z1bmN0aW9uJyl0aHJvdyBUeXBlRXJyb3IoaXRlcmFibGUgKyAnIGlzIG5vdCBpdGVyYWJsZSEnKTtcbiAgLy8gZmFzdCBjYXNlIGZvciBhcnJheXMgd2l0aCBkZWZhdWx0IGl0ZXJhdG9yXG4gIGlmKGlzQXJyYXlJdGVyKGl0ZXJGbikpZm9yKGxlbmd0aCA9IHRvTGVuZ3RoKGl0ZXJhYmxlLmxlbmd0aCk7IGxlbmd0aCA+IGluZGV4OyBpbmRleCsrKXtcbiAgICBlbnRyaWVzID8gZihhbk9iamVjdChzdGVwID0gaXRlcmFibGVbaW5kZXhdKVswXSwgc3RlcFsxXSkgOiBmKGl0ZXJhYmxlW2luZGV4XSk7XG4gIH0gZWxzZSBmb3IoaXRlcmF0b3IgPSBpdGVyRm4uY2FsbChpdGVyYWJsZSk7ICEoc3RlcCA9IGl0ZXJhdG9yLm5leHQoKSkuZG9uZTsgKXtcbiAgICBjYWxsKGl0ZXJhdG9yLCBmLCBzdGVwLnZhbHVlLCBlbnRyaWVzKTtcbiAgfVxufTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4uL34vYmFiZWwtcnVudGltZS9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzLyQuZm9yLW9mLmpzXG4gKiogbW9kdWxlIGlkID0gNDFcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIi8vIGNhbGwgc29tZXRoaW5nIG9uIGl0ZXJhdG9yIHN0ZXAgd2l0aCBzYWZlIGNsb3Npbmcgb24gZXJyb3JcbnZhciBhbk9iamVjdCA9IHJlcXVpcmUoJy4vJC5hbi1vYmplY3QnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXRlcmF0b3IsIGZuLCB2YWx1ZSwgZW50cmllcyl7XG4gIHRyeSB7XG4gICAgcmV0dXJuIGVudHJpZXMgPyBmbihhbk9iamVjdCh2YWx1ZSlbMF0sIHZhbHVlWzFdKSA6IGZuKHZhbHVlKTtcbiAgLy8gNy40LjYgSXRlcmF0b3JDbG9zZShpdGVyYXRvciwgY29tcGxldGlvbilcbiAgfSBjYXRjaChlKXtcbiAgICB2YXIgcmV0ID0gaXRlcmF0b3JbJ3JldHVybiddO1xuICAgIGlmKHJldCAhPT0gdW5kZWZpbmVkKWFuT2JqZWN0KHJldC5jYWxsKGl0ZXJhdG9yKSk7XG4gICAgdGhyb3cgZTtcbiAgfVxufTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4uL34vYmFiZWwtcnVudGltZS9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzLyQuaXRlci1jYWxsLmpzXG4gKiogbW9kdWxlIGlkID0gNDJcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIi8vIGNoZWNrIG9uIGRlZmF1bHQgQXJyYXkgaXRlcmF0b3JcbnZhciBJdGVyYXRvcnMgPSByZXF1aXJlKCcuLyQuaXRlcmF0b3JzJylcbiAgLCBJVEVSQVRPUiAgPSByZXF1aXJlKCcuLyQud2tzJykoJ2l0ZXJhdG9yJyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0KXtcbiAgcmV0dXJuIChJdGVyYXRvcnMuQXJyYXkgfHwgQXJyYXkucHJvdG90eXBlW0lURVJBVE9SXSkgPT09IGl0O1xufTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4uL34vYmFiZWwtcnVudGltZS9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzLyQuaXMtYXJyYXktaXRlci5qc1xuICoqIG1vZHVsZSBpZCA9IDQzXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIvLyA3LjEuMTUgVG9MZW5ndGhcbnZhciB0b0ludGVnZXIgPSByZXF1aXJlKCcuLyQudG8taW50ZWdlcicpXG4gICwgbWluICAgICAgID0gTWF0aC5taW47XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0KXtcbiAgcmV0dXJuIGl0ID4gMCA/IG1pbih0b0ludGVnZXIoaXQpLCAweDFmZmZmZmZmZmZmZmZmKSA6IDA7IC8vIHBvdygyLCA1MykgLSAxID09IDkwMDcxOTkyNTQ3NDA5OTFcbn07XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuLi9+L2JhYmVsLXJ1bnRpbWUvfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy8kLnRvLWxlbmd0aC5qc1xuICoqIG1vZHVsZSBpZCA9IDQ0XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJ2YXIgY2xhc3NvZiAgID0gcmVxdWlyZSgnLi8kLmNsYXNzb2YnKVxuICAsIElURVJBVE9SICA9IHJlcXVpcmUoJy4vJC53a3MnKSgnaXRlcmF0b3InKVxuICAsIEl0ZXJhdG9ycyA9IHJlcXVpcmUoJy4vJC5pdGVyYXRvcnMnKTtcbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi8kLmNvcmUnKS5nZXRJdGVyYXRvck1ldGhvZCA9IGZ1bmN0aW9uKGl0KXtcbiAgaWYoaXQgIT0gdW5kZWZpbmVkKXJldHVybiBpdFtJVEVSQVRPUl0gfHwgaXRbJ0BAaXRlcmF0b3InXSB8fCBJdGVyYXRvcnNbY2xhc3NvZihpdCldO1xufTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4uL34vYmFiZWwtcnVudGltZS9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2NvcmUuZ2V0LWl0ZXJhdG9yLW1ldGhvZC5qc1xuICoqIG1vZHVsZSBpZCA9IDQ1XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIvLyBXb3JrcyB3aXRoIF9fcHJvdG9fXyBvbmx5LiBPbGQgdjggY2FuJ3Qgd29yayB3aXRoIG51bGwgcHJvdG8gb2JqZWN0cy5cbi8qIGVzbGludC1kaXNhYmxlIG5vLXByb3RvICovXG52YXIgZ2V0RGVzYyAgPSByZXF1aXJlKCcuLyQnKS5nZXREZXNjXG4gICwgaXNPYmplY3QgPSByZXF1aXJlKCcuLyQuaXMtb2JqZWN0JylcbiAgLCBhbk9iamVjdCA9IHJlcXVpcmUoJy4vJC5hbi1vYmplY3QnKTtcbnZhciBjaGVjayA9IGZ1bmN0aW9uKE8sIHByb3RvKXtcbiAgYW5PYmplY3QoTyk7XG4gIGlmKCFpc09iamVjdChwcm90bykgJiYgcHJvdG8gIT09IG51bGwpdGhyb3cgVHlwZUVycm9yKHByb3RvICsgXCI6IGNhbid0IHNldCBhcyBwcm90b3R5cGUhXCIpO1xufTtcbm1vZHVsZS5leHBvcnRzID0ge1xuICBzZXQ6IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fCAoJ19fcHJvdG9fXycgaW4ge30gLy8gZXNsaW50LWRpc2FibGUtbGluZVxuICAgID8gZnVuY3Rpb24oYnVnZ3ksIHNldCl7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgc2V0ID0gcmVxdWlyZSgnLi8kLmN0eCcpKEZ1bmN0aW9uLmNhbGwsIGdldERlc2MoT2JqZWN0LnByb3RvdHlwZSwgJ19fcHJvdG9fXycpLnNldCwgMik7XG4gICAgICAgICAgc2V0KHt9LCBbXSk7XG4gICAgICAgIH0gY2F0Y2goZSl7IGJ1Z2d5ID0gdHJ1ZTsgfVxuICAgICAgICByZXR1cm4gZnVuY3Rpb24gc2V0UHJvdG90eXBlT2YoTywgcHJvdG8pe1xuICAgICAgICAgIGNoZWNrKE8sIHByb3RvKTtcbiAgICAgICAgICBpZihidWdneSlPLl9fcHJvdG9fXyA9IHByb3RvO1xuICAgICAgICAgIGVsc2Ugc2V0KE8sIHByb3RvKTtcbiAgICAgICAgICByZXR1cm4gTztcbiAgICAgICAgfTtcbiAgICAgIH0oKVxuICAgIDogdW5kZWZpbmVkKSxcbiAgY2hlY2s6IGNoZWNrXG59O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi4vfi9iYWJlbC1ydW50aW1lL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvJC5zZXQtcHJvdG8uanNcbiAqKiBtb2R1bGUgaWQgPSA0NlxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBPYmplY3QuaXMgfHwgZnVuY3Rpb24gaXMoeCwgeSl7XG4gIHJldHVybiB4ID09PSB5ID8geCAhPT0gMCB8fCAxIC8geCA9PT0gMSAvIHkgOiB4ICE9IHggJiYgeSAhPSB5O1xufTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4uL34vYmFiZWwtcnVudGltZS9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzLyQuc2FtZS5qc1xuICoqIG1vZHVsZSBpZCA9IDQ3XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIndXNlIHN0cmljdCc7XG52YXIgJCAgICAgICA9IHJlcXVpcmUoJy4vJCcpXG4gICwgU1BFQ0lFUyA9IHJlcXVpcmUoJy4vJC53a3MnKSgnc3BlY2llcycpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihDKXtcbiAgaWYocmVxdWlyZSgnLi8kLnN1cHBvcnQtZGVzYycpICYmICEoU1BFQ0lFUyBpbiBDKSkkLnNldERlc2MoQywgU1BFQ0lFUywge1xuICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICBnZXQ6IGZ1bmN0aW9uKCl7IHJldHVybiB0aGlzOyB9XG4gIH0pO1xufTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4uL34vYmFiZWwtcnVudGltZS9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzLyQuc3BlY2llcy5qc1xuICoqIG1vZHVsZSBpZCA9IDQ4XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJ2YXIgZ2xvYmFsICAgID0gcmVxdWlyZSgnLi8kLmdsb2JhbCcpXHJcbiAgLCBtYWNyb3Rhc2sgPSByZXF1aXJlKCcuLyQudGFzaycpLnNldFxyXG4gICwgT2JzZXJ2ZXIgID0gZ2xvYmFsLk11dGF0aW9uT2JzZXJ2ZXIgfHwgZ2xvYmFsLldlYktpdE11dGF0aW9uT2JzZXJ2ZXJcclxuICAsIHByb2Nlc3MgICA9IGdsb2JhbC5wcm9jZXNzXHJcbiAgLCBoZWFkLCBsYXN0LCBub3RpZnk7XHJcblxyXG5mdW5jdGlvbiBmbHVzaCgpe1xyXG4gIHdoaWxlKGhlYWQpe1xyXG4gICAgaGVhZC5mbi5jYWxsKCk7IC8vIDwtIGN1cnJlbnRseSB3ZSB1c2UgaXQgb25seSBmb3IgUHJvbWlzZSAtIHRyeSAvIGNhdGNoIG5vdCByZXF1aXJlZFxyXG4gICAgaGVhZCA9IGhlYWQubmV4dDtcclxuICB9IGxhc3QgPSB1bmRlZmluZWQ7XHJcbn1cclxuXHJcbi8vIE5vZGUuanNcclxuaWYocmVxdWlyZSgnLi8kLmNvZicpKHByb2Nlc3MpID09ICdwcm9jZXNzJyl7XHJcbiAgbm90aWZ5ID0gZnVuY3Rpb24oKXtcclxuICAgIHByb2Nlc3MubmV4dFRpY2soZmx1c2gpO1xyXG4gIH07XHJcbi8vIGJyb3dzZXJzIHdpdGggTXV0YXRpb25PYnNlcnZlclxyXG59IGVsc2UgaWYoT2JzZXJ2ZXIpe1xyXG4gIHZhciB0b2dnbGUgPSAxXHJcbiAgICAsIG5vZGUgICA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKCcnKTtcclxuICBuZXcgT2JzZXJ2ZXIoZmx1c2gpLm9ic2VydmUobm9kZSwge2NoYXJhY3RlckRhdGE6IHRydWV9KTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1uZXdcclxuICBub3RpZnkgPSBmdW5jdGlvbigpe1xyXG4gICAgbm9kZS5kYXRhID0gdG9nZ2xlID0gLXRvZ2dsZTtcclxuICB9O1xyXG4vLyBmb3Igb3RoZXIgZW52aXJvbm1lbnRzIC0gbWFjcm90YXNrIGJhc2VkIG9uOlxyXG4vLyAtIHNldEltbWVkaWF0ZVxyXG4vLyAtIE1lc3NhZ2VDaGFubmVsXHJcbi8vIC0gd2luZG93LnBvc3RNZXNzYWdcclxuLy8gLSBvbnJlYWR5c3RhdGVjaGFuZ2VcclxuLy8gLSBzZXRUaW1lb3V0XHJcbn0gZWxzZSB7XHJcbiAgbm90aWZ5ID0gZnVuY3Rpb24oKXtcclxuICAgIC8vIHN0cmFuZ2UgSUUgKyB3ZWJwYWNrIGRldiBzZXJ2ZXIgYnVnIC0gdXNlIC5jYWxsKGdsb2JhbClcclxuICAgIG1hY3JvdGFzay5jYWxsKGdsb2JhbCwgZmx1c2gpO1xyXG4gIH07XHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gYXNhcChmbil7XHJcbiAgdmFyIHRhc2sgPSB7Zm46IGZuLCBuZXh0OiB1bmRlZmluZWR9O1xyXG4gIGlmKGxhc3QpbGFzdC5uZXh0ID0gdGFzaztcclxuICBpZighaGVhZCl7XHJcbiAgICBoZWFkID0gdGFzaztcclxuICAgIG5vdGlmeSgpO1xyXG4gIH0gbGFzdCA9IHRhc2s7XHJcbn07XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuLi9+L2JhYmVsLXJ1bnRpbWUvfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy8kLm1pY3JvdGFzay5qc1xuICoqIG1vZHVsZSBpZCA9IDQ5XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIndXNlIHN0cmljdCc7XG52YXIgY3R4ICAgICAgICAgICAgICAgID0gcmVxdWlyZSgnLi8kLmN0eCcpXG4gICwgaW52b2tlICAgICAgICAgICAgID0gcmVxdWlyZSgnLi8kLmludm9rZScpXG4gICwgaHRtbCAgICAgICAgICAgICAgID0gcmVxdWlyZSgnLi8kLmh0bWwnKVxuICAsIGNlbCAgICAgICAgICAgICAgICA9IHJlcXVpcmUoJy4vJC5kb20tY3JlYXRlJylcbiAgLCBnbG9iYWwgICAgICAgICAgICAgPSByZXF1aXJlKCcuLyQuZ2xvYmFsJylcbiAgLCBwcm9jZXNzICAgICAgICAgICAgPSBnbG9iYWwucHJvY2Vzc1xuICAsIHNldFRhc2sgICAgICAgICAgICA9IGdsb2JhbC5zZXRJbW1lZGlhdGVcbiAgLCBjbGVhclRhc2sgICAgICAgICAgPSBnbG9iYWwuY2xlYXJJbW1lZGlhdGVcbiAgLCBNZXNzYWdlQ2hhbm5lbCAgICAgPSBnbG9iYWwuTWVzc2FnZUNoYW5uZWxcbiAgLCBjb3VudGVyICAgICAgICAgICAgPSAwXG4gICwgcXVldWUgICAgICAgICAgICAgID0ge31cbiAgLCBPTlJFQURZU1RBVEVDSEFOR0UgPSAnb25yZWFkeXN0YXRlY2hhbmdlJ1xuICAsIGRlZmVyLCBjaGFubmVsLCBwb3J0O1xudmFyIHJ1biA9IGZ1bmN0aW9uKCl7XG4gIHZhciBpZCA9ICt0aGlzO1xuICBpZihxdWV1ZS5oYXNPd25Qcm9wZXJ0eShpZCkpe1xuICAgIHZhciBmbiA9IHF1ZXVlW2lkXTtcbiAgICBkZWxldGUgcXVldWVbaWRdO1xuICAgIGZuKCk7XG4gIH1cbn07XG52YXIgbGlzdG5lciA9IGZ1bmN0aW9uKGV2ZW50KXtcbiAgcnVuLmNhbGwoZXZlbnQuZGF0YSk7XG59O1xuLy8gTm9kZS5qcyAwLjkrICYgSUUxMCsgaGFzIHNldEltbWVkaWF0ZSwgb3RoZXJ3aXNlOlxuaWYoIXNldFRhc2sgfHwgIWNsZWFyVGFzayl7XG4gIHNldFRhc2sgPSBmdW5jdGlvbiBzZXRJbW1lZGlhdGUoZm4pe1xuICAgIHZhciBhcmdzID0gW10sIGkgPSAxO1xuICAgIHdoaWxlKGFyZ3VtZW50cy5sZW5ndGggPiBpKWFyZ3MucHVzaChhcmd1bWVudHNbaSsrXSk7XG4gICAgcXVldWVbKytjb3VudGVyXSA9IGZ1bmN0aW9uKCl7XG4gICAgICBpbnZva2UodHlwZW9mIGZuID09ICdmdW5jdGlvbicgPyBmbiA6IEZ1bmN0aW9uKGZuKSwgYXJncyk7XG4gICAgfTtcbiAgICBkZWZlcihjb3VudGVyKTtcbiAgICByZXR1cm4gY291bnRlcjtcbiAgfTtcbiAgY2xlYXJUYXNrID0gZnVuY3Rpb24gY2xlYXJJbW1lZGlhdGUoaWQpe1xuICAgIGRlbGV0ZSBxdWV1ZVtpZF07XG4gIH07XG4gIC8vIE5vZGUuanMgMC44LVxuICBpZihyZXF1aXJlKCcuLyQuY29mJykocHJvY2VzcykgPT0gJ3Byb2Nlc3MnKXtcbiAgICBkZWZlciA9IGZ1bmN0aW9uKGlkKXtcbiAgICAgIHByb2Nlc3MubmV4dFRpY2soY3R4KHJ1biwgaWQsIDEpKTtcbiAgICB9O1xuICAvLyBCcm93c2VycyB3aXRoIE1lc3NhZ2VDaGFubmVsLCBpbmNsdWRlcyBXZWJXb3JrZXJzXG4gIH0gZWxzZSBpZihNZXNzYWdlQ2hhbm5lbCl7XG4gICAgY2hhbm5lbCA9IG5ldyBNZXNzYWdlQ2hhbm5lbDtcbiAgICBwb3J0ICAgID0gY2hhbm5lbC5wb3J0MjtcbiAgICBjaGFubmVsLnBvcnQxLm9ubWVzc2FnZSA9IGxpc3RuZXI7XG4gICAgZGVmZXIgPSBjdHgocG9ydC5wb3N0TWVzc2FnZSwgcG9ydCwgMSk7XG4gIC8vIEJyb3dzZXJzIHdpdGggcG9zdE1lc3NhZ2UsIHNraXAgV2ViV29ya2Vyc1xuICAvLyBJRTggaGFzIHBvc3RNZXNzYWdlLCBidXQgaXQncyBzeW5jICYgdHlwZW9mIGl0cyBwb3N0TWVzc2FnZSBpcyAnb2JqZWN0J1xuICB9IGVsc2UgaWYoZ2xvYmFsLmFkZEV2ZW50TGlzdGVuZXIgJiYgdHlwZW9mIHBvc3RNZXNzYWdlID09ICdmdW5jdGlvbicgJiYgIWdsb2JhbC5pbXBvcnRTY3JpcHQpe1xuICAgIGRlZmVyID0gZnVuY3Rpb24oaWQpe1xuICAgICAgZ2xvYmFsLnBvc3RNZXNzYWdlKGlkICsgJycsICcqJyk7XG4gICAgfTtcbiAgICBnbG9iYWwuYWRkRXZlbnRMaXN0ZW5lcignbWVzc2FnZScsIGxpc3RuZXIsIGZhbHNlKTtcbiAgLy8gSUU4LVxuICB9IGVsc2UgaWYoT05SRUFEWVNUQVRFQ0hBTkdFIGluIGNlbCgnc2NyaXB0Jykpe1xuICAgIGRlZmVyID0gZnVuY3Rpb24oaWQpe1xuICAgICAgaHRtbC5hcHBlbmRDaGlsZChjZWwoJ3NjcmlwdCcpKVtPTlJFQURZU1RBVEVDSEFOR0VdID0gZnVuY3Rpb24oKXtcbiAgICAgICAgaHRtbC5yZW1vdmVDaGlsZCh0aGlzKTtcbiAgICAgICAgcnVuLmNhbGwoaWQpO1xuICAgICAgfTtcbiAgICB9O1xuICAvLyBSZXN0IG9sZCBicm93c2Vyc1xuICB9IGVsc2Uge1xuICAgIGRlZmVyID0gZnVuY3Rpb24oaWQpe1xuICAgICAgc2V0VGltZW91dChjdHgocnVuLCBpZCwgMSksIDApO1xuICAgIH07XG4gIH1cbn1cbm1vZHVsZS5leHBvcnRzID0ge1xuICBzZXQ6ICAgc2V0VGFzayxcbiAgY2xlYXI6IGNsZWFyVGFza1xufTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4uL34vYmFiZWwtcnVudGltZS9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzLyQudGFzay5qc1xuICoqIG1vZHVsZSBpZCA9IDUwXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIvLyBmYXN0IGFwcGx5LCBodHRwOi8vanNwZXJmLmxua2l0LmNvbS9mYXN0LWFwcGx5LzVcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oZm4sIGFyZ3MsIHRoYXQpe1xuICB2YXIgdW4gPSB0aGF0ID09PSB1bmRlZmluZWQ7XG4gIHN3aXRjaChhcmdzLmxlbmd0aCl7XG4gICAgY2FzZSAwOiByZXR1cm4gdW4gPyBmbigpXG4gICAgICAgICAgICAgICAgICAgICAgOiBmbi5jYWxsKHRoYXQpO1xuICAgIGNhc2UgMTogcmV0dXJuIHVuID8gZm4oYXJnc1swXSlcbiAgICAgICAgICAgICAgICAgICAgICA6IGZuLmNhbGwodGhhdCwgYXJnc1swXSk7XG4gICAgY2FzZSAyOiByZXR1cm4gdW4gPyBmbihhcmdzWzBdLCBhcmdzWzFdKVxuICAgICAgICAgICAgICAgICAgICAgIDogZm4uY2FsbCh0aGF0LCBhcmdzWzBdLCBhcmdzWzFdKTtcbiAgICBjYXNlIDM6IHJldHVybiB1biA/IGZuKGFyZ3NbMF0sIGFyZ3NbMV0sIGFyZ3NbMl0pXG4gICAgICAgICAgICAgICAgICAgICAgOiBmbi5jYWxsKHRoYXQsIGFyZ3NbMF0sIGFyZ3NbMV0sIGFyZ3NbMl0pO1xuICAgIGNhc2UgNDogcmV0dXJuIHVuID8gZm4oYXJnc1swXSwgYXJnc1sxXSwgYXJnc1syXSwgYXJnc1szXSlcbiAgICAgICAgICAgICAgICAgICAgICA6IGZuLmNhbGwodGhhdCwgYXJnc1swXSwgYXJnc1sxXSwgYXJnc1syXSwgYXJnc1szXSk7XG4gIH0gcmV0dXJuICAgICAgICAgICAgICBmbi5hcHBseSh0aGF0LCBhcmdzKTtcbn07XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuLi9+L2JhYmVsLXJ1bnRpbWUvfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy8kLmludm9rZS5qc1xuICoqIG1vZHVsZSBpZCA9IDUxXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vJC5nbG9iYWwnKS5kb2N1bWVudCAmJiBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQ7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuLi9+L2JhYmVsLXJ1bnRpbWUvfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy8kLmh0bWwuanNcbiAqKiBtb2R1bGUgaWQgPSA1MlxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwidmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi8kLmlzLW9iamVjdCcpXG4gICwgZG9jdW1lbnQgPSByZXF1aXJlKCcuLyQuZ2xvYmFsJykuZG9jdW1lbnRcbiAgLy8gaW4gb2xkIElFIHR5cGVvZiBkb2N1bWVudC5jcmVhdGVFbGVtZW50IGlzICdvYmplY3QnXG4gICwgaXMgPSBpc09iamVjdChkb2N1bWVudCkgJiYgaXNPYmplY3QoZG9jdW1lbnQuY3JlYXRlRWxlbWVudCk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0KXtcbiAgcmV0dXJuIGlzID8gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChpdCkgOiB7fTtcbn07XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuLi9+L2JhYmVsLXJ1bnRpbWUvfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy8kLmRvbS1jcmVhdGUuanNcbiAqKiBtb2R1bGUgaWQgPSA1M1xuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwidmFyICRyZWRlZiA9IHJlcXVpcmUoJy4vJC5yZWRlZicpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbih0YXJnZXQsIHNyYyl7XG4gIGZvcih2YXIga2V5IGluIHNyYykkcmVkZWYodGFyZ2V0LCBrZXksIHNyY1trZXldKTtcbiAgcmV0dXJuIHRhcmdldDtcbn07XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuLi9+L2JhYmVsLXJ1bnRpbWUvfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy8kLm1peC5qc1xuICoqIG1vZHVsZSBpZCA9IDU0XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJ2YXIgU1lNQk9MX0lURVJBVE9SID0gcmVxdWlyZSgnLi8kLndrcycpKCdpdGVyYXRvcicpXG4gICwgU0FGRV9DTE9TSU5HICAgID0gZmFsc2U7XG50cnkge1xuICB2YXIgcml0ZXIgPSBbN11bU1lNQk9MX0lURVJBVE9SXSgpO1xuICByaXRlclsncmV0dXJuJ10gPSBmdW5jdGlvbigpeyBTQUZFX0NMT1NJTkcgPSB0cnVlOyB9O1xuICBBcnJheS5mcm9tKHJpdGVyLCBmdW5jdGlvbigpeyB0aHJvdyAyOyB9KTtcbn0gY2F0Y2goZSl7IC8qIGVtcHR5ICovIH1cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oZXhlYyl7XG4gIGlmKCFTQUZFX0NMT1NJTkcpcmV0dXJuIGZhbHNlO1xuICB2YXIgc2FmZSA9IGZhbHNlO1xuICB0cnkge1xuICAgIHZhciBhcnIgID0gWzddXG4gICAgICAsIGl0ZXIgPSBhcnJbU1lNQk9MX0lURVJBVE9SXSgpO1xuICAgIGl0ZXIubmV4dCA9IGZ1bmN0aW9uKCl7IHNhZmUgPSB0cnVlOyB9O1xuICAgIGFycltTWU1CT0xfSVRFUkFUT1JdID0gZnVuY3Rpb24oKXsgcmV0dXJuIGl0ZXI7IH07XG4gICAgZXhlYyhhcnIpO1xuICB9IGNhdGNoKGUpeyAvKiBlbXB0eSAqLyB9XG4gIHJldHVybiBzYWZlO1xufTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4uL34vYmFiZWwtcnVudGltZS9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzLyQuaXRlci1kZXRlY3QuanNcbiAqKiBtb2R1bGUgaWQgPSA1NVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmV4cG9ydHNbXCJkZWZhdWx0XCJdID0gZnVuY3Rpb24gKG9iaikge1xuICByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDoge1xuICAgIFwiZGVmYXVsdFwiOiBvYmpcbiAgfTtcbn07XG5cbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuLi9+L2JhYmVsLXJ1bnRpbWUvaGVscGVycy9pbnRlcm9wLXJlcXVpcmUtZGVmYXVsdC5qc1xuICoqIG1vZHVsZSBpZCA9IDU2XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCBJbnRlcmZhY2UgZnJvbSAnZGVtby9wbGF5bGFuZy5pbnRlcmZhY2UuanMnO1xuaW1wb3J0IFJ1bnRpbWUgZnJvbSAnZGVtby9wbGF5bGFuZy5ydW50aW1lLmpzJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gUGxheWxhbmcoKSB7XG4gIHRoaXMuX3J1bnRpbWUgPSBuZXcgUnVudGltZSgpO1xuICB0aGlzLl9pbnRlcmZhY2UgPSBuZXcgSW50ZXJmYWNlKHRoaXMuX3J1bnRpbWUpO1xuICByZXR1cm4gdGhpcy5faW50ZXJmYWNlO1xufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9wbGF5bGFuZy5qc1xuICoqLyIsIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IFJ1bmUgZnJvbSAnZGlzdC9ydW5lLmpzJztcblxuLyoqXG4gKiBBIGRlbW8gZURTTCB3aXRoIG1vc3QgZmVhdHVyZXMgYSBmdWxsIGxhbmd1YWdlIHNob3VsZCBiZSB3aXRoLlxuICogVGhpcyBmaWxlIGNvbnRhaW5zIG9ubHkgaW50ZXJmYWNlbiwgd2hpY2ggbWVhbnMgaXQgbmVlZCB0byBiZSBpbnN0YW50aWF0ZWRcbiAqIHdpdGggYSBydW50aW1lIHRvIGV4ZWN1dGUgdGhlIGxhbmd1YWdlLlxuICpcbiAqIE5vdGU6IHNpbmNlIHRvIGhhbmRsZSBhc3luYyBmdW5jdGlvbiBwcm9wZXJseSBuZWVkIGV4dHJhIGVmZm9ydHMsXG4gKiBzbyB0aGlzIGRlbW8gbGFuZ3VhZ2UgZG9lc24ndCBmdWxseSBoYW5kbGUgdGhlbSB5ZXQuIEFsdGhvdWdoIHRoaXMgZURTTFxuICogaW5kZWVkIHB1dCBhbGwgc3RlcHMgaW4gYSBQcm9taXNlIHRvIGJlIHRoZSBmaXJzdCBzdGVwIHRvd2FyZCB0aGF0LlxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBJbnRlcmZhY2UocnVudGltZSkge1xuICB0aGlzLmNvbnRleHQgPSB7XG4gICAgc3RhcnRlZDogZmFsc2UsXG4gICAgc3RvcHBlZDogZmFsc2UsXG4gICAgbG9vcGluZzogZmFsc2UsXG4gICAgbWF0Y2hpbmc6IGZhbHNlXG4gIH07XG4gIHRoaXMuc3RhY2sgPSBbXTtcbiAgdGhpcy5fcnVudGltZSA9IHJ1bnRpbWU7XG4gIHRoaXMuX2V2YWx1YXRvciA9IChuZXcgUnVuZS5FdmFsdWF0ZSgpKVxuICAgIC5hbmFseXplcih0aGlzLl9hbmFseXplT3JkZXIuYmluZCh0aGlzKSlcbiAgICAuaW50ZXJwcmV0ZXIodGhpcy5faW50ZXJwcmV0LmJpbmQodGhpcykpO1xufVxuXG5JbnRlcmZhY2UucHJvdG90eXBlLnN0YXJ0ID0gUnVuZS5kZWZpbmUoJ3N0YXJ0JywgJ2JlZ2luJyk7XG5JbnRlcmZhY2UucHJvdG90eXBlLmRvbmUgPSBSdW5lLmRlZmluZSgnZG9uZScsICdleGl0Jyk7XG5JbnRlcmZhY2UucHJvdG90eXBlLmVmZmVjdCA9IFJ1bmUuZGVmaW5lKCdlZmZlY3QnLCAnZXhpdCcpO1xuSW50ZXJmYWNlLnByb3RvdHlwZS5uZXh0ID0gUnVuZS5kZWZpbmUoJ25leHQnLCAncHVzaCcpO1xuSW50ZXJmYWNlLnByb3RvdHlwZS5tYXRjaCA9IFJ1bmUuZGVmaW5lKCdtYXRjaCcsICdiZWdpbicpO1xuSW50ZXJmYWNlLnByb3RvdHlwZS5lbmQgPSBSdW5lLmRlZmluZSgnZW5kJywgJ2VuZCcpO1xuSW50ZXJmYWNlLnByb3RvdHlwZS5jYXNlID0gUnVuZS5kZWZpbmUoJ2Nhc2UnLCAncHVzaCcpO1xuSW50ZXJmYWNlLnByb3RvdHlwZS50byA9IFJ1bmUuZGVmaW5lKCd0bycsICdwdXNoJyk7XG5JbnRlcmZhY2UucHJvdG90eXBlLmFzID0gUnVuZS5kZWZpbmUoJ2FzJywgJ3B1c2gnKTtcbkludGVyZmFjZS5wcm90b3R5cGUubG9vcCA9IFJ1bmUuZGVmaW5lKCdsb29wJywgJ2JlZ2luJyk7XG5JbnRlcmZhY2UucHJvdG90eXBlLnVudGlsID0gUnVuZS5kZWZpbmUoJ3VudGlsJywgJ2VuZCcpO1xuSW50ZXJmYWNlLnByb3RvdHlwZS5hbnkgPSBSdW5lLmRlZmluZSgnYW55JywgJ3B1c2gnKTtcbkludGVyZmFjZS5wcm90b3R5cGUuYWxsID0gUnVuZS5kZWZpbmUoJ2FsbCcsICdwdXNoJyk7XG5cbkludGVyZmFjZS5wcm90b3R5cGUub25jaGFuZ2UgPSBmdW5jdGlvbihjb250ZXh0LCBub2RlLCBzdGFjaykge1xuICAvLyBXaGVuIGl0J3MgY2hhbmdlZCwgZXZhbHVhdGUgaXQgd2l0aCBhbmFseXplcnMgJiBpbnRlcnByZXRlci5cbiAgcmV0dXJuIHRoaXMuX2V2YWx1YXRvcihjb250ZXh0LCBub2RlLCBzdGFjayk7XG59O1xuXG5JbnRlcmZhY2UucHJvdG90eXBlLl9pbnRlcnByZXQgPSBmdW5jdGlvbihjb250ZXh0LCBub2RlLCBzdGFjaykge1xuICAvLyBXZWxsIGluIHRoaXMgZURTTCB3ZSBkZWxlZ2F0ZSB0aGUgaW50ZXJwcmV0aW9uIHRvIHRoZSBydW50aW1lLlxuICAvLyBXZSBkb24ndCBwYXNzIGNvbnRleHQgdG8gcnVudGltZSBzaW5jZSB0aGUgcnVudGltZSB3aWxsIGtlZXBcbiAgLy8gdGhlIGVzc2VudGlhbCBzdGF0ZXMgYnkgaXRzIG93bi5cbiAgcmV0dXJuIHRoaXMuX3J1bnRpbWUub25jaGFuZ2UuYXBwbHkodGhpcy5fcnVudGltZSwgYXJndW1lbnRzKTtcbn07XG5cbi8vIEluIHRoaXMgZURTTCB3ZSBub3cgb25seSBoYXZlIHRoaXMgYW5hbHl6ZXIuIENvdWxkIGFkZCBtb3JlIGFuZCByZWdpc3RlciBpdFxuLy8gaW4gdGhlIGNvbnRydWN0aW9uIG9mICd0aGlzLl9ldmFsdWF0b3InLlxuSW50ZXJmYWNlLnByb3RvdHlwZS5fYW5hbHl6ZU9yZGVyID0gZnVuY3Rpb24oY29udGV4dCwgY2hhbmdlLCBzdGFjaykge1xuICBpZiAoJ3N0YXJ0JyA9PT0gY2hhbmdlLnR5cGUpIHtcbiAgICBjb250ZXh0LnN0YXJ0ZWQgPSB0cnVlO1xuICB9IGVsc2UgaWYgKCdzdG9wJykge1xuICAgIGNvbnRleHQuc3RvcHBlZCA9IHRydWU7XG4gIH1cbiAgaWYgKCdzdGFydCcgPT09IGNoYW5nZS50eXBlICYmIGNvbnRleHQuc3RvcHBlZCkge1xuICAgIHRocm93IG5ldyBFcnJvcignU2hvdWxkIG5vdCBzdGFydCBhIHByb2Nlc3MgYWdhaW4nICtcbiAgICAgICAgJ2FmdGVyIGl0XFwncyBhbHJlYWR5IHN0b3BwZWQnKTtcbiAgfSBlbHNlIGlmICgnbmV4dCcgPT09IGNoYW5nZS50eXBlICYmICFjb250ZXh0LnN0YXJ0ZWQpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ1Nob3VsZCBub3QgY29uY2F0IHN0ZXBzIHdoaWxlIGl0XFwncyBub3Qgc3RhcnRlZCcpO1xuICB9IGVsc2UgaWYgKCdzdG9wJyA9PT0gY2hhbmdlLnR5cGUgJiYgIWNvbnRleHQuc3RhcnRlZCkge1xuICAgIHRocm93IG5ldyBFcnJvcignU2hvdWxkIG5vdCBzdG9wIGEgcHJvY2VzcyBiZWZvcmUgaXRcXCdzIHN0YXJ0ZWQnKTtcbiAgfVxufTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vcGxheWxhbmcuaW50ZXJmYWNlLmpzXG4gKiovIiwiKGZ1bmN0aW9uKGUsIGEpIHsgZm9yKHZhciBpIGluIGEpIGVbaV0gPSBhW2ldOyB9KGV4cG9ydHMsIC8qKioqKiovIChmdW5jdGlvbihtb2R1bGVzKSB7IC8vIHdlYnBhY2tCb290c3RyYXBcbi8qKioqKiovIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuLyoqKioqKi8gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuLyoqKioqKi9cbi8qKioqKiovIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbi8qKioqKiovIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuLyoqKioqKi9cbi8qKioqKiovIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbi8qKioqKiovIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbi8qKioqKiovIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuLyoqKioqKi9cbi8qKioqKiovIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuLyoqKioqKi8gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbi8qKioqKiovIFx0XHRcdGV4cG9ydHM6IHt9LFxuLyoqKioqKi8gXHRcdFx0aWQ6IG1vZHVsZUlkLFxuLyoqKioqKi8gXHRcdFx0bG9hZGVkOiBmYWxzZVxuLyoqKioqKi8gXHRcdH07XG4vKioqKioqL1xuLyoqKioqKi8gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuLyoqKioqKi8gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuLyoqKioqKi9cbi8qKioqKiovIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4vKioqKioqLyBcdFx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG4vKioqKioqL1xuLyoqKioqKi8gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4vKioqKioqLyBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuLyoqKioqKi8gXHR9XG4vKioqKioqL1xuLyoqKioqKi9cbi8qKioqKiovIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbi8qKioqKiovIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcbi8qKioqKiovXG4vKioqKioqLyBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4vKioqKioqLyBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG4vKioqKioqL1xuLyoqKioqKi8gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuLyoqKioqKi8gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuLyoqKioqKi9cbi8qKioqKiovIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4vKioqKioqLyBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuLyoqKioqKi8gfSlcbi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG4vKioqKioqLyAoW1xuLyogMCAqL1xuLyoqKi8gZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzKSB7XG5cblx0J3VzZSBzdHJpY3QnO1xuXHRcblx0LyoqXG5cdCAqIEdlbmVyaWMgYnVpbGRlciB0aGF0IHdvdWxkIHB1c2ggbm9kZXMgaW50byB0aGUgZURTTCBzdGFjay5cblx0ICogVXNlciBjb3VsZCBpbmhlcml0IHRoaXMgdG8gZGVmaW5lIHRoZSBuZXcgZURTTC5cblx0ICogLS0tXG5cdCAqIFRoZSBkZWZhdWx0IHNlbWFudGljcyBvbmx5IGNvbnRhaW4gdGhlc2Ugb3BlcmF0aW9uczpcblx0ICpcblx0ICogMS4gW3B1c2hdIDogcHVzaCB0byB0aGUgY3VycmVudCBzdGFja1xuXHQgKiAyLiBbYmVnaW5dOiBjcmVhdGUgYSBuZXcgc3RhY2sgYW5kIHN3aXRjaCB0byBpdCxcblx0ICogICAgICAgICAgICAgYW5kIHRoZW4gcHVzaCB0aGUgbm9kZSBpbnRvIHRoZSBzdGFjay5cblx0ICogMy4gW2VuZF0gIDogYWZ0ZXIgcHVzaCB0aGUgbm9kZSBpbnRvIHRoZSBzdGFjayxcblx0ICogICAgICAgICAgICAgY2hhbmdlIHRoZSBjdXJyZW50IHN0YWNrIHRvIHRoZSBwcmV2aW91cyBvbmUuXG5cdCAqIDQuIFtleGl0XSA6IGV4aXQgdGhlIGNvbnRleHQgb2YgdGhpcyBlRFNMOyB0aGUgbGFzdCByZXN1bHRcblx0ICogICAgICAgICAgICAgb2YgaXQgd291bGQgYmUgcGFzc2VkIHRvIHRoZSByZXR1cm4gdmFsdWUgb2Zcblx0ICogICAgICAgICAgICAgdGhpcyBjaGFpbi5cblx0ICpcblx0ICogU3RhY2sgY291bGQgYmUgbmVzdGVkOiB3aGVuIFtiZWdpbl0gYSBuZXcgc3RhY2sgaW4gZmFjdCBpdCB3b3VsZFxuXHQgKiBwdXNoIHRoZSBzdGFjayBpbnRvIHRoZSBwcmV2aW91cyBvbmUuIFNvIHRoZSBzdGFjayBjb21wcmlzZVxuXHQgKiBbbm9kZV0gYW5kIFtzdGFja10uXG5cdCAqIC0tLVxuXHQgKiBBbHRob3VnaCB0aGUgZURTTCBpbnN0YW5jZSBzaG91bGQgd3JhcCB0aGVzZSBiYXNpYyBvcGVyYXRpb25zXG5cdCAqIHRvIG1hbmlwdWxhdGUgdGhlIHN0YWNrLCB0aGV5IGFsbCBuZWVkIHRvIGNvbnZlcnQgdGhlIG1ldGhvZFxuXHQgKiBjYWxsIHRvIG5vZGVzLiBTbyAnUnVuZScgcHJvdmlkZSBhIHdheSB0byBzaW1wbGlmeSB0aGUgd29yazogaWZcblx0ICogdGhlIGluc3RhbmNlIGNhbGwgdGhlIFtkZWZpbmVdIG1ldGhvZCB0aGUgbmFtZSBvZiB0aGUgbWV0aG9kLFxuXHQgKiBpdCBjb3VsZCBhc3NvY2lhdGUgdGhlIG9wZXJhbmQgb2YgdGhlIGVEU0wgd2l0aCB0aGUgc3RhY2sgbWFuaXB1bGF0aW9uLlxuXHQgKiBGb3IgZXhhbXBsZTpcblx0ICpcblx0ICogICAgdmFyIGVEU0wgPSBmdW5jdGlvbigpIHt9O1xuXHQgKiAgICBlRFNMLnByb3RvdHlwZS50cmFuc2FjdGlvbiA9IFJ1bmUuZGVmaW5lKCd0cmFuc2FjdGlvbicsICdiZWdpbicpO1xuXHQgKiAgICBlRFNMLnByb3RvdHlwZS5wcmUgPSBSdW5lLmRlZmluZSgncHJlJywgJ3B1c2gnKTtcblx0ICogICAgZURTTC5wcm90b3R5cGUucGVyZm9ybSA9IFJ1bmUuZGVmaW5lKCdwZXJmb3JtJywgJ3B1c2gnKTtcblx0ICogICAgZURTTC5wcm90b3R5cGUucG9zdCA9IFJ1bmUuZGVmaW5lKCdwb3N0JywgJ2VuZCcpO1xuXHQgKlxuXHQgKiBUaGVuIHRoZSBlRFNMIGNvdWxkIGJlIHVzZWQgYXM6XG5cdCAqXG5cdCAqICAgIChuZXcgZURTTClcblx0ICogICAgICAudHJhbnNhY3Rpb24oKVxuXHQgKiAgICAgIC5wcmUoY2IpXG5cdCAqICAgICAgLnBlcmZvcm0oY2IpXG5cdCAqICAgICAgLnBvc3QoY2IpXG5cdCAqXG5cdCAqIEFuZCB0aGUgc3RhY2sgd291bGQgYmU6XG5cdCAqXG5cdCAqICAgIFtcblx0ICogICAgICBub2RlPCd0cmFuc2FjdGlvbicsPlxuXHQgKiAgICAgIG5vZGU8J3ByZScsIGNiPlxuXHQgKiAgICAgIG5vZGU8J3ByZWZvcm0nLCBjYj5cblx0ICogICAgICBub2RlPCdwb3N0JywgY2I+XG5cdCAqICAgIF1cblx0ICpcblx0ICogSG93ZXZlciwgdGhpcyBzaW1wbGUgYXBwcm9hY2ggdGhlIHNlbWFudGljcyBydWxlcyBhbmQgYW5hbHl6ZXJzIHRvXG5cdCAqIGd1YXJhbnRlZSB0aGUgc3RhY2sgaXMgdmFsaWQuIEZvciBleGFtcGxlLCBpZiB3ZSBoYXZlIGEgbWFsZm9ybWVkXG5cdCAqIHN0YWNrIGJlY2F1c2Ugb2YgdGhlIGZvbGxvd2luZyBlRFNMIHByb2dyYW06XG5cdCAqXG5cdCAqICAgIChuZXcgZURTTClcblx0ICogICAgICAucG9zdChjYilcblx0ICogICAgICAucHJlKGNiKVxuXHQgKiAgICAgIC5wZXJmb3JtKGNiKVxuXHQgKiAgICAgIC50cmFuc2FjdGlvbigpXG5cdCAqXG5cdCAqIFRoZSBydW50aW1lIG1heSByZXBvcnQgZXJyb3QgYmVjYXVzZSB3aGVuICcucG9zdChjYiknIHRoZXJlIGlzIG5vIHN0YWNrXG5cdCAqIGNyZWF0ZWQgYnkgdGhlIGJlZ2lubmluZyBzdGVwLCBuYW1lbHkgdGhlICcucHJlKGNiKScgaW4gb3VyIGNhc2UuXG5cdCAqIE5ldmVydGhlbGVzcywgdGhlIGVycm9yIG1lc3NhZ2UgaXMgdG9vIGxvdy1sZXZlbCBmb3IgdGhlIGxhbmd1YWdlIHVzZXIsXG5cdCAqIHNpbmNlIHRoZXkgc2hvdWxkIGNhcmUgbm8gc3RhY2sgdGhpbmdzIGFuZCBzaG91bGQgb25seSBjYXJlIGFib3V0IHRoZSBlRFNMXG5cdCAqIGl0c2VsZi5cblx0ICpcblx0ICogVGhlIHNvbHV0aW9uIGlzIHRvIHByb3ZpZGUgYSBiYXNpYyBzdGFjayBvcmRlcmluZyBhbmFseXplciBhbmQgbGV0IHRoZVxuXHQgKiBsYW5ndWFnZSBkZWNpZGUgaG93IHRvIGRlc2NyaWJlIHRoZSBlcnJvci4gQW5kIHNpbmNlIHdlIGRvbid0IGhhdmVcblx0ICogYW55IGNvbnRleHQgaW5mb3JtYXRpb24gYWJvdXQgdmFyaWFibGVzLCBzY29wZSBhbmQgb3RoZXIgZWxlbWVudHNcblx0ICogYXMgYSBjb21wbGV0ZSBwcm9ncmFtbWluZyBsYW5ndWFnZSwgd2Ugb25seSBuZWVkIHRvIGd1YXJhbnRlZSB0aGUgb3JkZXIgaXNcblx0ICogY29ycmVjdCwgYW5kIG1ha2UgaW5jb3JyZWN0IGNhc2VzIG1lYW5pbmdmdWwuIE1vcmVvdmVyLCBzaW5jZSB0aGUgYW5hbHl6ZXJcblx0ICogbmVlZHMgdG8gYW5hbHl6ZSB0aGUgc3RhdGVzIHdoZW5ldmVyIHRoZSBpbmNvbWluZyBub2RlIGNvbWVzLCBpdCBpcyBpbiBmYWN0XG5cdCAqIGFuIGV2YWx1YXRpb24gcHJvY2Vzcywgc28gdXNlciBjb3VsZCBjb21iaW5lIHRoZSBhbmFseXppbmcgYW5kIGludGVycHJldGluZ1xuXHQgKiBwaGFzZSBpbnRvIHRoZSBzYW1lIGZ1bmN0aW9uLiBGb3IgZXhhbXBsZTpcblx0ICpcblx0ICogICAgcnVudGltZS5vbmNoYW5nZSgoY29udGV4dCwgbm9kZSwgc3RhY2spID0+IHtcblx0ICogICAgICAgIC8vIElmIHRoZSBjaGFuZ2UgaXMgdG8gc3dpdGNoIHRvIGEgbmV3IHN0YWNrLFxuXHQgKiAgICAgICAgLy8gdGhlICdzdGFjaycgaGVyZSB3b3VsZCBiZSB0aGUgbmV3IHN0YWNrLlxuXHQgKiAgICAgICAgdmFyIHt0eXBlLCBhcmdzfSA9IG5vZGU7XG5cdCAqICAgICAgICBpZiAoJ3ByZScgPT09IHR5cGUpIHtcblx0ICogICAgICAgICAgY29udGV4dC5pbml0ID0gdHJ1ZTtcblx0ICogICAgICAgIH0gZWxzZSBpZiAoJ3Bvc3QnID09PSB0eXBlICYmICFjb250ZXh0LmluaXQpIHtcblx0ICogICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdUaGVyZSBtdXN0IGJlIG9uZSBcInByZVwiIG5vZGUgYmVmb3JlIHRoZSBcInBvc3RcIi4nKTtcblx0ICogICAgICAgIH1cblx0ICogICAgfSk7XG5cdCAqXG5cdCAqIFdpdGggc3VjaCBmZWF0dXJlLCBpZiB0aGUgaW5jb21pbmcgbm9kZSBvciB0aGUgc3RhY2sgaXMgbWFsZm9ybWVkLFxuXHQgKiBpdCBzaG91bGQgdGhyb3cgdGhlIGVycm9yLiBUaGUgZXJyb3IgY2FwdHVyZWQgYnkgdGhlIGluc3RhbmNlIGxpa2UgdGhpc1xuXHQgKiBjb3VsZCBiZSBhICdjb21waWxhdGlvbiBlcnJvcicuXG5cdCAqXG5cdCAqIFRoZSBub3RpY2VhYmxlIGZhY3QgaXMgVGhlIGNhbGxiYWNrIG9mIHRoZSAnb25jaGFuZ2UnIGlzIGFjdHVhbGx5IGEgcmVkdWNlcixcblx0ICogc28gdXNlciBjb3VsZCB0cmVhdCB0aGUgcHJvY2VzcyBvZiB0aGlzIGV2YWx1YXRpb24gJiBhbmFseXppbmcgYXMgYSByZWR1Y2luZ1xuXHQgKiBwcm9jZXNzIG9uIGFuIGluZmluaXRlIHN0cmVhbS4gQW5kIHNpbmNlIHdlIGhhdmUgYSBzdGFjayBtYWNoaW5lLCBpZiB0aGVcblx0ICogcmVkdWNlciByZXR1cm4gbm90aGluZywgdGhlIHN0YWNrIHdvdWxkIGJlIGVtcHR5LiBPdGhlcndpc2UsIGlmIHRoZSByZWR1Y2VyXG5cdCAqIHJldHVybiBhIG5ldyBzdGFjaywgaXQgd291bGQgcmVwbGFjZSB0aGUgb2xkIG9uZS5cblx0ICpcblx0ICogQW5kIHBsZWFzZSBub3RlIHRoZSBleGFtcGxlIGlzIG11Y2ggc2ltcGxpZmllZC4gRm9yIHRoZVxuXHQgKiByZWFsIGVEU0wgaXQgc2hvdWxkIGJlIHVzZWQgb25seSBhcyBhbiBlbnRyeSB0byBkaXNwYXRjaCB0aGUgY2hhbmdlIHRvXG5cdCAqIHRoZSByZWFsIGhhbmRsZXJzLCB3aGljaCBtYXkgY29tcHJpc2Ugc2V2ZXJhbCBzdGF0ZXMgYW5kIGNvbXBvbmVudHMuXG5cdCAqL1xuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7XG5cdCAgdmFsdWU6IHRydWVcblx0fSk7XG5cdGV4cG9ydHNbJ2RlZmF1bHQnXSA9IFJ1bmU7XG5cdFxuXHRmdW5jdGlvbiBSdW5lKCkge31cblx0XG5cdC8qKlxuXHQgKiBIZWxwZXIgbWV0aG9kIHRvIGJ1aWxkIGludGVyZmFjZSBvZiBhIHNwZWNpZmljIERTTC4gSXQgd291bGQgcmV0dXJuIGEgbWV0aG9kXG5cdCAqIG9mIHRoZSBEU0wgYW5kIHRoZW4gdGhlIGludGVyZmFjZSBjb3VsZCBhdHRhY2ggaXQuXG5cdCAqXG5cdCAqIFRoZSByZXR1cm5pbmcgZnVuY3Rpb24gd291bGQgYXNzdW1lIHRoYXQgdGhlICd0aGlzJyBpbnNpZGUgaXQgaXMgdGhlIHJ1bnRpbWVcblx0ICogb2YgdGhlIGxhbmd1YWdlLiBBbmQgc2luY2UgdGhlIG1ldGhvZCBpdCByZXR1cm5zIHdvdWxkIHJlcXVpcmUgdG8gYWNjZXNzIHNvbWVcblx0ICogbWVtYmVycyBvZiB0aGUgJ3RoaXMnLCB0aGUgJ3RoaXMnIHNob3VsZCBoYXZlICd0aGlzLnN0YWNrJyBhbmQgJ3RoaXMuY29udGV4dCdcblx0ICogYXMgdGhlIG1ldGhvZCByZXF1aXJlcy5cblx0ICpcblx0ICogSWYgaXQncyBhbiAnZXhpdCcgbm9kZSwgbWVhbnMgdGhlIHNlc3Npb24gaXMgZW5kZWQgYW5kIHRoZSBpbnRlcnByZXRlciBzaG91bGRcblx0ICogcmV0dXJuIGEgc3RhY2sgY29udGFpbnMgb25seSBvbmUgbm9kZSBhcyB0aGUgcmVzdWx0IG9mIHRoZSBzZXNzaW9uLCBvciB0aGVcblx0ICogc2Vzc2lvbiByZXR1cm5zIG5vdGhpbmcuIEZvciBvdGhlciBpbnN0cnVjdGlvbnMgdGhlIHN0YWNrIGNhbiBrZWVwIHNvbWVcblx0ICogY29tcHV0ZWQgcmVzdWx0IHRvIHNpbXVsYXRlIHJlYWwgc3RhY2sgbWFjaGluZS4gQnV0IGl0J3MgT0sgdG8gbm90IHVzZSB0aGlzXG5cdCAqIGZlYXR1cmUgYW5kIGFsd2F5cyByZXR1cm4gYW4gZW1wdHkgJ3N0YWNrJyBldmVyeXRpbWUgdGhlICdvbmNoYW5nZScgZ2V0XG5cdCAqIGNhbGxlZCBhbmQgaW50ZXJ1cHRlZC4gSW4gdGhpcyBtb2RlIGl0IG1lYW5zIHRoZSBsYW5ndWFnZSB3YW50IHRvIGtlZXBcblx0ICogYWxsIHN0YXRlcyBieSBpdHNlbGYuXG5cdCAqXG5cdCAqIFBsZWFzZSBub3RlIHRoYXQgZnJvbSB0aGUgZGVzY3JpcHRpb24gYWJvdmUsICdlbmQnIG1lYW5zIHN0YWNrIChzdWJzdGFjaylcblx0ICogZW5kcy4gSXQncyB0b3RhbGx5IGlycmVsZXZhbnQgdG8gJ2V4aXQnLlxuXHQgKlxuXHQgKiBUaGUgbGFzdCBhcmd1bWVudCAnZG9jJyBpcyB3aGF0IGRlc2lnbmVyIGNvdWxkIHB1dCB0aGUgZGVzY3JpcHRpb24gYWJvdXRcblx0ICogdGhlIG1ldGhvZC4gSWYgc2V0LCBpdCB3b3VsZCBhcHBlbmQgdGhlICdydW5lLmRvYydcblx0ICogcHJvcGVydHkgaW4gdGhlIGZ1bmN0aW9uIGl0IHJldHVybnMuIEFuZCB0aGVuIHRoZSBsYW5ndWFnZSBpbnN0YW5jZSBjb3VsZFxuXHQgKiBjYWxsIGBSdW5lLmRvY3VtZW50KDxpbnN0YW5jZT4pYCB0byBnZXQgYSBtZXRob2QgdGhhdCB3b3VsZCByZXR1cm5cblx0ICogJ3sgbWV0aG9kTmFtZTogZGVzY3JpcHRpb24gfScgd2hlbiBpdCBnb3QgaW52b2tlZC5cblx0ICovXG5cdFJ1bmUuZGVmaW5lID0gZnVuY3Rpb24gKG1ldGhvZCwgYXMpIHtcblx0ICB2YXIgZG9jID0gYXJndW1lbnRzLmxlbmd0aCA8PSAyIHx8IGFyZ3VtZW50c1syXSA9PT0gdW5kZWZpbmVkID8gJycgOiBhcmd1bWVudHNbMl07XG5cdFxuXHQgIHZhciBidWlsdCA9IGZ1bmN0aW9uIGJ1aWx0KCkge1xuXHQgICAgdmFyIG5vZGUsIHJlc3VsdHN0YWNrO1xuXHRcblx0ICAgIGZvciAodmFyIF9sZW4gPSBhcmd1bWVudHMubGVuZ3RoLCBhcmdzID0gQXJyYXkoX2xlbiksIF9rZXkgPSAwOyBfa2V5IDwgX2xlbjsgX2tleSsrKSB7XG5cdCAgICAgIGFyZ3NbX2tleV0gPSBhcmd1bWVudHNbX2tleV07XG5cdCAgICB9XG5cdFxuXHQgICAgc3dpdGNoIChhcykge1xuXHQgICAgICBjYXNlICdwdXNoJzpcblx0ICAgICAgICBub2RlID0gbmV3IFJ1bmUuTm9kZShtZXRob2QsIGFyZ3MsIHRoaXMuc3RhY2spO1xuXHQgICAgICAgIHRoaXMuc3RhY2sucHVzaChub2RlKTtcblx0ICAgICAgICByZXN1bHRzdGFjayA9IHRoaXMub25jaGFuZ2UodGhpcy5jb250ZXh0LCBub2RlLCB0aGlzLnN0YWNrKTtcblx0ICAgICAgICBicmVhaztcblx0ICAgICAgY2FzZSAnYmVnaW4nOlxuXHQgICAgICAgIHRoaXMuX3ByZXZzdGFjayA9IHRoaXMuc3RhY2s7XG5cdCAgICAgICAgdGhpcy5zdGFjayA9IFtdO1xuXHQgICAgICAgIG5vZGUgPSBuZXcgUnVuZS5Ob2RlKG1ldGhvZCwgYXJncywgdGhpcy5zdGFjayk7XG5cdCAgICAgICAgdGhpcy5zdGFjay5wdXNoKG5vZGUpOyAvLyBhcyB0aGUgZmlyc3Qgbm9kZSBvZiB0aGUgbmV3IHN0YWNrLlxuXHQgICAgICAgIHJlc3VsdHN0YWNrID0gdGhpcy5vbmNoYW5nZSh0aGlzLmNvbnRleHQsIG5vZGUsIHRoaXMuc3RhY2spO1xuXHQgICAgICAgIGJyZWFrO1xuXHQgICAgICBjYXNlICdlbmQnOlxuXHQgICAgICAgIG5vZGUgPSBuZXcgUnVuZS5Ob2RlKG1ldGhvZCwgYXJncywgdGhpcy5zdGFjayk7XG5cdCAgICAgICAgdGhpcy5zdGFjay5wdXNoKG5vZGUpOyAvLyB0aGUgbGFzdCBub2RlIG9mIHRoZSBzdGFjay5cblx0ICAgICAgICB0aGlzLnN0YWNrID0gdGhpcy5fcHJldnN0YWNrOyAvLyBzd2l0Y2ggYmFjayB0byB0aGUgcHJldmlvdXMgc3RhY2suXG5cdCAgICAgICAgcmVzdWx0c3RhY2sgPSB0aGlzLm9uY2hhbmdlKHRoaXMuY29udGV4dCwgbm9kZSwgdGhpcy5zdGFjayk7XG5cdCAgICAgICAgYnJlYWs7XG5cdCAgICAgIGNhc2UgJ2V4aXQnOlxuXHQgICAgICAgIG5vZGUgPSBuZXcgUnVuZS5Ob2RlKG1ldGhvZCwgYXJncywgdGhpcy5zdGFjayk7XG5cdCAgICAgICAgdGhpcy5zdGFjay5wdXNoKG5vZGUpOyAvLyB0aGUgbGFzdCBub2RlIG9mIHRoZSBzdGFjay5cblx0ICAgICAgICByZXN1bHRzdGFjayA9IHRoaXMub25jaGFuZ2UodGhpcy5jb250ZXh0LCBub2RlLCB0aGlzLnN0YWNrKTtcblx0ICAgICAgICBpZiAoIXJlc3VsdHN0YWNrKSB7XG5cdCAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1xcJ2V4aXRcXCcgbm9kZSBcXCcnICsgbm9kZS50eXBlICsgJ1xcJyBzaG91bGRcXG4gICAgICAgICAgICByZXR1cm4gYSByZXN1bHRzdGFjay4nKTtcblx0ICAgICAgICB9XG5cdCAgICAgICAgcmV0dXJuIHJlc3VsdHN0YWNrWzBdO1xuXHQgICAgfVxuXHQgICAgLy8gSWYgdGhlIGhhbmRsZXIgdXBkYXRlcyB0aGUgc3RhY2ssIGl0IHdvdWxkIHJlcGxhY2UgdGhlIGV4aXN0aW5nIG9uZS5cblx0ICAgIGlmIChyZXN1bHRzdGFjaykge1xuXHQgICAgICB0aGlzLnN0YWNrID0gcmVzdWx0c3RhY2s7XG5cdCAgICB9XG5cdCAgICByZXR1cm4gdGhpcztcblx0ICB9O1xuXHQgIGJ1aWx0LnJ1bmUgPSB7XG5cdCAgICAnYXMnOiBhcyxcblx0ICAgICdkb2MnOiBkb2MsXG5cdCAgICAnbWV0aG9kJzogbWV0aG9kXG5cdCAgfTtcblx0ICByZXR1cm4gYnVpbHQ7XG5cdH07XG5cdFxuXHQvKipcblx0ICogR2VuZXJhdGUgYSBtZXRob2QgdGhhdCB3b3VsZCByZXR1cm4gYWxsIGRvY3VtZW50cyBvZiB0aGUgbWV0aG9kcyxcblx0ICogaW4gYSBmb3JtIG9mICd7IG1ldGhvZE5hbWU6IGRlc2NyaXB0aW9uIH0nLlxuXHQgKlxuXHQgKiBUaGUgYXJndW1lbnQgbXVzdCBiZSB0aGUgbGFuZ3VhZ2UgaW5zdGFuY2Ugd2l0aCBhbGwgZGVmaW5lZCBtZXRob2RzLlxuXHQgKi9cblx0UnVuZS5wdWJsaXNoID0gZnVuY3Rpb24gKGluc3RhbmNlKSB7XG5cdCAgdmFyIGdlbmVyYXRlZCA9IE9iamVjdC5rZXlzKGluc3RhbmNlKS5yZWR1Y2UoZnVuY3Rpb24gKGRvYywgbmFtZSkge1xuXHQgICAgdmFyIG1ldGhvZCA9IGluc3RhbmNlW25hbWVdO1xuXHQgICAgaWYgKG1ldGhvZC5ydW5lKSB7XG5cdCAgICAgIGRvY1tuYW1lXSA9IG1ldGhvZC5ydW5lLmRvYztcblx0ICAgIH1cblx0ICB9LCB7fSk7XG5cdCAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcblx0ICAgIHJldHVybiBnZW5lcmF0ZWQ7XG5cdCAgfTtcblx0fTtcblx0XG5cdFJ1bmUuTm9kZSA9IGZ1bmN0aW9uICh0eXBlLCBhcmdzLCBzdGFjaykge1xuXHQgIHRoaXMudHlwZSA9IHR5cGU7XG5cdCAgdGhpcy5hcmdzID0gYXJncztcblx0ICB0aGlzLnN0YWNrID0gc3RhY2s7XG5cdH07XG5cdFxuXHRSdW5lLkV2YWx1YXRlID0gZnVuY3Rpb24gKCkge1xuXHQgIHZhciBjb250ZXh0ID0gYXJndW1lbnRzLmxlbmd0aCA8PSAwIHx8IGFyZ3VtZW50c1swXSA9PT0gdW5kZWZpbmVkID8ge30gOiBhcmd1bWVudHNbMF07XG5cdFxuXHQgIHRoaXMuX2FuYWx5emVycyA9IFtdO1xuXHQgIHRoaXMuX2ludGVycHJldGVyID0gbnVsbDtcblx0ICB0aGlzLl9jb250ZXh0ID0gY29udGV4dDtcblx0fTtcblx0XG5cdC8qKlxuXHQgKiBBbmFseXplciBjb3VsZCByZWNlaXZlIHRoZSBzdGFjayBjaGFuZ2UgZnJvbSAnUnVuZSNldmFsdWF0ZScsXG5cdCAqIGFuZCBpdCB3b3VsZCBiZSBjYWxsZWQgd2l0aCB0aGUgYXJndW1lbnRzIGFzIHRoZSBmdW5jdGlvbiBkZXNjcmliZXM6XG5cdCAqXG5cdCAqICAgICBSdW5lLnByb3RvdHlwZS5ldmFsdWF0ZSgoY29udGV4dCwgY2hhbmdlLCBzdGFjaykgPT4ge1xuXHQgKiAgICAgICAgLy8gLi4uXG5cdCAqICAgICB9KTtcblx0ICpcblx0ICogU28gdGhlIGFuYWx5emVyIGNvdWxkIGJlOlxuXHQgKlxuXHQgKiAgICBmdW5jdGlvbihjb250ZXh0LCBjaGFuZ2UsIHN0YWNrKSB7XG5cdCAqICAgICAgLy8gRG8gc29tZSBjaGVjayBhbmQgbWF5YmUgY2hhbmdlZCB0aGUgY29udGV4dC5cblx0ICogICAgICAvLyBUaGUgbmV4dCBhbmFseXplciB0byB0aGUgaW50ZXJwcmV0ZXIgd291bGQgYWNjZXB0IHRoZSBhbHRlcm5hdGVkXG5cdCAqICAgICAgLy8gY29udGV4dCBhcyB0aGUgYXJndW1lbnQgJ2NvbnRleHQnLlxuXHQgKiAgICAgIGNvbnRleHQuc29tZUZsYWcgPSB0cnVlO1xuXHQgKiAgICAgIC8vIFdoZW4gdGhlcmUgaXMgd3JvbmcsIHRocm93IGl0LlxuXHQgKiAgICAgIHRocm93IG5ldyBFcnJvcignU29tZSBhbmFseXppbmcgZXJyb3InKTtcblx0ICogICAgfTtcblx0ICpcblx0ICogTm90ZSB0aGF0IHRoZSBhbmFseXplciAoJ2EnKSB3b3VsZCBiZSBpbnZva2VkIHdpdGggZW1wdHkgJ3RoaXMnIG9iamVjdCxcblx0ICogc28gdGhlIGZ1bmN0aW9uIHJlbGllcyBvbiAndGhpcycgc2hvdWxkIGJpbmQgaXRzZWxmIGZpcnN0LlxuXHQgKi9cblx0UnVuZS5FdmFsdWF0ZS5wcm90b3R5cGUuYW5hbHl6ZXIgPSBmdW5jdGlvbiAoYSkge1xuXHQgIHRoaXMuX2FuYWx5emVycy5wdXNoKGEpO1xuXHQgIHJldHVybiB0aGlzO1xuXHR9O1xuXHRcblx0LyoqXG5cdCAqIE9uZSBFdmFsdWF0ZSBjYW4gb25seSBoYXZlIG9uZSBpbnRlcnByZXRlciwgYW5kIGl0IHdvdWxkIHJldHVyblxuXHQgKiB0aGUgZnVuY3Rpb24gY291bGQgY29uc3VtZSBldmVyeSBzdGFjayBjaGFuZ2UgZnJvbSAnUnVuZSNldmFsdWF0ZScuXG5cdCAqXG5cdCAqIFRoZSBjb2RlIGlzIGEgbGl0dGxlIGNvbXBsaWNhdGVkOiB3ZSBoYXZlIHR3byBraW5kcyBvZiAncmVkdWNpbmcnOlxuXHQgKiBvbmUgaXMgdG8gcmVkdWNlIGFsbCBhbmFseXplcnMgd2l0aCB0aGUgc2luZ2xlIGluY29taW5nIGNoYW5nZSxcblx0ICogYW5vdGhlciBpcyB0byByZWR1Y2UgYWxsIGluY29taW5nIGNoYW5nZXMgd2l0aCB0aGlzIGFuYWx5emVycyArIGludGVycHJldGVyLlxuXHQgKlxuXHQgKiBUaGUgYW5hbHl6ZXIgYW5kIGludGVycHJldGVyIHNob3VsZCBjaGFuZ2UgdGhlIGNvbnRleHQsIHRvIG1lbW9yaXplIHRoZVxuXHQgKiBzdGF0ZXMgb2YgdGhlIGV2YWx1YXRpb24uIFRoZSBkaWZmZXJlbmNlIGlzIGludGVycHJldGVyIHNob3VsZCByZXR1cm4gb25lXG5cdCAqIG5ldyBzdGFjayBpZiBpdCBuZWVkcyB0byB1cGRhdGUgdGhlIGV4aXN0aW5nIG9uZS4gVGhlIHN0YWNrIGl0IHJldHVybnMgd291bGRcblx0ICogcmVwbGFjZSB0aGUgZXhpc3Rpbmcgb25lLCBzbyBhbnl0aGluZyBzdGlsbCBpbiB0aGUgb2xkIG9uZSB3b3VsZCBiZSB3aXBlZFxuXHQgKiBvdXQuIFRoZSBpbnRlcnByZXRlciBjb3VsZCByZXR1cm4gbm90aGluZyAoJ3VuZGVmaW5lZCcpIHRvIGtlZXAgdGhlIHN0YWNrXG5cdCAqIHVudG91Y2hlZC5cblx0ICpcblx0ICogVGhlIGFuYWx5emVycyBhbmQgaW50ZXJwcmV0ZXIgY291bGQgY2hhbmdlIHRoZSAnY29udGV4dCcgcGFzcyB0byB0aGVtLlxuXHQgKiBBbmQgc2luY2Ugd2UgbWF5IHVwZGF0ZSB0aGUgc3RhY2sgYXMgYWJvdmUsIHRoZSBjb250ZXh0IHNob3VsZCBtZW1vcml6ZVxuXHQgKiB0aG9zZSBpbmZvcm1hdGlvbiBub3QgdG8gYmUgb3ZlcndyaXR0ZW4gd2hpbGUgdGhlIHN0YWNrIGdldCB3aXBlZCBvdXQuXG5cdCAqXG5cdCAqIEFuZCBpZiB0aGUgaW50ZXJwcmV0aW5nIG5vZGUgaXMgdGhlIGV4aXQgbm9kZSBvZiB0aGUgc2Vzc2lvbiwgaW50ZXJwcmV0ZXJcblx0ICogc2hvdWxkIHJldHVybiBhIG5ldyBzdGFjayBjb250YWlucyBvbmx5IG9uZSBmaW5hbCByZXN1bHQgbm9kZS4gSWYgdGhlcmVcblx0ICogaXMgbm8gc3VjaCBub2RlLCB0aGUgcmVzdWx0IG9mIHRoaXMgc2Vzc2lvbiBpcyAndW5kZWZpbmVkJy5cblx0ICovXG5cdFJ1bmUuRXZhbHVhdGUucHJvdG90eXBlLmludGVycHJldGVyID0gZnVuY3Rpb24gKGlucHQpIHtcblx0ICB2YXIgX3RoaXMgPSB0aGlzO1xuXHRcblx0ICAvLyBUaGUgY3VzdG9taXplZCBsYW5ndWFnZSBzaG91bGQgZ2l2ZSB0aGUgZGVmYXVsdCBjb250ZXh0LlxuXHQgIHJldHVybiBmdW5jdGlvbiAoY29udGV4dCwgY2hhbmdlLCBzdGFjaykge1xuXHQgICAgdHJ5IHtcblx0ICAgICAgLy8gQW5hbHl6ZXJzIGNvdWxkIGNoYW5nZSB0aGUgY29udGV4dC5cblx0ICAgICAgX3RoaXMuX2FuYWx5emVycy5yZWR1Y2UoZnVuY3Rpb24gKGN0eCwgYW5hbHl6ZXIpIHtcblx0ICAgICAgICBhbmFseXplci5jYWxsKHt9LCBjb250ZXh0LCBjaGFuZ2UsIHN0YWNrKTtcblx0ICAgICAgfSwgY29udGV4dCk7XG5cdCAgICB9IGNhdGNoIChlKSB7XG5cdCAgICAgIF90aGlzLl9oYW5kbGVFcnJvcihlLCBjb250ZXh0LCBjaGFuZ2UsIHN0YWNrKTtcblx0ICAgIH1cblx0ICAgIC8vIEFmdGVyIGFuYWx5emUgaXQsIGludGVycHJldCB0aGUgbm9kZSBhbmQgcmV0dXJuIHRoZSBuZXcgc3RhY2sgKGlmIGFueSkuXG5cdCAgICB2YXIgbmV3U3RhY2sgPSBpbnB0KGNvbnRleHQsIGNoYW5nZSwgc3RhY2spO1xuXHQgICAgcmV0dXJuIG5ld1N0YWNrO1xuXHQgIH07XG5cdH07XG5cdFxuXHRSdW5lLkV2YWx1YXRlLnByb3RvdHlwZS5faGFuZGxlRXJyb3IgPSBmdW5jdGlvbiAoZXJyLCBjb250ZXh0LCBjaGFuZ2UsIHN0YWNrKSB7XG5cdCAgLy8gVE9ETzogZXhwYW5kIGl0IHRvIHByb3ZpZGUgbW9yZSBzb3BoaXN0aWMgZGVidWdnaW5nIG1lc3NhZ2UuXG5cdCAgdGhyb3cgbmV3IEVycm9yKCdXaGVuIGNoYW5nZSAnICsgY2hhbmdlLnR5cGUgKyAnIGNvbWVzIGVycm9yIFxcJycgKyBlcnIgKyAnXFwnIGhhcHBlbmVkJyk7XG5cdH07XG5cdG1vZHVsZS5leHBvcnRzID0gZXhwb3J0c1snZGVmYXVsdCddO1xuXG4vKioqLyB9XG4vKioqKioqLyBdKSkpO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxleUoyWlhKemFXOXVJam96TENKemIzVnlZMlZ6SWpwYkluZGxZbkJoWTJzNkx5OHZkMlZpY0dGamF5OWliMjkwYzNSeVlYQWdOalpqTVRGaU5HRTNZVFJtTkdGbU1EaG1NMllpTENKM1pXSndZV05yT2k4dkx5NHZjM0pqTDNKMWJtVXVhbk1pWFN3aWJtRnRaWE1pT2x0ZExDSnRZWEJ3YVc1bmN5STZJanRCUVVGQk8wRkJRMEU3TzBGQlJVRTdRVUZEUVRzN1FVRkZRVHRCUVVOQk8wRkJRMEU3TzBGQlJVRTdRVUZEUVR0QlFVTkJMSFZDUVVGbE8wRkJRMlk3UVVGRFFUdEJRVU5CT3p0QlFVVkJPMEZCUTBFN08wRkJSVUU3UVVGRFFUczdRVUZGUVR0QlFVTkJPMEZCUTBFN096dEJRVWRCTzBGQlEwRTdPMEZCUlVFN1FVRkRRVHM3UVVGRlFUdEJRVU5CT3p0QlFVVkJPMEZCUTBFN096czdPenM3UVVOMFEwRXNZVUZCV1N4RFFVRkRPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3p0elFrRnhSMWNzU1VGQlNUczdRVUZCWWl4VlFVRlRMRWxCUVVrc1IwRkJSeXhGUVVGRk96czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN08wRkJORUpxUXl4TFFVRkpMRU5CUVVNc1RVRkJUU3hIUVVGSExGVkJRVk1zVFVGQlRTeEZRVUZGTEVWQlFVVXNSVUZCV1R0UFFVRldMRWRCUVVjc2VVUkJRVWNzUlVGQlJUczdRVUZEZWtNc1QwRkJTU3hMUVVGTExFZEJRVWNzVTBGQlVpeExRVUZMTEVkQlFYRkNPMEZCUXpWQ0xGTkJRVWtzU1VGQlNTeEZRVUZGTEZkQlFWY3NRMEZCUXpzN2RVTkJSRUVzU1VGQlNUdEJRVUZLTEZkQlFVazdPenRCUVVVeFFpeGhRVUZSTEVWQlFVVTdRVUZEVWl4WlFVRkxMRTFCUVUwN1FVRkRWQ3hoUVVGSkxFZEJRVWNzU1VGQlNTeEpRVUZKTEVOQlFVTXNTVUZCU1N4RFFVRkRMRTFCUVUwc1JVRkJSU3hKUVVGSkxFVkJRVVVzU1VGQlNTeERRVUZETEV0QlFVc3NRMEZCUXl4RFFVRkRPMEZCUXk5RExHRkJRVWtzUTBGQlF5eExRVUZMTEVOQlFVTXNTVUZCU1N4RFFVRkRMRWxCUVVrc1EwRkJReXhEUVVGRE8wRkJRM1JDTEc5Q1FVRlhMRWRCUTFRc1NVRkJTU3hEUVVGRExGRkJRVkVzUTBGQlF5eEpRVUZKTEVOQlFVTXNUMEZCVHl4RlFVRkZMRWxCUVVrc1JVRkJSU3hKUVVGSkxFTkJRVU1zUzBGQlN5eERRVUZETEVOQlFVTTdRVUZEYUVRc1pVRkJUVHRCUVVOU0xGbEJRVXNzVDBGQlR6dEJRVU5XTEdGQlFVa3NRMEZCUXl4VlFVRlZMRWRCUVVjc1NVRkJTU3hEUVVGRExFdEJRVXNzUTBGQlF6dEJRVU0zUWl4aFFVRkpMRU5CUVVNc1MwRkJTeXhIUVVGSExFVkJRVVVzUTBGQlF6dEJRVU5vUWl4aFFVRkpMRWRCUVVjc1NVRkJTU3hKUVVGSkxFTkJRVU1zU1VGQlNTeERRVUZETEUxQlFVMHNSVUZCUlN4SlFVRkpMRVZCUVVVc1NVRkJTU3hEUVVGRExFdEJRVXNzUTBGQlF5eERRVUZETzBGQlF5OURMR0ZCUVVrc1EwRkJReXhMUVVGTExFTkJRVU1zU1VGQlNTeERRVUZETEVsQlFVa3NRMEZCUXl4RFFVRkRPMEZCUTNSQ0xHOUNRVUZYTEVkQlExUXNTVUZCU1N4RFFVRkRMRkZCUVZFc1EwRkJReXhKUVVGSkxFTkJRVU1zVDBGQlR5eEZRVUZGTEVsQlFVa3NSVUZCUlN4SlFVRkpMRU5CUVVNc1MwRkJTeXhEUVVGRExFTkJRVU03UVVGRGFFUXNaVUZCVFR0QlFVTlNMRmxCUVVzc1MwRkJTenRCUVVOU0xHRkJRVWtzUjBGQlJ5eEpRVUZKTEVsQlFVa3NRMEZCUXl4SlFVRkpMRU5CUVVNc1RVRkJUU3hGUVVGRkxFbEJRVWtzUlVGQlJTeEpRVUZKTEVOQlFVTXNTMEZCU3l4RFFVRkRMRU5CUVVNN1FVRkRMME1zWVVGQlNTeERRVUZETEV0QlFVc3NRMEZCUXl4SlFVRkpMRU5CUVVNc1NVRkJTU3hEUVVGRExFTkJRVU03UVVGRGRFSXNZVUZCU1N4RFFVRkRMRXRCUVVzc1IwRkRVaXhKUVVGSkxFTkJRVU1zVlVGQlZTeERRVUZETzBGQlEyeENMRzlDUVVGWExFZEJRMVFzU1VGQlNTeERRVUZETEZGQlFWRXNRMEZCUXl4SlFVRkpMRU5CUVVNc1QwRkJUeXhGUVVGRkxFbEJRVWtzUlVGQlJTeEpRVUZKTEVOQlFVTXNTMEZCU3l4RFFVRkRMRU5CUVVNN1FVRkRhRVFzWlVGQlRUdEJRVU5TTEZsQlFVc3NUVUZCVFR0QlFVTlVMR0ZCUVVrc1IwRkJSeXhKUVVGSkxFbEJRVWtzUTBGQlF5eEpRVUZKTEVOQlFVTXNUVUZCVFN4RlFVRkZMRWxCUVVrc1JVRkJSU3hKUVVGSkxFTkJRVU1zUzBGQlN5eERRVUZETEVOQlFVTTdRVUZETDBNc1lVRkJTU3hEUVVGRExFdEJRVXNzUTBGQlF5eEpRVUZKTEVOQlFVTXNTVUZCU1N4RFFVRkRMRU5CUVVNN1FVRkRkRUlzYjBKQlFWY3NSMEZEVkN4SlFVRkpMRU5CUVVNc1VVRkJVU3hEUVVGRExFbEJRVWtzUTBGQlF5eFBRVUZQTEVWQlFVVXNTVUZCU1N4RlFVRkZMRWxCUVVrc1EwRkJReXhMUVVGTExFTkJRVU1zUTBGQlF6dEJRVU5vUkN4aFFVRkpMRU5CUVVNc1YwRkJWeXhGUVVGRk8wRkJRMmhDTEdsQ1FVRk5MRWxCUVVrc1MwRkJTeXh6UWtGQmFVSXNTVUZCU1N4RFFVRkRMRWxCUVVrc2EwUkJRMmhDTEVOQlFVTTdWVUZETTBJN1FVRkRSQ3huUWtGQlR5eFhRVUZYTEVOQlFVTXNRMEZCUXl4RFFVRkRMRU5CUVVNN1FVRkJRU3hOUVVONlFqczdRVUZGUkN4VFFVRkpMRmRCUVZjc1JVRkJSVHRCUVVObUxGZEJRVWtzUTBGQlF5eExRVUZMTEVkQlFVY3NWMEZCVnl4RFFVRkRPMDFCUXpGQ08wRkJRMFFzV1VGQlR5eEpRVUZKTEVOQlFVTTdTVUZEWWl4RFFVRkRPMEZCUTBZc1VVRkJTeXhEUVVGRExFbEJRVWtzUjBGQlJ6dEJRVU5ZTEZOQlFVa3NSVUZCUlN4RlFVRkZPMEZCUTFJc1ZVRkJTeXhGUVVGRkxFZEJRVWM3UVVGRFZpeGhRVUZSTEVWQlFVVXNUVUZCVFR0SlFVTnFRaXhEUVVGRE8wRkJRMFlzVlVGQlR5eExRVUZMTEVOQlFVTTdSVUZEWkN4RFFVRkRPenM3T3pzN096dEJRVkZHTEV0QlFVa3NRMEZCUXl4UFFVRlBMRWRCUVVjc1ZVRkJVeXhSUVVGUkxFVkJRVVU3UVVGRGFFTXNUMEZCU1N4VFFVRlRMRWRCUVVjc1RVRkJUU3hEUVVGRExFbEJRVWtzUTBGQlF5eFJRVUZSTEVOQlFVTXNRMEZCUXl4TlFVRk5MRU5CUVVNc1ZVRkJReXhIUVVGSExFVkJRVVVzU1VGQlNTeEZRVUZMTzBGQlF6RkVMRk5CUVVrc1RVRkJUU3hIUVVGSExGRkJRVkVzUTBGQlF5eEpRVUZKTEVOQlFVTXNRMEZCUXp0QlFVTTFRaXhUUVVGSkxFMUJRVTBzUTBGQlF5eEpRVUZKTEVWQlFVVTdRVUZEWml4VlFVRkhMRU5CUVVNc1NVRkJTU3hEUVVGRExFZEJRVWNzVFVGQlRTeERRVUZETEVsQlFVa3NRMEZCUXl4SFFVRkhMRU5CUVVNN1RVRkROMEk3U1VGRFJpeEZRVUZGTEVWQlFVVXNRMEZCUXl4RFFVRkRPMEZCUTFBc1ZVRkJUeXhaUVVGWE8wRkJRMmhDTEZsQlFVOHNVMEZCVXl4RFFVRkRPMGxCUTJ4Q0xFTkJRVU03UlVGRFNDeERRVUZET3p0QlFVVkdMRXRCUVVrc1EwRkJReXhKUVVGSkxFZEJRVWNzVlVGQlV5eEpRVUZKTEVWQlFVVXNTVUZCU1N4RlFVRkZMRXRCUVVzc1JVRkJSVHRCUVVOMFF5eFBRVUZKTEVOQlFVTXNTVUZCU1N4SFFVRkhMRWxCUVVrc1EwRkJRenRCUVVOcVFpeFBRVUZKTEVOQlFVTXNTVUZCU1N4SFFVRkhMRWxCUVVrc1EwRkJRenRCUVVOcVFpeFBRVUZKTEVOQlFVTXNTMEZCU3l4SFFVRkhMRXRCUVVzc1EwRkJRenRGUVVOd1FpeERRVUZET3p0QlFVVkdMRXRCUVVrc1EwRkJReXhSUVVGUkxFZEJRVWNzV1VGQmRVSTdUMEZCWkN4UFFVRlBMSGxFUVVGSExFVkJRVVU3TzBGQlEyNURMRTlCUVVrc1EwRkJReXhWUVVGVkxFZEJRVWNzUlVGQlJTeERRVUZETzBGQlEzSkNMRTlCUVVrc1EwRkJReXhaUVVGWkxFZEJRVWNzU1VGQlNTeERRVUZETzBGQlEzcENMRTlCUVVrc1EwRkJReXhSUVVGUkxFZEJRVWNzVDBGQlR5eERRVUZETzBWQlEzcENMRU5CUVVNN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenRCUVhkQ1JpeExRVUZKTEVOQlFVTXNVVUZCVVN4RFFVRkRMRk5CUVZNc1EwRkJReXhSUVVGUkxFZEJRVWNzVlVGQlV5eERRVUZETEVWQlFVVTdRVUZETjBNc1QwRkJTU3hEUVVGRExGVkJRVlVzUTBGQlF5eEpRVUZKTEVOQlFVTXNRMEZCUXl4RFFVRkRMRU5CUVVNN1FVRkRlRUlzVlVGQlR5eEpRVUZKTEVOQlFVTTdSVUZEWWl4RFFVRkRPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN08wRkJlVUpHTEV0QlFVa3NRMEZCUXl4UlFVRlJMRU5CUVVNc1UwRkJVeXhEUVVGRExGZEJRVmNzUjBGQlJ5eFZRVUZUTEVsQlFVa3NSVUZCUlRzN096dEJRVVZ1UkN4VlFVRlBMRlZCUVVNc1QwRkJUeXhGUVVGRkxFMUJRVTBzUlVGQlJTeExRVUZMTEVWQlFVczdRVUZEYWtNc1UwRkJTVHM3UVVGRlJpeGhRVUZMTEZWQlFWVXNRMEZCUXl4TlFVRk5MRU5CUVVNc1ZVRkJReXhIUVVGSExFVkJRVVVzVVVGQlVTeEZRVUZMTzBGQlEzaERMR2xDUVVGUkxFTkJRVU1zU1VGQlNTeERRVUZETEVWQlFVVXNSVUZCUlN4UFFVRlBMRVZCUVVVc1RVRkJUU3hGUVVGRkxFdEJRVXNzUTBGQlF5eERRVUZETzFGQlF6TkRMRVZCUVVVc1QwRkJUeXhEUVVGRExFTkJRVU03VFVGRFlpeERRVUZETEU5QlFVMHNRMEZCUXl4RlFVRkZPMEZCUTFRc1lVRkJTeXhaUVVGWkxFTkJRVU1zUTBGQlF5eEZRVUZGTEU5QlFVOHNSVUZCUlN4TlFVRk5MRVZCUVVVc1MwRkJTeXhEUVVGRExFTkJRVU03VFVGRE9VTTdPMEZCUlVRc1UwRkJTU3hSUVVGUkxFZEJRVWNzU1VGQlNTeERRVUZETEU5QlFVOHNSVUZCUlN4TlFVRk5MRVZCUVVVc1MwRkJTeXhEUVVGRExFTkJRVU03UVVGRE5VTXNXVUZCVHl4UlFVRlJMRU5CUVVNN1NVRkRha0lzUTBGQlF6dEZRVU5JTEVOQlFVTTdPMEZCUlVZc1MwRkJTU3hEUVVGRExGRkJRVkVzUTBGQlF5eFRRVUZUTEVOQlFVTXNXVUZCV1N4SFFVTndReXhWUVVGVExFZEJRVWNzUlVGQlJTeFBRVUZQTEVWQlFVVXNUVUZCVFN4RlFVRkZMRXRCUVVzc1JVRkJSVHM3UVVGRmNFTXNVMEZCVFN4SlFVRkpMRXRCUVVzc2EwSkJRV2RDTEUxQlFVMHNRMEZCUXl4SlFVRkpMSFZDUVVGcFFpeEhRVUZITEdsQ1FVRmhMRU5CUVVNN1JVRkROMFVzUTBGQlF5SXNJbVpwYkdVaU9pSnlkVzVsTG1weklpd2ljMjkxY21ObGMwTnZiblJsYm5RaU9sc2lJRngwTHk4Z1ZHaGxJRzF2WkhWc1pTQmpZV05vWlZ4dUlGeDBkbUZ5SUdsdWMzUmhiR3hsWkUxdlpIVnNaWE1nUFNCN2ZUdGNibHh1SUZ4MEx5OGdWR2hsSUhKbGNYVnBjbVVnWm5WdVkzUnBiMjVjYmlCY2RHWjFibU4wYVc5dUlGOWZkMlZpY0dGamExOXlaWEYxYVhKbFgxOG9iVzlrZFd4bFNXUXBJSHRjYmx4dUlGeDBYSFF2THlCRGFHVmpheUJwWmlCdGIyUjFiR1VnYVhNZ2FXNGdZMkZqYUdWY2JpQmNkRngwYVdZb2FXNXpkR0ZzYkdWa1RXOWtkV3hsYzF0dGIyUjFiR1ZKWkYwcFhHNGdYSFJjZEZ4MGNtVjBkWEp1SUdsdWMzUmhiR3hsWkUxdlpIVnNaWE5iYlc5a2RXeGxTV1JkTG1WNGNHOXlkSE03WEc1Y2JpQmNkRngwTHk4Z1EzSmxZWFJsSUdFZ2JtVjNJRzF2WkhWc1pTQW9ZVzVrSUhCMWRDQnBkQ0JwYm5SdklIUm9aU0JqWVdOb1pTbGNiaUJjZEZ4MGRtRnlJRzF2WkhWc1pTQTlJR2x1YzNSaGJHeGxaRTF2WkhWc1pYTmJiVzlrZFd4bFNXUmRJRDBnZTF4dUlGeDBYSFJjZEdWNGNHOXlkSE02SUh0OUxGeHVJRngwWEhSY2RHbGtPaUJ0YjJSMWJHVkpaQ3hjYmlCY2RGeDBYSFJzYjJGa1pXUTZJR1poYkhObFhHNGdYSFJjZEgwN1hHNWNiaUJjZEZ4MEx5OGdSWGhsWTNWMFpTQjBhR1VnYlc5a2RXeGxJR1oxYm1OMGFXOXVYRzRnWEhSY2RHMXZaSFZzWlhOYmJXOWtkV3hsU1dSZExtTmhiR3dvYlc5a2RXeGxMbVY0Y0c5eWRITXNJRzF2WkhWc1pTd2diVzlrZFd4bExtVjRjRzl5ZEhNc0lGOWZkMlZpY0dGamExOXlaWEYxYVhKbFgxOHBPMXh1WEc0Z1hIUmNkQzh2SUVac1lXY2dkR2hsSUcxdlpIVnNaU0JoY3lCc2IyRmtaV1JjYmlCY2RGeDBiVzlrZFd4bExteHZZV1JsWkNBOUlIUnlkV1U3WEc1Y2JpQmNkRngwTHk4Z1VtVjBkWEp1SUhSb1pTQmxlSEJ2Y25SeklHOW1JSFJvWlNCdGIyUjFiR1ZjYmlCY2RGeDBjbVYwZFhKdUlHMXZaSFZzWlM1bGVIQnZjblJ6TzF4dUlGeDBmVnh1WEc1Y2JpQmNkQzh2SUdWNGNHOXpaU0IwYUdVZ2JXOWtkV3hsY3lCdlltcGxZM1FnS0Y5ZmQyVmljR0ZqYTE5dGIyUjFiR1Z6WDE4cFhHNGdYSFJmWDNkbFluQmhZMnRmY21WeGRXbHlaVjlmTG0wZ1BTQnRiMlIxYkdWek8xeHVYRzRnWEhRdkx5QmxlSEJ2YzJVZ2RHaGxJRzF2WkhWc1pTQmpZV05vWlZ4dUlGeDBYMTkzWldKd1lXTnJYM0psY1hWcGNtVmZYeTVqSUQwZ2FXNXpkR0ZzYkdWa1RXOWtkV3hsY3p0Y2JseHVJRngwTHk4Z1gxOTNaV0p3WVdOclgzQjFZbXhwWTE5d1lYUm9YMTljYmlCY2RGOWZkMlZpY0dGamExOXlaWEYxYVhKbFgxOHVjQ0E5SUZ3aVhDSTdYRzVjYmlCY2RDOHZJRXh2WVdRZ1pXNTBjbmtnYlc5a2RXeGxJR0Z1WkNCeVpYUjFjbTRnWlhod2IzSjBjMXh1SUZ4MGNtVjBkWEp1SUY5ZmQyVmljR0ZqYTE5eVpYRjFhWEpsWDE4b01DazdYRzVjYmx4dVhHNHZLaW9nVjBWQ1VFRkRTeUJHVDA5VVJWSWdLaXBjYmlBcUtpQjNaV0p3WVdOckwySnZiM1J6ZEhKaGNDQTJObU14TVdJMFlUZGhOR1kwWVdZd09HWXpabHh1SUNvcUx5SXNJaWQxYzJVZ2MzUnlhV04wSnp0Y2JseHVMeW9xWEc0Z0tpQkhaVzVsY21saklHSjFhV3hrWlhJZ2RHaGhkQ0IzYjNWc1pDQndkWE5vSUc1dlpHVnpJR2x1ZEc4Z2RHaGxJR1ZFVTB3Z2MzUmhZMnN1WEc0Z0tpQlZjMlZ5SUdOdmRXeGtJR2x1YUdWeWFYUWdkR2hwY3lCMGJ5QmtaV1pwYm1VZ2RHaGxJRzVsZHlCbFJGTk1MbHh1SUNvZ0xTMHRYRzRnS2lCVWFHVWdaR1ZtWVhWc2RDQnpaVzFoYm5ScFkzTWdiMjVzZVNCamIyNTBZV2x1SUhSb1pYTmxJRzl3WlhKaGRHbHZibk02WEc0Z0tseHVJQ29nTVM0Z1czQjFjMmhkSURvZ2NIVnphQ0IwYnlCMGFHVWdZM1Z5Y21WdWRDQnpkR0ZqYTF4dUlDb2dNaTRnVzJKbFoybHVYVG9nWTNKbFlYUmxJR0VnYm1WM0lITjBZV05ySUdGdVpDQnpkMmwwWTJnZ2RHOGdhWFFzWEc0Z0tpQWdJQ0FnSUNBZ0lDQWdJQ0JoYm1RZ2RHaGxiaUJ3ZFhOb0lIUm9aU0J1YjJSbElHbHVkRzhnZEdobElITjBZV05yTGx4dUlDb2dNeTRnVzJWdVpGMGdJRG9nWVdaMFpYSWdjSFZ6YUNCMGFHVWdibTlrWlNCcGJuUnZJSFJvWlNCemRHRmpheXhjYmlBcUlDQWdJQ0FnSUNBZ0lDQWdJR05vWVc1blpTQjBhR1VnWTNWeWNtVnVkQ0J6ZEdGamF5QjBieUIwYUdVZ2NISmxkbWx2ZFhNZ2IyNWxMbHh1SUNvZ05DNGdXMlY0YVhSZElEb2daWGhwZENCMGFHVWdZMjl1ZEdWNGRDQnZaaUIwYUdseklHVkVVMHc3SUhSb1pTQnNZWE4wSUhKbGMzVnNkRnh1SUNvZ0lDQWdJQ0FnSUNBZ0lDQWdiMllnYVhRZ2QyOTFiR1FnWW1VZ2NHRnpjMlZrSUhSdklIUm9aU0J5WlhSMWNtNGdkbUZzZFdVZ2IyWmNiaUFxSUNBZ0lDQWdJQ0FnSUNBZ0lIUm9hWE1nWTJoaGFXNHVYRzRnS2x4dUlDb2dVM1JoWTJzZ1kyOTFiR1FnWW1VZ2JtVnpkR1ZrT2lCM2FHVnVJRnRpWldkcGJsMGdZU0J1WlhjZ2MzUmhZMnNnYVc0Z1ptRmpkQ0JwZENCM2IzVnNaRnh1SUNvZ2NIVnphQ0IwYUdVZ2MzUmhZMnNnYVc1MGJ5QjBhR1VnY0hKbGRtbHZkWE1nYjI1bExpQlRieUIwYUdVZ2MzUmhZMnNnWTI5dGNISnBjMlZjYmlBcUlGdHViMlJsWFNCaGJtUWdXM04wWVdOclhTNWNiaUFxSUMwdExWeHVJQ29nUVd4MGFHOTFaMmdnZEdobElHVkVVMHdnYVc1emRHRnVZMlVnYzJodmRXeGtJSGR5WVhBZ2RHaGxjMlVnWW1GemFXTWdiM0JsY21GMGFXOXVjMXh1SUNvZ2RHOGdiV0Z1YVhCMWJHRjBaU0IwYUdVZ2MzUmhZMnNzSUhSb1pYa2dZV3hzSUc1bFpXUWdkRzhnWTI5dWRtVnlkQ0IwYUdVZ2JXVjBhRzlrWEc0Z0tpQmpZV3hzSUhSdklHNXZaR1Z6TGlCVGJ5QW5VblZ1WlNjZ2NISnZkbWxrWlNCaElIZGhlU0IwYnlCemFXMXdiR2xtZVNCMGFHVWdkMjl5YXpvZ2FXWmNiaUFxSUhSb1pTQnBibk4wWVc1alpTQmpZV3hzSUhSb1pTQmJaR1ZtYVc1bFhTQnRaWFJvYjJRZ2RHaGxJRzVoYldVZ2IyWWdkR2hsSUcxbGRHaHZaQ3hjYmlBcUlHbDBJR052ZFd4a0lHRnpjMjlqYVdGMFpTQjBhR1VnYjNCbGNtRnVaQ0J2WmlCMGFHVWdaVVJUVENCM2FYUm9JSFJvWlNCemRHRmpheUJ0WVc1cGNIVnNZWFJwYjI0dVhHNGdLaUJHYjNJZ1pYaGhiWEJzWlRwY2JpQXFYRzRnS2lBZ0lDQjJZWElnWlVSVFRDQTlJR1oxYm1OMGFXOXVLQ2tnZTMwN1hHNGdLaUFnSUNCbFJGTk1MbkJ5YjNSdmRIbHdaUzUwY21GdWMyRmpkR2x2YmlBOUlGSjFibVV1WkdWbWFXNWxLQ2QwY21GdWMyRmpkR2x2Ymljc0lDZGlaV2RwYmljcE8xeHVJQ29nSUNBZ1pVUlRUQzV3Y205MGIzUjVjR1V1Y0hKbElEMGdVblZ1WlM1a1pXWnBibVVvSjNCeVpTY3NJQ2R3ZFhOb0p5azdYRzRnS2lBZ0lDQmxSRk5NTG5CeWIzUnZkSGx3WlM1d1pYSm1iM0p0SUQwZ1VuVnVaUzVrWldacGJtVW9KM0JsY21admNtMG5MQ0FuY0hWemFDY3BPMXh1SUNvZ0lDQWdaVVJUVEM1d2NtOTBiM1I1Y0dVdWNHOXpkQ0E5SUZKMWJtVXVaR1ZtYVc1bEtDZHdiM04wSnl3Z0oyVnVaQ2NwTzF4dUlDcGNiaUFxSUZSb1pXNGdkR2hsSUdWRVUwd2dZMjkxYkdRZ1ltVWdkWE5sWkNCaGN6cGNiaUFxWEc0Z0tpQWdJQ0FvYm1WM0lHVkVVMHdwWEc0Z0tpQWdJQ0FnSUM1MGNtRnVjMkZqZEdsdmJpZ3BYRzRnS2lBZ0lDQWdJQzV3Y21Vb1kySXBYRzRnS2lBZ0lDQWdJQzV3WlhKbWIzSnRLR05pS1Z4dUlDb2dJQ0FnSUNBdWNHOXpkQ2hqWWlsY2JpQXFYRzRnS2lCQmJtUWdkR2hsSUhOMFlXTnJJSGR2ZFd4a0lHSmxPbHh1SUNwY2JpQXFJQ0FnSUZ0Y2JpQXFJQ0FnSUNBZ2JtOWtaVHduZEhKaGJuTmhZM1JwYjI0bkxENWNiaUFxSUNBZ0lDQWdibTlrWlR3bmNISmxKeXdnWTJJK1hHNGdLaUFnSUNBZ0lHNXZaR1U4SjNCeVpXWnZjbTBuTENCallqNWNiaUFxSUNBZ0lDQWdibTlrWlR3bmNHOXpkQ2NzSUdOaVBseHVJQ29nSUNBZ1hWeHVJQ3BjYmlBcUlFaHZkMlYyWlhJc0lIUm9hWE1nYzJsdGNHeGxJR0Z3Y0hKdllXTm9JSFJvWlNCelpXMWhiblJwWTNNZ2NuVnNaWE1nWVc1a0lHRnVZV3g1ZW1WeWN5QjBiMXh1SUNvZ1ozVmhjbUZ1ZEdWbElIUm9aU0J6ZEdGamF5QnBjeUIyWVd4cFpDNGdSbTl5SUdWNFlXMXdiR1VzSUdsbUlIZGxJR2hoZG1VZ1lTQnRZV3htYjNKdFpXUmNiaUFxSUhOMFlXTnJJR0psWTJGMWMyVWdiMllnZEdobElHWnZiR3h2ZDJsdVp5QmxSRk5NSUhCeWIyZHlZVzA2WEc0Z0tseHVJQ29nSUNBZ0tHNWxkeUJsUkZOTUtWeHVJQ29nSUNBZ0lDQXVjRzl6ZENoallpbGNiaUFxSUNBZ0lDQWdMbkJ5WlNoallpbGNiaUFxSUNBZ0lDQWdMbkJsY21admNtMG9ZMklwWEc0Z0tpQWdJQ0FnSUM1MGNtRnVjMkZqZEdsdmJpZ3BYRzRnS2x4dUlDb2dWR2hsSUhKMWJuUnBiV1VnYldGNUlISmxjRzl5ZENCbGNuSnZkQ0JpWldOaGRYTmxJSGRvWlc0Z0p5NXdiM04wS0dOaUtTY2dkR2hsY21VZ2FYTWdibThnYzNSaFkydGNiaUFxSUdOeVpXRjBaV1FnWW5rZ2RHaGxJR0psWjJsdWJtbHVaeUJ6ZEdWd0xDQnVZVzFsYkhrZ2RHaGxJQ2N1Y0hKbEtHTmlLU2NnYVc0Z2IzVnlJR05oYzJVdVhHNGdLaUJPWlhabGNuUm9aV3hsYzNNc0lIUm9aU0JsY25KdmNpQnRaWE56WVdkbElHbHpJSFJ2YnlCc2IzY3RiR1YyWld3Z1ptOXlJSFJvWlNCc1lXNW5kV0ZuWlNCMWMyVnlMRnh1SUNvZ2MybHVZMlVnZEdobGVTQnphRzkxYkdRZ1kyRnlaU0J1YnlCemRHRmpheUIwYUdsdVozTWdZVzVrSUhOb2IzVnNaQ0J2Ym14NUlHTmhjbVVnWVdKdmRYUWdkR2hsSUdWRVUweGNiaUFxSUdsMGMyVnNaaTVjYmlBcVhHNGdLaUJVYUdVZ2MyOXNkWFJwYjI0Z2FYTWdkRzhnY0hKdmRtbGtaU0JoSUdKaGMybGpJSE4wWVdOcklHOXlaR1Z5YVc1bklHRnVZV3g1ZW1WeUlHRnVaQ0JzWlhRZ2RHaGxYRzRnS2lCc1lXNW5kV0ZuWlNCa1pXTnBaR1VnYUc5M0lIUnZJR1JsYzJOeWFXSmxJSFJvWlNCbGNuSnZjaTRnUVc1a0lITnBibU5sSUhkbElHUnZiaWQwSUdoaGRtVmNiaUFxSUdGdWVTQmpiMjUwWlhoMElHbHVabTl5YldGMGFXOXVJR0ZpYjNWMElIWmhjbWxoWW14bGN5d2djMk52Y0dVZ1lXNWtJRzkwYUdWeUlHVnNaVzFsYm5SelhHNGdLaUJoY3lCaElHTnZiWEJzWlhSbElIQnliMmR5WVcxdGFXNW5JR3hoYm1kMVlXZGxMQ0IzWlNCdmJteDVJRzVsWldRZ2RHOGdaM1ZoY21GdWRHVmxJSFJvWlNCdmNtUmxjaUJwYzF4dUlDb2dZMjl5Y21WamRDd2dZVzVrSUcxaGEyVWdhVzVqYjNKeVpXTjBJR05oYzJWeklHMWxZVzVwYm1kbWRXd3VJRTF2Y21WdmRtVnlMQ0J6YVc1alpTQjBhR1VnWVc1aGJIbDZaWEpjYmlBcUlHNWxaV1J6SUhSdklHRnVZV3g1ZW1VZ2RHaGxJSE4wWVhSbGN5QjNhR1Z1WlhabGNpQjBhR1VnYVc1amIyMXBibWNnYm05a1pTQmpiMjFsY3l3Z2FYUWdhWE1nYVc0Z1ptRmpkRnh1SUNvZ1lXNGdaWFpoYkhWaGRHbHZiaUJ3Y205alpYTnpMQ0J6YnlCMWMyVnlJR052ZFd4a0lHTnZiV0pwYm1VZ2RHaGxJR0Z1WVd4NWVtbHVaeUJoYm1RZ2FXNTBaWEp3Y21WMGFXNW5YRzRnS2lCd2FHRnpaU0JwYm5SdklIUm9aU0J6WVcxbElHWjFibU4wYVc5dUxpQkdiM0lnWlhoaGJYQnNaVHBjYmlBcVhHNGdLaUFnSUNCeWRXNTBhVzFsTG05dVkyaGhibWRsS0NoamIyNTBaWGgwTENCdWIyUmxMQ0J6ZEdGamF5a2dQVDRnZTF4dUlDb2dJQ0FnSUNBZ0lDOHZJRWxtSUhSb1pTQmphR0Z1WjJVZ2FYTWdkRzhnYzNkcGRHTm9JSFJ2SUdFZ2JtVjNJSE4wWVdOckxGeHVJQ29nSUNBZ0lDQWdJQzh2SUhSb1pTQW5jM1JoWTJzbklHaGxjbVVnZDI5MWJHUWdZbVVnZEdobElHNWxkeUJ6ZEdGamF5NWNiaUFxSUNBZ0lDQWdJQ0IyWVhJZ2UzUjVjR1VzSUdGeVozTjlJRDBnYm05a1pUdGNiaUFxSUNBZ0lDQWdJQ0JwWmlBb0ozQnlaU2NnUFQwOUlIUjVjR1VwSUh0Y2JpQXFJQ0FnSUNBZ0lDQWdJR052Ym5SbGVIUXVhVzVwZENBOUlIUnlkV1U3WEc0Z0tpQWdJQ0FnSUNBZ2ZTQmxiSE5sSUdsbUlDZ25jRzl6ZENjZ1BUMDlJSFI1Y0dVZ0ppWWdJV052Ym5SbGVIUXVhVzVwZENrZ2UxeHVJQ29nSUNBZ0lDQWdJQ0FnZEdoeWIzY2dibVYzSUVWeWNtOXlLQ2RVYUdWeVpTQnRkWE4wSUdKbElHOXVaU0JjSW5CeVpWd2lJRzV2WkdVZ1ltVm1iM0psSUhSb1pTQmNJbkJ2YzNSY0lpNG5LVHRjYmlBcUlDQWdJQ0FnSUNCOVhHNGdLaUFnSUNCOUtUdGNiaUFxWEc0Z0tpQlhhWFJvSUhOMVkyZ2dabVZoZEhWeVpTd2dhV1lnZEdobElHbHVZMjl0YVc1bklHNXZaR1VnYjNJZ2RHaGxJSE4wWVdOcklHbHpJRzFoYkdadmNtMWxaQ3hjYmlBcUlHbDBJSE5vYjNWc1pDQjBhSEp2ZHlCMGFHVWdaWEp5YjNJdUlGUm9aU0JsY25KdmNpQmpZWEIwZFhKbFpDQmllU0IwYUdVZ2FXNXpkR0Z1WTJVZ2JHbHJaU0IwYUdselhHNGdLaUJqYjNWc1pDQmlaU0JoSUNkamIyMXdhV3hoZEdsdmJpQmxjbkp2Y2ljdVhHNGdLbHh1SUNvZ1ZHaGxJRzV2ZEdsalpXRmliR1VnWm1GamRDQnBjeUJVYUdVZ1kyRnNiR0poWTJzZ2IyWWdkR2hsSUNkdmJtTm9ZVzVuWlNjZ2FYTWdZV04wZFdGc2JIa2dZU0J5WldSMVkyVnlMRnh1SUNvZ2MyOGdkWE5sY2lCamIzVnNaQ0IwY21WaGRDQjBhR1VnY0hKdlkyVnpjeUJ2WmlCMGFHbHpJR1YyWVd4MVlYUnBiMjRnSmlCaGJtRnNlWHBwYm1jZ1lYTWdZU0J5WldSMVkybHVaMXh1SUNvZ2NISnZZMlZ6Y3lCdmJpQmhiaUJwYm1acGJtbDBaU0J6ZEhKbFlXMHVJRUZ1WkNCemFXNWpaU0IzWlNCb1lYWmxJR0VnYzNSaFkyc2diV0ZqYUdsdVpTd2dhV1lnZEdobFhHNGdLaUJ5WldSMVkyVnlJSEpsZEhWeWJpQnViM1JvYVc1bkxDQjBhR1VnYzNSaFkyc2dkMjkxYkdRZ1ltVWdaVzF3ZEhrdUlFOTBhR1Z5ZDJselpTd2dhV1lnZEdobElISmxaSFZqWlhKY2JpQXFJSEpsZEhWeWJpQmhJRzVsZHlCemRHRmpheXdnYVhRZ2QyOTFiR1FnY21Wd2JHRmpaU0IwYUdVZ2IyeGtJRzl1WlM1Y2JpQXFYRzRnS2lCQmJtUWdjR3hsWVhObElHNXZkR1VnZEdobElHVjRZVzF3YkdVZ2FYTWdiWFZqYUNCemFXMXdiR2xtYVdWa0xpQkdiM0lnZEdobFhHNGdLaUJ5WldGc0lHVkVVMHdnYVhRZ2MyaHZkV3hrSUdKbElIVnpaV1FnYjI1c2VTQmhjeUJoYmlCbGJuUnllU0IwYnlCa2FYTndZWFJqYUNCMGFHVWdZMmhoYm1kbElIUnZYRzRnS2lCMGFHVWdjbVZoYkNCb1lXNWtiR1Z5Y3l3Z2QyaHBZMmdnYldGNUlHTnZiWEJ5YVhObElITmxkbVZ5WVd3Z2MzUmhkR1Z6SUdGdVpDQmpiMjF3YjI1bGJuUnpMbHh1SUNvdlhHNWxlSEJ2Y25RZ1pHVm1ZWFZzZENCbWRXNWpkR2x2YmlCU2RXNWxLQ2tnZTMxY2JseHVMeW9xWEc0Z0tpQklaV3h3WlhJZ2JXVjBhRzlrSUhSdklHSjFhV3hrSUdsdWRHVnlabUZqWlNCdlppQmhJSE53WldOcFptbGpJRVJUVEM0Z1NYUWdkMjkxYkdRZ2NtVjBkWEp1SUdFZ2JXVjBhRzlrWEc0Z0tpQnZaaUIwYUdVZ1JGTk1JR0Z1WkNCMGFHVnVJSFJvWlNCcGJuUmxjbVpoWTJVZ1kyOTFiR1FnWVhSMFlXTm9JR2wwTGx4dUlDcGNiaUFxSUZSb1pTQnlaWFIxY201cGJtY2dablZ1WTNScGIyNGdkMjkxYkdRZ1lYTnpkVzFsSUhSb1lYUWdkR2hsSUNkMGFHbHpKeUJwYm5OcFpHVWdhWFFnYVhNZ2RHaGxJSEoxYm5ScGJXVmNiaUFxSUc5bUlIUm9aU0JzWVc1bmRXRm5aUzRnUVc1a0lITnBibU5sSUhSb1pTQnRaWFJvYjJRZ2FYUWdjbVYwZFhKdWN5QjNiM1ZzWkNCeVpYRjFhWEpsSUhSdklHRmpZMlZ6Y3lCemIyMWxYRzRnS2lCdFpXMWlaWEp6SUc5bUlIUm9aU0FuZEdocGN5Y3NJSFJvWlNBbmRHaHBjeWNnYzJodmRXeGtJR2hoZG1VZ0ozUm9hWE11YzNSaFkyc25JR0Z1WkNBbmRHaHBjeTVqYjI1MFpYaDBKMXh1SUNvZ1lYTWdkR2hsSUcxbGRHaHZaQ0J5WlhGMWFYSmxjeTVjYmlBcVhHNGdLaUJKWmlCcGRDZHpJR0Z1SUNkbGVHbDBKeUJ1YjJSbExDQnRaV0Z1Y3lCMGFHVWdjMlZ6YzJsdmJpQnBjeUJsYm1SbFpDQmhibVFnZEdobElHbHVkR1Z5Y0hKbGRHVnlJSE5vYjNWc1pGeHVJQ29nY21WMGRYSnVJR0VnYzNSaFkyc2dZMjl1ZEdGcGJuTWdiMjVzZVNCdmJtVWdibTlrWlNCaGN5QjBhR1VnY21WemRXeDBJRzltSUhSb1pTQnpaWE56YVc5dUxDQnZjaUIwYUdWY2JpQXFJSE5sYzNOcGIyNGdjbVYwZFhKdWN5QnViM1JvYVc1bkxpQkdiM0lnYjNSb1pYSWdhVzV6ZEhKMVkzUnBiMjV6SUhSb1pTQnpkR0ZqYXlCallXNGdhMlZsY0NCemIyMWxYRzRnS2lCamIyMXdkWFJsWkNCeVpYTjFiSFFnZEc4Z2MybHRkV3hoZEdVZ2NtVmhiQ0J6ZEdGamF5QnRZV05vYVc1bExpQkNkWFFnYVhRbmN5QlBTeUIwYnlCdWIzUWdkWE5sSUhSb2FYTmNiaUFxSUdabFlYUjFjbVVnWVc1a0lHRnNkMkY1Y3lCeVpYUjFjbTRnWVc0Z1pXMXdkSGtnSjNOMFlXTnJKeUJsZG1WeWVYUnBiV1VnZEdobElDZHZibU5vWVc1blpTY2daMlYwWEc0Z0tpQmpZV3hzWldRZ1lXNWtJR2x1ZEdWeWRYQjBaV1F1SUVsdUlIUm9hWE1nYlc5a1pTQnBkQ0J0WldGdWN5QjBhR1VnYkdGdVozVmhaMlVnZDJGdWRDQjBieUJyWldWd1hHNGdLaUJoYkd3Z2MzUmhkR1Z6SUdKNUlHbDBjMlZzWmk1Y2JpQXFYRzRnS2lCUWJHVmhjMlVnYm05MFpTQjBhR0YwSUdaeWIyMGdkR2hsSUdSbGMyTnlhWEIwYVc5dUlHRmliM1psTENBblpXNWtKeUJ0WldGdWN5QnpkR0ZqYXlBb2MzVmljM1JoWTJzcFhHNGdLaUJsYm1SekxpQkpkQ2R6SUhSdmRHRnNiSGtnYVhKeVpXeGxkbUZ1ZENCMGJ5QW5aWGhwZENjdVhHNGdLbHh1SUNvZ1ZHaGxJR3hoYzNRZ1lYSm5kVzFsYm5RZ0oyUnZZeWNnYVhNZ2QyaGhkQ0JrWlhOcFoyNWxjaUJqYjNWc1pDQndkWFFnZEdobElHUmxjMk55YVhCMGFXOXVJR0ZpYjNWMFhHNGdLaUIwYUdVZ2JXVjBhRzlrTGlCSlppQnpaWFFzSUdsMElIZHZkV3hrSUdGd2NHVnVaQ0IwYUdVZ0ozSjFibVV1Wkc5akoxeHVJQ29nY0hKdmNHVnlkSGtnYVc0Z2RHaGxJR1oxYm1OMGFXOXVJR2wwSUhKbGRIVnlibk11SUVGdVpDQjBhR1Z1SUhSb1pTQnNZVzVuZFdGblpTQnBibk4wWVc1alpTQmpiM1ZzWkZ4dUlDb2dZMkZzYkNCZ1VuVnVaUzVrYjJOMWJXVnVkQ2c4YVc1emRHRnVZMlUrS1dBZ2RHOGdaMlYwSUdFZ2JXVjBhRzlrSUhSb1lYUWdkMjkxYkdRZ2NtVjBkWEp1WEc0Z0tpQW5leUJ0WlhSb2IyUk9ZVzFsT2lCa1pYTmpjbWx3ZEdsdmJpQjlKeUIzYUdWdUlHbDBJR2R2ZENCcGJuWnZhMlZrTGx4dUlDb3ZYRzVTZFc1bExtUmxabWx1WlNBOUlHWjFibU4wYVc5dUtHMWxkR2h2WkN3Z1lYTXNJR1J2WXlBOUlDY25LU0I3WEc0Z0lIWmhjaUJpZFdsc2RDQTlJR1oxYm1OMGFXOXVLQzR1TG1GeVozTXBJSHRjYmlBZ0lDQjJZWElnYm05a1pTd2djbVZ6ZFd4MGMzUmhZMnM3WEc0Z0lDQWdjM2RwZEdOb0lDaGhjeWtnZTF4dUlDQWdJQ0FnWTJGelpTQW5jSFZ6YUNjNlhHNGdJQ0FnSUNBZ0lHNXZaR1VnUFNCdVpYY2dVblZ1WlM1T2IyUmxLRzFsZEdodlpDd2dZWEpuY3l3Z2RHaHBjeTV6ZEdGamF5azdYRzRnSUNBZ0lDQWdJSFJvYVhNdWMzUmhZMnN1Y0hWemFDaHViMlJsS1R0Y2JpQWdJQ0FnSUNBZ2NtVnpkV3gwYzNSaFkyc2dQVnh1SUNBZ0lDQWdJQ0FnSUhSb2FYTXViMjVqYUdGdVoyVW9kR2hwY3k1amIyNTBaWGgwTENCdWIyUmxMQ0IwYUdsekxuTjBZV05yS1R0Y2JpQWdJQ0FnSUNBZ1luSmxZV3M3WEc0Z0lDQWdJQ0JqWVhObElDZGlaV2RwYmljNlhHNGdJQ0FnSUNBZ0lIUm9hWE11WDNCeVpYWnpkR0ZqYXlBOUlIUm9hWE11YzNSaFkyczdYRzRnSUNBZ0lDQWdJSFJvYVhNdWMzUmhZMnNnUFNCYlhUdGNiaUFnSUNBZ0lDQWdibTlrWlNBOUlHNWxkeUJTZFc1bExrNXZaR1VvYldWMGFHOWtMQ0JoY21kekxDQjBhR2x6TG5OMFlXTnJLVHRjYmlBZ0lDQWdJQ0FnZEdocGN5NXpkR0ZqYXk1d2RYTm9LRzV2WkdVcE95QWdMeThnWVhNZ2RHaGxJR1pwY25OMElHNXZaR1VnYjJZZ2RHaGxJRzVsZHlCemRHRmpheTVjYmlBZ0lDQWdJQ0FnY21WemRXeDBjM1JoWTJzZ1BWeHVJQ0FnSUNBZ0lDQWdJSFJvYVhNdWIyNWphR0Z1WjJVb2RHaHBjeTVqYjI1MFpYaDBMQ0J1YjJSbExDQjBhR2x6TG5OMFlXTnJLVHRjYmlBZ0lDQWdJQ0FnWW5KbFlXczdYRzRnSUNBZ0lDQmpZWE5sSUNkbGJtUW5PbHh1SUNBZ0lDQWdJQ0J1YjJSbElEMGdibVYzSUZKMWJtVXVUbTlrWlNodFpYUm9iMlFzSUdGeVozTXNJSFJvYVhNdWMzUmhZMnNwTzF4dUlDQWdJQ0FnSUNCMGFHbHpMbk4wWVdOckxuQjFjMmdvYm05a1pTazdJQ0F2THlCMGFHVWdiR0Z6ZENCdWIyUmxJRzltSUhSb1pTQnpkR0ZqYXk1Y2JpQWdJQ0FnSUNBZ2RHaHBjeTV6ZEdGamF5QTlYRzRnSUNBZ0lDQWdJQ0FnZEdocGN5NWZjSEpsZG5OMFlXTnJPeUF2THlCemQybDBZMmdnWW1GamF5QjBieUIwYUdVZ2NISmxkbWx2ZFhNZ2MzUmhZMnN1WEc0Z0lDQWdJQ0FnSUhKbGMzVnNkSE4wWVdOcklEMWNiaUFnSUNBZ0lDQWdJQ0IwYUdsekxtOXVZMmhoYm1kbEtIUm9hWE11WTI5dWRHVjRkQ3dnYm05a1pTd2dkR2hwY3k1emRHRmpheWs3WEc0Z0lDQWdJQ0FnSUdKeVpXRnJPMXh1SUNBZ0lDQWdZMkZ6WlNBblpYaHBkQ2M2WEc0Z0lDQWdJQ0FnSUc1dlpHVWdQU0J1WlhjZ1VuVnVaUzVPYjJSbEtHMWxkR2h2WkN3Z1lYSm5jeXdnZEdocGN5NXpkR0ZqYXlrN1hHNGdJQ0FnSUNBZ0lIUm9hWE11YzNSaFkyc3VjSFZ6YUNodWIyUmxLVHNnSUM4dklIUm9aU0JzWVhOMElHNXZaR1VnYjJZZ2RHaGxJSE4wWVdOckxseHVJQ0FnSUNBZ0lDQnlaWE4xYkhSemRHRmpheUE5WEc0Z0lDQWdJQ0FnSUNBZ2RHaHBjeTV2Ym1Ob1lXNW5aU2gwYUdsekxtTnZiblJsZUhRc0lHNXZaR1VzSUhSb2FYTXVjM1JoWTJzcE8xeHVJQ0FnSUNBZ0lDQnBaaUFvSVhKbGMzVnNkSE4wWVdOcktTQjdYRzRnSUNBZ0lDQWdJQ0FnZEdoeWIzY2dibVYzSUVWeWNtOXlLR0FuWlhocGRDY2dibTlrWlNBbkpIdHViMlJsTG5SNWNHVjlKeUJ6YUc5MWJHUmNiaUFnSUNBZ0lDQWdJQ0FnSUhKbGRIVnliaUJoSUhKbGMzVnNkSE4wWVdOckxtQXBPMXh1SUNBZ0lDQWdJQ0I5WEc0Z0lDQWdJQ0FnSUhKbGRIVnliaUJ5WlhOMWJIUnpkR0ZqYTFzd1hUdGNiaUFnSUNCOVhHNGdJQ0FnTHk4Z1NXWWdkR2hsSUdoaGJtUnNaWElnZFhCa1lYUmxjeUIwYUdVZ2MzUmhZMnNzSUdsMElIZHZkV3hrSUhKbGNHeGhZMlVnZEdobElHVjRhWE4wYVc1bklHOXVaUzVjYmlBZ0lDQnBaaUFvY21WemRXeDBjM1JoWTJzcElIdGNiaUFnSUNBZ0lIUm9hWE11YzNSaFkyc2dQU0J5WlhOMWJIUnpkR0ZqYXp0Y2JpQWdJQ0I5WEc0Z0lDQWdjbVYwZFhKdUlIUm9hWE03WEc0Z0lIMDdYRzRnSUdKMWFXeDBMbkoxYm1VZ1BTQjdYRzRnSUNBZ0oyRnpKem9nWVhNc1hHNGdJQ0FnSjJSdll5YzZJR1J2WXl4Y2JpQWdJQ0FuYldWMGFHOWtKem9nYldWMGFHOWtMRnh1SUNCOU8xeHVJQ0J5WlhSMWNtNGdZblZwYkhRN1hHNTlPMXh1WEc0dktpcGNiaUFxSUVkbGJtVnlZWFJsSUdFZ2JXVjBhRzlrSUhSb1lYUWdkMjkxYkdRZ2NtVjBkWEp1SUdGc2JDQmtiMk4xYldWdWRITWdiMllnZEdobElHMWxkR2h2WkhNc1hHNGdLaUJwYmlCaElHWnZjbTBnYjJZZ0ozc2diV1YwYUc5a1RtRnRaVG9nWkdWelkzSnBjSFJwYjI0Z2ZTY3VYRzRnS2x4dUlDb2dWR2hsSUdGeVozVnRaVzUwSUcxMWMzUWdZbVVnZEdobElHeGhibWQxWVdkbElHbHVjM1JoYm1ObElIZHBkR2dnWVd4c0lHUmxabWx1WldRZ2JXVjBhRzlrY3k1Y2JpQXFMMXh1VW5WdVpTNXdkV0pzYVhOb0lEMGdablZ1WTNScGIyNG9hVzV6ZEdGdVkyVXBJSHRjYmlBZ2RtRnlJR2RsYm1WeVlYUmxaQ0E5SUU5aWFtVmpkQzVyWlhsektHbHVjM1JoYm1ObEtTNXlaV1IxWTJVb0tHUnZZeXdnYm1GdFpTa2dQVDRnZTF4dUlDQWdJSFpoY2lCdFpYUm9iMlFnUFNCcGJuTjBZVzVqWlZ0dVlXMWxYVHRjYmlBZ0lDQnBaaUFvYldWMGFHOWtMbkoxYm1VcElIdGNiaUFnSUNBZ0lHUnZZMXR1WVcxbFhTQTlJRzFsZEdodlpDNXlkVzVsTG1Sdll6dGNiaUFnSUNCOVhHNGdJSDBzSUh0OUtUdGNiaUFnY21WMGRYSnVJR1oxYm1OMGFXOXVLQ2tnZTF4dUlDQWdJSEpsZEhWeWJpQm5aVzVsY21GMFpXUTdYRzRnSUgwN1hHNTlPMXh1WEc1U2RXNWxMazV2WkdVZ1BTQm1kVzVqZEdsdmJpaDBlWEJsTENCaGNtZHpMQ0J6ZEdGamF5a2dlMXh1SUNCMGFHbHpMblI1Y0dVZ1BTQjBlWEJsTzF4dUlDQjBhR2x6TG1GeVozTWdQU0JoY21kek8xeHVJQ0IwYUdsekxuTjBZV05ySUQwZ2MzUmhZMnM3WEc1OU8xeHVYRzVTZFc1bExrVjJZV3gxWVhSbElEMGdablZ1WTNScGIyNG9ZMjl1ZEdWNGRDQTlJSHQ5S1NCN1hHNGdJSFJvYVhNdVgyRnVZV3g1ZW1WeWN5QTlJRnRkTzF4dUlDQjBhR2x6TGw5cGJuUmxjbkJ5WlhSbGNpQTlJRzUxYkd3N1hHNGdJSFJvYVhNdVgyTnZiblJsZUhRZ1BTQmpiMjUwWlhoME8xeHVmVHRjYmx4dUx5b3FYRzRnS2lCQmJtRnNlWHBsY2lCamIzVnNaQ0J5WldObGFYWmxJSFJvWlNCemRHRmpheUJqYUdGdVoyVWdabkp2YlNBblVuVnVaU05sZG1Gc2RXRjBaU2NzWEc0Z0tpQmhibVFnYVhRZ2QyOTFiR1FnWW1VZ1kyRnNiR1ZrSUhkcGRHZ2dkR2hsSUdGeVozVnRaVzUwY3lCaGN5QjBhR1VnWm5WdVkzUnBiMjRnWkdWelkzSnBZbVZ6T2x4dUlDcGNiaUFxSUNBZ0lDQlNkVzVsTG5CeWIzUnZkSGx3WlM1bGRtRnNkV0YwWlNnb1kyOXVkR1Y0ZEN3Z1kyaGhibWRsTENCemRHRmpheWtnUFQ0Z2UxeHVJQ29nSUNBZ0lDQWdJQzh2SUM0dUxseHVJQ29nSUNBZ0lIMHBPMXh1SUNwY2JpQXFJRk52SUhSb1pTQmhibUZzZVhwbGNpQmpiM1ZzWkNCaVpUcGNiaUFxWEc0Z0tpQWdJQ0JtZFc1amRHbHZiaWhqYjI1MFpYaDBMQ0JqYUdGdVoyVXNJSE4wWVdOcktTQjdYRzRnS2lBZ0lDQWdJQzh2SUVSdklITnZiV1VnWTJobFkyc2dZVzVrSUcxaGVXSmxJR05vWVc1blpXUWdkR2hsSUdOdmJuUmxlSFF1WEc0Z0tpQWdJQ0FnSUM4dklGUm9aU0J1WlhoMElHRnVZV3g1ZW1WeUlIUnZJSFJvWlNCcGJuUmxjbkJ5WlhSbGNpQjNiM1ZzWkNCaFkyTmxjSFFnZEdobElHRnNkR1Z5Ym1GMFpXUmNiaUFxSUNBZ0lDQWdMeThnWTI5dWRHVjRkQ0JoY3lCMGFHVWdZWEpuZFcxbGJuUWdKMk52Ym5SbGVIUW5MbHh1SUNvZ0lDQWdJQ0JqYjI1MFpYaDBMbk52YldWR2JHRm5JRDBnZEhKMVpUdGNiaUFxSUNBZ0lDQWdMeThnVjJobGJpQjBhR1Z5WlNCcGN5QjNjbTl1Wnl3Z2RHaHliM2NnYVhRdVhHNGdLaUFnSUNBZ0lIUm9jbTkzSUc1bGR5QkZjbkp2Y2lnblUyOXRaU0JoYm1Gc2VYcHBibWNnWlhKeWIzSW5LVHRjYmlBcUlDQWdJSDA3WEc0Z0tseHVJQ29nVG05MFpTQjBhR0YwSUhSb1pTQmhibUZzZVhwbGNpQW9KMkVuS1NCM2IzVnNaQ0JpWlNCcGJuWnZhMlZrSUhkcGRHZ2daVzF3ZEhrZ0ozUm9hWE1uSUc5aWFtVmpkQ3hjYmlBcUlITnZJSFJvWlNCbWRXNWpkR2x2YmlCeVpXeHBaWE1nYjI0Z0ozUm9hWE1uSUhOb2IzVnNaQ0JpYVc1a0lHbDBjMlZzWmlCbWFYSnpkQzVjYmlBcUwxeHVVblZ1WlM1RmRtRnNkV0YwWlM1d2NtOTBiM1I1Y0dVdVlXNWhiSGw2WlhJZ1BTQm1kVzVqZEdsdmJpaGhLU0I3WEc0Z0lIUm9hWE11WDJGdVlXeDVlbVZ5Y3k1d2RYTm9LR0VwTzF4dUlDQnlaWFIxY200Z2RHaHBjenRjYm4wN1hHNWNiaThxS2x4dUlDb2dUMjVsSUVWMllXeDFZWFJsSUdOaGJpQnZibXg1SUdoaGRtVWdiMjVsSUdsdWRHVnljSEpsZEdWeUxDQmhibVFnYVhRZ2QyOTFiR1FnY21WMGRYSnVYRzRnS2lCMGFHVWdablZ1WTNScGIyNGdZMjkxYkdRZ1kyOXVjM1Z0WlNCbGRtVnllU0J6ZEdGamF5QmphR0Z1WjJVZ1puSnZiU0FuVW5WdVpTTmxkbUZzZFdGMFpTY3VYRzRnS2x4dUlDb2dWR2hsSUdOdlpHVWdhWE1nWVNCc2FYUjBiR1VnWTI5dGNHeHBZMkYwWldRNklIZGxJR2hoZG1VZ2RIZHZJR3RwYm1SeklHOW1JQ2R5WldSMVkybHVaeWM2WEc0Z0tpQnZibVVnYVhNZ2RHOGdjbVZrZFdObElHRnNiQ0JoYm1Gc2VYcGxjbk1nZDJsMGFDQjBhR1VnYzJsdVoyeGxJR2x1WTI5dGFXNW5JR05vWVc1blpTeGNiaUFxSUdGdWIzUm9aWElnYVhNZ2RHOGdjbVZrZFdObElHRnNiQ0JwYm1OdmJXbHVaeUJqYUdGdVoyVnpJSGRwZEdnZ2RHaHBjeUJoYm1Gc2VYcGxjbk1nS3lCcGJuUmxjbkJ5WlhSbGNpNWNiaUFxWEc0Z0tpQlVhR1VnWVc1aGJIbDZaWElnWVc1a0lHbHVkR1Z5Y0hKbGRHVnlJSE5vYjNWc1pDQmphR0Z1WjJVZ2RHaGxJR052Ym5SbGVIUXNJSFJ2SUcxbGJXOXlhWHBsSUhSb1pWeHVJQ29nYzNSaGRHVnpJRzltSUhSb1pTQmxkbUZzZFdGMGFXOXVMaUJVYUdVZ1pHbG1abVZ5Wlc1alpTQnBjeUJwYm5SbGNuQnlaWFJsY2lCemFHOTFiR1FnY21WMGRYSnVJRzl1WlZ4dUlDb2dibVYzSUhOMFlXTnJJR2xtSUdsMElHNWxaV1J6SUhSdklIVndaR0YwWlNCMGFHVWdaWGhwYzNScGJtY2diMjVsTGlCVWFHVWdjM1JoWTJzZ2FYUWdjbVYwZFhKdWN5QjNiM1ZzWkZ4dUlDb2djbVZ3YkdGalpTQjBhR1VnWlhocGMzUnBibWNnYjI1bExDQnpieUJoYm5sMGFHbHVaeUJ6ZEdsc2JDQnBiaUIwYUdVZ2IyeGtJRzl1WlNCM2IzVnNaQ0JpWlNCM2FYQmxaRnh1SUNvZ2IzVjBMaUJVYUdVZ2FXNTBaWEp3Y21WMFpYSWdZMjkxYkdRZ2NtVjBkWEp1SUc1dmRHaHBibWNnS0NkMWJtUmxabWx1WldRbktTQjBieUJyWldWd0lIUm9aU0J6ZEdGamExeHVJQ29nZFc1MGIzVmphR1ZrTGx4dUlDcGNiaUFxSUZSb1pTQmhibUZzZVhwbGNuTWdZVzVrSUdsdWRHVnljSEpsZEdWeUlHTnZkV3hrSUdOb1lXNW5aU0IwYUdVZ0oyTnZiblJsZUhRbklIQmhjM01nZEc4Z2RHaGxiUzVjYmlBcUlFRnVaQ0J6YVc1alpTQjNaU0J0WVhrZ2RYQmtZWFJsSUhSb1pTQnpkR0ZqYXlCaGN5QmhZbTkyWlN3Z2RHaGxJR052Ym5SbGVIUWdjMmh2ZFd4a0lHMWxiVzl5YVhwbFhHNGdLaUIwYUc5elpTQnBibVp2Y20xaGRHbHZiaUJ1YjNRZ2RHOGdZbVVnYjNabGNuZHlhWFIwWlc0Z2QyaHBiR1VnZEdobElITjBZV05ySUdkbGRDQjNhWEJsWkNCdmRYUXVYRzRnS2x4dUlDb2dRVzVrSUdsbUlIUm9aU0JwYm5SbGNuQnlaWFJwYm1jZ2JtOWtaU0JwY3lCMGFHVWdaWGhwZENCdWIyUmxJRzltSUhSb1pTQnpaWE56YVc5dUxDQnBiblJsY25CeVpYUmxjbHh1SUNvZ2MyaHZkV3hrSUhKbGRIVnliaUJoSUc1bGR5QnpkR0ZqYXlCamIyNTBZV2x1Y3lCdmJteDVJRzl1WlNCbWFXNWhiQ0J5WlhOMWJIUWdibTlrWlM0Z1NXWWdkR2hsY21WY2JpQXFJR2x6SUc1dklITjFZMmdnYm05a1pTd2dkR2hsSUhKbGMzVnNkQ0J2WmlCMGFHbHpJSE5sYzNOcGIyNGdhWE1nSjNWdVpHVm1hVzVsWkNjdVhHNGdLaTljYmxKMWJtVXVSWFpoYkhWaGRHVXVjSEp2ZEc5MGVYQmxMbWx1ZEdWeWNISmxkR1Z5SUQwZ1puVnVZM1JwYjI0b2FXNXdkQ2tnZTF4dUlDQXZMeUJVYUdVZ1kzVnpkRzl0YVhwbFpDQnNZVzVuZFdGblpTQnphRzkxYkdRZ1oybDJaU0IwYUdVZ1pHVm1ZWFZzZENCamIyNTBaWGgwTGx4dUlDQnlaWFIxY200Z0tHTnZiblJsZUhRc0lHTm9ZVzVuWlN3Z2MzUmhZMnNwSUQwK0lIdGNiaUFnSUNCMGNua2dlMXh1SUNBZ0lDQWdMeThnUVc1aGJIbDZaWEp6SUdOdmRXeGtJR05vWVc1blpTQjBhR1VnWTI5dWRHVjRkQzVjYmlBZ0lDQWdJSFJvYVhNdVgyRnVZV3g1ZW1WeWN5NXlaV1IxWTJVb0tHTjBlQ3dnWVc1aGJIbDZaWElwSUQwK0lIdGNiaUFnSUNBZ0lDQWdZVzVoYkhsNlpYSXVZMkZzYkNoN2ZTd2dZMjl1ZEdWNGRDd2dZMmhoYm1kbExDQnpkR0ZqYXlrN1hHNGdJQ0FnSUNCOUxDQmpiMjUwWlhoMEtUdGNiaUFnSUNCOUlHTmhkR05vS0dVcElIdGNiaUFnSUNBZ0lIUm9hWE11WDJoaGJtUnNaVVZ5Y205eUtHVXNJR052Ym5SbGVIUXNJR05vWVc1blpTd2djM1JoWTJzcE8xeHVJQ0FnSUgxY2JpQWdJQ0F2THlCQlpuUmxjaUJoYm1Gc2VYcGxJR2wwTENCcGJuUmxjbkJ5WlhRZ2RHaGxJRzV2WkdVZ1lXNWtJSEpsZEhWeWJpQjBhR1VnYm1WM0lITjBZV05ySUNocFppQmhibmtwTGx4dUlDQWdJSFpoY2lCdVpYZFRkR0ZqYXlBOUlHbHVjSFFvWTI5dWRHVjRkQ3dnWTJoaGJtZGxMQ0J6ZEdGamF5azdYRzRnSUNBZ2NtVjBkWEp1SUc1bGQxTjBZV05yTzF4dUlDQjlPMXh1ZlR0Y2JseHVVblZ1WlM1RmRtRnNkV0YwWlM1d2NtOTBiM1I1Y0dVdVgyaGhibVJzWlVWeWNtOXlJRDFjYm1aMWJtTjBhVzl1S0dWeWNpd2dZMjl1ZEdWNGRDd2dZMmhoYm1kbExDQnpkR0ZqYXlrZ2UxeHVJQ0F2THlCVVQwUlBPaUJsZUhCaGJtUWdhWFFnZEc4Z2NISnZkbWxrWlNCdGIzSmxJSE52Y0docGMzUnBZeUJrWldKMVoyZHBibWNnYldWemMyRm5aUzVjYmlBZ2RHaHliM2NnYm1WM0lFVnljbTl5S0dCWGFHVnVJR05vWVc1blpTQWtlMk5vWVc1blpTNTBlWEJsZlNCamIyMWxjeUJsY25KdmNpQW5KSHRsY25KOUp5Qm9ZWEJ3Wlc1bFpHQXBPMXh1ZlR0Y2JseHVYRzVjYmk4cUtpQlhSVUpRUVVOTElFWlBUMVJGVWlBcUtseHVJQ29xSUM0dmMzSmpMM0oxYm1VdWFuTmNiaUFxS2k4aVhTd2ljMjkxY21ObFVtOXZkQ0k2SWlKOVxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi4vZGlzdC9ydW5lLmpzXG4gKiogbW9kdWxlIGlkID0gNTlcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IEVmZmVjdCBmcm9tICdkZW1vL2VmZmVjdC5qcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIFJ1bnRpbWUoKSB7fVxuXG4vKipcbiAqIFdoZW4gdGhlIHN0YWNrIG9mIERTTCBjaGFuZ2VzLCBldmFsdWF0ZSB0aGUgTGFuZ3VhZ2UuTm9kZS5cbiAqL1xuUnVudGltZS5wcm90b3R5cGUub25jaGFuZ2UgPSBmdW5jdGlvbihpbnN0YW5jZSwgY2hhbmdlLCBzdGFjaykge1xuICAvLyBTaW5jZSB3ZSBkb24ndCBuZWVkIHRvIGtlZXAgdGhpbmdzIGluIHN0YWNrIHVudGlsIHdlIGhhdmVcbiAgLy8gcmVhbCBhbmFseXplcnMsIHRoZSAnb25jaGFuZ2UnIGhhbmRsZXIgd291bGQgcmV0dXJuIGVtcHR5IHN0YWNrXG4gIC8vIHRvIGxldCB0aGUgbGFuZ3VhZ2UgcnVudGltZSBjbGVhciB0aGUgc3RhY2sgZXZlcnkgaW5zdHJ1Y3Rpb24uXG4gIHZhciByZXN1bHQgPSB0aGlzW2NoYW5nZS50eXBlXS5hcHBseSh0aGlzLCBjaGFuZ2UuYXJncyk7XG4gIC8vIHJldHVybiBlbXB0eSAnaGFuZGxlZCcgc3RhY2sgdG8gbGV0IFJ1bmUga2VlcCBubyBzdGF0ZXMgb2ZcbiAgLy8gZXZlcnkgaW5zdHJ1Y3Rpb24sIGV4Y2VwdCB0aGUgcmVzdWx0LlxuICByZXR1cm4gWyByZXN1bHQgXTtcbiAgLy8gVE9ETzogaG93IHRvIGNvbmNhdCBgZWZmZWN0YDsgaG93IHRvIHBhc3Mgc2lnbmFsICYgZGF0YSwgbm90IG9ubHkgZGF0YTtcbn07XG5cblJ1bnRpbWUuRGVmZXJyZWQgPSBmdW5jdGlvbigpIHtcbiAgdmFyIHByb21pc2UgPSBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgdGhpcy5yZXNvbHZlID0gcmVzb2x2ZTtcbiAgICB0aGlzLnJlamVjdCA9IHJlamVjdDtcbiAgfSk7XG4gIHRoaXMucHJvbWlzZSA9IHByb21pc2U7XG4gIHJldHVybiB0aGlzO1xufTtcblxuUnVudGltZS5Db250ZXh0ID0gZnVuY3Rpb24oZW52aXJvbm1lbnQpIHtcbiAgdGhpcy5kZWZlcnJlZCA9IG5ldyBSdW50aW1lLkRlZmVycmVkKCk7XG4gIGZvciAodmFyIG5hbWUgaW4gZW52aXJvbm1lbnQpIHtcbiAgICB0aGlzW25hbWVdID0gZW52aXJvbm1lbnRbbmFtZV07XG4gIH1cbn07XG5cbi8qKlxuICogUmV0dXJuaW5nIHdpbGwgbW92ZSB0aGUgbWFpbiBwcm9jZXNzIHRvIHRoZSBuZXh0IHN0ZXAuXG4gKi9cblJ1bnRpbWUuQ29udGV4dC5wcm90b3R5cGUucmV0dXJucyA9IGZ1bmN0aW9uKHJldHZhcikge1xuICBpZiAoYXJndW1lbnRzLmxlbmd0aCA+IDEpIHtcbiAgICByZXR2YXIgPSBBcnJheS5mcm9tKGFyZ3VtZW50cyk7XG4gIH1cbiAgaWYgKCF0aGlzLmludGVycnVwdGVkKSB7XG4gICAgdGhpcy5yZXR2YXIgPSByZXR2YXI7XG4gICAgdGhpcy5kZWZlcnJlZC5yZXNvbHZlKHJldHZhcik7XG4gIH0gZWxzZSB7XG4gICAgLy8gSWYgaXQncyBhbHJlYWR5IGludGVycnVwdGVkLCBkbyBub3RoaW5nLlxuICAgIC8vIEluIHRoZW9yeSB0aGlzIHNob3VsZCBudWxsaWZ5IGFsbCBlZmZlY3RzLCBzaW5jZSB3ZSBzaG91bGRcbiAgICAvLyBuZXZlciBkbyBlZmZlY3QgZHVyaW5nIHN0ZXBzLiBTbyBpZiBhIHByb2Nlc3Mgd2FzIGludGVycnVwdGVkXG4gICAgLy8gYmVmb3JlIGl0IGVuZHMgYWxsIGRhdGUgbWFuaXB1bGF0aW9uIHN0ZXBzLCBpdCBzaG91bGQgZG8gbm90aGluZy5cbiAgICB0aGlzLmRlZmVycmVkLnJlamVjdCgpO1xuICB9XG59O1xuXG5SdW50aW1lLkNvbnRleHQucHJvdG90eXBlLnJhaXNlID0gZnVuY3Rpb24oZXJyKSB7XG4gIC8vIFRoZSBlcnJvciB3aWxsIGJlIGNhcHR1cmVkIGJ5IG1haW4gcXVldWUncyBgb25Qcm9jZXNzRXJyb3JgLlxuICB0aGlzLmRlZmVycmVkLnJlamVjdChlcnIpO1xufTtcblxuUnVudGltZS5Db250ZXh0LnByb3RvdHlwZS5pbnRlcnJ1cHQgPSBmdW5jdGlvbihyZWFzb24gPSAnJykge1xuICB0aGlzLmludGVycnVwdGVkID0gdHJ1ZTtcbiAgLy8gVGhlIGludGVycnVwdCB3aWxsIGJlIGNhcHR1cmVkIGJ5IG1haW4gcXVldWUncyBgb25Qcm9jZXNzRXJyb3JgLlxuICB2YXIgaW50ZXJydXB0ID0gbmV3IFJ1bnRpbWUuSW50ZXJydXB0KHJlYXNvbik7XG4gIHRoaXMuZGVmZXJyZWQucmVqZWN0KGludGVycnVwdCk7XG59O1xuXG5SdW50aW1lLkludGVycnVwdCA9IGZ1bmN0aW9uKCkge307XG5cblJ1bnRpbWUucHJvdG90eXBlLm9uUHJvY2Vzc0Vycm9yID0gZnVuY3Rpb24oZXJyKSB7XG4gIGlmICghKGVyciBpbnN0YW5jZW9mIFJ1bnRpbWUuSW50ZXJydXB0KSkge1xuICAgIC8vIFByaW50IGl0IHRvIGRlYnVnLlxuICAgIGNvbnNvbGUuZXJyb3IoZXJyKTtcbiAgICAvLyBUaGVuIHRvIGludGVycnVwdCB0aGUgcHJvY2Vzcy5cbiAgICB0aHJvdyBlcnI7XG4gIH0gZWxzZSB7XG4gICAgLy8gT25seSB0byBpbnRlcnJ1cHQgdGhlIHByb2Nlc3MuXG4gIH1cbn07XG5cblJ1bnRpbWUucHJvdG90eXBlLnN0YXJ0ID0gZnVuY3Rpb24oKSB7XG4gIHZhciBkZWZlcnJlZCA9IG5ldyBSdW50aW1lLkRlZmVycmVkKCk7XG4gIHRoaXMucXVldWUgPSBkZWZlcnJlZC5wcm9taXNlO1xuICAvLyBXZSB3aWxsIHJlc29sdmUgaXQgYXQgYGRvbmVgIGFueXdheSwgc29cbiAgLy8gYHJlamVjdGAgZG9lc24ndCBtYXR0ZXIuXG4gIHRoaXMucmVzb2x2ZSA9IGRlZmVycmVkLnJlc29sdmU7XG4gIHRoaXMucmVqZWN0ID0gZGVmZXJyZWQucmVqZWN0O1xuICB0aGlzLnJlc3VsdCA9IG51bGw7IC8vIHRoZSByZXN1bHQgZnJvbSBlYWNoIHN0ZXAuXG4gIHRoaXMuZW52aXJvbm1lbnQgPSB7fTtcbn07XG5cblJ1bnRpbWUucHJvdG90eXBlLmFzID0gZnVuY3Rpb24obmFtZSkge1xuICB0aGlzLnF1ZXVlID0gdGhpcy5xdWV1ZS50aGVuKCgpID0+IHtcbiAgICBpZiAoJ3VuZGVmaW5lZCcgIT09IHR5cGVvZiB0aGlzLmVudmlyb25tZW50W25hbWVdKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1Njb3BlZCB2YXJpYWJsZSBcXCcnICsgbmFtZSArICdcXCcgZGVmaW5lZCB0d2ljZScpO1xuICAgIH1cbiAgICBpZiAoJ3VuZGVmaW5lZCcgIT09IHR5cGVvZiBSdW50aW1lLkNvbnRleHQucHJvdG90eXBlW25hbWVdKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1JlZnVzZSB0byBuYW1lIHZhcmlhYmxlIGFzIGNvbnRleHQgcmV2ZXJzZWQgd29yZDogJyArXG4gICAgICAgICdcXCcnICsgbmFtZSArICdcXCcnKTtcbiAgICB9XG4gICAgdGhpcy5lbnZpcm9ubWVudFtuYW1lXSA9IHRoaXMucmVzdWx0O1xuICAgIHJldHVybiB0aGlzLnJlc3VsdDtcbiAgfSk7XG59O1xuXG5SdW50aW1lLnByb3RvdHlwZS5kb25lID0gZnVuY3Rpb24oKSB7XG4gIHRoaXMucXVldWUgPSB0aGlzLnF1ZXVlLmNhdGNoKHRoaXMub25Qcm9jZXNzRXJyb3IuYmluZCh0aGlzKSk7XG4gIHRoaXMucmVzb2x2ZSgpOyAvLyBTbyB0aGUgcXVldWUgc3RhcnQgdG8gZXhlY3V0ZS5cbn07XG5cblJ1bnRpbWUucHJvdG90eXBlLl9jcmVhdGVDb250ZXh0ID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiBuZXcgUnVudGltZS5Db250ZXh0KHRoaXMuZW52aXJvbm1lbnQpO1xufTtcblxuUnVudGltZS5wcm90b3R5cGUubmV4dCA9IGZ1bmN0aW9uKHN0ZXApIHtcbiAgdGhpcy5xdWV1ZSA9IHRoaXMucXVldWUudGhlbigoKSA9PiB7XG4gICAgdmFyIGNvbnRleHQgPSB0aGlzLl9jcmVhdGVDb250ZXh0KCk7XG4gICAgc3RlcChjb250ZXh0LCB0aGlzLnJlc3VsdCk7XG4gICAgcmV0dXJuIGNvbnRleHQuZGVmZXJyZWQucHJvbWlzZTtcbiAgfSkudGhlbigocmVzdWx0KSA9PiB7XG4gICAgaWYgKHJlc3VsdC5uZXh0KSB7XG4gICAgICAvLyBJZiBpdCdzIGFsc28gYSBQbGF5bGFuZyBzdGF0ZW1lbnRzLCBjb25jYXQgaXQuXG4gICAgICByZXR1cm4gcmVzdWx0LnF1ZXVlO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBObyBtYXR0ZXIgaXQncyB2YWx1ZSBmcm9tIGFuIG9yZGluYXJ5IGZ1bmN0aW9uIG9yXG4gICAgICAvLyBhIFByb21pc2UsIHJldHVybmluZyBpdCBpcyBsZWdpdCBmb3IgYSBQcm9taXNlLlxuICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG4gIH0pXG4gIC50aGVuKChyZXN1bHQpID0+IHtcbiAgICAvLyBHZXQgdGhlIHJlc3VsdCBmcm9tIG5ld1Byb21pc2UgYW5kIHNldCBpdC5cbiAgICB0aGlzLnJlc3VsdCA9IHJlc3VsdDtcbiAgfSk7XG59O1xuXG5SdW50aW1lLnByb3RvdHlwZS5tYXRjaCA9IGZ1bmN0aW9uKCkge1xuICAvLyBDb2xsZWN0IGFsbCAnY2FzZScgUHJvbWlzZXMgaGVyZS5cbiAgdGhpcy5xdWV1ZSA9IHRoaXMucXVldWUudGhlbigoKSA9PiB7XG4gICAgdGhpcy5tYXRjaGluZyA9IFtdO1xuICAgIHRoaXMubWF0Y2hpbmcubWF0Y2hlZCA9IGZhbHNlO1xuICB9KTtcbn07XG5cbi8vIE1hdGNoaW5nIGVuZDogZXhlY3V0ZSBhbGwgbWF0Y2hpbmcgY2FzZXMuXG5SdW50aW1lLnByb3RvdHlwZS5lbmQgPSBmdW5jdGlvbigpIHtcbiAgdGhpcy5xdWV1ZSA9IHRoaXMucXVldWUudGhlbigoKSA9PiB7XG4gICAgdGhpcy5tYXRjaGluZyA9IG51bGw7XG4gIH0pO1xufTtcblxuLyoqXG4gKiBgcHJlZGAgbXVzdCBiZSBhIHN5bmMgZnVuY3Rpb24gb25seSByZXR1cm4gdHJ1ZSBvciBmYWxzZS5cbiAqIElmIG11bHRpcGxlIGBjYXNlYCBjYW4gbWF0Y2ggdGhlIHJlc3VsdCwgb25seSB0aGUgZmlyc3QgbWF0Y2hpbmcgb25lXG4gKiB3aWxsIGJlIGV4ZWN1dGVkIGFuZCBsZWF2ZSB0aGUgcmVzdWx0LlxuICovXG5SdW50aW1lLnByb3RvdHlwZS5jYXNlID0gZnVuY3Rpb24ocHJlZCkge1xuICB0aGlzLnF1ZXVlID0gdGhpcy5xdWV1ZS50aGVuKCgpID0+IHtcbiAgICB2YXIgaWQgPSB0aGlzLm1hdGNoaW5nLmxlbmd0aDtcbiAgICAvLyBJbiBhIGBtYXRjaGAsIHdlIGRvbid0IHVwZGF0ZSB0aGUgcmVzdWx0LFxuICAgIC8vIHNvIGV2ZXJ5IGBjYXNlYCBjYW4ganVkZ2UgaWYgaXQncyB0cnVlLlxuICAgIHZhciBwcmVkcmVzdWx0ID0gcHJlZCh0aGlzLnJlc3VsdCk7XG4gICAgdGhpcy5tYXRjaGluZ1tpZF0gPSBwcmVkcmVzdWx0O1xuICAgIHJldHVybiBpZDtcbiAgfSk7XG59O1xuXG5SdW50aW1lLnByb3RvdHlwZS50byA9IGZ1bmN0aW9uKHN0ZXApIHtcbiAgLy8gSXQncyBhbHdheXMgY2FzZS4udG8sIHNvIHdlIG9ubHkgbmVlZCB0byBjb25jYXRcbiAgLy8gJ3RvJyBwcm9taXNlIGFmdGVyIHRoZSAnY2FzZScgcHJvbWlzZS5cbiAgdGhpcy5xdWV1ZSA9IHRoaXMucXVldWUudGhlbigoaWQpID0+IHtcbiAgICAvLyBPbmx5IGFwcGVuZCB0aGUgc3RlcCBpZiB0aGUgcHJldmlvdXMgb25lIGlzIHRydWUuXG4gICAgaWYgKCF0aGlzLm1hdGNoaW5nLm1hdGNoZWQgJiYgdGhpcy5tYXRjaGluZ1tpZF0pIHtcbiAgICAgIHRoaXMubWF0Y2hpbmcubWF0Y2hlZCA9IHRydWU7XG4gICAgICB2YXIgY29udGV4dCA9IHRoaXMuX2NyZWF0ZUNvbnRleHQoKTtcbiAgICAgIHN0ZXAoY29udGV4dCwgdGhpcy5yZXN1bHQpO1xuICAgICAgcmV0dXJuIGNvbnRleHQuZGVmZXJyZWQucHJvbWlzZTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHRoaXMucmVzdWx0O1xuICAgIH1cbiAgfSkudGhlbigocmVzdWx0KSA9PiB7XG4gICAgaWYgKHJlc3VsdC5uZXh0KSB7XG4gICAgICByZXR1cm4gcmVzdWx0LnF1ZXVlO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cbiAgfSlcbiAgLnRoZW4oKHJlc3VsdCkgPT4ge1xuICAgIGlmICh0aGlzLm1hdGNoaW5nLm1hdGNoZWQpIHtcbiAgICAgIHRoaXMucmVzdWx0ID0gcmVzdWx0O1xuICAgIH1cbiAgICAvLyBPciwgZG8gbm90IHVwZGF0ZSB0aGUgcmVzdWx0IGl0IGdvdC5cbiAgfSk7XG59O1xuXG4vKipcbiAqIFJlbWVtYmVyIHdlIHdpbGwgc3dhcCBgbG9vcGAgYW5kIGB1bnRpbGAgYXQgc3ludGF4IGxldmVsLCBzb1xuICogd2UgY2FuIGdldCB0aGUgcHJlZCBiZWZvcmUgd2UgcnVuIHRoZSBsb29wLlxuICpcbiAqIDEuIEZpcnN0IGFwcGx5IHRoZSBgcHJlZGAgb24gdGhlIHByZXZpb3VzIHJlc3VsdC5cbiAqIDIuIElmIHRydWUsIGNvbmNhdCB0aGUgaXRlcmF0aW9uIGFuZCB0aGUgbmV3IHByZWRpY3Rpbmcgc3RlcCBhZnRlclxuICogICAgdGhlIGxvb3BpbmcgcHJvbWlzZS4gQW5kIHRoZSBwcmVkaWNhdGlvbiB3aWxsIGNvbmNhdCBuZXcgaXRlcmF0aW9uXG4gKiAgICBpbnRvIHRoZSB0aGUgcHJvbWlzZSBpZiBpdCdzIHRydWUuXG4gKlxuICogTm90ZTogb25seSB3aGVuIHRoZSBwcmVkaWNhdGlvbiBnaXZlcyBmYWxzZSwgdGhlIGxvb3BpbmcgcHJvbWlzZSBmb3JcbiAqIHRoZSBtYWluIHF1ZXVlIHdpbGwgcmVzb2x2ZSwgc28gaXQgY2FuIHJ1biB0aGUgbG9vcGluZyB3aGlsZSBibG9ja2luZ1xuICogdGhlIG1haW4gcXVldWUuXG4gKi9cblJ1bnRpbWUucHJvdG90eXBlLmxvb3AgPSBmdW5jdGlvbihzdGVwKSB7XG4gIHRoaXMucXVldWUgPSB0aGlzLnF1ZXVlLnRoZW4oKCkgPT4ge1xuICAgIHZhciBsb29wcXVldWUgPSB0aGlzLmxvb3BpbmcubG9vcGluZ3Byb21pc2U7XG4gICAgdmFyIHByZWQgPSB0aGlzLmxvb3BpbmcucHJlZDtcblxuICAgIHZhciBhcHBlbmQgPSAoKSA9PiB7XG4gICAgICB0aGlzLmxvb3BpbmcubG9vcGluZ3Byb21pc2UucHJvbWlzZSA9XG4gICAgICAgIGxvb3BxdWV1ZS50aGVuKCgpID0+IHtcbiAgICAgICAgICB2YXIgY29udGV4dCA9IHRoaXMuX2NyZWF0ZUNvbnRleHQoKTtcbiAgICAgICAgICBzdGVwKGNvbnRleHQsIHRoaXMucmVzdWx0KTtcbiAgICAgICAgICByZXR1cm4gY29udGV4dC5kZWZlcnJlZC5wcm9taXNlO1xuICAgICAgICB9KS50aGVuKChyZXN1bHQpID0+IHtcbiAgICAgICAgICBpZiAocmVzdWx0Lm5leHQpIHtcbiAgICAgICAgICAgIHJldHVybiByZXN1bHQucXVldWU7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgICAudGhlbigocmVzdWx0KSA9PiB7XG4gICAgICAgICAgdGhpcy5yZXN1bHQgPSByZXN1bHQ7XG4gICAgICAgICAgaWYgKCFwcmVkKHRoaXMucmVzdWx0KSkge1xuICAgICAgICAgICAgYXBwZW5kKCk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMubG9vcGluZy5xdWV1ZWJsb2NrZXIucmVzb2x2ZSgpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICAvLyBGaXJzdCBpdGVyYXRpb24uXG4gICAgaWYgKCFwcmVkKHRoaXMucmVzdWx0KSkge1xuICAgICAgYXBwZW5kKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMubG9vcGluZy5xdWV1ZWJsb2NrZXIucmVzb2x2ZSgpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5sb29waW5nLnF1ZXVlYmxvY2tlci5wcm9taXNlO1xuICB9KTtcbn07XG5cbi8qKlxuICogUmVtZW1iZXIgd2Ugd2lsbCBzd2FwIGBsb29wYCBhbmQgYHVudGlsYCBhdCBzeW50YXggbGV2ZWwsIHNvXG4gKiB3ZSBjYW4gZ2V0IHRoZSBwcmVkIGJlZm9yZSB3ZSBydW4gdGhlIGxvb3AuXG4gKi9cblJ1bnRpbWUucHJvdG90eXBlLnVudGlsID0gZnVuY3Rpb24ocHJlZCkge1xuICB0aGlzLnF1ZXVlID0gdGhpcy5xdWV1ZS50aGVuKCgpID0+IHtcbiAgICB0aGlzLmxvb3BpbmcgPSB7XG4gICAgICAncHJlZCc6IHByZWQsXG4gICAgICAnbG9vcGluZ3Byb21pc2UnOiBQcm9taXNlLnJlc29sdmUoKSxcbiAgICAgICdxdWV1ZWJsb2NrZXInOiBuZXcgUnVudGltZS5EZWZlcnJlZCgpXG4gICAgfTtcbiAgICAvLyBBZnRlciB0aGUgbG9vcGluZywgY2xlYXIgaXQuXG4gICAgdGhpcy5sb29waW5nLnF1ZXVlYmxvY2tlci5wcm9taXNlID0gXG4gICAgICB0aGlzLmxvb3BpbmcucXVldWVibG9ja2VyLnByb21pc2UudGhlbigoKSA9PiB7XG4gICAgICAgIHRoaXMubG9vcGluZyA9IG51bGw7XG4gICAgICB9KTtcbiAgfSk7XG59O1xuXG5SdW50aW1lLnByb3RvdHlwZS5hbnkgPSBmdW5jdGlvbigpIHtcbiAgdmFyIHVwZGF0ZVJlc3VsdCA9IChyZXN1bHQpID0+IHtcbiAgICB0aGlzLnJlc3VsdCA9IHJlc3VsdDtcbiAgfTtcbiAgdmFyIGdlbmVyYXRlUHJvbWlzZSA9IChzdGVwKSA9PiB7XG4gICAgdmFyIG5ld1Byb21pc2UgPSBzdGVwKHRoaXMucmVzdWx0KTtcbiAgICBpZiAobmV3UHJvbWlzZS5uZXh0KSB7XG4gICAgICByZXR1cm4gbmV3UHJvbWlzZS5xdWV1ZTtcbiAgICB9IGVsc2UgaWYgKG5ld1Byb21pc2UudGhlbikge1xuICAgICAgcmV0dXJuIG5ld1Byb21pc2U7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIE9yZGluYXJ5IGZ1bmN0aW9uIHdpbGwgcmV0dXJuIHRoZSByZXN1bHQuXG4gICAgICB2YXIgbmV3UmVzdWx0ID0gbmV3UHJvbWlzZTtcbiAgICAgIHVwZGF0ZVJlc3VsdChuZXdSZXN1bHQpO1xuICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShuZXdSZXN1bHQpO1xuICAgIH1cbiAgfTtcbiAgdmFyIGNhbmRpZGF0ZXMgPSBBcnJheS5mcm9tKGFyZ3VtZW50cyk7XG4gIHRoaXMucXVldWUgPSB0aGlzLnF1ZXVlLnRoZW4oKCkgPT4ge1xuICAgIHJldHVybiBQcm9taXNlLnJhY2UoY2FuZGlkYXRlcy5tYXAoKHN0ZXApID0+IHtcbiAgICAgIHJldHVybiBnZW5lcmF0ZVByb21pc2Uoc3RlcCk7XG4gICAgfSkpLnRoZW4odXBkYXRlUmVzdWx0KTtcbiAgfSk7XG59O1xuXG5SdW50aW1lLnByb3RvdHlwZS5hbnkgPSBmdW5jdGlvbigpIHtcbiAgdmFyIGFueSA9IHRoaXMuX3JhY2VPckFsbCgncmFjZScpO1xuICB2YXIgY2FuZGlkYXRlcyA9IEFycmF5LmZyb20oYXJndW1lbnRzKTtcbiAgYW55LmNhbGwodGhpcywgY2FuZGlkYXRlcyk7XG59O1xuXG5SdW50aW1lLnByb3RvdHlwZS5hbGwgPSBmdW5jdGlvbigpIHtcbiAgdmFyIGFsbCA9IHRoaXMuX3JhY2VPckFsbCgnYWxsJyk7XG4gIHZhciBjYW5kaWRhdGVzID0gQXJyYXkuZnJvbShhcmd1bWVudHMpO1xuICBhbGwuY2FsbCh0aGlzLCBjYW5kaWRhdGVzKTtcbn07XG5cblJ1bnRpbWUucHJvdG90eXBlLmVmZmVjdCA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gbmV3IEVmZmVjdCh0aGlzKTtcbn07XG5cblJ1bnRpbWUucHJvdG90eXBlLl9yYWNlT3JBbGwgPSBmdW5jdGlvbihwcm9taXNlTWV0aG9kKSB7XG4gIHZhciBnZW5lcmF0ZWQgPSAoY2FuZGlkYXRlcykgPT4ge1xuICAgIHZhciB1cGRhdGVSZXN1bHQgPSAocmVzdWx0KSA9PiB7XG4gICAgICB0aGlzLnJlc3VsdCA9IHJlc3VsdDtcbiAgICB9O1xuICAgIHZhciBnZW5lcmF0ZVByb21pc2UgPSAoc3RlcCkgPT4ge1xuICAgICAgdmFyIGNvbnRleHQgPSBuZXcgUnVudGltZS5Db250ZXh0KCk7XG4gICAgICBzdGVwKGNvbnRleHQsIHRoaXMucmVzdWx0KTtcbiAgICAgIHJldHVybiBjb250ZXh0LmRlZmVycmVkLnByb21pc2VcbiAgICAgICAgLnRoZW4oKHJlc3VsdCkgPT4ge1xuICAgICAgICAgIGlmIChyZXN1bHQubmV4dCkge1xuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdC5xdWV1ZTtcbiAgICAgICAgICB9IGVsc2UgaWYgKHJlc3VsdC50aGVuKSB7XG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0LnRoZW4odXBkYXRlUmVzdWx0KTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gT3JkaW5hcnkgZnVuY3Rpb24gd2lsbCByZXR1cm4gdGhlIHBsYWluIHJlc3VsdC5cbiAgICAgICAgICAgIC8vIEFuZCB3ZSBuZWVkIHRvIHR1cm4gaXQgYXMgYSBwcm9taXNlLlxuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShyZXN1bHQpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICB0aGlzLnF1ZXVlID0gdGhpcy5xdWV1ZS50aGVuKCgpID0+IHtcbiAgICAgIC8vIENhdGNoIGdlbmVyYXRlUHJvbWlzZS5cbiAgICAgIHRyeSB7XG4gICAgICAgIHZhciBhbGxQcm9taXNlcyA9IGNhbmRpZGF0ZXMubWFwKChzdGVwKSA9PiB7XG4gICAgICAgICAgcmV0dXJuIGdlbmVyYXRlUHJvbWlzZShzdGVwKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGlmICgncmFjZScgPT09IHByb21pc2VNZXRob2QpIHtcbiAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yYWNlKGFsbFByb21pc2VzKS50aGVuKHVwZGF0ZVJlc3VsdCk7XG4gICAgICAgIH0gZWxzZSBpZiAoJ2FsbCcgPT09IHByb21pc2VNZXRob2QpIHtcbiAgICAgICAgICByZXR1cm4gUHJvbWlzZS5hbGwoYWxsUHJvbWlzZXMpLnRoZW4odXBkYXRlUmVzdWx0KTtcbiAgICAgICAgfVxuICAgICAgfSBjYXRjaChlKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoZSk7XG4gICAgICAgIHRocm93IGU7XG4gICAgICB9XG4gICAgfSk7XG4gIH07XG4gIHJldHVybiBnZW5lcmF0ZWQ7XG59O1xuXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3BsYXlsYW5nLnJ1bnRpbWUuanNcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IHsgXCJkZWZhdWx0XCI6IHJlcXVpcmUoXCJjb3JlLWpzL2xpYnJhcnkvZm4vYXJyYXkvZnJvbVwiKSwgX19lc01vZHVsZTogdHJ1ZSB9O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi4vfi9iYWJlbC1ydW50aW1lL2NvcmUtanMvYXJyYXkvZnJvbS5qc1xuICoqIG1vZHVsZSBpZCA9IDYxXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJyZXF1aXJlKCcuLi8uLi9tb2R1bGVzL2VzNi5zdHJpbmcuaXRlcmF0b3InKTtcbnJlcXVpcmUoJy4uLy4uL21vZHVsZXMvZXM2LmFycmF5LmZyb20nKTtcbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi4vLi4vbW9kdWxlcy8kLmNvcmUnKS5BcnJheS5mcm9tO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi4vfi9iYWJlbC1ydW50aW1lL34vY29yZS1qcy9saWJyYXJ5L2ZuL2FycmF5L2Zyb20uanNcbiAqKiBtb2R1bGUgaWQgPSA2MlxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xudmFyIGN0eCAgICAgICAgID0gcmVxdWlyZSgnLi8kLmN0eCcpXG4gICwgJGRlZiAgICAgICAgPSByZXF1aXJlKCcuLyQuZGVmJylcbiAgLCB0b09iamVjdCAgICA9IHJlcXVpcmUoJy4vJC50by1vYmplY3QnKVxuICAsIGNhbGwgICAgICAgID0gcmVxdWlyZSgnLi8kLml0ZXItY2FsbCcpXG4gICwgaXNBcnJheUl0ZXIgPSByZXF1aXJlKCcuLyQuaXMtYXJyYXktaXRlcicpXG4gICwgdG9MZW5ndGggICAgPSByZXF1aXJlKCcuLyQudG8tbGVuZ3RoJylcbiAgLCBnZXRJdGVyRm4gICA9IHJlcXVpcmUoJy4vY29yZS5nZXQtaXRlcmF0b3ItbWV0aG9kJyk7XG4kZGVmKCRkZWYuUyArICRkZWYuRiAqICFyZXF1aXJlKCcuLyQuaXRlci1kZXRlY3QnKShmdW5jdGlvbihpdGVyKXsgQXJyYXkuZnJvbShpdGVyKTsgfSksICdBcnJheScsIHtcbiAgLy8gMjIuMS4yLjEgQXJyYXkuZnJvbShhcnJheUxpa2UsIG1hcGZuID0gdW5kZWZpbmVkLCB0aGlzQXJnID0gdW5kZWZpbmVkKVxuICBmcm9tOiBmdW5jdGlvbiBmcm9tKGFycmF5TGlrZS8qLCBtYXBmbiA9IHVuZGVmaW5lZCwgdGhpc0FyZyA9IHVuZGVmaW5lZCovKXtcbiAgICB2YXIgTyAgICAgICA9IHRvT2JqZWN0KGFycmF5TGlrZSlcbiAgICAgICwgQyAgICAgICA9IHR5cGVvZiB0aGlzID09ICdmdW5jdGlvbicgPyB0aGlzIDogQXJyYXlcbiAgICAgICwgbWFwZm4gICA9IGFyZ3VtZW50c1sxXVxuICAgICAgLCBtYXBwaW5nID0gbWFwZm4gIT09IHVuZGVmaW5lZFxuICAgICAgLCBpbmRleCAgID0gMFxuICAgICAgLCBpdGVyRm4gID0gZ2V0SXRlckZuKE8pXG4gICAgICAsIGxlbmd0aCwgcmVzdWx0LCBzdGVwLCBpdGVyYXRvcjtcbiAgICBpZihtYXBwaW5nKW1hcGZuID0gY3R4KG1hcGZuLCBhcmd1bWVudHNbMl0sIDIpO1xuICAgIC8vIGlmIG9iamVjdCBpc24ndCBpdGVyYWJsZSBvciBpdCdzIGFycmF5IHdpdGggZGVmYXVsdCBpdGVyYXRvciAtIHVzZSBzaW1wbGUgY2FzZVxuICAgIGlmKGl0ZXJGbiAhPSB1bmRlZmluZWQgJiYgIShDID09IEFycmF5ICYmIGlzQXJyYXlJdGVyKGl0ZXJGbikpKXtcbiAgICAgIGZvcihpdGVyYXRvciA9IGl0ZXJGbi5jYWxsKE8pLCByZXN1bHQgPSBuZXcgQzsgIShzdGVwID0gaXRlcmF0b3IubmV4dCgpKS5kb25lOyBpbmRleCsrKXtcbiAgICAgICAgcmVzdWx0W2luZGV4XSA9IG1hcHBpbmcgPyBjYWxsKGl0ZXJhdG9yLCBtYXBmbiwgW3N0ZXAudmFsdWUsIGluZGV4XSwgdHJ1ZSkgOiBzdGVwLnZhbHVlO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBmb3IocmVzdWx0ID0gbmV3IEMobGVuZ3RoID0gdG9MZW5ndGgoTy5sZW5ndGgpKTsgbGVuZ3RoID4gaW5kZXg7IGluZGV4Kyspe1xuICAgICAgICByZXN1bHRbaW5kZXhdID0gbWFwcGluZyA/IG1hcGZuKE9baW5kZXhdLCBpbmRleCkgOiBPW2luZGV4XTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmVzdWx0Lmxlbmd0aCA9IGluZGV4O1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cbn0pO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi4vfi9iYWJlbC1ydW50aW1lL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM2LmFycmF5LmZyb20uanNcbiAqKiBtb2R1bGUgaWQgPSA2M1xuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiLy8gNy4xLjEzIFRvT2JqZWN0KGFyZ3VtZW50KVxudmFyIGRlZmluZWQgPSByZXF1aXJlKCcuLyQuZGVmaW5lZCcpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCl7XG4gIHJldHVybiBPYmplY3QoZGVmaW5lZChpdCkpO1xufTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4uL34vYmFiZWwtcnVudGltZS9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzLyQudG8tb2JqZWN0LmpzXG4gKiogbW9kdWxlIGlkID0gNjRcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IEludGVyZmFjZSBmcm9tICdkZW1vL2VmZmVjdC5pbnRlcmZhY2UuanMnO1xuaW1wb3J0IFJ1bnRpbWUgZnJvbSAnZGVtby9lZmZlY3QucnVudGltZS5qcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIEVmZmVjdChzdGF0ZSkge1xuICB0aGlzLl9ydW50aW1lID0gbmV3IFJ1bnRpbWUoc3RhdGUpO1xuICB0aGlzLl9pbnRlcmZhY2UgPSBuZXcgSW50ZXJmYWNlKHRoaXMuX3J1bnRpbWUpO1xuICByZXR1cm4gdGhpcy5faW50ZXJmYWNlO1xufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9lZmZlY3QuanNcbiAqKi8iLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCBSdW5lIGZyb20gJ2Rpc3QvcnVuZS5qcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIEludGVyZmFjZShydW50aW1lKSB7XG4gIHRoaXMuY29udGV4dCA9IHtcbiAgICBzdGFydGVkOiBmYWxzZSxcbiAgICBzdG9wcGVkOiBmYWxzZSxcbiAgICBsb29waW5nOiBmYWxzZSxcbiAgICBtYXRjaGluZzogZmFsc2VcbiAgfTtcbiAgdGhpcy5zdGFjayA9IFtdO1xuICB0aGlzLl9ydW50aW1lID0gcnVudGltZTtcbiAgdGhpcy5fZXZhbHVhdG9yID0gKG5ldyBSdW5lLkV2YWx1YXRlKCkpXG4gICAgLmFuYWx5emVyKHRoaXMuX2FuYWx5emVPcmRlci5iaW5kKHRoaXMpKVxuICAgIC5pbnRlcnByZXRlcih0aGlzLl9pbnRlcnByZXQuYmluZCh0aGlzKSk7XG59XG5cbkludGVyZmFjZS5wcm90b3R5cGUuc3RhcnQgPSBSdW5lLmRlZmluZSgnc3RhcnQnLCAnYmVnaW4nKTtcbkludGVyZmFjZS5wcm90b3R5cGUuZG9uZSA9IFJ1bmUuZGVmaW5lKCdkb25lJywgJ2V4aXQnKTtcbkludGVyZmFjZS5wcm90b3R5cGUucnVuID0gUnVuZS5kZWZpbmUoJ3J1bicsICdleGl0Jyk7XG5JbnRlcmZhY2UucHJvdG90eXBlLm5leHQgPSBSdW5lLmRlZmluZSgnbmV4dCcsICdwdXNoJyk7XG5JbnRlcmZhY2UucHJvdG90eXBlLm1hdGNoID0gUnVuZS5kZWZpbmUoJ21hdGNoJywgJ2JlZ2luJyk7XG5JbnRlcmZhY2UucHJvdG90eXBlLmVuZCA9IFJ1bmUuZGVmaW5lKCdlbmQnLCAnZW5kJyk7XG5JbnRlcmZhY2UucHJvdG90eXBlLmNhc2UgPSBSdW5lLmRlZmluZSgnY2FzZScsICdwdXNoJyk7XG5JbnRlcmZhY2UucHJvdG90eXBlLnRvID0gUnVuZS5kZWZpbmUoJ3RvJywgJ3B1c2gnKTtcbkludGVyZmFjZS5wcm90b3R5cGUubG9vcCA9IFJ1bmUuZGVmaW5lKCdsb29wJywgJ2JlZ2luJyk7XG5JbnRlcmZhY2UucHJvdG90eXBlLnVudGlsID0gUnVuZS5kZWZpbmUoJ3VudGlsJywgJ2VuZCcpO1xuXG5JbnRlcmZhY2UucHJvdG90eXBlLm9uY2hhbmdlID0gZnVuY3Rpb24oY29udGV4dCwgbm9kZSwgc3RhY2spIHtcbiAgLy8gV2hlbiBpdCdzIGNoYW5nZWQsIGV2YWx1YXRlIGl0IHdpdGggYW5hbHl6ZXJzICYgaW50ZXJwcmV0ZXIuXG4gIHJldHVybiB0aGlzLl9ldmFsdWF0b3IoY29udGV4dCwgbm9kZSwgc3RhY2spO1xufTtcblxuSW50ZXJmYWNlLnByb3RvdHlwZS5faW50ZXJwcmV0ID0gZnVuY3Rpb24oY29udGV4dCwgbm9kZSwgc3RhY2spIHtcbiAgLy8gV2VsbCBpbiB0aGlzIGVEU0wgd2UgZGVsZWdhdGUgdGhlIGludGVycHJldGlvbiB0byB0aGUgcnVudGltZS5cbiAgLy8gV2UgZG9uJ3QgcGFzcyBjb250ZXh0IHRvIHJ1bnRpbWUgc2luY2UgdGhlIHJ1bnRpbWUgd2lsbCBrZWVwXG4gIC8vIHRoZSBlc3NlbnRpYWwgc3RhdGVzIGJ5IGl0cyBvd24uXG4gIHJldHVybiB0aGlzLl9ydW50aW1lLm9uY2hhbmdlLmFwcGx5KHRoaXMuX3J1bnRpbWUsIGFyZ3VtZW50cyk7XG59O1xuXG4vLyBJbiB0aGlzIGVEU0wgd2Ugbm93IG9ubHkgaGF2ZSB0aGlzIGFuYWx5emVyLiBDb3VsZCBhZGQgbW9yZSBhbmQgcmVnaXN0ZXIgaXRcbi8vIGluIHRoZSBjb250cnVjdGlvbiBvZiAndGhpcy5fZXZhbHVhdG9yJy5cbkludGVyZmFjZS5wcm90b3R5cGUuX2FuYWx5emVPcmRlciA9IGZ1bmN0aW9uKGNvbnRleHQsIGNoYW5nZSwgc3RhY2spIHtcbiAgaWYgKCdzdGFydCcgPT09IGNoYW5nZS50eXBlKSB7XG4gICAgY29udGV4dC5zdGFydGVkID0gdHJ1ZTtcbiAgfSBlbHNlIGlmICgnc3RvcCcpIHtcbiAgICBjb250ZXh0LnN0b3BwZWQgPSB0cnVlO1xuICB9XG4gIGlmICgnc3RhcnQnID09PSBjaGFuZ2UudHlwZSAmJiBjb250ZXh0LnN0b3BwZWQpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ1Nob3VsZCBub3Qgc3RhcnQgYSBwcm9jZXNzIGFnYWluJyArXG4gICAgICAgICdhZnRlciBpdFxcJ3MgYWxyZWFkeSBzdG9wcGVkJyk7XG4gIH0gZWxzZSBpZiAoJ25leHQnID09PSBjaGFuZ2UudHlwZSAmJiAhY29udGV4dC5zdGFydGVkKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdTaG91bGQgbm90IGNvbmNhdCBzdGVwcyB3aGlsZSBpdFxcJ3Mgbm90IHN0YXJ0ZWQnKTtcbiAgfSBlbHNlIGlmICgnc3RvcCcgPT09IGNoYW5nZS50eXBlICYmICFjb250ZXh0LnN0YXJ0ZWQpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ1Nob3VsZCBub3Qgc3RvcCBhIHByb2Nlc3MgYmVmb3JlIGl0XFwncyBzdGFydGVkJyk7XG4gIH1cbn07XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL2VmZmVjdC5pbnRlcmZhY2UuanNcbiAqKi8iLCIndXNlIHN0cmljdCc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIFJ1bnRpbWUoc3RhdGUgPSBudWxsKSB7XG4gIC8vIEFjY3VtbGF0ZWQgc3RhdGUgbmVlZCB0byBhcHBseSBlZmZlY3RzLCBsaWtlIGRhdGEgdG8gcmVuZGVyLlxuICAvLyBJZiBub25lLCBtZWFucyBpdCdzIGEgc3ViLXByb2NlZHVyZSBuZWVkIHRvIGJlIGNvbmNhdGVkLlxuICB0aGlzLl9zdGF0ZSA9IHN0YXRlO1xuICB0aGlzLl9kYXRhID0gbnVsbDtcbn1cblxuLyoqXG4gKiBXaGVuIHRoZSBzdGFjayBvZiBEU0wgY2hhbmdlcywgZXZhbHVhdGUgdGhlIExhbmd1YWdlLk5vZGUuXG4gKi9cblJ1bnRpbWUucHJvdG90eXBlLm9uY2hhbmdlID0gZnVuY3Rpb24oaW5zdGFuY2UsIGNoYW5nZSwgc3RhY2spIHtcbiAgdGhpc1tjaGFuZ2UudHlwZV0uYXBwbHkodGhpcywgY2hhbmdlLmFyZ3MpO1xuICByZXR1cm4gW107XG59O1xuXG5SdW50aW1lLnByb3RvdHlwZS5zdGFydCA9IGZ1bmN0aW9uKCkge1xuICB0aGlzLl9lZmZlY3RQcm9jZWR1cmUgPSBbXTtcbiAgdGhpcy5fY2FzZXMgPSBbXTtcbn07XG5cblJ1bnRpbWUucHJvdG90eXBlLnJ1biA9IGZ1bmN0aW9uKCkge1xuICBpZiAodGhpcy5fc3RhdGUpIHtcbiAgICAvLyBDb25jYXQgdGhlIGJ1aWx0IGVmZmVjdCBhZnRlciB0aGUgYWNjdW11bGF0aW5nLlxuICAgIHRoaXMuX3N0YXRlLnF1ZXVlID0gdGhpcy5fc3RhdGUucXVldWUudGhlbigoZGF0YSkgPT4ge1xuICAgICAgdGhpcy5fZWZmZWN0UHJvY2VkdXJlLmZvckVhY2goKHApID0+IHtcbiAgICAgICAgLy8gTm90ZTogYWxsIGNvbXBvc2VkIEVmZmVjdCBhbmQgbmF0aXZlIGZ1bmN0aW9uIHdpbGwgcmVjZWl2ZSB0aGVcbiAgICAgICAgLy8gc2FtZSBhY2N1bXVsYXRlZCByZXN1bHQgZnJvbSB0aGUgU3RhdGUsIGFuZCBpdCBzaG91bGQgYmUgY29uc2lkZXJlZFxuICAgICAgICAvLyBhcyBhbiBpbW11dGFibGUgdmFsdWUuIFRoaXMgbWVhbnMsIEVmZmVjdHMgb3IgZnVuY3Rpb25zIHNob3VsZCBub3RcbiAgICAgICAgLy8gbW9kaWZ5IGl0IGFuZCB0byBleHBlY3QgdGhlIG5leHQgb25lIGNhbiB1c2UgdGhlIG5ldyB2YWx1ZS5cbiAgICAgICAgcChkYXRhKTtcbiAgICAgIH0pO1xuICAgICAgdGhpcy5fZWZmZWN0UHJvY2VkdXJlLmxlbmd0aCA9IDA7XG4gICAgfSkuY2F0Y2godGhpcy5fc3RhdGUub25Qcm9jZXNzRXJyb3IuYmluZCh0aGlzLl9zdGF0ZSkpO1xuICAgIHRoaXMuX3N0YXRlLmRvbmUoKTtcbiAgfSBlbHNlIGlmICh0aGlzLl9kYXRhKSB7XG4gICAgLy8gU3VicHJlY3VkdXJlIG9ubHkgc3RhcnRzIGZyb20gYSBkYXRhLlxuICAgIHRoaXMuX2VmZmVjdFByb2NlZHVyZS5mb3JFYWNoKChwKSA9PiB7XG4gICAgICAvLyBOb3RlOiBhbGwgY29tcG9zZWQgRWZmZWN0IGFuZCBuYXRpdmUgZnVuY3Rpb24gd2lsbCByZWNlaXZlIHRoZVxuICAgICAgLy8gc2FtZSBhY2N1bXVsYXRlZCByZXN1bHQgZnJvbSB0aGUgU3RhdGUsIGFuZCBpdCBzaG91bGQgYmUgY29uc2lkZXJlZFxuICAgICAgLy8gYXMgYW4gaW1tdXRhYmxlIHZhbHVlLiBUaGlzIG1lYW5zLCBFZmZlY3RzIG9yIGZ1bmN0aW9ucyBzaG91bGQgbm90XG4gICAgICAvLyBtb2RpZnkgaXQgYW5kIHRvIGV4cGVjdCB0aGUgbmV4dCBvbmUgY2FuIHVzZSB0aGUgbmV3IHZhbHVlLlxuICAgICAgcCh0aGlzLl9kYXRhKTtcbiAgICB9KTtcbiAgICB0aGlzLl9lZmZlY3RQcm9jZWR1cmUubGVuZ3RoID0gMDtcbiAgICB0aGlzLl9kYXRhID0gbnVsbDtcbiAgfVxufTtcblxuLyoqXG4gKiBDbG9zZSB0aGUgcHJvY2VkdXJlIGRlZmluaXRpb24sIGRvIG5vdGhpbmcuXG4gKi9cblJ1bnRpbWUucHJvdG90eXBlLmRvbmUgPSBmdW5jdGlvbigpIHt9O1xuXG5SdW50aW1lLnByb3RvdHlwZS5uZXh0ID0gZnVuY3Rpb24oc3RlcCkge1xuICAvLyBBbm90aGVyIEVmZmVjdCBjaGFpbi5cbiAgaWYgKHN0ZXAgaW5zdGFuY2VvZiBSdW50aW1lKSB7XG4gICAgdGhpcy5fZWZmZWN0UHJvY2VkdXJlLmNvbmNhdChzdGVwLl9lZmZlY3RQcm9jZWR1cmUpO1xuICB9IGVsc2UgaWYgKCdmdW5jdGlvbicgPT09IHR5cGVvZiBzdGVwKSB7XG4gICAgLy8gQW4gbmF0aXZlIGZ1bmN0aW9uLlxuICAgIHRoaXMuX2VmZmVjdFByb2NlZHVyZS5wdXNoKHN0ZXApO1xuICB9IGVsc2Uge1xuICAgIHRocm93IG5ldyBFcnJvcignVHlwZUVycm9yOiBzdGVwIGlzIG5laXRoZXIgYW5vdGhlciBFZmZlY3Qgbm9yIGZ1bmN0aW9uJyk7XG4gIH1cbn07XG5cbi8qKlxuICogQSBwdXJlIHN5bnRheCBub2RlLlxuICovXG5SdW50aW1lLnByb3RvdHlwZS5tYXRjaCA9IGZ1bmN0aW9uKCkge1xuICB0aGlzLm5leHQoKCkgPT4ge1xuICAgIHRoaXMuX2Nhc2VzID0gW107XG4gIH0pO1xufTtcblxuLyoqXG4gKiBUbyBtYWtlIGEgZnVuY3Rpb24gdGVzdCBhbGwgYnJhbmNoZXMgdW50aWwgb25lIGlzIHRydWUsXG4gKiBhbmQgdGhlbiBydW4gaXQgd2hlbiB0aGUgcHJvY2VkdXJlIGlzIGV4ZWN1dGluZy5cbiAqL1xuUnVudGltZS5wcm90b3R5cGUuZW5kID0gZnVuY3Rpb24oKSB7XG4gIHRoaXMubmV4dCgoZGF0YSkgPT4ge1xuICAgIHZhciBjYXNlcyA9IHRoaXMuX2Nhc2VzO1xuICAgIGZvciAobGV0IGJyYW5jaCBvZiBjYXNlcykge1xuICAgICAgaWYgKGJyYW5jaC5wcmVkaWN0aW9uKGRhdGEpKSB7XG4gICAgICAgIGJyYW5jaC50b2RvKGRhdGEpO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG4gICAgY2FzZXMubGVuZ3RoID0gMDtcbiAgfSk7XG59O1xuXG4vKipcbiAqIGBwcmVkYCBtdXN0IGJlIGEgZnVuY3Rpb24gcmV0dXJuIHRydWUvZmFsc2UuXG4gKi9cblJ1bnRpbWUucHJvdG90eXBlLmNhc2UgPSBmdW5jdGlvbihwcmVkKSB7XG4gIHRoaXMubmV4dCgoKSA9PiB7XG4gICAgdGhpcy5fY2FzZXMucHVzaCh7XG4gICAgICAncHJlZGljdGlvbic6IHByZWQsXG4gICAgICAndG9kbyc6IG51bGxcbiAgICB9KTtcbiAgfSk7XG59O1xuXG4vKipcbiAqIGBzdGVwYDogYW5vdGhlciBFZmZlY3Qgb3IgbmF0aXZlIGZ1bmN0aW9uLlxuICovXG5SdW50aW1lLnByb3RvdHlwZS50byA9IGZ1bmN0aW9uKHN0ZXApIHtcbiAgdGhpcy5uZXh0KCgpID0+IHtcbiAgICB2YXIgYnJhbmNoID0gdGhpcy5fY2FzZXNbdGhpcy5fY2FzZXMubGVuZ3RoIC0gMV07XG4gICAgaWYgKHN0ZXAgaW5zdGFuY2VvZiBSdW50aW1lKSB7XG4gICAgICAvLyBTZXQgYSBmdW5jdGlvbiB3aWxsIGV4ZWN1dGUgdGhlIHN1YnByb2NlZHVyZSB3aGVuIGl0XG4gICAgICAvLyBpcyBjYWxsZWQgd2l0aCBkYXRhLlxuICAgICAgYnJhbmNoLnRvZG8gPSAoZGF0YSkgPT4ge1xuICAgICAgICBzdGVwLl9kYXRhID0gZGF0YTtcbiAgICAgICAgc3RlcC5ydW4oKTtcbiAgICAgIH07XG4gICAgfSBlbHNlIHtcbiAgICAgIGJyYW5jaC50b2RvID0gc3RlcDtcbiAgICB9XG4gIH0pO1xufTtcblxuLyoqXG4gKiBSZW1lbWJlciB3ZSB3aWxsIHN3YXAgYGxvb3BgIGFuZCBgdW50aWxgIGF0IHN5bnRheCBsZXZlbCwgc29cbiAqIHdlIGNhbiBnZXQgdGhlIHByZWQgYmVmb3JlIHdlIHJ1biB0aGUgbG9vcC5cbiAqL1xuUnVudGltZS5wcm90b3R5cGUubG9vcCA9IGZ1bmN0aW9uKHN0ZXApIHtcbiAgdGhpcy5uZXh0KChkYXRhKSA9PiB7XG4gICAgdmFyIGxvb3BUaW1lcyA9IHRoaXMuX2xvb3BUaW1lcztcbiAgICB0aGlzLl9sb29wVGltZXMgPSBudWxsO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbG9vcFRpbWVzOyBpKyspIHtcbiAgICAgIGlmIChzdGVwIGluc3RhbmNlb2YgUnVudGltZSkge1xuICAgICAgICBzdGVwLl9kYXRhID0gZGF0YTtcbiAgICAgICAgc3RlcC5ydW4oKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHN0ZXAoZGF0YSk7XG4gICAgICB9XG4gICAgfVxuICB9KTtcbn07XG5cbi8qKlxuICogUmVtZW1iZXIgd2Ugd2lsbCBzd2FwIGBsb29wYCBhbmQgYHVudGlsYCBhdCBzeW50YXggbGV2ZWwsIHNvXG4gKiB3ZSBjYW4gZ2V0IHRoZSBsb29wIHRpbWUgYmVmb3JlIHdlIHJ1biB0aGUgbG9vcC5cbiAqXG4gKiBUaGUgYHByZWRgIHNob3VsZCBiZSBhIGZ1bmN0aW9uIHJldHVybnMgYSBwb3NpdGl2ZSBudW1iZXIsXG4gKiB3aGljaCBpcyBnZW5lcmF0ZWQgZnJvbSB0aGUgYGRhdGFgLlxuICovXG5SdW50aW1lLnByb3RvdHlwZS51bnRpbCA9IGZ1bmN0aW9uKHByZWQpIHtcbiAgdGhpcy5uZXh0KChkYXRhKSA9PiB7XG4gICAgdGhpcy5fbG9vcFRpbWVzID0gcHJlZChkYXRhKTtcbiAgICBpZiAoJ251bWJlcicgIT09IHR5cGVvZiB0aGlzLl9sb29wVGltZXMpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignVHlwZUVycm9yOiBsb29wIHRpbWVzIG11c3QgYmUgYSBudW1iZXIuJyk7XG4gICAgfSBlbHNlIGlmICgwID4gdGhpcy5fbG9vcFRpbWVzKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0xvb3AgdGltZXMgbXVzdCBsYXJnZXIgdGhhbiAwLicpO1xuICAgIH1cbiAgfSk7XG59O1xuXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL2VmZmVjdC5ydW50aW1lLmpzXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSB7IFwiZGVmYXVsdFwiOiByZXF1aXJlKFwiY29yZS1qcy9saWJyYXJ5L2ZuL2dldC1pdGVyYXRvclwiKSwgX19lc01vZHVsZTogdHJ1ZSB9O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi4vfi9iYWJlbC1ydW50aW1lL2NvcmUtanMvZ2V0LWl0ZXJhdG9yLmpzXG4gKiogbW9kdWxlIGlkID0gNjhcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsInJlcXVpcmUoJy4uL21vZHVsZXMvd2ViLmRvbS5pdGVyYWJsZScpO1xucmVxdWlyZSgnLi4vbW9kdWxlcy9lczYuc3RyaW5nLml0ZXJhdG9yJyk7XG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4uL21vZHVsZXMvY29yZS5nZXQtaXRlcmF0b3InKTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4uL34vYmFiZWwtcnVudGltZS9+L2NvcmUtanMvbGlicmFyeS9mbi9nZXQtaXRlcmF0b3IuanNcbiAqKiBtb2R1bGUgaWQgPSA2OVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwidmFyIGFuT2JqZWN0ID0gcmVxdWlyZSgnLi8kLmFuLW9iamVjdCcpXG4gICwgZ2V0ICAgICAgPSByZXF1aXJlKCcuL2NvcmUuZ2V0LWl0ZXJhdG9yLW1ldGhvZCcpO1xubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuLyQuY29yZScpLmdldEl0ZXJhdG9yID0gZnVuY3Rpb24oaXQpe1xuICB2YXIgaXRlckZuID0gZ2V0KGl0KTtcbiAgaWYodHlwZW9mIGl0ZXJGbiAhPSAnZnVuY3Rpb24nKXRocm93IFR5cGVFcnJvcihpdCArICcgaXMgbm90IGl0ZXJhYmxlIScpO1xuICByZXR1cm4gYW5PYmplY3QoaXRlckZuLmNhbGwoaXQpKTtcbn07XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuLi9+L2JhYmVsLXJ1bnRpbWUvfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9jb3JlLmdldC1pdGVyYXRvci5qc1xuICoqIG1vZHVsZSBpZCA9IDcwXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iXSwic291cmNlUm9vdCI6IiJ9