# Notes

## Intro & Hello (<2 min)

### Whoami?

Stian. Web developer from Norway. That cold place across the channel with all the satanists and church burnings.

### What do I do?

I work at BEKK, a norwegian consultancy firm, where I do fairly normal things with the web. Helping companies out with their large scale web needs, trying to make the web a little bit better by not filling it up with crap like 5mb JS bundles and the like. But on my spare time I scour the web for strange and unusual things, like Concatenative languages, and make fun things with it.

## Arty intro (5 min)

Make some square rotaty things.

## What did I just see? (12 min)

### Concate-what?

Concatenative programming is a style (not sure if I can use paradigm here) of programming where we construct programs by concatenating, or composing, functions. This is in contrast to most other languages where we apply functions to values, in other words applicative.

Totally clear? No? Let's look a bit closer.

### Concatenate to compose

To construct programs we use composition

```
succ 5 mod 0 equal
```

This is a program which figre out if the successor to a number is divisible by 5 or not. We use postfix notation here, that is not by accident. This way the data flows from left to right, through each function.

I think many here would recognize this kind of style from point-free style which is possible in most functional languages. If we just reintroduce a composition operator we have something that could almost look like Haskell

```
isSuccessorDivisibleBy5 = succ >> 5 >> mod >> 0 >> equal
```

There is something strange going on here, the above point-free version would become someting like this

```
isSuccessorDivisibleBy5 x = equal(0(mod(5(succ(x)))
```

If we reintroduce the point/x. Surely `5` and `0` are values, not functions?

### Simplicity through uniformity

The reason why we can do this sort of thing in a concatenative language is that all functions take the same number and type of arguments and produce the same number and type of outputs. In other words, the function interface is completely uniform.

In the example from before, we have the `succ` function:

```
function succ(stack) {
  let e = stack.pop();
  stack.push(e+1);
  return stack;
}
```

Similarly we have the `5` function:

```
function 5(stack) {
  stack.push(5);
  return stack;
}
```

### Demo of stack-based evaluation

```
succ 5 mod 0 equal
```

### Expressivity through quotations

We are missing one piece in the puzzle, and you might have guessed it already from the initial example: Quoted programs.

```
[2 <]
["is less than 2" print]
["is 2 or larger" print]
ifte
```

Here we see an example of how a control structure like an `if` could look. It takes 3 quoted programs off the stack and executes the first to get a boolean which is then used to execute one of two quoted programs.

We can also use this to do other higher order things like map, filter and reduce

```
howManyAreLessThan2: [ 2 < ] filter length ;

add10ToAll: [10 + ] map ;

sum: 0 [+] reduce ;
```

### Point-free to the people!

Contrasting the concatenative version

```
succ 5 mod 0 equal
```

with

```
let isSuccessorDivisibleBy5 =
  succ
  >> (flip mod) 5
  >> equal 0
```

We would could say that concatenative programming is point-free taken to its ultimate conclusion by eliminating the need for points all together.

### It's not all rainbows and unicorns

Offcourse, this sounds way shinier than it is. I bet most of you were able to think of situations where this would be totally inapproperiate and a complete headache to work with.

A popular counter-example is mathematical formulae

```
f(x,y,z) = y^2 + x^2 - |y|
```

that would become

```
f: drop [square] [abs] cleave - square + ;
```

Where we have to introduce special functions for manipulating the state of the world-stack. We have to drop the top of the stack where the unused param is. We have to use a special combinator called `cleave` to execute two functions on the top of the stack and place both results on the stack.

So why would anyone actually want to make this?

## Brief history of concatenative languages (8 min)

### Forth & Charles Moore

Frustrated with the state of computer programming, which he described as a "Tower of Babel", he wanted something simpler. He didn't want to separated from the machine by assemblers, compilers, linkers and all the things we usually think of as part of a modern software development toolkit.

Moore wanted something simpler. One simple thing which gave him a good enviroment to program as close to the machine as possible. This became Forth.

