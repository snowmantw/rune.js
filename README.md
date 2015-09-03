# Rune: language facilities to build an eDSL

## Motivation

The problem of define an eDSL with builder interface style is the language
needs to do lots of duplicated work to provide features like syntax check,
conditional statements, loop, sub-process, etc. And when the language grows
while people want to add more features on it the inner states would become
messy. For example, the simple eDSL with similar interface of Promise:

```javascript
(new Wish())
  .next(/* do something asynchronously */)
  .next(/* do something asynchronously */)
  .next(/* do something asynchronously */)
  ....
```

The implementation of 'next' could be very simple because it only needs to:

1. Get the asynchronous 'callback' from arguments
2. Keep every step before they really start to execute
2. Set some flag to indicates the current step is still not resolved
3. Tracking the current executing step, and 'jump' to the next step
   when this one got resolved
4. Every step should return itself to let the program continues

For the 'Wish' eDSL, the states it needs are defined in the constructor:

```javascript
var Wish = function() {
  currentStep = null;
  currentStepResolved = false;
  steps = [];
};
```

The problem comes when we want to add more features like a formal language
on it. For example, could we have some 'asynchronous if...else' with the syntax
similar to other languages? The most intuitive interface would be:

```javascript
(new Wish())
  .next( /* asynchronously generate conditions */ )
  .if( (condition) => { return condition === somefoo })
    .next( /* do some asynchronous thing for this branch */ )
    .next( /* do some asynchronous thing for this branch */ )
    .if( (nestedcond) => { return nestedcondition === somebar })
      .next( /* it could be more complicated with nested one like this*/ )
    .end()
  .else()
    .next( /* do some asynchronous thing for this branch */ )
  .end()
  .next(/* after the section, do something */)
```

However, this interface would bring disaster to our simple eDSL. First, the
nodes concated are all in a queue, so we don't have a proper way to construct
the tree structure from 'if...else' and other similar syntax, unless we
implement some building & traversing algorithm in our 'Wish' instance. Second,
even with we have such building & traversing operators in our instance, we
still lack the simple method to check syntax error: what if the 'else' node is
before the 'if'? Or even worse, an 'end' appears before the 'if' occurs. With
the old design, that may need only pushing & poping things while the eDSL start
to execute, couldn't handle cases like this without nasty flags and temporary
states, and it would unavoidable mix the interface (for the 'definition stage')
with runtime (for the 'execution stage'). So that every node of such eDSL need
to grow very large, and become hard to maintain.

To avoid these issues, Rune tries to formalize the way to construct a eDSL, and
provide some useful helpers. For example, with 'Langauge.define', eDSL need
not define methods inside the monolithic instance with all analyzing, building
and running functions, since now the node concating is represented as a way to
push to a stack, and then the analyzer & interpreter could apply on them as
they're mapping & reducing on an infinite stream. The most different one is
now the interface of the language, including the related analyzing, is a
individual stage beyond the interpreting stage. So we could control or even
refine the nodes of each eDSL sessions better, and make the implementation
more modularized & flexible.

## Usage

**Language.define** would return a method that could map to the corresponding
stack operations.

**Language.Evaluate** would return a evaluator, which is actually a reducer
that could apply on every new node of the stack, and then analyze and
interpret it to run the program. It's an optional feature so you could
still compose the eDSL without that, but with it there is at least a basic
method of how to create an eDSL by Rune.

These tools are all of module **Language**. See 'language.js' for more
details from the comments.

An existing eDSL by Rune is Process of Gleipnir. It's an eDSL to provide
an 'abortable Promise' with additional possibilities of state control.
