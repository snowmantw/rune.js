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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgYjViYzBjNTA1Y2JiYjZiMTU5MzciLCJ3ZWJwYWNrOi8vLy4vc3JjL3J1bmUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVCQUFlO0FBQ2Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7QUN0Q0EsYUFBWSxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBcUdOLFVBQVMsSUFBSSxHQUFHLEVBQUU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUE0QnpCLEtBQUksQ0FBQyxNQUFNLEdBQUcsVUFBUyxNQUFNLEVBQUUsRUFBRSxFQUFZO09BQVYsR0FBRyx5REFBRyxFQUFFOztBQUN6QyxPQUFJLEtBQUssR0FBRyxTQUFSLEtBQUssR0FBcUI7QUFDNUIsU0FBSSxJQUFJLEVBQUUsV0FBVyxDQUFDOzt1Q0FEQSxJQUFJO0FBQUosV0FBSTs7O0FBRTFCLGFBQVEsRUFBRTtBQUNSLFlBQUssTUFBTTtBQUNULGFBQUksR0FBRyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDL0MsYUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDdEIsb0JBQVcsR0FDVCxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUNoRCxlQUFNO0FBQ1IsWUFBSyxPQUFPO0FBQ1YsYUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO0FBQzdCLGFBQUksQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDO0FBQ2hCLGFBQUksR0FBRyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDL0MsYUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDdEIsb0JBQVcsR0FDVCxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUNoRCxlQUFNO0FBQ1IsWUFBSyxLQUFLO0FBQ1IsYUFBSSxHQUFHLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUMvQyxhQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUN0QixhQUFJLENBQUMsS0FBSyxHQUNSLElBQUksQ0FBQyxVQUFVLENBQUM7QUFDbEIsb0JBQVcsR0FDVCxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUNoRCxlQUFNO0FBQ1IsWUFBSyxNQUFNO0FBQ1QsYUFBSSxHQUFHLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUMvQyxhQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUN0QixvQkFBVyxHQUNULElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0FBQ2hELGFBQUksQ0FBQyxXQUFXLEVBQUU7QUFDaEIsaUJBQU0sSUFBSSxLQUFLLHNCQUFpQixJQUFJLENBQUMsSUFBSSxrREFDaEIsQ0FBQztVQUMzQjtBQUNELGdCQUFPLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUFBLE1BQ3pCOztBQUVELFNBQUksV0FBVyxFQUFFO0FBQ2YsV0FBSSxDQUFDLEtBQUssR0FBRyxXQUFXLENBQUM7TUFDMUI7QUFDRCxZQUFPLElBQUksQ0FBQztJQUNiLENBQUM7QUFDRixRQUFLLENBQUMsSUFBSSxHQUFHO0FBQ1gsU0FBSSxFQUFFLEVBQUU7QUFDUixVQUFLLEVBQUUsR0FBRztBQUNWLGFBQVEsRUFBRSxNQUFNO0lBQ2pCLENBQUM7QUFDRixVQUFPLEtBQUssQ0FBQztFQUNkLENBQUM7Ozs7Ozs7O0FBUUYsS0FBSSxDQUFDLE9BQU8sR0FBRyxVQUFTLFFBQVEsRUFBRTtBQUNoQyxPQUFJLFNBQVMsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxVQUFDLEdBQUcsRUFBRSxJQUFJLEVBQUs7QUFDMUQsU0FBSSxNQUFNLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQzVCLFNBQUksTUFBTSxDQUFDLElBQUksRUFBRTtBQUNmLFVBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQztNQUM3QjtJQUNGLEVBQUUsRUFBRSxDQUFDLENBQUM7QUFDUCxVQUFPLFlBQVc7QUFDaEIsWUFBTyxTQUFTLENBQUM7SUFDbEIsQ0FBQztFQUNILENBQUM7O0FBRUYsS0FBSSxDQUFDLElBQUksR0FBRyxVQUFTLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFO0FBQ3RDLE9BQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO0FBQ2pCLE9BQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO0FBQ2pCLE9BQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO0VBQ3BCLENBQUM7O0FBRUYsS0FBSSxDQUFDLFFBQVEsR0FBRyxZQUF1QjtPQUFkLE9BQU8seURBQUcsRUFBRTs7QUFDbkMsT0FBSSxDQUFDLFVBQVUsR0FBRyxFQUFFLENBQUM7QUFDckIsT0FBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUM7QUFDekIsT0FBSSxDQUFDLFFBQVEsR0FBRyxPQUFPLENBQUM7RUFDekIsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBd0JGLEtBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLFFBQVEsR0FBRyxVQUFTLENBQUMsRUFBRTtBQUM3QyxPQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUN4QixVQUFPLElBQUksQ0FBQztFQUNiLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUF5QkYsS0FBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsV0FBVyxHQUFHLFVBQVMsSUFBSSxFQUFFOzs7O0FBRW5ELFVBQU8sVUFBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBSztBQUNqQyxTQUFJOztBQUVGLGFBQUssVUFBVSxDQUFDLE1BQU0sQ0FBQyxVQUFDLEdBQUcsRUFBRSxRQUFRLEVBQUs7QUFDeEMsaUJBQVEsQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDM0MsRUFBRSxPQUFPLENBQUMsQ0FBQztNQUNiLENBQUMsT0FBTSxDQUFDLEVBQUU7QUFDVCxhQUFLLFlBQVksQ0FBQyxDQUFDLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxLQUFLLENBQUMsQ0FBQztNQUM5Qzs7QUFFRCxTQUFJLFFBQVEsR0FBRyxJQUFJLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxLQUFLLENBQUMsQ0FBQztBQUM1QyxZQUFPLFFBQVEsQ0FBQztJQUNqQixDQUFDO0VBQ0gsQ0FBQzs7QUFFRixLQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxZQUFZLEdBQ3BDLFVBQVMsR0FBRyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFOztBQUVwQyxTQUFNLElBQUksS0FBSyxrQkFBZ0IsTUFBTSxDQUFDLElBQUksdUJBQWlCLEdBQUcsaUJBQWEsQ0FBQztFQUM3RSxDIiwiZmlsZSI6InJ1bmUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aWQ6IG1vZHVsZUlkLFxuIFx0XHRcdGxvYWRlZDogZmFsc2VcbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHdlYnBhY2svYm9vdHN0cmFwIGI1YmMwYzUwNWNiYmI2YjE1OTM3XG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xuXG4vKipcbiAqIEdlbmVyaWMgYnVpbGRlciB0aGF0IHdvdWxkIHB1c2ggbm9kZXMgaW50byB0aGUgZURTTCBzdGFjay5cbiAqIFVzZXIgY291bGQgaW5oZXJpdCB0aGlzIHRvIGRlZmluZSB0aGUgbmV3IGVEU0wuXG4gKiAtLS1cbiAqIFRoZSBkZWZhdWx0IHNlbWFudGljcyBvbmx5IGNvbnRhaW4gdGhlc2Ugb3BlcmF0aW9uczpcbiAqXG4gKiAxLiBbcHVzaF0gOiBwdXNoIHRvIHRoZSBjdXJyZW50IHN0YWNrXG4gKiAyLiBbYmVnaW5dOiBjcmVhdGUgYSBuZXcgc3RhY2sgYW5kIHN3aXRjaCB0byBpdCxcbiAqICAgICAgICAgICAgIGFuZCB0aGVuIHB1c2ggdGhlIG5vZGUgaW50byB0aGUgc3RhY2suXG4gKiAzLiBbZW5kXSAgOiBhZnRlciBwdXNoIHRoZSBub2RlIGludG8gdGhlIHN0YWNrLFxuICogICAgICAgICAgICAgY2hhbmdlIHRoZSBjdXJyZW50IHN0YWNrIHRvIHRoZSBwcmV2aW91cyBvbmUuXG4gKiA0LiBbZXhpdF0gOiBleGl0IHRoZSBjb250ZXh0IG9mIHRoaXMgZURTTDsgdGhlIGxhc3QgcmVzdWx0XG4gKiAgICAgICAgICAgICBvZiBpdCB3b3VsZCBiZSBwYXNzZWQgdG8gdGhlIHJldHVybiB2YWx1ZSBvZlxuICogICAgICAgICAgICAgdGhpcyBjaGFpbi5cbiAqXG4gKiBTdGFjayBjb3VsZCBiZSBuZXN0ZWQ6IHdoZW4gW2JlZ2luXSBhIG5ldyBzdGFjayBpbiBmYWN0IGl0IHdvdWxkXG4gKiBwdXNoIHRoZSBzdGFjayBpbnRvIHRoZSBwcmV2aW91cyBvbmUuIFNvIHRoZSBzdGFjayBjb21wcmlzZVxuICogW25vZGVdIGFuZCBbc3RhY2tdLlxuICogLS0tXG4gKiBBbHRob3VnaCB0aGUgZURTTCBpbnN0YW5jZSBzaG91bGQgd3JhcCB0aGVzZSBiYXNpYyBvcGVyYXRpb25zXG4gKiB0byBtYW5pcHVsYXRlIHRoZSBzdGFjaywgdGhleSBhbGwgbmVlZCB0byBjb252ZXJ0IHRoZSBtZXRob2RcbiAqIGNhbGwgdG8gbm9kZXMuIFNvICdSdW5lJyBwcm92aWRlIGEgd2F5IHRvIHNpbXBsaWZ5IHRoZSB3b3JrOiBpZlxuICogdGhlIGluc3RhbmNlIGNhbGwgdGhlIFtkZWZpbmVdIG1ldGhvZCB0aGUgbmFtZSBvZiB0aGUgbWV0aG9kLFxuICogaXQgY291bGQgYXNzb2NpYXRlIHRoZSBvcGVyYW5kIG9mIHRoZSBlRFNMIHdpdGggdGhlIHN0YWNrIG1hbmlwdWxhdGlvbi5cbiAqIEZvciBleGFtcGxlOlxuICpcbiAqICAgIHZhciBlRFNMID0gZnVuY3Rpb24oKSB7fTtcbiAqICAgIGVEU0wucHJvdG90eXBlLnRyYW5zYWN0aW9uID0gUnVuZS5kZWZpbmUoJ3RyYW5zYWN0aW9uJywgJ2JlZ2luJyk7XG4gKiAgICBlRFNMLnByb3RvdHlwZS5wcmUgPSBSdW5lLmRlZmluZSgncHJlJywgJ3B1c2gnKTtcbiAqICAgIGVEU0wucHJvdG90eXBlLnBlcmZvcm0gPSBSdW5lLmRlZmluZSgncGVyZm9ybScsICdwdXNoJyk7XG4gKiAgICBlRFNMLnByb3RvdHlwZS5wb3N0ID0gUnVuZS5kZWZpbmUoJ3Bvc3QnLCAnZW5kJyk7XG4gKlxuICogVGhlbiB0aGUgZURTTCBjb3VsZCBiZSB1c2VkIGFzOlxuICpcbiAqICAgIChuZXcgZURTTClcbiAqICAgICAgLnRyYW5zYWN0aW9uKClcbiAqICAgICAgLnByZShjYilcbiAqICAgICAgLnBlcmZvcm0oY2IpXG4gKiAgICAgIC5wb3N0KGNiKVxuICpcbiAqIEFuZCB0aGUgc3RhY2sgd291bGQgYmU6XG4gKlxuICogICAgW1xuICogICAgICBub2RlPCd0cmFuc2FjdGlvbicsPlxuICogICAgICBub2RlPCdwcmUnLCBjYj5cbiAqICAgICAgbm9kZTwncHJlZm9ybScsIGNiPlxuICogICAgICBub2RlPCdwb3N0JywgY2I+XG4gKiAgICBdXG4gKlxuICogSG93ZXZlciwgdGhpcyBzaW1wbGUgYXBwcm9hY2ggdGhlIHNlbWFudGljcyBydWxlcyBhbmQgYW5hbHl6ZXJzIHRvXG4gKiBndWFyYW50ZWUgdGhlIHN0YWNrIGlzIHZhbGlkLiBGb3IgZXhhbXBsZSwgaWYgd2UgaGF2ZSBhIG1hbGZvcm1lZFxuICogc3RhY2sgYmVjYXVzZSBvZiB0aGUgZm9sbG93aW5nIGVEU0wgcHJvZ3JhbTpcbiAqXG4gKiAgICAobmV3IGVEU0wpXG4gKiAgICAgIC5wb3N0KGNiKVxuICogICAgICAucHJlKGNiKVxuICogICAgICAucGVyZm9ybShjYilcbiAqICAgICAgLnRyYW5zYWN0aW9uKClcbiAqXG4gKiBUaGUgcnVudGltZSBtYXkgcmVwb3J0IGVycm90IGJlY2F1c2Ugd2hlbiAnLnBvc3QoY2IpJyB0aGVyZSBpcyBubyBzdGFja1xuICogY3JlYXRlZCBieSB0aGUgYmVnaW5uaW5nIHN0ZXAsIG5hbWVseSB0aGUgJy5wcmUoY2IpJyBpbiBvdXIgY2FzZS5cbiAqIE5ldmVydGhlbGVzcywgdGhlIGVycm9yIG1lc3NhZ2UgaXMgdG9vIGxvdy1sZXZlbCBmb3IgdGhlIGxhbmd1YWdlIHVzZXIsXG4gKiBzaW5jZSB0aGV5IHNob3VsZCBjYXJlIG5vIHN0YWNrIHRoaW5ncyBhbmQgc2hvdWxkIG9ubHkgY2FyZSBhYm91dCB0aGUgZURTTFxuICogaXRzZWxmLlxuICpcbiAqIFRoZSBzb2x1dGlvbiBpcyB0byBwcm92aWRlIGEgYmFzaWMgc3RhY2sgb3JkZXJpbmcgYW5hbHl6ZXIgYW5kIGxldCB0aGVcbiAqIGxhbmd1YWdlIGRlY2lkZSBob3cgdG8gZGVzY3JpYmUgdGhlIGVycm9yLiBBbmQgc2luY2Ugd2UgZG9uJ3QgaGF2ZVxuICogYW55IGNvbnRleHQgaW5mb3JtYXRpb24gYWJvdXQgdmFyaWFibGVzLCBzY29wZSBhbmQgb3RoZXIgZWxlbWVudHNcbiAqIGFzIGEgY29tcGxldGUgcHJvZ3JhbW1pbmcgbGFuZ3VhZ2UsIHdlIG9ubHkgbmVlZCB0byBndWFyYW50ZWUgdGhlIG9yZGVyIGlzXG4gKiBjb3JyZWN0LCBhbmQgbWFrZSBpbmNvcnJlY3QgY2FzZXMgbWVhbmluZ2Z1bC4gTW9yZW92ZXIsIHNpbmNlIHRoZSBhbmFseXplclxuICogbmVlZHMgdG8gYW5hbHl6ZSB0aGUgc3RhdGVzIHdoZW5ldmVyIHRoZSBpbmNvbWluZyBub2RlIGNvbWVzLCBpdCBpcyBpbiBmYWN0XG4gKiBhbiBldmFsdWF0aW9uIHByb2Nlc3MsIHNvIHVzZXIgY291bGQgY29tYmluZSB0aGUgYW5hbHl6aW5nIGFuZCBpbnRlcnByZXRpbmdcbiAqIHBoYXNlIGludG8gdGhlIHNhbWUgZnVuY3Rpb24uIEZvciBleGFtcGxlOlxuICpcbiAqICAgIHJ1bnRpbWUub25jaGFuZ2UoKGNvbnRleHQsIG5vZGUsIHN0YWNrKSA9PiB7XG4gKiAgICAgICAgLy8gSWYgdGhlIGNoYW5nZSBpcyB0byBzd2l0Y2ggdG8gYSBuZXcgc3RhY2ssXG4gKiAgICAgICAgLy8gdGhlICdzdGFjaycgaGVyZSB3b3VsZCBiZSB0aGUgbmV3IHN0YWNrLlxuICogICAgICAgIHZhciB7dHlwZSwgYXJnc30gPSBub2RlO1xuICogICAgICAgIGlmICgncHJlJyA9PT0gdHlwZSkge1xuICogICAgICAgICAgY29udGV4dC5pbml0ID0gdHJ1ZTtcbiAqICAgICAgICB9IGVsc2UgaWYgKCdwb3N0JyA9PT0gdHlwZSAmJiAhY29udGV4dC5pbml0KSB7XG4gKiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1RoZXJlIG11c3QgYmUgb25lIFwicHJlXCIgbm9kZSBiZWZvcmUgdGhlIFwicG9zdFwiLicpO1xuICogICAgICAgIH1cbiAqICAgIH0pO1xuICpcbiAqIFdpdGggc3VjaCBmZWF0dXJlLCBpZiB0aGUgaW5jb21pbmcgbm9kZSBvciB0aGUgc3RhY2sgaXMgbWFsZm9ybWVkLFxuICogaXQgc2hvdWxkIHRocm93IHRoZSBlcnJvci4gVGhlIGVycm9yIGNhcHR1cmVkIGJ5IHRoZSBpbnN0YW5jZSBsaWtlIHRoaXNcbiAqIGNvdWxkIGJlIGEgJ2NvbXBpbGF0aW9uIGVycm9yJy5cbiAqXG4gKiBUaGUgbm90aWNlYWJsZSBmYWN0IGlzIFRoZSBjYWxsYmFjayBvZiB0aGUgJ29uY2hhbmdlJyBpcyBhY3R1YWxseSBhIHJlZHVjZXIsXG4gKiBzbyB1c2VyIGNvdWxkIHRyZWF0IHRoZSBwcm9jZXNzIG9mIHRoaXMgZXZhbHVhdGlvbiAmIGFuYWx5emluZyBhcyBhIHJlZHVjaW5nXG4gKiBwcm9jZXNzIG9uIGFuIGluZmluaXRlIHN0cmVhbS4gQW5kIHNpbmNlIHdlIGhhdmUgYSBzdGFjayBtYWNoaW5lLCBpZiB0aGVcbiAqIHJlZHVjZXIgcmV0dXJuIG5vdGhpbmcsIHRoZSBzdGFjayB3b3VsZCBiZSBlbXB0eS4gT3RoZXJ3aXNlLCBpZiB0aGUgcmVkdWNlclxuICogcmV0dXJuIGEgbmV3IHN0YWNrLCBpdCB3b3VsZCByZXBsYWNlIHRoZSBvbGQgb25lLlxuICpcbiAqIEFuZCBwbGVhc2Ugbm90ZSB0aGUgZXhhbXBsZSBpcyBtdWNoIHNpbXBsaWZpZWQuIEZvciB0aGVcbiAqIHJlYWwgZURTTCBpdCBzaG91bGQgYmUgdXNlZCBvbmx5IGFzIGFuIGVudHJ5IHRvIGRpc3BhdGNoIHRoZSBjaGFuZ2UgdG9cbiAqIHRoZSByZWFsIGhhbmRsZXJzLCB3aGljaCBtYXkgY29tcHJpc2Ugc2V2ZXJhbCBzdGF0ZXMgYW5kIGNvbXBvbmVudHMuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBSdW5lKCkge31cblxuLyoqXG4gKiBIZWxwZXIgbWV0aG9kIHRvIGJ1aWxkIGludGVyZmFjZSBvZiBhIHNwZWNpZmljIERTTC4gSXQgd291bGQgcmV0dXJuIGEgbWV0aG9kXG4gKiBvZiB0aGUgRFNMIGFuZCB0aGVuIHRoZSBpbnRlcmZhY2UgY291bGQgYXR0YWNoIGl0LlxuICpcbiAqIFRoZSByZXR1cm5pbmcgZnVuY3Rpb24gd291bGQgYXNzdW1lIHRoYXQgdGhlICd0aGlzJyBpbnNpZGUgaXQgaXMgdGhlIHJ1bnRpbWVcbiAqIG9mIHRoZSBsYW5ndWFnZS4gQW5kIHNpbmNlIHRoZSBtZXRob2QgaXQgcmV0dXJucyB3b3VsZCByZXF1aXJlIHRvIGFjY2VzcyBzb21lXG4gKiBtZW1iZXJzIG9mIHRoZSAndGhpcycsIHRoZSAndGhpcycgc2hvdWxkIGhhdmUgJ3RoaXMuc3RhY2snIGFuZCAndGhpcy5jb250ZXh0J1xuICogYXMgdGhlIG1ldGhvZCByZXF1aXJlcy5cbiAqXG4gKiBJZiBpdCdzIGFuICdleGl0JyBub2RlLCBtZWFucyB0aGUgc2Vzc2lvbiBpcyBlbmRlZCBhbmQgdGhlIGludGVycHJldGVyIHNob3VsZFxuICogcmV0dXJuIGEgc3RhY2sgY29udGFpbnMgb25seSBvbmUgbm9kZSBhcyB0aGUgcmVzdWx0IG9mIHRoZSBzZXNzaW9uLCBvciB0aGVcbiAqIHNlc3Npb24gcmV0dXJucyBub3RoaW5nLiBGb3Igb3RoZXIgaW5zdHJ1Y3Rpb25zIHRoZSBzdGFjayBjYW4ga2VlcCBzb21lXG4gKiBjb21wdXRlZCByZXN1bHQgdG8gc2ltdWxhdGUgcmVhbCBzdGFjayBtYWNoaW5lLiBCdXQgaXQncyBPSyB0byBub3QgdXNlIHRoaXNcbiAqIGZlYXR1cmUgYW5kIGFsd2F5cyByZXR1cm4gYW4gZW1wdHkgJ3N0YWNrJyBldmVyeXRpbWUgdGhlICdvbmNoYW5nZScgZ2V0XG4gKiBjYWxsZWQgYW5kIGludGVydXB0ZWQuIEluIHRoaXMgbW9kZSBpdCBtZWFucyB0aGUgbGFuZ3VhZ2Ugd2FudCB0byBrZWVwXG4gKiBhbGwgc3RhdGVzIGJ5IGl0c2VsZi5cbiAqXG4gKiBQbGVhc2Ugbm90ZSB0aGF0IGZyb20gdGhlIGRlc2NyaXB0aW9uIGFib3ZlLCAnZW5kJyBtZWFucyBzdGFjayAoc3Vic3RhY2spXG4gKiBlbmRzLiBJdCdzIHRvdGFsbHkgaXJyZWxldmFudCB0byAnZXhpdCcuXG4gKlxuICogVGhlIGxhc3QgYXJndW1lbnQgJ2RvYycgaXMgd2hhdCBkZXNpZ25lciBjb3VsZCBwdXQgdGhlIGRlc2NyaXB0aW9uIGFib3V0XG4gKiB0aGUgbWV0aG9kLiBJZiBzZXQsIGl0IHdvdWxkIGFwcGVuZCB0aGUgJ3J1bmUuZG9jJ1xuICogcHJvcGVydHkgaW4gdGhlIGZ1bmN0aW9uIGl0IHJldHVybnMuIEFuZCB0aGVuIHRoZSBsYW5ndWFnZSBpbnN0YW5jZSBjb3VsZFxuICogY2FsbCBgUnVuZS5kb2N1bWVudCg8aW5zdGFuY2U+KWAgdG8gZ2V0IGEgbWV0aG9kIHRoYXQgd291bGQgcmV0dXJuXG4gKiAneyBtZXRob2ROYW1lOiBkZXNjcmlwdGlvbiB9JyB3aGVuIGl0IGdvdCBpbnZva2VkLlxuICovXG5SdW5lLmRlZmluZSA9IGZ1bmN0aW9uKG1ldGhvZCwgYXMsIGRvYyA9ICcnKSB7XG4gIHZhciBidWlsdCA9IGZ1bmN0aW9uKC4uLmFyZ3MpIHtcbiAgICB2YXIgbm9kZSwgcmVzdWx0c3RhY2s7XG4gICAgc3dpdGNoIChhcykge1xuICAgICAgY2FzZSAncHVzaCc6XG4gICAgICAgIG5vZGUgPSBuZXcgUnVuZS5Ob2RlKG1ldGhvZCwgYXJncywgdGhpcy5zdGFjayk7XG4gICAgICAgIHRoaXMuc3RhY2sucHVzaChub2RlKTtcbiAgICAgICAgcmVzdWx0c3RhY2sgPVxuICAgICAgICAgIHRoaXMub25jaGFuZ2UodGhpcy5jb250ZXh0LCBub2RlLCB0aGlzLnN0YWNrKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdiZWdpbic6XG4gICAgICAgIHRoaXMuX3ByZXZzdGFjayA9IHRoaXMuc3RhY2s7XG4gICAgICAgIHRoaXMuc3RhY2sgPSBbXTtcbiAgICAgICAgbm9kZSA9IG5ldyBSdW5lLk5vZGUobWV0aG9kLCBhcmdzLCB0aGlzLnN0YWNrKTtcbiAgICAgICAgdGhpcy5zdGFjay5wdXNoKG5vZGUpOyAgLy8gYXMgdGhlIGZpcnN0IG5vZGUgb2YgdGhlIG5ldyBzdGFjay5cbiAgICAgICAgcmVzdWx0c3RhY2sgPVxuICAgICAgICAgIHRoaXMub25jaGFuZ2UodGhpcy5jb250ZXh0LCBub2RlLCB0aGlzLnN0YWNrKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdlbmQnOlxuICAgICAgICBub2RlID0gbmV3IFJ1bmUuTm9kZShtZXRob2QsIGFyZ3MsIHRoaXMuc3RhY2spO1xuICAgICAgICB0aGlzLnN0YWNrLnB1c2gobm9kZSk7ICAvLyB0aGUgbGFzdCBub2RlIG9mIHRoZSBzdGFjay5cbiAgICAgICAgdGhpcy5zdGFjayA9XG4gICAgICAgICAgdGhpcy5fcHJldnN0YWNrOyAvLyBzd2l0Y2ggYmFjayB0byB0aGUgcHJldmlvdXMgc3RhY2suXG4gICAgICAgIHJlc3VsdHN0YWNrID1cbiAgICAgICAgICB0aGlzLm9uY2hhbmdlKHRoaXMuY29udGV4dCwgbm9kZSwgdGhpcy5zdGFjayk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnZXhpdCc6XG4gICAgICAgIG5vZGUgPSBuZXcgUnVuZS5Ob2RlKG1ldGhvZCwgYXJncywgdGhpcy5zdGFjayk7XG4gICAgICAgIHRoaXMuc3RhY2sucHVzaChub2RlKTsgIC8vIHRoZSBsYXN0IG5vZGUgb2YgdGhlIHN0YWNrLlxuICAgICAgICByZXN1bHRzdGFjayA9XG4gICAgICAgICAgdGhpcy5vbmNoYW5nZSh0aGlzLmNvbnRleHQsIG5vZGUsIHRoaXMuc3RhY2spO1xuICAgICAgICBpZiAoIXJlc3VsdHN0YWNrKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGAnZXhpdCcgbm9kZSAnJHtub2RlLnR5cGV9JyBzaG91bGRcbiAgICAgICAgICAgIHJldHVybiBhIHJlc3VsdHN0YWNrLmApO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHRzdGFja1swXTtcbiAgICB9XG4gICAgLy8gSWYgdGhlIGhhbmRsZXIgdXBkYXRlcyB0aGUgc3RhY2ssIGl0IHdvdWxkIHJlcGxhY2UgdGhlIGV4aXN0aW5nIG9uZS5cbiAgICBpZiAocmVzdWx0c3RhY2spIHtcbiAgICAgIHRoaXMuc3RhY2sgPSByZXN1bHRzdGFjaztcbiAgICB9XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG4gIGJ1aWx0LnJ1bmUgPSB7XG4gICAgJ2FzJzogYXMsXG4gICAgJ2RvYyc6IGRvYyxcbiAgICAnbWV0aG9kJzogbWV0aG9kLFxuICB9O1xuICByZXR1cm4gYnVpbHQ7XG59O1xuXG4vKipcbiAqIEdlbmVyYXRlIGEgbWV0aG9kIHRoYXQgd291bGQgcmV0dXJuIGFsbCBkb2N1bWVudHMgb2YgdGhlIG1ldGhvZHMsXG4gKiBpbiBhIGZvcm0gb2YgJ3sgbWV0aG9kTmFtZTogZGVzY3JpcHRpb24gfScuXG4gKlxuICogVGhlIGFyZ3VtZW50IG11c3QgYmUgdGhlIGxhbmd1YWdlIGluc3RhbmNlIHdpdGggYWxsIGRlZmluZWQgbWV0aG9kcy5cbiAqL1xuUnVuZS5wdWJsaXNoID0gZnVuY3Rpb24oaW5zdGFuY2UpIHtcbiAgdmFyIGdlbmVyYXRlZCA9IE9iamVjdC5rZXlzKGluc3RhbmNlKS5yZWR1Y2UoKGRvYywgbmFtZSkgPT4ge1xuICAgIHZhciBtZXRob2QgPSBpbnN0YW5jZVtuYW1lXTtcbiAgICBpZiAobWV0aG9kLnJ1bmUpIHtcbiAgICAgIGRvY1tuYW1lXSA9IG1ldGhvZC5ydW5lLmRvYztcbiAgICB9XG4gIH0sIHt9KTtcbiAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBnZW5lcmF0ZWQ7XG4gIH07XG59O1xuXG5SdW5lLk5vZGUgPSBmdW5jdGlvbih0eXBlLCBhcmdzLCBzdGFjaykge1xuICB0aGlzLnR5cGUgPSB0eXBlO1xuICB0aGlzLmFyZ3MgPSBhcmdzO1xuICB0aGlzLnN0YWNrID0gc3RhY2s7XG59O1xuXG5SdW5lLkV2YWx1YXRlID0gZnVuY3Rpb24oY29udGV4dCA9IHt9KSB7XG4gIHRoaXMuX2FuYWx5emVycyA9IFtdO1xuICB0aGlzLl9pbnRlcnByZXRlciA9IG51bGw7XG4gIHRoaXMuX2NvbnRleHQgPSBjb250ZXh0O1xufTtcblxuLyoqXG4gKiBBbmFseXplciBjb3VsZCByZWNlaXZlIHRoZSBzdGFjayBjaGFuZ2UgZnJvbSAnUnVuZSNldmFsdWF0ZScsXG4gKiBhbmQgaXQgd291bGQgYmUgY2FsbGVkIHdpdGggdGhlIGFyZ3VtZW50cyBhcyB0aGUgZnVuY3Rpb24gZGVzY3JpYmVzOlxuICpcbiAqICAgICBSdW5lLnByb3RvdHlwZS5ldmFsdWF0ZSgoY29udGV4dCwgY2hhbmdlLCBzdGFjaykgPT4ge1xuICogICAgICAgIC8vIC4uLlxuICogICAgIH0pO1xuICpcbiAqIFNvIHRoZSBhbmFseXplciBjb3VsZCBiZTpcbiAqXG4gKiAgICBmdW5jdGlvbihjb250ZXh0LCBjaGFuZ2UsIHN0YWNrKSB7XG4gKiAgICAgIC8vIERvIHNvbWUgY2hlY2sgYW5kIG1heWJlIGNoYW5nZWQgdGhlIGNvbnRleHQuXG4gKiAgICAgIC8vIFRoZSBuZXh0IGFuYWx5emVyIHRvIHRoZSBpbnRlcnByZXRlciB3b3VsZCBhY2NlcHQgdGhlIGFsdGVybmF0ZWRcbiAqICAgICAgLy8gY29udGV4dCBhcyB0aGUgYXJndW1lbnQgJ2NvbnRleHQnLlxuICogICAgICBjb250ZXh0LnNvbWVGbGFnID0gdHJ1ZTtcbiAqICAgICAgLy8gV2hlbiB0aGVyZSBpcyB3cm9uZywgdGhyb3cgaXQuXG4gKiAgICAgIHRocm93IG5ldyBFcnJvcignU29tZSBhbmFseXppbmcgZXJyb3InKTtcbiAqICAgIH07XG4gKlxuICogTm90ZSB0aGF0IHRoZSBhbmFseXplciAoJ2EnKSB3b3VsZCBiZSBpbnZva2VkIHdpdGggZW1wdHkgJ3RoaXMnIG9iamVjdCxcbiAqIHNvIHRoZSBmdW5jdGlvbiByZWxpZXMgb24gJ3RoaXMnIHNob3VsZCBiaW5kIGl0c2VsZiBmaXJzdC5cbiAqL1xuUnVuZS5FdmFsdWF0ZS5wcm90b3R5cGUuYW5hbHl6ZXIgPSBmdW5jdGlvbihhKSB7XG4gIHRoaXMuX2FuYWx5emVycy5wdXNoKGEpO1xuICByZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogT25lIEV2YWx1YXRlIGNhbiBvbmx5IGhhdmUgb25lIGludGVycHJldGVyLCBhbmQgaXQgd291bGQgcmV0dXJuXG4gKiB0aGUgZnVuY3Rpb24gY291bGQgY29uc3VtZSBldmVyeSBzdGFjayBjaGFuZ2UgZnJvbSAnUnVuZSNldmFsdWF0ZScuXG4gKlxuICogVGhlIGNvZGUgaXMgYSBsaXR0bGUgY29tcGxpY2F0ZWQ6IHdlIGhhdmUgdHdvIGtpbmRzIG9mICdyZWR1Y2luZyc6XG4gKiBvbmUgaXMgdG8gcmVkdWNlIGFsbCBhbmFseXplcnMgd2l0aCB0aGUgc2luZ2xlIGluY29taW5nIGNoYW5nZSxcbiAqIGFub3RoZXIgaXMgdG8gcmVkdWNlIGFsbCBpbmNvbWluZyBjaGFuZ2VzIHdpdGggdGhpcyBhbmFseXplcnMgKyBpbnRlcnByZXRlci5cbiAqXG4gKiBUaGUgYW5hbHl6ZXIgYW5kIGludGVycHJldGVyIHNob3VsZCBjaGFuZ2UgdGhlIGNvbnRleHQsIHRvIG1lbW9yaXplIHRoZVxuICogc3RhdGVzIG9mIHRoZSBldmFsdWF0aW9uLiBUaGUgZGlmZmVyZW5jZSBpcyBpbnRlcnByZXRlciBzaG91bGQgcmV0dXJuIG9uZVxuICogbmV3IHN0YWNrIGlmIGl0IG5lZWRzIHRvIHVwZGF0ZSB0aGUgZXhpc3Rpbmcgb25lLiBUaGUgc3RhY2sgaXQgcmV0dXJucyB3b3VsZFxuICogcmVwbGFjZSB0aGUgZXhpc3Rpbmcgb25lLCBzbyBhbnl0aGluZyBzdGlsbCBpbiB0aGUgb2xkIG9uZSB3b3VsZCBiZSB3aXBlZFxuICogb3V0LiBUaGUgaW50ZXJwcmV0ZXIgY291bGQgcmV0dXJuIG5vdGhpbmcgKCd1bmRlZmluZWQnKSB0byBrZWVwIHRoZSBzdGFja1xuICogdW50b3VjaGVkLlxuICpcbiAqIFRoZSBhbmFseXplcnMgYW5kIGludGVycHJldGVyIGNvdWxkIGNoYW5nZSB0aGUgJ2NvbnRleHQnIHBhc3MgdG8gdGhlbS5cbiAqIEFuZCBzaW5jZSB3ZSBtYXkgdXBkYXRlIHRoZSBzdGFjayBhcyBhYm92ZSwgdGhlIGNvbnRleHQgc2hvdWxkIG1lbW9yaXplXG4gKiB0aG9zZSBpbmZvcm1hdGlvbiBub3QgdG8gYmUgb3ZlcndyaXR0ZW4gd2hpbGUgdGhlIHN0YWNrIGdldCB3aXBlZCBvdXQuXG4gKlxuICogQW5kIGlmIHRoZSBpbnRlcnByZXRpbmcgbm9kZSBpcyB0aGUgZXhpdCBub2RlIG9mIHRoZSBzZXNzaW9uLCBpbnRlcnByZXRlclxuICogc2hvdWxkIHJldHVybiBhIG5ldyBzdGFjayBjb250YWlucyBvbmx5IG9uZSBmaW5hbCByZXN1bHQgbm9kZS4gSWYgdGhlcmVcbiAqIGlzIG5vIHN1Y2ggbm9kZSwgdGhlIHJlc3VsdCBvZiB0aGlzIHNlc3Npb24gaXMgJ3VuZGVmaW5lZCcuXG4gKi9cblJ1bmUuRXZhbHVhdGUucHJvdG90eXBlLmludGVycHJldGVyID0gZnVuY3Rpb24oaW5wdCkge1xuICAvLyBUaGUgY3VzdG9taXplZCBsYW5ndWFnZSBzaG91bGQgZ2l2ZSB0aGUgZGVmYXVsdCBjb250ZXh0LlxuICByZXR1cm4gKGNvbnRleHQsIGNoYW5nZSwgc3RhY2spID0+IHtcbiAgICB0cnkge1xuICAgICAgLy8gQW5hbHl6ZXJzIGNvdWxkIGNoYW5nZSB0aGUgY29udGV4dC5cbiAgICAgIHRoaXMuX2FuYWx5emVycy5yZWR1Y2UoKGN0eCwgYW5hbHl6ZXIpID0+IHtcbiAgICAgICAgYW5hbHl6ZXIuY2FsbCh7fSwgY29udGV4dCwgY2hhbmdlLCBzdGFjayk7XG4gICAgICB9LCBjb250ZXh0KTtcbiAgICB9IGNhdGNoKGUpIHtcbiAgICAgIHRoaXMuX2hhbmRsZUVycm9yKGUsIGNvbnRleHQsIGNoYW5nZSwgc3RhY2spO1xuICAgIH1cbiAgICAvLyBBZnRlciBhbmFseXplIGl0LCBpbnRlcnByZXQgdGhlIG5vZGUgYW5kIHJldHVybiB0aGUgbmV3IHN0YWNrIChpZiBhbnkpLlxuICAgIHZhciBuZXdTdGFjayA9IGlucHQoY29udGV4dCwgY2hhbmdlLCBzdGFjayk7XG4gICAgcmV0dXJuIG5ld1N0YWNrO1xuICB9O1xufTtcblxuUnVuZS5FdmFsdWF0ZS5wcm90b3R5cGUuX2hhbmRsZUVycm9yID1cbmZ1bmN0aW9uKGVyciwgY29udGV4dCwgY2hhbmdlLCBzdGFjaykge1xuICAvLyBUT0RPOiBleHBhbmQgaXQgdG8gcHJvdmlkZSBtb3JlIHNvcGhpc3RpYyBkZWJ1Z2dpbmcgbWVzc2FnZS5cbiAgdGhyb3cgbmV3IEVycm9yKGBXaGVuIGNoYW5nZSAke2NoYW5nZS50eXBlfSBjb21lcyBlcnJvciAnJHtlcnJ9JyBoYXBwZW5lZGApO1xufTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL3J1bmUuanNcbiAqKi8iXSwic291cmNlUm9vdCI6IiJ9