Forth was designed to be portable by being easy to implement. You would have a simple language on top that was easy to interpret, and you would have a simple compiler that could interface with the machine at a low level.

Using a stack was the simple answer. Registers had to many variations, the names and availability of registers would be different on different machines. But a stack was pretty much omni-present.

The compiler would need to be really simple aswell, so using postfix to eliminate the need for arity checking and using space to separate tokens was used.

Forth was a success, kind of. It did live up to its promise of portability, which is why it got mainly used for hardware-related programming. Its minimal compiler also made it uniquely suited for constrained environments (like satelites and space probes).

### PostScript

The next well-known language to use a concatenative style is PostScript. Created in the 70s and 80s to live inside printers to typeset documents. I'm not sure why PostScript, and its predecessor DesignSystem, was based on concatenative style. They have mentioned in interviews that they were aware of Forth, but that they reached the same kind of design independently. Nevertheless, they probably benefited from the same things as Forth; portability and simplicity.

### VMs

Fast forward a couple of years, and we get to the age of VMs. The first one was the CPython VM and later came the JVM with its Java Byte Code.

Both concatenative in nature with heavy use of the stack. Turns out concatenative languages are well suited for heavy optimizations because of their simple syntax. A simple pattern-based search-and-replace can create interesting optimizations.

### Joy and Manfred von Thun



Inspired by FP System from Backus' Turing Award Lecture arrived at concatenative programming from another angle. Attempting to simplify Lambda Calculus by eliminating the need for variables by way of Combinatory Logic arrived at something strikingly similar to Forth. Where the stack was chosen for it's simplicity in implementation in Forth, it was chosen for its performance in Joy. von Thun didn't wasn't really concerned with low level systems programming, he was only attempting to find a new theory of computation.

### Legacy of Joy

- Factor: probably the most complete programming language for a concatenative language to date. And according to von Thun himself, a worthy successor to Joy.
- Cat & Kitten: Attempts at typed versions of concatenative languages.
- Various attempts at concatenative DSLs in other languages.

## What are the implications of concatenative style? (10 min)

This is all good and stuff. Very performant, given the right implementation. Theoretically interesting, with its values-as-functions-thinking. But what does all this mean for the working programmer?

Fortunatly, the good people of Forth Inc. was thinking about the same things back in the early 80s. And collected their thoughts in a book called Thinking Forth.

### Factoring and Thinking Forth

Say something about how the principles of Factoring forms a cool way to work. Layer by layer etc.

> However, Forth programmers often strive to write their programs in a bottom-up fashion, building layers of fluency informing all layers above. In other words, each layer in a Forth program is a special-purpose language specifically geared to support the layers above it in the program.

### Factoring your way to ultimate reuse

No need to match up arguments, just concatenate! Obviously this makes some demands on API surfaces.

### Demo

Demonstrate factoring by taking the initial example and factor it using the factoring principles

### Factoring and creative programming?

How do theese things fit together? Ultimate reuse and simple APIs + simple "shims" make for cool experiences.

### Demo

Remix the earlier demo using some neat things from Ait.

## Closing thoughts (5min)

### Concatenative languages are interesting

There haven't been much research into these kind of languages. Why? Not sure, but might be because most of the benefits are not machine-related and the syntax is very alien (hello Lisp). The benefits of stack-based languages are well understood, but comes at the cost of DX.

### Creative programming is a fun way to explore things.

Making something just for fun kind of skips the whole usefulness-question and lets you learn without being frustrated at the lack of things or wanting to port the solution in your head to the new environment.

### Concatenative languages teaches you about limits

They have some pretty clear limitations (in terms of syntax) and that teaches you about the nature of problems. Taking away named state really makes you think about the relation between your data and your solution.

### Concatenative languages are excellent for playing around with

You can simply implement your own compiler/interpreter, its super fun!

## Thank you (<2 min)

Thank you for listening. Hope you had fun and see the world a little bit differently after this.
