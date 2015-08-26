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
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	exports.Playlang = Playlang;
	
	var _demoPlaylangInterfaceJs = __webpack_require__(1);
	
	var _demoPlaylangRuntimeJs = __webpack_require__(3);
	
	function Playlang() {
	  this._runtime = new _demoPlaylangRuntimeJs.Runtime();
	  this._interface = new _demoPlaylangInterfaceJs.Interface(this._runtime);
	  return this._interface;
	}

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	exports.Interface = Interface;
	
	var _distRuneJs = __webpack_require__(2);
	
	console.log('>>>>>>> Rune: ', _distRuneJs.Rune.prototype);
	
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
	Interface.prototype.done = _distRuneJs.Rune.define('exit', 'exit');
	Interface.prototype.next = _distRuneJs.Rune.define('next', 'push');
	Interface.prototype.match = _distRuneJs.Rune.define('match', 'begin');
	Interface.prototype.end = _distRuneJs.Rune.define('end', 'end');
	Interface.prototype['case'] = _distRuneJs.Rune.define('case', 'push');
	Interface.prototype.to = _distRuneJs.Rune.define('to', 'push');
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
/* 2 */
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
		console.log('>>>>>> Rune');
	
	/***/ }
	/******/ ])));
	//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgM2YyYzY2OTYxYzI2YjBiODJlY2YiLCJ3ZWJwYWNrOi8vLy4vc3JjL3J1bmUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVCQUFlO0FBQ2Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7QUN0Q0EsYUFBWSxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBcUdOLFVBQVMsSUFBSSxHQUFHLEVBQUU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUE0QnpCLEtBQUksQ0FBQyxNQUFNLEdBQUcsVUFBUyxNQUFNLEVBQUUsRUFBRSxFQUFZO09BQVYsR0FBRyx5REFBRyxFQUFFOztBQUN6QyxPQUFJLEtBQUssR0FBRyxTQUFSLEtBQUssR0FBcUI7QUFDNUIsU0FBSSxJQUFJLEVBQUUsV0FBVyxDQUFDOzt1Q0FEQSxJQUFJO0FBQUosV0FBSTs7O0FBRTFCLGFBQVEsRUFBRTtBQUNSLFlBQUssTUFBTTtBQUNULGFBQUksR0FBRyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDL0MsYUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDdEIsb0JBQVcsR0FDVCxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUNoRCxlQUFN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S0FBSyxFQUFFOztBQUVwQyxTQUFNLElBQUksS0FBSyxrQkFBZ0IsTUFBTSxDQUFDLElBQUksdUJBQWlCLEdBQUcsaUJBQWEsQ0FBQztFQUM3RSxDQUFDO0FBQ0YsUUFBTyxDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUMsQyIsImZpbGUiOiJydW5lLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGV4cG9ydHM6IHt9LFxuIFx0XHRcdGlkOiBtb2R1bGVJZCxcbiBcdFx0XHRsb2FkZWQ6IGZhbHNlXG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiB3ZWJwYWNrL2Jvb3RzdHJhcCAzZjJjNjY5NjFjMjZiMGI4MmVjZlxuICoqLyIsIid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBHZW5lcmljIGJ1aWxkZXIgdGhhdCB3b3VsZCBwdXNoIG5vZGVzIGludG8gdGhlIGVEU0wgc3RhY2suXG4gKiBVc2VyIGNvdWxkIGluaGVyaXQgdGhpcyB0byBkZWZpbmUgdGhlIG5ldyBlRFNMLlxuICogLS0tXG4gKiBUaGUgZGVmYXVsdCBzZW1hbnRpY3Mgb25seSBjb250YWluIHRoZXNlIG9wZXJhdGlvbnM6XG4gKlxuICogMS4gW3B1c2hdIDogcHVzaCB0byB0aGUgY3VycmVudCBzdGFja1xuICogMi4gW2JlZ2luXTogY3JlYXRlIGEgbmV3IHN0YWNrIGFuZCBzd2l0Y2ggdG8gaXQsXG4gKiAgICAgICAgICAgICBhbmQgdGhlbiBwdXNoIHRoZSBub2RlIGludG8gdGhlIHN0YWNrLlxuICogMy4gW2VuZF0gIDogYWZ0ZXIgcHVzaCB0aGUgbm9kZSBpbnRvIHRoZSBzdGFjayxcbiAqICAgICAgICAgICAgIGNoYW5nZSB0aGUgY3VycmVudCBzdGFjayB0byB0aGUgcHJldmlvdXMgb25lLlxuICogNC4gW2V4aXRdIDogZXhpdCB0aGUgY29udGV4dCBvZiB0aGlzIGVEU0w7IHRoZSBsYXN0IHJlc3VsdFxuICogICAgICAgICAgICAgb2YgaXQgd291bGQgYmUgcGFzc2VkIHRvIHRoZSByZXR1cm4gdmFsdWUgb2ZcbiAqICAgICAgICAgICAgIHRoaXMgY2hhaW4uXG4gKlxuICogU3RhY2sgY291bGQgYmUgbmVzdGVkOiB3aGVuIFtiZWdpbl0gYSBuZXcgc3RhY2sgaW4gZmFjdCBpdCB3b3VsZFxuICogcHVzaCB0aGUgc3RhY2sgaW50byB0aGUgcHJldmlvdXMgb25lLiBTbyB0aGUgc3RhY2sgY29tcHJpc2VcbiAqIFtub2RlXSBhbmQgW3N0YWNrXS5cbiAqIC0tLVxuICogQWx0aG91Z2ggdGhlIGVEU0wgaW5zdGFuY2Ugc2hvdWxkIHdyYXAgdGhlc2UgYmFzaWMgb3BlcmF0aW9uc1xuICogdG8gbWFuaXB1bGF0ZSB0aGUgc3RhY2ssIHRoZXkgYWxsIG5lZWQgdG8gY29udmVydCB0aGUgbWV0aG9kXG4gKiBjYWxsIHRvIG5vZGVzLiBTbyAnUnVuZScgcHJvdmlkZSBhIHdheSB0byBzaW1wbGlmeSB0aGUgd29yazogaWZcbiAqIHRoZSBpbnN0YW5jZSBjYWxsIHRoZSBbZGVmaW5lXSBtZXRob2QgdGhlIG5hbWUgb2YgdGhlIG1ldGhvZCxcbiAqIGl0IGNvdWxkIGFzc29jaWF0ZSB0aGUgb3BlcmFuZCBvZiB0aGUgZURTTCB3aXRoIHRoZSBzdGFjayBtYW5pcHVsYXRpb24uXG4gKiBGb3IgZXhhbXBsZTpcbiAqXG4gKiAgICB2YXIgZURTTCA9IGZ1bmN0aW9uKCkge307XG4gKiAgICBlRFNMLnByb3RvdHlwZS50cmFuc2FjdGlvbiA9IFJ1bmUuZGVmaW5lKCd0cmFuc2FjdGlvbicsICdiZWdpbicpO1xuICogICAgZURTTC5wcm90b3R5cGUucHJlID0gUnVuZS5kZWZpbmUoJ3ByZScsICdwdXNoJyk7XG4gKiAgICBlRFNMLnByb3RvdHlwZS5wZXJmb3JtID0gUnVuZS5kZWZpbmUoJ3BlcmZvcm0nLCAncHVzaCcpO1xuICogICAgZURTTC5wcm90b3R5cGUucG9zdCA9IFJ1bmUuZGVmaW5lKCdwb3N0JywgJ2VuZCcpO1xuICpcbiAqIFRoZW4gdGhlIGVEU0wgY291bGQgYmUgdXNlZCBhczpcbiAqXG4gKiAgICAobmV3IGVEU0wpXG4gKiAgICAgIC50cmFuc2FjdGlvbigpXG4gKiAgICAgIC5wcmUoY2IpXG4gKiAgICAgIC5wZXJmb3JtKGNiKVxuICogICAgICAucG9zdChjYilcbiAqXG4gKiBBbmQgdGhlIHN0YWNrIHdvdWxkIGJlOlxuICpcbiAqICAgIFtcbiAqICAgICAgbm9kZTwndHJhbnNhY3Rpb24nLD5cbiAqICAgICAgbm9kZTwncHJlJywgY2I+XG4gKiAgICAgIG5vZGU8J3ByZWZvcm0nLCBjYj5cbiAqICAgICAgbm9kZTwncG9zdCcsIGNiPlxuICogICAgXVxuICpcbiAqIEhvd2V2ZXIsIHRoaXMgc2ltcGxlIGFwcHJvYWNoIHRoZSBzZW1hbnRpY3MgcnVsZXMgYW5kIGFuYWx5emVycyB0b1xuICogZ3VhcmFudGVlIHRoZSBzdGFjayBpcyB2YWxpZC4gRm9yIGV4YW1wbGUsIGlmIHdlIGhhdmUgYSBtYWxmb3JtZWRcbiAqIHN0YWNrIGJlY2F1c2Ugb2YgdGhlIGZvbGxvd2luZyBlRFNMIHByb2dyYW06XG4gKlxuICogICAgKG5ldyBlRFNMKVxuICogICAgICAucG9zdChjYilcbiAqICAgICAgLnByZShjYilcbiAqICAgICAgLnBlcmZvcm0oY2IpXG4gKiAgICAgIC50cmFuc2FjdGlvbigpXG4gKlxuICogVGhlIHJ1bnRpbWUgbWF5IHJlcG9ydCBlcnJvdCBiZWNhdXNlIHdoZW4gJy5wb3N0KGNiKScgdGhlcmUgaXMgbm8gc3RhY2tcbiAqIGNyZWF0ZWQgYnkgdGhlIGJlZ2lubmluZyBzdGVwLCBuYW1lbHkgdGhlICcucHJlKGNiKScgaW4gb3VyIGNhc2UuXG4gKiBOZXZlcnRoZWxlc3MsIHRoZSBlcnJvciBtZXNzYWdlIGlzIHRvbyBsb3ctbGV2ZWwgZm9yIHRoZSBsYW5ndWFnZSB1c2VyLFxuICogc2luY2UgdGhleSBzaG91bGQgY2FyZSBubyBzdGFjayB0aGluZ3MgYW5kIHNob3VsZCBvbmx5IGNhcmUgYWJvdXQgdGhlIGVEU0xcbiAqIGl0c2VsZi5cbiAqXG4gKiBUaGUgc29sdXRpb24gaXMgdG8gcHJvdmlkZSBhIGJhc2ljIHN0YWNrIG9yZGVyaW5nIGFuYWx5emVyIGFuZCBsZXQgdGhlXG4gKiBsYW5ndWFnZSBkZWNpZGUgaG93IHRvIGRlc2NyaWJlIHRoZSBlcnJvci4gQW5kIHNpbmNlIHdlIGRvbid0IGhhdmVcbiAqIGFueSBjb250ZXh0IGluZm9ybWF0aW9uIGFib3V0IHZhcmlhYmxlcywgc2NvcGUgYW5kIG90aGVyIGVsZW1lbnRzXG4gKiBhcyBhIGNvbXBsZXRlIHByb2dyYW1taW5nIGxhbmd1YWdlLCB3ZSBvbmx5IG5lZWQgdG8gZ3VhcmFudGVlIHRoZSBvcmRlciBpc1xuICogY29ycmVjdCwgYW5kIG1ha2UgaW5jb3JyZWN0IGNhc2VzIG1lYW5pbmdmdWwuIE1vcmVvdmVyLCBzaW5jZSB0aGUgYW5hbHl6ZXJcbiAqIG5lZWRzIHRvIGFuYWx5emUgdGhlIHN0YXRlcyB3aGVuZXZlciB0aGUgaW5jb21pbmcgbm9kZSBjb21lcywgaXQgaXMgaW4gZmFjdFxuICogYW4gZXZhbHVhdGlvbiBwcm9jZXNzLCBzbyB1c2VyIGNvdWxkIGNvbWJpbmUgdGhlIGFuYWx5emluZyBhbmQgaW50ZXJwcmV0aW5nXG4gKiBwaGFzZSBpbnRvIHRoZSBzYW1lIGZ1bmN0aW9uLiBGb3IgZXhhbXBsZTpcbiAqXG4gKiAgICBydW50aW1lLm9uY2hhbmdlKChjb250ZXh0LCBub2RlLCBzdGFjaykgPT4ge1xuICogICAgICAgIC8vIElmIHRoZSBjaGFuZ2UgaXMgdG8gc3dpdGNoIHRvIGEgbmV3IHN0YWNrLFxuICogICAgICAgIC8vIHRoZSAnc3RhY2snIGhlcmUgd291bGQgYmUgdGhlIG5ldyBzdGFjay5cbiAqICAgICAgICB2YXIge3R5cGUsIGFyZ3N9ID0gbm9kZTtcbiAqICAgICAgICBpZiAoJ3ByZScgPT09IHR5cGUpIHtcbiAqICAgICAgICAgIGNvbnRleHQuaW5pdCA9IHRydWU7XG4gKiAgICAgICAgfSBlbHNlIGlmICgncG9zdCcgPT09IHR5cGUgJiYgIWNvbnRleHQuaW5pdCkge1xuICogICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdUaGVyZSBtdXN0IGJlIG9uZSBcInByZVwiIG5vZGUgYmVmb3JlIHRoZSBcInBvc3RcIi4nKTtcbiAqICAgICAgICB9XG4gKiAgICB9KTtcbiAqXG4gKiBXaXRoIHN1Y2ggZmVhdHVyZSwgaWYgdGhlIGluY29taW5nIG5vZGUgb3IgdGhlIHN0YWNrIGlzIG1hbGZvcm1lZCxcbiAqIGl0IHNob3VsZCB0aHJvdyB0aGUgZXJyb3IuIFRoZSBlcnJvciBjYXB0dXJlZCBieSB0aGUgaW5zdGFuY2UgbGlrZSB0aGlzXG4gKiBjb3VsZCBiZSBhICdjb21waWxhdGlvbiBlcnJvcicuXG4gKlxuICogVGhlIG5vdGljZWFibGUgZmFjdCBpcyBUaGUgY2FsbGJhY2sgb2YgdGhlICdvbmNoYW5nZScgaXMgYWN0dWFsbHkgYSByZWR1Y2VyLFxuICogc28gdXNlciBjb3VsZCB0cmVhdCB0aGUgcHJvY2VzcyBvZiB0aGlzIGV2YWx1YXRpb24gJiBhbmFseXppbmcgYXMgYSByZWR1Y2luZ1xuICogcHJvY2VzcyBvbiBhbiBpbmZpbml0ZSBzdHJlYW0uIEFuZCBzaW5jZSB3ZSBoYXZlIGEgc3RhY2sgbWFjaGluZSwgaWYgdGhlXG4gKiByZWR1Y2VyIHJldHVybiBub3RoaW5nLCB0aGUgc3RhY2sgd291bGQgYmUgZW1wdHkuIE90aGVyd2lzZSwgaWYgdGhlIHJlZHVjZXJcbiAqIHJldHVybiBhIG5ldyBzdGFjaywgaXQgd291bGQgcmVwbGFjZSB0aGUgb2xkIG9uZS5cbiAqXG4gKiBBbmQgcGxlYXNlIG5vdGUgdGhlIGV4YW1wbGUgaXMgbXVjaCBzaW1wbGlmaWVkLiBGb3IgdGhlXG4gKiByZWFsIGVEU0wgaXQgc2hvdWxkIGJlIHVzZWQgb25seSBhcyBhbiBlbnRyeSB0byBkaXNwYXRjaCB0aGUgY2hhbmdlIHRvXG4gKiB0aGUgcmVhbCBoYW5kbGVycywgd2hpY2ggbWF5IGNvbXByaXNlIHNldmVyYWwgc3RhdGVzIGFuZCBjb21wb25lbnRzLlxuICovXG5leHBvcnQgZnVuY3Rpb24gUnVuZSgpIHt9XG5cbi8qKlxuICogSGVscGVyIG1ldGhvZCB0byBidWlsZCBpbnRlcmZhY2Ugb2YgYSBzcGVjaWZpYyBEU0wuIEl0IHdvdWxkIHJldHVybiBhIG1ldGhvZFxuICogb2YgdGhlIERTTCBhbmQgdGhlbiB0aGUgaW50ZXJmYWNlIGNvdWxkIGF0dGFjaCBpdC5cbiAqXG4gKiBUaGUgcmV0dXJuaW5nIGZ1bmN0aW9uIHdvdWxkIGFzc3VtZSB0aGF0IHRoZSAndGhpcycgaW5zaWRlIGl0IGlzIHRoZSBydW50aW1lXG4gKiBvZiB0aGUgbGFuZ3VhZ2UuIEFuZCBzaW5jZSB0aGUgbWV0aG9kIGl0IHJldHVybnMgd291bGQgcmVxdWlyZSB0byBhY2Nlc3Mgc29tZVxuICogbWVtYmVycyBvZiB0aGUgJ3RoaXMnLCB0aGUgJ3RoaXMnIHNob3VsZCBoYXZlICd0aGlzLnN0YWNrJyBhbmQgJ3RoaXMuY29udGV4dCdcbiAqIGFzIHRoZSBtZXRob2QgcmVxdWlyZXMuXG4gKlxuICogSWYgaXQncyBhbiAnZXhpdCcgbm9kZSwgbWVhbnMgdGhlIHNlc3Npb24gaXMgZW5kZWQgYW5kIHRoZSBpbnRlcnByZXRlciBzaG91bGRcbiAqIHJldHVybiBhIHN0YWNrIGNvbnRhaW5zIG9ubHkgb25lIG5vZGUgYXMgdGhlIHJlc3VsdCBvZiB0aGUgc2Vzc2lvbiwgb3IgdGhlXG4gKiBzZXNzaW9uIHJldHVybnMgbm90aGluZy4gRm9yIG90aGVyIGluc3RydWN0aW9ucyB0aGUgc3RhY2sgY2FuIGtlZXAgc29tZVxuICogY29tcHV0ZWQgcmVzdWx0IHRvIHNpbXVsYXRlIHJlYWwgc3RhY2sgbWFjaGluZS4gQnV0IGl0J3MgT0sgdG8gbm90IHVzZSB0aGlzXG4gKiBmZWF0dXJlIGFuZCBhbHdheXMgcmV0dXJuIGFuIGVtcHR5ICdzdGFjaycgZXZlcnl0aW1lIHRoZSAnb25jaGFuZ2UnIGdldFxuICogY2FsbGVkIGFuZCBpbnRlcnVwdGVkLiBJbiB0aGlzIG1vZGUgaXQgbWVhbnMgdGhlIGxhbmd1YWdlIHdhbnQgdG8ga2VlcFxuICogYWxsIHN0YXRlcyBieSBpdHNlbGYuXG4gKlxuICogUGxlYXNlIG5vdGUgdGhhdCBmcm9tIHRoZSBkZXNjcmlwdGlvbiBhYm92ZSwgJ2VuZCcgbWVhbnMgc3RhY2sgKHN1YnN0YWNrKVxuICogZW5kcy4gSXQncyB0b3RhbGx5IGlycmVsZXZhbnQgdG8gJ2V4aXQnLlxuICpcbiAqIFRoZSBsYXN0IGFyZ3VtZW50ICdkb2MnIGlzIHdoYXQgZGVzaWduZXIgY291bGQgcHV0IHRoZSBkZXNjcmlwdGlvbiBhYm91dFxuICogdGhlIG1ldGhvZC4gSWYgc2V0LCBpdCB3b3VsZCBhcHBlbmQgdGhlICdydW5lLmRvYydcbiAqIHByb3BlcnR5IGluIHRoZSBmdW5jdGlvbiBpdCByZXR1cm5zLiBBbmQgdGhlbiB0aGUgbGFuZ3VhZ2UgaW5zdGFuY2UgY291bGRcbiAqIGNhbGwgYFJ1bmUuZG9jdW1lbnQoPGluc3RhbmNlPilgIHRvIGdldCBhIG1ldGhvZCB0aGF0IHdvdWxkIHJldHVyblxuICogJ3sgbWV0aG9kTmFtZTogZGVzY3JpcHRpb24gfScgd2hlbiBpdCBnb3QgaW52b2tlZC5cbiAqL1xuUnVuZS5kZWZpbmUgPSBmdW5jdGlvbihtZXRob2QsIGFzLCBkb2MgPSAnJykge1xuICB2YXIgYnVpbHQgPSBmdW5jdGlvbiguLi5hcmdzKSB7XG4gICAgdmFyIG5vZGUsIHJlc3VsdHN0YWNrO1xuICAgIHN3aXRjaCAoYXMpIHtcbiAgICAgIGNhc2UgJ3B1c2gnOlxuICAgICAgICBub2RlID0gbmV3IFJ1bmUuTm9kZShtZXRob2QsIGFyZ3MsIHRoaXMuc3RhY2spO1xuICAgICAgICB0aGlzLnN0YWNrLnB1c2gobm9kZSk7XG4gICAgICAgIHJlc3VsdHN0YWNrID1cbiAgICAgICAgICB0aGlzLm9uY2hhbmdlKHRoaXMuY29udGV4dCwgbm9kZSwgdGhpcy5zdGFjayk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnYmVnaW4nOlxuICAgICAgICB0aGlzLl9wcmV2c3RhY2sgPSB0aGlzLnN0YWNrO1xuICAgICAgICB0aGlzLnN0YWNrID0gW107XG4gICAgICAgIG5vZGUgPSBuZXcgUnVuZS5Ob2RlKG1ldGhvZCwgYXJncywgdGhpcy5zdGFjayk7XG4gICAgICAgIHRoaXMuc3RhY2sucHVzaChub2RlKTsgIC8vIGFzIHRoZSBmaXJzdCBub2RlIG9mIHRoZSBuZXcgc3RhY2suXG4gICAgICAgIHJlc3VsdHN0YWNrID1cbiAgICAgICAgICB0aGlzLm9uY2hhbmdlKHRoaXMuY29udGV4dCwgbm9kZSwgdGhpcy5zdGFjayk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnZW5kJzpcbiAgICAgICAgbm9kZSA9IG5ldyBSdW5lLk5vZGUobWV0aG9kLCBhcmdzLCB0aGlzLnN0YWNrKTtcbiAgICAgICAgdGhpcy5zdGFjay5wdXNoKG5vZGUpOyAgLy8gdGhlIGxhc3Qgbm9kZSBvZiB0aGUgc3RhY2suXG4gICAgICAgIHRoaXMuc3RhY2sgPVxuICAgICAgICAgIHRoaXMuX3ByZXZzdGFjazsgLy8gc3dpdGNoIGJhY2sgdG8gdGhlIHByZXZpb3VzIHN0YWNrLlxuICAgICAgICByZXN1bHRzdGFjayA9XG4gICAgICAgICAgdGhpcy5vbmNoYW5nZSh0aGlzLmNvbnRleHQsIG5vZGUsIHRoaXMuc3RhY2spO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ2V4aXQnOlxuICAgICAgICBub2RlID0gbmV3IFJ1bmUuTm9kZShtZXRob2QsIGFyZ3MsIHRoaXMuc3RhY2spO1xuICAgICAgICB0aGlzLnN0YWNrLnB1c2gobm9kZSk7ICAvLyB0aGUgbGFzdCBub2RlIG9mIHRoZSBzdGFjay5cbiAgICAgICAgcmVzdWx0c3RhY2sgPVxuICAgICAgICAgIHRoaXMub25jaGFuZ2UodGhpcy5jb250ZXh0LCBub2RlLCB0aGlzLnN0YWNrKTtcbiAgICAgICAgaWYgKCFyZXN1bHRzdGFjaykge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgJ2V4aXQnIG5vZGUgJyR7bm9kZS50eXBlfScgc2hvdWxkXG4gICAgICAgICAgICByZXR1cm4gYSByZXN1bHRzdGFjay5gKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzdWx0c3RhY2tbMF07XG4gICAgfVxuICAgIC8vIElmIHRoZSBoYW5kbGVyIHVwZGF0ZXMgdGhlIHN0YWNrLCBpdCB3b3VsZCByZXBsYWNlIHRoZSBleGlzdGluZyBvbmUuXG4gICAgaWYgKHJlc3VsdHN0YWNrKSB7XG4gICAgICB0aGlzLnN0YWNrID0gcmVzdWx0c3RhY2s7XG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xuICB9O1xuICBidWlsdC5ydW5lID0ge1xuICAgICdhcyc6IGFzLFxuICAgICdkb2MnOiBkb2MsXG4gICAgJ21ldGhvZCc6IG1ldGhvZCxcbiAgfTtcbiAgcmV0dXJuIGJ1aWx0O1xufTtcblxuLyoqXG4gKiBHZW5lcmF0ZSBhIG1ldGhvZCB0aGF0IHdvdWxkIHJldHVybiBhbGwgZG9jdW1lbnRzIG9mIHRoZSBtZXRob2RzLFxuICogaW4gYSBmb3JtIG9mICd7IG1ldGhvZE5hbWU6IGRlc2NyaXB0aW9uIH0nLlxuICpcbiAqIFRoZSBhcmd1bWVudCBtdXN0IGJlIHRoZSBsYW5ndWFnZSBpbnN0YW5jZSB3aXRoIGFsbCBkZWZpbmVkIG1ldGhvZHMuXG4gKi9cblJ1bmUucHVibGlzaCA9IGZ1bmN0aW9uKGluc3RhbmNlKSB7XG4gIHZhciBnZW5lcmF0ZWQgPSBPYmplY3Qua2V5cyhpbnN0YW5jZSkucmVkdWNlKChkb2MsIG5hbWUpID0+IHtcbiAgICB2YXIgbWV0aG9kID0gaW5zdGFuY2VbbmFtZV07XG4gICAgaWYgKG1ldGhvZC5ydW5lKSB7XG4gICAgICBkb2NbbmFtZV0gPSBtZXRob2QucnVuZS5kb2M7XG4gICAgfVxuICB9LCB7fSk7XG4gIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gZ2VuZXJhdGVkO1xuICB9O1xufTtcblxuUnVuZS5Ob2RlID0gZnVuY3Rpb24odHlwZSwgYXJncywgc3RhY2spIHtcbiAgdGhpcy50eXBlID0gdHlwZTtcbiAgdGhpcy5hcmdzID0gYXJncztcbiAgdGhpcy5zdGFjayA9IHN0YWNrO1xufTtcblxuUnVuZS5FdmFsdWF0ZSA9IGZ1bmN0aW9uKGNvbnRleHQgPSB7fSkge1xuICB0aGlzLl9hbmFseXplcnMgPSBbXTtcbiAgdGhpcy5faW50ZXJwcmV0ZXIgPSBudWxsO1xuICB0aGlzLl9jb250ZXh0ID0gY29udGV4dDtcbn07XG5cbi8qKlxuICogQW5hbHl6ZXIgY291bGQgcmVjZWl2ZSB0aGUgc3RhY2sgY2hhbmdlIGZyb20gJ1J1bmUjZXZhbHVhdGUnLFxuICogYW5kIGl0IHdvdWxkIGJlIGNhbGxlZCB3aXRoIHRoZSBhcmd1bWVudHMgYXMgdGhlIGZ1bmN0aW9uIGRlc2NyaWJlczpcbiAqXG4gKiAgICAgUnVuZS5wcm90b3R5cGUuZXZhbHVhdGUoKGNvbnRleHQsIGNoYW5nZSwgc3RhY2spID0+IHtcbiAqICAgICAgICAvLyAuLi5cbiAqICAgICB9KTtcbiAqXG4gKiBTbyB0aGUgYW5hbHl6ZXIgY291bGQgYmU6XG4gKlxuICogICAgZnVuY3Rpb24oY29udGV4dCwgY2hhbmdlLCBzdGFjaykge1xuICogICAgICAvLyBEbyBzb21lIGNoZWNrIGFuZCBtYXliZSBjaGFuZ2VkIHRoZSBjb250ZXh0LlxuICogICAgICAvLyBUaGUgbmV4dCBhbmFseXplciB0byB0aGUgaW50ZXJwcmV0ZXIgd291bGQgYWNjZXB0IHRoZSBhbHRlcm5hdGVkXG4gKiAgICAgIC8vIGNvbnRleHQgYXMgdGhlIGFyZ3VtZW50ICdjb250ZXh0Jy5cbiAqICAgICAgY29udGV4dC5zb21lRmxhZyA9IHRydWU7XG4gKiAgICAgIC8vIFdoZW4gdGhlcmUgaXMgd3JvbmcsIHRocm93IGl0LlxuICogICAgICB0aHJvdyBuZXcgRXJyb3IoJ1NvbWUgYW5hbHl6aW5nIGVycm9yJyk7XG4gKiAgICB9O1xuICpcbiAqIE5vdGUgdGhhdCB0aGUgYW5hbHl6ZXIgKCdhJykgd291bGQgYmUgaW52b2tlZCB3aXRoIGVtcHR5ICd0aGlzJyBvYmplY3QsXG4gKiBzbyB0aGUgZnVuY3Rpb24gcmVsaWVzIG9uICd0aGlzJyBzaG91bGQgYmluZCBpdHNlbGYgZmlyc3QuXG4gKi9cblJ1bmUuRXZhbHVhdGUucHJvdG90eXBlLmFuYWx5emVyID0gZnVuY3Rpb24oYSkge1xuICB0aGlzLl9hbmFseXplcnMucHVzaChhKTtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIE9uZSBFdmFsdWF0ZSBjYW4gb25seSBoYXZlIG9uZSBpbnRlcnByZXRlciwgYW5kIGl0IHdvdWxkIHJldHVyblxuICogdGhlIGZ1bmN0aW9uIGNvdWxkIGNvbnN1bWUgZXZlcnkgc3RhY2sgY2hhbmdlIGZyb20gJ1J1bmUjZXZhbHVhdGUnLlxuICpcbiAqIFRoZSBjb2RlIGlzIGEgbGl0dGxlIGNvbXBsaWNhdGVkOiB3ZSBoYXZlIHR3byBraW5kcyBvZiAncmVkdWNpbmcnOlxuICogb25lIGlzIHRvIHJlZHVjZSBhbGwgYW5hbHl6ZXJzIHdpdGggdGhlIHNpbmdsZSBpbmNvbWluZyBjaGFuZ2UsXG4gKiBhbm90aGVyIGlzIHRvIHJlZHVjZSBhbGwgaW5jb21pbmcgY2hhbmdlcyB3aXRoIHRoaXMgYW5hbHl6ZXJzICsgaW50ZXJwcmV0ZXIuXG4gKlxuICogVGhlIGFuYWx5emVyIGFuZCBpbnRlcnByZXRlciBzaG91bGQgY2hhbmdlIHRoZSBjb250ZXh0LCB0byBtZW1vcml6ZSB0aGVcbiAqIHN0YXRlcyBvZiB0aGUgZXZhbHVhdGlvbi4gVGhlIGRpZmZlcmVuY2UgaXMgaW50ZXJwcmV0ZXIgc2hvdWxkIHJldHVybiBvbmVcbiAqIG5ldyBzdGFjayBpZiBpdCBuZWVkcyB0byB1cGRhdGUgdGhlIGV4aXN0aW5nIG9uZS4gVGhlIHN0YWNrIGl0IHJldHVybnMgd291bGRcbiAqIHJlcGxhY2UgdGhlIGV4aXN0aW5nIG9uZSwgc28gYW55dGhpbmcgc3RpbGwgaW4gdGhlIG9sZCBvbmUgd291bGQgYmUgd2lwZWRcbiAqIG91dC4gVGhlIGludGVycHJldGVyIGNvdWxkIHJldHVybiBub3RoaW5nICgndW5kZWZpbmVkJykgdG8ga2VlcCB0aGUgc3RhY2tcbiAqIHVudG91Y2hlZC5cbiAqXG4gKiBUaGUgYW5hbHl6ZXJzIGFuZCBpbnRlcnByZXRlciBjb3VsZCBjaGFuZ2UgdGhlICdjb250ZXh0JyBwYXNzIHRvIHRoZW0uXG4gKiBBbmQgc2luY2Ugd2UgbWF5IHVwZGF0ZSB0aGUgc3RhY2sgYXMgYWJvdmUsIHRoZSBjb250ZXh0IHNob3VsZCBtZW1vcml6ZVxuICogdGhvc2UgaW5mb3JtYXRpb24gbm90IHRvIGJlIG92ZXJ3cml0dGVuIHdoaWxlIHRoZSBzdGFjayBnZXQgd2lwZWQgb3V0LlxuICpcbiAqIEFuZCBpZiB0aGUgaW50ZXJwcmV0aW5nIG5vZGUgaXMgdGhlIGV4aXQgbm9kZSBvZiB0aGUgc2Vzc2lvbiwgaW50ZXJwcmV0ZXJcbiAqIHNob3VsZCByZXR1cm4gYSBuZXcgc3RhY2sgY29udGFpbnMgb25seSBvbmUgZmluYWwgcmVzdWx0IG5vZGUuIElmIHRoZXJlXG4gKiBpcyBubyBzdWNoIG5vZGUsIHRoZSByZXN1bHQgb2YgdGhpcyBzZXNzaW9uIGlzICd1bmRlZmluZWQnLlxuICovXG5SdW5lLkV2YWx1YXRlLnByb3RvdHlwZS5pbnRlcnByZXRlciA9IGZ1bmN0aW9uKGlucHQpIHtcbiAgLy8gVGhlIGN1c3RvbWl6ZWQgbGFuZ3VhZ2Ugc2hvdWxkIGdpdmUgdGhlIGRlZmF1bHQgY29udGV4dC5cbiAgcmV0dXJuIChjb250ZXh0LCBjaGFuZ2UsIHN0YWNrKSA9PiB7XG4gICAgdHJ5IHtcbiAgICAgIC8vIEFuYWx5emVycyBjb3VsZCBjaGFuZ2UgdGhlIGNvbnRleHQuXG4gICAgICB0aGlzLl9hbmFseXplcnMucmVkdWNlKChjdHgsIGFuYWx5emVyKSA9PiB7XG4gICAgICAgIGFuYWx5emVyLmNhbGwoe30sIGNvbnRleHQsIGNoYW5nZSwgc3RhY2spO1xuICAgICAgfSwgY29udGV4dCk7XG4gICAgfSBjYXRjaChlKSB7XG4gICAgICB0aGlzLl9oYW5kbGVFcnJvcihlLCBjb250ZXh0LCBjaGFuZ2UsIHN0YWNrKTtcbiAgICB9XG4gICAgLy8gQWZ0ZXIgYW5hbHl6ZSBpdCwgaW50ZXJwcmV0IHRoZSBub2RlIGFuZCByZXR1cm4gdGhlIG5ldyBzdGFjayAoaWYgYW55KS5cbiAgICB2YXIgbmV3U3RhY2sgPSBpbnB0KGNvbnRleHQsIGNoYW5nZSwgc3RhY2spO1xuICAgIHJldHVybiBuZXdTdGFjaztcbiAgfTtcbn07XG5cblJ1bmUuRXZhbHVhdGUucHJvdG90eXBlLl9oYW5kbGVFcnJvciA9XG5mdW5jdGlvbihlcnIsIGNvbnRleHQsIGNoYW5nZSwgc3RhY2spIHtcbiAgLy8gVE9ETzogZXhwYW5kIGl0IHRvIHByb3ZpZGUgbW9yZSBzb3BoaXN0aWMgZGVidWdnaW5nIG1lc3NhZ2UuXG4gIHRocm93IG5ldyBFcnJvcihgV2hlbiBjaGFuZ2UgJHtjaGFuZ2UudHlwZX0gY29tZXMgZXJyb3IgJyR7ZXJyfScgaGFwcGVuZWRgKTtcbn07XG5jb25zb2xlLmxvZygnPj4+Pj4+IFJ1bmUnKTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL3J1bmUuanNcbiAqKi8iXSwic291cmNlUm9vdCI6IiJ9

