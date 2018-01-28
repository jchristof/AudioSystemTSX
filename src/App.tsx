import * as React from 'react';
import './App.css';
import AudioSystem from './AudioSystem';

const logo = require('./logo.svg');

type Props = {
  clickFunction: (freq: number) => void;
};
type State = {};

class Button extends React.Component<Props, State> {
  render() {
    return (
      <button onClick={() => this.props.clickFunction(220)}>key</button>
    );
  }
}

class App extends React.Component {
  private audioSystem: AudioSystem;
  private audioBuffer: AudioBuffer;
  private resp: any;

  constructor(props: {}, context?: any) {
    super(props, context);
    this.audioSystem = new AudioSystem();
    this.audioSystem.run();

    var request = new XMLHttpRequest();
    
    request.open('get', 'audio/snare.wav', true);
    request.responseType = 'arraybuffer';
    request.onload = () => {
        this.resp = request.response;
        this.audioSystem.context.decodeAudioData(this.resp, (buffer: AudioBuffer) => {
          this.audioBuffer = buffer;
          this.audioSystem.playback(this.audioBuffer);
      });
    };
    request.send();
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <Button clickFunction={(freq) => this.audioSystem.note(freq)}/>
        <p className="App-intro">
          To get started, edit <code>src/App.tsx</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
