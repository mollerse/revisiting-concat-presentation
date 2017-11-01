import React, { Component } from 'react';
import Codemirror from 'react-codemirror';
import Browser from 'ait-lang/runtimes/browser';
import { aitFFIPrint as print } from 'ait-lang/ffi';
import canvas from 'ait-canvas';
import dom from 'ait-dom';
import animation from 'ait-animation';
require('./cm-ait');

export default class Repl extends Component {
  constructor(props) {
    super(props);

    const code = props.code || '';
    const additionalModules = props.modules || [];

    const runtime = Browser();
    Object.assign(runtime.lexicon, canvas);
    Object.assign(runtime.lexicon, dom);
    Object.assign(runtime.lexicon, animation);

    this.state = {
      runtime: runtime,
      code
    };

    window.runtime = runtime;

    this.updateCode = this.updateCode.bind(this);
  }

  updateCode(newCode) {
    this.state.runtime.reset();
    if (this.props.mode === 'canvas') {
      console.log('resetting canvas');
      const ctx = runtime.scope['__aitCanvasContext'].body;
      ctx.restore();
      ctx.fillStyle = 'black';
      ctx.fillRect(0, 0, 500, 500);
      ctx.save();
    }
    try {
      this.state.runtime.evaluate(newCode);
      this.setState({ code: newCode });
    } catch (e) {
      console.error(e.message);
    }
  }

  componentDidMount() {
    if (this.props.mode === 'canvas') {
      const c = document.createElement('canvas');
      c.height = 500;
      c.width = 500;
      this._output.appendChild(c);
      runtime.program = [
        { type: 'word', body: 'canvasContext' },
        { type: 'value', body: c }
      ];
      runtime.executeProgram();
      runtime.scope['__aitCanvasContext'].body.fillStyle = 'black';
      runtime.scope['__aitCanvasContext'].body.fillRect(0, 0, 500, 500);
      runtime.scope['__aitCanvasContext'].body.save();

      runtime.evaluate(this.state.code);

      c.addEventListener('click', () => {
        runtime.program = [{ type: 'word', body: 'stopAnimations' }];
        runtime.executeProgram();
      });
    }
  }

  render() {
    const { mode } = this.props;

    return (
      <div className="repl">
        <div
          className={`input ${mode === 'side-by-side' ? 'side-by-side' : ''}`}
        >
          <Codemirror
            value={this.state.code}
            onChange={this.updateCode}
            options={{
              lineNumbers: false,
              theme: 'seti',
              mode: 'ait',
              tabSize: 2
            }}
          />
        </div>
        {mode === 'side-by-side' ? (
          <div className="output side-by-side">
            <Codemirror
              value={this.props.compare}
              options={{
                lineNumbers: false,
                theme: 'seti',
                mode: 'ait',
                tabSize: 2
              }}
            />
          </div>
        ) : (
          <div className="output" ref={el => (this._output = el)}>
            <div>{mode === 'stack' ? 'State' : 'Output'}:</div>
            {mode === 'stack' ? (
              <ul className="stack">
                {this.state.runtime.stack
                  .stack()
                  .reverse()
                  .map((v, i) => <li key={i}>{print(v)}</li>)}
              </ul>
            ) : null}
          </div>
        )}
      </div>
    );
  }
}
