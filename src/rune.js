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
export function Rune() {}

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
Rune.define = function(method, as, doc = '') {
  var built = function(...args) {
    var node, resultstack;
    switch (as) {
      case 'push':
        node = new Rune.Node(method, args, this.stack);
        this.stack.push(node);
        resultstack =
          this.onchange(this.context, node, this.stack);
        break;
      case 'begin':
        this._prevstack = this.stack;
        this.stack = [];
        node = new Rune.Node(method, args, this.stack);
        this.stack.push(node);  // as the first node of the new stack.
        resultstack =
          this.onchange(this.context, node, this.stack);
        break;
      case 'end':
        node = new Rune.Node(method, args, this.stack);
        this.stack.push(node);  // the last node of the stack.
        this.stack =
          this._prevstack; // switch back to the previous stack.
        resultstack =
          this.onchange(this.context, node, this.stack);
        break;
      case 'exit':
        node = new Rune.Node(method, args, this.stack);
        this.stack.push(node);  // the last node of the stack.
        resultstack =
          this.onchange(this.context, node, this.stack);
        if (!resultstack) {
          throw new Error(`'exit' node '${node.type}' should
            return a resultstack.`);
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
    'method': method,
  };
  return built;
};

/**
 * Generate a method that would return all documents of the methods,
 * in a form of '{ methodName: description }'.
 *
 * The argument must be the language instance with all defined methods.
 */
Rune.publish = function(instance) {
  var generated = Object.keys(instance).reduce((doc, name) => {
    var method = instance[name];
    if (method.rune) {
      doc[name] = method.rune.doc;
    }
  }, {});
  return function() {
    return generated;
  };
};

Rune.Node = function(type, args, stack) {
  this.type = type;
  this.args = args;
  this.stack = stack;
};

Rune.Evaluate = function(context = {}) {
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
Rune.Evaluate.prototype.analyzer = function(a) {
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
Rune.Evaluate.prototype.interpreter = function(inpt) {
  // The customized language should give the default context.
  return (context, change, stack) => {
    try {
      // Analyzers could change the context.
      this._analyzers.reduce((ctx, analyzer) => {
        analyzer.call({}, context, change, stack);
      }, context);
    } catch(e) {
      this._handleError(e, context, change, stack);
    }
    // After analyze it, interpret the node and return the new stack (if any).
    var newStack = inpt(context, change, stack);
    return newStack;
  };
};

Rune.Evaluate.prototype._handleError =
function(err, context, change, stack) {
  // TODO: expand it to provide more sophistic debugging message.
  throw new Error(`When change ${change.type} comes error '${err}' happened`);
};
