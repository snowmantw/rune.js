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
	    _this.reject = function (e) {
	      reject(e);
	      throw e;
	    };
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
	
	Runtime.prototype.start = function () {
	  var deferred = new Runtime.Deferred();
	  this.queue = deferred.promise;
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
	    _this2.reject(err);
	  });
	};
	
	Runtime.prototype.done = function () {
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
	    _this3.reject(err);
	  });
	};
	
	Runtime.prototype.match = function () {
	  var _this4 = this;
	
	  // Collect all 'case' Promises here.
	  this.queue = this.queue.then(function () {
	    _this4.matching = [];
	    _this4.matching.matched = false;
	  })['catch'](function (err) {
	    _this4.reject(err);
	  });
	};
	
	// Matching end: execute all matching cases.
	Runtime.prototype.end = function () {
	  var _this5 = this;
	
	  this.queue = this.queue.then(function () {
	    _this5.matching = null;
	  })['catch'](function (err) {
	    _this5.reject(err);
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
	    _this6.reject(err);
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
	    _this7.reject(err);
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
	    _this8.reject(err);
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
	    _this9.reject(err);
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
	    _this10.reject(err);
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
	      _this11.reject(err);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgOWEwMTlhZGU4OTUwYmVmMzUwMWIiLCJ3ZWJwYWNrOi8vLy4vcGxheWxhbmctZGVtby5qcyIsIndlYnBhY2s6Ly8vLi4vfi9iYWJlbC1ydW50aW1lL2NvcmUtanMvcHJvbWlzZS5qcyIsIndlYnBhY2s6Ly8vLi4vfi9iYWJlbC1ydW50aW1lL34vY29yZS1qcy9saWJyYXJ5L2ZuL3Byb21pc2UuanMiLCJ3ZWJwYWNrOi8vLy4uL34vYmFiZWwtcnVudGltZS9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNi5zdHJpbmcuaXRlcmF0b3IuanMiLCJ3ZWJwYWNrOi8vLy4uL34vYmFiZWwtcnVudGltZS9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzLyQuc3RyaW5nLWF0LmpzIiwid2VicGFjazovLy8uLi9+L2JhYmVsLXJ1bnRpbWUvfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy8kLnRvLWludGVnZXIuanMiLCJ3ZWJwYWNrOi8vLy4uL34vYmFiZWwtcnVudGltZS9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzLyQuZGVmaW5lZC5qcyIsIndlYnBhY2s6Ly8vLi4vfi9iYWJlbC1ydW50aW1lL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvJC5pdGVyLWRlZmluZS5qcyIsIndlYnBhY2s6Ly8vLi4vfi9iYWJlbC1ydW50aW1lL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvJC5saWJyYXJ5LmpzIiwid2VicGFjazovLy8uLi9+L2JhYmVsLXJ1bnRpbWUvfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy8kLmRlZi5qcyIsIndlYnBhY2s6Ly8vLi4vfi9iYWJlbC1ydW50aW1lL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvJC5nbG9iYWwuanMiLCJ3ZWJwYWNrOi8vLy4uL34vYmFiZWwtcnVudGltZS9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzLyQuY29yZS5qcyIsIndlYnBhY2s6Ly8vLi4vfi9iYWJlbC1ydW50aW1lL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvJC5yZWRlZi5qcyIsIndlYnBhY2s6Ly8vLi4vfi9iYWJlbC1ydW50aW1lL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvJC5oaWRlLmpzIiwid2VicGFjazovLy8uLi9+L2JhYmVsLXJ1bnRpbWUvfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy8kLmpzIiwid2VicGFjazovLy8uLi9+L2JhYmVsLXJ1bnRpbWUvfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy8kLnByb3BlcnR5LWRlc2MuanMiLCJ3ZWJwYWNrOi8vLy4uL34vYmFiZWwtcnVudGltZS9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzLyQuc3VwcG9ydC1kZXNjLmpzIiwid2VicGFjazovLy8uLi9+L2JhYmVsLXJ1bnRpbWUvfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy8kLmZhaWxzLmpzIiwid2VicGFjazovLy8uLi9+L2JhYmVsLXJ1bnRpbWUvfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy8kLmhhcy5qcyIsIndlYnBhY2s6Ly8vLi4vfi9iYWJlbC1ydW50aW1lL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvJC53a3MuanMiLCJ3ZWJwYWNrOi8vLy4uL34vYmFiZWwtcnVudGltZS9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzLyQuc2hhcmVkLmpzIiwid2VicGFjazovLy8uLi9+L2JhYmVsLXJ1bnRpbWUvfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy8kLnVpZC5qcyIsIndlYnBhY2s6Ly8vLi4vfi9iYWJlbC1ydW50aW1lL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvJC5pdGVyYXRvcnMuanMiLCJ3ZWJwYWNrOi8vLy4uL34vYmFiZWwtcnVudGltZS9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzLyQuaXRlci1jcmVhdGUuanMiLCJ3ZWJwYWNrOi8vLy4uL34vYmFiZWwtcnVudGltZS9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzLyQudGFnLmpzIiwid2VicGFjazovLy8uLi9+L2JhYmVsLXJ1bnRpbWUvfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy8kLml0ZXItYnVnZ3kuanMiLCJ3ZWJwYWNrOi8vLy4uL34vYmFiZWwtcnVudGltZS9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL3dlYi5kb20uaXRlcmFibGUuanMiLCJ3ZWJwYWNrOi8vLy4uL34vYmFiZWwtcnVudGltZS9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNi5hcnJheS5pdGVyYXRvci5qcyIsIndlYnBhY2s6Ly8vLi4vfi9iYWJlbC1ydW50aW1lL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvJC51bnNjb3BlLmpzIiwid2VicGFjazovLy8uLi9+L2JhYmVsLXJ1bnRpbWUvfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy8kLml0ZXItc3RlcC5qcyIsIndlYnBhY2s6Ly8vLi4vfi9iYWJlbC1ydW50aW1lL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvJC50by1pb2JqZWN0LmpzIiwid2VicGFjazovLy8uLi9+L2JhYmVsLXJ1bnRpbWUvfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy8kLmlvYmplY3QuanMiLCJ3ZWJwYWNrOi8vLy4uL34vYmFiZWwtcnVudGltZS9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzLyQuY29mLmpzIiwid2VicGFjazovLy8uLi9+L2JhYmVsLXJ1bnRpbWUvfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczYucHJvbWlzZS5qcyIsIndlYnBhY2s6Ly8vLi4vfi9iYWJlbC1ydW50aW1lL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvJC5jdHguanMiLCJ3ZWJwYWNrOi8vLy4uL34vYmFiZWwtcnVudGltZS9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzLyQuYS1mdW5jdGlvbi5qcyIsIndlYnBhY2s6Ly8vLi4vfi9iYWJlbC1ydW50aW1lL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvJC5jbGFzc29mLmpzIiwid2VicGFjazovLy8uLi9+L2JhYmVsLXJ1bnRpbWUvfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy8kLmlzLW9iamVjdC5qcyIsIndlYnBhY2s6Ly8vLi4vfi9iYWJlbC1ydW50aW1lL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvJC5hbi1vYmplY3QuanMiLCJ3ZWJwYWNrOi8vLy4uL34vYmFiZWwtcnVudGltZS9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzLyQuc3RyaWN0LW5ldy5qcyIsIndlYnBhY2s6Ly8vLi4vfi9iYWJlbC1ydW50aW1lL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvJC5mb3Itb2YuanMiLCJ3ZWJwYWNrOi8vLy4uL34vYmFiZWwtcnVudGltZS9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzLyQuaXRlci1jYWxsLmpzIiwid2VicGFjazovLy8uLi9+L2JhYmVsLXJ1bnRpbWUvfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy8kLmlzLWFycmF5LWl0ZXIuanMiLCJ3ZWJwYWNrOi8vLy4uL34vYmFiZWwtcnVudGltZS9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzLyQudG8tbGVuZ3RoLmpzIiwid2VicGFjazovLy8uLi9+L2JhYmVsLXJ1bnRpbWUvfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9jb3JlLmdldC1pdGVyYXRvci1tZXRob2QuanMiLCJ3ZWJwYWNrOi8vLy4uL34vYmFiZWwtcnVudGltZS9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzLyQuc2V0LXByb3RvLmpzIiwid2VicGFjazovLy8uLi9+L2JhYmVsLXJ1bnRpbWUvfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy8kLnNhbWUuanMiLCJ3ZWJwYWNrOi8vLy4uL34vYmFiZWwtcnVudGltZS9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzLyQuc3BlY2llcy5qcyIsIndlYnBhY2s6Ly8vLi4vfi9iYWJlbC1ydW50aW1lL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvJC5taWNyb3Rhc2suanMiLCJ3ZWJwYWNrOi8vLy4uL34vYmFiZWwtcnVudGltZS9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzLyQudGFzay5qcyIsIndlYnBhY2s6Ly8vLi4vfi9iYWJlbC1ydW50aW1lL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvJC5pbnZva2UuanMiLCJ3ZWJwYWNrOi8vLy4uL34vYmFiZWwtcnVudGltZS9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzLyQuaHRtbC5qcyIsIndlYnBhY2s6Ly8vLi4vfi9iYWJlbC1ydW50aW1lL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvJC5kb20tY3JlYXRlLmpzIiwid2VicGFjazovLy8uLi9+L2JhYmVsLXJ1bnRpbWUvfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy8kLm1peC5qcyIsIndlYnBhY2s6Ly8vLi4vfi9iYWJlbC1ydW50aW1lL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvJC5pdGVyLWRldGVjdC5qcyIsIndlYnBhY2s6Ly8vLi4vfi9iYWJlbC1ydW50aW1lL2hlbHBlcnMvaW50ZXJvcC1yZXF1aXJlLWRlZmF1bHQuanMiLCJ3ZWJwYWNrOi8vLy4vcGxheWxhbmcuanMiLCJ3ZWJwYWNrOi8vLy4vcGxheWxhbmcuaW50ZXJmYWNlLmpzIiwid2VicGFjazovLy8uLi9kaXN0L3J1bmUuanMiLCJ3ZWJwYWNrOi8vLy4vcGxheWxhbmcucnVudGltZS5qcyIsIndlYnBhY2s6Ly8vLi4vfi9iYWJlbC1ydW50aW1lL2NvcmUtanMvYXJyYXkvZnJvbS5qcyIsIndlYnBhY2s6Ly8vLi4vfi9iYWJlbC1ydW50aW1lL34vY29yZS1qcy9saWJyYXJ5L2ZuL2FycmF5L2Zyb20uanMiLCJ3ZWJwYWNrOi8vLy4uL34vYmFiZWwtcnVudGltZS9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNi5hcnJheS5mcm9tLmpzIiwid2VicGFjazovLy8uLi9+L2JhYmVsLXJ1bnRpbWUvfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy8kLnRvLW9iamVjdC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FB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QUMsT0FBTyxDQUFDLENBQUMsR0FBQyxDQUFDLENBQUMsQ0FBQztJQUNsQixDQUFDLENBQUM7RUFDSixDQUFDLFFBQ0csQ0FBQyxVQUFDLENBQUM7VUFBSyxDQUFDLEtBQUssRUFBRTtFQUFBLENBQUUsQ0FBQyxFQUFFLENBQUMsVUFBQyxHQUFHLEVBQUUsQ0FBQyxFQUFLO0FBQ3JDLE1BQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDO0VBQ3RCLENBQUMsQ0FDSCxHQUFHLEVBQUUsQ0FDTCxJQUFJLENBQUMsVUFBQyxHQUFHLEVBQUUsQ0FBQyxFQUFLO0FBQUUsVUFBTyxDQUFDLEdBQUcsQ0FBQyxVQUFVLEVBQUUsQ0FBQyxDQUFDLENBQUUsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7RUFBQyxDQUFDLENBQ3BFLEdBQUcsQ0FBQyxVQUFDLEdBQUcsRUFBSztBQUFDLE1BQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFBRSxFQUM1QixVQUFDLEdBQUcsRUFBSztBQUNQLE1BQUcsQ0FBQyxPQUFPLENBQUMsYUFBWSxVQUFDLENBQUMsRUFBRSxDQUFDLEVBQUs7QUFDaEMsZUFBVSxDQUFDLFlBQU07QUFBRSxRQUFDLENBQUMsRUFBRSxDQUFDLENBQUM7TUFBRSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ3BDLENBQUMsQ0FBQyxDQUFDO0VBQ0wsQ0FBQyxDQUNMLEdBQUcsQ0FBQyxVQUFDLEdBQUcsRUFBRSxFQUFFLEVBQUs7QUFBQyxNQUFHLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUFFLEVBQzVDLFVBQUMsR0FBRyxFQUFFLEVBQUUsRUFBSztBQUNYLE1BQUcsQ0FBQyxPQUFPLENBQUMsYUFBWSxVQUFDLENBQUMsRUFBRSxDQUFDLEVBQUs7QUFDaEMsZUFBVSxDQUFDLFlBQU07QUFBRSxRQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FB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ZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRpZDogbW9kdWxlSWQsXG4gXHRcdFx0bG9hZGVkOiBmYWxzZVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogd2VicGFjay9ib290c3RyYXAgOWEwMTlhZGU4OTUwYmVmMzUwMWJcbiAqKi8iLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCBQbGF5bGFuZyBmcm9tICcuL3BsYXlsYW5nLmpzJztcblxudmFyIHBsYXlsYW5nID0gbmV3IFBsYXlsYW5nKCk7XG5wbGF5bGFuZy5zdGFydCgpXG4gIC5uZXh0KChjdHgpID0+IHsgY29uc29sZS5sb2coJz4+Pj4+ICMwJyk7IGN0eC5yZXR1cm5zKDMpOyB9KS5hcygnYScpXG4gIC51bnRpbCgoeCkgPT4geCA9PT0gOSlcbiAgLmxvb3AoKGN0eCwgeCkgPT4ge1xuICAgIGN0eC5yZXR1cm5zKHggKyAxKTtcbiAgfSlcbiAgLnVudGlsKCh4KSA9PiB4ID09PSA5KVxuICAubG9vcCgoY3R4LCB4KSA9PiB7XG4gICAgY29uc29sZS5sb2coJz4+Pj4+Pj4gSSBzaG91bGQgbm90IHJ1biEnKTtcbiAgICBjdHgucmV0dXJucyh4ICsgMSk7XG4gIH0pXG4gIC51bnRpbCgoeCkgPT4geCA9PT0gMTApXG4gIC5sb29wKChjdHgsIHgpID0+IHtcbiAgICBjb25zb2xlLmxvZygnPj4+Pj4+PiBJIHNob3VsZCBydW4gb25jZScpO1xuICAgIGN0eC5yZXR1cm5zKHggKyAxKTtcbiAgfSlcbiAgLm5leHQoKGN0eCwgeCkgPT4geyBjb25zb2xlLmxvZygnPj4+Pj4gIzEnLCB4KTsgY3R4LnJldHVybnMoeCArIDQpO30pLmFzKCdiJylcbiAgLm5leHQoKGN0eCkgPT4ge1xuICAgIGNvbnNvbGUubG9nKCc+Pj4+Pj4+Pj4gIythYjogJywgY3R4LmEgKyBjdHguYik7XG4gICAgY3R4LnJldHVybnMoY3R4LmEgKyBjdHguYik7XG4gIH0pXG4gIC5tYXRjaCgpXG4gICAgLmNhc2UoKG4pID0+IG4gPCAxNykudG8oKGN0eCwgYSkgPT4geyBjdHgucmV0dXJucyhhICsgMSk7fSlcbiAgICAuY2FzZSgobikgPT4gbiA+IDE3ICkudG8oKGN0eCwgYikgPT4geyBjdHgucmV0dXJucyhiICsgOTk5KTt9KVxuICAgIC5jYXNlKChuKSA9PiBuID09PSAxNyApLnRvKChjdHgsIGMpID0+IHtcbiAgICAgIG5ldyBQcm9taXNlKChyLCBqKSA9PiB7XG4gICAgICAgIHNldFRpbWVvdXQociwgMjAwMCk7XG4gICAgICB9KS50aGVuKCgpID0+IHtcbiAgICAgICAgY3R4LnJldHVybnMoYysxKTtcbiAgICAgIH0pO1xuICAgIH0pXG4gICAgLmNhc2UoKG4pID0+IG4gPT09IDE3ICkudG8oKGN0eCwgZCkgPT4ge1xuICAgICAgY3R4LnJldHVybnMoZCAtIDI1NSk7XG4gICAgfSlcbiAgLmVuZCgpXG4gIC5uZXh0KChjdHgsIHgpID0+IHsgY29uc29sZS5sb2coJz4+Pj4+ICMyJywgeCk7IGN0eC5yZXR1cm5zKHggKyA1KTt9KVxuICAuYWxsKChjdHgpID0+IHtjdHgucmV0dXJucygxKTsgfSxcbiAgICAgIChjdHgpID0+IHtcbiAgICAgICAgY3R4LnJldHVybnMobmV3IFByb21pc2UoKHIsIGopID0+IHtcbiAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHsgcigyMCk7IH0sIDEwMDApO1xuICAgICAgICB9KSk7XG4gICAgICB9KVxuICAuYW55KChjdHgsIHJzKSA9PiB7Y3R4LnJldHVybnMocnNbMF0gKyByc1sxXSk7IH0sXG4gICAgICAoY3R4LCBycykgPT4ge1xuICAgICAgICBjdHgucmV0dXJucyhuZXcgUHJvbWlzZSgociwgaikgPT4ge1xuICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4geyByKHJzWzBdIC0gcnNbMV0pOyB9LCAxMDAwKTtcbiAgICAgICAgfSkpO1xuICAgICAgfSlcbiAgLm5leHQoKGN0eCwgcnMpID0+IHtcbiAgICBjb25zb2xlLmxvZygnPj4+Pj4+PiByczogJywgcnMpO1xuICAgIGN0eC5yZXR1cm5zKDEpO1xuICB9KVxuICAuZG9uZSgpO1xuICAvLyBUT0RPOiBkb25lIC0tPiBydW4hXG5cbi8qXG5cbmZuID0gKGN0eCwgYSwgYikgPT4ge1xuICB2YXIgcCA9IG5ldyBQbGF5bGFuZygpXG4gIGN0eC5yZXR1cm5zKHAuc3RhcnQoKS5uZXh0KChjdHgpID0+IHtcbiAgICAvLyBJdCdzIGdvb2QgdG8gc2hhZG93aW5nIHRoZSBvdXRlciBvbmUsXG4gICAgLy8gc2luY2Ugd2UgYWxyZWFkeSBib29rZWQgdG8gcmV0dXJuIHRoYXQuXG4gICAgY3R4LnJldHVybnMoYSArIGIpO1xuICB9KSk7XG59O1xuXG4vLyBET05UIFVTRTsgTk9UIElNUExFTUVOVEVEIElOVEVOVElPTkFMTFlcbmduID0gKGN0eCwgYSwgYikgPT4ge1xuICB2YXIgcCA9IG5ldyBQbGF5bGFuZygpXG4gIGN0eC5yZXR1cm5zKG5ldyBQcm9taXNlKChyLCBqKSA9PiB7XG4gICAgc2V0VGltZW91dChyKGEgLSBiKSwgMTAwMCk7XG4gIH0pLnRoZW4oKHJlc3VsdCkgPT4ge1xuICAgIHJldHVybiByZXN1bHQgKyAxO1xuICB9KSk7XG59O1xuXG5obiA9IChjdHgsIGEsIGIpID0+IHtcbiAgdmFyIHAgPSBuZXcgUGxheWxhbmcoKVxuICAobmV3IFByb21pc2UoKHIsIGopID0+IHtcbiAgICBzZXRUaW1lb3V0KHIoYSAtIGIpLCAxMDAwKTtcbiAgfSkudGhlbigocmVzdWx0KSA9PiB7XG4gICAgLy8gVXNlIGEgY2xvc3VyZSB0byByZXR1cm4gaXQsXG4gICAgLy8ganVzdCBsaWtlIG90aGVyIG9yZGluYXJ5IGZ1bmN0aW9ucy5cbiAgICBjdHgucmV0dXJucyhyZXN1bHQgKyAxKTtcbiAgfSk7XG59O1xuXG4gKi9cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vcGxheWxhbmctZGVtby5qc1xuICoqLyIsIm1vZHVsZS5leHBvcnRzID0geyBcImRlZmF1bHRcIjogcmVxdWlyZShcImNvcmUtanMvbGlicmFyeS9mbi9wcm9taXNlXCIpLCBfX2VzTW9kdWxlOiB0cnVlIH07XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuLi9+L2JhYmVsLXJ1bnRpbWUvY29yZS1qcy9wcm9taXNlLmpzXG4gKiogbW9kdWxlIGlkID0gMVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwicmVxdWlyZSgnLi4vbW9kdWxlcy9lczYub2JqZWN0LnRvLXN0cmluZycpO1xucmVxdWlyZSgnLi4vbW9kdWxlcy9lczYuc3RyaW5nLml0ZXJhdG9yJyk7XG5yZXF1aXJlKCcuLi9tb2R1bGVzL3dlYi5kb20uaXRlcmFibGUnKTtcbnJlcXVpcmUoJy4uL21vZHVsZXMvZXM2LnByb21pc2UnKTtcbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi4vbW9kdWxlcy8kLmNvcmUnKS5Qcm9taXNlO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi4vfi9iYWJlbC1ydW50aW1lL34vY29yZS1qcy9saWJyYXJ5L2ZuL3Byb21pc2UuanNcbiAqKiBtb2R1bGUgaWQgPSAyXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIndXNlIHN0cmljdCc7XG52YXIgJGF0ICA9IHJlcXVpcmUoJy4vJC5zdHJpbmctYXQnKSh0cnVlKTtcblxuLy8gMjEuMS4zLjI3IFN0cmluZy5wcm90b3R5cGVbQEBpdGVyYXRvcl0oKVxucmVxdWlyZSgnLi8kLml0ZXItZGVmaW5lJykoU3RyaW5nLCAnU3RyaW5nJywgZnVuY3Rpb24oaXRlcmF0ZWQpe1xuICB0aGlzLl90ID0gU3RyaW5nKGl0ZXJhdGVkKTsgLy8gdGFyZ2V0XG4gIHRoaXMuX2kgPSAwOyAgICAgICAgICAgICAgICAvLyBuZXh0IGluZGV4XG4vLyAyMS4xLjUuMi4xICVTdHJpbmdJdGVyYXRvclByb3RvdHlwZSUubmV4dCgpXG59LCBmdW5jdGlvbigpe1xuICB2YXIgTyAgICAgPSB0aGlzLl90XG4gICAgLCBpbmRleCA9IHRoaXMuX2lcbiAgICAsIHBvaW50O1xuICBpZihpbmRleCA+PSBPLmxlbmd0aClyZXR1cm4ge3ZhbHVlOiB1bmRlZmluZWQsIGRvbmU6IHRydWV9O1xuICBwb2ludCA9ICRhdChPLCBpbmRleCk7XG4gIHRoaXMuX2kgKz0gcG9pbnQubGVuZ3RoO1xuICByZXR1cm4ge3ZhbHVlOiBwb2ludCwgZG9uZTogZmFsc2V9O1xufSk7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuLi9+L2JhYmVsLXJ1bnRpbWUvfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczYuc3RyaW5nLml0ZXJhdG9yLmpzXG4gKiogbW9kdWxlIGlkID0gNFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiLy8gdHJ1ZSAgLT4gU3RyaW5nI2F0XG4vLyBmYWxzZSAtPiBTdHJpbmcjY29kZVBvaW50QXRcbnZhciB0b0ludGVnZXIgPSByZXF1aXJlKCcuLyQudG8taW50ZWdlcicpXG4gICwgZGVmaW5lZCAgID0gcmVxdWlyZSgnLi8kLmRlZmluZWQnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oVE9fU1RSSU5HKXtcbiAgcmV0dXJuIGZ1bmN0aW9uKHRoYXQsIHBvcyl7XG4gICAgdmFyIHMgPSBTdHJpbmcoZGVmaW5lZCh0aGF0KSlcbiAgICAgICwgaSA9IHRvSW50ZWdlcihwb3MpXG4gICAgICAsIGwgPSBzLmxlbmd0aFxuICAgICAgLCBhLCBiO1xuICAgIGlmKGkgPCAwIHx8IGkgPj0gbClyZXR1cm4gVE9fU1RSSU5HID8gJycgOiB1bmRlZmluZWQ7XG4gICAgYSA9IHMuY2hhckNvZGVBdChpKTtcbiAgICByZXR1cm4gYSA8IDB4ZDgwMCB8fCBhID4gMHhkYmZmIHx8IGkgKyAxID09PSBsXG4gICAgICB8fCAoYiA9IHMuY2hhckNvZGVBdChpICsgMSkpIDwgMHhkYzAwIHx8IGIgPiAweGRmZmZcbiAgICAgICAgPyBUT19TVFJJTkcgPyBzLmNoYXJBdChpKSA6IGFcbiAgICAgICAgOiBUT19TVFJJTkcgPyBzLnNsaWNlKGksIGkgKyAyKSA6IChhIC0gMHhkODAwIDw8IDEwKSArIChiIC0gMHhkYzAwKSArIDB4MTAwMDA7XG4gIH07XG59O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi4vfi9iYWJlbC1ydW50aW1lL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvJC5zdHJpbmctYXQuanNcbiAqKiBtb2R1bGUgaWQgPSA1XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIvLyA3LjEuNCBUb0ludGVnZXJcbnZhciBjZWlsICA9IE1hdGguY2VpbFxuICAsIGZsb29yID0gTWF0aC5mbG9vcjtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXQpe1xuICByZXR1cm4gaXNOYU4oaXQgPSAraXQpID8gMCA6IChpdCA+IDAgPyBmbG9vciA6IGNlaWwpKGl0KTtcbn07XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuLi9+L2JhYmVsLXJ1bnRpbWUvfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy8kLnRvLWludGVnZXIuanNcbiAqKiBtb2R1bGUgaWQgPSA2XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIvLyA3LjIuMSBSZXF1aXJlT2JqZWN0Q29lcmNpYmxlKGFyZ3VtZW50KVxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCl7XG4gIGlmKGl0ID09IHVuZGVmaW5lZCl0aHJvdyBUeXBlRXJyb3IoXCJDYW4ndCBjYWxsIG1ldGhvZCBvbiAgXCIgKyBpdCk7XG4gIHJldHVybiBpdDtcbn07XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuLi9+L2JhYmVsLXJ1bnRpbWUvfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy8kLmRlZmluZWQuanNcbiAqKiBtb2R1bGUgaWQgPSA3XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIndXNlIHN0cmljdCc7XG52YXIgTElCUkFSWSAgICAgICAgID0gcmVxdWlyZSgnLi8kLmxpYnJhcnknKVxuICAsICRkZWYgICAgICAgICAgICA9IHJlcXVpcmUoJy4vJC5kZWYnKVxuICAsICRyZWRlZiAgICAgICAgICA9IHJlcXVpcmUoJy4vJC5yZWRlZicpXG4gICwgaGlkZSAgICAgICAgICAgID0gcmVxdWlyZSgnLi8kLmhpZGUnKVxuICAsIGhhcyAgICAgICAgICAgICA9IHJlcXVpcmUoJy4vJC5oYXMnKVxuICAsIFNZTUJPTF9JVEVSQVRPUiA9IHJlcXVpcmUoJy4vJC53a3MnKSgnaXRlcmF0b3InKVxuICAsIEl0ZXJhdG9ycyAgICAgICA9IHJlcXVpcmUoJy4vJC5pdGVyYXRvcnMnKVxuICAsIEZGX0lURVJBVE9SICAgICA9ICdAQGl0ZXJhdG9yJ1xuICAsIEtFWVMgICAgICAgICAgICA9ICdrZXlzJ1xuICAsIFZBTFVFUyAgICAgICAgICA9ICd2YWx1ZXMnO1xudmFyIHJldHVyblRoaXMgPSBmdW5jdGlvbigpeyByZXR1cm4gdGhpczsgfTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oQmFzZSwgTkFNRSwgQ29uc3RydWN0b3IsIG5leHQsIERFRkFVTFQsIElTX1NFVCwgRk9SQ0Upe1xuICByZXF1aXJlKCcuLyQuaXRlci1jcmVhdGUnKShDb25zdHJ1Y3RvciwgTkFNRSwgbmV4dCk7XG4gIHZhciBjcmVhdGVNZXRob2QgPSBmdW5jdGlvbihraW5kKXtcbiAgICBzd2l0Y2goa2luZCl7XG4gICAgICBjYXNlIEtFWVM6IHJldHVybiBmdW5jdGlvbiBrZXlzKCl7IHJldHVybiBuZXcgQ29uc3RydWN0b3IodGhpcywga2luZCk7IH07XG4gICAgICBjYXNlIFZBTFVFUzogcmV0dXJuIGZ1bmN0aW9uIHZhbHVlcygpeyByZXR1cm4gbmV3IENvbnN0cnVjdG9yKHRoaXMsIGtpbmQpOyB9O1xuICAgIH0gcmV0dXJuIGZ1bmN0aW9uIGVudHJpZXMoKXsgcmV0dXJuIG5ldyBDb25zdHJ1Y3Rvcih0aGlzLCBraW5kKTsgfTtcbiAgfTtcbiAgdmFyIFRBRyAgICAgID0gTkFNRSArICcgSXRlcmF0b3InXG4gICAgLCBwcm90byAgICA9IEJhc2UucHJvdG90eXBlXG4gICAgLCBfbmF0aXZlICA9IHByb3RvW1NZTUJPTF9JVEVSQVRPUl0gfHwgcHJvdG9bRkZfSVRFUkFUT1JdIHx8IERFRkFVTFQgJiYgcHJvdG9bREVGQVVMVF1cbiAgICAsIF9kZWZhdWx0ID0gX25hdGl2ZSB8fCBjcmVhdGVNZXRob2QoREVGQVVMVClcbiAgICAsIG1ldGhvZHMsIGtleTtcbiAgLy8gRml4IG5hdGl2ZVxuICBpZihfbmF0aXZlKXtcbiAgICB2YXIgSXRlcmF0b3JQcm90b3R5cGUgPSByZXF1aXJlKCcuLyQnKS5nZXRQcm90byhfZGVmYXVsdC5jYWxsKG5ldyBCYXNlKSk7XG4gICAgLy8gU2V0IEBAdG9TdHJpbmdUYWcgdG8gbmF0aXZlIGl0ZXJhdG9yc1xuICAgIHJlcXVpcmUoJy4vJC50YWcnKShJdGVyYXRvclByb3RvdHlwZSwgVEFHLCB0cnVlKTtcbiAgICAvLyBGRiBmaXhcbiAgICBpZighTElCUkFSWSAmJiBoYXMocHJvdG8sIEZGX0lURVJBVE9SKSloaWRlKEl0ZXJhdG9yUHJvdG90eXBlLCBTWU1CT0xfSVRFUkFUT1IsIHJldHVyblRoaXMpO1xuICB9XG4gIC8vIERlZmluZSBpdGVyYXRvclxuICBpZighTElCUkFSWSB8fCBGT1JDRSloaWRlKHByb3RvLCBTWU1CT0xfSVRFUkFUT1IsIF9kZWZhdWx0KTtcbiAgLy8gUGx1ZyBmb3IgbGlicmFyeVxuICBJdGVyYXRvcnNbTkFNRV0gPSBfZGVmYXVsdDtcbiAgSXRlcmF0b3JzW1RBR10gID0gcmV0dXJuVGhpcztcbiAgaWYoREVGQVVMVCl7XG4gICAgbWV0aG9kcyA9IHtcbiAgICAgIGtleXM6ICAgIElTX1NFVCAgICAgICAgICAgID8gX2RlZmF1bHQgOiBjcmVhdGVNZXRob2QoS0VZUyksXG4gICAgICB2YWx1ZXM6ICBERUZBVUxUID09IFZBTFVFUyA/IF9kZWZhdWx0IDogY3JlYXRlTWV0aG9kKFZBTFVFUyksXG4gICAgICBlbnRyaWVzOiBERUZBVUxUICE9IFZBTFVFUyA/IF9kZWZhdWx0IDogY3JlYXRlTWV0aG9kKCdlbnRyaWVzJylcbiAgICB9O1xuICAgIGlmKEZPUkNFKWZvcihrZXkgaW4gbWV0aG9kcyl7XG4gICAgICBpZighKGtleSBpbiBwcm90bykpJHJlZGVmKHByb3RvLCBrZXksIG1ldGhvZHNba2V5XSk7XG4gICAgfSBlbHNlICRkZWYoJGRlZi5QICsgJGRlZi5GICogcmVxdWlyZSgnLi8kLml0ZXItYnVnZ3knKSwgTkFNRSwgbWV0aG9kcyk7XG4gIH1cbn07XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuLi9+L2JhYmVsLXJ1bnRpbWUvfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy8kLml0ZXItZGVmaW5lLmpzXG4gKiogbW9kdWxlIGlkID0gOFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSB0cnVlO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi4vfi9iYWJlbC1ydW50aW1lL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvJC5saWJyYXJ5LmpzXG4gKiogbW9kdWxlIGlkID0gOVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwidmFyIGdsb2JhbCAgICA9IHJlcXVpcmUoJy4vJC5nbG9iYWwnKVxuICAsIGNvcmUgICAgICA9IHJlcXVpcmUoJy4vJC5jb3JlJylcbiAgLCBQUk9UT1RZUEUgPSAncHJvdG90eXBlJztcbnZhciBjdHggPSBmdW5jdGlvbihmbiwgdGhhdCl7XG4gIHJldHVybiBmdW5jdGlvbigpe1xuICAgIHJldHVybiBmbi5hcHBseSh0aGF0LCBhcmd1bWVudHMpO1xuICB9O1xufTtcbnZhciAkZGVmID0gZnVuY3Rpb24odHlwZSwgbmFtZSwgc291cmNlKXtcbiAgdmFyIGtleSwgb3duLCBvdXQsIGV4cFxuICAgICwgaXNHbG9iYWwgPSB0eXBlICYgJGRlZi5HXG4gICAgLCBpc1Byb3RvICA9IHR5cGUgJiAkZGVmLlBcbiAgICAsIHRhcmdldCAgID0gaXNHbG9iYWwgPyBnbG9iYWwgOiB0eXBlICYgJGRlZi5TXG4gICAgICAgID8gZ2xvYmFsW25hbWVdIDogKGdsb2JhbFtuYW1lXSB8fCB7fSlbUFJPVE9UWVBFXVxuICAgICwgZXhwb3J0cyAgPSBpc0dsb2JhbCA/IGNvcmUgOiBjb3JlW25hbWVdIHx8IChjb3JlW25hbWVdID0ge30pO1xuICBpZihpc0dsb2JhbClzb3VyY2UgPSBuYW1lO1xuICBmb3Ioa2V5IGluIHNvdXJjZSl7XG4gICAgLy8gY29udGFpbnMgaW4gbmF0aXZlXG4gICAgb3duID0gISh0eXBlICYgJGRlZi5GKSAmJiB0YXJnZXQgJiYga2V5IGluIHRhcmdldDtcbiAgICBpZihvd24gJiYga2V5IGluIGV4cG9ydHMpY29udGludWU7XG4gICAgLy8gZXhwb3J0IG5hdGl2ZSBvciBwYXNzZWRcbiAgICBvdXQgPSBvd24gPyB0YXJnZXRba2V5XSA6IHNvdXJjZVtrZXldO1xuICAgIC8vIHByZXZlbnQgZ2xvYmFsIHBvbGx1dGlvbiBmb3IgbmFtZXNwYWNlc1xuICAgIGlmKGlzR2xvYmFsICYmIHR5cGVvZiB0YXJnZXRba2V5XSAhPSAnZnVuY3Rpb24nKWV4cCA9IHNvdXJjZVtrZXldO1xuICAgIC8vIGJpbmQgdGltZXJzIHRvIGdsb2JhbCBmb3IgY2FsbCBmcm9tIGV4cG9ydCBjb250ZXh0XG4gICAgZWxzZSBpZih0eXBlICYgJGRlZi5CICYmIG93billeHAgPSBjdHgob3V0LCBnbG9iYWwpO1xuICAgIC8vIHdyYXAgZ2xvYmFsIGNvbnN0cnVjdG9ycyBmb3IgcHJldmVudCBjaGFuZ2UgdGhlbSBpbiBsaWJyYXJ5XG4gICAgZWxzZSBpZih0eXBlICYgJGRlZi5XICYmIHRhcmdldFtrZXldID09IG91dCkhZnVuY3Rpb24oQyl7XG4gICAgICBleHAgPSBmdW5jdGlvbihwYXJhbSl7XG4gICAgICAgIHJldHVybiB0aGlzIGluc3RhbmNlb2YgQyA/IG5ldyBDKHBhcmFtKSA6IEMocGFyYW0pO1xuICAgICAgfTtcbiAgICAgIGV4cFtQUk9UT1RZUEVdID0gQ1tQUk9UT1RZUEVdO1xuICAgIH0ob3V0KTtcbiAgICBlbHNlIGV4cCA9IGlzUHJvdG8gJiYgdHlwZW9mIG91dCA9PSAnZnVuY3Rpb24nID8gY3R4KEZ1bmN0aW9uLmNhbGwsIG91dCkgOiBvdXQ7XG4gICAgLy8gZXhwb3J0XG4gICAgZXhwb3J0c1trZXldID0gZXhwO1xuICAgIGlmKGlzUHJvdG8pKGV4cG9ydHNbUFJPVE9UWVBFXSB8fCAoZXhwb3J0c1tQUk9UT1RZUEVdID0ge30pKVtrZXldID0gb3V0O1xuICB9XG59O1xuLy8gdHlwZSBiaXRtYXBcbiRkZWYuRiA9IDE7ICAvLyBmb3JjZWRcbiRkZWYuRyA9IDI7ICAvLyBnbG9iYWxcbiRkZWYuUyA9IDQ7ICAvLyBzdGF0aWNcbiRkZWYuUCA9IDg7ICAvLyBwcm90b1xuJGRlZi5CID0gMTY7IC8vIGJpbmRcbiRkZWYuVyA9IDMyOyAvLyB3cmFwXG5tb2R1bGUuZXhwb3J0cyA9ICRkZWY7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuLi9+L2JhYmVsLXJ1bnRpbWUvfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy8kLmRlZi5qc1xuICoqIG1vZHVsZSBpZCA9IDEwXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJ2YXIgZ2xvYmFsID0gdHlwZW9mIHNlbGYgIT0gJ3VuZGVmaW5lZCcgJiYgc2VsZi5NYXRoID09IE1hdGggPyBzZWxmIDogRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcbm1vZHVsZS5leHBvcnRzID0gZ2xvYmFsO1xuaWYodHlwZW9mIF9fZyA9PSAnbnVtYmVyJylfX2cgPSBnbG9iYWw7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW5kZWZcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4uL34vYmFiZWwtcnVudGltZS9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzLyQuZ2xvYmFsLmpzXG4gKiogbW9kdWxlIGlkID0gMTFcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsInZhciBjb3JlID0gbW9kdWxlLmV4cG9ydHMgPSB7fTtcbmlmKHR5cGVvZiBfX2UgPT0gJ251bWJlcicpX19lID0gY29yZTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bmRlZlxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi4vfi9iYWJlbC1ydW50aW1lL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvJC5jb3JlLmpzXG4gKiogbW9kdWxlIGlkID0gMTJcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi8kLmhpZGUnKTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4uL34vYmFiZWwtcnVudGltZS9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzLyQucmVkZWYuanNcbiAqKiBtb2R1bGUgaWQgPSAxM1xuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwidmFyICQgICAgICAgICAgPSByZXF1aXJlKCcuLyQnKVxuICAsIGNyZWF0ZURlc2MgPSByZXF1aXJlKCcuLyQucHJvcGVydHktZGVzYycpO1xubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuLyQuc3VwcG9ydC1kZXNjJykgPyBmdW5jdGlvbihvYmplY3QsIGtleSwgdmFsdWUpe1xuICByZXR1cm4gJC5zZXREZXNjKG9iamVjdCwga2V5LCBjcmVhdGVEZXNjKDEsIHZhbHVlKSk7XG59IDogZnVuY3Rpb24ob2JqZWN0LCBrZXksIHZhbHVlKXtcbiAgb2JqZWN0W2tleV0gPSB2YWx1ZTtcbiAgcmV0dXJuIG9iamVjdDtcbn07XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuLi9+L2JhYmVsLXJ1bnRpbWUvfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy8kLmhpZGUuanNcbiAqKiBtb2R1bGUgaWQgPSAxNFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwidmFyICRPYmplY3QgPSBPYmplY3Q7XG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgY3JlYXRlOiAgICAgJE9iamVjdC5jcmVhdGUsXG4gIGdldFByb3RvOiAgICRPYmplY3QuZ2V0UHJvdG90eXBlT2YsXG4gIGlzRW51bTogICAgIHt9LnByb3BlcnR5SXNFbnVtZXJhYmxlLFxuICBnZXREZXNjOiAgICAkT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcixcbiAgc2V0RGVzYzogICAgJE9iamVjdC5kZWZpbmVQcm9wZXJ0eSxcbiAgc2V0RGVzY3M6ICAgJE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzLFxuICBnZXRLZXlzOiAgICAkT2JqZWN0LmtleXMsXG4gIGdldE5hbWVzOiAgICRPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyxcbiAgZ2V0U3ltYm9sczogJE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMsXG4gIGVhY2g6ICAgICAgIFtdLmZvckVhY2hcbn07XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuLi9+L2JhYmVsLXJ1bnRpbWUvfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy8kLmpzXG4gKiogbW9kdWxlIGlkID0gMTVcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oYml0bWFwLCB2YWx1ZSl7XG4gIHJldHVybiB7XG4gICAgZW51bWVyYWJsZSAgOiAhKGJpdG1hcCAmIDEpLFxuICAgIGNvbmZpZ3VyYWJsZTogIShiaXRtYXAgJiAyKSxcbiAgICB3cml0YWJsZSAgICA6ICEoYml0bWFwICYgNCksXG4gICAgdmFsdWUgICAgICAgOiB2YWx1ZVxuICB9O1xufTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4uL34vYmFiZWwtcnVudGltZS9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzLyQucHJvcGVydHktZGVzYy5qc1xuICoqIG1vZHVsZSBpZCA9IDE2XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIvLyBUaGFuaydzIElFOCBmb3IgaGlzIGZ1bm55IGRlZmluZVByb3BlcnR5XG5tb2R1bGUuZXhwb3J0cyA9ICFyZXF1aXJlKCcuLyQuZmFpbHMnKShmdW5jdGlvbigpe1xuICByZXR1cm4gT2JqZWN0LmRlZmluZVByb3BlcnR5KHt9LCAnYScsIHtnZXQ6IGZ1bmN0aW9uKCl7IHJldHVybiA3OyB9fSkuYSAhPSA3O1xufSk7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuLi9+L2JhYmVsLXJ1bnRpbWUvfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy8kLnN1cHBvcnQtZGVzYy5qc1xuICoqIG1vZHVsZSBpZCA9IDE3XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGV4ZWMpe1xuICB0cnkge1xuICAgIHJldHVybiAhIWV4ZWMoKTtcbiAgfSBjYXRjaChlKXtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxufTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4uL34vYmFiZWwtcnVudGltZS9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzLyQuZmFpbHMuanNcbiAqKiBtb2R1bGUgaWQgPSAxOFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwidmFyIGhhc093blByb3BlcnR5ID0ge30uaGFzT3duUHJvcGVydHk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0LCBrZXkpe1xuICByZXR1cm4gaGFzT3duUHJvcGVydHkuY2FsbChpdCwga2V5KTtcbn07XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuLi9+L2JhYmVsLXJ1bnRpbWUvfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy8kLmhhcy5qc1xuICoqIG1vZHVsZSBpZCA9IDE5XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJ2YXIgc3RvcmUgID0gcmVxdWlyZSgnLi8kLnNoYXJlZCcpKCd3a3MnKVxuICAsIFN5bWJvbCA9IHJlcXVpcmUoJy4vJC5nbG9iYWwnKS5TeW1ib2w7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKG5hbWUpe1xuICByZXR1cm4gc3RvcmVbbmFtZV0gfHwgKHN0b3JlW25hbWVdID1cbiAgICBTeW1ib2wgJiYgU3ltYm9sW25hbWVdIHx8IChTeW1ib2wgfHwgcmVxdWlyZSgnLi8kLnVpZCcpKSgnU3ltYm9sLicgKyBuYW1lKSk7XG59O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi4vfi9iYWJlbC1ydW50aW1lL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvJC53a3MuanNcbiAqKiBtb2R1bGUgaWQgPSAyMFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwidmFyIGdsb2JhbCA9IHJlcXVpcmUoJy4vJC5nbG9iYWwnKVxuICAsIFNIQVJFRCA9ICdfX2NvcmUtanNfc2hhcmVkX18nXG4gICwgc3RvcmUgID0gZ2xvYmFsW1NIQVJFRF0gfHwgKGdsb2JhbFtTSEFSRURdID0ge30pO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihrZXkpe1xuICByZXR1cm4gc3RvcmVba2V5XSB8fCAoc3RvcmVba2V5XSA9IHt9KTtcbn07XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuLi9+L2JhYmVsLXJ1bnRpbWUvfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy8kLnNoYXJlZC5qc1xuICoqIG1vZHVsZSBpZCA9IDIxXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJ2YXIgaWQgPSAwXG4gICwgcHggPSBNYXRoLnJhbmRvbSgpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihrZXkpe1xuICByZXR1cm4gJ1N5bWJvbCgnLmNvbmNhdChrZXkgPT09IHVuZGVmaW5lZCA/ICcnIDoga2V5LCAnKV8nLCAoKytpZCArIHB4KS50b1N0cmluZygzNikpO1xufTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4uL34vYmFiZWwtcnVudGltZS9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzLyQudWlkLmpzXG4gKiogbW9kdWxlIGlkID0gMjJcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIm1vZHVsZS5leHBvcnRzID0ge307XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuLi9+L2JhYmVsLXJ1bnRpbWUvfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy8kLml0ZXJhdG9ycy5qc1xuICoqIG1vZHVsZSBpZCA9IDIzXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIndXNlIHN0cmljdCc7XG52YXIgJCA9IHJlcXVpcmUoJy4vJCcpXG4gICwgSXRlcmF0b3JQcm90b3R5cGUgPSB7fTtcblxuLy8gMjUuMS4yLjEuMSAlSXRlcmF0b3JQcm90b3R5cGUlW0BAaXRlcmF0b3JdKClcbnJlcXVpcmUoJy4vJC5oaWRlJykoSXRlcmF0b3JQcm90b3R5cGUsIHJlcXVpcmUoJy4vJC53a3MnKSgnaXRlcmF0b3InKSwgZnVuY3Rpb24oKXsgcmV0dXJuIHRoaXM7IH0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKENvbnN0cnVjdG9yLCBOQU1FLCBuZXh0KXtcbiAgQ29uc3RydWN0b3IucHJvdG90eXBlID0gJC5jcmVhdGUoSXRlcmF0b3JQcm90b3R5cGUsIHtuZXh0OiByZXF1aXJlKCcuLyQucHJvcGVydHktZGVzYycpKDEsbmV4dCl9KTtcbiAgcmVxdWlyZSgnLi8kLnRhZycpKENvbnN0cnVjdG9yLCBOQU1FICsgJyBJdGVyYXRvcicpO1xufTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4uL34vYmFiZWwtcnVudGltZS9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzLyQuaXRlci1jcmVhdGUuanNcbiAqKiBtb2R1bGUgaWQgPSAyNFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwidmFyIGhhcyAgPSByZXF1aXJlKCcuLyQuaGFzJylcbiAgLCBoaWRlID0gcmVxdWlyZSgnLi8kLmhpZGUnKVxuICAsIFRBRyAgPSByZXF1aXJlKCcuLyQud2tzJykoJ3RvU3RyaW5nVGFnJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXQsIHRhZywgc3RhdCl7XG4gIGlmKGl0ICYmICFoYXMoaXQgPSBzdGF0ID8gaXQgOiBpdC5wcm90b3R5cGUsIFRBRykpaGlkZShpdCwgVEFHLCB0YWcpO1xufTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4uL34vYmFiZWwtcnVudGltZS9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzLyQudGFnLmpzXG4gKiogbW9kdWxlIGlkID0gMjVcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIi8vIFNhZmFyaSBoYXMgYnVnZ3kgaXRlcmF0b3JzIHcvbyBgbmV4dGBcbm1vZHVsZS5leHBvcnRzID0gJ2tleXMnIGluIFtdICYmICEoJ25leHQnIGluIFtdLmtleXMoKSk7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuLi9+L2JhYmVsLXJ1bnRpbWUvfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy8kLml0ZXItYnVnZ3kuanNcbiAqKiBtb2R1bGUgaWQgPSAyNlxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwicmVxdWlyZSgnLi9lczYuYXJyYXkuaXRlcmF0b3InKTtcbnZhciBJdGVyYXRvcnMgPSByZXF1aXJlKCcuLyQuaXRlcmF0b3JzJyk7XG5JdGVyYXRvcnMuTm9kZUxpc3QgPSBJdGVyYXRvcnMuSFRNTENvbGxlY3Rpb24gPSBJdGVyYXRvcnMuQXJyYXk7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuLi9+L2JhYmVsLXJ1bnRpbWUvfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy93ZWIuZG9tLml0ZXJhYmxlLmpzXG4gKiogbW9kdWxlIGlkID0gMjdcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIid1c2Ugc3RyaWN0JztcbnZhciBzZXRVbnNjb3BlID0gcmVxdWlyZSgnLi8kLnVuc2NvcGUnKVxuICAsIHN0ZXAgICAgICAgPSByZXF1aXJlKCcuLyQuaXRlci1zdGVwJylcbiAgLCBJdGVyYXRvcnMgID0gcmVxdWlyZSgnLi8kLml0ZXJhdG9ycycpXG4gICwgdG9JT2JqZWN0ICA9IHJlcXVpcmUoJy4vJC50by1pb2JqZWN0Jyk7XG5cbi8vIDIyLjEuMy40IEFycmF5LnByb3RvdHlwZS5lbnRyaWVzKClcbi8vIDIyLjEuMy4xMyBBcnJheS5wcm90b3R5cGUua2V5cygpXG4vLyAyMi4xLjMuMjkgQXJyYXkucHJvdG90eXBlLnZhbHVlcygpXG4vLyAyMi4xLjMuMzAgQXJyYXkucHJvdG90eXBlW0BAaXRlcmF0b3JdKClcbnJlcXVpcmUoJy4vJC5pdGVyLWRlZmluZScpKEFycmF5LCAnQXJyYXknLCBmdW5jdGlvbihpdGVyYXRlZCwga2luZCl7XG4gIHRoaXMuX3QgPSB0b0lPYmplY3QoaXRlcmF0ZWQpOyAvLyB0YXJnZXRcbiAgdGhpcy5faSA9IDA7ICAgICAgICAgICAgICAgICAgIC8vIG5leHQgaW5kZXhcbiAgdGhpcy5fayA9IGtpbmQ7ICAgICAgICAgICAgICAgIC8vIGtpbmRcbi8vIDIyLjEuNS4yLjEgJUFycmF5SXRlcmF0b3JQcm90b3R5cGUlLm5leHQoKVxufSwgZnVuY3Rpb24oKXtcbiAgdmFyIE8gICAgID0gdGhpcy5fdFxuICAgICwga2luZCAgPSB0aGlzLl9rXG4gICAgLCBpbmRleCA9IHRoaXMuX2krKztcbiAgaWYoIU8gfHwgaW5kZXggPj0gTy5sZW5ndGgpe1xuICAgIHRoaXMuX3QgPSB1bmRlZmluZWQ7XG4gICAgcmV0dXJuIHN0ZXAoMSk7XG4gIH1cbiAgaWYoa2luZCA9PSAna2V5cycgIClyZXR1cm4gc3RlcCgwLCBpbmRleCk7XG4gIGlmKGtpbmQgPT0gJ3ZhbHVlcycpcmV0dXJuIHN0ZXAoMCwgT1tpbmRleF0pO1xuICByZXR1cm4gc3RlcCgwLCBbaW5kZXgsIE9baW5kZXhdXSk7XG59LCAndmFsdWVzJyk7XG5cbi8vIGFyZ3VtZW50c0xpc3RbQEBpdGVyYXRvcl0gaXMgJUFycmF5UHJvdG9fdmFsdWVzJSAoOS40LjQuNiwgOS40LjQuNylcbkl0ZXJhdG9ycy5Bcmd1bWVudHMgPSBJdGVyYXRvcnMuQXJyYXk7XG5cbnNldFVuc2NvcGUoJ2tleXMnKTtcbnNldFVuc2NvcGUoJ3ZhbHVlcycpO1xuc2V0VW5zY29wZSgnZW50cmllcycpO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi4vfi9iYWJlbC1ydW50aW1lL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM2LmFycmF5Lml0ZXJhdG9yLmpzXG4gKiogbW9kdWxlIGlkID0gMjhcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oKXsgLyogZW1wdHkgKi8gfTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4uL34vYmFiZWwtcnVudGltZS9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzLyQudW5zY29wZS5qc1xuICoqIG1vZHVsZSBpZCA9IDI5XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGRvbmUsIHZhbHVlKXtcbiAgcmV0dXJuIHt2YWx1ZTogdmFsdWUsIGRvbmU6ICEhZG9uZX07XG59O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi4vfi9iYWJlbC1ydW50aW1lL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvJC5pdGVyLXN0ZXAuanNcbiAqKiBtb2R1bGUgaWQgPSAzMFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiLy8gdG8gaW5kZXhlZCBvYmplY3QsIHRvT2JqZWN0IHdpdGggZmFsbGJhY2sgZm9yIG5vbi1hcnJheS1saWtlIEVTMyBzdHJpbmdzXHJcbnZhciBJT2JqZWN0ID0gcmVxdWlyZSgnLi8kLmlvYmplY3QnKVxyXG4gICwgZGVmaW5lZCA9IHJlcXVpcmUoJy4vJC5kZWZpbmVkJyk7XHJcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXQpe1xyXG4gIHJldHVybiBJT2JqZWN0KGRlZmluZWQoaXQpKTtcclxufTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4uL34vYmFiZWwtcnVudGltZS9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzLyQudG8taW9iamVjdC5qc1xuICoqIG1vZHVsZSBpZCA9IDMxXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIvLyBpbmRleGVkIG9iamVjdCwgZmFsbGJhY2sgZm9yIG5vbi1hcnJheS1saWtlIEVTMyBzdHJpbmdzXG52YXIgY29mID0gcmVxdWlyZSgnLi8kLmNvZicpO1xubW9kdWxlLmV4cG9ydHMgPSAwIGluIE9iamVjdCgneicpID8gT2JqZWN0IDogZnVuY3Rpb24oaXQpe1xuICByZXR1cm4gY29mKGl0KSA9PSAnU3RyaW5nJyA/IGl0LnNwbGl0KCcnKSA6IE9iamVjdChpdCk7XG59O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi4vfi9iYWJlbC1ydW50aW1lL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvJC5pb2JqZWN0LmpzXG4gKiogbW9kdWxlIGlkID0gMzJcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsInZhciB0b1N0cmluZyA9IHt9LnRvU3RyaW5nO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0KXtcbiAgcmV0dXJuIHRvU3RyaW5nLmNhbGwoaXQpLnNsaWNlKDgsIC0xKTtcbn07XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuLi9+L2JhYmVsLXJ1bnRpbWUvfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy8kLmNvZi5qc1xuICoqIG1vZHVsZSBpZCA9IDMzXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIndXNlIHN0cmljdCc7XG52YXIgJCAgICAgICAgICA9IHJlcXVpcmUoJy4vJCcpXG4gICwgTElCUkFSWSAgICA9IHJlcXVpcmUoJy4vJC5saWJyYXJ5JylcbiAgLCBnbG9iYWwgICAgID0gcmVxdWlyZSgnLi8kLmdsb2JhbCcpXG4gICwgY3R4ICAgICAgICA9IHJlcXVpcmUoJy4vJC5jdHgnKVxuICAsIGNsYXNzb2YgICAgPSByZXF1aXJlKCcuLyQuY2xhc3NvZicpXG4gICwgJGRlZiAgICAgICA9IHJlcXVpcmUoJy4vJC5kZWYnKVxuICAsIGlzT2JqZWN0ICAgPSByZXF1aXJlKCcuLyQuaXMtb2JqZWN0JylcbiAgLCBhbk9iamVjdCAgID0gcmVxdWlyZSgnLi8kLmFuLW9iamVjdCcpXG4gICwgYUZ1bmN0aW9uICA9IHJlcXVpcmUoJy4vJC5hLWZ1bmN0aW9uJylcbiAgLCBzdHJpY3ROZXcgID0gcmVxdWlyZSgnLi8kLnN0cmljdC1uZXcnKVxuICAsIGZvck9mICAgICAgPSByZXF1aXJlKCcuLyQuZm9yLW9mJylcbiAgLCBzZXRQcm90byAgID0gcmVxdWlyZSgnLi8kLnNldC1wcm90bycpLnNldFxuICAsIHNhbWUgICAgICAgPSByZXF1aXJlKCcuLyQuc2FtZScpXG4gICwgc3BlY2llcyAgICA9IHJlcXVpcmUoJy4vJC5zcGVjaWVzJylcbiAgLCBTUEVDSUVTICAgID0gcmVxdWlyZSgnLi8kLndrcycpKCdzcGVjaWVzJylcbiAgLCBSRUNPUkQgICAgID0gcmVxdWlyZSgnLi8kLnVpZCcpKCdyZWNvcmQnKVxuICAsIGFzYXAgICAgICAgPSByZXF1aXJlKCcuLyQubWljcm90YXNrJylcbiAgLCBQUk9NSVNFICAgID0gJ1Byb21pc2UnXG4gICwgcHJvY2VzcyAgICA9IGdsb2JhbC5wcm9jZXNzXG4gICwgaXNOb2RlICAgICA9IGNsYXNzb2YocHJvY2VzcykgPT0gJ3Byb2Nlc3MnXG4gICwgUCAgICAgICAgICA9IGdsb2JhbFtQUk9NSVNFXVxuICAsIFdyYXBwZXI7XG5cbnZhciB0ZXN0UmVzb2x2ZSA9IGZ1bmN0aW9uKHN1Yil7XG4gIHZhciB0ZXN0ID0gbmV3IFAoZnVuY3Rpb24oKXt9KTtcbiAgaWYoc3ViKXRlc3QuY29uc3RydWN0b3IgPSBPYmplY3Q7XG4gIHJldHVybiBQLnJlc29sdmUodGVzdCkgPT09IHRlc3Q7XG59O1xuXG52YXIgdXNlTmF0aXZlID0gZnVuY3Rpb24oKXtcbiAgdmFyIHdvcmtzID0gZmFsc2U7XG4gIGZ1bmN0aW9uIFAyKHgpe1xuICAgIHZhciBzZWxmID0gbmV3IFAoeCk7XG4gICAgc2V0UHJvdG8oc2VsZiwgUDIucHJvdG90eXBlKTtcbiAgICByZXR1cm4gc2VsZjtcbiAgfVxuICB0cnkge1xuICAgIHdvcmtzID0gUCAmJiBQLnJlc29sdmUgJiYgdGVzdFJlc29sdmUoKTtcbiAgICBzZXRQcm90byhQMiwgUCk7XG4gICAgUDIucHJvdG90eXBlID0gJC5jcmVhdGUoUC5wcm90b3R5cGUsIHtjb25zdHJ1Y3Rvcjoge3ZhbHVlOiBQMn19KTtcbiAgICAvLyBhY3R1YWwgRmlyZWZveCBoYXMgYnJva2VuIHN1YmNsYXNzIHN1cHBvcnQsIHRlc3QgdGhhdFxuICAgIGlmKCEoUDIucmVzb2x2ZSg1KS50aGVuKGZ1bmN0aW9uKCl7fSkgaW5zdGFuY2VvZiBQMikpe1xuICAgICAgd29ya3MgPSBmYWxzZTtcbiAgICB9XG4gICAgLy8gYWN0dWFsIFY4IGJ1ZywgaHR0cHM6Ly9jb2RlLmdvb2dsZS5jb20vcC92OC9pc3N1ZXMvZGV0YWlsP2lkPTQxNjJcbiAgICBpZih3b3JrcyAmJiByZXF1aXJlKCcuLyQuc3VwcG9ydC1kZXNjJykpe1xuICAgICAgdmFyIHRoZW5hYmxlVGhlbkdvdHRlbiA9IGZhbHNlO1xuICAgICAgUC5yZXNvbHZlKCQuc2V0RGVzYyh7fSwgJ3RoZW4nLCB7XG4gICAgICAgIGdldDogZnVuY3Rpb24oKXsgdGhlbmFibGVUaGVuR290dGVuID0gdHJ1ZTsgfVxuICAgICAgfSkpO1xuICAgICAgd29ya3MgPSB0aGVuYWJsZVRoZW5Hb3R0ZW47XG4gICAgfVxuICB9IGNhdGNoKGUpeyB3b3JrcyA9IGZhbHNlOyB9XG4gIHJldHVybiB3b3Jrcztcbn0oKTtcblxuLy8gaGVscGVyc1xudmFyIGlzUHJvbWlzZSA9IGZ1bmN0aW9uKGl0KXtcbiAgcmV0dXJuIGlzT2JqZWN0KGl0KSAmJiAodXNlTmF0aXZlID8gY2xhc3NvZihpdCkgPT0gJ1Byb21pc2UnIDogUkVDT1JEIGluIGl0KTtcbn07XG52YXIgc2FtZUNvbnN0cnVjdG9yID0gZnVuY3Rpb24oYSwgYil7XG4gIC8vIGxpYnJhcnkgd3JhcHBlciBzcGVjaWFsIGNhc2VcbiAgaWYoTElCUkFSWSAmJiBhID09PSBQICYmIGIgPT09IFdyYXBwZXIpcmV0dXJuIHRydWU7XG4gIHJldHVybiBzYW1lKGEsIGIpO1xufTtcbnZhciBnZXRDb25zdHJ1Y3RvciA9IGZ1bmN0aW9uKEMpe1xuICB2YXIgUyA9IGFuT2JqZWN0KEMpW1NQRUNJRVNdO1xuICByZXR1cm4gUyAhPSB1bmRlZmluZWQgPyBTIDogQztcbn07XG52YXIgaXNUaGVuYWJsZSA9IGZ1bmN0aW9uKGl0KXtcbiAgdmFyIHRoZW47XG4gIHJldHVybiBpc09iamVjdChpdCkgJiYgdHlwZW9mICh0aGVuID0gaXQudGhlbikgPT0gJ2Z1bmN0aW9uJyA/IHRoZW4gOiBmYWxzZTtcbn07XG52YXIgbm90aWZ5ID0gZnVuY3Rpb24ocmVjb3JkLCBpc1JlamVjdCl7XG4gIGlmKHJlY29yZC5uKXJldHVybjtcbiAgcmVjb3JkLm4gPSB0cnVlO1xuICB2YXIgY2hhaW4gPSByZWNvcmQuYztcbiAgYXNhcChmdW5jdGlvbigpe1xuICAgIHZhciB2YWx1ZSA9IHJlY29yZC52XG4gICAgICAsIG9rICAgID0gcmVjb3JkLnMgPT0gMVxuICAgICAgLCBpICAgICA9IDA7XG4gICAgdmFyIHJ1biA9IGZ1bmN0aW9uKHJlYWN0KXtcbiAgICAgIHZhciBjYiA9IG9rID8gcmVhY3Qub2sgOiByZWFjdC5mYWlsXG4gICAgICAgICwgcmV0LCB0aGVuO1xuICAgICAgdHJ5IHtcbiAgICAgICAgaWYoY2Ipe1xuICAgICAgICAgIGlmKCFvaylyZWNvcmQuaCA9IHRydWU7XG4gICAgICAgICAgcmV0ID0gY2IgPT09IHRydWUgPyB2YWx1ZSA6IGNiKHZhbHVlKTtcbiAgICAgICAgICBpZihyZXQgPT09IHJlYWN0LlApe1xuICAgICAgICAgICAgcmVhY3QucmVqKFR5cGVFcnJvcignUHJvbWlzZS1jaGFpbiBjeWNsZScpKTtcbiAgICAgICAgICB9IGVsc2UgaWYodGhlbiA9IGlzVGhlbmFibGUocmV0KSl7XG4gICAgICAgICAgICB0aGVuLmNhbGwocmV0LCByZWFjdC5yZXMsIHJlYWN0LnJlaik7XG4gICAgICAgICAgfSBlbHNlIHJlYWN0LnJlcyhyZXQpO1xuICAgICAgICB9IGVsc2UgcmVhY3QucmVqKHZhbHVlKTtcbiAgICAgIH0gY2F0Y2goZXJyKXtcbiAgICAgICAgcmVhY3QucmVqKGVycik7XG4gICAgICB9XG4gICAgfTtcbiAgICB3aGlsZShjaGFpbi5sZW5ndGggPiBpKXJ1bihjaGFpbltpKytdKTsgLy8gdmFyaWFibGUgbGVuZ3RoIC0gY2FuJ3QgdXNlIGZvckVhY2hcbiAgICBjaGFpbi5sZW5ndGggPSAwO1xuICAgIHJlY29yZC5uID0gZmFsc2U7XG4gICAgaWYoaXNSZWplY3Qpc2V0VGltZW91dChmdW5jdGlvbigpe1xuICAgICAgYXNhcChmdW5jdGlvbigpe1xuICAgICAgICBpZihpc1VuaGFuZGxlZChyZWNvcmQucCkpe1xuICAgICAgICAgIGlmKGlzTm9kZSl7XG4gICAgICAgICAgICBwcm9jZXNzLmVtaXQoJ3VuaGFuZGxlZFJlamVjdGlvbicsIHZhbHVlLCByZWNvcmQucCk7XG4gICAgICAgICAgfSBlbHNlIGlmKGdsb2JhbC5jb25zb2xlICYmIGNvbnNvbGUuZXJyb3Ipe1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcignVW5oYW5kbGVkIHByb21pc2UgcmVqZWN0aW9uJywgdmFsdWUpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZWNvcmQuYSA9IHVuZGVmaW5lZDtcbiAgICAgIH0pO1xuICAgIH0sIDEpO1xuICB9KTtcbn07XG52YXIgaXNVbmhhbmRsZWQgPSBmdW5jdGlvbihwcm9taXNlKXtcbiAgdmFyIHJlY29yZCA9IHByb21pc2VbUkVDT1JEXVxuICAgICwgY2hhaW4gID0gcmVjb3JkLmEgfHwgcmVjb3JkLmNcbiAgICAsIGkgICAgICA9IDBcbiAgICAsIHJlYWN0O1xuICBpZihyZWNvcmQuaClyZXR1cm4gZmFsc2U7XG4gIHdoaWxlKGNoYWluLmxlbmd0aCA+IGkpe1xuICAgIHJlYWN0ID0gY2hhaW5baSsrXTtcbiAgICBpZihyZWFjdC5mYWlsIHx8ICFpc1VuaGFuZGxlZChyZWFjdC5QKSlyZXR1cm4gZmFsc2U7XG4gIH0gcmV0dXJuIHRydWU7XG59O1xudmFyICRyZWplY3QgPSBmdW5jdGlvbih2YWx1ZSl7XG4gIHZhciByZWNvcmQgPSB0aGlzO1xuICBpZihyZWNvcmQuZClyZXR1cm47XG4gIHJlY29yZC5kID0gdHJ1ZTtcbiAgcmVjb3JkID0gcmVjb3JkLnIgfHwgcmVjb3JkOyAvLyB1bndyYXBcbiAgcmVjb3JkLnYgPSB2YWx1ZTtcbiAgcmVjb3JkLnMgPSAyO1xuICByZWNvcmQuYSA9IHJlY29yZC5jLnNsaWNlKCk7XG4gIG5vdGlmeShyZWNvcmQsIHRydWUpO1xufTtcbnZhciAkcmVzb2x2ZSA9IGZ1bmN0aW9uKHZhbHVlKXtcbiAgdmFyIHJlY29yZCA9IHRoaXNcbiAgICAsIHRoZW47XG4gIGlmKHJlY29yZC5kKXJldHVybjtcbiAgcmVjb3JkLmQgPSB0cnVlO1xuICByZWNvcmQgPSByZWNvcmQuciB8fCByZWNvcmQ7IC8vIHVud3JhcFxuICB0cnkge1xuICAgIGlmKHRoZW4gPSBpc1RoZW5hYmxlKHZhbHVlKSl7XG4gICAgICBhc2FwKGZ1bmN0aW9uKCl7XG4gICAgICAgIHZhciB3cmFwcGVyID0ge3I6IHJlY29yZCwgZDogZmFsc2V9OyAvLyB3cmFwXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgdGhlbi5jYWxsKHZhbHVlLCBjdHgoJHJlc29sdmUsIHdyYXBwZXIsIDEpLCBjdHgoJHJlamVjdCwgd3JhcHBlciwgMSkpO1xuICAgICAgICB9IGNhdGNoKGUpe1xuICAgICAgICAgICRyZWplY3QuY2FsbCh3cmFwcGVyLCBlKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJlY29yZC52ID0gdmFsdWU7XG4gICAgICByZWNvcmQucyA9IDE7XG4gICAgICBub3RpZnkocmVjb3JkLCBmYWxzZSk7XG4gICAgfVxuICB9IGNhdGNoKGUpe1xuICAgICRyZWplY3QuY2FsbCh7cjogcmVjb3JkLCBkOiBmYWxzZX0sIGUpOyAvLyB3cmFwXG4gIH1cbn07XG5cbi8vIGNvbnN0cnVjdG9yIHBvbHlmaWxsXG5pZighdXNlTmF0aXZlKXtcbiAgLy8gMjUuNC4zLjEgUHJvbWlzZShleGVjdXRvcilcbiAgUCA9IGZ1bmN0aW9uIFByb21pc2UoZXhlY3V0b3Ipe1xuICAgIGFGdW5jdGlvbihleGVjdXRvcik7XG4gICAgdmFyIHJlY29yZCA9IHtcbiAgICAgIHA6IHN0cmljdE5ldyh0aGlzLCBQLCBQUk9NSVNFKSwgICAgICAgICAvLyA8LSBwcm9taXNlXG4gICAgICBjOiBbXSwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gPC0gYXdhaXRpbmcgcmVhY3Rpb25zXG4gICAgICBhOiB1bmRlZmluZWQsICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gPC0gY2hlY2tlZCBpbiBpc1VuaGFuZGxlZCByZWFjdGlvbnNcbiAgICAgIHM6IDAsICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyA8LSBzdGF0ZVxuICAgICAgZDogZmFsc2UsICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIDwtIGRvbmVcbiAgICAgIHY6IHVuZGVmaW5lZCwgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyA8LSB2YWx1ZVxuICAgICAgaDogZmFsc2UsICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIDwtIGhhbmRsZWQgcmVqZWN0aW9uXG4gICAgICBuOiBmYWxzZSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gPC0gbm90aWZ5XG4gICAgfTtcbiAgICB0aGlzW1JFQ09SRF0gPSByZWNvcmQ7XG4gICAgdHJ5IHtcbiAgICAgIGV4ZWN1dG9yKGN0eCgkcmVzb2x2ZSwgcmVjb3JkLCAxKSwgY3R4KCRyZWplY3QsIHJlY29yZCwgMSkpO1xuICAgIH0gY2F0Y2goZXJyKXtcbiAgICAgICRyZWplY3QuY2FsbChyZWNvcmQsIGVycik7XG4gICAgfVxuICB9O1xuICByZXF1aXJlKCcuLyQubWl4JykoUC5wcm90b3R5cGUsIHtcbiAgICAvLyAyNS40LjUuMyBQcm9taXNlLnByb3RvdHlwZS50aGVuKG9uRnVsZmlsbGVkLCBvblJlamVjdGVkKVxuICAgIHRoZW46IGZ1bmN0aW9uIHRoZW4ob25GdWxmaWxsZWQsIG9uUmVqZWN0ZWQpe1xuICAgICAgdmFyIFMgPSBhbk9iamVjdChhbk9iamVjdCh0aGlzKS5jb25zdHJ1Y3RvcilbU1BFQ0lFU107XG4gICAgICB2YXIgcmVhY3QgPSB7XG4gICAgICAgIG9rOiAgIHR5cGVvZiBvbkZ1bGZpbGxlZCA9PSAnZnVuY3Rpb24nID8gb25GdWxmaWxsZWQgOiB0cnVlLFxuICAgICAgICBmYWlsOiB0eXBlb2Ygb25SZWplY3RlZCA9PSAnZnVuY3Rpb24nICA/IG9uUmVqZWN0ZWQgIDogZmFsc2VcbiAgICAgIH07XG4gICAgICB2YXIgcHJvbWlzZSA9IHJlYWN0LlAgPSBuZXcgKFMgIT0gdW5kZWZpbmVkID8gUyA6IFApKGZ1bmN0aW9uKHJlcywgcmVqKXtcbiAgICAgICAgcmVhY3QucmVzID0gYUZ1bmN0aW9uKHJlcyk7XG4gICAgICAgIHJlYWN0LnJlaiA9IGFGdW5jdGlvbihyZWopO1xuICAgICAgfSk7XG4gICAgICB2YXIgcmVjb3JkID0gdGhpc1tSRUNPUkRdO1xuICAgICAgcmVjb3JkLmMucHVzaChyZWFjdCk7XG4gICAgICBpZihyZWNvcmQuYSlyZWNvcmQuYS5wdXNoKHJlYWN0KTtcbiAgICAgIGlmKHJlY29yZC5zKW5vdGlmeShyZWNvcmQsIGZhbHNlKTtcbiAgICAgIHJldHVybiBwcm9taXNlO1xuICAgIH0sXG4gICAgLy8gMjUuNC41LjEgUHJvbWlzZS5wcm90b3R5cGUuY2F0Y2gob25SZWplY3RlZClcbiAgICAnY2F0Y2gnOiBmdW5jdGlvbihvblJlamVjdGVkKXtcbiAgICAgIHJldHVybiB0aGlzLnRoZW4odW5kZWZpbmVkLCBvblJlamVjdGVkKTtcbiAgICB9XG4gIH0pO1xufVxuXG4vLyBleHBvcnRcbiRkZWYoJGRlZi5HICsgJGRlZi5XICsgJGRlZi5GICogIXVzZU5hdGl2ZSwge1Byb21pc2U6IFB9KTtcbnJlcXVpcmUoJy4vJC50YWcnKShQLCBQUk9NSVNFKTtcbnNwZWNpZXMoUCk7XG5zcGVjaWVzKFdyYXBwZXIgPSByZXF1aXJlKCcuLyQuY29yZScpW1BST01JU0VdKTtcblxuLy8gc3RhdGljc1xuJGRlZigkZGVmLlMgKyAkZGVmLkYgKiAhdXNlTmF0aXZlLCBQUk9NSVNFLCB7XG4gIC8vIDI1LjQuNC41IFByb21pc2UucmVqZWN0KHIpXG4gIHJlamVjdDogZnVuY3Rpb24gcmVqZWN0KHIpe1xuICAgIHJldHVybiBuZXcgdGhpcyhmdW5jdGlvbihyZXMsIHJlail7IHJlaihyKTsgfSk7XG4gIH1cbn0pO1xuJGRlZigkZGVmLlMgKyAkZGVmLkYgKiAoIXVzZU5hdGl2ZSB8fCB0ZXN0UmVzb2x2ZSh0cnVlKSksIFBST01JU0UsIHtcbiAgLy8gMjUuNC40LjYgUHJvbWlzZS5yZXNvbHZlKHgpXG4gIHJlc29sdmU6IGZ1bmN0aW9uIHJlc29sdmUoeCl7XG4gICAgcmV0dXJuIGlzUHJvbWlzZSh4KSAmJiBzYW1lQ29uc3RydWN0b3IoeC5jb25zdHJ1Y3RvciwgdGhpcylcbiAgICAgID8geCA6IG5ldyB0aGlzKGZ1bmN0aW9uKHJlcyl7IHJlcyh4KTsgfSk7XG4gIH1cbn0pO1xuJGRlZigkZGVmLlMgKyAkZGVmLkYgKiAhKHVzZU5hdGl2ZSAmJiByZXF1aXJlKCcuLyQuaXRlci1kZXRlY3QnKShmdW5jdGlvbihpdGVyKXtcbiAgUC5hbGwoaXRlcilbJ2NhdGNoJ10oZnVuY3Rpb24oKXt9KTtcbn0pKSwgUFJPTUlTRSwge1xuICAvLyAyNS40LjQuMSBQcm9taXNlLmFsbChpdGVyYWJsZSlcbiAgYWxsOiBmdW5jdGlvbiBhbGwoaXRlcmFibGUpe1xuICAgIHZhciBDICAgICAgPSBnZXRDb25zdHJ1Y3Rvcih0aGlzKVxuICAgICAgLCB2YWx1ZXMgPSBbXTtcbiAgICByZXR1cm4gbmV3IEMoZnVuY3Rpb24ocmVzLCByZWope1xuICAgICAgZm9yT2YoaXRlcmFibGUsIGZhbHNlLCB2YWx1ZXMucHVzaCwgdmFsdWVzKTtcbiAgICAgIHZhciByZW1haW5pbmcgPSB2YWx1ZXMubGVuZ3RoXG4gICAgICAgICwgcmVzdWx0cyAgID0gQXJyYXkocmVtYWluaW5nKTtcbiAgICAgIGlmKHJlbWFpbmluZykkLmVhY2guY2FsbCh2YWx1ZXMsIGZ1bmN0aW9uKHByb21pc2UsIGluZGV4KXtcbiAgICAgICAgQy5yZXNvbHZlKHByb21pc2UpLnRoZW4oZnVuY3Rpb24odmFsdWUpe1xuICAgICAgICAgIHJlc3VsdHNbaW5kZXhdID0gdmFsdWU7XG4gICAgICAgICAgLS1yZW1haW5pbmcgfHwgcmVzKHJlc3VsdHMpO1xuICAgICAgICB9LCByZWopO1xuICAgICAgfSk7XG4gICAgICBlbHNlIHJlcyhyZXN1bHRzKTtcbiAgICB9KTtcbiAgfSxcbiAgLy8gMjUuNC40LjQgUHJvbWlzZS5yYWNlKGl0ZXJhYmxlKVxuICByYWNlOiBmdW5jdGlvbiByYWNlKGl0ZXJhYmxlKXtcbiAgICB2YXIgQyA9IGdldENvbnN0cnVjdG9yKHRoaXMpO1xuICAgIHJldHVybiBuZXcgQyhmdW5jdGlvbihyZXMsIHJlail7XG4gICAgICBmb3JPZihpdGVyYWJsZSwgZmFsc2UsIGZ1bmN0aW9uKHByb21pc2Upe1xuICAgICAgICBDLnJlc29sdmUocHJvbWlzZSkudGhlbihyZXMsIHJlaik7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxufSk7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuLi9+L2JhYmVsLXJ1bnRpbWUvfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczYucHJvbWlzZS5qc1xuICoqIG1vZHVsZSBpZCA9IDM0XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIvLyBvcHRpb25hbCAvIHNpbXBsZSBjb250ZXh0IGJpbmRpbmdcbnZhciBhRnVuY3Rpb24gPSByZXF1aXJlKCcuLyQuYS1mdW5jdGlvbicpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihmbiwgdGhhdCwgbGVuZ3RoKXtcbiAgYUZ1bmN0aW9uKGZuKTtcbiAgaWYodGhhdCA9PT0gdW5kZWZpbmVkKXJldHVybiBmbjtcbiAgc3dpdGNoKGxlbmd0aCl7XG4gICAgY2FzZSAxOiByZXR1cm4gZnVuY3Rpb24oYSl7XG4gICAgICByZXR1cm4gZm4uY2FsbCh0aGF0LCBhKTtcbiAgICB9O1xuICAgIGNhc2UgMjogcmV0dXJuIGZ1bmN0aW9uKGEsIGIpe1xuICAgICAgcmV0dXJuIGZuLmNhbGwodGhhdCwgYSwgYik7XG4gICAgfTtcbiAgICBjYXNlIDM6IHJldHVybiBmdW5jdGlvbihhLCBiLCBjKXtcbiAgICAgIHJldHVybiBmbi5jYWxsKHRoYXQsIGEsIGIsIGMpO1xuICAgIH07XG4gIH0gcmV0dXJuIGZ1bmN0aW9uKC8qIC4uLmFyZ3MgKi8pe1xuICAgICAgcmV0dXJuIGZuLmFwcGx5KHRoYXQsIGFyZ3VtZW50cyk7XG4gICAgfTtcbn07XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuLi9+L2JhYmVsLXJ1bnRpbWUvfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy8kLmN0eC5qc1xuICoqIG1vZHVsZSBpZCA9IDM1XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0KXtcbiAgaWYodHlwZW9mIGl0ICE9ICdmdW5jdGlvbicpdGhyb3cgVHlwZUVycm9yKGl0ICsgJyBpcyBub3QgYSBmdW5jdGlvbiEnKTtcbiAgcmV0dXJuIGl0O1xufTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4uL34vYmFiZWwtcnVudGltZS9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzLyQuYS1mdW5jdGlvbi5qc1xuICoqIG1vZHVsZSBpZCA9IDM2XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIvLyBnZXR0aW5nIHRhZyBmcm9tIDE5LjEuMy42IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcoKVxudmFyIGNvZiA9IHJlcXVpcmUoJy4vJC5jb2YnKVxuICAsIFRBRyA9IHJlcXVpcmUoJy4vJC53a3MnKSgndG9TdHJpbmdUYWcnKVxuICAvLyBFUzMgd3JvbmcgaGVyZVxuICAsIEFSRyA9IGNvZihmdW5jdGlvbigpeyByZXR1cm4gYXJndW1lbnRzOyB9KCkpID09ICdBcmd1bWVudHMnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0KXtcbiAgdmFyIE8sIFQsIEI7XG4gIHJldHVybiBpdCA9PT0gdW5kZWZpbmVkID8gJ1VuZGVmaW5lZCcgOiBpdCA9PT0gbnVsbCA/ICdOdWxsJ1xuICAgIC8vIEBAdG9TdHJpbmdUYWcgY2FzZVxuICAgIDogdHlwZW9mIChUID0gKE8gPSBPYmplY3QoaXQpKVtUQUddKSA9PSAnc3RyaW5nJyA/IFRcbiAgICAvLyBidWlsdGluVGFnIGNhc2VcbiAgICA6IEFSRyA/IGNvZihPKVxuICAgIC8vIEVTMyBhcmd1bWVudHMgZmFsbGJhY2tcbiAgICA6IChCID0gY29mKE8pKSA9PSAnT2JqZWN0JyAmJiB0eXBlb2YgTy5jYWxsZWUgPT0gJ2Z1bmN0aW9uJyA/ICdBcmd1bWVudHMnIDogQjtcbn07XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuLi9+L2JhYmVsLXJ1bnRpbWUvfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy8kLmNsYXNzb2YuanNcbiAqKiBtb2R1bGUgaWQgPSAzN1xuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiLy8gaHR0cDovL2pzcGVyZi5jb20vY29yZS1qcy1pc29iamVjdFxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCl7XG4gIHJldHVybiBpdCAhPT0gbnVsbCAmJiAodHlwZW9mIGl0ID09ICdvYmplY3QnIHx8IHR5cGVvZiBpdCA9PSAnZnVuY3Rpb24nKTtcbn07XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuLi9+L2JhYmVsLXJ1bnRpbWUvfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy8kLmlzLW9iamVjdC5qc1xuICoqIG1vZHVsZSBpZCA9IDM4XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJ2YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuLyQuaXMtb2JqZWN0Jyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0KXtcbiAgaWYoIWlzT2JqZWN0KGl0KSl0aHJvdyBUeXBlRXJyb3IoaXQgKyAnIGlzIG5vdCBhbiBvYmplY3QhJyk7XG4gIHJldHVybiBpdDtcbn07XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuLi9+L2JhYmVsLXJ1bnRpbWUvfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy8kLmFuLW9iamVjdC5qc1xuICoqIG1vZHVsZSBpZCA9IDM5XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0LCBDb25zdHJ1Y3RvciwgbmFtZSl7XG4gIGlmKCEoaXQgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpdGhyb3cgVHlwZUVycm9yKG5hbWUgKyBcIjogdXNlIHRoZSAnbmV3JyBvcGVyYXRvciFcIik7XG4gIHJldHVybiBpdDtcbn07XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuLi9+L2JhYmVsLXJ1bnRpbWUvfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy8kLnN0cmljdC1uZXcuanNcbiAqKiBtb2R1bGUgaWQgPSA0MFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwidmFyIGN0eCAgICAgICAgID0gcmVxdWlyZSgnLi8kLmN0eCcpXG4gICwgY2FsbCAgICAgICAgPSByZXF1aXJlKCcuLyQuaXRlci1jYWxsJylcbiAgLCBpc0FycmF5SXRlciA9IHJlcXVpcmUoJy4vJC5pcy1hcnJheS1pdGVyJylcbiAgLCBhbk9iamVjdCAgICA9IHJlcXVpcmUoJy4vJC5hbi1vYmplY3QnKVxuICAsIHRvTGVuZ3RoICAgID0gcmVxdWlyZSgnLi8kLnRvLWxlbmd0aCcpXG4gICwgZ2V0SXRlckZuICAgPSByZXF1aXJlKCcuL2NvcmUuZ2V0LWl0ZXJhdG9yLW1ldGhvZCcpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdGVyYWJsZSwgZW50cmllcywgZm4sIHRoYXQpe1xuICB2YXIgaXRlckZuID0gZ2V0SXRlckZuKGl0ZXJhYmxlKVxuICAgICwgZiAgICAgID0gY3R4KGZuLCB0aGF0LCBlbnRyaWVzID8gMiA6IDEpXG4gICAgLCBpbmRleCAgPSAwXG4gICAgLCBsZW5ndGgsIHN0ZXAsIGl0ZXJhdG9yO1xuICBpZih0eXBlb2YgaXRlckZuICE9ICdmdW5jdGlvbicpdGhyb3cgVHlwZUVycm9yKGl0ZXJhYmxlICsgJyBpcyBub3QgaXRlcmFibGUhJyk7XG4gIC8vIGZhc3QgY2FzZSBmb3IgYXJyYXlzIHdpdGggZGVmYXVsdCBpdGVyYXRvclxuICBpZihpc0FycmF5SXRlcihpdGVyRm4pKWZvcihsZW5ndGggPSB0b0xlbmd0aChpdGVyYWJsZS5sZW5ndGgpOyBsZW5ndGggPiBpbmRleDsgaW5kZXgrKyl7XG4gICAgZW50cmllcyA/IGYoYW5PYmplY3Qoc3RlcCA9IGl0ZXJhYmxlW2luZGV4XSlbMF0sIHN0ZXBbMV0pIDogZihpdGVyYWJsZVtpbmRleF0pO1xuICB9IGVsc2UgZm9yKGl0ZXJhdG9yID0gaXRlckZuLmNhbGwoaXRlcmFibGUpOyAhKHN0ZXAgPSBpdGVyYXRvci5uZXh0KCkpLmRvbmU7ICl7XG4gICAgY2FsbChpdGVyYXRvciwgZiwgc3RlcC52YWx1ZSwgZW50cmllcyk7XG4gIH1cbn07XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuLi9+L2JhYmVsLXJ1bnRpbWUvfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy8kLmZvci1vZi5qc1xuICoqIG1vZHVsZSBpZCA9IDQxXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIvLyBjYWxsIHNvbWV0aGluZyBvbiBpdGVyYXRvciBzdGVwIHdpdGggc2FmZSBjbG9zaW5nIG9uIGVycm9yXG52YXIgYW5PYmplY3QgPSByZXF1aXJlKCcuLyQuYW4tb2JqZWN0Jyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0ZXJhdG9yLCBmbiwgdmFsdWUsIGVudHJpZXMpe1xuICB0cnkge1xuICAgIHJldHVybiBlbnRyaWVzID8gZm4oYW5PYmplY3QodmFsdWUpWzBdLCB2YWx1ZVsxXSkgOiBmbih2YWx1ZSk7XG4gIC8vIDcuNC42IEl0ZXJhdG9yQ2xvc2UoaXRlcmF0b3IsIGNvbXBsZXRpb24pXG4gIH0gY2F0Y2goZSl7XG4gICAgdmFyIHJldCA9IGl0ZXJhdG9yWydyZXR1cm4nXTtcbiAgICBpZihyZXQgIT09IHVuZGVmaW5lZClhbk9iamVjdChyZXQuY2FsbChpdGVyYXRvcikpO1xuICAgIHRocm93IGU7XG4gIH1cbn07XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuLi9+L2JhYmVsLXJ1bnRpbWUvfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy8kLml0ZXItY2FsbC5qc1xuICoqIG1vZHVsZSBpZCA9IDQyXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIvLyBjaGVjayBvbiBkZWZhdWx0IEFycmF5IGl0ZXJhdG9yXG52YXIgSXRlcmF0b3JzID0gcmVxdWlyZSgnLi8kLml0ZXJhdG9ycycpXG4gICwgSVRFUkFUT1IgID0gcmVxdWlyZSgnLi8kLndrcycpKCdpdGVyYXRvcicpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCl7XG4gIHJldHVybiAoSXRlcmF0b3JzLkFycmF5IHx8IEFycmF5LnByb3RvdHlwZVtJVEVSQVRPUl0pID09PSBpdDtcbn07XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuLi9+L2JhYmVsLXJ1bnRpbWUvfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy8kLmlzLWFycmF5LWl0ZXIuanNcbiAqKiBtb2R1bGUgaWQgPSA0M1xuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiLy8gNy4xLjE1IFRvTGVuZ3RoXG52YXIgdG9JbnRlZ2VyID0gcmVxdWlyZSgnLi8kLnRvLWludGVnZXInKVxuICAsIG1pbiAgICAgICA9IE1hdGgubWluO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCl7XG4gIHJldHVybiBpdCA+IDAgPyBtaW4odG9JbnRlZ2VyKGl0KSwgMHgxZmZmZmZmZmZmZmZmZikgOiAwOyAvLyBwb3coMiwgNTMpIC0gMSA9PSA5MDA3MTk5MjU0NzQwOTkxXG59O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi4vfi9iYWJlbC1ydW50aW1lL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvJC50by1sZW5ndGguanNcbiAqKiBtb2R1bGUgaWQgPSA0NFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwidmFyIGNsYXNzb2YgICA9IHJlcXVpcmUoJy4vJC5jbGFzc29mJylcbiAgLCBJVEVSQVRPUiAgPSByZXF1aXJlKCcuLyQud2tzJykoJ2l0ZXJhdG9yJylcbiAgLCBJdGVyYXRvcnMgPSByZXF1aXJlKCcuLyQuaXRlcmF0b3JzJyk7XG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vJC5jb3JlJykuZ2V0SXRlcmF0b3JNZXRob2QgPSBmdW5jdGlvbihpdCl7XG4gIGlmKGl0ICE9IHVuZGVmaW5lZClyZXR1cm4gaXRbSVRFUkFUT1JdIHx8IGl0WydAQGl0ZXJhdG9yJ10gfHwgSXRlcmF0b3JzW2NsYXNzb2YoaXQpXTtcbn07XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuLi9+L2JhYmVsLXJ1bnRpbWUvfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9jb3JlLmdldC1pdGVyYXRvci1tZXRob2QuanNcbiAqKiBtb2R1bGUgaWQgPSA0NVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiLy8gV29ya3Mgd2l0aCBfX3Byb3RvX18gb25seS4gT2xkIHY4IGNhbid0IHdvcmsgd2l0aCBudWxsIHByb3RvIG9iamVjdHMuXG4vKiBlc2xpbnQtZGlzYWJsZSBuby1wcm90byAqL1xudmFyIGdldERlc2MgID0gcmVxdWlyZSgnLi8kJykuZ2V0RGVzY1xuICAsIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi8kLmlzLW9iamVjdCcpXG4gICwgYW5PYmplY3QgPSByZXF1aXJlKCcuLyQuYW4tb2JqZWN0Jyk7XG52YXIgY2hlY2sgPSBmdW5jdGlvbihPLCBwcm90byl7XG4gIGFuT2JqZWN0KE8pO1xuICBpZighaXNPYmplY3QocHJvdG8pICYmIHByb3RvICE9PSBudWxsKXRocm93IFR5cGVFcnJvcihwcm90byArIFwiOiBjYW4ndCBzZXQgYXMgcHJvdG90eXBlIVwiKTtcbn07XG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgc2V0OiBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHwgKCdfX3Byb3RvX18nIGluIHt9IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcbiAgICA/IGZ1bmN0aW9uKGJ1Z2d5LCBzZXQpe1xuICAgICAgICB0cnkge1xuICAgICAgICAgIHNldCA9IHJlcXVpcmUoJy4vJC5jdHgnKShGdW5jdGlvbi5jYWxsLCBnZXREZXNjKE9iamVjdC5wcm90b3R5cGUsICdfX3Byb3RvX18nKS5zZXQsIDIpO1xuICAgICAgICAgIHNldCh7fSwgW10pO1xuICAgICAgICB9IGNhdGNoKGUpeyBidWdneSA9IHRydWU7IH1cbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIHNldFByb3RvdHlwZU9mKE8sIHByb3RvKXtcbiAgICAgICAgICBjaGVjayhPLCBwcm90byk7XG4gICAgICAgICAgaWYoYnVnZ3kpTy5fX3Byb3RvX18gPSBwcm90bztcbiAgICAgICAgICBlbHNlIHNldChPLCBwcm90byk7XG4gICAgICAgICAgcmV0dXJuIE87XG4gICAgICAgIH07XG4gICAgICB9KClcbiAgICA6IHVuZGVmaW5lZCksXG4gIGNoZWNrOiBjaGVja1xufTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4uL34vYmFiZWwtcnVudGltZS9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzLyQuc2V0LXByb3RvLmpzXG4gKiogbW9kdWxlIGlkID0gNDZcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gT2JqZWN0LmlzIHx8IGZ1bmN0aW9uIGlzKHgsIHkpe1xuICByZXR1cm4geCA9PT0geSA/IHggIT09IDAgfHwgMSAvIHggPT09IDEgLyB5IDogeCAhPSB4ICYmIHkgIT0geTtcbn07XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuLi9+L2JhYmVsLXJ1bnRpbWUvfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy8kLnNhbWUuanNcbiAqKiBtb2R1bGUgaWQgPSA0N1xuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xudmFyICQgICAgICAgPSByZXF1aXJlKCcuLyQnKVxuICAsIFNQRUNJRVMgPSByZXF1aXJlKCcuLyQud2tzJykoJ3NwZWNpZXMnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oQyl7XG4gIGlmKHJlcXVpcmUoJy4vJC5zdXBwb3J0LWRlc2MnKSAmJiAhKFNQRUNJRVMgaW4gQykpJC5zZXREZXNjKEMsIFNQRUNJRVMsIHtcbiAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgZ2V0OiBmdW5jdGlvbigpeyByZXR1cm4gdGhpczsgfVxuICB9KTtcbn07XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuLi9+L2JhYmVsLXJ1bnRpbWUvfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy8kLnNwZWNpZXMuanNcbiAqKiBtb2R1bGUgaWQgPSA0OFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwidmFyIGdsb2JhbCAgICA9IHJlcXVpcmUoJy4vJC5nbG9iYWwnKVxyXG4gICwgbWFjcm90YXNrID0gcmVxdWlyZSgnLi8kLnRhc2snKS5zZXRcclxuICAsIE9ic2VydmVyICA9IGdsb2JhbC5NdXRhdGlvbk9ic2VydmVyIHx8IGdsb2JhbC5XZWJLaXRNdXRhdGlvbk9ic2VydmVyXHJcbiAgLCBwcm9jZXNzICAgPSBnbG9iYWwucHJvY2Vzc1xyXG4gICwgaGVhZCwgbGFzdCwgbm90aWZ5O1xyXG5cclxuZnVuY3Rpb24gZmx1c2goKXtcclxuICB3aGlsZShoZWFkKXtcclxuICAgIGhlYWQuZm4uY2FsbCgpOyAvLyA8LSBjdXJyZW50bHkgd2UgdXNlIGl0IG9ubHkgZm9yIFByb21pc2UgLSB0cnkgLyBjYXRjaCBub3QgcmVxdWlyZWRcclxuICAgIGhlYWQgPSBoZWFkLm5leHQ7XHJcbiAgfSBsYXN0ID0gdW5kZWZpbmVkO1xyXG59XHJcblxyXG4vLyBOb2RlLmpzXHJcbmlmKHJlcXVpcmUoJy4vJC5jb2YnKShwcm9jZXNzKSA9PSAncHJvY2Vzcycpe1xyXG4gIG5vdGlmeSA9IGZ1bmN0aW9uKCl7XHJcbiAgICBwcm9jZXNzLm5leHRUaWNrKGZsdXNoKTtcclxuICB9O1xyXG4vLyBicm93c2VycyB3aXRoIE11dGF0aW9uT2JzZXJ2ZXJcclxufSBlbHNlIGlmKE9ic2VydmVyKXtcclxuICB2YXIgdG9nZ2xlID0gMVxyXG4gICAgLCBub2RlICAgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSgnJyk7XHJcbiAgbmV3IE9ic2VydmVyKGZsdXNoKS5vYnNlcnZlKG5vZGUsIHtjaGFyYWN0ZXJEYXRhOiB0cnVlfSk7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tbmV3XHJcbiAgbm90aWZ5ID0gZnVuY3Rpb24oKXtcclxuICAgIG5vZGUuZGF0YSA9IHRvZ2dsZSA9IC10b2dnbGU7XHJcbiAgfTtcclxuLy8gZm9yIG90aGVyIGVudmlyb25tZW50cyAtIG1hY3JvdGFzayBiYXNlZCBvbjpcclxuLy8gLSBzZXRJbW1lZGlhdGVcclxuLy8gLSBNZXNzYWdlQ2hhbm5lbFxyXG4vLyAtIHdpbmRvdy5wb3N0TWVzc2FnXHJcbi8vIC0gb25yZWFkeXN0YXRlY2hhbmdlXHJcbi8vIC0gc2V0VGltZW91dFxyXG59IGVsc2Uge1xyXG4gIG5vdGlmeSA9IGZ1bmN0aW9uKCl7XHJcbiAgICAvLyBzdHJhbmdlIElFICsgd2VicGFjayBkZXYgc2VydmVyIGJ1ZyAtIHVzZSAuY2FsbChnbG9iYWwpXHJcbiAgICBtYWNyb3Rhc2suY2FsbChnbG9iYWwsIGZsdXNoKTtcclxuICB9O1xyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGFzYXAoZm4pe1xyXG4gIHZhciB0YXNrID0ge2ZuOiBmbiwgbmV4dDogdW5kZWZpbmVkfTtcclxuICBpZihsYXN0KWxhc3QubmV4dCA9IHRhc2s7XHJcbiAgaWYoIWhlYWQpe1xyXG4gICAgaGVhZCA9IHRhc2s7XHJcbiAgICBub3RpZnkoKTtcclxuICB9IGxhc3QgPSB0YXNrO1xyXG59O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi4vfi9iYWJlbC1ydW50aW1lL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvJC5taWNyb3Rhc2suanNcbiAqKiBtb2R1bGUgaWQgPSA0OVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xudmFyIGN0eCAgICAgICAgICAgICAgICA9IHJlcXVpcmUoJy4vJC5jdHgnKVxuICAsIGludm9rZSAgICAgICAgICAgICA9IHJlcXVpcmUoJy4vJC5pbnZva2UnKVxuICAsIGh0bWwgICAgICAgICAgICAgICA9IHJlcXVpcmUoJy4vJC5odG1sJylcbiAgLCBjZWwgICAgICAgICAgICAgICAgPSByZXF1aXJlKCcuLyQuZG9tLWNyZWF0ZScpXG4gICwgZ2xvYmFsICAgICAgICAgICAgID0gcmVxdWlyZSgnLi8kLmdsb2JhbCcpXG4gICwgcHJvY2VzcyAgICAgICAgICAgID0gZ2xvYmFsLnByb2Nlc3NcbiAgLCBzZXRUYXNrICAgICAgICAgICAgPSBnbG9iYWwuc2V0SW1tZWRpYXRlXG4gICwgY2xlYXJUYXNrICAgICAgICAgID0gZ2xvYmFsLmNsZWFySW1tZWRpYXRlXG4gICwgTWVzc2FnZUNoYW5uZWwgICAgID0gZ2xvYmFsLk1lc3NhZ2VDaGFubmVsXG4gICwgY291bnRlciAgICAgICAgICAgID0gMFxuICAsIHF1ZXVlICAgICAgICAgICAgICA9IHt9XG4gICwgT05SRUFEWVNUQVRFQ0hBTkdFID0gJ29ucmVhZHlzdGF0ZWNoYW5nZSdcbiAgLCBkZWZlciwgY2hhbm5lbCwgcG9ydDtcbnZhciBydW4gPSBmdW5jdGlvbigpe1xuICB2YXIgaWQgPSArdGhpcztcbiAgaWYocXVldWUuaGFzT3duUHJvcGVydHkoaWQpKXtcbiAgICB2YXIgZm4gPSBxdWV1ZVtpZF07XG4gICAgZGVsZXRlIHF1ZXVlW2lkXTtcbiAgICBmbigpO1xuICB9XG59O1xudmFyIGxpc3RuZXIgPSBmdW5jdGlvbihldmVudCl7XG4gIHJ1bi5jYWxsKGV2ZW50LmRhdGEpO1xufTtcbi8vIE5vZGUuanMgMC45KyAmIElFMTArIGhhcyBzZXRJbW1lZGlhdGUsIG90aGVyd2lzZTpcbmlmKCFzZXRUYXNrIHx8ICFjbGVhclRhc2spe1xuICBzZXRUYXNrID0gZnVuY3Rpb24gc2V0SW1tZWRpYXRlKGZuKXtcbiAgICB2YXIgYXJncyA9IFtdLCBpID0gMTtcbiAgICB3aGlsZShhcmd1bWVudHMubGVuZ3RoID4gaSlhcmdzLnB1c2goYXJndW1lbnRzW2krK10pO1xuICAgIHF1ZXVlWysrY291bnRlcl0gPSBmdW5jdGlvbigpe1xuICAgICAgaW52b2tlKHR5cGVvZiBmbiA9PSAnZnVuY3Rpb24nID8gZm4gOiBGdW5jdGlvbihmbiksIGFyZ3MpO1xuICAgIH07XG4gICAgZGVmZXIoY291bnRlcik7XG4gICAgcmV0dXJuIGNvdW50ZXI7XG4gIH07XG4gIGNsZWFyVGFzayA9IGZ1bmN0aW9uIGNsZWFySW1tZWRpYXRlKGlkKXtcbiAgICBkZWxldGUgcXVldWVbaWRdO1xuICB9O1xuICAvLyBOb2RlLmpzIDAuOC1cbiAgaWYocmVxdWlyZSgnLi8kLmNvZicpKHByb2Nlc3MpID09ICdwcm9jZXNzJyl7XG4gICAgZGVmZXIgPSBmdW5jdGlvbihpZCl7XG4gICAgICBwcm9jZXNzLm5leHRUaWNrKGN0eChydW4sIGlkLCAxKSk7XG4gICAgfTtcbiAgLy8gQnJvd3NlcnMgd2l0aCBNZXNzYWdlQ2hhbm5lbCwgaW5jbHVkZXMgV2ViV29ya2Vyc1xuICB9IGVsc2UgaWYoTWVzc2FnZUNoYW5uZWwpe1xuICAgIGNoYW5uZWwgPSBuZXcgTWVzc2FnZUNoYW5uZWw7XG4gICAgcG9ydCAgICA9IGNoYW5uZWwucG9ydDI7XG4gICAgY2hhbm5lbC5wb3J0MS5vbm1lc3NhZ2UgPSBsaXN0bmVyO1xuICAgIGRlZmVyID0gY3R4KHBvcnQucG9zdE1lc3NhZ2UsIHBvcnQsIDEpO1xuICAvLyBCcm93c2VycyB3aXRoIHBvc3RNZXNzYWdlLCBza2lwIFdlYldvcmtlcnNcbiAgLy8gSUU4IGhhcyBwb3N0TWVzc2FnZSwgYnV0IGl0J3Mgc3luYyAmIHR5cGVvZiBpdHMgcG9zdE1lc3NhZ2UgaXMgJ29iamVjdCdcbiAgfSBlbHNlIGlmKGdsb2JhbC5hZGRFdmVudExpc3RlbmVyICYmIHR5cGVvZiBwb3N0TWVzc2FnZSA9PSAnZnVuY3Rpb24nICYmICFnbG9iYWwuaW1wb3J0U2NyaXB0KXtcbiAgICBkZWZlciA9IGZ1bmN0aW9uKGlkKXtcbiAgICAgIGdsb2JhbC5wb3N0TWVzc2FnZShpZCArICcnLCAnKicpO1xuICAgIH07XG4gICAgZ2xvYmFsLmFkZEV2ZW50TGlzdGVuZXIoJ21lc3NhZ2UnLCBsaXN0bmVyLCBmYWxzZSk7XG4gIC8vIElFOC1cbiAgfSBlbHNlIGlmKE9OUkVBRFlTVEFURUNIQU5HRSBpbiBjZWwoJ3NjcmlwdCcpKXtcbiAgICBkZWZlciA9IGZ1bmN0aW9uKGlkKXtcbiAgICAgIGh0bWwuYXBwZW5kQ2hpbGQoY2VsKCdzY3JpcHQnKSlbT05SRUFEWVNUQVRFQ0hBTkdFXSA9IGZ1bmN0aW9uKCl7XG4gICAgICAgIGh0bWwucmVtb3ZlQ2hpbGQodGhpcyk7XG4gICAgICAgIHJ1bi5jYWxsKGlkKTtcbiAgICAgIH07XG4gICAgfTtcbiAgLy8gUmVzdCBvbGQgYnJvd3NlcnNcbiAgfSBlbHNlIHtcbiAgICBkZWZlciA9IGZ1bmN0aW9uKGlkKXtcbiAgICAgIHNldFRpbWVvdXQoY3R4KHJ1biwgaWQsIDEpLCAwKTtcbiAgICB9O1xuICB9XG59XG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgc2V0OiAgIHNldFRhc2ssXG4gIGNsZWFyOiBjbGVhclRhc2tcbn07XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuLi9+L2JhYmVsLXJ1bnRpbWUvfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy8kLnRhc2suanNcbiAqKiBtb2R1bGUgaWQgPSA1MFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiLy8gZmFzdCBhcHBseSwgaHR0cDovL2pzcGVyZi5sbmtpdC5jb20vZmFzdC1hcHBseS81XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGZuLCBhcmdzLCB0aGF0KXtcbiAgdmFyIHVuID0gdGhhdCA9PT0gdW5kZWZpbmVkO1xuICBzd2l0Y2goYXJncy5sZW5ndGgpe1xuICAgIGNhc2UgMDogcmV0dXJuIHVuID8gZm4oKVxuICAgICAgICAgICAgICAgICAgICAgIDogZm4uY2FsbCh0aGF0KTtcbiAgICBjYXNlIDE6IHJldHVybiB1biA/IGZuKGFyZ3NbMF0pXG4gICAgICAgICAgICAgICAgICAgICAgOiBmbi5jYWxsKHRoYXQsIGFyZ3NbMF0pO1xuICAgIGNhc2UgMjogcmV0dXJuIHVuID8gZm4oYXJnc1swXSwgYXJnc1sxXSlcbiAgICAgICAgICAgICAgICAgICAgICA6IGZuLmNhbGwodGhhdCwgYXJnc1swXSwgYXJnc1sxXSk7XG4gICAgY2FzZSAzOiByZXR1cm4gdW4gPyBmbihhcmdzWzBdLCBhcmdzWzFdLCBhcmdzWzJdKVxuICAgICAgICAgICAgICAgICAgICAgIDogZm4uY2FsbCh0aGF0LCBhcmdzWzBdLCBhcmdzWzFdLCBhcmdzWzJdKTtcbiAgICBjYXNlIDQ6IHJldHVybiB1biA/IGZuKGFyZ3NbMF0sIGFyZ3NbMV0sIGFyZ3NbMl0sIGFyZ3NbM10pXG4gICAgICAgICAgICAgICAgICAgICAgOiBmbi5jYWxsKHRoYXQsIGFyZ3NbMF0sIGFyZ3NbMV0sIGFyZ3NbMl0sIGFyZ3NbM10pO1xuICB9IHJldHVybiAgICAgICAgICAgICAgZm4uYXBwbHkodGhhdCwgYXJncyk7XG59O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi4vfi9iYWJlbC1ydW50aW1lL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvJC5pbnZva2UuanNcbiAqKiBtb2R1bGUgaWQgPSA1MVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuLyQuZ2xvYmFsJykuZG9jdW1lbnQgJiYgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi4vfi9iYWJlbC1ydW50aW1lL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvJC5odG1sLmpzXG4gKiogbW9kdWxlIGlkID0gNTJcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsInZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4vJC5pcy1vYmplY3QnKVxuICAsIGRvY3VtZW50ID0gcmVxdWlyZSgnLi8kLmdsb2JhbCcpLmRvY3VtZW50XG4gIC8vIGluIG9sZCBJRSB0eXBlb2YgZG9jdW1lbnQuY3JlYXRlRWxlbWVudCBpcyAnb2JqZWN0J1xuICAsIGlzID0gaXNPYmplY3QoZG9jdW1lbnQpICYmIGlzT2JqZWN0KGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCl7XG4gIHJldHVybiBpcyA/IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoaXQpIDoge307XG59O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi4vfi9iYWJlbC1ydW50aW1lL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvJC5kb20tY3JlYXRlLmpzXG4gKiogbW9kdWxlIGlkID0gNTNcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsInZhciAkcmVkZWYgPSByZXF1aXJlKCcuLyQucmVkZWYnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24odGFyZ2V0LCBzcmMpe1xuICBmb3IodmFyIGtleSBpbiBzcmMpJHJlZGVmKHRhcmdldCwga2V5LCBzcmNba2V5XSk7XG4gIHJldHVybiB0YXJnZXQ7XG59O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi4vfi9iYWJlbC1ydW50aW1lL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvJC5taXguanNcbiAqKiBtb2R1bGUgaWQgPSA1NFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwidmFyIFNZTUJPTF9JVEVSQVRPUiA9IHJlcXVpcmUoJy4vJC53a3MnKSgnaXRlcmF0b3InKVxuICAsIFNBRkVfQ0xPU0lORyAgICA9IGZhbHNlO1xudHJ5IHtcbiAgdmFyIHJpdGVyID0gWzddW1NZTUJPTF9JVEVSQVRPUl0oKTtcbiAgcml0ZXJbJ3JldHVybiddID0gZnVuY3Rpb24oKXsgU0FGRV9DTE9TSU5HID0gdHJ1ZTsgfTtcbiAgQXJyYXkuZnJvbShyaXRlciwgZnVuY3Rpb24oKXsgdGhyb3cgMjsgfSk7XG59IGNhdGNoKGUpeyAvKiBlbXB0eSAqLyB9XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGV4ZWMpe1xuICBpZighU0FGRV9DTE9TSU5HKXJldHVybiBmYWxzZTtcbiAgdmFyIHNhZmUgPSBmYWxzZTtcbiAgdHJ5IHtcbiAgICB2YXIgYXJyICA9IFs3XVxuICAgICAgLCBpdGVyID0gYXJyW1NZTUJPTF9JVEVSQVRPUl0oKTtcbiAgICBpdGVyLm5leHQgPSBmdW5jdGlvbigpeyBzYWZlID0gdHJ1ZTsgfTtcbiAgICBhcnJbU1lNQk9MX0lURVJBVE9SXSA9IGZ1bmN0aW9uKCl7IHJldHVybiBpdGVyOyB9O1xuICAgIGV4ZWMoYXJyKTtcbiAgfSBjYXRjaChlKXsgLyogZW1wdHkgKi8gfVxuICByZXR1cm4gc2FmZTtcbn07XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuLi9+L2JhYmVsLXJ1bnRpbWUvfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy8kLml0ZXItZGV0ZWN0LmpzXG4gKiogbW9kdWxlIGlkID0gNTVcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIlwidXNlIHN0cmljdFwiO1xuXG5leHBvcnRzW1wiZGVmYXVsdFwiXSA9IGZ1bmN0aW9uIChvYmopIHtcbiAgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHtcbiAgICBcImRlZmF1bHRcIjogb2JqXG4gIH07XG59O1xuXG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi4vfi9iYWJlbC1ydW50aW1lL2hlbHBlcnMvaW50ZXJvcC1yZXF1aXJlLWRlZmF1bHQuanNcbiAqKiBtb2R1bGUgaWQgPSA1NlxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgeyBJbnRlcmZhY2UgfSBmcm9tICdkZW1vL3BsYXlsYW5nLmludGVyZmFjZS5qcyc7XG5pbXBvcnQgUnVudGltZSAgZnJvbSAnZGVtby9wbGF5bGFuZy5ydW50aW1lLmpzJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gUGxheWxhbmcoKSB7XG4gIHRoaXMuX3J1bnRpbWUgPSBuZXcgUnVudGltZSgpO1xuICB0aGlzLl9pbnRlcmZhY2UgPSBuZXcgSW50ZXJmYWNlKHRoaXMuX3J1bnRpbWUpO1xuICByZXR1cm4gdGhpcy5faW50ZXJmYWNlO1xufVxuXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3BsYXlsYW5nLmpzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgeyBSdW5lIH0gZnJvbSAnZGlzdC9ydW5lLmpzJztcblxuLyoqXG4gKiBBIGRlbW8gZURTTCB3aXRoIG1vc3QgZmVhdHVyZXMgYSBmdWxsIGxhbmd1YWdlIHNob3VsZCBiZSB3aXRoLlxuICogVGhpcyBmaWxlIGNvbnRhaW5zIG9ubHkgaW50ZXJmYWNlbiwgd2hpY2ggbWVhbnMgaXQgbmVlZCB0byBiZSBpbnN0YW50aWF0ZWRcbiAqIHdpdGggYSBydW50aW1lIHRvIGV4ZWN1dGUgdGhlIGxhbmd1YWdlLlxuICpcbiAqIE5vdGU6IHNpbmNlIHRvIGhhbmRsZSBhc3luYyBmdW5jdGlvbiBwcm9wZXJseSBuZWVkIGV4dHJhIGVmZm9ydHMsXG4gKiBzbyB0aGlzIGRlbW8gbGFuZ3VhZ2UgZG9lc24ndCBmdWxseSBoYW5kbGUgdGhlbSB5ZXQuIEFsdGhvdWdoIHRoaXMgZURTTFxuICogaW5kZWVkIHB1dCBhbGwgc3RlcHMgaW4gYSBQcm9taXNlIHRvIGJlIHRoZSBmaXJzdCBzdGVwIHRvd2FyZCB0aGF0LlxuICovXG5leHBvcnQgZnVuY3Rpb24gSW50ZXJmYWNlKHJ1bnRpbWUpIHtcbiAgdGhpcy5jb250ZXh0ID0ge1xuICAgIHN0YXJ0ZWQ6IGZhbHNlLFxuICAgIHN0b3BwZWQ6IGZhbHNlLFxuICAgIGxvb3Bpbmc6IGZhbHNlLFxuICAgIG1hdGNoaW5nOiBmYWxzZVxuICB9O1xuICB0aGlzLnN0YWNrID0gW107XG4gIHRoaXMuX3J1bnRpbWUgPSBydW50aW1lO1xuICB0aGlzLl9ldmFsdWF0b3IgPSAobmV3IFJ1bmUuRXZhbHVhdGUoKSlcbiAgICAuYW5hbHl6ZXIodGhpcy5fYW5hbHl6ZU9yZGVyLmJpbmQodGhpcykpXG4gICAgLmludGVycHJldGVyKHRoaXMuX2ludGVycHJldC5iaW5kKHRoaXMpKTtcbn1cblxuSW50ZXJmYWNlLnByb3RvdHlwZS5zdGFydCA9IFJ1bmUuZGVmaW5lKCdzdGFydCcsICdiZWdpbicpO1xuSW50ZXJmYWNlLnByb3RvdHlwZS5kb25lID0gUnVuZS5kZWZpbmUoJ2RvbmUnLCAnZXhpdCcpO1xuSW50ZXJmYWNlLnByb3RvdHlwZS5uZXh0ID0gUnVuZS5kZWZpbmUoJ25leHQnLCAncHVzaCcpO1xuSW50ZXJmYWNlLnByb3RvdHlwZS5tYXRjaCA9IFJ1bmUuZGVmaW5lKCdtYXRjaCcsICdiZWdpbicpO1xuSW50ZXJmYWNlLnByb3RvdHlwZS5lbmQgPSBSdW5lLmRlZmluZSgnZW5kJywgJ2VuZCcpO1xuSW50ZXJmYWNlLnByb3RvdHlwZS5jYXNlID0gUnVuZS5kZWZpbmUoJ2Nhc2UnLCAncHVzaCcpO1xuSW50ZXJmYWNlLnByb3RvdHlwZS50byA9IFJ1bmUuZGVmaW5lKCd0bycsICdwdXNoJyk7XG5JbnRlcmZhY2UucHJvdG90eXBlLmFzID0gUnVuZS5kZWZpbmUoJ2FzJywgJ3B1c2gnKTtcbkludGVyZmFjZS5wcm90b3R5cGUubG9vcCA9IFJ1bmUuZGVmaW5lKCdsb29wJywgJ2JlZ2luJyk7XG5JbnRlcmZhY2UucHJvdG90eXBlLnVudGlsID0gUnVuZS5kZWZpbmUoJ3VudGlsJywgJ2VuZCcpO1xuSW50ZXJmYWNlLnByb3RvdHlwZS5hbnkgPSBSdW5lLmRlZmluZSgnYW55JywgJ3B1c2gnKTtcbkludGVyZmFjZS5wcm90b3R5cGUuYWxsID0gUnVuZS5kZWZpbmUoJ2FsbCcsICdwdXNoJyk7XG5cbkludGVyZmFjZS5wcm90b3R5cGUub25jaGFuZ2UgPSBmdW5jdGlvbihjb250ZXh0LCBub2RlLCBzdGFjaykge1xuICAvLyBXaGVuIGl0J3MgY2hhbmdlZCwgZXZhbHVhdGUgaXQgd2l0aCBhbmFseXplcnMgJiBpbnRlcnByZXRlci5cbiAgcmV0dXJuIHRoaXMuX2V2YWx1YXRvcihjb250ZXh0LCBub2RlLCBzdGFjayk7XG59O1xuXG5JbnRlcmZhY2UucHJvdG90eXBlLl9pbnRlcnByZXQgPSBmdW5jdGlvbihjb250ZXh0LCBub2RlLCBzdGFjaykge1xuICAvLyBXZWxsIGluIHRoaXMgZURTTCB3ZSBkZWxlZ2F0ZSB0aGUgaW50ZXJwcmV0aW9uIHRvIHRoZSBydW50aW1lLlxuICAvLyBXZSBkb24ndCBwYXNzIGNvbnRleHQgdG8gcnVudGltZSBzaW5jZSB0aGUgcnVudGltZSB3aWxsIGtlZXBcbiAgLy8gdGhlIGVzc2VudGlhbCBzdGF0ZXMgYnkgaXRzIG93bi5cbiAgcmV0dXJuIHRoaXMuX3J1bnRpbWUub25jaGFuZ2UuYXBwbHkodGhpcy5fcnVudGltZSwgYXJndW1lbnRzKTtcbn07XG5cbi8vIEluIHRoaXMgZURTTCB3ZSBub3cgb25seSBoYXZlIHRoaXMgYW5hbHl6ZXIuIENvdWxkIGFkZCBtb3JlIGFuZCByZWdpc3RlciBpdFxuLy8gaW4gdGhlIGNvbnRydWN0aW9uIG9mICd0aGlzLl9ldmFsdWF0b3InLlxuSW50ZXJmYWNlLnByb3RvdHlwZS5fYW5hbHl6ZU9yZGVyID0gZnVuY3Rpb24oY29udGV4dCwgY2hhbmdlLCBzdGFjaykge1xuICBpZiAoJ3N0YXJ0JyA9PT0gY2hhbmdlLnR5cGUpIHtcbiAgICBjb250ZXh0LnN0YXJ0ZWQgPSB0cnVlO1xuICB9IGVsc2UgaWYgKCdzdG9wJykge1xuICAgIGNvbnRleHQuc3RvcHBlZCA9IHRydWU7XG4gIH1cbiAgaWYgKCdzdGFydCcgPT09IGNoYW5nZS50eXBlICYmIGNvbnRleHQuc3RvcHBlZCkge1xuICAgIHRocm93IG5ldyBFcnJvcignU2hvdWxkIG5vdCBzdGFydCBhIHByb2Nlc3MgYWdhaW4nICtcbiAgICAgICAgJ2FmdGVyIGl0XFwncyBhbHJlYWR5IHN0b3BwZWQnKTtcbiAgfSBlbHNlIGlmICgnbmV4dCcgPT09IGNoYW5nZS50eXBlICYmICFjb250ZXh0LnN0YXJ0ZWQpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ1Nob3VsZCBub3QgY29uY2F0IHN0ZXBzIHdoaWxlIGl0XFwncyBub3Qgc3RhcnRlZCcpO1xuICB9IGVsc2UgaWYgKCdzdG9wJyA9PT0gY2hhbmdlLnR5cGUgJiYgIWNvbnRleHQuc3RhcnRlZCkge1xuICAgIHRocm93IG5ldyBFcnJvcignU2hvdWxkIG5vdCBzdG9wIGEgcHJvY2VzcyBiZWZvcmUgaXRcXCdzIHN0YXJ0ZWQnKTtcbiAgfVxufTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vcGxheWxhbmcuaW50ZXJmYWNlLmpzXG4gKiovIiwiKGZ1bmN0aW9uKGUsIGEpIHsgZm9yKHZhciBpIGluIGEpIGVbaV0gPSBhW2ldOyB9KGV4cG9ydHMsIC8qKioqKiovIChmdW5jdGlvbihtb2R1bGVzKSB7IC8vIHdlYnBhY2tCb290c3RyYXBcbi8qKioqKiovIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuLyoqKioqKi8gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuLyoqKioqKi9cbi8qKioqKiovIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbi8qKioqKiovIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuLyoqKioqKi9cbi8qKioqKiovIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbi8qKioqKiovIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbi8qKioqKiovIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuLyoqKioqKi9cbi8qKioqKiovIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuLyoqKioqKi8gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbi8qKioqKiovIFx0XHRcdGV4cG9ydHM6IHt9LFxuLyoqKioqKi8gXHRcdFx0aWQ6IG1vZHVsZUlkLFxuLyoqKioqKi8gXHRcdFx0bG9hZGVkOiBmYWxzZVxuLyoqKioqKi8gXHRcdH07XG4vKioqKioqL1xuLyoqKioqKi8gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuLyoqKioqKi8gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuLyoqKioqKi9cbi8qKioqKiovIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4vKioqKioqLyBcdFx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG4vKioqKioqL1xuLyoqKioqKi8gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4vKioqKioqLyBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuLyoqKioqKi8gXHR9XG4vKioqKioqL1xuLyoqKioqKi9cbi8qKioqKiovIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbi8qKioqKiovIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcbi8qKioqKiovXG4vKioqKioqLyBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4vKioqKioqLyBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG4vKioqKioqL1xuLyoqKioqKi8gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuLyoqKioqKi8gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuLyoqKioqKi9cbi8qKioqKiovIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4vKioqKioqLyBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuLyoqKioqKi8gfSlcbi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG4vKioqKioqLyAoW1xuLyogMCAqL1xuLyoqKi8gZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzKSB7XG5cblx0J3VzZSBzdHJpY3QnO1xuXHRcblx0LyoqXG5cdCAqIEdlbmVyaWMgYnVpbGRlciB0aGF0IHdvdWxkIHB1c2ggbm9kZXMgaW50byB0aGUgZURTTCBzdGFjay5cblx0ICogVXNlciBjb3VsZCBpbmhlcml0IHRoaXMgdG8gZGVmaW5lIHRoZSBuZXcgZURTTC5cblx0ICogLS0tXG5cdCAqIFRoZSBkZWZhdWx0IHNlbWFudGljcyBvbmx5IGNvbnRhaW4gdGhlc2Ugb3BlcmF0aW9uczpcblx0ICpcblx0ICogMS4gW3B1c2hdIDogcHVzaCB0byB0aGUgY3VycmVudCBzdGFja1xuXHQgKiAyLiBbYmVnaW5dOiBjcmVhdGUgYSBuZXcgc3RhY2sgYW5kIHN3aXRjaCB0byBpdCxcblx0ICogICAgICAgICAgICAgYW5kIHRoZW4gcHVzaCB0aGUgbm9kZSBpbnRvIHRoZSBzdGFjay5cblx0ICogMy4gW2VuZF0gIDogYWZ0ZXIgcHVzaCB0aGUgbm9kZSBpbnRvIHRoZSBzdGFjayxcblx0ICogICAgICAgICAgICAgY2hhbmdlIHRoZSBjdXJyZW50IHN0YWNrIHRvIHRoZSBwcmV2aW91cyBvbmUuXG5cdCAqIDQuIFtleGl0XSA6IGV4aXQgdGhlIGNvbnRleHQgb2YgdGhpcyBlRFNMOyB0aGUgbGFzdCByZXN1bHRcblx0ICogICAgICAgICAgICAgb2YgaXQgd291bGQgYmUgcGFzc2VkIHRvIHRoZSByZXR1cm4gdmFsdWUgb2Zcblx0ICogICAgICAgICAgICAgdGhpcyBjaGFpbi5cblx0ICpcblx0ICogU3RhY2sgY291bGQgYmUgbmVzdGVkOiB3aGVuIFtiZWdpbl0gYSBuZXcgc3RhY2sgaW4gZmFjdCBpdCB3b3VsZFxuXHQgKiBwdXNoIHRoZSBzdGFjayBpbnRvIHRoZSBwcmV2aW91cyBvbmUuIFNvIHRoZSBzdGFjayBjb21wcmlzZVxuXHQgKiBbbm9kZV0gYW5kIFtzdGFja10uXG5cdCAqIC0tLVxuXHQgKiBBbHRob3VnaCB0aGUgZURTTCBpbnN0YW5jZSBzaG91bGQgd3JhcCB0aGVzZSBiYXNpYyBvcGVyYXRpb25zXG5cdCAqIHRvIG1hbmlwdWxhdGUgdGhlIHN0YWNrLCB0aGV5IGFsbCBuZWVkIHRvIGNvbnZlcnQgdGhlIG1ldGhvZFxuXHQgKiBjYWxsIHRvIG5vZGVzLiBTbyAnUnVuZScgcHJvdmlkZSBhIHdheSB0byBzaW1wbGlmeSB0aGUgd29yazogaWZcblx0ICogdGhlIGluc3RhbmNlIGNhbGwgdGhlIFtkZWZpbmVdIG1ldGhvZCB0aGUgbmFtZSBvZiB0aGUgbWV0aG9kLFxuXHQgKiBpdCBjb3VsZCBhc3NvY2lhdGUgdGhlIG9wZXJhbmQgb2YgdGhlIGVEU0wgd2l0aCB0aGUgc3RhY2sgbWFuaXB1bGF0aW9uLlxuXHQgKiBGb3IgZXhhbXBsZTpcblx0ICpcblx0ICogICAgdmFyIGVEU0wgPSBmdW5jdGlvbigpIHt9O1xuXHQgKiAgICBlRFNMLnByb3RvdHlwZS50cmFuc2FjdGlvbiA9IFJ1bmUuZGVmaW5lKCd0cmFuc2FjdGlvbicsICdiZWdpbicpO1xuXHQgKiAgICBlRFNMLnByb3RvdHlwZS5wcmUgPSBSdW5lLmRlZmluZSgncHJlJywgJ3B1c2gnKTtcblx0ICogICAgZURTTC5wcm90b3R5cGUucGVyZm9ybSA9IFJ1bmUuZGVmaW5lKCdwZXJmb3JtJywgJ3B1c2gnKTtcblx0ICogICAgZURTTC5wcm90b3R5cGUucG9zdCA9IFJ1bmUuZGVmaW5lKCdwb3N0JywgJ2VuZCcpO1xuXHQgKlxuXHQgKiBUaGVuIHRoZSBlRFNMIGNvdWxkIGJlIHVzZWQgYXM6XG5cdCAqXG5cdCAqICAgIChuZXcgZURTTClcblx0ICogICAgICAudHJhbnNhY3Rpb24oKVxuXHQgKiAgICAgIC5wcmUoY2IpXG5cdCAqICAgICAgLnBlcmZvcm0oY2IpXG5cdCAqICAgICAgLnBvc3QoY2IpXG5cdCAqXG5cdCAqIEFuZCB0aGUgc3RhY2sgd291bGQgYmU6XG5cdCAqXG5cdCAqICAgIFtcblx0ICogICAgICBub2RlPCd0cmFuc2FjdGlvbicsPlxuXHQgKiAgICAgIG5vZGU8J3ByZScsIGNiPlxuXHQgKiAgICAgIG5vZGU8J3ByZWZvcm0nLCBjYj5cblx0ICogICAgICBub2RlPCdwb3N0JywgY2I+XG5cdCAqICAgIF1cblx0ICpcblx0ICogSG93ZXZlciwgdGhpcyBzaW1wbGUgYXBwcm9hY2ggdGhlIHNlbWFudGljcyBydWxlcyBhbmQgYW5hbHl6ZXJzIHRvXG5cdCAqIGd1YXJhbnRlZSB0aGUgc3RhY2sgaXMgdmFsaWQuIEZvciBleGFtcGxlLCBpZiB3ZSBoYXZlIGEgbWFsZm9ybWVkXG5cdCAqIHN0YWNrIGJlY2F1c2Ugb2YgdGhlIGZvbGxvd2luZyBlRFNMIHByb2dyYW06XG5cdCAqXG5cdCAqICAgIChuZXcgZURTTClcblx0ICogICAgICAucG9zdChjYilcblx0ICogICAgICAucHJlKGNiKVxuXHQgKiAgICAgIC5wZXJmb3JtKGNiKVxuXHQgKiAgICAgIC50cmFuc2FjdGlvbigpXG5cdCAqXG5cdCAqIFRoZSBydW50aW1lIG1heSByZXBvcnQgZXJyb3QgYmVjYXVzZSB3aGVuICcucG9zdChjYiknIHRoZXJlIGlzIG5vIHN0YWNrXG5cdCAqIGNyZWF0ZWQgYnkgdGhlIGJlZ2lubmluZyBzdGVwLCBuYW1lbHkgdGhlICcucHJlKGNiKScgaW4gb3VyIGNhc2UuXG5cdCAqIE5ldmVydGhlbGVzcywgdGhlIGVycm9yIG1lc3NhZ2UgaXMgdG9vIGxvdy1sZXZlbCBmb3IgdGhlIGxhbmd1YWdlIHVzZXIsXG5cdCAqIHNpbmNlIHRoZXkgc2hvdWxkIGNhcmUgbm8gc3RhY2sgdGhpbmdzIGFuZCBzaG91bGQgb25seSBjYXJlIGFib3V0IHRoZSBlRFNMXG5cdCAqIGl0c2VsZi5cblx0ICpcblx0ICogVGhlIHNvbHV0aW9uIGlzIHRvIHByb3ZpZGUgYSBiYXNpYyBzdGFjayBvcmRlcmluZyBhbmFseXplciBhbmQgbGV0IHRoZVxuXHQgKiBsYW5ndWFnZSBkZWNpZGUgaG93IHRvIGRlc2NyaWJlIHRoZSBlcnJvci4gQW5kIHNpbmNlIHdlIGRvbid0IGhhdmVcblx0ICogYW55IGNvbnRleHQgaW5mb3JtYXRpb24gYWJvdXQgdmFyaWFibGVzLCBzY29wZSBhbmQgb3RoZXIgZWxlbWVudHNcblx0ICogYXMgYSBjb21wbGV0ZSBwcm9ncmFtbWluZyBsYW5ndWFnZSwgd2Ugb25seSBuZWVkIHRvIGd1YXJhbnRlZSB0aGUgb3JkZXIgaXNcblx0ICogY29ycmVjdCwgYW5kIG1ha2UgaW5jb3JyZWN0IGNhc2VzIG1lYW5pbmdmdWwuIE1vcmVvdmVyLCBzaW5jZSB0aGUgYW5hbHl6ZXJcblx0ICogbmVlZHMgdG8gYW5hbHl6ZSB0aGUgc3RhdGVzIHdoZW5ldmVyIHRoZSBpbmNvbWluZyBub2RlIGNvbWVzLCBpdCBpcyBpbiBmYWN0XG5cdCAqIGFuIGV2YWx1YXRpb24gcHJvY2Vzcywgc28gdXNlciBjb3VsZCBjb21iaW5lIHRoZSBhbmFseXppbmcgYW5kIGludGVycHJldGluZ1xuXHQgKiBwaGFzZSBpbnRvIHRoZSBzYW1lIGZ1bmN0aW9uLiBGb3IgZXhhbXBsZTpcblx0ICpcblx0ICogICAgcnVudGltZS5vbmNoYW5nZSgoY29udGV4dCwgbm9kZSwgc3RhY2spID0+IHtcblx0ICogICAgICAgIC8vIElmIHRoZSBjaGFuZ2UgaXMgdG8gc3dpdGNoIHRvIGEgbmV3IHN0YWNrLFxuXHQgKiAgICAgICAgLy8gdGhlICdzdGFjaycgaGVyZSB3b3VsZCBiZSB0aGUgbmV3IHN0YWNrLlxuXHQgKiAgICAgICAgdmFyIHt0eXBlLCBhcmdzfSA9IG5vZGU7XG5cdCAqICAgICAgICBpZiAoJ3ByZScgPT09IHR5cGUpIHtcblx0ICogICAgICAgICAgY29udGV4dC5pbml0ID0gdHJ1ZTtcblx0ICogICAgICAgIH0gZWxzZSBpZiAoJ3Bvc3QnID09PSB0eXBlICYmICFjb250ZXh0LmluaXQpIHtcblx0ICogICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdUaGVyZSBtdXN0IGJlIG9uZSBcInByZVwiIG5vZGUgYmVmb3JlIHRoZSBcInBvc3RcIi4nKTtcblx0ICogICAgICAgIH1cblx0ICogICAgfSk7XG5cdCAqXG5cdCAqIFdpdGggc3VjaCBmZWF0dXJlLCBpZiB0aGUgaW5jb21pbmcgbm9kZSBvciB0aGUgc3RhY2sgaXMgbWFsZm9ybWVkLFxuXHQgKiBpdCBzaG91bGQgdGhyb3cgdGhlIGVycm9yLiBUaGUgZXJyb3IgY2FwdHVyZWQgYnkgdGhlIGluc3RhbmNlIGxpa2UgdGhpc1xuXHQgKiBjb3VsZCBiZSBhICdjb21waWxhdGlvbiBlcnJvcicuXG5cdCAqXG5cdCAqIFRoZSBub3RpY2VhYmxlIGZhY3QgaXMgVGhlIGNhbGxiYWNrIG9mIHRoZSAnb25jaGFuZ2UnIGlzIGFjdHVhbGx5IGEgcmVkdWNlcixcblx0ICogc28gdXNlciBjb3VsZCB0cmVhdCB0aGUgcHJvY2VzcyBvZiB0aGlzIGV2YWx1YXRpb24gJiBhbmFseXppbmcgYXMgYSByZWR1Y2luZ1xuXHQgKiBwcm9jZXNzIG9uIGFuIGluZmluaXRlIHN0cmVhbS4gQW5kIHNpbmNlIHdlIGhhdmUgYSBzdGFjayBtYWNoaW5lLCBpZiB0aGVcblx0ICogcmVkdWNlciByZXR1cm4gbm90aGluZywgdGhlIHN0YWNrIHdvdWxkIGJlIGVtcHR5LiBPdGhlcndpc2UsIGlmIHRoZSByZWR1Y2VyXG5cdCAqIHJldHVybiBhIG5ldyBzdGFjaywgaXQgd291bGQgcmVwbGFjZSB0aGUgb2xkIG9uZS5cblx0ICpcblx0ICogQW5kIHBsZWFzZSBub3RlIHRoZSBleGFtcGxlIGlzIG11Y2ggc2ltcGxpZmllZC4gRm9yIHRoZVxuXHQgKiByZWFsIGVEU0wgaXQgc2hvdWxkIGJlIHVzZWQgb25seSBhcyBhbiBlbnRyeSB0byBkaXNwYXRjaCB0aGUgY2hhbmdlIHRvXG5cdCAqIHRoZSByZWFsIGhhbmRsZXJzLCB3aGljaCBtYXkgY29tcHJpc2Ugc2V2ZXJhbCBzdGF0ZXMgYW5kIGNvbXBvbmVudHMuXG5cdCAqL1xuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7XG5cdCAgdmFsdWU6IHRydWVcblx0fSk7XG5cdGV4cG9ydHMuUnVuZSA9IFJ1bmU7XG5cdFxuXHRmdW5jdGlvbiBSdW5lKCkge31cblx0XG5cdC8qKlxuXHQgKiBIZWxwZXIgbWV0aG9kIHRvIGJ1aWxkIGludGVyZmFjZSBvZiBhIHNwZWNpZmljIERTTC4gSXQgd291bGQgcmV0dXJuIGEgbWV0aG9kXG5cdCAqIG9mIHRoZSBEU0wgYW5kIHRoZW4gdGhlIGludGVyZmFjZSBjb3VsZCBhdHRhY2ggaXQuXG5cdCAqXG5cdCAqIFRoZSByZXR1cm5pbmcgZnVuY3Rpb24gd291bGQgYXNzdW1lIHRoYXQgdGhlICd0aGlzJyBpbnNpZGUgaXQgaXMgdGhlIHJ1bnRpbWVcblx0ICogb2YgdGhlIGxhbmd1YWdlLiBBbmQgc2luY2UgdGhlIG1ldGhvZCBpdCByZXR1cm5zIHdvdWxkIHJlcXVpcmUgdG8gYWNjZXNzIHNvbWVcblx0ICogbWVtYmVycyBvZiB0aGUgJ3RoaXMnLCB0aGUgJ3RoaXMnIHNob3VsZCBoYXZlICd0aGlzLnN0YWNrJyBhbmQgJ3RoaXMuY29udGV4dCdcblx0ICogYXMgdGhlIG1ldGhvZCByZXF1aXJlcy5cblx0ICpcblx0ICogSWYgaXQncyBhbiAnZXhpdCcgbm9kZSwgbWVhbnMgdGhlIHNlc3Npb24gaXMgZW5kZWQgYW5kIHRoZSBpbnRlcnByZXRlciBzaG91bGRcblx0ICogcmV0dXJuIGEgc3RhY2sgY29udGFpbnMgb25seSBvbmUgbm9kZSBhcyB0aGUgcmVzdWx0IG9mIHRoZSBzZXNzaW9uLCBvciB0aGVcblx0ICogc2Vzc2lvbiByZXR1cm5zIG5vdGhpbmcuIEZvciBvdGhlciBpbnN0cnVjdGlvbnMgdGhlIHN0YWNrIGNhbiBrZWVwIHNvbWVcblx0ICogY29tcHV0ZWQgcmVzdWx0IHRvIHNpbXVsYXRlIHJlYWwgc3RhY2sgbWFjaGluZS4gQnV0IGl0J3MgT0sgdG8gbm90IHVzZSB0aGlzXG5cdCAqIGZlYXR1cmUgYW5kIGFsd2F5cyByZXR1cm4gYW4gZW1wdHkgJ3N0YWNrJyBldmVyeXRpbWUgdGhlICdvbmNoYW5nZScgZ2V0XG5cdCAqIGNhbGxlZCBhbmQgaW50ZXJ1cHRlZC4gSW4gdGhpcyBtb2RlIGl0IG1lYW5zIHRoZSBsYW5ndWFnZSB3YW50IHRvIGtlZXBcblx0ICogYWxsIHN0YXRlcyBieSBpdHNlbGYuXG5cdCAqXG5cdCAqIFBsZWFzZSBub3RlIHRoYXQgZnJvbSB0aGUgZGVzY3JpcHRpb24gYWJvdmUsICdlbmQnIG1lYW5zIHN0YWNrIChzdWJzdGFjaylcblx0ICogZW5kcy4gSXQncyB0b3RhbGx5IGlycmVsZXZhbnQgdG8gJ2V4aXQnLlxuXHQgKlxuXHQgKiBUaGUgbGFzdCBhcmd1bWVudCAnZG9jJyBpcyB3aGF0IGRlc2lnbmVyIGNvdWxkIHB1dCB0aGUgZGVzY3JpcHRpb24gYWJvdXRcblx0ICogdGhlIG1ldGhvZC4gSWYgc2V0LCBpdCB3b3VsZCBhcHBlbmQgdGhlICdydW5lLmRvYydcblx0ICogcHJvcGVydHkgaW4gdGhlIGZ1bmN0aW9uIGl0IHJldHVybnMuIEFuZCB0aGVuIHRoZSBsYW5ndWFnZSBpbnN0YW5jZSBjb3VsZFxuXHQgKiBjYWxsIGBSdW5lLmRvY3VtZW50KDxpbnN0YW5jZT4pYCB0byBnZXQgYSBtZXRob2QgdGhhdCB3b3VsZCByZXR1cm5cblx0ICogJ3sgbWV0aG9kTmFtZTogZGVzY3JpcHRpb24gfScgd2hlbiBpdCBnb3QgaW52b2tlZC5cblx0ICovXG5cdFJ1bmUuZGVmaW5lID0gZnVuY3Rpb24gKG1ldGhvZCwgYXMpIHtcblx0ICB2YXIgZG9jID0gYXJndW1lbnRzLmxlbmd0aCA8PSAyIHx8IGFyZ3VtZW50c1syXSA9PT0gdW5kZWZpbmVkID8gJycgOiBhcmd1bWVudHNbMl07XG5cdFxuXHQgIHZhciBidWlsdCA9IGZ1bmN0aW9uIGJ1aWx0KCkge1xuXHQgICAgdmFyIG5vZGUsIHJlc3VsdHN0YWNrO1xuXHRcblx0ICAgIGZvciAodmFyIF9sZW4gPSBhcmd1bWVudHMubGVuZ3RoLCBhcmdzID0gQXJyYXkoX2xlbiksIF9rZXkgPSAwOyBfa2V5IDwgX2xlbjsgX2tleSsrKSB7XG5cdCAgICAgIGFyZ3NbX2tleV0gPSBhcmd1bWVudHNbX2tleV07XG5cdCAgICB9XG5cdFxuXHQgICAgc3dpdGNoIChhcykge1xuXHQgICAgICBjYXNlICdwdXNoJzpcblx0ICAgICAgICBub2RlID0gbmV3IFJ1bmUuTm9kZShtZXRob2QsIGFyZ3MsIHRoaXMuc3RhY2spO1xuXHQgICAgICAgIHRoaXMuc3RhY2sucHVzaChub2RlKTtcblx0ICAgICAgICByZXN1bHRzdGFjayA9IHRoaXMub25jaGFuZ2UodGhpcy5jb250ZXh0LCBub2RlLCB0aGlzLnN0YWNrKTtcblx0ICAgICAgICBicmVhaztcblx0ICAgICAgY2FzZSAnYmVnaW4nOlxuXHQgICAgICAgIHRoaXMuX3ByZXZzdGFjayA9IHRoaXMuc3RhY2s7XG5cdCAgICAgICAgdGhpcy5zdGFjayA9IFtdO1xuXHQgICAgICAgIG5vZGUgPSBuZXcgUnVuZS5Ob2RlKG1ldGhvZCwgYXJncywgdGhpcy5zdGFjayk7XG5cdCAgICAgICAgdGhpcy5zdGFjay5wdXNoKG5vZGUpOyAvLyBhcyB0aGUgZmlyc3Qgbm9kZSBvZiB0aGUgbmV3IHN0YWNrLlxuXHQgICAgICAgIHJlc3VsdHN0YWNrID0gdGhpcy5vbmNoYW5nZSh0aGlzLmNvbnRleHQsIG5vZGUsIHRoaXMuc3RhY2spO1xuXHQgICAgICAgIGJyZWFrO1xuXHQgICAgICBjYXNlICdlbmQnOlxuXHQgICAgICAgIG5vZGUgPSBuZXcgUnVuZS5Ob2RlKG1ldGhvZCwgYXJncywgdGhpcy5zdGFjayk7XG5cdCAgICAgICAgdGhpcy5zdGFjay5wdXNoKG5vZGUpOyAvLyB0aGUgbGFzdCBub2RlIG9mIHRoZSBzdGFjay5cblx0ICAgICAgICB0aGlzLnN0YWNrID0gdGhpcy5fcHJldnN0YWNrOyAvLyBzd2l0Y2ggYmFjayB0byB0aGUgcHJldmlvdXMgc3RhY2suXG5cdCAgICAgICAgcmVzdWx0c3RhY2sgPSB0aGlzLm9uY2hhbmdlKHRoaXMuY29udGV4dCwgbm9kZSwgdGhpcy5zdGFjayk7XG5cdCAgICAgICAgYnJlYWs7XG5cdCAgICAgIGNhc2UgJ2V4aXQnOlxuXHQgICAgICAgIG5vZGUgPSBuZXcgUnVuZS5Ob2RlKG1ldGhvZCwgYXJncywgdGhpcy5zdGFjayk7XG5cdCAgICAgICAgdGhpcy5zdGFjay5wdXNoKG5vZGUpOyAvLyB0aGUgbGFzdCBub2RlIG9mIHRoZSBzdGFjay5cblx0ICAgICAgICByZXN1bHRzdGFjayA9IHRoaXMub25jaGFuZ2UodGhpcy5jb250ZXh0LCBub2RlLCB0aGlzLnN0YWNrKTtcblx0ICAgICAgICBpZiAoIXJlc3VsdHN0YWNrKSB7XG5cdCAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1xcJ2V4aXRcXCcgbm9kZSBcXCcnICsgbm9kZS50eXBlICsgJ1xcJyBzaG91bGRcXG4gICAgICAgICAgICByZXR1cm4gYSByZXN1bHRzdGFjay4nKTtcblx0ICAgICAgICB9XG5cdCAgICAgICAgcmV0dXJuIHJlc3VsdHN0YWNrWzBdO1xuXHQgICAgfVxuXHQgICAgLy8gSWYgdGhlIGhhbmRsZXIgdXBkYXRlcyB0aGUgc3RhY2ssIGl0IHdvdWxkIHJlcGxhY2UgdGhlIGV4aXN0aW5nIG9uZS5cblx0ICAgIGlmIChyZXN1bHRzdGFjaykge1xuXHQgICAgICB0aGlzLnN0YWNrID0gcmVzdWx0c3RhY2s7XG5cdCAgICB9XG5cdCAgICByZXR1cm4gdGhpcztcblx0ICB9O1xuXHQgIGJ1aWx0LnJ1bmUgPSB7XG5cdCAgICAnYXMnOiBhcyxcblx0ICAgICdkb2MnOiBkb2MsXG5cdCAgICAnbWV0aG9kJzogbWV0aG9kXG5cdCAgfTtcblx0ICByZXR1cm4gYnVpbHQ7XG5cdH07XG5cdFxuXHQvKipcblx0ICogR2VuZXJhdGUgYSBtZXRob2QgdGhhdCB3b3VsZCByZXR1cm4gYWxsIGRvY3VtZW50cyBvZiB0aGUgbWV0aG9kcyxcblx0ICogaW4gYSBmb3JtIG9mICd7IG1ldGhvZE5hbWU6IGRlc2NyaXB0aW9uIH0nLlxuXHQgKlxuXHQgKiBUaGUgYXJndW1lbnQgbXVzdCBiZSB0aGUgbGFuZ3VhZ2UgaW5zdGFuY2Ugd2l0aCBhbGwgZGVmaW5lZCBtZXRob2RzLlxuXHQgKi9cblx0UnVuZS5wdWJsaXNoID0gZnVuY3Rpb24gKGluc3RhbmNlKSB7XG5cdCAgdmFyIGdlbmVyYXRlZCA9IE9iamVjdC5rZXlzKGluc3RhbmNlKS5yZWR1Y2UoZnVuY3Rpb24gKGRvYywgbmFtZSkge1xuXHQgICAgdmFyIG1ldGhvZCA9IGluc3RhbmNlW25hbWVdO1xuXHQgICAgaWYgKG1ldGhvZC5ydW5lKSB7XG5cdCAgICAgIGRvY1tuYW1lXSA9IG1ldGhvZC5ydW5lLmRvYztcblx0ICAgIH1cblx0ICB9LCB7fSk7XG5cdCAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcblx0ICAgIHJldHVybiBnZW5lcmF0ZWQ7XG5cdCAgfTtcblx0fTtcblx0XG5cdFJ1bmUuTm9kZSA9IGZ1bmN0aW9uICh0eXBlLCBhcmdzLCBzdGFjaykge1xuXHQgIHRoaXMudHlwZSA9IHR5cGU7XG5cdCAgdGhpcy5hcmdzID0gYXJncztcblx0ICB0aGlzLnN0YWNrID0gc3RhY2s7XG5cdH07XG5cdFxuXHRSdW5lLkV2YWx1YXRlID0gZnVuY3Rpb24gKCkge1xuXHQgIHZhciBjb250ZXh0ID0gYXJndW1lbnRzLmxlbmd0aCA8PSAwIHx8IGFyZ3VtZW50c1swXSA9PT0gdW5kZWZpbmVkID8ge30gOiBhcmd1bWVudHNbMF07XG5cdFxuXHQgIHRoaXMuX2FuYWx5emVycyA9IFtdO1xuXHQgIHRoaXMuX2ludGVycHJldGVyID0gbnVsbDtcblx0ICB0aGlzLl9jb250ZXh0ID0gY29udGV4dDtcblx0fTtcblx0XG5cdC8qKlxuXHQgKiBBbmFseXplciBjb3VsZCByZWNlaXZlIHRoZSBzdGFjayBjaGFuZ2UgZnJvbSAnUnVuZSNldmFsdWF0ZScsXG5cdCAqIGFuZCBpdCB3b3VsZCBiZSBjYWxsZWQgd2l0aCB0aGUgYXJndW1lbnRzIGFzIHRoZSBmdW5jdGlvbiBkZXNjcmliZXM6XG5cdCAqXG5cdCAqICAgICBSdW5lLnByb3RvdHlwZS5ldmFsdWF0ZSgoY29udGV4dCwgY2hhbmdlLCBzdGFjaykgPT4ge1xuXHQgKiAgICAgICAgLy8gLi4uXG5cdCAqICAgICB9KTtcblx0ICpcblx0ICogU28gdGhlIGFuYWx5emVyIGNvdWxkIGJlOlxuXHQgKlxuXHQgKiAgICBmdW5jdGlvbihjb250ZXh0LCBjaGFuZ2UsIHN0YWNrKSB7XG5cdCAqICAgICAgLy8gRG8gc29tZSBjaGVjayBhbmQgbWF5YmUgY2hhbmdlZCB0aGUgY29udGV4dC5cblx0ICogICAgICAvLyBUaGUgbmV4dCBhbmFseXplciB0byB0aGUgaW50ZXJwcmV0ZXIgd291bGQgYWNjZXB0IHRoZSBhbHRlcm5hdGVkXG5cdCAqICAgICAgLy8gY29udGV4dCBhcyB0aGUgYXJndW1lbnQgJ2NvbnRleHQnLlxuXHQgKiAgICAgIGNvbnRleHQuc29tZUZsYWcgPSB0cnVlO1xuXHQgKiAgICAgIC8vIFdoZW4gdGhlcmUgaXMgd3JvbmcsIHRocm93IGl0LlxuXHQgKiAgICAgIHRocm93IG5ldyBFcnJvcignU29tZSBhbmFseXppbmcgZXJyb3InKTtcblx0ICogICAgfTtcblx0ICpcblx0ICogTm90ZSB0aGF0IHRoZSBhbmFseXplciAoJ2EnKSB3b3VsZCBiZSBpbnZva2VkIHdpdGggZW1wdHkgJ3RoaXMnIG9iamVjdCxcblx0ICogc28gdGhlIGZ1bmN0aW9uIHJlbGllcyBvbiAndGhpcycgc2hvdWxkIGJpbmQgaXRzZWxmIGZpcnN0LlxuXHQgKi9cblx0UnVuZS5FdmFsdWF0ZS5wcm90b3R5cGUuYW5hbHl6ZXIgPSBmdW5jdGlvbiAoYSkge1xuXHQgIHRoaXMuX2FuYWx5emVycy5wdXNoKGEpO1xuXHQgIHJldHVybiB0aGlzO1xuXHR9O1xuXHRcblx0LyoqXG5cdCAqIE9uZSBFdmFsdWF0ZSBjYW4gb25seSBoYXZlIG9uZSBpbnRlcnByZXRlciwgYW5kIGl0IHdvdWxkIHJldHVyblxuXHQgKiB0aGUgZnVuY3Rpb24gY291bGQgY29uc3VtZSBldmVyeSBzdGFjayBjaGFuZ2UgZnJvbSAnUnVuZSNldmFsdWF0ZScuXG5cdCAqXG5cdCAqIFRoZSBjb2RlIGlzIGEgbGl0dGxlIGNvbXBsaWNhdGVkOiB3ZSBoYXZlIHR3byBraW5kcyBvZiAncmVkdWNpbmcnOlxuXHQgKiBvbmUgaXMgdG8gcmVkdWNlIGFsbCBhbmFseXplcnMgd2l0aCB0aGUgc2luZ2xlIGluY29taW5nIGNoYW5nZSxcblx0ICogYW5vdGhlciBpcyB0byByZWR1Y2UgYWxsIGluY29taW5nIGNoYW5nZXMgd2l0aCB0aGlzIGFuYWx5emVycyArIGludGVycHJldGVyLlxuXHQgKlxuXHQgKiBUaGUgYW5hbHl6ZXIgYW5kIGludGVycHJldGVyIHNob3VsZCBjaGFuZ2UgdGhlIGNvbnRleHQsIHRvIG1lbW9yaXplIHRoZVxuXHQgKiBzdGF0ZXMgb2YgdGhlIGV2YWx1YXRpb24uIFRoZSBkaWZmZXJlbmNlIGlzIGludGVycHJldGVyIHNob3VsZCByZXR1cm4gb25lXG5cdCAqIG5ldyBzdGFjayBpZiBpdCBuZWVkcyB0byB1cGRhdGUgdGhlIGV4aXN0aW5nIG9uZS4gVGhlIHN0YWNrIGl0IHJldHVybnMgd291bGRcblx0ICogcmVwbGFjZSB0aGUgZXhpc3Rpbmcgb25lLCBzbyBhbnl0aGluZyBzdGlsbCBpbiB0aGUgb2xkIG9uZSB3b3VsZCBiZSB3aXBlZFxuXHQgKiBvdXQuIFRoZSBpbnRlcnByZXRlciBjb3VsZCByZXR1cm4gbm90aGluZyAoJ3VuZGVmaW5lZCcpIHRvIGtlZXAgdGhlIHN0YWNrXG5cdCAqIHVudG91Y2hlZC5cblx0ICpcblx0ICogVGhlIGFuYWx5emVycyBhbmQgaW50ZXJwcmV0ZXIgY291bGQgY2hhbmdlIHRoZSAnY29udGV4dCcgcGFzcyB0byB0aGVtLlxuXHQgKiBBbmQgc2luY2Ugd2UgbWF5IHVwZGF0ZSB0aGUgc3RhY2sgYXMgYWJvdmUsIHRoZSBjb250ZXh0IHNob3VsZCBtZW1vcml6ZVxuXHQgKiB0aG9zZSBpbmZvcm1hdGlvbiBub3QgdG8gYmUgb3ZlcndyaXR0ZW4gd2hpbGUgdGhlIHN0YWNrIGdldCB3aXBlZCBvdXQuXG5cdCAqXG5cdCAqIEFuZCBpZiB0aGUgaW50ZXJwcmV0aW5nIG5vZGUgaXMgdGhlIGV4aXQgbm9kZSBvZiB0aGUgc2Vzc2lvbiwgaW50ZXJwcmV0ZXJcblx0ICogc2hvdWxkIHJldHVybiBhIG5ldyBzdGFjayBjb250YWlucyBvbmx5IG9uZSBmaW5hbCByZXN1bHQgbm9kZS4gSWYgdGhlcmVcblx0ICogaXMgbm8gc3VjaCBub2RlLCB0aGUgcmVzdWx0IG9mIHRoaXMgc2Vzc2lvbiBpcyAndW5kZWZpbmVkJy5cblx0ICovXG5cdFJ1bmUuRXZhbHVhdGUucHJvdG90eXBlLmludGVycHJldGVyID0gZnVuY3Rpb24gKGlucHQpIHtcblx0ICB2YXIgX3RoaXMgPSB0aGlzO1xuXHRcblx0ICAvLyBUaGUgY3VzdG9taXplZCBsYW5ndWFnZSBzaG91bGQgZ2l2ZSB0aGUgZGVmYXVsdCBjb250ZXh0LlxuXHQgIHJldHVybiBmdW5jdGlvbiAoY29udGV4dCwgY2hhbmdlLCBzdGFjaykge1xuXHQgICAgdHJ5IHtcblx0ICAgICAgLy8gQW5hbHl6ZXJzIGNvdWxkIGNoYW5nZSB0aGUgY29udGV4dC5cblx0ICAgICAgX3RoaXMuX2FuYWx5emVycy5yZWR1Y2UoZnVuY3Rpb24gKGN0eCwgYW5hbHl6ZXIpIHtcblx0ICAgICAgICBhbmFseXplci5jYWxsKHt9LCBjb250ZXh0LCBjaGFuZ2UsIHN0YWNrKTtcblx0ICAgICAgfSwgY29udGV4dCk7XG5cdCAgICB9IGNhdGNoIChlKSB7XG5cdCAgICAgIF90aGlzLl9oYW5kbGVFcnJvcihlLCBjb250ZXh0LCBjaGFuZ2UsIHN0YWNrKTtcblx0ICAgIH1cblx0ICAgIC8vIEFmdGVyIGFuYWx5emUgaXQsIGludGVycHJldCB0aGUgbm9kZSBhbmQgcmV0dXJuIHRoZSBuZXcgc3RhY2sgKGlmIGFueSkuXG5cdCAgICB2YXIgbmV3U3RhY2sgPSBpbnB0KGNvbnRleHQsIGNoYW5nZSwgc3RhY2spO1xuXHQgICAgcmV0dXJuIG5ld1N0YWNrO1xuXHQgIH07XG5cdH07XG5cdFxuXHRSdW5lLkV2YWx1YXRlLnByb3RvdHlwZS5faGFuZGxlRXJyb3IgPSBmdW5jdGlvbiAoZXJyLCBjb250ZXh0LCBjaGFuZ2UsIHN0YWNrKSB7XG5cdCAgLy8gVE9ETzogZXhwYW5kIGl0IHRvIHByb3ZpZGUgbW9yZSBzb3BoaXN0aWMgZGVidWdnaW5nIG1lc3NhZ2UuXG5cdCAgdGhyb3cgbmV3IEVycm9yKCdXaGVuIGNoYW5nZSAnICsgY2hhbmdlLnR5cGUgKyAnIGNvbWVzIGVycm9yIFxcJycgKyBlcnIgKyAnXFwnIGhhcHBlbmVkJyk7XG5cdH07XG5cbi8qKiovIH1cbi8qKioqKiovIF0pKSk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LGV5SjJaWEp6YVc5dUlqb3pMQ0p6YjNWeVkyVnpJanBiSW5kbFluQmhZMnM2THk4dmQyVmljR0ZqYXk5aWIyOTBjM1J5WVhBZ1lqVmlZekJqTlRBMVkySmlZalppTVRVNU16Y2lMQ0ozWldKd1lXTnJPaTh2THk0dmMzSmpMM0oxYm1VdWFuTWlYU3dpYm1GdFpYTWlPbHRkTENKdFlYQndhVzVuY3lJNklqdEJRVUZCTzBGQlEwRTdPMEZCUlVFN1FVRkRRVHM3UVVGRlFUdEJRVU5CTzBGQlEwRTdPMEZCUlVFN1FVRkRRVHRCUVVOQkxIVkNRVUZsTzBGQlEyWTdRVUZEUVR0QlFVTkJPenRCUVVWQk8wRkJRMEU3TzBGQlJVRTdRVUZEUVRzN1FVRkZRVHRCUVVOQk8wRkJRMEU3T3p0QlFVZEJPMEZCUTBFN08wRkJSVUU3UVVGRFFUczdRVUZGUVR0QlFVTkJPenRCUVVWQk8wRkJRMEU3T3pzN096czdRVU4wUTBFc1lVRkJXU3hEUVVGRE96czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3TzBGQmNVZE9MRlZCUVZNc1NVRkJTU3hIUVVGSExFVkJRVVU3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3UVVFMFFucENMRXRCUVVrc1EwRkJReXhOUVVGTkxFZEJRVWNzVlVGQlV5eE5RVUZOTEVWQlFVVXNSVUZCUlN4RlFVRlpPMDlCUVZZc1IwRkJSeXg1UkVGQlJ5eEZRVUZGT3p0QlFVTjZReXhQUVVGSkxFdEJRVXNzUjBGQlJ5eFRRVUZTTEV0QlFVc3NSMEZCY1VJN1FVRkROVUlzVTBGQlNTeEpRVUZKTEVWQlFVVXNWMEZCVnl4RFFVRkRPenQxUTBGRVFTeEpRVUZKTzBGQlFVb3NWMEZCU1RzN08wRkJSVEZDTEdGQlFWRXNSVUZCUlR0QlFVTlNMRmxCUVVzc1RVRkJUVHRCUVVOVUxHRkJRVWtzUjBGQlJ5eEpRVUZKTEVsQlFVa3NRMEZCUXl4SlFVRkpMRU5CUVVNc1RVRkJUU3hGUVVGRkxFbEJRVWtzUlVGQlJTeEpRVUZKTEVOQlFVTXNTMEZCU3l4RFFVRkRMRU5CUVVNN1FVRkRMME1zWVVGQlNTeERRVUZETEV0QlFVc3NRMEZCUXl4SlFVRkpMRU5CUVVNc1NVRkJTU3hEUVVGRExFTkJRVU03UVVGRGRFSXNiMEpCUVZjc1IwRkRWQ3hKUVVGSkxFTkJRVU1zVVVGQlVTeERRVUZETEVsQlFVa3NRMEZCUXl4UFFVRlBMRVZCUVVVc1NVRkJTU3hGUVVGRkxFbEJRVWtzUTBGQlF5eExRVUZMTEVOQlFVTXNRMEZCUXp0QlFVTm9SQ3hsUVVGTk8wRkJRMUlzV1VGQlN5eFBRVUZQTzBGQlExWXNZVUZCU1N4RFFVRkRMRlZCUVZVc1IwRkJSeXhKUVVGSkxFTkJRVU1zUzBGQlN5eERRVUZETzBGQlF6ZENMR0ZCUVVrc1EwRkJReXhMUVVGTExFZEJRVWNzUlVGQlJTeERRVUZETzBGQlEyaENMR0ZCUVVrc1IwRkJSeXhKUVVGSkxFbEJRVWtzUTBGQlF5eEpRVUZKTEVOQlFVTXNUVUZCVFN4RlFVRkZMRWxCUVVrc1JVRkJSU3hKUVVGSkxFTkJRVU1zUzBGQlN5eERRVUZETEVOQlFVTTdRVUZETDBNc1lVRkJTU3hEUVVGRExFdEJRVXNzUTBGQlF5eEpRVUZKTEVOQlFVTXNTVUZCU1N4RFFVRkRMRU5CUVVNN1FVRkRkRUlzYjBKQlFWY3NSMEZEVkN4SlFVRkpMRU5CUVVNc1VVRkJVU3hEUVVGRExFbEJRVWtzUTBGQlF5eFBRVUZQTEVWQlFVVXNTVUZCU1N4RlFVRkZMRWxCUVVrc1EwRkJReXhMUVVGTExFTkJRVU1zUTBGQlF6dEJRVU5vUkN4bFFVRk5PMEZCUTFJc1dVRkJTeXhMUVVGTE8wRkJRMUlzWVVGQlNTeEhRVUZITEVsQlFVa3NTVUZCU1N4RFFVRkRMRWxCUVVrc1EwRkJReXhOUVVGTkxFVkJRVVVzU1VGQlNTeEZRVUZGTEVsQlFVa3NRMEZCUXl4TFFVRkxMRU5CUVVNc1EwRkJRenRCUVVNdlF5eGhRVUZKTEVOQlFVTXNTMEZCU3l4RFFVRkRMRWxCUVVrc1EwRkJReXhKUVVGSkxFTkJRVU1zUTBGQlF6dEJRVU4wUWl4aFFVRkpMRU5CUVVNc1MwRkJTeXhIUVVOU0xFbEJRVWtzUTBGQlF5eFZRVUZWTEVOQlFVTTdRVUZEYkVJc2IwSkJRVmNzUjBGRFZDeEpRVUZKTEVOQlFVTXNVVUZCVVN4RFFVRkRMRWxCUVVrc1EwRkJReXhQUVVGUExFVkJRVVVzU1VGQlNTeEZRVUZGTEVsQlFVa3NRMEZCUXl4TFFVRkxMRU5CUVVNc1EwRkJRenRCUVVOb1JDeGxRVUZOTzBGQlExSXNXVUZCU3l4TlFVRk5PMEZCUTFRc1lVRkJTU3hIUVVGSExFbEJRVWtzU1VGQlNTeERRVUZETEVsQlFVa3NRMEZCUXl4TlFVRk5MRVZCUVVVc1NVRkJTU3hGUVVGRkxFbEJRVWtzUTBGQlF5eExRVUZMTEVOQlFVTXNRMEZCUXp0QlFVTXZReXhoUVVGSkxFTkJRVU1zUzBGQlN5eERRVUZETEVsQlFVa3NRMEZCUXl4SlFVRkpMRU5CUVVNc1EwRkJRenRCUVVOMFFpeHZRa0ZCVnl4SFFVTlVMRWxCUVVrc1EwRkJReXhSUVVGUkxFTkJRVU1zU1VGQlNTeERRVUZETEU5QlFVOHNSVUZCUlN4SlFVRkpMRVZCUVVVc1NVRkJTU3hEUVVGRExFdEJRVXNzUTBGQlF5eERRVUZETzBGQlEyaEVMR0ZCUVVrc1EwRkJReXhYUVVGWExFVkJRVVU3UVVGRGFFSXNhVUpCUVUwc1NVRkJTU3hMUVVGTExITkNRVUZwUWl4SlFVRkpMRU5CUVVNc1NVRkJTU3hyUkVGRGFFSXNRMEZCUXp0VlFVTXpRanRCUVVORUxHZENRVUZQTEZkQlFWY3NRMEZCUXl4RFFVRkRMRU5CUVVNc1EwRkJRenRCUVVGQkxFMUJRM3BDT3p0QlFVVkVMRk5CUVVrc1YwRkJWeXhGUVVGRk8wRkJRMllzVjBGQlNTeERRVUZETEV0QlFVc3NSMEZCUnl4WFFVRlhMRU5CUVVNN1RVRkRNVUk3UVVGRFJDeFpRVUZQTEVsQlFVa3NRMEZCUXp0SlFVTmlMRU5CUVVNN1FVRkRSaXhSUVVGTExFTkJRVU1zU1VGQlNTeEhRVUZITzBGQlExZ3NVMEZCU1N4RlFVRkZMRVZCUVVVN1FVRkRVaXhWUVVGTExFVkJRVVVzUjBGQlJ6dEJRVU5XTEdGQlFWRXNSVUZCUlN4TlFVRk5PMGxCUTJwQ0xFTkJRVU03UVVGRFJpeFZRVUZQTEV0QlFVc3NRMEZCUXp0RlFVTmtMRU5CUVVNN096czdPenM3TzBGQlVVWXNTMEZCU1N4RFFVRkRMRTlCUVU4c1IwRkJSeXhWUVVGVExGRkJRVkVzUlVGQlJUdEJRVU5vUXl4UFFVRkpMRk5CUVZNc1IwRkJSeXhOUVVGTkxFTkJRVU1zU1VGQlNTeERRVUZETEZGQlFWRXNRMEZCUXl4RFFVRkRMRTFCUVUwc1EwRkJReXhWUVVGRExFZEJRVWNzUlVGQlJTeEpRVUZKTEVWQlFVczdRVUZETVVRc1UwRkJTU3hOUVVGTkxFZEJRVWNzVVVGQlVTeERRVUZETEVsQlFVa3NRMEZCUXl4RFFVRkRPMEZCUXpWQ0xGTkJRVWtzVFVGQlRTeERRVUZETEVsQlFVa3NSVUZCUlR0QlFVTm1MRlZCUVVjc1EwRkJReXhKUVVGSkxFTkJRVU1zUjBGQlJ5eE5RVUZOTEVOQlFVTXNTVUZCU1N4RFFVRkRMRWRCUVVjc1EwRkJRenROUVVNM1FqdEpRVU5HTEVWQlFVVXNSVUZCUlN4RFFVRkRMRU5CUVVNN1FVRkRVQ3hWUVVGUExGbEJRVmM3UVVGRGFFSXNXVUZCVHl4VFFVRlRMRU5CUVVNN1NVRkRiRUlzUTBGQlF6dEZRVU5JTEVOQlFVTTdPMEZCUlVZc1MwRkJTU3hEUVVGRExFbEJRVWtzUjBGQlJ5eFZRVUZUTEVsQlFVa3NSVUZCUlN4SlFVRkpMRVZCUVVVc1MwRkJTeXhGUVVGRk8wRkJRM1JETEU5QlFVa3NRMEZCUXl4SlFVRkpMRWRCUVVjc1NVRkJTU3hEUVVGRE8wRkJRMnBDTEU5QlFVa3NRMEZCUXl4SlFVRkpMRWRCUVVjc1NVRkJTU3hEUVVGRE8wRkJRMnBDTEU5QlFVa3NRMEZCUXl4TFFVRkxMRWRCUVVjc1MwRkJTeXhEUVVGRE8wVkJRM0JDTEVOQlFVTTdPMEZCUlVZc1MwRkJTU3hEUVVGRExGRkJRVkVzUjBGQlJ5eFpRVUYxUWp0UFFVRmtMRTlCUVU4c2VVUkJRVWNzUlVGQlJUczdRVUZEYmtNc1QwRkJTU3hEUVVGRExGVkJRVlVzUjBGQlJ5eEZRVUZGTEVOQlFVTTdRVUZEY2tJc1QwRkJTU3hEUVVGRExGbEJRVmtzUjBGQlJ5eEpRVUZKTEVOQlFVTTdRVUZEZWtJc1QwRkJTU3hEUVVGRExGRkJRVkVzUjBGQlJ5eFBRVUZQTEVOQlFVTTdSVUZEZWtJc1EwRkJRenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN08wRkJkMEpHTEV0QlFVa3NRMEZCUXl4UlFVRlJMRU5CUVVNc1UwRkJVeXhEUVVGRExGRkJRVkVzUjBGQlJ5eFZRVUZUTEVOQlFVTXNSVUZCUlR0QlFVTTNReXhQUVVGSkxFTkJRVU1zVlVGQlZTeERRVUZETEVsQlFVa3NRMEZCUXl4RFFVRkRMRU5CUVVNc1EwRkJRenRCUVVONFFpeFZRVUZQTEVsQlFVa3NRMEZCUXp0RlFVTmlMRU5CUVVNN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3UVVGNVFrWXNTMEZCU1N4RFFVRkRMRkZCUVZFc1EwRkJReXhUUVVGVExFTkJRVU1zVjBGQlZ5eEhRVUZITEZWQlFWTXNTVUZCU1N4RlFVRkZPenM3TzBGQlJXNUVMRlZCUVU4c1ZVRkJReXhQUVVGUExFVkJRVVVzVFVGQlRTeEZRVUZGTEV0QlFVc3NSVUZCU3p0QlFVTnFReXhUUVVGSk96dEJRVVZHTEdGQlFVc3NWVUZCVlN4RFFVRkRMRTFCUVUwc1EwRkJReXhWUVVGRExFZEJRVWNzUlVGQlJTeFJRVUZSTEVWQlFVczdRVUZEZUVNc2FVSkJRVkVzUTBGQlF5eEpRVUZKTEVOQlFVTXNSVUZCUlN4RlFVRkZMRTlCUVU4c1JVRkJSU3hOUVVGTkxFVkJRVVVzUzBGQlN5eERRVUZETEVOQlFVTTdVVUZETTBNc1JVRkJSU3hQUVVGUExFTkJRVU1zUTBGQlF6dE5RVU5pTEVOQlFVTXNUMEZCVFN4RFFVRkRMRVZCUVVVN1FVRkRWQ3hoUVVGTExGbEJRVmtzUTBGQlF5eERRVUZETEVWQlFVVXNUMEZCVHl4RlFVRkZMRTFCUVUwc1JVRkJSU3hMUVVGTExFTkJRVU1zUTBGQlF6dE5RVU01UXpzN1FVRkZSQ3hUUVVGSkxGRkJRVkVzUjBGQlJ5eEpRVUZKTEVOQlFVTXNUMEZCVHl4RlFVRkZMRTFCUVUwc1JVRkJSU3hMUVVGTExFTkJRVU1zUTBGQlF6dEJRVU0xUXl4WlFVRlBMRkZCUVZFc1EwRkJRenRKUVVOcVFpeERRVUZETzBWQlEwZ3NRMEZCUXpzN1FVRkZSaXhMUVVGSkxFTkJRVU1zVVVGQlVTeERRVUZETEZOQlFWTXNRMEZCUXl4WlFVRlpMRWRCUTNCRExGVkJRVk1zUjBGQlJ5eEZRVUZGTEU5QlFVOHNSVUZCUlN4TlFVRk5MRVZCUVVVc1MwRkJTeXhGUVVGRk96dEJRVVZ3UXl4VFFVRk5MRWxCUVVrc1MwRkJTeXhyUWtGQlowSXNUVUZCVFN4RFFVRkRMRWxCUVVrc2RVSkJRV2xDTEVkQlFVY3NhVUpCUVdFc1EwRkJRenRGUVVNM1JTeERJaXdpWm1sc1pTSTZJbkoxYm1VdWFuTWlMQ0p6YjNWeVkyVnpRMjl1ZEdWdWRDSTZXeUlnWEhRdkx5QlVhR1VnYlc5a2RXeGxJR05oWTJobFhHNGdYSFIyWVhJZ2FXNXpkR0ZzYkdWa1RXOWtkV3hsY3lBOUlIdDlPMXh1WEc0Z1hIUXZMeUJVYUdVZ2NtVnhkV2x5WlNCbWRXNWpkR2x2Ymx4dUlGeDBablZ1WTNScGIyNGdYMTkzWldKd1lXTnJYM0psY1hWcGNtVmZYeWh0YjJSMWJHVkpaQ2tnZTF4dVhHNGdYSFJjZEM4dklFTm9aV05ySUdsbUlHMXZaSFZzWlNCcGN5QnBiaUJqWVdOb1pWeHVJRngwWEhScFppaHBibk4wWVd4c1pXUk5iMlIxYkdWelcyMXZaSFZzWlVsa1hTbGNiaUJjZEZ4MFhIUnlaWFIxY200Z2FXNXpkR0ZzYkdWa1RXOWtkV3hsYzF0dGIyUjFiR1ZKWkYwdVpYaHdiM0owY3p0Y2JseHVJRngwWEhRdkx5QkRjbVZoZEdVZ1lTQnVaWGNnYlc5a2RXeGxJQ2hoYm1RZ2NIVjBJR2wwSUdsdWRHOGdkR2hsSUdOaFkyaGxLVnh1SUZ4MFhIUjJZWElnYlc5a2RXeGxJRDBnYVc1emRHRnNiR1ZrVFc5a2RXeGxjMXR0YjJSMWJHVkpaRjBnUFNCN1hHNGdYSFJjZEZ4MFpYaHdiM0owY3pvZ2UzMHNYRzRnWEhSY2RGeDBhV1E2SUcxdlpIVnNaVWxrTEZ4dUlGeDBYSFJjZEd4dllXUmxaRG9nWm1Gc2MyVmNiaUJjZEZ4MGZUdGNibHh1SUZ4MFhIUXZMeUJGZUdWamRYUmxJSFJvWlNCdGIyUjFiR1VnWm5WdVkzUnBiMjVjYmlCY2RGeDBiVzlrZFd4bGMxdHRiMlIxYkdWSlpGMHVZMkZzYkNodGIyUjFiR1V1Wlhod2IzSjBjeXdnYlc5a2RXeGxMQ0J0YjJSMWJHVXVaWGh3YjNKMGN5d2dYMTkzWldKd1lXTnJYM0psY1hWcGNtVmZYeWs3WEc1Y2JpQmNkRngwTHk4Z1JteGhaeUIwYUdVZ2JXOWtkV3hsSUdGeklHeHZZV1JsWkZ4dUlGeDBYSFJ0YjJSMWJHVXViRzloWkdWa0lEMGdkSEoxWlR0Y2JseHVJRngwWEhRdkx5QlNaWFIxY200Z2RHaGxJR1Y0Y0c5eWRITWdiMllnZEdobElHMXZaSFZzWlZ4dUlGeDBYSFJ5WlhSMWNtNGdiVzlrZFd4bExtVjRjRzl5ZEhNN1hHNGdYSFI5WEc1Y2JseHVJRngwTHk4Z1pYaHdiM05sSUhSb1pTQnRiMlIxYkdWeklHOWlhbVZqZENBb1gxOTNaV0p3WVdOclgyMXZaSFZzWlhOZlh5bGNiaUJjZEY5ZmQyVmljR0ZqYTE5eVpYRjFhWEpsWDE4dWJTQTlJRzF2WkhWc1pYTTdYRzVjYmlCY2RDOHZJR1Y0Y0c5elpTQjBhR1VnYlc5a2RXeGxJR05oWTJobFhHNGdYSFJmWDNkbFluQmhZMnRmY21WeGRXbHlaVjlmTG1NZ1BTQnBibk4wWVd4c1pXUk5iMlIxYkdWek8xeHVYRzRnWEhRdkx5QmZYM2RsWW5CaFkydGZjSFZpYkdsalgzQmhkR2hmWDF4dUlGeDBYMTkzWldKd1lXTnJYM0psY1hWcGNtVmZYeTV3SUQwZ1hDSmNJanRjYmx4dUlGeDBMeThnVEc5aFpDQmxiblJ5ZVNCdGIyUjFiR1VnWVc1a0lISmxkSFZ5YmlCbGVIQnZjblJ6WEc0Z1hIUnlaWFIxY200Z1gxOTNaV0p3WVdOclgzSmxjWFZwY21WZlh5Z3dLVHRjYmx4dVhHNWNiaThxS2lCWFJVSlFRVU5MSUVaUFQxUkZVaUFxS2x4dUlDb3FJSGRsWW5CaFkyc3ZZbTl2ZEhOMGNtRndJR0kxWW1Nd1l6VXdOV05pWW1JMllqRTFPVE0zWEc0Z0tpb3ZJaXdpSjNWelpTQnpkSEpwWTNRbk8xeHVYRzR2S2lwY2JpQXFJRWRsYm1WeWFXTWdZblZwYkdSbGNpQjBhR0YwSUhkdmRXeGtJSEIxYzJnZ2JtOWtaWE1nYVc1MGJ5QjBhR1VnWlVSVFRDQnpkR0ZqYXk1Y2JpQXFJRlZ6WlhJZ1kyOTFiR1FnYVc1b1pYSnBkQ0IwYUdseklIUnZJR1JsWm1sdVpTQjBhR1VnYm1WM0lHVkVVMHd1WEc0Z0tpQXRMUzFjYmlBcUlGUm9aU0JrWldaaGRXeDBJSE5sYldGdWRHbGpjeUJ2Ym14NUlHTnZiblJoYVc0Z2RHaGxjMlVnYjNCbGNtRjBhVzl1Y3pwY2JpQXFYRzRnS2lBeExpQmJjSFZ6YUYwZ09pQndkWE5vSUhSdklIUm9aU0JqZFhKeVpXNTBJSE4wWVdOclhHNGdLaUF5TGlCYlltVm5hVzVkT2lCamNtVmhkR1VnWVNCdVpYY2djM1JoWTJzZ1lXNWtJSE4zYVhSamFDQjBieUJwZEN4Y2JpQXFJQ0FnSUNBZ0lDQWdJQ0FnSUdGdVpDQjBhR1Z1SUhCMWMyZ2dkR2hsSUc1dlpHVWdhVzUwYnlCMGFHVWdjM1JoWTJzdVhHNGdLaUF6TGlCYlpXNWtYU0FnT2lCaFpuUmxjaUJ3ZFhOb0lIUm9aU0J1YjJSbElHbHVkRzhnZEdobElITjBZV05yTEZ4dUlDb2dJQ0FnSUNBZ0lDQWdJQ0FnWTJoaGJtZGxJSFJvWlNCamRYSnlaVzUwSUhOMFlXTnJJSFJ2SUhSb1pTQndjbVYyYVc5MWN5QnZibVV1WEc0Z0tpQTBMaUJiWlhocGRGMGdPaUJsZUdsMElIUm9aU0JqYjI1MFpYaDBJRzltSUhSb2FYTWdaVVJUVERzZ2RHaGxJR3hoYzNRZ2NtVnpkV3gwWEc0Z0tpQWdJQ0FnSUNBZ0lDQWdJQ0J2WmlCcGRDQjNiM1ZzWkNCaVpTQndZWE56WldRZ2RHOGdkR2hsSUhKbGRIVnliaUIyWVd4MVpTQnZabHh1SUNvZ0lDQWdJQ0FnSUNBZ0lDQWdkR2hwY3lCamFHRnBiaTVjYmlBcVhHNGdLaUJUZEdGamF5QmpiM1ZzWkNCaVpTQnVaWE4wWldRNklIZG9aVzRnVzJKbFoybHVYU0JoSUc1bGR5QnpkR0ZqYXlCcGJpQm1ZV04wSUdsMElIZHZkV3hrWEc0Z0tpQndkWE5vSUhSb1pTQnpkR0ZqYXlCcGJuUnZJSFJvWlNCd2NtVjJhVzkxY3lCdmJtVXVJRk52SUhSb1pTQnpkR0ZqYXlCamIyMXdjbWx6WlZ4dUlDb2dXMjV2WkdWZElHRnVaQ0JiYzNSaFkydGRMbHh1SUNvZ0xTMHRYRzRnS2lCQmJIUm9iM1ZuYUNCMGFHVWdaVVJUVENCcGJuTjBZVzVqWlNCemFHOTFiR1FnZDNKaGNDQjBhR1Z6WlNCaVlYTnBZeUJ2Y0dWeVlYUnBiMjV6WEc0Z0tpQjBieUJ0WVc1cGNIVnNZWFJsSUhSb1pTQnpkR0ZqYXl3Z2RHaGxlU0JoYkd3Z2JtVmxaQ0IwYnlCamIyNTJaWEowSUhSb1pTQnRaWFJvYjJSY2JpQXFJR05oYkd3Z2RHOGdibTlrWlhNdUlGTnZJQ2RTZFc1bEp5QndjbTkyYVdSbElHRWdkMkY1SUhSdklITnBiWEJzYVdaNUlIUm9aU0IzYjNKck9pQnBabHh1SUNvZ2RHaGxJR2x1YzNSaGJtTmxJR05oYkd3Z2RHaGxJRnRrWldacGJtVmRJRzFsZEdodlpDQjBhR1VnYm1GdFpTQnZaaUIwYUdVZ2JXVjBhRzlrTEZ4dUlDb2dhWFFnWTI5MWJHUWdZWE56YjJOcFlYUmxJSFJvWlNCdmNHVnlZVzVrSUc5bUlIUm9aU0JsUkZOTUlIZHBkR2dnZEdobElITjBZV05ySUcxaGJtbHdkV3hoZEdsdmJpNWNiaUFxSUVadmNpQmxlR0Z0Y0d4bE9seHVJQ3BjYmlBcUlDQWdJSFpoY2lCbFJGTk1JRDBnWm5WdVkzUnBiMjRvS1NCN2ZUdGNiaUFxSUNBZ0lHVkVVMHd1Y0hKdmRHOTBlWEJsTG5SeVlXNXpZV04wYVc5dUlEMGdVblZ1WlM1a1pXWnBibVVvSjNSeVlXNXpZV04wYVc5dUp5d2dKMkpsWjJsdUp5azdYRzRnS2lBZ0lDQmxSRk5NTG5CeWIzUnZkSGx3WlM1d2NtVWdQU0JTZFc1bExtUmxabWx1WlNnbmNISmxKeXdnSjNCMWMyZ25LVHRjYmlBcUlDQWdJR1ZFVTB3dWNISnZkRzkwZVhCbExuQmxjbVp2Y20wZ1BTQlNkVzVsTG1SbFptbHVaU2duY0dWeVptOXliU2NzSUNkd2RYTm9KeWs3WEc0Z0tpQWdJQ0JsUkZOTUxuQnliM1J2ZEhsd1pTNXdiM04wSUQwZ1VuVnVaUzVrWldacGJtVW9KM0J2YzNRbkxDQW5aVzVrSnlrN1hHNGdLbHh1SUNvZ1ZHaGxiaUIwYUdVZ1pVUlRUQ0JqYjNWc1pDQmlaU0IxYzJWa0lHRnpPbHh1SUNwY2JpQXFJQ0FnSUNodVpYY2daVVJUVENsY2JpQXFJQ0FnSUNBZ0xuUnlZVzV6WVdOMGFXOXVLQ2xjYmlBcUlDQWdJQ0FnTG5CeVpTaGpZaWxjYmlBcUlDQWdJQ0FnTG5CbGNtWnZjbTBvWTJJcFhHNGdLaUFnSUNBZ0lDNXdiM04wS0dOaUtWeHVJQ3BjYmlBcUlFRnVaQ0IwYUdVZ2MzUmhZMnNnZDI5MWJHUWdZbVU2WEc0Z0tseHVJQ29nSUNBZ1cxeHVJQ29nSUNBZ0lDQnViMlJsUENkMGNtRnVjMkZqZEdsdmJpY3NQbHh1SUNvZ0lDQWdJQ0J1YjJSbFBDZHdjbVVuTENCallqNWNiaUFxSUNBZ0lDQWdibTlrWlR3bmNISmxabTl5YlNjc0lHTmlQbHh1SUNvZ0lDQWdJQ0J1YjJSbFBDZHdiM04wSnl3Z1kySStYRzRnS2lBZ0lDQmRYRzRnS2x4dUlDb2dTRzkzWlhabGNpd2dkR2hwY3lCemFXMXdiR1VnWVhCd2NtOWhZMmdnZEdobElITmxiV0Z1ZEdsamN5QnlkV3hsY3lCaGJtUWdZVzVoYkhsNlpYSnpJSFJ2WEc0Z0tpQm5kV0Z5WVc1MFpXVWdkR2hsSUhOMFlXTnJJR2x6SUhaaGJHbGtMaUJHYjNJZ1pYaGhiWEJzWlN3Z2FXWWdkMlVnYUdGMlpTQmhJRzFoYkdadmNtMWxaRnh1SUNvZ2MzUmhZMnNnWW1WallYVnpaU0J2WmlCMGFHVWdabTlzYkc5M2FXNW5JR1ZFVTB3Z2NISnZaM0poYlRwY2JpQXFYRzRnS2lBZ0lDQW9ibVYzSUdWRVUwd3BYRzRnS2lBZ0lDQWdJQzV3YjNOMEtHTmlLVnh1SUNvZ0lDQWdJQ0F1Y0hKbEtHTmlLVnh1SUNvZ0lDQWdJQ0F1Y0dWeVptOXliU2hqWWlsY2JpQXFJQ0FnSUNBZ0xuUnlZVzV6WVdOMGFXOXVLQ2xjYmlBcVhHNGdLaUJVYUdVZ2NuVnVkR2x0WlNCdFlYa2djbVZ3YjNKMElHVnljbTkwSUdKbFkyRjFjMlVnZDJobGJpQW5MbkJ2YzNRb1kySXBKeUIwYUdWeVpTQnBjeUJ1YnlCemRHRmphMXh1SUNvZ1kzSmxZWFJsWkNCaWVTQjBhR1VnWW1WbmFXNXVhVzVuSUhOMFpYQXNJRzVoYldWc2VTQjBhR1VnSnk1d2NtVW9ZMklwSnlCcGJpQnZkWElnWTJGelpTNWNiaUFxSUU1bGRtVnlkR2hsYkdWemN5d2dkR2hsSUdWeWNtOXlJRzFsYzNOaFoyVWdhWE1nZEc5dklHeHZkeTFzWlhabGJDQm1iM0lnZEdobElHeGhibWQxWVdkbElIVnpaWElzWEc0Z0tpQnphVzVqWlNCMGFHVjVJSE5vYjNWc1pDQmpZWEpsSUc1dklITjBZV05ySUhSb2FXNW5jeUJoYm1RZ2MyaHZkV3hrSUc5dWJIa2dZMkZ5WlNCaFltOTFkQ0IwYUdVZ1pVUlRURnh1SUNvZ2FYUnpaV3htTGx4dUlDcGNiaUFxSUZSb1pTQnpiMngxZEdsdmJpQnBjeUIwYnlCd2NtOTJhV1JsSUdFZ1ltRnphV01nYzNSaFkyc2diM0prWlhKcGJtY2dZVzVoYkhsNlpYSWdZVzVrSUd4bGRDQjBhR1ZjYmlBcUlHeGhibWQxWVdkbElHUmxZMmxrWlNCb2IzY2dkRzhnWkdWelkzSnBZbVVnZEdobElHVnljbTl5TGlCQmJtUWdjMmx1WTJVZ2QyVWdaRzl1SjNRZ2FHRjJaVnh1SUNvZ1lXNTVJR052Ym5SbGVIUWdhVzVtYjNKdFlYUnBiMjRnWVdKdmRYUWdkbUZ5YVdGaWJHVnpMQ0J6WTI5d1pTQmhibVFnYjNSb1pYSWdaV3hsYldWdWRITmNiaUFxSUdGeklHRWdZMjl0Y0d4bGRHVWdjSEp2WjNKaGJXMXBibWNnYkdGdVozVmhaMlVzSUhkbElHOXViSGtnYm1WbFpDQjBieUJuZFdGeVlXNTBaV1VnZEdobElHOXlaR1Z5SUdselhHNGdLaUJqYjNKeVpXTjBMQ0JoYm1RZ2JXRnJaU0JwYm1OdmNuSmxZM1FnWTJGelpYTWdiV1ZoYm1sdVoyWjFiQzRnVFc5eVpXOTJaWElzSUhOcGJtTmxJSFJvWlNCaGJtRnNlWHBsY2x4dUlDb2dibVZsWkhNZ2RHOGdZVzVoYkhsNlpTQjBhR1VnYzNSaGRHVnpJSGRvWlc1bGRtVnlJSFJvWlNCcGJtTnZiV2x1WnlCdWIyUmxJR052YldWekxDQnBkQ0JwY3lCcGJpQm1ZV04wWEc0Z0tpQmhiaUJsZG1Gc2RXRjBhVzl1SUhCeWIyTmxjM01zSUhOdklIVnpaWElnWTI5MWJHUWdZMjl0WW1sdVpTQjBhR1VnWVc1aGJIbDZhVzVuSUdGdVpDQnBiblJsY25CeVpYUnBibWRjYmlBcUlIQm9ZWE5sSUdsdWRHOGdkR2hsSUhOaGJXVWdablZ1WTNScGIyNHVJRVp2Y2lCbGVHRnRjR3hsT2x4dUlDcGNiaUFxSUNBZ0lISjFiblJwYldVdWIyNWphR0Z1WjJVb0tHTnZiblJsZUhRc0lHNXZaR1VzSUhOMFlXTnJLU0E5UGlCN1hHNGdLaUFnSUNBZ0lDQWdMeThnU1dZZ2RHaGxJR05vWVc1blpTQnBjeUIwYnlCemQybDBZMmdnZEc4Z1lTQnVaWGNnYzNSaFkyc3NYRzRnS2lBZ0lDQWdJQ0FnTHk4Z2RHaGxJQ2R6ZEdGamF5Y2dhR1Z5WlNCM2IzVnNaQ0JpWlNCMGFHVWdibVYzSUhOMFlXTnJMbHh1SUNvZ0lDQWdJQ0FnSUhaaGNpQjdkSGx3WlN3Z1lYSm5jMzBnUFNCdWIyUmxPMXh1SUNvZ0lDQWdJQ0FnSUdsbUlDZ25jSEpsSnlBOVBUMGdkSGx3WlNrZ2UxeHVJQ29nSUNBZ0lDQWdJQ0FnWTI5dWRHVjRkQzVwYm1sMElEMGdkSEoxWlR0Y2JpQXFJQ0FnSUNBZ0lDQjlJR1ZzYzJVZ2FXWWdLQ2R3YjNOMEp5QTlQVDBnZEhsd1pTQW1KaUFoWTI5dWRHVjRkQzVwYm1sMEtTQjdYRzRnS2lBZ0lDQWdJQ0FnSUNCMGFISnZkeUJ1WlhjZ1JYSnliM0lvSjFSb1pYSmxJRzExYzNRZ1ltVWdiMjVsSUZ3aWNISmxYQ0lnYm05a1pTQmlaV1p2Y21VZ2RHaGxJRndpY0c5emRGd2lMaWNwTzF4dUlDb2dJQ0FnSUNBZ0lIMWNiaUFxSUNBZ0lIMHBPMXh1SUNwY2JpQXFJRmRwZEdnZ2MzVmphQ0JtWldGMGRYSmxMQ0JwWmlCMGFHVWdhVzVqYjIxcGJtY2dibTlrWlNCdmNpQjBhR1VnYzNSaFkyc2dhWE1nYldGc1ptOXliV1ZrTEZ4dUlDb2dhWFFnYzJodmRXeGtJSFJvY205M0lIUm9aU0JsY25KdmNpNGdWR2hsSUdWeWNtOXlJR05oY0hSMWNtVmtJR0o1SUhSb1pTQnBibk4wWVc1alpTQnNhV3RsSUhSb2FYTmNiaUFxSUdOdmRXeGtJR0psSUdFZ0oyTnZiWEJwYkdGMGFXOXVJR1Z5Y205eUp5NWNiaUFxWEc0Z0tpQlVhR1VnYm05MGFXTmxZV0pzWlNCbVlXTjBJR2x6SUZSb1pTQmpZV3hzWW1GamF5QnZaaUIwYUdVZ0oyOXVZMmhoYm1kbEp5QnBjeUJoWTNSMVlXeHNlU0JoSUhKbFpIVmpaWElzWEc0Z0tpQnpieUIxYzJWeUlHTnZkV3hrSUhSeVpXRjBJSFJvWlNCd2NtOWpaWE56SUc5bUlIUm9hWE1nWlhaaGJIVmhkR2x2YmlBbUlHRnVZV3g1ZW1sdVp5QmhjeUJoSUhKbFpIVmphVzVuWEc0Z0tpQndjbTlqWlhOeklHOXVJR0Z1SUdsdVptbHVhWFJsSUhOMGNtVmhiUzRnUVc1a0lITnBibU5sSUhkbElHaGhkbVVnWVNCemRHRmpheUJ0WVdOb2FXNWxMQ0JwWmlCMGFHVmNiaUFxSUhKbFpIVmpaWElnY21WMGRYSnVJRzV2ZEdocGJtY3NJSFJvWlNCemRHRmpheUIzYjNWc1pDQmlaU0JsYlhCMGVTNGdUM1JvWlhKM2FYTmxMQ0JwWmlCMGFHVWdjbVZrZFdObGNseHVJQ29nY21WMGRYSnVJR0VnYm1WM0lITjBZV05yTENCcGRDQjNiM1ZzWkNCeVpYQnNZV05sSUhSb1pTQnZiR1FnYjI1bExseHVJQ3BjYmlBcUlFRnVaQ0J3YkdWaGMyVWdibTkwWlNCMGFHVWdaWGhoYlhCc1pTQnBjeUJ0ZFdOb0lITnBiWEJzYVdacFpXUXVJRVp2Y2lCMGFHVmNiaUFxSUhKbFlXd2daVVJUVENCcGRDQnphRzkxYkdRZ1ltVWdkWE5sWkNCdmJteDVJR0Z6SUdGdUlHVnVkSEo1SUhSdklHUnBjM0JoZEdOb0lIUm9aU0JqYUdGdVoyVWdkRzljYmlBcUlIUm9aU0J5WldGc0lHaGhibVJzWlhKekxDQjNhR2xqYUNCdFlYa2dZMjl0Y0hKcGMyVWdjMlYyWlhKaGJDQnpkR0YwWlhNZ1lXNWtJR052YlhCdmJtVnVkSE11WEc0Z0tpOWNibVY0Y0c5eWRDQm1kVzVqZEdsdmJpQlNkVzVsS0NrZ2UzMWNibHh1THlvcVhHNGdLaUJJWld4d1pYSWdiV1YwYUc5a0lIUnZJR0oxYVd4a0lHbHVkR1Z5Wm1GalpTQnZaaUJoSUhOd1pXTnBabWxqSUVSVFRDNGdTWFFnZDI5MWJHUWdjbVYwZFhKdUlHRWdiV1YwYUc5a1hHNGdLaUJ2WmlCMGFHVWdSRk5NSUdGdVpDQjBhR1Z1SUhSb1pTQnBiblJsY21aaFkyVWdZMjkxYkdRZ1lYUjBZV05vSUdsMExseHVJQ3BjYmlBcUlGUm9aU0J5WlhSMWNtNXBibWNnWm5WdVkzUnBiMjRnZDI5MWJHUWdZWE56ZFcxbElIUm9ZWFFnZEdobElDZDBhR2x6SnlCcGJuTnBaR1VnYVhRZ2FYTWdkR2hsSUhKMWJuUnBiV1ZjYmlBcUlHOW1JSFJvWlNCc1lXNW5kV0ZuWlM0Z1FXNWtJSE5wYm1ObElIUm9aU0J0WlhSb2IyUWdhWFFnY21WMGRYSnVjeUIzYjNWc1pDQnlaWEYxYVhKbElIUnZJR0ZqWTJWemN5QnpiMjFsWEc0Z0tpQnRaVzFpWlhKeklHOW1JSFJvWlNBbmRHaHBjeWNzSUhSb1pTQW5kR2hwY3ljZ2MyaHZkV3hrSUdoaGRtVWdKM1JvYVhNdWMzUmhZMnNuSUdGdVpDQW5kR2hwY3k1amIyNTBaWGgwSjF4dUlDb2dZWE1nZEdobElHMWxkR2h2WkNCeVpYRjFhWEpsY3k1Y2JpQXFYRzRnS2lCSlppQnBkQ2R6SUdGdUlDZGxlR2wwSnlCdWIyUmxMQ0J0WldGdWN5QjBhR1VnYzJWemMybHZiaUJwY3lCbGJtUmxaQ0JoYm1RZ2RHaGxJR2x1ZEdWeWNISmxkR1Z5SUhOb2IzVnNaRnh1SUNvZ2NtVjBkWEp1SUdFZ2MzUmhZMnNnWTI5dWRHRnBibk1nYjI1c2VTQnZibVVnYm05a1pTQmhjeUIwYUdVZ2NtVnpkV3gwSUc5bUlIUm9aU0J6WlhOemFXOXVMQ0J2Y2lCMGFHVmNiaUFxSUhObGMzTnBiMjRnY21WMGRYSnVjeUJ1YjNSb2FXNW5MaUJHYjNJZ2IzUm9aWElnYVc1emRISjFZM1JwYjI1eklIUm9aU0J6ZEdGamF5QmpZVzRnYTJWbGNDQnpiMjFsWEc0Z0tpQmpiMjF3ZFhSbFpDQnlaWE4xYkhRZ2RHOGdjMmx0ZFd4aGRHVWdjbVZoYkNCemRHRmpheUJ0WVdOb2FXNWxMaUJDZFhRZ2FYUW5jeUJQU3lCMGJ5QnViM1FnZFhObElIUm9hWE5jYmlBcUlHWmxZWFIxY21VZ1lXNWtJR0ZzZDJGNWN5QnlaWFIxY200Z1lXNGdaVzF3ZEhrZ0ozTjBZV05ySnlCbGRtVnllWFJwYldVZ2RHaGxJQ2R2Ym1Ob1lXNW5aU2NnWjJWMFhHNGdLaUJqWVd4c1pXUWdZVzVrSUdsdWRHVnlkWEIwWldRdUlFbHVJSFJvYVhNZ2JXOWtaU0JwZENCdFpXRnVjeUIwYUdVZ2JHRnVaM1ZoWjJVZ2QyRnVkQ0IwYnlCclpXVndYRzRnS2lCaGJHd2djM1JoZEdWeklHSjVJR2wwYzJWc1ppNWNiaUFxWEc0Z0tpQlFiR1ZoYzJVZ2JtOTBaU0IwYUdGMElHWnliMjBnZEdobElHUmxjMk55YVhCMGFXOXVJR0ZpYjNabExDQW5aVzVrSnlCdFpXRnVjeUJ6ZEdGamF5QW9jM1ZpYzNSaFkyc3BYRzRnS2lCbGJtUnpMaUJKZENkeklIUnZkR0ZzYkhrZ2FYSnlaV3hsZG1GdWRDQjBieUFuWlhocGRDY3VYRzRnS2x4dUlDb2dWR2hsSUd4aGMzUWdZWEpuZFcxbGJuUWdKMlJ2WXljZ2FYTWdkMmhoZENCa1pYTnBaMjVsY2lCamIzVnNaQ0J3ZFhRZ2RHaGxJR1JsYzJOeWFYQjBhVzl1SUdGaWIzVjBYRzRnS2lCMGFHVWdiV1YwYUc5a0xpQkpaaUJ6WlhRc0lHbDBJSGR2ZFd4a0lHRndjR1Z1WkNCMGFHVWdKM0oxYm1VdVpHOWpKMXh1SUNvZ2NISnZjR1Z5ZEhrZ2FXNGdkR2hsSUdaMWJtTjBhVzl1SUdsMElISmxkSFZ5Ym5NdUlFRnVaQ0IwYUdWdUlIUm9aU0JzWVc1bmRXRm5aU0JwYm5OMFlXNWpaU0JqYjNWc1pGeHVJQ29nWTJGc2JDQmdVblZ1WlM1a2IyTjFiV1Z1ZENnOGFXNXpkR0Z1WTJVK0tXQWdkRzhnWjJWMElHRWdiV1YwYUc5a0lIUm9ZWFFnZDI5MWJHUWdjbVYwZFhKdVhHNGdLaUFuZXlCdFpYUm9iMlJPWVcxbE9pQmtaWE5qY21sd2RHbHZiaUI5SnlCM2FHVnVJR2wwSUdkdmRDQnBiblp2YTJWa0xseHVJQ292WEc1U2RXNWxMbVJsWm1sdVpTQTlJR1oxYm1OMGFXOXVLRzFsZEdodlpDd2dZWE1zSUdSdll5QTlJQ2NuS1NCN1hHNGdJSFpoY2lCaWRXbHNkQ0E5SUdaMWJtTjBhVzl1S0M0dUxtRnlaM01wSUh0Y2JpQWdJQ0IyWVhJZ2JtOWtaU3dnY21WemRXeDBjM1JoWTJzN1hHNGdJQ0FnYzNkcGRHTm9JQ2hoY3lrZ2UxeHVJQ0FnSUNBZ1kyRnpaU0FuY0hWemFDYzZYRzRnSUNBZ0lDQWdJRzV2WkdVZ1BTQnVaWGNnVW5WdVpTNU9iMlJsS0cxbGRHaHZaQ3dnWVhKbmN5d2dkR2hwY3k1emRHRmpheWs3WEc0Z0lDQWdJQ0FnSUhSb2FYTXVjM1JoWTJzdWNIVnphQ2h1YjJSbEtUdGNiaUFnSUNBZ0lDQWdjbVZ6ZFd4MGMzUmhZMnNnUFZ4dUlDQWdJQ0FnSUNBZ0lIUm9hWE11YjI1amFHRnVaMlVvZEdocGN5NWpiMjUwWlhoMExDQnViMlJsTENCMGFHbHpMbk4wWVdOcktUdGNiaUFnSUNBZ0lDQWdZbkpsWVdzN1hHNGdJQ0FnSUNCallYTmxJQ2RpWldkcGJpYzZYRzRnSUNBZ0lDQWdJSFJvYVhNdVgzQnlaWFp6ZEdGamF5QTlJSFJvYVhNdWMzUmhZMnM3WEc0Z0lDQWdJQ0FnSUhSb2FYTXVjM1JoWTJzZ1BTQmJYVHRjYmlBZ0lDQWdJQ0FnYm05a1pTQTlJRzVsZHlCU2RXNWxMazV2WkdVb2JXVjBhRzlrTENCaGNtZHpMQ0IwYUdsekxuTjBZV05yS1R0Y2JpQWdJQ0FnSUNBZ2RHaHBjeTV6ZEdGamF5NXdkWE5vS0c1dlpHVXBPeUFnTHk4Z1lYTWdkR2hsSUdacGNuTjBJRzV2WkdVZ2IyWWdkR2hsSUc1bGR5QnpkR0ZqYXk1Y2JpQWdJQ0FnSUNBZ2NtVnpkV3gwYzNSaFkyc2dQVnh1SUNBZ0lDQWdJQ0FnSUhSb2FYTXViMjVqYUdGdVoyVW9kR2hwY3k1amIyNTBaWGgwTENCdWIyUmxMQ0IwYUdsekxuTjBZV05yS1R0Y2JpQWdJQ0FnSUNBZ1luSmxZV3M3WEc0Z0lDQWdJQ0JqWVhObElDZGxibVFuT2x4dUlDQWdJQ0FnSUNCdWIyUmxJRDBnYm1WM0lGSjFibVV1VG05a1pTaHRaWFJvYjJRc0lHRnlaM01zSUhSb2FYTXVjM1JoWTJzcE8xeHVJQ0FnSUNBZ0lDQjBhR2x6TG5OMFlXTnJMbkIxYzJnb2JtOWtaU2s3SUNBdkx5QjBhR1VnYkdGemRDQnViMlJsSUc5bUlIUm9aU0J6ZEdGamF5NWNiaUFnSUNBZ0lDQWdkR2hwY3k1emRHRmpheUE5WEc0Z0lDQWdJQ0FnSUNBZ2RHaHBjeTVmY0hKbGRuTjBZV05yT3lBdkx5QnpkMmwwWTJnZ1ltRmpheUIwYnlCMGFHVWdjSEpsZG1sdmRYTWdjM1JoWTJzdVhHNGdJQ0FnSUNBZ0lISmxjM1ZzZEhOMFlXTnJJRDFjYmlBZ0lDQWdJQ0FnSUNCMGFHbHpMbTl1WTJoaGJtZGxLSFJvYVhNdVkyOXVkR1Y0ZEN3Z2JtOWtaU3dnZEdocGN5NXpkR0ZqYXlrN1hHNGdJQ0FnSUNBZ0lHSnlaV0ZyTzF4dUlDQWdJQ0FnWTJGelpTQW5aWGhwZENjNlhHNGdJQ0FnSUNBZ0lHNXZaR1VnUFNCdVpYY2dVblZ1WlM1T2IyUmxLRzFsZEdodlpDd2dZWEpuY3l3Z2RHaHBjeTV6ZEdGamF5azdYRzRnSUNBZ0lDQWdJSFJvYVhNdWMzUmhZMnN1Y0hWemFDaHViMlJsS1RzZ0lDOHZJSFJvWlNCc1lYTjBJRzV2WkdVZ2IyWWdkR2hsSUhOMFlXTnJMbHh1SUNBZ0lDQWdJQ0J5WlhOMWJIUnpkR0ZqYXlBOVhHNGdJQ0FnSUNBZ0lDQWdkR2hwY3k1dmJtTm9ZVzVuWlNoMGFHbHpMbU52Ym5SbGVIUXNJRzV2WkdVc0lIUm9hWE11YzNSaFkyc3BPMXh1SUNBZ0lDQWdJQ0JwWmlBb0lYSmxjM1ZzZEhOMFlXTnJLU0I3WEc0Z0lDQWdJQ0FnSUNBZ2RHaHliM2NnYm1WM0lFVnljbTl5S0dBblpYaHBkQ2NnYm05a1pTQW5KSHR1YjJSbExuUjVjR1Y5SnlCemFHOTFiR1JjYmlBZ0lDQWdJQ0FnSUNBZ0lISmxkSFZ5YmlCaElISmxjM1ZzZEhOMFlXTnJMbUFwTzF4dUlDQWdJQ0FnSUNCOVhHNGdJQ0FnSUNBZ0lISmxkSFZ5YmlCeVpYTjFiSFJ6ZEdGamExc3dYVHRjYmlBZ0lDQjlYRzRnSUNBZ0x5OGdTV1lnZEdobElHaGhibVJzWlhJZ2RYQmtZWFJsY3lCMGFHVWdjM1JoWTJzc0lHbDBJSGR2ZFd4a0lISmxjR3hoWTJVZ2RHaGxJR1Y0YVhOMGFXNW5JRzl1WlM1Y2JpQWdJQ0JwWmlBb2NtVnpkV3gwYzNSaFkyc3BJSHRjYmlBZ0lDQWdJSFJvYVhNdWMzUmhZMnNnUFNCeVpYTjFiSFJ6ZEdGamF6dGNiaUFnSUNCOVhHNGdJQ0FnY21WMGRYSnVJSFJvYVhNN1hHNGdJSDA3WEc0Z0lHSjFhV3gwTG5KMWJtVWdQU0I3WEc0Z0lDQWdKMkZ6SnpvZ1lYTXNYRzRnSUNBZ0oyUnZZeWM2SUdSdll5eGNiaUFnSUNBbmJXVjBhRzlrSnpvZ2JXVjBhRzlrTEZ4dUlDQjlPMXh1SUNCeVpYUjFjbTRnWW5WcGJIUTdYRzU5TzF4dVhHNHZLaXBjYmlBcUlFZGxibVZ5WVhSbElHRWdiV1YwYUc5a0lIUm9ZWFFnZDI5MWJHUWdjbVYwZFhKdUlHRnNiQ0JrYjJOMWJXVnVkSE1nYjJZZ2RHaGxJRzFsZEdodlpITXNYRzRnS2lCcGJpQmhJR1p2Y20wZ2IyWWdKM3NnYldWMGFHOWtUbUZ0WlRvZ1pHVnpZM0pwY0hScGIyNGdmU2N1WEc0Z0tseHVJQ29nVkdobElHRnlaM1Z0Wlc1MElHMTFjM1FnWW1VZ2RHaGxJR3hoYm1kMVlXZGxJR2x1YzNSaGJtTmxJSGRwZEdnZ1lXeHNJR1JsWm1sdVpXUWdiV1YwYUc5a2N5NWNiaUFxTDF4dVVuVnVaUzV3ZFdKc2FYTm9JRDBnWm5WdVkzUnBiMjRvYVc1emRHRnVZMlVwSUh0Y2JpQWdkbUZ5SUdkbGJtVnlZWFJsWkNBOUlFOWlhbVZqZEM1clpYbHpLR2x1YzNSaGJtTmxLUzV5WldSMVkyVW9LR1J2WXl3Z2JtRnRaU2tnUFQ0Z2UxeHVJQ0FnSUhaaGNpQnRaWFJvYjJRZ1BTQnBibk4wWVc1alpWdHVZVzFsWFR0Y2JpQWdJQ0JwWmlBb2JXVjBhRzlrTG5KMWJtVXBJSHRjYmlBZ0lDQWdJR1J2WTF0dVlXMWxYU0E5SUcxbGRHaHZaQzV5ZFc1bExtUnZZenRjYmlBZ0lDQjlYRzRnSUgwc0lIdDlLVHRjYmlBZ2NtVjBkWEp1SUdaMWJtTjBhVzl1S0NrZ2UxeHVJQ0FnSUhKbGRIVnliaUJuWlc1bGNtRjBaV1E3WEc0Z0lIMDdYRzU5TzF4dVhHNVNkVzVsTGs1dlpHVWdQU0JtZFc1amRHbHZiaWgwZVhCbExDQmhjbWR6TENCemRHRmpheWtnZTF4dUlDQjBhR2x6TG5SNWNHVWdQU0IwZVhCbE8xeHVJQ0IwYUdsekxtRnlaM01nUFNCaGNtZHpPMXh1SUNCMGFHbHpMbk4wWVdOcklEMGdjM1JoWTJzN1hHNTlPMXh1WEc1U2RXNWxMa1YyWVd4MVlYUmxJRDBnWm5WdVkzUnBiMjRvWTI5dWRHVjRkQ0E5SUh0OUtTQjdYRzRnSUhSb2FYTXVYMkZ1WVd4NWVtVnljeUE5SUZ0ZE8xeHVJQ0IwYUdsekxsOXBiblJsY25CeVpYUmxjaUE5SUc1MWJHdzdYRzRnSUhSb2FYTXVYMk52Ym5SbGVIUWdQU0JqYjI1MFpYaDBPMXh1ZlR0Y2JseHVMeW9xWEc0Z0tpQkJibUZzZVhwbGNpQmpiM1ZzWkNCeVpXTmxhWFpsSUhSb1pTQnpkR0ZqYXlCamFHRnVaMlVnWm5KdmJTQW5VblZ1WlNObGRtRnNkV0YwWlNjc1hHNGdLaUJoYm1RZ2FYUWdkMjkxYkdRZ1ltVWdZMkZzYkdWa0lIZHBkR2dnZEdobElHRnlaM1Z0Wlc1MGN5QmhjeUIwYUdVZ1puVnVZM1JwYjI0Z1pHVnpZM0pwWW1Wek9seHVJQ3BjYmlBcUlDQWdJQ0JTZFc1bExuQnliM1J2ZEhsd1pTNWxkbUZzZFdGMFpTZ29ZMjl1ZEdWNGRDd2dZMmhoYm1kbExDQnpkR0ZqYXlrZ1BUNGdlMXh1SUNvZ0lDQWdJQ0FnSUM4dklDNHVMbHh1SUNvZ0lDQWdJSDBwTzF4dUlDcGNiaUFxSUZOdklIUm9aU0JoYm1Gc2VYcGxjaUJqYjNWc1pDQmlaVHBjYmlBcVhHNGdLaUFnSUNCbWRXNWpkR2x2YmloamIyNTBaWGgwTENCamFHRnVaMlVzSUhOMFlXTnJLU0I3WEc0Z0tpQWdJQ0FnSUM4dklFUnZJSE52YldVZ1kyaGxZMnNnWVc1a0lHMWhlV0psSUdOb1lXNW5aV1FnZEdobElHTnZiblJsZUhRdVhHNGdLaUFnSUNBZ0lDOHZJRlJvWlNCdVpYaDBJR0Z1WVd4NWVtVnlJSFJ2SUhSb1pTQnBiblJsY25CeVpYUmxjaUIzYjNWc1pDQmhZMk5sY0hRZ2RHaGxJR0ZzZEdWeWJtRjBaV1JjYmlBcUlDQWdJQ0FnTHk4Z1kyOXVkR1Y0ZENCaGN5QjBhR1VnWVhKbmRXMWxiblFnSjJOdmJuUmxlSFFuTGx4dUlDb2dJQ0FnSUNCamIyNTBaWGgwTG5OdmJXVkdiR0ZuSUQwZ2RISjFaVHRjYmlBcUlDQWdJQ0FnTHk4Z1YyaGxiaUIwYUdWeVpTQnBjeUIzY205dVp5d2dkR2h5YjNjZ2FYUXVYRzRnS2lBZ0lDQWdJSFJvY205M0lHNWxkeUJGY25KdmNpZ25VMjl0WlNCaGJtRnNlWHBwYm1jZ1pYSnliM0luS1R0Y2JpQXFJQ0FnSUgwN1hHNGdLbHh1SUNvZ1RtOTBaU0IwYUdGMElIUm9aU0JoYm1Gc2VYcGxjaUFvSjJFbktTQjNiM1ZzWkNCaVpTQnBiblp2YTJWa0lIZHBkR2dnWlcxd2RIa2dKM1JvYVhNbklHOWlhbVZqZEN4Y2JpQXFJSE52SUhSb1pTQm1kVzVqZEdsdmJpQnlaV3hwWlhNZ2IyNGdKM1JvYVhNbklITm9iM1ZzWkNCaWFXNWtJR2wwYzJWc1ppQm1hWEp6ZEM1Y2JpQXFMMXh1VW5WdVpTNUZkbUZzZFdGMFpTNXdjbTkwYjNSNWNHVXVZVzVoYkhsNlpYSWdQU0JtZFc1amRHbHZiaWhoS1NCN1hHNGdJSFJvYVhNdVgyRnVZV3g1ZW1WeWN5NXdkWE5vS0dFcE8xeHVJQ0J5WlhSMWNtNGdkR2hwY3p0Y2JuMDdYRzVjYmk4cUtseHVJQ29nVDI1bElFVjJZV3gxWVhSbElHTmhiaUJ2Ym14NUlHaGhkbVVnYjI1bElHbHVkR1Z5Y0hKbGRHVnlMQ0JoYm1RZ2FYUWdkMjkxYkdRZ2NtVjBkWEp1WEc0Z0tpQjBhR1VnWm5WdVkzUnBiMjRnWTI5MWJHUWdZMjl1YzNWdFpTQmxkbVZ5ZVNCemRHRmpheUJqYUdGdVoyVWdabkp2YlNBblVuVnVaU05sZG1Gc2RXRjBaU2N1WEc0Z0tseHVJQ29nVkdobElHTnZaR1VnYVhNZ1lTQnNhWFIwYkdVZ1kyOXRjR3hwWTJGMFpXUTZJSGRsSUdoaGRtVWdkSGR2SUd0cGJtUnpJRzltSUNkeVpXUjFZMmx1WnljNlhHNGdLaUJ2Ym1VZ2FYTWdkRzhnY21Wa2RXTmxJR0ZzYkNCaGJtRnNlWHBsY25NZ2QybDBhQ0IwYUdVZ2MybHVaMnhsSUdsdVkyOXRhVzVuSUdOb1lXNW5aU3hjYmlBcUlHRnViM1JvWlhJZ2FYTWdkRzhnY21Wa2RXTmxJR0ZzYkNCcGJtTnZiV2x1WnlCamFHRnVaMlZ6SUhkcGRHZ2dkR2hwY3lCaGJtRnNlWHBsY25NZ0t5QnBiblJsY25CeVpYUmxjaTVjYmlBcVhHNGdLaUJVYUdVZ1lXNWhiSGw2WlhJZ1lXNWtJR2x1ZEdWeWNISmxkR1Z5SUhOb2IzVnNaQ0JqYUdGdVoyVWdkR2hsSUdOdmJuUmxlSFFzSUhSdklHMWxiVzl5YVhwbElIUm9aVnh1SUNvZ2MzUmhkR1Z6SUc5bUlIUm9aU0JsZG1Gc2RXRjBhVzl1TGlCVWFHVWdaR2xtWm1WeVpXNWpaU0JwY3lCcGJuUmxjbkJ5WlhSbGNpQnphRzkxYkdRZ2NtVjBkWEp1SUc5dVpWeHVJQ29nYm1WM0lITjBZV05ySUdsbUlHbDBJRzVsWldSeklIUnZJSFZ3WkdGMFpTQjBhR1VnWlhocGMzUnBibWNnYjI1bExpQlVhR1VnYzNSaFkyc2dhWFFnY21WMGRYSnVjeUIzYjNWc1pGeHVJQ29nY21Wd2JHRmpaU0IwYUdVZ1pYaHBjM1JwYm1jZ2IyNWxMQ0J6YnlCaGJubDBhR2x1WnlCemRHbHNiQ0JwYmlCMGFHVWdiMnhrSUc5dVpTQjNiM1ZzWkNCaVpTQjNhWEJsWkZ4dUlDb2diM1YwTGlCVWFHVWdhVzUwWlhKd2NtVjBaWElnWTI5MWJHUWdjbVYwZFhKdUlHNXZkR2hwYm1jZ0tDZDFibVJsWm1sdVpXUW5LU0IwYnlCclpXVndJSFJvWlNCemRHRmphMXh1SUNvZ2RXNTBiM1ZqYUdWa0xseHVJQ3BjYmlBcUlGUm9aU0JoYm1Gc2VYcGxjbk1nWVc1a0lHbHVkR1Z5Y0hKbGRHVnlJR052ZFd4a0lHTm9ZVzVuWlNCMGFHVWdKMk52Ym5SbGVIUW5JSEJoYzNNZ2RHOGdkR2hsYlM1Y2JpQXFJRUZ1WkNCemFXNWpaU0IzWlNCdFlYa2dkWEJrWVhSbElIUm9aU0J6ZEdGamF5QmhjeUJoWW05MlpTd2dkR2hsSUdOdmJuUmxlSFFnYzJodmRXeGtJRzFsYlc5eWFYcGxYRzRnS2lCMGFHOXpaU0JwYm1admNtMWhkR2x2YmlCdWIzUWdkRzhnWW1VZ2IzWmxjbmR5YVhSMFpXNGdkMmhwYkdVZ2RHaGxJSE4wWVdOcklHZGxkQ0IzYVhCbFpDQnZkWFF1WEc0Z0tseHVJQ29nUVc1a0lHbG1JSFJvWlNCcGJuUmxjbkJ5WlhScGJtY2dibTlrWlNCcGN5QjBhR1VnWlhocGRDQnViMlJsSUc5bUlIUm9aU0J6WlhOemFXOXVMQ0JwYm5SbGNuQnlaWFJsY2x4dUlDb2djMmh2ZFd4a0lISmxkSFZ5YmlCaElHNWxkeUJ6ZEdGamF5QmpiMjUwWVdsdWN5QnZibXg1SUc5dVpTQm1hVzVoYkNCeVpYTjFiSFFnYm05a1pTNGdTV1lnZEdobGNtVmNiaUFxSUdseklHNXZJSE4xWTJnZ2JtOWtaU3dnZEdobElISmxjM1ZzZENCdlppQjBhR2x6SUhObGMzTnBiMjRnYVhNZ0ozVnVaR1ZtYVc1bFpDY3VYRzRnS2k5Y2JsSjFibVV1UlhaaGJIVmhkR1V1Y0hKdmRHOTBlWEJsTG1sdWRHVnljSEpsZEdWeUlEMGdablZ1WTNScGIyNG9hVzV3ZENrZ2UxeHVJQ0F2THlCVWFHVWdZM1Z6ZEc5dGFYcGxaQ0JzWVc1bmRXRm5aU0J6YUc5MWJHUWdaMmwyWlNCMGFHVWdaR1ZtWVhWc2RDQmpiMjUwWlhoMExseHVJQ0J5WlhSMWNtNGdLR052Ym5SbGVIUXNJR05vWVc1blpTd2djM1JoWTJzcElEMCtJSHRjYmlBZ0lDQjBjbmtnZTF4dUlDQWdJQ0FnTHk4Z1FXNWhiSGw2WlhKeklHTnZkV3hrSUdOb1lXNW5aU0IwYUdVZ1kyOXVkR1Y0ZEM1Y2JpQWdJQ0FnSUhSb2FYTXVYMkZ1WVd4NWVtVnljeTV5WldSMVkyVW9LR04wZUN3Z1lXNWhiSGw2WlhJcElEMCtJSHRjYmlBZ0lDQWdJQ0FnWVc1aGJIbDZaWEl1WTJGc2JDaDdmU3dnWTI5dWRHVjRkQ3dnWTJoaGJtZGxMQ0J6ZEdGamF5azdYRzRnSUNBZ0lDQjlMQ0JqYjI1MFpYaDBLVHRjYmlBZ0lDQjlJR05oZEdOb0tHVXBJSHRjYmlBZ0lDQWdJSFJvYVhNdVgyaGhibVJzWlVWeWNtOXlLR1VzSUdOdmJuUmxlSFFzSUdOb1lXNW5aU3dnYzNSaFkyc3BPMXh1SUNBZ0lIMWNiaUFnSUNBdkx5QkJablJsY2lCaGJtRnNlWHBsSUdsMExDQnBiblJsY25CeVpYUWdkR2hsSUc1dlpHVWdZVzVrSUhKbGRIVnliaUIwYUdVZ2JtVjNJSE4wWVdOcklDaHBaaUJoYm5rcExseHVJQ0FnSUhaaGNpQnVaWGRUZEdGamF5QTlJR2x1Y0hRb1kyOXVkR1Y0ZEN3Z1kyaGhibWRsTENCemRHRmpheWs3WEc0Z0lDQWdjbVYwZFhKdUlHNWxkMU4wWVdOck8xeHVJQ0I5TzF4dWZUdGNibHh1VW5WdVpTNUZkbUZzZFdGMFpTNXdjbTkwYjNSNWNHVXVYMmhoYm1Sc1pVVnljbTl5SUQxY2JtWjFibU4wYVc5dUtHVnljaXdnWTI5dWRHVjRkQ3dnWTJoaGJtZGxMQ0J6ZEdGamF5a2dlMXh1SUNBdkx5QlVUMFJQT2lCbGVIQmhibVFnYVhRZ2RHOGdjSEp2ZG1sa1pTQnRiM0psSUhOdmNHaHBjM1JwWXlCa1pXSjFaMmRwYm1jZ2JXVnpjMkZuWlM1Y2JpQWdkR2h5YjNjZ2JtVjNJRVZ5Y205eUtHQlhhR1Z1SUdOb1lXNW5aU0FrZTJOb1lXNW5aUzUwZVhCbGZTQmpiMjFsY3lCbGNuSnZjaUFuSkh0bGNuSjlKeUJvWVhCd1pXNWxaR0FwTzF4dWZUdGNibHh1WEc1Y2JpOHFLaUJYUlVKUVFVTkxJRVpQVDFSRlVpQXFLbHh1SUNvcUlDNHZjM0pqTDNKMWJtVXVhbk5jYmlBcUtpOGlYU3dpYzI5MWNtTmxVbTl2ZENJNklpSjlcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4uL2Rpc3QvcnVuZS5qc1xuICoqIG1vZHVsZSBpZCA9IDU5XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIndXNlIHN0cmljdCc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIFJ1bnRpbWUoKSB7fVxuXG4vKipcbiAqIFdoZW4gdGhlIHN0YWNrIG9mIERTTCBjaGFuZ2VzLCBldmFsdWF0ZSB0aGUgTGFuZ3VhZ2UuTm9kZS5cbiAqL1xuUnVudGltZS5wcm90b3R5cGUub25jaGFuZ2UgPSBmdW5jdGlvbihpbnN0YW5jZSwgY2hhbmdlLCBzdGFjaykge1xuICAvLyBTaW5jZSB3ZSBkb24ndCBuZWVkIHRvIGtlZXAgdGhpbmdzIGluIHN0YWNrIHVudGlsIHdlIGhhdmVcbiAgLy8gcmVhbCBhbmFseXplcnMsIHRoZSAnb25jaGFuZ2UnIGhhbmRsZXIgd291bGQgcmV0dXJuIGVtcHR5IHN0YWNrXG4gIC8vIHRvIGxldCB0aGUgbGFuZ3VhZ2UgcnVudGltZSBjbGVhciB0aGUgc3RhY2sgZXZlcnkgaW5zdHJ1Y3Rpb24uXG4gIHRoaXNbY2hhbmdlLnR5cGVdLmFwcGx5KHRoaXMsIGNoYW5nZS5hcmdzKTtcbiAgLy8gcmV0dXJuIGVtcHR5ICdoYW5kbGVkJyBzdGFjayB0byBsZXQgUnVuZSBrZWVwIG5vIHN0YXRlcyBvZlxuICAvLyBldmVyeSBpbnN0cnVjdGlvbiwgZXhjZXB0IHRoZSByZXN1bHQuXG4gIHJldHVybiBbIHRoaXMucXVldWUgXTtcbn07XG5cblJ1bnRpbWUuRGVmZXJyZWQgPSBmdW5jdGlvbigpIHtcbiAgdmFyIHByb21pc2UgPSBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgdGhpcy5yZXNvbHZlID0gcmVzb2x2ZTtcbiAgICB0aGlzLnJlamVjdCA9IGZ1bmN0aW9uKGUpIHtcbiAgICAgIHJlamVjdChlKTtcbiAgICAgIHRocm93IGU7XG4gICAgfTtcbiAgfSk7XG4gIHRoaXMucHJvbWlzZSA9IHByb21pc2U7XG4gIHJldHVybiB0aGlzO1xufTtcblxuUnVudGltZS5Db250ZXh0ID0gZnVuY3Rpb24oZW52aXJvbm1lbnQpIHtcbiAgdGhpcy5kZWZlcnJlZCA9IG5ldyBSdW50aW1lLkRlZmVycmVkKCk7XG4gIGZvciAodmFyIG5hbWUgaW4gZW52aXJvbm1lbnQpIHtcbiAgICB0aGlzW25hbWVdID0gZW52aXJvbm1lbnRbbmFtZV07XG4gIH1cbn07XG5SdW50aW1lLkNvbnRleHQucHJvdG90eXBlLnJldHVybnMgPSBmdW5jdGlvbihyZXR2YXIpIHtcbiAgdGhpcy5yZXR2YXIgPSByZXR2YXI7XG4gIHRoaXMuZGVmZXJyZWQucmVzb2x2ZShyZXR2YXIpO1xufTtcblxuUnVudGltZS5wcm90b3R5cGUuc3RhcnQgPSBmdW5jdGlvbigpIHtcbiAgdmFyIGRlZmVycmVkID0gbmV3IFJ1bnRpbWUuRGVmZXJyZWQoKTtcbiAgdGhpcy5xdWV1ZSA9IGRlZmVycmVkLnByb21pc2U7XG4gIHRoaXMucmVzb2x2ZSA9IGRlZmVycmVkLnJlc29sdmU7XG4gIHRoaXMucmVqZWN0ID0gZGVmZXJyZWQucmVqZWN0O1xuICB0aGlzLnJlc3VsdCA9IG51bGw7IC8vIHRoZSByZXN1bHQgZnJvbSBlYWNoIHN0ZXAuXG4gIHRoaXMuZW52aXJvbm1lbnQgPSB7fTtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG5SdW50aW1lLnByb3RvdHlwZS5hcyA9IGZ1bmN0aW9uKG5hbWUpIHtcbiAgdGhpcy5xdWV1ZSA9IHRoaXMucXVldWUudGhlbigoKSA9PiB7XG4gICAgaWYgKCd1bmRlZmluZWQnICE9PSB0eXBlb2YgdGhpcy5lbnZpcm9ubWVudFtuYW1lXSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdTY29wZWQgdmFyaWFibGUgXFwnJyArIG5hbWUgKyAnXFwnIGRlZmluZWQgdHdpY2UnKTtcbiAgICB9XG4gICAgaWYgKCd1bmRlZmluZWQnICE9PSB0eXBlb2YgUnVudGltZS5Db250ZXh0LnByb3RvdHlwZVtuYW1lXSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdSZWZ1c2UgdG8gbmFtZSB2YXJpYWJsZSBhcyBjb250ZXh0IHJldmVyc2VkIHdvcmQ6ICcgK1xuICAgICAgICAnXFwnJyArIG5hbWUgKyAnXFwnJyk7XG4gICAgfVxuICAgIHRoaXMuZW52aXJvbm1lbnRbbmFtZV0gPSB0aGlzLnJlc3VsdDtcbiAgICByZXR1cm4gdGhpcy5yZXN1bHQ7XG4gIH0pXG4gIC5jYXRjaCgoZXJyKSA9PiB7XG4gICAgdGhpcy5yZWplY3QoZXJyKTtcbiAgfSk7XG59O1xuXG5SdW50aW1lLnByb3RvdHlwZS5kb25lID0gZnVuY3Rpb24oKSB7XG4gIHRoaXMucmVzb2x2ZSgpOyAvLyBTbyB0aGUgcXVldWUgc3RhcnQgdG8gZXhlY3V0ZS5cbn07XG5cblJ1bnRpbWUucHJvdG90eXBlLl9jcmVhdGVDb250ZXh0ID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiBuZXcgUnVudGltZS5Db250ZXh0KHRoaXMuZW52aXJvbm1lbnQpO1xufTtcblxuUnVudGltZS5wcm90b3R5cGUubmV4dCA9IGZ1bmN0aW9uKHN0ZXApIHtcbiAgdGhpcy5xdWV1ZSA9IHRoaXMucXVldWUudGhlbigoKSA9PiB7XG4gICAgdmFyIGNvbnRleHQgPSB0aGlzLl9jcmVhdGVDb250ZXh0KCk7XG4gICAgc3RlcChjb250ZXh0LCB0aGlzLnJlc3VsdCk7XG4gICAgcmV0dXJuIGNvbnRleHQuZGVmZXJyZWQucHJvbWlzZTtcbiAgfSkudGhlbigocmVzdWx0KSA9PiB7XG4gICAgaWYgKHJlc3VsdC5uZXh0KSB7XG4gICAgICAvLyBJZiBpdCdzIGFsc28gYSBQbGF5bGFuZyBzdGF0ZW1lbnRzLCBjb25jYXQgaXQuXG4gICAgICByZXR1cm4gcmVzdWx0LnF1ZXVlO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBObyBtYXR0ZXIgaXQncyB2YWx1ZSBmcm9tIGFuIG9yZGluYXJ5IGZ1bmN0aW9uIG9yXG4gICAgICAvLyBhIFByb21pc2UsIHJldHVybmluZyBpdCBpcyBsZWdpdCBmb3IgYSBQcm9taXNlLlxuICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG4gIH0pXG4gIC50aGVuKChyZXN1bHQpID0+IHtcbiAgICAvLyBHZXQgdGhlIHJlc3VsdCBmcm9tIG5ld1Byb21pc2UgYW5kIHNldCBpdC5cbiAgICB0aGlzLnJlc3VsdCA9IHJlc3VsdDtcbiAgfSlcbiAgLmNhdGNoKChlcnIpID0+IHtcbiAgICB0aGlzLnJlamVjdChlcnIpO1xuICB9KTtcbn07XG5cblJ1bnRpbWUucHJvdG90eXBlLm1hdGNoID0gZnVuY3Rpb24oKSB7XG4gIC8vIENvbGxlY3QgYWxsICdjYXNlJyBQcm9taXNlcyBoZXJlLlxuICB0aGlzLnF1ZXVlID0gdGhpcy5xdWV1ZS50aGVuKCgpID0+IHtcbiAgICB0aGlzLm1hdGNoaW5nID0gW107XG4gICAgdGhpcy5tYXRjaGluZy5tYXRjaGVkID0gZmFsc2U7XG4gIH0pXG4gIC5jYXRjaCgoZXJyKSA9PiB7XG4gICAgdGhpcy5yZWplY3QoZXJyKTtcbiAgfSk7XG59O1xuXG4vLyBNYXRjaGluZyBlbmQ6IGV4ZWN1dGUgYWxsIG1hdGNoaW5nIGNhc2VzLlxuUnVudGltZS5wcm90b3R5cGUuZW5kID0gZnVuY3Rpb24oKSB7XG4gIHRoaXMucXVldWUgPSB0aGlzLnF1ZXVlLnRoZW4oKCkgPT4ge1xuICAgIHRoaXMubWF0Y2hpbmcgPSBudWxsO1xuICB9KS5jYXRjaCgoZXJyKSA9PiB7XG4gICAgdGhpcy5yZWplY3QoZXJyKTtcbiAgfSk7XG59O1xuXG4vKipcbiAqIGBwcmVkYCBtdXN0IGJlIGEgc3luYyBmdW5jdGlvbiBvbmx5IHJldHVybiB0cnVlIG9yIGZhbHNlLlxuICogSWYgbXVsdGlwbGUgYGNhc2VgIGNhbiBtYXRjaCB0aGUgcmVzdWx0LCBvbmx5IHRoZSBmaXJzdCBtYXRjaGluZyBvbmVcbiAqIHdpbGwgYmUgZXhlY3V0ZWQgYW5kIGxlYXZlIHRoZSByZXN1bHQuXG4gKi9cblJ1bnRpbWUucHJvdG90eXBlLmNhc2UgPSBmdW5jdGlvbihwcmVkKSB7XG4gIHRoaXMucXVldWUgPSB0aGlzLnF1ZXVlLnRoZW4oKCkgPT4ge1xuICAgIHZhciBpZCA9IHRoaXMubWF0Y2hpbmcubGVuZ3RoO1xuICAgIC8vIEluIGEgYG1hdGNoYCwgd2UgZG9uJ3QgdXBkYXRlIHRoZSByZXN1bHQsXG4gICAgLy8gc28gZXZlcnkgYGNhc2VgIGNhbiBqdWRnZSBpZiBpdCdzIHRydWUuXG4gICAgdmFyIHByZWRyZXN1bHQgPSBwcmVkKHRoaXMucmVzdWx0KTtcbiAgICB0aGlzLm1hdGNoaW5nW2lkXSA9IHByZWRyZXN1bHQ7XG4gICAgcmV0dXJuIGlkO1xuICB9KS5jYXRjaCgoZXJyKSA9PiB7XG4gICAgdGhpcy5yZWplY3QoZXJyKTtcbiAgfSk7XG59O1xuXG5SdW50aW1lLnByb3RvdHlwZS50byA9IGZ1bmN0aW9uKHN0ZXApIHtcbiAgLy8gSXQncyBhbHdheXMgY2FzZS4udG8sIHNvIHdlIG9ubHkgbmVlZCB0byBjb25jYXRcbiAgLy8gJ3RvJyBwcm9taXNlIGFmdGVyIHRoZSAnY2FzZScgcHJvbWlzZS5cbiAgdGhpcy5xdWV1ZSA9IHRoaXMucXVldWUudGhlbigoaWQpID0+IHtcbiAgICAvLyBPbmx5IGFwcGVuZCB0aGUgc3RlcCBpZiB0aGUgcHJldmlvdXMgb25lIGlzIHRydWUuXG4gICAgaWYgKCF0aGlzLm1hdGNoaW5nLm1hdGNoZWQgJiYgdGhpcy5tYXRjaGluZ1tpZF0pIHtcbiAgICAgIHRoaXMubWF0Y2hpbmcubWF0Y2hlZCA9IHRydWU7XG4gICAgICB2YXIgY29udGV4dCA9IHRoaXMuX2NyZWF0ZUNvbnRleHQoKTtcbiAgICAgIHN0ZXAoY29udGV4dCwgdGhpcy5yZXN1bHQpO1xuICAgICAgcmV0dXJuIGNvbnRleHQuZGVmZXJyZWQucHJvbWlzZTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHRoaXMucmVzdWx0O1xuICAgIH1cbiAgfSkudGhlbigocmVzdWx0KSA9PiB7XG4gICAgaWYgKHJlc3VsdC5uZXh0KSB7XG4gICAgICByZXR1cm4gcmVzdWx0LnF1ZXVlO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cbiAgfSlcbiAgLnRoZW4oKHJlc3VsdCkgPT4ge1xuICAgIGlmICh0aGlzLm1hdGNoaW5nLm1hdGNoZWQpIHtcbiAgICAgIHRoaXMucmVzdWx0ID0gcmVzdWx0O1xuICAgIH1cbiAgICAvLyBPciwgZG8gbm90IHVwZGF0ZSB0aGUgcmVzdWx0IGl0IGdvdC5cbiAgfSlcbiAgLmNhdGNoKChlcnIpID0+IHtcbiAgICB0aGlzLnJlamVjdChlcnIpO1xuICB9KTtcbn07XG5cbi8qKlxuICogUmVtZW1iZXIgd2Ugd2lsbCBzd2FwIGBsb29wYCBhbmQgYHVudGlsYCBhdCBzeW50YXggbGV2ZWwsIHNvXG4gKiB3ZSBjYW4gZ2V0IHRoZSBwcmVkIGJlZm9yZSB3ZSBydW4gdGhlIGxvb3AuXG4gKlxuICogMS4gRmlyc3QgYXBwbHkgdGhlIGBwcmVkYCBvbiB0aGUgcHJldmlvdXMgcmVzdWx0LlxuICogMi4gSWYgdHJ1ZSwgY29uY2F0IHRoZSBpdGVyYXRpb24gYW5kIHRoZSBuZXcgcHJlZGljdGluZyBzdGVwIGFmdGVyXG4gKiAgICB0aGUgbG9vcGluZyBwcm9taXNlLiBBbmQgdGhlIHByZWRpY2F0aW9uIHdpbGwgY29uY2F0IG5ldyBpdGVyYXRpb25cbiAqICAgIGludG8gdGhlIHRoZSBwcm9taXNlIGlmIGl0J3MgdHJ1ZS5cbiAqXG4gKiBOb3RlOiBvbmx5IHdoZW4gdGhlIHByZWRpY2F0aW9uIGdpdmVzIGZhbHNlLCB0aGUgbG9vcGluZyBwcm9taXNlIGZvclxuICogdGhlIG1haW4gcXVldWUgd2lsbCByZXNvbHZlLCBzbyBpdCBjYW4gcnVuIHRoZSBsb29waW5nIHdoaWxlIGJsb2NraW5nXG4gKiB0aGUgbWFpbiBxdWV1ZS5cbiAqL1xuUnVudGltZS5wcm90b3R5cGUubG9vcCA9IGZ1bmN0aW9uKHN0ZXApIHtcbiAgdGhpcy5xdWV1ZSA9IHRoaXMucXVldWUudGhlbigoKSA9PiB7XG4gICAgdmFyIGxvb3BxdWV1ZSA9IHRoaXMubG9vcGluZy5sb29waW5ncHJvbWlzZTtcbiAgICB2YXIgcHJlZCA9IHRoaXMubG9vcGluZy5wcmVkO1xuXG4gICAgdmFyIGFwcGVuZCA9ICgpID0+IHtcbiAgICAgIHRoaXMubG9vcGluZy5sb29waW5ncHJvbWlzZS5wcm9taXNlID1cbiAgICAgICAgbG9vcHF1ZXVlLnRoZW4oKCkgPT4ge1xuICAgICAgICAgIHZhciBjb250ZXh0ID0gdGhpcy5fY3JlYXRlQ29udGV4dCgpO1xuICAgICAgICAgIHN0ZXAoY29udGV4dCwgdGhpcy5yZXN1bHQpO1xuICAgICAgICAgIHJldHVybiBjb250ZXh0LmRlZmVycmVkLnByb21pc2U7XG4gICAgICAgIH0pLnRoZW4oKHJlc3VsdCkgPT4ge1xuICAgICAgICAgIGlmIChyZXN1bHQubmV4dCkge1xuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdC5xdWV1ZTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKChyZXN1bHQpID0+IHtcbiAgICAgICAgICB0aGlzLnJlc3VsdCA9IHJlc3VsdDtcbiAgICAgICAgICBpZiAoIXByZWQodGhpcy5yZXN1bHQpKSB7XG4gICAgICAgICAgICBhcHBlbmQoKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5sb29waW5nLnF1ZXVlYmxvY2tlci5yZXNvbHZlKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9O1xuICAgIC8vIEZpcnN0IGl0ZXJhdGlvbi5cbiAgICBpZiAoIXByZWQodGhpcy5yZXN1bHQpKSB7XG4gICAgICBhcHBlbmQoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5sb29waW5nLnF1ZXVlYmxvY2tlci5yZXNvbHZlKCk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLmxvb3BpbmcucXVldWVibG9ja2VyLnByb21pc2U7XG4gIH0pXG4gIC5jYXRjaCgoZXJyKSA9PiB7XG4gICAgdGhpcy5yZWplY3QoZXJyKTtcbiAgfSk7XG59O1xuXG4vKipcbiAqIFJlbWVtYmVyIHdlIHdpbGwgc3dhcCBgbG9vcGAgYW5kIGB1bnRpbGAgYXQgc3ludGF4IGxldmVsLCBzb1xuICogd2UgY2FuIGdldCB0aGUgcHJlZCBiZWZvcmUgd2UgcnVuIHRoZSBsb29wLlxuICovXG5SdW50aW1lLnByb3RvdHlwZS51bnRpbCA9IGZ1bmN0aW9uKHByZWQpIHtcbiAgdGhpcy5xdWV1ZSA9IHRoaXMucXVldWUudGhlbigoKSA9PiB7XG4gICAgdGhpcy5sb29waW5nID0ge1xuICAgICAgJ3ByZWQnOiBwcmVkLFxuICAgICAgJ2xvb3Bpbmdwcm9taXNlJzogUHJvbWlzZS5yZXNvbHZlKCksXG4gICAgICAncXVldWVibG9ja2VyJzogbmV3IFJ1bnRpbWUuRGVmZXJyZWQoKVxuICAgIH07XG4gICAgLy8gQWZ0ZXIgdGhlIGxvb3BpbmcsIGNsZWFyIGl0LlxuICAgIHRoaXMubG9vcGluZy5xdWV1ZWJsb2NrZXIucHJvbWlzZSA9IFxuICAgICAgdGhpcy5sb29waW5nLnF1ZXVlYmxvY2tlci5wcm9taXNlLnRoZW4oKCkgPT4ge1xuICAgICAgICB0aGlzLmxvb3BpbmcgPSBudWxsO1xuICAgICAgfSk7XG4gIH0pXG4gIC5jYXRjaCgoZXJyKSA9PiB7XG4gICAgdGhpcy5yZWplY3QoZXJyKTtcbiAgfSk7XG59O1xuXG5SdW50aW1lLnByb3RvdHlwZS5hbnkgPSBmdW5jdGlvbigpIHtcbiAgdmFyIHVwZGF0ZVJlc3VsdCA9IChyZXN1bHQpID0+IHtcbiAgICB0aGlzLnJlc3VsdCA9IHJlc3VsdDtcbiAgfTtcbiAgdmFyIGdlbmVyYXRlUHJvbWlzZSA9IChzdGVwKSA9PiB7XG4gICAgdmFyIG5ld1Byb21pc2UgPSBzdGVwKHRoaXMucmVzdWx0KTtcbiAgICBpZiAobmV3UHJvbWlzZS5uZXh0KSB7XG4gICAgICByZXR1cm4gbmV3UHJvbWlzZS5xdWV1ZTtcbiAgICB9IGVsc2UgaWYgKG5ld1Byb21pc2UudGhlbikge1xuICAgICAgcmV0dXJuIG5ld1Byb21pc2U7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIE9yZGluYXJ5IGZ1bmN0aW9uIHdpbGwgcmV0dXJuIHRoZSByZXN1bHQuXG4gICAgICB2YXIgbmV3UmVzdWx0ID0gbmV3UHJvbWlzZTtcbiAgICAgIHVwZGF0ZVJlc3VsdChuZXdSZXN1bHQpO1xuICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShuZXdSZXN1bHQpO1xuICAgIH1cbiAgfTtcbiAgdmFyIGNhbmRpZGF0ZXMgPSBBcnJheS5mcm9tKGFyZ3VtZW50cyk7XG4gIHRoaXMucXVldWUgPSB0aGlzLnF1ZXVlLnRoZW4oKCkgPT4ge1xuICAgIHJldHVybiBQcm9taXNlLnJhY2UoY2FuZGlkYXRlcy5tYXAoKHN0ZXApID0+IHtcbiAgICAgIHJldHVybiBnZW5lcmF0ZVByb21pc2Uoc3RlcCk7XG4gICAgfSkpLnRoZW4odXBkYXRlUmVzdWx0KTtcbiAgfSlcbiAgLmNhdGNoKChlcnIpID0+IHtcbiAgICB0aGlzLnJlamVjdChlcnIpO1xuICB9KTtcbn07XG5cblJ1bnRpbWUucHJvdG90eXBlLmFueSA9IGZ1bmN0aW9uKCkge1xuICB2YXIgYW55ID0gdGhpcy5fcmFjZU9yQWxsKCdyYWNlJyk7XG4gIHZhciBjYW5kaWRhdGVzID0gQXJyYXkuZnJvbShhcmd1bWVudHMpO1xuICBhbnkuY2FsbCh0aGlzLCBjYW5kaWRhdGVzKTtcbn07XG5cblJ1bnRpbWUucHJvdG90eXBlLmFsbCA9IGZ1bmN0aW9uKCkge1xuICB2YXIgYWxsID0gdGhpcy5fcmFjZU9yQWxsKCdhbGwnKTtcbiAgdmFyIGNhbmRpZGF0ZXMgPSBBcnJheS5mcm9tKGFyZ3VtZW50cyk7XG4gIGFsbC5jYWxsKHRoaXMsIGNhbmRpZGF0ZXMpO1xufTtcblxuUnVudGltZS5wcm90b3R5cGUuX3JhY2VPckFsbCA9IGZ1bmN0aW9uKHByb21pc2VNZXRob2QpIHtcbiAgdmFyIGdlbmVyYXRlZCA9IChjYW5kaWRhdGVzKSA9PiB7XG4gICAgdmFyIHVwZGF0ZVJlc3VsdCA9IChyZXN1bHQpID0+IHtcbiAgICAgIHRoaXMucmVzdWx0ID0gcmVzdWx0O1xuICAgIH07XG4gICAgdmFyIGdlbmVyYXRlUHJvbWlzZSA9IChzdGVwKSA9PiB7XG4gICAgICB2YXIgY29udGV4dCA9IG5ldyBSdW50aW1lLkNvbnRleHQoKTtcbiAgICAgIHN0ZXAoY29udGV4dCwgdGhpcy5yZXN1bHQpO1xuICAgICAgcmV0dXJuIGNvbnRleHQuZGVmZXJyZWQucHJvbWlzZVxuICAgICAgICAudGhlbigocmVzdWx0KSA9PiB7XG4gICAgICAgICAgaWYgKHJlc3VsdC5uZXh0KSB7XG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0LnF1ZXVlO1xuICAgICAgICAgIH0gZWxzZSBpZiAocmVzdWx0LnRoZW4pIHtcbiAgICAgICAgICAgIHJldHVybiByZXN1bHQudGhlbih1cGRhdGVSZXN1bHQpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyBPcmRpbmFyeSBmdW5jdGlvbiB3aWxsIHJldHVybiB0aGUgcGxhaW4gcmVzdWx0LlxuICAgICAgICAgICAgLy8gQW5kIHdlIG5lZWQgdG8gdHVybiBpdCBhcyBhIHByb21pc2UuXG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHJlc3VsdCk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9O1xuICAgIHRoaXMucXVldWUgPSB0aGlzLnF1ZXVlLnRoZW4oKCkgPT4ge1xuICAgICAgLy8gQ2F0Y2ggZ2VuZXJhdGVQcm9taXNlLlxuICAgICAgdHJ5IHtcbiAgICAgICAgdmFyIGFsbFByb21pc2VzID0gY2FuZGlkYXRlcy5tYXAoKHN0ZXApID0+IHtcbiAgICAgICAgICByZXR1cm4gZ2VuZXJhdGVQcm9taXNlKHN0ZXApO1xuICAgICAgICB9KTtcbiAgICAgICAgaWYgKCdyYWNlJyA9PT0gcHJvbWlzZU1ldGhvZCkge1xuICAgICAgICAgIHJldHVybiBQcm9taXNlLnJhY2UoYWxsUHJvbWlzZXMpLnRoZW4odXBkYXRlUmVzdWx0KTtcbiAgICAgICAgfSBlbHNlIGlmICgnYWxsJyA9PT0gcHJvbWlzZU1ldGhvZCkge1xuICAgICAgICAgIHJldHVybiBQcm9taXNlLmFsbChhbGxQcm9taXNlcykudGhlbih1cGRhdGVSZXN1bHQpO1xuICAgICAgICB9XG4gICAgICB9IGNhdGNoKGUpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihlKTtcbiAgICAgICAgdGhyb3cgZTtcbiAgICAgIH1cbiAgICB9KVxuICAgIC5jYXRjaCgoZXJyKSA9PiB7XG4gICAgICB0aGlzLnJlamVjdChlcnIpO1xuICAgIH0pO1xuICB9O1xuICByZXR1cm4gZ2VuZXJhdGVkO1xufTtcblxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9wbGF5bGFuZy5ydW50aW1lLmpzXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSB7IFwiZGVmYXVsdFwiOiByZXF1aXJlKFwiY29yZS1qcy9saWJyYXJ5L2ZuL2FycmF5L2Zyb21cIiksIF9fZXNNb2R1bGU6IHRydWUgfTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4uL34vYmFiZWwtcnVudGltZS9jb3JlLWpzL2FycmF5L2Zyb20uanNcbiAqKiBtb2R1bGUgaWQgPSA2MVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwicmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9lczYuc3RyaW5nLml0ZXJhdG9yJyk7XG5yZXF1aXJlKCcuLi8uLi9tb2R1bGVzL2VzNi5hcnJheS5mcm9tJyk7XG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4uLy4uL21vZHVsZXMvJC5jb3JlJykuQXJyYXkuZnJvbTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4uL34vYmFiZWwtcnVudGltZS9+L2NvcmUtanMvbGlicmFyeS9mbi9hcnJheS9mcm9tLmpzXG4gKiogbW9kdWxlIGlkID0gNjJcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIid1c2Ugc3RyaWN0JztcbnZhciBjdHggICAgICAgICA9IHJlcXVpcmUoJy4vJC5jdHgnKVxuICAsICRkZWYgICAgICAgID0gcmVxdWlyZSgnLi8kLmRlZicpXG4gICwgdG9PYmplY3QgICAgPSByZXF1aXJlKCcuLyQudG8tb2JqZWN0JylcbiAgLCBjYWxsICAgICAgICA9IHJlcXVpcmUoJy4vJC5pdGVyLWNhbGwnKVxuICAsIGlzQXJyYXlJdGVyID0gcmVxdWlyZSgnLi8kLmlzLWFycmF5LWl0ZXInKVxuICAsIHRvTGVuZ3RoICAgID0gcmVxdWlyZSgnLi8kLnRvLWxlbmd0aCcpXG4gICwgZ2V0SXRlckZuICAgPSByZXF1aXJlKCcuL2NvcmUuZ2V0LWl0ZXJhdG9yLW1ldGhvZCcpO1xuJGRlZigkZGVmLlMgKyAkZGVmLkYgKiAhcmVxdWlyZSgnLi8kLml0ZXItZGV0ZWN0JykoZnVuY3Rpb24oaXRlcil7IEFycmF5LmZyb20oaXRlcik7IH0pLCAnQXJyYXknLCB7XG4gIC8vIDIyLjEuMi4xIEFycmF5LmZyb20oYXJyYXlMaWtlLCBtYXBmbiA9IHVuZGVmaW5lZCwgdGhpc0FyZyA9IHVuZGVmaW5lZClcbiAgZnJvbTogZnVuY3Rpb24gZnJvbShhcnJheUxpa2UvKiwgbWFwZm4gPSB1bmRlZmluZWQsIHRoaXNBcmcgPSB1bmRlZmluZWQqLyl7XG4gICAgdmFyIE8gICAgICAgPSB0b09iamVjdChhcnJheUxpa2UpXG4gICAgICAsIEMgICAgICAgPSB0eXBlb2YgdGhpcyA9PSAnZnVuY3Rpb24nID8gdGhpcyA6IEFycmF5XG4gICAgICAsIG1hcGZuICAgPSBhcmd1bWVudHNbMV1cbiAgICAgICwgbWFwcGluZyA9IG1hcGZuICE9PSB1bmRlZmluZWRcbiAgICAgICwgaW5kZXggICA9IDBcbiAgICAgICwgaXRlckZuICA9IGdldEl0ZXJGbihPKVxuICAgICAgLCBsZW5ndGgsIHJlc3VsdCwgc3RlcCwgaXRlcmF0b3I7XG4gICAgaWYobWFwcGluZyltYXBmbiA9IGN0eChtYXBmbiwgYXJndW1lbnRzWzJdLCAyKTtcbiAgICAvLyBpZiBvYmplY3QgaXNuJ3QgaXRlcmFibGUgb3IgaXQncyBhcnJheSB3aXRoIGRlZmF1bHQgaXRlcmF0b3IgLSB1c2Ugc2ltcGxlIGNhc2VcbiAgICBpZihpdGVyRm4gIT0gdW5kZWZpbmVkICYmICEoQyA9PSBBcnJheSAmJiBpc0FycmF5SXRlcihpdGVyRm4pKSl7XG4gICAgICBmb3IoaXRlcmF0b3IgPSBpdGVyRm4uY2FsbChPKSwgcmVzdWx0ID0gbmV3IEM7ICEoc3RlcCA9IGl0ZXJhdG9yLm5leHQoKSkuZG9uZTsgaW5kZXgrKyl7XG4gICAgICAgIHJlc3VsdFtpbmRleF0gPSBtYXBwaW5nID8gY2FsbChpdGVyYXRvciwgbWFwZm4sIFtzdGVwLnZhbHVlLCBpbmRleF0sIHRydWUpIDogc3RlcC52YWx1ZTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgZm9yKHJlc3VsdCA9IG5ldyBDKGxlbmd0aCA9IHRvTGVuZ3RoKE8ubGVuZ3RoKSk7IGxlbmd0aCA+IGluZGV4OyBpbmRleCsrKXtcbiAgICAgICAgcmVzdWx0W2luZGV4XSA9IG1hcHBpbmcgPyBtYXBmbihPW2luZGV4XSwgaW5kZXgpIDogT1tpbmRleF07XG4gICAgICB9XG4gICAgfVxuICAgIHJlc3VsdC5sZW5ndGggPSBpbmRleDtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG59KTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4uL34vYmFiZWwtcnVudGltZS9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNi5hcnJheS5mcm9tLmpzXG4gKiogbW9kdWxlIGlkID0gNjNcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIi8vIDcuMS4xMyBUb09iamVjdChhcmd1bWVudClcbnZhciBkZWZpbmVkID0gcmVxdWlyZSgnLi8kLmRlZmluZWQnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXQpe1xuICByZXR1cm4gT2JqZWN0KGRlZmluZWQoaXQpKTtcbn07XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuLi9+L2JhYmVsLXJ1bnRpbWUvfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy8kLnRvLW9iamVjdC5qc1xuICoqIG1vZHVsZSBpZCA9IDY0XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iXSwic291cmNlUm9vdCI6IiJ9