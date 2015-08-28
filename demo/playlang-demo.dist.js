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
	  console.log('>>>>> #0');ctx.returns(3);
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
	  console.log('>>>>> #1', x);ctx.returns(x + 4);
	}).as('b').next(function (ctx) {
	  console.log('>>>>>>>>> #+ab: ', ctx.a + ctx.b);
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
	    ctx.returns(c + 1);
	  });
	})['case'](function (n) {
	  return n === 17;
	}).to(function (ctx, d) {
	  ctx.returns(d - 255);
	}).end().next(function (ctx, x) {
	  console.log('>>>>> #2', x);ctx.returns(x + 5);
	}).all(function (ctx) {
	  ctx.returns(1);
	}, function (ctx) {
	  ctx.returns(new _Promise(function (r, j) {
	    setTimeout(function () {
	      r(20);
	    }, 1000);
	  }));
	}).any(function (ctx, rs) {
	  ctx.returns(rs[0] + rs[1]);
	}, function (ctx, rs) {
	  ctx.returns(new _Promise(function (r, j) {
	    setTimeout(function () {
	      r(rs[0] - rs[1]);
	    }, 1000);
	  }));
	}).next(function (ctx, rs) {
	  console.log('>>>>>>> rs: ', rs);
	  ctx.returns(1);
	}).next(function (ctx) {
	  console.log('>>>>> try to raise or interrupt');
	  //ctx.raise('TRY TO RAISE');
	  ctx.interrupt('TEST INTERRUPT');
	}).next(function (ctx, rs) {
	  console.log('>>>>>>> should not run!');
	  ctx.returns(1);
	}).next(function (ctx, rs) {
	  console.log('>>>>>>> should not run!');
	  ctx.returns(1);
	}).done();
	// TODO: done --> run!

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
	
	var _demoPlaylangRuntimeJs = __webpack_require__(60);
	
	var _demoPlaylangRuntimeJs2 = _interopRequireDefault(_demoPlaylangRuntimeJs);
	
	function Playlang() {
	  this._runtime = new _demoPlaylangRuntimeJs2['default']();
	  this._interface = new _demoPlaylangInterfaceJs.Interface(this._runtime);
	  return this._interface;
	}
	
	module.exports = exports['default'];

/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	exports.Interface = Interface;
	
	var _distRuneJs = __webpack_require__(59);
	
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
	  this._evaluator = new _distRuneJs.Rune.Evaluate().analyzer(this._analyzeOrder.bind(this)).interpreter(this._interpret.bind(this));
	}
	
	Interface.prototype.start = _distRuneJs.Rune.define('start', 'begin');
	Interface.prototype.done = _distRuneJs.Rune.define('done', 'exit');
	Interface.prototype.next = _distRuneJs.Rune.define('next', 'push');
	Interface.prototype.match = _distRuneJs.Rune.define('match', 'begin');
	Interface.prototype.end = _distRuneJs.Rune.define('end', 'end');
	Interface.prototype['case'] = _distRuneJs.Rune.define('case', 'push');
	Interface.prototype.to = _distRuneJs.Rune.define('to', 'push');
	Interface.prototype.as = _distRuneJs.Rune.define('as', 'push');
	Interface.prototype.loop = _distRuneJs.Rune.define('loop', 'begin');
	Interface.prototype.until = _distRuneJs.Rune.define('until', 'end');
	Interface.prototype.any = _distRuneJs.Rune.define('any', 'push');
	Interface.prototype.all = _distRuneJs.Rune.define('all', 'push');
	
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
		exports.Rune = Rune;
		
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
	
	/***/ }
	/******/ ])));
	//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgYjViYzBjNTA1Y2JiYjZiMTU5MzciLCJ3ZWJwYWNrOi8vLy4vc3JjL3J1bmUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVCQUFlO0FBQ2Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7QUN0Q0EsYUFBWSxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBcUdOLFVBQVMsSUFBSSxHQUFHLEVBQUU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUE0QnpCLEtBQUksQ0FBQyxNQUFNLEdBQUcsVUFBUyxNQUFNLEVBQUUsRUFBRSxFQUFZO09BQVYsR0FBRyx5REFBRyxFQUFFOztBQUN6QyxPQUFJLEtBQUssR0FBRyxTQUFSLEtBQUssR0FBcUI7QUFDNUIsU0FBSSxJQUFJLEVBQUUsV0FBVyxDQUFDOzt1Q0FEQSxJQUFJO0FBQUosV0FBSTs7O0FBRTFCLGFBQVEsRUFBRTtBQUNSLFlBQUssTUFBTTtBQUNULGFBQUksR0FBRyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDL0MsYUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDdEIsb0JBQVcsR0FDVCxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUNoRCxlQUFN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S0FBSyxFQUFFOztBQUVwQyxTQUFNLElBQUksS0FBSyxrQkFBZ0IsTUFBTSxDQUFDLElBQUksdUJBQWlCLEdBQUcsaUJBQWEsQ0FBQztFQUM3RSxDIiwiZmlsZSI6InJ1bmUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aWQ6IG1vZHVsZUlkLFxuIFx0XHRcdGxvYWRlZDogZmFsc2VcbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHdlYnBhY2svYm9vdHN0cmFwIGI1YmMwYzUwNWNiYmI2YjE1OTM3XG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xuXG4vKipcbiAqIEdlbmVyaWMgYnVpbGRlciB0aGF0IHdvdWxkIHB1c2ggbm9kZXMgaW50byB0aGUgZURTTCBzdGFjay5cbiAqIFVzZXIgY291bGQgaW5oZXJpdCB0aGlzIHRvIGRlZmluZSB0aGUgbmV3IGVEU0wuXG4gKiAtLS1cbiAqIFRoZSBkZWZhdWx0IHNlbWFudGljcyBvbmx5IGNvbnRhaW4gdGhlc2Ugb3BlcmF0aW9uczpcbiAqXG4gKiAxLiBbcHVzaF0gOiBwdXNoIHRvIHRoZSBjdXJyZW50IHN0YWNrXG4gKiAyLiBbYmVnaW5dOiBjcmVhdGUgYSBuZXcgc3RhY2sgYW5kIHN3aXRjaCB0byBpdCxcbiAqICAgICAgICAgICAgIGFuZCB0aGVuIHB1c2ggdGhlIG5vZGUgaW50byB0aGUgc3RhY2suXG4gKiAzLiBbZW5kXSAgOiBhZnRlciBwdXNoIHRoZSBub2RlIGludG8gdGhlIHN0YWNrLFxuICogICAgICAgICAgICAgY2hhbmdlIHRoZSBjdXJyZW50IHN0YWNrIHRvIHRoZSBwcmV2aW91cyBvbmUuXG4gKiA0LiBbZXhpdF0gOiBleGl0IHRoZSBjb250ZXh0IG9mIHRoaXMgZURTTDsgdGhlIGxhc3QgcmVzdWx0XG4gKiAgICAgICAgICAgICBvZiBpdCB3b3VsZCBiZSBwYXNzZWQgdG8gdGhlIHJldHVybiB2YWx1ZSBvZlxuICogICAgICAgICAgICAgdGhpcyBjaGFpbi5cbiAqXG4gKiBTdGFjayBjb3VsZCBiZSBuZXN0ZWQ6IHdoZW4gW2JlZ2luXSBhIG5ldyBzdGFjayBpbiBmYWN0IGl0IHdvdWxkXG4gKiBwdXNoIHRoZSBzdGFjayBpbnRvIHRoZSBwcmV2aW91cyBvbmUuIFNvIHRoZSBzdGFjayBjb21wcmlzZVxuICogW25vZGVdIGFuZCBbc3RhY2tdLlxuICogLS0tXG4gKiBBbHRob3VnaCB0aGUgZURTTCBpbnN0YW5jZSBzaG91bGQgd3JhcCB0aGVzZSBiYXNpYyBvcGVyYXRpb25zXG4gKiB0byBtYW5pcHVsYXRlIHRoZSBzdGFjaywgdGhleSBhbGwgbmVlZCB0byBjb252ZXJ0IHRoZSBtZXRob2RcbiAqIGNhbGwgdG8gbm9kZXMuIFNvICdSdW5lJyBwcm92aWRlIGEgd2F5IHRvIHNpbXBsaWZ5IHRoZSB3b3JrOiBpZlxuICogdGhlIGluc3RhbmNlIGNhbGwgdGhlIFtkZWZpbmVdIG1ldGhvZCB0aGUgbmFtZSBvZiB0aGUgbWV0aG9kLFxuICogaXQgY291bGQgYXNzb2NpYXRlIHRoZSBvcGVyYW5kIG9mIHRoZSBlRFNMIHdpdGggdGhlIHN0YWNrIG1hbmlwdWxhdGlvbi5cbiAqIEZvciBleGFtcGxlOlxuICpcbiAqICAgIHZhciBlRFNMID0gZnVuY3Rpb24oKSB7fTtcbiAqICAgIGVEU0wucHJvdG90eXBlLnRyYW5zYWN0aW9uID0gUnVuZS5kZWZpbmUoJ3RyYW5zYWN0aW9uJywgJ2JlZ2luJyk7XG4gKiAgICBlRFNMLnByb3RvdHlwZS5wcmUgPSBSdW5lLmRlZmluZSgncHJlJywgJ3B1c2gnKTtcbiAqICAgIGVEU0wucHJvdG90eXBlLnBlcmZvcm0gPSBSdW5lLmRlZmluZSgncGVyZm9ybScsICdwdXNoJyk7XG4gKiAgICBlRFNMLnByb3RvdHlwZS5wb3N0ID0gUnVuZS5kZWZpbmUoJ3Bvc3QnLCAnZW5kJyk7XG4gKlxuICogVGhlbiB0aGUgZURTTCBjb3VsZCBiZSB1c2VkIGFzOlxuICpcbiAqICAgIChuZXcgZURTTClcbiAqICAgICAgLnRyYW5zYWN0aW9uKClcbiAqICAgICAgLnByZShjYilcbiAqICAgICAgLnBlcmZvcm0oY2IpXG4gKiAgICAgIC5wb3N0KGNiKVxuICpcbiAqIEFuZCB0aGUgc3RhY2sgd291bGQgYmU6XG4gKlxuICogICAgW1xuICogICAgICBub2RlPCd0cmFuc2FjdGlvbicsPlxuICogICAgICBub2RlPCdwcmUnLCBjYj5cbiAqICAgICAgbm9kZTwncHJlZm9ybScsIGNiPlxuICogICAgICBub2RlPCdwb3N0JywgY2I+XG4gKiAgICBdXG4gKlxuICogSG93ZXZlciwgdGhpcyBzaW1wbGUgYXBwcm9hY2ggdGhlIHNlbWFudGljcyBydWxlcyBhbmQgYW5hbHl6ZXJzIHRvXG4gKiBndWFyYW50ZWUgdGhlIHN0YWNrIGlzIHZhbGlkLiBGb3IgZXhhbXBsZSwgaWYgd2UgaGF2ZSBhIG1hbGZvcm1lZFxuICogc3RhY2sgYmVjYXVzZSBvZiB0aGUgZm9sbG93aW5nIGVEU0wgcHJvZ3JhbTpcbiAqXG4gKiAgICAobmV3IGVEU0wpXG4gKiAgICAgIC5wb3N0KGNiKVxuICogICAgICAucHJlKGNiKVxuICogICAgICAucGVyZm9ybShjYilcbiAqICAgICAgLnRyYW5zYWN0aW9uKClcbiAqXG4gKiBUaGUgcnVudGltZSBtYXkgcmVwb3J0IGVycm90IGJlY2F1c2Ugd2hlbiAnLnBvc3QoY2IpJyB0aGVyZSBpcyBubyBzdGFja1xuICogY3JlYXRlZCBieSB0aGUgYmVnaW5uaW5nIHN0ZXAsIG5hbWVseSB0aGUgJy5wcmUoY2IpJyBpbiBvdXIgY2FzZS5cbiAqIE5ldmVydGhlbGVzcywgdGhlIGVycm9yIG1lc3NhZ2UgaXMgdG9vIGxvdy1sZXZlbCBmb3IgdGhlIGxhbmd1YWdlIHVzZXIsXG4gKiBzaW5jZSB0aGV5IHNob3VsZCBjYXJlIG5vIHN0YWNrIHRoaW5ncyBhbmQgc2hvdWxkIG9ubHkgY2FyZSBhYm91dCB0aGUgZURTTFxuICogaXRzZWxmLlxuICpcbiAqIFRoZSBzb2x1dGlvbiBpcyB0byBwcm92aWRlIGEgYmFzaWMgc3RhY2sgb3JkZXJpbmcgYW5hbHl6ZXIgYW5kIGxldCB0aGVcbiAqIGxhbmd1YWdlIGRlY2lkZSBob3cgdG8gZGVzY3JpYmUgdGhlIGVycm9yLiBBbmQgc2luY2Ugd2UgZG9uJ3QgaGF2ZVxuICogYW55IGNvbnRleHQgaW5mb3JtYXRpb24gYWJvdXQgdmFyaWFibGVzLCBzY29wZSBhbmQgb3RoZXIgZWxlbWVudHNcbiAqIGFzIGEgY29tcGxldGUgcHJvZ3JhbW1pbmcgbGFuZ3VhZ2UsIHdlIG9ubHkgbmVlZCB0byBndWFyYW50ZWUgdGhlIG9yZGVyIGlzXG4gKiBjb3JyZWN0LCBhbmQgbWFrZSBpbmNvcnJlY3QgY2FzZXMgbWVhbmluZ2Z1bC4gTW9yZW92ZXIsIHNpbmNlIHRoZSBhbmFseXplclxuICogbmVlZHMgdG8gYW5hbHl6ZSB0aGUgc3RhdGVzIHdoZW5ldmVyIHRoZSBpbmNvbWluZyBub2RlIGNvbWVzLCBpdCBpcyBpbiBmYWN0XG4gKiBhbiBldmFsdWF0aW9uIHByb2Nlc3MsIHNvIHVzZXIgY291bGQgY29tYmluZSB0aGUgYW5hbHl6aW5nIGFuZCBpbnRlcnByZXRpbmdcbiAqIHBoYXNlIGludG8gdGhlIHNhbWUgZnVuY3Rpb24uIEZvciBleGFtcGxlOlxuICpcbiAqICAgIHJ1bnRpbWUub25jaGFuZ2UoKGNvbnRleHQsIG5vZGUsIHN0YWNrKSA9PiB7XG4gKiAgICAgICAgLy8gSWYgdGhlIGNoYW5nZSBpcyB0byBzd2l0Y2ggdG8gYSBuZXcgc3RhY2ssXG4gKiAgICAgICAgLy8gdGhlICdzdGFjaycgaGVyZSB3b3VsZCBiZSB0aGUgbmV3IHN0YWNrLlxuICogICAgICAgIHZhciB7dHlwZSwgYXJnc30gPSBub2RlO1xuICogICAgICAgIGlmICgncHJlJyA9PT0gdHlwZSkge1xuICogICAgICAgICAgY29udGV4dC5pbml0ID0gdHJ1ZTtcbiAqICAgICAgICB9IGVsc2UgaWYgKCdwb3N0JyA9PT0gdHlwZSAmJiAhY29udGV4dC5pbml0KSB7XG4gKiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1RoZXJlIG11c3QgYmUgb25lIFwicHJlXCIgbm9kZSBiZWZvcmUgdGhlIFwicG9zdFwiLicpO1xuICogICAgICAgIH1cbiAqICAgIH0pO1xuICpcbiAqIFdpdGggc3VjaCBmZWF0dXJlLCBpZiB0aGUgaW5jb21pbmcgbm9kZSBvciB0aGUgc3RhY2sgaXMgbWFsZm9ybWVkLFxuICogaXQgc2hvdWxkIHRocm93IHRoZSBlcnJvci4gVGhlIGVycm9yIGNhcHR1cmVkIGJ5IHRoZSBpbnN0YW5jZSBsaWtlIHRoaXNcbiAqIGNvdWxkIGJlIGEgJ2NvbXBpbGF0aW9uIGVycm9yJy5cbiAqXG4gKiBUaGUgbm90aWNlYWJsZSBmYWN0IGlzIFRoZSBjYWxsYmFjayBvZiB0aGUgJ29uY2hhbmdlJyBpcyBhY3R1YWxseSBhIHJlZHVjZXIsXG4gKiBzbyB1c2VyIGNvdWxkIHRyZWF0IHRoZSBwcm9jZXNzIG9mIHRoaXMgZXZhbHVhdGlvbiAmIGFuYWx5emluZyBhcyBhIHJlZHVjaW5nXG4gKiBwcm9jZXNzIG9uIGFuIGluZmluaXRlIHN0cmVhbS4gQW5kIHNpbmNlIHdlIGhhdmUgYSBzdGFjayBtYWNoaW5lLCBpZiB0aGVcbiAqIHJlZHVjZXIgcmV0dXJuIG5vdGhpbmcsIHRoZSBzdGFjayB3b3VsZCBiZSBlbXB0eS4gT3RoZXJ3aXNlLCBpZiB0aGUgcmVkdWNlclxuICogcmV0dXJuIGEgbmV3IHN0YWNrLCBpdCB3b3VsZCByZXBsYWNlIHRoZSBvbGQgb25lLlxuICpcbiAqIEFuZCBwbGVhc2Ugbm90ZSB0aGUgZXhhbXBsZSBpcyBtdWNoIHNpbXBsaWZpZWQuIEZvciB0aGVcbiAqIHJlYWwgZURTTCBpdCBzaG91bGQgYmUgdXNlZCBvbmx5IGFzIGFuIGVudHJ5IHRvIGRpc3BhdGNoIHRoZSBjaGFuZ2UgdG9cbiAqIHRoZSByZWFsIGhhbmRsZXJzLCB3aGljaCBtYXkgY29tcHJpc2Ugc2V2ZXJhbCBzdGF0ZXMgYW5kIGNvbXBvbmVudHMuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBSdW5lKCkge31cblxuLyoqXG4gKiBIZWxwZXIgbWV0aG9kIHRvIGJ1aWxkIGludGVyZmFjZSBvZiBhIHNwZWNpZmljIERTTC4gSXQgd291bGQgcmV0dXJuIGEgbWV0aG9kXG4gKiBvZiB0aGUgRFNMIGFuZCB0aGVuIHRoZSBpbnRlcmZhY2UgY291bGQgYXR0YWNoIGl0LlxuICpcbiAqIFRoZSByZXR1cm5pbmcgZnVuY3Rpb24gd291bGQgYXNzdW1lIHRoYXQgdGhlICd0aGlzJyBpbnNpZGUgaXQgaXMgdGhlIHJ1bnRpbWVcbiAqIG9mIHRoZSBsYW5ndWFnZS4gQW5kIHNpbmNlIHRoZSBtZXRob2QgaXQgcmV0dXJucyB3b3VsZCByZXF1aXJlIHRvIGFjY2VzcyBzb21lXG4gKiBtZW1iZXJzIG9mIHRoZSAndGhpcycsIHRoZSAndGhpcycgc2hvdWxkIGhhdmUgJ3RoaXMuc3RhY2snIGFuZCAndGhpcy5jb250ZXh0J1xuICogYXMgdGhlIG1ldGhvZCByZXF1aXJlcy5cbiAqXG4gKiBJZiBpdCdzIGFuICdleGl0JyBub2RlLCBtZWFucyB0aGUgc2Vzc2lvbiBpcyBlbmRlZCBhbmQgdGhlIGludGVycHJldGVyIHNob3VsZFxuICogcmV0dXJuIGEgc3RhY2sgY29udGFpbnMgb25seSBvbmUgbm9kZSBhcyB0aGUgcmVzdWx0IG9mIHRoZSBzZXNzaW9uLCBvciB0aGVcbiAqIHNlc3Npb24gcmV0dXJucyBub3RoaW5nLiBGb3Igb3RoZXIgaW5zdHJ1Y3Rpb25zIHRoZSBzdGFjayBjYW4ga2VlcCBzb21lXG4gKiBjb21wdXRlZCByZXN1bHQgdG8gc2ltdWxhdGUgcmVhbCBzdGFjayBtYWNoaW5lLiBCdXQgaXQncyBPSyB0byBub3QgdXNlIHRoaXNcbiAqIGZlYXR1cmUgYW5kIGFsd2F5cyByZXR1cm4gYW4gZW1wdHkgJ3N0YWNrJyBldmVyeXRpbWUgdGhlICdvbmNoYW5nZScgZ2V0XG4gKiBjYWxsZWQgYW5kIGludGVydXB0ZWQuIEluIHRoaXMgbW9kZSBpdCBtZWFucyB0aGUgbGFuZ3VhZ2Ugd2FudCB0byBrZWVwXG4gKiBhbGwgc3RhdGVzIGJ5IGl0c2VsZi5cbiAqXG4gKiBQbGVhc2Ugbm90ZSB0aGF0IGZyb20gdGhlIGRlc2NyaXB0aW9uIGFib3ZlLCAnZW5kJyBtZWFucyBzdGFjayAoc3Vic3RhY2spXG4gKiBlbmRzLiBJdCdzIHRvdGFsbHkgaXJyZWxldmFudCB0byAnZXhpdCcuXG4gKlxuICogVGhlIGxhc3QgYXJndW1lbnQgJ2RvYycgaXMgd2hhdCBkZXNpZ25lciBjb3VsZCBwdXQgdGhlIGRlc2NyaXB0aW9uIGFib3V0XG4gKiB0aGUgbWV0aG9kLiBJZiBzZXQsIGl0IHdvdWxkIGFwcGVuZCB0aGUgJ3J1bmUuZG9jJ1xuICogcHJvcGVydHkgaW4gdGhlIGZ1bmN0aW9uIGl0IHJldHVybnMuIEFuZCB0aGVuIHRoZSBsYW5ndWFnZSBpbnN0YW5jZSBjb3VsZFxuICogY2FsbCBgUnVuZS5kb2N1bWVudCg8aW5zdGFuY2U+KWAgdG8gZ2V0IGEgbWV0aG9kIHRoYXQgd291bGQgcmV0dXJuXG4gKiAneyBtZXRob2ROYW1lOiBkZXNjcmlwdGlvbiB9JyB3aGVuIGl0IGdvdCBpbnZva2VkLlxuICovXG5SdW5lLmRlZmluZSA9IGZ1bmN0aW9uKG1ldGhvZCwgYXMsIGRvYyA9ICcnKSB7XG4gIHZhciBidWlsdCA9IGZ1bmN0aW9uKC4uLmFyZ3MpIHtcbiAgICB2YXIgbm9kZSwgcmVzdWx0c3RhY2s7XG4gICAgc3dpdGNoIChhcykge1xuICAgICAgY2FzZSAncHVzaCc6XG4gICAgICAgIG5vZGUgPSBuZXcgUnVuZS5Ob2RlKG1ldGhvZCwgYXJncywgdGhpcy5zdGFjayk7XG4gICAgICAgIHRoaXMuc3RhY2sucHVzaChub2RlKTtcbiAgICAgICAgcmVzdWx0c3RhY2sgPVxuICAgICAgICAgIHRoaXMub25jaGFuZ2UodGhpcy5jb250ZXh0LCBub2RlLCB0aGlzLnN0YWNrKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdiZWdpbic6XG4gICAgICAgIHRoaXMuX3ByZXZzdGFjayA9IHRoaXMuc3RhY2s7XG4gICAgICAgIHRoaXMuc3RhY2sgPSBbXTtcbiAgICAgICAgbm9kZSA9IG5ldyBSdW5lLk5vZGUobWV0aG9kLCBhcmdzLCB0aGlzLnN0YWNrKTtcbiAgICAgICAgdGhpcy5zdGFjay5wdXNoKG5vZGUpOyAgLy8gYXMgdGhlIGZpcnN0IG5vZGUgb2YgdGhlIG5ldyBzdGFjay5cbiAgICAgICAgcmVzdWx0c3RhY2sgPVxuICAgICAgICAgIHRoaXMub25jaGFuZ2UodGhpcy5jb250ZXh0LCBub2RlLCB0aGlzLnN0YWNrKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdlbmQnOlxuICAgICAgICBub2RlID0gbmV3IFJ1bmUuTm9kZShtZXRob2QsIGFyZ3MsIHRoaXMuc3RhY2spO1xuICAgICAgICB0aGlzLnN0YWNrLnB1c2gobm9kZSk7ICAvLyB0aGUgbGFzdCBub2RlIG9mIHRoZSBzdGFjay5cbiAgICAgICAgdGhpcy5zdGFjayA9XG4gICAgICAgICAgdGhpcy5fcHJldnN0YWNrOyAvLyBzd2l0Y2ggYmFjayB0byB0aGUgcHJldmlvdXMgc3RhY2suXG4gICAgICAgIHJlc3VsdHN0YWNrID1cbiAgICAgICAgICB0aGlzLm9uY2hhbmdlKHRoaXMuY29udGV4dCwgbm9kZSwgdGhpcy5zdGFjayk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnZXhpdCc6XG4gICAgICAgIG5vZGUgPSBuZXcgUnVuZS5Ob2RlKG1ldGhvZCwgYXJncywgdGhpcy5zdGFjayk7XG4gICAgICAgIHRoaXMuc3RhY2sucHVzaChub2RlKTsgIC8vIHRoZSBsYXN0IG5vZGUgb2YgdGhlIHN0YWNrLlxuICAgICAgICByZXN1bHRzdGFjayA9XG4gICAgICAgICAgdGhpcy5vbmNoYW5nZSh0aGlzLmNvbnRleHQsIG5vZGUsIHRoaXMuc3RhY2spO1xuICAgICAgICBpZiAoIXJlc3VsdHN0YWNrKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGAnZXhpdCcgbm9kZSAnJHtub2RlLnR5cGV9JyBzaG91bGRcbiAgICAgICAgICAgIHJldHVybiBhIHJlc3VsdHN0YWNrLmApO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHRzdGFja1swXTtcbiAgICB9XG4gICAgLy8gSWYgdGhlIGhhbmRsZXIgdXBkYXRlcyB0aGUgc3RhY2ssIGl0IHdvdWxkIHJlcGxhY2UgdGhlIGV4aXN0aW5nIG9uZS5cbiAgICBpZiAocmVzdWx0c3RhY2spIHtcbiAgICAgIHRoaXMuc3RhY2sgPSByZXN1bHRzdGFjaztcbiAgICB9XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG4gIGJ1aWx0LnJ1bmUgPSB7XG4gICAgJ2FzJzogYXMsXG4gICAgJ2RvYyc6IGRvYyxcbiAgICAnbWV0aG9kJzogbWV0aG9kLFxuICB9O1xuICByZXR1cm4gYnVpbHQ7XG59O1xuXG4vKipcbiAqIEdlbmVyYXRlIGEgbWV0aG9kIHRoYXQgd291bGQgcmV0dXJuIGFsbCBkb2N1bWVudHMgb2YgdGhlIG1ldGhvZHMsXG4gKiBpbiBhIGZvcm0gb2YgJ3sgbWV0aG9kTmFtZTogZGVzY3JpcHRpb24gfScuXG4gKlxuICogVGhlIGFyZ3VtZW50IG11c3QgYmUgdGhlIGxhbmd1YWdlIGluc3RhbmNlIHdpdGggYWxsIGRlZmluZWQgbWV0aG9kcy5cbiAqL1xuUnVuZS5wdWJsaXNoID0gZnVuY3Rpb24oaW5zdGFuY2UpIHtcbiAgdmFyIGdlbmVyYXRlZCA9IE9iamVjdC5rZXlzKGluc3RhbmNlKS5yZWR1Y2UoKGRvYywgbmFtZSkgPT4ge1xuICAgIHZhciBtZXRob2QgPSBpbnN0YW5jZVtuYW1lXTtcbiAgICBpZiAobWV0aG9kLnJ1bmUpIHtcbiAgICAgIGRvY1tuYW1lXSA9IG1ldGhvZC5ydW5lLmRvYztcbiAgICB9XG4gIH0sIHt9KTtcbiAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBnZW5lcmF0ZWQ7XG4gIH07XG59O1xuXG5SdW5lLk5vZGUgPSBmdW5jdGlvbih0eXBlLCBhcmdzLCBzdGFjaykge1xuICB0aGlzLnR5cGUgPSB0eXBlO1xuICB0aGlzLmFyZ3MgPSBhcmdzO1xuICB0aGlzLnN0YWNrID0gc3RhY2s7XG59O1xuXG5SdW5lLkV2YWx1YXRlID0gZnVuY3Rpb24oY29udGV4dCA9IHt9KSB7XG4gIHRoaXMuX2FuYWx5emVycyA9IFtdO1xuICB0aGlzLl9pbnRlcnByZXRlciA9IG51bGw7XG4gIHRoaXMuX2NvbnRleHQgPSBjb250ZXh0O1xufTtcblxuLyoqXG4gKiBBbmFseXplciBjb3VsZCByZWNlaXZlIHRoZSBzdGFjayBjaGFuZ2UgZnJvbSAnUnVuZSNldmFsdWF0ZScsXG4gKiBhbmQgaXQgd291bGQgYmUgY2FsbGVkIHdpdGggdGhlIGFyZ3VtZW50cyBhcyB0aGUgZnVuY3Rpb24gZGVzY3JpYmVzOlxuICpcbiAqICAgICBSdW5lLnByb3RvdHlwZS5ldmFsdWF0ZSgoY29udGV4dCwgY2hhbmdlLCBzdGFjaykgPT4ge1xuICogICAgICAgIC8vIC4uLlxuICogICAgIH0pO1xuICpcbiAqIFNvIHRoZSBhbmFseXplciBjb3VsZCBiZTpcbiAqXG4gKiAgICBmdW5jdGlvbihjb250ZXh0LCBjaGFuZ2UsIHN0YWNrKSB7XG4gKiAgICAgIC8vIERvIHNvbWUgY2hlY2sgYW5kIG1heWJlIGNoYW5nZWQgdGhlIGNvbnRleHQuXG4gKiAgICAgIC8vIFRoZSBuZXh0IGFuYWx5emVyIHRvIHRoZSBpbnRlcnByZXRlciB3b3VsZCBhY2NlcHQgdGhlIGFsdGVybmF0ZWRcbiAqICAgICAgLy8gY29udGV4dCBhcyB0aGUgYXJndW1lbnQgJ2NvbnRleHQnLlxuICogICAgICBjb250ZXh0LnNvbWVGbGFnID0gdHJ1ZTtcbiAqICAgICAgLy8gV2hlbiB0aGVyZSBpcyB3cm9uZywgdGhyb3cgaXQuXG4gKiAgICAgIHRocm93IG5ldyBFcnJvcignU29tZSBhbmFseXppbmcgZXJyb3InKTtcbiAqICAgIH07XG4gKlxuICogTm90ZSB0aGF0IHRoZSBhbmFseXplciAoJ2EnKSB3b3VsZCBiZSBpbnZva2VkIHdpdGggZW1wdHkgJ3RoaXMnIG9iamVjdCxcbiAqIHNvIHRoZSBmdW5jdGlvbiByZWxpZXMgb24gJ3RoaXMnIHNob3VsZCBiaW5kIGl0c2VsZiBmaXJzdC5cbiAqL1xuUnVuZS5FdmFsdWF0ZS5wcm90b3R5cGUuYW5hbHl6ZXIgPSBmdW5jdGlvbihhKSB7XG4gIHRoaXMuX2FuYWx5emVycy5wdXNoKGEpO1xuICByZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogT25lIEV2YWx1YXRlIGNhbiBvbmx5IGhhdmUgb25lIGludGVycHJldGVyLCBhbmQgaXQgd291bGQgcmV0dXJuXG4gKiB0aGUgZnVuY3Rpb24gY291bGQgY29uc3VtZSBldmVyeSBzdGFjayBjaGFuZ2UgZnJvbSAnUnVuZSNldmFsdWF0ZScuXG4gKlxuICogVGhlIGNvZGUgaXMgYSBsaXR0bGUgY29tcGxpY2F0ZWQ6IHdlIGhhdmUgdHdvIGtpbmRzIG9mICdyZWR1Y2luZyc6XG4gKiBvbmUgaXMgdG8gcmVkdWNlIGFsbCBhbmFseXplcnMgd2l0aCB0aGUgc2luZ2xlIGluY29taW5nIGNoYW5nZSxcbiAqIGFub3RoZXIgaXMgdG8gcmVkdWNlIGFsbCBpbmNvbWluZyBjaGFuZ2VzIHdpdGggdGhpcyBhbmFseXplcnMgKyBpbnRlcnByZXRlci5cbiAqXG4gKiBUaGUgYW5hbHl6ZXIgYW5kIGludGVycHJldGVyIHNob3VsZCBjaGFuZ2UgdGhlIGNvbnRleHQsIHRvIG1lbW9yaXplIHRoZVxuICogc3RhdGVzIG9mIHRoZSBldmFsdWF0aW9uLiBUaGUgZGlmZmVyZW5jZSBpcyBpbnRlcnByZXRlciBzaG91bGQgcmV0dXJuIG9uZVxuICogbmV3IHN0YWNrIGlmIGl0IG5lZWRzIHRvIHVwZGF0ZSB0aGUgZXhpc3Rpbmcgb25lLiBUaGUgc3RhY2sgaXQgcmV0dXJucyB3b3VsZFxuICogcmVwbGFjZSB0aGUgZXhpc3Rpbmcgb25lLCBzbyBhbnl0aGluZyBzdGlsbCBpbiB0aGUgb2xkIG9uZSB3b3VsZCBiZSB3aXBlZFxuICogb3V0LiBUaGUgaW50ZXJwcmV0ZXIgY291bGQgcmV0dXJuIG5vdGhpbmcgKCd1bmRlZmluZWQnKSB0byBrZWVwIHRoZSBzdGFja1xuICogdW50b3VjaGVkLlxuICpcbiAqIFRoZSBhbmFseXplcnMgYW5kIGludGVycHJldGVyIGNvdWxkIGNoYW5nZSB0aGUgJ2NvbnRleHQnIHBhc3MgdG8gdGhlbS5cbiAqIEFuZCBzaW5jZSB3ZSBtYXkgdXBkYXRlIHRoZSBzdGFjayBhcyBhYm92ZSwgdGhlIGNvbnRleHQgc2hvdWxkIG1lbW9yaXplXG4gKiB0aG9zZSBpbmZvcm1hdGlvbiBub3QgdG8gYmUgb3ZlcndyaXR0ZW4gd2hpbGUgdGhlIHN0YWNrIGdldCB3aXBlZCBvdXQuXG4gKlxuICogQW5kIGlmIHRoZSBpbnRlcnByZXRpbmcgbm9kZSBpcyB0aGUgZXhpdCBub2RlIG9mIHRoZSBzZXNzaW9uLCBpbnRlcnByZXRlclxuICogc2hvdWxkIHJldHVybiBhIG5ldyBzdGFjayBjb250YWlucyBvbmx5IG9uZSBmaW5hbCByZXN1bHQgbm9kZS4gSWYgdGhlcmVcbiAqIGlzIG5vIHN1Y2ggbm9kZSwgdGhlIHJlc3VsdCBvZiB0aGlzIHNlc3Npb24gaXMgJ3VuZGVmaW5lZCcuXG4gKi9cblJ1bmUuRXZhbHVhdGUucHJvdG90eXBlLmludGVycHJldGVyID0gZnVuY3Rpb24oaW5wdCkge1xuICAvLyBUaGUgY3VzdG9taXplZCBsYW5ndWFnZSBzaG91bGQgZ2l2ZSB0aGUgZGVmYXVsdCBjb250ZXh0LlxuICByZXR1cm4gKGNvbnRleHQsIGNoYW5nZSwgc3RhY2spID0+IHtcbiAgICB0cnkge1xuICAgICAgLy8gQW5hbHl6ZXJzIGNvdWxkIGNoYW5nZSB0aGUgY29udGV4dC5cbiAgICAgIHRoaXMuX2FuYWx5emVycy5yZWR1Y2UoKGN0eCwgYW5hbHl6ZXIpID0+IHtcbiAgICAgICAgYW5hbHl6ZXIuY2FsbCh7fSwgY29udGV4dCwgY2hhbmdlLCBzdGFjayk7XG4gICAgICB9LCBjb250ZXh0KTtcbiAgICB9IGNhdGNoKGUpIHtcbiAgICAgIHRoaXMuX2hhbmRsZUVycm9yKGUsIGNvbnRleHQsIGNoYW5nZSwgc3RhY2spO1xuICAgIH1cbiAgICAvLyBBZnRlciBhbmFseXplIGl0LCBpbnRlcnByZXQgdGhlIG5vZGUgYW5kIHJldHVybiB0aGUgbmV3IHN0YWNrIChpZiBhbnkpLlxuICAgIHZhciBuZXdTdGFjayA9IGlucHQoY29udGV4dCwgY2hhbmdlLCBzdGFjayk7XG4gICAgcmV0dXJuIG5ld1N0YWNrO1xuICB9O1xufTtcblxuUnVuZS5FdmFsdWF0ZS5wcm90b3R5cGUuX2hhbmRsZUVycm9yID1cbmZ1bmN0aW9uKGVyciwgY29udGV4dCwgY2hhbmdlLCBzdGFjaykge1xuICAvLyBUT0RPOiBleHBhbmQgaXQgdG8gcHJvdmlkZSBtb3JlIHNvcGhpc3RpYyBkZWJ1Z2dpbmcgbWVzc2FnZS5cbiAgdGhyb3cgbmV3IEVycm9yKGBXaGVuIGNoYW5nZSAke2NoYW5nZS50eXBlfSBjb21lcyBlcnJvciAnJHtlcnJ9JyBoYXBwZW5lZGApO1xufTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL3J1bmUuanNcbiAqKi8iXSwic291cmNlUm9vdCI6IiJ9

