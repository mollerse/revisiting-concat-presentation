import React, { Component } from 'react';
import { render } from 'react-dom';
import {
  Appear,
  BlockQuote,
  Cite,
  CodePane,
  Code,
  Deck,
  Fill,
  Fit,
  Link,
  Heading,
  Image,
  Layout,
  ListItem,
  List,
  Quote,
  Spectacle,
  Slide,
  Text,
  Notes
} from 'spectacle';
import theme from './theme';
import REPL from './runtime/repl';
const fs = require('fs');

const BigHeading = props => (
  <Heading caps size={1} {...props}>
    {props.children}
  </Heading>
);
const SmallHeading = props => (
  <Heading size={2} {...props}>
    {props.children}
  </Heading>
);
const AppearingBlock = props => (
  <Appear {...props}>
    <div>{props.children}</div>
  </Appear>
);

class Slides extends Component {
  render() {
    return (
      <Spectacle theme={theme}>
        <Deck transition={['slide']} progress="none" controls={false}>
          <Slide className="title-slide" align="flex-start flex-start">
            <BigHeading>
              Revisiting Concatenative Languages With Creative Programming
            </BigHeading>
            <SmallHeading>Stian Veum Møllersen</SmallHeading>
            <SmallHeading>@mollerse</SmallHeading>
          </Slide>

          <Slide className="text-slide" align="flex-start flex-start">
            <SmallHeading>Hello!</SmallHeading>
            <div className="text-block">
              <Text className="text">I'm Stian, from Norway.</Text>
              <Appear>
                <Text className="text">
                  I work for a IT consultancy called BEKK.
                </Text>
              </Appear>
              <Appear>
                <Text className="text">
                  In my spare time I enjoy exploring weird and unusual ways of
                  programming.
                </Text>
              </Appear>
            </div>
          </Slide>

          <Slide className="repl-slide">
            <REPL mode="canvas" />
          </Slide>

          <Slide className="repl-slide">
            <REPL
              mode="canvas"
              code={fs.readFileSync('code/1_initial.ait', 'utf8')}
            />
          </Slide>

          <Slide align="center center">
            <SmallHeading>What was that?</SmallHeading>
            <AppearingBlock>
              <br />
              <SmallHeading>Concatenative Programming</SmallHeading>
            </AppearingBlock>
          </Slide>

          <Slide className="text-slide" align="flex-start flex-start">
            <SmallHeading>Concate-what?</SmallHeading>
            <div className="text-block">
              <Text className="text">
                Concatenative programming is a style of programming.
              </Text>
              <Appear>
                <Text className="text">
                  Programs are constructed by composing functions
                </Text>
              </Appear>
              <Appear>
                <Text className="text">
                  ...not by applying functions to values, as most other
                  languages.
                </Text>
              </Appear>
            </div>
          </Slide>

          <Slide align="center center">
            <SmallHeading>
              Concatenative as an alternative to applicative
            </SmallHeading>
          </Slide>

          <Slide className="text-slide" align="flex-start flex-start">
            <SmallHeading>Concatenate to compose</SmallHeading>
            <div className="text-block">
              <Text className="text">
                We construct programs by composing functions.
              </Text>
              <AppearingBlock>
                <Text className="text">
                  Here is a program made from the composition of five functions:
                </Text>
                <Code>succ 5 mod 0 equal</Code>
              </AppearingBlock>
            </div>
          </Slide>

          <Slide className="text-slide" align="flex-start flex-start">
            <SmallHeading>Concatenate to compose</SmallHeading>
            <div className="text-block">
              <Code>succ 5 mod 0 equal</Code>
              <Appear>
                <Text className="text">The composition is implicit.</Text>
              </Appear>
              <Appear>
                <Code>succ >> 5 >> mod >> 0 >> equal</Code>
              </Appear>
              <Appear>
                <Code>succ | 5 | mod | 0 | equal</Code>
              </Appear>
            </div>
          </Slide>

          <Slide className="text-slide" align="flex-start flex-start">
            <SmallHeading>Concatenate to compose</SmallHeading>
            <div className="text-block">
              <Text className="text">
                There is something strange going on though.
              </Text>
              <Appear>
                <Code>f x = equal(0(mod(5(succ(x)))</Code>
              </Appear>
              <Appear>
                <Text className="text">
                  Surely <Code>5</Code> and <Code>0</Code> aren't functions?
                </Text>
              </Appear>
            </div>
          </Slide>

          <Slide align="center center">
            <SmallHeading>There are no values, only functions.</SmallHeading>
            <br />
            <SmallHeading>That's the concatenative secret sauce.</SmallHeading>
          </Slide>

          <Slide className="text-slide" align="flex-start flex-start">
            <SmallHeading>Composition through uniformity</SmallHeading>
            <div className="text-block">
              <Text className="text">
                We can compose like this because everything is a function with
                the same interface.
              </Text>
              <Appear>
                <Code>succ(a: State): State</Code>
              </Appear>
              <AppearingBlock>
                <Code>5(a: State): State</Code>
              </AppearingBlock>
            </div>
          </Slide>

          <Slide className="text-slide" align="flex-start flex-start">
            <SmallHeading>Composition through uniformity</SmallHeading>
            <div className="text-block">
              <Text className="text">
                The world state can be anything, but usually it is a stack.
              </Text>
              <Appear>
                <Code>succ(a: Stack): Stack</Code>
              </Appear>
              <AppearingBlock>
                <Code>5(a: Stack): Stack</Code>
              </AppearingBlock>
            </div>
          </Slide>

          <Slide className="repl-slide">
            <REPL
              mode="stack"
              code={`\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\nequal:=;`}
            />
          </Slide>

          <Slide className="text-slide" align="flex-start flex-start">
            <SmallHeading>Expressivity? Quotations!</SmallHeading>
            <div className="text-block">
              <Text className="text">
                ...or functions adding quoted programs to the stack.
              </Text>
              <AppearingBlock>
                <Code>{`[2 <] filter`}</Code>
              </AppearingBlock>
              <AppearingBlock>
                <Text className="text">or</Text>
                <Code>0 [+] reduce</Code>
              </AppearingBlock>
            </div>
          </Slide>

          <Slide className="text-slide" align="flex-start flex-start">
            <SmallHeading>Expressivity? Quotations!</SmallHeading>
            <div className="text-block">
              <Text className="text">
                Can also be used for control structures
              </Text>
              <AppearingBlock>
                <Code>{`[2 <] ["true"] ["false"] ifte`}</Code>
              </AppearingBlock>
              <AppearingBlock>
                <Text className="text">or recursion</Text>
                <Code>{`[zero] [succ] [dup pred] [*] linrec`}</Code>
              </AppearingBlock>
            </div>
          </Slide>

          <Slide className="text-slide" align="flex-start flex-start">
            <SmallHeading>All good then?</SmallHeading>
            <div className="text-block">
              <Text className="text">When we compare</Text>
              <Appear>
                <Code>succ 5 mod 0 equal</Code>
              </Appear>
              <AppearingBlock>
                <Text className="text">to</Text>
                <Code>succ >> (flip mod) 5 >> equal 0</Code>
                <Text className="text">we see what we gain.</Text>
              </AppearingBlock>
            </div>
          </Slide>

          <Slide className="text-slide" align="flex-start flex-start">
            <SmallHeading>All good then?</SmallHeading>
            <div className="text-block">
              <Text className="text">
                But we have to fiddle with the stack.
              </Text>
              <Appear>
                <Code>f x y z = y^2 + x^2 - |y|</Code>
              </Appear>
              <AppearingBlock>
                <Text className="text">becomes</Text>
                <Code>drop [dup *] [abs] cleave - swap dup * +</Code>
              </AppearingBlock>
            </div>
          </Slide>

          <Slide align="center center">
            <BlockQuote>
              <Quote>Why did this get made?</Quote>
              <Cite>Me</Cite>
            </BlockQuote>
          </Slide>

          <Slide align="center center">
            <SmallHeading>Forth (1968)</SmallHeading>
            <Image src="assets/ChuckMoore.jpg" width="25%" />
            <Text className="text">Charles "Chuck" H. Moore</Text>
          </Slide>

          <Slide className="text-slide" align="flex-start flex-start">
            <SmallHeading>Forth</SmallHeading>
            <div className="text-block">
              <Text className="text">
                Chuck was sick of "The Tower of Babel" keeping him from reaching
                his machine.
              </Text>
              <Appear>
                <Text className="text">
                  He wanted something simpler, so he made Forth.
                </Text>
              </Appear>
            </div>
          </Slide>

          <Slide className="text-slide" align="flex-start flex-start">
            <SmallHeading>Forth</SmallHeading>
            <div className="text-block">
              <Text className="text">
                Designed to be portable and easy to implement.
              </Text>
              <Appear>
                <Text className="text">
                  ...a stack became the natural choice for program state.
                </Text>
              </Appear>
              <Appear>
                <Text className="text">
                  Which also neatly avoided the whole problem of registers.
                </Text>
              </Appear>
            </div>
          </Slide>

          <Slide className="text-slide" align="flex-start flex-start">
            <SmallHeading>Forth</SmallHeading>
            <div className="text-block">
              <Text className="text">
                The programmer interface also had to be simple.
              </Text>
              <Appear>
                <Text className="text">
                  Postfix to avoid worrying about arity.
                </Text>
              </Appear>
              <Appear>
                <Text className="text">
                  Word-centric to be more natural to humans.
                </Text>
              </Appear>
            </div>
          </Slide>

          <Slide className="text-slide" align="flex-start flex-start">
            <SmallHeading>Forth</SmallHeading>
            <div className="text-block">
              <Text className="text">
                Optimizing for simplicity turned out to be a good thing.
              </Text>
              <Appear>
                <Text className="text">
                  Forth has been, and is still used, with great success in
                  embedded systems.
                </Text>
              </Appear>
              <Appear>
                <Text className="text">
                  It can serve as both a low- and high-level language.
                </Text>
              </Appear>
            </div>
          </Slide>

          <Slide align="center center">
            <SmallHeading>
              Forth's concatenative style stems from purely practical reasons.
            </SmallHeading>
          </Slide>

          <Slide align="center center">
            <SmallHeading>Joy (2001)</SmallHeading>
            <Image src="assets/mvt.jpg" width="25%" />
            <Text className="text">Manfred von Thun</Text>
          </Slide>

          <Slide className="text-slide" align="flex-start flex-start">
            <SmallHeading>Joy</SmallHeading>
            <div className="text-block">
              <Text className="text">A purely functional language.</Text>
              <Appear>
                <Text className="text">
                  Inspired by Backus' FP and Combinatory Logic.
                </Text>
              </Appear>
              <Appear>
                <Text className="text">
                  Where the term Concatenative comes from.
                </Text>
              </Appear>
            </div>
          </Slide>

          <Slide className="text-slide" align="flex-start flex-start">
            <SmallHeading>Joy</SmallHeading>
            <div className="text-block">
              <Text className="text">
                Landed on the simple syntax by way of implicitness.
              </Text>
              <Appear>
                <Text className="text">
                  A stack was chosen for the program state because it had simple
                  semantics.
                </Text>
              </Appear>
            </div>
          </Slide>

          <Slide align="center center">
            <SmallHeading>
              Joy's take on concatenative style comes from a theoretical place.
            </SmallHeading>
          </Slide>

          <Slide className="text-slide" align="flex-start flex-start">
            <SmallHeading>Other concatenative languages</SmallHeading>
            <div className="text-block">
              <Appear>
                <Text className="text">PostScript (1982)</Text>
              </Appear>
              <Appear>
                <Text className="text">CPython VM ('91) & JVM ('95)</Text>
              </Appear>
              <Appear>
                <Text className="text">Factor (2003)</Text>
              </Appear>
              <Appear>
                <Text className="text">Cat, Kitten, Popr</Text>
              </Appear>
              <Appear>
                <Text className="text">
                  ... and various concatenative EDSLs
                </Text>
              </Appear>
            </div>
          </Slide>

          <Slide align="center center">
            <SmallHeading>
              Different points of view &mdash; one theoretical, one practical.
            </SmallHeading>
            <AppearingBlock>
              <br />
              <SmallHeading>Largely the same semantics!</SmallHeading>
            </AppearingBlock>
          </Slide>

          <Slide align="center center">
            <AppearingBlock>
              <BlockQuote>
                <Quote>
                  A language that does not affect the way you think about
                  programming, is not worth knowing.
                </Quote>
                <Cite>Alan Perlis</Cite>
              </BlockQuote>
            </AppearingBlock>
          </Slide>

          <Slide align="center center">
            <SmallHeading>Thinking Forth (1984)</SmallHeading>
            <Image width="35%" src="assets/thinking_forth.JPG" />
          </Slide>

          <Slide className="text-slide" align="flex-start flex-start">
            <SmallHeading>Forward thinking</SmallHeading>
            <div className="text-block">
              <Text className="text">This was a book ahead of its time.</Text>
              <Appear>
                <Text className="text">
                  Striking similarities to eXreme Programming and the Agile
                  movement.
                </Text>
              </Appear>
              <Appear>
                <Text className="text">
                  It draws a direct line between the design of Forth and how
                  Forth programmers work.
                </Text>
              </Appear>
            </div>
          </Slide>

          <Slide className="text-slide" align="flex-start flex-start">
            <SmallHeading>Forward thinking</SmallHeading>
            <div className="text-block">
              <Text className="text">Focuses on simplicity in the work.</Text>
              <Appear>
                <Text className="text">
                  "You don’t understand a problem until you can simplify it."
                </Text>
              </Appear>
              <AppearingBlock>
                <Text className="text">Simplification through layering.</Text>
              </AppearingBlock>
            </div>
          </Slide>

          <Slide className="text-slide" align="flex-start flex-start">
            <SmallHeading>Factoring</SmallHeading>
            <div className="text-block">
              <Text className="text">
                A continous process of evolving software.
              </Text>
              <List>
                <Appear>
                  <ListItem>Factor</ListItem>
                </Appear>
                <Appear>
                  <ListItem>...to clarify meaning</ListItem>
                </Appear>
                <Appear>
                  <ListItem>...to give something a name</ListItem>
                </Appear>
                <Appear>
                  <ListItem>...to avoid repitition</ListItem>
                </Appear>
                <Appear>
                  <ListItem>...to hide details likely to change</ListItem>
                </Appear>
                <Appear>
                  <ListItem>...to simplify APIs</ListItem>
                </Appear>
              </List>
            </div>
          </Slide>

          <Slide align="center center">
            <SmallHeading>
              Factoring creates a layer of special vocabulary to support the
              next layer.
            </SmallHeading>
          </Slide>

          <Slide className="text-slide" align="flex-start flex-start">
            <SmallHeading>Creative Programming</SmallHeading>
            <div className="text-block">
              <Text className="text">
                The creative process fits remarkably well with the principles of
                factoring.
              </Text>
              <List>
                <Appear>
                  <ListItem>1) Start with something small</ListItem>
                </Appear>
                <Appear>
                  <ListItem>2) Add tweakable parameters</ListItem>
                </Appear>
                <Appear>
                  <ListItem>3) Randomize or interpolate</ListItem>
                </Appear>
                <Appear>
                  <ListItem>4) Multiply and iterate</ListItem>
                </Appear>
              </List>
            </div>
          </Slide>