/***/ },
/* 3 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	exports.Runtime = Runtime;
	
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
	
	  var promise = new Promise(function (resolve, reject) {
	    _this.resolve = resolve;
	    _this.reject = reject;
	  });
	  this.promise = promise;
	  return this;
	};
	
	Runtime.prototype.start = function () {
	  var deferred = new Runtime.Deferred();
	  this.queue = deferred.promise;
	  this.resolve = deferred.resolve;
	  this.reject = deferred.reject;
	  this.result = null; // the result from each step.
	};
	
	Runtime.prototype.done = function () {
	  this.resolve(); // So the queue start to execute.
	};
	
	Runtime.prototype.next = function (step) {
	  var _this2 = this;
	
	  this.queue.then(function () {
	    var newPromise = step(_this2.result);
	    if (newPromise.next) {
	      // If it's also a Playlang statements, concat it.
	      return newPromise.queue;
	    } else {
	      // No matter it's value from an ordinary function or
	      // a Promise, returning it is legit for a Promise.
	      return newPromise;
	    }
	  }).then(function (result) {
	    // Get the result from newPromise and set it.
	    _this2.result = result;
	  })['catch'](function (err) {
	    _this2.reject(err);
	  });
	};
	
	Runtime.prototype.match = function () {
	  var _this3 = this;
	
	  // Collect all 'case' Promises here.
	  this.queue.then(function () {
	    _this3.matching = [];
	    _this3.matching.matched = false;
	  })['catch'](function (err) {
	    _this3.reject(err);
	  });
	};
	
	// Matching end: execute all matching cases.
	Runtime.prototype.end = function () {
	  var _this4 = this;
	
	  this.queue.then(function () {
	    _this4.matching = null;
	  })['catch'](function (err) {
	    _this4.reject(err);
	  });
	};
	
	/**
	 * `pred` must be a sync function only return true or false.
	 * If multiple `case` can match the result, only the first matching one
	 * will be executed and leave the result.
	 */
	Runtime.prototype['case'] = function (pred) {
	  var _this5 = this;
	
	  this.queue.then(function () {
	    var id = _this5.matching.length;
	    // In a `match`, we don't update the result,
	    // so every `case` can judge if it's true.
	    var predresult = pred(_this5.result);
	    _this5.matching[id] = predresult;
	    return id;
	  })['catch'](function (err) {
	    _this5.reject(err);
	  });
	};
	
	Runtime.prototype.to = function (step) {
	  var _this6 = this;
	
	  // It's always case..to, so we only need to concat
	  // 'to' promise after the 'case' promise.
	  this.queue.then(function (id) {
	    // Only append the step if the previous one is true.
	    if (!_this6.matching.matched && _this6.matching[id]) {
	      _this6.matching.matched = true;
	      // If it matches the condition, execute the step before we move
	      // to the next step of main queue.
	      var newPromise = step(_this6.result);
	      if (newPromise.next) {
	        return newPromise.queue;
	      } else {
	        return newPromise;
	      }
	    } else {
	      return _this6.result;
	    }
	  }).then(function (result) {
	    _this6.result = result;
	  })['catch'](function (err) {
	    _this6.reject(err);
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
	  var _this7 = this;
	
	  this.queue.then(function () {
	    var loopqueue = _this7.looping.loopingpromise.promise;
	    var pred = _this7.looping.pred;
	    var updateResult = function updateResult(result) {
	      _this7.result = result;
	    };
	    var generatePromise = function generatePromise() {
	      var newPromise = step(_this7.result);
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
	    _this7.looping.loopingpromise.promise = loopqueue.then(function () {
	      if (pred(_this7.result)) {
	        _this7.looping.loopingpromise.promise = loopqueue.then(generatePromise);
	      } else {
	        _this7.looping.queueblocker.resolve();
	      }
	    });
	    // Block the main queue until the loop ends.
	    return _this7.looping.queueblocker.promise;
	  })['catch'](function (err) {
	    _this7.reject(err);
	  });
	};
	
	/**
	 * Remember we will swap `loop` and `until` at syntax level, so
	 * we can get the pred before we run the loop.
	 */
	Runtime.prototype.until = function (pred) {
	  var _this8 = this;
	
	  this.queue.then(function () {
	    _this8.looping = {
	      'pred': pred,
	      'loopingpromise': Promise.resolve(),
	      'queueblocker': new Runtime.Deferred()
	    };
	  })['catch'](function (err) {
	    _this8.reject(err);
	  });
	};
	
	Runtime.prototype.any = function () {
	  var _this9 = this;
	
	  var updateResult = function updateResult(result) {
	    _this9.result = result;
	  };
	  var generatePromise = function generatePromise(step) {
	    var newPromise = step(_this9.result);
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
	  var candidates = Array.from(arguments);
	  this.queue.then(function () {
	    return Promise.race(candidates.map(function (step) {
	      return generatePromise(step);
	    }));
	  })['catch'](function (err) {
	    _this9.reject(err);
	  });
	};
	
	Runtime.prototype.all = function () {
	  var _this10 = this;
	
	  var updateResult = function updateResult(result) {
	    _this10.result = result;
	  };
	  var generatePromise = function generatePromise(step) {
	    var newPromise = step(_this10.result);
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
	  var candidates = Array.from(arguments);
	  this.queue.then(function () {
	    return Promise.all(candidates.map(function (step) {
	      return generatePromise(step);
	    }));
	  })['catch'](function (err) {
	    _this10.reject(err);
	  });
	};

/***/ }
/******/ ]);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMjBlMDc1NzNjNGE3N2U2MTIxYmEiLCJ3ZWJwYWNrOi8vLy4vcGxheWxhbmcuanMiLCJ3ZWJwYWNrOi8vLy4vcGxheWxhbmcuaW50ZXJmYWNlLmpzIiwid2VicGFjazovLy8uLi9kaXN0L3J1bmUuanMiLCJ3ZWJwYWNrOi8vLy4vcGxheWxhbmcucnVudGltZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsdUJBQWU7QUFDZjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7OztBQ3RDQSxhQUFZLENBQUM7Ozs7Ozs7b0RBRWEsQ0FBNEI7O2tEQUM5QixDQUEwQjs7QUFFM0MsVUFBUyxRQUFRLEdBQUc7QUFDekIsT0FBSSxDQUFDLFFBQVEsR0FBRyxvQ0FBYSxDQUFDO0FBQzlCLE9BQUksQ0FBQyxVQUFVLEdBQUcsdUNBQWMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBQy9DLFVBQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQzs7Ozs7OztBQ1J6QixhQUFZLENBQUM7Ozs7Ozs7dUNBRVEsQ0FBYzs7QUFDbkMsUUFBTyxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsRUFBRSxpQkFBSyxTQUFTLENBQUMsQ0FBQzs7Ozs7Ozs7Ozs7O0FBV3ZDLFVBQVMsU0FBUyxDQUFDLE9BQU8sRUFBRTtBQUNqQyxPQUFJLENBQUMsT0FBTyxHQUFHO0FBQ2IsWUFBTyxFQUFFLEtBQUs7QUFDZCxZQUFPLEVBQUUsS0FBSztBQUNkLFlBQU8sRUFBRSxLQUFLO0FBQ2QsYUFBUSxFQUFFLEtBQUs7SUFDaEIsQ0FBQztBQUNGLE9BQUksQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDO0FBQ2hCLE9BQUksQ0FBQyxRQUFR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LFVBQVUsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO01BQzVDLE1BQU0sSUFBSSxVQUFVLENBQUMsSUFBSSxFQUFFO0FBQzFCLGNBQU8sVUFBVSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztNQUN0QyxNQUFNOztBQUVMLFdBQUksU0FBUyxHQUFHLFVBQVUsQ0FBQztBQUMzQixtQkFBWSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0FBQ3hCLGNBQU8sT0FBTyxDQUFDLE9BQU8sRUFBRSxDQUFDO01BQzFCO0lBQ0YsQ0FBQztBQUNGLE9BQUksVUFBVSxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7QUFDdkMsT0FBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsWUFBTTtBQUNwQixZQUFPLE9BQU8sQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxVQUFDLElBQUksRUFBSztBQUMxQyxjQUFPLGVBQWUsQ0FBQyxJQUFJLENBQUMsQ0FBQztNQUM5QixDQUFDLENBQUMsQ0FBQztJQUNMLENBQUMsU0FDSSxDQUFDLFVBQUMsR0FBRyxFQUFLO0FBQ2QsYUFBSyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDbEIsQ0FBQyxDQUFDO0VBQ0osQyIsImZpbGUiOiJwbGF5bGFuZy5kaXN0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGV4cG9ydHM6IHt9LFxuIFx0XHRcdGlkOiBtb2R1bGVJZCxcbiBcdFx0XHRsb2FkZWQ6IGZhbHNlXG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiB3ZWJwYWNrL2Jvb3RzdHJhcCAyMGUwNzU3M2M0YTc3ZTYxMjFiYVxuICoqLyIsIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IHsgSW50ZXJmYWNlIH0gZnJvbSAnZGVtby9wbGF5bGFuZy5pbnRlcmZhY2UuanMnO1xuaW1wb3J0IHsgUnVudGltZSB9IGZyb20gJ2RlbW8vcGxheWxhbmcucnVudGltZS5qcyc7XG5cbmV4cG9ydCBmdW5jdGlvbiBQbGF5bGFuZygpIHtcbiAgdGhpcy5fcnVudGltZSA9IG5ldyBSdW50aW1lKCk7XG4gIHRoaXMuX2ludGVyZmFjZSA9IG5ldyBJbnRlcmZhY2UodGhpcy5fcnVudGltZSk7XG4gIHJldHVybiB0aGlzLl9pbnRlcmZhY2U7XG59XG5cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vcGxheWxhbmcuanNcbiAqKi8iLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCB7IFJ1bmUgfSBmcm9tICdkaXN0L3J1bmUuanMnO1xuY29uc29sZS5sb2coJz4+Pj4+Pj4gUnVuZTogJywgUnVuZS5wcm90b3R5cGUpO1xuXG4vKipcbiAqIEEgZGVtbyBlRFNMIHdpdGggbW9zdCBmZWF0dXJlcyBhIGZ1bGwgbGFuZ3VhZ2Ugc2hvdWxkIGJlIHdpdGguXG4gKiBUaGlzIGZpbGUgY29udGFpbnMgb25seSBpbnRlcmZhY2VuLCB3aGljaCBtZWFucyBpdCBuZWVkIHRvIGJlIGluc3RhbnRpYXRlZFxuICogd2l0aCBhIHJ1bnRpbWUgdG8gZXhlY3V0ZSB0aGUgbGFuZ3VhZ2UuXG4gKlxuICogTm90ZTogc2luY2UgdG8gaGFuZGxlIGFzeW5jIGZ1bmN0aW9uIHByb3Blcmx5IG5lZWQgZXh0cmEgZWZmb3J0cyxcbiAqIHNvIHRoaXMgZGVtbyBsYW5ndWFnZSBkb2Vzbid0IGZ1bGx5IGhhbmRsZSB0aGVtIHlldC4gQWx0aG91Z2ggdGhpcyBlRFNMXG4gKiBpbmRlZWQgcHV0IGFsbCBzdGVwcyBpbiBhIFByb21pc2UgdG8gYmUgdGhlIGZpcnN0IHN0ZXAgdG93YXJkIHRoYXQuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBJbnRlcmZhY2UocnVudGltZSkge1xuICB0aGlzLmNvbnRleHQgPSB7XG4gICAgc3RhcnRlZDogZmFsc2UsXG4gICAgc3RvcHBlZDogZmFsc2UsXG4gICAgbG9vcGluZzogZmFsc2UsXG4gICAgbWF0Y2hpbmc6IGZhbHNlXG4gIH07XG4gIHRoaXMuc3RhY2sgPSBbXTtcbiAgdGhpcy5fcnVudGltZSA9IHJ1bnRpbWU7XG4gIHRoaXMuX2V2YWx1YXRvciA9IChuZXcgUnVuZS5FdmFsdWF0ZSgpKVxuICAgIC5hbmFseXplcih0aGlzLl9hbmFseXplT3JkZXIuYmluZCh0aGlzKSlcbiAgICAuaW50ZXJwcmV0ZXIodGhpcy5faW50ZXJwcmV0LmJpbmQodGhpcykpO1xufVxuXG5JbnRlcmZhY2UucHJvdG90eXBlLnN0YXJ0ID0gUnVuZS5kZWZpbmUoJ3N0YXJ0JywgJ2JlZ2luJyk7XG5JbnRlcmZhY2UucHJvdG90eXBlLmRvbmUgPSBSdW5lLmRlZmluZSgnZXhpdCcsICdleGl0Jyk7XG5JbnRlcmZhY2UucHJvdG90eXBlLm5leHQgPSBSdW5lLmRlZmluZSgnbmV4dCcsICdwdXNoJyk7XG5JbnRlcmZhY2UucHJvdG90eXBlLm1hdGNoID0gUnVuZS5kZWZpbmUoJ21hdGNoJywgJ2JlZ2luJyk7XG5JbnRlcmZhY2UucHJvdG90eXBlLmVuZCA9IFJ1bmUuZGVmaW5lKCdlbmQnLCAnZW5kJyk7XG5JbnRlcmZhY2UucHJvdG90eXBlLmNhc2UgPSBSdW5lLmRlZmluZSgnY2FzZScsICdwdXNoJyk7XG5JbnRlcmZhY2UucHJvdG90eXBlLnRvID0gUnVuZS5kZWZpbmUoJ3RvJywgJ3B1c2gnKTtcbkludGVyZmFjZS5wcm90b3R5cGUubG9vcCA9IFJ1bmUuZGVmaW5lKCdsb29wJywgJ2JlZ2luJyk7XG5JbnRlcmZhY2UucHJvdG90eXBlLnVudGlsID0gUnVuZS5kZWZpbmUoJ3VudGlsJywgJ2VuZCcpO1xuSW50ZXJmYWNlLnByb3RvdHlwZS5hbnkgPSBSdW5lLmRlZmluZSgnYW55JywgJ3B1c2gnKTtcbkludGVyZmFjZS5wcm90b3R5cGUuYWxsID0gUnVuZS5kZWZpbmUoJ2FsbCcsICdwdXNoJyk7XG5cbkludGVyZmFjZS5wcm90b3R5cGUub25jaGFuZ2UgPSBmdW5jdGlvbihjb250ZXh0LCBub2RlLCBzdGFjaykge1xuICAvLyBXaGVuIGl0J3MgY2hhbmdlZCwgZXZhbHVhdGUgaXQgd2l0aCBhbmFseXplcnMgJiBpbnRlcnByZXRlci5cbiAgcmV0dXJuIHRoaXMuX2V2YWx1YXRvcihjb250ZXh0LCBub2RlLCBzdGFjayk7XG59O1xuXG5JbnRlcmZhY2UucHJvdG90eXBlLl9pbnRlcnByZXQgPSBmdW5jdGlvbihjb250ZXh0LCBub2RlLCBzdGFjaykge1xuICAvLyBXZWxsIGluIHRoaXMgZURTTCB3ZSBkZWxlZ2F0ZSB0aGUgaW50ZXJwcmV0aW9uIHRvIHRoZSBydW50aW1lLlxuICAvLyBXZSBkb24ndCBwYXNzIGNvbnRleHQgdG8gcnVudGltZSBzaW5jZSB0aGUgcnVudGltZSB3aWxsIGtlZXBcbiAgLy8gdGhlIGVzc2VudGlhbCBzdGF0ZXMgYnkgaXRzIG93bi5cbiAgcmV0dXJuIHRoaXMuX3J1bnRpbWUub25jaGFuZ2UuYXBwbHkodGhpcy5fcnVudGltZSwgYXJndW1lbnRzKTtcbn07XG5cbi8vIEluIHRoaXMgZURTTCB3ZSBub3cgb25seSBoYXZlIHRoaXMgYW5hbHl6ZXIuIENvdWxkIGFkZCBtb3JlIGFuZCByZWdpc3RlciBpdFxuLy8gaW4gdGhlIGNvbnRydWN0aW9uIG9mICd0aGlzLl9ldmFsdWF0b3InLlxuSW50ZXJmYWNlLnByb3RvdHlwZS5fYW5hbHl6ZU9yZGVyID0gZnVuY3Rpb24oY29udGV4dCwgY2hhbmdlLCBzdGFjaykge1xuICBpZiAoJ3N0YXJ0JyA9PT0gY2hhbmdlLnR5cGUpIHtcbiAgICBjb250ZXh0LnN0YXJ0ZWQgPSB0cnVlO1xuICB9IGVsc2UgaWYgKCdzdG9wJykge1xuICAgIGNvbnRleHQuc3RvcHBlZCA9IHRydWU7XG4gIH1cbiAgaWYgKCdzdGFydCcgPT09IGNoYW5nZS50eXBlICYmIGNvbnRleHQuc3RvcHBlZCkge1xuICAgIHRocm93IG5ldyBFcnJvcignU2hvdWxkIG5vdCBzdGFydCBhIHByb2Nlc3MgYWdhaW4nICtcbiAgICAgICAgJ2FmdGVyIGl0XFwncyBhbHJlYWR5IHN0b3BwZWQnKTtcbiAgfSBlbHNlIGlmICgnbmV4dCcgPT09IGNoYW5nZS50eXBlICYmICFjb250ZXh0LnN0YXJ0ZWQpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ1Nob3VsZCBub3QgY29uY2F0IHN0ZXBzIHdoaWxlIGl0XFwncyBub3Qgc3RhcnRlZCcpO1xuICB9IGVsc2UgaWYgKCdzdG9wJyA9PT0gY2hhbmdlLnR5cGUgJiYgIWNvbnRleHQuc3RhcnRlZCkge1xuICAgIHRocm93IG5ldyBFcnJvcignU2hvdWxkIG5vdCBzdG9wIGEgcHJvY2VzcyBiZWZvcmUgaXRcXCdzIHN0YXJ0ZWQnKTtcbiAgfVxufTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vcGxheWxhbmcuaW50ZXJmYWNlLmpzXG4gKiovIiwiKGZ1bmN0aW9uKGUsIGEpIHsgZm9yKHZhciBpIGluIGEpIGVbaV0gPSBhW2ldOyB9KGV4cG9ydHMsIC8qKioqKiovIChmdW5jdGlvbihtb2R1bGVzKSB7IC8vIHdlYnBhY2tCb290c3RyYXBcbi8qKioqKiovIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuLyoqKioqKi8gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuLyoqKioqKi9cbi8qKioqKiovIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbi8qKioqKiovIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuLyoqKioqKi9cbi8qKioqKiovIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbi8qKioqKiovIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbi8qKioqKiovIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuLyoqKioqKi9cbi8qKioqKiovIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuLyoqKioqKi8gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbi8qKioqKiovIFx0XHRcdGV4cG9ydHM6IHt9LFxuLyoqKioqKi8gXHRcdFx0aWQ6IG1vZHVsZUlkLFxuLyoqKioqKi8gXHRcdFx0bG9hZGVkOiBmYWxzZVxuLyoqKioqKi8gXHRcdH07XG4vKioqKioqL1xuLyoqKioqKi8gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuLyoqKioqKi8gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuLyoqKioqKi9cbi8qKioqKiovIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4vKioqKioqLyBcdFx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG4vKioqKioqL1xuLyoqKioqKi8gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4vKioqKioqLyBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuLyoqKioqKi8gXHR9XG4vKioqKioqL1xuLyoqKioqKi9cbi8qKioqKiovIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbi8qKioqKiovIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcbi8qKioqKiovXG4vKioqKioqLyBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4vKioqKioqLyBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG4vKioqKioqL1xuLyoqKioqKi8gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuLyoqKioqKi8gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuLyoqKioqKi9cbi8qKioqKiovIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4vKioqKioqLyBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuLyoqKioqKi8gfSlcbi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG4vKioqKioqLyAoW1xuLyogMCAqL1xuLyoqKi8gZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzKSB7XG5cblx0J3VzZSBzdHJpY3QnO1xuXHRcblx0LyoqXG5cdCAqIEdlbmVyaWMgYnVpbGRlciB0aGF0IHdvdWxkIHB1c2ggbm9kZXMgaW50byB0aGUgZURTTCBzdGFjay5cblx0ICogVXNlciBjb3VsZCBpbmhlcml0IHRoaXMgdG8gZGVmaW5lIHRoZSBuZXcgZURTTC5cblx0ICogLS0tXG5cdCAqIFRoZSBkZWZhdWx0IHNlbWFudGljcyBvbmx5IGNvbnRhaW4gdGhlc2Ugb3BlcmF0aW9uczpcblx0ICpcblx0ICogMS4gW3B1c2hdIDogcHVzaCB0byB0aGUgY3VycmVudCBzdGFja1xuXHQgKiAyLiBbYmVnaW5dOiBjcmVhdGUgYSBuZXcgc3RhY2sgYW5kIHN3aXRjaCB0byBpdCxcblx0ICogICAgICAgICAgICAgYW5kIHRoZW4gcHVzaCB0aGUgbm9kZSBpbnRvIHRoZSBzdGFjay5cblx0ICogMy4gW2VuZF0gIDogYWZ0ZXIgcHVzaCB0aGUgbm9kZSBpbnRvIHRoZSBzdGFjayxcblx0ICogICAgICAgICAgICAgY2hhbmdlIHRoZSBjdXJyZW50IHN0YWNrIHRvIHRoZSBwcmV2aW91cyBvbmUuXG5cdCAqIDQuIFtleGl0XSA6IGV4aXQgdGhlIGNvbnRleHQgb2YgdGhpcyBlRFNMOyB0aGUgbGFzdCByZXN1bHRcblx0ICogICAgICAgICAgICAgb2YgaXQgd291bGQgYmUgcGFzc2VkIHRvIHRoZSByZXR1cm4gdmFsdWUgb2Zcblx0ICogICAgICAgICAgICAgdGhpcyBjaGFpbi5cblx0ICpcblx0ICogU3RhY2sgY291bGQgYmUgbmVzdGVkOiB3aGVuIFtiZWdpbl0gYSBuZXcgc3RhY2sgaW4gZmFjdCBpdCB3b3VsZFxuXHQgKiBwdXNoIHRoZSBzdGFjayBpbnRvIHRoZSBwcmV2aW91cyBvbmUuIFNvIHRoZSBzdGFjayBjb21wcmlzZVxuXHQgKiBbbm9kZV0gYW5kIFtzdGFja10uXG5cdCAqIC0tLVxuXHQgKiBBbHRob3VnaCB0aGUgZURTTCBpbnN0YW5jZSBzaG91bGQgd3JhcCB0aGVzZSBiYXNpYyBvcGVyYXRpb25zXG5cdCAqIHRvIG1hbmlwdWxhdGUgdGhlIHN0YWNrLCB0aGV5IGFsbCBuZWVkIHRvIGNvbnZlcnQgdGhlIG1ldGhvZFxuXHQgKiBjYWxsIHRvIG5vZGVzLiBTbyAnUnVuZScgcHJvdmlkZSBhIHdheSB0byBzaW1wbGlmeSB0aGUgd29yazogaWZcblx0ICogdGhlIGluc3RhbmNlIGNhbGwgdGhlIFtkZWZpbmVdIG1ldGhvZCB0aGUgbmFtZSBvZiB0aGUgbWV0aG9kLFxuXHQgKiBpdCBjb3VsZCBhc3NvY2lhdGUgdGhlIG9wZXJhbmQgb2YgdGhlIGVEU0wgd2l0aCB0aGUgc3RhY2sgbWFuaXB1bGF0aW9uLlxuXHQgKiBGb3IgZXhhbXBsZTpcblx0ICpcblx0ICogICAgdmFyIGVEU0wgPSBmdW5jdGlvbigpIHt9O1xuXHQgKiAgICBlRFNMLnByb3RvdHlwZS50cmFuc2FjdGlvbiA9IFJ1bmUuZGVmaW5lKCd0cmFuc2FjdGlvbicsICdiZWdpbicpO1xuXHQgKiAgICBlRFNMLnByb3RvdHlwZS5wcmUgPSBSdW5lLmRlZmluZSgncHJlJywgJ3B1c2gnKTtcblx0ICogICAgZURTTC5wcm90b3R5cGUucGVyZm9ybSA9IFJ1bmUuZGVmaW5lKCdwZXJmb3JtJywgJ3B1c2gnKTtcblx0ICogICAgZURTTC5wcm90b3R5cGUucG9zdCA9IFJ1bmUuZGVmaW5lKCdwb3N0JywgJ2VuZCcpO1xuXHQgKlxuXHQgKiBUaGVuIHRoZSBlRFNMIGNvdWxkIGJlIHVzZWQgYXM6XG5cdCAqXG5cdCAqICAgIChuZXcgZURTTClcblx0ICogICAgICAudHJhbnNhY3Rpb24oKVxuXHQgKiAgICAgIC5wcmUoY2IpXG5cdCAqICAgICAgLnBlcmZvcm0oY2IpXG5cdCAqICAgICAgLnBvc3QoY2IpXG5cdCAqXG5cdCAqIEFuZCB0aGUgc3RhY2sgd291bGQgYmU6XG5cdCAqXG5cdCAqICAgIFtcblx0ICogICAgICBub2RlPCd0cmFuc2FjdGlvbicsPlxuXHQgKiAgICAgIG5vZGU8J3ByZScsIGNiPlxuXHQgKiAgICAgIG5vZGU8J3ByZWZvcm0nLCBjYj5cblx0ICogICAgICBub2RlPCdwb3N0JywgY2I+XG5cdCAqICAgIF1cblx0ICpcblx0ICogSG93ZXZlciwgdGhpcyBzaW1wbGUgYXBwcm9hY2ggdGhlIHNlbWFudGljcyBydWxlcyBhbmQgYW5hbHl6ZXJzIHRvXG5cdCAqIGd1YXJhbnRlZSB0aGUgc3RhY2sgaXMgdmFsaWQuIEZvciBleGFtcGxlLCBpZiB3ZSBoYXZlIGEgbWFsZm9ybWVkXG5cdCAqIHN0YWNrIGJlY2F1c2Ugb2YgdGhlIGZvbGxvd2luZyBlRFNMIHByb2dyYW06XG5cdCAqXG5cdCAqICAgIChuZXcgZURTTClcblx0ICogICAgICAucG9zdChjYilcblx0ICogICAgICAucHJlKGNiKVxuXHQgKiAgICAgIC5wZXJmb3JtKGNiKVxuXHQgKiAgICAgIC50cmFuc2FjdGlvbigpXG5cdCAqXG5cdCAqIFRoZSBydW50aW1lIG1heSByZXBvcnQgZXJyb3QgYmVjYXVzZSB3aGVuICcucG9zdChjYiknIHRoZXJlIGlzIG5vIHN0YWNrXG5cdCAqIGNyZWF0ZWQgYnkgdGhlIGJlZ2lubmluZyBzdGVwLCBuYW1lbHkgdGhlICcucHJlKGNiKScgaW4gb3VyIGNhc2UuXG5cdCAqIE5ldmVydGhlbGVzcywgdGhlIGVycm9yIG1lc3NhZ2UgaXMgdG9vIGxvdy1sZXZlbCBmb3IgdGhlIGxhbmd1YWdlIHVzZXIsXG5cdCAqIHNpbmNlIHRoZXkgc2hvdWxkIGNhcmUgbm8gc3RhY2sgdGhpbmdzIGFuZCBzaG91bGQgb25seSBjYXJlIGFib3V0IHRoZSBlRFNMXG5cdCAqIGl0c2VsZi5cblx0ICpcblx0ICogVGhlIHNvbHV0aW9uIGlzIHRvIHByb3ZpZGUgYSBiYXNpYyBzdGFjayBvcmRlcmluZyBhbmFseXplciBhbmQgbGV0IHRoZVxuXHQgKiBsYW5ndWFnZSBkZWNpZGUgaG93IHRvIGRlc2NyaWJlIHRoZSBlcnJvci4gQW5kIHNpbmNlIHdlIGRvbid0IGhhdmVcblx0ICogYW55IGNvbnRleHQgaW5mb3JtYXRpb24gYWJvdXQgdmFyaWFibGVzLCBzY29wZSBhbmQgb3RoZXIgZWxlbWVudHNcblx0ICogYXMgYSBjb21wbGV0ZSBwcm9ncmFtbWluZyBsYW5ndWFnZSwgd2Ugb25seSBuZWVkIHRvIGd1YXJhbnRlZSB0aGUgb3JkZXIgaXNcblx0ICogY29ycmVjdCwgYW5kIG1ha2UgaW5jb3JyZWN0IGNhc2VzIG1lYW5pbmdmdWwuIE1vcmVvdmVyLCBzaW5jZSB0aGUgYW5hbHl6ZXJcblx0ICogbmVlZHMgdG8gYW5hbHl6ZSB0aGUgc3RhdGVzIHdoZW5ldmVyIHRoZSBpbmNvbWluZyBub2RlIGNvbWVzLCBpdCBpcyBpbiBmYWN0XG5cdCAqIGFuIGV2YWx1YXRpb24gcHJvY2Vzcywgc28gdXNlciBjb3VsZCBjb21iaW5lIHRoZSBhbmFseXppbmcgYW5kIGludGVycHJldGluZ1xuXHQgKiBwaGFzZSBpbnRvIHRoZSBzYW1lIGZ1bmN0aW9uLiBGb3IgZXhhbXBsZTpcblx0ICpcblx0ICogICAgcnVudGltZS5vbmNoYW5nZSgoY29udGV4dCwgbm9kZSwgc3RhY2spID0+IHtcblx0ICogICAgICAgIC8vIElmIHRoZSBjaGFuZ2UgaXMgdG8gc3dpdGNoIHRvIGEgbmV3IHN0YWNrLFxuXHQgKiAgICAgICAgLy8gdGhlICdzdGFjaycgaGVyZSB3b3VsZCBiZSB0aGUgbmV3IHN0YWNrLlxuXHQgKiAgICAgICAgdmFyIHt0eXBlLCBhcmdzfSA9IG5vZGU7XG5cdCAqICAgICAgICBpZiAoJ3ByZScgPT09IHR5cGUpIHtcblx0ICogICAgICAgICAgY29udGV4dC5pbml0ID0gdHJ1ZTtcblx0ICogICAgICAgIH0gZWxzZSBpZiAoJ3Bvc3QnID09PSB0eXBlICYmICFjb250ZXh0LmluaXQpIHtcblx0ICogICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdUaGVyZSBtdXN0IGJlIG9uZSBcInByZVwiIG5vZGUgYmVmb3JlIHRoZSBcInBvc3RcIi4nKTtcblx0ICogICAgICAgIH1cblx0ICogICAgfSk7XG5cdCAqXG5cdCAqIFdpdGggc3VjaCBmZWF0dXJlLCBpZiB0aGUgaW5jb21pbmcgbm9kZSBvciB0aGUgc3RhY2sgaXMgbWFsZm9ybWVkLFxuXHQgKiBpdCBzaG91bGQgdGhyb3cgdGhlIGVycm9yLiBUaGUgZXJyb3IgY2FwdHVyZWQgYnkgdGhlIGluc3RhbmNlIGxpa2UgdGhpc1xuXHQgKiBjb3VsZCBiZSBhICdjb21waWxhdGlvbiBlcnJvcicuXG5cdCAqXG5cdCAqIFRoZSBub3RpY2VhYmxlIGZhY3QgaXMgVGhlIGNhbGxiYWNrIG9mIHRoZSAnb25jaGFuZ2UnIGlzIGFjdHVhbGx5IGEgcmVkdWNlcixcblx0ICogc28gdXNlciBjb3VsZCB0cmVhdCB0aGUgcHJvY2VzcyBvZiB0aGlzIGV2YWx1YXRpb24gJiBhbmFseXppbmcgYXMgYSByZWR1Y2luZ1xuXHQgKiBwcm9jZXNzIG9uIGFuIGluZmluaXRlIHN0cmVhbS4gQW5kIHNpbmNlIHdlIGhhdmUgYSBzdGFjayBtYWNoaW5lLCBpZiB0aGVcblx0ICogcmVkdWNlciByZXR1cm4gbm90aGluZywgdGhlIHN0YWNrIHdvdWxkIGJlIGVtcHR5LiBPdGhlcndpc2UsIGlmIHRoZSByZWR1Y2VyXG5cdCAqIHJldHVybiBhIG5ldyBzdGFjaywgaXQgd291bGQgcmVwbGFjZSB0aGUgb2xkIG9uZS5cblx0ICpcblx0ICogQW5kIHBsZWFzZSBub3RlIHRoZSBleGFtcGxlIGlzIG11Y2ggc2ltcGxpZmllZC4gRm9yIHRoZVxuXHQgKiByZWFsIGVEU0wgaXQgc2hvdWxkIGJlIHVzZWQgb25seSBhcyBhbiBlbnRyeSB0byBkaXNwYXRjaCB0aGUgY2hhbmdlIHRvXG5cdCAqIHRoZSByZWFsIGhhbmRsZXJzLCB3aGljaCBtYXkgY29tcHJpc2Ugc2V2ZXJhbCBzdGF0ZXMgYW5kIGNvbXBvbmVudHMuXG5cdCAqL1xuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7XG5cdCAgdmFsdWU6IHRydWVcblx0fSk7XG5cdGV4cG9ydHMuUnVuZSA9IFJ1bmU7XG5cdFxuXHRmdW5jdGlvbiBSdW5lKCkge31cblx0XG5cdC8qKlxuXHQgKiBIZWxwZXIgbWV0aG9kIHRvIGJ1aWxkIGludGVyZmFjZSBvZiBhIHNwZWNpZmljIERTTC4gSXQgd291bGQgcmV0dXJuIGEgbWV0aG9kXG5cdCAqIG9mIHRoZSBEU0wgYW5kIHRoZW4gdGhlIGludGVyZmFjZSBjb3VsZCBhdHRhY2ggaXQuXG5cdCAqXG5cdCAqIFRoZSByZXR1cm5pbmcgZnVuY3Rpb24gd291bGQgYXNzdW1lIHRoYXQgdGhlICd0aGlzJyBpbnNpZGUgaXQgaXMgdGhlIHJ1bnRpbWVcblx0ICogb2YgdGhlIGxhbmd1YWdlLiBBbmQgc2luY2UgdGhlIG1ldGhvZCBpdCByZXR1cm5zIHdvdWxkIHJlcXVpcmUgdG8gYWNjZXNzIHNvbWVcblx0ICogbWVtYmVycyBvZiB0aGUgJ3RoaXMnLCB0aGUgJ3RoaXMnIHNob3VsZCBoYXZlICd0aGlzLnN0YWNrJyBhbmQgJ3RoaXMuY29udGV4dCdcblx0ICogYXMgdGhlIG1ldGhvZCByZXF1aXJlcy5cblx0ICpcblx0ICogSWYgaXQncyBhbiAnZXhpdCcgbm9kZSwgbWVhbnMgdGhlIHNlc3Npb24gaXMgZW5kZWQgYW5kIHRoZSBpbnRlcnByZXRlciBzaG91bGRcblx0ICogcmV0dXJuIGEgc3RhY2sgY29udGFpbnMgb25seSBvbmUgbm9kZSBhcyB0aGUgcmVzdWx0IG9mIHRoZSBzZXNzaW9uLCBvciB0aGVcblx0ICogc2Vzc2lvbiByZXR1cm5zIG5vdGhpbmcuIEZvciBvdGhlciBpbnN0cnVjdGlvbnMgdGhlIHN0YWNrIGNhbiBrZWVwIHNvbWVcblx0ICogY29tcHV0ZWQgcmVzdWx0IHRvIHNpbXVsYXRlIHJlYWwgc3RhY2sgbWFjaGluZS4gQnV0IGl0J3MgT0sgdG8gbm90IHVzZSB0aGlzXG5cdCAqIGZlYXR1cmUgYW5kIGFsd2F5cyByZXR1cm4gYW4gZW1wdHkgJ3N0YWNrJyBldmVyeXRpbWUgdGhlICdvbmNoYW5nZScgZ2V0XG5cdCAqIGNhbGxlZCBhbmQgaW50ZXJ1cHRlZC4gSW4gdGhpcyBtb2RlIGl0IG1lYW5zIHRoZSBsYW5ndWFnZSB3YW50IHRvIGtlZXBcblx0ICogYWxsIHN0YXRlcyBieSBpdHNlbGYuXG5cdCAqXG5cdCAqIFBsZWFzZSBub3RlIHRoYXQgZnJvbSB0aGUgZGVzY3JpcHRpb24gYWJvdmUsICdlbmQnIG1lYW5zIHN0YWNrIChzdWJzdGFjaylcblx0ICogZW5kcy4gSXQncyB0b3RhbGx5IGlycmVsZXZhbnQgdG8gJ2V4aXQnLlxuXHQgKlxuXHQgKiBUaGUgbGFzdCBhcmd1bWVudCAnZG9jJyBpcyB3aGF0IGRlc2lnbmVyIGNvdWxkIHB1dCB0aGUgZGVzY3JpcHRpb24gYWJvdXRcblx0ICogdGhlIG1ldGhvZC4gSWYgc2V0LCBpdCB3b3VsZCBhcHBlbmQgdGhlICdydW5lLmRvYydcblx0ICogcHJvcGVydHkgaW4gdGhlIGZ1bmN0aW9uIGl0IHJldHVybnMuIEFuZCB0aGVuIHRoZSBsYW5ndWFnZSBpbnN0YW5jZSBjb3VsZFxuXHQgKiBjYWxsIGBSdW5lLmRvY3VtZW50KDxpbnN0YW5jZT4pYCB0byBnZXQgYSBtZXRob2QgdGhhdCB3b3VsZCByZXR1cm5cblx0ICogJ3sgbWV0aG9kTmFtZTogZGVzY3JpcHRpb24gfScgd2hlbiBpdCBnb3QgaW52b2tlZC5cblx0ICovXG5cdFJ1bmUuZGVmaW5lID0gZnVuY3Rpb24gKG1ldGhvZCwgYXMpIHtcblx0ICB2YXIgZG9jID0gYXJndW1lbnRzLmxlbmd0aCA8PSAyIHx8IGFyZ3VtZW50c1syXSA9PT0gdW5kZWZpbmVkID8gJycgOiBhcmd1bWVudHNbMl07XG5cdFxuXHQgIHZhciBidWlsdCA9IGZ1bmN0aW9uIGJ1aWx0KCkge1xuXHQgICAgdmFyIG5vZGUsIHJlc3VsdHN0YWNrO1xuXHRcblx0ICAgIGZvciAodmFyIF9sZW4gPSBhcmd1bWVudHMubGVuZ3RoLCBhcmdzID0gQXJyYXkoX2xlbiksIF9rZXkgPSAwOyBfa2V5IDwgX2xlbjsgX2tleSsrKSB7XG5cdCAgICAgIGFyZ3NbX2tleV0gPSBhcmd1bWVudHNbX2tleV07XG5cdCAgICB9XG5cdFxuXHQgICAgc3dpdGNoIChhcykge1xuXHQgICAgICBjYXNlICdwdXNoJzpcblx0ICAgICAgICBub2RlID0gbmV3IFJ1bmUuTm9kZShtZXRob2QsIGFyZ3MsIHRoaXMuc3RhY2spO1xuXHQgICAgICAgIHRoaXMuc3RhY2sucHVzaChub2RlKTtcblx0ICAgICAgICByZXN1bHRzdGFjayA9IHRoaXMub25jaGFuZ2UodGhpcy5jb250ZXh0LCBub2RlLCB0aGlzLnN0YWNrKTtcblx0ICAgICAgICBicmVhaztcblx0ICAgICAgY2FzZSAnYmVnaW4nOlxuXHQgICAgICAgIHRoaXMuX3ByZXZzdGFjayA9IHRoaXMuc3RhY2s7XG5cdCAgICAgICAgdGhpcy5zdGFjayA9IFtdO1xuXHQgICAgICAgIG5vZGUgPSBuZXcgUnVuZS5Ob2RlKG1ldGhvZCwgYXJncywgdGhpcy5zdGFjayk7XG5cdCAgICAgICAgdGhpcy5zdGFjay5wdXNoKG5vZGUpOyAvLyBhcyB0aGUgZmlyc3Qgbm9kZSBvZiB0aGUgbmV3IHN0YWNrLlxuXHQgICAgICAgIHJlc3VsdHN0YWNrID0gdGhpcy5vbmNoYW5nZSh0aGlzLmNvbnRleHQsIG5vZGUsIHRoaXMuc3RhY2spO1xuXHQgICAgICAgIGJyZWFrO1xuXHQgICAgICBjYXNlICdlbmQnOlxuXHQgICAgICAgIG5vZGUgPSBuZXcgUnVuZS5Ob2RlKG1ldGhvZCwgYXJncywgdGhpcy5zdGFjayk7XG5cdCAgICAgICAgdGhpcy5zdGFjay5wdXNoKG5vZGUpOyAvLyB0aGUgbGFzdCBub2RlIG9mIHRoZSBzdGFjay5cblx0ICAgICAgICB0aGlzLnN0YWNrID0gdGhpcy5fcHJldnN0YWNrOyAvLyBzd2l0Y2ggYmFjayB0byB0aGUgcHJldmlvdXMgc3RhY2suXG5cdCAgICAgICAgcmVzdWx0c3RhY2sgPSB0aGlzLm9uY2hhbmdlKHRoaXMuY29udGV4dCwgbm9kZSwgdGhpcy5zdGFjayk7XG5cdCAgICAgICAgYnJlYWs7XG5cdCAgICAgIGNhc2UgJ2V4aXQnOlxuXHQgICAgICAgIG5vZGUgPSBuZXcgUnVuZS5Ob2RlKG1ldGhvZCwgYXJncywgdGhpcy5zdGFjayk7XG5cdCAgICAgICAgdGhpcy5zdGFjay5wdXNoKG5vZGUpOyAvLyB0aGUgbGFzdCBub2RlIG9mIHRoZSBzdGFjay5cblx0ICAgICAgICByZXN1bHRzdGFjayA9IHRoaXMub25jaGFuZ2UodGhpcy5jb250ZXh0LCBub2RlLCB0aGlzLnN0YWNrKTtcblx0ICAgICAgICBpZiAoIXJlc3VsdHN0YWNrKSB7XG5cdCAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1xcJ2V4aXRcXCcgbm9kZSBcXCcnICsgbm9kZS50eXBlICsgJ1xcJyBzaG91bGRcXG4gICAgICAgICAgICByZXR1cm4gYSByZXN1bHRzdGFjay4nKTtcblx0ICAgICAgICB9XG5cdCAgICAgICAgcmV0dXJuIHJlc3VsdHN0YWNrWzBdO1xuXHQgICAgfVxuXHQgICAgLy8gSWYgdGhlIGhhbmRsZXIgdXBkYXRlcyB0aGUgc3RhY2ssIGl0IHdvdWxkIHJlcGxhY2UgdGhlIGV4aXN0aW5nIG9uZS5cblx0ICAgIGlmIChyZXN1bHRzdGFjaykge1xuXHQgICAgICB0aGlzLnN0YWNrID0gcmVzdWx0c3RhY2s7XG5cdCAgICB9XG5cdCAgICByZXR1cm4gdGhpcztcblx0ICB9O1xuXHQgIGJ1aWx0LnJ1bmUgPSB7XG5cdCAgICAnYXMnOiBhcyxcblx0ICAgICdkb2MnOiBkb2MsXG5cdCAgICAnbWV0aG9kJzogbWV0aG9kXG5cdCAgfTtcblx0ICByZXR1cm4gYnVpbHQ7XG5cdH07XG5cdFxuXHQvKipcblx0ICogR2VuZXJhdGUgYSBtZXRob2QgdGhhdCB3b3VsZCByZXR1cm4gYWxsIGRvY3VtZW50cyBvZiB0aGUgbWV0aG9kcyxcblx0ICogaW4gYSBmb3JtIG9mICd7IG1ldGhvZE5hbWU6IGRlc2NyaXB0aW9uIH0nLlxuXHQgKlxuXHQgKiBUaGUgYXJndW1lbnQgbXVzdCBiZSB0aGUgbGFuZ3VhZ2UgaW5zdGFuY2Ugd2l0aCBhbGwgZGVmaW5lZCBtZXRob2RzLlxuXHQgKi9cblx0UnVuZS5wdWJsaXNoID0gZnVuY3Rpb24gKGluc3RhbmNlKSB7XG5cdCAgdmFyIGdlbmVyYXRlZCA9IE9iamVjdC5rZXlzKGluc3RhbmNlKS5yZWR1Y2UoZnVuY3Rpb24gKGRvYywgbmFtZSkge1xuXHQgICAgdmFyIG1ldGhvZCA9IGluc3RhbmNlW25hbWVdO1xuXHQgICAgaWYgKG1ldGhvZC5ydW5lKSB7XG5cdCAgICAgIGRvY1tuYW1lXSA9IG1ldGhvZC5ydW5lLmRvYztcblx0ICAgIH1cblx0ICB9LCB7fSk7XG5cdCAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcblx0ICAgIHJldHVybiBnZW5lcmF0ZWQ7XG5cdCAgfTtcblx0fTtcblx0XG5cdFJ1bmUuTm9kZSA9IGZ1bmN0aW9uICh0eXBlLCBhcmdzLCBzdGFjaykge1xuXHQgIHRoaXMudHlwZSA9IHR5cGU7XG5cdCAgdGhpcy5hcmdzID0gYXJncztcblx0ICB0aGlzLnN0YWNrID0gc3RhY2s7XG5cdH07XG5cdFxuXHRSdW5lLkV2YWx1YXRlID0gZnVuY3Rpb24gKCkge1xuXHQgIHZhciBjb250ZXh0ID0gYXJndW1lbnRzLmxlbmd0aCA8PSAwIHx8IGFyZ3VtZW50c1swXSA9PT0gdW5kZWZpbmVkID8ge30gOiBhcmd1bWVudHNbMF07XG5cdFxuXHQgIHRoaXMuX2FuYWx5emVycyA9IFtdO1xuXHQgIHRoaXMuX2ludGVycHJldGVyID0gbnVsbDtcblx0ICB0aGlzLl9jb250ZXh0ID0gY29udGV4dDtcblx0fTtcblx0XG5cdC8qKlxuXHQgKiBBbmFseXplciBjb3VsZCByZWNlaXZlIHRoZSBzdGFjayBjaGFuZ2UgZnJvbSAnUnVuZSNldmFsdWF0ZScsXG5cdCAqIGFuZCBpdCB3b3VsZCBiZSBjYWxsZWQgd2l0aCB0aGUgYXJndW1lbnRzIGFzIHRoZSBmdW5jdGlvbiBkZXNjcmliZXM6XG5cdCAqXG5cdCAqICAgICBSdW5lLnByb3RvdHlwZS5ldmFsdWF0ZSgoY29udGV4dCwgY2hhbmdlLCBzdGFjaykgPT4ge1xuXHQgKiAgICAgICAgLy8gLi4uXG5cdCAqICAgICB9KTtcblx0ICpcblx0ICogU28gdGhlIGFuYWx5emVyIGNvdWxkIGJlOlxuXHQgKlxuXHQgKiAgICBmdW5jdGlvbihjb250ZXh0LCBjaGFuZ2UsIHN0YWNrKSB7XG5cdCAqICAgICAgLy8gRG8gc29tZSBjaGVjayBhbmQgbWF5YmUgY2hhbmdlZCB0aGUgY29udGV4dC5cblx0ICogICAgICAvLyBUaGUgbmV4dCBhbmFseXplciB0byB0aGUgaW50ZXJwcmV0ZXIgd291bGQgYWNjZXB0IHRoZSBhbHRlcm5hdGVkXG5cdCAqICAgICAgLy8gY29udGV4dCBhcyB0aGUgYXJndW1lbnQgJ2NvbnRleHQnLlxuXHQgKiAgICAgIGNvbnRleHQuc29tZUZsYWcgPSB0cnVlO1xuXHQgKiAgICAgIC8vIFdoZW4gdGhlcmUgaXMgd3JvbmcsIHRocm93IGl0LlxuXHQgKiAgICAgIHRocm93IG5ldyBFcnJvcignU29tZSBhbmFseXppbmcgZXJyb3InKTtcblx0ICogICAgfTtcblx0ICpcblx0ICogTm90ZSB0aGF0IHRoZSBhbmFseXplciAoJ2EnKSB3b3VsZCBiZSBpbnZva2VkIHdpdGggZW1wdHkgJ3RoaXMnIG9iamVjdCxcblx0ICogc28gdGhlIGZ1bmN0aW9uIHJlbGllcyBvbiAndGhpcycgc2hvdWxkIGJpbmQgaXRzZWxmIGZpcnN0LlxuXHQgKi9cblx0UnVuZS5FdmFsdWF0ZS5wcm90b3R5cGUuYW5hbHl6ZXIgPSBmdW5jdGlvbiAoYSkge1xuXHQgIHRoaXMuX2FuYWx5emVycy5wdXNoKGEpO1xuXHQgIHJldHVybiB0aGlzO1xuXHR9O1xuXHRcblx0LyoqXG5cdCAqIE9uZSBFdmFsdWF0ZSBjYW4gb25seSBoYXZlIG9uZSBpbnRlcnByZXRlciwgYW5kIGl0IHdvdWxkIHJldHVyblxuXHQgKiB0aGUgZnVuY3Rpb24gY291bGQgY29uc3VtZSBldmVyeSBzdGFjayBjaGFuZ2UgZnJvbSAnUnVuZSNldmFsdWF0ZScuXG5cdCAqXG5cdCAqIFRoZSBjb2RlIGlzIGEgbGl0dGxlIGNvbXBsaWNhdGVkOiB3ZSBoYXZlIHR3byBraW5kcyBvZiAncmVkdWNpbmcnOlxuXHQgKiBvbmUgaXMgdG8gcmVkdWNlIGFsbCBhbmFseXplcnMgd2l0aCB0aGUgc2luZ2xlIGluY29taW5nIGNoYW5nZSxcblx0ICogYW5vdGhlciBpcyB0byByZWR1Y2UgYWxsIGluY29taW5nIGNoYW5nZXMgd2l0aCB0aGlzIGFuYWx5emVycyArIGludGVycHJldGVyLlxuXHQgKlxuXHQgKiBUaGUgYW5hbHl6ZXIgYW5kIGludGVycHJldGVyIHNob3VsZCBjaGFuZ2UgdGhlIGNvbnRleHQsIHRvIG1lbW9yaXplIHRoZVxuXHQgKiBzdGF0ZXMgb2YgdGhlIGV2YWx1YXRpb24uIFRoZSBkaWZmZXJlbmNlIGlzIGludGVycHJldGVyIHNob3VsZCByZXR1cm4gb25lXG5cdCAqIG5ldyBzdGFjayBpZiBpdCBuZWVkcyB0byB1cGRhdGUgdGhlIGV4aXN0aW5nIG9uZS4gVGhlIHN0YWNrIGl0IHJldHVybnMgd291bGRcblx0ICogcmVwbGFjZSB0aGUgZXhpc3Rpbmcgb25lLCBzbyBhbnl0aGluZyBzdGlsbCBpbiB0aGUgb2xkIG9uZSB3b3VsZCBiZSB3aXBlZFxuXHQgKiBvdXQuIFRoZSBpbnRlcnByZXRlciBjb3VsZCByZXR1cm4gbm90aGluZyAoJ3VuZGVmaW5lZCcpIHRvIGtlZXAgdGhlIHN0YWNrXG5cdCAqIHVudG91Y2hlZC5cblx0ICpcblx0ICogVGhlIGFuYWx5emVycyBhbmQgaW50ZXJwcmV0ZXIgY291bGQgY2hhbmdlIHRoZSAnY29udGV4dCcgcGFzcyB0byB0aGVtLlxuXHQgKiBBbmQgc2luY2Ugd2UgbWF5IHVwZGF0ZSB0aGUgc3RhY2sgYXMgYWJvdmUsIHRoZSBjb250ZXh0IHNob3VsZCBtZW1vcml6ZVxuXHQgKiB0aG9zZSBpbmZvcm1hdGlvbiBub3QgdG8gYmUgb3ZlcndyaXR0ZW4gd2hpbGUgdGhlIHN0YWNrIGdldCB3aXBlZCBvdXQuXG5cdCAqXG5cdCAqIEFuZCBpZiB0aGUgaW50ZXJwcmV0aW5nIG5vZGUgaXMgdGhlIGV4aXQgbm9kZSBvZiB0aGUgc2Vzc2lvbiwgaW50ZXJwcmV0ZXJcblx0ICogc2hvdWxkIHJldHVybiBhIG5ldyBzdGFjayBjb250YWlucyBvbmx5IG9uZSBmaW5hbCByZXN1bHQgbm9kZS4gSWYgdGhlcmVcblx0ICogaXMgbm8gc3VjaCBub2RlLCB0aGUgcmVzdWx0IG9mIHRoaXMgc2Vzc2lvbiBpcyAndW5kZWZpbmVkJy5cblx0ICovXG5cdFJ1bmUuRXZhbHVhdGUucHJvdG90eXBlLmludGVycHJldGVyID0gZnVuY3Rpb24gKGlucHQpIHtcblx0ICB2YXIgX3RoaXMgPSB0aGlzO1xuXHRcblx0ICAvLyBUaGUgY3VzdG9taXplZCBsYW5ndWFnZSBzaG91bGQgZ2l2ZSB0aGUgZGVmYXVsdCBjb250ZXh0LlxuXHQgIHJldHVybiBmdW5jdGlvbiAoY29udGV4dCwgY2hhbmdlLCBzdGFjaykge1xuXHQgICAgdHJ5IHtcblx0ICAgICAgLy8gQW5hbHl6ZXJzIGNvdWxkIGNoYW5nZSB0aGUgY29udGV4dC5cblx0ICAgICAgX3RoaXMuX2FuYWx5emVycy5yZWR1Y2UoZnVuY3Rpb24gKGN0eCwgYW5hbHl6ZXIpIHtcblx0ICAgICAgICBhbmFseXplci5jYWxsKHt9LCBjb250ZXh0LCBjaGFuZ2UsIHN0YWNrKTtcblx0ICAgICAgfSwgY29udGV4dCk7XG5cdCAgICB9IGNhdGNoIChlKSB7XG5cdCAgICAgIF90aGlzLl9oYW5kbGVFcnJvcihlLCBjb250ZXh0LCBjaGFuZ2UsIHN0YWNrKTtcblx0ICAgIH1cblx0ICAgIC8vIEFmdGVyIGFuYWx5emUgaXQsIGludGVycHJldCB0aGUgbm9kZSBhbmQgcmV0dXJuIHRoZSBuZXcgc3RhY2sgKGlmIGFueSkuXG5cdCAgICB2YXIgbmV3U3RhY2sgPSBpbnB0KGNvbnRleHQsIGNoYW5nZSwgc3RhY2spO1xuXHQgICAgcmV0dXJuIG5ld1N0YWNrO1xuXHQgIH07XG5cdH07XG5cdFxuXHRSdW5lLkV2YWx1YXRlLnByb3RvdHlwZS5faGFuZGxlRXJyb3IgPSBmdW5jdGlvbiAoZXJyLCBjb250ZXh0LCBjaGFuZ2UsIHN0YWNrKSB7XG5cdCAgLy8gVE9ETzogZXhwYW5kIGl0IHRvIHByb3ZpZGUgbW9yZSBzb3BoaXN0aWMgZGVidWdnaW5nIG1lc3NhZ2UuXG5cdCAgdGhyb3cgbmV3IEVycm9yKCdXaGVuIGNoYW5nZSAnICsgY2hhbmdlLnR5cGUgKyAnIGNvbWVzIGVycm9yIFxcJycgKyBlcnIgKyAnXFwnIGhhcHBlbmVkJyk7XG5cdH07XG5cdGNvbnNvbGUubG9nKCc+Pj4+Pj4gUnVuZScpO1xuXG4vKioqLyB9XG4vKioqKioqLyBdKSkpO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxleUoyWlhKemFXOXVJam96TENKemIzVnlZMlZ6SWpwYkluZGxZbkJoWTJzNkx5OHZkMlZpY0dGamF5OWliMjkwYzNSeVlYQWdNMll5WXpZMk9UWXhZekkyWWpCaU9ESmxZMllpTENKM1pXSndZV05yT2k4dkx5NHZjM0pqTDNKMWJtVXVhbk1pWFN3aWJtRnRaWE1pT2x0ZExDSnRZWEJ3YVc1bmN5STZJanRCUVVGQk8wRkJRMEU3TzBGQlJVRTdRVUZEUVRzN1FVRkZRVHRCUVVOQk8wRkJRMEU3TzBGQlJVRTdRVUZEUVR0QlFVTkJMSFZDUVVGbE8wRkJRMlk3UVVGRFFUdEJRVU5CT3p0QlFVVkJPMEZCUTBFN08wRkJSVUU3UVVGRFFUczdRVUZGUVR0QlFVTkJPMEZCUTBFN096dEJRVWRCTzBGQlEwRTdPMEZCUlVFN1FVRkRRVHM3UVVGRlFUdEJRVU5CT3p0QlFVVkJPMEZCUTBFN096czdPenM3UVVOMFEwRXNZVUZCV1N4RFFVRkRPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN08wRkJjVWRPTEZWQlFWTXNTVUZCU1N4SFFVRkhMRVZCUVVVN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN1FVRTBRbnBDTEV0QlFVa3NRMEZCUXl4TlFVRk5MRWRCUVVjc1ZVRkJVeXhOUVVGTkxFVkJRVVVzUlVGQlJTeEZRVUZaTzA5QlFWWXNSMEZCUnl4NVJFRkJSeXhGUVVGRk96dEJRVU42UXl4UFFVRkpMRXRCUVVzc1IwRkJSeXhUUVVGU0xFdEJRVXNzUjBGQmNVSTdRVUZETlVJc1UwRkJTU3hKUVVGSkxFVkJRVVVzVjBGQlZ5eERRVUZET3p0MVEwRkVRU3hKUVVGSk8wRkJRVW9zVjBGQlNUczdPMEZCUlRGQ0xHRkJRVkVzUlVGQlJUdEJRVU5TTEZsQlFVc3NUVUZCVFR0QlFVTlVMR0ZCUVVrc1IwRkJSeXhKUVVGSkxFbEJRVWtzUTBGQlF5eEpRVUZKTEVOQlFVTXNUVUZCVFN4RlFVRkZMRWxCUVVrc1JVRkJSU3hKUVVGSkxFTkJRVU1zUzBGQlN5eERRVUZETEVOQlFVTTdRVUZETDBNc1lVRkJTU3hEUVVGRExFdEJRVXNzUTBGQlF5eEpRVUZKTEVOQlFVTXNTVUZCU1N4RFFVRkRMRU5CUVVNN1FVRkRkRUlzYjBKQlFWY3NSMEZEVkN4SlFVRkpMRU5CUVVNc1VVRkJVU3hEUVVGRExFbEJRVWtzUTBGQlF5eFBRVUZQTEVWQlFVVXNTVUZCU1N4RlFVRkZMRWxCUVVrc1EwRkJReXhMUVVGTExFTkJRVU1zUTBGQlF6dEJRVU5vUkN4bFFVRk5PMEZCUTFJc1dVRkJTeXhQUVVGUE8wRkJRMVlzWVVGQlNTeERRVUZETEZWQlFWVXNSMEZCUnl4SlFVRkpMRU5CUVVNc1MwRkJTeXhEUVVGRE8wRkJRemRDTEdGQlFVa3NRMEZCUXl4TFFVRkxMRWRCUVVjc1JVRkJSU3hEUVVGRE8wRkJRMmhDTEdGQlFVa3NSMEZCUnl4SlFVRkpMRWxCUVVrc1EwRkJReXhKUVVGSkxFTkJRVU1zVFVGQlRTeEZRVUZGTEVsQlFVa3NSVUZCUlN4SlFVRkpMRU5CUVVNc1MwRkJTeXhEUVVGRExFTkJRVU03UVVGREwwTXNZVUZCU1N4RFFVRkRMRXRCUVVzc1EwRkJReXhKUVVGSkxFTkJRVU1zU1VGQlNTeERRVUZETEVOQlFVTTdRVUZEZEVJc2IwSkJRVmNzUjBGRFZDeEpRVUZKTEVOQlFVTXNVVUZCVVN4RFFVRkRMRWxCUVVrc1EwRkJReXhQUVVGUExFVkJRVVVzU1VGQlNTeEZRVUZGTEVsQlFVa3NRMEZCUXl4TFFVRkxMRU5CUVVNc1EwRkJRenRCUVVOb1JDeGxRVUZOTzBGQlExSXNXVUZCU3l4TFFVRkxPMEZCUTFJc1lVRkJTU3hIUVVGSExFbEJRVWtzU1VGQlNTeERRVUZETEVsQlFVa3NRMEZCUXl4TlFVRk5MRVZCUVVVc1NVRkJTU3hGUVVGRkxFbEJRVWtzUTBGQlF5eExRVUZMTEVOQlFVTXNRMEZCUXp0QlFVTXZReXhoUVVGSkxFTkJRVU1zUzBGQlN5eERRVUZETEVsQlFVa3NRMEZCUXl4SlFVRkpMRU5CUVVNc1EwRkJRenRCUVVOMFFpeGhRVUZKTEVOQlFVTXNTMEZCU3l4SFFVTlNMRWxCUVVrc1EwRkJReXhWUVVGVkxFTkJRVU03UVVGRGJFSXNiMEpCUVZjc1IwRkRWQ3hKUVVGSkxFTkJRVU1zVVVGQlVTeERRVUZETEVsQlFVa3NRMEZCUXl4UFFVRlBMRVZCUVVVc1NVRkJTU3hGUVVGRkxFbEJRVWtzUTBGQlF5eExRVUZMTEVOQlFVTXNRMEZCUXp0QlFVTm9SQ3hsUVVGTk8wRkJRMUlzV1VGQlN5eE5RVUZOTzBGQlExUXNZVUZCU1N4SFFVRkhMRWxCUVVrc1NVRkJTU3hEUVVGRExFbEJRVWtzUTBGQlF5eE5RVUZOTEVWQlFVVXNTVUZCU1N4RlFVRkZMRWxCUVVrc1EwRkJReXhMUVVGTExFTkJRVU1zUTBGQlF6dEJRVU12UXl4aFFVRkpMRU5CUVVNc1MwRkJTeXhEUVVGRExFbEJRVWtzUTBGQlF5eEpRVUZKTEVOQlFVTXNRMEZCUXp0QlFVTjBRaXh2UWtGQlZ5eEhRVU5VTEVsQlFVa3NRMEZCUXl4UlFVRlJMRU5CUVVNc1NVRkJTU3hEUVVGRExFOUJRVThzUlVGQlJTeEpRVUZKTEVWQlFVVXNTVUZCU1N4RFFVRkRMRXRCUVVzc1EwRkJReXhEUVVGRE8wRkJRMmhFTEdGQlFVa3NRMEZCUXl4WFFVRlhMRVZCUVVVN1FVRkRhRUlzYVVKQlFVMHNTVUZCU1N4TFFVRkxMSE5DUVVGcFFpeEpRVUZKTEVOQlFVTXNTVUZCU1N4clJFRkRhRUlzUTBGQlF6dFZRVU16UWp0QlFVTkVMR2RDUVVGUExGZEJRVmNzUTBGQlF5eERRVUZETEVOQlFVTXNRMEZCUXp0QlFVRkJMRTFCUTNwQ096dEJRVVZFTEZOQlFVa3NWMEZCVnl4RlFVRkZPMEZCUTJZc1YwRkJTU3hEUVVGRExFdEJRVXNzUjBGQlJ5eFhRVUZYTEVOQlFVTTdUVUZETVVJN1FVRkRSQ3haUVVGUExFbEJRVWtzUTBGQlF6dEpRVU5pTEVOQlFVTTdRVUZEUml4UlFVRkxMRU5CUVVNc1NVRkJTU3hIUVVGSE8wRkJRMWdzVTBGQlNTeEZRVUZGTEVWQlFVVTdRVUZEVWl4VlFVRkxMRVZCUVVVc1IwRkJSenRCUVVOV0xHRkJRVkVzUlVGQlJTeE5RVUZOTzBsQlEycENMRU5CUVVNN1FVRkRSaXhWUVVGUExFdEJRVXNzUTBGQlF6dEZRVU5rTEVOQlFVTTdPenM3T3pzN08wRkJVVVlzUzBGQlNTeERRVUZETEU5QlFVOHNSMEZCUnl4VlFVRlRMRkZCUVZFc1JVRkJSVHRCUVVOb1F5eFBRVUZKTEZOQlFWTXNSMEZCUnl4TlFVRk5MRU5CUVVNc1NVRkJTU3hEUVVGRExGRkJRVkVzUTBGQlF5eERRVUZETEUxQlFVMHNRMEZCUXl4VlFVRkRMRWRCUVVjc1JVRkJSU3hKUVVGSkxFVkJRVXM3UVVGRE1VUXNVMEZCU1N4TlFVRk5MRWRCUVVjc1VVRkJVU3hEUVVGRExFbEJRVWtzUTBGQlF5eERRVUZETzBGQlF6VkNMRk5CUVVrc1RVRkJUU3hEUVVGRExFbEJRVWtzUlVGQlJUdEJRVU5tTEZWQlFVY3NRMEZCUXl4SlFVRkpMRU5CUVVNc1IwRkJSeXhOUVVGTkxFTkJRVU1zU1VGQlNTeERRVUZETEVkQlFVY3NRMEZCUXp0TlFVTTNRanRKUVVOR0xFVkJRVVVzUlVGQlJTeERRVUZETEVOQlFVTTdRVUZEVUN4VlFVRlBMRmxCUVZjN1FVRkRhRUlzV1VGQlR5eFRRVUZUTEVOQlFVTTdTVUZEYkVJc1EwRkJRenRGUVVOSUxFTkJRVU03TzBGQlJVWXNTMEZCU1N4RFFVRkRMRWxCUVVrc1IwRkJSeXhWUVVGVExFbEJRVWtzUlVGQlJTeEpRVUZKTEVWQlFVVXNTMEZCU3l4RlFVRkZPMEZCUTNSRExFOUJRVWtzUTBGQlF5eEpRVUZKTEVkQlFVY3NTVUZCU1N4RFFVRkRPMEZCUTJwQ0xFOUJRVWtzUTBGQlF5eEpRVUZKTEVkQlFVY3NTVUZCU1N4RFFVRkRPMEZCUTJwQ0xFOUJRVWtzUTBGQlF5eExRVUZMTEVkQlFVY3NTMEZCU3l4RFFVRkRPMFZCUTNCQ0xFTkJRVU03TzBGQlJVWXNTMEZCU1N4RFFVRkRMRkZCUVZFc1IwRkJSeXhaUVVGMVFqdFBRVUZrTEU5QlFVOHNlVVJCUVVjc1JVRkJSVHM3UVVGRGJrTXNUMEZCU1N4RFFVRkRMRlZCUVZVc1IwRkJSeXhGUVVGRkxFTkJRVU03UVVGRGNrSXNUMEZCU1N4RFFVRkRMRmxCUVZrc1IwRkJSeXhKUVVGSkxFTkJRVU03UVVGRGVrSXNUMEZCU1N4RFFVRkRMRkZCUVZFc1IwRkJSeXhQUVVGUExFTkJRVU03UlVGRGVrSXNRMEZCUXpzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPMEZCZDBKR0xFdEJRVWtzUTBGQlF5eFJRVUZSTEVOQlFVTXNVMEZCVXl4RFFVRkRMRkZCUVZFc1IwRkJSeXhWUVVGVExFTkJRVU1zUlVGQlJUdEJRVU0zUXl4UFFVRkpMRU5CUVVNc1ZVRkJWU3hEUVVGRExFbEJRVWtzUTBGQlF5eERRVUZETEVOQlFVTXNRMEZCUXp0QlFVTjRRaXhWUVVGUExFbEJRVWtzUTBGQlF6dEZRVU5pTEVOQlFVTTdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN1FVRjVRa1lzUzBGQlNTeERRVUZETEZGQlFWRXNRMEZCUXl4VFFVRlRMRU5CUVVNc1YwRkJWeXhIUVVGSExGVkJRVk1zU1VGQlNTeEZRVUZGT3pzN08wRkJSVzVFTEZWQlFVOHNWVUZCUXl4UFFVRlBMRVZCUVVVc1RVRkJUU3hGUVVGRkxFdEJRVXNzUlVGQlN6dEJRVU5xUXl4VFFVRkpPenRCUVVWR0xHRkJRVXNzVlVGQlZTeERRVUZETEUxQlFVMHNRMEZCUXl4VlFVRkRMRWRCUVVjc1JVRkJSU3hSUVVGUkxFVkJRVXM3UVVGRGVFTXNhVUpCUVZFc1EwRkJReXhKUVVGSkxFTkJRVU1zUlVGQlJTeEZRVUZGTEU5QlFVOHNSVUZCUlN4TlFVRk5MRVZCUVVVc1MwRkJTeXhEUVVGRExFTkJRVU03VVVGRE0wTXNSVUZCUlN4UFFVRlBMRU5CUVVNc1EwRkJRenROUVVOaUxFTkJRVU1zVDBGQlRTeERRVUZETEVWQlFVVTdRVUZEVkN4aFFVRkxMRmxCUVZrc1EwRkJReXhEUVVGRExFVkJRVVVzVDBGQlR5eEZRVUZGTEUxQlFVMHNSVUZCUlN4TFFVRkxMRU5CUVVNc1EwRkJRenROUVVNNVF6czdRVUZGUkN4VFFVRkpMRkZCUVZFc1IwRkJSeXhKUVVGSkxFTkJRVU1zVDBGQlR5eEZRVUZGTEUxQlFVMHNSVUZCUlN4TFFVRkxMRU5CUVVNc1EwRkJRenRCUVVNMVF5eFpRVUZQTEZGQlFWRXNRMEZCUXp0SlFVTnFRaXhEUVVGRE8wVkJRMGdzUTBGQlF6czdRVUZGUml4TFFVRkpMRU5CUVVNc1VVRkJVU3hEUVVGRExGTkJRVk1zUTBGQlF5eFpRVUZaTEVkQlEzQkRMRlZCUVZNc1IwRkJSeXhGUVVGRkxFOUJRVThzUlVGQlJTeE5RVUZOTEVWQlFVVXNTMEZCU3l4RlFVRkZPenRCUVVWd1F5eFRRVUZOTEVsQlFVa3NTMEZCU3l4clFrRkJaMElzVFVGQlRTeERRVUZETEVsQlFVa3NkVUpCUVdsQ0xFZEJRVWNzYVVKQlFXRXNRMEZCUXp0RlFVTTNSU3hEUVVGRE8wRkJRMFlzVVVGQlR5eERRVUZETEVkQlFVY3NRMEZCUXl4aFFVRmhMRU5CUVVNc1F5SXNJbVpwYkdVaU9pSnlkVzVsTG1weklpd2ljMjkxY21ObGMwTnZiblJsYm5RaU9sc2lJRngwTHk4Z1ZHaGxJRzF2WkhWc1pTQmpZV05vWlZ4dUlGeDBkbUZ5SUdsdWMzUmhiR3hsWkUxdlpIVnNaWE1nUFNCN2ZUdGNibHh1SUZ4MEx5OGdWR2hsSUhKbGNYVnBjbVVnWm5WdVkzUnBiMjVjYmlCY2RHWjFibU4wYVc5dUlGOWZkMlZpY0dGamExOXlaWEYxYVhKbFgxOG9iVzlrZFd4bFNXUXBJSHRjYmx4dUlGeDBYSFF2THlCRGFHVmpheUJwWmlCdGIyUjFiR1VnYVhNZ2FXNGdZMkZqYUdWY2JpQmNkRngwYVdZb2FXNXpkR0ZzYkdWa1RXOWtkV3hsYzF0dGIyUjFiR1ZKWkYwcFhHNGdYSFJjZEZ4MGNtVjBkWEp1SUdsdWMzUmhiR3hsWkUxdlpIVnNaWE5iYlc5a2RXeGxTV1JkTG1WNGNHOXlkSE03WEc1Y2JpQmNkRngwTHk4Z1EzSmxZWFJsSUdFZ2JtVjNJRzF2WkhWc1pTQW9ZVzVrSUhCMWRDQnBkQ0JwYm5SdklIUm9aU0JqWVdOb1pTbGNiaUJjZEZ4MGRtRnlJRzF2WkhWc1pTQTlJR2x1YzNSaGJHeGxaRTF2WkhWc1pYTmJiVzlrZFd4bFNXUmRJRDBnZTF4dUlGeDBYSFJjZEdWNGNHOXlkSE02SUh0OUxGeHVJRngwWEhSY2RHbGtPaUJ0YjJSMWJHVkpaQ3hjYmlCY2RGeDBYSFJzYjJGa1pXUTZJR1poYkhObFhHNGdYSFJjZEgwN1hHNWNiaUJjZEZ4MEx5OGdSWGhsWTNWMFpTQjBhR1VnYlc5a2RXeGxJR1oxYm1OMGFXOXVYRzRnWEhSY2RHMXZaSFZzWlhOYmJXOWtkV3hsU1dSZExtTmhiR3dvYlc5a2RXeGxMbVY0Y0c5eWRITXNJRzF2WkhWc1pTd2diVzlrZFd4bExtVjRjRzl5ZEhNc0lGOWZkMlZpY0dGamExOXlaWEYxYVhKbFgxOHBPMXh1WEc0Z1hIUmNkQzh2SUVac1lXY2dkR2hsSUcxdlpIVnNaU0JoY3lCc2IyRmtaV1JjYmlCY2RGeDBiVzlrZFd4bExteHZZV1JsWkNBOUlIUnlkV1U3WEc1Y2JpQmNkRngwTHk4Z1VtVjBkWEp1SUhSb1pTQmxlSEJ2Y25SeklHOW1JSFJvWlNCdGIyUjFiR1ZjYmlCY2RGeDBjbVYwZFhKdUlHMXZaSFZzWlM1bGVIQnZjblJ6TzF4dUlGeDBmVnh1WEc1Y2JpQmNkQzh2SUdWNGNHOXpaU0IwYUdVZ2JXOWtkV3hsY3lCdlltcGxZM1FnS0Y5ZmQyVmljR0ZqYTE5dGIyUjFiR1Z6WDE4cFhHNGdYSFJmWDNkbFluQmhZMnRmY21WeGRXbHlaVjlmTG0wZ1BTQnRiMlIxYkdWek8xeHVYRzRnWEhRdkx5QmxlSEJ2YzJVZ2RHaGxJRzF2WkhWc1pTQmpZV05vWlZ4dUlGeDBYMTkzWldKd1lXTnJYM0psY1hWcGNtVmZYeTVqSUQwZ2FXNXpkR0ZzYkdWa1RXOWtkV3hsY3p0Y2JseHVJRngwTHk4Z1gxOTNaV0p3WVdOclgzQjFZbXhwWTE5d1lYUm9YMTljYmlCY2RGOWZkMlZpY0dGamExOXlaWEYxYVhKbFgxOHVjQ0E5SUZ3aVhDSTdYRzVjYmlCY2RDOHZJRXh2WVdRZ1pXNTBjbmtnYlc5a2RXeGxJR0Z1WkNCeVpYUjFjbTRnWlhod2IzSjBjMXh1SUZ4MGNtVjBkWEp1SUY5ZmQyVmljR0ZqYTE5eVpYRjFhWEpsWDE4b01DazdYRzVjYmx4dVhHNHZLaW9nVjBWQ1VFRkRTeUJHVDA5VVJWSWdLaXBjYmlBcUtpQjNaV0p3WVdOckwySnZiM1J6ZEhKaGNDQXpaakpqTmpZNU5qRmpNalppTUdJNE1tVmpabHh1SUNvcUx5SXNJaWQxYzJVZ2MzUnlhV04wSnp0Y2JseHVMeW9xWEc0Z0tpQkhaVzVsY21saklHSjFhV3hrWlhJZ2RHaGhkQ0IzYjNWc1pDQndkWE5vSUc1dlpHVnpJR2x1ZEc4Z2RHaGxJR1ZFVTB3Z2MzUmhZMnN1WEc0Z0tpQlZjMlZ5SUdOdmRXeGtJR2x1YUdWeWFYUWdkR2hwY3lCMGJ5QmtaV1pwYm1VZ2RHaGxJRzVsZHlCbFJGTk1MbHh1SUNvZ0xTMHRYRzRnS2lCVWFHVWdaR1ZtWVhWc2RDQnpaVzFoYm5ScFkzTWdiMjVzZVNCamIyNTBZV2x1SUhSb1pYTmxJRzl3WlhKaGRHbHZibk02WEc0Z0tseHVJQ29nTVM0Z1czQjFjMmhkSURvZ2NIVnphQ0IwYnlCMGFHVWdZM1Z5Y21WdWRDQnpkR0ZqYTF4dUlDb2dNaTRnVzJKbFoybHVYVG9nWTNKbFlYUmxJR0VnYm1WM0lITjBZV05ySUdGdVpDQnpkMmwwWTJnZ2RHOGdhWFFzWEc0Z0tpQWdJQ0FnSUNBZ0lDQWdJQ0JoYm1RZ2RHaGxiaUJ3ZFhOb0lIUm9aU0J1YjJSbElHbHVkRzhnZEdobElITjBZV05yTGx4dUlDb2dNeTRnVzJWdVpGMGdJRG9nWVdaMFpYSWdjSFZ6YUNCMGFHVWdibTlrWlNCcGJuUnZJSFJvWlNCemRHRmpheXhjYmlBcUlDQWdJQ0FnSUNBZ0lDQWdJR05vWVc1blpTQjBhR1VnWTNWeWNtVnVkQ0J6ZEdGamF5QjBieUIwYUdVZ2NISmxkbWx2ZFhNZ2IyNWxMbHh1SUNvZ05DNGdXMlY0YVhSZElEb2daWGhwZENCMGFHVWdZMjl1ZEdWNGRDQnZaaUIwYUdseklHVkVVMHc3SUhSb1pTQnNZWE4wSUhKbGMzVnNkRnh1SUNvZ0lDQWdJQ0FnSUNBZ0lDQWdiMllnYVhRZ2QyOTFiR1FnWW1VZ2NHRnpjMlZrSUhSdklIUm9aU0J5WlhSMWNtNGdkbUZzZFdVZ2IyWmNiaUFxSUNBZ0lDQWdJQ0FnSUNBZ0lIUm9hWE1nWTJoaGFXNHVYRzRnS2x4dUlDb2dVM1JoWTJzZ1kyOTFiR1FnWW1VZ2JtVnpkR1ZrT2lCM2FHVnVJRnRpWldkcGJsMGdZU0J1WlhjZ2MzUmhZMnNnYVc0Z1ptRmpkQ0JwZENCM2IzVnNaRnh1SUNvZ2NIVnphQ0IwYUdVZ2MzUmhZMnNnYVc1MGJ5QjBhR1VnY0hKbGRtbHZkWE1nYjI1bExpQlRieUIwYUdVZ2MzUmhZMnNnWTI5dGNISnBjMlZjYmlBcUlGdHViMlJsWFNCaGJtUWdXM04wWVdOclhTNWNiaUFxSUMwdExWeHVJQ29nUVd4MGFHOTFaMmdnZEdobElHVkVVMHdnYVc1emRHRnVZMlVnYzJodmRXeGtJSGR5WVhBZ2RHaGxjMlVnWW1GemFXTWdiM0JsY21GMGFXOXVjMXh1SUNvZ2RHOGdiV0Z1YVhCMWJHRjBaU0IwYUdVZ2MzUmhZMnNzSUhSb1pYa2dZV3hzSUc1bFpXUWdkRzhnWTI5dWRtVnlkQ0IwYUdVZ2JXVjBhRzlrWEc0Z0tpQmpZV3hzSUhSdklHNXZaR1Z6TGlCVGJ5QW5VblZ1WlNjZ2NISnZkbWxrWlNCaElIZGhlU0IwYnlCemFXMXdiR2xtZVNCMGFHVWdkMjl5YXpvZ2FXWmNiaUFxSUhSb1pTQnBibk4wWVc1alpTQmpZV3hzSUhSb1pTQmJaR1ZtYVc1bFhTQnRaWFJvYjJRZ2RHaGxJRzVoYldVZ2IyWWdkR2hsSUcxbGRHaHZaQ3hjYmlBcUlHbDBJR052ZFd4a0lHRnpjMjlqYVdGMFpTQjBhR1VnYjNCbGNtRnVaQ0J2WmlCMGFHVWdaVVJUVENCM2FYUm9JSFJvWlNCemRHRmpheUJ0WVc1cGNIVnNZWFJwYjI0dVhHNGdLaUJHYjNJZ1pYaGhiWEJzWlRwY2JpQXFYRzRnS2lBZ0lDQjJZWElnWlVSVFRDQTlJR1oxYm1OMGFXOXVLQ2tnZTMwN1hHNGdLaUFnSUNCbFJGTk1MbkJ5YjNSdmRIbHdaUzUwY21GdWMyRmpkR2x2YmlBOUlGSjFibVV1WkdWbWFXNWxLQ2QwY21GdWMyRmpkR2x2Ymljc0lDZGlaV2RwYmljcE8xeHVJQ29nSUNBZ1pVUlRUQzV3Y205MGIzUjVjR1V1Y0hKbElEMGdVblZ1WlM1a1pXWnBibVVvSjNCeVpTY3NJQ2R3ZFhOb0p5azdYRzRnS2lBZ0lDQmxSRk5NTG5CeWIzUnZkSGx3WlM1d1pYSm1iM0p0SUQwZ1VuVnVaUzVrWldacGJtVW9KM0JsY21admNtMG5MQ0FuY0hWemFDY3BPMXh1SUNvZ0lDQWdaVVJUVEM1d2NtOTBiM1I1Y0dVdWNHOXpkQ0E5SUZKMWJtVXVaR1ZtYVc1bEtDZHdiM04wSnl3Z0oyVnVaQ2NwTzF4dUlDcGNiaUFxSUZSb1pXNGdkR2hsSUdWRVUwd2dZMjkxYkdRZ1ltVWdkWE5sWkNCaGN6cGNiaUFxWEc0Z0tpQWdJQ0FvYm1WM0lHVkVVMHdwWEc0Z0tpQWdJQ0FnSUM1MGNtRnVjMkZqZEdsdmJpZ3BYRzRnS2lBZ0lDQWdJQzV3Y21Vb1kySXBYRzRnS2lBZ0lDQWdJQzV3WlhKbWIzSnRLR05pS1Z4dUlDb2dJQ0FnSUNBdWNHOXpkQ2hqWWlsY2JpQXFYRzRnS2lCQmJtUWdkR2hsSUhOMFlXTnJJSGR2ZFd4a0lHSmxPbHh1SUNwY2JpQXFJQ0FnSUZ0Y2JpQXFJQ0FnSUNBZ2JtOWtaVHduZEhKaGJuTmhZM1JwYjI0bkxENWNiaUFxSUNBZ0lDQWdibTlrWlR3bmNISmxKeXdnWTJJK1hHNGdLaUFnSUNBZ0lHNXZaR1U4SjNCeVpXWnZjbTBuTENCallqNWNiaUFxSUNBZ0lDQWdibTlrWlR3bmNHOXpkQ2NzSUdOaVBseHVJQ29nSUNBZ1hWeHVJQ3BjYmlBcUlFaHZkMlYyWlhJc0lIUm9hWE1nYzJsdGNHeGxJR0Z3Y0hKdllXTm9JSFJvWlNCelpXMWhiblJwWTNNZ2NuVnNaWE1nWVc1a0lHRnVZV3g1ZW1WeWN5QjBiMXh1SUNvZ1ozVmhjbUZ1ZEdWbElIUm9aU0J6ZEdGamF5QnBjeUIyWVd4cFpDNGdSbTl5SUdWNFlXMXdiR1VzSUdsbUlIZGxJR2hoZG1VZ1lTQnRZV3htYjNKdFpXUmNiaUFxSUhOMFlXTnJJR0psWTJGMWMyVWdiMllnZEdobElHWnZiR3h2ZDJsdVp5QmxSRk5NSUhCeWIyZHlZVzA2WEc0Z0tseHVJQ29nSUNBZ0tHNWxkeUJsUkZOTUtWeHVJQ29nSUNBZ0lDQXVjRzl6ZENoallpbGNiaUFxSUNBZ0lDQWdMbkJ5WlNoallpbGNiaUFxSUNBZ0lDQWdMbkJsY21admNtMG9ZMklwWEc0Z0tpQWdJQ0FnSUM1MGNtRnVjMkZqZEdsdmJpZ3BYRzRnS2x4dUlDb2dWR2hsSUhKMWJuUnBiV1VnYldGNUlISmxjRzl5ZENCbGNuSnZkQ0JpWldOaGRYTmxJSGRvWlc0Z0p5NXdiM04wS0dOaUtTY2dkR2hsY21VZ2FYTWdibThnYzNSaFkydGNiaUFxSUdOeVpXRjBaV1FnWW5rZ2RHaGxJR0psWjJsdWJtbHVaeUJ6ZEdWd0xDQnVZVzFsYkhrZ2RHaGxJQ2N1Y0hKbEtHTmlLU2NnYVc0Z2IzVnlJR05oYzJVdVhHNGdLaUJPWlhabGNuUm9aV3hsYzNNc0lIUm9aU0JsY25KdmNpQnRaWE56WVdkbElHbHpJSFJ2YnlCc2IzY3RiR1YyWld3Z1ptOXlJSFJvWlNCc1lXNW5kV0ZuWlNCMWMyVnlMRnh1SUNvZ2MybHVZMlVnZEdobGVTQnphRzkxYkdRZ1kyRnlaU0J1YnlCemRHRmpheUIwYUdsdVozTWdZVzVrSUhOb2IzVnNaQ0J2Ym14NUlHTmhjbVVnWVdKdmRYUWdkR2hsSUdWRVUweGNiaUFxSUdsMGMyVnNaaTVjYmlBcVhHNGdLaUJVYUdVZ2MyOXNkWFJwYjI0Z2FYTWdkRzhnY0hKdmRtbGtaU0JoSUdKaGMybGpJSE4wWVdOcklHOXlaR1Z5YVc1bklHRnVZV3g1ZW1WeUlHRnVaQ0JzWlhRZ2RHaGxYRzRnS2lCc1lXNW5kV0ZuWlNCa1pXTnBaR1VnYUc5M0lIUnZJR1JsYzJOeWFXSmxJSFJvWlNCbGNuSnZjaTRnUVc1a0lITnBibU5sSUhkbElHUnZiaWQwSUdoaGRtVmNiaUFxSUdGdWVTQmpiMjUwWlhoMElHbHVabTl5YldGMGFXOXVJR0ZpYjNWMElIWmhjbWxoWW14bGN5d2djMk52Y0dVZ1lXNWtJRzkwYUdWeUlHVnNaVzFsYm5SelhHNGdLaUJoY3lCaElHTnZiWEJzWlhSbElIQnliMmR5WVcxdGFXNW5JR3hoYm1kMVlXZGxMQ0IzWlNCdmJteDVJRzVsWldRZ2RHOGdaM1ZoY21GdWRHVmxJSFJvWlNCdmNtUmxjaUJwYzF4dUlDb2dZMjl5Y21WamRDd2dZVzVrSUcxaGEyVWdhVzVqYjNKeVpXTjBJR05oYzJWeklHMWxZVzVwYm1kbWRXd3VJRTF2Y21WdmRtVnlMQ0J6YVc1alpTQjBhR1VnWVc1aGJIbDZaWEpjYmlBcUlHNWxaV1J6SUhSdklHRnVZV3g1ZW1VZ2RHaGxJSE4wWVhSbGN5QjNhR1Z1WlhabGNpQjBhR1VnYVc1amIyMXBibWNnYm05a1pTQmpiMjFsY3l3Z2FYUWdhWE1nYVc0Z1ptRmpkRnh1SUNvZ1lXNGdaWFpoYkhWaGRHbHZiaUJ3Y205alpYTnpMQ0J6YnlCMWMyVnlJR052ZFd4a0lHTnZiV0pwYm1VZ2RHaGxJR0Z1WVd4NWVtbHVaeUJoYm1RZ2FXNTBaWEp3Y21WMGFXNW5YRzRnS2lCd2FHRnpaU0JwYm5SdklIUm9aU0J6WVcxbElHWjFibU4wYVc5dUxpQkdiM0lnWlhoaGJYQnNaVHBjYmlBcVhHNGdLaUFnSUNCeWRXNTBhVzFsTG05dVkyaGhibWRsS0NoamIyNTBaWGgwTENCdWIyUmxMQ0J6ZEdGamF5a2dQVDRnZTF4dUlDb2dJQ0FnSUNBZ0lDOHZJRWxtSUhSb1pTQmphR0Z1WjJVZ2FYTWdkRzhnYzNkcGRHTm9JSFJ2SUdFZ2JtVjNJSE4wWVdOckxGeHVJQ29nSUNBZ0lDQWdJQzh2SUhSb1pTQW5jM1JoWTJzbklHaGxjbVVnZDI5MWJHUWdZbVVnZEdobElHNWxkeUJ6ZEdGamF5NWNiaUFxSUNBZ0lDQWdJQ0IyWVhJZ2UzUjVjR1VzSUdGeVozTjlJRDBnYm05a1pUdGNiaUFxSUNBZ0lDQWdJQ0JwWmlBb0ozQnlaU2NnUFQwOUlIUjVjR1VwSUh0Y2JpQXFJQ0FnSUNBZ0lDQWdJR052Ym5SbGVIUXVhVzVwZENBOUlIUnlkV1U3WEc0Z0tpQWdJQ0FnSUNBZ2ZTQmxiSE5sSUdsbUlDZ25jRzl6ZENjZ1BUMDlJSFI1Y0dVZ0ppWWdJV052Ym5SbGVIUXVhVzVwZENrZ2UxeHVJQ29nSUNBZ0lDQWdJQ0FnZEdoeWIzY2dibVYzSUVWeWNtOXlLQ2RVYUdWeVpTQnRkWE4wSUdKbElHOXVaU0JjSW5CeVpWd2lJRzV2WkdVZ1ltVm1iM0psSUhSb1pTQmNJbkJ2YzNSY0lpNG5LVHRjYmlBcUlDQWdJQ0FnSUNCOVhHNGdLaUFnSUNCOUtUdGNiaUFxWEc0Z0tpQlhhWFJvSUhOMVkyZ2dabVZoZEhWeVpTd2dhV1lnZEdobElHbHVZMjl0YVc1bklHNXZaR1VnYjNJZ2RHaGxJSE4wWVdOcklHbHpJRzFoYkdadmNtMWxaQ3hjYmlBcUlHbDBJSE5vYjNWc1pDQjBhSEp2ZHlCMGFHVWdaWEp5YjNJdUlGUm9aU0JsY25KdmNpQmpZWEIwZFhKbFpDQmllU0IwYUdVZ2FXNXpkR0Z1WTJVZ2JHbHJaU0IwYUdselhHNGdLaUJqYjNWc1pDQmlaU0JoSUNkamIyMXdhV3hoZEdsdmJpQmxjbkp2Y2ljdVhHNGdLbHh1SUNvZ1ZHaGxJRzV2ZEdsalpXRmliR1VnWm1GamRDQnBjeUJVYUdVZ1kyRnNiR0poWTJzZ2IyWWdkR2hsSUNkdmJtTm9ZVzVuWlNjZ2FYTWdZV04wZFdGc2JIa2dZU0J5WldSMVkyVnlMRnh1SUNvZ2MyOGdkWE5sY2lCamIzVnNaQ0IwY21WaGRDQjBhR1VnY0hKdlkyVnpjeUJ2WmlCMGFHbHpJR1YyWVd4MVlYUnBiMjRnSmlCaGJtRnNlWHBwYm1jZ1lYTWdZU0J5WldSMVkybHVaMXh1SUNvZ2NISnZZMlZ6Y3lCdmJpQmhiaUJwYm1acGJtbDBaU0J6ZEhKbFlXMHVJRUZ1WkNCemFXNWpaU0IzWlNCb1lYWmxJR0VnYzNSaFkyc2diV0ZqYUdsdVpTd2dhV1lnZEdobFhHNGdLaUJ5WldSMVkyVnlJSEpsZEhWeWJpQnViM1JvYVc1bkxDQjBhR1VnYzNSaFkyc2dkMjkxYkdRZ1ltVWdaVzF3ZEhrdUlFOTBhR1Z5ZDJselpTd2dhV1lnZEdobElISmxaSFZqWlhKY2JpQXFJSEpsZEhWeWJpQmhJRzVsZHlCemRHRmpheXdnYVhRZ2QyOTFiR1FnY21Wd2JHRmpaU0IwYUdVZ2IyeGtJRzl1WlM1Y2JpQXFYRzRnS2lCQmJtUWdjR3hsWVhObElHNXZkR1VnZEdobElHVjRZVzF3YkdVZ2FYTWdiWFZqYUNCemFXMXdiR2xtYVdWa0xpQkdiM0lnZEdobFhHNGdLaUJ5WldGc0lHVkVVMHdnYVhRZ2MyaHZkV3hrSUdKbElIVnpaV1FnYjI1c2VTQmhjeUJoYmlCbGJuUnllU0IwYnlCa2FYTndZWFJqYUNCMGFHVWdZMmhoYm1kbElIUnZYRzRnS2lCMGFHVWdjbVZoYkNCb1lXNWtiR1Z5Y3l3Z2QyaHBZMmdnYldGNUlHTnZiWEJ5YVhObElITmxkbVZ5WVd3Z2MzUmhkR1Z6SUdGdVpDQmpiMjF3YjI1bGJuUnpMbHh1SUNvdlhHNWxlSEJ2Y25RZ1puVnVZM1JwYjI0Z1VuVnVaU2dwSUh0OVhHNWNiaThxS2x4dUlDb2dTR1ZzY0dWeUlHMWxkR2h2WkNCMGJ5QmlkV2xzWkNCcGJuUmxjbVpoWTJVZ2IyWWdZU0J6Y0dWamFXWnBZeUJFVTB3dUlFbDBJSGR2ZFd4a0lISmxkSFZ5YmlCaElHMWxkR2h2WkZ4dUlDb2diMllnZEdobElFUlRUQ0JoYm1RZ2RHaGxiaUIwYUdVZ2FXNTBaWEptWVdObElHTnZkV3hrSUdGMGRHRmphQ0JwZEM1Y2JpQXFYRzRnS2lCVWFHVWdjbVYwZFhKdWFXNW5JR1oxYm1OMGFXOXVJSGR2ZFd4a0lHRnpjM1Z0WlNCMGFHRjBJSFJvWlNBbmRHaHBjeWNnYVc1emFXUmxJR2wwSUdseklIUm9aU0J5ZFc1MGFXMWxYRzRnS2lCdlppQjBhR1VnYkdGdVozVmhaMlV1SUVGdVpDQnphVzVqWlNCMGFHVWdiV1YwYUc5a0lHbDBJSEpsZEhWeWJuTWdkMjkxYkdRZ2NtVnhkV2x5WlNCMGJ5QmhZMk5sYzNNZ2MyOXRaVnh1SUNvZ2JXVnRZbVZ5Y3lCdlppQjBhR1VnSjNSb2FYTW5MQ0IwYUdVZ0ozUm9hWE1uSUhOb2IzVnNaQ0JvWVhabElDZDBhR2x6TG5OMFlXTnJKeUJoYm1RZ0ozUm9hWE11WTI5dWRHVjRkQ2RjYmlBcUlHRnpJSFJvWlNCdFpYUm9iMlFnY21WeGRXbHlaWE11WEc0Z0tseHVJQ29nU1dZZ2FYUW5jeUJoYmlBblpYaHBkQ2NnYm05a1pTd2diV1ZoYm5NZ2RHaGxJSE5sYzNOcGIyNGdhWE1nWlc1a1pXUWdZVzVrSUhSb1pTQnBiblJsY25CeVpYUmxjaUJ6YUc5MWJHUmNiaUFxSUhKbGRIVnliaUJoSUhOMFlXTnJJR052Ym5SaGFXNXpJRzl1YkhrZ2IyNWxJRzV2WkdVZ1lYTWdkR2hsSUhKbGMzVnNkQ0J2WmlCMGFHVWdjMlZ6YzJsdmJpd2diM0lnZEdobFhHNGdLaUJ6WlhOemFXOXVJSEpsZEhWeWJuTWdibTkwYUdsdVp5NGdSbTl5SUc5MGFHVnlJR2x1YzNSeWRXTjBhVzl1Y3lCMGFHVWdjM1JoWTJzZ1kyRnVJR3RsWlhBZ2MyOXRaVnh1SUNvZ1kyOXRjSFYwWldRZ2NtVnpkV3gwSUhSdklITnBiWFZzWVhSbElISmxZV3dnYzNSaFkyc2diV0ZqYUdsdVpTNGdRblYwSUdsMEozTWdUMHNnZEc4Z2JtOTBJSFZ6WlNCMGFHbHpYRzRnS2lCbVpXRjBkWEpsSUdGdVpDQmhiSGRoZVhNZ2NtVjBkWEp1SUdGdUlHVnRjSFI1SUNkemRHRmpheWNnWlhabGNubDBhVzFsSUhSb1pTQW5iMjVqYUdGdVoyVW5JR2RsZEZ4dUlDb2dZMkZzYkdWa0lHRnVaQ0JwYm5SbGNuVndkR1ZrTGlCSmJpQjBhR2x6SUcxdlpHVWdhWFFnYldWaGJuTWdkR2hsSUd4aGJtZDFZV2RsSUhkaGJuUWdkRzhnYTJWbGNGeHVJQ29nWVd4c0lITjBZWFJsY3lCaWVTQnBkSE5sYkdZdVhHNGdLbHh1SUNvZ1VHeGxZWE5sSUc1dmRHVWdkR2hoZENCbWNtOXRJSFJvWlNCa1pYTmpjbWx3ZEdsdmJpQmhZbTkyWlN3Z0oyVnVaQ2NnYldWaGJuTWdjM1JoWTJzZ0tITjFZbk4wWVdOcktWeHVJQ29nWlc1a2N5NGdTWFFuY3lCMGIzUmhiR3g1SUdseWNtVnNaWFpoYm5RZ2RHOGdKMlY0YVhRbkxseHVJQ3BjYmlBcUlGUm9aU0JzWVhOMElHRnlaM1Z0Wlc1MElDZGtiMk1uSUdseklIZG9ZWFFnWkdWemFXZHVaWElnWTI5MWJHUWdjSFYwSUhSb1pTQmtaWE5qY21sd2RHbHZiaUJoWW05MWRGeHVJQ29nZEdobElHMWxkR2h2WkM0Z1NXWWdjMlYwTENCcGRDQjNiM1ZzWkNCaGNIQmxibVFnZEdobElDZHlkVzVsTG1Sdll5ZGNiaUFxSUhCeWIzQmxjblI1SUdsdUlIUm9aU0JtZFc1amRHbHZiaUJwZENCeVpYUjFjbTV6TGlCQmJtUWdkR2hsYmlCMGFHVWdiR0Z1WjNWaFoyVWdhVzV6ZEdGdVkyVWdZMjkxYkdSY2JpQXFJR05oYkd3Z1lGSjFibVV1Wkc5amRXMWxiblFvUEdsdWMzUmhibU5sUGlsZ0lIUnZJR2RsZENCaElHMWxkR2h2WkNCMGFHRjBJSGR2ZFd4a0lISmxkSFZ5Ymx4dUlDb2dKM3NnYldWMGFHOWtUbUZ0WlRvZ1pHVnpZM0pwY0hScGIyNGdmU2NnZDJobGJpQnBkQ0JuYjNRZ2FXNTJiMnRsWkM1Y2JpQXFMMXh1VW5WdVpTNWtaV1pwYm1VZ1BTQm1kVzVqZEdsdmJpaHRaWFJvYjJRc0lHRnpMQ0JrYjJNZ1BTQW5KeWtnZTF4dUlDQjJZWElnWW5WcGJIUWdQU0JtZFc1amRHbHZiaWd1TGk1aGNtZHpLU0I3WEc0Z0lDQWdkbUZ5SUc1dlpHVXNJSEpsYzNWc2RITjBZV05yTzF4dUlDQWdJSE4zYVhSamFDQW9ZWE1wSUh0Y2JpQWdJQ0FnSUdOaGMyVWdKM0IxYzJnbk9seHVJQ0FnSUNBZ0lDQnViMlJsSUQwZ2JtVjNJRkoxYm1VdVRtOWtaU2h0WlhSb2IyUXNJR0Z5WjNNc0lIUm9hWE11YzNSaFkyc3BPMXh1SUNBZ0lDQWdJQ0IwYUdsekxuTjBZV05yTG5CMWMyZ29ibTlrWlNrN1hHNGdJQ0FnSUNBZ0lISmxjM1ZzZEhOMFlXTnJJRDFjYmlBZ0lDQWdJQ0FnSUNCMGFHbHpMbTl1WTJoaGJtZGxLSFJvYVhNdVkyOXVkR1Y0ZEN3Z2JtOWtaU3dnZEdocGN5NXpkR0ZqYXlrN1hHNGdJQ0FnSUNBZ0lHSnlaV0ZyTzF4dUlDQWdJQ0FnWTJGelpTQW5ZbVZuYVc0bk9seHVJQ0FnSUNBZ0lDQjBhR2x6TGw5d2NtVjJjM1JoWTJzZ1BTQjBhR2x6TG5OMFlXTnJPMXh1SUNBZ0lDQWdJQ0IwYUdsekxuTjBZV05ySUQwZ1cxMDdYRzRnSUNBZ0lDQWdJRzV2WkdVZ1BTQnVaWGNnVW5WdVpTNU9iMlJsS0cxbGRHaHZaQ3dnWVhKbmN5d2dkR2hwY3k1emRHRmpheWs3WEc0Z0lDQWdJQ0FnSUhSb2FYTXVjM1JoWTJzdWNIVnphQ2h1YjJSbEtUc2dJQzh2SUdGeklIUm9aU0JtYVhKemRDQnViMlJsSUc5bUlIUm9aU0J1WlhjZ2MzUmhZMnN1WEc0Z0lDQWdJQ0FnSUhKbGMzVnNkSE4wWVdOcklEMWNiaUFnSUNBZ0lDQWdJQ0IwYUdsekxtOXVZMmhoYm1kbEtIUm9hWE11WTI5dWRHVjRkQ3dnYm05a1pTd2dkR2hwY3k1emRHRmpheWs3WEc0Z0lDQWdJQ0FnSUdKeVpXRnJPMXh1SUNBZ0lDQWdZMkZ6WlNBblpXNWtKenBjYmlBZ0lDQWdJQ0FnYm05a1pTQTlJRzVsZHlCU2RXNWxMazV2WkdVb2JXVjBhRzlrTENCaGNtZHpMQ0IwYUdsekxuTjBZV05yS1R0Y2JpQWdJQ0FnSUNBZ2RHaHBjeTV6ZEdGamF5NXdkWE5vS0c1dlpHVXBPeUFnTHk4Z2RHaGxJR3hoYzNRZ2JtOWtaU0J2WmlCMGFHVWdjM1JoWTJzdVhHNGdJQ0FnSUNBZ0lIUm9hWE11YzNSaFkyc2dQVnh1SUNBZ0lDQWdJQ0FnSUhSb2FYTXVYM0J5WlhaemRHRmphenNnTHk4Z2MzZHBkR05vSUdKaFkyc2dkRzhnZEdobElIQnlaWFpwYjNWeklITjBZV05yTGx4dUlDQWdJQ0FnSUNCeVpYTjFiSFJ6ZEdGamF5QTlYRzRnSUNBZ0lDQWdJQ0FnZEdocGN5NXZibU5vWVc1blpTaDBhR2x6TG1OdmJuUmxlSFFzSUc1dlpHVXNJSFJvYVhNdWMzUmhZMnNwTzF4dUlDQWdJQ0FnSUNCaWNtVmhhenRjYmlBZ0lDQWdJR05oYzJVZ0oyVjRhWFFuT2x4dUlDQWdJQ0FnSUNCdWIyUmxJRDBnYm1WM0lGSjFibVV1VG05a1pTaHRaWFJvYjJRc0lHRnlaM01zSUhSb2FYTXVjM1JoWTJzcE8xeHVJQ0FnSUNBZ0lDQjBhR2x6TG5OMFlXTnJMbkIxYzJnb2JtOWtaU2s3SUNBdkx5QjBhR1VnYkdGemRDQnViMlJsSUc5bUlIUm9aU0J6ZEdGamF5NWNiaUFnSUNBZ0lDQWdjbVZ6ZFd4MGMzUmhZMnNnUFZ4dUlDQWdJQ0FnSUNBZ0lIUm9hWE11YjI1amFHRnVaMlVvZEdocGN5NWpiMjUwWlhoMExDQnViMlJsTENCMGFHbHpMbk4wWVdOcktUdGNiaUFnSUNBZ0lDQWdhV1lnS0NGeVpYTjFiSFJ6ZEdGamF5a2dlMXh1SUNBZ0lDQWdJQ0FnSUhSb2NtOTNJRzVsZHlCRmNuSnZjaWhnSjJWNGFYUW5JRzV2WkdVZ0p5UjdibTlrWlM1MGVYQmxmU2NnYzJodmRXeGtYRzRnSUNBZ0lDQWdJQ0FnSUNCeVpYUjFjbTRnWVNCeVpYTjFiSFJ6ZEdGamF5NWdLVHRjYmlBZ0lDQWdJQ0FnZlZ4dUlDQWdJQ0FnSUNCeVpYUjFjbTRnY21WemRXeDBjM1JoWTJ0Yk1GMDdYRzRnSUNBZ2ZWeHVJQ0FnSUM4dklFbG1JSFJvWlNCb1lXNWtiR1Z5SUhWd1pHRjBaWE1nZEdobElITjBZV05yTENCcGRDQjNiM1ZzWkNCeVpYQnNZV05sSUhSb1pTQmxlR2x6ZEdsdVp5QnZibVV1WEc0Z0lDQWdhV1lnS0hKbGMzVnNkSE4wWVdOcktTQjdYRzRnSUNBZ0lDQjBhR2x6TG5OMFlXTnJJRDBnY21WemRXeDBjM1JoWTJzN1hHNGdJQ0FnZlZ4dUlDQWdJSEpsZEhWeWJpQjBhR2x6TzF4dUlDQjlPMXh1SUNCaWRXbHNkQzV5ZFc1bElEMGdlMXh1SUNBZ0lDZGhjeWM2SUdGekxGeHVJQ0FnSUNka2IyTW5PaUJrYjJNc1hHNGdJQ0FnSjIxbGRHaHZaQ2M2SUcxbGRHaHZaQ3hjYmlBZ2ZUdGNiaUFnY21WMGRYSnVJR0oxYVd4ME8xeHVmVHRjYmx4dUx5b3FYRzRnS2lCSFpXNWxjbUYwWlNCaElHMWxkR2h2WkNCMGFHRjBJSGR2ZFd4a0lISmxkSFZ5YmlCaGJHd2daRzlqZFcxbGJuUnpJRzltSUhSb1pTQnRaWFJvYjJSekxGeHVJQ29nYVc0Z1lTQm1iM0p0SUc5bUlDZDdJRzFsZEdodlpFNWhiV1U2SUdSbGMyTnlhWEIwYVc5dUlIMG5MbHh1SUNwY2JpQXFJRlJvWlNCaGNtZDFiV1Z1ZENCdGRYTjBJR0psSUhSb1pTQnNZVzVuZFdGblpTQnBibk4wWVc1alpTQjNhWFJvSUdGc2JDQmtaV1pwYm1Wa0lHMWxkR2h2WkhNdVhHNGdLaTljYmxKMWJtVXVjSFZpYkdsemFDQTlJR1oxYm1OMGFXOXVLR2x1YzNSaGJtTmxLU0I3WEc0Z0lIWmhjaUJuWlc1bGNtRjBaV1FnUFNCUFltcGxZM1F1YTJWNWN5aHBibk4wWVc1alpTa3VjbVZrZFdObEtDaGtiMk1zSUc1aGJXVXBJRDArSUh0Y2JpQWdJQ0IyWVhJZ2JXVjBhRzlrSUQwZ2FXNXpkR0Z1WTJWYmJtRnRaVjA3WEc0Z0lDQWdhV1lnS0cxbGRHaHZaQzV5ZFc1bEtTQjdYRzRnSUNBZ0lDQmtiMk5iYm1GdFpWMGdQU0J0WlhSb2IyUXVjblZ1WlM1a2IyTTdYRzRnSUNBZ2ZWeHVJQ0I5TENCN2ZTazdYRzRnSUhKbGRIVnliaUJtZFc1amRHbHZiaWdwSUh0Y2JpQWdJQ0J5WlhSMWNtNGdaMlZ1WlhKaGRHVmtPMXh1SUNCOU8xeHVmVHRjYmx4dVVuVnVaUzVPYjJSbElEMGdablZ1WTNScGIyNG9kSGx3WlN3Z1lYSm5jeXdnYzNSaFkyc3BJSHRjYmlBZ2RHaHBjeTUwZVhCbElEMGdkSGx3WlR0Y2JpQWdkR2hwY3k1aGNtZHpJRDBnWVhKbmN6dGNiaUFnZEdocGN5NXpkR0ZqYXlBOUlITjBZV05yTzF4dWZUdGNibHh1VW5WdVpTNUZkbUZzZFdGMFpTQTlJR1oxYm1OMGFXOXVLR052Ym5SbGVIUWdQU0I3ZlNrZ2UxeHVJQ0IwYUdsekxsOWhibUZzZVhwbGNuTWdQU0JiWFR0Y2JpQWdkR2hwY3k1ZmFXNTBaWEp3Y21WMFpYSWdQU0J1ZFd4c08xeHVJQ0IwYUdsekxsOWpiMjUwWlhoMElEMGdZMjl1ZEdWNGREdGNibjA3WEc1Y2JpOHFLbHh1SUNvZ1FXNWhiSGw2WlhJZ1kyOTFiR1FnY21WalpXbDJaU0IwYUdVZ2MzUmhZMnNnWTJoaGJtZGxJR1p5YjIwZ0oxSjFibVVqWlhaaGJIVmhkR1VuTEZ4dUlDb2dZVzVrSUdsMElIZHZkV3hrSUdKbElHTmhiR3hsWkNCM2FYUm9JSFJvWlNCaGNtZDFiV1Z1ZEhNZ1lYTWdkR2hsSUdaMWJtTjBhVzl1SUdSbGMyTnlhV0psY3pwY2JpQXFYRzRnS2lBZ0lDQWdVblZ1WlM1d2NtOTBiM1I1Y0dVdVpYWmhiSFZoZEdVb0tHTnZiblJsZUhRc0lHTm9ZVzVuWlN3Z2MzUmhZMnNwSUQwK0lIdGNiaUFxSUNBZ0lDQWdJQ0F2THlBdUxpNWNiaUFxSUNBZ0lDQjlLVHRjYmlBcVhHNGdLaUJUYnlCMGFHVWdZVzVoYkhsNlpYSWdZMjkxYkdRZ1ltVTZYRzRnS2x4dUlDb2dJQ0FnWm5WdVkzUnBiMjRvWTI5dWRHVjRkQ3dnWTJoaGJtZGxMQ0J6ZEdGamF5a2dlMXh1SUNvZ0lDQWdJQ0F2THlCRWJ5QnpiMjFsSUdOb1pXTnJJR0Z1WkNCdFlYbGlaU0JqYUdGdVoyVmtJSFJvWlNCamIyNTBaWGgwTGx4dUlDb2dJQ0FnSUNBdkx5QlVhR1VnYm1WNGRDQmhibUZzZVhwbGNpQjBieUIwYUdVZ2FXNTBaWEp3Y21WMFpYSWdkMjkxYkdRZ1lXTmpaWEIwSUhSb1pTQmhiSFJsY201aGRHVmtYRzRnS2lBZ0lDQWdJQzh2SUdOdmJuUmxlSFFnWVhNZ2RHaGxJR0Z5WjNWdFpXNTBJQ2RqYjI1MFpYaDBKeTVjYmlBcUlDQWdJQ0FnWTI5dWRHVjRkQzV6YjIxbFJteGhaeUE5SUhSeWRXVTdYRzRnS2lBZ0lDQWdJQzh2SUZkb1pXNGdkR2hsY21VZ2FYTWdkM0p2Ym1jc0lIUm9jbTkzSUdsMExseHVJQ29nSUNBZ0lDQjBhSEp2ZHlCdVpYY2dSWEp5YjNJb0oxTnZiV1VnWVc1aGJIbDZhVzVuSUdWeWNtOXlKeWs3WEc0Z0tpQWdJQ0I5TzF4dUlDcGNiaUFxSUU1dmRHVWdkR2hoZENCMGFHVWdZVzVoYkhsNlpYSWdLQ2RoSnlrZ2QyOTFiR1FnWW1VZ2FXNTJiMnRsWkNCM2FYUm9JR1Z0Y0hSNUlDZDBhR2x6SnlCdlltcGxZM1FzWEc0Z0tpQnpieUIwYUdVZ1puVnVZM1JwYjI0Z2NtVnNhV1Z6SUc5dUlDZDBhR2x6SnlCemFHOTFiR1FnWW1sdVpDQnBkSE5sYkdZZ1ptbHljM1F1WEc0Z0tpOWNibEoxYm1VdVJYWmhiSFZoZEdVdWNISnZkRzkwZVhCbExtRnVZV3g1ZW1WeUlEMGdablZ1WTNScGIyNG9ZU2tnZTF4dUlDQjBhR2x6TGw5aGJtRnNlWHBsY25NdWNIVnphQ2hoS1R0Y2JpQWdjbVYwZFhKdUlIUm9hWE03WEc1OU8xeHVYRzR2S2lwY2JpQXFJRTl1WlNCRmRtRnNkV0YwWlNCallXNGdiMjVzZVNCb1lYWmxJRzl1WlNCcGJuUmxjbkJ5WlhSbGNpd2dZVzVrSUdsMElIZHZkV3hrSUhKbGRIVnlibHh1SUNvZ2RHaGxJR1oxYm1OMGFXOXVJR052ZFd4a0lHTnZibk4xYldVZ1pYWmxjbmtnYzNSaFkyc2dZMmhoYm1kbElHWnliMjBnSjFKMWJtVWpaWFpoYkhWaGRHVW5MbHh1SUNwY2JpQXFJRlJvWlNCamIyUmxJR2x6SUdFZ2JHbDBkR3hsSUdOdmJYQnNhV05oZEdWa09pQjNaU0JvWVhabElIUjNieUJyYVc1a2N5QnZaaUFuY21Wa2RXTnBibWNuT2x4dUlDb2diMjVsSUdseklIUnZJSEpsWkhWalpTQmhiR3dnWVc1aGJIbDZaWEp6SUhkcGRHZ2dkR2hsSUhOcGJtZHNaU0JwYm1OdmJXbHVaeUJqYUdGdVoyVXNYRzRnS2lCaGJtOTBhR1Z5SUdseklIUnZJSEpsWkhWalpTQmhiR3dnYVc1amIyMXBibWNnWTJoaGJtZGxjeUIzYVhSb0lIUm9hWE1nWVc1aGJIbDZaWEp6SUNzZ2FXNTBaWEp3Y21WMFpYSXVYRzRnS2x4dUlDb2dWR2hsSUdGdVlXeDVlbVZ5SUdGdVpDQnBiblJsY25CeVpYUmxjaUJ6YUc5MWJHUWdZMmhoYm1kbElIUm9aU0JqYjI1MFpYaDBMQ0IwYnlCdFpXMXZjbWw2WlNCMGFHVmNiaUFxSUhOMFlYUmxjeUJ2WmlCMGFHVWdaWFpoYkhWaGRHbHZiaTRnVkdobElHUnBabVpsY21WdVkyVWdhWE1nYVc1MFpYSndjbVYwWlhJZ2MyaHZkV3hrSUhKbGRIVnliaUJ2Ym1WY2JpQXFJRzVsZHlCemRHRmpheUJwWmlCcGRDQnVaV1ZrY3lCMGJ5QjFjR1JoZEdVZ2RHaGxJR1Y0YVhOMGFXNW5JRzl1WlM0Z1ZHaGxJSE4wWVdOcklHbDBJSEpsZEhWeWJuTWdkMjkxYkdSY2JpQXFJSEpsY0d4aFkyVWdkR2hsSUdWNGFYTjBhVzVuSUc5dVpTd2djMjhnWVc1NWRHaHBibWNnYzNScGJHd2dhVzRnZEdobElHOXNaQ0J2Ym1VZ2QyOTFiR1FnWW1VZ2QybHdaV1JjYmlBcUlHOTFkQzRnVkdobElHbHVkR1Z5Y0hKbGRHVnlJR052ZFd4a0lISmxkSFZ5YmlCdWIzUm9hVzVuSUNnbmRXNWtaV1pwYm1Wa0p5a2dkRzhnYTJWbGNDQjBhR1VnYzNSaFkydGNiaUFxSUhWdWRHOTFZMmhsWkM1Y2JpQXFYRzRnS2lCVWFHVWdZVzVoYkhsNlpYSnpJR0Z1WkNCcGJuUmxjbkJ5WlhSbGNpQmpiM1ZzWkNCamFHRnVaMlVnZEdobElDZGpiMjUwWlhoMEp5QndZWE56SUhSdklIUm9aVzB1WEc0Z0tpQkJibVFnYzJsdVkyVWdkMlVnYldGNUlIVndaR0YwWlNCMGFHVWdjM1JoWTJzZ1lYTWdZV0p2ZG1Vc0lIUm9aU0JqYjI1MFpYaDBJSE5vYjNWc1pDQnRaVzF2Y21sNlpWeHVJQ29nZEdodmMyVWdhVzVtYjNKdFlYUnBiMjRnYm05MElIUnZJR0psSUc5MlpYSjNjbWwwZEdWdUlIZG9hV3hsSUhSb1pTQnpkR0ZqYXlCblpYUWdkMmx3WldRZ2IzVjBMbHh1SUNwY2JpQXFJRUZ1WkNCcFppQjBhR1VnYVc1MFpYSndjbVYwYVc1bklHNXZaR1VnYVhNZ2RHaGxJR1Y0YVhRZ2JtOWtaU0J2WmlCMGFHVWdjMlZ6YzJsdmJpd2dhVzUwWlhKd2NtVjBaWEpjYmlBcUlITm9iM1ZzWkNCeVpYUjFjbTRnWVNCdVpYY2djM1JoWTJzZ1kyOXVkR0ZwYm5NZ2IyNXNlU0J2Ym1VZ1ptbHVZV3dnY21WemRXeDBJRzV2WkdVdUlFbG1JSFJvWlhKbFhHNGdLaUJwY3lCdWJ5QnpkV05vSUc1dlpHVXNJSFJvWlNCeVpYTjFiSFFnYjJZZ2RHaHBjeUJ6WlhOemFXOXVJR2x6SUNkMWJtUmxabWx1WldRbkxseHVJQ292WEc1U2RXNWxMa1YyWVd4MVlYUmxMbkJ5YjNSdmRIbHdaUzVwYm5SbGNuQnlaWFJsY2lBOUlHWjFibU4wYVc5dUtHbHVjSFFwSUh0Y2JpQWdMeThnVkdobElHTjFjM1J2YldsNlpXUWdiR0Z1WjNWaFoyVWdjMmh2ZFd4a0lHZHBkbVVnZEdobElHUmxabUYxYkhRZ1kyOXVkR1Y0ZEM1Y2JpQWdjbVYwZFhKdUlDaGpiMjUwWlhoMExDQmphR0Z1WjJVc0lITjBZV05yS1NBOVBpQjdYRzRnSUNBZ2RISjVJSHRjYmlBZ0lDQWdJQzh2SUVGdVlXeDVlbVZ5Y3lCamIzVnNaQ0JqYUdGdVoyVWdkR2hsSUdOdmJuUmxlSFF1WEc0Z0lDQWdJQ0IwYUdsekxsOWhibUZzZVhwbGNuTXVjbVZrZFdObEtDaGpkSGdzSUdGdVlXeDVlbVZ5S1NBOVBpQjdYRzRnSUNBZ0lDQWdJR0Z1WVd4NWVtVnlMbU5oYkd3b2UzMHNJR052Ym5SbGVIUXNJR05vWVc1blpTd2djM1JoWTJzcE8xeHVJQ0FnSUNBZ2ZTd2dZMjl1ZEdWNGRDazdYRzRnSUNBZ2ZTQmpZWFJqYUNobEtTQjdYRzRnSUNBZ0lDQjBhR2x6TGw5b1lXNWtiR1ZGY25KdmNpaGxMQ0JqYjI1MFpYaDBMQ0JqYUdGdVoyVXNJSE4wWVdOcktUdGNiaUFnSUNCOVhHNGdJQ0FnTHk4Z1FXWjBaWElnWVc1aGJIbDZaU0JwZEN3Z2FXNTBaWEp3Y21WMElIUm9aU0J1YjJSbElHRnVaQ0J5WlhSMWNtNGdkR2hsSUc1bGR5QnpkR0ZqYXlBb2FXWWdZVzU1S1M1Y2JpQWdJQ0IyWVhJZ2JtVjNVM1JoWTJzZ1BTQnBibkIwS0dOdmJuUmxlSFFzSUdOb1lXNW5aU3dnYzNSaFkyc3BPMXh1SUNBZ0lISmxkSFZ5YmlCdVpYZFRkR0ZqYXp0Y2JpQWdmVHRjYm4wN1hHNWNibEoxYm1VdVJYWmhiSFZoZEdVdWNISnZkRzkwZVhCbExsOW9ZVzVrYkdWRmNuSnZjaUE5WEc1bWRXNWpkR2x2YmlobGNuSXNJR052Ym5SbGVIUXNJR05vWVc1blpTd2djM1JoWTJzcElIdGNiaUFnTHk4Z1ZFOUVUem9nWlhod1lXNWtJR2wwSUhSdklIQnliM1pwWkdVZ2JXOXlaU0J6YjNCb2FYTjBhV01nWkdWaWRXZG5hVzVuSUcxbGMzTmhaMlV1WEc0Z0lIUm9jbTkzSUc1bGR5QkZjbkp2Y2loZ1YyaGxiaUJqYUdGdVoyVWdKSHRqYUdGdVoyVXVkSGx3WlgwZ1kyOXRaWE1nWlhKeWIzSWdKeVI3WlhKeWZTY2dhR0Z3Y0dWdVpXUmdLVHRjYm4wN1hHNWpiMjV6YjJ4bExteHZaeWduUGo0K1BqNCtJRkoxYm1VbktUdGNibHh1WEc1Y2JpOHFLaUJYUlVKUVFVTkxJRVpQVDFSRlVpQXFLbHh1SUNvcUlDNHZjM0pqTDNKMWJtVXVhbk5jYmlBcUtpOGlYU3dpYzI5MWNtTmxVbTl2ZENJNklpSjlcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4uL2Rpc3QvcnVuZS5qc1xuICoqIG1vZHVsZSBpZCA9IDJcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIid1c2Ugc3RyaWN0JztcblxuZXhwb3J0IGZ1bmN0aW9uIFJ1bnRpbWUoKSB7fVxuXG4vKipcbiAqIFdoZW4gdGhlIHN0YWNrIG9mIERTTCBjaGFuZ2VzLCBldmFsdWF0ZSB0aGUgTGFuZ3VhZ2UuTm9kZS5cbiAqL1xuUnVudGltZS5wcm90b3R5cGUub25jaGFuZ2UgPSBmdW5jdGlvbihpbnN0YW5jZSwgY2hhbmdlLCBzdGFjaykge1xuICAvLyBTaW5jZSB3ZSBkb24ndCBuZWVkIHRvIGtlZXAgdGhpbmdzIGluIHN0YWNrIHVudGlsIHdlIGhhdmVcbiAgLy8gcmVhbCBhbmFseXplcnMsIHRoZSAnb25jaGFuZ2UnIGhhbmRsZXIgd291bGQgcmV0dXJuIGVtcHR5IHN0YWNrXG4gIC8vIHRvIGxldCB0aGUgbGFuZ3VhZ2UgcnVudGltZSBjbGVhciB0aGUgc3RhY2sgZXZlcnkgaW5zdHJ1Y3Rpb24uXG4gIHRoaXNbY2hhbmdlLnR5cGVdLmFwcGx5KHRoaXMsIGNoYW5nZS5hcmdzKTtcbiAgLy8gcmV0dXJuIGVtcHR5ICdoYW5kbGVkJyBzdGFjayB0byBsZXQgUnVuZSBrZWVwIG5vIHN0YXRlcyBvZlxuICAvLyBldmVyeSBpbnN0cnVjdGlvbiwgZXhjZXB0IHRoZSByZXN1bHQuXG4gIHJldHVybiBbIHRoaXMucXVldWUgXTtcbn07XG5cblJ1bnRpbWUuRGVmZXJyZWQgPSBmdW5jdGlvbigpIHtcbiAgdmFyIHByb21pc2UgPSBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgdGhpcy5yZXNvbHZlID0gcmVzb2x2ZTtcbiAgICB0aGlzLnJlamVjdCA9IHJlamVjdDtcbiAgfSk7XG4gIHRoaXMucHJvbWlzZSA9IHByb21pc2U7XG4gIHJldHVybiB0aGlzO1xufTtcblxuXG5SdW50aW1lLnByb3RvdHlwZS5zdGFydCA9IGZ1bmN0aW9uKCkge1xuICB2YXIgZGVmZXJyZWQgPSBuZXcgUnVudGltZS5EZWZlcnJlZCgpO1xuICB0aGlzLnF1ZXVlID0gZGVmZXJyZWQucHJvbWlzZTtcbiAgdGhpcy5yZXNvbHZlID0gZGVmZXJyZWQucmVzb2x2ZTtcbiAgdGhpcy5yZWplY3QgPSBkZWZlcnJlZC5yZWplY3Q7XG4gIHRoaXMucmVzdWx0ID0gbnVsbDsgLy8gdGhlIHJlc3VsdCBmcm9tIGVhY2ggc3RlcC5cbn07XG5cblJ1bnRpbWUucHJvdG90eXBlLmRvbmUgPSBmdW5jdGlvbigpIHtcbiAgdGhpcy5yZXNvbHZlKCk7IC8vIFNvIHRoZSBxdWV1ZSBzdGFydCB0byBleGVjdXRlLlxufTtcblxuUnVudGltZS5wcm90b3R5cGUubmV4dCA9IGZ1bmN0aW9uKHN0ZXApIHtcbiAgdGhpcy5xdWV1ZS50aGVuKCgpID0+IHtcbiAgICB2YXIgbmV3UHJvbWlzZSA9IHN0ZXAodGhpcy5yZXN1bHQpO1xuICAgIGlmIChuZXdQcm9taXNlLm5leHQpIHtcbiAgICAgIC8vIElmIGl0J3MgYWxzbyBhIFBsYXlsYW5nIHN0YXRlbWVudHMsIGNvbmNhdCBpdC5cbiAgICAgIHJldHVybiBuZXdQcm9taXNlLnF1ZXVlO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBObyBtYXR0ZXIgaXQncyB2YWx1ZSBmcm9tIGFuIG9yZGluYXJ5IGZ1bmN0aW9uIG9yXG4gICAgICAvLyBhIFByb21pc2UsIHJldHVybmluZyBpdCBpcyBsZWdpdCBmb3IgYSBQcm9taXNlLlxuICAgICAgcmV0dXJuIG5ld1Byb21pc2U7XG4gICAgfVxuICB9KVxuICAudGhlbigocmVzdWx0KSA9PiB7XG4gICAgLy8gR2V0IHRoZSByZXN1bHQgZnJvbSBuZXdQcm9taXNlIGFuZCBzZXQgaXQuXG4gICAgdGhpcy5yZXN1bHQgPSByZXN1bHQ7XG4gIH0pXG4gIC5jYXRjaCgoZXJyKSA9PiB7XG4gICAgdGhpcy5yZWplY3QoZXJyKTtcbiAgfSk7XG59O1xuXG5SdW50aW1lLnByb3RvdHlwZS5tYXRjaCA9IGZ1bmN0aW9uKCkge1xuICAvLyBDb2xsZWN0IGFsbCAnY2FzZScgUHJvbWlzZXMgaGVyZS5cbiAgdGhpcy5xdWV1ZS50aGVuKCgpID0+IHtcbiAgICB0aGlzLm1hdGNoaW5nID0gW107XG4gICAgdGhpcy5tYXRjaGluZy5tYXRjaGVkID0gZmFsc2U7XG4gIH0pXG4gIC5jYXRjaCgoZXJyKSA9PiB7XG4gICAgdGhpcy5yZWplY3QoZXJyKTtcbiAgfSk7XG59O1xuXG4vLyBNYXRjaGluZyBlbmQ6IGV4ZWN1dGUgYWxsIG1hdGNoaW5nIGNhc2VzLlxuUnVudGltZS5wcm90b3R5cGUuZW5kID0gZnVuY3Rpb24oKSB7XG4gIHRoaXMucXVldWUudGhlbigoKSA9PiB7XG4gICAgdGhpcy5tYXRjaGluZyA9IG51bGw7XG4gIH0pLmNhdGNoKChlcnIpID0+IHtcbiAgICB0aGlzLnJlamVjdChlcnIpO1xuICB9KTtcbn07XG5cbi8qKlxuICogYHByZWRgIG11c3QgYmUgYSBzeW5jIGZ1bmN0aW9uIG9ubHkgcmV0dXJuIHRydWUgb3IgZmFsc2UuXG4gKiBJZiBtdWx0aXBsZSBgY2FzZWAgY2FuIG1hdGNoIHRoZSByZXN1bHQsIG9ubHkgdGhlIGZpcnN0IG1hdGNoaW5nIG9uZVxuICogd2lsbCBiZSBleGVjdXRlZCBhbmQgbGVhdmUgdGhlIHJlc3VsdC5cbiAqL1xuUnVudGltZS5wcm90b3R5cGUuY2FzZSA9IGZ1bmN0aW9uKHByZWQpIHtcbiAgdGhpcy5xdWV1ZS50aGVuKCgpID0+IHtcbiAgICB2YXIgaWQgPSB0aGlzLm1hdGNoaW5nLmxlbmd0aDtcbiAgICAvLyBJbiBhIGBtYXRjaGAsIHdlIGRvbid0IHVwZGF0ZSB0aGUgcmVzdWx0LFxuICAgIC8vIHNvIGV2ZXJ5IGBjYXNlYCBjYW4ganVkZ2UgaWYgaXQncyB0cnVlLlxuICAgIHZhciBwcmVkcmVzdWx0ID0gcHJlZCh0aGlzLnJlc3VsdCk7XG4gICAgdGhpcy5tYXRjaGluZ1tpZF0gPSBwcmVkcmVzdWx0O1xuICAgIHJldHVybiBpZDtcbiAgfSkuY2F0Y2goKGVycikgPT4ge1xuICAgIHRoaXMucmVqZWN0KGVycik7XG4gIH0pO1xufTtcblxuUnVudGltZS5wcm90b3R5cGUudG8gPSBmdW5jdGlvbihzdGVwKSB7XG4gIC8vIEl0J3MgYWx3YXlzIGNhc2UuLnRvLCBzbyB3ZSBvbmx5IG5lZWQgdG8gY29uY2F0XG4gIC8vICd0bycgcHJvbWlzZSBhZnRlciB0aGUgJ2Nhc2UnIHByb21pc2UuXG4gIHRoaXMucXVldWUudGhlbigoaWQpID0+IHtcbiAgICAvLyBPbmx5IGFwcGVuZCB0aGUgc3RlcCBpZiB0aGUgcHJldmlvdXMgb25lIGlzIHRydWUuXG4gICAgaWYgKCF0aGlzLm1hdGNoaW5nLm1hdGNoZWQgJiYgdGhpcy5tYXRjaGluZ1tpZF0pIHtcbiAgICAgIHRoaXMubWF0Y2hpbmcubWF0Y2hlZCA9IHRydWU7XG4gICAgICAvLyBJZiBpdCBtYXRjaGVzIHRoZSBjb25kaXRpb24sIGV4ZWN1dGUgdGhlIHN0ZXAgYmVmb3JlIHdlIG1vdmVcbiAgICAgIC8vIHRvIHRoZSBuZXh0IHN0ZXAgb2YgbWFpbiBxdWV1ZS5cbiAgICAgIHZhciBuZXdQcm9taXNlID0gc3RlcCh0aGlzLnJlc3VsdCk7XG4gICAgICBpZiAobmV3UHJvbWlzZS5uZXh0KSB7XG4gICAgICAgIHJldHVybiBuZXdQcm9taXNlLnF1ZXVlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIG5ld1Byb21pc2U7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB0aGlzLnJlc3VsdDtcbiAgICB9XG4gIH0pXG4gIC50aGVuKChyZXN1bHQpID0+IHtcbiAgICB0aGlzLnJlc3VsdCA9IHJlc3VsdDtcbiAgfSlcbiAgLmNhdGNoKChlcnIpID0+IHtcbiAgICB0aGlzLnJlamVjdChlcnIpO1xuICB9KTtcbn07XG5cbi8qKlxuICogUmVtZW1iZXIgd2Ugd2lsbCBzd2FwIGBsb29wYCBhbmQgYHVudGlsYCBhdCBzeW50YXggbGV2ZWwsIHNvXG4gKiB3ZSBjYW4gZ2V0IHRoZSBwcmVkIGJlZm9yZSB3ZSBydW4gdGhlIGxvb3AuXG4gKlxuICogMS4gRmlyc3QgYXBwbHkgdGhlIGBwcmVkYCBvbiB0aGUgcHJldmlvdXMgcmVzdWx0LlxuICogMi4gSWYgdHJ1ZSwgY29uY2F0IHRoZSBpdGVyYXRpb24gYW5kIHRoZSBuZXcgcHJlZGljdGluZyBzdGVwIGFmdGVyXG4gKiAgICB0aGUgbG9vcGluZyBwcm9taXNlLiBBbmQgdGhlIHByZWRpY2F0aW9uIHdpbGwgY29uY2F0IG5ldyBpdGVyYXRpb25cbiAqICAgIGludG8gdGhlIHRoZSBwcm9taXNlIGlmIGl0J3MgdHJ1ZS5cbiAqXG4gKiBOb3RlOiBvbmx5IHdoZW4gdGhlIHByZWRpY2F0aW9uIGdpdmVzIGZhbHNlLCB0aGUgbG9vcGluZyBwcm9taXNlIGZvclxuICogdGhlIG1haW4gcXVldWUgd2lsbCByZXNvbHZlLCBzbyBpdCBjYW4gcnVuIHRoZSBsb29waW5nIHdoaWxlIGJsb2NraW5nXG4gKiB0aGUgbWFpbiBxdWV1ZS5cbiAqL1xuUnVudGltZS5wcm90b3R5cGUubG9vcCA9IGZ1bmN0aW9uKHN0ZXApIHtcbiAgdGhpcy5xdWV1ZS50aGVuKCgpID0+IHtcbiAgICB2YXIgbG9vcHF1ZXVlID0gdGhpcy5sb29waW5nLmxvb3Bpbmdwcm9taXNlLnByb21pc2U7XG4gICAgdmFyIHByZWQgPSB0aGlzLmxvb3BpbmcucHJlZDtcbiAgICB2YXIgdXBkYXRlUmVzdWx0ID0gKHJlc3VsdCkgPT4ge1xuICAgICAgdGhpcy5yZXN1bHQgPSByZXN1bHQ7XG4gICAgfTtcbiAgICB2YXIgZ2VuZXJhdGVQcm9taXNlID0gKCkgPT4ge1xuICAgICAgdmFyIG5ld1Byb21pc2UgPSBzdGVwKHRoaXMucmVzdWx0KTtcbiAgICAgIGlmIChuZXdQcm9taXNlLm5leHQpIHtcbiAgICAgICAgcmV0dXJuIG5ld1Byb21pc2UucXVldWUudGhlbih1cGRhdGVSZXN1bHQpO1xuICAgICAgfSBlbHNlIGlmIChuZXdQcm9taXNlLnRoZW4pIHtcbiAgICAgICAgcmV0dXJuIG5ld1Byb21pc2UudGhlbih1cGRhdGVSZXN1bHQpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gT3JkaW5hcnkgZnVuY3Rpb24gd2lsbCByZXR1cm4gdGhlIHJlc3VsdC5cbiAgICAgICAgdmFyIG5ld1Jlc3VsdCA9IG5ld1Byb21pc2U7XG4gICAgICAgIHVwZGF0ZVJlc3VsdChuZXdSZXN1bHQpO1xuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XG4gICAgICB9XG4gICAgfTtcbiAgICB0aGlzLmxvb3BpbmcubG9vcGluZ3Byb21pc2UucHJvbWlzZSA9XG4gICAgICBsb29wcXVldWUudGhlbigoKSA9PiB7XG4gICAgICAgIGlmIChwcmVkKHRoaXMucmVzdWx0KSkge1xuICAgICAgICAgIHRoaXMubG9vcGluZy5sb29waW5ncHJvbWlzZS5wcm9taXNlID1cbiAgICAgICAgICAgIGxvb3BxdWV1ZS50aGVuKGdlbmVyYXRlUHJvbWlzZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5sb29waW5nLnF1ZXVlYmxvY2tlci5yZXNvbHZlKCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIC8vIEJsb2NrIHRoZSBtYWluIHF1ZXVlIHVudGlsIHRoZSBsb29wIGVuZHMuXG4gICAgcmV0dXJuIHRoaXMubG9vcGluZy5xdWV1ZWJsb2NrZXIucHJvbWlzZTtcbiAgfSlcbiAgLmNhdGNoKChlcnIpID0+IHtcbiAgICB0aGlzLnJlamVjdChlcnIpO1xuICB9KTtcbn07XG5cbi8qKlxuICogUmVtZW1iZXIgd2Ugd2lsbCBzd2FwIGBsb29wYCBhbmQgYHVudGlsYCBhdCBzeW50YXggbGV2ZWwsIHNvXG4gKiB3ZSBjYW4gZ2V0IHRoZSBwcmVkIGJlZm9yZSB3ZSBydW4gdGhlIGxvb3AuXG4gKi9cblJ1bnRpbWUucHJvdG90eXBlLnVudGlsID0gZnVuY3Rpb24ocHJlZCkge1xuICB0aGlzLnF1ZXVlLnRoZW4oKCkgPT4ge1xuICAgIHRoaXMubG9vcGluZyA9IHtcbiAgICAgICdwcmVkJzogcHJlZCxcbiAgICAgICdsb29waW5ncHJvbWlzZSc6IFByb21pc2UucmVzb2x2ZSgpLFxuICAgICAgJ3F1ZXVlYmxvY2tlcic6IG5ldyBSdW50aW1lLkRlZmVycmVkKClcbiAgICB9O1xuICB9KVxuICAuY2F0Y2goKGVycikgPT4ge1xuICAgIHRoaXMucmVqZWN0KGVycik7XG4gIH0pO1xufTtcblxuUnVudGltZS5wcm90b3R5cGUuYW55ID0gZnVuY3Rpb24oKSB7XG4gIHZhciB1cGRhdGVSZXN1bHQgPSAocmVzdWx0KSA9PiB7XG4gICAgdGhpcy5yZXN1bHQgPSByZXN1bHQ7XG4gIH07XG4gIHZhciBnZW5lcmF0ZVByb21pc2UgPSAoc3RlcCkgPT4ge1xuICAgIHZhciBuZXdQcm9taXNlID0gc3RlcCh0aGlzLnJlc3VsdCk7XG4gICAgaWYgKG5ld1Byb21pc2UubmV4dCkge1xuICAgICAgcmV0dXJuIG5ld1Byb21pc2UucXVldWUudGhlbih1cGRhdGVSZXN1bHQpO1xuICAgIH0gZWxzZSBpZiAobmV3UHJvbWlzZS50aGVuKSB7XG4gICAgICByZXR1cm4gbmV3UHJvbWlzZS50aGVuKHVwZGF0ZVJlc3VsdCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIE9yZGluYXJ5IGZ1bmN0aW9uIHdpbGwgcmV0dXJuIHRoZSByZXN1bHQuXG4gICAgICB2YXIgbmV3UmVzdWx0ID0gbmV3UHJvbWlzZTtcbiAgICAgIHVwZGF0ZVJlc3VsdChuZXdSZXN1bHQpO1xuICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xuICAgIH1cbiAgfTtcbiAgdmFyIGNhbmRpZGF0ZXMgPSBBcnJheS5mcm9tKGFyZ3VtZW50cyk7XG4gIHRoaXMucXVldWUudGhlbigoKSA9PiB7XG4gICAgcmV0dXJuIFByb21pc2UucmFjZShjYW5kaWRhdGVzLm1hcCgoc3RlcCkgPT4ge1xuICAgICAgcmV0dXJuIGdlbmVyYXRlUHJvbWlzZShzdGVwKTtcbiAgICB9KSk7XG4gIH0pXG4gIC5jYXRjaCgoZXJyKSA9PiB7XG4gICAgdGhpcy5yZWplY3QoZXJyKTtcbiAgfSk7XG59O1xuXG5SdW50aW1lLnByb3RvdHlwZS5hbGwgPSBmdW5jdGlvbigpIHtcbiAgdmFyIHVwZGF0ZVJlc3VsdCA9IChyZXN1bHQpID0+IHtcbiAgICB0aGlzLnJlc3VsdCA9IHJlc3VsdDtcbiAgfTtcbiAgdmFyIGdlbmVyYXRlUHJvbWlzZSA9IChzdGVwKSA9PiB7XG4gICAgdmFyIG5ld1Byb21pc2UgPSBzdGVwKHRoaXMucmVzdWx0KTtcbiAgICBpZiAobmV3UHJvbWlzZS5uZXh0KSB7XG4gICAgICByZXR1cm4gbmV3UHJvbWlzZS5xdWV1ZS50aGVuKHVwZGF0ZVJlc3VsdCk7XG4gICAgfSBlbHNlIGlmIChuZXdQcm9taXNlLnRoZW4pIHtcbiAgICAgIHJldHVybiBuZXdQcm9taXNlLnRoZW4odXBkYXRlUmVzdWx0KTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gT3JkaW5hcnkgZnVuY3Rpb24gd2lsbCByZXR1cm4gdGhlIHJlc3VsdC5cbiAgICAgIHZhciBuZXdSZXN1bHQgPSBuZXdQcm9taXNlO1xuICAgICAgdXBkYXRlUmVzdWx0KG5ld1Jlc3VsdCk7XG4gICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XG4gICAgfVxuICB9O1xuICB2YXIgY2FuZGlkYXRlcyA9IEFycmF5LmZyb20oYXJndW1lbnRzKTtcbiAgdGhpcy5xdWV1ZS50aGVuKCgpID0+IHtcbiAgICByZXR1cm4gUHJvbWlzZS5hbGwoY2FuZGlkYXRlcy5tYXAoKHN0ZXApID0+IHtcbiAgICAgIHJldHVybiBnZW5lcmF0ZVByb21pc2Uoc3RlcCk7XG4gICAgfSkpO1xuICB9KVxuICAuY2F0Y2goKGVycikgPT4ge1xuICAgIHRoaXMucmVqZWN0KGVycik7XG4gIH0pO1xufTtcblxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9wbGF5bGFuZy5ydW50aW1lLmpzXG4gKiovIl0sInNvdXJjZVJvb3QiOiIifQ==