/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _Promise = __webpack_require__(1)['default'];
	
	var _Array$from = __webpack_require__(61)['default'];
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	exports['default'] = Runtime;
	
	function Runtime() {}
	
	/**
	 * When the stack of DSL changes, evaluate the Language.Node.
	 */
	Runtime.prototype.onchange = function (instance, change, stack) {
	  // Since we don't need to keep things in stack until we have
	  // real analyzers, the 'onchange' handler would return empty stack
	  // to let the language runtime clear the stack every instruction.
	  this[change.type].apply(this, change.args);
	  // return empty 'handled' stack to let Rune keep no states of
	  // every instruction, except the result.
	  return [this.queue];
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
	
	Runtime.Context.prototype.returns = function (retvar) {
	  this.retvar = retvar;
	  this.deferred.resolve(retvar);
	};
	
	Runtime.Context.prototype.raise = function (err) {
	  // The error will be captured by main queue's `onProcessError`.
	  this.deferred.reject(err);
	};
	
	Runtime.Context.prototype.interrupt = function () {
	  var reason = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];
	
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
	    //throw err;
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
	  return this;
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
	  })['catch'](function (err) {
	    _this2.onProcessError(err);
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
	  })['catch'](function (err) {
	    _this3.onProcessError(err);
	  });
	};
	
	Runtime.prototype.match = function () {
	  var _this4 = this;
	
	  // Collect all 'case' Promises here.
	  this.queue = this.queue.then(function () {
	    _this4.matching = [];
	    _this4.matching.matched = false;
	  })['catch'](function (err) {
	    _this4.onProcessError(err);
	  });
	};
	
	// Matching end: execute all matching cases.
	Runtime.prototype.end = function () {
	  var _this5 = this;
	
	  this.queue = this.queue.then(function () {
	    _this5.matching = null;
	  })['catch'](function (err) {
	    _this5.onProcessError(err);
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
	  })['catch'](function (err) {
	    _this6.onProcessError(err);
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
	  })['catch'](function (err) {
	    _this7.onProcessError(err);
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
	  })['catch'](function (err) {
	    _this8.onProcessError(err);
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
	  })['catch'](function (err) {
	    _this9.onProcessError(err);
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
	  })['catch'](function (err) {
	    _this10.onProcessError(err);
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
	    })['catch'](function (err) {
	      _this11.onProcessError(err);
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

/***/ }
/******/ ]);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMDM1OGZkYTcxN2M4ZDdhZjY5ZDMiLCJ3ZWJwYWNrOi8vLy4vcGxheWxhbmctZGVtby5qcyIsIndlYnBhY2s6Ly8vLi4vfi9iYWJlbC1ydW50aW1lL2NvcmUtanMvcHJvbWlzZS5qcyIsIndlYnBhY2s6Ly8vLi4vfi9iYWJlbC1ydW50aW1lL34vY29yZS1qcy9saWJyYXJ5L2ZuL3Byb21pc2UuanMiLCJ3ZWJwYWNrOi8vLy4uL34vYmFiZWwtcnVudGltZS9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNi5zdHJpbmcuaXRlcmF0b3IuanMiLCJ3ZWJwYWNrOi8vLy4uL34vYmFiZWwtcnVudGltZS9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzLyQuc3RyaW5nLWF0LmpzIiwid2VicGFjazovLy8uLi9+L2JhYmVsLXJ1bnRpbWUvfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy8kLnRvLWludGVnZXIuanMiLCJ3ZWJwYWNrOi8vLy4uL34vYmFiZWwtcnVudGltZS9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzLyQuZGVmaW5lZC5qcyIsIndlYnBhY2s6Ly8vLi4vfi9iYWJlbC1ydW50aW1lL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvJC5pdGVyLWRlZmluZS5qcyIsIndlYnBhY2s6Ly8vLi4vfi9iYWJlbC1ydW50aW1lL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvJC5saWJyYXJ5LmpzIiwid2VicGFjazovLy8uLi9+L2JhYmVsLXJ1bnRpbWUvfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy8kLmRlZi5qcyIsIndlYnBhY2s6Ly8vLi4vfi9iYWJlbC1ydW50aW1lL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvJC5nbG9iYWwuanMiLCJ3ZWJwYWNrOi8vLy4uL34vYmFiZWwtcnVudGltZS9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzLyQuY29yZS5qcyIsIndlYnBhY2s6Ly8vLi4vfi9iYWJlbC1ydW50aW1lL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvJC5yZWRlZi5qcyIsIndlYnBhY2s6Ly8vLi4vfi9iYWJlbC1ydW50aW1lL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvJC5oaWRlLmpzIiwid2VicGFjazovLy8uLi9+L2JhYmVsLXJ1bnRpbWUvfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy8kLmpzIiwid2VicGFjazovLy8uLi9+L2JhYmVsLXJ1bnRpbWUvfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy8kLnByb3BlcnR5LWRlc2MuanMiLCJ3ZWJwYWNrOi8vLy4uL34vYmFiZWwtcnVudGltZS9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzLyQuc3VwcG9ydC1kZXNjLmpzIiwid2VicGFjazovLy8uLi9+L2JhYmVsLXJ1bnRpbWUvfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy8kLmZhaWxzLmpzIiwid2VicGFjazovLy8uLi9+L2JhYmVsLXJ1bnRpbWUvfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy8kLmhhcy5qcyIsIndlYnBhY2s6Ly8vLi4vfi9iYWJlbC1ydW50aW1lL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvJC53a3MuanMiLCJ3ZWJwYWNrOi8vLy4uL34vYmFiZWwtcnVudGltZS9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzLyQuc2hhcmVkLmpzIiwid2VicGFjazovLy8uLi9+L2JhYmVsLXJ1bnRpbWUvfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy8kLnVpZC5qcyIsIndlYnBhY2s6Ly8vLi4vfi9iYWJlbC1ydW50aW1lL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvJC5pdGVyYXRvcnMuanMiLCJ3ZWJwYWNrOi8vLy4uL34vYmFiZWwtcnVudGltZS9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzLyQuaXRlci1jcmVhdGUuanMiLCJ3ZWJwYWNrOi8vLy4uL34vYmFiZWwtcnVudGltZS9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzLyQudGFnLmpzIiwid2VicGFjazovLy8uLi9+L2JhYmVsLXJ1bnRpbWUvfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy8kLml0ZXItYnVnZ3kuanMiLCJ3ZWJwYWNrOi8vLy4uL34vYmFiZWwtcnVudGltZS9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL3dlYi5kb20uaXRlcmFibGUuanMiLCJ3ZWJwYWNrOi8vLy4uL34vYmFiZWwtcnVudGltZS9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNi5hcnJheS5pdGVyYXRvci5qcyIsIndlYnBhY2s6Ly8vLi4vfi9iYWJlbC1ydW50aW1lL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvJC51bnNjb3BlLmpzIiwid2VicGFjazovLy8uLi9+L2JhYmVsLXJ1bnRpbWUvfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy8kLml0ZXItc3RlcC5qcyIsIndlYnBhY2s6Ly8vLi4vfi9iYWJlbC1ydW50aW1lL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvJC50by1pb2JqZWN0LmpzIiwid2VicGFjazovLy8uLi9+L2JhYmVsLXJ1bnRpbWUvfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy8kLmlvYmplY3QuanMiLCJ3ZWJwYWNrOi8vLy4uL34vYmFiZWwtcnVudGltZS9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzLyQuY29mLmpzIiwid2VicGFjazovLy8uLi9+L2JhYmVsLXJ1bnRpbWUvfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczYucHJvbWlzZS5qcyIsIndlYnBhY2s6Ly8vLi4vfi9iYWJlbC1ydW50aW1lL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvJC5jdHguanMiLCJ3ZWJwYWNrOi8vLy4uL34vYmFiZWwtcnVudGltZS9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzLyQuYS1mdW5jdGlvbi5qcyIsIndlYnBhY2s6Ly8vLi4vfi9iYWJlbC1ydW50aW1lL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvJC5jbGFzc29mLmpzIiwid2VicGFjazovLy8uLi9+L2JhYmVsLXJ1bnRpbWUvfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy8kLmlzLW9iamVjdC5qcyIsIndlYnBhY2s6Ly8vLi4vfi9iYWJlbC1ydW50aW1lL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvJC5hbi1vYmplY3QuanMiLCJ3ZWJwYWNrOi8vLy4uL34vYmFiZWwtcnVudGltZS9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzLyQuc3RyaWN0LW5ldy5qcyIsIndlYnBhY2s6Ly8vLi4vfi9iYWJlbC1ydW50aW1lL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvJC5mb3Itb2YuanMiLCJ3ZWJwYWNrOi8vLy4uL34vYmFiZWwtcnVudGltZS9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzLyQuaXRlci1jYWxsLmpzIiwid2VicGFjazovLy8uLi9+L2JhYmVsLXJ1bnRpbWUvfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy8kLmlzLWFycmF5LWl0ZXIuanMiLCJ3ZWJwYWNrOi8vLy4uL34vYmFiZWwtcnVudGltZS9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzLyQudG8tbGVuZ3RoLmpzIiwid2VicGFjazovLy8uLi9+L2JhYmVsLXJ1bnRpbWUvfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9jb3JlLmdldC1pdGVyYXRvci1tZXRob2QuanMiLCJ3ZWJwYWNrOi8vLy4uL34vYmFiZWwtcnVudGltZS9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzLyQuc2V0LXByb3RvLmpzIiwid2VicGFjazovLy8uLi9+L2JhYmVsLXJ1bnRpbWUvfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy8kLnNhbWUuanMiLCJ3ZWJwYWNrOi8vLy4uL34vYmFiZWwtcnVudGltZS9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzLyQuc3BlY2llcy5qcyIsIndlYnBhY2s6Ly8vLi4vfi9iYWJlbC1ydW50aW1lL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvJC5taWNyb3Rhc2suanMiLCJ3ZWJwYWNrOi8vLy4uL34vYmFiZWwtcnVudGltZS9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzLyQudGFzay5qcyIsIndlYnBhY2s6Ly8vLi4vfi9iYWJlbC1ydW50aW1lL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvJC5pbnZva2UuanMiLCJ3ZWJwYWNrOi8vLy4uL34vYmFiZWwtcnVudGltZS9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzLyQuaHRtbC5qcyIsIndlYnBhY2s6Ly8vLi4vfi9iYWJlbC1ydW50aW1lL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvJC5kb20tY3JlYXRlLmpzIiwid2VicGFjazovLy8uLi9+L2JhYmVsLXJ1bnRpbWUvfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy8kLm1peC5qcyIsIndlYnBhY2s6Ly8vLi4vfi9iYWJlbC1ydW50aW1lL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvJC5pdGVyLWRldGVjdC5qcyIsIndlYnBhY2s6Ly8vLi4vfi9iYWJlbC1ydW50aW1lL2hlbHBlcnMvaW50ZXJvcC1yZXF1aXJlLWRlZmF1bHQuanMiLCJ3ZWJwYWNrOi8vLy4vcGxheWxhbmcuanMiLCJ3ZWJwYWNrOi8vLy4vcGxheWxhbmcuaW50ZXJmYWNlLmpzIiwid2VicGFjazovLy8uLi9kaXN0L3J1bmUuanMiLCJ3ZWJwYWNrOi8vLy4vcGxheWxhbmcucnVudGltZS5qcyIsIndlYnBhY2s6Ly8vLi4vfi9iYWJlbC1ydW50aW1lL2NvcmUtanMvYXJyYXkvZnJvbS5qcyIsIndlYnBhY2s6Ly8vLi4vfi9iYWJlbC1ydW50aW1lL34vY29yZS1qcy9saWJyYXJ5L2ZuL2FycmF5L2Zyb20uanMiLCJ3ZWJwYWNrOi8vLy4uL34vYmFiZWwtcnVudGltZS9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNi5hcnJheS5mcm9tLmpzIiwid2VicGFjazovLy8uLi9+L2JhYmVsLXJ1bnRpbWUvfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy8kLnRvLW9iamVjdC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FB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QUMsT0FBTyxDQUFDLENBQUMsR0FBQyxDQUFDLENBQUMsQ0FBQztJQUNsQixDQUFDLENBQUM7RUFDSixDQUFDLFFBQ0csQ0FBQyxVQUFDLENBQUM7VUFBSyxDQUFDLEtBQUssRUFBRTtFQUFBLENBQUUsQ0FBQyxFQUFFLENBQUMsVUFBQyxHQUFHLEVBQUUsQ0FBQyxFQUFLO0FBQ3JDLE1BQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDO0VBQ3RCLENBQUMsQ0FDSCxHQUFHLEVBQUUsQ0FDTCxJQUFJLENBQUMsVUFBQyxHQUFHLEVBQUUsQ0FBQyxFQUFLO0FBQUUsVUFBTyxDQUFDLEdBQUcsQ0FBQyxVQUFVLEVBQUUsQ0FBQyxDQUFDLENBQUUsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7RUFBQyxDQUFDLENBQ3BFLEdBQUcsQ0FBQyxVQUFDLEdBQUcsRUFBSztBQUFDLE1BQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFBRSxFQUM1QixVQUFDLEdBQUcsRUFBSztBQUNQLE1BQUcsQ0FBQyxPQUFPLENBQUMsYUFBWSxVQUFDLENBQUMsRUFBRSxDQUFDLEVBQUs7QUFDaEMsZUFBVSxDQUFDLFlBQU07QUFBRSxRQUFDLENBQUMsRUFBRSxDQUFDLENBQUM7TUFBRSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ3BDLENBQUMsQ0FBQyxDQUFDO0VBQ0wsQ0FBQyxDQUNMLEdBQUcsQ0FBQyxVQUFDLEdBQUcsRUFBRSxFQUFFLEVBQUs7QUFBQyxNQUFHLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUFFLEVBQzVDLFVBQUMsR0FBRyxFQUFFLEVBQUUsRUFBSztBQUNYLE1BQUcsQ0FBQyxPQUFPLENBQUMsYUFBWSxVQUFDLENBQUMsRUFBRSxDQUFDLEVBQUs7QUFDaEMsZUFBVSxDQUFDLFlBQU07QUFBRSxRQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FB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Ozs7Ozs7QUNoQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHIiwiZmlsZSI6InBsYXlsYW5nLWRlbW8uZGlzdC5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRpZDogbW9kdWxlSWQsXG4gXHRcdFx0bG9hZGVkOiBmYWxzZVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogd2VicGFjay9ib290c3RyYXAgMDM1OGZkYTcxN2M4ZDdhZjY5ZDNcbiAqKi8iLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCBQbGF5bGFuZyBmcm9tICcuL3BsYXlsYW5nLmpzJztcblxudmFyIHBsYXlsYW5nID0gbmV3IFBsYXlsYW5nKCk7XG5wbGF5bGFuZy5zdGFydCgpXG4gIC5uZXh0KChjdHgpID0+IHsgY29uc29sZS5sb2coJz4+Pj4+ICMwJyk7IGN0eC5yZXR1cm5zKDMpOyB9KS5hcygnYScpXG4gIC51bnRpbCgoeCkgPT4geCA9PT0gOSlcbiAgLmxvb3AoKGN0eCwgeCkgPT4ge1xuICAgIGN0eC5yZXR1cm5zKHggKyAxKTtcbiAgfSlcbiAgLnVudGlsKCh4KSA9PiB4ID09PSA5KVxuICAubG9vcCgoY3R4LCB4KSA9PiB7XG4gICAgY29uc29sZS5sb2coJz4+Pj4+Pj4gSSBzaG91bGQgbm90IHJ1biEnKTtcbiAgICBjdHgucmV0dXJucyh4ICsgMSk7XG4gIH0pXG4gIC51bnRpbCgoeCkgPT4geCA9PT0gMTApXG4gIC5sb29wKChjdHgsIHgpID0+IHtcbiAgICBjb25zb2xlLmxvZygnPj4+Pj4+PiBJIHNob3VsZCBydW4gb25jZScpO1xuICAgIGN0eC5yZXR1cm5zKHggKyAxKTtcbiAgfSlcbiAgLm5leHQoKGN0eCwgeCkgPT4geyBjb25zb2xlLmxvZygnPj4+Pj4gIzEnLCB4KTsgY3R4LnJldHVybnMoeCArIDQpO30pLmFzKCdiJylcbiAgLm5leHQoKGN0eCkgPT4ge1xuICAgIGNvbnNvbGUubG9nKCc+Pj4+Pj4+Pj4gIythYjogJywgY3R4LmEgKyBjdHguYik7XG4gICAgY3R4LnJldHVybnMoY3R4LmEgKyBjdHguYik7XG4gIH0pXG4gIC5tYXRjaCgpXG4gICAgLmNhc2UoKG4pID0+IG4gPCAxNykudG8oKGN0eCwgYSkgPT4geyBjdHgucmV0dXJucyhhICsgMSk7fSlcbiAgICAuY2FzZSgobikgPT4gbiA+IDE3ICkudG8oKGN0eCwgYikgPT4geyBjdHgucmV0dXJucyhiICsgOTk5KTt9KVxuICAgIC5jYXNlKChuKSA9PiBuID09PSAxNyApLnRvKChjdHgsIGMpID0+IHtcbiAgICAgIG5ldyBQcm9taXNlKChyLCBqKSA9PiB7XG4gICAgICAgIHNldFRpbWVvdXQociwgMjAwMCk7XG4gICAgICB9KS50aGVuKCgpID0+IHtcbiAgICAgICAgY3R4LnJldHVybnMoYysxKTtcbiAgICAgIH0pO1xuICAgIH0pXG4gICAgLmNhc2UoKG4pID0+IG4gPT09IDE3ICkudG8oKGN0eCwgZCkgPT4ge1xuICAgICAgY3R4LnJldHVybnMoZCAtIDI1NSk7XG4gICAgfSlcbiAgLmVuZCgpXG4gIC5uZXh0KChjdHgsIHgpID0+IHsgY29uc29sZS5sb2coJz4+Pj4+ICMyJywgeCk7IGN0eC5yZXR1cm5zKHggKyA1KTt9KVxuICAuYWxsKChjdHgpID0+IHtjdHgucmV0dXJucygxKTsgfSxcbiAgICAgIChjdHgpID0+IHtcbiAgICAgICAgY3R4LnJldHVybnMobmV3IFByb21pc2UoKHIsIGopID0+IHtcbiAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHsgcigyMCk7IH0sIDEwMDApO1xuICAgICAgICB9KSk7XG4gICAgICB9KVxuICAuYW55KChjdHgsIHJzKSA9PiB7Y3R4LnJldHVybnMocnNbMF0gKyByc1sxXSk7IH0sXG4gICAgICAoY3R4LCBycykgPT4ge1xuICAgICAgICBjdHgucmV0dXJucyhuZXcgUHJvbWlzZSgociwgaikgPT4ge1xuICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4geyByKHJzWzBdIC0gcnNbMV0pOyB9LCAxMDAwKTtcbiAgICAgICAgfSkpO1xuICAgICAgfSlcbiAgLm5leHQoKGN0eCwgcnMpID0+IHtcbiAgICBjb25zb2xlLmxvZygnPj4+Pj4+PiByczogJywgcnMpO1xuICAgIGN0eC5yZXR1cm5zKDEpO1xuICB9KVxuICAubmV4dCgoY3R4KSA9PiB7XG4gICAgY29uc29sZS5sb2coJz4+Pj4+IHRyeSB0byByYWlzZSBvciBpbnRlcnJ1cHQnKTtcbiAgICAvL2N0eC5yYWlzZSgnVFJZIFRPIFJBSVNFJyk7XG4gICAgY3R4LmludGVycnVwdCgnVEVTVCBJTlRFUlJVUFQnKTtcbiAgfSlcbiAgLm5leHQoKGN0eCwgcnMpID0+IHtcbiAgICBjb25zb2xlLmxvZygnPj4+Pj4+PiBzaG91bGQgbm90IHJ1biEnKTtcbiAgICBjdHgucmV0dXJucygxKTtcbiAgfSlcbiAgLm5leHQoKGN0eCwgcnMpID0+IHtcbiAgICBjb25zb2xlLmxvZygnPj4+Pj4+PiBzaG91bGQgbm90IHJ1biEnKTtcbiAgICBjdHgucmV0dXJucygxKTtcbiAgfSlcbiAgLmRvbmUoKTtcbiAgLy8gVE9ETzogZG9uZSAtLT4gcnVuIVxuXG4vKlxuXG5mbiA9IChjdHgsIGEsIGIpID0+IHtcbiAgdmFyIHAgPSBuZXcgUGxheWxhbmcoKVxuICBjdHgucmV0dXJucyhwLnN0YXJ0KCkubmV4dCgoY3R4KSA9PiB7XG4gICAgLy8gSXQncyBnb29kIHRvIHNoYWRvd2luZyB0aGUgb3V0ZXIgb25lLFxuICAgIC8vIHNpbmNlIHdlIGFscmVhZHkgYm9va2VkIHRvIHJldHVybiB0aGF0LlxuICAgIGN0eC5yZXR1cm5zKGEgKyBiKTtcbiAgfSkpO1xufTtcblxuLy8gRE9OVCBVU0U7IE5PVCBJTVBMRU1FTlRFRCBJTlRFTlRJT05BTExZXG5nbiA9IChjdHgsIGEsIGIpID0+IHtcbiAgdmFyIHAgPSBuZXcgUGxheWxhbmcoKVxuICBjdHgucmV0dXJucyhuZXcgUHJvbWlzZSgociwgaikgPT4ge1xuICAgIHNldFRpbWVvdXQocihhIC0gYiksIDEwMDApO1xuICB9KS50aGVuKChyZXN1bHQpID0+IHtcbiAgICByZXR1cm4gcmVzdWx0ICsgMTtcbiAgfSkpO1xufTtcblxuaG4gPSAoY3R4LCBhLCBiKSA9PiB7XG4gIHZhciBwID0gbmV3IFBsYXlsYW5nKClcbiAgKG5ldyBQcm9taXNlKChyLCBqKSA9PiB7XG4gICAgc2V0VGltZW91dChyKGEgLSBiKSwgMTAwMCk7XG4gIH0pLnRoZW4oKHJlc3VsdCkgPT4ge1xuICAgIC8vIFVzZSBhIGNsb3N1cmUgdG8gcmV0dXJuIGl0LFxuICAgIC8vIGp1c3QgbGlrZSBvdGhlciBvcmRpbmFyeSBmdW5jdGlvbnMuXG4gICAgY3R4LnJldHVybnMocmVzdWx0ICsgMSk7XG4gIH0pO1xufTtcblxuICovXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3BsYXlsYW5nLWRlbW8uanNcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IHsgXCJkZWZhdWx0XCI6IHJlcXVpcmUoXCJjb3JlLWpzL2xpYnJhcnkvZm4vcHJvbWlzZVwiKSwgX19lc01vZHVsZTogdHJ1ZSB9O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi4vfi9iYWJlbC1ydW50aW1lL2NvcmUtanMvcHJvbWlzZS5qc1xuICoqIG1vZHVsZSBpZCA9IDFcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsInJlcXVpcmUoJy4uL21vZHVsZXMvZXM2Lm9iamVjdC50by1zdHJpbmcnKTtcbnJlcXVpcmUoJy4uL21vZHVsZXMvZXM2LnN0cmluZy5pdGVyYXRvcicpO1xucmVxdWlyZSgnLi4vbW9kdWxlcy93ZWIuZG9tLml0ZXJhYmxlJyk7XG5yZXF1aXJlKCcuLi9tb2R1bGVzL2VzNi5wcm9taXNlJyk7XG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4uL21vZHVsZXMvJC5jb3JlJykuUHJvbWlzZTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4uL34vYmFiZWwtcnVudGltZS9+L2NvcmUtanMvbGlicmFyeS9mbi9wcm9taXNlLmpzXG4gKiogbW9kdWxlIGlkID0gMlxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xudmFyICRhdCAgPSByZXF1aXJlKCcuLyQuc3RyaW5nLWF0JykodHJ1ZSk7XG5cbi8vIDIxLjEuMy4yNyBTdHJpbmcucHJvdG90eXBlW0BAaXRlcmF0b3JdKClcbnJlcXVpcmUoJy4vJC5pdGVyLWRlZmluZScpKFN0cmluZywgJ1N0cmluZycsIGZ1bmN0aW9uKGl0ZXJhdGVkKXtcbiAgdGhpcy5fdCA9IFN0cmluZyhpdGVyYXRlZCk7IC8vIHRhcmdldFxuICB0aGlzLl9pID0gMDsgICAgICAgICAgICAgICAgLy8gbmV4dCBpbmRleFxuLy8gMjEuMS41LjIuMSAlU3RyaW5nSXRlcmF0b3JQcm90b3R5cGUlLm5leHQoKVxufSwgZnVuY3Rpb24oKXtcbiAgdmFyIE8gICAgID0gdGhpcy5fdFxuICAgICwgaW5kZXggPSB0aGlzLl9pXG4gICAgLCBwb2ludDtcbiAgaWYoaW5kZXggPj0gTy5sZW5ndGgpcmV0dXJuIHt2YWx1ZTogdW5kZWZpbmVkLCBkb25lOiB0cnVlfTtcbiAgcG9pbnQgPSAkYXQoTywgaW5kZXgpO1xuICB0aGlzLl9pICs9IHBvaW50Lmxlbmd0aDtcbiAgcmV0dXJuIHt2YWx1ZTogcG9pbnQsIGRvbmU6IGZhbHNlfTtcbn0pO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi4vfi9iYWJlbC1ydW50aW1lL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM2LnN0cmluZy5pdGVyYXRvci5qc1xuICoqIG1vZHVsZSBpZCA9IDRcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIi8vIHRydWUgIC0+IFN0cmluZyNhdFxuLy8gZmFsc2UgLT4gU3RyaW5nI2NvZGVQb2ludEF0XG52YXIgdG9JbnRlZ2VyID0gcmVxdWlyZSgnLi8kLnRvLWludGVnZXInKVxuICAsIGRlZmluZWQgICA9IHJlcXVpcmUoJy4vJC5kZWZpbmVkJyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKFRPX1NUUklORyl7XG4gIHJldHVybiBmdW5jdGlvbih0aGF0LCBwb3Mpe1xuICAgIHZhciBzID0gU3RyaW5nKGRlZmluZWQodGhhdCkpXG4gICAgICAsIGkgPSB0b0ludGVnZXIocG9zKVxuICAgICAgLCBsID0gcy5sZW5ndGhcbiAgICAgICwgYSwgYjtcbiAgICBpZihpIDwgMCB8fCBpID49IGwpcmV0dXJuIFRPX1NUUklORyA/ICcnIDogdW5kZWZpbmVkO1xuICAgIGEgPSBzLmNoYXJDb2RlQXQoaSk7XG4gICAgcmV0dXJuIGEgPCAweGQ4MDAgfHwgYSA+IDB4ZGJmZiB8fCBpICsgMSA9PT0gbFxuICAgICAgfHwgKGIgPSBzLmNoYXJDb2RlQXQoaSArIDEpKSA8IDB4ZGMwMCB8fCBiID4gMHhkZmZmXG4gICAgICAgID8gVE9fU1RSSU5HID8gcy5jaGFyQXQoaSkgOiBhXG4gICAgICAgIDogVE9fU1RSSU5HID8gcy5zbGljZShpLCBpICsgMikgOiAoYSAtIDB4ZDgwMCA8PCAxMCkgKyAoYiAtIDB4ZGMwMCkgKyAweDEwMDAwO1xuICB9O1xufTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4uL34vYmFiZWwtcnVudGltZS9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzLyQuc3RyaW5nLWF0LmpzXG4gKiogbW9kdWxlIGlkID0gNVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiLy8gNy4xLjQgVG9JbnRlZ2VyXG52YXIgY2VpbCAgPSBNYXRoLmNlaWxcbiAgLCBmbG9vciA9IE1hdGguZmxvb3I7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0KXtcbiAgcmV0dXJuIGlzTmFOKGl0ID0gK2l0KSA/IDAgOiAoaXQgPiAwID8gZmxvb3IgOiBjZWlsKShpdCk7XG59O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi4vfi9iYWJlbC1ydW50aW1lL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvJC50by1pbnRlZ2VyLmpzXG4gKiogbW9kdWxlIGlkID0gNlxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiLy8gNy4yLjEgUmVxdWlyZU9iamVjdENvZXJjaWJsZShhcmd1bWVudClcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXQpe1xuICBpZihpdCA9PSB1bmRlZmluZWQpdGhyb3cgVHlwZUVycm9yKFwiQ2FuJ3QgY2FsbCBtZXRob2Qgb24gIFwiICsgaXQpO1xuICByZXR1cm4gaXQ7XG59O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi4vfi9iYWJlbC1ydW50aW1lL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvJC5kZWZpbmVkLmpzXG4gKiogbW9kdWxlIGlkID0gN1xuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xudmFyIExJQlJBUlkgICAgICAgICA9IHJlcXVpcmUoJy4vJC5saWJyYXJ5JylcbiAgLCAkZGVmICAgICAgICAgICAgPSByZXF1aXJlKCcuLyQuZGVmJylcbiAgLCAkcmVkZWYgICAgICAgICAgPSByZXF1aXJlKCcuLyQucmVkZWYnKVxuICAsIGhpZGUgICAgICAgICAgICA9IHJlcXVpcmUoJy4vJC5oaWRlJylcbiAgLCBoYXMgICAgICAgICAgICAgPSByZXF1aXJlKCcuLyQuaGFzJylcbiAgLCBTWU1CT0xfSVRFUkFUT1IgPSByZXF1aXJlKCcuLyQud2tzJykoJ2l0ZXJhdG9yJylcbiAgLCBJdGVyYXRvcnMgICAgICAgPSByZXF1aXJlKCcuLyQuaXRlcmF0b3JzJylcbiAgLCBGRl9JVEVSQVRPUiAgICAgPSAnQEBpdGVyYXRvcidcbiAgLCBLRVlTICAgICAgICAgICAgPSAna2V5cydcbiAgLCBWQUxVRVMgICAgICAgICAgPSAndmFsdWVzJztcbnZhciByZXR1cm5UaGlzID0gZnVuY3Rpb24oKXsgcmV0dXJuIHRoaXM7IH07XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKEJhc2UsIE5BTUUsIENvbnN0cnVjdG9yLCBuZXh0LCBERUZBVUxULCBJU19TRVQsIEZPUkNFKXtcbiAgcmVxdWlyZSgnLi8kLml0ZXItY3JlYXRlJykoQ29uc3RydWN0b3IsIE5BTUUsIG5leHQpO1xuICB2YXIgY3JlYXRlTWV0aG9kID0gZnVuY3Rpb24oa2luZCl7XG4gICAgc3dpdGNoKGtpbmQpe1xuICAgICAgY2FzZSBLRVlTOiByZXR1cm4gZnVuY3Rpb24ga2V5cygpeyByZXR1cm4gbmV3IENvbnN0cnVjdG9yKHRoaXMsIGtpbmQpOyB9O1xuICAgICAgY2FzZSBWQUxVRVM6IHJldHVybiBmdW5jdGlvbiB2YWx1ZXMoKXsgcmV0dXJuIG5ldyBDb25zdHJ1Y3Rvcih0aGlzLCBraW5kKTsgfTtcbiAgICB9IHJldHVybiBmdW5jdGlvbiBlbnRyaWVzKCl7IHJldHVybiBuZXcgQ29uc3RydWN0b3IodGhpcywga2luZCk7IH07XG4gIH07XG4gIHZhciBUQUcgICAgICA9IE5BTUUgKyAnIEl0ZXJhdG9yJ1xuICAgICwgcHJvdG8gICAgPSBCYXNlLnByb3RvdHlwZVxuICAgICwgX25hdGl2ZSAgPSBwcm90b1tTWU1CT0xfSVRFUkFUT1JdIHx8IHByb3RvW0ZGX0lURVJBVE9SXSB8fCBERUZBVUxUICYmIHByb3RvW0RFRkFVTFRdXG4gICAgLCBfZGVmYXVsdCA9IF9uYXRpdmUgfHwgY3JlYXRlTWV0aG9kKERFRkFVTFQpXG4gICAgLCBtZXRob2RzLCBrZXk7XG4gIC8vIEZpeCBuYXRpdmVcbiAgaWYoX25hdGl2ZSl7XG4gICAgdmFyIEl0ZXJhdG9yUHJvdG90eXBlID0gcmVxdWlyZSgnLi8kJykuZ2V0UHJvdG8oX2RlZmF1bHQuY2FsbChuZXcgQmFzZSkpO1xuICAgIC8vIFNldCBAQHRvU3RyaW5nVGFnIHRvIG5hdGl2ZSBpdGVyYXRvcnNcbiAgICByZXF1aXJlKCcuLyQudGFnJykoSXRlcmF0b3JQcm90b3R5cGUsIFRBRywgdHJ1ZSk7XG4gICAgLy8gRkYgZml4XG4gICAgaWYoIUxJQlJBUlkgJiYgaGFzKHByb3RvLCBGRl9JVEVSQVRPUikpaGlkZShJdGVyYXRvclByb3RvdHlwZSwgU1lNQk9MX0lURVJBVE9SLCByZXR1cm5UaGlzKTtcbiAgfVxuICAvLyBEZWZpbmUgaXRlcmF0b3JcbiAgaWYoIUxJQlJBUlkgfHwgRk9SQ0UpaGlkZShwcm90bywgU1lNQk9MX0lURVJBVE9SLCBfZGVmYXVsdCk7XG4gIC8vIFBsdWcgZm9yIGxpYnJhcnlcbiAgSXRlcmF0b3JzW05BTUVdID0gX2RlZmF1bHQ7XG4gIEl0ZXJhdG9yc1tUQUddICA9IHJldHVyblRoaXM7XG4gIGlmKERFRkFVTFQpe1xuICAgIG1ldGhvZHMgPSB7XG4gICAgICBrZXlzOiAgICBJU19TRVQgICAgICAgICAgICA/IF9kZWZhdWx0IDogY3JlYXRlTWV0aG9kKEtFWVMpLFxuICAgICAgdmFsdWVzOiAgREVGQVVMVCA9PSBWQUxVRVMgPyBfZGVmYXVsdCA6IGNyZWF0ZU1ldGhvZChWQUxVRVMpLFxuICAgICAgZW50cmllczogREVGQVVMVCAhPSBWQUxVRVMgPyBfZGVmYXVsdCA6IGNyZWF0ZU1ldGhvZCgnZW50cmllcycpXG4gICAgfTtcbiAgICBpZihGT1JDRSlmb3Ioa2V5IGluIG1ldGhvZHMpe1xuICAgICAgaWYoIShrZXkgaW4gcHJvdG8pKSRyZWRlZihwcm90bywga2V5LCBtZXRob2RzW2tleV0pO1xuICAgIH0gZWxzZSAkZGVmKCRkZWYuUCArICRkZWYuRiAqIHJlcXVpcmUoJy4vJC5pdGVyLWJ1Z2d5JyksIE5BTUUsIG1ldGhvZHMpO1xuICB9XG59O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi4vfi9iYWJlbC1ydW50aW1lL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvJC5pdGVyLWRlZmluZS5qc1xuICoqIG1vZHVsZSBpZCA9IDhcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gdHJ1ZTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4uL34vYmFiZWwtcnVudGltZS9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzLyQubGlicmFyeS5qc1xuICoqIG1vZHVsZSBpZCA9IDlcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsInZhciBnbG9iYWwgICAgPSByZXF1aXJlKCcuLyQuZ2xvYmFsJylcbiAgLCBjb3JlICAgICAgPSByZXF1aXJlKCcuLyQuY29yZScpXG4gICwgUFJPVE9UWVBFID0gJ3Byb3RvdHlwZSc7XG52YXIgY3R4ID0gZnVuY3Rpb24oZm4sIHRoYXQpe1xuICByZXR1cm4gZnVuY3Rpb24oKXtcbiAgICByZXR1cm4gZm4uYXBwbHkodGhhdCwgYXJndW1lbnRzKTtcbiAgfTtcbn07XG52YXIgJGRlZiA9IGZ1bmN0aW9uKHR5cGUsIG5hbWUsIHNvdXJjZSl7XG4gIHZhciBrZXksIG93biwgb3V0LCBleHBcbiAgICAsIGlzR2xvYmFsID0gdHlwZSAmICRkZWYuR1xuICAgICwgaXNQcm90byAgPSB0eXBlICYgJGRlZi5QXG4gICAgLCB0YXJnZXQgICA9IGlzR2xvYmFsID8gZ2xvYmFsIDogdHlwZSAmICRkZWYuU1xuICAgICAgICA/IGdsb2JhbFtuYW1lXSA6IChnbG9iYWxbbmFtZV0gfHwge30pW1BST1RPVFlQRV1cbiAgICAsIGV4cG9ydHMgID0gaXNHbG9iYWwgPyBjb3JlIDogY29yZVtuYW1lXSB8fCAoY29yZVtuYW1lXSA9IHt9KTtcbiAgaWYoaXNHbG9iYWwpc291cmNlID0gbmFtZTtcbiAgZm9yKGtleSBpbiBzb3VyY2Upe1xuICAgIC8vIGNvbnRhaW5zIGluIG5hdGl2ZVxuICAgIG93biA9ICEodHlwZSAmICRkZWYuRikgJiYgdGFyZ2V0ICYmIGtleSBpbiB0YXJnZXQ7XG4gICAgaWYob3duICYmIGtleSBpbiBleHBvcnRzKWNvbnRpbnVlO1xuICAgIC8vIGV4cG9ydCBuYXRpdmUgb3IgcGFzc2VkXG4gICAgb3V0ID0gb3duID8gdGFyZ2V0W2tleV0gOiBzb3VyY2Vba2V5XTtcbiAgICAvLyBwcmV2ZW50IGdsb2JhbCBwb2xsdXRpb24gZm9yIG5hbWVzcGFjZXNcbiAgICBpZihpc0dsb2JhbCAmJiB0eXBlb2YgdGFyZ2V0W2tleV0gIT0gJ2Z1bmN0aW9uJylleHAgPSBzb3VyY2Vba2V5XTtcbiAgICAvLyBiaW5kIHRpbWVycyB0byBnbG9iYWwgZm9yIGNhbGwgZnJvbSBleHBvcnQgY29udGV4dFxuICAgIGVsc2UgaWYodHlwZSAmICRkZWYuQiAmJiBvd24pZXhwID0gY3R4KG91dCwgZ2xvYmFsKTtcbiAgICAvLyB3cmFwIGdsb2JhbCBjb25zdHJ1Y3RvcnMgZm9yIHByZXZlbnQgY2hhbmdlIHRoZW0gaW4gbGlicmFyeVxuICAgIGVsc2UgaWYodHlwZSAmICRkZWYuVyAmJiB0YXJnZXRba2V5XSA9PSBvdXQpIWZ1bmN0aW9uKEMpe1xuICAgICAgZXhwID0gZnVuY3Rpb24ocGFyYW0pe1xuICAgICAgICByZXR1cm4gdGhpcyBpbnN0YW5jZW9mIEMgPyBuZXcgQyhwYXJhbSkgOiBDKHBhcmFtKTtcbiAgICAgIH07XG4gICAgICBleHBbUFJPVE9UWVBFXSA9IENbUFJPVE9UWVBFXTtcbiAgICB9KG91dCk7XG4gICAgZWxzZSBleHAgPSBpc1Byb3RvICYmIHR5cGVvZiBvdXQgPT0gJ2Z1bmN0aW9uJyA/IGN0eChGdW5jdGlvbi5jYWxsLCBvdXQpIDogb3V0O1xuICAgIC8vIGV4cG9ydFxuICAgIGV4cG9ydHNba2V5XSA9IGV4cDtcbiAgICBpZihpc1Byb3RvKShleHBvcnRzW1BST1RPVFlQRV0gfHwgKGV4cG9ydHNbUFJPVE9UWVBFXSA9IHt9KSlba2V5XSA9IG91dDtcbiAgfVxufTtcbi8vIHR5cGUgYml0bWFwXG4kZGVmLkYgPSAxOyAgLy8gZm9yY2VkXG4kZGVmLkcgPSAyOyAgLy8gZ2xvYmFsXG4kZGVmLlMgPSA0OyAgLy8gc3RhdGljXG4kZGVmLlAgPSA4OyAgLy8gcHJvdG9cbiRkZWYuQiA9IDE2OyAvLyBiaW5kXG4kZGVmLlcgPSAzMjsgLy8gd3JhcFxubW9kdWxlLmV4cG9ydHMgPSAkZGVmO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi4vfi9iYWJlbC1ydW50aW1lL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvJC5kZWYuanNcbiAqKiBtb2R1bGUgaWQgPSAxMFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwidmFyIGdsb2JhbCA9IHR5cGVvZiBzZWxmICE9ICd1bmRlZmluZWQnICYmIHNlbGYuTWF0aCA9PSBNYXRoID8gc2VsZiA6IEZ1bmN0aW9uKCdyZXR1cm4gdGhpcycpKCk7XG5tb2R1bGUuZXhwb3J0cyA9IGdsb2JhbDtcbmlmKHR5cGVvZiBfX2cgPT0gJ251bWJlcicpX19nID0gZ2xvYmFsOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVuZGVmXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuLi9+L2JhYmVsLXJ1bnRpbWUvfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy8kLmdsb2JhbC5qc1xuICoqIG1vZHVsZSBpZCA9IDExXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJ2YXIgY29yZSA9IG1vZHVsZS5leHBvcnRzID0ge307XG5pZih0eXBlb2YgX19lID09ICdudW1iZXInKV9fZSA9IGNvcmU7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW5kZWZcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4uL34vYmFiZWwtcnVudGltZS9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzLyQuY29yZS5qc1xuICoqIG1vZHVsZSBpZCA9IDEyXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vJC5oaWRlJyk7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuLi9+L2JhYmVsLXJ1bnRpbWUvfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy8kLnJlZGVmLmpzXG4gKiogbW9kdWxlIGlkID0gMTNcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsInZhciAkICAgICAgICAgID0gcmVxdWlyZSgnLi8kJylcbiAgLCBjcmVhdGVEZXNjID0gcmVxdWlyZSgnLi8kLnByb3BlcnR5LWRlc2MnKTtcbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi8kLnN1cHBvcnQtZGVzYycpID8gZnVuY3Rpb24ob2JqZWN0LCBrZXksIHZhbHVlKXtcbiAgcmV0dXJuICQuc2V0RGVzYyhvYmplY3QsIGtleSwgY3JlYXRlRGVzYygxLCB2YWx1ZSkpO1xufSA6IGZ1bmN0aW9uKG9iamVjdCwga2V5LCB2YWx1ZSl7XG4gIG9iamVjdFtrZXldID0gdmFsdWU7XG4gIHJldHVybiBvYmplY3Q7XG59O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi4vfi9iYWJlbC1ydW50aW1lL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvJC5oaWRlLmpzXG4gKiogbW9kdWxlIGlkID0gMTRcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsInZhciAkT2JqZWN0ID0gT2JqZWN0O1xubW9kdWxlLmV4cG9ydHMgPSB7XG4gIGNyZWF0ZTogICAgICRPYmplY3QuY3JlYXRlLFxuICBnZXRQcm90bzogICAkT2JqZWN0LmdldFByb3RvdHlwZU9mLFxuICBpc0VudW06ICAgICB7fS5wcm9wZXJ0eUlzRW51bWVyYWJsZSxcbiAgZ2V0RGVzYzogICAgJE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IsXG4gIHNldERlc2M6ICAgICRPYmplY3QuZGVmaW5lUHJvcGVydHksXG4gIHNldERlc2NzOiAgICRPYmplY3QuZGVmaW5lUHJvcGVydGllcyxcbiAgZ2V0S2V5czogICAgJE9iamVjdC5rZXlzLFxuICBnZXROYW1lczogICAkT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMsXG4gIGdldFN5bWJvbHM6ICRPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzLFxuICBlYWNoOiAgICAgICBbXS5mb3JFYWNoXG59O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi4vfi9iYWJlbC1ydW50aW1lL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvJC5qc1xuICoqIG1vZHVsZSBpZCA9IDE1XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGJpdG1hcCwgdmFsdWUpe1xuICByZXR1cm4ge1xuICAgIGVudW1lcmFibGUgIDogIShiaXRtYXAgJiAxKSxcbiAgICBjb25maWd1cmFibGU6ICEoYml0bWFwICYgMiksXG4gICAgd3JpdGFibGUgICAgOiAhKGJpdG1hcCAmIDQpLFxuICAgIHZhbHVlICAgICAgIDogdmFsdWVcbiAgfTtcbn07XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuLi9+L2JhYmVsLXJ1bnRpbWUvfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy8kLnByb3BlcnR5LWRlc2MuanNcbiAqKiBtb2R1bGUgaWQgPSAxNlxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiLy8gVGhhbmsncyBJRTggZm9yIGhpcyBmdW5ueSBkZWZpbmVQcm9wZXJ0eVxubW9kdWxlLmV4cG9ydHMgPSAhcmVxdWlyZSgnLi8kLmZhaWxzJykoZnVuY3Rpb24oKXtcbiAgcmV0dXJuIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh7fSwgJ2EnLCB7Z2V0OiBmdW5jdGlvbigpeyByZXR1cm4gNzsgfX0pLmEgIT0gNztcbn0pO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi4vfi9iYWJlbC1ydW50aW1lL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvJC5zdXBwb3J0LWRlc2MuanNcbiAqKiBtb2R1bGUgaWQgPSAxN1xuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihleGVjKXtcbiAgdHJ5IHtcbiAgICByZXR1cm4gISFleGVjKCk7XG4gIH0gY2F0Y2goZSl7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbn07XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuLi9+L2JhYmVsLXJ1bnRpbWUvfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy8kLmZhaWxzLmpzXG4gKiogbW9kdWxlIGlkID0gMThcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsInZhciBoYXNPd25Qcm9wZXJ0eSA9IHt9Lmhhc093blByb3BlcnR5O1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCwga2V5KXtcbiAgcmV0dXJuIGhhc093blByb3BlcnR5LmNhbGwoaXQsIGtleSk7XG59O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi4vfi9iYWJlbC1ydW50aW1lL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvJC5oYXMuanNcbiAqKiBtb2R1bGUgaWQgPSAxOVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwidmFyIHN0b3JlICA9IHJlcXVpcmUoJy4vJC5zaGFyZWQnKSgnd2tzJylcbiAgLCBTeW1ib2wgPSByZXF1aXJlKCcuLyQuZ2xvYmFsJykuU3ltYm9sO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihuYW1lKXtcbiAgcmV0dXJuIHN0b3JlW25hbWVdIHx8IChzdG9yZVtuYW1lXSA9XG4gICAgU3ltYm9sICYmIFN5bWJvbFtuYW1lXSB8fCAoU3ltYm9sIHx8IHJlcXVpcmUoJy4vJC51aWQnKSkoJ1N5bWJvbC4nICsgbmFtZSkpO1xufTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4uL34vYmFiZWwtcnVudGltZS9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzLyQud2tzLmpzXG4gKiogbW9kdWxlIGlkID0gMjBcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsInZhciBnbG9iYWwgPSByZXF1aXJlKCcuLyQuZ2xvYmFsJylcbiAgLCBTSEFSRUQgPSAnX19jb3JlLWpzX3NoYXJlZF9fJ1xuICAsIHN0b3JlICA9IGdsb2JhbFtTSEFSRURdIHx8IChnbG9iYWxbU0hBUkVEXSA9IHt9KTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oa2V5KXtcbiAgcmV0dXJuIHN0b3JlW2tleV0gfHwgKHN0b3JlW2tleV0gPSB7fSk7XG59O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi4vfi9iYWJlbC1ydW50aW1lL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvJC5zaGFyZWQuanNcbiAqKiBtb2R1bGUgaWQgPSAyMVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwidmFyIGlkID0gMFxuICAsIHB4ID0gTWF0aC5yYW5kb20oKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oa2V5KXtcbiAgcmV0dXJuICdTeW1ib2woJy5jb25jYXQoa2V5ID09PSB1bmRlZmluZWQgPyAnJyA6IGtleSwgJylfJywgKCsraWQgKyBweCkudG9TdHJpbmcoMzYpKTtcbn07XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuLi9+L2JhYmVsLXJ1bnRpbWUvfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy8kLnVpZC5qc1xuICoqIG1vZHVsZSBpZCA9IDIyXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IHt9O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi4vfi9iYWJlbC1ydW50aW1lL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvJC5pdGVyYXRvcnMuanNcbiAqKiBtb2R1bGUgaWQgPSAyM1xuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xudmFyICQgPSByZXF1aXJlKCcuLyQnKVxuICAsIEl0ZXJhdG9yUHJvdG90eXBlID0ge307XG5cbi8vIDI1LjEuMi4xLjEgJUl0ZXJhdG9yUHJvdG90eXBlJVtAQGl0ZXJhdG9yXSgpXG5yZXF1aXJlKCcuLyQuaGlkZScpKEl0ZXJhdG9yUHJvdG90eXBlLCByZXF1aXJlKCcuLyQud2tzJykoJ2l0ZXJhdG9yJyksIGZ1bmN0aW9uKCl7IHJldHVybiB0aGlzOyB9KTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihDb25zdHJ1Y3RvciwgTkFNRSwgbmV4dCl7XG4gIENvbnN0cnVjdG9yLnByb3RvdHlwZSA9ICQuY3JlYXRlKEl0ZXJhdG9yUHJvdG90eXBlLCB7bmV4dDogcmVxdWlyZSgnLi8kLnByb3BlcnR5LWRlc2MnKSgxLG5leHQpfSk7XG4gIHJlcXVpcmUoJy4vJC50YWcnKShDb25zdHJ1Y3RvciwgTkFNRSArICcgSXRlcmF0b3InKTtcbn07XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuLi9+L2JhYmVsLXJ1bnRpbWUvfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy8kLml0ZXItY3JlYXRlLmpzXG4gKiogbW9kdWxlIGlkID0gMjRcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsInZhciBoYXMgID0gcmVxdWlyZSgnLi8kLmhhcycpXG4gICwgaGlkZSA9IHJlcXVpcmUoJy4vJC5oaWRlJylcbiAgLCBUQUcgID0gcmVxdWlyZSgnLi8kLndrcycpKCd0b1N0cmluZ1RhZycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0LCB0YWcsIHN0YXQpe1xuICBpZihpdCAmJiAhaGFzKGl0ID0gc3RhdCA/IGl0IDogaXQucHJvdG90eXBlLCBUQUcpKWhpZGUoaXQsIFRBRywgdGFnKTtcbn07XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuLi9+L2JhYmVsLXJ1bnRpbWUvfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy8kLnRhZy5qc1xuICoqIG1vZHVsZSBpZCA9IDI1XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIvLyBTYWZhcmkgaGFzIGJ1Z2d5IGl0ZXJhdG9ycyB3L28gYG5leHRgXG5tb2R1bGUuZXhwb3J0cyA9ICdrZXlzJyBpbiBbXSAmJiAhKCduZXh0JyBpbiBbXS5rZXlzKCkpO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi4vfi9iYWJlbC1ydW50aW1lL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvJC5pdGVyLWJ1Z2d5LmpzXG4gKiogbW9kdWxlIGlkID0gMjZcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsInJlcXVpcmUoJy4vZXM2LmFycmF5Lml0ZXJhdG9yJyk7XG52YXIgSXRlcmF0b3JzID0gcmVxdWlyZSgnLi8kLml0ZXJhdG9ycycpO1xuSXRlcmF0b3JzLk5vZGVMaXN0ID0gSXRlcmF0b3JzLkhUTUxDb2xsZWN0aW9uID0gSXRlcmF0b3JzLkFycmF5O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi4vfi9iYWJlbC1ydW50aW1lL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvd2ViLmRvbS5pdGVyYWJsZS5qc1xuICoqIG1vZHVsZSBpZCA9IDI3XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIndXNlIHN0cmljdCc7XG52YXIgc2V0VW5zY29wZSA9IHJlcXVpcmUoJy4vJC51bnNjb3BlJylcbiAgLCBzdGVwICAgICAgID0gcmVxdWlyZSgnLi8kLml0ZXItc3RlcCcpXG4gICwgSXRlcmF0b3JzICA9IHJlcXVpcmUoJy4vJC5pdGVyYXRvcnMnKVxuICAsIHRvSU9iamVjdCAgPSByZXF1aXJlKCcuLyQudG8taW9iamVjdCcpO1xuXG4vLyAyMi4xLjMuNCBBcnJheS5wcm90b3R5cGUuZW50cmllcygpXG4vLyAyMi4xLjMuMTMgQXJyYXkucHJvdG90eXBlLmtleXMoKVxuLy8gMjIuMS4zLjI5IEFycmF5LnByb3RvdHlwZS52YWx1ZXMoKVxuLy8gMjIuMS4zLjMwIEFycmF5LnByb3RvdHlwZVtAQGl0ZXJhdG9yXSgpXG5yZXF1aXJlKCcuLyQuaXRlci1kZWZpbmUnKShBcnJheSwgJ0FycmF5JywgZnVuY3Rpb24oaXRlcmF0ZWQsIGtpbmQpe1xuICB0aGlzLl90ID0gdG9JT2JqZWN0KGl0ZXJhdGVkKTsgLy8gdGFyZ2V0XG4gIHRoaXMuX2kgPSAwOyAgICAgICAgICAgICAgICAgICAvLyBuZXh0IGluZGV4XG4gIHRoaXMuX2sgPSBraW5kOyAgICAgICAgICAgICAgICAvLyBraW5kXG4vLyAyMi4xLjUuMi4xICVBcnJheUl0ZXJhdG9yUHJvdG90eXBlJS5uZXh0KClcbn0sIGZ1bmN0aW9uKCl7XG4gIHZhciBPICAgICA9IHRoaXMuX3RcbiAgICAsIGtpbmQgID0gdGhpcy5fa1xuICAgICwgaW5kZXggPSB0aGlzLl9pKys7XG4gIGlmKCFPIHx8IGluZGV4ID49IE8ubGVuZ3RoKXtcbiAgICB0aGlzLl90ID0gdW5kZWZpbmVkO1xuICAgIHJldHVybiBzdGVwKDEpO1xuICB9XG4gIGlmKGtpbmQgPT0gJ2tleXMnICApcmV0dXJuIHN0ZXAoMCwgaW5kZXgpO1xuICBpZihraW5kID09ICd2YWx1ZXMnKXJldHVybiBzdGVwKDAsIE9baW5kZXhdKTtcbiAgcmV0dXJuIHN0ZXAoMCwgW2luZGV4LCBPW2luZGV4XV0pO1xufSwgJ3ZhbHVlcycpO1xuXG4vLyBhcmd1bWVudHNMaXN0W0BAaXRlcmF0b3JdIGlzICVBcnJheVByb3RvX3ZhbHVlcyUgKDkuNC40LjYsIDkuNC40LjcpXG5JdGVyYXRvcnMuQXJndW1lbnRzID0gSXRlcmF0b3JzLkFycmF5O1xuXG5zZXRVbnNjb3BlKCdrZXlzJyk7XG5zZXRVbnNjb3BlKCd2YWx1ZXMnKTtcbnNldFVuc2NvcGUoJ2VudHJpZXMnKTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4uL34vYmFiZWwtcnVudGltZS9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNi5hcnJheS5pdGVyYXRvci5qc1xuICoqIG1vZHVsZSBpZCA9IDI4XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKCl7IC8qIGVtcHR5ICovIH07XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuLi9+L2JhYmVsLXJ1bnRpbWUvfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy8kLnVuc2NvcGUuanNcbiAqKiBtb2R1bGUgaWQgPSAyOVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihkb25lLCB2YWx1ZSl7XG4gIHJldHVybiB7dmFsdWU6IHZhbHVlLCBkb25lOiAhIWRvbmV9O1xufTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4uL34vYmFiZWwtcnVudGltZS9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzLyQuaXRlci1zdGVwLmpzXG4gKiogbW9kdWxlIGlkID0gMzBcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIi8vIHRvIGluZGV4ZWQgb2JqZWN0LCB0b09iamVjdCB3aXRoIGZhbGxiYWNrIGZvciBub24tYXJyYXktbGlrZSBFUzMgc3RyaW5nc1xyXG52YXIgSU9iamVjdCA9IHJlcXVpcmUoJy4vJC5pb2JqZWN0JylcclxuICAsIGRlZmluZWQgPSByZXF1aXJlKCcuLyQuZGVmaW5lZCcpO1xyXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0KXtcclxuICByZXR1cm4gSU9iamVjdChkZWZpbmVkKGl0KSk7XHJcbn07XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuLi9+L2JhYmVsLXJ1bnRpbWUvfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy8kLnRvLWlvYmplY3QuanNcbiAqKiBtb2R1bGUgaWQgPSAzMVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiLy8gaW5kZXhlZCBvYmplY3QsIGZhbGxiYWNrIGZvciBub24tYXJyYXktbGlrZSBFUzMgc3RyaW5nc1xudmFyIGNvZiA9IHJlcXVpcmUoJy4vJC5jb2YnKTtcbm1vZHVsZS5leHBvcnRzID0gMCBpbiBPYmplY3QoJ3onKSA/IE9iamVjdCA6IGZ1bmN0aW9uKGl0KXtcbiAgcmV0dXJuIGNvZihpdCkgPT0gJ1N0cmluZycgPyBpdC5zcGxpdCgnJykgOiBPYmplY3QoaXQpO1xufTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4uL34vYmFiZWwtcnVudGltZS9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzLyQuaW9iamVjdC5qc1xuICoqIG1vZHVsZSBpZCA9IDMyXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJ2YXIgdG9TdHJpbmcgPSB7fS50b1N0cmluZztcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCl7XG4gIHJldHVybiB0b1N0cmluZy5jYWxsKGl0KS5zbGljZSg4LCAtMSk7XG59O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi4vfi9iYWJlbC1ydW50aW1lL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvJC5jb2YuanNcbiAqKiBtb2R1bGUgaWQgPSAzM1xuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xudmFyICQgICAgICAgICAgPSByZXF1aXJlKCcuLyQnKVxuICAsIExJQlJBUlkgICAgPSByZXF1aXJlKCcuLyQubGlicmFyeScpXG4gICwgZ2xvYmFsICAgICA9IHJlcXVpcmUoJy4vJC5nbG9iYWwnKVxuICAsIGN0eCAgICAgICAgPSByZXF1aXJlKCcuLyQuY3R4JylcbiAgLCBjbGFzc29mICAgID0gcmVxdWlyZSgnLi8kLmNsYXNzb2YnKVxuICAsICRkZWYgICAgICAgPSByZXF1aXJlKCcuLyQuZGVmJylcbiAgLCBpc09iamVjdCAgID0gcmVxdWlyZSgnLi8kLmlzLW9iamVjdCcpXG4gICwgYW5PYmplY3QgICA9IHJlcXVpcmUoJy4vJC5hbi1vYmplY3QnKVxuICAsIGFGdW5jdGlvbiAgPSByZXF1aXJlKCcuLyQuYS1mdW5jdGlvbicpXG4gICwgc3RyaWN0TmV3ICA9IHJlcXVpcmUoJy4vJC5zdHJpY3QtbmV3JylcbiAgLCBmb3JPZiAgICAgID0gcmVxdWlyZSgnLi8kLmZvci1vZicpXG4gICwgc2V0UHJvdG8gICA9IHJlcXVpcmUoJy4vJC5zZXQtcHJvdG8nKS5zZXRcbiAgLCBzYW1lICAgICAgID0gcmVxdWlyZSgnLi8kLnNhbWUnKVxuICAsIHNwZWNpZXMgICAgPSByZXF1aXJlKCcuLyQuc3BlY2llcycpXG4gICwgU1BFQ0lFUyAgICA9IHJlcXVpcmUoJy4vJC53a3MnKSgnc3BlY2llcycpXG4gICwgUkVDT1JEICAgICA9IHJlcXVpcmUoJy4vJC51aWQnKSgncmVjb3JkJylcbiAgLCBhc2FwICAgICAgID0gcmVxdWlyZSgnLi8kLm1pY3JvdGFzaycpXG4gICwgUFJPTUlTRSAgICA9ICdQcm9taXNlJ1xuICAsIHByb2Nlc3MgICAgPSBnbG9iYWwucHJvY2Vzc1xuICAsIGlzTm9kZSAgICAgPSBjbGFzc29mKHByb2Nlc3MpID09ICdwcm9jZXNzJ1xuICAsIFAgICAgICAgICAgPSBnbG9iYWxbUFJPTUlTRV1cbiAgLCBXcmFwcGVyO1xuXG52YXIgdGVzdFJlc29sdmUgPSBmdW5jdGlvbihzdWIpe1xuICB2YXIgdGVzdCA9IG5ldyBQKGZ1bmN0aW9uKCl7fSk7XG4gIGlmKHN1Yil0ZXN0LmNvbnN0cnVjdG9yID0gT2JqZWN0O1xuICByZXR1cm4gUC5yZXNvbHZlKHRlc3QpID09PSB0ZXN0O1xufTtcblxudmFyIHVzZU5hdGl2ZSA9IGZ1bmN0aW9uKCl7XG4gIHZhciB3b3JrcyA9IGZhbHNlO1xuICBmdW5jdGlvbiBQMih4KXtcbiAgICB2YXIgc2VsZiA9IG5ldyBQKHgpO1xuICAgIHNldFByb3RvKHNlbGYsIFAyLnByb3RvdHlwZSk7XG4gICAgcmV0dXJuIHNlbGY7XG4gIH1cbiAgdHJ5IHtcbiAgICB3b3JrcyA9IFAgJiYgUC5yZXNvbHZlICYmIHRlc3RSZXNvbHZlKCk7XG4gICAgc2V0UHJvdG8oUDIsIFApO1xuICAgIFAyLnByb3RvdHlwZSA9ICQuY3JlYXRlKFAucHJvdG90eXBlLCB7Y29uc3RydWN0b3I6IHt2YWx1ZTogUDJ9fSk7XG4gICAgLy8gYWN0dWFsIEZpcmVmb3ggaGFzIGJyb2tlbiBzdWJjbGFzcyBzdXBwb3J0LCB0ZXN0IHRoYXRcbiAgICBpZighKFAyLnJlc29sdmUoNSkudGhlbihmdW5jdGlvbigpe30pIGluc3RhbmNlb2YgUDIpKXtcbiAgICAgIHdvcmtzID0gZmFsc2U7XG4gICAgfVxuICAgIC8vIGFjdHVhbCBWOCBidWcsIGh0dHBzOi8vY29kZS5nb29nbGUuY29tL3AvdjgvaXNzdWVzL2RldGFpbD9pZD00MTYyXG4gICAgaWYod29ya3MgJiYgcmVxdWlyZSgnLi8kLnN1cHBvcnQtZGVzYycpKXtcbiAgICAgIHZhciB0aGVuYWJsZVRoZW5Hb3R0ZW4gPSBmYWxzZTtcbiAgICAgIFAucmVzb2x2ZSgkLnNldERlc2Moe30sICd0aGVuJywge1xuICAgICAgICBnZXQ6IGZ1bmN0aW9uKCl7IHRoZW5hYmxlVGhlbkdvdHRlbiA9IHRydWU7IH1cbiAgICAgIH0pKTtcbiAgICAgIHdvcmtzID0gdGhlbmFibGVUaGVuR290dGVuO1xuICAgIH1cbiAgfSBjYXRjaChlKXsgd29ya3MgPSBmYWxzZTsgfVxuICByZXR1cm4gd29ya3M7XG59KCk7XG5cbi8vIGhlbHBlcnNcbnZhciBpc1Byb21pc2UgPSBmdW5jdGlvbihpdCl7XG4gIHJldHVybiBpc09iamVjdChpdCkgJiYgKHVzZU5hdGl2ZSA/IGNsYXNzb2YoaXQpID09ICdQcm9taXNlJyA6IFJFQ09SRCBpbiBpdCk7XG59O1xudmFyIHNhbWVDb25zdHJ1Y3RvciA9IGZ1bmN0aW9uKGEsIGIpe1xuICAvLyBsaWJyYXJ5IHdyYXBwZXIgc3BlY2lhbCBjYXNlXG4gIGlmKExJQlJBUlkgJiYgYSA9PT0gUCAmJiBiID09PSBXcmFwcGVyKXJldHVybiB0cnVlO1xuICByZXR1cm4gc2FtZShhLCBiKTtcbn07XG52YXIgZ2V0Q29uc3RydWN0b3IgPSBmdW5jdGlvbihDKXtcbiAgdmFyIFMgPSBhbk9iamVjdChDKVtTUEVDSUVTXTtcbiAgcmV0dXJuIFMgIT0gdW5kZWZpbmVkID8gUyA6IEM7XG59O1xudmFyIGlzVGhlbmFibGUgPSBmdW5jdGlvbihpdCl7XG4gIHZhciB0aGVuO1xuICByZXR1cm4gaXNPYmplY3QoaXQpICYmIHR5cGVvZiAodGhlbiA9IGl0LnRoZW4pID09ICdmdW5jdGlvbicgPyB0aGVuIDogZmFsc2U7XG59O1xudmFyIG5vdGlmeSA9IGZ1bmN0aW9uKHJlY29yZCwgaXNSZWplY3Qpe1xuICBpZihyZWNvcmQubilyZXR1cm47XG4gIHJlY29yZC5uID0gdHJ1ZTtcbiAgdmFyIGNoYWluID0gcmVjb3JkLmM7XG4gIGFzYXAoZnVuY3Rpb24oKXtcbiAgICB2YXIgdmFsdWUgPSByZWNvcmQudlxuICAgICAgLCBvayAgICA9IHJlY29yZC5zID09IDFcbiAgICAgICwgaSAgICAgPSAwO1xuICAgIHZhciBydW4gPSBmdW5jdGlvbihyZWFjdCl7XG4gICAgICB2YXIgY2IgPSBvayA/IHJlYWN0Lm9rIDogcmVhY3QuZmFpbFxuICAgICAgICAsIHJldCwgdGhlbjtcbiAgICAgIHRyeSB7XG4gICAgICAgIGlmKGNiKXtcbiAgICAgICAgICBpZighb2spcmVjb3JkLmggPSB0cnVlO1xuICAgICAgICAgIHJldCA9IGNiID09PSB0cnVlID8gdmFsdWUgOiBjYih2YWx1ZSk7XG4gICAgICAgICAgaWYocmV0ID09PSByZWFjdC5QKXtcbiAgICAgICAgICAgIHJlYWN0LnJlaihUeXBlRXJyb3IoJ1Byb21pc2UtY2hhaW4gY3ljbGUnKSk7XG4gICAgICAgICAgfSBlbHNlIGlmKHRoZW4gPSBpc1RoZW5hYmxlKHJldCkpe1xuICAgICAgICAgICAgdGhlbi5jYWxsKHJldCwgcmVhY3QucmVzLCByZWFjdC5yZWopO1xuICAgICAgICAgIH0gZWxzZSByZWFjdC5yZXMocmV0KTtcbiAgICAgICAgfSBlbHNlIHJlYWN0LnJlaih2YWx1ZSk7XG4gICAgICB9IGNhdGNoKGVycil7XG4gICAgICAgIHJlYWN0LnJlaihlcnIpO1xuICAgICAgfVxuICAgIH07XG4gICAgd2hpbGUoY2hhaW4ubGVuZ3RoID4gaSlydW4oY2hhaW5baSsrXSk7IC8vIHZhcmlhYmxlIGxlbmd0aCAtIGNhbid0IHVzZSBmb3JFYWNoXG4gICAgY2hhaW4ubGVuZ3RoID0gMDtcbiAgICByZWNvcmQubiA9IGZhbHNlO1xuICAgIGlmKGlzUmVqZWN0KXNldFRpbWVvdXQoZnVuY3Rpb24oKXtcbiAgICAgIGFzYXAoZnVuY3Rpb24oKXtcbiAgICAgICAgaWYoaXNVbmhhbmRsZWQocmVjb3JkLnApKXtcbiAgICAgICAgICBpZihpc05vZGUpe1xuICAgICAgICAgICAgcHJvY2Vzcy5lbWl0KCd1bmhhbmRsZWRSZWplY3Rpb24nLCB2YWx1ZSwgcmVjb3JkLnApO1xuICAgICAgICAgIH0gZWxzZSBpZihnbG9iYWwuY29uc29sZSAmJiBjb25zb2xlLmVycm9yKXtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ1VuaGFuZGxlZCBwcm9taXNlIHJlamVjdGlvbicsIHZhbHVlKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmVjb3JkLmEgPSB1bmRlZmluZWQ7XG4gICAgICB9KTtcbiAgICB9LCAxKTtcbiAgfSk7XG59O1xudmFyIGlzVW5oYW5kbGVkID0gZnVuY3Rpb24ocHJvbWlzZSl7XG4gIHZhciByZWNvcmQgPSBwcm9taXNlW1JFQ09SRF1cbiAgICAsIGNoYWluICA9IHJlY29yZC5hIHx8IHJlY29yZC5jXG4gICAgLCBpICAgICAgPSAwXG4gICAgLCByZWFjdDtcbiAgaWYocmVjb3JkLmgpcmV0dXJuIGZhbHNlO1xuICB3aGlsZShjaGFpbi5sZW5ndGggPiBpKXtcbiAgICByZWFjdCA9IGNoYWluW2krK107XG4gICAgaWYocmVhY3QuZmFpbCB8fCAhaXNVbmhhbmRsZWQocmVhY3QuUCkpcmV0dXJuIGZhbHNlO1xuICB9IHJldHVybiB0cnVlO1xufTtcbnZhciAkcmVqZWN0ID0gZnVuY3Rpb24odmFsdWUpe1xuICB2YXIgcmVjb3JkID0gdGhpcztcbiAgaWYocmVjb3JkLmQpcmV0dXJuO1xuICByZWNvcmQuZCA9IHRydWU7XG4gIHJlY29yZCA9IHJlY29yZC5yIHx8IHJlY29yZDsgLy8gdW53cmFwXG4gIHJlY29yZC52ID0gdmFsdWU7XG4gIHJlY29yZC5zID0gMjtcbiAgcmVjb3JkLmEgPSByZWNvcmQuYy5zbGljZSgpO1xuICBub3RpZnkocmVjb3JkLCB0cnVlKTtcbn07XG52YXIgJHJlc29sdmUgPSBmdW5jdGlvbih2YWx1ZSl7XG4gIHZhciByZWNvcmQgPSB0aGlzXG4gICAgLCB0aGVuO1xuICBpZihyZWNvcmQuZClyZXR1cm47XG4gIHJlY29yZC5kID0gdHJ1ZTtcbiAgcmVjb3JkID0gcmVjb3JkLnIgfHwgcmVjb3JkOyAvLyB1bndyYXBcbiAgdHJ5IHtcbiAgICBpZih0aGVuID0gaXNUaGVuYWJsZSh2YWx1ZSkpe1xuICAgICAgYXNhcChmdW5jdGlvbigpe1xuICAgICAgICB2YXIgd3JhcHBlciA9IHtyOiByZWNvcmQsIGQ6IGZhbHNlfTsgLy8gd3JhcFxuICAgICAgICB0cnkge1xuICAgICAgICAgIHRoZW4uY2FsbCh2YWx1ZSwgY3R4KCRyZXNvbHZlLCB3cmFwcGVyLCAxKSwgY3R4KCRyZWplY3QsIHdyYXBwZXIsIDEpKTtcbiAgICAgICAgfSBjYXRjaChlKXtcbiAgICAgICAgICAkcmVqZWN0LmNhbGwod3JhcHBlciwgZSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICByZWNvcmQudiA9IHZhbHVlO1xuICAgICAgcmVjb3JkLnMgPSAxO1xuICAgICAgbm90aWZ5KHJlY29yZCwgZmFsc2UpO1xuICAgIH1cbiAgfSBjYXRjaChlKXtcbiAgICAkcmVqZWN0LmNhbGwoe3I6IHJlY29yZCwgZDogZmFsc2V9LCBlKTsgLy8gd3JhcFxuICB9XG59O1xuXG4vLyBjb25zdHJ1Y3RvciBwb2x5ZmlsbFxuaWYoIXVzZU5hdGl2ZSl7XG4gIC8vIDI1LjQuMy4xIFByb21pc2UoZXhlY3V0b3IpXG4gIFAgPSBmdW5jdGlvbiBQcm9taXNlKGV4ZWN1dG9yKXtcbiAgICBhRnVuY3Rpb24oZXhlY3V0b3IpO1xuICAgIHZhciByZWNvcmQgPSB7XG4gICAgICBwOiBzdHJpY3ROZXcodGhpcywgUCwgUFJPTUlTRSksICAgICAgICAgLy8gPC0gcHJvbWlzZVxuICAgICAgYzogW10sICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIDwtIGF3YWl0aW5nIHJlYWN0aW9uc1xuICAgICAgYTogdW5kZWZpbmVkLCAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIDwtIGNoZWNrZWQgaW4gaXNVbmhhbmRsZWQgcmVhY3Rpb25zXG4gICAgICBzOiAwLCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gPC0gc3RhdGVcbiAgICAgIGQ6IGZhbHNlLCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyA8LSBkb25lXG4gICAgICB2OiB1bmRlZmluZWQsICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gPC0gdmFsdWVcbiAgICAgIGg6IGZhbHNlLCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyA8LSBoYW5kbGVkIHJlamVjdGlvblxuICAgICAgbjogZmFsc2UgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIDwtIG5vdGlmeVxuICAgIH07XG4gICAgdGhpc1tSRUNPUkRdID0gcmVjb3JkO1xuICAgIHRyeSB7XG4gICAgICBleGVjdXRvcihjdHgoJHJlc29sdmUsIHJlY29yZCwgMSksIGN0eCgkcmVqZWN0LCByZWNvcmQsIDEpKTtcbiAgICB9IGNhdGNoKGVycil7XG4gICAgICAkcmVqZWN0LmNhbGwocmVjb3JkLCBlcnIpO1xuICAgIH1cbiAgfTtcbiAgcmVxdWlyZSgnLi8kLm1peCcpKFAucHJvdG90eXBlLCB7XG4gICAgLy8gMjUuNC41LjMgUHJvbWlzZS5wcm90b3R5cGUudGhlbihvbkZ1bGZpbGxlZCwgb25SZWplY3RlZClcbiAgICB0aGVuOiBmdW5jdGlvbiB0aGVuKG9uRnVsZmlsbGVkLCBvblJlamVjdGVkKXtcbiAgICAgIHZhciBTID0gYW5PYmplY3QoYW5PYmplY3QodGhpcykuY29uc3RydWN0b3IpW1NQRUNJRVNdO1xuICAgICAgdmFyIHJlYWN0ID0ge1xuICAgICAgICBvazogICB0eXBlb2Ygb25GdWxmaWxsZWQgPT0gJ2Z1bmN0aW9uJyA/IG9uRnVsZmlsbGVkIDogdHJ1ZSxcbiAgICAgICAgZmFpbDogdHlwZW9mIG9uUmVqZWN0ZWQgPT0gJ2Z1bmN0aW9uJyAgPyBvblJlamVjdGVkICA6IGZhbHNlXG4gICAgICB9O1xuICAgICAgdmFyIHByb21pc2UgPSByZWFjdC5QID0gbmV3IChTICE9IHVuZGVmaW5lZCA/IFMgOiBQKShmdW5jdGlvbihyZXMsIHJlail7XG4gICAgICAgIHJlYWN0LnJlcyA9IGFGdW5jdGlvbihyZXMpO1xuICAgICAgICByZWFjdC5yZWogPSBhRnVuY3Rpb24ocmVqKTtcbiAgICAgIH0pO1xuICAgICAgdmFyIHJlY29yZCA9IHRoaXNbUkVDT1JEXTtcbiAgICAgIHJlY29yZC5jLnB1c2gocmVhY3QpO1xuICAgICAgaWYocmVjb3JkLmEpcmVjb3JkLmEucHVzaChyZWFjdCk7XG4gICAgICBpZihyZWNvcmQucylub3RpZnkocmVjb3JkLCBmYWxzZSk7XG4gICAgICByZXR1cm4gcHJvbWlzZTtcbiAgICB9LFxuICAgIC8vIDI1LjQuNS4xIFByb21pc2UucHJvdG90eXBlLmNhdGNoKG9uUmVqZWN0ZWQpXG4gICAgJ2NhdGNoJzogZnVuY3Rpb24ob25SZWplY3RlZCl7XG4gICAgICByZXR1cm4gdGhpcy50aGVuKHVuZGVmaW5lZCwgb25SZWplY3RlZCk7XG4gICAgfVxuICB9KTtcbn1cblxuLy8gZXhwb3J0XG4kZGVmKCRkZWYuRyArICRkZWYuVyArICRkZWYuRiAqICF1c2VOYXRpdmUsIHtQcm9taXNlOiBQfSk7XG5yZXF1aXJlKCcuLyQudGFnJykoUCwgUFJPTUlTRSk7XG5zcGVjaWVzKFApO1xuc3BlY2llcyhXcmFwcGVyID0gcmVxdWlyZSgnLi8kLmNvcmUnKVtQUk9NSVNFXSk7XG5cbi8vIHN0YXRpY3NcbiRkZWYoJGRlZi5TICsgJGRlZi5GICogIXVzZU5hdGl2ZSwgUFJPTUlTRSwge1xuICAvLyAyNS40LjQuNSBQcm9taXNlLnJlamVjdChyKVxuICByZWplY3Q6IGZ1bmN0aW9uIHJlamVjdChyKXtcbiAgICByZXR1cm4gbmV3IHRoaXMoZnVuY3Rpb24ocmVzLCByZWopeyByZWoocik7IH0pO1xuICB9XG59KTtcbiRkZWYoJGRlZi5TICsgJGRlZi5GICogKCF1c2VOYXRpdmUgfHwgdGVzdFJlc29sdmUodHJ1ZSkpLCBQUk9NSVNFLCB7XG4gIC8vIDI1LjQuNC42IFByb21pc2UucmVzb2x2ZSh4KVxuICByZXNvbHZlOiBmdW5jdGlvbiByZXNvbHZlKHgpe1xuICAgIHJldHVybiBpc1Byb21pc2UoeCkgJiYgc2FtZUNvbnN0cnVjdG9yKHguY29uc3RydWN0b3IsIHRoaXMpXG4gICAgICA/IHggOiBuZXcgdGhpcyhmdW5jdGlvbihyZXMpeyByZXMoeCk7IH0pO1xuICB9XG59KTtcbiRkZWYoJGRlZi5TICsgJGRlZi5GICogISh1c2VOYXRpdmUgJiYgcmVxdWlyZSgnLi8kLml0ZXItZGV0ZWN0JykoZnVuY3Rpb24oaXRlcil7XG4gIFAuYWxsKGl0ZXIpWydjYXRjaCddKGZ1bmN0aW9uKCl7fSk7XG59KSksIFBST01JU0UsIHtcbiAgLy8gMjUuNC40LjEgUHJvbWlzZS5hbGwoaXRlcmFibGUpXG4gIGFsbDogZnVuY3Rpb24gYWxsKGl0ZXJhYmxlKXtcbiAgICB2YXIgQyAgICAgID0gZ2V0Q29uc3RydWN0b3IodGhpcylcbiAgICAgICwgdmFsdWVzID0gW107XG4gICAgcmV0dXJuIG5ldyBDKGZ1bmN0aW9uKHJlcywgcmVqKXtcbiAgICAgIGZvck9mKGl0ZXJhYmxlLCBmYWxzZSwgdmFsdWVzLnB1c2gsIHZhbHVlcyk7XG4gICAgICB2YXIgcmVtYWluaW5nID0gdmFsdWVzLmxlbmd0aFxuICAgICAgICAsIHJlc3VsdHMgICA9IEFycmF5KHJlbWFpbmluZyk7XG4gICAgICBpZihyZW1haW5pbmcpJC5lYWNoLmNhbGwodmFsdWVzLCBmdW5jdGlvbihwcm9taXNlLCBpbmRleCl7XG4gICAgICAgIEMucmVzb2x2ZShwcm9taXNlKS50aGVuKGZ1bmN0aW9uKHZhbHVlKXtcbiAgICAgICAgICByZXN1bHRzW2luZGV4XSA9IHZhbHVlO1xuICAgICAgICAgIC0tcmVtYWluaW5nIHx8IHJlcyhyZXN1bHRzKTtcbiAgICAgICAgfSwgcmVqKTtcbiAgICAgIH0pO1xuICAgICAgZWxzZSByZXMocmVzdWx0cyk7XG4gICAgfSk7XG4gIH0sXG4gIC8vIDI1LjQuNC40IFByb21pc2UucmFjZShpdGVyYWJsZSlcbiAgcmFjZTogZnVuY3Rpb24gcmFjZShpdGVyYWJsZSl7XG4gICAgdmFyIEMgPSBnZXRDb25zdHJ1Y3Rvcih0aGlzKTtcbiAgICByZXR1cm4gbmV3IEMoZnVuY3Rpb24ocmVzLCByZWope1xuICAgICAgZm9yT2YoaXRlcmFibGUsIGZhbHNlLCBmdW5jdGlvbihwcm9taXNlKXtcbiAgICAgICAgQy5yZXNvbHZlKHByb21pc2UpLnRoZW4ocmVzLCByZWopO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cbn0pO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi4vfi9iYWJlbC1ydW50aW1lL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM2LnByb21pc2UuanNcbiAqKiBtb2R1bGUgaWQgPSAzNFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiLy8gb3B0aW9uYWwgLyBzaW1wbGUgY29udGV4dCBiaW5kaW5nXG52YXIgYUZ1bmN0aW9uID0gcmVxdWlyZSgnLi8kLmEtZnVuY3Rpb24nKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oZm4sIHRoYXQsIGxlbmd0aCl7XG4gIGFGdW5jdGlvbihmbik7XG4gIGlmKHRoYXQgPT09IHVuZGVmaW5lZClyZXR1cm4gZm47XG4gIHN3aXRjaChsZW5ndGgpe1xuICAgIGNhc2UgMTogcmV0dXJuIGZ1bmN0aW9uKGEpe1xuICAgICAgcmV0dXJuIGZuLmNhbGwodGhhdCwgYSk7XG4gICAgfTtcbiAgICBjYXNlIDI6IHJldHVybiBmdW5jdGlvbihhLCBiKXtcbiAgICAgIHJldHVybiBmbi5jYWxsKHRoYXQsIGEsIGIpO1xuICAgIH07XG4gICAgY2FzZSAzOiByZXR1cm4gZnVuY3Rpb24oYSwgYiwgYyl7XG4gICAgICByZXR1cm4gZm4uY2FsbCh0aGF0LCBhLCBiLCBjKTtcbiAgICB9O1xuICB9IHJldHVybiBmdW5jdGlvbigvKiAuLi5hcmdzICovKXtcbiAgICAgIHJldHVybiBmbi5hcHBseSh0aGF0LCBhcmd1bWVudHMpO1xuICAgIH07XG59O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi4vfi9iYWJlbC1ydW50aW1lL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvJC5jdHguanNcbiAqKiBtb2R1bGUgaWQgPSAzNVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCl7XG4gIGlmKHR5cGVvZiBpdCAhPSAnZnVuY3Rpb24nKXRocm93IFR5cGVFcnJvcihpdCArICcgaXMgbm90IGEgZnVuY3Rpb24hJyk7XG4gIHJldHVybiBpdDtcbn07XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuLi9+L2JhYmVsLXJ1bnRpbWUvfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy8kLmEtZnVuY3Rpb24uanNcbiAqKiBtb2R1bGUgaWQgPSAzNlxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiLy8gZ2V0dGluZyB0YWcgZnJvbSAxOS4xLjMuNiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nKClcbnZhciBjb2YgPSByZXF1aXJlKCcuLyQuY29mJylcbiAgLCBUQUcgPSByZXF1aXJlKCcuLyQud2tzJykoJ3RvU3RyaW5nVGFnJylcbiAgLy8gRVMzIHdyb25nIGhlcmVcbiAgLCBBUkcgPSBjb2YoZnVuY3Rpb24oKXsgcmV0dXJuIGFyZ3VtZW50czsgfSgpKSA9PSAnQXJndW1lbnRzJztcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCl7XG4gIHZhciBPLCBULCBCO1xuICByZXR1cm4gaXQgPT09IHVuZGVmaW5lZCA/ICdVbmRlZmluZWQnIDogaXQgPT09IG51bGwgPyAnTnVsbCdcbiAgICAvLyBAQHRvU3RyaW5nVGFnIGNhc2VcbiAgICA6IHR5cGVvZiAoVCA9IChPID0gT2JqZWN0KGl0KSlbVEFHXSkgPT0gJ3N0cmluZycgPyBUXG4gICAgLy8gYnVpbHRpblRhZyBjYXNlXG4gICAgOiBBUkcgPyBjb2YoTylcbiAgICAvLyBFUzMgYXJndW1lbnRzIGZhbGxiYWNrXG4gICAgOiAoQiA9IGNvZihPKSkgPT0gJ09iamVjdCcgJiYgdHlwZW9mIE8uY2FsbGVlID09ICdmdW5jdGlvbicgPyAnQXJndW1lbnRzJyA6IEI7XG59O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi4vfi9iYWJlbC1ydW50aW1lL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvJC5jbGFzc29mLmpzXG4gKiogbW9kdWxlIGlkID0gMzdcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIi8vIGh0dHA6Ly9qc3BlcmYuY29tL2NvcmUtanMtaXNvYmplY3Rcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXQpe1xuICByZXR1cm4gaXQgIT09IG51bGwgJiYgKHR5cGVvZiBpdCA9PSAnb2JqZWN0JyB8fCB0eXBlb2YgaXQgPT0gJ2Z1bmN0aW9uJyk7XG59O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi4vfi9iYWJlbC1ydW50aW1lL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvJC5pcy1vYmplY3QuanNcbiAqKiBtb2R1bGUgaWQgPSAzOFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwidmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi8kLmlzLW9iamVjdCcpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCl7XG4gIGlmKCFpc09iamVjdChpdCkpdGhyb3cgVHlwZUVycm9yKGl0ICsgJyBpcyBub3QgYW4gb2JqZWN0IScpO1xuICByZXR1cm4gaXQ7XG59O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi4vfi9iYWJlbC1ydW50aW1lL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvJC5hbi1vYmplY3QuanNcbiAqKiBtb2R1bGUgaWQgPSAzOVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCwgQ29uc3RydWN0b3IsIG5hbWUpe1xuICBpZighKGl0IGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKXRocm93IFR5cGVFcnJvcihuYW1lICsgXCI6IHVzZSB0aGUgJ25ldycgb3BlcmF0b3IhXCIpO1xuICByZXR1cm4gaXQ7XG59O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi4vfi9iYWJlbC1ydW50aW1lL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvJC5zdHJpY3QtbmV3LmpzXG4gKiogbW9kdWxlIGlkID0gNDBcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsInZhciBjdHggICAgICAgICA9IHJlcXVpcmUoJy4vJC5jdHgnKVxuICAsIGNhbGwgICAgICAgID0gcmVxdWlyZSgnLi8kLml0ZXItY2FsbCcpXG4gICwgaXNBcnJheUl0ZXIgPSByZXF1aXJlKCcuLyQuaXMtYXJyYXktaXRlcicpXG4gICwgYW5PYmplY3QgICAgPSByZXF1aXJlKCcuLyQuYW4tb2JqZWN0JylcbiAgLCB0b0xlbmd0aCAgICA9IHJlcXVpcmUoJy4vJC50by1sZW5ndGgnKVxuICAsIGdldEl0ZXJGbiAgID0gcmVxdWlyZSgnLi9jb3JlLmdldC1pdGVyYXRvci1tZXRob2QnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXRlcmFibGUsIGVudHJpZXMsIGZuLCB0aGF0KXtcbiAgdmFyIGl0ZXJGbiA9IGdldEl0ZXJGbihpdGVyYWJsZSlcbiAgICAsIGYgICAgICA9IGN0eChmbiwgdGhhdCwgZW50cmllcyA/IDIgOiAxKVxuICAgICwgaW5kZXggID0gMFxuICAgICwgbGVuZ3RoLCBzdGVwLCBpdGVyYXRvcjtcbiAgaWYodHlwZW9mIGl0ZXJGbiAhPSAnZnVuY3Rpb24nKXRocm93IFR5cGVFcnJvcihpdGVyYWJsZSArICcgaXMgbm90IGl0ZXJhYmxlIScpO1xuICAvLyBmYXN0IGNhc2UgZm9yIGFycmF5cyB3aXRoIGRlZmF1bHQgaXRlcmF0b3JcbiAgaWYoaXNBcnJheUl0ZXIoaXRlckZuKSlmb3IobGVuZ3RoID0gdG9MZW5ndGgoaXRlcmFibGUubGVuZ3RoKTsgbGVuZ3RoID4gaW5kZXg7IGluZGV4Kyspe1xuICAgIGVudHJpZXMgPyBmKGFuT2JqZWN0KHN0ZXAgPSBpdGVyYWJsZVtpbmRleF0pWzBdLCBzdGVwWzFdKSA6IGYoaXRlcmFibGVbaW5kZXhdKTtcbiAgfSBlbHNlIGZvcihpdGVyYXRvciA9IGl0ZXJGbi5jYWxsKGl0ZXJhYmxlKTsgIShzdGVwID0gaXRlcmF0b3IubmV4dCgpKS5kb25lOyApe1xuICAgIGNhbGwoaXRlcmF0b3IsIGYsIHN0ZXAudmFsdWUsIGVudHJpZXMpO1xuICB9XG59O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi4vfi9iYWJlbC1ydW50aW1lL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvJC5mb3Itb2YuanNcbiAqKiBtb2R1bGUgaWQgPSA0MVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiLy8gY2FsbCBzb21ldGhpbmcgb24gaXRlcmF0b3Igc3RlcCB3aXRoIHNhZmUgY2xvc2luZyBvbiBlcnJvclxudmFyIGFuT2JqZWN0ID0gcmVxdWlyZSgnLi8kLmFuLW9iamVjdCcpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdGVyYXRvciwgZm4sIHZhbHVlLCBlbnRyaWVzKXtcbiAgdHJ5IHtcbiAgICByZXR1cm4gZW50cmllcyA/IGZuKGFuT2JqZWN0KHZhbHVlKVswXSwgdmFsdWVbMV0pIDogZm4odmFsdWUpO1xuICAvLyA3LjQuNiBJdGVyYXRvckNsb3NlKGl0ZXJhdG9yLCBjb21wbGV0aW9uKVxuICB9IGNhdGNoKGUpe1xuICAgIHZhciByZXQgPSBpdGVyYXRvclsncmV0dXJuJ107XG4gICAgaWYocmV0ICE9PSB1bmRlZmluZWQpYW5PYmplY3QocmV0LmNhbGwoaXRlcmF0b3IpKTtcbiAgICB0aHJvdyBlO1xuICB9XG59O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi4vfi9iYWJlbC1ydW50aW1lL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvJC5pdGVyLWNhbGwuanNcbiAqKiBtb2R1bGUgaWQgPSA0MlxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiLy8gY2hlY2sgb24gZGVmYXVsdCBBcnJheSBpdGVyYXRvclxudmFyIEl0ZXJhdG9ycyA9IHJlcXVpcmUoJy4vJC5pdGVyYXRvcnMnKVxuICAsIElURVJBVE9SICA9IHJlcXVpcmUoJy4vJC53a3MnKSgnaXRlcmF0b3InKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXQpe1xuICByZXR1cm4gKEl0ZXJhdG9ycy5BcnJheSB8fCBBcnJheS5wcm90b3R5cGVbSVRFUkFUT1JdKSA9PT0gaXQ7XG59O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi4vfi9iYWJlbC1ydW50aW1lL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvJC5pcy1hcnJheS1pdGVyLmpzXG4gKiogbW9kdWxlIGlkID0gNDNcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIi8vIDcuMS4xNSBUb0xlbmd0aFxudmFyIHRvSW50ZWdlciA9IHJlcXVpcmUoJy4vJC50by1pbnRlZ2VyJylcbiAgLCBtaW4gICAgICAgPSBNYXRoLm1pbjtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXQpe1xuICByZXR1cm4gaXQgPiAwID8gbWluKHRvSW50ZWdlcihpdCksIDB4MWZmZmZmZmZmZmZmZmYpIDogMDsgLy8gcG93KDIsIDUzKSAtIDEgPT0gOTAwNzE5OTI1NDc0MDk5MVxufTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4uL34vYmFiZWwtcnVudGltZS9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzLyQudG8tbGVuZ3RoLmpzXG4gKiogbW9kdWxlIGlkID0gNDRcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsInZhciBjbGFzc29mICAgPSByZXF1aXJlKCcuLyQuY2xhc3NvZicpXG4gICwgSVRFUkFUT1IgID0gcmVxdWlyZSgnLi8kLndrcycpKCdpdGVyYXRvcicpXG4gICwgSXRlcmF0b3JzID0gcmVxdWlyZSgnLi8kLml0ZXJhdG9ycycpO1xubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuLyQuY29yZScpLmdldEl0ZXJhdG9yTWV0aG9kID0gZnVuY3Rpb24oaXQpe1xuICBpZihpdCAhPSB1bmRlZmluZWQpcmV0dXJuIGl0W0lURVJBVE9SXSB8fCBpdFsnQEBpdGVyYXRvciddIHx8IEl0ZXJhdG9yc1tjbGFzc29mKGl0KV07XG59O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi4vfi9iYWJlbC1ydW50aW1lL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvY29yZS5nZXQtaXRlcmF0b3ItbWV0aG9kLmpzXG4gKiogbW9kdWxlIGlkID0gNDVcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIi8vIFdvcmtzIHdpdGggX19wcm90b19fIG9ubHkuIE9sZCB2OCBjYW4ndCB3b3JrIHdpdGggbnVsbCBwcm90byBvYmplY3RzLlxuLyogZXNsaW50LWRpc2FibGUgbm8tcHJvdG8gKi9cbnZhciBnZXREZXNjICA9IHJlcXVpcmUoJy4vJCcpLmdldERlc2NcbiAgLCBpc09iamVjdCA9IHJlcXVpcmUoJy4vJC5pcy1vYmplY3QnKVxuICAsIGFuT2JqZWN0ID0gcmVxdWlyZSgnLi8kLmFuLW9iamVjdCcpO1xudmFyIGNoZWNrID0gZnVuY3Rpb24oTywgcHJvdG8pe1xuICBhbk9iamVjdChPKTtcbiAgaWYoIWlzT2JqZWN0KHByb3RvKSAmJiBwcm90byAhPT0gbnVsbCl0aHJvdyBUeXBlRXJyb3IocHJvdG8gKyBcIjogY2FuJ3Qgc2V0IGFzIHByb3RvdHlwZSFcIik7XG59O1xubW9kdWxlLmV4cG9ydHMgPSB7XG4gIHNldDogT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8ICgnX19wcm90b19fJyBpbiB7fSAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG4gICAgPyBmdW5jdGlvbihidWdneSwgc2V0KXtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBzZXQgPSByZXF1aXJlKCcuLyQuY3R4JykoRnVuY3Rpb24uY2FsbCwgZ2V0RGVzYyhPYmplY3QucHJvdG90eXBlLCAnX19wcm90b19fJykuc2V0LCAyKTtcbiAgICAgICAgICBzZXQoe30sIFtdKTtcbiAgICAgICAgfSBjYXRjaChlKXsgYnVnZ3kgPSB0cnVlOyB9XG4gICAgICAgIHJldHVybiBmdW5jdGlvbiBzZXRQcm90b3R5cGVPZihPLCBwcm90byl7XG4gICAgICAgICAgY2hlY2soTywgcHJvdG8pO1xuICAgICAgICAgIGlmKGJ1Z2d5KU8uX19wcm90b19fID0gcHJvdG87XG4gICAgICAgICAgZWxzZSBzZXQoTywgcHJvdG8pO1xuICAgICAgICAgIHJldHVybiBPO1xuICAgICAgICB9O1xuICAgICAgfSgpXG4gICAgOiB1bmRlZmluZWQpLFxuICBjaGVjazogY2hlY2tcbn07XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuLi9+L2JhYmVsLXJ1bnRpbWUvfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy8kLnNldC1wcm90by5qc1xuICoqIG1vZHVsZSBpZCA9IDQ2XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IE9iamVjdC5pcyB8fCBmdW5jdGlvbiBpcyh4LCB5KXtcbiAgcmV0dXJuIHggPT09IHkgPyB4ICE9PSAwIHx8IDEgLyB4ID09PSAxIC8geSA6IHggIT0geCAmJiB5ICE9IHk7XG59O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi4vfi9iYWJlbC1ydW50aW1lL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvJC5zYW1lLmpzXG4gKiogbW9kdWxlIGlkID0gNDdcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIid1c2Ugc3RyaWN0JztcbnZhciAkICAgICAgID0gcmVxdWlyZSgnLi8kJylcbiAgLCBTUEVDSUVTID0gcmVxdWlyZSgnLi8kLndrcycpKCdzcGVjaWVzJyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKEMpe1xuICBpZihyZXF1aXJlKCcuLyQuc3VwcG9ydC1kZXNjJykgJiYgIShTUEVDSUVTIGluIEMpKSQuc2V0RGVzYyhDLCBTUEVDSUVTLCB7XG4gICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgIGdldDogZnVuY3Rpb24oKXsgcmV0dXJuIHRoaXM7IH1cbiAgfSk7XG59O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi4vfi9iYWJlbC1ydW50aW1lL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvJC5zcGVjaWVzLmpzXG4gKiogbW9kdWxlIGlkID0gNDhcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsInZhciBnbG9iYWwgICAgPSByZXF1aXJlKCcuLyQuZ2xvYmFsJylcclxuICAsIG1hY3JvdGFzayA9IHJlcXVpcmUoJy4vJC50YXNrJykuc2V0XHJcbiAgLCBPYnNlcnZlciAgPSBnbG9iYWwuTXV0YXRpb25PYnNlcnZlciB8fCBnbG9iYWwuV2ViS2l0TXV0YXRpb25PYnNlcnZlclxyXG4gICwgcHJvY2VzcyAgID0gZ2xvYmFsLnByb2Nlc3NcclxuICAsIGhlYWQsIGxhc3QsIG5vdGlmeTtcclxuXHJcbmZ1bmN0aW9uIGZsdXNoKCl7XHJcbiAgd2hpbGUoaGVhZCl7XHJcbiAgICBoZWFkLmZuLmNhbGwoKTsgLy8gPC0gY3VycmVudGx5IHdlIHVzZSBpdCBvbmx5IGZvciBQcm9taXNlIC0gdHJ5IC8gY2F0Y2ggbm90IHJlcXVpcmVkXHJcbiAgICBoZWFkID0gaGVhZC5uZXh0O1xyXG4gIH0gbGFzdCA9IHVuZGVmaW5lZDtcclxufVxyXG5cclxuLy8gTm9kZS5qc1xyXG5pZihyZXF1aXJlKCcuLyQuY29mJykocHJvY2VzcykgPT0gJ3Byb2Nlc3MnKXtcclxuICBub3RpZnkgPSBmdW5jdGlvbigpe1xyXG4gICAgcHJvY2Vzcy5uZXh0VGljayhmbHVzaCk7XHJcbiAgfTtcclxuLy8gYnJvd3NlcnMgd2l0aCBNdXRhdGlvbk9ic2VydmVyXHJcbn0gZWxzZSBpZihPYnNlcnZlcil7XHJcbiAgdmFyIHRvZ2dsZSA9IDFcclxuICAgICwgbm9kZSAgID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoJycpO1xyXG4gIG5ldyBPYnNlcnZlcihmbHVzaCkub2JzZXJ2ZShub2RlLCB7Y2hhcmFjdGVyRGF0YTogdHJ1ZX0pOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLW5ld1xyXG4gIG5vdGlmeSA9IGZ1bmN0aW9uKCl7XHJcbiAgICBub2RlLmRhdGEgPSB0b2dnbGUgPSAtdG9nZ2xlO1xyXG4gIH07XHJcbi8vIGZvciBvdGhlciBlbnZpcm9ubWVudHMgLSBtYWNyb3Rhc2sgYmFzZWQgb246XHJcbi8vIC0gc2V0SW1tZWRpYXRlXHJcbi8vIC0gTWVzc2FnZUNoYW5uZWxcclxuLy8gLSB3aW5kb3cucG9zdE1lc3NhZ1xyXG4vLyAtIG9ucmVhZHlzdGF0ZWNoYW5nZVxyXG4vLyAtIHNldFRpbWVvdXRcclxufSBlbHNlIHtcclxuICBub3RpZnkgPSBmdW5jdGlvbigpe1xyXG4gICAgLy8gc3RyYW5nZSBJRSArIHdlYnBhY2sgZGV2IHNlcnZlciBidWcgLSB1c2UgLmNhbGwoZ2xvYmFsKVxyXG4gICAgbWFjcm90YXNrLmNhbGwoZ2xvYmFsLCBmbHVzaCk7XHJcbiAgfTtcclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBhc2FwKGZuKXtcclxuICB2YXIgdGFzayA9IHtmbjogZm4sIG5leHQ6IHVuZGVmaW5lZH07XHJcbiAgaWYobGFzdClsYXN0Lm5leHQgPSB0YXNrO1xyXG4gIGlmKCFoZWFkKXtcclxuICAgIGhlYWQgPSB0YXNrO1xyXG4gICAgbm90aWZ5KCk7XHJcbiAgfSBsYXN0ID0gdGFzaztcclxufTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4uL34vYmFiZWwtcnVudGltZS9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzLyQubWljcm90YXNrLmpzXG4gKiogbW9kdWxlIGlkID0gNDlcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIid1c2Ugc3RyaWN0JztcbnZhciBjdHggICAgICAgICAgICAgICAgPSByZXF1aXJlKCcuLyQuY3R4JylcbiAgLCBpbnZva2UgICAgICAgICAgICAgPSByZXF1aXJlKCcuLyQuaW52b2tlJylcbiAgLCBodG1sICAgICAgICAgICAgICAgPSByZXF1aXJlKCcuLyQuaHRtbCcpXG4gICwgY2VsICAgICAgICAgICAgICAgID0gcmVxdWlyZSgnLi8kLmRvbS1jcmVhdGUnKVxuICAsIGdsb2JhbCAgICAgICAgICAgICA9IHJlcXVpcmUoJy4vJC5nbG9iYWwnKVxuICAsIHByb2Nlc3MgICAgICAgICAgICA9IGdsb2JhbC5wcm9jZXNzXG4gICwgc2V0VGFzayAgICAgICAgICAgID0gZ2xvYmFsLnNldEltbWVkaWF0ZVxuICAsIGNsZWFyVGFzayAgICAgICAgICA9IGdsb2JhbC5jbGVhckltbWVkaWF0ZVxuICAsIE1lc3NhZ2VDaGFubmVsICAgICA9IGdsb2JhbC5NZXNzYWdlQ2hhbm5lbFxuICAsIGNvdW50ZXIgICAgICAgICAgICA9IDBcbiAgLCBxdWV1ZSAgICAgICAgICAgICAgPSB7fVxuICAsIE9OUkVBRFlTVEFURUNIQU5HRSA9ICdvbnJlYWR5c3RhdGVjaGFuZ2UnXG4gICwgZGVmZXIsIGNoYW5uZWwsIHBvcnQ7XG52YXIgcnVuID0gZnVuY3Rpb24oKXtcbiAgdmFyIGlkID0gK3RoaXM7XG4gIGlmKHF1ZXVlLmhhc093blByb3BlcnR5KGlkKSl7XG4gICAgdmFyIGZuID0gcXVldWVbaWRdO1xuICAgIGRlbGV0ZSBxdWV1ZVtpZF07XG4gICAgZm4oKTtcbiAgfVxufTtcbnZhciBsaXN0bmVyID0gZnVuY3Rpb24oZXZlbnQpe1xuICBydW4uY2FsbChldmVudC5kYXRhKTtcbn07XG4vLyBOb2RlLmpzIDAuOSsgJiBJRTEwKyBoYXMgc2V0SW1tZWRpYXRlLCBvdGhlcndpc2U6XG5pZighc2V0VGFzayB8fCAhY2xlYXJUYXNrKXtcbiAgc2V0VGFzayA9IGZ1bmN0aW9uIHNldEltbWVkaWF0ZShmbil7XG4gICAgdmFyIGFyZ3MgPSBbXSwgaSA9IDE7XG4gICAgd2hpbGUoYXJndW1lbnRzLmxlbmd0aCA+IGkpYXJncy5wdXNoKGFyZ3VtZW50c1tpKytdKTtcbiAgICBxdWV1ZVsrK2NvdW50ZXJdID0gZnVuY3Rpb24oKXtcbiAgICAgIGludm9rZSh0eXBlb2YgZm4gPT0gJ2Z1bmN0aW9uJyA/IGZuIDogRnVuY3Rpb24oZm4pLCBhcmdzKTtcbiAgICB9O1xuICAgIGRlZmVyKGNvdW50ZXIpO1xuICAgIHJldHVybiBjb3VudGVyO1xuICB9O1xuICBjbGVhclRhc2sgPSBmdW5jdGlvbiBjbGVhckltbWVkaWF0ZShpZCl7XG4gICAgZGVsZXRlIHF1ZXVlW2lkXTtcbiAgfTtcbiAgLy8gTm9kZS5qcyAwLjgtXG4gIGlmKHJlcXVpcmUoJy4vJC5jb2YnKShwcm9jZXNzKSA9PSAncHJvY2Vzcycpe1xuICAgIGRlZmVyID0gZnVuY3Rpb24oaWQpe1xuICAgICAgcHJvY2Vzcy5uZXh0VGljayhjdHgocnVuLCBpZCwgMSkpO1xuICAgIH07XG4gIC8vIEJyb3dzZXJzIHdpdGggTWVzc2FnZUNoYW5uZWwsIGluY2x1ZGVzIFdlYldvcmtlcnNcbiAgfSBlbHNlIGlmKE1lc3NhZ2VDaGFubmVsKXtcbiAgICBjaGFubmVsID0gbmV3IE1lc3NhZ2VDaGFubmVsO1xuICAgIHBvcnQgICAgPSBjaGFubmVsLnBvcnQyO1xuICAgIGNoYW5uZWwucG9ydDEub25tZXNzYWdlID0gbGlzdG5lcjtcbiAgICBkZWZlciA9IGN0eChwb3J0LnBvc3RNZXNzYWdlLCBwb3J0LCAxKTtcbiAgLy8gQnJvd3NlcnMgd2l0aCBwb3N0TWVzc2FnZSwgc2tpcCBXZWJXb3JrZXJzXG4gIC8vIElFOCBoYXMgcG9zdE1lc3NhZ2UsIGJ1dCBpdCdzIHN5bmMgJiB0eXBlb2YgaXRzIHBvc3RNZXNzYWdlIGlzICdvYmplY3QnXG4gIH0gZWxzZSBpZihnbG9iYWwuYWRkRXZlbnRMaXN0ZW5lciAmJiB0eXBlb2YgcG9zdE1lc3NhZ2UgPT0gJ2Z1bmN0aW9uJyAmJiAhZ2xvYmFsLmltcG9ydFNjcmlwdCl7XG4gICAgZGVmZXIgPSBmdW5jdGlvbihpZCl7XG4gICAgICBnbG9iYWwucG9zdE1lc3NhZ2UoaWQgKyAnJywgJyonKTtcbiAgICB9O1xuICAgIGdsb2JhbC5hZGRFdmVudExpc3RlbmVyKCdtZXNzYWdlJywgbGlzdG5lciwgZmFsc2UpO1xuICAvLyBJRTgtXG4gIH0gZWxzZSBpZihPTlJFQURZU1RBVEVDSEFOR0UgaW4gY2VsKCdzY3JpcHQnKSl7XG4gICAgZGVmZXIgPSBmdW5jdGlvbihpZCl7XG4gICAgICBodG1sLmFwcGVuZENoaWxkKGNlbCgnc2NyaXB0JykpW09OUkVBRFlTVEFURUNIQU5HRV0gPSBmdW5jdGlvbigpe1xuICAgICAgICBodG1sLnJlbW92ZUNoaWxkKHRoaXMpO1xuICAgICAgICBydW4uY2FsbChpZCk7XG4gICAgICB9O1xuICAgIH07XG4gIC8vIFJlc3Qgb2xkIGJyb3dzZXJzXG4gIH0gZWxzZSB7XG4gICAgZGVmZXIgPSBmdW5jdGlvbihpZCl7XG4gICAgICBzZXRUaW1lb3V0KGN0eChydW4sIGlkLCAxKSwgMCk7XG4gICAgfTtcbiAgfVxufVxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIHNldDogICBzZXRUYXNrLFxuICBjbGVhcjogY2xlYXJUYXNrXG59O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi4vfi9iYWJlbC1ydW50aW1lL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvJC50YXNrLmpzXG4gKiogbW9kdWxlIGlkID0gNTBcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIi8vIGZhc3QgYXBwbHksIGh0dHA6Ly9qc3BlcmYubG5raXQuY29tL2Zhc3QtYXBwbHkvNVxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihmbiwgYXJncywgdGhhdCl7XG4gIHZhciB1biA9IHRoYXQgPT09IHVuZGVmaW5lZDtcbiAgc3dpdGNoKGFyZ3MubGVuZ3RoKXtcbiAgICBjYXNlIDA6IHJldHVybiB1biA/IGZuKClcbiAgICAgICAgICAgICAgICAgICAgICA6IGZuLmNhbGwodGhhdCk7XG4gICAgY2FzZSAxOiByZXR1cm4gdW4gPyBmbihhcmdzWzBdKVxuICAgICAgICAgICAgICAgICAgICAgIDogZm4uY2FsbCh0aGF0LCBhcmdzWzBdKTtcbiAgICBjYXNlIDI6IHJldHVybiB1biA/IGZuKGFyZ3NbMF0sIGFyZ3NbMV0pXG4gICAgICAgICAgICAgICAgICAgICAgOiBmbi5jYWxsKHRoYXQsIGFyZ3NbMF0sIGFyZ3NbMV0pO1xuICAgIGNhc2UgMzogcmV0dXJuIHVuID8gZm4oYXJnc1swXSwgYXJnc1sxXSwgYXJnc1syXSlcbiAgICAgICAgICAgICAgICAgICAgICA6IGZuLmNhbGwodGhhdCwgYXJnc1swXSwgYXJnc1sxXSwgYXJnc1syXSk7XG4gICAgY2FzZSA0OiByZXR1cm4gdW4gPyBmbihhcmdzWzBdLCBhcmdzWzFdLCBhcmdzWzJdLCBhcmdzWzNdKVxuICAgICAgICAgICAgICAgICAgICAgIDogZm4uY2FsbCh0aGF0LCBhcmdzWzBdLCBhcmdzWzFdLCBhcmdzWzJdLCBhcmdzWzNdKTtcbiAgfSByZXR1cm4gICAgICAgICAgICAgIGZuLmFwcGx5KHRoYXQsIGFyZ3MpO1xufTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4uL34vYmFiZWwtcnVudGltZS9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzLyQuaW52b2tlLmpzXG4gKiogbW9kdWxlIGlkID0gNTFcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi8kLmdsb2JhbCcpLmRvY3VtZW50ICYmIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudDtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4uL34vYmFiZWwtcnVudGltZS9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzLyQuaHRtbC5qc1xuICoqIG1vZHVsZSBpZCA9IDUyXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJ2YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuLyQuaXMtb2JqZWN0JylcbiAgLCBkb2N1bWVudCA9IHJlcXVpcmUoJy4vJC5nbG9iYWwnKS5kb2N1bWVudFxuICAvLyBpbiBvbGQgSUUgdHlwZW9mIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQgaXMgJ29iamVjdCdcbiAgLCBpcyA9IGlzT2JqZWN0KGRvY3VtZW50KSAmJiBpc09iamVjdChkb2N1bWVudC5jcmVhdGVFbGVtZW50KTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXQpe1xuICByZXR1cm4gaXMgPyBkb2N1bWVudC5jcmVhdGVFbGVtZW50KGl0KSA6IHt9O1xufTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4uL34vYmFiZWwtcnVudGltZS9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzLyQuZG9tLWNyZWF0ZS5qc1xuICoqIG1vZHVsZSBpZCA9IDUzXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJ2YXIgJHJlZGVmID0gcmVxdWlyZSgnLi8kLnJlZGVmJyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKHRhcmdldCwgc3JjKXtcbiAgZm9yKHZhciBrZXkgaW4gc3JjKSRyZWRlZih0YXJnZXQsIGtleSwgc3JjW2tleV0pO1xuICByZXR1cm4gdGFyZ2V0O1xufTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4uL34vYmFiZWwtcnVudGltZS9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzLyQubWl4LmpzXG4gKiogbW9kdWxlIGlkID0gNTRcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsInZhciBTWU1CT0xfSVRFUkFUT1IgPSByZXF1aXJlKCcuLyQud2tzJykoJ2l0ZXJhdG9yJylcbiAgLCBTQUZFX0NMT1NJTkcgICAgPSBmYWxzZTtcbnRyeSB7XG4gIHZhciByaXRlciA9IFs3XVtTWU1CT0xfSVRFUkFUT1JdKCk7XG4gIHJpdGVyWydyZXR1cm4nXSA9IGZ1bmN0aW9uKCl7IFNBRkVfQ0xPU0lORyA9IHRydWU7IH07XG4gIEFycmF5LmZyb20ocml0ZXIsIGZ1bmN0aW9uKCl7IHRocm93IDI7IH0pO1xufSBjYXRjaChlKXsgLyogZW1wdHkgKi8gfVxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihleGVjKXtcbiAgaWYoIVNBRkVfQ0xPU0lORylyZXR1cm4gZmFsc2U7XG4gIHZhciBzYWZlID0gZmFsc2U7XG4gIHRyeSB7XG4gICAgdmFyIGFyciAgPSBbN11cbiAgICAgICwgaXRlciA9IGFycltTWU1CT0xfSVRFUkFUT1JdKCk7XG4gICAgaXRlci5uZXh0ID0gZnVuY3Rpb24oKXsgc2FmZSA9IHRydWU7IH07XG4gICAgYXJyW1NZTUJPTF9JVEVSQVRPUl0gPSBmdW5jdGlvbigpeyByZXR1cm4gaXRlcjsgfTtcbiAgICBleGVjKGFycik7XG4gIH0gY2F0Y2goZSl7IC8qIGVtcHR5ICovIH1cbiAgcmV0dXJuIHNhZmU7XG59O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi4vfi9iYWJlbC1ydW50aW1lL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvJC5pdGVyLWRldGVjdC5qc1xuICoqIG1vZHVsZSBpZCA9IDU1XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJcInVzZSBzdHJpY3RcIjtcblxuZXhwb3J0c1tcImRlZmF1bHRcIl0gPSBmdW5jdGlvbiAob2JqKSB7XG4gIHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7XG4gICAgXCJkZWZhdWx0XCI6IG9ialxuICB9O1xufTtcblxuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4uL34vYmFiZWwtcnVudGltZS9oZWxwZXJzL2ludGVyb3AtcmVxdWlyZS1kZWZhdWx0LmpzXG4gKiogbW9kdWxlIGlkID0gNTZcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IHsgSW50ZXJmYWNlIH0gZnJvbSAnZGVtby9wbGF5bGFuZy5pbnRlcmZhY2UuanMnO1xuaW1wb3J0IFJ1bnRpbWUgIGZyb20gJ2RlbW8vcGxheWxhbmcucnVudGltZS5qcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIFBsYXlsYW5nKCkge1xuICB0aGlzLl9ydW50aW1lID0gbmV3IFJ1bnRpbWUoKTtcbiAgdGhpcy5faW50ZXJmYWNlID0gbmV3IEludGVyZmFjZSh0aGlzLl9ydW50aW1lKTtcbiAgcmV0dXJuIHRoaXMuX2ludGVyZmFjZTtcbn1cblxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9wbGF5bGFuZy5qc1xuICoqLyIsIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IHsgUnVuZSB9IGZyb20gJ2Rpc3QvcnVuZS5qcyc7XG5cbi8qKlxuICogQSBkZW1vIGVEU0wgd2l0aCBtb3N0IGZlYXR1cmVzIGEgZnVsbCBsYW5ndWFnZSBzaG91bGQgYmUgd2l0aC5cbiAqIFRoaXMgZmlsZSBjb250YWlucyBvbmx5IGludGVyZmFjZW4sIHdoaWNoIG1lYW5zIGl0IG5lZWQgdG8gYmUgaW5zdGFudGlhdGVkXG4gKiB3aXRoIGEgcnVudGltZSB0byBleGVjdXRlIHRoZSBsYW5ndWFnZS5cbiAqXG4gKiBOb3RlOiBzaW5jZSB0byBoYW5kbGUgYXN5bmMgZnVuY3Rpb24gcHJvcGVybHkgbmVlZCBleHRyYSBlZmZvcnRzLFxuICogc28gdGhpcyBkZW1vIGxhbmd1YWdlIGRvZXNuJ3QgZnVsbHkgaGFuZGxlIHRoZW0geWV0LiBBbHRob3VnaCB0aGlzIGVEU0xcbiAqIGluZGVlZCBwdXQgYWxsIHN0ZXBzIGluIGEgUHJvbWlzZSB0byBiZSB0aGUgZmlyc3Qgc3RlcCB0b3dhcmQgdGhhdC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIEludGVyZmFjZShydW50aW1lKSB7XG4gIHRoaXMuY29udGV4dCA9IHtcbiAgICBzdGFydGVkOiBmYWxzZSxcbiAgICBzdG9wcGVkOiBmYWxzZSxcbiAgICBsb29waW5nOiBmYWxzZSxcbiAgICBtYXRjaGluZzogZmFsc2VcbiAgfTtcbiAgdGhpcy5zdGFjayA9IFtdO1xuICB0aGlzLl9ydW50aW1lID0gcnVudGltZTtcbiAgdGhpcy5fZXZhbHVhdG9yID0gKG5ldyBSdW5lLkV2YWx1YXRlKCkpXG4gICAgLmFuYWx5emVyKHRoaXMuX2FuYWx5emVPcmRlci5iaW5kKHRoaXMpKVxuICAgIC5pbnRlcnByZXRlcih0aGlzLl9pbnRlcnByZXQuYmluZCh0aGlzKSk7XG59XG5cbkludGVyZmFjZS5wcm90b3R5cGUuc3RhcnQgPSBSdW5lLmRlZmluZSgnc3RhcnQnLCAnYmVnaW4nKTtcbkludGVyZmFjZS5wcm90b3R5cGUuZG9uZSA9IFJ1bmUuZGVmaW5lKCdkb25lJywgJ2V4aXQnKTtcbkludGVyZmFjZS5wcm90b3R5cGUubmV4dCA9IFJ1bmUuZGVmaW5lKCduZXh0JywgJ3B1c2gnKTtcbkludGVyZmFjZS5wcm90b3R5cGUubWF0Y2ggPSBSdW5lLmRlZmluZSgnbWF0Y2gnLCAnYmVnaW4nKTtcbkludGVyZmFjZS5wcm90b3R5cGUuZW5kID0gUnVuZS5kZWZpbmUoJ2VuZCcsICdlbmQnKTtcbkludGVyZmFjZS5wcm90b3R5cGUuY2FzZSA9IFJ1bmUuZGVmaW5lKCdjYXNlJywgJ3B1c2gnKTtcbkludGVyZmFjZS5wcm90b3R5cGUudG8gPSBSdW5lLmRlZmluZSgndG8nLCAncHVzaCcpO1xuSW50ZXJmYWNlLnByb3RvdHlwZS5hcyA9IFJ1bmUuZGVmaW5lKCdhcycsICdwdXNoJyk7XG5JbnRlcmZhY2UucHJvdG90eXBlLmxvb3AgPSBSdW5lLmRlZmluZSgnbG9vcCcsICdiZWdpbicpO1xuSW50ZXJmYWNlLnByb3RvdHlwZS51bnRpbCA9IFJ1bmUuZGVmaW5lKCd1bnRpbCcsICdlbmQnKTtcbkludGVyZmFjZS5wcm90b3R5cGUuYW55ID0gUnVuZS5kZWZpbmUoJ2FueScsICdwdXNoJyk7XG5JbnRlcmZhY2UucHJvdG90eXBlLmFsbCA9IFJ1bmUuZGVmaW5lKCdhbGwnLCAncHVzaCcpO1xuXG5JbnRlcmZhY2UucHJvdG90eXBlLm9uY2hhbmdlID0gZnVuY3Rpb24oY29udGV4dCwgbm9kZSwgc3RhY2spIHtcbiAgLy8gV2hlbiBpdCdzIGNoYW5nZWQsIGV2YWx1YXRlIGl0IHdpdGggYW5hbHl6ZXJzICYgaW50ZXJwcmV0ZXIuXG4gIHJldHVybiB0aGlzLl9ldmFsdWF0b3IoY29udGV4dCwgbm9kZSwgc3RhY2spO1xufTtcblxuSW50ZXJmYWNlLnByb3RvdHlwZS5faW50ZXJwcmV0ID0gZnVuY3Rpb24oY29udGV4dCwgbm9kZSwgc3RhY2spIHtcbiAgLy8gV2VsbCBpbiB0aGlzIGVEU0wgd2UgZGVsZWdhdGUgdGhlIGludGVycHJldGlvbiB0byB0aGUgcnVudGltZS5cbiAgLy8gV2UgZG9uJ3QgcGFzcyBjb250ZXh0IHRvIHJ1bnRpbWUgc2luY2UgdGhlIHJ1bnRpbWUgd2lsbCBrZWVwXG4gIC8vIHRoZSBlc3NlbnRpYWwgc3RhdGVzIGJ5IGl0cyBvd24uXG4gIHJldHVybiB0aGlzLl9ydW50aW1lLm9uY2hhbmdlLmFwcGx5KHRoaXMuX3J1bnRpbWUsIGFyZ3VtZW50cyk7XG59O1xuXG4vLyBJbiB0aGlzIGVEU0wgd2Ugbm93IG9ubHkgaGF2ZSB0aGlzIGFuYWx5emVyLiBDb3VsZCBhZGQgbW9yZSBhbmQgcmVnaXN0ZXIgaXRcbi8vIGluIHRoZSBjb250cnVjdGlvbiBvZiAndGhpcy5fZXZhbHVhdG9yJy5cbkludGVyZmFjZS5wcm90b3R5cGUuX2FuYWx5emVPcmRlciA9IGZ1bmN0aW9uKGNvbnRleHQsIGNoYW5nZSwgc3RhY2spIHtcbiAgaWYgKCdzdGFydCcgPT09IGNoYW5nZS50eXBlKSB7XG4gICAgY29udGV4dC5zdGFydGVkID0gdHJ1ZTtcbiAgfSBlbHNlIGlmICgnc3RvcCcpIHtcbiAgICBjb250ZXh0LnN0b3BwZWQgPSB0cnVlO1xuICB9XG4gIGlmICgnc3RhcnQnID09PSBjaGFuZ2UudHlwZSAmJiBjb250ZXh0LnN0b3BwZWQpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ1Nob3VsZCBub3Qgc3RhcnQgYSBwcm9jZXNzIGFnYWluJyArXG4gICAgICAgICdhZnRlciBpdFxcJ3MgYWxyZWFkeSBzdG9wcGVkJyk7XG4gIH0gZWxzZSBpZiAoJ25leHQnID09PSBjaGFuZ2UudHlwZSAmJiAhY29udGV4dC5zdGFydGVkKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdTaG91bGQgbm90IGNvbmNhdCBzdGVwcyB3aGlsZSBpdFxcJ3Mgbm90IHN0YXJ0ZWQnKTtcbiAgfSBlbHNlIGlmICgnc3RvcCcgPT09IGNoYW5nZS50eXBlICYmICFjb250ZXh0LnN0YXJ0ZWQpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ1Nob3VsZCBub3Qgc3RvcCBhIHByb2Nlc3MgYmVmb3JlIGl0XFwncyBzdGFydGVkJyk7XG4gIH1cbn07XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3BsYXlsYW5nLmludGVyZmFjZS5qc1xuICoqLyIsIihmdW5jdGlvbihlLCBhKSB7IGZvcih2YXIgaSBpbiBhKSBlW2ldID0gYVtpXTsgfShleHBvcnRzLCAvKioqKioqLyAoZnVuY3Rpb24obW9kdWxlcykgeyAvLyB3ZWJwYWNrQm9vdHN0cmFwXG4vKioqKioqLyBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbi8qKioqKiovIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcbi8qKioqKiovXG4vKioqKioqLyBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4vKioqKioqLyBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcbi8qKioqKiovXG4vKioqKioqLyBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4vKioqKioqLyBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4vKioqKioqLyBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbi8qKioqKiovXG4vKioqKioqLyBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbi8qKioqKiovIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4vKioqKioqLyBcdFx0XHRleHBvcnRzOiB7fSxcbi8qKioqKiovIFx0XHRcdGlkOiBtb2R1bGVJZCxcbi8qKioqKiovIFx0XHRcdGxvYWRlZDogZmFsc2Vcbi8qKioqKiovIFx0XHR9O1xuLyoqKioqKi9cbi8qKioqKiovIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbi8qKioqKiovIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcbi8qKioqKiovXG4vKioqKioqLyBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuLyoqKioqKi8gXHRcdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuLyoqKioqKi9cbi8qKioqKiovIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuLyoqKioqKi8gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbi8qKioqKiovIFx0fVxuLyoqKioqKi9cbi8qKioqKiovXG4vKioqKioqLyBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4vKioqKioqLyBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG4vKioqKioqL1xuLyoqKioqKi8gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuLyoqKioqKi8gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuLyoqKioqKi9cbi8qKioqKiovIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbi8qKioqKiovIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcbi8qKioqKiovXG4vKioqKioqLyBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuLyoqKioqKi8gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcbi8qKioqKiovIH0pXG4vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuLyoqKioqKi8gKFtcbi8qIDAgKi9cbi8qKiovIGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cykge1xuXG5cdCd1c2Ugc3RyaWN0Jztcblx0XG5cdC8qKlxuXHQgKiBHZW5lcmljIGJ1aWxkZXIgdGhhdCB3b3VsZCBwdXNoIG5vZGVzIGludG8gdGhlIGVEU0wgc3RhY2suXG5cdCAqIFVzZXIgY291bGQgaW5oZXJpdCB0aGlzIHRvIGRlZmluZSB0aGUgbmV3IGVEU0wuXG5cdCAqIC0tLVxuXHQgKiBUaGUgZGVmYXVsdCBzZW1hbnRpY3Mgb25seSBjb250YWluIHRoZXNlIG9wZXJhdGlvbnM6XG5cdCAqXG5cdCAqIDEuIFtwdXNoXSA6IHB1c2ggdG8gdGhlIGN1cnJlbnQgc3RhY2tcblx0ICogMi4gW2JlZ2luXTogY3JlYXRlIGEgbmV3IHN0YWNrIGFuZCBzd2l0Y2ggdG8gaXQsXG5cdCAqICAgICAgICAgICAgIGFuZCB0aGVuIHB1c2ggdGhlIG5vZGUgaW50byB0aGUgc3RhY2suXG5cdCAqIDMuIFtlbmRdICA6IGFmdGVyIHB1c2ggdGhlIG5vZGUgaW50byB0aGUgc3RhY2ssXG5cdCAqICAgICAgICAgICAgIGNoYW5nZSB0aGUgY3VycmVudCBzdGFjayB0byB0aGUgcHJldmlvdXMgb25lLlxuXHQgKiA0LiBbZXhpdF0gOiBleGl0IHRoZSBjb250ZXh0IG9mIHRoaXMgZURTTDsgdGhlIGxhc3QgcmVzdWx0XG5cdCAqICAgICAgICAgICAgIG9mIGl0IHdvdWxkIGJlIHBhc3NlZCB0byB0aGUgcmV0dXJuIHZhbHVlIG9mXG5cdCAqICAgICAgICAgICAgIHRoaXMgY2hhaW4uXG5cdCAqXG5cdCAqIFN0YWNrIGNvdWxkIGJlIG5lc3RlZDogd2hlbiBbYmVnaW5dIGEgbmV3IHN0YWNrIGluIGZhY3QgaXQgd291bGRcblx0ICogcHVzaCB0aGUgc3RhY2sgaW50byB0aGUgcHJldmlvdXMgb25lLiBTbyB0aGUgc3RhY2sgY29tcHJpc2Vcblx0ICogW25vZGVdIGFuZCBbc3RhY2tdLlxuXHQgKiAtLS1cblx0ICogQWx0aG91Z2ggdGhlIGVEU0wgaW5zdGFuY2Ugc2hvdWxkIHdyYXAgdGhlc2UgYmFzaWMgb3BlcmF0aW9uc1xuXHQgKiB0byBtYW5pcHVsYXRlIHRoZSBzdGFjaywgdGhleSBhbGwgbmVlZCB0byBjb252ZXJ0IHRoZSBtZXRob2Rcblx0ICogY2FsbCB0byBub2Rlcy4gU28gJ1J1bmUnIHByb3ZpZGUgYSB3YXkgdG8gc2ltcGxpZnkgdGhlIHdvcms6IGlmXG5cdCAqIHRoZSBpbnN0YW5jZSBjYWxsIHRoZSBbZGVmaW5lXSBtZXRob2QgdGhlIG5hbWUgb2YgdGhlIG1ldGhvZCxcblx0ICogaXQgY291bGQgYXNzb2NpYXRlIHRoZSBvcGVyYW5kIG9mIHRoZSBlRFNMIHdpdGggdGhlIHN0YWNrIG1hbmlwdWxhdGlvbi5cblx0ICogRm9yIGV4YW1wbGU6XG5cdCAqXG5cdCAqICAgIHZhciBlRFNMID0gZnVuY3Rpb24oKSB7fTtcblx0ICogICAgZURTTC5wcm90b3R5cGUudHJhbnNhY3Rpb24gPSBSdW5lLmRlZmluZSgndHJhbnNhY3Rpb24nLCAnYmVnaW4nKTtcblx0ICogICAgZURTTC5wcm90b3R5cGUucHJlID0gUnVuZS5kZWZpbmUoJ3ByZScsICdwdXNoJyk7XG5cdCAqICAgIGVEU0wucHJvdG90eXBlLnBlcmZvcm0gPSBSdW5lLmRlZmluZSgncGVyZm9ybScsICdwdXNoJyk7XG5cdCAqICAgIGVEU0wucHJvdG90eXBlLnBvc3QgPSBSdW5lLmRlZmluZSgncG9zdCcsICdlbmQnKTtcblx0ICpcblx0ICogVGhlbiB0aGUgZURTTCBjb3VsZCBiZSB1c2VkIGFzOlxuXHQgKlxuXHQgKiAgICAobmV3IGVEU0wpXG5cdCAqICAgICAgLnRyYW5zYWN0aW9uKClcblx0ICogICAgICAucHJlKGNiKVxuXHQgKiAgICAgIC5wZXJmb3JtKGNiKVxuXHQgKiAgICAgIC5wb3N0KGNiKVxuXHQgKlxuXHQgKiBBbmQgdGhlIHN0YWNrIHdvdWxkIGJlOlxuXHQgKlxuXHQgKiAgICBbXG5cdCAqICAgICAgbm9kZTwndHJhbnNhY3Rpb24nLD5cblx0ICogICAgICBub2RlPCdwcmUnLCBjYj5cblx0ICogICAgICBub2RlPCdwcmVmb3JtJywgY2I+XG5cdCAqICAgICAgbm9kZTwncG9zdCcsIGNiPlxuXHQgKiAgICBdXG5cdCAqXG5cdCAqIEhvd2V2ZXIsIHRoaXMgc2ltcGxlIGFwcHJvYWNoIHRoZSBzZW1hbnRpY3MgcnVsZXMgYW5kIGFuYWx5emVycyB0b1xuXHQgKiBndWFyYW50ZWUgdGhlIHN0YWNrIGlzIHZhbGlkLiBGb3IgZXhhbXBsZSwgaWYgd2UgaGF2ZSBhIG1hbGZvcm1lZFxuXHQgKiBzdGFjayBiZWNhdXNlIG9mIHRoZSBmb2xsb3dpbmcgZURTTCBwcm9ncmFtOlxuXHQgKlxuXHQgKiAgICAobmV3IGVEU0wpXG5cdCAqICAgICAgLnBvc3QoY2IpXG5cdCAqICAgICAgLnByZShjYilcblx0ICogICAgICAucGVyZm9ybShjYilcblx0ICogICAgICAudHJhbnNhY3Rpb24oKVxuXHQgKlxuXHQgKiBUaGUgcnVudGltZSBtYXkgcmVwb3J0IGVycm90IGJlY2F1c2Ugd2hlbiAnLnBvc3QoY2IpJyB0aGVyZSBpcyBubyBzdGFja1xuXHQgKiBjcmVhdGVkIGJ5IHRoZSBiZWdpbm5pbmcgc3RlcCwgbmFtZWx5IHRoZSAnLnByZShjYiknIGluIG91ciBjYXNlLlxuXHQgKiBOZXZlcnRoZWxlc3MsIHRoZSBlcnJvciBtZXNzYWdlIGlzIHRvbyBsb3ctbGV2ZWwgZm9yIHRoZSBsYW5ndWFnZSB1c2VyLFxuXHQgKiBzaW5jZSB0aGV5IHNob3VsZCBjYXJlIG5vIHN0YWNrIHRoaW5ncyBhbmQgc2hvdWxkIG9ubHkgY2FyZSBhYm91dCB0aGUgZURTTFxuXHQgKiBpdHNlbGYuXG5cdCAqXG5cdCAqIFRoZSBzb2x1dGlvbiBpcyB0byBwcm92aWRlIGEgYmFzaWMgc3RhY2sgb3JkZXJpbmcgYW5hbHl6ZXIgYW5kIGxldCB0aGVcblx0ICogbGFuZ3VhZ2UgZGVjaWRlIGhvdyB0byBkZXNjcmliZSB0aGUgZXJyb3IuIEFuZCBzaW5jZSB3ZSBkb24ndCBoYXZlXG5cdCAqIGFueSBjb250ZXh0IGluZm9ybWF0aW9uIGFib3V0IHZhcmlhYmxlcywgc2NvcGUgYW5kIG90aGVyIGVsZW1lbnRzXG5cdCAqIGFzIGEgY29tcGxldGUgcHJvZ3JhbW1pbmcgbGFuZ3VhZ2UsIHdlIG9ubHkgbmVlZCB0byBndWFyYW50ZWUgdGhlIG9yZGVyIGlzXG5cdCAqIGNvcnJlY3QsIGFuZCBtYWtlIGluY29ycmVjdCBjYXNlcyBtZWFuaW5nZnVsLiBNb3Jlb3Zlciwgc2luY2UgdGhlIGFuYWx5emVyXG5cdCAqIG5lZWRzIHRvIGFuYWx5emUgdGhlIHN0YXRlcyB3aGVuZXZlciB0aGUgaW5jb21pbmcgbm9kZSBjb21lcywgaXQgaXMgaW4gZmFjdFxuXHQgKiBhbiBldmFsdWF0aW9uIHByb2Nlc3MsIHNvIHVzZXIgY291bGQgY29tYmluZSB0aGUgYW5hbHl6aW5nIGFuZCBpbnRlcnByZXRpbmdcblx0ICogcGhhc2UgaW50byB0aGUgc2FtZSBmdW5jdGlvbi4gRm9yIGV4YW1wbGU6XG5cdCAqXG5cdCAqICAgIHJ1bnRpbWUub25jaGFuZ2UoKGNvbnRleHQsIG5vZGUsIHN0YWNrKSA9PiB7XG5cdCAqICAgICAgICAvLyBJZiB0aGUgY2hhbmdlIGlzIHRvIHN3aXRjaCB0byBhIG5ldyBzdGFjayxcblx0ICogICAgICAgIC8vIHRoZSAnc3RhY2snIGhlcmUgd291bGQgYmUgdGhlIG5ldyBzdGFjay5cblx0ICogICAgICAgIHZhciB7dHlwZSwgYXJnc30gPSBub2RlO1xuXHQgKiAgICAgICAgaWYgKCdwcmUnID09PSB0eXBlKSB7XG5cdCAqICAgICAgICAgIGNvbnRleHQuaW5pdCA9IHRydWU7XG5cdCAqICAgICAgICB9IGVsc2UgaWYgKCdwb3N0JyA9PT0gdHlwZSAmJiAhY29udGV4dC5pbml0KSB7XG5cdCAqICAgICAgICAgIHRocm93IG5ldyBFcnJvcignVGhlcmUgbXVzdCBiZSBvbmUgXCJwcmVcIiBub2RlIGJlZm9yZSB0aGUgXCJwb3N0XCIuJyk7XG5cdCAqICAgICAgICB9XG5cdCAqICAgIH0pO1xuXHQgKlxuXHQgKiBXaXRoIHN1Y2ggZmVhdHVyZSwgaWYgdGhlIGluY29taW5nIG5vZGUgb3IgdGhlIHN0YWNrIGlzIG1hbGZvcm1lZCxcblx0ICogaXQgc2hvdWxkIHRocm93IHRoZSBlcnJvci4gVGhlIGVycm9yIGNhcHR1cmVkIGJ5IHRoZSBpbnN0YW5jZSBsaWtlIHRoaXNcblx0ICogY291bGQgYmUgYSAnY29tcGlsYXRpb24gZXJyb3InLlxuXHQgKlxuXHQgKiBUaGUgbm90aWNlYWJsZSBmYWN0IGlzIFRoZSBjYWxsYmFjayBvZiB0aGUgJ29uY2hhbmdlJyBpcyBhY3R1YWxseSBhIHJlZHVjZXIsXG5cdCAqIHNvIHVzZXIgY291bGQgdHJlYXQgdGhlIHByb2Nlc3Mgb2YgdGhpcyBldmFsdWF0aW9uICYgYW5hbHl6aW5nIGFzIGEgcmVkdWNpbmdcblx0ICogcHJvY2VzcyBvbiBhbiBpbmZpbml0ZSBzdHJlYW0uIEFuZCBzaW5jZSB3ZSBoYXZlIGEgc3RhY2sgbWFjaGluZSwgaWYgdGhlXG5cdCAqIHJlZHVjZXIgcmV0dXJuIG5vdGhpbmcsIHRoZSBzdGFjayB3b3VsZCBiZSBlbXB0eS4gT3RoZXJ3aXNlLCBpZiB0aGUgcmVkdWNlclxuXHQgKiByZXR1cm4gYSBuZXcgc3RhY2ssIGl0IHdvdWxkIHJlcGxhY2UgdGhlIG9sZCBvbmUuXG5cdCAqXG5cdCAqIEFuZCBwbGVhc2Ugbm90ZSB0aGUgZXhhbXBsZSBpcyBtdWNoIHNpbXBsaWZpZWQuIEZvciB0aGVcblx0ICogcmVhbCBlRFNMIGl0IHNob3VsZCBiZSB1c2VkIG9ubHkgYXMgYW4gZW50cnkgdG8gZGlzcGF0Y2ggdGhlIGNoYW5nZSB0b1xuXHQgKiB0aGUgcmVhbCBoYW5kbGVycywgd2hpY2ggbWF5IGNvbXByaXNlIHNldmVyYWwgc3RhdGVzIGFuZCBjb21wb25lbnRzLlxuXHQgKi9cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywge1xuXHQgIHZhbHVlOiB0cnVlXG5cdH0pO1xuXHRleHBvcnRzLlJ1bmUgPSBSdW5lO1xuXHRcblx0ZnVuY3Rpb24gUnVuZSgpIHt9XG5cdFxuXHQvKipcblx0ICogSGVscGVyIG1ldGhvZCB0byBidWlsZCBpbnRlcmZhY2Ugb2YgYSBzcGVjaWZpYyBEU0wuIEl0IHdvdWxkIHJldHVybiBhIG1ldGhvZFxuXHQgKiBvZiB0aGUgRFNMIGFuZCB0aGVuIHRoZSBpbnRlcmZhY2UgY291bGQgYXR0YWNoIGl0LlxuXHQgKlxuXHQgKiBUaGUgcmV0dXJuaW5nIGZ1bmN0aW9uIHdvdWxkIGFzc3VtZSB0aGF0IHRoZSAndGhpcycgaW5zaWRlIGl0IGlzIHRoZSBydW50aW1lXG5cdCAqIG9mIHRoZSBsYW5ndWFnZS4gQW5kIHNpbmNlIHRoZSBtZXRob2QgaXQgcmV0dXJucyB3b3VsZCByZXF1aXJlIHRvIGFjY2VzcyBzb21lXG5cdCAqIG1lbWJlcnMgb2YgdGhlICd0aGlzJywgdGhlICd0aGlzJyBzaG91bGQgaGF2ZSAndGhpcy5zdGFjaycgYW5kICd0aGlzLmNvbnRleHQnXG5cdCAqIGFzIHRoZSBtZXRob2QgcmVxdWlyZXMuXG5cdCAqXG5cdCAqIElmIGl0J3MgYW4gJ2V4aXQnIG5vZGUsIG1lYW5zIHRoZSBzZXNzaW9uIGlzIGVuZGVkIGFuZCB0aGUgaW50ZXJwcmV0ZXIgc2hvdWxkXG5cdCAqIHJldHVybiBhIHN0YWNrIGNvbnRhaW5zIG9ubHkgb25lIG5vZGUgYXMgdGhlIHJlc3VsdCBvZiB0aGUgc2Vzc2lvbiwgb3IgdGhlXG5cdCAqIHNlc3Npb24gcmV0dXJucyBub3RoaW5nLiBGb3Igb3RoZXIgaW5zdHJ1Y3Rpb25zIHRoZSBzdGFjayBjYW4ga2VlcCBzb21lXG5cdCAqIGNvbXB1dGVkIHJlc3VsdCB0byBzaW11bGF0ZSByZWFsIHN0YWNrIG1hY2hpbmUuIEJ1dCBpdCdzIE9LIHRvIG5vdCB1c2UgdGhpc1xuXHQgKiBmZWF0dXJlIGFuZCBhbHdheXMgcmV0dXJuIGFuIGVtcHR5ICdzdGFjaycgZXZlcnl0aW1lIHRoZSAnb25jaGFuZ2UnIGdldFxuXHQgKiBjYWxsZWQgYW5kIGludGVydXB0ZWQuIEluIHRoaXMgbW9kZSBpdCBtZWFucyB0aGUgbGFuZ3VhZ2Ugd2FudCB0byBrZWVwXG5cdCAqIGFsbCBzdGF0ZXMgYnkgaXRzZWxmLlxuXHQgKlxuXHQgKiBQbGVhc2Ugbm90ZSB0aGF0IGZyb20gdGhlIGRlc2NyaXB0aW9uIGFib3ZlLCAnZW5kJyBtZWFucyBzdGFjayAoc3Vic3RhY2spXG5cdCAqIGVuZHMuIEl0J3MgdG90YWxseSBpcnJlbGV2YW50IHRvICdleGl0Jy5cblx0ICpcblx0ICogVGhlIGxhc3QgYXJndW1lbnQgJ2RvYycgaXMgd2hhdCBkZXNpZ25lciBjb3VsZCBwdXQgdGhlIGRlc2NyaXB0aW9uIGFib3V0XG5cdCAqIHRoZSBtZXRob2QuIElmIHNldCwgaXQgd291bGQgYXBwZW5kIHRoZSAncnVuZS5kb2MnXG5cdCAqIHByb3BlcnR5IGluIHRoZSBmdW5jdGlvbiBpdCByZXR1cm5zLiBBbmQgdGhlbiB0aGUgbGFuZ3VhZ2UgaW5zdGFuY2UgY291bGRcblx0ICogY2FsbCBgUnVuZS5kb2N1bWVudCg8aW5zdGFuY2U+KWAgdG8gZ2V0IGEgbWV0aG9kIHRoYXQgd291bGQgcmV0dXJuXG5cdCAqICd7IG1ldGhvZE5hbWU6IGRlc2NyaXB0aW9uIH0nIHdoZW4gaXQgZ290IGludm9rZWQuXG5cdCAqL1xuXHRSdW5lLmRlZmluZSA9IGZ1bmN0aW9uIChtZXRob2QsIGFzKSB7XG5cdCAgdmFyIGRvYyA9IGFyZ3VtZW50cy5sZW5ndGggPD0gMiB8fCBhcmd1bWVudHNbMl0gPT09IHVuZGVmaW5lZCA/ICcnIDogYXJndW1lbnRzWzJdO1xuXHRcblx0ICB2YXIgYnVpbHQgPSBmdW5jdGlvbiBidWlsdCgpIHtcblx0ICAgIHZhciBub2RlLCByZXN1bHRzdGFjaztcblx0XG5cdCAgICBmb3IgKHZhciBfbGVuID0gYXJndW1lbnRzLmxlbmd0aCwgYXJncyA9IEFycmF5KF9sZW4pLCBfa2V5ID0gMDsgX2tleSA8IF9sZW47IF9rZXkrKykge1xuXHQgICAgICBhcmdzW19rZXldID0gYXJndW1lbnRzW19rZXldO1xuXHQgICAgfVxuXHRcblx0ICAgIHN3aXRjaCAoYXMpIHtcblx0ICAgICAgY2FzZSAncHVzaCc6XG5cdCAgICAgICAgbm9kZSA9IG5ldyBSdW5lLk5vZGUobWV0aG9kLCBhcmdzLCB0aGlzLnN0YWNrKTtcblx0ICAgICAgICB0aGlzLnN0YWNrLnB1c2gobm9kZSk7XG5cdCAgICAgICAgcmVzdWx0c3RhY2sgPSB0aGlzLm9uY2hhbmdlKHRoaXMuY29udGV4dCwgbm9kZSwgdGhpcy5zdGFjayk7XG5cdCAgICAgICAgYnJlYWs7XG5cdCAgICAgIGNhc2UgJ2JlZ2luJzpcblx0ICAgICAgICB0aGlzLl9wcmV2c3RhY2sgPSB0aGlzLnN0YWNrO1xuXHQgICAgICAgIHRoaXMuc3RhY2sgPSBbXTtcblx0ICAgICAgICBub2RlID0gbmV3IFJ1bmUuTm9kZShtZXRob2QsIGFyZ3MsIHRoaXMuc3RhY2spO1xuXHQgICAgICAgIHRoaXMuc3RhY2sucHVzaChub2RlKTsgLy8gYXMgdGhlIGZpcnN0IG5vZGUgb2YgdGhlIG5ldyBzdGFjay5cblx0ICAgICAgICByZXN1bHRzdGFjayA9IHRoaXMub25jaGFuZ2UodGhpcy5jb250ZXh0LCBub2RlLCB0aGlzLnN0YWNrKTtcblx0ICAgICAgICBicmVhaztcblx0ICAgICAgY2FzZSAnZW5kJzpcblx0ICAgICAgICBub2RlID0gbmV3IFJ1bmUuTm9kZShtZXRob2QsIGFyZ3MsIHRoaXMuc3RhY2spO1xuXHQgICAgICAgIHRoaXMuc3RhY2sucHVzaChub2RlKTsgLy8gdGhlIGxhc3Qgbm9kZSBvZiB0aGUgc3RhY2suXG5cdCAgICAgICAgdGhpcy5zdGFjayA9IHRoaXMuX3ByZXZzdGFjazsgLy8gc3dpdGNoIGJhY2sgdG8gdGhlIHByZXZpb3VzIHN0YWNrLlxuXHQgICAgICAgIHJlc3VsdHN0YWNrID0gdGhpcy5vbmNoYW5nZSh0aGlzLmNvbnRleHQsIG5vZGUsIHRoaXMuc3RhY2spO1xuXHQgICAgICAgIGJyZWFrO1xuXHQgICAgICBjYXNlICdleGl0Jzpcblx0ICAgICAgICBub2RlID0gbmV3IFJ1bmUuTm9kZShtZXRob2QsIGFyZ3MsIHRoaXMuc3RhY2spO1xuXHQgICAgICAgIHRoaXMuc3RhY2sucHVzaChub2RlKTsgLy8gdGhlIGxhc3Qgbm9kZSBvZiB0aGUgc3RhY2suXG5cdCAgICAgICAgcmVzdWx0c3RhY2sgPSB0aGlzLm9uY2hhbmdlKHRoaXMuY29udGV4dCwgbm9kZSwgdGhpcy5zdGFjayk7XG5cdCAgICAgICAgaWYgKCFyZXN1bHRzdGFjaykge1xuXHQgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdcXCdleGl0XFwnIG5vZGUgXFwnJyArIG5vZGUudHlwZSArICdcXCcgc2hvdWxkXFxuICAgICAgICAgICAgcmV0dXJuIGEgcmVzdWx0c3RhY2suJyk7XG5cdCAgICAgICAgfVxuXHQgICAgICAgIHJldHVybiByZXN1bHRzdGFja1swXTtcblx0ICAgIH1cblx0ICAgIC8vIElmIHRoZSBoYW5kbGVyIHVwZGF0ZXMgdGhlIHN0YWNrLCBpdCB3b3VsZCByZXBsYWNlIHRoZSBleGlzdGluZyBvbmUuXG5cdCAgICBpZiAocmVzdWx0c3RhY2spIHtcblx0ICAgICAgdGhpcy5zdGFjayA9IHJlc3VsdHN0YWNrO1xuXHQgICAgfVxuXHQgICAgcmV0dXJuIHRoaXM7XG5cdCAgfTtcblx0ICBidWlsdC5ydW5lID0ge1xuXHQgICAgJ2FzJzogYXMsXG5cdCAgICAnZG9jJzogZG9jLFxuXHQgICAgJ21ldGhvZCc6IG1ldGhvZFxuXHQgIH07XG5cdCAgcmV0dXJuIGJ1aWx0O1xuXHR9O1xuXHRcblx0LyoqXG5cdCAqIEdlbmVyYXRlIGEgbWV0aG9kIHRoYXQgd291bGQgcmV0dXJuIGFsbCBkb2N1bWVudHMgb2YgdGhlIG1ldGhvZHMsXG5cdCAqIGluIGEgZm9ybSBvZiAneyBtZXRob2ROYW1lOiBkZXNjcmlwdGlvbiB9Jy5cblx0ICpcblx0ICogVGhlIGFyZ3VtZW50IG11c3QgYmUgdGhlIGxhbmd1YWdlIGluc3RhbmNlIHdpdGggYWxsIGRlZmluZWQgbWV0aG9kcy5cblx0ICovXG5cdFJ1bmUucHVibGlzaCA9IGZ1bmN0aW9uIChpbnN0YW5jZSkge1xuXHQgIHZhciBnZW5lcmF0ZWQgPSBPYmplY3Qua2V5cyhpbnN0YW5jZSkucmVkdWNlKGZ1bmN0aW9uIChkb2MsIG5hbWUpIHtcblx0ICAgIHZhciBtZXRob2QgPSBpbnN0YW5jZVtuYW1lXTtcblx0ICAgIGlmIChtZXRob2QucnVuZSkge1xuXHQgICAgICBkb2NbbmFtZV0gPSBtZXRob2QucnVuZS5kb2M7XG5cdCAgICB9XG5cdCAgfSwge30pO1xuXHQgIHJldHVybiBmdW5jdGlvbiAoKSB7XG5cdCAgICByZXR1cm4gZ2VuZXJhdGVkO1xuXHQgIH07XG5cdH07XG5cdFxuXHRSdW5lLk5vZGUgPSBmdW5jdGlvbiAodHlwZSwgYXJncywgc3RhY2spIHtcblx0ICB0aGlzLnR5cGUgPSB0eXBlO1xuXHQgIHRoaXMuYXJncyA9IGFyZ3M7XG5cdCAgdGhpcy5zdGFjayA9IHN0YWNrO1xuXHR9O1xuXHRcblx0UnVuZS5FdmFsdWF0ZSA9IGZ1bmN0aW9uICgpIHtcblx0ICB2YXIgY29udGV4dCA9IGFyZ3VtZW50cy5sZW5ndGggPD0gMCB8fCBhcmd1bWVudHNbMF0gPT09IHVuZGVmaW5lZCA/IHt9IDogYXJndW1lbnRzWzBdO1xuXHRcblx0ICB0aGlzLl9hbmFseXplcnMgPSBbXTtcblx0ICB0aGlzLl9pbnRlcnByZXRlciA9IG51bGw7XG5cdCAgdGhpcy5fY29udGV4dCA9IGNvbnRleHQ7XG5cdH07XG5cdFxuXHQvKipcblx0ICogQW5hbHl6ZXIgY291bGQgcmVjZWl2ZSB0aGUgc3RhY2sgY2hhbmdlIGZyb20gJ1J1bmUjZXZhbHVhdGUnLFxuXHQgKiBhbmQgaXQgd291bGQgYmUgY2FsbGVkIHdpdGggdGhlIGFyZ3VtZW50cyBhcyB0aGUgZnVuY3Rpb24gZGVzY3JpYmVzOlxuXHQgKlxuXHQgKiAgICAgUnVuZS5wcm90b3R5cGUuZXZhbHVhdGUoKGNvbnRleHQsIGNoYW5nZSwgc3RhY2spID0+IHtcblx0ICogICAgICAgIC8vIC4uLlxuXHQgKiAgICAgfSk7XG5cdCAqXG5cdCAqIFNvIHRoZSBhbmFseXplciBjb3VsZCBiZTpcblx0ICpcblx0ICogICAgZnVuY3Rpb24oY29udGV4dCwgY2hhbmdlLCBzdGFjaykge1xuXHQgKiAgICAgIC8vIERvIHNvbWUgY2hlY2sgYW5kIG1heWJlIGNoYW5nZWQgdGhlIGNvbnRleHQuXG5cdCAqICAgICAgLy8gVGhlIG5leHQgYW5hbHl6ZXIgdG8gdGhlIGludGVycHJldGVyIHdvdWxkIGFjY2VwdCB0aGUgYWx0ZXJuYXRlZFxuXHQgKiAgICAgIC8vIGNvbnRleHQgYXMgdGhlIGFyZ3VtZW50ICdjb250ZXh0Jy5cblx0ICogICAgICBjb250ZXh0LnNvbWVGbGFnID0gdHJ1ZTtcblx0ICogICAgICAvLyBXaGVuIHRoZXJlIGlzIHdyb25nLCB0aHJvdyBpdC5cblx0ICogICAgICB0aHJvdyBuZXcgRXJyb3IoJ1NvbWUgYW5hbHl6aW5nIGVycm9yJyk7XG5cdCAqICAgIH07XG5cdCAqXG5cdCAqIE5vdGUgdGhhdCB0aGUgYW5hbHl6ZXIgKCdhJykgd291bGQgYmUgaW52b2tlZCB3aXRoIGVtcHR5ICd0aGlzJyBvYmplY3QsXG5cdCAqIHNvIHRoZSBmdW5jdGlvbiByZWxpZXMgb24gJ3RoaXMnIHNob3VsZCBiaW5kIGl0c2VsZiBmaXJzdC5cblx0ICovXG5cdFJ1bmUuRXZhbHVhdGUucHJvdG90eXBlLmFuYWx5emVyID0gZnVuY3Rpb24gKGEpIHtcblx0ICB0aGlzLl9hbmFseXplcnMucHVzaChhKTtcblx0ICByZXR1cm4gdGhpcztcblx0fTtcblx0XG5cdC8qKlxuXHQgKiBPbmUgRXZhbHVhdGUgY2FuIG9ubHkgaGF2ZSBvbmUgaW50ZXJwcmV0ZXIsIGFuZCBpdCB3b3VsZCByZXR1cm5cblx0ICogdGhlIGZ1bmN0aW9uIGNvdWxkIGNvbnN1bWUgZXZlcnkgc3RhY2sgY2hhbmdlIGZyb20gJ1J1bmUjZXZhbHVhdGUnLlxuXHQgKlxuXHQgKiBUaGUgY29kZSBpcyBhIGxpdHRsZSBjb21wbGljYXRlZDogd2UgaGF2ZSB0d28ga2luZHMgb2YgJ3JlZHVjaW5nJzpcblx0ICogb25lIGlzIHRvIHJlZHVjZSBhbGwgYW5hbHl6ZXJzIHdpdGggdGhlIHNpbmdsZSBpbmNvbWluZyBjaGFuZ2UsXG5cdCAqIGFub3RoZXIgaXMgdG8gcmVkdWNlIGFsbCBpbmNvbWluZyBjaGFuZ2VzIHdpdGggdGhpcyBhbmFseXplcnMgKyBpbnRlcnByZXRlci5cblx0ICpcblx0ICogVGhlIGFuYWx5emVyIGFuZCBpbnRlcnByZXRlciBzaG91bGQgY2hhbmdlIHRoZSBjb250ZXh0LCB0byBtZW1vcml6ZSB0aGVcblx0ICogc3RhdGVzIG9mIHRoZSBldmFsdWF0aW9uLiBUaGUgZGlmZmVyZW5jZSBpcyBpbnRlcnByZXRlciBzaG91bGQgcmV0dXJuIG9uZVxuXHQgKiBuZXcgc3RhY2sgaWYgaXQgbmVlZHMgdG8gdXBkYXRlIHRoZSBleGlzdGluZyBvbmUuIFRoZSBzdGFjayBpdCByZXR1cm5zIHdvdWxkXG5cdCAqIHJlcGxhY2UgdGhlIGV4aXN0aW5nIG9uZSwgc28gYW55dGhpbmcgc3RpbGwgaW4gdGhlIG9sZCBvbmUgd291bGQgYmUgd2lwZWRcblx0ICogb3V0LiBUaGUgaW50ZXJwcmV0ZXIgY291bGQgcmV0dXJuIG5vdGhpbmcgKCd1bmRlZmluZWQnKSB0byBrZWVwIHRoZSBzdGFja1xuXHQgKiB1bnRvdWNoZWQuXG5cdCAqXG5cdCAqIFRoZSBhbmFseXplcnMgYW5kIGludGVycHJldGVyIGNvdWxkIGNoYW5nZSB0aGUgJ2NvbnRleHQnIHBhc3MgdG8gdGhlbS5cblx0ICogQW5kIHNpbmNlIHdlIG1heSB1cGRhdGUgdGhlIHN0YWNrIGFzIGFib3ZlLCB0aGUgY29udGV4dCBzaG91bGQgbWVtb3JpemVcblx0ICogdGhvc2UgaW5mb3JtYXRpb24gbm90IHRvIGJlIG92ZXJ3cml0dGVuIHdoaWxlIHRoZSBzdGFjayBnZXQgd2lwZWQgb3V0LlxuXHQgKlxuXHQgKiBBbmQgaWYgdGhlIGludGVycHJldGluZyBub2RlIGlzIHRoZSBleGl0IG5vZGUgb2YgdGhlIHNlc3Npb24sIGludGVycHJldGVyXG5cdCAqIHNob3VsZCByZXR1cm4gYSBuZXcgc3RhY2sgY29udGFpbnMgb25seSBvbmUgZmluYWwgcmVzdWx0IG5vZGUuIElmIHRoZXJlXG5cdCAqIGlzIG5vIHN1Y2ggbm9kZSwgdGhlIHJlc3VsdCBvZiB0aGlzIHNlc3Npb24gaXMgJ3VuZGVmaW5lZCcuXG5cdCAqL1xuXHRSdW5lLkV2YWx1YXRlLnByb3RvdHlwZS5pbnRlcnByZXRlciA9IGZ1bmN0aW9uIChpbnB0KSB7XG5cdCAgdmFyIF90aGlzID0gdGhpcztcblx0XG5cdCAgLy8gVGhlIGN1c3RvbWl6ZWQgbGFuZ3VhZ2Ugc2hvdWxkIGdpdmUgdGhlIGRlZmF1bHQgY29udGV4dC5cblx0ICByZXR1cm4gZnVuY3Rpb24gKGNvbnRleHQsIGNoYW5nZSwgc3RhY2spIHtcblx0ICAgIHRyeSB7XG5cdCAgICAgIC8vIEFuYWx5emVycyBjb3VsZCBjaGFuZ2UgdGhlIGNvbnRleHQuXG5cdCAgICAgIF90aGlzLl9hbmFseXplcnMucmVkdWNlKGZ1bmN0aW9uIChjdHgsIGFuYWx5emVyKSB7XG5cdCAgICAgICAgYW5hbHl6ZXIuY2FsbCh7fSwgY29udGV4dCwgY2hhbmdlLCBzdGFjayk7XG5cdCAgICAgIH0sIGNvbnRleHQpO1xuXHQgICAgfSBjYXRjaCAoZSkge1xuXHQgICAgICBfdGhpcy5faGFuZGxlRXJyb3IoZSwgY29udGV4dCwgY2hhbmdlLCBzdGFjayk7XG5cdCAgICB9XG5cdCAgICAvLyBBZnRlciBhbmFseXplIGl0LCBpbnRlcnByZXQgdGhlIG5vZGUgYW5kIHJldHVybiB0aGUgbmV3IHN0YWNrIChpZiBhbnkpLlxuXHQgICAgdmFyIG5ld1N0YWNrID0gaW5wdChjb250ZXh0LCBjaGFuZ2UsIHN0YWNrKTtcblx0ICAgIHJldHVybiBuZXdTdGFjaztcblx0ICB9O1xuXHR9O1xuXHRcblx0UnVuZS5FdmFsdWF0ZS5wcm90b3R5cGUuX2hhbmRsZUVycm9yID0gZnVuY3Rpb24gKGVyciwgY29udGV4dCwgY2hhbmdlLCBzdGFjaykge1xuXHQgIC8vIFRPRE86IGV4cGFuZCBpdCB0byBwcm92aWRlIG1vcmUgc29waGlzdGljIGRlYnVnZ2luZyBtZXNzYWdlLlxuXHQgIHRocm93IG5ldyBFcnJvcignV2hlbiBjaGFuZ2UgJyArIGNoYW5nZS50eXBlICsgJyBjb21lcyBlcnJvciBcXCcnICsgZXJyICsgJ1xcJyBoYXBwZW5lZCcpO1xuXHR9O1xuXG4vKioqLyB9XG4vKioqKioqLyBdKSkpO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxleUoyWlhKemFXOXVJam96TENKemIzVnlZMlZ6SWpwYkluZGxZbkJoWTJzNkx5OHZkMlZpY0dGamF5OWliMjkwYzNSeVlYQWdZalZpWXpCak5UQTFZMkppWWpaaU1UVTVNemNpTENKM1pXSndZV05yT2k4dkx5NHZjM0pqTDNKMWJtVXVhbk1pWFN3aWJtRnRaWE1pT2x0ZExDSnRZWEJ3YVc1bmN5STZJanRCUVVGQk8wRkJRMEU3TzBGQlJVRTdRVUZEUVRzN1FVRkZRVHRCUVVOQk8wRkJRMEU3TzBGQlJVRTdRVUZEUVR0QlFVTkJMSFZDUVVGbE8wRkJRMlk3UVVGRFFUdEJRVU5CT3p0QlFVVkJPMEZCUTBFN08wRkJSVUU3UVVGRFFUczdRVUZGUVR0QlFVTkJPMEZCUTBFN096dEJRVWRCTzBGQlEwRTdPMEZCUlVFN1FVRkRRVHM3UVVGRlFUdEJRVU5CT3p0QlFVVkJPMEZCUTBFN096czdPenM3UVVOMFEwRXNZVUZCV1N4RFFVRkRPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN08wRkJjVWRPTEZWQlFWTXNTVUZCU1N4SFFVRkhMRVZCUVVVN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN1FVRTBRbnBDTEV0QlFVa3NRMEZCUXl4TlFVRk5MRWRCUVVjc1ZVRkJVeXhOUVVGTkxFVkJRVVVzUlVGQlJTeEZRVUZaTzA5QlFWWXNSMEZCUnl4NVJFRkJSeXhGUVVGRk96dEJRVU42UXl4UFFVRkpMRXRCUVVzc1IwRkJSeXhUUVVGU0xFdEJRVXNzUjBGQmNVSTdRVUZETlVJc1UwRkJTU3hKUVVGSkxFVkJRVVVzVjBGQlZ5eERRVUZET3p0MVEwRkVRU3hKUVVGSk8wRkJRVW9zVjBGQlNUczdPMEZCUlRGQ0xHRkJRVkVzUlVGQlJUdEJRVU5TTEZsQlFVc3NUVUZCVFR0QlFVTlVMR0ZCUVVrc1IwRkJSeXhKUVVGSkxFbEJRVWtzUTBGQlF5eEpRVUZKTEVOQlFVTXNUVUZCVFN4RlFVRkZMRWxCUVVrc1JVRkJSU3hKUVVGSkxFTkJRVU1zUzBGQlN5eERRVUZETEVOQlFVTTdRVUZETDBNc1lVRkJTU3hEUVVGRExFdEJRVXNzUTBGQlF5eEpRVUZKTEVOQlFVTXNTVUZCU1N4RFFVRkRMRU5CUVVNN1FVRkRkRUlzYjBKQlFWY3NSMEZEVkN4SlFVRkpMRU5CUVVNc1VVRkJVU3hEUVVGRExFbEJRVWtzUTBGQlF5eFBRVUZQTEVWQlFVVXNTVUZCU1N4RlFVRkZMRWxCUVVrc1EwRkJReXhMUVVGTExFTkJRVU1zUTBGQlF6dEJRVU5vUkN4bFFVRk5PMEZCUTFJc1dVRkJTeXhQUVVGUE8wRkJRMVlzWVVGQlNTeERRVUZETEZWQlFWVXNSMEZCUnl4SlFVRkpMRU5CUVVNc1MwRkJTeXhEUVVGRE8wRkJRemRDTEdGQlFVa3NRMEZCUXl4TFFVRkxMRWRCUVVjc1JVRkJSU3hEUVVGRE8wRkJRMmhDTEdGQlFVa3NSMEZCUnl4SlFVRkpMRWxCUVVrc1EwRkJReXhKUVVGSkxFTkJRVU1zVFVGQlRTeEZRVUZGTEVsQlFVa3NSVUZCUlN4SlFVRkpMRU5CUVVNc1MwRkJTeXhEUVVGRExFTkJRVU03UVVGREwwTXNZVUZCU1N4RFFVRkRMRXRCUVVzc1EwRkJReXhKUVVGSkxFTkJRVU1zU1VGQlNTeERRVUZETEVOQlFVTTdRVUZEZEVJc2IwSkJRVmNzUjBGRFZDeEpRVUZKTEVOQlFVTXNVVUZCVVN4RFFVRkRMRWxCUVVrc1EwRkJReXhQUVVGUExFVkJRVVVzU1VGQlNTeEZRVUZGTEVsQlFVa3NRMEZCUXl4TFFVRkxMRU5CUVVNc1EwRkJRenRCUVVOb1JDeGxRVUZOTzBGQlExSXNXVUZCU3l4TFFVRkxPMEZCUTFJc1lVRkJTU3hIUVVGSExFbEJRVWtzU1VGQlNTeERRVUZETEVsQlFVa3NRMEZCUXl4TlFVRk5MRVZCUVVVc1NVRkJTU3hGUVVGRkxFbEJRVWtzUTBGQlF5eExRVUZMTEVOQlFVTXNRMEZCUXp0QlFVTXZReXhoUVVGSkxFTkJRVU1zUzBGQlN5eERRVUZETEVsQlFVa3NRMEZCUXl4SlFVRkpMRU5CUVVNc1EwRkJRenRCUVVOMFFpeGhRVUZKTEVOQlFVTXNTMEZCU3l4SFFVTlNMRWxCUVVrc1EwRkJReXhWUVVGVkxFTkJRVU03UVVGRGJFSXNiMEpCUVZjc1IwRkRWQ3hKUVVGSkxFTkJRVU1zVVVGQlVTeERRVUZETEVsQlFVa3NRMEZCUXl4UFFVRlBMRVZCUVVVc1NVRkJTU3hGUVVGRkxFbEJRVWtzUTBGQlF5eExRVUZMTEVOQlFVTXNRMEZCUXp0QlFVTm9SQ3hsUVVGTk8wRkJRMUlzV1VGQlN5eE5RVUZOTzBGQlExUXNZVUZCU1N4SFFVRkhMRWxCUVVrc1NVRkJTU3hEUVVGRExFbEJRVWtzUTBGQlF5eE5RVUZOTEVWQlFVVXNTVUZCU1N4RlFVRkZMRWxCUVVrc1EwRkJReXhMUVVGTExFTkJRVU1zUTBGQlF6dEJRVU12UXl4aFFVRkpMRU5CUVVNc1MwRkJTeXhEUVVGRExFbEJRVWtzUTBGQlF5eEpRVUZKTEVOQlFVTXNRMEZCUXp0QlFVTjBRaXh2UWtGQlZ5eEhRVU5VTEVsQlFVa3NRMEZCUXl4UlFVRlJMRU5CUVVNc1NVRkJTU3hEUVVGRExFOUJRVThzUlVGQlJTeEpRVUZKTEVWQlFVVXNTVUZCU1N4RFFVRkRMRXRCUVVzc1EwRkJReXhEUVVGRE8wRkJRMmhFTEdGQlFVa3NRMEZCUXl4WFFVRlhMRVZCUVVVN1FVRkRhRUlzYVVKQlFVMHNTVUZCU1N4TFFVRkxMSE5DUVVGcFFpeEpRVUZKTEVOQlFVTXNTVUZCU1N4clJFRkRhRUlzUTBGQlF6dFZRVU16UWp0QlFVTkVMR2RDUVVGUExGZEJRVmNzUTBGQlF5eERRVUZETEVOQlFVTXNRMEZCUXp0QlFVRkJMRTFCUTNwQ096dEJRVVZFTEZOQlFVa3NWMEZCVnl4RlFVRkZPMEZCUTJZc1YwRkJTU3hEUVVGRExFdEJRVXNzUjBGQlJ5eFhRVUZYTEVOQlFVTTdUVUZETVVJN1FVRkRSQ3haUVVGUExFbEJRVWtzUTBGQlF6dEpRVU5pTEVOQlFVTTdRVUZEUml4UlFVRkxMRU5CUVVNc1NVRkJTU3hIUVVGSE8wRkJRMWdzVTBGQlNTeEZRVUZGTEVWQlFVVTdRVUZEVWl4VlFVRkxMRVZCUVVVc1IwRkJSenRCUVVOV0xHRkJRVkVzUlVGQlJTeE5RVUZOTzBsQlEycENMRU5CUVVNN1FVRkRSaXhWUVVGUExFdEJRVXNzUTBGQlF6dEZRVU5rTEVOQlFVTTdPenM3T3pzN08wRkJVVVlzUzBGQlNTeERRVUZETEU5QlFVOHNSMEZCUnl4VlFVRlRMRkZCUVZFc1JVRkJSVHRCUVVOb1F5eFBRVUZKTEZOQlFWTXNSMEZCUnl4TlFVRk5MRU5CUVVNc1NVRkJTU3hEUVVGRExGRkJRVkVzUTBGQlF5eERRVUZETEUxQlFVMHNRMEZCUXl4VlFVRkRMRWRCUVVjc1JVRkJSU3hKUVVGSkxFVkJRVXM3UVVGRE1VUXNVMEZCU1N4TlFVRk5MRWRCUVVjc1VVRkJVU3hEUVVGRExFbEJRVWtzUTBGQlF5eERRVUZETzBGQlF6VkNMRk5CUVVrc1RVRkJUU3hEUVVGRExFbEJRVWtzUlVGQlJUdEJRVU5tTEZWQlFVY3NRMEZCUXl4SlFVRkpMRU5CUVVNc1IwRkJSeXhOUVVGTkxFTkJRVU1zU1VGQlNTeERRVUZETEVkQlFVY3NRMEZCUXp0TlFVTTNRanRKUVVOR0xFVkJRVVVzUlVGQlJTeERRVUZETEVOQlFVTTdRVUZEVUN4VlFVRlBMRmxCUVZjN1FVRkRhRUlzV1VGQlR5eFRRVUZUTEVOQlFVTTdTVUZEYkVJc1EwRkJRenRGUVVOSUxFTkJRVU03TzBGQlJVWXNTMEZCU1N4RFFVRkRMRWxCUVVrc1IwRkJSeXhWUVVGVExFbEJRVWtzUlVGQlJTeEpRVUZKTEVWQlFVVXNTMEZCU3l4RlFVRkZPMEZCUTNSRExFOUJRVWtzUTBGQlF5eEpRVUZKTEVkQlFVY3NTVUZCU1N4RFFVRkRPMEZCUTJwQ0xFOUJRVWtzUTBGQlF5eEpRVUZKTEVkQlFVY3NTVUZCU1N4RFFVRkRPMEZCUTJwQ0xFOUJRVWtzUTBGQlF5eExRVUZMTEVkQlFVY3NTMEZCU3l4RFFVRkRPMFZCUTNCQ0xFTkJRVU03TzBGQlJVWXNTMEZCU1N4RFFVRkRMRkZCUVZFc1IwRkJSeXhaUVVGMVFqdFBRVUZrTEU5QlFVOHNlVVJCUVVjc1JVRkJSVHM3UVVGRGJrTXNUMEZCU1N4RFFVRkRMRlZCUVZVc1IwRkJSeXhGUVVGRkxFTkJRVU03UVVGRGNrSXNUMEZCU1N4RFFVRkRMRmxCUVZrc1IwRkJSeXhKUVVGSkxFTkJRVU03UVVGRGVrSXNUMEZCU1N4RFFVRkRMRkZCUVZFc1IwRkJSeXhQUVVGUExFTkJRVU03UlVGRGVrSXNRMEZCUXpzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPMEZCZDBKR0xFdEJRVWtzUTBGQlF5eFJRVUZSTEVOQlFVTXNVMEZCVXl4RFFVRkRMRkZCUVZFc1IwRkJSeXhWUVVGVExFTkJRVU1zUlVGQlJUdEJRVU0zUXl4UFFVRkpMRU5CUVVNc1ZVRkJWU3hEUVVGRExFbEJRVWtzUTBGQlF5eERRVUZETEVOQlFVTXNRMEZCUXp0QlFVTjRRaXhWUVVGUExFbEJRVWtzUTBGQlF6dEZRVU5pTEVOQlFVTTdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN1FVRjVRa1lzUzBGQlNTeERRVUZETEZGQlFWRXNRMEZCUXl4VFFVRlRMRU5CUVVNc1YwRkJWeXhIUVVGSExGVkJRVk1zU1VGQlNTeEZRVUZGT3pzN08wRkJSVzVFTEZWQlFVOHNWVUZCUXl4UFFVRlBMRVZCUVVVc1RVRkJUU3hGUVVGRkxFdEJRVXNzUlVGQlN6dEJRVU5xUXl4VFFVRkpPenRCUVVWR0xHRkJRVXNzVlVGQlZTeERRVUZETEUxQlFVMHNRMEZCUXl4VlFVRkRMRWRCUVVjc1JVRkJSU3hSUVVGUkxFVkJRVXM3UVVGRGVFTXNhVUpCUVZFc1EwRkJReXhKUVVGSkxFTkJRVU1zUlVGQlJTeEZRVUZGTEU5QlFVOHNSVUZCUlN4TlFVRk5MRVZCUVVVc1MwRkJTeXhEUVVGRExFTkJRVU03VVVGRE0wTXNSVUZCUlN4UFFVRlBMRU5CUVVNc1EwRkJRenROUVVOaUxFTkJRVU1zVDBGQlRTeERRVUZETEVWQlFVVTdRVUZEVkN4aFFVRkxMRmxCUVZrc1EwRkJReXhEUVVGRExFVkJRVVVzVDBGQlR5eEZRVUZGTEUxQlFVMHNSVUZCUlN4TFFVRkxMRU5CUVVNc1EwRkJRenROUVVNNVF6czdRVUZGUkN4VFFVRkpMRkZCUVZFc1IwRkJSeXhKUVVGSkxFTkJRVU1zVDBGQlR5eEZRVUZGTEUxQlFVMHNSVUZCUlN4TFFVRkxMRU5CUVVNc1EwRkJRenRCUVVNMVF5eFpRVUZQTEZGQlFWRXNRMEZCUXp0SlFVTnFRaXhEUVVGRE8wVkJRMGdzUTBGQlF6czdRVUZGUml4TFFVRkpMRU5CUVVNc1VVRkJVU3hEUVVGRExGTkJRVk1zUTBGQlF5eFpRVUZaTEVkQlEzQkRMRlZCUVZNc1IwRkJSeXhGUVVGRkxFOUJRVThzUlVGQlJTeE5RVUZOTEVWQlFVVXNTMEZCU3l4RlFVRkZPenRCUVVWd1F5eFRRVUZOTEVsQlFVa3NTMEZCU3l4clFrRkJaMElzVFVGQlRTeERRVUZETEVsQlFVa3NkVUpCUVdsQ0xFZEJRVWNzYVVKQlFXRXNRMEZCUXp0RlFVTTNSU3hESWl3aVptbHNaU0k2SW5KMWJtVXVhbk1pTENKemIzVnlZMlZ6UTI5dWRHVnVkQ0k2V3lJZ1hIUXZMeUJVYUdVZ2JXOWtkV3hsSUdOaFkyaGxYRzRnWEhSMllYSWdhVzV6ZEdGc2JHVmtUVzlrZFd4bGN5QTlJSHQ5TzF4dVhHNGdYSFF2THlCVWFHVWdjbVZ4ZFdseVpTQm1kVzVqZEdsdmJseHVJRngwWm5WdVkzUnBiMjRnWDE5M1pXSndZV05yWDNKbGNYVnBjbVZmWHlodGIyUjFiR1ZKWkNrZ2UxeHVYRzRnWEhSY2RDOHZJRU5vWldOcklHbG1JRzF2WkhWc1pTQnBjeUJwYmlCallXTm9aVnh1SUZ4MFhIUnBaaWhwYm5OMFlXeHNaV1JOYjJSMWJHVnpXMjF2WkhWc1pVbGtYU2xjYmlCY2RGeDBYSFJ5WlhSMWNtNGdhVzV6ZEdGc2JHVmtUVzlrZFd4bGMxdHRiMlIxYkdWSlpGMHVaWGh3YjNKMGN6dGNibHh1SUZ4MFhIUXZMeUJEY21WaGRHVWdZU0J1WlhjZ2JXOWtkV3hsSUNoaGJtUWdjSFYwSUdsMElHbHVkRzhnZEdobElHTmhZMmhsS1Z4dUlGeDBYSFIyWVhJZ2JXOWtkV3hsSUQwZ2FXNXpkR0ZzYkdWa1RXOWtkV3hsYzF0dGIyUjFiR1ZKWkYwZ1BTQjdYRzRnWEhSY2RGeDBaWGh3YjNKMGN6b2dlMzBzWEc0Z1hIUmNkRngwYVdRNklHMXZaSFZzWlVsa0xGeHVJRngwWEhSY2RHeHZZV1JsWkRvZ1ptRnNjMlZjYmlCY2RGeDBmVHRjYmx4dUlGeDBYSFF2THlCRmVHVmpkWFJsSUhSb1pTQnRiMlIxYkdVZ1puVnVZM1JwYjI1Y2JpQmNkRngwYlc5a2RXeGxjMXR0YjJSMWJHVkpaRjB1WTJGc2JDaHRiMlIxYkdVdVpYaHdiM0owY3l3Z2JXOWtkV3hsTENCdGIyUjFiR1V1Wlhod2IzSjBjeXdnWDE5M1pXSndZV05yWDNKbGNYVnBjbVZmWHlrN1hHNWNiaUJjZEZ4MEx5OGdSbXhoWnlCMGFHVWdiVzlrZFd4bElHRnpJR3h2WVdSbFpGeHVJRngwWEhSdGIyUjFiR1V1Ykc5aFpHVmtJRDBnZEhKMVpUdGNibHh1SUZ4MFhIUXZMeUJTWlhSMWNtNGdkR2hsSUdWNGNHOXlkSE1nYjJZZ2RHaGxJRzF2WkhWc1pWeHVJRngwWEhSeVpYUjFjbTRnYlc5a2RXeGxMbVY0Y0c5eWRITTdYRzRnWEhSOVhHNWNibHh1SUZ4MEx5OGdaWGh3YjNObElIUm9aU0J0YjJSMWJHVnpJRzlpYW1WamRDQW9YMTkzWldKd1lXTnJYMjF2WkhWc1pYTmZYeWxjYmlCY2RGOWZkMlZpY0dGamExOXlaWEYxYVhKbFgxOHViU0E5SUcxdlpIVnNaWE03WEc1Y2JpQmNkQzh2SUdWNGNHOXpaU0IwYUdVZ2JXOWtkV3hsSUdOaFkyaGxYRzRnWEhSZlgzZGxZbkJoWTJ0ZmNtVnhkV2x5WlY5ZkxtTWdQU0JwYm5OMFlXeHNaV1JOYjJSMWJHVnpPMXh1WEc0Z1hIUXZMeUJmWDNkbFluQmhZMnRmY0hWaWJHbGpYM0JoZEdoZlgxeHVJRngwWDE5M1pXSndZV05yWDNKbGNYVnBjbVZmWHk1d0lEMGdYQ0pjSWp0Y2JseHVJRngwTHk4Z1RHOWhaQ0JsYm5SeWVTQnRiMlIxYkdVZ1lXNWtJSEpsZEhWeWJpQmxlSEJ2Y25SelhHNGdYSFJ5WlhSMWNtNGdYMTkzWldKd1lXTnJYM0psY1hWcGNtVmZYeWd3S1R0Y2JseHVYRzVjYmk4cUtpQlhSVUpRUVVOTElFWlBUMVJGVWlBcUtseHVJQ29xSUhkbFluQmhZMnN2WW05dmRITjBjbUZ3SUdJMVltTXdZelV3TldOaVltSTJZakUxT1RNM1hHNGdLaW92SWl3aUozVnpaU0J6ZEhKcFkzUW5PMXh1WEc0dktpcGNiaUFxSUVkbGJtVnlhV01nWW5WcGJHUmxjaUIwYUdGMElIZHZkV3hrSUhCMWMyZ2dibTlrWlhNZ2FXNTBieUIwYUdVZ1pVUlRUQ0J6ZEdGamF5NWNiaUFxSUZWelpYSWdZMjkxYkdRZ2FXNW9aWEpwZENCMGFHbHpJSFJ2SUdSbFptbHVaU0IwYUdVZ2JtVjNJR1ZFVTB3dVhHNGdLaUF0TFMxY2JpQXFJRlJvWlNCa1pXWmhkV3gwSUhObGJXRnVkR2xqY3lCdmJteDVJR052Ym5SaGFXNGdkR2hsYzJVZ2IzQmxjbUYwYVc5dWN6cGNiaUFxWEc0Z0tpQXhMaUJiY0hWemFGMGdPaUJ3ZFhOb0lIUnZJSFJvWlNCamRYSnlaVzUwSUhOMFlXTnJYRzRnS2lBeUxpQmJZbVZuYVc1ZE9pQmpjbVZoZEdVZ1lTQnVaWGNnYzNSaFkyc2dZVzVrSUhOM2FYUmphQ0IwYnlCcGRDeGNiaUFxSUNBZ0lDQWdJQ0FnSUNBZ0lHRnVaQ0IwYUdWdUlIQjFjMmdnZEdobElHNXZaR1VnYVc1MGJ5QjBhR1VnYzNSaFkyc3VYRzRnS2lBekxpQmJaVzVrWFNBZ09pQmhablJsY2lCd2RYTm9JSFJvWlNCdWIyUmxJR2x1ZEc4Z2RHaGxJSE4wWVdOckxGeHVJQ29nSUNBZ0lDQWdJQ0FnSUNBZ1kyaGhibWRsSUhSb1pTQmpkWEp5Wlc1MElITjBZV05ySUhSdklIUm9aU0J3Y21WMmFXOTFjeUJ2Ym1VdVhHNGdLaUEwTGlCYlpYaHBkRjBnT2lCbGVHbDBJSFJvWlNCamIyNTBaWGgwSUc5bUlIUm9hWE1nWlVSVFREc2dkR2hsSUd4aGMzUWdjbVZ6ZFd4MFhHNGdLaUFnSUNBZ0lDQWdJQ0FnSUNCdlppQnBkQ0IzYjNWc1pDQmlaU0J3WVhOelpXUWdkRzhnZEdobElISmxkSFZ5YmlCMllXeDFaU0J2Wmx4dUlDb2dJQ0FnSUNBZ0lDQWdJQ0FnZEdocGN5QmphR0ZwYmk1Y2JpQXFYRzRnS2lCVGRHRmpheUJqYjNWc1pDQmlaU0J1WlhOMFpXUTZJSGRvWlc0Z1cySmxaMmx1WFNCaElHNWxkeUJ6ZEdGamF5QnBiaUJtWVdOMElHbDBJSGR2ZFd4a1hHNGdLaUJ3ZFhOb0lIUm9aU0J6ZEdGamF5QnBiblJ2SUhSb1pTQndjbVYyYVc5MWN5QnZibVV1SUZOdklIUm9aU0J6ZEdGamF5QmpiMjF3Y21selpWeHVJQ29nVzI1dlpHVmRJR0Z1WkNCYmMzUmhZMnRkTGx4dUlDb2dMUzB0WEc0Z0tpQkJiSFJvYjNWbmFDQjBhR1VnWlVSVFRDQnBibk4wWVc1alpTQnphRzkxYkdRZ2QzSmhjQ0IwYUdWelpTQmlZWE5wWXlCdmNHVnlZWFJwYjI1elhHNGdLaUIwYnlCdFlXNXBjSFZzWVhSbElIUm9aU0J6ZEdGamF5d2dkR2hsZVNCaGJHd2dibVZsWkNCMGJ5QmpiMjUyWlhKMElIUm9aU0J0WlhSb2IyUmNiaUFxSUdOaGJHd2dkRzhnYm05a1pYTXVJRk52SUNkU2RXNWxKeUJ3Y205MmFXUmxJR0VnZDJGNUlIUnZJSE5wYlhCc2FXWjVJSFJvWlNCM2IzSnJPaUJwWmx4dUlDb2dkR2hsSUdsdWMzUmhibU5sSUdOaGJHd2dkR2hsSUZ0a1pXWnBibVZkSUcxbGRHaHZaQ0IwYUdVZ2JtRnRaU0J2WmlCMGFHVWdiV1YwYUc5a0xGeHVJQ29nYVhRZ1kyOTFiR1FnWVhOemIyTnBZWFJsSUhSb1pTQnZjR1Z5WVc1a0lHOW1JSFJvWlNCbFJGTk1JSGRwZEdnZ2RHaGxJSE4wWVdOcklHMWhibWx3ZFd4aGRHbHZiaTVjYmlBcUlFWnZjaUJsZUdGdGNHeGxPbHh1SUNwY2JpQXFJQ0FnSUhaaGNpQmxSRk5NSUQwZ1puVnVZM1JwYjI0b0tTQjdmVHRjYmlBcUlDQWdJR1ZFVTB3dWNISnZkRzkwZVhCbExuUnlZVzV6WVdOMGFXOXVJRDBnVW5WdVpTNWtaV1pwYm1Vb0ozUnlZVzV6WVdOMGFXOXVKeXdnSjJKbFoybHVKeWs3WEc0Z0tpQWdJQ0JsUkZOTUxuQnliM1J2ZEhsd1pTNXdjbVVnUFNCU2RXNWxMbVJsWm1sdVpTZ25jSEpsSnl3Z0ozQjFjMmduS1R0Y2JpQXFJQ0FnSUdWRVUwd3VjSEp2ZEc5MGVYQmxMbkJsY21admNtMGdQU0JTZFc1bExtUmxabWx1WlNnbmNHVnlabTl5YlNjc0lDZHdkWE5vSnlrN1hHNGdLaUFnSUNCbFJGTk1MbkJ5YjNSdmRIbHdaUzV3YjNOMElEMGdVblZ1WlM1a1pXWnBibVVvSjNCdmMzUW5MQ0FuWlc1a0p5azdYRzRnS2x4dUlDb2dWR2hsYmlCMGFHVWdaVVJUVENCamIzVnNaQ0JpWlNCMWMyVmtJR0Z6T2x4dUlDcGNiaUFxSUNBZ0lDaHVaWGNnWlVSVFRDbGNiaUFxSUNBZ0lDQWdMblJ5WVc1ellXTjBhVzl1S0NsY2JpQXFJQ0FnSUNBZ0xuQnlaU2hqWWlsY2JpQXFJQ0FnSUNBZ0xuQmxjbVp2Y20wb1kySXBYRzRnS2lBZ0lDQWdJQzV3YjNOMEtHTmlLVnh1SUNwY2JpQXFJRUZ1WkNCMGFHVWdjM1JoWTJzZ2QyOTFiR1FnWW1VNlhHNGdLbHh1SUNvZ0lDQWdXMXh1SUNvZ0lDQWdJQ0J1YjJSbFBDZDBjbUZ1YzJGamRHbHZiaWNzUGx4dUlDb2dJQ0FnSUNCdWIyUmxQQ2R3Y21VbkxDQmpZajVjYmlBcUlDQWdJQ0FnYm05a1pUd25jSEpsWm05eWJTY3NJR05pUGx4dUlDb2dJQ0FnSUNCdWIyUmxQQ2R3YjNOMEp5d2dZMkkrWEc0Z0tpQWdJQ0JkWEc0Z0tseHVJQ29nU0c5M1pYWmxjaXdnZEdocGN5QnphVzF3YkdVZ1lYQndjbTloWTJnZ2RHaGxJSE5sYldGdWRHbGpjeUJ5ZFd4bGN5QmhibVFnWVc1aGJIbDZaWEp6SUhSdlhHNGdLaUJuZFdGeVlXNTBaV1VnZEdobElITjBZV05ySUdseklIWmhiR2xrTGlCR2IzSWdaWGhoYlhCc1pTd2dhV1lnZDJVZ2FHRjJaU0JoSUcxaGJHWnZjbTFsWkZ4dUlDb2djM1JoWTJzZ1ltVmpZWFZ6WlNCdlppQjBhR1VnWm05c2JHOTNhVzVuSUdWRVUwd2djSEp2WjNKaGJUcGNiaUFxWEc0Z0tpQWdJQ0FvYm1WM0lHVkVVMHdwWEc0Z0tpQWdJQ0FnSUM1d2IzTjBLR05pS1Z4dUlDb2dJQ0FnSUNBdWNISmxLR05pS1Z4dUlDb2dJQ0FnSUNBdWNHVnlabTl5YlNoallpbGNiaUFxSUNBZ0lDQWdMblJ5WVc1ellXTjBhVzl1S0NsY2JpQXFYRzRnS2lCVWFHVWdjblZ1ZEdsdFpTQnRZWGtnY21Wd2IzSjBJR1Z5Y205MElHSmxZMkYxYzJVZ2QyaGxiaUFuTG5CdmMzUW9ZMklwSnlCMGFHVnlaU0JwY3lCdWJ5QnpkR0ZqYTF4dUlDb2dZM0psWVhSbFpDQmllU0IwYUdVZ1ltVm5hVzV1YVc1bklITjBaWEFzSUc1aGJXVnNlU0IwYUdVZ0p5NXdjbVVvWTJJcEp5QnBiaUJ2ZFhJZ1kyRnpaUzVjYmlBcUlFNWxkbVZ5ZEdobGJHVnpjeXdnZEdobElHVnljbTl5SUcxbGMzTmhaMlVnYVhNZ2RHOXZJR3h2ZHkxc1pYWmxiQ0JtYjNJZ2RHaGxJR3hoYm1kMVlXZGxJSFZ6WlhJc1hHNGdLaUJ6YVc1alpTQjBhR1Y1SUhOb2IzVnNaQ0JqWVhKbElHNXZJSE4wWVdOcklIUm9hVzVuY3lCaGJtUWdjMmh2ZFd4a0lHOXViSGtnWTJGeVpTQmhZbTkxZENCMGFHVWdaVVJUVEZ4dUlDb2dhWFJ6Wld4bUxseHVJQ3BjYmlBcUlGUm9aU0J6YjJ4MWRHbHZiaUJwY3lCMGJ5QndjbTkyYVdSbElHRWdZbUZ6YVdNZ2MzUmhZMnNnYjNKa1pYSnBibWNnWVc1aGJIbDZaWElnWVc1a0lHeGxkQ0IwYUdWY2JpQXFJR3hoYm1kMVlXZGxJR1JsWTJsa1pTQm9iM2NnZEc4Z1pHVnpZM0pwWW1VZ2RHaGxJR1Z5Y205eUxpQkJibVFnYzJsdVkyVWdkMlVnWkc5dUozUWdhR0YyWlZ4dUlDb2dZVzU1SUdOdmJuUmxlSFFnYVc1bWIzSnRZWFJwYjI0Z1lXSnZkWFFnZG1GeWFXRmliR1Z6TENCelkyOXdaU0JoYm1RZ2IzUm9aWElnWld4bGJXVnVkSE5jYmlBcUlHRnpJR0VnWTI5dGNHeGxkR1VnY0hKdlozSmhiVzFwYm1jZ2JHRnVaM1ZoWjJVc0lIZGxJRzl1YkhrZ2JtVmxaQ0IwYnlCbmRXRnlZVzUwWldVZ2RHaGxJRzl5WkdWeUlHbHpYRzRnS2lCamIzSnlaV04wTENCaGJtUWdiV0ZyWlNCcGJtTnZjbkpsWTNRZ1kyRnpaWE1nYldWaGJtbHVaMloxYkM0Z1RXOXlaVzkyWlhJc0lITnBibU5sSUhSb1pTQmhibUZzZVhwbGNseHVJQ29nYm1WbFpITWdkRzhnWVc1aGJIbDZaU0IwYUdVZ2MzUmhkR1Z6SUhkb1pXNWxkbVZ5SUhSb1pTQnBibU52YldsdVp5QnViMlJsSUdOdmJXVnpMQ0JwZENCcGN5QnBiaUJtWVdOMFhHNGdLaUJoYmlCbGRtRnNkV0YwYVc5dUlIQnliMk5sYzNNc0lITnZJSFZ6WlhJZ1kyOTFiR1FnWTI5dFltbHVaU0IwYUdVZ1lXNWhiSGw2YVc1bklHRnVaQ0JwYm5SbGNuQnlaWFJwYm1kY2JpQXFJSEJvWVhObElHbHVkRzhnZEdobElITmhiV1VnWm5WdVkzUnBiMjR1SUVadmNpQmxlR0Z0Y0d4bE9seHVJQ3BjYmlBcUlDQWdJSEoxYm5ScGJXVXViMjVqYUdGdVoyVW9LR052Ym5SbGVIUXNJRzV2WkdVc0lITjBZV05yS1NBOVBpQjdYRzRnS2lBZ0lDQWdJQ0FnTHk4Z1NXWWdkR2hsSUdOb1lXNW5aU0JwY3lCMGJ5QnpkMmwwWTJnZ2RHOGdZU0J1WlhjZ2MzUmhZMnNzWEc0Z0tpQWdJQ0FnSUNBZ0x5OGdkR2hsSUNkemRHRmpheWNnYUdWeVpTQjNiM1ZzWkNCaVpTQjBhR1VnYm1WM0lITjBZV05yTGx4dUlDb2dJQ0FnSUNBZ0lIWmhjaUI3ZEhsd1pTd2dZWEpuYzMwZ1BTQnViMlJsTzF4dUlDb2dJQ0FnSUNBZ0lHbG1JQ2duY0hKbEp5QTlQVDBnZEhsd1pTa2dlMXh1SUNvZ0lDQWdJQ0FnSUNBZ1kyOXVkR1Y0ZEM1cGJtbDBJRDBnZEhKMVpUdGNiaUFxSUNBZ0lDQWdJQ0I5SUdWc2MyVWdhV1lnS0Nkd2IzTjBKeUE5UFQwZ2RIbHdaU0FtSmlBaFkyOXVkR1Y0ZEM1cGJtbDBLU0I3WEc0Z0tpQWdJQ0FnSUNBZ0lDQjBhSEp2ZHlCdVpYY2dSWEp5YjNJb0oxUm9aWEpsSUcxMWMzUWdZbVVnYjI1bElGd2ljSEpsWENJZ2JtOWtaU0JpWldadmNtVWdkR2hsSUZ3aWNHOXpkRndpTGljcE8xeHVJQ29nSUNBZ0lDQWdJSDFjYmlBcUlDQWdJSDBwTzF4dUlDcGNiaUFxSUZkcGRHZ2djM1ZqYUNCbVpXRjBkWEpsTENCcFppQjBhR1VnYVc1amIyMXBibWNnYm05a1pTQnZjaUIwYUdVZ2MzUmhZMnNnYVhNZ2JXRnNabTl5YldWa0xGeHVJQ29nYVhRZ2MyaHZkV3hrSUhSb2NtOTNJSFJvWlNCbGNuSnZjaTRnVkdobElHVnljbTl5SUdOaGNIUjFjbVZrSUdKNUlIUm9aU0JwYm5OMFlXNWpaU0JzYVd0bElIUm9hWE5jYmlBcUlHTnZkV3hrSUdKbElHRWdKMk52YlhCcGJHRjBhVzl1SUdWeWNtOXlKeTVjYmlBcVhHNGdLaUJVYUdVZ2JtOTBhV05sWVdKc1pTQm1ZV04wSUdseklGUm9aU0JqWVd4c1ltRmpheUJ2WmlCMGFHVWdKMjl1WTJoaGJtZGxKeUJwY3lCaFkzUjFZV3hzZVNCaElISmxaSFZqWlhJc1hHNGdLaUJ6YnlCMWMyVnlJR052ZFd4a0lIUnlaV0YwSUhSb1pTQndjbTlqWlhOeklHOW1JSFJvYVhNZ1pYWmhiSFZoZEdsdmJpQW1JR0Z1WVd4NWVtbHVaeUJoY3lCaElISmxaSFZqYVc1blhHNGdLaUJ3Y205alpYTnpJRzl1SUdGdUlHbHVabWx1YVhSbElITjBjbVZoYlM0Z1FXNWtJSE5wYm1ObElIZGxJR2hoZG1VZ1lTQnpkR0ZqYXlCdFlXTm9hVzVsTENCcFppQjBhR1ZjYmlBcUlISmxaSFZqWlhJZ2NtVjBkWEp1SUc1dmRHaHBibWNzSUhSb1pTQnpkR0ZqYXlCM2IzVnNaQ0JpWlNCbGJYQjBlUzRnVDNSb1pYSjNhWE5sTENCcFppQjBhR1VnY21Wa2RXTmxjbHh1SUNvZ2NtVjBkWEp1SUdFZ2JtVjNJSE4wWVdOckxDQnBkQ0IzYjNWc1pDQnlaWEJzWVdObElIUm9aU0J2YkdRZ2IyNWxMbHh1SUNwY2JpQXFJRUZ1WkNCd2JHVmhjMlVnYm05MFpTQjBhR1VnWlhoaGJYQnNaU0JwY3lCdGRXTm9JSE5wYlhCc2FXWnBaV1F1SUVadmNpQjBhR1ZjYmlBcUlISmxZV3dnWlVSVFRDQnBkQ0J6YUc5MWJHUWdZbVVnZFhObFpDQnZibXg1SUdGeklHRnVJR1Z1ZEhKNUlIUnZJR1JwYzNCaGRHTm9JSFJvWlNCamFHRnVaMlVnZEc5Y2JpQXFJSFJvWlNCeVpXRnNJR2hoYm1Sc1pYSnpMQ0IzYUdsamFDQnRZWGtnWTI5dGNISnBjMlVnYzJWMlpYSmhiQ0J6ZEdGMFpYTWdZVzVrSUdOdmJYQnZibVZ1ZEhNdVhHNGdLaTljYm1WNGNHOXlkQ0JtZFc1amRHbHZiaUJTZFc1bEtDa2dlMzFjYmx4dUx5b3FYRzRnS2lCSVpXeHdaWElnYldWMGFHOWtJSFJ2SUdKMWFXeGtJR2x1ZEdWeVptRmpaU0J2WmlCaElITndaV05wWm1saklFUlRUQzRnU1hRZ2QyOTFiR1FnY21WMGRYSnVJR0VnYldWMGFHOWtYRzRnS2lCdlppQjBhR1VnUkZOTUlHRnVaQ0IwYUdWdUlIUm9aU0JwYm5SbGNtWmhZMlVnWTI5MWJHUWdZWFIwWVdOb0lHbDBMbHh1SUNwY2JpQXFJRlJvWlNCeVpYUjFjbTVwYm1jZ1puVnVZM1JwYjI0Z2QyOTFiR1FnWVhOemRXMWxJSFJvWVhRZ2RHaGxJQ2QwYUdsekp5QnBibk5wWkdVZ2FYUWdhWE1nZEdobElISjFiblJwYldWY2JpQXFJRzltSUhSb1pTQnNZVzVuZFdGblpTNGdRVzVrSUhOcGJtTmxJSFJvWlNCdFpYUm9iMlFnYVhRZ2NtVjBkWEp1Y3lCM2IzVnNaQ0J5WlhGMWFYSmxJSFJ2SUdGalkyVnpjeUJ6YjIxbFhHNGdLaUJ0WlcxaVpYSnpJRzltSUhSb1pTQW5kR2hwY3ljc0lIUm9aU0FuZEdocGN5Y2djMmh2ZFd4a0lHaGhkbVVnSjNSb2FYTXVjM1JoWTJzbklHRnVaQ0FuZEdocGN5NWpiMjUwWlhoMEoxeHVJQ29nWVhNZ2RHaGxJRzFsZEdodlpDQnlaWEYxYVhKbGN5NWNiaUFxWEc0Z0tpQkpaaUJwZENkeklHRnVJQ2RsZUdsMEp5QnViMlJsTENCdFpXRnVjeUIwYUdVZ2MyVnpjMmx2YmlCcGN5QmxibVJsWkNCaGJtUWdkR2hsSUdsdWRHVnljSEpsZEdWeUlITm9iM1ZzWkZ4dUlDb2djbVYwZFhKdUlHRWdjM1JoWTJzZ1kyOXVkR0ZwYm5NZ2IyNXNlU0J2Ym1VZ2JtOWtaU0JoY3lCMGFHVWdjbVZ6ZFd4MElHOW1JSFJvWlNCelpYTnphVzl1TENCdmNpQjBhR1ZjYmlBcUlITmxjM05wYjI0Z2NtVjBkWEp1Y3lCdWIzUm9hVzVuTGlCR2IzSWdiM1JvWlhJZ2FXNXpkSEoxWTNScGIyNXpJSFJvWlNCemRHRmpheUJqWVc0Z2EyVmxjQ0J6YjIxbFhHNGdLaUJqYjIxd2RYUmxaQ0J5WlhOMWJIUWdkRzhnYzJsdGRXeGhkR1VnY21WaGJDQnpkR0ZqYXlCdFlXTm9hVzVsTGlCQ2RYUWdhWFFuY3lCUFN5QjBieUJ1YjNRZ2RYTmxJSFJvYVhOY2JpQXFJR1psWVhSMWNtVWdZVzVrSUdGc2QyRjVjeUJ5WlhSMWNtNGdZVzRnWlcxd2RIa2dKM04wWVdOckp5QmxkbVZ5ZVhScGJXVWdkR2hsSUNkdmJtTm9ZVzVuWlNjZ1oyVjBYRzRnS2lCallXeHNaV1FnWVc1a0lHbHVkR1Z5ZFhCMFpXUXVJRWx1SUhSb2FYTWdiVzlrWlNCcGRDQnRaV0Z1Y3lCMGFHVWdiR0Z1WjNWaFoyVWdkMkZ1ZENCMGJ5QnJaV1Z3WEc0Z0tpQmhiR3dnYzNSaGRHVnpJR0o1SUdsMGMyVnNaaTVjYmlBcVhHNGdLaUJRYkdWaGMyVWdibTkwWlNCMGFHRjBJR1p5YjIwZ2RHaGxJR1JsYzJOeWFYQjBhVzl1SUdGaWIzWmxMQ0FuWlc1a0p5QnRaV0Z1Y3lCemRHRmpheUFvYzNWaWMzUmhZMnNwWEc0Z0tpQmxibVJ6TGlCSmRDZHpJSFJ2ZEdGc2JIa2dhWEp5Wld4bGRtRnVkQ0IwYnlBblpYaHBkQ2N1WEc0Z0tseHVJQ29nVkdobElHeGhjM1FnWVhKbmRXMWxiblFnSjJSdll5Y2dhWE1nZDJoaGRDQmtaWE5wWjI1bGNpQmpiM1ZzWkNCd2RYUWdkR2hsSUdSbGMyTnlhWEIwYVc5dUlHRmliM1YwWEc0Z0tpQjBhR1VnYldWMGFHOWtMaUJKWmlCelpYUXNJR2wwSUhkdmRXeGtJR0Z3Y0dWdVpDQjBhR1VnSjNKMWJtVXVaRzlqSjF4dUlDb2djSEp2Y0dWeWRIa2dhVzRnZEdobElHWjFibU4wYVc5dUlHbDBJSEpsZEhWeWJuTXVJRUZ1WkNCMGFHVnVJSFJvWlNCc1lXNW5kV0ZuWlNCcGJuTjBZVzVqWlNCamIzVnNaRnh1SUNvZ1kyRnNiQ0JnVW5WdVpTNWtiMk4xYldWdWRDZzhhVzV6ZEdGdVkyVStLV0FnZEc4Z1oyVjBJR0VnYldWMGFHOWtJSFJvWVhRZ2QyOTFiR1FnY21WMGRYSnVYRzRnS2lBbmV5QnRaWFJvYjJST1lXMWxPaUJrWlhOamNtbHdkR2x2YmlCOUp5QjNhR1Z1SUdsMElHZHZkQ0JwYm5admEyVmtMbHh1SUNvdlhHNVNkVzVsTG1SbFptbHVaU0E5SUdaMWJtTjBhVzl1S0cxbGRHaHZaQ3dnWVhNc0lHUnZZeUE5SUNjbktTQjdYRzRnSUhaaGNpQmlkV2xzZENBOUlHWjFibU4wYVc5dUtDNHVMbUZ5WjNNcElIdGNiaUFnSUNCMllYSWdibTlrWlN3Z2NtVnpkV3gwYzNSaFkyczdYRzRnSUNBZ2MzZHBkR05vSUNoaGN5a2dlMXh1SUNBZ0lDQWdZMkZ6WlNBbmNIVnphQ2M2WEc0Z0lDQWdJQ0FnSUc1dlpHVWdQU0J1WlhjZ1VuVnVaUzVPYjJSbEtHMWxkR2h2WkN3Z1lYSm5jeXdnZEdocGN5NXpkR0ZqYXlrN1hHNGdJQ0FnSUNBZ0lIUm9hWE11YzNSaFkyc3VjSFZ6YUNodWIyUmxLVHRjYmlBZ0lDQWdJQ0FnY21WemRXeDBjM1JoWTJzZ1BWeHVJQ0FnSUNBZ0lDQWdJSFJvYVhNdWIyNWphR0Z1WjJVb2RHaHBjeTVqYjI1MFpYaDBMQ0J1YjJSbExDQjBhR2x6TG5OMFlXTnJLVHRjYmlBZ0lDQWdJQ0FnWW5KbFlXczdYRzRnSUNBZ0lDQmpZWE5sSUNkaVpXZHBiaWM2WEc0Z0lDQWdJQ0FnSUhSb2FYTXVYM0J5WlhaemRHRmpheUE5SUhSb2FYTXVjM1JoWTJzN1hHNGdJQ0FnSUNBZ0lIUm9hWE11YzNSaFkyc2dQU0JiWFR0Y2JpQWdJQ0FnSUNBZ2JtOWtaU0E5SUc1bGR5QlNkVzVsTGs1dlpHVW9iV1YwYUc5a0xDQmhjbWR6TENCMGFHbHpMbk4wWVdOcktUdGNiaUFnSUNBZ0lDQWdkR2hwY3k1emRHRmpheTV3ZFhOb0tHNXZaR1VwT3lBZ0x5OGdZWE1nZEdobElHWnBjbk4wSUc1dlpHVWdiMllnZEdobElHNWxkeUJ6ZEdGamF5NWNiaUFnSUNBZ0lDQWdjbVZ6ZFd4MGMzUmhZMnNnUFZ4dUlDQWdJQ0FnSUNBZ0lIUm9hWE11YjI1amFHRnVaMlVvZEdocGN5NWpiMjUwWlhoMExDQnViMlJsTENCMGFHbHpMbk4wWVdOcktUdGNiaUFnSUNBZ0lDQWdZbkpsWVdzN1hHNGdJQ0FnSUNCallYTmxJQ2RsYm1Rbk9seHVJQ0FnSUNBZ0lDQnViMlJsSUQwZ2JtVjNJRkoxYm1VdVRtOWtaU2h0WlhSb2IyUXNJR0Z5WjNNc0lIUm9hWE11YzNSaFkyc3BPMXh1SUNBZ0lDQWdJQ0IwYUdsekxuTjBZV05yTG5CMWMyZ29ibTlrWlNrN0lDQXZMeUIwYUdVZ2JHRnpkQ0J1YjJSbElHOW1JSFJvWlNCemRHRmpheTVjYmlBZ0lDQWdJQ0FnZEdocGN5NXpkR0ZqYXlBOVhHNGdJQ0FnSUNBZ0lDQWdkR2hwY3k1ZmNISmxkbk4wWVdOck95QXZMeUJ6ZDJsMFkyZ2dZbUZqYXlCMGJ5QjBhR1VnY0hKbGRtbHZkWE1nYzNSaFkyc3VYRzRnSUNBZ0lDQWdJSEpsYzNWc2RITjBZV05ySUQxY2JpQWdJQ0FnSUNBZ0lDQjBhR2x6TG05dVkyaGhibWRsS0hSb2FYTXVZMjl1ZEdWNGRDd2dibTlrWlN3Z2RHaHBjeTV6ZEdGamF5azdYRzRnSUNBZ0lDQWdJR0p5WldGck8xeHVJQ0FnSUNBZ1kyRnpaU0FuWlhocGRDYzZYRzRnSUNBZ0lDQWdJRzV2WkdVZ1BTQnVaWGNnVW5WdVpTNU9iMlJsS0cxbGRHaHZaQ3dnWVhKbmN5d2dkR2hwY3k1emRHRmpheWs3WEc0Z0lDQWdJQ0FnSUhSb2FYTXVjM1JoWTJzdWNIVnphQ2h1YjJSbEtUc2dJQzh2SUhSb1pTQnNZWE4wSUc1dlpHVWdiMllnZEdobElITjBZV05yTGx4dUlDQWdJQ0FnSUNCeVpYTjFiSFJ6ZEdGamF5QTlYRzRnSUNBZ0lDQWdJQ0FnZEdocGN5NXZibU5vWVc1blpTaDBhR2x6TG1OdmJuUmxlSFFzSUc1dlpHVXNJSFJvYVhNdWMzUmhZMnNwTzF4dUlDQWdJQ0FnSUNCcFppQW9JWEpsYzNWc2RITjBZV05yS1NCN1hHNGdJQ0FnSUNBZ0lDQWdkR2h5YjNjZ2JtVjNJRVZ5Y205eUtHQW5aWGhwZENjZ2JtOWtaU0FuSkh0dWIyUmxMblI1Y0dWOUp5QnphRzkxYkdSY2JpQWdJQ0FnSUNBZ0lDQWdJSEpsZEhWeWJpQmhJSEpsYzNWc2RITjBZV05yTG1BcE8xeHVJQ0FnSUNBZ0lDQjlYRzRnSUNBZ0lDQWdJSEpsZEhWeWJpQnlaWE4xYkhSemRHRmphMXN3WFR0Y2JpQWdJQ0I5WEc0Z0lDQWdMeThnU1dZZ2RHaGxJR2hoYm1Sc1pYSWdkWEJrWVhSbGN5QjBhR1VnYzNSaFkyc3NJR2wwSUhkdmRXeGtJSEpsY0d4aFkyVWdkR2hsSUdWNGFYTjBhVzVuSUc5dVpTNWNiaUFnSUNCcFppQW9jbVZ6ZFd4MGMzUmhZMnNwSUh0Y2JpQWdJQ0FnSUhSb2FYTXVjM1JoWTJzZ1BTQnlaWE4xYkhSemRHRmphenRjYmlBZ0lDQjlYRzRnSUNBZ2NtVjBkWEp1SUhSb2FYTTdYRzRnSUgwN1hHNGdJR0oxYVd4MExuSjFibVVnUFNCN1hHNGdJQ0FnSjJGekp6b2dZWE1zWEc0Z0lDQWdKMlJ2WXljNklHUnZZeXhjYmlBZ0lDQW5iV1YwYUc5a0p6b2diV1YwYUc5a0xGeHVJQ0I5TzF4dUlDQnlaWFIxY200Z1luVnBiSFE3WEc1OU8xeHVYRzR2S2lwY2JpQXFJRWRsYm1WeVlYUmxJR0VnYldWMGFHOWtJSFJvWVhRZ2QyOTFiR1FnY21WMGRYSnVJR0ZzYkNCa2IyTjFiV1Z1ZEhNZ2IyWWdkR2hsSUcxbGRHaHZaSE1zWEc0Z0tpQnBiaUJoSUdadmNtMGdiMllnSjNzZ2JXVjBhRzlrVG1GdFpUb2daR1Z6WTNKcGNIUnBiMjRnZlNjdVhHNGdLbHh1SUNvZ1ZHaGxJR0Z5WjNWdFpXNTBJRzExYzNRZ1ltVWdkR2hsSUd4aGJtZDFZV2RsSUdsdWMzUmhibU5sSUhkcGRHZ2dZV3hzSUdSbFptbHVaV1FnYldWMGFHOWtjeTVjYmlBcUwxeHVVblZ1WlM1d2RXSnNhWE5vSUQwZ1puVnVZM1JwYjI0b2FXNXpkR0Z1WTJVcElIdGNiaUFnZG1GeUlHZGxibVZ5WVhSbFpDQTlJRTlpYW1WamRDNXJaWGx6S0dsdWMzUmhibU5sS1M1eVpXUjFZMlVvS0dSdll5d2dibUZ0WlNrZ1BUNGdlMXh1SUNBZ0lIWmhjaUJ0WlhSb2IyUWdQU0JwYm5OMFlXNWpaVnR1WVcxbFhUdGNiaUFnSUNCcFppQW9iV1YwYUc5a0xuSjFibVVwSUh0Y2JpQWdJQ0FnSUdSdlkxdHVZVzFsWFNBOUlHMWxkR2h2WkM1eWRXNWxMbVJ2WXp0Y2JpQWdJQ0I5WEc0Z0lIMHNJSHQ5S1R0Y2JpQWdjbVYwZFhKdUlHWjFibU4wYVc5dUtDa2dlMXh1SUNBZ0lISmxkSFZ5YmlCblpXNWxjbUYwWldRN1hHNGdJSDA3WEc1OU8xeHVYRzVTZFc1bExrNXZaR1VnUFNCbWRXNWpkR2x2YmloMGVYQmxMQ0JoY21kekxDQnpkR0ZqYXlrZ2UxeHVJQ0IwYUdsekxuUjVjR1VnUFNCMGVYQmxPMXh1SUNCMGFHbHpMbUZ5WjNNZ1BTQmhjbWR6TzF4dUlDQjBhR2x6TG5OMFlXTnJJRDBnYzNSaFkyczdYRzU5TzF4dVhHNVNkVzVsTGtWMllXeDFZWFJsSUQwZ1puVnVZM1JwYjI0b1kyOXVkR1Y0ZENBOUlIdDlLU0I3WEc0Z0lIUm9hWE11WDJGdVlXeDVlbVZ5Y3lBOUlGdGRPMXh1SUNCMGFHbHpMbDlwYm5SbGNuQnlaWFJsY2lBOUlHNTFiR3c3WEc0Z0lIUm9hWE11WDJOdmJuUmxlSFFnUFNCamIyNTBaWGgwTzF4dWZUdGNibHh1THlvcVhHNGdLaUJCYm1Gc2VYcGxjaUJqYjNWc1pDQnlaV05sYVhabElIUm9aU0J6ZEdGamF5QmphR0Z1WjJVZ1puSnZiU0FuVW5WdVpTTmxkbUZzZFdGMFpTY3NYRzRnS2lCaGJtUWdhWFFnZDI5MWJHUWdZbVVnWTJGc2JHVmtJSGRwZEdnZ2RHaGxJR0Z5WjNWdFpXNTBjeUJoY3lCMGFHVWdablZ1WTNScGIyNGdaR1Z6WTNKcFltVnpPbHh1SUNwY2JpQXFJQ0FnSUNCU2RXNWxMbkJ5YjNSdmRIbHdaUzVsZG1Gc2RXRjBaU2dvWTI5dWRHVjRkQ3dnWTJoaGJtZGxMQ0J6ZEdGamF5a2dQVDRnZTF4dUlDb2dJQ0FnSUNBZ0lDOHZJQzR1TGx4dUlDb2dJQ0FnSUgwcE8xeHVJQ3BjYmlBcUlGTnZJSFJvWlNCaGJtRnNlWHBsY2lCamIzVnNaQ0JpWlRwY2JpQXFYRzRnS2lBZ0lDQm1kVzVqZEdsdmJpaGpiMjUwWlhoMExDQmphR0Z1WjJVc0lITjBZV05yS1NCN1hHNGdLaUFnSUNBZ0lDOHZJRVJ2SUhOdmJXVWdZMmhsWTJzZ1lXNWtJRzFoZVdKbElHTm9ZVzVuWldRZ2RHaGxJR052Ym5SbGVIUXVYRzRnS2lBZ0lDQWdJQzh2SUZSb1pTQnVaWGgwSUdGdVlXeDVlbVZ5SUhSdklIUm9aU0JwYm5SbGNuQnlaWFJsY2lCM2IzVnNaQ0JoWTJObGNIUWdkR2hsSUdGc2RHVnlibUYwWldSY2JpQXFJQ0FnSUNBZ0x5OGdZMjl1ZEdWNGRDQmhjeUIwYUdVZ1lYSm5kVzFsYm5RZ0oyTnZiblJsZUhRbkxseHVJQ29nSUNBZ0lDQmpiMjUwWlhoMExuTnZiV1ZHYkdGbklEMGdkSEoxWlR0Y2JpQXFJQ0FnSUNBZ0x5OGdWMmhsYmlCMGFHVnlaU0JwY3lCM2NtOXVaeXdnZEdoeWIzY2dhWFF1WEc0Z0tpQWdJQ0FnSUhSb2NtOTNJRzVsZHlCRmNuSnZjaWduVTI5dFpTQmhibUZzZVhwcGJtY2daWEp5YjNJbktUdGNiaUFxSUNBZ0lIMDdYRzRnS2x4dUlDb2dUbTkwWlNCMGFHRjBJSFJvWlNCaGJtRnNlWHBsY2lBb0oyRW5LU0IzYjNWc1pDQmlaU0JwYm5admEyVmtJSGRwZEdnZ1pXMXdkSGtnSjNSb2FYTW5JRzlpYW1WamRDeGNiaUFxSUhOdklIUm9aU0JtZFc1amRHbHZiaUJ5Wld4cFpYTWdiMjRnSjNSb2FYTW5JSE5vYjNWc1pDQmlhVzVrSUdsMGMyVnNaaUJtYVhKemRDNWNiaUFxTDF4dVVuVnVaUzVGZG1Gc2RXRjBaUzV3Y205MGIzUjVjR1V1WVc1aGJIbDZaWElnUFNCbWRXNWpkR2x2YmloaEtTQjdYRzRnSUhSb2FYTXVYMkZ1WVd4NWVtVnljeTV3ZFhOb0tHRXBPMXh1SUNCeVpYUjFjbTRnZEdocGN6dGNibjA3WEc1Y2JpOHFLbHh1SUNvZ1QyNWxJRVYyWVd4MVlYUmxJR05oYmlCdmJteDVJR2hoZG1VZ2IyNWxJR2x1ZEdWeWNISmxkR1Z5TENCaGJtUWdhWFFnZDI5MWJHUWdjbVYwZFhKdVhHNGdLaUIwYUdVZ1puVnVZM1JwYjI0Z1kyOTFiR1FnWTI5dWMzVnRaU0JsZG1WeWVTQnpkR0ZqYXlCamFHRnVaMlVnWm5KdmJTQW5VblZ1WlNObGRtRnNkV0YwWlNjdVhHNGdLbHh1SUNvZ1ZHaGxJR052WkdVZ2FYTWdZU0JzYVhSMGJHVWdZMjl0Y0d4cFkyRjBaV1E2SUhkbElHaGhkbVVnZEhkdklHdHBibVJ6SUc5bUlDZHlaV1IxWTJsdVp5YzZYRzRnS2lCdmJtVWdhWE1nZEc4Z2NtVmtkV05sSUdGc2JDQmhibUZzZVhwbGNuTWdkMmwwYUNCMGFHVWdjMmx1WjJ4bElHbHVZMjl0YVc1bklHTm9ZVzVuWlN4Y2JpQXFJR0Z1YjNSb1pYSWdhWE1nZEc4Z2NtVmtkV05sSUdGc2JDQnBibU52YldsdVp5QmphR0Z1WjJWeklIZHBkR2dnZEdocGN5QmhibUZzZVhwbGNuTWdLeUJwYm5SbGNuQnlaWFJsY2k1Y2JpQXFYRzRnS2lCVWFHVWdZVzVoYkhsNlpYSWdZVzVrSUdsdWRHVnljSEpsZEdWeUlITm9iM1ZzWkNCamFHRnVaMlVnZEdobElHTnZiblJsZUhRc0lIUnZJRzFsYlc5eWFYcGxJSFJvWlZ4dUlDb2djM1JoZEdWeklHOW1JSFJvWlNCbGRtRnNkV0YwYVc5dUxpQlVhR1VnWkdsbVptVnlaVzVqWlNCcGN5QnBiblJsY25CeVpYUmxjaUJ6YUc5MWJHUWdjbVYwZFhKdUlHOXVaVnh1SUNvZ2JtVjNJSE4wWVdOcklHbG1JR2wwSUc1bFpXUnpJSFJ2SUhWd1pHRjBaU0IwYUdVZ1pYaHBjM1JwYm1jZ2IyNWxMaUJVYUdVZ2MzUmhZMnNnYVhRZ2NtVjBkWEp1Y3lCM2IzVnNaRnh1SUNvZ2NtVndiR0ZqWlNCMGFHVWdaWGhwYzNScGJtY2diMjVsTENCemJ5QmhibmwwYUdsdVp5QnpkR2xzYkNCcGJpQjBhR1VnYjJ4a0lHOXVaU0IzYjNWc1pDQmlaU0IzYVhCbFpGeHVJQ29nYjNWMExpQlVhR1VnYVc1MFpYSndjbVYwWlhJZ1kyOTFiR1FnY21WMGRYSnVJRzV2ZEdocGJtY2dLQ2QxYm1SbFptbHVaV1FuS1NCMGJ5QnJaV1Z3SUhSb1pTQnpkR0ZqYTF4dUlDb2dkVzUwYjNWamFHVmtMbHh1SUNwY2JpQXFJRlJvWlNCaGJtRnNlWHBsY25NZ1lXNWtJR2x1ZEdWeWNISmxkR1Z5SUdOdmRXeGtJR05vWVc1blpTQjBhR1VnSjJOdmJuUmxlSFFuSUhCaGMzTWdkRzhnZEdobGJTNWNiaUFxSUVGdVpDQnphVzVqWlNCM1pTQnRZWGtnZFhCa1lYUmxJSFJvWlNCemRHRmpheUJoY3lCaFltOTJaU3dnZEdobElHTnZiblJsZUhRZ2MyaHZkV3hrSUcxbGJXOXlhWHBsWEc0Z0tpQjBhRzl6WlNCcGJtWnZjbTFoZEdsdmJpQnViM1FnZEc4Z1ltVWdiM1psY25keWFYUjBaVzRnZDJocGJHVWdkR2hsSUhOMFlXTnJJR2RsZENCM2FYQmxaQ0J2ZFhRdVhHNGdLbHh1SUNvZ1FXNWtJR2xtSUhSb1pTQnBiblJsY25CeVpYUnBibWNnYm05a1pTQnBjeUIwYUdVZ1pYaHBkQ0J1YjJSbElHOW1JSFJvWlNCelpYTnphVzl1TENCcGJuUmxjbkJ5WlhSbGNseHVJQ29nYzJodmRXeGtJSEpsZEhWeWJpQmhJRzVsZHlCemRHRmpheUJqYjI1MFlXbHVjeUJ2Ym14NUlHOXVaU0JtYVc1aGJDQnlaWE4xYkhRZ2JtOWtaUzRnU1dZZ2RHaGxjbVZjYmlBcUlHbHpJRzV2SUhOMVkyZ2dibTlrWlN3Z2RHaGxJSEpsYzNWc2RDQnZaaUIwYUdseklITmxjM05wYjI0Z2FYTWdKM1Z1WkdWbWFXNWxaQ2N1WEc0Z0tpOWNibEoxYm1VdVJYWmhiSFZoZEdVdWNISnZkRzkwZVhCbExtbHVkR1Z5Y0hKbGRHVnlJRDBnWm5WdVkzUnBiMjRvYVc1d2RDa2dlMXh1SUNBdkx5QlVhR1VnWTNWemRHOXRhWHBsWkNCc1lXNW5kV0ZuWlNCemFHOTFiR1FnWjJsMlpTQjBhR1VnWkdWbVlYVnNkQ0JqYjI1MFpYaDBMbHh1SUNCeVpYUjFjbTRnS0dOdmJuUmxlSFFzSUdOb1lXNW5aU3dnYzNSaFkyc3BJRDArSUh0Y2JpQWdJQ0IwY25rZ2UxeHVJQ0FnSUNBZ0x5OGdRVzVoYkhsNlpYSnpJR052ZFd4a0lHTm9ZVzVuWlNCMGFHVWdZMjl1ZEdWNGRDNWNiaUFnSUNBZ0lIUm9hWE11WDJGdVlXeDVlbVZ5Y3k1eVpXUjFZMlVvS0dOMGVDd2dZVzVoYkhsNlpYSXBJRDArSUh0Y2JpQWdJQ0FnSUNBZ1lXNWhiSGw2WlhJdVkyRnNiQ2g3ZlN3Z1kyOXVkR1Y0ZEN3Z1kyaGhibWRsTENCemRHRmpheWs3WEc0Z0lDQWdJQ0I5TENCamIyNTBaWGgwS1R0Y2JpQWdJQ0I5SUdOaGRHTm9LR1VwSUh0Y2JpQWdJQ0FnSUhSb2FYTXVYMmhoYm1Sc1pVVnljbTl5S0dVc0lHTnZiblJsZUhRc0lHTm9ZVzVuWlN3Z2MzUmhZMnNwTzF4dUlDQWdJSDFjYmlBZ0lDQXZMeUJCWm5SbGNpQmhibUZzZVhwbElHbDBMQ0JwYm5SbGNuQnlaWFFnZEdobElHNXZaR1VnWVc1a0lISmxkSFZ5YmlCMGFHVWdibVYzSUhOMFlXTnJJQ2hwWmlCaGJua3BMbHh1SUNBZ0lIWmhjaUJ1WlhkVGRHRmpheUE5SUdsdWNIUW9ZMjl1ZEdWNGRDd2dZMmhoYm1kbExDQnpkR0ZqYXlrN1hHNGdJQ0FnY21WMGRYSnVJRzVsZDFOMFlXTnJPMXh1SUNCOU8xeHVmVHRjYmx4dVVuVnVaUzVGZG1Gc2RXRjBaUzV3Y205MGIzUjVjR1V1WDJoaGJtUnNaVVZ5Y205eUlEMWNibVoxYm1OMGFXOXVLR1Z5Y2l3Z1kyOXVkR1Y0ZEN3Z1kyaGhibWRsTENCemRHRmpheWtnZTF4dUlDQXZMeUJVVDBSUE9pQmxlSEJoYm1RZ2FYUWdkRzhnY0hKdmRtbGtaU0J0YjNKbElITnZjR2hwYzNScFl5QmtaV0oxWjJkcGJtY2diV1Z6YzJGblpTNWNiaUFnZEdoeWIzY2dibVYzSUVWeWNtOXlLR0JYYUdWdUlHTm9ZVzVuWlNBa2UyTm9ZVzVuWlM1MGVYQmxmU0JqYjIxbGN5Qmxjbkp2Y2lBbkpIdGxjbko5SnlCb1lYQndaVzVsWkdBcE8xeHVmVHRjYmx4dVhHNWNiaThxS2lCWFJVSlFRVU5MSUVaUFQxUkZVaUFxS2x4dUlDb3FJQzR2YzNKakwzSjFibVV1YW5OY2JpQXFLaThpWFN3aWMyOTFjbU5sVW05dmRDSTZJaUo5XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuLi9kaXN0L3J1bmUuanNcbiAqKiBtb2R1bGUgaWQgPSA1OVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBSdW50aW1lKCkge31cblxuLyoqXG4gKiBXaGVuIHRoZSBzdGFjayBvZiBEU0wgY2hhbmdlcywgZXZhbHVhdGUgdGhlIExhbmd1YWdlLk5vZGUuXG4gKi9cblJ1bnRpbWUucHJvdG90eXBlLm9uY2hhbmdlID0gZnVuY3Rpb24oaW5zdGFuY2UsIGNoYW5nZSwgc3RhY2spIHtcbiAgLy8gU2luY2Ugd2UgZG9uJ3QgbmVlZCB0byBrZWVwIHRoaW5ncyBpbiBzdGFjayB1bnRpbCB3ZSBoYXZlXG4gIC8vIHJlYWwgYW5hbHl6ZXJzLCB0aGUgJ29uY2hhbmdlJyBoYW5kbGVyIHdvdWxkIHJldHVybiBlbXB0eSBzdGFja1xuICAvLyB0byBsZXQgdGhlIGxhbmd1YWdlIHJ1bnRpbWUgY2xlYXIgdGhlIHN0YWNrIGV2ZXJ5IGluc3RydWN0aW9uLlxuICB0aGlzW2NoYW5nZS50eXBlXS5hcHBseSh0aGlzLCBjaGFuZ2UuYXJncyk7XG4gIC8vIHJldHVybiBlbXB0eSAnaGFuZGxlZCcgc3RhY2sgdG8gbGV0IFJ1bmUga2VlcCBubyBzdGF0ZXMgb2ZcbiAgLy8gZXZlcnkgaW5zdHJ1Y3Rpb24sIGV4Y2VwdCB0aGUgcmVzdWx0LlxuICByZXR1cm4gWyB0aGlzLnF1ZXVlIF07XG59O1xuXG5SdW50aW1lLkRlZmVycmVkID0gZnVuY3Rpb24oKSB7XG4gIHZhciBwcm9taXNlID0gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgIHRoaXMucmVzb2x2ZSA9IHJlc29sdmU7XG4gICAgdGhpcy5yZWplY3QgPSByZWplY3Q7XG4gIH0pO1xuICB0aGlzLnByb21pc2UgPSBwcm9taXNlO1xuICByZXR1cm4gdGhpcztcbn07XG5cblJ1bnRpbWUuQ29udGV4dCA9IGZ1bmN0aW9uKGVudmlyb25tZW50KSB7XG4gIHRoaXMuZGVmZXJyZWQgPSBuZXcgUnVudGltZS5EZWZlcnJlZCgpO1xuICBmb3IgKHZhciBuYW1lIGluIGVudmlyb25tZW50KSB7XG4gICAgdGhpc1tuYW1lXSA9IGVudmlyb25tZW50W25hbWVdO1xuICB9XG59O1xuXG5SdW50aW1lLkNvbnRleHQucHJvdG90eXBlLnJldHVybnMgPSBmdW5jdGlvbihyZXR2YXIpIHtcbiAgdGhpcy5yZXR2YXIgPSByZXR2YXI7XG4gIHRoaXMuZGVmZXJyZWQucmVzb2x2ZShyZXR2YXIpO1xufTtcblxuUnVudGltZS5Db250ZXh0LnByb3RvdHlwZS5yYWlzZSA9IGZ1bmN0aW9uKGVycikge1xuICAvLyBUaGUgZXJyb3Igd2lsbCBiZSBjYXB0dXJlZCBieSBtYWluIHF1ZXVlJ3MgYG9uUHJvY2Vzc0Vycm9yYC5cbiAgdGhpcy5kZWZlcnJlZC5yZWplY3QoZXJyKTtcbn07XG5cblJ1bnRpbWUuQ29udGV4dC5wcm90b3R5cGUuaW50ZXJydXB0ID0gZnVuY3Rpb24ocmVhc29uID0gJycpIHtcbiAgLy8gVGhlIGludGVycnVwdCB3aWxsIGJlIGNhcHR1cmVkIGJ5IG1haW4gcXVldWUncyBgb25Qcm9jZXNzRXJyb3JgLlxuICB2YXIgaW50ZXJydXB0ID0gbmV3IFJ1bnRpbWUuSW50ZXJydXB0KHJlYXNvbik7XG4gIHRoaXMuZGVmZXJyZWQucmVqZWN0KGludGVycnVwdCk7XG59O1xuXG5SdW50aW1lLkludGVycnVwdCA9IGZ1bmN0aW9uKCkge307XG5cblJ1bnRpbWUucHJvdG90eXBlLm9uUHJvY2Vzc0Vycm9yID0gZnVuY3Rpb24oZXJyKSB7XG4gIGlmICghKGVyciBpbnN0YW5jZW9mIFJ1bnRpbWUuSW50ZXJydXB0KSkge1xuICAgIC8vIFByaW50IGl0IHRvIGRlYnVnLlxuICAgIGNvbnNvbGUuZXJyb3IoZXJyKTtcbiAgICAvLyBUaGVuIHRvIGludGVycnVwdCB0aGUgcHJvY2Vzcy5cbiAgICB0aHJvdyBlcnI7XG4gIH0gZWxzZSB7XG4gICAgLy8gT25seSB0byBpbnRlcnJ1cHQgdGhlIHByb2Nlc3MuXG4gICAgLy90aHJvdyBlcnI7XG4gIH1cbn07XG5cblJ1bnRpbWUucHJvdG90eXBlLnN0YXJ0ID0gZnVuY3Rpb24oKSB7XG4gIHZhciBkZWZlcnJlZCA9IG5ldyBSdW50aW1lLkRlZmVycmVkKCk7XG4gIHRoaXMucXVldWUgPSBkZWZlcnJlZC5wcm9taXNlO1xuICAvLyBXZSB3aWxsIHJlc29sdmUgaXQgYXQgYGRvbmVgIGFueXdheSwgc29cbiAgLy8gYHJlamVjdGAgZG9lc24ndCBtYXR0ZXIuXG4gIHRoaXMucmVzb2x2ZSA9IGRlZmVycmVkLnJlc29sdmU7XG4gIHRoaXMucmVqZWN0ID0gZGVmZXJyZWQucmVqZWN0O1xuICB0aGlzLnJlc3VsdCA9IG51bGw7IC8vIHRoZSByZXN1bHQgZnJvbSBlYWNoIHN0ZXAuXG4gIHRoaXMuZW52aXJvbm1lbnQgPSB7fTtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG5SdW50aW1lLnByb3RvdHlwZS5hcyA9IGZ1bmN0aW9uKG5hbWUpIHtcbiAgdGhpcy5xdWV1ZSA9IHRoaXMucXVldWUudGhlbigoKSA9PiB7XG4gICAgaWYgKCd1bmRlZmluZWQnICE9PSB0eXBlb2YgdGhpcy5lbnZpcm9ubWVudFtuYW1lXSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdTY29wZWQgdmFyaWFibGUgXFwnJyArIG5hbWUgKyAnXFwnIGRlZmluZWQgdHdpY2UnKTtcbiAgICB9XG4gICAgaWYgKCd1bmRlZmluZWQnICE9PSB0eXBlb2YgUnVudGltZS5Db250ZXh0LnByb3RvdHlwZVtuYW1lXSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdSZWZ1c2UgdG8gbmFtZSB2YXJpYWJsZSBhcyBjb250ZXh0IHJldmVyc2VkIHdvcmQ6ICcgK1xuICAgICAgICAnXFwnJyArIG5hbWUgKyAnXFwnJyk7XG4gICAgfVxuICAgIHRoaXMuZW52aXJvbm1lbnRbbmFtZV0gPSB0aGlzLnJlc3VsdDtcbiAgICByZXR1cm4gdGhpcy5yZXN1bHQ7XG4gIH0pXG4gIC5jYXRjaCgoZXJyKSA9PiB7XG4gICAgdGhpcy5vblByb2Nlc3NFcnJvcihlcnIpO1xuICB9KTtcbn07XG5cblJ1bnRpbWUucHJvdG90eXBlLmRvbmUgPSBmdW5jdGlvbigpIHtcbiAgdGhpcy5xdWV1ZSA9IHRoaXMucXVldWUuY2F0Y2godGhpcy5vblByb2Nlc3NFcnJvci5iaW5kKHRoaXMpKTtcbiAgdGhpcy5yZXNvbHZlKCk7IC8vIFNvIHRoZSBxdWV1ZSBzdGFydCB0byBleGVjdXRlLlxufTtcblxuUnVudGltZS5wcm90b3R5cGUuX2NyZWF0ZUNvbnRleHQgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIG5ldyBSdW50aW1lLkNvbnRleHQodGhpcy5lbnZpcm9ubWVudCk7XG59O1xuXG5SdW50aW1lLnByb3RvdHlwZS5uZXh0ID0gZnVuY3Rpb24oc3RlcCkge1xuICB0aGlzLnF1ZXVlID0gdGhpcy5xdWV1ZS50aGVuKCgpID0+IHtcbiAgICB2YXIgY29udGV4dCA9IHRoaXMuX2NyZWF0ZUNvbnRleHQoKTtcbiAgICBzdGVwKGNvbnRleHQsIHRoaXMucmVzdWx0KTtcbiAgICByZXR1cm4gY29udGV4dC5kZWZlcnJlZC5wcm9taXNlO1xuICB9KS50aGVuKChyZXN1bHQpID0+IHtcbiAgICBpZiAocmVzdWx0Lm5leHQpIHtcbiAgICAgIC8vIElmIGl0J3MgYWxzbyBhIFBsYXlsYW5nIHN0YXRlbWVudHMsIGNvbmNhdCBpdC5cbiAgICAgIHJldHVybiByZXN1bHQucXVldWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIE5vIG1hdHRlciBpdCdzIHZhbHVlIGZyb20gYW4gb3JkaW5hcnkgZnVuY3Rpb24gb3JcbiAgICAgIC8vIGEgUHJvbWlzZSwgcmV0dXJuaW5nIGl0IGlzIGxlZ2l0IGZvciBhIFByb21pc2UuXG4gICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cbiAgfSlcbiAgLnRoZW4oKHJlc3VsdCkgPT4ge1xuICAgIC8vIEdldCB0aGUgcmVzdWx0IGZyb20gbmV3UHJvbWlzZSBhbmQgc2V0IGl0LlxuICAgIHRoaXMucmVzdWx0ID0gcmVzdWx0O1xuICB9KVxuICAuY2F0Y2goKGVycikgPT4ge1xuICAgIHRoaXMub25Qcm9jZXNzRXJyb3IoZXJyKTtcbiAgfSk7XG59O1xuXG5SdW50aW1lLnByb3RvdHlwZS5tYXRjaCA9IGZ1bmN0aW9uKCkge1xuICAvLyBDb2xsZWN0IGFsbCAnY2FzZScgUHJvbWlzZXMgaGVyZS5cbiAgdGhpcy5xdWV1ZSA9IHRoaXMucXVldWUudGhlbigoKSA9PiB7XG4gICAgdGhpcy5tYXRjaGluZyA9IFtdO1xuICAgIHRoaXMubWF0Y2hpbmcubWF0Y2hlZCA9IGZhbHNlO1xuICB9KVxuICAuY2F0Y2goKGVycikgPT4ge1xuICAgIHRoaXMub25Qcm9jZXNzRXJyb3IoZXJyKTtcbiAgfSk7XG59O1xuXG4vLyBNYXRjaGluZyBlbmQ6IGV4ZWN1dGUgYWxsIG1hdGNoaW5nIGNhc2VzLlxuUnVudGltZS5wcm90b3R5cGUuZW5kID0gZnVuY3Rpb24oKSB7XG4gIHRoaXMucXVldWUgPSB0aGlzLnF1ZXVlLnRoZW4oKCkgPT4ge1xuICAgIHRoaXMubWF0Y2hpbmcgPSBudWxsO1xuICB9KS5jYXRjaCgoZXJyKSA9PiB7XG4gICAgdGhpcy5vblByb2Nlc3NFcnJvcihlcnIpO1xuICB9KTtcbn07XG5cbi8qKlxuICogYHByZWRgIG11c3QgYmUgYSBzeW5jIGZ1bmN0aW9uIG9ubHkgcmV0dXJuIHRydWUgb3IgZmFsc2UuXG4gKiBJZiBtdWx0aXBsZSBgY2FzZWAgY2FuIG1hdGNoIHRoZSByZXN1bHQsIG9ubHkgdGhlIGZpcnN0IG1hdGNoaW5nIG9uZVxuICogd2lsbCBiZSBleGVjdXRlZCBhbmQgbGVhdmUgdGhlIHJlc3VsdC5cbiAqL1xuUnVudGltZS5wcm90b3R5cGUuY2FzZSA9IGZ1bmN0aW9uKHByZWQpIHtcbiAgdGhpcy5xdWV1ZSA9IHRoaXMucXVldWUudGhlbigoKSA9PiB7XG4gICAgdmFyIGlkID0gdGhpcy5tYXRjaGluZy5sZW5ndGg7XG4gICAgLy8gSW4gYSBgbWF0Y2hgLCB3ZSBkb24ndCB1cGRhdGUgdGhlIHJlc3VsdCxcbiAgICAvLyBzbyBldmVyeSBgY2FzZWAgY2FuIGp1ZGdlIGlmIGl0J3MgdHJ1ZS5cbiAgICB2YXIgcHJlZHJlc3VsdCA9IHByZWQodGhpcy5yZXN1bHQpO1xuICAgIHRoaXMubWF0Y2hpbmdbaWRdID0gcHJlZHJlc3VsdDtcbiAgICByZXR1cm4gaWQ7XG4gIH0pLmNhdGNoKChlcnIpID0+IHtcbiAgICB0aGlzLm9uUHJvY2Vzc0Vycm9yKGVycik7XG4gIH0pO1xufTtcblxuUnVudGltZS5wcm90b3R5cGUudG8gPSBmdW5jdGlvbihzdGVwKSB7XG4gIC8vIEl0J3MgYWx3YXlzIGNhc2UuLnRvLCBzbyB3ZSBvbmx5IG5lZWQgdG8gY29uY2F0XG4gIC8vICd0bycgcHJvbWlzZSBhZnRlciB0aGUgJ2Nhc2UnIHByb21pc2UuXG4gIHRoaXMucXVldWUgPSB0aGlzLnF1ZXVlLnRoZW4oKGlkKSA9PiB7XG4gICAgLy8gT25seSBhcHBlbmQgdGhlIHN0ZXAgaWYgdGhlIHByZXZpb3VzIG9uZSBpcyB0cnVlLlxuICAgIGlmICghdGhpcy5tYXRjaGluZy5tYXRjaGVkICYmIHRoaXMubWF0Y2hpbmdbaWRdKSB7XG4gICAgICB0aGlzLm1hdGNoaW5nLm1hdGNoZWQgPSB0cnVlO1xuICAgICAgdmFyIGNvbnRleHQgPSB0aGlzLl9jcmVhdGVDb250ZXh0KCk7XG4gICAgICBzdGVwKGNvbnRleHQsIHRoaXMucmVzdWx0KTtcbiAgICAgIHJldHVybiBjb250ZXh0LmRlZmVycmVkLnByb21pc2U7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB0aGlzLnJlc3VsdDtcbiAgICB9XG4gIH0pLnRoZW4oKHJlc3VsdCkgPT4ge1xuICAgIGlmIChyZXN1bHQubmV4dCkge1xuICAgICAgcmV0dXJuIHJlc3VsdC5xdWV1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG4gIH0pXG4gIC50aGVuKChyZXN1bHQpID0+IHtcbiAgICBpZiAodGhpcy5tYXRjaGluZy5tYXRjaGVkKSB7XG4gICAgICB0aGlzLnJlc3VsdCA9IHJlc3VsdDtcbiAgICB9XG4gICAgLy8gT3IsIGRvIG5vdCB1cGRhdGUgdGhlIHJlc3VsdCBpdCBnb3QuXG4gIH0pXG4gIC5jYXRjaCgoZXJyKSA9PiB7XG4gICAgdGhpcy5vblByb2Nlc3NFcnJvcihlcnIpO1xuICB9KTtcbn07XG5cbi8qKlxuICogUmVtZW1iZXIgd2Ugd2lsbCBzd2FwIGBsb29wYCBhbmQgYHVudGlsYCBhdCBzeW50YXggbGV2ZWwsIHNvXG4gKiB3ZSBjYW4gZ2V0IHRoZSBwcmVkIGJlZm9yZSB3ZSBydW4gdGhlIGxvb3AuXG4gKlxuICogMS4gRmlyc3QgYXBwbHkgdGhlIGBwcmVkYCBvbiB0aGUgcHJldmlvdXMgcmVzdWx0LlxuICogMi4gSWYgdHJ1ZSwgY29uY2F0IHRoZSBpdGVyYXRpb24gYW5kIHRoZSBuZXcgcHJlZGljdGluZyBzdGVwIGFmdGVyXG4gKiAgICB0aGUgbG9vcGluZyBwcm9taXNlLiBBbmQgdGhlIHByZWRpY2F0aW9uIHdpbGwgY29uY2F0IG5ldyBpdGVyYXRpb25cbiAqICAgIGludG8gdGhlIHRoZSBwcm9taXNlIGlmIGl0J3MgdHJ1ZS5cbiAqXG4gKiBOb3RlOiBvbmx5IHdoZW4gdGhlIHByZWRpY2F0aW9uIGdpdmVzIGZhbHNlLCB0aGUgbG9vcGluZyBwcm9taXNlIGZvclxuICogdGhlIG1haW4gcXVldWUgd2lsbCByZXNvbHZlLCBzbyBpdCBjYW4gcnVuIHRoZSBsb29waW5nIHdoaWxlIGJsb2NraW5nXG4gKiB0aGUgbWFpbiBxdWV1ZS5cbiAqL1xuUnVudGltZS5wcm90b3R5cGUubG9vcCA9IGZ1bmN0aW9uKHN0ZXApIHtcbiAgdGhpcy5xdWV1ZSA9IHRoaXMucXVldWUudGhlbigoKSA9PiB7XG4gICAgdmFyIGxvb3BxdWV1ZSA9IHRoaXMubG9vcGluZy5sb29waW5ncHJvbWlzZTtcbiAgICB2YXIgcHJlZCA9IHRoaXMubG9vcGluZy5wcmVkO1xuXG4gICAgdmFyIGFwcGVuZCA9ICgpID0+IHtcbiAgICAgIHRoaXMubG9vcGluZy5sb29waW5ncHJvbWlzZS5wcm9taXNlID1cbiAgICAgICAgbG9vcHF1ZXVlLnRoZW4oKCkgPT4ge1xuICAgICAgICAgIHZhciBjb250ZXh0ID0gdGhpcy5fY3JlYXRlQ29udGV4dCgpO1xuICAgICAgICAgIHN0ZXAoY29udGV4dCwgdGhpcy5yZXN1bHQpO1xuICAgICAgICAgIHJldHVybiBjb250ZXh0LmRlZmVycmVkLnByb21pc2U7XG4gICAgICAgIH0pLnRoZW4oKHJlc3VsdCkgPT4ge1xuICAgICAgICAgIGlmIChyZXN1bHQubmV4dCkge1xuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdC5xdWV1ZTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKChyZXN1bHQpID0+IHtcbiAgICAgICAgICB0aGlzLnJlc3VsdCA9IHJlc3VsdDtcbiAgICAgICAgICBpZiAoIXByZWQodGhpcy5yZXN1bHQpKSB7XG4gICAgICAgICAgICBhcHBlbmQoKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5sb29waW5nLnF1ZXVlYmxvY2tlci5yZXNvbHZlKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9O1xuICAgIC8vIEZpcnN0IGl0ZXJhdGlvbi5cbiAgICBpZiAoIXByZWQodGhpcy5yZXN1bHQpKSB7XG4gICAgICBhcHBlbmQoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5sb29waW5nLnF1ZXVlYmxvY2tlci5yZXNvbHZlKCk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLmxvb3BpbmcucXVldWVibG9ja2VyLnByb21pc2U7XG4gIH0pXG4gIC5jYXRjaCgoZXJyKSA9PiB7XG4gICAgdGhpcy5vblByb2Nlc3NFcnJvcihlcnIpO1xuICB9KTtcbn07XG5cbi8qKlxuICogUmVtZW1iZXIgd2Ugd2lsbCBzd2FwIGBsb29wYCBhbmQgYHVudGlsYCBhdCBzeW50YXggbGV2ZWwsIHNvXG4gKiB3ZSBjYW4gZ2V0IHRoZSBwcmVkIGJlZm9yZSB3ZSBydW4gdGhlIGxvb3AuXG4gKi9cblJ1bnRpbWUucHJvdG90eXBlLnVudGlsID0gZnVuY3Rpb24ocHJlZCkge1xuICB0aGlzLnF1ZXVlID0gdGhpcy5xdWV1ZS50aGVuKCgpID0+IHtcbiAgICB0aGlzLmxvb3BpbmcgPSB7XG4gICAgICAncHJlZCc6IHByZWQsXG4gICAgICAnbG9vcGluZ3Byb21pc2UnOiBQcm9taXNlLnJlc29sdmUoKSxcbiAgICAgICdxdWV1ZWJsb2NrZXInOiBuZXcgUnVudGltZS5EZWZlcnJlZCgpXG4gICAgfTtcbiAgICAvLyBBZnRlciB0aGUgbG9vcGluZywgY2xlYXIgaXQuXG4gICAgdGhpcy5sb29waW5nLnF1ZXVlYmxvY2tlci5wcm9taXNlID0gXG4gICAgICB0aGlzLmxvb3BpbmcucXVldWVibG9ja2VyLnByb21pc2UudGhlbigoKSA9PiB7XG4gICAgICAgIHRoaXMubG9vcGluZyA9IG51bGw7XG4gICAgICB9KTtcbiAgfSlcbiAgLmNhdGNoKChlcnIpID0+IHtcbiAgICB0aGlzLm9uUHJvY2Vzc0Vycm9yKGVycik7XG4gIH0pO1xufTtcblxuUnVudGltZS5wcm90b3R5cGUuYW55ID0gZnVuY3Rpb24oKSB7XG4gIHZhciB1cGRhdGVSZXN1bHQgPSAocmVzdWx0KSA9PiB7XG4gICAgdGhpcy5yZXN1bHQgPSByZXN1bHQ7XG4gIH07XG4gIHZhciBnZW5lcmF0ZVByb21pc2UgPSAoc3RlcCkgPT4ge1xuICAgIHZhciBuZXdQcm9taXNlID0gc3RlcCh0aGlzLnJlc3VsdCk7XG4gICAgaWYgKG5ld1Byb21pc2UubmV4dCkge1xuICAgICAgcmV0dXJuIG5ld1Byb21pc2UucXVldWU7XG4gICAgfSBlbHNlIGlmIChuZXdQcm9taXNlLnRoZW4pIHtcbiAgICAgIHJldHVybiBuZXdQcm9taXNlO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBPcmRpbmFyeSBmdW5jdGlvbiB3aWxsIHJldHVybiB0aGUgcmVzdWx0LlxuICAgICAgdmFyIG5ld1Jlc3VsdCA9IG5ld1Byb21pc2U7XG4gICAgICB1cGRhdGVSZXN1bHQobmV3UmVzdWx0KTtcbiAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUobmV3UmVzdWx0KTtcbiAgICB9XG4gIH07XG4gIHZhciBjYW5kaWRhdGVzID0gQXJyYXkuZnJvbShhcmd1bWVudHMpO1xuICB0aGlzLnF1ZXVlID0gdGhpcy5xdWV1ZS50aGVuKCgpID0+IHtcbiAgICByZXR1cm4gUHJvbWlzZS5yYWNlKGNhbmRpZGF0ZXMubWFwKChzdGVwKSA9PiB7XG4gICAgICByZXR1cm4gZ2VuZXJhdGVQcm9taXNlKHN0ZXApO1xuICAgIH0pKS50aGVuKHVwZGF0ZVJlc3VsdCk7XG4gIH0pXG4gIC5jYXRjaCgoZXJyKSA9PiB7XG4gICAgdGhpcy5vblByb2Nlc3NFcnJvcihlcnIpO1xuICB9KTtcbn07XG5cblJ1bnRpbWUucHJvdG90eXBlLmFueSA9IGZ1bmN0aW9uKCkge1xuICB2YXIgYW55ID0gdGhpcy5fcmFjZU9yQWxsKCdyYWNlJyk7XG4gIHZhciBjYW5kaWRhdGVzID0gQXJyYXkuZnJvbShhcmd1bWVudHMpO1xuICBhbnkuY2FsbCh0aGlzLCBjYW5kaWRhdGVzKTtcbn07XG5cblJ1bnRpbWUucHJvdG90eXBlLmFsbCA9IGZ1bmN0aW9uKCkge1xuICB2YXIgYWxsID0gdGhpcy5fcmFjZU9yQWxsKCdhbGwnKTtcbiAgdmFyIGNhbmRpZGF0ZXMgPSBBcnJheS5mcm9tKGFyZ3VtZW50cyk7XG4gIGFsbC5jYWxsKHRoaXMsIGNhbmRpZGF0ZXMpO1xufTtcblxuUnVudGltZS5wcm90b3R5cGUuX3JhY2VPckFsbCA9IGZ1bmN0aW9uKHByb21pc2VNZXRob2QpIHtcbiAgdmFyIGdlbmVyYXRlZCA9IChjYW5kaWRhdGVzKSA9PiB7XG4gICAgdmFyIHVwZGF0ZVJlc3VsdCA9IChyZXN1bHQpID0+IHtcbiAgICAgIHRoaXMucmVzdWx0ID0gcmVzdWx0O1xuICAgIH07XG4gICAgdmFyIGdlbmVyYXRlUHJvbWlzZSA9IChzdGVwKSA9PiB7XG4gICAgICB2YXIgY29udGV4dCA9IG5ldyBSdW50aW1lLkNvbnRleHQoKTtcbiAgICAgIHN0ZXAoY29udGV4dCwgdGhpcy5yZXN1bHQpO1xuICAgICAgcmV0dXJuIGNvbnRleHQuZGVmZXJyZWQucHJvbWlzZVxuICAgICAgICAudGhlbigocmVzdWx0KSA9PiB7XG4gICAgICAgICAgaWYgKHJlc3VsdC5uZXh0KSB7XG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0LnF1ZXVlO1xuICAgICAgICAgIH0gZWxzZSBpZiAocmVzdWx0LnRoZW4pIHtcbiAgICAgICAgICAgIHJldHVybiByZXN1bHQudGhlbih1cGRhdGVSZXN1bHQpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyBPcmRpbmFyeSBmdW5jdGlvbiB3aWxsIHJldHVybiB0aGUgcGxhaW4gcmVzdWx0LlxuICAgICAgICAgICAgLy8gQW5kIHdlIG5lZWQgdG8gdHVybiBpdCBhcyBhIHByb21pc2UuXG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHJlc3VsdCk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9O1xuICAgIHRoaXMucXVldWUgPSB0aGlzLnF1ZXVlLnRoZW4oKCkgPT4ge1xuICAgICAgLy8gQ2F0Y2ggZ2VuZXJhdGVQcm9taXNlLlxuICAgICAgdHJ5IHtcbiAgICAgICAgdmFyIGFsbFByb21pc2VzID0gY2FuZGlkYXRlcy5tYXAoKHN0ZXApID0+IHtcbiAgICAgICAgICByZXR1cm4gZ2VuZXJhdGVQcm9taXNlKHN0ZXApO1xuICAgICAgICB9KTtcbiAgICAgICAgaWYgKCdyYWNlJyA9PT0gcHJvbWlzZU1ldGhvZCkge1xuICAgICAgICAgIHJldHVybiBQcm9taXNlLnJhY2UoYWxsUHJvbWlzZXMpLnRoZW4odXBkYXRlUmVzdWx0KTtcbiAgICAgICAgfSBlbHNlIGlmICgnYWxsJyA9PT0gcHJvbWlzZU1ldGhvZCkge1xuICAgICAgICAgIHJldHVybiBQcm9taXNlLmFsbChhbGxQcm9taXNlcykudGhlbih1cGRhdGVSZXN1bHQpO1xuICAgICAgICB9XG4gICAgICB9IGNhdGNoKGUpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihlKTtcbiAgICAgICAgdGhyb3cgZTtcbiAgICAgIH1cbiAgICB9KVxuICAgIC5jYXRjaCgoZXJyKSA9PiB7XG4gICAgICB0aGlzLm9uUHJvY2Vzc0Vycm9yKGVycik7XG4gICAgfSk7XG4gIH07XG4gIHJldHVybiBnZW5lcmF0ZWQ7XG59O1xuXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3BsYXlsYW5nLnJ1bnRpbWUuanNcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IHsgXCJkZWZhdWx0XCI6IHJlcXVpcmUoXCJjb3JlLWpzL2xpYnJhcnkvZm4vYXJyYXkvZnJvbVwiKSwgX19lc01vZHVsZTogdHJ1ZSB9O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi4vfi9iYWJlbC1ydW50aW1lL2NvcmUtanMvYXJyYXkvZnJvbS5qc1xuICoqIG1vZHVsZSBpZCA9IDYxXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJyZXF1aXJlKCcuLi8uLi9tb2R1bGVzL2VzNi5zdHJpbmcuaXRlcmF0b3InKTtcbnJlcXVpcmUoJy4uLy4uL21vZHVsZXMvZXM2LmFycmF5LmZyb20nKTtcbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi4vLi4vbW9kdWxlcy8kLmNvcmUnKS5BcnJheS5mcm9tO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi4vfi9iYWJlbC1ydW50aW1lL34vY29yZS1qcy9saWJyYXJ5L2ZuL2FycmF5L2Zyb20uanNcbiAqKiBtb2R1bGUgaWQgPSA2MlxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xudmFyIGN0eCAgICAgICAgID0gcmVxdWlyZSgnLi8kLmN0eCcpXG4gICwgJGRlZiAgICAgICAgPSByZXF1aXJlKCcuLyQuZGVmJylcbiAgLCB0b09iamVjdCAgICA9IHJlcXVpcmUoJy4vJC50by1vYmplY3QnKVxuICAsIGNhbGwgICAgICAgID0gcmVxdWlyZSgnLi8kLml0ZXItY2FsbCcpXG4gICwgaXNBcnJheUl0ZXIgPSByZXF1aXJlKCcuLyQuaXMtYXJyYXktaXRlcicpXG4gICwgdG9MZW5ndGggICAgPSByZXF1aXJlKCcuLyQudG8tbGVuZ3RoJylcbiAgLCBnZXRJdGVyRm4gICA9IHJlcXVpcmUoJy4vY29yZS5nZXQtaXRlcmF0b3ItbWV0aG9kJyk7XG4kZGVmKCRkZWYuUyArICRkZWYuRiAqICFyZXF1aXJlKCcuLyQuaXRlci1kZXRlY3QnKShmdW5jdGlvbihpdGVyKXsgQXJyYXkuZnJvbShpdGVyKTsgfSksICdBcnJheScsIHtcbiAgLy8gMjIuMS4yLjEgQXJyYXkuZnJvbShhcnJheUxpa2UsIG1hcGZuID0gdW5kZWZpbmVkLCB0aGlzQXJnID0gdW5kZWZpbmVkKVxuICBmcm9tOiBmdW5jdGlvbiBmcm9tKGFycmF5TGlrZS8qLCBtYXBmbiA9IHVuZGVmaW5lZCwgdGhpc0FyZyA9IHVuZGVmaW5lZCovKXtcbiAgICB2YXIgTyAgICAgICA9IHRvT2JqZWN0KGFycmF5TGlrZSlcbiAgICAgICwgQyAgICAgICA9IHR5cGVvZiB0aGlzID09ICdmdW5jdGlvbicgPyB0aGlzIDogQXJyYXlcbiAgICAgICwgbWFwZm4gICA9IGFyZ3VtZW50c1sxXVxuICAgICAgLCBtYXBwaW5nID0gbWFwZm4gIT09IHVuZGVmaW5lZFxuICAgICAgLCBpbmRleCAgID0gMFxuICAgICAgLCBpdGVyRm4gID0gZ2V0SXRlckZuKE8pXG4gICAgICAsIGxlbmd0aCwgcmVzdWx0LCBzdGVwLCBpdGVyYXRvcjtcbiAgICBpZihtYXBwaW5nKW1hcGZuID0gY3R4KG1hcGZuLCBhcmd1bWVudHNbMl0sIDIpO1xuICAgIC8vIGlmIG9iamVjdCBpc24ndCBpdGVyYWJsZSBvciBpdCdzIGFycmF5IHdpdGggZGVmYXVsdCBpdGVyYXRvciAtIHVzZSBzaW1wbGUgY2FzZVxuICAgIGlmKGl0ZXJGbiAhPSB1bmRlZmluZWQgJiYgIShDID09IEFycmF5ICYmIGlzQXJyYXlJdGVyKGl0ZXJGbikpKXtcbiAgICAgIGZvcihpdGVyYXRvciA9IGl0ZXJGbi5jYWxsKE8pLCByZXN1bHQgPSBuZXcgQzsgIShzdGVwID0gaXRlcmF0b3IubmV4dCgpKS5kb25lOyBpbmRleCsrKXtcbiAgICAgICAgcmVzdWx0W2luZGV4XSA9IG1hcHBpbmcgPyBjYWxsKGl0ZXJhdG9yLCBtYXBmbiwgW3N0ZXAudmFsdWUsIGluZGV4XSwgdHJ1ZSkgOiBzdGVwLnZhbHVlO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBmb3IocmVzdWx0ID0gbmV3IEMobGVuZ3RoID0gdG9MZW5ndGgoTy5sZW5ndGgpKTsgbGVuZ3RoID4gaW5kZXg7IGluZGV4Kyspe1xuICAgICAgICByZXN1bHRbaW5kZXhdID0gbWFwcGluZyA/IG1hcGZuKE9baW5kZXhdLCBpbmRleCkgOiBPW2luZGV4XTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmVzdWx0Lmxlbmd0aCA9IGluZGV4O1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cbn0pO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi4vfi9iYWJlbC1ydW50aW1lL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM2LmFycmF5LmZyb20uanNcbiAqKiBtb2R1bGUgaWQgPSA2M1xuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiLy8gNy4xLjEzIFRvT2JqZWN0KGFyZ3VtZW50KVxudmFyIGRlZmluZWQgPSByZXF1aXJlKCcuLyQuZGVmaW5lZCcpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCl7XG4gIHJldHVybiBPYmplY3QoZGVmaW5lZChpdCkpO1xufTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4uL34vYmFiZWwtcnVudGltZS9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzLyQudG8tb2JqZWN0LmpzXG4gKiogbW9kdWxlIGlkID0gNjRcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyJdLCJzb3VyY2VSb290IjoiIn0=