          <Slide className="repl-slide">
            <REPL
              mode="canvas"
              code={fs.readFileSync('code/1_initial.ait', 'utf8')}
            />
          </Slide>

          <Slide className="repl-slide">
            <REPL
              mode="canvas"
              code={fs.readFileSync('code/2_named-consepts.ait', 'utf8')}
            />
          </Slide>

          <Slide className="repl-slide">
            <REPL
              mode="canvas"
              code={fs.readFileSync('code/3_extracting-params.ait', 'utf8')}
            />
          </Slide>

          <Slide align="center center">
            <SmallHeading>
              Factoring is enabled and necessitated by the simplicity.
            </SmallHeading>
            <AppearingBlock>
              <br />
              <SmallHeading>And fits creative programming well!</SmallHeading>
            </AppearingBlock>
          </Slide>

          <Slide className="text-slide" align="flex-start flex-start">
            <SmallHeading>Closing thoughts</SmallHeading>
            <div className="text-block">
              <Text className="text">
                Everything as a function is kind of mind bending.
              </Text>
              <Appear>
                <Text className="text">
                  Limitations help enforcing simplicity by making you think
                  more.
                </Text>
              </Appear>
              <Appear>
                <Text className="text">
                  Creative programming is a fun way to explore and learn.
                </Text>
              </Appear>
            </div>
          </Slide>

