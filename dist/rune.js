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