          <Slide className="text-slide" align="flex-start flex-start">
            <SmallHeading>Resources</SmallHeading>
            <List>
              <ListItem>
                <Link href="http://thinking-forth.sourceforge.net/">
                  Thinking Forth
                </Link>
              </ListItem>
              <ListItem>
                <Link href="http://www.kevinalbrecht.com/code/joy-mirror/joy.html">
                  Joy Homepage (mirror)
                </Link>
              </ListItem>
              <ListItem>
                <Link href="https://leanpub.com/readevalprintlove003/read">
                  Read Eval Print λove #3 - Michael Fogus
                </Link>
              </ListItem>
              <ListItem>
                <Link href="http://archive.vector.org.uk/art10000350">
                  A Conversation with Manfred von Thun
                </Link>
              </ListItem>
              <ListItem>
                <Link href="https://www.forth.com/resources/forth-programming-language/">
                  The Evolution of Forth
                </Link>
              </ListItem>
              <ListItem>
                <Link href="http://www.codecommit.com/blog/cat/the-joy-of-concatenative-languages-part-1">
                  The Joy of Concatenative Languages Part 1, 2 & 3
                </Link>
              </ListItem>
              <ListItem>
                <Link href="http://evincarofautumn.blogspot.co.uk/2012/02/why-concatenative-programming-matters.html">
                  Why Concatenative Programming Matters
                </Link>
              </ListItem>
            </List>
          </Slide>

          <Slide className="text-slide" align="flex-start flex-start">
            <SmallHeading>Slides & Stuff</SmallHeading>
            <List>
              <ListItem>
                <Link href="https://github.com/mollerse/ait-lang">
                  github/mollerse/ait-lang
                </Link>
              </ListItem>
              <ListItem>
                <Link href="https://mollerse.github.io/revisiting-concat-presentation">
                  github/mollerse/revisiting-concat-presentation
                </Link>
              </ListItem>
            </List>
          </Slide>

          <Slide className="title-slide" align="flex-start flex-start">
            <BigHeading>Thank you for listening!</BigHeading>
            <SmallHeading>Stian Veum Møllersen</SmallHeading>
            <SmallHeading>@mollerse</SmallHeading>
          </Slide>
        </Deck>
      </Spectacle>
    );
  }
}

const mount = document.createElement('div');
document.body.appendChild(mount);
render(<Slides />, mount);
